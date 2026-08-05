import type { Project } from "./types";

/**
 * Project case studies.
 *
 * Case-study sections restate information that already exists in this
 * repository (descriptions, impact bullets, tech stacks, links). Where the
 * repository holds no information — challenges encountered, measured outcomes —
 * the section is simply absent. The UI renders whatever exists and nothing more.
 */
export const PROJECTS: Project[] = [
  {
    id: "go-bus",
    index: "01",
    title: "Go Bus",
    tagline: "Full-stack bus booking platform with multi-panel admin",
    context: "CDAC PG-DAC capstone",
    year: "2023",
    status: "live",
    description:
      "End-to-end bus ticket booking system with separate dashboards for Admins, Operators, and Passengers. Built with role-based JWT authentication, real-time seat availability, route management, and a feedback system.",
    techStack: ["React", "Spring Boot", "MySQL", "JWT Auth"],
    image: "/images/go-bus.png",
    githubLink: "https://github.com/Sameer-Kadu/Go_Bus.git",
    demoLink: "https://go-bus-oarm.vercel.app/",
    category: "work",
    featured: true,
    architecture: [
      {
        tier: "Client",
        role: "Three distinct dashboards — Admin, Operator and Passenger — rendered from one React application, each gated by the role encoded in the session token.",
        tech: ["React"],
      },
      {
        tier: "API",
        role: "Spring Boot REST layer. Authentication issues JWTs; every downstream route authorises against the role claim before touching booking or route data.",
        tech: ["Spring Boot", "JWT Auth"],
      },
      {
        tier: "Domain",
        role: "Booking, route management, seat availability and the customer feedback module — the rules that decide what each actor is allowed to see and change.",
        tech: ["Spring Boot"],
      },
      {
        tier: "Persistence",
        role: "MySQL holds routes, seat inventory, bookings and feedback records.",
        tech: ["MySQL"],
      },
    ],
    caseStudy: [
      {
        title: "Problem",
        body: "Bus ticketing involves three actors with genuinely different needs against the same data: administrators managing the platform, operators managing their routes and fleets, and passengers booking seats. A single undifferentiated interface serves none of them well.",
      },
      {
        title: "Approach",
        body: "Build one system with three role-scoped surfaces rather than three systems. Authentication decides which surface you get, and authorisation is enforced on the API rather than hidden in the UI.",
        points: [
          "Multi-role authentication with JWT — Admin, Operator, Passenger panels",
          "Real-time seat availability and dynamic route management",
          "Customer feedback module improving operator accountability",
        ],
      },
      {
        title: "Engineering decisions",
        points: [
          "Role-based JWT authentication so a single token carries both identity and permission scope",
          "Separate dashboards per actor instead of conditionally hiding controls in a shared view",
          "A feedback loop attached to operators, making service quality visible rather than anecdotal",
        ],
      },
      {
        title: "Outcome",
        body: "Delivered as the capstone for the CDAC PG-DAC programme. Source is public and a live deployment is available.",
      },
    ],
  },
  {
    id: "cultural-tourism-explorer",
    index: "02",
    title: "Cultural Tourism Explorer",
    tagline: "Hackathon winner — data-driven India tourism platform",
    context: "Snowflake × YourStory Hero Hackathon",
    year: "2023",
    status: "live",
    description:
      "Built in 48 hours for the Snowflake × YourStory Hero Hackathon. A data storytelling platform bridging art, culture, and tourism across India using interactive visualizations powered by Snowflake's data cloud.",
    techStack: ["Snowflake", "Streamlit", "Python", "Pandas"],
    image: "/images/tourism-hackathon.png",
    githubLink: "https://github.com/Sameer-Kadu/snowflake-hero-challenge.git",
    demoLink: "https://wanderwiseindia.streamlit.app/",
    category: "hackathon",
    featured: true,
    architecture: [
      {
        tier: "Client",
        role: "Streamlit application serving the interactive visualisations directly to the browser.",
        tech: ["Streamlit"],
      },
      {
        tier: "Processing",
        role: "Python and Pandas shape the cultural and tourism datasets into the views the narrative needs.",
        tech: ["Python", "Pandas"],
      },
      {
        tier: "Data cloud",
        role: "Snowflake as the backing data platform for the datasets behind the visualisations.",
        tech: ["Snowflake"],
      },
    ],
    caseStudy: [
      {
        title: "Problem",
        body: "India's art, culture and tourism data exists, but disconnected from any narrative — hard for a traveller or a researcher to reason about as a whole.",
      },
      {
        title: "Approach",
        body: "Treat it as data storytelling rather than a dashboard: interactive visualisations that connect cultural context to destinations, assembled end to end inside a 48-hour hackathon window.",
        points: [
          "Built end-to-end in 48 hours for a national-level hackathon",
          "Interactive visualizations across 28+ Indian cultural destinations",
          "Snowflake data cloud integration for real-time insights",
        ],
      },
      {
        title: "Engineering decisions",
        points: [
          "Streamlit for the interface — the shortest path from a Pandas dataframe to an interactive view under time pressure",
          "Snowflake as the data layer so the visualisations query a real cloud warehouse rather than bundled fixtures",
        ],
      },
      {
        title: "Outcome",
        body: "Recorded in this portfolio as a hackathon win. Source is public and the application is deployed on Streamlit Community Cloud.",
      },
    ],
  },
];

export const PROJECT_CATEGORIES = {
  work: "Professional",
  hackathon: "Hackathon",
  personal: "Personal",
} as const;
