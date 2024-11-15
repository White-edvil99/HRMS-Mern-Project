const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const { addLeave,getLeaves } = require("../controller/leaveController");
const departmentRouter = express.Router();

const router = express.Router()

router.post('/add/:id', verifyUser, addLeave);
router.get('/:id', getLeaves);

module.exports = router;