const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/authMiddleware");

// app.use("/user", [rh1, rh2, rh3, rh4])

//we can wrap in array also it will give same result.

// app.use("/user", [
//   (req, res, next) => {
//     //Route Hander
//     console.log("route Handler");
//     next();
//   },
//   (req, res) => {
//     console.log("route Handler 2");
//     res.send("2nd respond!!");
//   },
// ]);

// app.use(
//   "/singleUser",
//   (req, res, next) => {
//     //Route Hander
//     console.log("route Handler");
//     next();
//   },
//   (req, res, next) => {
//     console.log("route Handler 2");
//     res.send("final response !! 2");
//   },
//   (req, res, next) => {
//     console.log("route Handler 3");
//     next();
//   },
//   (req, res, next) => {
//     console.log("route Handler 4");
//   }
// );

/*
//Different Way

app.use("/admin", (req, res, next) => {
  const passKey = "xyz";
  const isAuthenticated = "xy" === passKey;

  if(!isAuthenticated){
    res.status(401).send("You are not admin")
  }else{
    next()
  }
});
*/

// this admin Auth Middleware secure the all "/admin" route.
app.use("/admin", adminAuth);

app.get("/admin/allUser", (req, res) => {
  res.send("admin user requst sent");
});

app.use("/user/login", (req, res) => {
  res.send("login sucessfully");
});

app.use("/user", userAuth, (req, res) => {
  res.send("user Data");
});

app.listen(8080, () => {
  console.log("Hey i am Working on 8080");
});
