const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  checkIn: { type: Date },
  checkOut: { type: Date },
  breaks: [
    {
      start: { type: Date },
      end: { type: Date },
    },
  ],
  totalBreakTime: { type: Number, default: 0 }, // Total break time in minutes
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
