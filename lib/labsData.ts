// Data for the hands-on "Lab Environment" pages. `AZ104_B2C_LAB` is a fully
// authored, real lab. `generateLab` produces a sensible generic lab for any
// cert that doesn't have hand-authored content yet, using that cert's own
// title — so every company/cert gets a working, correctly-labelled page.

export type LabResource = { id: string; label: string; active: boolean };
export type LabTask = { id: string; label: string; done: boolean };

export type Lab = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationLabel: string;
  totalMinutes: number;
  tags: string[];
  goal: string;
  goalChecklist: string[];
  instructions: string[];
  details: { label: string; value: string }[];
  resources: LabResource[];
  tasks: LabTask[];
  docs: { label: string; url: string }[];
  /** When set, the lab renders a real, state-driven simulation instead of the static mock. */
  interactive?: "resource-group";
};

export const AZ900_RG_LAB: Lab = {
  id: "resource-group-basics",
  title: "Lab: Erste Ressourcengruppe erstellen",
  description:
    "Erstelle deine erste Azure-Ressourcengruppe — entweder über das Portal oder direkt per Azure CLI in der Cloud Shell. Diese Simulation prüft dein Ergebnis in Echtzeit.",
  level: "Beginner",
  durationLabel: "20-30 Minuten",
  totalMinutes: 25 * 60,
  tags: ["Online-Lab", "Echtzeit-Validierung", "Reset möglich", "Portal + CLI"],
  goal: 'Erstelle eine Ressourcengruppe namens "CC-Lab-RG" in "West Europe".',
  goalChecklist: [
    'Ressourcengruppe mit dem Namen "CC-Lab-RG" erstellen',
    "Region West Europe auswählen",
    "Ergebnis über az group list bestätigen",
  ],
  instructions: [
    'Klicke im simulierten Azure-Portal auf "Create" oder nutze die Cloud Shell unten.',
    'Portal: Fülle "Resource group name" mit CC-Lab-RG und wähle West Europe als Region.',
    'CLI: az group create --name CC-Lab-RG --location westeurope',
    "Bestätige dein Ergebnis — die Checkliste rechts aktualisiert sich automatisch.",
  ],
  details: [
    { label: "Azure Region", value: "West Europe" },
    { label: "Benötigte Rollen", value: "Mitwirkender" },
    { label: "Ziel-Ressourcengruppe", value: "CC-Lab-RG" },
    { label: "Ressourcen", value: "1" },
    { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
  ],
  resources: [{ id: "r1", label: "Resource Group (noch nicht erstellt)", active: false }],
  tasks: [
    { id: "rg-created", label: 'Ressourcengruppe "CC-Lab-RG" erstellt', done: false },
    { id: "rg-region", label: "Region West Europe korrekt gesetzt", done: false },
  ],
  docs: [
    {
      label: "Was ist eine Ressourcengruppe?",
      url: "https://learn.microsoft.com/de-de/azure/azure-resource-manager/management/overview",
    },
    { label: "az group create Referenz", url: "https://learn.microsoft.com/de-de/cli/azure/group" },
  ],
};

export const AZ104_B2C_LAB: Lab = {
  id: "b2c-identitaeten",
  title: "Lab: Verwalten von Azure-Identitäten (B2C)",
  description: "Konfigurieren und verwalten Sie Azure AD B2C für externe Benutzer (B2C = Business to Customer).",
  level: "Intermediate",
  durationLabel: "90-120 Minuten",
  totalMinutes: 119 * 60 + 32,
  tags: ["Online-Lab", "Sichere Umgebung", "Reset möglich", "Auto-Validierung", "Schritt-für-Schritt-Anleitung"],
  goal: "Konfigurieren Sie Azure AD B2C für externe Benutzer.",
  goalChecklist: [
    "B2C-Tenant erstellen",
    "Benutzerflow für Registrierung und Anmeldung",
    "Verifizierungsmethoden (E-Mail)",
    "Testen der Registrierung und Anmeldung",
  ],
  instructions: [
    "Erstellen Sie einen Azure AD B2C Tenant.",
    "Konfigurieren Sie einen Sign-up/Sign-in-Benutzerflow.",
    "Aktivieren Sie die E-Mail-Verifizierung.",
    "Testen Sie die Registrierung und Anmeldung.",
    "Überprüfen Sie die Benutzer im Azure Portal.",
  ],
  details: [
    { label: "Azure Region", value: "West Europe" },
    { label: "Benötigte Rollen", value: "Globaler Administrator" },
    { label: "Ressourcengruppe", value: "CC-Lab-RG" },
    { label: "Ressourcen", value: "4" },
    { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
  ],
  resources: [
    { id: "r1", label: "Azure AD B2C Tenant", active: true },
    { id: "r2", label: "Web App (Demo)", active: true },
    { id: "r3", label: "Storage Account", active: true },
    { id: "r4", label: "App Service Plan", active: true },
  ],
  tasks: [
    { id: "t1", label: "B2C Tenant erstellen", done: true },
    { id: "t2", label: "Benutzerflow erstellen", done: true },
    { id: "t3", label: "E-Mail-Verifizierung aktivieren", done: true },
    { id: "t4", label: "Registrierung testen", done: true },
    { id: "t5", label: "Anmeldung testen", done: false },
  ],
  docs: [
    { label: "Azure AD B2C Documentation", url: "https://learn.microsoft.com/de-de/azure/active-directory-b2c/" },
    { label: "Tutorial: Azure AD B2C", url: "https://learn.microsoft.com/de-de/azure/active-directory-b2c/tutorial-create-tenant" },
    { label: "Best Practices für Identität", url: "https://learn.microsoft.com/de-de/azure/active-directory-b2c/best-practices" },
  ],
};

const LABS: Record<string, Lab> = {
  "az-104": AZ104_B2C_LAB,
  "az-900": AZ900_RG_LAB,
};

function generateLab(certId: string, certTitle: string, level: string): Lab {
  return {
    id: `${certId}-praxis-lab`,
    title: `Lab: Praxisübung zu ${certTitle}`,
    description: `Wende die Konzepte von „${certTitle}“ in einer echten, isolierten Cloud-Umgebung an.`,
    level: (level as Lab["level"]) ?? "Beginner",
    durationLabel: "45-60 Minuten",
    totalMinutes: 50 * 60,
    tags: ["Online-Lab", "Sichere Umgebung", "Reset möglich", "Schritt-für-Schritt-Anleitung"],
    goal: `Setze die Kernkonzepte von ${certTitle} praktisch um.`,
    goalChecklist: ["Umgebung vorbereiten", "Ressource konfigurieren", "Ergebnis überprüfen"],
    instructions: [
      "Öffnen Sie die virtuelle Umgebung.",
      "Folgen Sie den Schritt-für-Schritt-Anweisungen.",
      "Überprüfen Sie Ihr Ergebnis mit der Validierung.",
    ],
    details: [
      { label: "Azure Region", value: "West Europe" },
      { label: "Benötigte Rollen", value: "Mitwirkender" },
      { label: "Ressourcengruppe", value: `${certId.toUpperCase()}-Lab-RG` },
      { label: "Ressourcen", value: "2" },
      { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
    ],
    resources: [
      { id: "r1", label: "Demo-Ressource 1", active: true },
      { id: "r2", label: "Demo-Ressource 2", active: true },
    ],
    tasks: [
      { id: "t1", label: "Umgebung vorbereiten", done: false },
      { id: "t2", label: "Ressource konfigurieren", done: false },
      { id: "t3", label: "Ergebnis validieren", done: false },
    ],
    docs: [],
  };
}

export function getLab(certId: string, certTitle: string, level: string): Lab {
  return LABS[certId] ?? generateLab(certId, certTitle, level);
}
