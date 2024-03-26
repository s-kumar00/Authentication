const nodemailer = require("nodemailer");

// let testAccount = await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendMail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendMail;
