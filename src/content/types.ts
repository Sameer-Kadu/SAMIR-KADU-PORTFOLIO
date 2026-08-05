/**
 * Content model for the portfolio.
 *
 * Everything rendered on the site originates in `src/content/*`. Presentation
 * components never hard-code copy. Optional fields are genuinely optional —
 * sections render nothing rather than inventing filler when data is absent.
 */

export type Tech = {
  name: string;
  /** Path under /public/icons, when an icon exists for this technology. */
  icon?: string;
};

export type DomainId = "frontend" | "backend" | "data" | "quality" | "cloud";

export type Domain = {
  id: DomainId;
  /** Two-letter code used in the network diagram and technical rails. */
  code: string;
  label: string;
  /** One line describing what this domain means in practice for Samir. */
  summary: string;
  tech: Tech[];
  /** Other domains this one connects to in the engineering network. */
  links: DomainId[];
};

/** A single tier in a project's architecture diagram. */
export type ArchitectureLayer = {
  tier: string;
  /** What this tier is responsible for. */
  role: string;
  tech: string[];
};

export type CaseStudySection = {
  /** Rendered as `01 / PROBLEM` etc. Order in the array defines numbering. */
  title: string;
  body?: string;
  points?: string[];
};

export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  /** Where the project came from — e.g. course capstone, hackathon. */
  context: string;
  year: string;
  status: "live" | "archived";
  description: string;
  techStack: string[];
  image: string;
  githubLink?: string;
  demoLink?: string;
  category: "work" | "hackathon" | "personal";
  featured: boolean;
  /** Ordered narrative sections. Only sections with real content are listed. */
  caseStudy: CaseStudySection[];
  /** Omitted when the repository holds no architecture information. */
  architecture?: ArchitectureLayer[];
};

export type TimelineEntry = {
  type: "experience" | "education" | "certification";
  title: string;
  org: string;
  duration: string;
  badge?: string;
  description: string;
  highlights: string[];
  /** Technologies attached to this chapter, linking journey back to stack. */
  tech?: string[];
};

export type LabEntry = {
  name: string;
  icon: string;
  description: string;
};

export type NavModule = {
  id: string;
  index: string;
  label: string;
  /** Short monospace name used in the left rail. */
  code: string;
};
