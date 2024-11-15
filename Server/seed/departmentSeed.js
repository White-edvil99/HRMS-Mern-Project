const mongoose = require("mongoose");
const Department = require("../models/DepartmentModel");
require('dotenv').config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    const departments = [
      {
        name: "Human Resources",
        description: "Handles recruitment, employee relations, and training.",
      },
      {
        name: "Engineering",
        description: "Focuses on software development and systems architecture.",
      },
      {
        name: "Marketing",
        description: "Responsible for company branding and digital campaigns.",
      },
      {
        name: "Sales",
        description: "Handles client relations and drives revenue growth.",
      },
    ];

    // Insert departments into the database
    await Department.insertMany(departments);
    console.log("Departments seeded successfully!");

    // Close the connection after seeding
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  });
