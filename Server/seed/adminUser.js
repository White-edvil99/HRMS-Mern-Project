const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
require('dotenv').config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    const hashPassword = await bcrypt.hash("admin", 10);

    const newUser = new User({
      name:"admin",
      email: "admin@admin.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
    // Close the connection after seeding
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  });
