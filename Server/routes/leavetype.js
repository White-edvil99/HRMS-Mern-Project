const express = require('express')
const verifyUser = require("../middleware/authMiddleware")
const LeaveType = require('../models/Leavetype')


const router = express.Router()
router.post("/add", verifyUser, async (req, res) => {
   
    const { name, monthlyQuota } = req.body;
    console.log("here name is : ",name, monthlyQuota)
  
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action." });
    }
    try {
      // Check if the leave type already exists
      const existingLeaveType = await LeaveType.findOne({ name });
      if (existingLeaveType) {
        return res
          .status(400)
          .json({ message: "Leave type already exists." });
      }
  
      // Create a new leave type
      const leaveType = new LeaveType({ name, monthlyQuota });
      await leaveType.save();
  
      res.status(201).json({ message: "Leave type created successfully." });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "Duplicate leave type name.", error });
      }
      res.status(500).json({ message: "Error creating leave type.", error });
    }
  });

  module.exports = router;
  