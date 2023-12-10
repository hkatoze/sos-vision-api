const { Company } = require("../db/sequelize");
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

        res.json({ message, data: companies });
      })
      .catch((error) => {
        const message = `La liste complète des entreprises n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
