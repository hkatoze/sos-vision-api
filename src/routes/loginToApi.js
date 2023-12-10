const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/loginToApi", (req, res) => {
    User.findOne({ where: { emailAddress: req.body.emailAddress } })
      .then((user) => {
        if (!user) {
          const message = `L'utilisateur n'existe pas .Créer un compte ou réessayer une autre adresse email`;
          return res.status(404).json({ message });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Le mot de passe fournit est incorrect.`;
              return res.status(401).json({ message });
            }
            //JWT
            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: "365d",
            });
            const message = `L'utilisateur s'est connecté avec succès.`;
            return res.json({ message, data: user, token });
          });
      })
      .catch((error) => {
        const message = `L'utilisateur n'a pas pu se connecter. Reessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
