type Props = {
    friendId: string;
    onBack?: () => void;
};

const ChatWindow = ({ friendId, onBack }: Props) => {
    return (
        <div className='p-4'>
            {/* Mobile only back button */}
            <div className='md:hidden mb-2'>
                <button
                    className='text-blue-500 font-semibold'
                    onClick={onBack}
                >
                    ← Back
                </button>
            </div>

            <h2 className='text-xl font-bold mb-2'>Chat with {friendId}</h2>
            {/* Chat messages and input UI here */}
        </div>
    );
};

export default ChatWindow;
