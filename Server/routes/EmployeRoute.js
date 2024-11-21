const express = require("express");
const router = express.Router();
const Employee = require("../models/EmployeeModel");
const verifyUser = require("../middleware/authMiddleware");
const {
  addEmployee,
  upload,
  getEmployees,
  editEmployee,
  fetchEmployeesByIdDepId,
  fetchEmployeeById,
  deleteEmployee,
  getEmployeeById
} = require("../controller/EmployeeController");

router.get("/", getEmployees);
router.post("/add", upload.single("image"), addEmployee);
router.get("/department/:id", verifyUser, fetchEmployeesByIdDepId);
router.get("/profile/:id", fetchEmployeeById);
router.get("/:id",getEmployeeById); // Route to fetch employee by `_id`
router.put("/:id", upload.single("image"), editEmployee); // Fixed route
router.delete("/:id", deleteEmployee);

module.exports = router;
