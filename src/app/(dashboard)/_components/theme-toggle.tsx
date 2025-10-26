"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import D_Button from "@/components/D_Components/D_Button";

const ThemeToggle = () => {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative">
                    <D_Button
                        iconSize={4}
                        icon="Sun"
                        tooltip="Select theme"
                        className={`
                        p-2 flex items-center justify-center 
                        border-2 border-input rounded-lg dark:hidden
                        `}
                    />
                    <D_Button
                        iconSize={4}
                        icon="Moon"
                        tooltip="Select theme"
                        className={`
                        p-2 items-center justify-center 
                        border-2 border-input rounded-lg hidden dark:flex
                        `}
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