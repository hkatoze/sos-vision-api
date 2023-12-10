const { Alert } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/alerts", auth, (req, res) => {
    if (req.query.status) {
      const status = req.query.status;

      return Alert.findAll({ where: { alertStatus: status } }).then(
        (alerts) => {
          const message = `Il y'a au total ${alerts.length} alerts ayant un statut ${status}`;
          res.json({ message, data: alerts });
        }
      );
    }

    if (req.query.type) {
      const type = req.query.type;

      return Alert.findAll({ where: { alertType: type } }).then((alerts) => {
        const message = `Il y'a au total ${alerts.length} alerts de type ${type}`;
        res.json({ message, data: alerts });
      });
    }
    Alert.findAll()
      .then((alerts) => {
        const message = `La liste complète des alertes a bien été reccupérée.`;

        res.json({ message, data: alerts });
      })
      .catch((error) => {
        const message = `La liste complète des alertes n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
