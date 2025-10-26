"use client";
import React, { useState, useRef, useEffect } from "react";
import D_Collapsible, { D_CollapsibleProps } from "./D_Collapsible";
import { group } from "console";
import D_Button from "./D_Button";

export interface D_AccordionProps {
    sections: {
        title: string,
        section: React.ReactNode
    }[],
}


const D_Accordion = ({
    sections
}: D_AccordionProps) => {

    const [openSection, setOpenSection] = useState<string | null>(null);

    return (
        <div>
            {sections.map((sect) => {
                const isOpen = sect.title === openSection;
                return (
                    <D_Collapsible
                        open={isOpen}
                        head={(
                            <div
                                onClick={() => setOpenSection(isOpen ? null : sect.title)}
                                className={`
                                w-full p-5 flex justify-between items-center 
                                transform-content ease-in-out duration-300 hover:scale-103
                                cursor-pointer
                                `}>
                                <D_Button
                                    className="font-bold text-2xl text-black/70"
                                    label={sect.title}
                                    disableDefault
                                />
                                <D_Button
                                    icon="ChevronDown"
                                    disableDefault
                                    className={`duration-300 ${isOpen ? "rotate-180" : ""} text-black/70`}
                                />
                            </div>
                        )}
                        body={sect.section}
                    />
                )
            })}
        </div>
    )

}

export default D_Accordion;
