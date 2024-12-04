import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";

const AdminSidebar = () => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebarMobile = () => {
    setIsMobileExpanded(!isMobileExpanded); // Toggle the expanded state
    setIsOpen(!isOpen); // Toggle the icon (on/off)
  };

  return (
    <div
      className={`fixed h-full bg-gradient-to-b from-[#f0f8ff] to-[#e6f7ff] text-gray-800 shadow-lg transition-all duration-300 z-10 ${
        isMobileExpanded ? "w-72" : "w-16"
      } md:w-72`}
    >
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebarMobile}
        className="p-3 bg-[#dfefff] hover:bg-[#cfe7ff] w-full flex justify-center md:hidden"
      >
        {/* Conditional Rendering of the Toggle Icon */}
        {isOpen ? (
          <BsToggle2On className="text-xl text-gray-600" />
        ) : (
          <BsToggle2Off className="text-xl text-gray-600" />
        )}
      </button>

      {/* Sidebar Navigation */}
      <div className="mt-4 space-y-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-[#d9f0ff] text-blue-500 font-bold shadow-md border-l-4 border-blue-400"
                : "hover:bg-[#edf8ff] hover:text-blue-400"
            }`
          }
        >
          <FaTachometerAlt className="text-xl" />
          <span
            className={`${
              isMobileExpanded ? "inline" : "hidden"
            } md:inline`}> {/* Text will show if expanded */}
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/employee"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-[#d9f0ff] text-blue-500 font-bold shadow-md border-l-4 border-blue-400"
                : "hover:bg-[#edf8ff] hover:text-blue-400"
            }`
          }
        >
          <FaUser className="text-xl" />
          <span
            className={`${
              isMobileExpanded ? "inline" : "hidden"
            } md:inline`}>
            Employee
          </span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-[#d9f0ff] text-blue-500 font-bold shadow-md border-l-4 border-blue-400"
                : "hover:bg-[#edf8ff] hover:text-blue-400"
            }`
          }
        >
          <FaBuilding className="text-xl" />
          <span
            className={`${
              isMobileExpanded ? "inline" : "hidden"
            } md:inline`}>
            Department
          </span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-[#d9f0ff] text-blue-500 font-bold shadow-md border-l-4 border-blue-400"
                : "hover:bg-[#edf8ff] hover:text-blue-400"
            }`
          }
        >
          <FaCalendarAlt className="text-xl" />
          <span
            className={`${
              isMobileExpanded ? "inline" : "hidden"
            } md:inline`}>
            Leave
          </span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-[#d9f0ff] text-blue-500 font-bold shadow-md border-l-4 border-blue-400"
                : "hover:bg-[#edf8ff] hover:text-blue-400"
            }`
          }
        >
          <FaMoneyBill className="text-xl" />
          <span
            className={`${
              isMobileExpanded ? "inline" : "hidden"
            } md:inline`}>
            Salary
          </span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-[#d9f0ff] text-blue-500 font-bold shadow-md border-l-4 border-blue-400"
                : "hover:bg-[#edf8ff] hover:text-blue-400"
            }`
          }
        >
          <FaCog className="text-xl" />
          <span
            className={`${
              isMobileExpanded ? "inline" : "hidden"
            } md:inline`}>
            Settings
          </span>
        </NavLink>
      </div>
    </div>
  );
};

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-16 md:ml-60 w-full bg-gray-50 min-h-full p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;


