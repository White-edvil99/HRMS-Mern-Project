import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Add = () => {
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  const [department, setDepartment] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    employeeId: null,
    basicSalary: 0,
    allowance: 0,
    deductions: 0,
    payDate: null,
  });

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/salary/add`, employee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Employee details updated successfully");
      navigate("/admin-dashboard/employees");
    } catch (err) {
      console.error("Error in updating employee data", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Add Salary</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={employee.name || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </label>
        <div>
          <label className="col-span-2">Department</label>
          <select
            name="department"
            value={employee.department || ""}
            onChange={handleDepartment}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Department</option>
            {department.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.dep_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="col-span-2">Employee</label>
          <select
            name="employeeId"
            value={employee.employeeId || ""}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.employeeId}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            onChange={handleChange}
            value={employee.basicSalary || ""}
            placeholder="Basic Salary"
            className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Allowances</label>
          <input
            type="number"
            name="allowance"
            onChange={handleChange}
            value={employee.allowance || ""}
            placeholder="Allowances"
            className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Deductions</label>
          <input
            type="number"
            name="deductions"
            onChange={handleChange}
            value={employee.deductions || ""}
            placeholder="Deductions"
            className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pay Date</label>
          <input
            type="date"
            name="payDate"
            onChange={handleChange}
            value={employee.payDate || ""}
            placeholder="Pay Date"
            className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
          Add Salary
        </button>
      </form>
    </div>
  );
};

export default Add;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// // import { getEmployees } from "../../../../Server/controller/EmployeeController";

// const Add = () => {
//   const { id } = useParams(); // Get employee ID from URL
//   const navigate = useNavigate();
//   const [department,setDepartment]=useState([]);
//   const [employees,setEmployees]=useState([])
//   const [employee, setEmployee] = useState({
//     employeeId:null,
//     basicSalary:0,
//     allowance:0,
//     deductions:0,
//     payDate:null
//     // Add other fields as needed
//   });
  

// const handleDepartment = async (e) =>{
//     const emps = await getEmployees(e.target.value)
//     setEmployees(emps)
// }

//   const handleChange = (e) => {
//     setEmployees({
//       ...employees,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`http://localhost:3000/api/salary/add/`, employee, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       alert("Employee details updated successfully");
//       navigate("/admin-dashboard/employees");
//     } catch (err) {
//       console.error("Error in updating employee data", err);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
//       <h2 className="text-3xl font-bold text-center mb-6">Add Salary</h2>
//       <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
//         <label className="block mb-2">
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={employees?.name || ""} 
//             onChange={handleChange}
//             className="border p-2 w-full rounded"
//           />
//         </label>
//        <div>
//        <label className="col-span-2">
//           Department
//        </label>
//           <select 
//             name="department"
//             value={employees.department || ""}
//             onChange={handleDepartment}
//             className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//             required
//           />
//         <option value="">Select Department</option>
//         {
//             department.map((dep)=>(
//                 <option key={dep._id} value={dep._id}>
//                     {dep.dep_name}
//                 </option>
//             ))
//         }
//        </div>
//        {/* //employee */}
//        <div>
//        <label className="col-span-2">
//        Employee
//        </label>
//           <select 
//             name="employeeId"
//             // value={employee.department}
//             onChange={handleChange}
//             className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//             required
//           />
//         <option value="">Select Employee</option>
//         {
//             employees.map((emp)=>(
//                 <option key={emp._id} value={emp._id}>
//                     {emp.employeeId}
//                 </option>
//             ))
//         }
//        </div>
//        <div>
//         <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
//         <input type="number" name="basicSalary" onChange={""}  placeholder="Basic Salary" className="mt-1 p-1 block w-full border border-gray-300 rounded-md" required />

//        </div>
//        <div>
//         <label className="block text-sm font-medium text-gray-700">Allowances</label>
//         <input type="number" name="allowances" onChange={""}  placeholder="Allowances" className="mt-1 p-1 block w-full border border-gray-300 rounded-md" required />

//        </div>
//        <div>
//         <label className="block text-sm font-medium text-gray-700">Deductions</label>
//         <input type="number" name="deductions" onChange={""}  placeholder="deductions" className="mt-1 p-1 block w-full border border-gray-300 rounded-md" required />

//        </div>
//        <div>
//         <label className="block text-sm font-medium text-gray-700">Pay Date</label>
//         <input type="date" name="payDate" onChange={""}  placeholder="payDate" className="mt-1 p-1 block w-full border border-gray-300 rounded-md" required />

//        </div>
//         <label className="block mb-2">
//           Date of Birth:
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={employee.dateOfBirth}
//             onChange={handleChange}
//             className="border p-2 w-full rounded"
//           />
//         </label>
//         {/* Add more fields as necessary */}
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Add;
