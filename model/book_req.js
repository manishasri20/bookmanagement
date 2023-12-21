const mongoose = require("mongoose");

const bookreqSchema = new mongoose.Schema({
  book_name: { type: String, default: null },
  book_id: { type: mongoose.Types.ObjectId, default: null },
  user_id: {  type: mongoose.Types.ObjectId, default: null },
  username:{ type: String, default: null},
  email:{ type: String, default: null},
  status:{type:Number,default:null},
  created_at: { type: Date,default:Date.now },
});

module.exports = mongoose.model("book_request", bookreqSchema);