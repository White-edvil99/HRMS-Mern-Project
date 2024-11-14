const { response } = require("express");
const EmployeeModel = require("../models/EmployeeModel")
const leaveSchema = require("../models/Leave")



const getSummary = async ()=>{
       try {
        const totalEmployees = await EmployeeModel.countDocuments();
        const totalDepartments = await  EmployeeModel.countDocuments();
        const totalSalaries = await EmployeeModel.aggregate([
            {$group:{_id:null, totalSalary:{$sum:"$salary"}}}
        ])
        const employeeAppliedForLeave = await leaveSchema.distinct('employeeId')
        const leaveStatus = await leaveSchema.aggregate([
            {
                $group:{
                    status:"$status",
                    count: {$sum: 1}
                }
            }
        ])
        const leaveSummary = {
            appliedFor:employeeAppliedForLeave.length,
            approved:leaveStatus.find(item => item.status === "Approved")?.count || 0,
            rejected:leaveStatus.find(item => item.status === "Rejected")?.count || 0,
            pending:leaveStatus.find(item => item.status === "Pending")?.count || 0,
        }
        return res.status(200).json({
            totalEmployees,
            totalDepartments,
            totalSalary: totalSalaries[0]?.totalSalary || 0,
            leaveSummary
        })
       } catch (error) {
            return response.status(500).json({success: false, error: "dashbboard summary error "})
       }
}

module.exports ={ getSummary };