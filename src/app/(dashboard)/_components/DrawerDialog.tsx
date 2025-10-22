"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import useMediaQuery from "@/app/(dashboard)/_components/_hooks/useMediaQuery"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogOverlay,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerOverlay
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type DrawerDialogProps = {
    trigger: React.ReactNode
    openState: {
        open: boolean,
        setOpen: (open: boolean) => void
    }
    title?: string
    description?: string
    content?: React.ReactNode
    footer?: React.ReactNode
}

export function DrawerDialog({
    trigger,
    title,
    description,
    content,
    footer,
    openState
}: DrawerDialogProps) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={openState?.open || open} onOpenChange={openState?.setOpen || setOpen}>
                <DialogOverlay className="backdrop-blur-sm" />
                <DialogTrigger suppressHydrationWarning asChild>
                    {trigger || 'Open Dialog'}
                </DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    {content || (<ProfileForm />)}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer
            open={openState?.open || open} onOpenChange={openState?.setOpen || setOpen}>
            <DrawerOverlay className="backdrop-blur-sm" />
            <DrawerTrigger suppressHydrationWarning asChild>
                {trigger || 'Open Drawer'}
            </DrawerTrigger>
            <DrawerContent className="p-6" >
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                {content || (<ProfileForm />)}
                <DrawerFooter className="pt-5">
                    <DrawerClose asChild>
                        <div className="grid gap-4" >
                            {footer}
                            <Button variant="outline">Cancel</Button>
                        </div>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
    return (
        <form className={cn("grid items-start gap-6", className)}>
            <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" defaultValue="shadcn@example.com" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@shadcn" />
            </div>
            <Button type="submit">Save changes</Button>
        </form>
    )
}
