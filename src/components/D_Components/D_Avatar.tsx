"use client"
import { useSignOut } from '@/app/(auth)/sign-in/_services/use-mutations';
import React from 'react'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button'
import { Session } from "next-auth";
import D_Logout from './D_Logout';


type D_AvatarProps = {
    session: Session;
}

const D_Avatar = ({
    session,
}: D_AvatarProps) => {

    return (
        <div>
            {session && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex h-9 items-center gap-2 px-2"
                        >
                            <Avatar className="size-2 flex justify-center items-center dark:bg-white/10 bg-black/10 p-4 rounded-full">
                                <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                            </Avatar>
                            <span className="hidden md:inline">{session.user?.name}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="flex items-center gap-3 px-2 py-1.5">
                            <Avatar className="size-10 flex justify-center items-center dark:bg-white/10 bg-black/10 p-4 rounded-full">
                                <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">{session.user?.name}</p>
                                <p className="text-muted-foreground text-xs">
                                    {session.user?.email}
                                </p>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                            <D_Logout />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

export default D_Avatar
