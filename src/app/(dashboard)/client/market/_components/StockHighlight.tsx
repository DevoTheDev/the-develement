"use client"
import React from 'react'
import Link from 'next/link'
import { ClassName } from '@/components/D_Components/D_types'

type StockHighlightProps = {
    symbol: string
}

type HighlightLinkProps = ClassName & {
    symbol: string
}

type StockHighlightSubcomponents = {
    Link: React.FC<HighlightLinkProps>
}

const StockHighlight: React.FC<StockHighlightProps> & StockHighlightSubcomponents = ({

}: StockHighlightProps) => {
    return (
        <div>StockHighlight</div>
    )
}


const StockLink: React.FC<HighlightLinkProps> = ({
    symbol,
    className
}: HighlightLinkProps) => {
    return (
        <Link href={`/client/market/${symbol}`}>
            <div className={className}>
                {symbol}
            </div>
        </Link>
    )
}

StockHighlight.Link = StockLink;

export default StockHighlight