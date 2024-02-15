const { Sequelize, DataTypes } = require("sequelize");
const alertModel = require("./Alert.js");
const employeeModel = require("./Employee.js");
const validRoles = ["USER", "ADMIN"];
const validAlertsType = ["GENERAL", "NEED HELP"];
const validAlertsStatus = ["IN PROGRESS", "IN DANGER", "SAFE"];

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

const Alert = sequelize.define(
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
      validate: {
        notEmpty: { msg: "Le status de l'alerte est requis" },
        notNull: { msg: "Le status de l'alerte est requis" },
        isAlertStatusValid(value) {
          if (!validAlertsStatus.includes(value)) {
            throw new Error(
              `Le statut de l'alerte doit appartenir à la liste suivante [${validAlertsStatus}]`
            );
          }
        },
      },
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
  },
  { timestamp: true }
);

const Employee = sequelize.define(
  "Employee",
  {
    employeeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: { msg: "Le firsname est requis" },
        notNull: { msg: "Le firsname est requis" },
      },
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: { msg: "Le lastname est requis" },
        notNull: { msg: "Le lastname est requis" },
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: { msg: "Le numéro de téléphone est requis" },
        notNull: { msg: "Le numéro de téléphone est requis" },
      },
    },
    profilUrl: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: {
          msg: "L'image de profil de l'employé est requis",
        },
        notNull: {
          msg: "L'image de profil de l'employé est requis",
        },
      },
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: {
          msg: "Le job de l'employé est requis",
        },
        notNull: {
          msg: "Le job de l'employé est requis",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isRoleValid(value) {
          if (!validRoles.includes(value)) {
            throw new Error(
              `Le role de l'utilisateur doit appartenir à la liste suivante [${validRoles}]`
            );
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          ],
          msg: "Le mot de passe doit être formé d'au moins 8 caractères, avoir au moins une lettre majuscule,au moins une lettre miniscule, au moins un caractère spécial et au moins un chiffre.",
        },
        notEmpty: { msg: "Le mot de passe est requis." },
        notNull: { msg: "Le mot de passe est requis." },
      },
    },

    tokens: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamp: true }
);

const EmployeeAlert = sequelize.define(
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

module.exports = { EmployeeAlert, Alert, Employee };
