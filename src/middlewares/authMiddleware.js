const adminAuth = (req, res, next) => {
  const passKey = "xyz";
  const isAuthenticated = "xyz" === passKey;
  if (!isAuthenticated) {
    res.status(401).send("You are not admin");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  const passKey = "xy";
  const isAuthenticated = "xyz" === passKey;
  if (!isAuthenticated) {
    res.status(401).send("You are not login");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
