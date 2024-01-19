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
                    const tokens = JSON.parse(tokensString);
                    tokensArray.push(...tokens);
                  }
                });

                admin.messaging().send(
                  tokensArray,
                  {
                    data: {
                      companyId: req.body.companyId,
                      employeeId: req.body.employeeId,
                      alertType: req.body.alertType,
                      alertStatus: req.body.alertStatus,
                      alertLocation: {
                        longitude: req.body.alertLocation.longitude,
                        latitude: req.body.alertLocation.latitude,
                      },
                    },
                  },
                  {
                    contentAvailable: true,
                    priority: "high",
                  }
                );
                res.json({
                  message: message,
                  data: {
                    alert: alertItem,
                    employee: employee,
                    employeeAlertId: employeeAlert.employeeAlertId,
                  },
                });
              });
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
