import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceList = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAttendance = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://hrms-mern-project.onrender.com/api/attendance/all/${date}`);
      setAttendanceData(response.data);
    } catch (err) {
      setError('Error fetching attendance data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance(); // Fetch attendance when the component loads or the date changes
  }, [date]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="p-6 bg-white text-gray-800 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>

      {/* Date Picker */}
      <div className="mb-6">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Select Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          className="mt-1 block w-48 border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Loading/Error */}
      {loading && <p>Loading attendance data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Attendance Table */}
      {!loading && attendanceData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600 text-left text-sm uppercase font-medium">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Check-In Time</th>
                <th className="px-4 py-2">Check-Out Time</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {attendanceData.map((record) => (
                <tr key={record._id} className="border-b">
                  <td className="px-4 py-2">{record.userId?.name || 'N/A'}</td>
                  <td className="px-4 py-2">{record.userId?.email || 'N/A'}</td>
                  <td className="px-4 py-2">
                    {record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : 'Not Checked In'}
                  </td>
                  <td className="px-4 py-2">
                    {record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : 'Not Checked Out'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Records */}
      {!loading && attendanceData.length === 0 && <p>No attendance records found for {date}.</p>}
    </div>
  );
};

export default AttendanceList;
