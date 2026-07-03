// Practice-question data for AZ-104 (Microsoft Azure Administrator).
// Same shape/pattern as lib/az900Practice.ts — see that file for the type
// definitions this reuses. Topic names/counts match the provided design
// (563 total across 7 skill areas); only the first topic ships fully
// authored questions so far. Append more objects to AZ104_QUESTIONS with a
// matching topicId to grow any topic — nothing else needs to change.

import type { PracticeQuestion, PracticeTopic } from "./az900Practice";

export const AZ104_TOPICS: PracticeTopic[] = [
  { id: "azure-identitaeten", title: "Verwalten von Azure-Identitäten", totalQuestions: 112 },
  { id: "netzwerke", title: "Implementieren und Verwalten von virtuellen Netzwerken", totalQuestions: 78 },
  { id: "governance", title: "Verwalten der Azure-Governance und -Compliance", totalQuestions: 67 },
  { id: "compute", title: "Implementieren und Verwalten von Azure-Computeressourcen", totalQuestions: 95 },
  { id: "speicher", title: "Speicher verwalten", totalQuestions: 68 },
  { id: "bereitstellung", title: "Bereitstellung und Verwaltung von Azure-Ressourcen", totalQuestions: 76 },
  { id: "ueberwachung", title: "Überwachen und Sichern von Azure", totalQuestions: 67 },
];

export const AZ104_QUESTIONS: PracticeQuestion[] = [
  {
    id: "ai-1",
    topicId: "azure-identitaeten",
    prompt:
      "Sie haben einen Azure Active Directory (Azure AD)-Mandanten, der mit Azure-Abonnements verknüpft ist. Sie müssen Benutzern die Möglichkeit geben, sich mit ihren Azure AD-Anmeldeinformationen bei Anwendungen anzumelden, die von externen Anbietern entwickelt wurden. Welche Azure AD-Authentifizierungsmethode sollten Sie verwenden?",
    options: [
      { id: "A", text: "Verwalten von Identitäten bei B2B-Zusammenarbeit" },
      { id: "B", text: "Verwalten von Identitäten bei B2C-Zusammenarbeit" },
      { id: "C", text: "Azure AD-Anwendungsproxy" },
      { id: "D", text: "Azure AD Connect" },
    ],
    correct: "B",
    explanation:
      "Azure AD B2C (Business to Customer) ermöglicht es Benutzern, sich mit ihren eigenen Identitäten (z. B. sozialen Konten, E-Mail-Adressen) bei Anwendungen anzumelden.",
    resources: [
      { label: "Microsoft Docs: Azure AD B2C overview", url: "https://learn.microsoft.com/de-de/azure/active-directory-b2c/" },
      { label: "Azure AD B2C vs B2B comparison", url: "https://learn.microsoft.com/de-de/azure/active-directory-b2c/compare-with-b2b" },
    ],
  },
  {
    id: "ai-2",
    topicId: "azure-identitaeten",
    prompt: "Welches Tool wird verwendet, um lokale Active Directory-Identitäten mit Azure AD zu synchronisieren?",
    options: [
      { id: "A", text: "Azure AD Connect" },
      { id: "B", text: "Azure AD B2C" },
      { id: "C", text: "Azure Bastion" },
      { id: "D", text: "Azure AD Anwendungsproxy" },
    ],
    correct: "A",
    explanation:
      "Azure AD Connect synchronisiert Identitäten zwischen einem lokalen Active Directory und Azure AD und ermöglicht so ein einheitliches Anmeldeerlebnis.",
  },
  {
    id: "ai-3",
    topicId: "azure-identitaeten",
    prompt: "Was ist der Zweck von bedingtem Zugriff (Conditional Access) in Azure AD?",
    options: [
      { id: "A", text: "Automatisches Erstellen neuer Benutzerkonten" },
      { id: "B", text: "Zugriffsrichtlinien basierend auf Signalen wie Standort oder Gerät durchsetzen" },
      { id: "C", text: "Kosten für Azure-Ressourcen senken" },
      { id: "D", text: "Speicherplatz für Benutzerkonten verwalten" },
    ],
    correct: "B",
    explanation:
      "Bedingter Zugriff erlaubt es, den Zugriff auf Ressourcen basierend auf Bedingungen wie Standort, Gerätestatus oder Risikostufe zu steuern.",
  },
  {
    id: "ai-4",
    topicId: "azure-identitaeten",
    prompt: "Welche Azure AD-Rolle wird benötigt, um einen neuen Azure AD B2C-Tenant zu erstellen?",
    options: [
      { id: "A", text: "Leser" },
      { id: "B", text: "Mitwirkender" },
      { id: "C", text: "Globaler Administrator" },
      { id: "D", text: "Sicherheitsleser" },
    ],
    correct: "C",
    explanation:
      "Zum Erstellen eines Azure AD B2C-Tenants ist die Rolle „Globaler Administrator“ im übergeordneten Azure AD-Mandanten erforderlich.",
  },

  {
    id: "gov-1",
    topicId: "governance",
    prompt: "Was ist der Zweck von Azure Blueprints?",
    options: [
      { id: "A", text: "Kosten für virtuelle Maschinen zu reduzieren" },
      { id: "B", text: "Wiederholbare Sätze von Ressourcen und Richtlinien als Paket bereitzustellen" },
      { id: "C", text: "Netzwerkverkehr zu überwachen" },
      { id: "D", text: "Backups automatisch zu planen" },
    ],
    correct: "B",
    explanation:
      "Azure Blueprints ermöglichen es, eine Sammlung von Ressourcendefinitionen, Richtlinien und Rollenzuweisungen als wiederverwendbares Paket zu definieren und bereitzustellen.",
  },
  {
    id: "gov-2",
    topicId: "governance",
    prompt: "Auf welcher Ebene der Azure-Ressourcenhierarchie werden Management Groups verwendet?",
    options: [
      { id: "A", text: "Innerhalb einer Ressourcengruppe" },
      { id: "B", text: "Oberhalb von Abonnements, zur Verwaltung mehrerer Abonnements gemeinsam" },
      { id: "C", text: "Innerhalb einer einzelnen virtuellen Maschine" },
      { id: "D", text: "Nur für Speicherkonten" },
    ],
    correct: "B",
    explanation:
      "Management Groups liegen in der Hierarchie oberhalb von Abonnements und ermöglichen es, Richtlinien und Zugriff für mehrere Abonnements gemeinsam zu verwalten.",
  },

  {
    id: "sp-1",
    topicId: "speicher",
    prompt: "Welche Redundanzoption repliziert Daten synchron innerhalb einer einzelnen Azure-Region über drei Verfügbarkeitszonen?",
    options: [
      { id: "A", text: "LRS (Locally Redundant Storage)" },
      { id: "B", text: "ZRS (Zone-Redundant Storage)" },
      { id: "C", text: "GRS (Geo-Redundant Storage)" },
      { id: "D", text: "RA-GRS (Read-Access Geo-Redundant Storage)" },
    ],
    correct: "B",
    explanation:
      "ZRS repliziert Daten synchron über drei Verfügbarkeitszonen innerhalb einer Region und bietet dadurch höhere Verfügbarkeit als LRS.",
  },
  {
    id: "sp-2",
    topicId: "speicher",
    prompt: "Welcher Zugriffstyp (Access Tier) in Azure Blob Storage eignet sich am besten für selten aufgerufene, aber sofort verfügbare Daten?",
    options: [
      { id: "A", text: "Hot" },
      { id: "B", text: "Cool" },
      { id: "C", text: "Archive" },
      { id: "D", text: "Premium" },
    ],
    correct: "B",
    explanation:
      "Der Cool-Tier eignet sich für Daten, auf die selten zugegriffen wird, die aber weiterhin sofort verfügbar sein müssen — bei niedrigeren Speicherkosten als Hot.",
  },
];
