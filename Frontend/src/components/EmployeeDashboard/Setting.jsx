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
    console.log('hey enter in pass')
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched");
    } else {
    //   const updatedSetting = {
    //     ...setting,  // Spread the existing fields
    //     oldPassword: setting.oldPassword,  // Add the old password
    // };
      try {
        const response = await axios.put(
          `https://hrms-mern-project.onrender.com/api/user/change-password/${user._id}`,
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response)
      
        if (response.data.success) {
          // navigate("/admin-dashboard/employee");
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

    <div className="flex flex-col items-center justify-center min-h-full bg-gray-100">
  <h2 className="text-4xl md:text-6xl text-gray-400 font-extrabold mb-6">
    Change Password
  </h2>
  <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 md:p-8">
    <p className="text-red-500 text-center mb-4">{error}</p>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="oldPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Old Password
        </label>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          placeholder="Enter old password"
          onChange={handleChange}
          className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="Enter new password"
          onChange={handleChange}
          className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm new password"
          onChange={handleChange}
          className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Change Password
      </button>
    </form>
  </div>
</div>


    // <div  className="flex items-center justify-center min-h-screen bg-gray-100 relative">
    //   <h2 className="text-9xl text-blue-900 font-bold opacity-10">
    //       Change Password
    //     </h2>
    //   <div className="absolute inset-0 flex items-center justify-center">
    //     <p className="text-red-500">{error}</p>
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <label className="text-sm font-medium text-gray-700">
    //           Old Password
    //         </label>
    //         <input
    //           type="password"
    //           name="oldPassword"
    //           placeholder="Change Password"
    //           onChange={handleChange}
    //           className="mt-1 w-full p-2 border border-gray-300 rounded"
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label className="text-sm font-medium text-gray-700">
    //           New Password
    //         </label>
    //         <input
    //           type="password"
    //           name="newPassword"
    //           placeholder="Change Password"
    //           onChange={handleChange}
    //           className="mt-1 w-full p-2 border border-gray-300 rounded"
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label className="text-sm font-medium text-gray-700">
    //           Confirm Password
    //         </label>
    //         <input
    //           type="password"
    //           name="confirmPassword"
    //           placeholder="Change Password"
    //           onChange={handleChange}
    //           className="mt-1 w-full p-2 border border-gray-300 rounded"
    //           required
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       >
    //         Change Password
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Setting;
