const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const LeaveType = require("../models/leaveTypeSchema");

const router = express.Router()

router.post("/add", verifyUser, async (req,res)=>{
    const {type, monthlyQuota} = req.body;
    if(req.user.role !== 'admin'){
        return res.status(403).json({message:"you are not authorized to perform this action. "});
    }
    try {
        const existingLeaveType = await LeaveType.findOne({type});
        if (existingLeaveType) {
            return res.status(400).json({ message: "Leave type already exists." });
        }
        const leaveType = new LeaveType({ type, monthlyQuota });
        await leaveType.save();
    } catch (error) {
        res.status(500).json({ message: "Error creating leave type.", error });
    }
});


router.get("/types", async (req, res) => {
    try {
        const leaveTypes = await LeaveType.find();
        res.status(200).json(leaveTypes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leave types.", error });
    }
});

module.exports = router