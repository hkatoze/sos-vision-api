module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "EmployeeAlert",
    {
      employeeAlertId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "L'id de l'employé est requis" },
          notNull: { msg: "L'id de l'employé est requis" },
        },
      },
      alertId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "L'id de l'alerte est requis" },
          notNull: { msg: "L'id de l'alerte est requis" },
        },
      },
    },
    { timestamp: true }
  );
};
