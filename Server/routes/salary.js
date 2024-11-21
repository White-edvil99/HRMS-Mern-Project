const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const { addDepartment } = require("../controller/departmentController"); // Updated import
const {addSalary,getSalary, getTotalSalary} = require("../controller/salaryController");

const router = express.Router();

// Correct the route path here
router.post('/add', verifyUser, addSalary);
router.get('/:id', verifyUser, getSalary);
router.get('/total', verifyUser, getTotalSalary)

module.exports = router;
