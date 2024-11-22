import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaCog,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="fixed w-72 h-screen bg-[#1B1F2A] text-gray-300 p-5 shadow-lg">
      {/* Sidebar Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-teal-600 flex justify-center items-center text-white text-2xl font-bold">
          RC
        </div>
        <h3 className="text-xl font-bold text-white">Employee MS</h3>
      </div>

      {/* Navigation Links */}
      <div className="space-y-4">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-teal-500 text-white"
                : "hover:bg-[#2A2F3A] hover:text-teal-400"
            }`
          }
        >
          <FaTachometerAlt className="text-xl" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-teal-500 text-white"
                : "hover:bg-[#2A2F3A] hover:text-teal-400"
            }`
          }
        >
          <FaUser className="text-xl" />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-teal-500 text-white"
                : "hover:bg-[#2A2F3A] hover:text-teal-400"
            }`
          }
        >
          <FaBuilding className="text-xl" />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-teal-500 text-white"
                : "hover:bg-[#2A2F3A] hover:text-teal-400"
            }`
          }
        >
          <FaCalendarAlt className="text-xl" />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-teal-500 text-white"
                : "hover:bg-[#2A2F3A] hover:text-teal-400"
            }`
          }
        >
          <FaCog className="text-xl" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
