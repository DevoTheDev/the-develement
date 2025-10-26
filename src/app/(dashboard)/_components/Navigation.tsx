"use client"
import React from 'react';
import { RouteGroupType } from './RouteGroupList';
import { Separator } from '@radix-ui/react-separator';
import { RouteGroupList } from './RouteGroupList';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import D_Button from '@/components/D_Components/D_Button';
import D_Sidebar from '@/components/D_Components/D_Sidebar';
import { usePathname } from 'next/navigation';
import { Tabs as ShadTabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { Apple, Boxes, Ruler } from 'lucide-react';

interface NavigationProps {
    children?: React.ReactNode;
}

interface NavigationSubComponents {
    Sidebar: React.FC<SidebarProps>;
    Tabs: React.FC<{}>;
}

interface SidebarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}


export const ROUTE_GROUPS: RouteGroupType[] = [
    {
        group: "Foods Management",
        items: [
            {
                href: "/admin/foods-management/foods",
                label: "Foods",
                icon: "Apple",
            },
            {
                href: "/admin/foods-management/categories",
                label: "Categories",
                icon: "Boxes",
            },
            {
                href: "/admin/foods-management/serving-units",
                label: "Serving Units",
                icon: "Ruler",
            },
        ],
    },
    {
        group: "Meals Management",
        items: [
            {
                href: "/client",
                label: "Meals",
                icon: "Utensils",
            },
        ],
    },
];

const Navigation: React.FC<NavigationProps> & NavigationSubComponents = ({ children }) => {
    return (
        <nav className="navigation">
            {children}
        </nav>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
            <D_Sidebar
                className=' backdrop-blur-lg fixed top-0 left-0 h-screen 
            border w-86 z-20'
                open={open}
                setOpen={setOpen}>
                <div className="h-screen">
                    <div className="flex w-full items-center justify-center mt-12">
                        <h1 className="font-semibold text-xl mr-2">Navigation</h1>
                        <D_Button
                            icon='ChevronLeft'
                            onClick={handleClose}
                            iconSize={5}
                            className={`p-3 hover:bg-foreground/10 dark:hover:bg-foreground/10 rounded-lg`}
                        />
                    </div>
                    <Separator className="my-8" />
                    <div
                        className="flex flex-col items-center justify-center w-full">
                        <RouteGroupList groups={ROUTE_GROUPS} />
                    </div>
                </div>
            </D_Sidebar>
        </>
    );
};

const Tabs: React.FC<{}> = () => {
    const pathname = usePathname();

    const getDefaultTab = () => {
        if (pathname.includes("/admin/foods-management/categories"))
            return "categories";
        if (pathname.includes("/admin/foods-management/serving-units"))
            return "serving-units";
        return "foods";
    };

    return (
        <div className='hidden md:inline'>
            <ShadTabs value={getDefaultTab()}>
                <TabsList>
                    <TabsTrigger value="foods" asChild>
                        <Link href="/admin/foods-management/foods">
                            <Apple />
                            Foods
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger value="categories" asChild>
                        <Link href="/admin/foods-management/categories">
                            <Boxes />
                            Categories
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger value="serving-units" asChild>
                        <Link href="/admin/foods-management/serving-units">
                            <Ruler />
                            Serving Units
                        </Link>
                    </TabsTrigger>
                </TabsList>
            </ShadTabs>
        </div>
    )
}

// Attach sub-components to Navigation
Navigation.Sidebar = Sidebar;
Navigation.Tabs = Tabs;

export default Navigation;