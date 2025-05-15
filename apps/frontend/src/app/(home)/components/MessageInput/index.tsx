'use client';
import { useState } from 'react';

const MessageInput = () => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!message.trim()) return;
        console.log('Send:', message);
        setMessage('');
    };

    return (
        <div className='p-4 border-t border-gray-200 flex'>
            <input
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='flex-1 border border-gray-300 rounded-xl p-2 outline-none'
                placeholder='Type a message...'
            />
            <button
                onClick={handleSend}
                className='ml-2 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600'
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;
