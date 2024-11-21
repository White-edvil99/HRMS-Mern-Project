import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const List = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    if (!user?._id) return;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/leave/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.data.leaves) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  };

  const handleStatusChange = async (leaveId, status) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/leave/status/${leaveId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchLeaves(); // re-fetch leaves to reflect changes
    } catch (error) {
      console.error("Error updating leave status", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [user?._id]);

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        {/* search bar */}
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-0.5 border"
        />
        <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Leave
        </Link>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-6 py-3">SNO.</th>
            <th className="px-6 py-3">Employee Name</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Applied Date</th>
            <th className="px-6 py-3">Status</th>
            {user?.role === "admin" && (
              <th className="px-6 py-3">Actions</th>
            )}{" "}
            {/* Only show for admin */}
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={leave._id} className="bg-white border-b">
              <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3">{leave.employeeId?.name || "N/A"}</td>
              <td className="px-6 py-3">{leave.leaveType}</td>
              <td className="px-6 py-3">
                {new Date(leave.fromDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">
                {new Date(leave.toDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">{leave.reason}</td>
              <td className="px-6 py-3">
                {new Date(leave.appliedAt).toLocaleDateString()}
              </td>
              <td
                className={`px-6 py-3 font-bold ${
                  leave.status === "approved"
                    ? "text-green-600"
                    : leave.status === "rejected"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {leave.status.toUpperCase()}
              </td>
              {user?.role === "admin" && ( // Only show buttons for admin
              <td className="px-6 py-3 space-x-2 flex gap-2">
              <button
                onClick={() => handleStatusChange(leave._id, "approved")}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600 focus:ring-2 focus:ring-green-300 focus:outline-none"
              >
                <AiOutlineCheck className="text-lg" />
                Approve
              </button>
              <button
                onClick={() => handleStatusChange(leave._id, "rejected")}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded shadow-lg transition-transform transform hover:scale-105 hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
              >
                <AiOutlineClose className="text-lg" />
                Reject
              </button>
            </td>
              
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
