export type CaseStudy = {
  slug: string;
  client: string;
  tags: string[];
  year: string;
  blurb: string;
  image: string;
  services: string[];
  challenge: string;
  approach: string;
  metrics: { value: string; label: string }[];
};

export const clients: string[] = [
  "Playbook",
  "Alta",
  "Recall",
  "Owkin",
  "Mural",
  "Restream",
  "Spiff",
  "BlockEarner",
  "Oleria",
  "CoinLedger",
  "TelQ",
  "Bytek",
  "Exec",
  "LiveSchool",
  "Sunday",
  "Bureau",
  "Waffly",
  "Noviscient",
  "Augment",
  "Invisibly",
  "RelayPay",
  "TrueMed",
  "GuardHomeWarranty",
  "HeyLady!",
  "Everyday Speech",
  "Versus",
  "Clockwork",
];

export const cases: CaseStudy[] = [
  {
    slug: "restream",
    client: "Restream",
    tags: ["B2B", "SaaS"],
    year: "2025",
    blurb: "Repositioning a live-streaming platform for the B2B era.",
    image: "/images/case-restream.png",
    services: ["Product design", "Design system", "Web design", "Development"],
    challenge:
      "Restream had outgrown its creator-first identity. Enterprise buyers could not map the product to their workflow, and the marketing site buried the three features that actually closed deals.",
    approach:
      "We rebuilt the information architecture around buying triggers, designed a component library that ships in Figma and code from one source, and produced a marketing site that demos the product above the fold.",
    metrics: [
      { value: "+38%", label: "Trial activation" },
      { value: "2.1x", label: "Demo requests" },
      { value: "-41%", label: "Time to first stream" },
    ],
  },
  {
    slug: "siren",
    client: "Siren",
    tags: ["Security", "Mobile"],
    year: "2025",
    blurb: "A security app that feels calm at the worst possible moment.",
    image: "/images/case-siren.png",
    services: ["Mobile UX", "Brand identity", "Motion design"],
    challenge:
      "Siren's incident tooling was powerful but alarming — literally. Alerts, thresholds and escalation trees created panic instead of clarity for on-call engineers.",
    approach:
      "We designed a severity-first mobile language: one glanceable state, one thumb-reachable action. The brand system trades sirens and red for graded light, so urgency is communicated without adrenaline.",
    metrics: [
      { value: "4.9★", label: "App Store rating" },
      { value: "-52%", label: "Ack time" },
      { value: "+64%", label: "Weekly actives" },
    ],
  },
  {
    slug: "blockearner",
    client: "BlockEarner",
    tags: ["Fintech", "Web3"],
    year: "2024",
    blurb: "Regulated crypto products that traditional finance trusts.",
    image: "/images/case-blockearner.png",
    services: ["Product strategy", "UX design", "Web design", "Compliance UX"],
    challenge:
      "Crypto-native design language was actively hurting trust with regulated partners and retail investors who had been burned before.",
    approach:
      "We borrowed the visual grammar of private banking — restraint, disclosure, editorial typography — and paired it with an onboarding flow that surfaces risk before reward at every step.",
    metrics: [
      { value: "+127%", label: "Funded accounts" },
      { value: "-33%", label: "Onboarding drop-off" },
      { value: "6 wks", label: "To launch" },
    ],
  },
  {
    slug: "owkin",
    client: "Owkin",
    tags: ["AI", "B2B", "B2C"],
    year: "2024",
    blurb: "Making explainable AI legible to clinicians and patients.",
    image: "/images/case-owkin.png",
    services: ["Data visualisation", "Product design", "Brand system"],
    challenge:
      "Owkin's models produce insights no clinician can act on unless the reasoning is visible. The interface had to explain itself to two very different audiences at once.",
    approach:
      "We built a visualisation system that layers from summary to evidence, letting a physician skim a recommendation in seconds and a researcher interrogate the underlying cohorts in minutes.",
    metrics: [
      { value: "3 layers", label: "Of explainability" },
      { value: "+45%", label: "Task success" },
      { value: "12", label: "Hospital pilots" },
    ],
  },
];

export const awards = [
  { name: "CSS Design Awards", note: "12x Site of the Day" },
  { name: "Awwwards", note: "8x Site of the Day" },
  { name: "Webby Awards", note: "Honoree 2025" },
  { name: "W3 Awards", note: "4x Gold" },
  { name: "CSS Winner", note: "Best of the Month" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  tint: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The pace was the surprise. We had a full site rebuild in production before our last agency would have finished arguing about wireframes.",
    name: "Winston Chenery",
    role: "Senior Director of Marketing, Everyday Speech",
    tint: "from-accent to-accent-2",
  },
  {
    quote:
      "Clear scope, clear dates, no drama. Any design or build work we take on from here goes to this team first.",
    name: "Ryan Mick",
    role: "Head of Product Design, TrueMed",
    tint: "from-accent-2 to-[#4dd0ff]",
  },
  {
    quote:
      "They arrived as designers and left as teammates. Most usefully, they pushed back on us when we were wrong about our own users.",
    name: "Shah Turner",
    role: "Co-founder, HeyLady!",
    tint: "from-[#ffb547] to-accent",
  },
  {
    quote:
      "Process, design and code all held together. That combination is rarer than agencies like to admit.",
    name: "Jason Heiber",
    role: "Founder, Morpheus Media",
    tint: "from-accent to-[#7cffb2]",
  },
  {
    quote:
      "Every milestone landed on the day it was promised. For a funded startup that isn't a perk — it's the entire engagement.",
    name: "Anna Murphy",
    role: "Director of Marketing, LiveSchool",
    tint: "from-[#4dd0ff] to-accent-2",
  },
  {
    quote:
      "They took a dense compliance product and made it something our customers genuinely enjoy. Activation moved in week one.",
    name: "David Kemmerer",
    role: "CEO & Co-Founder, CoinLedger",
    tint: "from-accent-2 to-accent",
  },
];

export const reelFrames = [
  { image: "/images/case-restream.png", word: "PRODUCT", sub: "SaaS platforms & dashboards" },
  { image: "/images/case-siren.png", word: "MOBILE", sub: "Security people actually trust" },
  { image: "/images/case-blockearner.png", word: "FINTECH", sub: "Compliance-safe money products" },
  { image: "/images/case-owkin.png", word: "AI", sub: "Interfaces for complex models" },
];

export const servicesTicker = [
  "Product design",
  "Brand identity",
  "Web design",
  "Design systems",
  "UX research",
  "Webflow & React dev",
  "Motion design",
  "Pitch decks",
];
