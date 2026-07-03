// Practice-question data for AZ-900 (Microsoft Azure Fundamentals).
//
// `AZ900_TOPICS` mirrors the three official Microsoft exam skill domains for
// AZ-900, with `totalQuestions` set to their real published weighting out of
// the user's 563-question bank. `AZ900_QUESTIONS` is a seed set of original,
// fully-authored questions (4 per topic) so the practice engine below is
// genuinely playable end-to-end.
//
// TO ADD THE REAL 563 QUESTIONS: append more objects to `AZ900_QUESTIONS`
// with a matching `topicId`. Nothing else needs to change — the UI reads
// question counts live from this array.

export type PracticeOptionId = "A" | "B" | "C" | "D";

export type PracticeQuestion = {
  id: string;
  topicId: string;
  prompt: string;
  options: { id: PracticeOptionId; text: string }[];
  correct: PracticeOptionId;
  explanation: string;
  resources?: { label: string; url: string }[];
};

export type PracticeTopic = {
  id: string;
  title: string;
  /** Real target size once the full question bank is loaded. */
  totalQuestions: number;
  /** True while no authored questions exist yet for this topic. */
  locked?: boolean;
};

export const AZ900_TOPICS: PracticeTopic[] = [
  { id: "cloud-konzepte", title: "Cloud-Konzepte beschreiben", totalQuestions: 158 },
  { id: "azure-architektur", title: "Azure-Architektur und -Dienste beschreiben", totalQuestions: 214 },
  { id: "azure-verwaltung", title: "Azure-Verwaltung und -Governance beschreiben", totalQuestions: 191 },
];

export const AZ900_QUESTIONS: PracticeQuestion[] = [
  {
    id: "cc-1",
    topicId: "cloud-konzepte",
    prompt: "Was beschreibt am besten das Konzept der „Skalierbarkeit“ in der Cloud?",
    options: [
      { id: "A", text: "Die Fähigkeit, Ressourcen automatisch je nach Last zu erhöhen oder zu verringern" },
      { id: "B", text: "Die Fähigkeit, Daten dauerhaft zu sichern" },
      { id: "C", text: "Die Fähigkeit, mehrere Rechenzentren gleichzeitig zu betreiben" },
      { id: "D", text: "Die Fähigkeit, Kosten unabhängig von der Nutzung festzulegen" },
    ],
    correct: "A",
    explanation:
      "Skalierbarkeit bedeutet, dass Ressourcen bei Bedarf erhöht oder verringert werden können, um Lastspitzen abzufangen, ohne die Infrastruktur manuell anzupassen.",
  },
  {
    id: "cc-2",
    topicId: "cloud-konzepte",
    prompt: "Welches Cloud-Bereitstellungsmodell kombiniert öffentliche und private Cloud-Ressourcen?",
    options: [
      { id: "A", text: "Public Cloud" },
      { id: "B", text: "Private Cloud" },
      { id: "C", text: "Hybrid Cloud" },
      { id: "D", text: "Community Cloud" },
    ],
    correct: "C",
    explanation:
      "Eine Hybrid Cloud verbindet lokale (private) Infrastruktur mit öffentlichen Cloud-Diensten und ermöglicht Datenaustausch zwischen beiden.",
  },
  {
    id: "cc-3",
    topicId: "cloud-konzepte",
    prompt: "Was ist ein Hauptvorteil davon, Betriebsausgaben (OpEx) statt Kapitalausgaben (CapEx) zu nutzen?",
    options: [
      { id: "A", text: "Es erfordert hohe Vorabinvestitionen in Hardware" },
      { id: "B", text: "Es ermöglicht nutzungsbasierte Zahlung ohne große Vorabinvestitionen" },
      { id: "C", text: "Es eliminiert alle laufenden Kosten" },
      { id: "D", text: "Es garantiert in jedem Fall niedrigere Gesamtkosten" },
    ],
    correct: "B",
    explanation:
      "Cloud-Dienste werden typischerweise als OpEx abgerechnet – man zahlt für das, was man nutzt, statt hohe Anfangsinvestitionen (CapEx) zu tätigen.",
  },
  {
    id: "cc-4",
    topicId: "cloud-konzepte",
    prompt: "Welches der folgenden ist ein Beispiel für Infrastructure as a Service (IaaS)?",
    options: [
      { id: "A", text: "Microsoft 365" },
      { id: "B", text: "Azure Virtual Machines" },
      { id: "C", text: "Azure App Service" },
      { id: "D", text: "Eine verwaltete Azure SQL Database" },
    ],
    correct: "B",
    explanation:
      "Azure Virtual Machines sind IaaS: Der Kunde hat volle Kontrolle über das Betriebssystem und die Konfiguration, während Azure die zugrunde liegende Hardware verwaltet.",
  },

  {
    id: "aa-1",
    topicId: "azure-architektur",
    prompt: "Was ist eine Azure-Region?",
    options: [
      { id: "A", text: "Ein einzelnes Rechenzentrum" },
      { id: "B", text: "Eine Sammlung von Rechenzentren, die über ein Glasfasernetzwerk verbunden sind" },
      { id: "C", text: "Ein virtuelles Netzwerk innerhalb eines Abonnements" },
      { id: "D", text: "Ein Ressourcengruppen-Container" },
    ],
    correct: "B",
    explanation:
      "Eine Azure-Region besteht aus einem oder mehreren Rechenzentren, die geografisch nah beieinander liegen und über ein latenzarmes Netzwerk verbunden sind.",
  },
  {
    id: "aa-2",
    topicId: "azure-architektur",
    prompt: "Wozu dienen Availability Zones (Verfügbarkeitszonen) in Azure?",
    options: [
      { id: "A", text: "Sie reduzieren die Kosten von virtuellen Maschinen" },
      { id: "B", text: "Sie bieten physisch getrennte Standorte innerhalb einer Region für höhere Ausfallsicherheit" },
      { id: "C", text: "Sie ersetzen die Notwendigkeit von Backups" },
      { id: "D", text: "Sie sind nur für Speicherkonten verfügbar" },
    ],
    correct: "B",
    explanation:
      "Verfügbarkeitszonen sind physisch getrennte Standorte innerhalb einer Azure-Region, die vor Ausfällen einzelner Rechenzentren schützen.",
  },
  {
    id: "aa-3",
    topicId: "azure-architektur",
    prompt: "Welcher Azure-Dienst wird verwendet, um zusammengehörige Ressourcen logisch zu gruppieren und gemeinsam zu verwalten?",
    options: [
      { id: "A", text: "Ressourcengruppen (Azure Resource Manager)" },
      { id: "B", text: "Azure Monitor" },
      { id: "C", text: "Azure Policy" },
      { id: "D", text: "Azure Blueprints" },
    ],
    correct: "A",
    explanation:
      "Ressourcengruppen fassen zusammengehörige Azure-Ressourcen zusammen, damit sie gemeinsam bereitgestellt, verwaltet und gelöscht werden können.",
  },
  {
    id: "aa-4",
    topicId: "azure-architektur",
    prompt: "Was beschreibt Azure Blob Storage am besten?",
    options: [
      { id: "A", text: "Einen relationalen Datenbankdienst" },
      { id: "B", text: "Einen Objektspeicherdienst für unstrukturierte Daten wie Bilder und Dokumente" },
      { id: "C", text: "Einen Dienst für virtuelle Netzwerke" },
      { id: "D", text: "Einen Dienst zur Identitätsverwaltung" },
    ],
    correct: "B",
    explanation:
      "Azure Blob Storage ist für die Speicherung großer Mengen unstrukturierter Daten wie Bilder, Videos und Dokumente konzipiert.",
  },

  {
    id: "av-1",
    topicId: "azure-verwaltung",
    prompt: "Was ist der Zweck von Azure Policy?",
    options: [
      { id: "A", text: "Kosten automatisch zu senken" },
      { id: "B", text: "Regeln durchzusetzen, damit Ressourcen konform mit Unternehmensstandards bleiben" },
      { id: "C", text: "Virtuelle Maschinen automatisch zu skalieren" },
      { id: "D", text: "Benutzerkonten zu erstellen" },
    ],
    correct: "B",
    explanation:
      "Azure Policy erzwingt Organisationsstandards und bewertet die Konformität von Ressourcen, z. B. um bestimmte Regionen oder SKUs zu verbieten.",
  },
  {
    id: "av-2",
    topicId: "azure-verwaltung",
    prompt: "Welches Tool hilft, die geschätzten monatlichen Kosten für Azure-Ressourcen zu berechnen, bevor man sie bereitstellt?",
    options: [
      { id: "A", text: "Azure Cost Management" },
      { id: "B", text: "Azure Pricing Calculator" },
      { id: "C", text: "Azure Advisor" },
      { id: "D", text: "Azure Monitor" },
    ],
    correct: "B",
    explanation: "Der Azure Pricing Calculator ermöglicht es, die Kosten für geplante Ressourcen vorab zu schätzen.",
    resources: [{ label: "Azure Pricing Calculator", url: "https://azure.microsoft.com/pricing/calculator/" }],
  },
  {
    id: "av-3",
    topicId: "azure-verwaltung",
    prompt: "Was ist Role-Based Access Control (RBAC) in Azure?",
    options: [
      { id: "A", text: "Eine Methode zur Verschlüsselung von Daten" },
      { id: "B", text: "Ein System zur feingranularen Zugriffsverwaltung basierend auf Benutzerrollen" },
      { id: "C", text: "Ein Netzwerksicherheitsdienst" },
      { id: "D", text: "Ein Backup-Dienst" },
    ],
    correct: "B",
    explanation:
      "RBAC ermöglicht es, Benutzern basierend auf ihrer Rolle genau die Berechtigungen zuzuweisen, die sie für ihre Aufgaben benötigen.",
  },
  {
    id: "av-4",
    topicId: "azure-verwaltung",
    prompt: "Welches Azure-Tool gibt personalisierte Empfehlungen zur Optimierung von Kosten, Sicherheit und Leistung?",
    options: [
      { id: "A", text: "Azure Advisor" },
      { id: "B", text: "Azure Policy" },
      { id: "C", text: "Azure Blueprints" },
      { id: "D", text: "Azure Resource Graph" },
    ],
    correct: "A",
    explanation:
      "Azure Advisor analysiert die Ressourcenkonfiguration und gibt Empfehlungen zu Kosten, Sicherheit, Zuverlässigkeit und Leistung.",
  },
];
