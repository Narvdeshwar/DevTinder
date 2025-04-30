const express = require("express");
const connectDB = require("./config/connectDB");
const User = require("./models/user.model");
const app = express();

app.use(express.json());

// API for USER SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    const data = await user.save();
    res
      .status(201)
      .json({ message: "You have successfully SignUp", data: data });
  } catch (error) {
    res.status(500).send("Unable to send the data", error.message);
  }
});

// API for finding One User
app.get("/user", async (req, res) => {
  const userEmailId = req.body.email;
  try {
    let isEmailExit = await User.findOne({ email: userEmailId });
    if (!isEmailExit) {
      res.send("User doesn't not exits");
    }
    res.send(isEmailExit);
  } catch (error) {
    res.status(401).send("Something happens at server end.");
  }
});

// API for finding the all users
app.get("/feed", async (req, res) => {
  try {
    const allUserFeed = await User.find({});
    if (!allUserFeed) {
      res.send({ message: "Currently no user exits" });
    }
    res.send(allUserFeed);
  } catch (error) {
    res.status(401).send("Something error happens at Server!");
  }
});

// API for updating the user details
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data);
    console.log("user here", user);
    if (!user) {
      res.send("Unable to update the data");
    }
    res.send("User data updated successfully");
  } catch (error) {
    res.status(401).send("Something went wrong");
  }
});

// deleting the user data
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    // console.log("UserId", userId);
    const id = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(401).send("Something went wrong");
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
