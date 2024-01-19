const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../auth/auth");
const { Alert, Employee, EmployeeAlert } = require("../db/sequelize");

var admin = require("firebase-admin");

var firebase_service_account = require("../auth/firebase_private_key.json");

module.exports = (app) => {
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
            admin.initializeApp({
              credential: admin.credential.cert(firebase_service_account),
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
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `L'alerte n'a pas pu être ajouté. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
