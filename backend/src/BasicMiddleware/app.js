const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.get("/admin/getAllUser", adminAuth, (req, res) => {
  res.send("All user data is received");
});

app.delete("/admin/delete", adminAuth, (req, res) => {
  res.send("One user data is get deleted");
});

app.post("/user/login", (req, res) => {
  res.send("Login api has been triggered");
});
app.get("/user/getAllUser", userAuth, (req, res) => {
  res.send("User data received");
});
app.get("/user/deleteUser", userAuth, (req, res) => {
  res.send("deleted the user profile");
});

app.listen(8000, () => {
  console.log(`Server is ruunning on http://localhost/8000`);
});
