const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../auth/auth");
const { Alert, Employee, EmployeeAlert } = require("../db/sequelize");

var firebase_service_account = require("../auth/firebase_private_key.json");

module.exports = (app, admin) => {
  app.post("/api/alerts", auth, (req, res) => {
    const id = req.body.employeeId;

    Alert.create({
      companyId: req.body.companyId,
      employeeId: req.body.employeeId,
      message: req.body.message,
      alertType: req.body.alertType,
      alertStatus: req.body.alertStatus,
      alertLocation: {
        longitude: req.body.alertLocation.longitude,
        latitude: req.body.alertLocation.latitude,
      },
    })
      .then((alert) => {
        const alertItem = alert;
        const message = true;

        Employee.findByPk(id).then((employee) => {
          EmployeeAlert.create({
            alertId: alertItem.alertId,
            employeeId: employee.employeeId,
          }).then((employeeAlert) => {
            const locationObject = alertItem.alertLocation;
            const geopoint = new admin.firestore.GeoPoint(
              locationObject.latitude,
              locationObject.longitude
            );
            const firebaseAlert = {
              alert: {
                alertDatetime: admin.firestore.Timestamp.fromDate(
                  alertItem.alertDatetime
                ),
                alertId: alertItem.alertId,
                alertLocation: geopoint,
                alertStatus: alertItem.alertStatus,
                alertType: alertItem.alertType,
                companyId: alertItem.companyId,
                message: alertItem.message,
              },
              employee: {
                companyId: employee.companyId,
                employeeId: employee.employeeId, // Utilisez l'ID généré par Sequelize
                firstname: employee.firstname,
                lastname: employee.lastname,
                phone_number: employee.phone_number,
                tokens: [],
                role: employee.role,
                job: employee.job,
                profilUrl: employee.profilUrl,
              },
              employeeAlertId: employeeAlert.employeeAlertId,
            };

            admin
              .firestore()
              .collection("alert_pivot")
              .doc(`${employeeAlert.employeeAlertId}`)
              .set(firebaseAlert)
              .then(() => {
                // Filtrer les utilisateurs en fonction de leur rôle
                const roleToFilter =
                  req.body.alertType === "NEED HELP" ? "ADMIN" : "USER";

                const snapshot = admin
                  .firestore()
                  .collection("users")
                  .where("companyId", "==", req.body.companyId)
                  .where("role", "==", roleToFilter)
                  .get()
                  .then((snapshots) => {
                    const tokensArray = [];
                    snapshots.forEach((doc) => {
                      const tokensString = doc.data().tokens;
                      if (tokensString) {
                        const tokens = tokensString;
                        tokensArray.push(...tokens);
                      }
                    });
                    const messageToSend = {
                      data: {
                        type: "warning",
                        content:
                          req.body.message != null
                            ? req.body.message
                            : "J'ai besoin d'aide 🆘🆘🆘",
                      },
                      topic: "weather",
                    };
                    admin
                      .messaging()
                      .send(messageToSend)
                      .then((response) => {
                        console.log("Successfully sent message:", response);
                      })
                      .catch((error) => {
                        console.log("Error sending message:", error);
                      });
                    res.json({
                      message: message,
                      data: {
                        alert: alertItem,
                        employee: employee,
                        employeeAlertId: employeeAlert.employeeAlertId,
                      },
                    });
                  });
              })
              .catch((firebaseError) => {
                console.log(firebaseError);
                const message = `L'alert n'a pas pu être ajouté à Firestore. Réessayer dans quelques instants.`;
                res.status(500).json({ message, data: firebaseError });
              });

            //=====================================
          });
        });
      })
      .catch((error) => {
        if (
          error instanceof ValidationError ||
          error instanceof UniqueConstraintError
        ) {
          return res.status(400).json({ message: error.message });
        } else {
          const message = `L'alerte n'a pas pu être ajoutée. Réessayez dans quelques instants.`;
          res.status(500).json({ message, data: error });
        }
      });
  });
};
