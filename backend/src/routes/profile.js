const express = require("express");
const { userAuth } = require("../auth/auth");
const {
  validateProfileUpdate,
  validateStrongPassword,
} = require("../utils/validate");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const currentUser = req.user;
    res.status(200).json({ currentUser });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided to update." });
    }

    const isValid = validateProfileUpdate(updateData);
    if (!isValid) {
      return res
        .status(400)
        .json({ message: "Only allowed fields can be updated." });
    }

    const user = req.user;
    Object.keys(updateData).forEach((key) => {
      user[key] = updateData[key];
    });

    await user.save();

    res.status(200).json({
      message: `${user.firstName}, your profile has been updated successfully.`,
    });
  } catch (error) {
    console.error("Profile update error:", error.message);
    res
      .status(500)
      .json({ error: "Something went wrong while updating profile." });
  }
});

profileRouter.patch("/profile/editpassword", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = req.user;

    const isValidOldPassword = await user.verifyPassword(oldPassword);

    if (!isValidOldPassword) {
      throw new Error("Old password is incorrect!");
    }

    validateStrongPassword(newPassword);

    if (oldPassword === newPassword) {
      throw new Error("Old and new password can't same!");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ message: "Your password updated successfully!" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = profileRouter;
