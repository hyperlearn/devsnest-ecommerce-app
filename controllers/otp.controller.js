const { sendSMS} = require("../services/sms.service");
const { getRedis } = require('../services/redis.service');

const createOtp = async (req, res) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const { phoneNumber } = req.body;

  const redisClient = await getRedis();
  await redisClient.set("otp-"+phoneNumber, otp , { EX: 30});
// try {
//   await redisClient.sendCommand(['SETEX', "otp-"+phoneNumber,"40", otp])

// } catch (error) {
//   console.log(error);
// }

  await sendSMS("OTP is " + otp, `+91${phoneNumber}`);
  res.status(200).send({msg: "OTP sent"});
}
// phoneNumber, otp from the user, otp from redis
const validateOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  const redisClient = await getRedis();
  const savedOTP = await redisClient.get("otp-"+phoneNumber);

  console.log(otp, savedOTP);
  if (otp == savedOTP) {
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false });
  }
}

module.exports = {
  createOtp,
  validateOtp
};