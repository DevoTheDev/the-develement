"use client";
import React, { useState } from "react";

const MyResume = () => {
  return (
    <div className="w-full bg-white/30 h-max text-gray-800 rounded-2xl shadow-sm
      backdrop-blur-xs pb-11">
      {/* Experience */}
      <section className="p-8">
        <h2 className="md:text-2xl text-sm font-semibold border-b border-gray-300 pb-4 mb-2">
          Professional Experience
        </h2>
        <div className="mb-4">
          <h3 className="font-semibold">Overnight Stocker – Lowe's</h3>
          <p className="md:text-sm text-xs text-gray-600">Dec 2024 – Present</p>
          <ul className="list-disc list-inside text-xs md:text-md">
            <li>Managed client orders and provided tailored hardware solutions.</li>
            <li>Strengthened customer service skills through direct troubleshooting.</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Procurements Manager – CrossLink Consulting</h3>
          <p className="md:text-sm text-xs text-gray-600">Apr 2024 – Oct 2024</p>
          <ul className="list-disc list-inside text-xs md:text-md">
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
  );
};

export default MyResume;

