const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  role: { type: String, enum: ['client', 'photographer','admin'], default: 'client' },

});

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };