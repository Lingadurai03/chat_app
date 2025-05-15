import React from 'react';

import { FriendItem } from '@/app/(home)/components';

const dummyFriends = [
    { id: '1', name: 'Baby ❤️' },
    { id: '2', name: 'D Chello 🥰' },
];

const FriendList = ({
    onSelectFriend,
    selectedFriend,
}: {
    onSelectFriend: (id: string) => void;
    selectedFriend: string | null;
}) => {
    return (
        <div>
            {dummyFriends.map((friend) => (
                <FriendItem
                    key={friend.id}
                    friend={friend}
                    isSelected={selectedFriend === friend.id}
                    onClick={() => onSelectFriend(friend.id)}
                />
            ))}
        </div>
    );
};

export default FriendList;
