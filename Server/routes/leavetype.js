const express = require('express')
const verifyUser = require("../middleware/authMiddleware")
const LeaveType = require('../models/Leavetype')


const router = express.Router()
router.post("/add", verifyUser, async (req, res) => {
   
    const { leavename, monthlyQuota } = req.body;
    console.log("here name is : ",leavename, monthlyQuota)
  
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action." });
    }
    try {
      // Check if the leave type already exists
      const existingLeaveType = await LeaveType.findOne({ leavename });
      if (existingLeaveType) {
        return res
          .status(400)
          .json({ message: "Leave type already exists." });
      }
  
      // Create a new leave type
      const leaveType = new LeaveType({ leavename, monthlyQuota });
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


  router.get("/types", verifyUser, async (req, res) => {
    try {
    //   if (req.user.role == "admin" ) {
    //     return res
    //       .status(403)
    //       .json({ message: "You are not authorized to perform this action." });
    //   }
  
      const leaveTypes = await LeaveType.find();
  
      res.status(200).json({ leaveTypes });
    } catch (error) {
      res.status(500).json({ message: "Error fetching leave types.", error });
    }
  });

  module.exports = router;
  