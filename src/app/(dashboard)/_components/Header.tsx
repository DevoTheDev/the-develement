"use client";
import { Collapsible, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import React from 'react';
import UserQuickAccess from './UserQuickAccess';
import Navigation from './Navigation';
import { ROUTE_GROUPS } from './dashboard-layout';
import DevButton from '@/components/ui/DevButton';

type Props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = (props: Props) => {

    const { open, setOpen } = props;

    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <>
            <div
                className="bg-background fixed z-10 flex h-max w-screen items-center justify-between border px-2">
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
                                iconSize={3}
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