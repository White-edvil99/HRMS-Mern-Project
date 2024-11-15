
const EmployeeModel = require("../models/EmployeeModel")
const Leave = require("../models/Leave");
const User = require("../models/User");

// Add Leave function
const addLeave = async (req, res) => {
    try {
      const { id } = req.params;  // Employee ID
      const { leaveType, fromDate, toDate, reason } = req.body;

      console.log("========================>leave api",leaveType, fromDate, toDate, reason)

      const emp = await User.find({
        _id: id
      })

      if(!emp) {
        return res.status(404).json({ message: "Employee not found" });
      }
      
      console.log(emp);

      const newLeave = new Leave({
        employeeId: id,
        leaveType,
        fromDate,
        toDate,
        reason,
      });
  
      await newLeave.save();
      
  
      return res.status(200).json({ success: true, message: "Leave request added" });
    } catch (error) {
      console.error("Error adding leave:", error.message);
      res.status(500).json({ success: false, error: "Server error in adding leave" });
    }
  };
  

const getLeaves = async (req, res)=>{
    try {
        const  {id} = req.params;
        console.log("============leave id",id)
        const employee = await Leave.find({employeeId: id})
        return res.status(200).json({success:true, employee})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false, error:"leave add server error"})
    }
}

module.exports = {addLeave, getLeaves};