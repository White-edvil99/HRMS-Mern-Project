const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveTypeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true, // Fixed typo
  },
  monthlyQuota: {
    type: Number,
    required: true, // Fixed typo
  },
});

const LeaveType = mongoose.model("LeaveType", leaveTypeSchema); // Model name correction
module.exports = LeaveType;
