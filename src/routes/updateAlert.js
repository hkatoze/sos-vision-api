const { Alert } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app, admin) => {
  app.put("/api/alerts/:alertId", auth, (req, res) => {
    const id = req.params.alertId;

    Alert.update(req.body, { where: { alertId: id } })
      .then((_) => {
        return Alert.findByPk(id).then((alert) => {
          if (alert === null) {
            const message = `L'alerte demandée n'existe pas. Réessayer avec un autre identifiant.`;
            return res.status(404).json({ message });
          }

          // Mise à jour des données dans Firestore
          const firestoreDocRef = admin
            .firestore()
            .collection("alert_pivot")
            .doc(`${id}`);
          return firestoreDocRef
            .update(req.body) // Met à jour les données Firestore avec les données du corps de la requête
            .then(() => {
              const message = `L'alert ${alert.alertId} a bien été modifiée.`;
              res.json({ message, data: alert });
            })
            .catch((firebaseError) => {
              const message = `L'alerte a été mise à jour dans la base de données, mais une erreur est survenue lors de la mise à jour dans Firestore. Réessayez dans quelques instants.`;
              res.status(500).json({ message, data: firebaseError });
            });
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
