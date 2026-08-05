import type { NavModule } from "./types";

export const SITE = {
  name: "Samir Kadu",
  role: "Full Stack Engineer",
  url: "https://www.samirkadu.com",
  title: "Samir Kadu — Full Stack Engineer",
  description:
    "Full Stack Engineer & QA Automation specialist with 3+ years building scalable health-tech platforms at Bajaj Finserv Health. React, Next.js, TypeScript, Node.js, AWS.",
  shortDescription:
    "3+ years building scalable health-tech platforms. React · Next.js · TypeScript · AWS.",
  keywords: [
    "Samir Kadu",
    "Full Stack Engineer",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "AWS",
    "QA Automation",
    "Bajaj Finserv Health",
    "portfolio",
  ],
  ogImage: "/og-image.jpg",
  resume: "/Samir_Kadu_Resume.pdf",
  location: "Nagpur, Maharashtra, India",
} as const;

export const SOCIAL = {
  email: "samirkadu8@gmail.com",
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
