const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://goursachinsg:DzvufSu6K68OkYUb@cluster0.sxnebur.mongodb.net/dev_Tinder"
  );
};

module.exports = { connectDB };
