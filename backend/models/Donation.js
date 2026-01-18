const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, min: 50 },
  currency: { type: String, default: "INR" },

  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,

  status: {
    type: String,
    enum: ["CREATED", "SUCCESS", "FAILED", "PENDING"],
    default: "CREATED"
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", DonationSchema);
