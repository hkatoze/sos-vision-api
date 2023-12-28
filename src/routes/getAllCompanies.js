const { Company, Alert } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/companies", auth, (req, res) => {
    if (req.query.search) {
      const searchQuery = req.query.search;

      return Company.findAll({
        where: {
          companyName: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
      }).then((companies) => {
        const message = `La recherche pour ${searchQuery} a trouvé ${companies.length} résultats`;
        res.json({ message, data: companies });
      });
    }
    Company.findAll()
      .then((companies) => {
        const message = `La liste complète des entreprises a bien été reccupérée.`;

        let companiesAlerts = [];
        for (i = 0; i < companies.length; i++) {
          Alert.findAll({ where: { companyId: companies[i].companyId } }).then(
            (alerts) => {
              companiesAlerts.push(alerts.length);
            }
          );
        }

        res.json({ message, data: companies, alertNumber: companiesAlerts });
      })
      .catch((error) => {
        const message = `La liste complète des entreprises n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
