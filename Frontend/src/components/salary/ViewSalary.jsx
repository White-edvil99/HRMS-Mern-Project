import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Salary from "../../../../Server/models/Salary";
import EmployeeModel from "../../../../Server/models/EmployeeModel";

const ViewSalary = () => {
  const { id } = useParams();
  const [salaryData, setSalaryData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalaryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/salaries/${id}`, // Replace with actual endpoint
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSalaryData(response.data);
        // if(!Salary || Salary.length < 1){
        //   const employee = await EmployeeModel.findOne({UserId : id})
        //   Salary = await Salary.find(employeeId : employee._id).populate('employeeId','employeeId')
        // }
      } catch (err) {
        console.error("Error fetching salary details", err);
      }
    };

    fetchSalaryDetails();
  }, [id]);

  if (!salaryData) {
    return (
      <div className="flex w-full h-screen text-center justify-center">
        <h2 className="text-3xl text-red-600">Salary data not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Salary Details
      </h2>

      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full mb-4 shadow-md"
      >
        Back to Employee List
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        {/* Table Section */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">S.No</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">Emp ID</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">Employee Name</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">Salary</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">Allowance</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">Deduction</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">Total</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((salary, index) => (
              <tr key={salary._id} className="border-b border-gray-200">
                <td className="py-2 px-4 text-sm text-gray-700">{index + 1}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary.empId}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary.employeeName}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary.salary}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary.allowance}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary.deduction}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary.total}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary.payDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSalary;