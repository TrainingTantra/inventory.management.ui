import React from 'react'

const StatusCard = (props) => {
    const { title, icon, value,iconBackground } = { ...props }
    return (
        <div className='flex bg-white w-auto p-2 mr-3'>
            <div className='flex flex-row'>
                <div className='flex justify-center items-center mr-2'>
                    <span className={`text-lg rounded-2xl p-2 ${iconBackground ? iconBackground: 'bg-sky-400'} text-white`}>
                        {icon}
                    </span>
                </div>
                <div className='flex flex-col w-40'>
                    <span className='text-xs text-slate-500'>{title}</span>
                    <span className='font-bold'>{value}</span>
                </div>
            </div>
        </div>
    )
}

export default StatusCard
