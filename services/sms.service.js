const { twilio } = require('../config');
const client = require('twilio')(twilio.apiSID, twilio.apiToken);


const sendSMS = async (body, to) => {
  await client.messages.create({body,from: twilio.from,to });
}

module.exports = { sendSMS };