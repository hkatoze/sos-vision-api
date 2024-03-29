const bodyParser = require("body-parser");
const express = require("express");
const { initDb } = require("./src/db/sequelize");
const favicon = require("serve-favicon");
const cors = require("cors");
const admin = require("firebase-admin");
const firebase_service_account = require("./src/auth/firebase_private_key.json");

admin.initializeApp({
  credential: admin.credential.cert(firebase_service_account),
});

const app = express();
const port = process.env.PORT || 3000;
app
  .use(cors({ origin: "*" }))
  .use(bodyParser.json())
  .use(favicon(__dirname + "/favicon.ico"));
initDb();

require("./src/routes/home")(app);
//Reset password
require("./src/routes/resetPassword")(app);

//Reset password code checking
require("./src/routes/resetPasswordCodeVerify")(app);

/* ============USER ROUTES============= */
//Get user by id
require("./src/routes/getUserByPk")(app);
//Update user
require("./src/routes/updateUser")(app);
/* ============EMPLOYEE ROUTES============= */
//Fetch all employees
require("./src/routes/getAllEmployees")(app);
//Get employee by id
require("./src/routes/getEmployeeByPk")(app);
//Create employee
require("./src/routes/createEmployee")(app, admin);
//Delete employee
require("./src/routes/deleteEmployee")(app);
//Update employee
require("./src/routes/updateEmployee")(app);
/* ============COMPANIES ROUTES============= */
//Fetch all companies
require("./src/routes/getAllCompanies")(app);
//Get company by id
require("./src/routes/getCompanyByPk")(app);
//Create company
require("./src/routes/createCompany")(app);
//Delete company
require("./src/routes/deleteCompany")(app);
//Update company
require("./src/routes/updateCompany")(app);

/* ============API AUTH ROUTES============= */
//signup to API
require("./src/routes/signupToApi")(app);
//Login to API
require("./src/routes/loginToApi")(app);

/* ============MOBILE APP USES CASES ROUTES============= */
require("./src/routes/login")(app, admin);
require("./src/routes/createAlert")(app, admin);
require("./src/routes/getAllAlerts")(app);
require("./src/routes/getAllEmployeeAlerts")(app);
require("./src/routes/getAlertByPk")(app);
require("./src/routes/updateAlert")(app, admin);

//404 error managment
app.use(({ res }) => {
  const message = `Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.`;
  res.status(404).json({ message });
});

app.listen(port, () => {
  console.log(`Notre api a démaré sur : http://localhost:${port}`);
});

module.exports = app;
