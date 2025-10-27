"use client";
import React from 'react'
import MyPictures from "../MyPictures";
import TechDisplay from '../TechUsed/TechDisplay';


type Props = {}

const HeroCardMobile = (props: Props) => {

    return (
        <div className='flex items-center flex-col md:flex-row md:pl-16' >
            <div className="flex flex-col w-2/3 gap-4 mt-4">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-center md:text-left">
                    Devon Fennell
                </h1>
                <p className="text-xs md:text-sm leading-relaxed text-center md:text-left">
                    This website is a showcase of my full-stack capabilities and a demonstration
                    of all I've learned since I was laid off from my last position...
                </p>
                <div className='flex justify-center md:justify-start' >
                    <TechDisplay
                        className='flex w-full justify-center md:justify-start gap-8'
                        github
                        linkedin
                        gmail
                        label={false}
                        size={56}
                    />
                </div>
            </div>
            <div className='w-1/2 pr-2' >
                <MyPictures />
            </div>
        </div>

    )
}

export default HeroCardMobile