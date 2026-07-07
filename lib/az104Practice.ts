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
  {
    id: "sp-3",
    topicId: "speicher",
    prompt: "Welche Funktion in Azure Storage schützt versehentlich gelöschte Blobs vor dauerhaftem Verlust?",
    options: [
      { id: "A", text: "Soft Delete für Blobs" },
      { id: "B", text: "Geo-Replikation" },
      { id: "C", text: "Lifecycle Management" },
      { id: "D", text: "Shared Access Signature" },
    ],
    correct: "A",
    explanation:
      "Soft Delete hält gelöschte Blobs für einen konfigurierbaren Zeitraum wiederherstellbar, bevor sie endgültig entfernt werden.",
  },
  {
    id: "net-1",
    topicId: "netzwerke",
    prompt: "Welche Ressource wird benötigt, um zwei Azure Virtual Networks (VNets) miteinander zu verbinden?",
    options: [
      { id: "A", text: "VNet Peering" },
      { id: "B", text: "Network Security Group" },
      { id: "C", text: "Load Balancer" },
      { id: "D", text: "Azure Bastion" },
    ],
    correct: "A",
    explanation:
      "VNet Peering verbindet zwei virtuelle Netzwerke, sodass Ressourcen über private IP-Adressen miteinander kommunizieren können, ohne dass Datenverkehr über das öffentliche Internet läuft.",
  },
  {
    id: "net-2",
    topicId: "netzwerke",
    prompt: "Was ist die primäre Funktion einer Network Security Group (NSG) in Azure?",
    options: [
      { id: "A", text: "Ein- und ausgehenden Netzwerkverkehr auf Basis von Regeln filtern" },
      { id: "B", text: "DNS-Namen für Ressourcen verwalten" },
      { id: "C", text: "Lastverteilung über mehrere VMs" },
      { id: "D", text: "Automatisches Skalieren von virtuellen Maschinen" },
    ],
    correct: "A",
    explanation:
      "Eine NSG enthält Sicherheitsregeln, die ein- und ausgehenden Netzwerkverkehr zu Azure-Ressourcen innerhalb eines virtuellen Netzwerks erlauben oder verweigern.",
  },
  {
    id: "net-3",
    topicId: "netzwerke",
    prompt: "Welcher Azure-Dienst ermöglicht sicheren RDP/SSH-Zugriff auf VMs, ohne eine öffentliche IP-Adresse zuzuweisen?",
    options: [
      { id: "A", text: "Azure Bastion" },
      { id: "B", text: "Azure Front Door" },
      { id: "C", text: "Azure Traffic Manager" },
      { id: "D", text: "Azure CDN" },
    ],
    correct: "A",
    explanation:
      "Azure Bastion stellt einen sicheren RDP/SSH-Zugriff auf virtuelle Computer direkt über das Azure Portal bereit, ohne dass eine öffentliche IP-Adresse auf der VM benötigt wird.",
  },
  {
    id: "comp-1",
    topicId: "compute",
    prompt: "Was ist eine Availability Set in Azure?",
    options: [
      { id: "A", text: "Eine logische Gruppierung von VMs zum Schutz vor Ausfällen innerhalb eines Rechenzentrums" },
      { id: "B", text: "Ein Speicherkonto-Typ" },
      { id: "C", text: "Ein Sicherheitsrichtlinien-Set für Azure Policy" },
      { id: "D", text: "Ein Backup-Zeitplan" },
    ],
    correct: "A",
    explanation:
      "Availability Sets verteilen VMs auf mehrere Fault- und Update-Domänen innerhalb eines Rechenzentrums, um die Verfügbarkeit bei Hardware- oder Wartungsausfällen zu erhöhen.",
  },
  {
    id: "comp-2",
    topicId: "compute",
    prompt: "Welcher Dienst ermöglicht automatisches horizontales Skalieren von VMs basierend auf Auslastungsmetriken?",
    options: [
      { id: "A", text: "Virtual Machine Scale Sets" },
      { id: "B", text: "Azure Container Instances" },
      { id: "C", text: "Azure Automation" },
      { id: "D", text: "Azure Site Recovery" },
    ],
    correct: "A",
    explanation:
      "Virtual Machine Scale Sets ermöglichen es, identische VMs automatisch basierend auf Metriken wie CPU-Auslastung horizontal hoch- oder herunterzuskalieren.",
  },
  {
    id: "comp-3",
    topicId: "compute",
    prompt: "Was passiert mit den Daten auf dem temporären Datenträger (Temporary Disk) einer Azure-VM bei einem Neustart?",
    options: [
      { id: "A", text: "Sie können verloren gehen, da der temporäre Datenträger nicht dauerhaft ist" },
      { id: "B", text: "Sie werden automatisch im Azure Storage gesichert" },
      { id: "C", text: "Sie bleiben garantiert immer erhalten" },
      { id: "D", text: "Der temporäre Datenträger wird verschlüsselt archiviert" },
    ],
    correct: "A",
    explanation:
      "Der temporäre Datenträger (oft D:) ist nicht dauerhaft — Daten können bei bestimmten Ereignissen wie Neustart, Neubereitstellung oder Wartung verloren gehen und sollten nicht für persistente Daten verwendet werden.",
  },
  {
    id: "gov-3",
    topicId: "governance",
    prompt: "Was ist der Unterschied zwischen einer Azure-Rolle (RBAC) und einer Azure Policy?",
    options: [
      { id: "A", text: "RBAC steuert, WER WAS tun darf; Azure Policy steuert, WELCHE Konfigurationen erlaubt sind" },
      { id: "B", text: "Beide steuern ausschließlich Kosten" },
      { id: "C", text: "RBAC und Azure Policy sind identisch" },
      { id: "D", text: "Azure Policy ersetzt die Notwendigkeit von RBAC vollständig" },
    ],
    correct: "A",
    explanation:
      "RBAC (Role-Based Access Control) legt fest, welche Aktionen ein Benutzer auf welchen Ressourcen ausführen darf. Azure Policy erzwingt hingegen Regeln darüber, wie Ressourcen konfiguriert sein dürfen — unabhängig davon, wer sie erstellt.",
  },
  {
    id: "bereit-1",
    topicId: "bereitstellung",
    prompt: "Welches Format wird für Azure Resource Manager (ARM) Templates verwendet, um Infrastruktur deklarativ bereitzustellen?",
    options: [
      { id: "A", text: "JSON (oder Bicep als Abstraktion darüber)" },
      { id: "B", text: "XML" },
      { id: "C", text: "YAML ausschließlich" },
      { id: "D", text: "CSV" },
    ],
    correct: "A",
    explanation:
      "ARM-Templates werden im JSON-Format definiert; Bicep ist eine domänenspezifische Sprache, die eine einfachere Syntax bietet und in JSON kompiliert wird.",
  },
  {
    id: "bereit-2",
    topicId: "bereitstellung",
    prompt: "Was ist ein Vorteil der Verwendung von Ressourcengruppen-Tags in Azure?",
    options: [
      { id: "A", text: "Bessere Organisation, Kostenzuordnung und Filterung von Ressourcen" },
      { id: "B", text: "Automatische Verschlüsselung aller Daten" },
      { id: "C", text: "Tags sind rein kosmetisch und haben keinen praktischen Nutzen" },
      { id: "D", text: "Sie ersetzen die Notwendigkeit von Ressourcengruppen" },
    ],
    correct: "A",
    explanation:
      "Tags (Schlüssel-Wert-Paare) helfen, Ressourcen zu organisieren, Kosten nach Abteilung/Projekt zuzuordnen und gezielt nach Ressourcen zu filtern oder zu automatisieren.",
  },
  {
    id: "mon-1",
    topicId: "ueberwachung",
    prompt: "Welcher Azure-Dienst sammelt und analysiert Telemetriedaten wie Metriken und Protokolle von Azure-Ressourcen?",
    options: [
      { id: "A", text: "Azure Monitor" },
      { id: "B", text: "Azure Advisor" },
      { id: "C", text: "Azure Migrate" },
      { id: "D", text: "Azure DevOps" },
    ],
    correct: "A",
    explanation:
      "Azure Monitor sammelt, analysiert und reagiert auf Telemetriedaten aus Cloud- und On-Premises-Umgebungen, einschließlich Metriken, Protokollen und Warnungen.",
  },
  {
    id: "mon-2",
    topicId: "ueberwachung",
    prompt: "Wie oft können Sie Standard-Backups für eine Azure-VM über Azure Backup mindestens planen?",
    options: [
      { id: "A", text: "Mindestens einmal täglich" },
      { id: "B", text: "Nur einmal im Jahr" },
      { id: "C", text: "Backups sind für VMs nicht möglich" },
      { id: "D", text: "Nur manuell, niemals automatisiert" },
    ],
    correct: "A",
    explanation:
      "Azure Backup ermöglicht die Planung von mindestens täglichen automatisierten Backups für virtuelle Computer über eine Backuprichtlinie (Backup Policy).",
  },
];
