const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://goursachinsg:<password>@cluster0.sxnebur.mongodb.net/dev_Tinder"
  );
};

module.exports = { connectDB };
