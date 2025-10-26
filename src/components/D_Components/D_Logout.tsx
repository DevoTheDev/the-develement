"use client";
import React from 'react'
import { useSignOut } from '@/app/(auth)/sign-in/_services/use-mutations';
import D_Button from './D_Button';

const D_Logout = () => {
    const signOutMutation = useSignOut();

    const handleLogout = () => {
        signOutMutation.mutate();
    };

    return (
        <div onClick={handleLogout}
            className='flex justify-center items-center gap-5 px-3'
        >
            <D_Button
                icon='LogOut'
                disableDefault
            />
            <D_Button
                label='Logout'
                disableDefault
            />
        </div>
    )
}

export default D_Logout