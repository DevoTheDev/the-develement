"use client";

import React from "react";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
    open: boolean;
    setOpen: (open: boolean) => void;
    children: React.ReactNode;
    direction?: "fromLeft" | "fromRight";
};

const D_Sidebar = ({
    open,
    setOpen,
    children,
    className,
    direction = "fromLeft",
    ...rest
}: SidebarProps) => {
    // -----------------------------------------------------------------
    // 1. Determine transform class based on direction
    // -----------------------------------------------------------------
    const translateClass = open
        ? "translate-x-0"
        : direction === "fromLeft"
            ? "-translate-x-full"
            : "translate-x-full";

    // -----------------------------------------------------------------
    // 2. Base + direction-specific classes
    // -----------------------------------------------------------------
    const sidebarClasses = `
    transition-transform duration-300 ease-in-out z-50
    ${direction === "fromLeft" ? "left-0" : "right-0"}
    ${translateClass}
    ${className ?? ""}
  `.trim();

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 backdrop-blur-xs z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={sidebarClasses} {...rest}>
                <div className="p-4">{children}</div>
            </aside>
        </>
    );
};

export default D_Sidebar;