const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../auth/auth");
const { Company } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/companies", auth, (req, res) => {
    Company.create({
      companyName: req.body.companyName,
      country: req.body.country,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      postalCode: req.body.postalCode,
      companyLogo: req.body.companyLogo,
    })
      .then((company) => {
        const message = `L'entreprise ${company.companyName} a bien été ajouté`;

        res.json({ message, data: company });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `L'entreprise n'a pas pu être ajouté. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
