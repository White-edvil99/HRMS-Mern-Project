import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const CmsContext = createContext();

const CmsProvider = function ({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            "https://hrms-mern-project.onrender.com/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.log(error);
          if (error.response && !error.response.data.error) {
            setUser(null);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    verifyUser();

    // Call refreshToken periodically
    const interval = setInterval(refreshToken, 15 * 60 * 1000); // Refresh token every 15 minutes
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const refreshToken = async () => {
    const token = localStorage.getItem("refreshToken");
    if (token) {
      try {
        const response = await axios.post("https://hrms-mern-project.onrender.com/api/auth/refresh-token", { token });
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
        }
      } catch (error) {
        console.log("Error refreshing token:", error);
      }
    }
  };

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <CmsContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => useContext(CmsContext);
export default CmsProvider;
