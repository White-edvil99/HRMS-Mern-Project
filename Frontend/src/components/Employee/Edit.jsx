import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    dateOfBirth: "",
    department: "",
    // Add other fields as needed
  });

  useEffect(() => {
    // Fetch existing employee data
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employees/${id}`);
        setEmployee(response.data.data); // Set fetched data to state
      } catch (err) {
        console.error("Error fetching employee data", err);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/employees/${id}`, employee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Employee details updated successfully");
      navigate("/admin-dashboard/employees");
    } catch (err) {
      console.error("Error in updating employee data", err);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2">
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={employee.dateOfBirth}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2">
          Department:
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </label>
        {/* Add more fields as necessary */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
