"use client";
import React, { ReactNode } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { motion, AnimatePresence } from "framer-motion";
import { ClassName } from "./D_types";

export type D_CollapsibleProps = Partial<ClassName> & {
    open: boolean;
    head: ReactNode;
    body: ReactNode;
};

const D_Collapsible = ({ head, body, open, className }: D_CollapsibleProps) => {
    return (
        <Collapsible.Root open={open} className={className}>
            <Collapsible.Trigger asChild className="w-full">
                {head}
            </Collapsible.Trigger>

            <Collapsible.Content asChild>
                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            key="body"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="py-2">{body}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Collapsible.Content>
        </Collapsible.Root>
    );
};

export default D_Collapsible;
