const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const { addDepartment } = require("../controller/departmentController"); // Updated import
const addSalary = require("../controller/salaryController");
const departmentRouter = express.Router();

const router = express.Router()

router.post('./add', verifyUser, addSalary);

module.exports = router;