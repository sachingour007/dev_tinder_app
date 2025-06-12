const express = require("express");
const { validationSingupData } = require("../utils/validation");

const { User } = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/authMiddleware");

//Sign-up Api
authRouter.post("/singup", async (req, res) => {
  try {
    //Validation
    validationSingupData(req);
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      skills,
      photoUrl,
      about,
    } = req.body;

    //hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      skills,
      photoUrl,
      about,
    });
    await user.save();
    res.send({ res: "user saved Succesfully!", user });
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

//login Api

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const userDetails = await User.findOne({ emailId });
    if (!userDetails) {
      throw new Error("Invalid Credentials !!");
    }
    const isValidPassword = await userDetails.validatePassword(password);

    if (!isValidPassword) {
      throw new Error("Invalid Credentials !!");
    }

    const token = await userDetails.getJwt();
    res.cookie("token", token, {
      secure: true,
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.send({ res: "Login sucessfully" });
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("User logout Successfull !!");
});

//Get Api

authRouter.get("/user", userAuth, async (req, res) => {
  try {
    const user = await User.find();
    res.send({ res: "User get Succesfully", user });
  } catch (error) {
    res.status(404).send("Somthing Went Wrong!");
  }
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

//Update API
authRouter.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["age", "gender", "skills", "photoUrl", "about"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed!");
    }

    if (data?.skills.length > 5) {
      throw new Error("Skills cannot be more than 5");
    }

    const newUser = await User.findByIdAndUpdate({ _id: id }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send({ res: " User Update Successfully!", newUser });
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

module.exports = authRouter;
