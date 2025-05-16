'use client';
import React, { useState } from 'react';

import {
    ChatWindow,
    FriendList,
    WelcomeMesageWindow,
} from '@/app/(home)/components';
import { ACCESS_TOKEN } from '@/constants';
import { getToken, isMobile } from '@/utils';

const ChatLayout = () => {
    console.log(getToken(ACCESS_TOKEN));
    const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

    const showFriendList = !isMobile || (isMobile && !selectedFriend);
    const showChat = !isMobile || (isMobile && selectedFriend);

    return (
        <div className='h-screen flex flex-col md:flex-row'>
            {/* Friend List */}
            {showFriendList && (
                <div className='w-full md:w-1/3 border-r border-gray-200 overflow-y-auto'>
                    <FriendList
                        onSelectFriend={setSelectedFriend}
                        selectedFriend={selectedFriend}
                    />
                </div>
            )}

            {/* Chat or Welcome */}
            {showChat && (
                <div className='flex-1 overflow-y-auto'>
                    {selectedFriend ? (
                        <ChatWindow
                            friendId={selectedFriend}
                            onBack={() => setSelectedFriend(null)}
                        />
                    ) : (
                        <WelcomeMesageWindow />
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatLayout;
