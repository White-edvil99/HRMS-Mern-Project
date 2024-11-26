import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    name: "",
    description: "",
  });
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data...", department);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No authorization token found.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/departments/add", // Correct URL
        department,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        Navigate("/admin-dashboard/departments");
      } else {
        alert("Failed to add department.");
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);  // Log response error
        alert(error.response.data.error);   // Show alert if server responds with error
      } else {
        console.error(error.message);  // Log network error or any other issue
        alert("Network error, please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Add Department
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-600 font-medium mb-1"
            >
              Department Name
            </label>
            <input
              name="name"
              value={department.name} // Binding state to input value
              onChange={handleChange}
              type="text"
              placeholder="Enter Dept Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-600 font-medium mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              value={department.description} // Binding state to textarea value
              onChange={handleChange}
              placeholder="Enter department description"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
