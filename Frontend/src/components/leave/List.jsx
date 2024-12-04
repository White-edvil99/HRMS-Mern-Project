import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import { BsClockHistory, BsPersonCheck, BsXCircle } from "react-icons/bs";

const List = () => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [leaveType, setLeaveType] = useState([]);
  const [monthlyQuota, setMonthlyQuota] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [selectedType, setSelectedType] = useState(""); // State for selected leave type
  const [summary, setSummary] = useState({
    approved: 0,
    pending: 0,
    declined: 0,
  });

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
      if (response.data.leaves) {
        setLeaves(response.data.leaves);
        setFilteredLeaves(response.data.leaves); // Initialize filtered leaves
        calculateSummary(response.data.leaves);
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
      fetchLeaves(); // Re-fetch leaves to reflect changes
    } catch (error) {
      console.error("Error updating leave status", error);
    }
  };

  const calculateSummary = (leaves) => {
    const summaryData = {
      approved: leaves.filter((leave) => leave.status === "approved").length,
      pending: leaves.filter((leave) => leave.status === "pending").length,
      declined: leaves.filter((leave) => leave.status === "rejected").length,
    };
    setSummary(summaryData);
  };

  useEffect(() => {
    fetchLeaves();
  }, [user?._id]);

  // Filter Leaves Based on Selected Type
  useEffect(() => {
    if (selectedType) {
      setFilteredLeaves(
        leaves.filter((leave) => leave.leaveType.toLowerCase() === selectedType)
      );
    } else {
      setFilteredLeaves(leaves);
    }
  }, [selectedType, leaves]);

  //leave type posting
  const handleAddLeaveType = async (leavename, monthlyQuota) => {
    if (!leavename || !monthlyQuota) {
      alert("please provide valid leave type and monthly quota");
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/leave-type/add",
        { leavename, monthlyQuota },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("Response:", response);
      alert(response.data.message);
      setIsOpen(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error adding leave type.";
      console.error("Error adding leave type:", errorMessage);
      alert(errorMessage); // Show user-friendly message
    }
  };

  // fetch leave type
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/leave-type/types",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log(response);
        const leaveTypesArray = response.data.leaveTypes;
        if (Array.isArray(leaveTypesArray)) {
          setLeaveTypes(leaveTypesArray);
        } else {
          console.error("leaveTypes is not an array");
        }
      } catch (err) {
        console.error("Error fetching leave types:", err);
      }
    };

    fetchLeaveTypes();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h3 className="text-2xl font-bold text-gray-700 mb-4">Leave Requests</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <div>
            <h4 className="text-lg font-semibold text-gray-600">Approved</h4>
            <p className="text-3xl font-bold text-green-600">
              {summary.approved}
            </p>
          </div>
          <BsPersonCheck className="text-4xl text-green-500" />
        </div>
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <div>
            <h4 className="text-lg font-semibold text-gray-600">Pending</h4>
            <p className="text-3xl font-bold text-yellow-600">
              {summary.pending}
            </p>
          </div>
          <BsClockHistory className="text-4xl text-yellow-500" />
        </div>
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <div>
            <h4 className="text-lg font-semibold text-gray-600">Declined</h4>
            <p className="text-3xl font-bold text-red-600">
              {summary.declined}
            </p>
          </div>
          <BsXCircle className="text-4xl text-red-500" />
        </div>
      </div>

      {/* Filter and Add Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-4">
          <select
            className="border px-4 py-2 rounded"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value.toLowerCase())}
          >
            <option value="">All Types</option>
            {leaveTypes.map((type) => (
              <option key={type._id} value={type.leavename.toLowerCase()}>
                {type.leavename}
              </option>
            ))}
          </select>

          <select className="border px-4 py-2 rounded">
            <option value="">2024</option>
            <option value="">2023</option>a
          </select>

          <div className="flex items-center justify-center bg-gray-100">
            {/* Trigger Button */}
            {user?.role !=="employee" && 
            <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Create Leave Type
            </button>
            }
            </div>
            {/* Popup */}
    
            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg w-1/3">
                  <h2 className="text-lg font-bold mb-4">Create Leave Type</h2>
                  <input
                    type="text"
                    placeholder="Leave Type"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="border p-2 mb-4 w-full"
                  />
                  <input
                    type="number"
                    placeholder="Monthly Quota"
                    value={monthlyQuota}
                    onChange={(e) => setMonthlyQuota(e.target.value)}
                    className="border p-2 mb-4 w-full"
                  />
                  <button
                    onClick={() => handleAddLeaveType(leaveType, monthlyQuota)}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Add Leave Type
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
         
        </div>

        {user?.role == "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
          >
            Add Leave
          </Link>
        )}
      </div>

      {/* Leave Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-600 bg-white shadow rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">S.No</th>
              <th className="px-4 py-3">Employee Name</th>
              <th className="px-4 py-3">Leave Type</th>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">To</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Status</th>
              {user?.role === "admin" && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredLeaves
              .filter((leave) => leave.employeeId?.name)
              .map((leave, index) => (
                <tr key={leave._id} className="border-b">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    {leave.employeeId?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3">{leave.leaveType}</td>
                  <td className="px-4 py-3">
                    {new Date(leave.fromDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(leave.toDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{leave.reason}</td>
                  <td
                    className={`px-4 py-3 font-bold ${
                      leave.status === "approved"
                        ? "text-green-600"
                        : leave.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {leave.status.toUpperCase()}
                  </td>
                  {user?.role === "admin" && (
                    <td className="px-4 py-3 flex justify-center space-x-2">
                      <button
                        onClick={() =>
                          handleStatusChange(leave._id, "approved")
                        }
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(leave._id, "rejected")
                        }
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
