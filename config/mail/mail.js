const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const client = new google.auth.OAuth2({
  clientId: process.env.MAIL_CLIENT_ID,
  clientSecret: process.env.MAIL_CLIENT_SECRET,
  redirectUri: process.env.MAIL_REDIRECT_URL,
});

client.setCredentials({
  refresh_token: process.env.MAIL_REFRESH_TOKEN,
});

const sendMail = async (htmlText, email) => {
  try {
    const ACCESS_TOKEN = await client.getAccessToken();

    const transportMail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: "aamustedresults@gmail.com",
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "aamustedresults@gmail.com",
      to: [email],
      subject: "AAMUSTED",
      text: "AAMUSTED",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
      <style>

      html{
        font-family:'Open Sans',sans-serif !important;
        font-size:15px;
      } 
      </style>
  </head>
      <body style='font-family:"Open Sans",sans-serif;background-color:whitesmoke;padding:20px;color:#333;'>
      ${htmlText}
      </body>
      </html>
      
      `,
      // attachments: [{ filename: "me.pdf", path: "./me.pdf" }],
    };

    const mailResult = await transportMail.sendMail(mailOptions);
    // console.log(mailResult);
  } catch (error) {
    throw error.message;
  }
};

module.exports = sendMail;
