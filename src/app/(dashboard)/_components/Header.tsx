"use client";
import { Collapsible, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import React, { useState } from 'react';
import UserQuickAccess from './UserQuickAccess';
import Navigation from './Navigation';
import DevButton from '@/components/ui/DevButton';
import { ROUTE_GROUPS } from './dashboard-layout';


const Header = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <>
            <div
                className="bg-background fixed z-10 flex h-max w-screen items-center justify-between border pl-2 top-0">
                <div
                    className='flex items-center'>
                    <Collapsible
                        open={open}
                        onOpenChange={setOpen}
                        className="h-full">
                        <CollapsibleTrigger
                            asChild
                            className="m-2">
                            <DevButton
                                type="icon"
                                subtype="menu"
                                onClick={handleOpen}
                                className='p-2 border-2 rounded-lg hover:opacity-85'
                            />
                        </CollapsibleTrigger>
                    </Collapsible>
                    <Navigation.Sidebar
                        open={open}
                        setOpen={setOpen}
                        groups={ROUTE_GROUPS} />
                </div>
                <UserQuickAccess />
            </div>
        </>
    )
}

export default Header