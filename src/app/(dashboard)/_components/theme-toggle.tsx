"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DevButton from "@/components/ui/DevButton";

const ThemeToggle = () => {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative">
                    <DevButton
                        type="icon"
                        subtype="sun"
                        tooltip="Select theme"
                        className="p-2 flex items-center justify-center border-2 border-input rounded-lg hover:opacity-80 dark:hidden"
                    />
                    <DevButton
                        type="icon"
                        subtype="moon"
                        tooltip="Select theme"
                        className="p-2 items-center justify-center border-2 border-input rounded-lg hover:opacity-80  hidden dark:flex"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { ThemeToggle };