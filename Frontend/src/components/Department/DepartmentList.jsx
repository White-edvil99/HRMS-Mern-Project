import React from 'react';
import { Link } from 'react-router-dom';

const DepartmentList = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Department</h2>
      </div>

      {/* Search Bar and Add Button */}
      <div className="flex justify-between items-center mb-6 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search by department name"
          className="w-2/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="flex justify-center items-center ml-4 px-2 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Add New Department
        </Link>
      </div>

      {/* Department List Placeholder */}
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-600 italic">No departments available. Start by adding a new department.</p>
      </div>
    </div>
  );
};

export default DepartmentList;
