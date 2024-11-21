


import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const {user} = useAuth();
  return (
    <div className="fixed w-72 h-screen bg-white text-gray-800 p-5 shadow-lg">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-700">Rc Employee MS</h3>
      </div>
      <div className="space-y-4">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <FaTachometerAlt className="text-xl" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <FaUser className="text-xl" />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <FaBuilding className="text-xl" />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <FaCalendarAlt className="text-xl" />
          <span>Salary</span>
        </NavLink>

        {/* <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <FaMoneyBill className="text-xl" />
          <span>Salary</span>
        </NavLink> */}

        <NavLink
          to="/employee-dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
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
