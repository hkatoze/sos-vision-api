const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();
async function sendVerificationCode(phone_number, verificationCode) {
  const client = new twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  return client.messages
    .create({
      body: `Votre code de vérification VBS-SOS est ${verificationCode}`,
      to: `+226${phone_number}`,
      from: process.env.PHONE_NUMBER,
    })
    .then((message) => console.log(message, "Message envoyé"))
    .catch((error) => console.log(error, "Impossible d'envoyer le message"));
}

module.exports = { sendVerificationCode };
