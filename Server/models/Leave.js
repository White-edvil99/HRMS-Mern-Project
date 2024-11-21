const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveSchema = new Schema({
    employeeId:{type:mongoose.Schema.Types.ObjectId, ref:"Employee", required:true},
    leaveType:{type:String,enum:["sick", "casual", "privilege"], required:true},
    fromDate:{type:Date, required:true},
    toDate:{type:Date, required:true},
    reason:{type:String, required:true},
    status:{type:String, enum:["pending","approved","rejected"],default:"pending"},
    appliedAt:{type:Date, default: Date.now},
    updateAt:{type:Date, default:Date.now},
});

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave
