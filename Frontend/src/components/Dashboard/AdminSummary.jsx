import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { FaUsers, FaBuilding, FaMoneyBillWave } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import AttendanceList from "./AttendanceList";

const AdminSummary = () => {
  const { user } = useAuth();
  const [departmentCount, setDepartmentCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [salaryCount, setSalaryCount] = useState(0);

  // Fetch department count
  useEffect(() => {
    const fetchDepartmentCount = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/departments", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
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
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEmployeeCount(response.data.data.length);
      } catch (error) {
        console.error("Error fetching employee count data", error);
      }
    };
    fetchEmployeeCount();
  }, []);

  return (
    <div className="p-6 space-y-8 min-h-full bg-gray-100 overflow-auto">
      {/* Dashboard Overview Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            icon={<FaUsers className="text-green-500 text-3xl" />}
            text="Total Employees"
            number={employeeCount}
          />
          <SummaryCard
            icon={<FaBuilding className="text-indigo-500 text-3xl" />}
            text="Total Departments"
            number={departmentCount}
          />
          <SummaryCard
            icon={<FaMoneyBillWave className="text-yellow-500 text-3xl" />}
            text="Monthly Pay"
            number={`₹${salaryCount.toLocaleString()}`}
          />
        </div>
      </div>

      {/* Leave Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="max-h-96 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
          <AttendanceList />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;







