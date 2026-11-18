// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH for every text on this site.
// Identity, about, skills, process and contact come from the real CV
// (Junior-developer-cv_ivan_7.1.2025.pdf — Ivan Darma Saputra).
// `works` is intentionally BLANK for now: fill its fields and the
// Selected Works cards light up automatically.
// ---------------------------------------------------------------------------

export type Tint = "pink" | "peach" | "mint" | "lilac" | "butter" | "sky";

export type BadgeIcon = "code" | "globe" | "database" | "bug" | "users";

export interface PathStop {
  wordA: string;
  wordB: string;
  badge: { icon: BadgeIcon; label: string };
  speech: string;
  tint: Tint;
}

export interface Work {
  title: string;
  category: string;
  role: string;
  status: string;
  year: string;
  summary: string;
  tint: Tint;
  url?: string;
}

export interface ProcessStep {
  no: string;
  title: string;
  body: string;
  file: { name: string; kind: "text" | "code"; lines: string[] };
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  tint: Tint;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const profile = {
  name: "Ivan Darma Saputra",
  initials: "IDS",
  role: "Junior Developer",
  kicker: "Junior Developer · Tangerang, ID",
  headline: ["IVAN", "DARMA", "SAPUTRA"],
  tagline:
    "Junior developer proficient in PHP & C# — eager to learn and adapt to new technologies, and always shipping with the team.",
  location: "Pasar Baru, Kota Tangerang, Banten",
  timezone: "Asia/Jakarta",
  availability: "Open to junior roles & internships",
  email: "ivandarma3000@gmail.com",
  whatsapp: { display: "+62 812-1000-3270", href: "https://wa.me/6281210003270" },
  marquee: ["PHP", "JAVASCRIPT", "PYTHON", "SQL", "WEB DESIGN", "DEBUGGING", "UI/UX", "GRAPHIC DESIGN"],
};

export const about = {
  label: "Fig. 01 · About",
  headline: ["About me"],
  headlineAccent: "technologies",
  statements: [
    "I am a dedicated junior developer with a strong work ethic and a deep curiosity for advancing in technology, AI, and machine learning. Whether working independently or collaborating within a team, I enjoy turning ideas into functional web solutions while balancing my Information Technology studies as a 2023 high-school graduate.",
    "On the technical side, I am proficient in PHP and C#, with hands-on experience across Java, Python, and .NET. I bring solid capabilities in database management and SQL, supported by a strong grasp of fundamental programming concepts including variables, control flow, functions, and object-oriented design.",
  ],
  traits: ["Eager to learn", "Adaptable", "Team-first"],
  meta: [
    { label: "Based in", value: "Pasar Baru, Kota Tangerang, Banten" },
    { label: "Since", value: "2020 · first line of code" },
    { label: "Studying", value: "Software Engineering, Global Institute of Technology and Business" },
    { label: "Tools", value: "PHP · JavaScript · Python · SQL · UI/UX  · Graphic Design" },
  ],
  photo: {
    src: "/img/profile.jpg",
    alt: "Portrait of Ivan Darma Saputra wearing glasses and a checked shirt in front of a dark granite wall",
  },
};

export const pathSection = {
  label: "Fig. 02 · The Path",
  title: ["SUPER", "POWERS"],
  stops: [
    {
      wordA: "PHP",
      wordB: "JS",
      badge: { icon: "code", label: "core stack" },
      speech: "My core languages — PHP and JavaScript first, with Python in the mix when a problem needs solving.",
      tint: "pink",
    },
    {
      wordA: "UI/UX",
      wordB: "GRAPHIC",
      badge: { icon: "globe", label: "design" },
      speech: "Web Design, UI/UX and graphic design — turning ideas into clean interfaces and visuals that communicate clearly.",
      tint: "peach",
    },
    {
      wordA: "DATA",
      wordB: "SQL",
      badge: { icon: "database", label: "databases" },
      speech: "Database concepts and SQL — modelled, normalised and queried with care.",
      tint: "mint",
    },
    {
      wordA: "DEBUG",
      wordB: "OPTIMIZE",
      badge: { icon: "bug", label: "fix it" },
      speech: "Troubleshooting coding issues, debugging applications and optimising processes for speed and reliability.",
      tint: "lilac",
    },
    {
      wordA: "TEAM",
      wordB: "PLAY",
      badge: { icon: "users", label: "people" },
      speech: "Effective communication across diverse teams, with deadlines met by prioritising what matters first.",
      tint: "butter",
    },
  ] as PathStop[],
};

export const worksSection = {
  label: "Fig. 03 · Selected Works",
  title: ["SELECTED", "WORKS"],
  emptyNote: "Project slots are blank for now — fill `works` in lib/content.ts.",
};

// BLANK ON PURPOSE. Add one entry per project; empty titles render as blank cards.
export const works: Work[] = [
  { title: "", category: "", role: "", status: "", year: "", summary: "", tint: "pink" },
  { title: "", category: "", role: "", status: "", year: "", summary: "", tint: "mint" },
  { title: "", category: "", role: "", status: "", year: "", summary: "", tint: "lilac" },
  { title: "", category: "", role: "", status: "", year: "", summary: "", tint: "sky" },
];

export const processSection = {
  label: "Fig. 04 · Process",
  title: ["HOW I", "WORK"],
  steps: [
    {
      no: "01",
      title: "LISTEN & SCOPE",
      body: "Every task starts with effective communication: I restate the goal, ask the awkward questions and write down what done means.",
      file: {
        name: "brief.txt",
        kind: "text",
        lines: ["goal: ship a reliable feature", "scope: agreed together", "done means: tested + documented"],
      },
    },
    {
      no: "02",
      title: "PLAN & PRIORITIZE",
      body: "Multiple tasks are managed by weighing deadlines against importance, so the critical path is always the one I am on.",
      file: {
        name: "todo.md",
        kind: "text",
        lines: ["[x] break down the problem", "[ ] critical path first", "[ ] buffer for the unknown"],
      },
    },
    {
      no: "03",
      title: "BUILD & DEBUG",
      body: "PHP, C# and friends. Troubleshooting, debugging and optimising until every new technology feels like an old friend.",
      file: {
        name: "app.php",
        kind: "code",
        lines: ["<?php", "while ($bug->exists()) {", "    $bug->trace();", "    $bug->fix();", "}"],
      },
    },
    {
      no: "04",
      title: "REVIEW & DELIVER",
      body: "I evaluate my own solutions critically before anyone else does, then hand over work that is clean, tested and explained.",
      file: {
        name: "ship.log",
        kind: "text",
        lines: ["build ......... ok", "tests ......... ok", "handover ...... scheduled"],
      },
    },
  ] as ProcessStep[],
};

// No testimonial data in the CV yet — the section hides itself while empty.
export const testimonials: Testimonial[] = [];

export const faqSection = {
  label: "Fig. 05 · FAQ",
  items: [
    {
      q: "What is your stack?",
      a: "PHP and C# are my strongest languages. I also work with Java, Python and .NET, plus databases and SQL.",
    },
    {
      q: "What are you studying right now?",
      a: "Software Engineering at the Global Institute of Technology and Business, after graduating from SMAS Plus Permata Insani Islamic School in 2023.",
    },
    {
      q: "Where are you based?",
      a: "Pasar Baru, Kota Tangerang, Banten, Indonesia — on WIB (UTC+7).",
    },
    {
      q: "What languages do you speak?",
      a: "Indonesian and English.",
    },
  ] as FaqItem[],
};

export const contactSection = {
  label: "Fig. 06 · Contact",
  statement: ["LET'S BUILD", "SOMETHING CALM", "& FAST"],
  note: "Have a project, a question or a junior role in mind? I reply within two days.",
};

export const footerSection = {
  credit: "© 2026 Ivan Darma Saputra · designed & built with Next.js, Motion and too much coffee.",
  marquee: ["AVAILABLE FOR JUNIOR ROLES", "LET'S TALK", "TANGERANG · WIB"],
};
