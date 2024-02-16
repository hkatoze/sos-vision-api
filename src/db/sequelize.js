const { Sequelize, DataTypes } = require("sequelize");
const EmployeeAlertModel = require("./models/EmployeeAlert");
const CompanyModel = require("./models/Company");
const AlertModel = require("./models/Alert");
const EmployeeModel = require("./models/Employee");

const UserModel = require("./models/User");

const sequelize = new Sequelize(
  "u833159023_sos_vision",
  "u833159023_harounakinda",
  "Kind@1404",
  {
    host: "vbs-solutions.com",
    dialect: "mysql",
    dialectOptions: {},
    logging: false,
  }
);

const Company = CompanyModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Employee = EmployeeModel(sequelize, DataTypes);
const Alert = AlertModel(sequelize, DataTypes);
const EmployeeAlert = EmployeeAlertModel(sequelize, DataTypes);
//Assigné les clés secondaires
EmployeeAlert.belongsTo(Employee, {
  foreignKey: "employeeId",
});
EmployeeAlert.belongsTo(Alert, { foreignKey: "alertId" });

const initDb = () => {
  return sequelize.sync().then((_) => {
    console.log(`La base de données a bien été initialisée !`);
  });
};
module.exports = { initDb, User, Employee, Company, Alert, EmployeeAlert };
