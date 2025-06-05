const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const { User } = require("./models/user");
const dotenv = require("dotenv").config();
app.use(express.json());

//Post Api Singup
app.post("/singup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user saved Succesfully!");
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

//Get Api

app.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
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
    });
    res.send({ res: " User Update Successfully!", newUser });
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
