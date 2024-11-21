const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const { addLeave,getLeaves, updateLeaveStatus } = require("../controller/leaveController");
const Leave = require("../models/Leave");
const departmentRouter = express.Router();
const router = express.Router()

router.post('/add/:id', verifyUser, addLeave);
router.get('/:id', verifyUser,getLeaves);
router.patch('/status/:leaveId', verifyUser, updateLeaveStatus);
router.get('/leaves/status-count', async (req, res) => {
    try {
        const leaveStatusCount = await Leave.aggregate([
            {
                $group: {
                    _id: "$status", // Group by status
                    count: { $sum: 1 } // Count the number of leaves in each status
                }
            }
        ]);

        res.status(200).json(leaveStatusCount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching leave status counts." });
    }
});
module.exports = router;