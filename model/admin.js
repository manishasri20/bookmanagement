const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  admin_email: { type: String, default: null },
  password: {  type: String, default: null },
  pattern:{ type: Number, default: 0},
  created_at: { type: Date,default:Date.now },
});

module.exports = mongoose.model("admin", adminSchema);