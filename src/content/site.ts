import type { NavModule } from "./types";

export const SITE = {
  name: "Sameer Kadu",
  role: "Full Stack Software Engineer",
  url: "https://samir-kadu-portfolio.vercel.app",
  title: "Sameer Kadu — Full Stack Software Engineer",
  description:
    "Software engineer at Bajaj Finserv Health building Java, Spring Boot and Kafka microservices for health insurance claims and pre-authorization. Full stack with React and TypeScript; ships with Docker, Nginx and AWS.",
  shortDescription:
    "Java · Spring Boot · Kafka · Microservices · React. Building health-insurance claims systems at Bajaj Finserv Health.",
  keywords: [
    "Sameer Kadu",
    "Full Stack Engineer",
    "Software Engineer",
    "Java",
    "Spring Boot",
    "Kafka",
    "Microservices",
    "React",
    "TypeScript",
    "AWS",
    "Bajaj Finserv Health",
    "portfolio",
  ],
  resume: "/Sameer_Kadu_Resume.pdf",
  location: "Pune, Maharashtra, India",
} as const;

export const SOCIAL = {
  email: "sameervkadu@gmail.com",
  linkedin: "https://www.linkedin.com/in/sameer-kadu/",
  github: "https://github.com/Sameer-Kadu",
  githubHandle: "Sameer-Kadu",
  linkedinHandle: "sameer-kadu",
} as const;

/**
 * Site modules. The index doubles as the visual numbering in the left rail,
 * the nav, and the command palette — one source, three surfaces.
 */
export const MODULES: NavModule[] = [
  { id: "index", index: "00", label: "Index", code: "idx" },
  { id: "profile", index: "01", label: "Profile", code: "prf" },
  { id: "stack", index: "02", label: "Stack", code: "stk" },
  { id: "work", index: "03", label: "Work", code: "wrk" },
  { id: "journey", index: "04", label: "Journey", code: "jrn" },
  { id: "lab", index: "05", label: "Lab", code: "lab" },
  { id: "contact", index: "06", label: "Contact", code: "cnt" },
];

/** Lines shown during the initialization sequence. Kept deliberately short. */
export const BOOT_LINES = [
  "mounting workspace",
  "loading profile",
  "indexing projects",
  "mapping experience",
] as const;
