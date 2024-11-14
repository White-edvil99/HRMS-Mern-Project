import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Setting = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:5000/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate("/admin-dashboard/employee");
          setError("");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        } else {
          setError("Server error");
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-9xl text-blue-900 font-bold opacity-10">
          Change Password
        </h2>
        <p className="text-red-500">{error}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Change Password"
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Change Password"
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Change Password"
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;




// import axios from "axios";
// import React, { useState } from "react";
// // import axiosInstance from "../../utils/api"

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";


// const Setting = () => {


// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
  
//   const [error, setError] = useState(null);
//   const [setting, setSetting]= useState({
//     userId: user._id,
//     oldPassword:"",
//     newPassword:"",
//     confirmPassword:"",
//   });
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const handleChange =(e)=>{
//     const {name,value} = e.target;
//     setSetting({...setting,[name]:value});
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(setting.newPassword !== setting.confirmPassword){
//         setError("Password not matched");
//     }else{
//         try {
//             //const response = await axiosInstance.post
//             const response = await axios.put("http://localhost:5000/api/setting/change-password",
//                 setting,{
//                     headers:{
//                         Authorization:`Bearer ${localStorage.getItem("token")}`,
//                     },
//                 }
//             );
//             if(response.data.success){
//                 navigate("/admin-dashboard/employee");
//                 setError("")
//             }
//         } catch (error) {
//             if(error.response && !error.response.data.success){
//                 setError(error.response.data.error)
//             }
//         }

//     }
  
//     try {
//       const response = await axios.post(`http://localhost:3000/api/auth/login`, { email, password });
//       console.log(response)

//       if (response.data.success) {
//         login(response.data.user);
//         localStorage.setItem("token", response.data.token);

//         if (response.data.user.role === "admin") {
//           navigate("/admin-dashboard");
//         } else {
//           navigate("/employee-dashboard");
//         }
//       }
//     } catch (error) {
//       if (error.response && !error.response.data.success) {
//         setError(error.response.data.error);
//       } else {
//         setError("Server error");
//       }
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
//       {/* Faded background text */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <h2 className="text-9xl text-blue-900 font-bold opacity-10">Change Password</h2>
//         <p className="text-red-500">{error}</p>
//         <form onSubmit={handleSubmit}>
      

// {/* Department Name */}
// <div>
//     <label className="text-sm font-medium text-gray-700">Old Password</label>
//     <input type="password" name="oldPassword" placeholder="Change Password" onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded " required/>
// </div>
// <div>
//     <label className="text-sm font-medium text-gray-700">New Password</label>
//     <input type="password" name="newPassword" placeholder="Change Password" onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded " required/>
// </div>
// <div>
//     <label className="text-sm font-medium text-gray-700">Confirm Password</label>
//     <input type="password" name="confirmPassword" placeholder="Change Password" onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded " required/>
// </div>
// <button
//             type="submit"
//             className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Change Password
//           </button>
//           </form>
//           </div>
//       {/* Login form */}
//       {/* <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-md">
//         <h2 className="text-2xl font-Poppins text-center mb-6">Login</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//               value={email}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//               value={password}
//             />
//           </div>

//           {/* Remember me and Forgot password 
//           <div className="flex items-center justify-between">
//             <label className="flex items-center text-gray-700">
//               <input type="checkbox" className="mr-2" />
//               Remember me
//             </label>
//             <a href="#" className="text-blue-500 hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           {/* Login button 
          
//         </form>
//       </div> */}
//     </div>
//   );
// };

// export default Setting;
