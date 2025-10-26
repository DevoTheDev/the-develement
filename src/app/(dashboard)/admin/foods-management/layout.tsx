"use client"
import React from 'react'
import Navigation from '../../_components/Navigation'

type Props = {
    children: React.ReactNode
}

const layout = ({
    children
}: Props) => {
    return (
        <div className="mx-[5%] my-[2%]">
            <Navigation.Tabs />
            {children}
        </div>
    )
}

export default layout