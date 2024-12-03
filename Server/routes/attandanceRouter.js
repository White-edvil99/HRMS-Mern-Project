const express = require("express");
const router = express.Router();
const Attendance = require('../models/AttendanceModel');

router.post('/checkin', async (req, res) => {
    const { userId } = req.body;
    const today = new Date().toISOString().split('T')[0];
  
    try {
      const existingRecord = await Attendance.findOne({ userId, date: today });
      if (existingRecord) return res.status(400).json({ message: 'Already checked in today.' });
  
      const attendance = new Attendance({
        userId,
        date: today,
        checkIn: new Date(),
      });
  
      await attendance.save();
      res.status(200).json({ message: 'Checked in successfully', attendance });
    } catch (err) {
      res.status(500).json({ message: 'Error checking in', error: err.message });
    }
  });
  
router.post('/checkout', async (req, res) => {
    const { userId } = req.body;
    const today = new Date().toISOString().split('T')[0];
  
    try {
      const attendance = await Attendance.findOne({ userId, date: today });
      if (!attendance) return res.status(404).json({ message: 'No attendance record found for today.' });
  
      if (attendance.checkOut) return res.status(400).json({ message: 'Already checked out today.' });
  
      attendance.checkOut = new Date();
      await attendance.save();
  
      res.status(200).json({ message: 'Checked out successfully', attendance });
    } catch (err) {
      res.status(500).json({ message: 'Error checking out', error: err.message });
    }
  });
  

  module.exports = router;