const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const { addDepartment } = require("../controller/departmentController"); // Updated import

const departmentRouter = express.Router();

departmentRouter.post("/add", verifyUser, addDepartment);

module.exports = departmentRouter;
