// departmentController.js
const Department = require("../models/DepartmentModel");

const addDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newDep = new Department({
            name,
            description
        });

        await newDep.save();
        
        return res.status(200).json({ success: true, department: newDep });

    } catch (error) {
        console.error("Error adding department:", error);  // Add this line to log the error
        return res.status(500).json({ success: false, error: "Department server error" });
    }
};

const getDepartments = async (req, res) => {  // Added res parameter here
    // console.log("inside get departments");
    try {
        const departments = await Department.find();
        return res.status(200).json({
            success: true,
            data: departments,
            message: "successfully fetched departments"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
            message: error.message,
        })
    }
}

// Export as an object to make imports consistent
module.exports = { addDepartment, getDepartments };
