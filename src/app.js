const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");

//Middlewares

app.use(express.json());
app.use(cookieParser());

//Routers

app.use("/", authRouter);
app.use("/", profileRouter);

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
