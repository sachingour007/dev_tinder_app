const express = require("express");
const { validationSingupData } = require("../utils/validation");
const { User } = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/authMiddleware");
const USER_SAFE_DATA = "firstName lastName photoUrl gender age about skills";

//Sign-up API
authRouter.post("/signup", async (req, res) => {
  try {
    //Validation
    validationSingupData(req);
    const { firstName, lastName, emailId, password, age, gender } = req.body;

    //hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
    });

    const token = await user.getJwt();
    res.cookie("token", token, {
      // secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 3600000),
    });

    const signUser = await user.save();
    res.send({ res: "user saved Succesfully!", signUser });
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

//login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const userDetails = await User.findOne({ emailId });

    if (!userDetails) {
      return res.status(401).send({ error: "Invalid credentials !!" });
    }
    const isValidPassword = await userDetails.validatePassword(password);

    if (!isValidPassword) {
      return res.status(401).send({ error: "Invalid credentials !!" });
    }
    const token = await userDetails.getJwt();
    res.cookie("token", token, {
      // secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 3600000),
    });

    const user = {
      id: userDetails._id,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      photoUrl: userDetails.photoUrl,
      gender: userDetails.gender,
      age: userDetails.age,
      about: userDetails.about,
      skills: userDetails.skills,
    };
    res.json({
      user,
    });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong on the server" });
  }
});

//Logout API
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    // secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "User logout successful!" });
});

//Delete Api
authRouter.delete("/user", async (req, res) => {
  const id = req.body.id;
  try {
    const user = await user.findByIdAndDelete(id);
    await User.findByIdAndDelete({ _id: id });
    res.send(" User Deleted Successfully!");
  } catch (error) {
    res.status(404).send("Somthing Went Wrong!");
  }
});

module.exports = authRouter;
