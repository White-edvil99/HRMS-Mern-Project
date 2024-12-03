const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveSchema = new Schema({
    employeeId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    leaveType:{type:String, required:true},
    fromDate:{type:Date, required:true},
    toDate:{type:Date, required:true},
    reason:{type:String, required:true},
    status:{type:String, enum:["pending","approved","rejected"],default:"pending"},
    appliedAt:{type:Date, default: Date.now},
    updateAt:{type:Date, default:Date.now},
});


// const leaveTypeSchema = new Schema({
//     name: { type: String, required: true, unique: true }, // Example: "Sick Leave", "Casual Leave", etc.
//     description: { type: String }, // Optional description for the leave type.
//     monthlyAllocation: { type: Number, required: true, default: 0 }, // Number of leaves allocated per month.
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }, // Admin who created this leave type.
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
// });

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = {Leave}
