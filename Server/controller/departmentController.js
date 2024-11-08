// departmentController.js
const Department = require("../models/DepartmentModel");

const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;
        const newDep = new Department({
            dep_name,
            description
        });

        await newDep.save();
        
        return res.status(200).json({ success: true, department: newDep });

    } catch (error) {
        console.error("Error adding department:", error);  // Add this line to log the error
        return res.status(500).json({ success: false, error: "Department server error" });
    }
};


// Export as an object to make imports consistent
module.exports = { addDepartment };
