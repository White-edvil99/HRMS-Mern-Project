import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./context/AuthContext";
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
import ViewSalary from "./components/salary/ViewSalary";
import Setting from "./components/EmployeeDashboard/Setting";

function App() {
  const user = useAuth();
  console.log(user)
  console.log(user._id)
  
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
            <Route path="departments" element={<DepartmentList />} />
            <Route path="add-department" element={<AddDepartment />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="employee" element={<EmployeeList />} />
            <Route path="employee/edit/:id" element={<Edit />} />
            <Route path="employee/view/:id" element={<EmployeeDetails />} />
            <Route path="employee/salary/:id" element={<ViewSalary />} />
            <Route path="salary/add" element={<Add />} />
            <Route path="leaves" element={<List />} />
            <Route path="settings" element={<Setting />} />
          </Route>

          {/* Protected Employee Dashboard route */}a
          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoutes>
                <RolebaseRoute requiredRole={["employee"]}>
                  <EmployeeDashboard />
                </RolebaseRoute>
              </PrivateRoutes>
            }
          >
            <Route index element={<Summary />} />
            <Route path="/employee-dashboard/profile/:id" element={<EmployeeDetails />} />
            <Route path="leaves" element={<List />} />
            <Route path="add-leave" element={<AddLeave />} />
            <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />} />
            <Route path="settings" element={<Setting />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
