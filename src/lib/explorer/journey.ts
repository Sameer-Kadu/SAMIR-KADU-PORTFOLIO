/**
 * Explorer View journey model.
 *
 * The phase machine drives every scene, HUD and camera decision, and the
 * destination table is the single place where "a place in the world" is mapped
 * onto "a section of the portfolio".
 */

export type Phase =
  | "loading"
  | "warp"
  | "cockpit"
  | "arming"
  | "approach"
  | "entry"
  | "clouds"
  | "landing"
  | "world";

/** Ordered so the HUD can show progress without hard-coding indices. */
export const PHASE_ORDER: Phase[] = [
  "loading",
  "warp",
  "cockpit",
  "arming",
  "approach",
  "entry",
  "clouds",
  "landing",
  "world",
];

/**
 * Wall-clock duration of each cinematic phase, in seconds.
 *
 * `warp` is the arrival beat — the experience opens already in motion and
 * decelerates, rather than fading up on a static shot. `arming` is the
 * anticipation beat after the visitor commits: the ship settles and locks on
 * for a moment before the thrust, so the launch has a windup.
 */
export const PHASE_DURATION: Partial<Record<Phase, number>> = {
  warp: 3.4,
  arming: 1.1,
  approach: 5.0,
  entry: 3.2,
  clouds: 2.6,
  landing: 2.0,
};

export type DestinationId =
  | "origin"
  | "career"
  | "projects"
  | "tech"
  | "vault"
  | "uplink";

export type Destination = {
  id: DestinationId;
  index: string;
  /** Name of the place in the world. */
  name: string;
  /** What it corresponds to in Engineer View. */
  section: string;
  tagline: string;
  /** Position on the outpost plateau: [x, y, z]. */
  position: [number, number, number];
  /** Structure archetype the renderer builds for this destination. */
  form: "monolith" | "path" | "lab" | "core" | "vault" | "tower";
  /** Matching module id in Engineer View, for cross-view navigation. */
  moduleId: string;
};

/**
 * Six destinations on a 34-unit arc spanning ±75° in front of the landing pad.
 *
 * Everything sits ahead of the arrival camera, so nothing looms between the
 * viewer and the outpost, and the chapters read left-to-right in journey order.
 */
export const DESTINATIONS: Destination[] = [
  {
    id: "origin",
    index: "01",
    name: "Origin Station",
    section: "Profile",
    tagline: "Where the engineering started",
    position: [-22.5, 0, -13.0],
    form: "monolith",
    moduleId: "profile",
  },
  {
    id: "career",
    index: "02",
    name: "Career Path",
    section: "Journey",
    tagline: "Formal grounding, then production ownership",
    position: [-15.3, 0, -21.0],
    form: "path",
    moduleId: "journey",
  },
  {
    id: "projects",
    index: "03",
    name: "Project Lab",
    section: "Work",
    tagline: "Systems designed, built and deployed",
    position: [-5.4, 0, -25.4],
    form: "lab",
    moduleId: "work",
  },
  {
    id: "tech",
    index: "04",
    name: "Tech Core",
    section: "Stack",
    tagline: "The stack, in the order a request meets it",
    position: [5.4, 0, -25.4],
    form: "core",
    moduleId: "stack",
  },
  {
    id: "vault",
    index: "05",
    name: "Achievement Vault",
    section: "Milestones",
    tagline: "Certification, capstone and a hackathon win",
    position: [15.3, 0, -21.0],
    form: "vault",
    moduleId: "journey",
  },
  {
    id: "uplink",
    index: "06",
    name: "Communication Tower",
    section: "Contact",
    tagline: "Establish a connection",
    position: [22.5, 0, -13.0],
    form: "tower",
    moduleId: "contact",
  },
];

export const DESTINATION_BY_ID = Object.fromEntries(
  DESTINATIONS.map((d) => [d.id, d])
) as Record<DestinationId, Destination>;

/** Where the camera rests after landing, before the visitor picks a place. */
export const LANDING_CAMERA = {
  position: [0, 8, 26] as [number, number, number],
  target: [0, 4.5, -16] as [number, number, number],
};

/**
 * Camera framing for a destination.
 *
 * Stands off along the vector from the plateau centre out to the structure, so
 * every destination is approached head-on from the middle of the outpost rather
 * than from a fixed compass direction.
 */
export function destinationCamera(d: Destination) {
  const [x, , z] = d.position;
  const len = Math.hypot(x, z) || 1;
  const standoff = 27;
  return {
    position: [
      x - (x / len) * standoff,
      9.5,
      z - (z / len) * standoff,
    ] as [number, number, number],
    // Aimed above the base so tall structures — the monolith and the comms
    // tower both run past 12 units — stay inside the frame.
    target: [x, 7, z] as [number, number, number],
  };
}
