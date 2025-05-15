const express = require("express");
const { userAuth } = require("../auth/auth");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const currentUser = req.user;
    res.status(200).json({ currentUser });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = profileRouter;
