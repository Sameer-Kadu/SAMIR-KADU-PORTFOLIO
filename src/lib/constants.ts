export const SITE_METADATA = {
  title: "Samir Kadu - Professional Portfolio",
  description: "Samir Kadu's professional portfolio showcasing his skills, projects, and experience in software development.",
  author: "Samir Kadu",
  keywords: "Samir Kadu, portfolio, developer, software engineer, web developer, frontend, backend, QA automation, DevOps, Next.js, React, Tailwind CSS, Framer Motion",
  url: "https://www.samirkadu.com", // Replace with actual domain
  image: "/og-image.jpg", // Replace with actual OG image
};

export const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Interests", href: "#interests" },
  { name: "Contact", href: "#contact" },
];

export const HERO_SECTION = {
  name: "Samir Kadu",
  tagline: "Full Stack Developer | QA Automation Engineer",
  introText: "Passionate about crafting innovative solutions and building seamless user experiences.",
  avatar: "/images/samir-avatar.png", // Placeholder
  ctaButtons: [
    { text: "Download Resume", link: "/Samir_Kadu_Resume.pdf", type: "download" },
    { text: "Let's Connect", link: "#contact", type: "scroll" },
  ],
};

export const ABOUT_ME = {
  title: "About Me",
  story: "Hello! I'm Samir Kadu, a passionate and dedicated software engineer with a knack for building robust and scalable applications. My journey in tech began with a fascination for how things work, leading me to explore various domains from frontend development to QA automation and DevOps. I thrive on solving complex problems and continuously learning new technologies to deliver high-quality solutions.",
  goals: "My goal is to leverage my skills to create impactful software that not only meets user needs but also pushes the boundaries of innovation. I am always eager to collaborate on challenging projects and contribute to a team that values creativity and excellence.",
  passion: "Beyond coding, I am deeply passionate about understanding emerging technologies like AI and ML, and exploring their potential to transform industries. I also enjoy delving into the world of trading and understanding market dynamics.",
};

export const SKILLS = {
  title: "Skills & Knowledge",
  frontend: [
    { name: "React", icon: "/icons/react.svg" },
    { name: "Next.js", icon: "/icons/nextjs.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "JavaScript", icon: "/icons/javascript.svg" },
    { name: "HTML5", icon: "/icons/html5.svg" },
    { name: "CSS3", icon: "/icons/css3.svg" },
    { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
    { name: "Bootstrap", icon: "/icons/bootstrap.svg" },
  ],
  backend: [
    { name: "Node.js", icon: "/icons/nodejs.svg" },
    { name: "Express.js", icon: "/icons/express.svg" },
    { name: "Python", icon: "/icons/python.svg" },
    { name: "Django", icon: "/icons/django.svg" },
    { name: "Flask", icon: "/icons/flask.svg" },
    { name: "SQL", icon: "/icons/sql.svg" },
    { name: "MongoDB", icon: "/icons/mongodb.svg" },
  ],
  qaAutomation: [
    { name: "Selenium", icon: "/icons/selenium.svg" },
    { name: "Cypress", icon: "/icons/cypress.svg" },
    { name: "Playwright", icon: "/icons/playwright.svg" },
    { name: "Jira", icon: "/icons/jira.svg" },
    { name: "TestRail", icon: "/icons/testrail.svg" },
  ],
  devops: [
    { name: "Docker", icon: "/icons/docker.svg" },
    { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
    { name: "AWS", icon: "/icons/aws.svg" },
    { name: "Git", icon: "/icons/git.svg" },
    { name: "Jenkins", icon: "/icons/jenkins.svg" },
  ],
};

export const PROJECTS = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A web application for managing tasks and projects.",
    techStack: ["Next.js", "Tailwind CSS", "MongoDB"],
    image: "/images/project-alpha.jpg", // Placeholder
    githubLink: "https://github.com/samirkadu/project-alpha",
    demoLink: "https://project-alpha.vercel.app",
    category: "work",
  },
  {
    id: 2,
    title: "Project Beta",
    description: "An e-commerce platform with a seamless checkout experience.",
    techStack: ["React", "Node.js", "Express.js", "PostgreSQL"],
    image: "/images/project-beta.jpg", // Placeholder
    githubLink: "https://github.com/samirkadu/project-beta",
    demoLink: "https://project-beta.netlify.app",
    category: "personal",
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "A real-time chat application with user authentication.",
    techStack: ["Next.js", "Firebase", "TypeScript"],
    image: "/images/project-gamma.jpg", // Placeholder
    githubLink: "https://github.com/samirkadu/project-gamma",
    demoLink: "https://project-gamma.vercel.app",
    category: "hackathon",
  },
];


export const EXPERIENCE_EDUCATION = {
  title: "Experience & Education",
  timeline: [
    {
      type: "experience",
      title: "Software Engineer",
      company: "Bajaj Finserv Health",
      duration: "Jan 2023 - Present",
      description:
        "Developed and maintained various features for their health tech platform, focusing on performance and scalability.",
      icon: "💼", // ✅ added
    },
    {
      type: "education",
      title: "Post Graduate Diploma in Advanced Computing (PG-DAC)",
      institution: "CDAC",
      duration: "Aug 2022 - Jan 2023",
      description:
        "Completed an intensive program covering full-stack development, data structures, and algorithms.",
      icon: "🎓", // ✅ added
    },
    {
      type: "certification",
      title: "AWS Certified Solutions Architect – Associate",
      institution: "Amazon Web Services (AWS)",
      duration: "May 2023",
      description: "Certified in designing distributed systems on AWS.",
      icon: "📜", // ✅ added
    },
  ],
};


export const INTERESTS_HOBBIES = {
  title: "Interests & Hobbies",
  items: [
  {
    name: "Trading",
    icon: "/icons/trading.svg",
    description: "Passionate about financial markets and algorithmic trading. I explore patterns, backtest strategies, and build trading systems to stay ahead in the game."
  },
  {
    name: "Startups",
    icon: "/icons/startup.svg",
    description: "Inspired by innovation and solving real-world problems, I love brainstorming startup ideas and turning tech concepts into scalable solutions."
  },
  {
    name: "Artificial Intelligence",
    icon: "/icons/ai.svg",
    description: "AI fascinates me — from neural networks to intelligent automation. I enjoy learning how machines think and apply that to building smarter applications."
  },
  {
    name: "Machine Learning",
    icon: "/icons/ml.svg",
    description: "Exploring ML algorithms, data models, and their practical applications excites me. I often experiment with real-world datasets to deepen my understanding."
  },
  {
    name: "Reading",
    icon: "/icons/reading.svg",
    description: "I enjoy reading non-fiction, especially tech blogs, startup stories, and books on personal growth and decision-making."
  },
  {
    name: "Traveling",
    icon: "/icons/travel.svg",
    description: "Traveling helps me recharge and gain new perspectives. I find inspiration in different cultures, landscapes, and stories from around the world."
  }
]

};

export const CONTACT_ME = {
  title: "Get in Touch",
  description: "Have a question or want to work together? Feel free to reach out!",
  email: "samir.kadu@example.com", // Replace with actual email
  linkedin: "https://www.linkedin.com/in/samirkadu", // Replace with actual LinkedIn
  github: "https://github.com/samirkadu", // Replace with actual GitHub
};

export const FOOTER_TEXT = "© 2024 Samir Kadu. All rights reserved.";
