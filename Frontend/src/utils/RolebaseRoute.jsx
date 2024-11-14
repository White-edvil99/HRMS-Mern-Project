import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const RolebaseRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();


  if (loading) {
   return <div>Loading.....</div>;
  }

  if (!user) {
    return user ? children : <Navigate to="/login" />;
  }

  console.log("================>>",requiredRole.includes());

  // if (!requiredRole.includes(user.role)) {
  //   navigate('/unauthorized')
  // }

  return children;
};

export default RolebaseRoute;
