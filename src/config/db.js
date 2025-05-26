const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/dev_Tinder`);
};

module.exports = { connectDB };
