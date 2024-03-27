const validAlertsType = ["GENERAL", "NEED HELP"];
const validAlertsStatus = ["IN PROGRESS", "IN DANGER", "SAFE"];

module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Alert",
    {
      alertId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "L'id de la companie est requis" },
          notNull: { msg: "L'id de la companie est requis" },
        },
      },

      alertType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le type de l'alerte est requis" },
          notNull: { msg: "Le type de l'alerte est requis" },
          isAlertTypeValid(value) {
            if (!validAlertsType.includes(value)) {
              throw new Error(
                `Le type de l'alerte doit appartenir à la liste suivante [${validAlertsType}]`
              );
            }
          },
        },
      },
      message: {
        type: DataTypes.STRING,
      },

      alertStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      alertDatetime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      alertLocation: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La localisation de l'alerte est requise" },
          notNull: { msg: "La localisation de l'alerte est requise" },
        },
      },

      initialStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      finalStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      updateBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamp: true }
  );
};
