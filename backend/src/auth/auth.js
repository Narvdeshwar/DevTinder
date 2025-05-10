const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuth = async (req, res, next) => {
  try {
    // 1. Extract token from cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Token missing, please login again");
    }

    // 2. Verify token
    const decodedData = await jwt.verify(token, "ashritj2oss");
    console.log("Verified token", decodedData);

    // 3. Get user from DB
    const user = await User.findById(decodedData._id);
    if (!user) {
      return res.status(404).send("User doesn't exist");
    }

    // 4. Attach user to request object
    req.user = user;

    // 5. Call next middleware
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).send("Unauthorized: " + error.message);
  }
};

module.exports = { userAuth };
