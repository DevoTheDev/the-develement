"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import { usePathname } from "next/navigation";
import D_Button, { D_ButtonProps } from "@/components/D_Components/D_Button";

export type RouteGroupType = {
    group: string;
    items: D_ButtonProps[];
};

type RouteGroupListProps = {
    groups: RouteGroupType[];
};

type RouteGroupProps = RouteGroupType & { open: boolean };

const RouteGroup = ({ group, items, open }: RouteGroupProps) => {
    const pathname = usePathname();

    return (
        <Collapsible open={open}>
            <CollapsibleTrigger asChild>
                <div className={`
                    w-full py-2 px-5 flex justify-between items-center
                    `}>
                    <D_Button
                        label={group}
                    />
                    <D_Button
                        icon="ChevronDown"
                        className={`duration-300 ${open ? "rotate-180" : ""}`}
                    />
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <motion.div
                    className={`flex flex-col gap-2 mt-2 w-full ${!open ? "pointer-events-none" : ""}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    {items.map((item) => (
                        <div key={item.href} className="w-full flex flex-col">
                            <D_Button
                                icon={item.icon}
                                href={item.href}
                                className={`flex items-center rounded-md px-5 py-3 transition-all w-full
                                ${pathname === item.href ? "bg-foreground/10 hover:bg-foreground/5" : "hover:bg-foreground/10"}`}
                                label={item.label}
                                disableDefault

                            />
                        </div>
                    ))}
                </motion.div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export const RouteGroupList = ({ groups }: RouteGroupListProps) => {
    const [openGroup, setOpenGroup] = useState<string | null>(null);

    return (
        <div className="flex flex-col gap-8 w-full max-w-xs ">
            {groups.map((group) => {
                const isOpen = group.group === openGroup;
                const idAdmin = JSON.stringify(group.items).includes('admin');
                const idClient = JSON.stringify(group.items).includes('client');


                return (
                    <div
                        key={group.group}
                        onClick={() => setOpenGroup(isOpen ? null : group.group)}
                        className="w-full"
                    >
                        <RouteGroup group={group.group} items={group.items} open={isOpen} />
                    </div>
                );
            })}
        </div>
    );
};