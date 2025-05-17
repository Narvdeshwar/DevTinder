const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validator(val) {
        if (validator.isStrongPassword(val)) {
          throw new Error("Password is not strong!");
        }
      },
    },
    gender: {
      type: String,
      validate(val) {
        if (!["male", "female", "others"].includes(val)) {
          throw new Error("Select gender either male,female or others");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 85,
    },
    shortBio: {
      type: String,
      default: "This is user default bio",
    },
    skills: {
      type: [String],
    },
    profileUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "ashritj2oss", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.verifyPassword = async function (userInputPassword) {
  const user = this;
  const isValidPassword = await bcrypt.compare(
    userInputPassword,
    user.password
  );
  return isValidPassword;
};
module.exports = mongoose.model("User", userSchema);
