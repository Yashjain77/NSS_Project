const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Donation = require("../models/Donation");
const auth = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_S4Wcq3aLFRAqoA",
  key_secret: "utwI5807wrdkg9uB07f9y9Wd"
});

router.post("/create", auth("user"), async (req, res) => {
  const amount = Number(req.body.amount);
  if (amount < 50) return res.status(400).json({ msg: "Min ₹50" });

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

router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sign = crypto
    .createHmac("sha256", "utwI5807wrdkg9uB07f9y9Wd")
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (sign !== razorpay_signature) {
    return res.status(400).json({ msg: "Invalid signature" });
  }

  await Donation.findOneAndUpdate(
    { razorpay_order_id },
    {
      status: "SUCCESS",
      razorpay_payment_id
    }
  );

  res.json({ msg: "Payment verified" });
});

router.post("/failed", async (req, res) => {
  const { order_id } = req.body;

  await Donation.findOneAndUpdate(
    { razorpay_order_id: order_id },
    { status: "FAILED" }
  );

  res.json({ msg: "Marked as failed" });
});

router.get("/my", auth("user"), async (req, res) => {
  const donations = await Donation.find({
    userId: req.user.id
  }).sort({ createdAt: -1 });

  res.json(donations);
});

router.get("/my/total", auth("user"), async (req, res) => {
  const userObjectId = new mongoose.Types.ObjectId(req.user.id);

  const result = await Donation.aggregate([
    {
      $match: {
        userId: userObjectId,
        status: "SUCCESS"
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json({
    totalDonation: result[0]?.total || 0
  });
});


module.exports = router;
