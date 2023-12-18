const { Sequelize, DataTypes } = require("sequelize");
const EmployeeModel = require("./models/Employee");
const CompanyModel = require("./models/Company");
const AlertModel = require("./models/Alert");
const UserModel = require("./models/User");
const EmployeeAlertModel = require("./models/EmployeeAlert");
const bcrypt = require("bcrypt");
const { books, authors, categories, users } = require("./testData");

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

const Employee = EmployeeModel(sequelize, DataTypes);
const Company = CompanyModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Alert = AlertModel(sequelize, DataTypes);
const EmployeeAlert = EmployeeAlertModel(sequelize, DataTypes);
const initDb = () => {
  return sequelize.sync().then((_) => {
    /*  books.map((book) => {
      Book.create(book).then((book) => {});
    });
    authors.map((author) => {
      Author.create(author).then((author) => {});
    });
    categories.map((category) => {
      Category.create(category).then((category) => {});
    });
    users.map((user) => {
      bcrypt.hash(user.password, 10).then((hash) => {
        User.create({
          emailAddress: user.emailAddress,
          username: user.username,
          password: hash,
          role: user.role,
        }).then((user) => {});
      });
    }); */
    console.log(`La base de données a bien été initialisée !`);
  });
};
module.exports = { initDb, User, Employee, Company, Alert, EmployeeAlert };
