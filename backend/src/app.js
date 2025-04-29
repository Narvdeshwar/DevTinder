const express = require("express");
const connectDB = require("./config/connectDB");
const User = require("./models/user.model");
const app = express();

app.use(express.json());
// signup api

app.post("/signup", async (req, res) => {
  
  try {
    const user = new User(req.body);
    console.log("sending the user data", user);
    const data = await user.save();
    res
      .status(201)
      .json({ message: "You have successfully SignUp", data: data });
  } catch (error) {
    res.status(500).send("Unable to send the data", error.message);
  }
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
