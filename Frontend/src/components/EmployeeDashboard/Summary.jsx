import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-[#1B1F2A] min-h-screen text-gray-300">
      {/* Welcome Card */}
      <div className="rounded-lg flex items-center bg-[#2A2F3A] shadow-md p-6 mb-6">
        <div className="text-4xl flex justify-center items-center bg-teal-600 text-white w-16 h-16 rounded-full">
          <FaUser />
        </div>
        <div className="pl-6">
          <p className="text-lg font-semibold">Welcome back</p>
          <p className="text-xl font-bold">{user.name}</p>
        </div>
      </div>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#2A2F3A] rounded-lg shadow-md p-4">
          <h3 className="text-gray-300 text-lg font-semibold">Ongoing Projects</h3>
          <p className="text-teal-500 text-2xl font-bold">25</p>
          <p className="text-gray-500 text-sm">Completed this month: 5</p>
        </div>

        <div className="bg-[#2A2F3A] rounded-lg shadow-md p-4">
          <h3 className="text-gray-300 text-lg font-semibold">Active Developers</h3>
          <p className="text-teal-500 text-2xl font-bold">42</p>
          <p className="text-gray-500 text-sm">On leave: 3</p>
        </div>

              // FETCH THIS DATA FROM SALARY OF Employee
        <div className="bg-[#2A2F3A] rounded-lg shadow-md p-4">
          <h3 className="text-gray-300 text-lg font-semibold">Monthly Revenue</h3>
          <p className="text-teal-500 text-2xl font-bold">$120,000</p>
          <p className="text-gray-500 text-sm">Growth: 12%</p>
        </div>
      </div>

      {/* Content with Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Hospital Survey / Additional Info */}
        <div className="bg-[#2A2F3A] rounded-lg shadow-md p-6">
          <h3 className="text-gray-300 text-lg font-semibold">IT Project Summary</h3>
          <div className="mt-4">
            {/* Replace with a chart or any summary data */}
            <p className="text-gray-500">General Overview of Projects</p>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-[#2A2F3A] rounded-lg shadow-md p-6">
          <h3 className="text-gray-300 text-lg font-semibold mb-4">Calendar</h3>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

// Functional Calendar Component
const Calendar = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const startDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null); // Empty days at the start of the month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i); // Days in the current month
  }

  return (
    <div>
      <div className="grid grid-cols-7 text-gray-500 font-medium mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`p-2 text-sm rounded-lg ${
              day
                ? day === today.getDate()
                  ? "bg-teal-500 text-white"
                  : "bg-[#1B1F2A] text-gray-300"
                : ""
            }`}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
