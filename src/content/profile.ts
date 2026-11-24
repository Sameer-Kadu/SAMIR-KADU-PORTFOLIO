/**
 * Identity and narrative content.
 *
 * Every claim below comes from Sameer's resume (Sameer_Kadu_Resume_SDE.pdf),
 * apart from the "exploring" chapter, which restates the interests in `lab.ts`.
 */

export const PROFILE = {
  name: "Sameer Kadu",
  headline: "Full Stack Software Engineer",
  /** Rotated under the headline. */
  disciplines: [
    "Full Stack Software Engineer",
    "Java & Spring Boot Developer",
    "Microservices & Kafka Engineer",
  ],
  availability: "Open to new opportunities",
  currentRole: {
    title: "Associate Software Development Engineer",
    company: "Bajaj Finserv Health",
    since: "Mar 2025",
    type: "Full-time",
  },
  location: "Pune, India",
  intro:
    "Software engineer at Bajaj Finserv Health, building Java and Spring Boot microservices and Kafka workflows for health insurance claims and pre-authorization systems used by insurers such as TATA AIG and Wipro.",
  bio: "I build back-end services in Java, Spring Boot and Kafka, and full-stack applications with React and TypeScript, deployed with Docker, Nginx and AWS. I bring a strong testing and production-debugging background to every release — from JUnit and Playwright suites in CI to resolving live issues across microservices.",
  coreStack: ["Java", "Spring Boot", "Kafka", "React", "TypeScript", "AWS"],
} as const;

/** Headline numbers. Each is stated on the resume. */
export const METRICS = [
  { value: "1.7", label: "Years experience", note: "at Bajaj Finserv Health" },
  { value: "$2.5K", label: "Hackathon prize", note: "Snowflake × YourStory 2025" },
  { value: "Gold", label: "Medal, CDAC", note: "Database Technology" },
  { value: "3", label: "Partner go-lives", note: "Onsurity, ADME, GoCover" },
] as const;

/** The award shown on the Profile card. */
export const HIGHLIGHT_AWARD = {
  label: "awarded",
  title: "Sharp Shark Award",
  detail: "Bajaj Finserv Health · partner go-lives",
} as const;

/**
 * The About narrative, told as an engineering arc rather than a wall of text.
 * Every chapter maps to a fact recorded in `journey.ts`, `projects.ts` or `lab.ts`.
 */
export const STORY = [
  {
    key: "who",
    label: "Who I am",
    heading: "A full stack engineer who treats testing as part of the build.",
    body: "Associate Software Development Engineer at Bajaj Finserv Health in Pune since March 2025. I work on the Java and Spring Boot services behind health insurance claims and pre-authorization, and I own the testing and production debugging around them.",
  },
  {
    key: "foundation",
    label: "Where it started",
    heading: "Electrical engineering, then advanced computing.",
    body: "A B.Tech in Electrical Engineering from Government College of Engineering, Nagpur (82.3%), followed by the PG Diploma in Advanced Computing at SunBeam, Pune — where I topped the Database Technology module and earned the gold medal, and led the GoBus booking platform.",
  },
  {
    key: "build",
    label: "What I build",
    heading: "Claims and pre-authorization systems for insurers.",
    body: "Spring Boot and Kafka workflows on the Universal Provider Portal and the Vidal Health Care portal, automation for partners including TATA AIG and Wipro, and processing workflows for Kerala's MEDISEP state healthcare project. I've also worked on Al Koot Insurance's motor insurance platform in Qatar.",
  },
  {
    key: "explore",
    label: "What I'm exploring",
    heading: "AI, machine learning and quantitative systems.",
    body: "Outside work I experiment with LLMs and embeddings, train models on real-world datasets, and study market microstructure by building backtesting systems. My data-driven Snowflake hackathon project won a $2,500 prize in 2025.",
  },
  {
    key: "next",
    label: "Where I'm heading",
    heading: "Open to teams building things that have to stay up.",
    body: "I'm open to full-time software engineering roles — particularly back-end and full-stack work where reliability and engineering quality genuinely matter to the product.",
  },
] as const;

/** What Sameer brings to a team. */
export const PRINCIPLES = [
  "Java, Spring Boot and Kafka microservices in production",
  "Production debugging across services (Prod-Mon support)",
  "Automated testing wired into CI/CD — JUnit, Selenium, Playwright",
  "End-to-end ownership of partner integrations and go-lives",
] as const;
