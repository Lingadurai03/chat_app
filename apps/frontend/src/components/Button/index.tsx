import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    loading?: boolean;
    loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    loading,
    loadingText,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={loading || props.disabled}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-2 font-semibold transition 
                ${loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} 
                text-white disabled:cursor-not-allowed`}
        >
            {loading && <Loader2 className='h-4 w-4 animate-spin' />}
            {loading ? loadingText || 'Submitting...' : label}
        </button>
    );
};

export default Button;
