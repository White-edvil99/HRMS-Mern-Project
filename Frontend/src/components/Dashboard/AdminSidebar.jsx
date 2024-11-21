import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBill,
  FaCog,
  FaBars,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false); // For toggling sidebar on desktop

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed h-screen bg-white text-gray-800 shadow-lg transition-all duration-300 ${isExpanded ? "w-72" : "w-16"}`}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="p-3 bg-gray-100 hover:bg-gray-200 w-full flex justify-center"
      >
        <FaBars className="text-xl" />
      </button>

      <div className="mt-4 space-y-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <FaTachometerAlt className="text-xl" />
          {isExpanded && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/admin-dashboard/employee"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <FaUser className="text-xl" />
          {isExpanded && <span>Employee</span>}
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <FaBuilding className="text-xl" />
          {isExpanded && <span>Department</span>}
        </NavLink>

        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <FaCalendarAlt className="text-xl" />
          {isExpanded && <span>Leave</span>}
        </NavLink>

        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <FaMoneyBill className="text-xl" />
          {isExpanded && <span>Salary</span>}
        </NavLink>

        <NavLink
          to="/admin-dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg ${
              isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          <FaCog className="text-xl" />
          {isExpanded && <span>Settings</span>}
        </NavLink>
      </div>
    </div>
  );
};

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="ml-16 md:ml-72 w-full bg-gray-50 min-h-screen p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;




// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaUser,
//   FaBuilding,
//   FaCalendarAlt,
//   FaMoneyBill,
//   FaCog,
// } from "react-icons/fa";

// const AdminSidebar = () => {
//   return (
//     <div className="fixed w-72 h-screen bg-white text-gray-800 p-5 shadow-lg">
//       <div className="mb-6">
//         <h3 className="text-2xl font-bold text-gray-700">Rc Employee MS</h3>
//       </div>
//       <div className="space-y-4">
//         <NavLink
//           to="/admin-dashboard"
//           className={({ isActive }) =>
//             `flex items-center gap-2 px-4 py-3 rounded-lg ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaTachometerAlt className="text-xl" />
//           <span>Dashboard</span>
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard/employee"
//           className={({ isActive }) =>
//             `flex items-center gap-2 px-4 py-3 rounded-lg ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaUser className="text-xl" />
//           <span>Employee</span>
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard/departments"
//           className={({ isActive }) =>
//             `flex items-center gap-2 px-4 py-3 rounded-lg ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaBuilding className="text-xl" />
//           <span>Department</span>
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard/leaves"
//           className={({ isActive }) =>
//             `flex items-center gap-2 px-4 py-3 rounded-lg ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaCalendarAlt className="text-xl" />
//           <span>Leave</span>
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard/salary/add"
//           className={({ isActive }) =>
//             `flex items-center gap-2 px-4 py-3 rounded-lg ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaMoneyBill className="text-xl" />
//           <span>Salary</span>
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard/settings"
//           className={({ isActive }) =>
//             `flex items-center gap-2 px-4 py-3 rounded-lg ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaCog className="text-xl" />
//           <span>Settings</span>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;
