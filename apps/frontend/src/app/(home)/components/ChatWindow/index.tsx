import { MessageInput } from '@/app/(home)/components';

const ChatWindow = ({ friendId }: { friendId: string }) => {
    return (
        <div className='flex flex-col h-full'>
            <div className='flex-1 p-4 overflow-y-auto'>
                <p className='text-sm text-gray-400'>Chat with {friendId}</p>
                {/* Show messages here */}
            </div>
            <MessageInput />
        </div>
    );
};

export default ChatWindow;
