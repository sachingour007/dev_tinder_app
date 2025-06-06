const validator = require("validator");

const validationSingupData = (req) => {
  const { firstName, lastName, emailId, password, skills } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("Please Enter require Details");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please Enter valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

module.exports = { validationSingupData };
