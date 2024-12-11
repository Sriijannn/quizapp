// backend/models/User.js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  setid: { type: String, required: true, default: "SetA" },
  schoolName: { type: String, required: true },
  student: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
