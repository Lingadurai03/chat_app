import React from 'react';

const NotificationUserCard = ({ user }: any) => {
    return (
        <div
            key={user.id}
            className='flex items-center justify-between p-4 bg-white rounded-lg shadow'
        >
            {/* Profile Image & Name */}
            <div className='flex items-center gap-4'>
                <img
                    src={user.avatar}
                    alt={user.name}
                    className='w-[50px] h-[50px] rounded-full object-cover'
                />
                <p className='font-medium text-lg'>{user.name}</p>
            </div>

            {/* Buttons */}
            <div className='flex gap-2'>
                <button className='px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600'>
                    Accept
                </button>
                <button className='px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600'>
                    Decline
                </button>
            </div>
        </div>
    );
};

export default NotificationUserCard;
