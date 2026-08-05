import type { LabEntry } from "./types";

/**
 * The Lab — current curiosity, split by whether it is a technical pursuit or a
 * personal one. Copy is preserved from the original repository content.
 */

export const LAB_TECHNICAL: LabEntry[] = [
  {
    name: "Artificial Intelligence",
    icon: "/icons/ai.svg",
    description:
      "Fascinated by how machines learn and reason. I follow AI research closely and enjoy experimenting with LLMs, embeddings, and intelligent automation.",
  },
  {
    name: "Machine Learning",
    icon: "/icons/ml.svg",
    description:
      "I enjoy working with real-world datasets — training models, analyzing features, and applying ML to solve practical problems.",
  },
  {
    name: "Algorithmic Trading",
    icon: "/icons/trading.svg",
    description:
      "I explore quantitative trading strategies — backtesting systems, studying market microstructure, and building data-driven models to understand price behavior.",
  },
];

export const LAB_PERSONAL: LabEntry[] = [
  {
    name: "Startups",
    icon: "/icons/startup.svg",
    description:
      "Passionate about how zero-to-one products are built. I follow startup ecosystems, study business models, and love the challenge of turning a technical idea into a real product.",
  },
  {
    name: "Reading",
    icon: "/icons/reading.svg",
    description:
      "Non-fiction: engineering, startups, psychology of decision-making. Favorite reads include The Lean Startup, Zero to One, and Thinking, Fast and Slow.",
  },
  {
    name: "Traveling",
    icon: "/icons/travel.svg",
    description:
      "New places sharpen my perspective. I find that exploring different cultures makes me a better product thinker and problem solver.",
  },
];
