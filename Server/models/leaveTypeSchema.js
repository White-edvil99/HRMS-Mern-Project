const mongoose = require("mongoose");
const { Schema } = mongoose;


const leaveTypeSchema = new Schema({
    type: { type: String, unique: true, required: true },
    monthlyQuota: { type: Number, required: true },
});


const LeaveType = mongoose.model("Leavetype", leaveTypeSchema);

module.exports = LeaveType;