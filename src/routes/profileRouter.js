const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/authMiddleware");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "user details", data: user });
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

module.exports = profileRouter;
