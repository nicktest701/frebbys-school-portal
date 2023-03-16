const axios = require("axios");

const sendSMS = async (body, telephoneNumber) => {
  try {
    // SEND SMS
    const message = `${body?.title}
    ${body?.message}`;

    const data = {
      sender: "FrebbyTech",
      message,
      recipients: telephoneNumber,
    };

    const res = await axios({
      method: "POST",
      url: process.env.SMS_URL,
      headers: {
        "api-key": process.env.SMS_API_KEY,
      },
      data: data,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error("Error sending message.Try again later");
  }
};

module.exports = sendSMS;
