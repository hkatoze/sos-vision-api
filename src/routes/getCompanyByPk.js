const { Company } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/companies/:id", auth, (req, res) => {
    const id = req.params.companyId;

    Company.findByPk(id)
      .then((company) => {
        if (company === null) {
          const message = `L'entreprise demandée n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        const message = `L'entreprise ${company.companyName} a bien été reccupérée.`;

        res.json({ message, data: company });
      })
      .catch((error) => {
        const message = `L'entreprise n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
