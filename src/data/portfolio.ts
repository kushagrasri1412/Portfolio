// ──────────────────────────────────────────────
// Kushagra Srivastava — Portfolio Data
// Source of truth: KUSHAGRA_RESUME_SOFTWARE_ENG.pdf
// ──────────────────────────────────────────────

export const HERO = {
  name: "Kushagra Srivastava",
  tagline: "Aspiring Software Engineer | Building reliable AI systems and fast web experiences",
  stats: [
    { label: "Backend Reliability", value: "99%", accent: "#4FC3F7" },
    { label: "Daily Requests", value: "500+", accent: "#B388FF" },
    { label: "p95 Latency", value: "<450ms", accent: "#00E5FF" },
    { label: "API Calls Secured", value: "10K+", accent: "#69F0AE" },
  ],
};

export const CONTACT = {
  phone: "+1-480-690-0303",
  email: "srivkush1412@gmail.com",
  linkedin: "https://linkedin.com/in/kushagra-srivastava1430",
  github: "https://github.com/kushagrasri1412",
};

export const ABOUT = {
  bio: "Backend-focused software engineer at Arizona State University pursuing a 4+1 BS/MS in Computer Science. I build cloud-native AI systems with measurable reliability, engineer high-throughput caching infrastructure, and optimize web performance at scale. Every system I ship is instrumented, tested, and built to last.",
  education: {
    school: "Arizona State University",
    degree: "BS/MS in Computer Science (4+1)",
    period: "August 2022 – May 2027",
    coursework: [
      "Data Structures & Algorithms",
      "Software Engineering",
      "Databases",
      "Theory of Computation",
      "Artificial Intelligence",
      "Linear Algebra",
    ],
  },
};

export type SkillCategory = {
  name: string;
  color: string;
  items: string[];
};

export const SKILLS: SkillCategory[] = [
  {
    name: "Languages",
    color: "#4FC3F7",
    items: ["Python", "JavaScript", "TypeScript", "Java", "C++", "Swift", "SQL"],
  },
  {
    name: "Frameworks & Libraries",
    color: "#B388FF",
    items: ["FastAPI", "Next.js", "Node.js", "Flask", "React", "D3.js", "SQLAlchemy", "Celery"],
  },
  {
    name: "Tools & Infrastructure",
    color: "#00E5FF",
    items: [
      "GCP (Cloud Run, Vertex AI)",
      "Firebase",
      "Docker",
      "Redis",
      "PostgreSQL",
      "Git",
      "Linux/UNIX",
      "CI/CD",
    ],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  metrics: string[];
  tech: string[];
  color: string;
  highlight?: boolean;
  cert?: string; // path to certificate in /public
  certType?: "pdf" | "img";
};

export const EXPERIENCES: Experience[] = [
  {
    company: "SkipCourse LLC",
    role: "Backend Software Engineer",
    period: "Aug 2025 – Present",
    highlight: true,
    metrics: [
      "Achieved 99% backend reliability serving 500+ daily requests via cloud-native GCP service with distributed retry logic",
      "Reduced Gemini inference auth failures to zero; maintained p95 latency under 450ms with Flask gateway + exponential backoff",
      "Reduced error rate by 17% by deploying request telemetry and error dashboards tracking p95 and failure thresholds",
      "Secured 10K+ monthly API calls by auditing IAM policies to enforce least-privilege access across Vertex AI production",
    ],
    tech: ["GCP", "Flask", "Vertex AI", "Redis", "Telemetry"],
    color: "#4FC3F7",
  },
  {
    company: "Swati Power",
    role: "Software Development Engineer Intern",
    period: "May 2025 – Aug 2025",
    metrics: [
      "Built backend data pipeline systems demonstrating proficiency in backend development, cloud deployment, and data pipeline engineering",
      "Designed and deployed cloud-native infrastructure for electrical contractor operations serving New Delhi region clients",
      "Implemented automated workflows reducing manual processing overhead across multiple operational departments",
    ],
    tech: ["Backend Development", "Cloud Deployment", "Data Pipelines"],
    color: "#B388FF",
    cert: "/certificates/swatipower-cert.jpg",
    certType: "img",
  },
  {
    company: "Atthah Info Media",
    role: "Software Development Engineer Intern",
    period: "Jun 2024 – Aug 2024",
    metrics: [
      "Collaborated with a 3-engineer team to build a React/TypeScript admin dashboard managing live content across 10+ client deployments, cutting editorial turnaround time by 35%",
      "Partnered with backend and analytics engineers to build a Python/FastAPI REST API supporting 500+ concurrent connections, replacing a legacy polling system and reducing data retrieval latency by 40%",
      "Automated a GCP-based media asset pipeline across 5+ client campaigns alongside senior engineers, reducing processing turnaround from 3 days to under 8 hours",
    ],
    tech: ["React", "TypeScript", "Python", "FastAPI", "GCP"],
    color: "#00E5FF",
    cert: "/certificates/atthah-cert.pdf",
    certType: "pdf",
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  metrics: string[];
  tech: string[];
  color: string;
  github?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "TOURGAIDE",
    tagline: "AI-Powered Travel Platform",
    description:
      "Async AI itinerary engine with structured schema enforcement, Redis caching, and intelligent request routing for a full-stack travel planning platform.",
    metrics: [
      "98%+ data validation accuracy",
      "1,200+ daily API calls",
      "Sub-300ms latency",
      "Request success: 85% → 98%",
      "Saved $240/mo in API costs",
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "Celery", "Docker"],
    color: "#FFB74D",
  },
  {
    name: "PYROCACHE",
    tagline: "AI-Augmented In-Memory Cache Engine",
    description:
      "Redis-compatible cache server built from raw TCP sockets — custom RESP protocol parser, asyncio event loop, and Vertex AI key prefetcher for predictive cache warming.",
    metrics: [
      "50K+ ops/sec throughput",
      "Sub-ms p99 latency",
      "34% cache miss reduction",
      "LRU/LFU eviction + AOF persistence",
      "Zero data loss on restart",
    ],
    tech: ["Python", "asyncio", "Vertex AI", "Docker", "TCP Sockets"],
    color: "#FF80AB",
    github: "https://github.com/kushagrasri1412/PyroCache",
  },
];

export type Award = {
  title: string;
  issuer: string;
  detail: string;
  year: string;
  type: "cert" | "scholarship";
};

export const AWARDS: Award[] = [
  {
    title: "Claude with Google Vertex AI",
    issuer: "Anthropic",
    detail: "Vertex AI inference, production AI deployment, IAM security on GCP",
    year: "March 2026",
    type: "cert",
  },
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    detail: "Applied AI concepts, model deployment workflows, responsible AI practices",
    year: "2026",
    type: "cert",
  },
  {
    title: "New American University Scholarship",
    issuer: "Arizona State University",
    detail: "Merit-based renewable scholarship for academic excellence",
    year: "2022 – 2027",
    type: "scholarship",
  },
];

export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
] as const;
