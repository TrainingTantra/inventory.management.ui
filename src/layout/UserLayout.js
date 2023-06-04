import React from 'react'
import PageHeader from '../components/PageHeader'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    return (
        <div>
            <PageHeader />
            <Outlet />
        </div>
    )
}

export default UserLayout
