const mongoose = require("mongoose");
var validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
      minLength: 4,
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: 20,
      minLength: 4,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Invalid email address: " + val);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(val) {
        if (!validator.isStrongPassword(val)) {
          throw new Error("Invalid email address: " + val);
        }
      },
    },
    age: {
      type: Number,
      min: [18, "Minimum Age 18 required"],
      max: 100,
    },
    gender: {
      type: String,
      lowercase: true,
      validate(val) {
        if (!["male", "female", "others"].includes(val)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    skills: {
      type: [String],
      validate: {
        validator: function (val) {
          return val.length <= 5;
        },
        message: "You can add maximum 5 skills only.",
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
      validate(val) {
        if (!validator.isURL(val)) {
          throw new Error("Invalid Photo URL: " + val);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
      minLength: 5,
      maxLength: [400, "Characters need to below 400 !"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.validatePassword = async function (userInputPassword) {
  const user = this;
  const schemaHashPassword = user.password;

  const isPasswordValid = await bcrypt.compare(
    userInputPassword,
    schemaHashPassword
  );

  return isPasswordValid;
};

userSchema.methods.getJwt = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "SachDev@123456789", {
    expiresIn: "1d",
  });

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
