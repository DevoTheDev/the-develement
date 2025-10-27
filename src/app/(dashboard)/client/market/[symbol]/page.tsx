"use client"
import React from 'react'
import { useParams } from 'next/navigation'

const page = () => {
    const { symbol } = useParams();
    return (
        <div>{symbol}</div>
    )
}

export default page