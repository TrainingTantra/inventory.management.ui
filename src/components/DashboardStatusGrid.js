import React from 'react'
import { MdBusinessCenter } from 'react-icons/md'
import {FaUsers} from 'react-icons/fa';
import StatusCard from './StatusCard'

const DashboardStatusGrid = () => {
    const statuses = [
        {
            title: "Total Sales",
            value: '$50,000',
            icon: <MdBusinessCenter />
        },
        {
            title: "Total Customers",
            value: '1,000',
            icon: <FaUsers />,
            iconBackground: 'bg-amber-300'
        },
        {
            title: "Total Orders",
            value: '20,000',
            icon: <MdBusinessCenter />
        },
        {
            title: "Total Stock",
            value: '50,000',
            icon: <MdBusinessCenter />
        }
    ]
    return (
        <div className='flex'>
            {
                statuses?.map((item,index) => (
                    <StatusCard key={`${item.title}_${index}`} title={item.title} value={item.value} icon={item.icon} iconBackground={item.iconBackground} />
                ))
            }
        </div>
    )
}

export default DashboardStatusGrid
