const { Employee } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/employees/:id", auth, (req, res) => {
    const id = req.params.employeeId;

    Employee.update(req.body, { where: { employeeId: id } })
      .then((_) => {
        return Employee.findByPk(id).then((employee) => {
          if (employee === null) {
            const message = `L'employé demandé n'existe pas. Réessayer avec un autre identifiant.`;

            return res.status(404).json({ message });
          }
          const message = `L'employé ${
            employee.firstname + employee.lastname
          } a bien été modifié.`;
          res.json({ message, data: employee });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `L'employé  n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
