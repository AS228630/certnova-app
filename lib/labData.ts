export type ChecklistItem = { id: string; label: string; done: boolean };
export type LabResource = { name: string; status: "Aktiv" | "Inaktiv" };

export type LabContent = {
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  goal: string;
  objectives: string[];
  instructions: string[];
  details: { label: string; value: string }[];
  resources: LabResource[];
  checklist: ChecklistItem[];
  docs: string[];
  totalMinutes: number;
};

const AZURE_B2C_LAB: LabContent = {
  slug: "azure-identitaeten-b2c",
  title: "Lab: Verwalten von Azure-Identitäten (B2C)",
  level: "Intermediate",
  duration: "90-120 Minuten",
  totalMinutes: 120,
  goal: "Konfigurieren und verwalten Sie Azure AD B2C für externe Benutzer (B2C = Business to Customer).",
  objectives: [
    "B2C-Tenant erstellen",
    "Benutzerflow für Registrierung und Anmeldung",
    "Verifizierungsmethoden (E-Mail)",
    "Testen der Registrierung und Anmeldung",
  ],
  instructions: [
    "Erstellen Sie einen Azure AD B2C Tenant.",
    "Konfigurieren Sie einen Sign-up/Sign-in-Benutzerflow.",
    "Konfigurieren Sie die E-Mail-Verifizierung.",
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
    { name: "Azure AD B2C Tenant", status: "Aktiv" },
    { name: "Web App (Demo)", status: "Aktiv" },
    { name: "Storage Account", status: "Aktiv" },
    { name: "App Service Plan", status: "Aktiv" },
  ],
  checklist: [
    { id: "1", label: "B2C Tenant erstellen", done: true },
    { id: "2", label: "Benutzerflow erstellen", done: true },
    { id: "3", label: "E-Mail-Verifizierung aktivieren", done: true },
    { id: "4", label: "Registrierung testen", done: true },
    { id: "5", label: "Anmeldung testen", done: false },
  ],
  docs: ["Azure AD B2C Documentation", "Tutorial: Azure AD B2C", "Best Practices für Identität", "Troubleshooting Guide"],
};

export function getLab(companySlug: string, certId: string): LabContent | undefined {
  if (companySlug === "microsoft" && (certId === "az-104" || certId === "az-900")) {
    return AZURE_B2C_LAB;
  }
  return undefined;
}
