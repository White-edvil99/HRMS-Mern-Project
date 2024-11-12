import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log(response.data.data);
        setEmployees(response.data.data);
      } catch (err) {
        console.error("Error fetching employee data", err);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.employeeId.includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Employees</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Employee ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg w-64"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Add New Employee
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">S No</th>
              <th className="py-2 px-4 border-b border-gray-200">Image</th>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">DOB</th>
              <th className="py-2 px-4 border-b border-gray-200">Department</th>
              <th className="py-2 px-4 border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <tr key={employee._id} className="text-center">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee.image ? (
                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee.dateOfBirth}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee.department}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded"
                     onClick={() => navigate(`/admin-dashboard/employee/view/${employee._id}`)}
                    >
                      View
                    </button>

                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => navigate(`/admin-dashboard/employee/edit/${employee._id}`)}
                    >
                      Edit
                    </button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                      Salary
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Leave
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     // Fetch employee data from the backend
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/employees`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         console.log(response.data.data);
//         setEmployees(response.data.data);
//       } catch (err) {
//         console.error("Error fetching employee data", err);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const filteredEmployees = employees.filter((employee) =>
//     employee.employeeId.includes(searchTerm)
//   );

//   return (
//     <div className="container mx-auto p-8">
//       <h2 className="text-3xl font-bold text-center mb-6">Manage Employees</h2>

//       {/* Search and Add New Employee button */}
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search By Employee ID"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border p-2 rounded-lg w-64"
//         />
//         <Link
//           to="/admin-dashboard/add-employee"
//           className="bg-green-500 text-white px-4 py-2 rounded-lg"
//         >
//           Add New Employee
//         </Link>
//       </div>

//       {/* Employee Table */}
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b border-gray-200">S No</th>
//               <th className="py-2 px-4 border-b border-gray-200">Image</th>
//               <th className="py-2 px-4 border-b border-gray-200">Name</th>
//               <th className="py-2 px-4 border-b border-gray-200">DOB</th>
//               <th className="py-2 px-4 border-b border-gray-200">Department</th>
//               <th className="py-2 px-4 border-b border-gray-200">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees.length > 0 ? (
//               filteredEmployees.map((employee, index) => (
//                 <tr key={employee._id} className="text-center">
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     {index + 1}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     {employee.image ? (
//                       <img
//                         src={employee.image}
//                         alt={employee.name}
//                         className="w-10 h-10 rounded-full mx-auto"
//                       />
//                     ) : (
//                       <span>No Image</span>
//                     )}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     {employee.name}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     {employee.dateOfBirth}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     {employee.department}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200 space-x-2">
//                     <button className="bg-blue-500 text-white px-3 py-1 rounded">
//                       View
//                     </button>

//                     <button
//                       className="bg-green-500 text-white px-3 py-1 rounded"
//                       onClick={() => navigate(`/admin-dashboard/employee/edit/${employee._id}`)}
//                     >
//                       Edit
//                     </button>
//                     <button className="bg-yellow-500 text-white px-3 py-1 rounded">
//                       Salary
//                     </button>
//                     <button className="bg-red-500 text-white px-3 py-1 rounded">
//                       Leave
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="py-4 text-center">
//                   No employees found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;
