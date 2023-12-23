const { Employee, Alert } = require("./path_vers_vos_modeles"); // Assurez-vous d'ajuster le chemin correctement

module.exports = (Sequelize, DataTypes) => {
  const EmployeeAlert = Sequelize.define(
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

  EmployeeAlert.belongsTo(Employee, { foreignKey: "employeeId" });
  EmployeeAlert.belongsTo(Alert, { foreignKey: "alertId" });

  return EmployeeAlert;
};
