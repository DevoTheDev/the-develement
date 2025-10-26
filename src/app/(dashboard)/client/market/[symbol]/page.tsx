"use client"
import React from 'react'
import { useParams } from 'next/navigation'

type Props = {}

const page = (props: Props) => {
    const { symbol } = useParams();
    return (
        <div>{symbol}</div>
    )
}

export default page