import type { Project } from "./types";

/**
 * Project case studies, from the Projects section of Sameer's resume, with the
 * earlier architecture and case-study notes kept where they still hold.
 * Where there is no information — measured outcomes, screenshots — the section
 * or field is simply absent. The UI renders whatever exists and nothing more.
 */
export const PROJECTS: Project[] = [
  {
    id: "go-bus",
    index: "01",
    title: "GoBus",
    tagline: "Online bus ticket booking platform for travelers, operators and admins",
    context: "Full stack · lead developer",
    year: "2025",
    status: "live",
    description:
      "A React single-page app on a Spring Boot REST back end, with role-based flows for travelers, bus operators and admins: search, seat booking with email confirmation, cancellations, booking history, and operator and bus approvals.",
    techStack: [
      "Java 17",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "JPA/Hibernate",
      "MySQL",
      "React",
      "Tailwind CSS",
      "Docker",
      "Nginx",
      "AWS",
    ],
    image: "/images/go-bus.png",
    githubLink: "https://github.com/Sameer-Kadu/Go_Bus",
    demoLink: "https://go-bus-oarm.vercel.app/",
    category: "personal",
    featured: true,
    architecture: [
      {
        tier: "Client",
        role: "One React single-page app serving travelers, bus operators and admins, each gated by the role encoded in the session token.",
        tech: ["React", "Tailwind CSS"],
      },
      {
        tier: "Edge",
        role: "Nginx reverse proxy in front of the Dockerised API on AWS EC2; the front end is also deployed on Vercel.",
        tech: ["Nginx", "Docker", "AWS"],
      },
      {
        tier: "API",
        role: "Spring Boot REST layer secured with Spring Security and JWT; every route authorises against the role claim before touching booking or route data.",
        tech: ["Spring Boot", "Spring Security", "JWT"],
      },
      {
        tier: "Persistence",
        role: "JPA/Hibernate over MySQL on AWS RDS for routes, buses, seat inventory and bookings.",
        tech: ["JPA/Hibernate", "MySQL"],
      },
    ],
    caseStudy: [
      {
        title: "Problem",
        body: "Bus ticketing involves three actors with genuinely different needs against the same data: admins managing the platform, operators managing their buses and routes, and travelers booking seats. A single undifferentiated interface serves none of them well.",
      },
      {
        title: "Approach",
        body: "Build one system with role-scoped flows rather than three systems. Authentication decides which flow you get, and authorisation is enforced on the API rather than hidden in the UI.",
        points: [
          "Travelers: search, seat booking with email confirmation, cancellations and booking history",
          "Operators: manage buses and routes, subject to admin approval",
          "Admins: approve operators and buses",
        ],
      },
      {
        title: "Engineering decisions",
        points: [
          "Spring Security with JWT so a single token carries both identity and permission scope",
          "Docker and an Nginx reverse proxy on AWS EC2/RDS for a production-shaped deployment",
          "Selenium end-to-end tests and JUnit tests running in a Jenkins and GitHub Actions pipeline",
        ],
      },
      {
        title: "Outcome",
        body: "Built as lead developer. Source is public and a live deployment is available.",
      },
    ],
  },
  {
    id: "cultural-tourism-explorer",
    index: "02",
    title: "Art, Culture and Tourism Explorer",
    tagline: "Snowflake × YourStory Hero Challenge 2025 — $2,500 prize winner",
    context: "Snowflake hackathon · lead developer",
    year: "2025",
    status: "live",
    description:
      "A data-driven exploration platform bridging art, culture and tourism across India, with interactive visualisations built on Snowflake, SQL, Python and Streamlit. Won a $2,500 prize for technical innovation.",
    techStack: ["Snowflake", "SQL", "Python", "Streamlit", "Pandas"],
    image: "/images/tourism-hackathon.png",
    githubLink: "https://github.com/Sameer-Kadu/snowflake-hero-challenge",
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
        role: "Snowflake, queried with SQL, as the backing data platform for the datasets behind the visualisations.",
        tech: ["Snowflake", "SQL"],
      },
    ],
    caseStudy: [
      {
        title: "Problem",
        body: "India's art, culture and tourism data exists, but disconnected from any narrative — hard for a traveller or a researcher to reason about as a whole.",
      },
      {
        title: "Approach",
        body: "Treat it as data storytelling rather than a dashboard: interactive visualisations that connect cultural context to destinations.",
        points: [
          "Interactive visualizations across Indian cultural destinations",
          "Snowflake data cloud integration, queried with SQL",
        ],
      },
      {
        title: "Engineering decisions",
        points: [
          "Streamlit for the interface — the shortest path from a Pandas dataframe to an interactive view under hackathon time pressure",
          "Snowflake as the data layer so the visualisations query a real cloud warehouse rather than bundled fixtures",
        ],
      },
      {
        title: "Outcome",
        body: "Won a $2,500 prize for technical innovation in the Snowflake × YourStory Hero Challenge 2025. Source is public and the application is deployed on Streamlit Community Cloud.",
      },
    ],
  },
  {
    id: "build-your-resume",
    index: "03",
    title: "Build Your Resume",
    tagline: "Resume builder with live preview, PDF export and ATS scoring",
    context: "Web app · sole developer",
    year: "2025",
    // No public deployment is listed, so no "deployed" badge.
    status: "archived",
    description:
      "A resume builder written in TypeScript with Next.js and React: step-by-step forms, a live preview, PDF export and an ATS scoring utility. Google Sign-In and the Google Drive REST API keep each user's data in their own Drive, with no back end.",
    techStack: ["TypeScript", "Next.js", "React", "Google Sign-In", "Google Drive API"],
    githubLink: "https://github.com/Sameer-Kadu/Build-Your-Resume",
    category: "personal",
    featured: true,
    architecture: [
      {
        tier: "Client",
        role: "Next.js and React app with step-by-step forms, a live preview, PDF export and an ATS scoring utility.",
        tech: ["Next.js", "React", "TypeScript"],
      },
      {
        tier: "Identity",
        role: "Google Sign-In authenticates the user and authorises access to their own Google Drive.",
        tech: ["Google Sign-In"],
      },
      {
        tier: "Storage",
        role: "Each user's resume data is stored in their own Google Drive through the Drive REST API — there is no application back end.",
        tech: ["Google Drive API"],
      },
    ],
    caseStudy: [
      {
        title: "Approach",
        body: "A guided, step-by-step builder with a live preview, so the resume is always visible while it is being written.",
        points: [
          "Step-by-step forms with live preview",
          "PDF export",
          "ATS scoring utility",
        ],
      },
      {
        title: "Engineering decisions",
        points: [
          "No back end: Google Sign-In plus the Google Drive REST API store each user's data in their own Drive",
          "TypeScript throughout, on Next.js and React",
        ],
      },
    ],
  },
];

export const PROJECT_CATEGORIES = {
  work: "Professional",
  hackathon: "Hackathon",
  personal: "Personal",
} as const;
