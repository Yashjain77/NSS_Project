const Razorpay = require("razorpay");

module.exports = new Razorpay({
  key_id: process.env.RZP_KEY,
  key_secret: process.env.RZP_SECRET
});
