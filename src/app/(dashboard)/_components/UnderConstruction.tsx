"use client";
import React from 'react';

interface UnderConstructionProps {
    message?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
    message = 'This feature is currently under construction. Please check back later!',
}) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-screen bg-background text-gray-800 font-sans p-5 box-border">
            <div className=" dark:text-white text-5xl text-orange-500 mb-5">🚧</div>
            <h1 className=" dark:text-white text-2xl font-bold mb-2.5">Under Construction</h1>
            <p className=" dark:text-white text-base max-w-xl leading-relaxed">{message}</p>
        </div>
    );
};

export default UnderConstruction;