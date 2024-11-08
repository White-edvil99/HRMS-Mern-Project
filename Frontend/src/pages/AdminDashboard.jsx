import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const {user, loading}= useAuth()
    const Navigate = useNavigate()
    if(loading){
        return <div>Loading....</div>
    }
    if(!user){
        Navigate('/login')
    }
  return (
    <div>AdminDashboard {user.name}</div>
  )
}

export default AdminDashboard;