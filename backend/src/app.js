const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.send("testing")
});

app.listen(8000, () => {
  console.log("server is running over the port 8000");
});
