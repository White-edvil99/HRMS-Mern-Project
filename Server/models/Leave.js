const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveSchema = new Schema({
    employeeId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    // leaveType:{type:String,enum:["sick", "casual", "privilege"], required:true},
    leaveType: { type: String, required: true },
    fromDate:{type:Date, required:true},
    toDate:{type:Date, required:true},
    reason:{type:String, required:true},
    status:{type:String, enum:["pending","approved","rejected"],default:"pending"},
    appliedAt:{type:Date, default: Date.now},
    updateAt:{type:Date, default:Date.now},
});

// const leaveTypeSchema = new Schema({
//     type:{type:String, unique:true, required:true},
//     monthlyQuota:{ type:Number, required:true },
// });

// leaveSchema.pre("save", async function (next) {
//     const LeaveType = mongoose.model("LeaveType");
//     const leaveType = awiat LeaveType.findOne({ type: this.leaveType.toLowerCase()});
//     if(!leaveType){
//         return next(new Error("invalid leave type."));
//     }
//     next();
// })

// const LeaveType =   mongoose.model("Leave", leaveTypeSchema);
const Leave = mongoose.model("Leave", leaveSchema);
module.exports = {Leave}
