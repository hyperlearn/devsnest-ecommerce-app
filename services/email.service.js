const nodemailer = require("nodemailer");

let testAccount;
let transporter;
(async () => {
  
  testAccount = await  nodemailer.createTestAccount()
  console.log("Got Test Account")
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    },
  });
})();


const sendEmail = async ({ to, subject, text, html }) => {
  const info = await transporter.sendMail({
    from: "no-reply@devsnest.com",
    to, subject, html, text
  });

  console.log("Message sent: ", info.messageId);

  console.log("You can Preview it here: ", nodemailer.getTestMessageUrl(info));
}

module.exports = {
  sendEmail
};