import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaBuilding, FaCalendarAlt, FaCog } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="fixed w-72 h-screen bg-white text-gray-700 p-5 shadow-lg">
      {/* Sidebar Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-teal-600 flex justify-center items-center text-white text-2xl font-bold">
          RC
        </div>
        <h3 className="text-xl font-bold text-gray-800">Employee MS</h3>
      </div>

      {/* Navigation Links */}
      <div className="space-y-4">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-teal-500 text-white"
                : "hover:bg-teal-100 hover:text-teal-600"
            }`
          }
        >
          <FaTachometerAlt className="text-xl" />
          <span className="hidden sm:inline">Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-teal-500 text-white"
                : "hover:bg-teal-100 hover:text-teal-600"
            }`
          }
        >
          <FaUser className="text-xl" />
          <span className="hidden sm:inline">My Profile</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-teal-500 text-white"
                : "hover:bg-teal-100 hover:text-teal-600"
            }`
          }
        >
          <FaBuilding className="text-xl" />
          <span className="hidden sm:inline">Leaves</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-teal-500 text-white"
                : "hover:bg-teal-100 hover:text-teal-600"
            }`
          }
        >
          <FaCalendarAlt className="text-xl" />
          <span className="hidden sm:inline">Salary</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-teal-500 text-white"
                : "hover:bg-teal-100 hover:text-teal-600"
            }`
          }
        >
          <FaCog className="text-xl" />
          <span className="hidden sm:inline">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

