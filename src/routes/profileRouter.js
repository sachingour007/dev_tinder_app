const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/authMiddleware");
const { validatUpdateDetails } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "user details", data: user });
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validatUpdateDetails(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

module.exports = profileRouter;
