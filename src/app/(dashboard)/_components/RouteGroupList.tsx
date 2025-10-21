"use client";
import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export type RouteGroupType = {
    group: string;
    items: {
        href: string;
        label: string;
        icon: ReactNode;
    }[];
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
                <Button
                    variant="ghost"
                    className="w-full justify-between px-5 py-4" // Full width, consistent padding
                >
                    {group}
                    <div className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                        <ChevronDown className="h-5 w-5" />
                    </div>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <motion.div
                    className={`flex flex-col gap-2 mt-2 w-full ${!open ? "pointer-events-none" : ""}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    {items.map((item) => (
                        <div key={item.href} className="w-full">
                            <Link
                                className={`flex items-center rounded-md px-5 py-4 transition-all w-full
                  ${pathname === item.href ? "bg-foreground/10 hover:bg-foreground/5" : "hover:bg-foreground/10"}`}
                                href={item.href}
                            >
                                {item.icon}
                                <span className="text-sm ml-2">{item.label}</span>
                            </Link>
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
        <div className="flex flex-col gap-8 w-full max-w-xs"> {/* Set max-width for consistency */}
            {groups.map((group) => {
                const isOpen = group.group === openGroup;

                return (
                    <div
                        key={group.group}
                        onClick={() => setOpenGroup(isOpen ? null : group.group)} // Toggle open/close
                        className="w-full"
                    >
                        <RouteGroup group={group.group} items={group.items} open={isOpen} />
                    </div>
                );
            })}
        </div>
    );
};