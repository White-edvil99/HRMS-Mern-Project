const Salary = require("../models/Salary");
const User = require("../models/User");

// controllers/salaryController.js
const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowance, deductions, payDate } = req.body;

    const employee = await User.findOne({ name: employeeId }); // Find employee by name
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    const totalSalary = parseInt(basicSalary) + parseInt(allowance) - parseInt(deductions);

    // Check if salary exists for the employee
    const existingSalary = await Salary.findOne({ employeeId: employee._id });
    if (existingSalary) {
      existingSalary.basicSalary = basicSalary;
      existingSalary.allowance = allowance;
      existingSalary.deductions = deductions;
      existingSalary.netSalary = totalSalary;
      existingSalary.payDate = payDate;

      await existingSalary.save();
      return res.status(200).json({ success: true, message: "Salary updated successfully" });
    }

    const newSalary = new Salary({
      employeeId: employee._id,
      basicSalary,
      allowance,
      deductions,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();
    res.status(200).json({ success: true, message: "Salary added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "salary add server error",
      details: error.message,
    });
  }
};


const getTotalSalary = async (req, res) => {
  try {
    const userId = req.params.userId || req.body.userId;

    if (userId === "total") {
      // Aggregate total salary
      const totalSalary = await Salary.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);
      return res.status(200).json(totalSalary);
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Fetch salary for a specific user
    const salary = await Salary.findOne({ user: userId });
    if (!salary) {
      return res.status(404).json({ error: "Salary not found" });
    }

    return res.status(200).json(salary);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
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
    } 
    else if (userRole === "employee") {
      salaryData = await User.findOne({ _id: id }).populate({
        path: 'employeeId', // Populating employeeId
        populate: [
          { path: 'departmentId' }, // Populating departmentId inside employeeId
          { path: 'salaryId' }, // Populating salaryId inside employeeId
        ]
      });
      console.log("=====>emp sal",salaryData)
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
  getTotalSalary
};
