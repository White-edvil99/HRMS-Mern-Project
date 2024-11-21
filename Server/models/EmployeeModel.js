const mongoose = require("mongoose");
const { nanoid } = require('nanoid'); // Import nanoid for unique ID generation
const User = require("./User");
const Salary = require("./Salary");
const Leave = require("./Leave");

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

employeeSchema.pre('findOneAndDelete', async function () {
  // Fetch the employee document matching the query
  const employee = await this.model.findOne(this.getQuery());

  if (employee) {
    console.log("Employee data before deletion:", employee);

    // Access employee fields
    console.log("User ID:", employee.user);
    console.log("Employee ID:", employee._id);

    // Perform cascading deletions
    await User.deleteMany({ _id: employee.user });
    await Salary.deleteMany({ employeeId: employee.user });
    await Leave.deleteMany({ employeeId: employee._id });
  } else {
    console.log("No matching employee found.");
  }
});


module.exports = mongoose.model("Employee", employeeSchema);
