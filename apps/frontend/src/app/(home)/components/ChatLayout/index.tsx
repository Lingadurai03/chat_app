// components/layout/ChatLayout.tsx
'use client';
import React, { useState } from 'react';

import {
    ChatWindow,
    FriendList,
    WelcomeMesageWindow,
} from '@/app/(home)/components';

const ChatLayout = () => {
    const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

    return (
        <div className='h-screen flex'>
            <div className='w-1/3 border-r border-gray-200 overflow-y-auto'>
                <FriendList
                    onSelectFriend={setSelectedFriend}
                    selectedFriend={selectedFriend}
                />
            </div>
            <div className='flex-1 overflow-y-auto'>
                {selectedFriend ? (
                    <ChatWindow friendId={selectedFriend} />
                ) : (
                    <WelcomeMesageWindow />
                )}
            </div>
        </div>
    );
};

export default ChatLayout;
