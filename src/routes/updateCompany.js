const { Company } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/companies/:id", auth, (req, res) => {
    const id = req.params.companyId;

    Company.update(req.body, { where: { companyId: id } })
      .then((_) => {
        return Company.findByPk(id).then((company) => {
          if (company === null) {
            const message = `L'entreprise demandée n'existe pas. Réessayer avec un autre identifiant.`;

            return res.status(404).json({ message });
          }
          const message = `L'entreprise ${company.companyName} a bien été modifiée.`;
          res.json({ message, data: company });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `L'entreprise  n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
