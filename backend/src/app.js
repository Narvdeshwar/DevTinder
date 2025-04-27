const express = require("express");

const app = express();

app.get("/admin/getAllUser", (req, res) => {
  let token = "xyz1";
  if (token === "xyz") {
    res.send("All user data is received");
  } else {
    res.status(401).send("User is not authriosed.");
  }
});

app.delete("/admin/delete", (req, res) => {
  let token = "xyz1";
  if (token === "xyz") res.send("One user data is get deleted");
  else res.status(401).send("User is not authriosed.");
});

app.listen(8000, () => {
  console.log(`Server is ruunning on http://localhost/8000`);
});
