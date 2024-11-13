const multer = require("multer");
const Employee = require("../models/EmployeeModel");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const EmployeeModel = require("../models/EmployeeModel");

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Upload directory for images
  },
  filename: (req, file, cb) => {
    // Use original name with timestamp to avoid overwriting
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer upload with the defined storage configuration
const upload = multer({ storage: storage });

// Add Employee function
const addEmployee = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("File:", req.file);

    const {
      name,
      email,
      employeeId,
      dateOfBirth,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered as employee" });
    }

    // Hash the password before saving
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role: role.toLowerCase(),
      profileImage: req.file ? req.file.filename : "", // Save image filename if exists
    });

    const savedUser = await newUser.save();

    // Create a new employee
    const newEmployee = new Employee({
      name: savedUser.name,
      employeeId,
      email,
      dateOfBirth,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password: hashPassword,
      role,
      image: req.file ? req.file.filename : "", // Save image filename if exists
    });

    await newEmployee.save();
    return res.status(200).json({ success: true, message: "Employee created" });
  } catch (error) {
    console.error("Error adding employee:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Server error in adding employee" });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    let employees
     employees = await EmployeeModel.find();
    if(!employees){
      EmployeeModel.find({userId:id}).
      populate("userId",{password:0}).
      populate("department");
     }
    return res.status(200).json({
      success: true,
      data: employees,
      message: "Successfully fetched employees",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: error.message,
    });
  }
};

// Edit employee function
const editEmployee = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Check if a new image is uploaded
  if (req.file) {
    updateData.image = req.file.filename; // Update the image filename if uploaded
  }

  try {
    const updateEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updateEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updateEmployee,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error("Error updating employee:", error.message);
    res.status(500).json({
      success: false,
      error: "Server error in updating employee",
    });
  }
};

// Fetch employees by department ID
const fetchEmployeesByIdDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await EmployeeModel.find({ department: id });
    return res.status(200).json({
      success: true,
      data: employees,
      message: "Successfully fetched employees by department",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: error.message,
    });
  }
};

// Fetch a specific employee by ID
const fetchEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    res.status(500).json({ error: "Server error in fetching employee by ID" });
  }
};

module.exports = {
  addEmployee,
  upload,
  fetchEmployeeById,
  getEmployees,
  editEmployee,
  fetchEmployeesByIdDepId,
};
