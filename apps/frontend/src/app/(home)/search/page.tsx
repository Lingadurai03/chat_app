import React from 'react';

import { SearchUserCard } from '@/app/(home)/search/component';

const users = [
    {
        id: 1,
        name: 'Alice Johnson',
        avatar: 'https://i.pravatar.cc/50?img=1',
    },
    {
        id: 2,
        name: 'Bob Smith',
        avatar: 'https://i.pravatar.cc/50?img=2',
    },
    {
        id: 3,
        name: 'Charlie Davis',
        avatar: 'https://i.pravatar.cc/50?img=3',
    },
];

const SearchResult = () => {
    return (
        <main className='p-6 max-w-3xl mx-auto'>
            <h1 className='text-2xl font-semibold mb-4'>Search Results</h1>
            <div className='space-y-4'>
                {users.map((user) => (
                    <SearchUserCard user={user} key={user.id} />
                ))}
            </div>
        </main>
    );
};

export default SearchResult;
