import React from 'react'
import Sidenav from '../components/Sidenav'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className='flex bg-slate-100'>
            <Sidenav />
            <Outlet />
        </div>
    )
}

export default AdminLayout
