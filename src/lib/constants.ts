export const SITE_METADATA = {
  title: "Samir Kadu — Full Stack Engineer",
  description:
    "Full Stack Engineer & QA Automation specialist with 3+ years building scalable health-tech platforms at Bajaj Finserv Health.",
  author: "Samir Kadu",
  keywords:
    "Samir Kadu, Full Stack Engineer, Software Engineer, React, Next.js, TypeScript, Node.js, AWS, QA Automation, Bajaj Finserv Health",
  url: "https://www.samirkadu.com",
  image: "/og-image.jpg",
};

export const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const HERO_SECTION = {
  name: "Samir Kadu",
  badge: "Open to new opportunities",
  headline: "Full Stack Engineer",
  subheadline: "who ships production-ready code.",
  introText:
    "3+ years engineering scalable health-tech platforms at Bajaj Finserv Health. I build end-to-end products — from pixel-perfect UIs to robust backend APIs — with a strong focus on quality, performance, and test coverage.",
  currentRole: "Software Engineer @ Bajaj Finserv Health",
  location: "Nagpur, India",
  techStack: ["React", "Next.js", "TypeScript", "Node.js", "AWS"],
  avatar: "/images/samir-avatar.png",
  ctaButtons: [
    { text: "View My Work", link: "#projects", type: "scroll" },
    { text: "Download Resume", link: "/Samir_Kadu_Resume.pdf", type: "download" },
  ],
  stats: [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Shipped", value: "25+" },
    { label: "Technologies", value: "15+" },
    { label: "AWS Certified", value: "✓" },
  ],
};

export const ABOUT_ME = {
  title: "About Me",
  bio: "I'm a Full Stack Engineer with a knack for building reliable, scalable software. At Bajaj Finserv Health I've contributed to features used by millions — from building responsive UIs to designing automated test suites that cut regression time significantly. I thrive at the intersection of engineering quality and product impact.",
  currentRole: {
    title: "Software Engineer",
    company: "Bajaj Finserv Health",
    since: "Jan 2023",
    type: "Full-time",
  },
  availability: {
    label: "Open to opportunities",
    type: "Full-time / Freelance",
  },
  stats: [
    { label: "Years Experience", value: "3+", description: "in production systems" },
    { label: "Projects Shipped", value: "25+", description: "personal & professional" },
    { label: "Technologies", value: "15+", description: "across full stack" },
    { label: "AWS Certified", value: "SAA", description: "Solutions Architect" },
  ],
  highlights: [
    "Production systems at scale (millions of users)",
    "End-to-end ownership — design to deployment",
    "Automated testing that actually prevents bugs",
    "Clean code that teammates enjoy reading",
  ],
  quote: {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
};

export const SKILLS = {
  title: "Skills & Stack",
  subtitle: "Technologies I use to build reliable, scalable products end-to-end.",
  // Core stack — shown prominently
  core: [
    { name: "React", icon: "/icons/react.svg" },
    { name: "Next.js", icon: "/icons/nextjs.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "Node.js", icon: "/icons/nodejs.svg" },
    { name: "Python", icon: "/icons/python.svg" },
    { name: "AWS", icon: "/icons/aws.svg" },
  ],
  // Full categories for detail section
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
    title: "Go Bus",
    tagline: "Full-stack bus booking platform with multi-panel admin",
    description:
      "End-to-end bus ticket booking system with separate dashboards for Admins, Operators, and Passengers. Built with role-based JWT authentication, real-time seat availability, route management, and a feedback system.",
    impact: [
      "Multi-role authentication with JWT — Admin, Operator, Passenger panels",
      "Real-time seat availability and dynamic route management",
      "Customer feedback module improving operator accountability",
    ],
    techStack: ["React", "Spring Boot", "MySQL", "JWT Auth"],
    image: "/images/go-bus.png",
    githubLink: "https://github.com/Sameer-Kadu/Go_Bus.git",
    demoLink: "https://go-bus-oarm.vercel.app/",
    category: "work",
    featured: true,
  },
  {
    id: 2,
    title: "Cultural Tourism Explorer",
    tagline: "Hackathon winner — data-driven India tourism platform",
    description:
      "Built in 48 hours for the Snowflake × YourStory Hero Hackathon. A data storytelling platform bridging art, culture, and tourism across India using interactive visualizations powered by Snowflake's data cloud.",
    impact: [
      "Built end-to-end in 48 hours for national-level hackathon",
      "Interactive visualizations across 28+ Indian cultural destinations",
      "Snowflake data cloud integration for real-time insights",
    ],
    techStack: ["Snowflake", "Streamlit", "Python", "Pandas"],
    image: "/images/tourism-hackathon.png",
    githubLink: "https://github.com/Sameer-Kadu/snowflake-hero-challenge.git",
    demoLink: "https://wanderwiseindia.streamlit.app/",
    category: "hackathon",
    featured: false,
  },
];

export const EXPERIENCE_EDUCATION = {
  title: "Experience & Education",
  subtitle: "The path that shaped how I build software.",
  timeline: [
    {
      type: "experience",
      title: "Software Engineer",
      company: "Bajaj Finserv Health",
      duration: "Jan 2023 – Present",
      badge: "Current",
      description:
        "Engineering critical features for one of India's leading digital health platforms. Own full-cycle delivery — requirements to production — across frontend, backend, and QA automation.",
      highlights: [
        "Built patient-facing features for a platform serving millions of users",
        "Designed automated test suites with Selenium & Playwright, reducing regression testing time by 60%+",
        "Contributed to microservices architecture improvements for better system scalability",
        "Collaborated cross-functionally with product, design, and QA teams in Agile sprints",
      ],
    },
    {
      type: "education",
      title: "Post Graduate Diploma in Advanced Computing",
      institution: "CDAC (Centre for Development of Advanced Computing)",
      duration: "Aug 2022 – Jan 2023",
      badge: "PG-DAC",
      description:
        "Intensive 6-month program covering the full spectrum of software engineering — from data structures and algorithms to full-stack development, databases, and system design.",
      highlights: [
        "Full-stack web development: Java, React, Spring Boot, MySQL",
        "Core CS fundamentals: DSA, OS, DBMS, Computer Networks",
        "Graduated with a project-focused capstone (Go Bus platform)",
      ],
    },
    {
      type: "certification",
      title: "AWS Certified Solutions Architect – Associate",
      institution: "Amazon Web Services",
      duration: "May 2023",
      badge: "AWS SAA-C03",
      description:
        "Demonstrated expertise in designing distributed, highly available, and fault-tolerant systems on AWS.",
      highlights: [
        "Cloud architecture: EC2, S3, RDS, Lambda, VPC, IAM",
        "High availability and disaster recovery design patterns",
        "Cost optimization and AWS Well-Architected Framework",
      ],
    },
  ],
};

export const INTERESTS_HOBBIES = {
  title: "Interests & Hobbies",
  items: [
    {
      name: "Algorithmic Trading",
      icon: "/icons/trading.svg",
      description:
        "I explore quantitative trading strategies — backtesting systems, studying market microstructure, and building data-driven models to understand price behavior.",
    },
    {
      name: "Startups",
      icon: "/icons/startup.svg",
      description:
        "Passionate about how zero-to-one products are built. I follow startup ecosystems, study business models, and love the challenge of turning a technical idea into a real product.",
    },
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
  ],
};

export const CONTACT_ME = {
  title: "Let's Build Something Together",
  description:
    "I'm open to full-time roles, freelance projects, and interesting collaborations. Whether you have a clear brief or just an idea — let's talk.",
  email: "samirkadu8@gmail.com",
  linkedin: "https://www.linkedin.com/in/sameer-kadu/",
  github: "https://github.com/Sameer-Kadu",
  availability: "Open to opportunities",
  responseTime: "Responds within 24 hours",
  location: "Nagpur, Maharashtra, India",
};

export const FOOTER_TEXT = `© ${new Date().getFullYear()} Samir Kadu. Designed & built with Next.js, Tailwind CSS & Framer Motion.`;
