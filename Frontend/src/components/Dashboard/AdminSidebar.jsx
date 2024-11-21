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

const AdminSidebar = () => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const toggleSidebarMobile = () => {
    setIsMobileExpanded(!isMobileExpanded);
  };

  return (
    <div
      className={`fixed h-screen bg-gradient-to-b from-[#f0f8ff] to-[#e6f7ff] text-gray-800 shadow-lg transition-all duration-300 z-10 ${
        isMobileExpanded ? "w-72" : "w-16"
      } md:w-72`}
    >
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebarMobile}
        className="p-3 bg-[#dfefff] hover:bg-[#cfe7ff] w-full flex justify-center md:hidden"
      >
        <FaTachometerAlt className="text-xl text-gray-600" />
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
          <span className={`hidden md:inline ${isMobileExpanded ? "inline" : ""}`}>
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
          <span className={`hidden md:inline ${isMobileExpanded ? "inline" : ""}`}>
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
          <span className={`hidden md:inline ${isMobileExpanded ? "inline" : ""}`}>
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
          <span className={`hidden md:inline ${isMobileExpanded ? "inline" : ""}`}>
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
          <span className={`hidden md:inline ${isMobileExpanded ? "inline" : ""}`}>
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
          <span className={`hidden md:inline ${isMobileExpanded ? "inline" : ""}`}>
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
      <div className="ml-16 md:ml-60 w-full bg-gray-50 min-h-screen p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;


// import React, { useState } from "react";
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
//   // State for detecting mobile toggle behavior
//   const [isMobileExpanded, setIsMobileExpanded] = useState(false);

//   const toggleSidebarMobile = () => {
//     setIsMobileExpanded(!isMobileExpanded);
//   };

//   return (
//     <div
//       className={`fixed h-screen bg-white text-gray-800 shadow-lg transition-all duration-300 z-10 ${
//         isMobileExpanded ? "w-72" : "w-16"
//       } md:w-72`} // Full sidebar on desktop
//     >
//       {/* Mobile Toggle Button */}
//       <button
//         onClick={toggleSidebarMobile}
//         className="p-3 bg-gray-100 hover:bg-gray-200 w-full flex justify-center md:hidden"
//       >
//         {/* Show the toggle button only in mobile view */}
//         <FaTachometerAlt className="text-xl" />
//       </button>

//       {/* Sidebar Navigation */}
//       <div className="mt-4 space-y-4">
//         <NavLink
//           to="/admin-dashboard"
//           className={({ isActive }) =>
//             `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold rounded-tr-none rounded-br-none" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaTachometerAlt className="text-xl" />
//           <span className={`hidden md:inline ${isMobileExpanded ? "inline" : ""}`}>
//             Dashboard
//           </span>
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard/employee"
//           className={({ isActive }) =>
//             `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold rounded-tr-none rounded-br-none" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaUser className="text-xl" />
//           <span className={`hidden md:inline ${isMobileExpanded ? "inline" : ""}`}>
//             Employee
//           </span>
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard/departments"
//           className={({ isActive }) =>
//             `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold rounded-tr-none rounded-br-none" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaBuilding className="text-xl" />
//           <span className={`hidden md:inline ${isMobileExpanded ? "inline" : ""}`}>
//             Department
//           </span>
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard/leaves"
//           className={({ isActive }) =>
//             `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold rounded-tr-none rounded-br-none" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaCalendarAlt className="text-xl" />
//           <span className={`hidden md:inline ${isMobileExpanded ? "inline" : ""}`}>
//             Leave
//           </span>
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard/salary/add"
//           className={({ isActive }) =>
//             `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold  rounded-tr-none rounded-br-none" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaMoneyBill className="text-xl" />
//           <span className={`hidden md:inline ${isMobileExpanded ? "inline" : ""}`}>
//             Salary
//           </span>
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard/settings"
//           className={({ isActive }) =>
//             `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold rounded-tr-none rounded-br-none" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaCog className="text-xl" />
//           <span className={`hidden md:inline ${isMobileExpanded ? "inline" : ""}`}>
//             Settings
//           </span>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// const AdminLayout = ({ children }) => {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <AdminSidebar />

//       {/* Main Content */}
//       <div className="ml-16 md:ml-60 w-full bg-gray-50 min-h-screen p-6">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;



// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaUser,
//   FaBuilding,
//   FaCalendarAlt,
//   FaMoneyBill,
//   FaCog,
//   FaBars,
// } from "react-icons/fa";

// const AdminSidebar = () => {
//   const [isExpanded, setIsExpanded] = useState(false); // For toggling sidebar on desktop

//   const toggleSidebar = () => {
//     setIsExpanded(!isExpanded);
//   };



  

//   return (
//     <div className={`fixed h-screen bg-white text-gray-800 shadow-lg transition-all duration-300 ${isExpanded ? "w-72" : "w-16"}`}>
//       {/* Toggle Button */}
//       <button
//         onClick={toggleSidebar}
//         className="p-3 bg-gray-100 hover:bg-gray-200 w-full flex justify-center"
//       >
//         <FaBars className="text-xl" />
//       </button>

//       <div className="mt-4 space-y-4">
//         <NavLink
//           to="/admin-dashboard"
//           className={({ isActive }) =>
//             `flex items-center gap-2 px-4 py-3 rounded-lg ${
//               isActive ? "bg-gray-200 text-blue-500 font-semibold" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           <FaTachometerAlt className="text-xl" />
//           {isExpanded && <span>Dashboard</span>}
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
//           {isExpanded && <span>Employee</span>}
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
//           {isExpanded && <span>Department</span>}
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
//           {isExpanded && <span>Leave</span>}
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
//           {isExpanded && <span>Salary</span>}
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
//           {isExpanded && <span>Settings</span>}
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// const AdminLayout = ({ children }) => {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <AdminSidebar />

//       {/* Main Content */}
//       <div className="ml-16 md:ml-72 w-full bg-gray-50 min-h-screen p-6">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


// <div className={`ml-16 w-full bg-gray-50 min-h-screen p-6 ${isExpanded ? "ml-72" : "ml-16"}`}>

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
