import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegMoneyBillAlt, FaCalendarAlt, FaUserAlt } from "react-icons/fa";

const ViewSalary = () => {
  const { id } = useParams();
  const [salaryData, setSalaryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalaryDetails = async () => {
      // console.log("=========hello salary start");
      try {
        const response = await axios.get(
          `https://hrms-mern-project.onrender.com/api/salary/${id}`, // Replace with actual endpoint
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log(response);
        // console.log("========salary end");

        // Ensure that salaryData is always an array
        const data = response.data.salary;
        if (Array.isArray(data)) {
          setSalaryData(data); // Set as an array if it's already an array
        } else {
          setSalaryData([data]); // Wrap it in an array if it's a single object
        }
      } catch (err) {
        console.error("Error fetching salary details", err);
      }
    };

    fetchSalaryDetails();
  }, [id]);

  // If no salary data, show a message
  if (salaryData.length === 0) {
    return (
      <div className="flex w-full h-screen text-center justify-center">
        <h2 className="text-3xl text-red-600">Salary data not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white text-gray-800">
      <h2 className="text-2xl font-bold text-center mb-4 text-teal-700">Salary Details</h2>

      <button
        onClick={() => navigate(-1)}
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-full mb-4 shadow-md"
      >
        Back to Employee List
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        {/* Table Section */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="text-left bg-teal-50">
              <th className="py-2 px-4 text-sm font-semibold text-teal-600">S.No</th>
              <th className="py-2 px-4 text-sm font-semibold text-teal-600">Emp ID</th>
              <th className="py-2 px-4 text-sm font-semibold text-teal-600">Employee Name</th>
              <th className="py-2 px-4 text-sm font-semibold text-teal-600">Salary</th>
              <th className="py-2 px-4 text-sm font-semibold text-teal-600">Allowance</th>
              <th className="py-2 px-4 text-sm font-semibold text-teal-600">Deduction</th>
              <th className="py-2 px-4 text-sm font-semibold text-teal-600">Total</th>
              <th className="py-2 px-4 text-sm font-semibold text-teal-600">Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((salary, index) => (
              <tr key={salary._id} className="border-b border-gray-200">
                <td className="py-2 px-4 text-sm text-gray-700">{index + 1}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary._id}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary.name}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary.employeeId?.salaryId?.basicSalary}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary.employeeId?.salaryId?.allowance}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary.employeeId?.salaryId?.deductions}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{salary.employeeId?.salaryId?.netSalary}</td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {new Date(salary.employeeId?.salaryId?.payDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSalary;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ViewSalary = () => {
//   const { id } = useParams();
//   const [salaryData, setSalaryData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSalaryDetails = async () => {
//       console.log("=========hello salary start");
//       try {
//         const response = await axios.get(
//           `https://hrms-mern-project.onrender.com/api/salary/${id}`, // Replace with actual endpoint
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         console.log(response);
//         console.log("========salary end");

//         // Ensure that salaryData is always an array
//         const data = response.data.salary;
//         if (Array.isArray(data)) {
//           setSalaryData(data); // Set as an array if it's already an array
//         } else {
//           setSalaryData([data]); // Wrap it in an array if it's a single object
//         }
//       } catch (err) {
//         console.error("Error fetching salary details", err);
//       }
//     };

//     fetchSalaryDetails();
//   }, [id]);

//   // If no salary data, show a message
//   if (salaryData.length === 0) {
//     return (
//       <div className="flex w-full h-screen text-center justify-center">
//         <h2 className="text-3xl text-red-600">Salary data not found</h2>
//       </div>
//     );
//   }
// console.log(salaryData)

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
//         Salary Details
//       </h2>

//       <button
//         onClick={() => navigate(-1)}
//         className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full mb-4 shadow-md"
//       >
//         Back to Employee List
//       </button>

//       <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
//         {/* Table Section */}
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//           <thead>
//             <tr className="text-left bg-gray-200">
//               <th className="py-2 px-4 text-sm font-semibold text-gray-600">S.No</th>
//               <th className="py-2 px-4 text-sm font-semibold text-gray-600">Emp ID</th>
//               <th className="py-2 px-4 text-sm font-semibold text-gray-600">Employee Name</th>
//               <th className="py-2 px-4 text-sm font-semibold text-gray-600">Salary</th>
//               <th className="py-2 px-4 text-sm font-semibold text-gray-600">Allowance</th>
//               <th className="py-2 px-4 text-sm font-semibold text-gray-600">Deduction</th>
//               <th className="py-2 px-4 text-sm font-semibold text-gray-600">Total</th>
//               <th className="py-2 px-4 text-sm font-semibold text-gray-600">Pay Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {salaryData.map((salary, index) => (
//               <tr key={salary._id} className="border-b border-gray-200">
//                 {console.log(salary)}
//                 <td className="py-2 px-4 text-sm text-gray-700">{index + 1}</td>
//                 <td className="py-2 px-4 text-sm text-gray-700">{salary._id}</td>
//                 <td className="py-2 px-4 text-sm text-gray-700">{salary.name}</td>
//                 <td className="py-2 px-4 text-sm text-gray-700">{salary.employeeId?.salaryId?.basicSalary
//                 }</td>
//                 <td className="py-2 px-4 text-sm text-gray-700">{salary.employeeId?.salaryId?.allowance}</td>
//                 <td className="py-2 px-4 text-sm text-gray-700">{salary.employeeId?.salaryId?.deductions}</td>
//                 <td className="py-2 px-4 text-sm text-gray-700">{salary.employeeId?.salaryId?.netSalary}</td>
//                 <td className="py-2 px-4 text-sm text-gray-700">
//                   {new Date(salary.employeeId?.salaryId?.payDate).toLocaleDateString()}
//                 </td>
//               </tr>
//               // check the response on chrome to convert allowance , dedutions netSalary 
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewSalary;
