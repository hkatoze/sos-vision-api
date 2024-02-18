const bcrypt = require("bcrypt");
const { Employee } = require("../db/sequelize");

module.exports = (app) => {
  // Endpoint pour la validation du code de vérification et la modification du mot de passe
  app.post("/api/reset-password-verify", async (req, res) => {
    const { phone_number, verificationCode, newPassword } = req.body;

    try {
      // Vérification si l'utilisateur existe
      const user = await Employee.findOne({ where: { phone_number } });
      if (!user) {
        return res.status(404).json({
          message: "Aucun employé enregistré avec ce numéro.",
        });
      }

      // Vérification du code de vérification
      if (user.resetPasswordCode !== verificationCode) {
        return res
          .status(400)
          .json({ message: "Code de vérification invalide." });
      }

      // Modification du mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordCode = null; // Réinitialisation du code de vérification après utilisation
      await user.save();

      return res.status(200).json({
        message: "Votre mot de passe a été réinitialisé avec succès.",
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la réinitialisation du mot de passe.",
        error,
      });
    }
  });
};
