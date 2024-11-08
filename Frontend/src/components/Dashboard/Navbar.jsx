import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between h-16 px-8 bg-gray-800 shadow-lg text-white">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
          <img src='/images/RC_logo.jpg' alt="Company Logo" className="object-cover w-full h-full" />
        </div>
        <h1 className="text-xl font-bold text-white">RC Employee MS</h1>
      </div>

      {/* Welcome Message */}
      <div className="flex items-center gap-2">
        <FaUserCircle className="text-2xl" />
        <p className="text-lg font-medium">Welcome, {user.name}</p>
      </div>

      {/* Logout Button */}
      <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition duration-200 font-semibold text-white shadow-md">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
