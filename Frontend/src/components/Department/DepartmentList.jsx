import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/departments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("helo fetch depaermnte ka response",response)
        setDepartments(response.data.data);
      } catch (err) {
        console.error("Error fetching department data", err);
      }
    };
    fetchDepartments();
  }, []);

  // Filter departments based on search term
  const filteredDepartments = departments.filter((department) =>
    department.dep_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Department</h2>
      </div>

      {/* Search Bar and Add Button */}
      <div className="flex justify-between items-center mb-6 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search by department name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="flex justify-center items-center ml-4 px-2 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Add New Department
        </Link>
      </div>

      {/* Department List */}
      <div className="bg-white rounded-lg shadow p-4">
        {filteredDepartments.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">S No</th>
                <th className="py-2 px-4 border-b border-gray-200">Department Name</th>
                <th className="py-2 px-4 border-b border-gray-200">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((department, index) => (
                <tr key={department._id} className="text-center">
                  <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{department.dep_name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{department.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 italic">No departments found.</p>
        )}
      </div>
    </div>
  );
};

export default DepartmentList;
