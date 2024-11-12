const express = require("express");
const router = express.Router();
const Employee = require("../models/EmployeeModel");
const verifyUser = require("../middleware/authMiddleware");
const { addEmployee, upload, getEmployees } = require("../controller/EmployeeController");

router.post("/add", verifyUser, upload.single('image'), addEmployee);
router.get("/", getEmployees);

// Uncomment and use these routes if needed
// router.post("/add", async (req, res) => {
//   try {
//     const newEmployee = new Employee(req.body);
//     await newEmployee.save();
//     res.status(201).json({ success: true, message: "Employee added successfully!" });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Failed to add employee" });
//   }
// });

// Route to get all employees
// router.get("/admin-dashboard/employee", async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.status(200).json(employees);
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Failed to fetch employees" });
//   }
// });

module.exports = router;
