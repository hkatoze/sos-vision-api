const validRoles = ["USER", "ADMIN"];

module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
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
    },
    { timestamp: true }
  );
};
