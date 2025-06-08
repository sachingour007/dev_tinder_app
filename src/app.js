const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const { User } = require("./models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const { validationSingupData } = require("./utils/validation");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/authMiddleware");
app.use(express.json());
app.use(cookieParser());

//Post Api Singup
app.post("/singup", async (req, res) => {
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

//Get Api

app.get("/user", userAuth, async (req, res) => {
  try {
    const user = await User.find();
    res.send({ res: "User get Succesfully", user });
  } catch (error) {
    res.status(404).send("Somthing Went Wrong!");
  }
});

//Delete Api

app.delete("/user", async (req, res) => {
  const id = req.body.id;
  try {
    const user = await user.findByIdAndDelete(id);
    await User.findByIdAndDelete({ _id: id });
    res.send(" User Deleted Successfully!");
  } catch (error) {
    res.status(404).send("Somthing Went Wrong!");
  }
});

//Update Api

app.patch("/user/:id", async (req, res) => {
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

//login Api

app.post("/login", async (req, res) => {
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

//Profile

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

connectDB()
  .then(() => {
    console.log("MongoDB is Connected");
    app.listen(8080, () => {
      console.log("Hey i am Working on 8080");
    });
  })
  .catch((err) => {
    console.log("Database is not Connected", err);
  });
