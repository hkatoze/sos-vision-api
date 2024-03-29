const { Company, Employee } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const auth = require("../auth/auth");

module.exports = (app, admin) => {
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
              const firebaseUser = {
                companyId: user.companyId,
                employeeId: user.employeeId, // Utilisez l'ID généré par Sequelize
                firstname: user.firstname,
                lastname: user.lastname,
                phone_number: user.phone_number,
                tokens: user.tokens + ";" + req.body.tokens,
                role: user.role,
                job: user.job,
                profilUrl: user.profilUrl,
              };
              admin
                .firestore()
                .collection("users")
                .doc(`${user.employeeId}`)
                .update(firebaseUser)
                .then(() => {
                  Employee.update(firebaseUser, {
                    where: { employeeId: user.employeeId },
                  }).then((_) => {
                    return Employee.findByPk(user.employeeId).then(
                      (employee) => {
                        if (employee === null) {
                          const message = `L'employé demandé n'existe pas. Réessayer avec un autre identifiant`;

                          return res.status(404).json({ message });
                        }

                        res.json({
                          message: connexionMessage,
                          data: {
                            companyId: user.companyId,
                            employeeId: user.employeeId,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            phone_number: user.phone_number,
                            profilUrl: user.profilUrl,
                            role: user.role,
                            tokens: user.tokens,
                            job: user.job,
                            companyName: company.companyName,
                          },
                        });
                      }
                    );
                  });
                })
                .catch((firebaseError) => {
                  console.log(firebaseError);
                  const message = `L'employé n'a pas pu être ajouté à Firestore. Réessayer dans quelques instants.`;
                  res.status(500).json({ message, data: firebaseError });
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
