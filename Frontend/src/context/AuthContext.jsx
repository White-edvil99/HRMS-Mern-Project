import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/auth/verify",
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
        const response = await axios.post("http://localhost:3000/api/auth/refresh-token", { token });
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
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
export default AuthProvider;
