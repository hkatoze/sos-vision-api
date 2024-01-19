const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");
const auth = require("../auth/auth");
const { Employee } = require("../db/sequelize");
var admin = require("firebase-admin");
var firebase_service_account = require("../auth/firebase_private_key.json");

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
        tokens: "[]",
        profilUrl: req.body.profilUrl,
        job: req.body.job,
      })
        .then((employee) => {
          const message = `L'employé ${
            employee.firstname + " " + employee.lastname
          } a bien été ajouté`;

          // Ajouter l'employé à la collection Firebase
          const firebaseUser = {
            companyId: employee.companyId,
            employeeId: employee.id, // Utilisez l'ID généré par Sequelize
            firstname: employee.firstname,
            lastname: employee.lastname,
            phone_number: employee.phone_number,
            tokens: [],
            role: employee.role,
            job: employee.job,
            profilUrl: employee.profilUrl,
          };

          admin.initializeApp({
            credential: admin.credential.cert(firebase_service_account),
          });

          admin
            .firestore()
            .collection("users")
            .doc(employee.id.toString())
            .set(firebaseUser);

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
