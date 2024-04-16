const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true, // Ensure phone numbers are unique
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
