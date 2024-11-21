import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false); // Just close the mobile menu
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            <img
              src="/images/RC_logo.jpg"
              alt="Company Logo"
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold hidden md:block">RC Employee MS</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <p className="flex items-center gap-2 text-lg">
            <FaUserCircle className="text-2xl" />
            Welcome, {user ? user.name : "Guest"}
          </p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="relative md:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl focus:outline-none hover:text-gray-300"
          >
            <CgProfile />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full bg-gray-700 shadow-lg z-50">
          <ul className="flex flex-col text-white">
            {/* Back Button */}
            <li>
              <button
                onClick={closeMenu}
                className="w-full text-left px-4 py-2 hover:bg-gray-600 border-b border-gray-600"
              >
                <IoIosArrowBack />
              </button>
            </li>

            {/* User Info */}
            <li className="flex items-center px-4 py-2 border-b border-gray-600">
              <FaUserCircle className="mr-2 text-lg" />
              {user ? user.name : "Guest"}
            </li>

            {/* Logout Button */}
            <li>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false); // Close the menu after logout
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-600 rounded-b-lg"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



// import React, { useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { FaUserCircle } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
// import { IoIosArrowBack } from "react-icons/io";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeMenu = () => {
//     setIsOpen(false); // Just close the mobile menu
//   };

//   return (
//     <nav className="w-full bg-gray-800 text-white shadow-md">
//       <div className="flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
//             <img
//               src="/images/RC_logo.jpg"
//               alt="Company Logo"
//               className="object-cover w-full h-full"
//             />
//           </div>
//           <h1 className="text-xl font-bold hidden md:block">RC Employee MS</h1>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           <p className="flex items-center gap-2 text-lg">
//             <FaUserCircle className="text-2xl" />
//             Welcome, {user ? user.name : "Guest"}
//           </p>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition duration-200"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Mobile Hamburger Menu */}
//         <div className="relative md:hidden">
//           <button
//             onClick={toggleMenu}
//             className="text-2xl focus:outline-none hover:text-gray-300"
//           >
//             <CgProfile />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isOpen && (
//         <div className="absolute top-0 left-0 w-full bg-gray-700 shadow-lg z-50">
//           <ul className="flex flex-col text-white">
//             {/* Back Button */}
//             <li>
//               <button
//                 onClick={closeMenu}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-600 border-b border-gray-600"
//               >
//                 <IoIosArrowBack />
//               </button>
//             </li>

//             {/* User Info */}
//             <li className="flex items-center px-4 py-2 border-b border-gray-600">
//               <FaUserCircle className="mr-2 text-lg" />
//               {user ? user.name : "Guest"}
//             </li>

//             {/* Logout Button */}
//             <li>
//               <button
//                 onClick={() => {
//                   logout();
//                   setIsOpen(false); // Close the menu after logout
//                 }}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-600 rounded-b-lg"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

