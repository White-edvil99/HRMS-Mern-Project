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
          console.error("Error verifying user:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Handle case where no token is present
      }
    };

    const refreshToken = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/auth/refresh-token",
            { token: refreshToken }
          );
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);
          } else {
            console.warn("Refresh token failed");
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
    };

    // Call verifyUser and refreshToken on initial load
    verifyUser();
    refreshToken();

    // Set up interval to refresh the token periodically
    const interval = setInterval(refreshToken, 15 * 60 * 1000); // Every 15 minutes
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
export default AuthProvider;
