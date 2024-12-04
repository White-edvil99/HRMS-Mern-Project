import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
        setDepartments(response.data.data);
      } catch (err) {
        console.error("Error fetching department data", err);
      }
    };
    fetchDepartments();
  }, []);

  // Filter departments based on search term
  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Department</h2>
      </div>

      {/* Search Bar and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 max-w-4xl mx-auto gap-4">
        <input
          type="text"
          placeholder="Search by department name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 bg-white text-gray-800 transition duration-200"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white text-center rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Add New Department
        </Link>
      </div>

      {/* Department List */}
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
        {filteredDepartments.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="py-3 px-4 border-b border-gray-300">S No</th>
                <th className="py-3 px-4 border-b border-gray-300">Department Name</th>
                <th className="py-3 px-4 border-b border-gray-300">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((department, index) => (
                <tr
                  key={department._id}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4 border-b border-gray-300">{index + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{department.name}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{department.description}</td>
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


