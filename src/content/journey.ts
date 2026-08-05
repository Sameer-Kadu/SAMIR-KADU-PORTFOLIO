import type { TimelineEntry } from "./types";

/**
 * The engineering journey. Content is preserved verbatim from the original
 * repository data; `tech` links each chapter back to the Stack module.
 */
export const JOURNEY: TimelineEntry[] = [
  {
    type: "experience",
    title: "Software Engineer",
    org: "Bajaj Finserv Health",
    duration: "Jan 2023 – Present",
    badge: "Current",
    description:
      "Engineering critical features for one of India's leading digital health platforms. Own full-cycle delivery — requirements to production — across frontend, backend, and QA automation.",
    highlights: [
      "Built patient-facing features for a platform serving millions of users",
      "Designed automated test suites with Selenium & Playwright, reducing regression testing time by 60%+",
      "Contributed to microservices architecture improvements for better system scalability",
      "Collaborated cross-functionally with product, design, and QA teams in Agile sprints",
    ],
    tech: ["React", "Selenium", "Playwright", "Jira"],
  },
  {
    type: "certification",
    title: "AWS Certified Solutions Architect – Associate",
    org: "Amazon Web Services",
    duration: "May 2023",
    badge: "SAA-C03",
    description:
      "Demonstrated expertise in designing distributed, highly available, and fault-tolerant systems on AWS.",
    highlights: [
      "Cloud architecture: EC2, S3, RDS, Lambda, VPC, IAM",
      "High availability and disaster recovery design patterns",
      "Cost optimization and AWS Well-Architected Framework",
    ],
    tech: ["AWS"],
  },
  {
    type: "education",
    title: "Post Graduate Diploma in Advanced Computing",
    org: "CDAC (Centre for Development of Advanced Computing)",
    duration: "Aug 2022 – Jan 2023",
    badge: "PG-DAC",
    description:
      "Intensive 6-month program covering the full spectrum of software engineering — from data structures and algorithms to full-stack development, databases, and system design.",
    highlights: [
      "Full-stack web development: Java, React, Spring Boot, MySQL",
      "Core CS fundamentals: DSA, OS, DBMS, Computer Networks",
      "Graduated with a project-focused capstone (Go Bus platform)",
    ],
    tech: ["Java", "React", "SQL"],
  },
];
