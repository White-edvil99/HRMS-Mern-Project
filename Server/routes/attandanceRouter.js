const express = require("express");
const router = express.Router();
const Attendance = require("../models/AttendanceModel");

router.post("/checkin", async (req, res) => {
    const { userId } = req.body;
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    try {
        const existingRecord = await Attendance.findOne({ userId, date: today });

        // Check if user has already checked in
        if (existingRecord && existingRecord.checkIn) {
            return res.status(400).json({ message: "Already checked in today." });
        }

        // If no record or check-in is missing, create or update the record
        const attendance = existingRecord
            ? existingRecord // Update existing record
            : new Attendance({
                userId,
                date: today,
            });

        attendance.checkIn = new Date();
        await attendance.save();

        res.status(200).json({ message: "Checked in successfully", attendance });
    } catch (err) {
        res.status(500).json({ message: "Error checking in", error: err.message });
    }
});

router.post("/checkout", async (req, res) => {
    const { userId } = req.body;
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    try {
        const attendance = await Attendance.findOne({ userId, date: today });

        if (!attendance) {
            return res.status(404).json({ message: "No attendance record found for today." });
        }

        // Check if user has already checked out
        if (attendance.checkOut) {
            return res.status(400).json({ message: "Already checked out today." });
        }

        attendance.checkOut = new Date();
        await attendance.save();

        res.status(200).json({ message: "Checked out successfully", attendance });
    } catch (err) {
        res.status(500).json({ message: "Error checking out", error: err.message });
    }
});

router.get("/today/:userId", async (req, res) => {
    const { userId } = req.params;
    const today = new Date().toISOString().split("T")[0];
    try {
        const attendance = await Attendance.findOne({ userId, date: today });
        if (!attendance) {
            return res.status(404).json({ message: "No attendance record found for today." });
        }
        res.status(200).json(attendance);
    } catch (err) {
        res.status(500).json({ message: "Error fetching attendance", error: err.message });
    }
});

router.get("/all/:date", async (req, res) => {
    const { date } = req.params; // Date from the URL (YYYY-MM-DD format)

    try {
        const attendances = await Attendance.find({ date }).populate("userId", "name email"); // Populate user details

        res.status(200).json(attendances);
    } catch (err) {
        res.status(500).json({ message: "Error fetching attendance", error: err.message });
    }
});

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Attendance = require('../models/AttendanceModel');

// router.post('/checkin', async (req, res) => {
//     const { userId } = req.body;
//     const today = new Date().toISOString().split('T')[0];

//     try {
//         const existingRecord = await Attendance.findOne({ userId, date: today });
//         //   if (existingRecord) return res.status(400).json({ message: 'Already checked in today.' });

//         const attendance = new Attendance({
//             userId,
//             date: today,
//             checkIn: new Date(),
//         });
//         console.log("hlll",attendance)

//         await attendance.save();
//         res.status(200).json({ message: 'Checked in successfully', attendance });
//     } catch (err) {
//         res.status(500).json({ message: 'Error checking in', error: err.message });
//     }
// });




// router.post('/checkout', async (req, res) => {
//     const { userId } = req.body;
//     const today = new Date().toISOString().split('T')[0];

//     try {
//         const attendance = await Attendance.findOne({ userId, date: today });
//         if (!attendance) return res.status(404).json({ message: 'No attendance record found for today.' });

//         //   if (attendance.checkOut) return res.status(400).json({ message: 'Already checked out today.' });

//         attendance.checkOut = new Date();
//         await attendance.save();

//         res.status(200).json({ message: 'Checked out successfully', attendance });
//     } catch (err) {
//         res.status(500).json({ message: 'Error checking out', error: err.message });
//     }
// });

// router.get('/today/:userId', async (req, res) => {
//     const { userId } = req.params;
//     const today = new Date().toISOString().split('T')[0];
//     try {
//         const attendance = await Attendance.findOne({ userId, date: today });
//         if (!attendance) {
//             return res.status(404).json({ message: 'No attendance record found for today.' });
//         }
//         res.status(200).json(attendance);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching attendance', error: err.message });
//     }
// });


// router.get('/all/:date', async (req, res) => {
//     const { date } = req.params; // Date from the URL (YYYY-MM-DD format)

//     try {
//         const attendances = await Attendance.find({ date }).populate('userId', 'name email'); // Populate user details

//         res.status(200).json(attendances);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching attendance', error: err.message });
//     }
// });



// module.exports = router;