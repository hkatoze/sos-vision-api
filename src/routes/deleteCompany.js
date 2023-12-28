const { Company } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/companies/:companyId", auth, (req, res) => {
    const id = req.params.companyId;

    Company.findByPk(id)
      .then((company) => {
        if (company === null) {
          const message = `L'entreprise n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        return company.destroy({ where: { companyId: id } }).then((_) => {
          const message = `L'entreprise ${company.companyName} a bien été supprimé.`;
          res.json({ message, data: company });
        });
      })
      .catch((error) => {
        const message = `L'entreprise n'a pas pu être supprimé. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
