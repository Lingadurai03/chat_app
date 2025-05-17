import React from 'react';

const SearchUserCard = ({ user }: any) => {
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
                <div>
                    <p className='font-medium text-lg'>{user.name}</p>
                    <div className='flex gap-2 mt-1'>
                        <button className='px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                            Send Request
                        </button>
                        <button className='px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100'>
                            View Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchUserCard;
