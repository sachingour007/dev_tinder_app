const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const { User } = require("./models/user");
app.use(express.json());

app.post("/singup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user saved Succesfully!");
  } catch (error) {
    console.log(error);
    res.status(404).send("data not Ok");
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
