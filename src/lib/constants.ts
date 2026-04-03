export const SITE_METADATA = {
  title: "Samir Kadu — Full Stack Engineer & QA Automation Specialist",
  description:
    "Samir Kadu builds reliable, production-grade web applications and automated test systems. 3+ years at Bajaj Finserv Health. AWS Certified.",
  author: "Samir Kadu",
  keywords:
    "Samir Kadu, Full Stack Developer, QA Automation Engineer, React, Next.js, TypeScript, Spring Boot, Selenium, Playwright, AWS, Bajaj Finserv Health, portfolio",
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
  badge: "Software Engineer @ Bajaj Finserv Health",
  availabilityBadge: "Open to opportunities",
  tagline: "I build software that scales — then I make sure it never breaks.",
  roles: [
    "Full Stack Engineer",
    "Automation Specialist",
    "AWS Certified Engineer",
  ],
  introText:
    "3+ years shipping production health-tech to hundreds of thousands of users. I own features end-to-end — architecture, implementation, automated testing, and zero-defect deployment.",
  quickStats: [
    { value: "3+", label: "Years in Production" },
    { value: "25+", label: "Features Shipped" },
    { value: "AWS", label: "Certified" },
  ],
  avatar: "/images/samir-avatar.png",
  ctaButtons: [
    { text: "View My Work", link: "#projects", type: "scroll" },
    { text: "Download Resume", link: "/Samir_Kadu_Resume.pdf", type: "download" },
  ],
};

export const ABOUT_ME = {
  title: "About Me",
  story:
    "Full Stack Engineer with 3+ years building production health-tech at Bajaj Finserv Health — one of India's leading digital health platforms. I own features end-to-end: system design, implementation, test automation, and deployment.\n\nMy edge: I treat quality as a first-class feature, not an afterthought. As the QA-embedded engineer across multiple agile squads, I'm the bridge between product spec, engineering, and what actually ships.",
  goals:
    "I want to work on products that actually matter — solving hard technical problems with real-world impact. Whether that's a high-scale platform, a fintech product, or a startup building something new, I bring both engineering depth and a quality-first mindset.\n\nNext goal: an engineering role where I can lead feature development end-to-end and help build a culture of technical excellence.",
  passion:
    "I'm obsessed with the intersection of software reliability and developer experience. Automated testing, clean architecture, and well-documented APIs aren't just nice-to-haves for me — they're the baseline.\n\nOutside code, I follow financial markets, explore AI/ML research, and read obsessively about startups and product strategy. I believe the best engineers are also strong product thinkers.",
  currentFocus: [
    { label: "Currently", value: "Building automation infra @ Bajaj Finserv Health" },
    { label: "Studying", value: "System design & distributed systems architecture" },
    { label: "Open to", value: "Senior SWE · Lead QA · Fintech / Healthtech · Remote" },
  ],
  interests:
    "Outside engineering: algorithmic trading strategies, AI/ML research, startup product thinking, and reading everything I can about how great software teams work.",
  stats: [
    { label: "Years in Production", value: "3+", icon: "🚀" },
    { label: "Features Shipped", value: "25+", icon: "💼" },
    { label: "Technologies", value: "15+", icon: "⚡" },
    { label: "Test Suites Built", value: "10+", icon: "✅" },
  ],
  highlights: [
    { icon: "🏗️", text: "End-to-end feature ownership" },
    { icon: "🔍", text: "Quality-first engineering mindset" },
    { icon: "📈", text: "Production-proven at scale" },
    { icon: "🤝", text: "Cross-functional collaborator" },
  ],
  quote: {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
};

export const SKILLS = {
  title: "Skills & Expertise",
  subtitle: "Technologies I use to build, test, and ship production software",
  core: [
    { name: "React", icon: "/icons/react.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "Node.js", icon: "/icons/nodejs.svg" },
    { name: "Python", icon: "/icons/python.svg" },
    { name: "Java", icon: "/icons/java.svg" },
    { name: "JavaScript", icon: "/icons/javascript.svg" },
  ],
  proficient: [
    { name: "Django", icon: "/icons/django.svg" },
    { name: "Flask", icon: "/icons/flask.svg" },
    { name: "Express.js", icon: "/icons/express.svg" },
    { name: "SQL", icon: "/icons/sql.svg" },
    { name: "MongoDB", icon: "/icons/mongodb.svg" },
    { name: "AWS", icon: "/icons/aws.svg" },
    { name: "Docker", icon: "/icons/docker.svg" },
  ],
  tools: [
    "Next.js",
    "Playwright",
    "Selenium",
    "Cypress",
    "TestRail",
    "Jira",
    "Git",
    "Jenkins",
    "Kubernetes",
    "Bootstrap",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
  ],
};

export const PROJECTS = [
  {
    id: 1,
    title: "Go_Bus",
    tagline: "Full-stack bus booking SaaS with multi-role access control",
    description:
      "End-to-end bus ticket booking system with dedicated panels for Admin, Operator, and User roles. Built with Spring Boot REST APIs, JWT authentication, and a React frontend.",
    problem:
      "Bus operators lacked a unified digital system — bookings were manual, route management was scattered, and there was no way for admins to oversee the ecosystem at scale.",
    solution:
      "Designed and built a multi-role SaaS platform from scratch. Operators manage routes and schedules. Admins approve operators and monitor activity. Users browse, book, and manage tickets — all secured with JWT-based auth.",
    impact:
      "Replaced 100% of the manual booking workflow. Supports real-time seat availability across multiple operators. Multi-role architecture designed to onboard N operators without code changes.",
    techStack: ["React", "Spring Boot", "MySQL", "JWT Auth"],
    image: "/images/go-bus.png",
    githubLink: "https://github.com/Sameer-Kadu/Go_Bus.git",
    demoLink: "https://go-bus-oarm.vercel.app/",
    category: "work",
  },
  {
    id: 2,
    title: "Cultural Tourism Explorer",
    tagline: "Hackathon winner — data storytelling for India's cultural heritage",
    description:
      "A data-driven platform built for the Snowflake × YourStory Hero Hackathon. Bridges art, culture, and tourism across India through interactive data visualizations. Built in 48 hours.",
    problem:
      "India's rich cultural and tourism data was scattered across sources with no unified, engaging interface for exploration or storytelling.",
    solution:
      "Built a data pipeline from Snowflake's cloud data warehouse into a Streamlit app, using Python and Pandas for transformation, with interactive charts for regional exploration.",
    impact:
      "Selected among top submissions by Snowflake & YourStory judges for data engineering quality and visual storytelling. Built in 48 hours. Live demo deployed and publicly accessible.",
    techStack: ["Snowflake", "Streamlit", "Python", "Pandas"],
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
        "Building and owning features for a digital health platform serving hundreds of thousands of users. Work spans full-stack development, REST API design, and production-grade QA automation.",
      highlights: [
        "Designed and shipped 10+ production features across patient appointments, health records, and provider dashboard flows",
        "Built 10+ end-to-end automated test suites with Playwright & Selenium — cutting regression cycle time from days to hours and eliminating manual QA sprints per release",
        "Designed REST APIs now consumed by 3+ internal frontend products covering core health-tech workflows",
        "Embedded QA engineer across 4+ agile squads — primary bridge between product spec, engineering implementation, and release quality gates",
        "Containerized services with Docker, standardizing dev-to-prod environment parity and eliminating environment-specific bugs",
      ],
      icon: "💼",
    },
    {
      type: "education",
      title: "Post Graduate Diploma in Advanced Computing (PG-DAC)",
      institution: "CDAC",
      duration: "Aug 2022 – Jan 2023",
      description:
        "Intensive 6-month industry-oriented program covering full-stack development, data structures, algorithms, operating systems, and software engineering practices.",
      highlights: [
        "Covered Java, C++, .NET, Python, and database engineering in depth under exam pressure",
        "Capstone: full-stack Java Spring Boot + React app, delivered end-to-end in a team setting",
        "Ranked among top performers in the batch",
      ],
      icon: "🎓",
    },
    {
      type: "certification",
      title: "AWS Certified Solutions Architect – Associate",
      institution: "Amazon Web Services",
      duration: "May 2023",
      description:
        "Validated expertise in designing distributed, fault-tolerant systems on AWS — covering compute, storage, networking, security, and cost optimization.",
      highlights: [
        "Certified in designing cloud-native, fault-tolerant architectures on AWS",
        "Covers EC2, S3, RDS, VPC, IAM, Lambda, and Auto Scaling in production contexts",
        "Demonstrates cloud-first engineering mindset backed by formal validation",
      ],
      icon: "📜",
    },
  ],
};

// Kept for reference — section removed from page, content condensed into AboutMe
export const INTERESTS_HOBBIES = {
  title: "Beyond the Code",
  subtitle: "What keeps me sharp outside of engineering",
  items: [] as { name: string; icon: string; description: string }[],
};

export const CONTACT_ME = {
  title: "Let's Build Something Together",
  description:
    "Have a role, project, or idea in mind? I'm actively exploring new opportunities in full-stack engineering and automation. Let's talk — I respond within 24 hours.",
  availability: "Actively looking — open to full-time & freelance",
  responseTime: "Replies within 24 hours",
  location: "Nagpur, Maharashtra, India",
  email: "samirkadu8@gmail.com",
  linkedin: "https://www.linkedin.com/in/sameer-kadu/",
  github: "https://github.com/Sameer-Kadu",
};

export const FOOTER_TEXT = `© ${new Date().getFullYear()} Samir Kadu. All rights reserved.`;
