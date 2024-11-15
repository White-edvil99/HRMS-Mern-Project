const multer = require("multer");
const Employee = require("../models/EmployeeModel");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");

// Add Employee function
const addUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered as employee" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role: role.toLowerCase(),
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    // const newEmployee = new Employee({
    //   name: savedUser.name,
    //   employeeId,
    //   email,
    //   dateOfBirth,
    //   gender,
    //   maritalStatus,
    //   designation,
    //   department,
    //   salary,
    //   password: hashPassword,
    //   role,
    //   image: req.file ? req.file.filename : "",
    // });

    // await newEmployee.save();
    return res.status(200).json({ success: true, message: "User created", data: savedUser});
  } catch (error) {
    console.error("Error adding employee:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Server error in adding employee" });
  }
};

const getUserByRole = async (req, res) => {
    try {
      const { role } = req.params; // Get the role from the URL params
  
      // Validate the role (optional, if you want to restrict to certain roles)
      if (!['employee', 'admin', 'manager'].includes(role)) {
        return res.status(400).json({
          success: false,
          error: "Invalid role. Valid roles are 'employee', 'admin', 'manager'."
        });
      }
  
      // Fetch users by role
      const users = await User.find({ role: role.toLowerCase() })
      .populate({
        path: 'employeeId', // Populating employeeId
        populate: [
          { path: 'departmentId' }, // Populating departmentId inside employeeId
          { path: 'salaryId' }, // Populating salaryId inside employeeId
          { path: 'leaveId' } // Populating leaveId inside employeeId
        ]
      });
  
      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No users found with the role '${role}'.`
        });
      }
  
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error("Error fetching users by role:", error.message);
      return res.status(500).json({
        success: false,
        error: "Server error in fetching users by role.",
      });
    }
  };


module.exports = {
    addUser,
    getUserByRole
}