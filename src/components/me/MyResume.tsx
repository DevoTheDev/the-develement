"use client";
import React, { useState } from "react";
import D_Button from "../D_Components/D_Button";
import D_Accordion, { D_AccordionProps } from "../D_Components/D_Accordion";

const D_AccordionContent: D_AccordionProps = {
  className: 'bg-white/30 rounded-lg p-4 flex md:hidden',
  sections: [
    {
      head: {
        title: "Overnight Stocker – Lowe's",
        render: (
          <div className="border-black/10 border-b-1 py-2 px-4" >
            <h3 className="font-semibold text-sm">Overnight Stocker – Lowe's</h3>
            <p className="md:text-sm text-xs text-gray-600">Dec 2024 – Present</p>
          </div>
        ),
      },
      body: (
        <ul className="list-disc list-inside text-xs md:text-md">
          <li>Unloaded the truck and stocked the shelves with merchandise.</li>
          <li>Operated heavy machinery to organize the warehouse.</li>
        </ul>
      )
    },
    {
      head: {
        title: "Procurements Manager – CrossLink Consulting",
        render: (
          <div className="border-black/10 border-b-1 py-2 px-4" >
            <h3 className="font-semibold text-sm">Procurements Manager – CrossLink Consulting</h3>
            <p className="md:text-sm text-xs text-gray-600">Apr 2024 – Oct 2024</p>
          </div>
        ),
      },
      body: (
        <ul className="list-disc list-inside text-xs md:text-md">
          <li>Developed low-level, in-house organization software using React and Express.</li>
          <li>Managed hardware orders and client-specific IT solutions.</li>
          <li>Gained deeper experience with procurement workflows and client support.</li>
        </ul>
      )
    },
    {
      head: {
        title: "Associate Software Engineer – Progressive Leasing",
        render: (
          <div className="border-black/10 border-b-1 py-2 px-4" >
            <h3 className="font-semibold text-sm">Associate Software Engineer – Progressive Leasing</h3>
            <p className="md:text-sm text-xs text-gray-600">Jan 2023 – Mar 2024</p>
          </div>
        ),
      },
      body: (
        <ul className="list-disc list-inside text-xs md:text-md">
          <li>Developed mobile and web apps using React, React Native, Angular.</li>
          <li>Integrated CI/CD with Jenkins and Docker.</li>
          <li>Worked in Agile and Waterfall team settings.</li>
        </ul>
      )
    },
    {
      head: {
        title: "Server/Buss Boy – Cantina Locale",
        render: (
          <div className="border-black/10 border-b-1 py-2 px-4" >
            <h3 className="font-semibold text-sm">Server/Buss Boy – Cantina Locale</h3>
            <p className="md:text-sm text-xs text-gray-600">Apr 2022 – Jan 2023</p>
          </div>
        ),
      },
      body: (
        <ul className="list-disc list-inside text-xs md:text-md">
          <li>Handled peak customer service loads with a strong sense of teamwork.</li>
          <li>Explained menu items, specials, and coordinated with kitchen staff.</li>
        </ul>
      )
    },
    {
      head: {
        title: "Stock Clerk – Publix Super Market",
        render: (
          <div className="border-black/10 border-b-1 py-2 px-4" >
            <h3 className="font-semibold text-sm">Stock Clerk – Publix Super Market</h3>
            <p className="md:text-sm text-xs text-gray-600">May 2018 – Mar 2022</p>
          </div>
        ),
      },
      body: (
        <ul className="list-disc list-inside text-xs md:text-md">
          <li>Provided retail support and developed communication under pressure.</li>
          <li>Worked with store teams to ensure smooth customer experience.</li>
        </ul>
      )
    },
    {
      head: {
        title: "Education",
        render: (
          <div className="py-2 px-4 font-semibold border-black/20 border-b-1 ">
            Education
          </div>
        ),
      },
      body: (
        <div className="px-4" >
          <h3 className="text-sm">Evans High School</h3>
          <p className="md:text-sm text-xs text-gray-600">High School Diploma, May 2019</p>
        </div>
      )
    }
  ]
}

const MyResume = () => {
  return (
    <>
      <D_Accordion {...D_AccordionContent} />
      <div className="w-full hidden md:flex md:flex-col h-max text-gray-800 rounded-2xl shadow-sm
      backdrop-blur-xs p-8 bg-white/30">
        <section >
          <h2 className="md:text-2xl text-sm font-semibold border-b border-gray-300 pb-4 mb-2 flex justify-between">
            Professional Experience
            <D_Button
              href="personal/DevonResume7.pdf"
              download
              icon="Download"
              className="hover:opacity-85"
              tooltip="Download Resume"
            />
          </h2>
          <div className="mb-4">
            <h3 className="font-semibold">Overnight Stocker – Lowe's</h3>
            <p className="md:text-sm text-xs text-gray-600">Dec 2024 – Present</p>
            <ul className="list-disc list-inside text-xs md:text-md">
              <li>Unloaded the truck and stocked the shelves with merchandise.</li>
              <li>Operated heavy machinery to organize the warehouse.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Procurements Manager – CrossLink Consulting</h3>
            <p className="md:text-sm text-xs text-gray-600">Apr 2024 – Oct 2024</p>
            <ul className="list-disc list-inside text-xs md:text-md">
              <li>Developed low-level, in-house organization software using React and Express.</li>
              <li>Managed hardware orders and client-specific IT solutions.</li>
              <li>Gained deeper experience with procurement workflows and client support.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Associate Software Engineer – Progressive Leasing</h3>
            <p className="md:text-sm text-xs text-gray-600">Jan 2023 – Mar 2024</p>
            <ul className="list-disc list-inside text-xs md:text-md">
              <li>Developed mobile and web apps using React, React Native, Angular.</li>
              <li>Integrated CI/CD with Jenkins and Docker.</li>
              <li>Worked in Agile and Waterfall team settings.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Server/Buss Boy – Cantina Locale</h3>
            <p className="md:text-sm text-xs text-gray-600">Apr 2022 – Jan 2023</p>
            <ul className="list-disc list-inside text-xs md:text-md">
              <li>Handled peak customer service loads with a strong sense of teamwork.</li>
              <li>Explained menu items, specials, and coordinated with kitchen staff.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Stock Clerk – Publix Super Market</h3>
            <p className="md:text-sm text-xs text-gray-600">May 2018 – Mar 2022</p>
            <ul className="list-disc list-inside text-xs md:text-md">
              <li>Provided retail support and developed communication under pressure.</li>
              <li>Worked with store teams to ensure smooth customer experience.</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="px-8">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Education
          </h2>
          <p>
            <strong>Evans High School</strong><br />
            High School Diploma, May 2019
          </p>
        </section>
      </div>
    </>
  );
};




export default MyResume;

