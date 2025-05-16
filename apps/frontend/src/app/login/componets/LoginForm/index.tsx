'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/hooks/store.hooks';

import { Button, Input } from '@/components';
import { useLoginMutation } from '@/store/auth/authApi';
import { authActions } from '@/store/auth/authSlice';

interface LoginFormData {
    userNameOrEmail: string;
    password: string;
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const [login, { isLoading }] = useLoginMutation();

    const dispatch = useAppDispatch();
    const navigate = useRouter();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const userData = await login(data).unwrap();
            dispatch(authActions.setCredentials(userData));
            navigate.push('/');
        } catch (err) {
            console.error('Login failed:', err);
        }
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
                label='Username or Email'
                registration={register('userNameOrEmail', {
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

            <Button
                loading={isLoading}
                loadingText='Submiting'
                label='Submit'
            />
        </form>
    );
};

export default LoginForm;
