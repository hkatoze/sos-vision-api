const { Sequelize, DataTypes } = require("sequelize");
const EmployeeModel = require("./models/Employee");
const CompanyModel = require("./models/Company");
const AlertModel = require("./models/Alert");
const UserModel = require("./models/User");
const EmployeeAlertModel = require("./models/EmployeeAlert");
 

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
const EmployeeAlert = EmployeeAlertModel(sequelize, DataTypes);
const Employee = EmployeeModel(sequelize, DataTypes);
const Company = CompanyModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Alert = AlertModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync().then((_) => {
    console.log(`La base de données a bien été initialisée !`);
  });
};
module.exports = { initDb, User, Employee, Company, Alert, EmployeeAlert };
