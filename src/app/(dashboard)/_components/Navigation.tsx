"use client"
import React from 'react';
import { RouteGroupType } from './RouteGroupList';
import { Separator } from '@radix-ui/react-separator';
import { RouteGroupList } from './RouteGroupList';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import DevButton from '@/components/ui/DevButton';

// Define types for the Navigation component and its sub-components
interface NavigationProps {
    children?: React.ReactNode;
}

interface NavigationSubComponents {
    Sidebar: React.FC<SidebarProps>;
}

interface SidebarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    groups: RouteGroupType[];
}

// Main Navigation component
const Navigation: React.FC<NavigationProps> & NavigationSubComponents = ({ children }) => {
    return (
        <nav className="navigation">
            {children}
        </nav>
    );
};

// Sidebar component
const Sidebar: React.FC<SidebarProps> = ({ open, setOpen, groups }) => {

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
            {/* Overlay for clicking empty space to close */}
            {open && (
                <div
                    className="fixed inset-0 backdrop-blur-sm z-10"
                    onClick={() => setOpen(false)}
                />
            )}
            {/* Sidebar */}
            <div
                className={`
            backdrop-blur-sm fixed top-0 left-0 h-screen 
            border transition-transform duration-300
            w-64 z-20
            ${open ? 'translate-x-0' : '-translate-x-full'}
          `}
            >
                <Accordion asChild type="single" defaultValue="sidebar">
                    <AccordionItem value="sidebar" className="border-none">
                        <AccordionTrigger className="hidden" />
                        <AccordionContent forceMount className="h-full">
                            <div className="h-screen">
                                <div className="flex items-center justify-center w-64 mt-12">
                                    <h1 className="font-semibold text-xl mr-2">Navigation</h1>
                                    <DevButton
                                        type="icon"
                                        subtype="chevronLeft"
                                        onClick={handleClose}
                                        className='p-2 border-2 rounded-lg hover:opacity-85'
                                    />
                                </div>
                                <Separator className="my-8" />
                                <div
                                    className="flex flex-col items-center justify-center w-full">
                                    <RouteGroupList groups={groups} />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
};


// Attach sub-components to Navigation
Navigation.Sidebar = Sidebar;

export default Navigation;