"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TechDisplay from "./TechDisplay";
import D_Collapsible from "@/components/D_Components/D_Collapsible";

interface TechSection {
  label: string;
  props: {
    react?: boolean;
    typescript?: boolean;
    postgres?: boolean;
    express?: boolean;
    tailwind?: boolean;
    mui?: boolean;
    docker?: boolean;
    mongodb?: boolean;
    nextjs?: boolean;
    python?: boolean;
    css?: boolean;
    javascript?: boolean;
    github?: boolean;
    linkedin?: boolean;
    gmail?: boolean;
    html?: boolean;
    node?: boolean;
    reactnative?: boolean;
    prisma?: boolean,
    sqlite?: boolean,
    aws?: boolean,
    awsEC2?: boolean,
    awsRDS?: boolean,
    awsRoute53?: boolean,
    linux?: boolean,
    awsAmplify?: boolean,
    angular?: boolean,
    stenciljs?: boolean,
    jenkins?: boolean,
    bootstrap?: boolean,
    sass?: boolean,
    zod?: boolean,
    awsCloudWatch?: boolean,
  };
}

const techSections: TechSection[] = [
  {
    label: "Frontend",
    props: {
      react: true,
      nextjs: true,
      css: true,
      mui: true,
      tailwind: true,
      javascript: true,
      reactnative: true,
      html: true,
      typescript: true,
      angular: true,
      stenciljs: true,
      bootstrap: true,
      sass: true,
    },
  },
  {
    label: "Backend",
    props: {
      express: true,
      python: true,
      typescript: true,
      node: true,
    },
  },
  {
    label: "Databases",
    props: {
      postgres: true,
      mongodb: true,
      prisma: true,
      sqlite: true,
      zod: true,
    },
  },
  {
    label: "Infrastructure",
    props: {
      docker: true,
      aws: true,
      awsEC2: true,
      awsRDS: true,
      awsRoute53: true,
      linux: true,
      awsAmplify: true,
      jenkins: true,
      awsCloudWatch: true,
    },
  },
];

interface TechStackProps {
  size?: number;
  padded?: boolean
  centered?: boolean;
  label?: boolean;
  labelPosition?: "bottom" | "right" | "tooltip";
  animationDelay?: number;
  animationDuration?: number;
}

const TechStack: React.FC<TechStackProps> = ({
  label = true,
  animationDelay = 500,
  animationDuration = 0.8,
  padded,
}) => {
  const [visibleSections, setVisibleSections] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSections((prev) => {
        if (prev < techSections.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, animationDelay);
    return () => clearInterval(interval);
  }, [animationDelay]);

  return (
    <div
      className={`
        w-full mx-auto p-4 sm:p-6 md:p-8
        flex flex-col items-center
        transition-all hover:scale-[1.02] transform
        hover:shadow-md duration-200
        rounded-2xl shadow-sm
        backdrop-blur-xs
      `}
      role="region"
      aria-label="Technology stack sections"
    >
      {techSections.map((section, index) => (
        <motion.div
          key={section.label}
          initial={{ opacity: 0, y: 20 }}
          animate={visibleSections > index ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: animationDuration, ease: "easeOut", delay: index * 0.2 }}
          className="w-full space-y-3 sm:space-y-4"
        >
          <h2
            className="
              text-lg sm:text-xl md:text-2xl
              text-black/40 font-semibold tracking-tight
              text-left
            "
          >
            {section.label}
          </h2>
          <hr className="border-t border-black/20 w-full" />
          <TechDisplay
            {...section.props}
            label={label}
            padded={padded}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default TechStack;
