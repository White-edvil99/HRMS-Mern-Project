const Salary = require("../models/Salary");

// controllers/salaryController.js
const addSalary = async (req, res) => {
  try {
    console.log("adding salary api=============>");
    const { employeeId, basicSalary, allowance, deductions, payDate } =
      req.body;
    console.log(employeeId, basicSalary, allowance, deductions, payDate);

    const totalSalary =
      parseInt(basicSalary) + parseInt(allowance) - parseInt(deductions);

    // check if there is an alread salary of a employee, if there is, update that, otherwise create new salary 

    const existingSalary = await Salary.findOne({employeeId});
    if(existingSalary) {
      //updating the existing salary reocrd
      existingSalary.basicSalary = basicSalary;
      existingSalary.allowance = allowance;
      existingSalary.deductions = deductions;
      existingSalary.netSalary = totalSalary;
      existingSalary.payDate = payDate;
      
      await existingSalary.save();
      return res.status(200).json({success: true, message:"salary updated successfully"});

    }else{
      const newSalary = new Salary({
        employeeId,
        basicSalary,
        allowance,
        deductions,
        netSalary: totalSalary,
        payDate,
      });
      
      await newSalary.save();
    return res.status(200).json({ success: true, message:"salary added successfully" });
    }
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "salary add server error",
    });
  }
};


const getSalary = async (req,res)=>{
    try {
        const {id} = req.params;
        console.log("emp id=============>",id)
        const salary = await Salary.find({_id: id});
        console.log("salary ==============>",salary)
        return res.status(200).json({success: true, salary})

    } catch (error) {
      return res.status(500).json({success: false,error: "salary get server error in fetching employee salary data"})
    }
}

// module.exports= {addSalary};
module.exports = {
    addSalary,
    getSalary
}