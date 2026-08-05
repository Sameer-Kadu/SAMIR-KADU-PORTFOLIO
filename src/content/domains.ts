import type { Domain } from "./types";

/**
 * Engineering domains.
 *
 * Every technology listed here appears in the original skills data. Domains
 * exist only where there is real depth behind them — there is deliberately no
 * "AI/ML" or "Architecture" domain, because the repository records those as
 * interests and a certification rather than a working skill set.
 */
export const DOMAINS: Domain[] = [
  {
    id: "frontend",
    code: "FE",
    label: "Frontend",
    summary: "Interfaces built with a component system, typed end to end.",
    links: ["backend", "quality"],
    tech: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "JavaScript", icon: "/icons/javascript.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
      { name: "HTML5", icon: "/icons/html5.svg" },
      { name: "CSS3", icon: "/icons/css3.svg" },
      { name: "Bootstrap", icon: "/icons/bootstrap.svg" },
    ],
  },
  {
    id: "backend",
    code: "BE",
    label: "Backend",
    summary: "Services and APIs across the Node, Python and Java ecosystems.",
    links: ["frontend", "data", "cloud"],
    tech: [
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "Express.js", icon: "/icons/express.svg" },
      { name: "Python", icon: "/icons/python.svg" },
      { name: "Django", icon: "/icons/django.svg" },
      { name: "Flask", icon: "/icons/flask.svg" },
      { name: "Java", icon: "/icons/java.svg" },
    ],
  },
  {
    id: "data",
    code: "DB",
    label: "Data",
    summary: "Relational and document persistence behind the services.",
    links: ["backend", "cloud"],
    tech: [
      { name: "SQL", icon: "/icons/sql.svg" },
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
    ],
  },
  {
    id: "quality",
    code: "QA",
    label: "Quality",
    summary: "Automated regression coverage and the tooling around it.",
    links: ["frontend", "cloud"],
    tech: [
      { name: "Selenium", icon: "/icons/selenium.svg" },
      { name: "Playwright", icon: "/icons/playwright.svg" },
      { name: "Cypress", icon: "/icons/cypress.svg" },
      { name: "TestRail", icon: "/icons/testrail.svg" },
      { name: "Jira", icon: "/icons/jira.svg" },
    ],
  },
  {
    id: "cloud",
    code: "OPS",
    label: "Cloud & DevOps",
    summary: "Packaging, pipelines and AWS infrastructure.",
    links: ["backend", "data", "quality"],
    tech: [
      { name: "AWS", icon: "/icons/aws.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
      { name: "Jenkins", icon: "/icons/jenkins.svg" },
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
  { stage: "API", tech: ["Node.js", "Express.js"], domain: "backend" as const },
  { stage: "Services", tech: ["Python", "Java"], domain: "backend" as const },
  { stage: "Persistence", tech: ["SQL", "MongoDB"], domain: "data" as const },
  { stage: "Verification", tech: ["Playwright", "Selenium"], domain: "quality" as const },
  { stage: "Delivery", tech: ["Docker", "Jenkins", "AWS"], domain: "cloud" as const },
];
