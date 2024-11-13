const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveSchema = new Schema({
    employeeId:{type:String, ref:"Employee", required:true},
    leaveType:{type:String,enum:["Sick Leave", "Casual Leave", "Privillage leave"], required:true},
    fromDate:{type:Date, required:true},
    toDate:{type:Date, required:true},
    reason:{type:String, required:true},
    status:{type:String, enum:["Pending","Approved","Rejected"],default:"pendeing"},
    appliedAt:{type:Date, default: Date.now},
    updateAt:{type:Date, default:Date.now},
});

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = leaveSchema; 