import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddLeave = () => {
  const { id } = useParams();
  const { user } = useAuth(); // Ensure you are destructuring `user` correctly
  const navigate = useNavigate();
  const [leave, setLeave] = useState({
    UserId: user._id, // Ensure `user` has the `_id` property
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/leave/add/${id}`, leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
     if(response.data.success){
        navigate('/employee-dashboard/leave');
     }
    } catch (err) {
      console.error("Error adding leave request", err);
    }
  };

  return (
    <div className='max-w-4xl bg-white p-8 mx-6 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Leave Type</label>
            <select
              name="leaveType"
              onChange={handleChange}
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            >
              <option value="">Select Leave Type</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="privilege">Privilege Leave</option>
            </select>
          </div>
          <div className='grid grid-col-1 md:grid-col-2 gap-4'>
            <div>
              <label className="block mb-2">From Date</label>
              <input
                type="date"
                name="fromDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block mb-2">To Date</label>
              <input
                type="date"
                name="toDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="reason">Description:</label><br />
            <textarea
              className='border-solid w-full'
              id="reason"
              name="reason"
              rows="4"
              cols="50"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div>
          <button className='w-full mt-6 bg-[#2563eb] hover:bg-[rgb(32,99,243)] text-white font-bold px-4 py-2 rounded'>Add Leave</button>
        </div>
      </form>
    </div>
  );
};

export default AddLeave;




// import React, { useState } from 'react'
// import { useAuth } from '../../context/AuthContext'
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const AddLeave = () => {
//     const {id} = useParams();
//     const user = useAuth();
//     const navigate = useNavigate()
//     const [leave, setLeave] = useState({
//             UserId :user._id 
//     })
//     const handleChange =(e)=>{
//         const {name, value} = e.target
//         setLeave( (prevState)=>({...prevState, [name]:value }) )
//     }
//     const handleSubmit = async (e)=>{
        
//         e.preventDefault();
//         try {
//             const response = await axios.post(`http://localhost:3000/api/leave/add${id}`, {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             });
//             navigate('/employee-dashboard/leave')
//           } catch (err) {
//             console.error("Error fetching employee details", err);
//           }

//     }

//   return (
//     <div className='max-w-4xl  bg-white p-8 mx-6 rounded-md shadow-md'>
//       <h2 className='text-2xl font-bold mb-6'> Request for Leave</h2>
//       <form onClick={handleSubmit}> <div className='flex flex-col space-y-4'>
//         <div>
//             <label className='block text-sm font-medium text-gray-700 '>Leave Type</label>
//             <select name="leaveType" 
//             onChange={handleChange}
//              className='mt-1 p-2 block w-full border-gray-300 rounded-md ' required>
//                 <option value="">Sick Leave</option>
//                 <option value="">Casual Leave</option>
//                 <option value="">Privilage Leave</option>
                
//             </select>
//            <div className='grid grid-col-1 md:grid-col-2 gap-4'>
//            <div className=''>
//           <label className="block mb-2">From Date</label>
//           <input
//             type="date"
//             name="fromDate"
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
//             onChange={handleChange}
//             className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//            </div>
//            <div>
//            <label htmlFor="leave-description">Description:</label><br/>
//            <textarea className='border-solid w-full' id="reason" name="reason" rows="4" cols="50" onChange={handleChange} >
//            </textarea>
//            </div>
//             </div> </div>
//             <div>
//                 <button className='w-full mt-6 bg-[#2563eb] hover:bg-[rgb(32,99,243)] text-white font-bold px-4 py-2 rounded '> Add Leave</button>
//             </div>
//              </form>
//     </div>
//   )
// }

// export default AddLeave
