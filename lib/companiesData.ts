export type CertLevel = "Anfänger" | "Fortgeschritten" | "Experte";
export type CertCategory = "Fundamentals" | "Associate" | "Expert" | "Specialty";

export type Certification = {
  id: string;
  title: string;
  description: string;
  category: CertCategory;
  level: CertLevel;
  questions: number;
  students: number;
  rating: number;
  free?: boolean;
  locked?: boolean;
};

export type LearningPath = {
  title: string;
  certCount: number;
  levelRange: string;
  progress: number | null;
};

export type Company = {
  slug: string;
  name: string;
  certCount: number;
  learningPathCount: number;
  students: string;
  rating: number;
  tagline: string;
  certs: Certification[];
  learningPaths: LearningPath[];
};

// Companies shown in the grid. `certCount` drives the badge on each tile.
// Only Microsoft has hand-authored detail content matching the approved
// design; every other company gets realistic placeholder content generated
// below so every tile is clickable and the page never 404s.
const COMPANY_SEED: { slug: string; name: string; certCount: number }[] = [
  { slug: "microsoft", name: "Microsoft", certCount: 12 },
  { slug: "aws", name: "AWS", certCount: 15 },
  { slug: "google-cloud", name: "Google Cloud", certCount: 10 },
  { slug: "cisco", name: "Cisco", certCount: 8 },
  { slug: "comptia", name: "CompTIA", certCount: 14 },
  { slug: "oracle", name: "Oracle", certCount: 9 },
  { slug: "ibm", name: "IBM", certCount: 7 },
  { slug: "linux", name: "Linux", certCount: 6 },
  { slug: "redhat", name: "Red Hat", certCount: 6 },
  { slug: "itil", name: "ITIL", certCount: 5 },
  { slug: "vmware", name: "VMware", certCount: 4 },
  { slug: "adobe", name: "Adobe", certCount: 4 },
  { slug: "eccouncil", name: "EC-Council", certCount: 6 },
  { slug: "paloalto", name: "Palo Alto Networks", certCount: 6 },
  { slug: "splunk", name: "Splunk", certCount: 4 },
  { slug: "salesforce", name: "Salesforce", certCount: 4 },
  { slug: "fortinet", name: "Fortinet", certCount: 4 },
  { slug: "huawei", name: "Huawei", certCount: 3 },
  { slug: "sap", name: "SAP", certCount: 7 },
];

const MICROSOFT_CERTS: Certification[] = [
  {
    id: "az-900",
    title: "Microsoft Azure Fundamentals",
    description: "Beschreibt Cloud-Konzepte, Azure-Services, Preise und Support.",
    category: "Fundamentals",
    level: "Anfänger",
    questions: 563,
    students: 12450,
    rating: 4.8,
    free: true,
  },
  {
    id: "az-104",
    title: "Microsoft Azure Administrator",
    description: "Verwaltet Azure Governance, Speicher, Compute und mehr.",
    category: "Associate",
    level: "Fortgeschritten",
    questions: 1245,
    students: 12230,
    rating: 4.7,
  },
  {
    id: "az-305",
    title: "Microsoft Azure Solutions Architect",
    description: "Entwirft Cloud-Lösungen, die auf Microsoft Azure laufen.",
    category: "Associate",
    level: "Fortgeschritten",
    questions: 1400,
    students: 9870,
    rating: 4.8,
  },
  {
    id: "az-400",
    title: "Microsoft Azure DevOps Engineer Expert",
    description: "Implementiert DevOps-Praktiken und Continuous-Delivery-Lösungen.",
    category: "Expert",
    level: "Fortgeschritten",
    questions: 1100,
    students: 7630,
    rating: 4.7,
    locked: true,
  },
  {
    id: "ms-900",
    title: "Microsoft 365 Fundamentals",
    description: "Beschreibt die Kernservices und Konzepte von Microsoft 365.",
    category: "Fundamentals",
    level: "Anfänger",
    questions: 321,
    students: 5940,
    rating: 4.6,
  },
];

const MICROSOFT_PATHS: LearningPath[] = [
  { title: "Azure Administrator", certCount: 4, levelRange: "Anfänger bis Fortgeschritten", progress: 65 },
  { title: "Cloud Engineer", certCount: 3, levelRange: "Fortgeschritten bis Experte", progress: 40 },
  { title: "DevOps Engineer", certCount: 3, levelRange: "Fortgeschritten", progress: 25 },
  { title: "Security Specialist", certCount: 2, levelRange: "Fortgeschritten", progress: null },
];

// Deterministic placeholder generator so every non-Microsoft company still
// renders a believable, fully-clickable detail page.
function generateCerts(company: { name: string; certCount: number }): Certification[] {
  const templates: { suffix: string; category: CertCategory; level: CertLevel }[] = [
    { suffix: "Fundamentals", category: "Fundamentals", level: "Anfänger" },
    { suffix: "Associate", category: "Associate", level: "Fortgeschritten" },
    { suffix: "Professional", category: "Expert", level: "Fortgeschritten" },
    { suffix: "Expert", category: "Expert", level: "Experte" },
    { suffix: "Specialty", category: "Specialty", level: "Experte" },
  ];
  const count = Math.min(company.certCount, 5);
  return Array.from({ length: count }).map((_, i) => {
    const t = templates[i % templates.length];
    return {
      id: `${company.name.toLowerCase().replace(/\s+/g, "-")}-${i}`,
      title: `${company.name} ${t.suffix}`,
      description: `Grundlagen- und Praxiswissen für die ${t.suffix}-Zertifizierung von ${company.name}.`,
      category: t.category,
      level: t.level,
      questions: 300 + i * 220,
      students: 1200 + i * 950,
      rating: 4.4 + (i % 3) * 0.1,
      free: i === 0,
      locked: i === templates.length - 1,
    };
  });
}

function generatePaths(company: { name: string }): LearningPath[] {
  return [
    { title: `${company.name} Einsteiger`, certCount: 2, levelRange: "Anfänger", progress: 0 },
    { title: `${company.name} Profi`, certCount: 3, levelRange: "Fortgeschritten bis Experte", progress: null },
  ];
}

export const companies: Company[] = COMPANY_SEED.map((seed) => {
  if (seed.slug === "microsoft") {
    return {
      ...seed,
      learningPathCount: 6,
      students: "8.450+",
      rating: 4.8,
      tagline: "Entdecke alle Microsoft-Zertifizierungen und bring deine Karriere voran.",
      certs: MICROSOFT_CERTS,
      learningPaths: MICROSOFT_PATHS,
    };
  }
  return {
    ...seed,
    learningPathCount: Math.max(2, Math.round(seed.certCount / 3)),
    students: `${(seed.certCount * 850).toLocaleString("de-DE")}+`,
    rating: 4.5,
    tagline: `Entdecke alle ${seed.name}-Zertifizierungen und bring deine Karriere voran.`,
    certs: generateCerts(seed),
    learningPaths: generatePaths(seed),
  };
});

export function getCompany(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export const certCategories: CertCategory[] = ["Fundamentals", "Associate", "Expert", "Specialty"];
