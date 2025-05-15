import React from 'react';
import clsx from 'clsx';

const FriendItem = ({
    friend,
    isSelected,
    onClick,
}: {
    friend: { id: string; name: string };
    isSelected: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={clsx(
                'p-4 cursor-pointer hover:bg-blue-100',
                isSelected && 'bg-blue-200 font-semibold',
            )}
        >
            {friend.name}
        </div>
    );
};

export default FriendItem;
