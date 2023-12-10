const { Alert } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/alerts/:id", auth, (req, res) => {
    const id = req.params.alertId;

    Alert.findByPk(id)
      .then((alert) => {
        if (alert === null) {
          const message = `L'alerte demandée n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        const message = `L'alerte ${alert.alertName} a bien été reccupérée.`;

        res.json({ message, data: alert });
      })
      .catch((error) => {
        const message = `L'alerte n'a pas pu être reccupérée.Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
