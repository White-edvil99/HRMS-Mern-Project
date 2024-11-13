const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const { addLeave } = require("../controller/leaveController");
const departmentRouter = express.Router();

const router = express.Router()

router.post('./add', verifyUser, addLeave);

module.exports = router;