// Sample data for the "Lernen" (module list) page. This is intentionally a
// small, hand-authored set of modules per cert — enough to make the UI real
// and navigable, not the full published curriculum. Extend LEARN_TRACKS with
// more certIds / modules / lessons as real content is written.

export type LessonType = "video" | "quiz" | "reading";

export type Lesson = {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  completed: boolean;
};

export type Module = {
  id: string;
  number: number;
  title: string;
  description: string;
  lessons: Lesson[];
  locked: boolean;
  lockedHint?: string;
};

export type LearnTrack = {
  certId: string;
  modules: Module[];
};

function pct(modules: Module[]): number {
  const total = modules.reduce((n, m) => n + m.lessons.length, 0);
  const done = modules.reduce((n, m) => n + m.lessons.filter((l) => l.completed).length, 0);
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

const AZ900_MODULES: Module[] = [
  {
    id: "einfuehrung",
    number: 1,
    title: "Einführung in Azure",
    description: "Grundlagen von Azure, globale Infrastruktur, Regionen und Verfügbarkeitszonen.",
    locked: false,
    lessons: [
      { id: "l1", title: "Was ist Cloud Computing?", type: "video", duration: "8 Min", completed: true },
      { id: "l2", title: "Azure-Regionen und Availability Zones", type: "video", duration: "12 Min", completed: true },
      { id: "l3", title: "Ressourcengruppen und Abonnements", type: "reading", duration: "10 Min", completed: true },
      { id: "l4", title: "Quiz: Grundlagen", type: "quiz", duration: "10 Fragen", completed: true },
    ],
  },
  {
    id: "kernservices",
    number: 2,
    title: "Kern-Services von Azure",
    description: "Compute, Storage, Netzwerk und Datenbank-Services im Überblick.",
    locked: false,
    lessons: [
      { id: "l1", title: "Virtuelle Maschinen", type: "video", duration: "15 Min", completed: true },
      { id: "l2", title: "App Services & Container", type: "video", duration: "14 Min", completed: false },
      { id: "l3", title: "Speicheroptionen im Vergleich", type: "reading", duration: "9 Min", completed: false },
      { id: "l4", title: "Quiz: Kern-Services", type: "quiz", duration: "12 Fragen", completed: false },
    ],
  },
  {
    id: "sicherheit",
    number: 3,
    title: "Sicherheit, Compliance und Vertrauen",
    description: "Identitätsverwaltung, Governance-Tools und Compliance-Angebote von Azure.",
    locked: false,
    lessons: [
      { id: "l1", title: "Microsoft Entra ID Grundlagen", type: "video", duration: "11 Min", completed: false },
      { id: "l2", title: "Azure Policy und RBAC", type: "reading", duration: "13 Min", completed: false },
      { id: "l3", title: "Quiz: Sicherheit & Compliance", type: "quiz", duration: "10 Fragen", completed: false },
    ],
  },
  {
    id: "preise",
    number: 4,
    title: "Kosten und Support",
    description: "Preismodelle, Kostenverwaltung und Azure-Supportpläne.",
    locked: true,
    lockedHint: "Schließe Modul 3 ab, um freizuschalten",
    lessons: [
      { id: "l1", title: "Preiskalkulator und TCO", type: "video", duration: "9 Min", completed: false },
      { id: "l2", title: "Supportpläne im Vergleich", type: "reading", duration: "6 Min", completed: false },
      { id: "l3", title: "Quiz: Kosten & Support", type: "quiz", duration: "8 Fragen", completed: false },
    ],
  },
];

const AZ104_MODULES: Module[] = [
  {
    id: "einfuehrung",
    number: 1,
    title: "Einführung in Azure",
    description: "Grundlagen von Azure, globale Infrastruktur, Regionen und Verfügbarkeitszonen.",
    locked: false,
    lessons: [
      { id: "l1", title: "Azure Administrator: Rolle & Aufgaben", type: "video", duration: "10 Min", completed: true },
      { id: "l2", title: "Azure-Ressourcenhierarchie", type: "video", duration: "9 Min", completed: true },
      { id: "l3", title: "Azure CLI & PowerShell im Überblick", type: "reading", duration: "12 Min", completed: true },
      { id: "l4", title: "Quiz: Grundlagen", type: "quiz", duration: "15 Fragen", completed: true },
    ],
  },
  {
    id: "identitaeten",
    number: 2,
    title: "Azure Identity und Access Management",
    description: "Verwalten von Benutzern, Gruppen, Rollen und Zugriffssteuerung mit Azure AD.",
    locked: false,
    lessons: [
      { id: "l1", title: "Benutzer und Gruppen verwalten", type: "video", duration: "13 Min", completed: true },
      { id: "l2", title: "Rollenbasierte Zugriffssteuerung (RBAC)", type: "video", duration: "16 Min", completed: true },
      { id: "l3", title: "Bedingter Zugriff", type: "reading", duration: "11 Min", completed: true },
      { id: "l4", title: "Quiz: Identity & Access", type: "quiz", duration: "20 Fragen", completed: true },
    ],
  },
  {
    id: "governance",
    number: 3,
    title: "Azure Governance und Compliance",
    description: "Verwalten von Richtlinien, Rollenzuweisungen und Compliance in Azure.",
    locked: false,
    lessons: [
      { id: "l1", title: "Azure Policy Grundlagen", type: "video", duration: "12:45", completed: true },
      { id: "l2", title: "Rollenzuweisungen in Azure", type: "video", duration: "18:30", completed: true },
      { id: "l3", title: "Compliance und Standards", type: "reading", duration: "20:00", completed: false },
      { id: "l4", title: "Identitätsgovernance", type: "video", duration: "15:10", completed: false },
      { id: "l5", title: "Quiz: Governance Grundlagen", type: "quiz", duration: "10 Fragen", completed: false },
    ],
  },
  {
    id: "speicher",
    number: 4,
    title: "Azure Speicherlösungen",
    description: "Überblick über Blob Storage, Files, Queues und Tables in Azure.",
    locked: true,
    lockedHint: "Schließe Modul 3 ab, um freizuschalten",
    lessons: [
      { id: "l1", title: "Blob Storage Grundlagen", type: "video", duration: "14 Min", completed: false },
      { id: "l2", title: "Azure Files und Storage-Freigaben", type: "video", duration: "10 Min", completed: false },
      { id: "l3", title: "Quiz: Speicherlösungen", type: "quiz", duration: "15 Fragen", completed: false },
    ],
  },
];

export const LEARN_TRACKS: Record<string, LearnTrack> = {
  "az-900": { certId: "az-900", modules: AZ900_MODULES },
  "az-104": { certId: "az-104", modules: AZ104_MODULES },
};

export function getLearnTrack(certId: string): LearnTrack | undefined {
  return LEARN_TRACKS[certId];
}

export function getLearnProgress(certId: string): number {
  const track = LEARN_TRACKS[certId];
  return track ? pct(track.modules) : 0;
}
