// EmployeeDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeDetails = () => {
  const { id } = useParams();
   // Retrieve employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEmployee(response.data.data);
      } catch (err) {
        console.error("Error fetching employee details", err);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Employee Details</h2>
      <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4">
        Back to Employee List
      </button>
      <div className="bg-white shadow-md rounded-lg p-4">
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Employee ID:</strong> {employee.employeeId}</p>
        <p><strong>Date of Birth:</strong> {employee.dateOfBirth}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Image:</strong></p>
        {employee.image ? (
          <img src={employee.image} alt={employee.name} className="w-20 h-20 rounded-full" />
        ) : (
          <span>No Image</span>
        )}
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default EmployeeDetails;
