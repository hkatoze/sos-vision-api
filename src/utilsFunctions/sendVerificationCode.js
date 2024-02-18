const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
async function sendVerificationCode(phone_number, verificationCode) {
  try {
    const url = "https://www.aqilas.com/api/v1/sms";
    const headers = {
      "X-AUTH-TOKEN": process.env.AUTH_TOKEN,
      "Content-Type": "application/json",
    };

    const data = {
      from: "VBS-SOS",
      text: `Code de confirmation: ${verificationCode}`,
      to: [`+226${phone_number}`],
    };

    const response = await axios.post(url, data, { headers });

    return response.data;
  } catch (error) {
    console.error("Impossible d'envoyer le message:", error);
  }
}

module.exports = { sendVerificationCode };
