const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    fromRequest: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    toRequest: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    statusType: {
      type: String,
      enum: {
        values: ["interseted", "rejected", "accepted", "ignored"],
        message: "{VALUE} is not a valid status type",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
