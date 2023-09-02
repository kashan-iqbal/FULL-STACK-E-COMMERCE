const mongoose = require("mongoose");
require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Mongodb Database${conn.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`Error in MongoDB ${error}`.bgRed.white);
    process.exit(1);
  }
};

module.exports = connectDB;
