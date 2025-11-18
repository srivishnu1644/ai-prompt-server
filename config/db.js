const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL is not defined in your .env file");
    }
    await mongoose.connect(connectionString);
    console.log("MongoDB connnected Successfully");
  } catch (err) {
    console.err("Failed to connect to MongoDB", err.message);
    procees.exit(1);
  }
};

module.exports = connectDB;
