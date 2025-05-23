const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    toUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    fromUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "rejected", "accepted", "ignored"],
        message: "{VALUE} is not a valid status type",
      },
    },
  },
  { timestamps: true }
);
requestSchema.index({ toUserId: 1, fromUserId: 1 });

module.exports = mongoose.model("ConnectionRequest", requestSchema);
