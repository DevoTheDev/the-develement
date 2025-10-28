"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, className }) => {
    return (
        <motion.section
            id={id}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                    },
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={cn("w-full min-h-screen flex items-center justify-center snap-start",
                className,
            )}
        >
            <div className="w-full flex items-center justify-center">
                {children}
            </div>
        </motion.section>
    );
};

const D_Transition: React.FC<{ children: React.ReactNode }> & {
    Section: typeof Section;
} = ({ children }) => {
    return (
        <div className="w-full overflow-y-scroll scroll-smooth overflow-x-clip snap-y snap-mandatory">
            {children}
        </div>
    );
};

D_Transition.Section = Section;

export default D_Transition;