const express = require("express");
const { userAuth } = require("../auth/auth");
const ConnectionRequest = require("../models/requestconnection.model.js");
const User = require("../models/user.model.js");
const RequestRouter = express.Router();

RequestRouter.post("/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const status = req.params?.status;
    const toUserId = req.params?.userId;
    const fromUserId = req.user._id;
    const canRequest = ["interested", "ignored"];

    // checking the valid request user
    const isValidToUser = await User.findOne({ _id: toUserId });
    if (!isValidToUser) {
      throw new Error("Requested user doesn't exits.");
    }
    if (!canRequest.includes(status)) {
      throw new Error("Invalid request type : " + status);
    }

    // checking whether i am sending to request my self
    if (toUserId == fromUserId) {
      throw new Error("You can't send request to  yourself.");
    }

    // checking if the request is already present
    const isRequestAlreadyPresent = await ConnectionRequest.findOne({
      $or: [
        { toUserId, fromUserId },
        { toUserId: fromUserId, fromUserId: toUserId },
      ],
    });
    // TODO
    // pending of testing when the first user has send the request to second user the second user unable to send the request to first user
    if (isRequestAlreadyPresent) {
      throw new Error("The request is already send!");
    }

    const connectionRequest = new ConnectionRequest({
      toUserId,
      fromUserId,
      status,
    });

    await connectionRequest.save();
    res.send(connectionRequest);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = { RequestRouter };
