const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");
const auth = require("../auth/auth");
const { Employee } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/employees", auth, (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      Employee.create({
        companyId: req.body.companyId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone_number: req.body.phone_number,
        password: hash,
        role: req.body.role,
        function: req.body.function,
      })
        .then((employee) => {
          const message = `L'employé ${
            employee.firstname + employee.lastname
          } a bien été ajouté`;

          res.json({ message, data: employee });
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
          }
          if (error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: error.message });
          }
          const message = `L'employé n'a pas pu être ajouté. Réessayer dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    });
  });
};
