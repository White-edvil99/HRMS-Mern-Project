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
} = require("../controller/EmployeeController");

router.post("/add", verifyUser, upload.single("image"), addEmployee);
router.get("/", getEmployees);
router.get("/department/:id", verifyUser, fetchEmployeesByIdDepId);
router.get("/view/:id", fetchEmployeeById); // Route to fetch employee by `_id`
router.put("/:id", upload.single("image"), editEmployee); // Fixed route
router.delete("/:id", deleteEmployee);

module.exports = router;
