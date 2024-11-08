import React from "react";
import SummaryCard from "./SummaryCard";
import { FaUsers, FaBuilding, FaMoneyBillWave, FaCheck, FaTimes, FaHourglassHalf } from "react-icons/fa";
import { MdOutlineApproval } from "react-icons/md";

const AdminSummary = () => {
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
            number={10}
          />
          <SummaryCard
            icon={<FaBuilding className="text-indigo-500 text-3xl" />}
            text="Total Departments"
            number={3}
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
