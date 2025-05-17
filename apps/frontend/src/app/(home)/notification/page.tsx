import React from 'react';

import { NotificationUserCard } from '@/app/(home)/notification/component';

const notifications = [
    {
        id: 1,
        name: 'Emma Watson',
        avatar: 'https://i.pravatar.cc/50?img=4',
    },
    {
        id: 2,
        name: 'David Beckham',
        avatar: 'https://i.pravatar.cc/50?img=5',
    },
    {
        id: 3,
        name: 'Lara Croft',
        avatar: 'https://i.pravatar.cc/50?img=6',
    },
];

const Notification = () => {
    return (
        <main className='p-6 max-w-3xl mx-auto'>
            <h1 className='text-2xl font-semibold mb-4'>Friend Requests</h1>
            <div className='space-y-4'>
                {notifications.map((user) => (
                    <NotificationUserCard user={user} key={user.id} />
                ))}
            </div>
        </main>
    );
};

export default Notification;
