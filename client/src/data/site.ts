/**
 * ENOSX Technologies — site content.
 *
 * Every claim here is traceable to the owner's own repositories. Nothing is
 * invented: no fake client counts, no invented awards, no fabricated users.
 *
 * Sources: enosxai/const.ts, enosxai/TEAM.md, enosxai/docs/BRAND_IDENTITY.md,
 * Exboot/README.md, Enosh-browser/README.md, enosx-kenya-commerce, enosh-blog,
 * enigmacxenosx/README.md (GitHub profile), enigmacxenosx/enos-x-technologies.
 */

export const brand = {
  name: "ENOSX Technologies",
  legalName: "Enosx Technologies",
  shortName: "ENOSX",
  strapline: "Building what comes next",
  belief: "Latency is a design flaw.",
  philosophy: "Speed is UX.",
  foundedYear: 2024,
  city: "Nairobi, Kenya",
  country: "Kenya",
  rights: "© 2024–2026 Enosx Technologies. All rights reserved.",
  mission:
    "Make software feel instant by building multimodal AI assistants and commerce experiences that work with the operating environment, not beside it.",
  vision: "Redefine the boundary between human and OS.",
  story:
    "Founded in Nairobi in 2024 around a simple conviction: latency is a design flaw. So we build products that answer before you finish thinking — an AI workspace, private inference, desktop utilities and a Kenyan commerce layer.",
  values: [
    { title: "Build boldly", body: "We take the ambitious route and ship it, rather than talk about it." },
    { title: "Ship honestly", body: "We tell clients what is real, what is demo and what is next." },
    { title: "Stay curious", body: "Every release teaches us something the plan did not." },
  ],
  founderLine: "Build with intention. Ship with courage. Keep learning.",
  ownerNote: "First. Jesus is Lord.",
} as const;

export type Product = {
  id: string;
  index: string;
  name: string;
  kicker: string;
  summary: string;
  detail: string;
  capabilities: string[];
  status: string;
  link: { label: string; href: string } | null;
  reel: string;
};

export const products: Product[] = [
  {
    id: "enosx-ai",
    index: "01",
    name: "ENOSX AI",
    kicker: "Intelligent workspace",
    summary: "A multimodal AI assistant that behaves like part of the operating system.",
    detail:
      "ENOSX AI is a responsive web application with a companion desktop shell, configurable AI services, optional account sync and integrations. It is not a chatbot in a tab: it reads your files, watches your context, speaks and listens, and keeps working when you leave the window.",
    capabilities: [
      "Three reasoning modes — ENOSX One, ENOSX Studio, ENOSX Nexus",
      "Analyses documents, PDFs, images, audio and video attachments",
      "Generates and edits images; creates short video from text or image",
      "Voice in and voice out, where the browser supports it",
      "GitHub, Shopify, Vercel and Email connectors",
      "Knowledge Bank, long-term memory, conversation branching",
      "Tauri desktop shell with installers for Windows, macOS and Linux",
      "Local inference through Ollama when you want nothing to leave the device",
    ],
    status: "Live",
    link: { label: "Open ENOSX AI", href: "https://enosxai.vercel.app" },
    reel: "datacenter",
  },
  {
    id: "enosx-core",
    index: "02",
    name: "ENOSX Core",
    kicker: "Private inference layer",
    summary: "Intelligence that runs where your data already lives.",
    detail:
      "ENOSX Core is our private AI posture: local models, explicit context permission and no silent uploads. Import a GGUF file once and it stays on the device; switch to hybrid or cloud modes only when you decide to.",
    capabilities: [
      "Local GGUF model import with header and quantisation inspection",
      "Processing modes: Local AI, Hybrid AI, Private Cloud AI, No AI",
      "Explicit context permission before every action",
      "On-device storage; nothing leaves unless you allow it",
      "Generation controls: temperature, context window, max output, top-p",
    ],
    status: "Shipping in Enosx Browser and ENOSX AI desktop",
    link: null,
    reel: "core",
  },
  {
    id: "exboot",
    index: "03",
    name: "Exboot",
    kicker: "Windows utility",
    summary: "Turn a genuine ISO into dependable boot media, without the guesswork.",
    detail:
      "A Windows desktop utility for creating bootable and multi-boot USB media. It keeps the important decisions visible — which image, which disk, which partition scheme — and it never hides what will be erased.",
    capabilities: [
      "GPT/UEFI, MBR/UEFI and MBR/BIOS Legacy layouts",
      "Multi-boot through Ventoy for Windows, Linux, IMG, VHD and VHDX",
      "Splits large install.wim files for FAT32 compatibility",
      "Image freshness detection for ISO, WIM and ESD",
      "Optional Windows 11 TPM and Secure Boot compatibility settings",
      "GitHub Releases update checks with SHA-256 verification",
    ],
    status: "Public releases",
    link: {
      label: "Latest release",
      href: "https://github.com/enigmacxenosx/Exboot/releases/latest",
    },
    reel: "core",
  },
  {
    id: "enosx-browser",
    index: "04",
    name: "Enosx Browser",
    kicker: "Private browser shell",
    summary: "A calm, offline-first browser with the assistant built into the margin.",
    detail:
      "A Chrome-style shell with tabs, workspaces, reading list, private mode and an Enosx AI panel that only sees what you approve. The application registers a service worker and the installed desktop app loads without a connection.",
    capabilities: [
      "Tabs, bookmarks, reading list, history, workspaces, private mode",
      "Offline-first: service worker, cached shell, local storage",
      "Local GGUF models kept in IndexedDB on the device",
      "Ask Enosx, page summary, explain selection, compare tabs",
      "Electron desktop builds for Linux, Windows and macOS, plus a PWA",
    ],
    status: "Preview",
    link: { label: "Source", href: "https://github.com/enigmacxenosx/Enosh-browser" },
    reel: "studio",
  },
  {
    id: "enosx-store",
    index: "05",
    name: "Enosx Tech Store",
    kicker: "Kenyan commerce",
    summary: "Electronics discovery and buying built around how Kenya actually pays.",
    detail:
      "A Kenya-focused storefront for electronics, computing and accessories with an M-Pesa-ready checkout and Nairobi delivery options — the commerce half of the same engineering team.",
    capabilities: [
      "Electronics, computing and accessory catalogue",
      "M-Pesa-ready checkout flow",
      "Nairobi delivery options",
      "Product discovery and price comparison",
    ],
    status: "Live",
    link: { label: "Visit the hub", href: "https://enosxtech-hub.vercel.app" },
    reel: "commerce",
  },
  {
    id: "enosh-blog",
    index: "06",
    name: "Enosh Blog",
    kicker: "Learning in public",
    summary: "Where the work gets written down, in an editorial noir voice.",
    detail:
      "The personal publishing platform of the founder — magazine-inspired typography, server-rendered articles and a case-study layout. It is also where we publish what we learned from a release.",
    capabilities: [
      "Editorial design system with serif-forward typography",
      "Server-rendered article API",
      "Case studies and component showcase",
    ],
    status: "Live",
    link: { label: "Read it", href: "https://github.com/enigmacxenosx/enosh-blog" },
    reel: "crew",
  },
];

export const team = [
  {
    initials: "EY",
    name: "Enosh Yeswa",
    role: "Founder & Chief Executive Officer",
    responsibility:
      "Company vision and strategy, product direction, priorities, major decisions and key partnerships",
    avatar: "/avatars/enosh-yeswa.jpg",
    handle: "enigmacxenosx",
    note: "Founder · Product Engineer · AI Builder",
  },
  {
    initials: "GW",
    name: "Grace Wangare",
    role: "Product Design & User Research Lead",
    responsibility:
      "User experience, onboarding, user interviews, workflow design and evidence-based product feedback",
    avatar: "/avatars/grace-wangare.jpg",
    handle: null,
    note: "Design and research",
  },
  {
    initials: "TI",
    name: "Tracey Ivyone",
    role: "Growth, Marketing & Community Lead",
    responsibility: "Content, social media, community, referrals and user acquisition",
    avatar: "/avatars/tracey-ivyone.jpg",
    handle: null,
    note: "Growth and community",
  },
  {
    initials: "VO",
    name: "Vince Odhiambo",
    role: "Executive Assistant",
    responsibility:
      "Founder support, scheduling, administrative coordination, meeting records and follow-through",
    avatar: "/avatars/vince-odhiambo.jpg",
    handle: "vince551",
    note: "Coordination",
  },
  {
    initials: "FA",
    name: "Faith Adhiambo",
    role: "Product & Operations Associate",
    responsibility:
      "Project tracking, documentation, product feedback, coordination and follow-through",
    avatar: "/avatars/faith-adhiambo.jpg",
    handle: null,
    note: "Operations",
  },
] as const;

export type Account = {
  /** Stable id used for anonymised interaction counts on /accounts. */
  key: string;
  kind: string;
  label: string;
  value: string;
  href: string;
  copy: string | null;
  note: string;
  reel?: string;
};

/** Documented in the repositories; nothing here is guessed. */
export const accounts: Account[] = [
  {
    key: "email-technology",
    kind: "Email",
    label: "Technology",
    value: "enosxtech@gmail.com",
    href: "mailto:enosxtech@gmail.com",
    copy: "enosxtech@gmail.com",
    note: "Product, engineering and partnership enquiries",
  },
  {
    key: "email-services",
    kind: "Email",
    label: "Services & reports",
    value: "enosxservices@gmail.com",
    href: "mailto:enosxservices@gmail.com",
    copy: "enosxservices@gmail.com",
    note: "Service requests, feedback and incident reports",
  },
  {
    key: "email-company",
    kind: "Email",
    label: "Company",
    value: "hello@enosx.tech",
    href: "mailto:hello@enosx.tech",
    copy: "hello@enosx.tech",
    note: "The address used in our package metadata and releases",
  },
  {
    key: "whatsapp",
    kind: "WhatsApp",
    label: "Direct line",
    value: "+254 798 303 978",
    href: "https://wa.me/254798303978",
    copy: "+254798303978",
    note: "The fastest official contact route",
  },
  {
    key: "instagram",
    kind: "Instagram",
    label: "@engima_cx",
    value: "engima_cx",
    href: "https://www.instagram.com/engima_cx",
    copy: "engima_cx",
    note: "Founder channel",
  },
  {
    key: "github-personal",
    kind: "GitHub",
    label: "Enigmacx ENOSX",
    value: "github.com/enigmacxenosx",
    href: "https://github.com/enigmacxenosx",
    copy: "enigmacxenosx",
    note: "ENOSX AI, Exboot, Enosx Browser, Enosh Blog, this site",
  },
  {
    key: "github-org",
    kind: "GitHub",
    label: "ENOSX organisation",
    value: "github.com/Enosx-X",
    href: "https://github.com/Enosx-X",
    copy: "Enosx-X",
    note: "Organisation mirror of the platform repositories",
  },
  {
    key: "web-enosxai",
    kind: "Web",
    label: "ENOSX AI",
    value: "enosxai.vercel.app",
    href: "https://enosxai.vercel.app",
    copy: "enosxai.vercel.app",
    note: "The assistant, live",
  },
  {
    key: "web-store",
    kind: "Web",
    label: "Enosx Tech Store",
    value: "enosxtech-hub.vercel.app",
    href: "https://enosxtech-hub.vercel.app",
    copy: "enosxtech-hub.vercel.app",
    note: "Kenyan electronics storefront",
  },
  {
    key: "web-site",
    kind: "Web",
    label: "Official site",
    value: "enosxtech.vercel.app",
    href: "https://enosxtech.vercel.app",
    copy: "enosxtech.vercel.app",
    note: "Previous official site build",
  },
  {
    key: "domain-tech",
    kind: "Domain",
    label: "enosx.tech",
    value: "enosx.tech",
    href: "https://enosx.tech",
    copy: "enosx.tech",
    note: "Company domain used for mail and products",
  },
  {
    key: "domain-ai",
    kind: "Domain",
    label: "enosx.ai",
    value: "enosx.ai",
    href: "https://enosx.ai",
    copy: "enosx.ai",
    note: "Platform domain declared in the assistant's services",
  },
];

export const chapters = [
  { id: "origin", label: "Origin" },
  { id: "portfolio", label: "Portfolio" },
  { id: "core", label: "Private AI" },
  { id: "people", label: "People" },
  { id: "impact", label: "Impact" },
  { id: "accounts", label: "Accounts" },
] as const;

export const stats = [
  { value: "2024", label: "Founded, Nairobi" },
  { value: "06", label: "Products shipping" },
  { value: "03", label: "AI reasoning modes" },
  { value: "08", label: "Interface languages" },
] as const;

export const modes = [
  {
    name: "ENOSX One",
    tone: "Fast",
    body: "Everyday assistance. Answers that keep up with typing, for the ninety-percent case.",
  },
  {
    name: "ENOSX Studio",
    tone: "Deep",
    body: "Longer reasoning for drafting, analysis and multi-step work where the answer must hold up.",
  },
  {
    name: "ENOSX Nexus",
    tone: "Strategic",
    body: "Reasoning across context — plans, trade-offs, architecture, and the decision behind the request.",
  },
] as const;

export const timeline = [
  { year: "2024", text: "Enosx Technologies founded in Nairobi. First products built around one rule: speed is the user experience." },
  { year: "2025", text: "ENOSX AI grows from a chat interface into an intelligent workspace: attachments, media, voice, connectors and memory." },
  { year: "2026", text: "Exboot ships public Windows releases, Enosx Browser reaches offline preview, and the Kenya commerce hub goes live." },
  { year: "Next", text: "ENOSX Core private inference as a default posture, deeper desktop integration, and published interfaces for every product." },
] as const;
