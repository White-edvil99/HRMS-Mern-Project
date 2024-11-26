import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLeave = () => {
  const { user } = useAuth(); // Get user details from AuthContext
  const navigate = useNavigate();

  // Initial state for leave
  const [leave, setLeave] = useState({
    userId: user?._id || '', // Ensure user ID is fetched properly
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: '',
  });

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
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="privilege">Privilege Leave</option>
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








// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const AddLeave = () => {
//   const { id } = useParams(); // ID of the employee if passed
//   const { user } = useAuth(); // Ensure `user` is fetched from context and contains `_id`
//   const navigate = useNavigate();
  
//   // Setting initial leave state with UserId from the logged-in user's `_id`
//   const [leave, setLeave] = useState({
//     userId: user._id,
//     leaveType: '',
//     fromDate: '',
//     toDate: '',
//     reason: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLeave((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Sending leave request data to backend API
//       const response = await axios.post(`http://localhost:3000/api/leave/add/${id}`, leave, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (response.data.success) {
//         navigate('/employee-dashboard/leave'); // Navigate to leave dashboard if success
//       }
//     } catch (err) {
//       console.error("Error adding leave request", err);
//     }
//   };

//   return (
    // <div className='max-w-4xl bg-white p-8 mx-6 rounded-md shadow-md'>
    //   <h2 className='text-2xl font-bold mb-6'>Request for Leave</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className='flex flex-col space-y-4'>
    //       <div>
    //         <label className='block text-sm font-medium text-gray-700'>Leave Type</label>
    //         <select
    //           name="leaveType"
    //           value={leave.leaveType}
    //           onChange={handleChange}
    //           className='mt-1 p-2 block w-full border-gray-300 rounded-md'
    //           required
    //         >
    //           <option value="">Select Leave Type</option>
    //           <option value="sick">Sick Leave</option>
    //           <option value="casual">Casual Leave</option>
    //           <option value="privilege">Privilege Leave</option>
    //         </select>
    //       </div>
    //       <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
    //         <div>
    //           <label className="block mb-2">From Date</label>
    //           <input
    //             type="date"
    //             name="fromDate"
    //             value={leave.fromDate}
    //             onChange={handleChange}
    //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
    //             required
    //           />
    //         </div>
    //         <div>
    //           <label className="block mb-2">To Date</label>
    //           <input
    //             type="date"
    //             name="toDate"
    //             value={leave.toDate}
    //             onChange={handleChange}
    //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
    //             required
    //           />
    //         </div>
    //       </div>
    //       <div>
    //         <label htmlFor="reason" className='block text-sm font-medium text-gray-700'>Description</label>
    //         <textarea
    //           className='border-gray-300 mt-1 p-2 w-full border rounded-md'
    //           id="reason"
    //           name="reason"
    //           rows="4"
    //           value={leave.reason}
    //           onChange={handleChange}
    //           required
    //         ></textarea>
    //       </div>
    //     </div>
    //     <div>
    //       <button type="submit" className='w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded'>Add Leave</button>
    //     </div>
    //   </form>
    // </div>
//   );
// };

// export default AddLeave;




// // import React, { useState } from 'react';
// // import { useAuth } from '../../context/AuthContext';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import axios from 'axios';

// // const AddLeave = () => {
// //   const { id } = useParams();
// //   const { user } = useAuth(); // Ensure you are destructuring `user` correctly
// //   const navigate = useNavigate();
// //   const [leave, setLeave] = useState({
// //     UserId: user._id, // Ensure `user` has the `_id` property
// //     leaveType: '',
// //     fromDate: '',
// //     toDate: '',
// //     reason: ''
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setLeave((prevState) => ({ ...prevState, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     // const { id } = useParams();
// //     e.preventDefault();
// //     try {
// //       console.log(id)
// //       const response = await axios.post(`http://localhost:3000/api/leave/add/${id}`, leave, {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       });
// //      if(response.data.success){
// //         navigate('/employee-dashboard/leave');
// //      }
// //     } catch (err) {
// //       console.error("Error adding leave request", err);
// //     }
// //   };

// //   return (
// //     <div className='max-w-4xl bg-white p-8 mx-6 rounded-md shadow-md'>
// //       <h2 className='text-2xl font-bold mb-6'>Request for Leave</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div className='flex flex-col space-y-4'>
// //           <div>
// //             <label className='block text-sm font-medium text-gray-700'>Leave Type</label>
// //             <select
// //               name="leaveType"
// //               onChange={handleChange}
// //               className='mt-1 p-2 block w-full border-gray-300 rounded-md'
// //               required
// //             >
// //               <option value="">Select Leave Type</option>
// //               <option value="sick">Sick Leave</option>
// //               <option value="casual">Casual Leave</option>
// //               <option value="privilege">Privilege Leave</option>
// //             </select>
// //           </div>
// //           <div className='grid grid-col-1 md:grid-col-2 gap-4'>
// //             <div>
// //               <label className="block mb-2">From Date</label>
// //               <input
// //                 type="date"
// //                 name="fromDate"
// //                 onChange={handleChange}
// //                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2">To Date</label>
// //               <input
// //                 type="date"
// //                 name="toDate"
// //                 onChange={handleChange}
// //                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
// //                 required
// //               />
// //             </div>
// //           </div>
// //           <div>
// //             <label htmlFor="reason">Description:</label><br />
// //             <textarea
// //               className='border-solid w-full'
// //               id="reason"
// //               name="reason"
// //               rows="4"
// //               cols="50"
// //               onChange={handleChange}
// //             ></textarea>
// //           </div>
// //         </div>
// //         <div>
// //           <button className='w-full mt-6 bg-[#2563eb] hover:bg-[rgb(32,99,243)] text-white font-bold px-4 py-2 rounded'>Add Leave</button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddLeave;
