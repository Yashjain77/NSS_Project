const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  phone: { type: String, required: true },
  occupation: { type: String, required: true },

  registeredAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
