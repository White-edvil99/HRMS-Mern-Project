const mongoose = require("mongoose");
const { Schema } = mongoose;

const salarySchema = new Schema({
  employeeId: { type: String, required: true, unique: true },
  basicSalary: { type: Number, required: true },
  allowances:{type:Number, required:true},
  deductions:{type:Number},
  netSalary:{type:Number},
  payDate:{type:Date,required:true},
  createAt:{type:Date, default:Date.now},
  updateAt:{type:Date, default:Date.now},
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
