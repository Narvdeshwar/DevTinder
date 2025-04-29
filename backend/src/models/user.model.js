const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required."],
    minLength: [3, "First Name lenght must be greater than 3 charcter."],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
});

module.exports = mongoose.model("User", userSchema);
