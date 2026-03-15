export type SponsorTierId = "diamond" | "platinum" | "grand" | "partners" | "supporters";

export type SponsorTier = {
  id: SponsorTierId;
  title: string;
  subtitle: string;
  accent: string;
};

export type Sponsor = {
  id: string;
  name: string;
  tier: SponsorTierId;
  description: string;
  website?: string;
  logoPath: string;
};

export const tierOrder: SponsorTierId[] = [
  "diamond",
  "platinum",
  "grand",
  "partners",
  "supporters",
];

export const sponsorTiers: Record<SponsorTierId, SponsorTier> = {
  diamond: {
    id: "diamond",
    title: "Diamond Sponsor",
    subtitle: "Premier strategic supporter of TEDxNTUA 2026",
    accent: "#a5e9ff",
  },
  platinum: {
    id: "platinum",
    title: "Platinum Sponsors",
    subtitle: "Core partners powering the event experience",
    accent: "#e5e7eb",
  },
  grand: {
    id: "grand",
    title: "Grand Sponsors",
    subtitle: "Major contributors enabling our impact",
    accent: "#f5b01e",
  },
  partners: {
    id: "partners",
    title: "Partners",
    subtitle: "Trusted collaborators across operations",
    accent: "#22c55e",
  },
  supporters: {
    id: "supporters",
    title: "Supporters",
    subtitle: "Valued allies behind every TEDxNTUA moment",
    accent: "#60a5fa",
  },
};

export const sponsors: Sponsor[] = [
  {
    id: "dei",
    name: "DEI (ΔΕΗ)",
    tier: "diamond",
    description: "Leading Greece's energy transition and supporting bold ideas with national-scale impact.",
    website: "https://www.dei.gr/",
    logoPath: "/sponsors/diamond/dei.png",
  },
  {
    id: "oliver-wyman",
    name: "Oliver Wyman",
    tier: "platinum",
    description: "Global management consulting expertise helping shape strategy for tomorrow's leaders.",
    website: "https://www.oliverwyman.com/",
    logoPath: "/sponsors/platinum/oliver-wyman.png",
  },
  {
    id: "deree",
    name: "Deree",
    tier: "platinum",
    description: "A dynamic academic community empowering innovation, thought leadership, and talent growth.",
    website: "https://www.acg.edu/",
    logoPath: "/sponsors/platinum/deree.png",
  },
  {
    id: "dialectica",
    name: "Dialectica",
    tier: "platinum",
    description: "A fast-scaling knowledge-sharing platform accelerating decisions through global expertise.",
    website: "https://dialecticanet.com/",
    logoPath: "/sponsors/platinum/dialectica.png",
  },
  {
    id: "alpha-bank",
    name: "Alpha Bank",
    tier: "platinum",
    description: "Supporting entrepreneurship, financial progress, and a future-ready Greek ecosystem.",
    website: "https://www.alpha.gr/",
    logoPath: "/sponsors/platinum/alpha-bank.png",
  },
  {
    id: "iknowhow",
    name: "Iknowhow",
    tier: "platinum",
    description: "Driving digital transformation and communication with high-performance creative technology.",
    website: "https://www.iknowhow.com/",
    logoPath: "/sponsors/platinum/iknowhow.png",
  },
  {
    id: "pwc",
    name: "PwC",
    tier: "grand",
    description: "Providing trusted business insight and advisory excellence for meaningful growth.",
    website: "https://www.pwc.com/gr/en.html",
    logoPath: "/sponsors/grand/pwc.png",
  },
  {
    id: "afis",
    name: "AFIS (ΑΦΗΣ)",
    tier: "partners",
    description: "Promoting sustainable recycling culture and practical environmental responsibility.",
    website: "https://afis.gr/",
    logoPath: "/sponsors/partners/afis.png",
  },
  {
    id: "symetal",
    name: "Symetal",
    tier: "supporters",
    description: "Industrial innovation with strong commitment to quality and sustainable manufacturing.",
    website: "https://www.symetal.gr/",
    logoPath: "/sponsors/supporters/symetal.png",
  },
  {
    id: "elliniki-paragogi",
    name: "Elliniki Paragogi (Ελληνική Παραγωγή)",
    tier: "supporters",
    description: "Championing Greek production and the strength of local business networks.",
    website: "https://www.ellinikyparagogi.gr/",
    logoPath: "/sponsors/supporters/elliniki-paragogi.png",
  },
  {
    id: "helintech",
    name: "HELINTECH",
    tier: "supporters",
    description: "Technology partner enabling practical innovation and reliable execution.",
    logoPath: "/sponsors/supporters/helintech.png",
  },
  {
    id: "iky",
    name: "IKY",
    tier: "supporters",
    description: "Supporting educational excellence and opportunities for the next generation.",
    website: "https://www.iky.gr/",
    logoPath: "/sponsors/supporters/iky.png",
  },
];
