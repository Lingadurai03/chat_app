'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components';

interface RegisterFormData {
    name: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const onSubmit = (data: RegisterFormData) => {
        console.log('Register form submitted:', data);
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full max-w-sm bg-white shadow-md rounded-2xl p-6 space-y-6'
        >
            <h2 className='text-2xl font-bold text-center text-gray-800'>
                Register
            </h2>

            <Input
                label='Name'
                registration={register('name', {
                    required: 'Name is required',
                })}
                error={errors.name}
            />
            <Input
                label='Username'
                registration={register('userName', {
                    required: 'Username is required',
                })}
                error={errors.userName}
            />
            <Input
                label='Email'
                registration={register('email', {
                    required: 'Email is required',
                })}
                error={errors.email}
            />
            <Input
                label='Password'
                type='password'
                registration={register('password', {
                    required: 'Password is required',
                })}
                error={errors.password}
            />
            <Input
                label='Confirm Password'
                type='password'
                registration={register('confirmPassword', {
                    required: 'Confirm Password is required',
                })}
                error={errors.confirmPassword}
            />

            <Button label='Submit' />
        </form>
    );
};

export default RegisterForm;
