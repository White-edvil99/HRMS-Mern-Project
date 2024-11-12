const express = require("express");
const router = express.Router();
const Employee = require("../models/EmployeeModel");
const verifyUser = require("../middleware/authMiddleware");
const { addEmployee, upload, getEmployees, editEmployee } = require("../controller/EmployeeController");

router.post("/add", verifyUser, upload.single('image'), addEmployee);
router.get("/", getEmployees);
//do change in below 
router.put("/edit/:id", verifyUser, upload.single('image'), editEmployee);


module.exports = router;
