const { sendSMS} = require("../services/sms.service");

const createOtp = async (req, res) => {
  const otp = '1122';
  const someuser = "+919415751180";

  await sendSMS("OTP is " + otp, someuser);
  res.status(200).send({msg: "success"});
}

module.exports = {
  createOtp,
};