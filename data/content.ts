export type NavLink = {
  id: string;
  label: string;
  href: string;
};

export type Metric = {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
};

export type HowIWorkItem = {
  title: string;
  description: string;
};

export type ExperienceRole = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tools: string[];
};

export type CaseStudySection = {
  title: string;
  body: string;
};

export type CaseStudyStat = {
  label: string;
  value: number;
  suffix?: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  summary: string;
  sections: CaseStudySection[];
  stats?: CaseStudyStat[];
  diagram?: "journey" | "segments" | "mvp";
};

export type SkillGroup = {
  id: string;
  label: string;
  skills: string[];
};

export type Credential = {
  title: string;
  org: string;
  period: string;
  details: string;
};

export const site = {
  name: "Pranam Manav Upagade",
  shortName: "Pranam Upagade",
  monogram: "PU",
  title: "AI-Driven Product Manager",
  location: "Bangalore",
  email: "pranamupagade@gmail.com",
  linkedin: "https://www.linkedin.com/in/pranam-upagade-a5895b230/",
  resumeUrl: "/resume.pdf",
  photo: "/images/pranam.png",
  url: "https://pranamupagade.com",
  description:
    "AI-driven Product Manager with a CS engineering background. Ships AI-powered products with clear discovery, sharp prioritization, and disciplined delivery.",
} as const;

export const navLinks: NavLink[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "case-studies", label: "Case Studies", href: "#case-studies" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "AI-Driven Product Manager · Bangalore",
  headline: "I turn ambiguous problems into AI-powered products people actually use.",
  subheadline:
    "Dev/Ops Project & Product Manager with 2+ years shipping 8+ web products, backed by a CS engineering background and hands-on AI product experience.",
  chips: ["AI Product Thinking", "0→1 MVPs", "Agile Delivery"],
  ctas: {
    primary: { label: "View case studies", href: "#case-studies" },
    secondary: { label: "Download resume", href: "/resume.pdf" },
  },
} as const;

export const metrics: Metric[] = [
  { value: 8, suffix: "+", label: "web products delivered" },
  { value: 20, suffix: "%", label: "faster project turnaround", prefix: "" },
  { value: 3, suffix: "", label: "product case studies (Swiggy, Peppo, Spotify)" },
  { value: 2, suffix: "+", label: "years in product/project delivery" },
];

export const about = {
  narrative:
    "I'm a product-oriented professional who pairs project delivery discipline with AI-driven product thinking. I thrive in ambiguity—running discovery, aligning stakeholders, and shipping user-centric solutions with measurable impact. My CS background keeps me close to the build: I can scope technical trade-offs, partner deeply with engineers, and turn AI ideas into products people actually adopt.",
  howIWork: [
    {
      title: "Discover",
      description: "User research, problem framing, and opportunity sizing before a single ticket is written.",
    },
    {
      title: "Define",
      description: "PRDs, prioritization frameworks, and roadmaps that connect business outcomes to product bets.",
    },
    {
      title: "Deliver",
      description: "Agile execution, QA partnership, and post-launch iteration with clear success metrics.",
    },
  ] satisfies HowIWorkItem[],
};

export const experience: ExperienceRole[] = [
  {
    id: "exdera",
    title: "Project/Product Manager",
    company: "Exdera",
    location: "Bangalore",
    period: "Jul 2026 – Present",
    bullets: [
      "Owns the product lifecycle for client-facing design and development products—from discovery and scoping to launch.",
      "Defines and prioritizes roadmaps and backlogs; partners with design, engineering, and QA on sprint-ready user stories.",
      "Leads Scrum ceremonies; manages scope and risk across delivery.",
      "Runs user research, competitor analysis, and market validation to ground product decisions.",
    ],
    tools: ["Jira", "Notion", "Figma", "Miro", "Slack"],
  },
  {
    id: "cojective",
    title: "Project Manager",
    company: "Cojective",
    location: "Bangalore",
    period: "Aug 2024 – Nov 2025",
    bullets: [
      "Led end-to-end delivery of 8+ web products (including Rajiv Talreja's portfolio and Quantum Leap platforms), improving turnaround time by 20%.",
      "Drove cross-functional collaboration across design, development, and QA.",
      "Ran requirement gathering, sprint planning, and stakeholder communication.",
      "Built workflows in Jira, Trello, Miro, and Notion; managed WordPress/Elementor builds with post-launch iteration.",
    ],
    tools: ["Jira", "Trello", "Miro", "Notion", "WordPress", "Elementor"],
  },
  {
    id: "devstory",
    title: "Project Co-Ordinator",
    company: "Dev Story",
    location: "Chandigarh",
    period: "Jun 2024 – Aug 2024",
    bullets: [
      "Coordinated design and development teams and maintained Jira boards.",
      "Partnered with PMs and CTOs on delivery cadence and priorities.",
      "Contributed to wireframing in Miro and Figma.",
    ],
    tools: ["Jira", "Miro", "Figma", "Slack"],
  },
  {
    id: "foruppo",
    title: "Project Management Intern",
    company: "Foruppo",
    location: "Remote",
    period: "Jan 2024 – Jun 2024",
    bullets: [
      "Supported project coordination and agile execution.",
      "Operated day-to-day workflows across Jira, Trello, and Slack.",
    ],
    tools: ["Jira", "Trello", "Slack"],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "swiggy",
    title: "Swiggy",
    subtitle: "Reducing customer support load",
    tags: ["AI", "Roadmap", "Support Ops"],
    summary:
      "Mapped support cost and CSAT to product outcomes, then proposed a capacity model and self-serve roadmap to cut ticket volume.",
    diagram: "journey",
    sections: [
      {
        title: "Problem",
        body: "Customer support load was scaling with order volume. Ticket volume drove cost up while CSAT risked slipping—without a clear link between product gaps and support demand.",
      },
      {
        title: "Insight",
        body: "Journey analysis surfaced the primary ticket drivers: order delays, poor tracking visibility, and unclear communication. Outcomes needed to be dual-tracked—business (cost reduction) and product (proactive clarity in-app).",
      },
      {
        title: "Approach",
        body: "Proposed a capacity-planning model based on order volume, query rate, and resolution time. Prioritized a roadmap around proactive notifications, richer order tracking, and in-app self-serve support.",
      },
      {
        title: "Outcome / Recommendation",
        body: "Shift support demand upstream into the product. Measure success via ticket deflection rate, cost per order, and CSAT—paired with notification and tracking adoption metrics.",
      },
    ],
  },
  {
    id: "peppo",
    title: "Peppo",
    subtitle: "Retention and churn",
    tags: ["Retention", "Analytics", "Research"],
    summary:
      "Segmented users with RFM and acquisition signals to isolate churn drivers—then designed a research plan and retention bets.",
    diagram: "segments",
    stats: [
      { label: "Limited variety", value: 62, suffix: "%" },
      { label: "Pricing concerns", value: 31, suffix: "%" },
    ],
    sections: [
      {
        title: "Problem",
        body: "Retention was soft and churn opaque. Leadership needed clarity on which cohorts were leaking—and why—before investing in product changes.",
      },
      {
        title: "Insight",
        body: "Built a user segmentation model (RFM, demographic, acquisition) to find high-LTV and low-retention cohorts. Top churn drivers: limited variety (62%) and pricing concerns (31%).",
      },
      {
        title: "Approach",
        body: "Designed a research plan combining qualitative interviews with funnel analysis to validate drivers and pressure-test interventions before full build.",
      },
      {
        title: "Outcome / Recommendation",
        body: "Recommended personalized recommendations, pricing tests, and expanded recipe variety—sequenced by cohort impact and implementation cost.",
      },
    ],
  },
  {
    id: "spotify",
    title: "Spotify",
    subtitle: "Skill-building through audio (0→1 MVP)",
    tags: ["0→1", "AI", "MVP"],
    summary:
      "Repositioned Spotify toward learning and focus with a constrained MVP: goals, structured journeys, progress, and nudges.",
    diagram: "mvp",
    sections: [
      {
        title: "Problem",
        body: "Entertainment-first positioning left an open wedge for utility: skill-building and focus through audio—without boiling the ocean on a greenfield build.",
      },
      {
        title: "Insight",
        body: "Users needed structured journeys, not just playlists. Perception had to shift from entertainment to utility, with measurable engagement and completion.",
      },
      {
        title: "Approach",
        body: "Scoped an MVP with Lovable, Airtable, and GPT-based summarization under engineering constraints. Core features: goal setting, structured audio journeys, progress tracking, and behavioral nudges. Deferred quizzes and the creator marketplace.",
      },
      {
        title: "Outcome / Recommendation",
        body: "Success metrics: daily active engagement, journey completion rate, and perception shift from entertainment to utility. Ship the constrained MVP first; expand only after completion signals hold.",
      },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "product",
    label: "Product & Business",
    skills: [
      "Product Strategy",
      "Roadmapping",
      "User Research",
      "Feature Prioritization",
      "Stakeholder Management",
      "Storytelling",
    ],
  },
  {
    id: "ai",
    label: "AI & Analytics",
    skills: [
      "AI Product Thinking",
      "LLM Applications",
      "Prompt Engineering",
      "Human-in-the-loop Systems",
      "AI Evaluation & Safety",
      "Excel",
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: ["Jira", "Trello", "Notion", "Slack", "Miro", "Figma"],
  },
  {
    id: "technical",
    label: "Technical",
    skills: [
      "Git/GitHub",
      "Vercel",
      "Streamlit",
      "Docker",
      "JavaScript",
      "TypeScript",
      "Python",
      "React",
      "Next.js",
    ],
  },
];

export const marqueeTools = [
  "Jira",
  "Notion",
  "Figma",
  "Miro",
  "Next.js",
  "React",
  "Python",
  "TypeScript",
  "Vercel",
  "Streamlit",
  "Docker",
  "Slack",
  "Airtable",
  "GPT",
  "Lovable",
];

export const credentials: Credential[] = [
  {
    title: "Product Management Fellowship",
    org: "NextLeap",
    period: "Feb – May 2026",
    details:
      "Product lifecycle, user research, PRDs, agile, A/B testing, KPI tracking, and AI-led workflows.",
  },
  {
    title: "B.E. Computer Science & Engineering",
    org: "Chandigarh University",
    period: "2020 – 2024",
    details:
      "Engineering foundation that informs technical trade-offs, AI product scoping, and close partnership with builders.",
  },
];

export const contact = {
  headline: "Let's build something intelligent.",
  subheadline:
    "Open to product roles, AI product collaborations, and thoughtful 0→1 conversations.",
} as const;
