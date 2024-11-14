const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const { addDepartment } = require("../controller/departmentController"); // Updated import
const {addSalary,getSalary} = require("../controller/salaryController");

const router = express.Router();

// Correct the route path here
router.post('/add', verifyUser, addSalary);
router.get('/:id', verifyUser, getSalary);

module.exports = router;
