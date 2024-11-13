import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { FaUsers, FaBuilding, FaMoneyBillWave, FaCheck, FaTimes, FaHourglassHalf } from "react-icons/fa";
import { MdOutlineApproval } from "react-icons/md";
import axios from "axios";

const AdminSummary = () => {
  const [departmentCount, setDepartmentCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);

  // Fetch department count
  useEffect(() => {
    const fetchDepartmentCount = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/departments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Assume that response.data.data holds the department list
        setDepartmentCount(response.data.data.length);
      } catch (error) {
        console.error("Error fetching department count data", error);
      }
    };
    fetchDepartmentCount();
  }, []);

  // Fetch employee count
  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Assume that response.data.data holds the employee list
        setEmployeeCount(response.data.data.length);
      } catch (error) {
        console.error("Error fetching employee count data", error);
      }
    };
    fetchEmployeeCount();
  }, []);

  return (
    <div className="space-y-8 p-6">
      {/* Dashboard Overview Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Dashboard Overview
        </h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            icon={<FaUsers className="text-green-500 text-3xl" />}
            text="Total Employees"
            number={employeeCount} // Display dynamic employee count
          />
          <SummaryCard
            icon={<FaBuilding className="text-indigo-500 text-3xl" />}
            text="Total Departments"
            number={departmentCount} // Display dynamic department count
          />
          <SummaryCard
            icon={<FaMoneyBillWave className="text-yellow-500 text-3xl" />}
            text="Monthly Pay"
            number={50000}
          />
        </div>
      </div>

      {/* Leave Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Leave Details
        </h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            icon={<FaCheck className="text-blue-500 text-3xl" />}
            text="Leave Applied"
            number={10}
          />
          <SummaryCard
            icon={<MdOutlineApproval className="text-green-500 text-3xl" />}
            text="Leave Approved"
            number={3}
          />
          <SummaryCard
            icon={<FaTimes className="text-red-500 text-3xl" />}
            text="Leave Rejected"
            number={3}
          />
          <SummaryCard
            icon={<FaHourglassHalf className="text-orange-500 text-3xl" />}
            text="Leave Pending"
            number={4}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
