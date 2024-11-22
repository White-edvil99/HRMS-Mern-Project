import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employees/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEmployee(response.data);
      } catch (err) {
        console.error("Error fetching employee details", err);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (!employee) {
    return (
      <div className="flex w-full h-screen text-center justify-center">
        <h2 className="text-3xl text-red-600">Employee not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
    <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Employee Details</h2>
    
    <button
      onClick={() => navigate(-1)}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full mb-4 shadow-md"
    >
      Back to Employee List
    </button>

    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      {/* Banner Section */}
      <div className="relative w-full h-32 rounded-t-lg overflow-hidden">
        <img
          src="/images/banner.jpg" // Replace with the banner image URL
          alt="Banner"
          className="object-cover w-full h-full"
        />
        
        {/* Profile Image */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 rounded-full overflow-hidden shadow-lg border-4 border-white">
          {employee.image ? (
            <img
              // src={`http://localhost:3000/uploads/${employee.image}`}
              src={`http://localhost:3000/uploads/${employee.image}`} // Assuming `employee.image` contains the image filename or path
              alt={employee.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">{employee.name}</h3>
      </div>

      <div className="mt-4 space-y-2 text-gray-700">
        {Object.entries(employee).map(([key, value]) => (
          !["password", "_id","__v", "image"].includes(key) && (
            <div key={key} className="flex justify-between items-center border-b border-gray-200 pb-1">
              <p className="font-semibold capitalize text-gray-600 text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}:</p>
              <p className="text-gray-700 text-sm">{value || 'N/A'}</p>
            </div>
          )
        ))}
      </div>
    </div>
  </div>
);
};


export default EmployeeDetails;
