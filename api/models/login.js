const mongoose = require("mongoose");
const Habit = require("./cabbit");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("Login", userSchema);

module.exports = User;
