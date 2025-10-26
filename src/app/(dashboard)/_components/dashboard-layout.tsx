"use client";
import { useSignOut } from "@/app/(auth)/sign-in/_services/use-mutations";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { customErrorMap } from "@/lib/customErrorMap";
import * as Collapsible from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";
import {
    Apple,
    Boxes,
    ChevronDown,
    ChevronLeft,
    LogOut,
    Menu,
    Ruler,
    Utensils,
} from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { z } from "zod";
import { D_ButtonProps } from "@/components/D_Components/D_Button";
import UserQuickAccess from "./UserQuickAccess";

z.setErrorMap(customErrorMap);

type RouteGroup = {
    group: string;
    items: D_ButtonProps[];
};

export const ROUTE_GROUPS: RouteGroup[] = [
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

type DashboardLayoutProps = { children: ReactNode; session: Session };
const DashboardLayout = ({ children, session }: DashboardLayoutProps) => {
    const [open, setOpen] = useState(false);
    const signOutMutation = useSignOut();
    const userRole = session.user?.role || "user";

    const filteredRouteGroups = ROUTE_GROUPS.filter((group) => {
        if (userRole === "admin") {
            return group.group === "Foods Management";
        } else {
            return group.group === "Meals Management";
        }
    });

    return (
        <div className="flex">
            <div className="bg-background fixed z-10 flex h-13 w-screen items-center justify-between border px-2">
                <Collapsible.Root className="h-full" open={open} onOpenChange={setOpen}>
                    <Collapsible.Trigger className="m-2" asChild>
                        <Button size="icon" variant="outline">
                            <Menu />
                        </Button>
                    </Collapsible.Trigger>
                </Collapsible.Root>
                <UserQuickAccess session={session} />
            </div>

            <Collapsible.Root
                className="fixed top-0 left-0 z-20 h-dvh"
                open={open}
                onOpenChange={setOpen}
            >
                <Collapsible.Content forceMount>
                    <div
                        className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Admin Dashboard</h1>
                            <Collapsible.Trigger asChild>
                                <Button size="icon" variant="outline">
                                    <ChevronLeft />
                                </Button>
                            </Collapsible.Trigger>
                        </div>

                        <Separator className="my-2" />

                        <div className="mt-4 flex flex-col">
                            {filteredRouteGroups.map((routeGroup) => (
                                <RouteGroup {...routeGroup} key={routeGroup.group} />
                            ))}
                        </div>
                    </div>
                </Collapsible.Content>
            </Collapsible.Root>
            <main
                className={`transition-margin mt-13 flex-1 p-4 duration-300 ${open ? "ml-64" : "ml-0"
                    }`}
            >
                {children}
            </main>
        </div>
    );
};

type RouteGroupProps = RouteGroup;
const RouteGroup = ({ group, items }: RouteGroupProps) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Collapsible.Root open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger asChild>
                <Button
                    className="text-foreground/80 flex w-full justify-between font-normal"
                    variant="ghost"
                >
                    {group}
                    <motion.div animate={{ rotate: open ? 180 : 0 }}>
                        <ChevronDown />
                    </motion.div>
                </Button>
            </Collapsible.Trigger>
            <Collapsible.Content forceMount>
                <motion.div
                    className={`flex flex-col gap-2 ${!open ? "pointer-events-none" : ""
                        }`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {items.map((item) => (
                        <Button
                            className="w-full justify-start font-normal"
                            variant="link"
                            asChild
                            key={item.href}
                        >
                            <Link
                                href={item.href}
                                className={`flex items-center rounded-md px-5 py-1 transition-all ${pathname === item.href
                                    ? "bg-foreground/10 hover:bg-foreground/5"
                                    : "hover:bg-foreground/10"
                                    }`}
                            >
                                {item.icon}
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        </Button>
                    ))}
                </motion.div>
            </Collapsible.Content>
        </Collapsible.Root>
    );
};

export { DashboardLayout };