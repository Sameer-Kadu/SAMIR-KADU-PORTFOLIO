import type { Domain } from "./types";

/**
 * Engineering domains, from the Technical Skills section of Sameer's resume.
 * Technologies without an SVG in /public/icons render as plain labels.
 */
export const DOMAINS: Domain[] = [
  {
    id: "frontend",
    code: "FE",
    label: "Frontend",
    summary: "Typed, component-driven interfaces in React, Next.js and Angular.",
    links: ["backend", "quality"],
    tech: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg", tone: "mono" },
      { name: "Angular" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "JavaScript", icon: "/icons/javascript.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
      { name: "HTML5", icon: "/icons/html5.svg" },
      { name: "CSS3", icon: "/icons/css3.svg" },
    ],
  },
  {
    id: "backend",
    code: "BE",
    label: "Backend",
    summary: "Java and Spring Boot microservices with Kafka event workflows.",
    links: ["frontend", "data", "cloud"],
    tech: [
      { name: "Java", icon: "/icons/java.svg" },
      { name: "Spring Boot" },
      { name: "Spring MVC" },
      { name: "Spring Security (JWT)" },
      { name: "JPA / Hibernate" },
      { name: "Kafka" },
      { name: "REST APIs" },
      { name: "Microservices" },
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "Express.js", icon: "/icons/express.svg", tone: "mono" },
      { name: "Python", icon: "/icons/python.svg" },
      { name: "C++" },
    ],
  },
  {
    id: "data",
    code: "DB",
    label: "Data",
    summary: "Relational databases and the Snowflake data cloud.",
    links: ["backend", "cloud"],
    tech: [
      { name: "Oracle" },
      { name: "MySQL" },
      { name: "PostgreSQL" },
      { name: "Snowflake" },
      { name: "SQL", icon: "/icons/sql.svg" },
      { name: "PL/SQL" },
    ],
  },
  {
    id: "quality",
    code: "QA",
    label: "Quality",
    summary: "Unit, UI and API tests wired into CI, plus production debugging.",
    links: ["frontend", "backend", "cloud"],
    tech: [
      { name: "JUnit" },
      { name: "Selenium", icon: "/icons/selenium.svg" },
      { name: "Playwright", icon: "/icons/playwright.svg" },
      { name: "Postman" },
      { name: "Swagger" },
    ],
  },
  {
    id: "cloud",
    code: "OPS",
    label: "Cloud & DevOps",
    summary: "Containers, reverse proxies, CI/CD pipelines, AWS and Azure.",
    links: ["backend", "data", "quality"],
    tech: [
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "Docker Compose" },
      { name: "Nginx" },
      { name: "Jenkins", icon: "/icons/jenkins.svg" },
      { name: "GitHub Actions" },
      { name: "Linux" },
      { name: "AWS EC2 / RDS", icon: "/icons/aws.svg", tone: "dark" },
      { name: "Azure" },
      { name: "Vercel" },
      { name: "Git", icon: "/icons/git.svg" },
    ],
  },
];

/**
 * A representative request path through the stack, used by the Stack module to
 * show how the domains above compose rather than listing them as a tag cloud.
 * Each node names technologies that appear in `DOMAINS`.
 */
export const STACK_FLOW = [
  { stage: "Client", tech: ["React", "Next.js", "TypeScript"], domain: "frontend" as const },
  { stage: "API", tech: ["Spring Boot", "Spring Security (JWT)"], domain: "backend" as const },
  { stage: "Events", tech: ["Kafka", "Microservices"], domain: "backend" as const },
  { stage: "Persistence", tech: ["Oracle", "MySQL", "PostgreSQL"], domain: "data" as const },
  { stage: "Verification", tech: ["JUnit", "Playwright", "Selenium"], domain: "quality" as const },
  { stage: "Delivery", tech: ["Docker", "Jenkins", "AWS"], domain: "cloud" as const },
];
