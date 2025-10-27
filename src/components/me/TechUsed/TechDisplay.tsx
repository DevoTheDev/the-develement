"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { ClassName } from "@/components/D_Components/D_types";

type TechDisplayProps = Partial<ClassName> & {
  [key: string]: boolean | undefined | number | string;
  centered?: boolean;
  label?: boolean;
  size?: number;
  padded?: boolean;
  vertical?: boolean;
}

type TechLink = {
  key: string;
  label: string;
  src: string;
  docs: string;
  type: string;
};

const techMap: TechLink[] = [
  { key: "nextjs", label: "NextJS", src: "/logos/nextjs.svg", docs: "https://nextjs.org/", type: "frontend" },
  { key: "react", label: "React", src: "/logos/react.svg", docs: "https://reactjs.org/docs/getting-started.html", type: "frontend" },
  { key: "reactnative", label: "React Native", src: "/logos/reactnative.svg", docs: "https://reactnative.dev/", type: "frontend" },
  { key: "typescript", label: "TypeScript", src: "/logos/typescript.svg", docs: "https://www.typescriptlang.org/docs/", type: "backend" },
  { key: "postgres", label: "PostgreSQL", src: "/logos/postgresql.svg", docs: "https://www.postgresql.org/docs/", type: "database" },
  { key: "html", label: "HTML5", src: "/logos/html.svg", docs: "https://developer.mozilla.org/en-US/docs/Web/HTML", type: "frontend" },
  { key: "express", label: "ExpressJS", src: "/logos/express.svg", docs: "https://expressjs.com/en/starter/installing.html", type: "backend" },
  { key: "tailwind", label: "Tailwind CSS", src: "/logos/tailwind.svg", docs: "https://tailwindcss.com/docs/installation", type: "frontend" },
  { key: "mui", label: "Material UI", src: "/logos/mui.svg", docs: "https://mui.com/material-ui/getting-started/overview/", type: "frontend" },
  { key: "angular", label: "Angular", src: "/logos/angular.svg", docs: "https://angular.dev/", type: "frontend" },
  { key: "bootstrap", label: "Bootstrap", src: "/logos/bootstrap.svg", docs: "https://getbootstrap.com/", type: "frontend" },
  { key: "sass", label: "Sass", src: "/logos/sass.svg", docs: "https://sass-lang.com/", type: "frontend" },
  { key: "stenciljs", label: "Stencil JS", src: "/logos/stenciljs.svg", docs: "https://stenciljs.com/", type: "frontend" },
  { key: "docker", label: "Docker", src: "/logos/docker.svg", docs: "https://docs.docker.com/get-started/", type: "infrastructure" },
  { key: "github", label: "GitHub", src: "/logos/github.svg", docs: "https://github.com/DevoTheDev", type: "infrastructure" },
  { key: "linkedin", label: "LinkedIn", src: "/logos/linkedin.svg", docs: "https://www.linkedin.com/in/devon-fennell-509997258", type: "infrastructure" },
  { key: "mongodb", label: "MongoDB", src: "/logos/mongodb.svg", docs: "https://www.mongodb.com/docs/", type: "database" },
  { key: "css", label: "CSS3", src: "/logos/css.svg", docs: "https://developer.mozilla.org/en-US/docs/Web/CSS", type: "frontend" },
  { key: "python", label: "Python", src: "/logos/python2.svg", docs: "https://docs.python.org/3/", type: "backend" },
  { key: "javascript", label: "Javascript", src: "/logos/javascript.svg", docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", type: "javascript" },
  { key: "gmail", label: "Gmail", src: "/logos/gmail.svg", docs: "mailto:devonfennell23@gmail.com", type: "gmail" },
  { key: "node", label: "NodeJS", src: "/logos/node.svg", docs: "https://nodejs.org/en", type: "backend" },
  { key: "aws", label: "Amazon Web Services", src: "/logos/aws.svg", docs: "https://aws.amazon.com/", type: "infrastructure" },
  { key: "awsEC2", label: "EC2 (AWS)", src: "/logos/aws-ec2.svg", docs: "https://aws.amazon.com/ec2/", type: "infrastructure" },
  { key: "awsRDS", label: "RDS (AWS)", src: "/logos/aws-rds.svg", docs: "https://aws.amazon.com/rds/", type: "infrastructure" },
  { key: "awsRoute53", label: "Route 53 (AWS)", src: "/logos/aws-route53.svg", docs: "https://aws.amazon.com/route53/", type: "infrastructure" },
  { key: "sqlite", label: "SQLite", src: "/logos/sqlite.svg", docs: "https://sqlite.org/", type: "database" },
  { key: "prisma", label: "Prisma", src: "/logos/prisma.svg", docs: "https://www.prisma.io/", type: "database" },
  { key: "zod", label: "Zod", src: "/logos/zod.svg", docs: "https://zod.dev/", type: "database" },
  { key: "awsAmplify", label: "Amplify (AWS)", src: "/logos/aws-amplify.svg", docs: "https://aws.amazon.com/amplify/", type: "infrastructure" },
  { key: "linux", label: "Linux (AWS-EC2)", src: "/logos/linux.svg", docs: "https://www.linux.org/", type: "infrastructure" },
  { key: "jenkins", label: "Jenkins", src: "/logos/jenkins.svg", docs: "https://www.jenkins.io/", type: "infrastructure" },

] as const;

const hoverColorByType: Record<string, string> = {
  frontend: "hover:text-black/80",
  backend: "hover:text-black/50",
  database: "hover:text-white/90",
  infrastructure: "hover:text-white",
};

const TechDisplay: React.FC<TechDisplayProps> = ({ centered = false, label = true, size = 36, padded = false, vertical = false, className, ...techFlags }) => {
  const selected = techMap.filter((tech) => techFlags[tech.key]);

  const labeledLogo = (data: TechLink) => {
    const hoverTextColor = hoverColorByType[data.type] || "";

    return (
      <div
        key={data.key}
        className={clsx(
          "relative flex justify-center items-center p-0 md:p-1 lg:p-2 w-max rounded-3xl gap-2",
          "transition-all duration-200 transform",
          "cursor-pointer md:hover:bg-black/10 text-black",
          "hover:scale-[1.05]",
          hoverTextColor,
          { "px-8": padded },
        )}
      >
        <a
          href={data.docs}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center"
          aria-label={`Visit ${data.label} documentation`}
        >
          <Image
            src={data.src}
            alt={data.label}
            width={size}
            height={size}
            className="object-contain"
          />
        </a>
        {label && <span className="text-center text-xs lg:flex md:hidden hidden">{data.label}</span>}
      </div>
    );
  };

  return (
    <div
      className={className ? className : 'md:flex md:flex-wrap grid grid-cols-5 gap-0 md:gap-4'}
      role="list"
      aria-label="Technology stack"
    >
      {selected.map((tech) => labeledLogo(tech))}
    </div>
  );
};

export default TechDisplay;
