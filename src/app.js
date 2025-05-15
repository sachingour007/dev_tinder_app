const express = require("express");
const app = express();

// app.use("/user", [rh1, rh2, rh3, rh4])

//we can wrap in array also it will give same result.

app.use("/user", [
  (req, res, next) => {
    //Route Hander
    console.log("route Handler");
    next();
  },
  (req, res) => {
    console.log("route Handler 2");
    res.send("2nd respond!!");
  },
]);

app.use(
  "/singleUser",
  (req, res, next) => {
    //Route Hander
    console.log("route Handler");
    next();
  },
  (req, res, next) => {
    console.log("route Handler 2");
    res.send("final response !! 2");
  },
  (req, res, next) => {
    console.log("route Handler 3");
    next();
  },
  (req, res, next) => {
    console.log("route Handler 4");
  }
);

app.listen(8080, () => {
  console.log("Hey i am Working on 8080");
});
