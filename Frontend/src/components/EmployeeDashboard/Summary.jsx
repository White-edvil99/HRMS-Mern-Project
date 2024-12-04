import React, { useEffect, useState } from "react";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Summary = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState('');
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [isCheckedIn, setIsCheckedIn] = useState(false); // Active state for Check-In button

  const handleCheckIn = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/attendance/checkin', { userId: user._id });
      setStatus(response.data.message);
      setAttendance((prev) => ({ ...prev, checkIn: response.data.attendance.checkIn }));
      setIsCheckedIn(true); // Set active state to true on check-in
    } catch (err) {
      console.error(err);
      setStatus('Error checking in, You have already checked In today.');
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/attendance/checkout', { userId: user._id });
      setStatus(response.data.message);
      setAttendance((prev) => ({ ...prev, checkOut: response.data.attendance.checkOut }));
      setIsCheckedIn(false); // Reset active state on check-out
    } catch (err) {
      console.error(err);
      setStatus('Error checking out, You have already checked Out today');
    }
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/attendance/today/${user._id}`);
        setAttendance(response.data);
        // Automatically set active state based on attendance data
        if (response.data.checkIn && !response.data.checkOut) {
          setIsCheckedIn(true);
        }
      } catch (err) {
        console.error('Error fetching attendance:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchAttendance();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      {/* Welcome Card */}
      <div className="rounded-lg flex items-center bg-teal-500 shadow-md p-6 mb-6">
        <div className="text-4xl flex justify-center items-center bg-teal-600 text-white w-16 h-16 rounded-full">
          <FaUser />
        </div>
        <div className="pl-6">
          <p className="text-lg font-semibold text-white">Welcome back</p>
          <p className="text-xl font-bold text-white">{user.name}</p>
        </div>
      </div>

      {/* Check-In / Check-Out Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div className="bg-teal-100 rounded-lg shadow-lg p-6 flex flex-col justify-between items-start">
          <h2 className="text-gray-700 text-lg font-semibold mb-4">Attendance Actions</h2>
          <div className="flex gap-4">
            <button
              onClick={handleCheckIn}
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg focus:ring focus:ring-teal-300 transition duration-200 
                ${isCheckedIn ? 'bg-green-500 text-white' : 'bg-teal-500 text-white hover:bg-teal-600'}`}
            >
              <FaSignInAlt className="text-lg" />
              {isCheckedIn ? "Checked In" : "Check In"}
            </button>
            <button
              onClick={handleCheckOut}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-full shadow-lg hover:bg-gray-600 focus:ring focus:ring-gray-300 transition duration-200"
            >
              <FaSignOutAlt className="text-lg" />
              Check Out
            </button>
          </div>
          <p className="text-gray-700 mt-4">{status}</p>

          <div className="mt-6">
            <h3 className="text-gray-700 text-md font-medium">Your Attendance for Today</h3>
            <p className="text-gray-800 mt-2">
              <span>Check-In Time:</span>{" "}
              <strong>
                {attendance.checkIn
                  ? new Date(attendance.checkIn).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "Not checked in yet"}
              </strong>
            </p>
            <p className="text-gray-800 mt-1">
              <span>Check-Out Time:</span>{" "}
              <strong>
                {attendance.checkOut
                  ? new Date(attendance.checkOut).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "Not checked out yet"}
              </strong>
            </p>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-teal-100 rounded-lg shadow-md p-6">
          <h3 className="text-gray-700 text-lg font-semibold mb-4">Calendar</h3>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

// Functional Calendar Component
const Calendar = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const startDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null); // Empty days at the start of the month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i); // Days in the current month
  }

  return (
    <div>
      <div className="grid grid-cols-7 text-gray-500 font-medium mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`p-2 text-sm rounded-lg ${day
                ? day === today.getDate()
                  ? "bg-teal-500 text-white"
                  : "bg-teal-100 text-gray-800"
                : ""
              }`}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;



// import React, { useEffect, useState } from "react";
// import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
// import { useAuth } from "../../context/AuthContext";
// import axios from "axios";

// const Summary = () => {
//   const { user } = useAuth();
//   console.log("hello: ", user);
//   const [status, setStatus] = useState("");
//   const [attendance, setAttendance] = useState({});
//   const [loading, setLoading] = useState(true);

//   const handleCheckIn = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/attendance/checkin",
//         { userId: user._id }
//       );
//       setStatus(response.data.message);
//       setAttendance((prev) => ({
//         ...prev,
//         checkIn: response.data.attendance.checkIn,
//       }));
//     } catch (err) {
//       console.error(err);
//       setStatus("Error checking in.");
//     }
//   };

//   const handleCheckOut = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/attendance/checkout",
//         { userId: user._id }
//       );
//       setStatus(response.data.message);
//       setAttendance((prev) => ({
//         ...prev,
//         checkOut: response.data.attendance.checkOut,
//       }));
//     } catch (err) {
//       console.error(err);
//       setStatus("Error checking out.");
//     }
//   };

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/attendance/today/${user._id}`
//         );
//         setAttendance(response.data);
//       } catch (err) {
//         console.error("Error fetching attendance:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?._id) fetchAttendance();
//   }, [user]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6 bg-white min-h-screen text-gray-800">
//       {/* Welcome Card */}
//       <div className="rounded-lg flex items-center bg-teal-500 shadow-md p-6 mb-6">
//         <div className="text-4xl flex justify-center items-center bg-teal-600 text-white w-16 h-16 rounded-full">
//           <FaUser />
//         </div>
//         <div className="pl-6">
//           <p className="text-lg font-semibold text-white">Welcome back</p>
//           <p className="text-xl font-bold text-white">{user.name}</p>
//         </div>
//       </div>

//       {/* Dashboard Summary */}
//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-teal-100 rounded-lg shadow-md p-4">
//           <h3 className="text-gray-700 text-lg font-semibold">Ongoing Projects</h3>
//           <p className="text-teal-500 text-2xl font-bold">25</p>
//           <p className="text-gray-500 text-sm">Completed this month: 5</p>
//         </div>

//         <div className="bg-teal-100 rounded-lg shadow-md p-4">
//           <h3 className="text-gray-700 text-lg font-semibold">Active Developers</h3>
//           <p className="text-teal-500 text-2xl font-bold">42</p>
//           <p className="text-gray-500 text-sm">On leave: 3</p>
//         </div>

//         <div className="bg-teal-100 rounded-lg shadow-md p-4">
//           <h3 className="text-gray-700 text-lg font-semibold">Monthly Revenue</h3>
//           <p className="text-teal-500 text-2xl font-bold">$120,000</p>
//           <p className="text-gray-500 text-sm">Growth: 12%</p>
//         </div>
//       </div> */}

//       {/* Content with Calendar */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
//         {/* IT Project Summary */}
//         {/* <div className="bg-teal-100 rounded-lg shadow-md p-6">
//           <div>
//             <button onClick={handleCheckIn}>Check In</button>
//             <button onClick={handleCheckOut}>Check Out</button>
//             <p>{status}</p>
//           </div>

//           <div>
//   <h2>Your Attendance for Today</h2>
//   <p>
//     Check-In Time: 
//     {attendance.checkIn 
//       ? new Date(attendance.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
//       : 'Not checked in yet'}
//   </p>
//   <p>
//     Check-Out Time: 
//     {attendance.checkOut 
//       ? new Date(attendance.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
//       : 'Not checked out yet'}
//   </p>
// </div>

//         </div> */}
//         {/* Check-In / Check-Out Section */}
//         <div className="bg-teal-100 rounded-lg shadow-md p-6 flex flex-col justify-between items-start">
//           <h2 className="text-gray-700 text-lg font-semibold mb-4">
//             Attendance Actions
//           </h2>
//           <div className="flex gap-4">
//             <button
//               onClick={handleCheckIn}
//               className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 focus:ring focus:ring-teal-300 transition duration-200"
//             >
//               Check In
//             </button>
//             <button
//               onClick={handleCheckOut}
//               className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 focus:ring focus:ring-gray-300 transition duration-200"
//             >
//               Check Out
//             </button>
//           </div>
//           <p className="text-gray-700 mt-4">{status}</p>

//           <div className="mt-6">
//             <h3 className="text-gray-700 text-md font-medium">
//               Your Attendance for Today
//             </h3>
//             <p className="text-gray-800 mt-2">
//               <strong>Check-In Time:</strong>{" "}
//               {attendance.checkIn
//                 ? new Date(attendance.checkIn).toLocaleTimeString("en-US", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                     second: "2-digit",
//                   })
//                 : "Not checked in yet"}
//             </p>
//             <p className="text-gray-800 mt-1">
//               <strong>Check-Out Time:</strong>{" "}
//               {attendance.checkOut
//                 ? new Date(attendance.checkOut).toLocaleTimeString("en-US", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                     second: "2-digit",
//                   })
//                 : "Not checked out yet"}
//             </p>
//           </div>
//         </div>

//         {/* Calendar */}
//         <div className="bg-teal-100 rounded-lg shadow-md p-6">
//           <h3 className="text-gray-700 text-lg font-semibold mb-4">Calendar</h3>
//           <Calendar />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Functional Calendar Component
// const Calendar = () => {
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const today = new Date();
//   const startDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
//   const daysInMonth = new Date(
//     today.getFullYear(),
//     today.getMonth() + 1,
//     0
//   ).getDate();

//   const calendarDays = [];
//   for (let i = 0; i < startDay; i++) {
//     calendarDays.push(null); // Empty days at the start of the month
//   }
//   for (let i = 1; i <= daysInMonth; i++) {
//     calendarDays.push(i); // Days in the current month
//   }

//   return (
//     <div>
//       <div className="grid grid-cols-7 text-gray-500 font-medium mb-2">
//         {days.map((day) => (
//           <div key={day} className="text-center text-sm">
//             {day}
//           </div>
//         ))}
//       </div>
//       <div className="grid grid-cols-7 gap-2 text-center">
//         {calendarDays.map((day, index) => (
//           <div
//             key={index}
//             className={`p-2 text-sm rounded-lg ${
//               day
//                 ? day === today.getDate()
//                   ? "bg-teal-500 text-white"
//                   : "bg-teal-100 text-gray-800"
//                 : ""
//             }`}
//           >
//             {day || ""}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Summary;

// import React from "react";
// import { FaUser } from "react-icons/fa";
// import { useAuth } from "../../context/AuthContext";

// const Summary = () => {
//   const { user } = useAuth();

//   return (
//     <div className="p-6 bg-[#1B1F2A] min-h-screen text-gray-300">
//       {/* Welcome Card */}
//       <div className="rounded-lg flex items-center bg-[#2A2F3A] shadow-md p-6 mb-6">
//         <div className="text-4xl flex justify-center items-center bg-teal-600 text-white w-16 h-16 rounded-full">
//           <FaUser />
//         </div>
//         <div className="pl-6">
//           <p className="text-lg font-semibold">Welcome back</p>
//           <p className="text-xl font-bold">{user.name}</p>
//         </div>
//       </div>

//       {/* Dashboard Summary */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-[#2A2F3A] rounded-lg shadow-md p-4">
//           <h3 className="text-gray-300 text-lg font-semibold">Ongoing Projects</h3>
//           <p className="text-teal-500 text-2xl font-bold">25</p>
//           <p className="text-gray-500 text-sm">Completed this month: 5</p>
//         </div>

//         <div className="bg-[#2A2F3A] rounded-lg shadow-md p-4">
//           <h3 className="text-gray-300 text-lg font-semibold">Active Developers</h3>
//           <p className="text-teal-500 text-2xl font-bold">42</p>
//           <p className="text-gray-500 text-sm">On leave: 3</p>
//         </div>

//               // FETCH THIS DATA FROM SALARY OF Employee
//         <div className="bg-[#2A2F3A] rounded-lg shadow-md p-4">
//           <h3 className="text-gray-300 text-lg font-semibold">Monthly Revenue</h3>
//           <p className="text-teal-500 text-2xl font-bold">$120,000</p>
//           <p className="text-gray-500 text-sm">Growth: 12%</p>
//         </div>
//       </div>

//       {/* Content with Calendar */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//         {/* Hospital Survey / Additional Info */}
//         <div className="bg-[#2A2F3A] rounded-lg shadow-md p-6">
//           <h3 className="text-gray-300 text-lg font-semibold">IT Project Summary</h3>
//           <div className="mt-4">
//             {/* Replace with a chart or any summary data */}
//             <p className="text-gray-500">General Overview of Projects</p>
//           </div>
//         </div>

//         {/* Calendar */}
//         <div className="bg-[#2A2F3A] rounded-lg shadow-md p-6">
//           <h3 className="text-gray-300 text-lg font-semibold mb-4">Calendar</h3>
//           <Calendar />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Functional Calendar Component
// const Calendar = () => {
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const today = new Date();
//   const startDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
//   const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

//   const calendarDays = [];
//   for (let i = 0; i < startDay; i++) {
//     calendarDays.push(null); // Empty days at the start of the month
//   }
//   for (let i = 1; i <= daysInMonth; i++) {
//     calendarDays.push(i); // Days in the current month
//   }

//   return (
//     <div>
//       <div className="grid grid-cols-7 text-gray-500 font-medium mb-2">
//         {days.map((day) => (
//           <div key={day} className="text-center text-sm">
//             {day}
//           </div>
//         ))}
//       </div>
//       <div className="grid grid-cols-7 gap-2 text-center">
//         {calendarDays.map((day, index) => (
//           <div
//             key={index}
//             className={`p-2 text-sm rounded-lg ${
//               day
//                 ? day === today.getDate()
//                   ? "bg-teal-500 text-white"
//                   : "bg-[#1B1F2A] text-gray-300"
//                 : ""
//             }`}
//           >
//             {day || ""}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Summary;
