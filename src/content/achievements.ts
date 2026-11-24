import { JOURNEY } from "./journey";
import { PROJECTS } from "./projects";

export type Achievement = {
  id: string;
  label: string;
  title: string;
  detail: string;
  year: string;
};

/**
 * Achievements are *derived*, never authored separately — every entry below is
 * pulled from an existing journey chapter or project record so the two views
 * can never drift apart, and so nothing here is a claim the portfolio does not
 * already make elsewhere.
 */
export const ACHIEVEMENTS: Achievement[] = [
  ...JOURNEY.filter((entry) => entry.type === "award").map((entry, i) => ({
    id: `award-${i}`,
    label: entry.badge ?? "award",
    title: entry.title,
    detail: entry.description,
    year: entry.duration,
  })),

  ...JOURNEY.filter((entry) => entry.type === "education" && entry.highlights.length > 0).map(
    (entry, i) => ({
      id: `education-${i}`,
      label: entry.badge ?? "education",
      title: entry.title,
      detail: entry.highlights[entry.highlights.length - 1],
      year: entry.duration,
    })
  ),

  ...PROJECTS.filter((p) => p.category === "hackathon").map((p) => ({
    id: `hackathon-${p.id}`,
    label: "hackathon",
    title: p.title,
    detail: p.tagline,
    year: p.year,
  })),
];
