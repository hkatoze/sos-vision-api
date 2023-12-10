module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("<center>Api SOS VISION déployé avec succès😊</center>");
  });
};
