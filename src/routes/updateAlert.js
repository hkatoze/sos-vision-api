const { Alert } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/alerts/:id", auth, (req, res) => {
    const id = req.params.alertId;

    Alert.update(req.body, { where: { alertId: id } })
      .then((_) => {
        return Alert.findByPk(id).then((alert) => {
          if (alert === null) {
            const message = `L'alerte demandée n'existe pas. Réessayer avec un autre identifiant.`;

            return res.status(404).json({ message });
          }
          const message = `L'alert ${alert.alertId} a bien été modifiée.`;
          res.json({ message, data: alert });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `L'alerte n'a pas pu être modifiée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
