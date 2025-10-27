"use client";
import React, { useState, useRef, useEffect } from "react";
import D_Collapsible, { D_CollapsibleProps } from "./D_Collapsible";
import { ClassName } from "./D_types";

export type D_AccordionProps = ClassName & {
    sections: {
        head: {
            title: string,
            render: React.ReactNode
        },
        body: React.ReactNode
    }[],
}


const D_Accordion = ({
    sections,
    className
}: D_AccordionProps) => {

    const [openSection, setOpenSection] = useState<string | null>(null);

    return (
        <div className={className}>
            {sections.map((sect, i) => {
                const isOpen = openSection === sect.head.title;

                return (
                    <D_Collapsible
                        key={i}
                        open={isOpen}
                        head={(
                            <div
                                onClick={() => setOpenSection(sect.head.title)}>
                                {sect.head.render}
                            </div>
                        )}
                        body={sect.body}
                    />
                )
            })}
        </div>
    )

}

export default D_Accordion;
