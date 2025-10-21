"use client"

import React, { useState, ReactNode } from 'react'
import { Apple, Boxes, Ruler, Utensils, Dumbbell, BicepsFlexed, BriefcaseBusiness, ChartNoAxesCombined } from 'lucide-react'
import z, { set } from 'zod'
import { customErrorMap } from '@/lib/customErrorMap'
import Header from './Header'

z.setErrorMap(customErrorMap)

export type RouteGroupType = {
    group: string
    items: {
        href: string
        label: string
        icon: ReactNode
    }[]
}

export const ROUTE_GROUPS: RouteGroupType[] = [
    {
        group: 'Fitness',
        items: [
            { href: '/admin/fitness-management/exercises', label: 'Exercises', icon: <Dumbbell className="mr-2 size-4" /> },
            { href: '/admin/fitness-management/workouts', label: 'Workouts', icon: <BicepsFlexed className="mr-2 size-4" /> },
        ],
    },
    {
        group: 'Nutrition',
        items: [
            { href: '/admin/foods-management/foods', label: 'Foods', icon: <Apple className="mr-2 size-4" /> },
            { href: '/admin/foods-management/categories', label: 'Categories', icon: <Boxes className="mr-2 size-4" /> },
            { href: '/admin/foods-management/serving-units', label: 'Serving Units', icon: <Ruler className="mr-2 size-4" /> },
            { href: '/admin/foods-management/meals', label: 'Meals', icon: <Utensils className="mr-2 size-4" /> }
        ],
    },
    {
        group: 'Financials',
        items: [
            { href: '/admin/financial-management/portfolio', label: 'Portfolio', icon: <BriefcaseBusiness className="mr-2 size-4" /> },
            { href: '/admin/financial-management/market', label: 'Market', icon: <ChartNoAxesCombined className="mr-2 size-4" /> },
        ],
    },
]


type DashboardLayoutProps = {
    children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="flex">
            <Header open={open} setOpen={setOpen} />
            <main className={`transition-margin mt-13 flex-1 p-4 duration-300 ${open ? 'ml-64' : 'ml-0'}`}>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout