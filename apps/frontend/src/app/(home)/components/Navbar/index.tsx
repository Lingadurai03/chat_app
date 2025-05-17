'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='w-full px-6 py-4 bg-white shadow flex items-center justify-between'>
            {/* Left - App Name */}
            <div className='text-xl font-bold text-blue-600'>Chat App</div>

            {/* Center - Search Input */}
            <div className='flex-1 mx-6 max-w-md hidden sm:block'>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search friends'
                        className='w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:shadow'
                    />
                    <button
                        className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 hover:cursor-pointer'
                        onClick={() => router.push('search')}
                    >
                        <Search className='w-5 h-5' />
                    </button>
                </div>
            </div>

            {/* Right - Icons */}
            <div className='flex items-center gap-4 relative'>
                <Link href={'notification'}>
                    <Bell className='w-6 h-6 cursor-pointer text-gray-600' />
                </Link>

                <div ref={dropdownRef} className='relative'>
                    <UserCircle
                        className='w-8 h-8 text-gray-700 cursor-pointer rounded-full'
                        onClick={() => setOpen(!open)}
                    />

                    {open && (
                        <div className='absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border z-50'>
                            <ul className='py-2 text-sm text-gray-700'>
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                    Profile
                                </li>
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                    Settings
                                </li>
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500'>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
