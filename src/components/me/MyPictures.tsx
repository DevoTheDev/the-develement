"use client";
import React from "react";
import Image from "next/image";
import { ClassName } from "../D_Components/D_types";

const MyPicturesMobile: React.FC = () => {
  return (
    <div
      className={`
        relative h-[14rem] md:h-[20rem]
        w-full
        rounded-xl md:mb-12
      `}
      role="group"
      aria-label="Developer portrait images"
    >
      <div
        className={`
          absolute -translate-x-1/2 z-10
          bottom-[15%] left-[150%]
          w-[70px] h-[160px] md:w-[90px] md:h-[200px]
        `}
      >
        <Image
          src="/personal/Me.png"
          alt="Developer portrait"
          fill
          className="rounded-xl shadow-xl object-cover"
          priority
        />
      </div>
      <div
        className={`
          absolute -translate-x-1/2 z-10
          top-[15%] left-[60%]
          w-[70px] h-[160px] md:w-[90px] md:h-[200px]
        `}
      >
        <Image
          src="/personal/meBW.JPG"
          alt="Developer portrait black and white"
          fill
          className="rounded-xl shadow-2xl object-cover object-[35%_center]"
          priority
        />
      </div>
    </div>
  );
};

const MyPicturesDesktop: React.FC = () => {
  return (
    <div
      className={`
        relative h-[14rem] md:h-[20rem]
        rounded-xl md:mb-12
      `}
      role="group"
      aria-label="Developer portrait images"
    >
      <div
        className={`
          absolute -translate-x-1/2 z-10
          top-[10%] left-[60%] 
          w-[100px] h-[260px]
        `}
      >
        <Image
          src="/personal/Me.png"
          alt="Developer portrait"
          fill
          className="rounded-xl shadow-xl object-cover"
          priority
        />
      </div>
      <div
        className={`
          absolute -translate-x-1/2 z-10
          top-[25%] left-[160%]
          w-[100px] h-[260px]
        `}
      >
        <Image
          src="/personal/meBW.JPG"
          alt="Developer portrait black and white"
          fill
          className="rounded-xl shadow-2xl object-cover object-[35%_center]"
          priority
        />
      </div>
    </div>
  );
};

const ResponsiveMyPictures: React.FC = () => {
  return (
    <>
      {/* Mobile + Tablet */}
      <div className="w-1/2 lg:hidden">
        <MyPicturesMobile />
      </div>

      {/* Desktop */}
      <div className="hidden w-1/2 lg:block">
        <MyPicturesDesktop />
      </div>
    </>
  );
};

export default ResponsiveMyPictures;

