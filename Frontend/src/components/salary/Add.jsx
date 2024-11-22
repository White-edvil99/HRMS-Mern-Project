// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Add = () => {
//   const [employees, setEmployees] = useState([]);
//   const [department, setDepartment] = useState([]);
//   const [employee, setEmployee] = useState({
//     employeeId: "",
//     department: "",
//     basicSalary: 0,
//     allowance: 0,
//     deductions: 0,
//     payDate: "",
//   });

//   //  Fetch departments on component mount
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/departments", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setDepartment(response.data.data); // Assuming `response.data.data` contains the list of departments
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       }
//     };
//     fetchDepartments();
//   }, []);


//   // Fetch employees data
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/user/role/employee", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setEmployees(response.data.data);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:3000/api/salary/add", employee, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       alert("Salary details added successfully");
//     } catch (error) {
//       console.error("Error adding salary details:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
//         <h2 className="text-2xl font-bold text-center mb-6">Add Salary</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Grid container for form fields */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Department</label>
//               <input
//                 type="text"
//                 name="department"
//                 value={employee.department}
//                 onChange={hand}
//                 placeholder="Enter Department"
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Employee</label>
//               <select
//                 name="employeeId"
//                 value={employee.employeeId}
//                 onChange={handleInputChange}
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                 required
//               >
//                 <option value="">Select Employee</option>
//                 {employees.map((emp) => (
//                   <option key={emp.id} value={emp.id}>
//                     {emp.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           {/* Grid container for salary details */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
//               <input
//                 type="number"
//                 name="basicSalary"
//                 value={employee.basicSalary}
//                 onChange={handleInputChange}
//                 placeholder="Enter Basic Salary"
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Allowances</label>
//               <input
//                 type="number"
//                 name="allowance"
//                 value={employee.allowance}
//                 onChange={handleInputChange}
//                 placeholder="Enter Allowances"
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Deductions</label>
//               <input
//                 type="number"
//                 name="deductions"
//                 value={employee.deductions}
//                 onChange={handleInputChange}
//                 placeholder="Enter Deductions"
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Pay Date</label>
//             <input
//               type="date"
//               name="payDate"
//               value={employee.payDate}
//               onChange={handleInputChange}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
//             >
//               Add Salary
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Add;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
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

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/departments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDepartment(response.data.data); // Assuming `response.data.data` contains the list of departments
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  //fetch employee on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/role/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response)
        setEmployees(response.data.data); // Assuming `response.data.data` contains the list of departments
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDepartment = async (e) => {
    setEmployee({ ...employee, department: e.target.value });
    try {
      const response = await axios.get(`http://localhost:3000/api/employees?department=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployees(response.data.data); // Assuming `response.data.data` contains the list of employees
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleBasicAllowanceChange = (e) => {
    setEmployee({
      ...employee,
      allowance: +e.target.value,
    });
  };


  const handleChange=(e)=>{
    setEmployee({
      ...employee,
      basicSalary: +e.target.value,
    });
  }

  const handleDeductionsChange=(e)=>{
    setEmployee({
      ...employee,
      deductions: +e.target.value,
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/salary/add", employee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Employee salary details added successfully");
      
    } catch (err) {
      console.error("Error adding employee salary data:", err);
    }
  };

  const handleEmployeeChange=(e)=>{
    const currentEmployee = employees.find(emp => emp.name == e.target.value);
    console.log(currentEmployee)
    setEmployee({
      employeeId: currentEmployee.name,
      basicSalary:currentEmployee.employeeId?.salaryId.basicSalary ?? 0 ,
      allowance: currentEmployee.employeeId?.salaryId?.allowance ?? 0,
      deductions: currentEmployee.employeeId?.salaryId?.deductions ?? 0,
      department: currentEmployee.employeeId?.departmentId?.name ?? "",
      payDate: null,
    });
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Add Salary</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div>
          <label className="block mb-2">Department</label>
          <input
             type="text"
            name="department"
            value={employee.department || ""}
            readOnly
            onChange={handleDepartment}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />

        </div>
        <div>
          <label className="block mb-2">Employee</label>
          <select
            name="employeeId"
            value={employee.employeeId || ""}
            onChange={handleEmployeeChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.name} value={emp.name}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {console.log(employee)}
          <label className="block mb-2">Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            value={employee.basicSalary}
            onChange={handleChange}
            placeholder="Basic Salary"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Allowances -{employee.allowance}</label>
          <input
            type="number"
            name="allowance"
            defaultValue={employee.allowance}
            onChange={handleBasicAllowanceChange}
            placeholder="Allowances"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Deductions</label>
          <input
            type="number"
            name="deductions"
            defaultValue={employee.deductions}
            onChange={handleDeductionsChange}
            placeholder="Deductions"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Pay Date</label>
          <input
            type="date"
            name="payDate"
            defaultValue={employee.payDate}
            onChange={(e)=>{
              setEmployee({
                ...employee,
                payDate: e.target.value
              })
            }}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
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
