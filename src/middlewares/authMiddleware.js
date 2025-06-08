const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid Token!!");
    }

    const decodedToken = await jwt.verify(token, "SachDev@123456789");
    const loggedUser = await User.findById(decodedToken._id);
    if (!loggedUser) {
      throw new Error("User does not exist");
    }
    req.user = loggedUser;
    next();
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
};

module.exports = { userAuth };
