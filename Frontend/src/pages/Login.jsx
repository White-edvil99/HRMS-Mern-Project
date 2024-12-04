import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
  
    try {
      const response = await axios.post(`https://hrms-mern-project.onrender.com/api/auth/login`, { email, password });
      console.log(response)

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server error");
      }
      console.log(error);
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-[#655f77] relative">
    {/* Faded background text */}
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-9xl text-blue-900 font-bold opacity-10">RC EMS</h1>
    </div>

    {/* Login form */}
    <div className="bg-[#2b2738] p-8 rounded-lg shadow-lg z-10 w-full max-w-4xl flex flex-col lg:flex-row items-center">
      {/* Left Section with Image */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg p-6">
        <img
          src="https://img.freepik.com/premium-photo/male-business-man-hand-drawing-connecting-line-two-sets-wooden-blocks-silhouetted-man-walk-across_150455-1882.jpg?ga=GA1.1.756612143.1726481952"
          alt="Scenic Background"
          className="rounded-lg shadow-md"
        />
        <p className="text-white text-lg mt-4">Capturing Moments, Creating Memories</p>
      </div>

      {/* Right Section with Login Fields */}
      <div className="w-full lg:w-1/2 p-4">
        <h2 className="text-2xl text-white font-Poppins text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-[#3b364c] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border bg-[#3b364c] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
            />
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-white">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-white hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-2 bg-[#6e54b5] text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        
      </div>
    </div>
  </div>
// );
// };

    // <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
    //   {/* Faded background text */}
    //   <div className="absolute inset-0 flex items-center justify-center">
    //     <h1 className="text-9xl text-blue-900 font-bold opacity-10">RC EMS</h1>
    //   </div>

    //   {/* Login form */}
    //   <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-md">
    //     <h2 className="text-2xl font-Poppins text-center mb-6">Login</h2>
    //     {error && <p className="text-red-500">{error}</p>}
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <div>
    //         <label className="block text-gray-700 font-medium mb-2">
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           placeholder="Enter your email"
    //           value={email}
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-gray-700 font-medium mb-2">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           placeholder="Enter your password"
    //           value={password}
    //         />
    //       </div>

    //       {/* Remember me and Forgot password */}
    //       <div className="flex items-center justify-between">
    //         <label className="flex items-center text-gray-700">
    //           <input type="checkbox" className="mr-2" />
    //           Remember me
    //         </label>
    //         <a href="#" className="text-blue-500 hover:underline">
    //           Forgot password?
    //         </a>
    //       </div>

    //       {/* Login button */}
    //       <button
    //         type="submit"
    //         className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       >
    //         Login
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Login;
