"use client";
import React, { ReactNode, useState } from 'react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import { ClassName } from './D_types';
import { motion } from "framer-motion";


export type D_CollapsibleProps = Partial<ClassName> & {
    open: boolean
    head: ReactNode
    body: ReactNode
}

const D_Collapsible = ({
    head,
    body,
    open,
    className
}: D_CollapsibleProps) => {

    return (
        <Collapsible open={open} className={className}>
            <CollapsibleTrigger asChild className='w-full h-max'>
                {head}
            </CollapsibleTrigger>
            <CollapsibleContent>
                <motion.div
                    className={`flex flex-col w-full ${!open ? "pointer-events-none" : ""}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >{body}</motion.div>
            </CollapsibleContent>
        </Collapsible>
    )
}

export default D_Collapsible