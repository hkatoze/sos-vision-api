const { EmployeeAlert, Employee, Alert } = require("../db/sequelize");

const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/alertsEmployees", auth, (req, res) => {
    if (req.query.status) {
      const status = req.query.status;

      return EmployeeAlert.findAll({
        include: [
          {
            model: Alert,
            where: { alertStatus: status },
          },
          {
            model: Employee,
          },
        ],
      }).then((alertsEmployees) => {
        const message = `Il y a au total ${alertsEmployees.length} alertes ayant un statut ${status}`;
        res.json({ message, data: alertsEmployees });
      });
    }
    if (req.query.companyId) {
      const companyId = req.query.companyId;

      return EmployeeAlert.findAll({
        include: [
          {
            model: Alert,
            where: { companyId },
          },
          {
            model: Employee,
          },
        ],
      }).then((alertsEmployees) => {
        const message = `Il y a au total ${alertsEmployees.length} alertes de l'entreprise ${companyId}`;
        res.json({ message, data: alertsEmployees });
      });
    }
    if (req.query.employeeId) {
      const employeeId = req.query.employeeId;

      return EmployeeAlert.findAll({
        where: { employeeId },
        include: [
          {
            model: Alert,
          },
          {
            model: Employee,
          },
        ],
      }).then((alertsEmployees) => {
        const message = `Il y a au total ${alertsEmployees.length} alertes de l'employée ${employeeId}`;
        res.json({ message, data: alertsEmployees });
      });
    }
    if (req.query.type) {
      const type = req.query.type;

      return EmployeeAlert.findAll({
        include: [
          {
            model: Alert,
            where: { alertType: type },
          },
          {
            model: Employee,
          },
        ],
      }).then((alertsEmployees) => {
        const message = `Il y a au total ${alertsEmployees.length} alertes de type ${type}`;
        res.json({ message, data: alertsEmployees });
      });
    }

    EmployeeAlert.findAll({
      include: [
        {
          model: Alert,
        },
        {
          model: Employee,
        },
      ],
    })
      .then((alertsEmployees) => {
        const message = `La liste complète des alertes avec les détails des employés a bien été récupérée.`;
        res.json({ message, data: alertsEmployees });
      })
      .catch((error) => {
        const message = `La liste complète des alertes avec les détails des employés n'a pas pu être récupérée. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
