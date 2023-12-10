const { Employee } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/employees", auth, (req, res) => {
    if (req.query.companyId) {
      const company = req.query.companyId;
      const limit = req.query.limit ? parseInt(req.query.limit) : null;

      return Employee.findAndCountAll({
        where: { companyId: company },
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y'a au total ${count} employés inscrit de l'entreprise ${company}`;
        res.json({ message, data: rows });
      });
    }
    if (req.query.role) {
      const role = req.query.role;

      return Employee.findAll({ where: { role: role } }).then((employees) => {
        const message = `Il y'a au total ${employees.length} employés ayant un role ${role}`;
        res.json({ message, data: employees });
      });
    }

    if (req.query.search) {
      const searchQuery = req.query.search;

      return Employee.findAll({
        where: {
          firstname: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
      }).then((employees) => {
        const message = `La recherche pour ${searchQuery} a trouvé ${employees.length} résultats`;
        res.json({ message, data: employees });
      });
    }
    Employee.findAll()
      .then((employees) => {
        const message = `La liste complète des utilisateurs a bien été reccupérée.`;

        res.json({ message, data: employees });
      })
      .catch((error) => {
        const message = `La liste complète des utilisateurs n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
