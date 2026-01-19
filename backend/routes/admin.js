const express = require("express");
const User = require("../models/User");
const Donation = require("../models/Donation");
const auth = require("../middleware/authMiddleware");
const { Parser } = require("json2csv");

const router = express.Router();

router.get("/dashboard", auth("admin"), async (req, res) => {
  const users = await User.find({ role: "user" }).lean();

  const donations = await Donation.aggregate([
    { $match: { status: "SUCCESS" } },
    {
      $group: {
        _id: "$userId",
        totalDonated: { $sum: "$amount" }
      }
    }
  ]);

  const donationMap = {};
  donations.forEach(d => {
    donationMap[d._id.toString()] = d.totalDonated;
  });

  const result = users.map(u => ({
    name: `${u.firstName} ${u.lastName}`,
    email: u.email,
    phone: u.phone,
    occupation: u.occupation,
    totalDonated: donationMap[u._id.toString()] || 0
  }));

  result.sort((a, b) => b.totalDonated - a.totalDonated);

  const totalDonation = donations.reduce(
    (sum, d) => sum + d.totalDonated,
    0
  );

  res.json({
    users: result,
    totalDonation
  });
});

router.get("/export", auth("admin"), async (req, res) => {
  const users = await User.find({ role: "user" }).lean();

  const donations = await Donation.aggregate([
    { $match: { status: "SUCCESS" } },
    {
      $group: {
        _id: "$userId",
        totalDonated: { $sum: "$amount" }
      }
    }
  ]);

  const donationMap = {};
  donations.forEach(d => {
    donationMap[d._id.toString()] = d.totalDonated;
  });

  toldata = users.map(u => ({
    Name: `${u.firstName} ${u.lastName}`,
    Email: u.email,
    Phone: u.phone,
    Occupation: u.occupation,
    "Total Donated (INR)": donationMap[u._id.toString()] || 0
  }));

  toldata.sort(
    (a, b) => b["Total Donated (INR)"] - a["Total Donated (INR)"]
  );

  const parser = new Parser();
  const csv = parser.parse(toldata);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=ngo_users_donations.csv"
  );
  res.status(200).send(csv);
});

module.exports = router;
