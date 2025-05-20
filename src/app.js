const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const { adminAuth, userAuth } = require("./middlewares/authMiddleware");

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
