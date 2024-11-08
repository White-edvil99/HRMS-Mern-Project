import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RolebaseRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
   return <div>Loading.....</div>;
  }

  if (!user) {
    return user ? children : <Navigate to="/login" />;
  }

  if (!requiredRole.includes(user.role)) {
    <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RolebaseRoute;
