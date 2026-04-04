export const SITE_METADATA = {
  title: "Samir Kadu — Full Stack Engineer & QA Automation",
  description:
    "Samir Kadu is a Full Stack Engineer at Bajaj Finserv Health with 3+ years building scalable health-tech platforms using React, Node.js, and Spring Boot — with a QA automation mindset baked in.",
  author: "Samir Kadu",
  keywords:
    "Samir Kadu, Full Stack Developer, QA Automation Engineer, React, Next.js, Node.js, Spring Boot, TypeScript, Selenium, Cypress, Playwright, AWS, Docker, Kubernetes, Bajaj Finserv Health",
  url: "https://www.samirkadu.com",
  image: "/og-image.jpg",
};

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const HERO_SECTION = {
  name: "Samir Kadu",
  badge: "Open to Opportunities",
  headline: "I build software that works —",
  headlineAccent: "and prove it with tests.",
  roles: ["Full Stack Engineer", "QA Automation Engineer", "DevOps Practitioner"],
  tagline:
    "3+ years shipping production-ready features at Bajaj Finserv Health. I bridge the gap between development and quality — building fast, scalable apps and the test suites that keep them stable.",
  avatar: "/images/samir-avatar.png",
  ctaButtons: [
    { text: "View My Work", link: "#projects", type: "scroll" },
    { text: "Download Resume", link: "/Samir_Kadu_Resume.pdf", type: "download" },
  ],
  socialLinks: [
    { name: "GitHub", href: "https://github.com/Sameer-Kadu" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/sameer-kadu/" },
    { name: "Email", href: "mailto:samirkadu8@gmail.com" },
  ],
  stats: [
    { value: "3+", label: "Years Experience" },
    { value: "25+", label: "Projects Shipped" },
    { value: "AWS", label: "Certified" },
    { value: "2", label: "Domains Mastered" },
  ],
};

export const ABOUT_ME = {
  title: "About Me",
  headline: "The developer who ships — and tests.",
  bio: "I'm Samir Kadu, a Full Stack Engineer at Bajaj Finserv Health with over 3 years of experience building scalable health-tech platforms. My edge? I don't just build features — I write the automated tests that verify they work in production. This dual perspective means I write cleaner code, catch edge cases early, and deliver software teams can rely on.",
  coreValues: [
    { label: "Production Mindset", detail: "Code isn't done until it's tested and deployed reliably." },
    { label: "Full-Stack Depth", detail: "Comfortable across React frontends, Node/Spring backends, and CI/CD pipelines." },
    { label: "QA-First Thinking", detail: "I treat testability as a design constraint, not an afterthought." },
    { label: "Continuous Learning", detail: "AWS certified, exploring AI/ML integration in real-world products." },
  ],
  stats: [
    { value: "3+", label: "Years at Bajaj Finserv Health" },
    { value: "25+", label: "Features & Projects Shipped" },
    { value: "4", label: "Tech Domains" },
    { value: "AWS", label: "Certified Architect" },
  ],
};

export const SKILLS = {
  title: "Skills & Expertise",
  categories: [
    {
      name: "Frontend",
      tier: "Core",
      skills: [
        { name: "React", icon: "/icons/react.svg" },
        { name: "Next.js", icon: "/icons/nextjs.svg" },
        { name: "TypeScript", icon: "/icons/typescript.svg" },
        { name: "JavaScript", icon: "/icons/javascript.svg" },
        { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
        { name: "HTML5", icon: "/icons/html5.svg" },
        { name: "CSS3", icon: "/icons/css3.svg" },
        { name: "Bootstrap", icon: "/icons/bootstrap.svg" },
      ],
    },
    {
      name: "Backend",
      tier: "Core",
      skills: [
        { name: "Node.js", icon: "/icons/nodejs.svg" },
        { name: "Express.js", icon: "/icons/express.svg" },
        { name: "Spring Boot", icon: "/icons/java.svg" },
        { name: "Python", icon: "/icons/python.svg" },
        { name: "Django", icon: "/icons/django.svg" },
        { name: "MongoDB", icon: "/icons/mongodb.svg" },
        { name: "MySQL", icon: "/icons/sql.svg" },
        { name: "Flask", icon: "/icons/flask.svg" },
      ],
    },
    {
      name: "QA Automation",
      tier: "Specialist",
      skills: [
        { name: "Selenium", icon: "/icons/selenium.svg" },
        { name: "Cypress", icon: "/icons/cypress.svg" },
        { name: "Playwright", icon: "/icons/playwright.svg" },
        { name: "Jira", icon: "/icons/jira.svg" },
        { name: "TestRail", icon: "/icons/testrail.svg" },
      ],
    },
    {
      name: "DevOps & Cloud",
      tier: "Proficient",
      skills: [
        { name: "AWS", icon: "/icons/aws.svg" },
        { name: "Docker", icon: "/icons/docker.svg" },
        { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
        { name: "Git", icon: "/icons/git.svg" },
        { name: "Jenkins", icon: "/icons/jenkins.svg" },
      ],
    },
  ],
  // Legacy flat exports for any component still referencing them
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
    { name: "Java", icon: "/icons/java.svg" },
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
    title: "Go_Bus",
    subtitle: "Full-Stack Ticket Booking Platform",
    description:
      "A production-grade online bus ticket booking system with role-based access for Admins, Operators, and Passengers. Built with a React SPA frontend and Spring Boot REST API backend, secured with JWT authentication.",
    outcome:
      "Reduced booking friction with real-time seat availability and route filtering. Delivered a complete multi-role system with approval workflows end-to-end.",
    challenge: "Building a multi-tenant system where admins, operators, and users have completely different permissions and workflows — without tightly coupling the frontend.",
    techStack: ["React", "Spring Boot", "MySQL", "JWT Auth", "REST API"],
    image: "/images/go-bus.png",
    githubLink: "https://github.com/Sameer-Kadu/Go_Bus.git",
    demoLink: "https://go-bus-oarm.vercel.app/",
    category: "work",
  },
  {
    id: 2,
    title: "WanderWise India",
    subtitle: "Data-Driven Cultural Tourism Platform",
    description:
      "A storytelling platform built for the Snowflake | YourStory Hero Hackathon. Uses Snowflake's cloud data warehouse to power interactive visualizations of India's cultural and tourism data, surfacing regional trends and hidden gems.",
    outcome:
      "Selected for the Snowflake Hero Hackathon. Demonstrates ability to work with cloud data pipelines, Python data processing, and interactive dashboard design under a competition deadline.",
    challenge: "Translating raw cultural tourism datasets from Snowflake into an intuitive story-driven interface that non-technical users could explore and enjoy.",
    techStack: ["Snowflake", "Streamlit", "Python", "Pandas", "Data Viz"],
    image: "/images/tourism-hackathon.png",
    githubLink: "https://github.com/Sameer-Kadu/snowflake-hero-challenge.git",
    demoLink: "https://wanderwiseindia.streamlit.app/",
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
      duration: "Jan 2023 – Present",
      description:
        "Building and maintaining production features on a health-tech platform serving millions of users. Work spans React frontend development, Spring Boot microservices, and end-to-end QA automation with Selenium and Cypress. Key contributions include improving test coverage and contributing to CI/CD pipeline stability.",
      tags: ["React", "Spring Boot", "Selenium", "Cypress", "Jenkins"],
    },
    {
      type: "education",
      title: "PG Diploma in Advanced Computing (PG-DAC)",
      institution: "CDAC",
      duration: "Aug 2022 – Jan 2023",
      description:
        "Intensive 6-month program covering full-stack web development, data structures, algorithms, operating systems, and software engineering principles. Built multiple projects as part of coursework, culminating in a team capstone.",
      tags: ["Full Stack", "DSA", "Java", "DBMS"],
    },
    {
      type: "certification",
      title: "AWS Certified Solutions Architect – Associate",
      institution: "Amazon Web Services",
      duration: "May 2023",
      description:
        "Certified in designing highly available, cost-efficient, fault-tolerant distributed systems on AWS. Covers EC2, S3, RDS, Lambda, VPC, IAM, and architectural best practices for cloud-native applications.",
      tags: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda"],
    },
  ],
};

export const INTERESTS_HOBBIES = {
  title: "Beyond the Code",
  items: [
    {
      name: "Algorithmic Trading",
      icon: "/icons/trading.svg",
      description:
        "I explore quant finance — backtesting strategies, building trading bots, and applying data-driven thinking to financial markets. A natural extension of my engineering mindset.",
    },
    {
      name: "Building Startups",
      icon: "/icons/startup.svg",
      description:
        "Fascinated by the intersection of technology and business. I prototype ideas, study product-market fit, and think about how software can solve real user problems at scale.",
    },
    {
      name: "AI & Machine Learning",
      icon: "/icons/ai.svg",
      description:
        "Actively learning how to integrate LLMs and ML models into real applications. Experimenting with prompt engineering, fine-tuning, and AI-assisted developer tools.",
    },
    {
      name: "Non-Fiction Reading",
      icon: "/icons/reading.svg",
      description:
        "Favourites: The Lean Startup, Thinking Fast and Slow, and anything on systems thinking, mental models, or technology strategy.",
    },
    {
      name: "Traveling",
      icon: "/icons/travel.svg",
      description:
        "New environments reset my thinking. I find that the best ideas often come from stepping away from the screen.",
    },
    {
      name: "Machine Learning",
      icon: "/icons/ml.svg",
      description:
        "Working with datasets, training models, and understanding how ML pipelines come together — from raw data to production inference.",
    },
  ],
};

export const CONTACT_ME = {
  title: "Let's Work Together",
  description:
    "Whether you're looking to hire, collaborate on a project, or just talk tech — I'm open to the conversation. I typically respond within 24 hours.",
  email: "samirkadu8@gmail.com",
  linkedin: "https://www.linkedin.com/in/sameer-kadu/",
  github: "https://github.com/Sameer-Kadu",
  availability: "Open to full-time roles & freelance projects",
  location: "Nagpur, Maharashtra, India",
  responseTime: "Within 24 hours",
};

export const FOOTER_TEXT = `© ${new Date().getFullYear()} Samir Kadu. Built with Next.js & Tailwind CSS.`;
