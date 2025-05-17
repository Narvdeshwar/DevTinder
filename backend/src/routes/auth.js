const express = require("express");
const { validateSignup } = require("../utils/validate.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  console.log("login api called");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    console.log("current email user", user);
    if (!user) {
      throw new Error("User doesn't exit kindly create account.");
    }
    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      throw new Error("You have entered the wrong password !");
    }
    const token = await user.getJWT();
    console.log(token);
    // res.cookie("token", "ravi");
    res.cookie("token", token);
    res.send("User logged in successfully");
  } catch (error) {
    res.status(401).send(error.message);
  }
});

// API for USER SIGNUP
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignup(req);
    const { firstName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, email, password: hashedPassword });
    const data = await user.save();
    res
      .status(201)
      .json({ message: "You have successfully SignUp", data: data });
  } catch (err) {
    res.status(500).send("Error " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("logout successfully!!");
});

module.exports = authRouter;
