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
      country: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: { msg: "Le pays de l'entreprise est requis" },
          notNull: { msg: "Le pays de l'entreprise est requis" },
        },
      },
      streetAddress: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: { msg: "La ville de l'entreprise est requise" },
          notNull: { msg: "La ville de l'entreprise est requise" },
        },
      },
      postalCode: {
        type: DataTypes.STRING,
      },

      companyLogo: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: { msg: "Le logo de l'entreprise est requis" },
          notNull: { msg: "Le logo de l'entreprise est requis" },
        },
      },
    },
    { timestamp: true }
  );
};
