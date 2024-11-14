const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const { addDepartment } = require("../controller/departmentController"); // Updated import
const addSalary = require("../controller/salaryController");

const router = express.Router();

// Correct the route path here
router.post('/add', verifyUser, addSalary);

module.exports = router;
