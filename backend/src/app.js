const express = require("express");
const connectDB = require("./config/connectDB");
const User = require("./models/user.model");
const { validateSignup } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("You have entered the wrong password !");
    }
    const token = await jwt.sign({ _id: user._id }, "ashritj2oss");
    console.log(token);
    // res.cookie("token", "ravi");
    res.cookie("token", token);
    res.send("User logged in successfully");
  } catch (error) {
    res.status(401).send(error.message);
  }
});

app.get("/profile", async (req, res) => {
  console.log("Profile api called");
  const cookie = req.cookies;
  console.log("cookies received from postman", cookie.token);
  const decode = await jwt.verify(cookie.token, "ashritj2oss");
  console.log("decoded", decode);
  console.log("cookie", cookie); // i will get undefined for this i need to install the cookie parser middlewar
  res.send("User profile fetched.");
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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  // console.log("UserId receive from the header" + userId);
  const data = req.body;
  try {
    const allowedUpdates = [
      "password",
      "gender",
      "shortBio",
      "skills",
      "profileUrl",
    ];
    if (data?.skills.length > 10) {
      console.log("Error skills can't be more than 10");
      throw new Error("Skills can't be more than 10");
    }

    const isAllowed = Object.keys(data).every((val) =>
      allowedUpdates.includes(val)
    );

    console.log("fileds that are allowed for upadet", isAllowed);

    if (!isAllowed) {
      throw new Error("Unable to update the user data");
      // res.status(400).send("Unable to update the data");
      //  if i will writhe this line then i get this erro: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client because our catch block has been already send the error to the client and we are sending error twice so make sure try to send the single response is try block and single res send in the catch block
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    console.log("user here", user);

    if (!user) {
      res.send("Unable to update the data");
    }

    res.send("User data updated successfully");
  } catch (error) {
    res.status(401).send("Data is not updated");
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
