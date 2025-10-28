'use client';
import React, { ReactNode } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
    ,
} from "@/components/ui/carousel"

type D_CarouselProps = {
    items: ReactNode[]
}

const D_Carousel = ({
    items,
}: D_CarouselProps) => {
    return (
        <Carousel className="w-full flex justify-center">
            <CarouselContent>
                {items.map((item, i) => {
                    return (
                        <CarouselItem className='flex items-center overflow-y-clip' key={i}>{item}</CarouselItem>
                    )
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default D_Carousel