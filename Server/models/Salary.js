const mongoose = require("mongoose");
const { Schema } = mongoose;

const salarySchema = new Schema({
  employeeId: { type: mongoose.Types.ObjectId, ref:"User", required: true },
  basicSalary: { type: Number, required: true },
  allowance:{type:Number,},
  deductions:{type:Number},
  netSalary:{type:Number},
  payDate:{type:Date}, 
  createAt:{type:Date, default:Date.now},
  updateAt:{type:Date, default:Date.now},
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
