const validator = require("validator");

const validationSingupData = (req) => {
  const { firstName, lastName, emailId, password, skills, gender, age } =
    req.body;

  if (!firstName || !lastName || !emailId || !password || !age || !gender) {
    throw new Error("Please Enter require Details");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please Enter valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  } else if (skills.lenght > 5) {
    throw new Error("Please enter skills below 5");
  }
};

const validatUpdateDetails = (req) => {
  const { firstName, lastName, skills, gender, age, about, photoUrl } =
    req.body;

  const isFieldsEmpty = Object.values(req.body).some(
    (val) => val === "" || val === undefined || val === null
  );

  if (isFieldsEmpty) {
    throw new Error("Empty Fields Not Accepted !");
  }

  const allowedEditFields = [
    "firstName",
    "lastName",
    "skills",
    "gender",
    "age",
    "about",
    "photoUrl",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validationSingupData, validatUpdateDetails };
