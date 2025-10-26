"use client";
import React from "react";
import MyPictures from "../MyPictures";
import MyExperience from "../MyExperience";
import TechDisplay from "../TechUsed/TechDisplay";

const HeroCard: React.FC = () => {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-5xl flex flex-col gap-8 p-6 backdrop-blur-sm shadow-md rounded-3xl">
        {/* TEXT + IMAGE BLOCK */}
        <div className="flex">
          <div className="flex w-full md:w-1/2 text-center items-center space-y-4 p-24">

          </div>
          <TechDisplay github linkedin gmail label={false} size={56} centered />
          <div className="bg-red-400 flex justify-center">
            <MyPictures />
          </div>
        </div>

        {/* EXPERIENCE SECTION */}
        <div className="w-full">
          <MyExperience />
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
