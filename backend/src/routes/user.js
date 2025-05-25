const express = require("express");
const { userAuth } = require("../auth/auth");
const ConnectionRequest = require("../models/requestconnection.model");

const userRouter = express.Router();

userRouter.get("/user/request/pending", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const pendingRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName skills profileUrl");

    if (!pendingRequests.length) {
      return res.status(200).json({
        message: `Hi, ${loggedInUser.firstName}! There are no pending requests.`,
        data: [],
      });
    }

    return res.status(200).json({
      message: `You have ${pendingRequests.length} pending request(s).`,
      data: pendingRequests,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = { userRouter };
