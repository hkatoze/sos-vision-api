module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Companie",
    {
      companyId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      companyName: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: { msg: "Le nom de l'entreprise est requis" },
          notNull: { msg: "Le nom de l'entreprise est requis" },
        },
      },
    },
    { timestamp: true }
  );
};
