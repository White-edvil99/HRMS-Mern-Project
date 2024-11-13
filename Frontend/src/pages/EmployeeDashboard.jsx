import React from 'react'
import Sidebar from '../components/EmployeeDashboard/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Dashboard/Navbar'

export const EmployeeDashboard = () => {
  return (
    <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-gray-100 h-screen w-full">
                <Navbar />
                <Outlet />
            </div>
        </div>
  )
}
