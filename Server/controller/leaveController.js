const EmployeeModel = require("../models/EmployeeModel");
const {Leave} = require("../models/Leave");
const User = require("../models/User");

// Add Leave function
const addLeave = async (req, res) => {
  try {
    const { id } = req.params;  // Employee ID
    const { leaveType, fromDate, toDate, reason } = req.body;

    const emp = await User.find({ _id: id });

    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }

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
//get employe levave
const getName = async (req, res) => {
  try {
      const { id } = req.params; // Get the employee (user) ID from the request params
      console.log("Fetching leaves for user ID:", id); // Debugging log

      // Query the database for leaves associated with this user ID
      const leaves = await Leave.find({ employeeId: id }).populate('employeeId', 'name email'); // Populate data from User

      if (!leaves || leaves.length === 0) {
          return res.status(404).json({
              success: false,
              message: 'No leaves found for this user',
          });
      }

      // Send back the fetched leaves
      res.status(200).json({
          success: true,
          leaves,
      });
  } catch (error) {
      console.error("Error in fetchEmployeeLeaves:", error);
      res.status(500).json({
          success: false,
          message: 'Error fetching leaves',
      });
  }
};


// Get Leaves function
const getLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    const userRole = req.user.role;

    let leaves;
    if (userRole === "admin") {
      leaves = await Leave.find().populate('employeeId', 'name email');
    } else if (userRole === 'manager') {
      leaves = await Leave.find({ managerId: id }).populate('employeeId', 'name email');
    } else {
      leaves = await Leave.find({ employeeId: id }).populate('employeeId', 'name email');
    }

    res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching leaves' });
  }
};

// Approve or Reject Leave function
const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const leave = await Leave.findById(leaveId);

    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    leave.status = status;
    leave.updateAt = Date.now();

    await leave.save();
    res.status(200).json({ success: true, message: `Leave ${status}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating leave status' });
  }
};

module.exports = { addLeave, getLeaves, getName,updateLeaveStatus };
