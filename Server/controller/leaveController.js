
const EmployeeModel = require("../models/EmployeeModel")
const Leave = require("../models/Leave")

const  addLeave = async (req,res)=>{
    try {
        const { userId, leaveType, fromDate, toDate,reason} = req.body
        const employee = await EmployeeModel.findOne({userId})

        const newLeave = new Leave({
            employeeid:employee, leaveType, fromDate, toDate,reason
        })

        await newLeave.save()
        return res.status(200).json({success:true})
    } catch (error) {
        return res.status(500).json({
            success: false, error:"newLeave add server error"
        })
    }
}

const getLeaves = async (req, res)=>{
    try {
        const  {id} = req.params;
        const employee = await EmployeeModel.findOne({userId: id})
        const leaves = await Leave.find({employeeId: employee._id})
        return res.status(200).json({success:true, leaves})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false, error:"leave add server error"})
    }
}

module.exports = {addLeave, getLeaves};