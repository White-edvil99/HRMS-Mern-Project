const multer = require("multer");
const Employee = require("../models/EmployeeModel");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const EmployeeModel = require("../models/EmployeeModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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

    const user = await User.findOne({ email });
    // console.log("user========>", user);
    if (user) {
        alert("already an exitsing employee")
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

    // console.log("new user ==========>", newUser);

    const savedUser = await newUser.save();

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
      image: req.file ? req.file.filename : "",
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

const getEmployees = async (req, res) => {
  console.log("inside get emp");
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
      message: "successfully fetched employees",
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

const editEmployee = async () => {
  const { id } = req.params;
  const updateData = req.body;

  //upate profileimage if a new file upload

  if (req.file) {
    updateData.image = req.file.filename;
  }
  try {
    const updateEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateEmployee) {
      return res.status(400).json({
        success: false,
        message: "employee not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updateEmployee,
      message: "employee updated successfully",
    });
    
  } catch (error) {
    console.error("Error updating employee:", error.message);
    res.status(500).json({
        success: false,
        error: "server side error in updating employee"
    })
  }
};

const fetchEmployeesByIdDepId = async (req,res) =>{
    const {id} = req.params;
  try {
    
    const employees = await EmployeeModel.find({department:id});
    return res.status(200).json({
      success: true,
      data: employees,
      message: "successfully fetched employees",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: error.message,
    });
  }
}


module.exports = { addEmployee, upload, getEmployees, editEmployee, fetchEmployeesByIdDepId };
