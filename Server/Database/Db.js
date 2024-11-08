const mongoose = require('mongoose');
require('dotenv').config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,  // Set timeout to 30 seconds

    });
    console.log(process.env.MONGODB_URL); // Check the value in the console
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    console.error("MongoDB connection error:", error);
    // Handle the error (e.g., retry, exit process, etc.)
    process.exit(1); // Exit if unable to connect
  }
};

// Export the connectToDb function
module.exports = connectToDb;
