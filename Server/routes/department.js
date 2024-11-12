const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const { addDepartment, getDepartments } = require("../controller/departmentController"); // Updated import

const departmentRouter = express.Router();
departmentRouter.get("/", getDepartments)
departmentRouter.post("/add", verifyUser, addDepartment);

module.exports = departmentRouter;
