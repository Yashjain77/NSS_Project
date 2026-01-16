const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING"
    }
}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);
