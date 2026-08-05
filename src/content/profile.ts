/**
 * Identity and narrative content.
 *
 * The "story" chapters below are a re-organisation of facts already present in
 * this repository (role, employer, CDAC programme, certification, stated
 * interests and availability). Nothing here introduces a new claim.
 */

export const PROFILE = {
  name: "Samir Kadu",
  headline: "Full Stack Engineer",
  /** Rotated under the headline — each is a role stated elsewhere in this repo. */
  disciplines: [
    "Full Stack Engineer",
    "QA Automation Specialist",
    "Cloud (AWS) Engineer",
  ],
  availability: "Open to new opportunities",
  currentRole: {
    title: "Software Engineer",
    company: "Bajaj Finserv Health",
    since: "Jan 2023",
    type: "Full-time",
  },
  location: "Nagpur, India",
  intro:
    "3+ years engineering scalable health-tech platforms at Bajaj Finserv Health. I build end-to-end products — from pixel-perfect UIs to robust backend APIs — with a strong focus on quality, performance, and test coverage.",
  bio: "I'm a Full Stack Engineer with a knack for building reliable, scalable software. At Bajaj Finserv Health I've contributed to features used by millions — from building responsive UIs to designing automated test suites that cut regression time significantly. I thrive at the intersection of engineering quality and product impact.",
  coreStack: ["React", "Next.js", "TypeScript", "Node.js", "AWS"],
} as const;

/** Headline numbers. Each is a claim already recorded in the repository. */
export const METRICS = [
  { value: "3+", label: "Years experience", note: "in production systems" },
  { value: "25+", label: "Projects shipped", note: "personal & professional" },
  { value: "15+", label: "Technologies", note: "across the full stack" },
  { value: "SAA", label: "AWS certified", note: "Solutions Architect" },
] as const;

/**
 * The About narrative, told as an engineering arc rather than a wall of text.
 * Every chapter maps to a fact recorded in `journey.ts` or `lab.ts`.
 */
export const STORY = [
  {
    key: "who",
    label: "Who I am",
    heading: "A full stack engineer who treats quality as part of the build.",
    body: "Software Engineer at Bajaj Finserv Health since January 2023, working out of Nagpur, India. I own delivery end to end — requirements through to production — across frontend, backend, and test automation.",
  },
  {
    key: "foundation",
    label: "Where it started",
    heading: "Formal grounding in computer science fundamentals.",
    body: "A six-month PG Diploma in Advanced Computing at CDAC took me through DSA, operating systems, DBMS and computer networks alongside full-stack development in Java, React, Spring Boot and MySQL. It ended with a capstone I still point to: the Go Bus platform.",
  },
  {
    key: "build",
    label: "What I build",
    heading: "Patient-facing product on a platform used at scale.",
    body: "Features for one of India's leading digital health platforms, automated regression suites in Selenium and Playwright, and contributions to microservices architecture improvements — shipped in cross-functional Agile teams with product, design and QA.",
  },
  {
    key: "explore",
    label: "What I'm exploring",
    heading: "Cloud architecture, AI and quantitative systems.",
    body: "AWS Certified Solutions Architect – Associate, with ongoing interest in distributed system design. Outside of work I experiment with LLMs and embeddings, and study market microstructure by building backtesting systems.",
  },
  {
    key: "next",
    label: "Where I'm heading",
    heading: "Open to teams building things that have to stay up.",
    body: "I'm open to full-time roles, freelance work and interesting collaborations — particularly where engineering quality genuinely matters to the product.",
  },
] as const;

/** What Samir brings to a team — verbatim from the existing repository copy. */
export const PRINCIPLES = [
  "Production systems at scale (millions of users)",
  "End-to-end ownership — design to deployment",
  "Automated testing that actually prevents bugs",
  "Clean code that teammates enjoy reading",
] as const;
