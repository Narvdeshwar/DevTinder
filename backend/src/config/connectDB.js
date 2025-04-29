const mongoose = require("mongoose");

const connectDB = async () =>
  await mongoose.connect(
    "mongodb+srv://narvdeshwar:<password>@fordevtinder.q1qhjzh.mongodb.net/devTinder"
  );

module.exports = connectDB;
