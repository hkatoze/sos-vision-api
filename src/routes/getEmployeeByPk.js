const { Employee } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/employees/:id", auth, (req, res) => {
    const id = req.params.employeeId;

    Employee.findByPk(id)
      .then((employee) => {
        if (employee === null) {
          const message = `L'employé demandé n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        const message = `L'employé ${
          employee.firstname + employee.lastname
        } a bien été reccupéré.`;

        res.json({ message, data: employee });
      })
      .catch((error) => {
        const message = `L'employé n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
