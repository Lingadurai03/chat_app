'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components';

interface LoginFormData {
    userName: string;
    password: string;
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = (data: LoginFormData) => {
        console.log('Login form submitted:', data);
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full max-w-sm bg-white shadow-md rounded-2xl p-6 space-y-6'
        >
            <h2 className='text-2xl font-bold text-center text-gray-800'>
                Login
            </h2>

            <Input
                label='Username'
                registration={register('userName', {
                    required: 'Username is required',
                })}
                error={errors.password}
            />
            <Input
                label='Password'
                type='password'
                registration={register('password', {
                    required: 'Password is required',
                })}
                error={errors.password}
            />

            <Button label='Submit' />
        </form>
    );
};

export default LoginForm;
