const multer = require("multer");
const Employee = require("../models/EmployeeModel");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const Salary = require("../models/Salary");
const DepartmentModel = require("../models/DepartmentModel");

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
      password,
      role,
      employInfo,
      salaryInfo,
      departmentInfo,
      leaveInfo
    } = req.body;

    //cehcks 
    if (!name || !email || !password || !role || !employInfo || !salaryInfo || !departmentInfo) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const { 
      dateOfBirth, 
      gender, 
      maritalStatus, 
      designation, 
    } = employInfo;

    const {departmentId} = departmentInfo

    const {
      salary      
    } = salaryInfo
    

 
    // console.log("=================INSIDE EMP",departmentId)

    // Check if a user with the given email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: "User already registered as employee" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new User document
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role: role.toLowerCase(),
      profileImage: req.file ? req.file.filename : "",
    });

 
    const newSalary = new Salary({
      basicSalary: salary,
      employeeId: newUser._id
    })


    // console.log("emp==============",newUser)

    // Create a new Employee document with a reference to the created User
    const newEmployee = new Employee({
      user: newUser._id, // Reference to the User document
      dateOfBirth,
      gender,
      maritalStatus,
      designation,
      role: role.toLowerCase(),
      image: req.file ? req.file.filename : "",

      departmentId,
      salaryId: newSalary._id ,
      leaveId: null,

    });

    // Save the Employee document
    await newUser.save();
    await newEmployee.save();
    await newSalary.save();


    // Optionally handle departmentInfo, salaryInfo, and leaveInfo here (if necessary)
    // For now, they can be null, but if you need them, you can save them as separate documents or associate them with the employee.

    // Update the User's employeeId to reference the created Employee
    newUser.employeeId = newEmployee._id;

    // Save the updated User document
    await newUser.save();

    return res.status(200).json({ success: true, message: "Employee created" });
  } catch (error) {
    console.error("Error adding employee:", error.message);
    res.status(500).json({ success: false, error: "Server error in adding employee" });
  }
};

// const getEmployeeById = async (req, res) =>{

// }
// Fetch a specific employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params; // Get the employee ID from the request parameters

    // Find the employee by ID and populate related fields
    const employee = await Employee.findById(id)
      .populate("user") // Populate the user reference
      .populate("salaryId") // Populate the salary reference
      .populate("departmentId") // Populate the department reference
      .populate("leaveId"); // Populate the leave reference (if applicable)

    // Check if the employee exists
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Return the employee details in the response
    return res.status(200).json({
      success: true,
      data: employee,
      message: "Successfully fetched employee details",
    });
  } catch (error) {
    console.error("Error fetching employee by ID:", error.message);

    // Handle any server errors
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error in fetching employee by ID",
    });
  }
};



// Get all employees
const getEmployees = async (req, res) => {
  // console.log("get======")
  try {
    const employees = await Employee.find()
    .populate('departmentId')
    .populate('user')
    .populate('salaryId')
    .populate('leaveId');
;
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

    // console.log("===============inside edit",name,maritalStatus,designation,department,salary)

    const employee = await Employee.findById({ _id: id }).populate([
      "departmentId",
      "salaryId"
    ]);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "employee not found" });
    }

    const user = await User.findById({ _id: employee.user}).populate();

    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }
    user.name = name
      // Update employee fields
      if (salary) {
        employee.salaryId.basicSalary = salary; // Update salary
        await employee.salaryId.save(); // Save updated salary
      }


  
      if (department) {
        employee.departmentId = department; // Update department name
      }

      await employee.save();
      await user.save()

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
    await user.save()

    if(!updateEmployee){
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
    const userId = req.params.id
    const employee = await User.findById(userId);
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

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id; // Employee ID from the request params

    // Find the employee by ID
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found for deletion" });
    }

    // Delete associated User document
    await User.findByIdAndDelete(employee.user);

    // Delete associated Salary document
    if (employee.salaryId) {
      await Salary.findByIdAndDelete(employee.salaryId);
    }

    // Delete the Employee document
    await Employee.findByIdAndDelete(employeeId);

    res.status(200).json({ message: "Employee and related data deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Error in deleting employee" });
  }
};



// const deleteEmployee = async(req,res) =>{
//   try {
//     const employeeId = req.params.id;  //getting the empid from the url parameter
//     const employee = await Employee.findByIdAndDelete(employeeId);

//     if(!employee){
//       return res.status(404).json({message: "employee not found for deletion"})
//     }

//     res.status(200).json({message: "employee Deleted successfully"})
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({message: "error in develting employee"})
//   }
// };

module.exports = {
  addEmployee,
  upload,
  fetchEmployeeById,
  getEmployees,
  editEmployee,
  deleteEmployee,
  fetchEmployeesByIdDepId,
  getEmployeeById
};
