const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  created_at: { type: Date,default:Date.now },

});

module.exports = mongoose.model("user", userSchema);