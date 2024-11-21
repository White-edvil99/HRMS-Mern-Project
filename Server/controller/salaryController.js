const Salary = require("../models/Salary");
const User = require("../models/User");

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

    const existingSalary = await Salary.findOne({ employeeId });
    if (existingSalary) {
      //updating the existing salary reocrd
      existingSalary.basicSalary = basicSalary;
      existingSalary.allowance = allowance;
      existingSalary.deductions = deductions;
      existingSalary.netSalary = totalSalary;
      existingSalary.payDate = payDate;

      await existingSalary.save();
      return res
        .status(200)
        .json({ success: true, message: "salary updated successfully" });
    } else {
      const newSalary = new Salary({
        employeeId,
        basicSalary,
        allowance,
        deductions,
        netSalary: totalSalary,
        payDate,
      });

      await newSalary.save();
      return res
        .status(200)
        .json({ success: true, message: "salary added successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "salary add server error",
    });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const userRole = req.user.role;

    console.log("ROLE==========",userRole)

    let salaryData;
    if (userRole === "admin") {
      salaryData = await User.findOne({
        _id: id
      }).populate({
        path: 'employeeId', // Populating employeeId
        populate: [
          { path: 'departmentId' }, // Populating departmentId inside employeeId
          { path: 'salaryId' }, // Populating salaryId inside employeeId
        ]
      });
    } else if (userRole === "employee") {
      salaryData = await Salary.findOne({ employeeId: id }).populate(
        "employeeId",
        "name email salary"
      );
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }
    res.status(200).json({ success: true, salary: salaryData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching salary details" });
  }
};

// module.exports= {addSalary};
module.exports = {
  addSalary,
  getSalary,
};
