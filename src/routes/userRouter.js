const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/authMiddleware");
const ConnectionRequestModel = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "gender",
      "age",
      "about",
    ]);

    res.json({ message: "Data Fatch Successfully", connectionRequests });
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

module.exports = userRouter;
