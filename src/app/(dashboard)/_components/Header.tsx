"use client"
import UserQuickAccess from './UserQuickAccess';
import { Session } from "next-auth";
import Navigation from './Navigation';
import { useState } from 'react';
import D_Button from '@/components/D_Components/D_Button';


const Header = (session: Session) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <>
            <div
                className="bg-background z-10 flex h-13 w-screen items-center justify-between border pl-4 pr-2 top-0">
                <div className='flex'>
                    <D_Button
                        icon='Menu'
                        onClick={handleOpen}
                        className={`p-2 border-2 rounded-lg`}
                        iconSize={4}
                    />
                    <Navigation.Sidebar open={open} setOpen={setOpen} />
                </div>
                <UserQuickAccess session={session} />
            </div>
        </>
    )
}

export default Header