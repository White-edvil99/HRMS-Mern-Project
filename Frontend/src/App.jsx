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
import EmployeeList from "./components/Employee/EmployeeList";
import AddEmployee from "./components/Employee/AddEmployee";
import Edit from "./components/Employee/Edit";
import { EmployeeDashboard } from "./pages/EmployeeDashboard";


import EmployeeDetails from "./components/Employee/View";

import Add from "./components/salary/Add";
import Summary from "./components/EmployeeDashboard/Summary";
import List from "./components/leave/List";
import AddLeave from "./components/leave/Add";

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
            <Route path="/admin-dashboard/add-employee" element={<AddEmployee />} />
            <Route path="/admin-dashboard/employee" element={<EmployeeList />} />
            <Route path="/admin-dashboard/employee/edit/:id" element={<Edit />} />
            <Route path="/admin-dashboard/employee/view/:id" element={<EmployeeDetails />} />

            <Route path="/admin-dashboard/salary/add" element={<Add />} />
            </Route>

            <Route
            path="/employee-dashboard"
            element={
              <PrivateRoutes>
                {/* <RolebaseRoute requiredRole={["admin","employee"]}> //we can send admin and emlpoyee but with this emlpoyee can access admin panal first we have to resolve this  */}
                <RolebaseRoute requiredRole={["employee"]}>
                  <EmployeeDashboard/>
                </RolebaseRoute>
              </PrivateRoutes>
            }
          >
            <Route index element={<Summary />} />
            <Route path="/employee-dashboard/profile/:id" element={<EmployeeDetails />} />
            <Route path="/employee-dashboard/leaves" element={<List />} />
            <Route path="/employee-dashboard/add-leave" element={<AddLeave />} />
          </Route>

            </Routes>
</BrowserRouter>
    </AuthProvider>


  );
}

export default App;
