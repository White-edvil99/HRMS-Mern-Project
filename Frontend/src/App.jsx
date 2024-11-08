import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RolebaseRoute from "./utils/RolebaseRoute";
import AdminSummary from "./components/Dashboard/AdminSummary";
import DepartmentList from "./components/Department/DepartmentList";
import AddDepartment from "./components/Department/AddDepartment";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root path to admin-dashboard */}
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />

          {/* Login route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Dashboard route */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RolebaseRoute requiredRole={["admin"]}>
                  <AdminDashboard />
                </RolebaseRoute>
              </PrivateRoutes>
            }
          >
            {/* Nested routes inside AdminDashboard */}
            <Route index element={<AdminSummary />} />
            <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
            <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
