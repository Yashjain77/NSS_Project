const express = require("express");
const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Donation = require("../models/Donation");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* CREATE DONATION ORDER */
router.post("/create", auth("user"), async (req, res) => {
  const { amount } = req.body;

  if (amount < 50) {
    return res.status(400).json({ msg: "Minimum donation is ₹50" });
  }

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR"
  });

  await Donation.create({
    userId: req.user.id,
    amount,
    razorpay_order_id: order.id,
    status: "CREATED"
  });

  res.json(order);
});

/* VERIFY PAYMENT */
router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expected = crypto
    .createHmac("sha256", process.env.RZP_SECRET)
    .update(body)
    .digest("hex");

  if (expected === razorpay_signature) {
    await Donation.findOneAndUpdate(
      { razorpay_order_id },
      {
        razorpay_payment_id,
        razorpay_signature,
        status: "SUCCESS"
      }
    );
    return res.json({ success: true });
  }

  await Donation.findOneAndUpdate(
    { razorpay_order_id },
    { status: "FAILED" }
  );

  res.status(400).json({ success: false });
});
router.post("/failed", async (req, res) => {
  try {
    const { order_id } = req.body;

    if (!order_id) {
      return res.status(400).json({ msg: "Order ID required" });
    }

    await Donation.findOneAndUpdate(
      { razorpay_order_id: order_id },
      { status: "FAILED" }
    );

    res.json({ msg: "Payment marked as failed" });
  } catch (err) {
    console.error("PAYMENT FAILED UPDATE ERROR:", err);
    res.status(500).json({ msg: "Failed to update payment status" });
  }
});

/* USER DONATION HISTORY */
router.get("/my", auth("user"), async (req, res) => {
  const donations = await Donation.find({ userId: req.user.id })
    .sort({ createdAt: -1 });

  res.json(donations);
});

module.exports = router;
