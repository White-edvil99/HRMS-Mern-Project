import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEmployees(response.data.data);
      } catch (err) {
        console.error("Error fetching employee data", err);
      }
    };

    fetchEmployees();
  }, []);

  //delte fucntion of employee

  const deleteEmployee = async (employeeId) => {
    try {
      // Call the API to delete the employee
      const response = await axios.delete(`http://localhost:3000/api/employees/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      // Check if the delete request was successful
      if (response.status === 200) {
        // Remove the employee from the local state (UI update)
        setEmployees(employees.filter(employee => employee._id !== employeeId));
      } else {
        console.error("Failed to delete employee from the database.");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      // Optionally, show a user-friendly error message
    }
  };
  
  
  

  const filteredEmployees = employees.filter((employee) =>
    employee.employeeId.includes(searchTerm)
  );

  console.log(employees)

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Employees</h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Employee ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg w-full md:w-64 mb-4 md:mb-0"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Add New Employee
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">S No</th>
              <th className="py-2 px-4 border-b border-gray-200">Employee ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Department</th>
              <th className="py-2 px-4 border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <tr key={employee.user?._id} className="text-center">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee.employeeId || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee?.user?.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee?.departmentId?.name}

                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        navigate(`/admin-dashboard/employee/view/${employee.user?._id}`)
                      }
                    >
                      View
                    </button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        navigate(`/admin-dashboard/employee/edit/${employee._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded"
                     onClick={() =>
                      navigate(`/admin-dashboard/employee/salary/${employee.user?._id}`)
                    }
                    >
                      Salary
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Leave
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={()=> deleteEmployee(employee._id)}  //triger the delete function
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
