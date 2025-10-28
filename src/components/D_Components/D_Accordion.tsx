"use client";
import React, { useState } from "react";
import D_Collapsible from "./D_Collapsible";
import { ClassName } from "./D_types";

export type D_AccordionProps = ClassName & {
    accordionHead: React.ReactNode
    sections: {
        head: {
            title: string,
            render: React.ReactNode
        },
        body: React.ReactNode
    }[],
}


const D_Accordion = ({
    accordionHead,
    sections,
    className
}: D_AccordionProps) => {

    const [openSection, setOpenSection] = useState<string | null>(null);

    return (
        <div className={className}>
            {accordionHead}
            {sections.map((sect, i) => {
                const isOpen = openSection === sect.head.title;

                return (
                    <D_Collapsible
                        key={i}
                        open={isOpen}
                        trigger={(
                            <div
                                onClick={() => setOpenSection(sect.head.title)}>
                                {sect.head.render}
                            </div>
                        )}
                        content={sect.body}
                    />
                )
            })}
        </div>
    )

}

export default D_Accordion;
