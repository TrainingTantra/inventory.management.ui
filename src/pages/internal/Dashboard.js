import React from 'react'
import DashboardStatusGrid from '../../components/DashboardStatusGrid'
import useCheckIsMobileView from '../../utils/checkisMobile';

const Dashboard = () => {
    const { isMobileView } = useCheckIsMobileView();
    return (
        <div className="p-7">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className='flex'>
                {isMobileView && <h2>This is mobile view</h2>}
                <br />
                <DashboardStatusGrid />
            </div>
        </div>
    )
}

export default Dashboard