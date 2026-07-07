export type CertLevel = "Beginner" | "Intermediate" | "Advanced";

export type CertCategoryIcon = "cloud" | "security" | "ai" | "data" | "m365" | "layers";

export type Certification = {
  id: string;
  code: string;
  title: string;
  description: string;
  categoryKey: string;
  level: CertLevel;
  progress: number; // 0-100
  free?: boolean;
  locked?: boolean;
};

export type CertCategoryDef = {
  key: string;
  label: string;
  icon: CertCategoryIcon;
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
  totalCertCount: number;
  learningPathCount: number;
  students: string;
  rating: number;
  tagline: string;
  categories: CertCategoryDef[];
  certs: Certification[];
  learningPaths: LearningPath[];
};

// Companies shown in the grid. `certCount` drives the badge on the tile in
// the /certifications overview. Only Microsoft has hand-authored detail
// content matching the approved design; every other company gets realistic
// placeholder content generated below so every tile is clickable and the
// detail page never 404s.
const COMPANY_SEED: { slug: string; name: string; certCount: number }[] = [
  { slug: "microsoft", name: "Microsoft", certCount: 58 },
  { slug: "aws", name: "AWS", certCount: 15 },
  { slug: "google-cloud", name: "Google Cloud", certCount: 10 },
  { slug: "cisco", name: "Cisco", certCount: 8 },
  { slug: "comptia", name: "CompTIA", certCount: 14 },
  { slug: "oracle", name: "Oracle", certCount: 9 },
  { slug: "ibm", name: "IBM", certCount: 7 },
  { slug: "linux", name: "Linux", certCount: 6 },
  { slug: "docker", name: "Docker", certCount: 4 },
  { slug: "kubernetes", name: "Kubernetes", certCount: 4 },
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

// ---------------------------------------------------------------------------
// Microsoft — hand-authored to match the approved design exactly.
// ---------------------------------------------------------------------------

const MICROSOFT_CATEGORIES: CertCategoryDef[] = [
  { key: "azure", label: "Azure", icon: "cloud" },
  { key: "security", label: "Security", icon: "security" },
  { key: "ai", label: "AI", icon: "ai" },
  { key: "data", label: "Data", icon: "data" },
  { key: "m365", label: "Microsoft 365", icon: "m365" },
];

const MICROSOFT_CERTS: Certification[] = [
  // Azure (15) — first 9 match the approved mockup card-for-card.
  { id: "az-104", code: "AZ-104", title: "Azure Administrator Associate", description: "Verwaltet Azure-Identitäten, Governance, Speicher und mehr.", categoryKey: "azure", level: "Intermediate", progress: 20 },
  { id: "az-900", code: "AZ-900", title: "Azure Fundamentals", description: "Grundlegende Cloud-Konzepte und -Dienste verstehen.", categoryKey: "azure", level: "Beginner", progress: 35, free: true },
  { id: "ab-900", code: "AB-900", title: "AB-900 Grundlagen", description: "Wird bald mit eigenem Kursmaterial befüllt.", categoryKey: "azure", level: "Beginner", progress: 0, free: true },
  { id: "az-305", code: "AZ-305", title: "Azure Solutions Architect Expert", description: "Entwerfen und Optimieren von Lösungen auf Azure.", categoryKey: "azure", level: "Advanced", progress: 10 },
  { id: "az-204", code: "AZ-204", title: "Azure Developer Associate", description: "Entwickeln von Lösungen auf Microsoft Azure.", categoryKey: "azure", level: "Intermediate", progress: 15 },
  { id: "az-400", code: "AZ-400", title: "DevOps Engineer Expert", description: "Entwerfen und Implementieren von DevOps-Prozessen.", categoryKey: "azure", level: "Advanced", progress: 5 },
  { id: "az-500", code: "AZ-500", title: "Azure Security Engineer Associate", description: "Implementieren von Sicherheitskontrollen und Schutzmaßnahmen.", categoryKey: "azure", level: "Intermediate", progress: 0 },
  { id: "az-700", code: "AZ-700", title: "Azure Network Engineer Associate", description: "Implementieren von Netzwerklösungen auf Microsoft Azure.", categoryKey: "azure", level: "Intermediate", progress: 0 },
  { id: "az-800", code: "AZ-800", title: "Windows Server Hybrid Administrator", description: "Verwalten von Hybridumgebungen mit Windows Server.", categoryKey: "azure", level: "Intermediate", progress: 0 },
  { id: "dp-900", code: "DP-900", title: "Azure Data Fundamentals", description: "Grundlegende Datenkonzepte und -dienste in Azure.", categoryKey: "azure", level: "Beginner", progress: 10 },
  { id: "az-801", code: "AZ-801", title: "Windows Server Hybrid Advanced Administrator", description: "Fortgeschrittene Verwaltung hybrider Windows-Server-Umgebungen.", categoryKey: "azure", level: "Advanced", progress: 0, locked: true },
  { id: "az-140", code: "AZ-140", title: "Azure Virtual Desktop Specialty", description: "Planen und Konfigurieren einer Azure-Virtual-Desktop-Infrastruktur.", categoryKey: "azure", level: "Intermediate", progress: 0 },
  { id: "az-120", code: "AZ-120", title: "Cloud Data Center Specialist", description: "Verwalten von Microsoft-Cloud-Rechenzentrumslösungen.", categoryKey: "azure", level: "Advanced", progress: 0, locked: true },
  { id: "az-220", code: "AZ-220", title: "Azure IoT Developer Specialty", description: "Entwerfen und Implementieren von IoT-Lösungen auf Azure.", categoryKey: "azure", level: "Intermediate", progress: 0 },
  { id: "az-600", code: "AZ-600", title: "Azure Stack Hub Operator", description: "Konfigurieren und Betreiben von Azure Stack Hub.", categoryKey: "azure", level: "Advanced", progress: 0, locked: true },
  { id: "az-720", code: "AZ-720", title: "Azure Connectivity Troubleshooter", description: "Beheben von Netzwerkverbindungsproblemen in Azure.", categoryKey: "azure", level: "Intermediate", progress: 0 },

  // Security (8)
  { id: "sc-900", code: "SC-900", title: "Security, Compliance & Identity Fundamentals", description: "Grundlagen von Sicherheit, Compliance und Identität in Microsoft-Diensten.", categoryKey: "security", level: "Beginner", progress: 40, free: true },
  { id: "sc-200", code: "SC-200", title: "Security Operations Analyst", description: "Erkennen, Untersuchen und Reagieren auf Bedrohungen.", categoryKey: "security", level: "Intermediate", progress: 0 },
  { id: "sc-300", code: "SC-300", title: "Identity and Access Administrator", description: "Entwerfen und Implementieren von Identitätslösungen.", categoryKey: "security", level: "Intermediate", progress: 0 },
  { id: "sc-400", code: "SC-400", title: "Information Protection Administrator", description: "Schützen von Informationen in Microsoft-365-Umgebungen.", categoryKey: "security", level: "Intermediate", progress: 0 },
  { id: "sc-100", code: "SC-100", title: "Cybersecurity Architect Expert", description: "Entwerfen von Cybersicherheitsstrategien für Unternehmen.", categoryKey: "security", level: "Advanced", progress: 0, locked: true },
  { id: "md-102", code: "MD-102", title: "Endpoint Administrator", description: "Verwalten und Schützen von Geräten in Unternehmen.", categoryKey: "security", level: "Intermediate", progress: 0 },
  { id: "sc-401", code: "SC-401", title: "Information Security Administrator", description: "Implementieren von Datensicherheits- und Compliance-Lösungen.", categoryKey: "security", level: "Intermediate", progress: 0 },
  { id: "sc-5001", code: "SC-5001", title: "Security Operations Specialty", description: "Fortgeschrittene Bedrohungserkennung mit Microsoft-Sicherheitstools.", categoryKey: "security", level: "Advanced", progress: 0, locked: true },

  // AI (6)
  { id: "ai-900", code: "AI-900", title: "Azure AI Fundamentals", description: "Grundlegende Konzepte von KI und maschinellem Lernen.", categoryKey: "ai", level: "Beginner", progress: 55, free: true },
  { id: "ai-102", code: "AI-102", title: "Azure AI Engineer Associate", description: "Entwerfen und Implementieren von KI-Lösungen auf Azure.", categoryKey: "ai", level: "Intermediate", progress: 0 },
  { id: "ai-fdc", code: "AI-FDC", title: "Copilot Fundamentals", description: "Grundlagen der Nutzung von Microsoft Copilot im Arbeitsalltag.", categoryKey: "ai", level: "Beginner", progress: 20 },
  { id: "dp-100", code: "DP-100", title: "Azure Data Scientist Associate", description: "Entwerfen und Implementieren von Machine-Learning-Lösungen.", categoryKey: "ai", level: "Intermediate", progress: 0 },
  { id: "ai-102x", code: "AI-102X", title: "AI Solutions Architect Expert", description: "Architektur großskaliger KI-Lösungen für Unternehmen.", categoryKey: "ai", level: "Advanced", progress: 0, locked: true },
  { id: "pl-300ai", code: "PL-300", title: "Power BI Data Analyst", description: "Aufbereiten, Modellieren und Visualisieren von Daten mit Power BI.", categoryKey: "ai", level: "Intermediate", progress: 0 },

  // Data (7)
  { id: "dp-203", code: "DP-203", title: "Azure Data Engineer Associate", description: "Entwerfen und Implementieren von Datenlösungen auf Azure.", categoryKey: "data", level: "Intermediate", progress: 0 },
  { id: "dp-300", code: "DP-300", title: "Azure Database Administrator", description: "Verwalten relationaler Datenbanken in der Cloud.", categoryKey: "data", level: "Intermediate", progress: 0 },
  { id: "dp-420", code: "DP-420", title: "Cosmos DB Developer Specialty", description: "Entwerfen und Implementieren von Cosmos-DB-Lösungen.", categoryKey: "data", level: "Advanced", progress: 0, locked: true },
  { id: "dp-500", code: "DP-500", title: "Enterprise Data Analyst Associate", description: "Skalierbare Analyselösungen mit Azure und Power BI.", categoryKey: "data", level: "Intermediate", progress: 0 },
  { id: "dp-600", code: "DP-600", title: "Fabric Analytics Engineer Associate", description: "Aufbau von Analytics-Lösungen mit Microsoft Fabric.", categoryKey: "data", level: "Intermediate", progress: 0 },
  { id: "dp-700", code: "DP-700", title: "Fabric Data Engineer Associate", description: "Implementieren von Dateningenieur-Lösungen mit Microsoft Fabric.", categoryKey: "data", level: "Intermediate", progress: 0 },
  { id: "pl-300", code: "PL-300", title: "Power BI Data Analyst Associate", description: "Datenmodellierung und -visualisierung mit Power BI.", categoryKey: "data", level: "Beginner", progress: 30 },

  // Microsoft 365 (5)
  { id: "ms-900", code: "MS-900", title: "Microsoft 365 Fundamentals", description: "Grundlegende Konzepte und Kernservices von Microsoft 365.", categoryKey: "m365", level: "Beginner", progress: 60, free: true },
  { id: "ms-102", code: "MS-102", title: "Microsoft 365 Administrator", description: "Verwalten von Diensten, Sicherheit und Compliance in Microsoft 365.", categoryKey: "m365", level: "Intermediate", progress: 0 },
  { id: "md-1021", code: "MD-102", title: "Endpoint Administrator Associate", description: "Bereitstellen und Verwalten von Geräten in Microsoft 365.", categoryKey: "m365", level: "Intermediate", progress: 0 },
  { id: "mo-201", code: "MO-201", title: "Excel Expert Associate", description: "Fortgeschrittene Datenanalyse und Automatisierung in Excel.", categoryKey: "m365", level: "Intermediate", progress: 0 },
  { id: "ms-700", code: "MS-700", title: "Teams Administrator Associate", description: "Planen und Verwalten von Microsoft-Teams-Umgebungen.", categoryKey: "m365", level: "Intermediate", progress: 0 },
];

const MICROSOFT_PATHS: LearningPath[] = [
  { title: "Azure Administrator", certCount: 4, levelRange: "Anfänger bis Fortgeschritten", progress: 65 },
  { title: "Cloud Engineer", certCount: 3, levelRange: "Fortgeschritten bis Experte", progress: 40 },
  { title: "DevOps Engineer", certCount: 3, levelRange: "Fortgeschritten", progress: 25 },
  { title: "Security Specialist", certCount: 2, levelRange: "Fortgeschritten", progress: null },
];

// ---------------------------------------------------------------------------
// Placeholder generator for every other company, using the same shape as
// Microsoft so the detail page renders identically for all of them.
// ---------------------------------------------------------------------------

const GENERIC_CATEGORIES: CertCategoryDef[] = [
  { key: "fundamentals", label: "Fundamentals", icon: "layers" },
  { key: "associate", label: "Associate", icon: "cloud" },
  { key: "security", label: "Security", icon: "security" },
  { key: "expert", label: "Expert", icon: "ai" },
];

function generateCerts(company: { slug: string; name: string; certCount: number }): Certification[] {
  const levels: CertLevel[] = ["Beginner", "Intermediate", "Advanced"];
  const count = Math.max(4, Math.min(company.certCount, 16));
  return Array.from({ length: count }).map((_, i) => {
    const cat = GENERIC_CATEGORIES[i % GENERIC_CATEGORIES.length];
    const level = levels[Math.min(i % levels.length, cat.key === "fundamentals" ? 0 : 2)];
    const prefix = company.name.slice(0, 2).toUpperCase();
    return {
      id: `${company.slug}-${i}`,
      code: `${prefix}-${100 + i * 10}`,
      title: `${company.name} ${cat.label} ${i + 1}`,
      description: `Grundlagen- und Praxiswissen für die ${cat.label}-Zertifizierung von ${company.name}.`,
      categoryKey: cat.key,
      level,
      progress: i === 0 ? 25 : 0,
      free: i === 0,
      locked: i === count - 1 && count > 5,
    };
  });
}

function generateCategories(certs: Certification[]): CertCategoryDef[] {
  const present = new Set(certs.map((c) => c.categoryKey));
  return GENERIC_CATEGORIES.filter((c) => present.has(c.key));
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
      totalCertCount: seed.certCount,
      learningPathCount: 6,
      students: "8.450+",
      rating: 4.8,
      tagline: "Entdecke alle Microsoft-Zertifizierungen und bring deine Karriere voran.",
      categories: MICROSOFT_CATEGORIES,
      certs: MICROSOFT_CERTS,
      learningPaths: MICROSOFT_PATHS,
    };
  }
  const certs = generateCerts(seed);
  return {
    ...seed,
    totalCertCount: certs.length,
    learningPathCount: Math.max(2, Math.round(seed.certCount / 3)),
    students: `${(seed.certCount * 850).toLocaleString("de-DE")}+`,
    rating: 4.5,
    tagline: `Entdecke alle ${seed.name}-Zertifizierungen und bring deine Karriere voran.`,
    categories: generateCategories(certs),
    certs,
    learningPaths: generatePaths(seed),
  };
});

// Learn / Labs / Practice are currently only rolled out for Microsoft's 16
// Azure-track certifications (categoryKey === "azure"). Every other company
// and every other Microsoft category (security, ai, data, m365, ...) still
// shows the Lernpfad overview, just without these three sub-pages yet.
// Extend this list deliberately as real content is authored for more certs.
export function getAzureLearnRolloutParams(): { company: string; certId: string }[] {
  const company = getCompany("microsoft");
  if (!company) return [];
  return company.certs.filter((c) => c.categoryKey === "azure").map((c) => ({ company: "microsoft", certId: c.id }));
}

export function isAzureLearnRolloutCert(companySlug: string, certId: string): boolean {
  if (companySlug !== "microsoft") return false;
  const company = getCompany(companySlug);
  const cert = company?.certs.find((c) => c.id === certId);
  return cert?.categoryKey === "azure";
}

export function getCompany(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}
