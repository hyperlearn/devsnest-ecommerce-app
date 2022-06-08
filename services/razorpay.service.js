const Razorpay = require('razorpay');
const { rzpKeyId, rzpKeySecret} = require('../config');

console.log(rzpKeyId, rzpKeySecret)

var rzp = new Razorpay({
  key_id: rzpKeyId,
  key_secret: rzpKeySecret,
});

module.exports = rzp;