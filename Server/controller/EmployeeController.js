const multer = require("multer");
const Employee = require("../models/EmployeeModel");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Upload directory for images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp with file extension
  },
});

// Initialize multer upload
const upload = multer({ storage: storage });

// Add Employee function
const addEmployee = async (req, res) => {
  try {
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

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
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

// const editEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedEmployeeData = {
//       ...req.body,
//       image: req.file ? req.file.path : undefined,
//     };
//     const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedEmployeeData, { new: true });
//     if (!updatedEmployee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }
//     res.status(200).json({ success: true, data: updatedEmployee });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error updating employee", error });
//   }
// };

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "employee not found" });
    }

    const user = await User.findById({ _id: employee.userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }
    const updateUser = await user.findByIdAndUpdate({ _id: employee });
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        name,
        maritalStatus,
        department,
        designation,
        salary,
      }
    )
    if(!updateEmployee || !updateUser){
      return res
        .status(404)
        .json({ success: false, error: "document not found" });
    }
    return res.status(200).json({success: true, message: "employee update"})

  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update employee server error" });
  }
};

// Fetch employees by department ID
const fetchEmployeesByIdDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id });
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

//deleteemployee

const deleteEmployee = async(req,res) =>{
  try {
    const employeeId = req.params.id;  //getting the empid from the url parameter
    const employee = await Employee.findByIdAndDelete(employeeId);

    if(!employee){
      return res.status(404).json({message: "employee not found for deletion"})
    }

    res.status(200).json({message: "employee Deleted successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "error in develting employee"})
  }
};

module.exports = {
  addEmployee,
  upload,
  fetchEmployeeById,
  getEmployees,
  editEmployee,
  deleteEmployee,
  fetchEmployeesByIdDepId,
};
