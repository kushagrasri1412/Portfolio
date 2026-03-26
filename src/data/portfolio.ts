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
    company: "GRID",
    role: "Frontend & Web Performance Engineering Intern",
    period: "Jul 2025 – Aug 2025",
    metrics: [
      "Improved page-load performance by 25% across 15K+ monthly visits; reduced TTI from 3.2s to 2.4s",
      "Saved 8 hours/week of editorial overhead by building admin-configurable content modules",
      "Increased user retention by 18% via analytics pipeline and data-driven UX improvements",
    ],
    tech: ["Next.js", "React", "Analytics", "Bundle Optimization"],
    color: "#B388FF",
  },
  {
    company: "Arizona State University",
    role: "Student Data Verifier, Admission Services",
    period: "Oct 2023 – Jun 2024",
    metrics: [
      "Maintained 99.7% data integrity across 5K+ applicant records with FERPA-compliant verification workflows",
      "Reduced processing time from 12 to 9 min/application and cut verification errors by 15% with Excel dashboards",
    ],
    tech: ["PeopleSoft", "Salesforce", "Excel", "FERPA"],
    color: "#00E5FF",
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
