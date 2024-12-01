import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { FaUsers, FaBuilding, FaMoneyBillWave, FaCheck, FaTimes, FaHourglassHalf } from "react-icons/fa";
import { MdOutlineApproval } from "react-icons/md";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const AdminSummary = () => {
  const {user} = useAuth()
  const [departmentCount, setDepartmentCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [salaryCount, setSalaryCount] = useState(0);
  const [statusCounts, setStatusCounts] = useState({});
  const [summary, setSummary] = useState({
    approved: 0,
    pending: 0,
    declined: 0,
  });
  // Fetch department count
  useEffect(() => {
    const fetchDepartmentCount = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/departments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Assume that response.data.data holds the department list
        setDepartmentCount(response.data.data.length);
      } catch (error) {
        console.error("Error fetching department count data", error);
      }
    };
    fetchDepartmentCount();
  }, []);

  // Fetch employee count
  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Assume that response.data.data holds the employee list
        setEmployeeCount(response.data.data.length);
      } catch (error) {
        console.error("Error fetching employee count data", error);
      }
    };
    fetchEmployeeCount();
  }, []);

  useEffect(() => {
    const fetchSalaryCount = async () => {
      console.log("inside salarycocunt")
      try {
        const response = await axios.get("http://localhost:3000/api/salary/total", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response)
        // Assume that response.data.data holds the department list
        setSalaryCount(response.data.salary || 0);
      } catch (error) {
        console.error("Error fetching department count data", error);
      }
    };
    fetchSalaryCount();
  }, []); 


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

  // const handleStatusChange = async (leaveId, status) => {
  //   try {
  //     await axios.patch(
  //       `http://localhost:3000/api/leave/status/${leaveId}`,
  //       { status },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     fetchLeaves(); // Re-fetch leaves to reflect changes
  //   } catch (error) {
  //     console.error("Error updating leave status", error);
  //   }
  // };

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

//   useEffect(() => {
//     const fetchLeaveStatus = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/leaves/status-count');
//             const data = response.data;

//             // Convert array to an object for easy access
//             const counts = data.reduce((acc, item) => {
//                 acc[item._id] = item.count;
//                 return acc;
//             }, {});
//             setStatusCounts(counts);
//         } catch (error) {
//             console.error("Error fetching leave status:", error);
//         }
//     };

//     fetchLeaveStatus();
// }, []);
  

  return (
    <div className="space-y-8 p-6">
      {/* Dashboard Overview Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Dashboard Overview
        </h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            icon={<FaUsers className="text-green-500 text-3xl" />}
            text="Total Employees"
            number={employeeCount} // Display dynamic employee count
          />
          <SummaryCard
            icon={<FaBuilding className="text-indigo-500 text-3xl" />}
            text="Total Departments"
            number={departmentCount} // Display dynamic department count
          />
          <SummaryCard
            icon={<FaMoneyBillWave className="text-yellow-500 text-3xl" />}
            text="Monthly Pay"
            number={`₹${salaryCount.toLocaleString()}`}
          />
        </div>
      </div>

      {/* Leave Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Leave Details
        </h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            icon={<FaCheck className="text-blue-500 text-3xl" />}
            text="Leave Applied"
            number={0}
          />
          <SummaryCard
            icon={<MdOutlineApproval className="text-green-500 text-3xl" />}
            text="Leave Approved"
            number={summary.approved}
          />
          <SummaryCard
            icon={<FaTimes className="text-red-500 text-3xl" />}
            text="Leave Rejected"
            number={summary.rejected || 0}
          />
          <SummaryCard
            icon={<FaHourglassHalf className="text-orange-500 text-3xl" />}
            text="Leave Pending"
            number={summary.pending || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;



 //old data

// import React, { useEffect, useState } from "react";
// import SummaryCard from "./SummaryCard";
// import { FaUsers, FaBuilding, FaMoneyBillWave, FaCheck, FaTimes, FaHourglassHalf } from "react-icons/fa";
// import { MdOutlineApproval } from "react-icons/md";
// import axios from "axios";


// const AdminSummary = () => {
//   const [departmentCount, setDepartmentCount] = useState(0);
//   const [employeeCount, setEmployeeCount] = useState(0);
//   // const [summary, setSummary] = useState(null);

//   //fetch details from server   
//   // useEffect (()=>{
//   //   const fetchSummary = async ()=>{
//   //     console.log("=============== summary")
//   //     try {
//   //        const response = await axios.get("http://localhost:3000/api/dashboard/summary",{
//   //         headers:{
//   //           Authorization:`Bearer ${localStorage.getItem("token")}`
//   //         }
//   //        })
//   //        setSummary(summary)
//   //     } catch (error) {
//   //       if(error.response){
//   //         alert(error.response.data.error)
//   //       }
//   //       console.log(error)
//   //     }
//   //   }
//   //   fetchSummary()
//   // },[])

//   if(!summary){
//     return <div> Loading .. .. ..</div>
//   }

//   // Fetch department count
//   useEffect(() => {
//     const fetchDepartmentCount = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/departments", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         // Assume that response.data.data holds the department list
//         setDepartmentCount(response.data.data.length);
//       } catch (error) {
//         console.error("Error fetching department count data", error);
//       }
//     };
//     fetchDepartmentCount();
//   }, []);

//   // Fetch employee count
//   useEffect(() => {
//     const fetchEmployeeCount = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/employees", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         // Assume that response.data.data holds the employee list
//         setEmployeeCount(response.data.data.length);
//       } catch (error) {
//         console.error("Error fetching employee count data", error);
//       }
//     };
//     fetchEmployeeCount();
//   }, []);

//   return (
//     <div className="space-y-8 p-6">
//       {/* Dashboard Overview Section */}
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-6">
//           Dashboard Overview
//         </h3>
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           <SummaryCard
//             icon={<FaUsers className="text-green-500 text-3xl" />}
//             text="Total Employees"
//             number={summary.totalEmployees} // Display dynamic employee count
//           />
//           <SummaryCard
//             icon={<FaBuilding className="text-indigo-500 text-3xl" />}
//             text="Total Departments"
//             number={summary.totalDepartments} // Display dynamic department count
//           />
//           <SummaryCard
//             icon={<FaMoneyBillWave className="text-yellow-500 text-3xl" />}
//             text="Monthly Pay"
//             number={summary.totalSalary}
//           />
//         </div>
//       </div>

//       {/* Leave Details Section */}
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-6">
//           Leave Details
//         </h3>
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           <SummaryCard
//             icon={<FaCheck className="text-blue-500 text-3xl" />}
//             text="Leave Applied"
//             number={10}
//           />
//           <SummaryCard
//             icon={<MdOutlineApproval className="text-green-500 text-3xl" />}
//             text="Leave Approved"
//             number={3}
//           />
//           <SummaryCard
//             icon={<FaTimes className="text-red-500 text-3xl" />}
//             text="Leave Rejected"
//             number={3}
//           />
//           <SummaryCard
//             icon={<FaHourglassHalf className="text-orange-500 text-3xl" />}
//             text="Leave Pending"
//             number={4}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSummary;
