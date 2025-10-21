"use client";
import React, { ReactNode } from 'react'
import NavButton from './_components/_navigation/NavButton';
import DashboardLayout from './_components/dashboard-layout';

type Props = {
    children: ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}

export default layout