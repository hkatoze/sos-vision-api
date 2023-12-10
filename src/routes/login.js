const { Company, Employee } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/login", auth, (req, res) => {
    Employee.findOne({ where: { phone_number: req.body.phone_number } })
      .then((user) => {
        if (!user) {
          const message = `L'utilisateur n'existe pas.Créer un compte ou réessayer un autre numéro de téléphone.`;
          return res.status(404).json({ message });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Le mot de passe fournit est incorrect.`;
              return res.status(401).json({ message });
            }

            const connexionMessage = `L'utilisateur s'est connecté avec succès.`;

            return Company.findByPk(user.companyId).then((company) => {
              res.json({
                message: connexionMessage,
                data: {
                  companyId: user.companyId,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  phone_number: user.phone_number,
                  password: user.password,
                  role: user.role,
                  function: user.function,
                  companyName: company.companyName,
                },
              });
            });
          });
      })
      .catch((error) => {
        const message = `Une erreur s'est produite lors de la connexion de l'utilisateur.`;
        res.status(500).json({ message, data: error });
      });
  });
};
