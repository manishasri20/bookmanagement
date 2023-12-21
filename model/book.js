const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  book_name: { type: String, default: null },
  tittle: { type: String, default: null },
  status: { type: Boolean, default:true },
  created_at: { type: Date,default:Date.now },
});

module.exports = mongoose.model("book", bookSchema);