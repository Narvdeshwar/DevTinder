const mongoose = require("mongoose");

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
    },
    gender: {
      type: String,
      required: true,
      validate(val) {
        if (!["male", "female", "others"].includes(val)) {
          throw new Error("Select gender either male,female or others");
        }
      },
    },
    age: {
      type: Number,
      required: true,
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

module.exports = mongoose.model("User", userSchema);
