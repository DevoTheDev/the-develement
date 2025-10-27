"use client";
import React, { ReactNode } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { motion, AnimatePresence } from "framer-motion";
import { ClassName } from "./D_types";

export type D_CollapsibleProps = Partial<ClassName> & {
    open: boolean;
    trigger: ReactNode;
    content: ReactNode;
};

const D_Collapsible = ({ trigger, content, open, className }: D_CollapsibleProps) => {
    return (
        <Collapsible.Root open={open} className={className}>
            <Collapsible.Trigger asChild className="w-full">
                {trigger}
            </Collapsible.Trigger>
            <Collapsible.Content asChild>
                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="overflow-hidden">
                            <div className="py-2">{content}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Collapsible.Content>
        </Collapsible.Root>
    );
};

export default D_Collapsible;
