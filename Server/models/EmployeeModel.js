const mongoose = require("mongoose");
const { nanoid } = require('nanoid'); // Import nanoid for unique ID generation

const { Schema } = mongoose;


const employeeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },  // Reference to the User model
  employeeId: { 
    type: String, 
    default: () => `EMP${nanoid(6).toUpperCase()}` // Generate unique employee ID with prefix 'EMP'
  },
  dateOfBirth: Date,
  gender: String,
  maritalStatus: String,
  designation: String,
  departmentId:  { type: Schema.Types.ObjectId, ref: "Department", default:null },
  salaryId: { type: Schema.Types.ObjectId, ref: "Salary", default:null },
  leaveId: { type: Schema.Types.ObjectId, ref: "Leave", default:null },
  password: String,
  role: { type: String, enum: ["employee", "manager"], required: true },
  image: String  // Assuming you store image paths or URLs
});

module.exports = mongoose.model("Employee", employeeSchema);
