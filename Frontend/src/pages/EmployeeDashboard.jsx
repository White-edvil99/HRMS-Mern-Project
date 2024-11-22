import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Dashboard/Navbar'

export const EmployeeDashboard = () => {
  return (
    <>
     <Navbar />
        <div className="flex pt-16">
        <Sidebar />
            <div className="flex-1 bg-gray-100 h-full w-full ml-72 ">     
            <Outlet />
            </div>
        </div>
    </>
  )
}
