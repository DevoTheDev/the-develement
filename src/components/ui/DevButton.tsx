"use client"
import React, { ReactNode } from "react"
import {
    Edit,
    Plus,
    Trash,
    Apple,
    Boxes,
    Ruler,
    Utensils,
    Dumbbell,
    BicepsFlexed,
    BriefcaseBusiness,
    ChartNoAxesCombined,
    Menu,
    LogIn,
    LogOut,
    Minus,
    ChevronDown,
    ChevronLeft,
    ChevronUp,
    ChevronRight,
    Moon,
    Sun,
    XIcon,
    CircleIcon,
    LucideX,
    Cog
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type BaseProps = React.ComponentProps<"div"> & {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
    iconSize?: number;
}

type IconButtonProps = {
    type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] | "icon"
    subtype: keyof typeof iconMap
    label?: string
    tooltip?: string
    icon?: ReactNode
}


type DevButtonProps = BaseProps & Partial<IconButtonProps>

export const iconMap = {
    edit: Edit,
    plus: Plus,
    trash: Trash,
    apple: Apple,
    boxes: Boxes,
    ruler: Ruler,
    utensils: Utensils,
    dumbbell: Dumbbell,
    biceps: BicepsFlexed,
    briefcase: BriefcaseBusiness,
    chart: ChartNoAxesCombined,
    menu: Menu,
    login: LogIn,
    logout: LogOut,
    minus: Minus,
    chevronDown: ChevronDown,
    chevronLeft: ChevronLeft,
    chevronUp: ChevronUp,
    chevronRight: ChevronRight,
    moon: Moon,
    sun: Sun,
    close: XIcon,
    circle: CircleIcon,
    x: LucideX,
    cog: Cog
} as const

export default function DevButton(props: DevButtonProps) {
    const {
        type,
        subtype,
        label,
        onClick,
        children,
        className,
        iconSize = 4,
        icon,
        tooltip,
        ...rest
    } = props

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        onClick && onClick(e)
    }

    // ICON MODE
    if (type === "icon" && subtype) {
        const Icon = iconMap[subtype]
        const iconContent = (
            <div

                {...rest}
                onClick={handleClick}
                className={cn(className,
                    `cursor-pointer items-center flex gap-4`
                )}
            >
                <Icon className={`w-${iconSize} h-${iconSize} opacity-80`} />
                {label}
            </div>
        )
        if (!tooltip) {
            return iconContent
        }
        return (
            <Tooltip>
                <TooltipTrigger suppressHydrationWarning>
                    {iconContent}
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
        )
    }

    // REGULAR MODE
    return (
        <div
            {...rest}
            onClick={handleClick}
            className={className}

        >
            {children}
        </div>
    )
}
