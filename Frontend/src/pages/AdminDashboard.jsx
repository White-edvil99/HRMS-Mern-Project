import React from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Dashboard/AdminSidebar';
import Navbar from '../components/Dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
       <>
        <Navbar />
        <div className="flex pt-16">
        <Sidebar />
            <div className="flex-1 bg-gray-100 h-screen w-full ml-auto">     
            <Outlet />
            </div>
        </div>
       </>
    );
};

export default AdminDashboard;
