const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: { type: String, required: true, ref: "User" },
  email: String,
  employeeId: { type: String, required: true, unique: true },
  dateOfBirth: Date,
  gender: String,
  maritalStatus: String,
  designation: String,
  department: String,
  salary: { type: Number, required: true },
  password: String,
  role: String,
  image: String,  // Assuming you store image paths or URLs
});

module.exports = mongoose.model("Employee", employeeSchema);
