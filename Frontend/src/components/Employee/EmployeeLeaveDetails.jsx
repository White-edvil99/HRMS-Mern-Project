import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeLeaveDetails = () => {
  const { id } = useParams(); // Get employee ID from URL
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/employee/leaves/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
                },
            });

            console.log("Fetched employee leaves:", response); // Debugging
            setLeaves(response.data.leaves); // Update the state with the fetched leaves
        } catch (err) {
            console.error("Error fetching leave details", err);
        } finally {
            setLoading(false);
        }
    };

    fetchEmployeeLeaves();
}, [id]);


  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Leave Details</h2>
      {leaves.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Leave Type</th>
              <th className="py-2 px-4 border">From Date</th>
              <th className="py-2 px-4 border">To Date</th>
              <th className="py-2 px-4 border">Reason</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td className="py-2 px-4 border">{leave.leaveType}</td>
                <td className="py-2 px-4 border">{new Date(leave.fromDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{new Date(leave.toDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{leave.reason}</td>
                <td className="py-2 px-4 border">{leave.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leaves found for this employee.</p>
      )}
    </div>
  );
};

export default EmployeeLeaveDetails;
