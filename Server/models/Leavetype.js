const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveTypeSchema = new Schema({
    leavename: {
    type: String,
    required: true,
    unique: true, // Fixed typo
  },
  monthlyQuota: {
    type: Number,
    required: true, // Fixed typo
  },
});

const LeaveType = mongoose.model("lvType", leaveTypeSchema); // Model name correction
module.exports = LeaveType;


