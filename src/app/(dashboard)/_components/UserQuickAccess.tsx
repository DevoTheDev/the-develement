"use client"

import { ThemeToggle } from '@/app/(dashboard)/_components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const UserQuickAccess = () => {
    return (
        <div className="flex items-center">
            <ThemeToggle />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                    >
                        <Avatar className="size-8">
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <span className="hidden md:inline">Admin</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="flex items-center gap-3 px-2 py-1.5">
                        <Avatar className="size-10">
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">Admin</p>
                            <p className="text-muted-foreground text-xs">admin@test.com</p>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { /* Logout */ }} variant="destructive">
                        <LogOut className="size-4" /> Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserQuickAccess