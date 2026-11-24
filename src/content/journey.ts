import type { TimelineEntry } from "./types";

/**
 * The engineering journey, from Sameer's resume. `tech` links each chapter back
 * to the Stack module.
 */
export const JOURNEY: TimelineEntry[] = [
  {
    type: "experience",
    title: "Associate Software Development Engineer",
    org: "Bajaj Finserv Health Limited, Pune",
    duration: "Mar 2025 – Present",
    badge: "Current",
    description:
      "Back-end and full-stack engineering for health insurance claims and pre-authorization systems, in the healthcare and health insurance domain.",
    highlights: [
      "Built back-end logic in Java and Spring Boot and Kafka event workflows for claims and pre-authorization on the Universal Provider Portal (UPP) and the Vidal Health Care portal",
      "Automated claims and pre-authorization workflows for insurance partners including TATA AIG and Wipro",
      "Built processing workflows for the Kerala MEDISEP project, supporting large-scale state healthcare operations",
      "Developed Java and Oracle validation for REST APIs and Kafka event flows, catching data inconsistencies before release",
      "Debugged and resolved production issues across microservices as part of production monitoring (Prod-Mon) support",
      "Wrote JUnit tests and integrated Selenium and Playwright UI/API suites into Jenkins and GitHub Actions CI/CD pipelines",
      "Received the Sharp Shark Award for partner integrations, critical escalations and go-lives of Onsurity, ADME and GoCover",
      "Al Koot Insurance, Qatar (service engagement): worked on a motor insurance platform built on Volaris One — product setup, underwriting, quotation, policy issuance, endorsements, claims and finance — analysing business rules end to end with the Java/Spring developers in an AI-assisted (Claude) delivery workflow",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Kafka",
      "Oracle",
      "PL/SQL",
      "PostgreSQL",
      "React",
      "JUnit",
      "Jenkins",
      "GitHub Actions",
      "AWS",
      "Azure",
    ],
  },
  {
    type: "award",
    title: "Winner, Snowflake × YourStory Hero Challenge",
    org: "Snowflake × YourStory",
    duration: "2025",
    badge: "$2,500 prize",
    description:
      "Won a $2,500 prize for technical innovation as lead developer of the Art, Culture and Tourism Explorer.",
    highlights: [
      "Data-driven exploration platform built on Snowflake, SQL, Python and Streamlit",
    ],
    tech: ["Snowflake", "SQL", "Python"],
  },
  {
    type: "education",
    title: "PG-DAC, Post Graduate Diploma in Advanced Computing",
    org: "SunBeam Institute of Information Technology, Pune (CDAC)",
    duration: "2024 – 2025",
    badge: "74.13%",
    description:
      "CDAC's post-graduate programme in advanced computing, covering full-stack development, databases and core computer science.",
    highlights: [
      "Lead developer of GoBus, a full-stack bus ticket booking platform",
      "Gold medal — top of the Database Technology module",
    ],
    tech: ["Java", "Spring Boot", "React", "MySQL"],
  },
  {
    type: "education",
    title: "B.Tech in Electrical Engineering",
    org: "Government College of Engineering, Nagpur",
    duration: "2020 – 2024",
    badge: "82.3%",
    description: "Undergraduate degree in Electrical Engineering.",
    highlights: [],
  },
];
