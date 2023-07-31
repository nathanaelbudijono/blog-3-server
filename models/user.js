const mongoose = require("mongoose");

const Username = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const collection = mongoose.model("collection", Username);
module.exports = collection;
