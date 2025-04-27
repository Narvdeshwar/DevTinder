const express = require("express");

const app = express();

app.get(
  "/",
  [(req, res, next) => {
    console.log("response will be send from here");
    next();
    res.send("Hi User");
  },
  (req, res) => {
    console.log("test");
  }]
);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
