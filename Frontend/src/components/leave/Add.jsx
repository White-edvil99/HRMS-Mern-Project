import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLeave = () => {
  const { user } = useAuth(); // Get user details from AuthContext
  const navigate = useNavigate();

  // State for leave form
  const [leave, setLeave] = useState({
    userId: user?._id || '', // Ensure user ID is fetched properly
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: '',
  });

  // State for leave types
  const [leaveTypes, setLeaveTypes] = useState([]);

  // Fetch leave types from API
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/leave-type/types', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // console.log(response)
      const leaveTypesArray = response.data.leaveTypes;
      if (Array.isArray(leaveTypesArray)) {
        setLeaveTypes(leaveTypesArray);
      } else {
        console.error('leaveTypes is not an array');
      }
      } catch (err) {
        console.error('Error fetching leave types:', err);
      }
    };

    fetchLeaveTypes();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/leave/add/${user._id}`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        alert('Leave request submitted successfully.');
        navigate('/employee-dashboard/leaves'); // Redirect to leave dashboard
      } else {
        alert('Failed to submit leave request.');
      }
    } catch (err) {
      console.error('Error adding leave request:', err);
      alert('An error occurred while submitting the leave request.');
    }
  };

  return (
    <div className="max-w-4xl bg-white p-8 mx-auto rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Leave Type</label>
            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md"
              required
            >
              <option value="">Select Leave Type</option>
              {leaveTypes.map((type) => (
                <option key={type._id} value={type.leavename}>
                  {type.leavename}
                </option>
              ))}
            </select>
          </div>

          {/* From and To Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={leave.fromDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">To Date</label>
              <input
                type="date"
                name="toDate"
                value={leave.toDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Reason</label>
            <textarea
              name="reason"
              value={leave.reason}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Provide a brief reason for leave"
              required
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
          >
            Submit Leave Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLeave;

