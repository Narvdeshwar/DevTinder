const express = require("express");
const connectDB = require("./config/connectDB");
const User = require("./models/user.model");
const { validateSignup } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./Auth/auth");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// API for USER SIGNUP
app.post("/signup", async (req, res) => {
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

// API for login the user
app.post("/login", async (req, res) => {
  console.log("login api called");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User doesn't exit kindly create account.");
    }
    const isValidPassword = await user.verifyJWT(password);
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

app.get("/connectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("coonection", user);
  res.send("connection request received");
});

connectDB()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(8000, () => {
      console.log("Server is running on the port 8000");
    });
  })
  .catch((err) => {
    console.log(
      "Unable to connect with database Kindly contact Administartor.",
      err
    );
  });
