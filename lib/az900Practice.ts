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

export type SingleChoiceQuestion = {
  type?: "single";
  id: string;
  topicId: string;
  prompt: string;
  options: { id: PracticeOptionId; text: string }[];
  correct: PracticeOptionId;
  explanation: string;
  resources?: { label: string; url: string }[];
};

export type YesNoStatement = { text: string; correct: "Ja" | "Nein" };

export type YesNoQuestion = {
  type: "yesno";
  id: string;
  topicId: string;
  prompt: string;
  statements: YesNoStatement[];
  explanation: string;
  resources?: { label: string; url: string }[];
};

export type MatchingItem = { id: string; label: string };
export type MatchingDescription = { id: string; text: string; correctItemId: string };

export type MatchingQuestion = {
  type: "matching";
  id: string;
  topicId: string;
  prompt: string;
  instructions?: string;
  items: MatchingItem[];
  descriptions: MatchingDescription[];
  explanation: string;
  resources?: { label: string; url: string }[];
};

export type PracticeQuestion = SingleChoiceQuestion | YesNoQuestion | MatchingQuestion;

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

// --- Real exam questions extracted from the official AZ-900 question bank PDF ---

  {
    id: "real-564",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Wenn Sie Daten aus einem Azure Cosmos DB-Datenspeicher löschen , bevor 30 Tage vergangen sind, müssen Sie eine Gebühr für die vorzeitige Löschung zahlen." },
      { id: "B", text: "Wenn Sie Daten vor Ablauf von 30 Tagen aus der Azure SQL-Datenbank löschen, müssen Sie eine Gebühr für die vorzeitige Löschung zahlen." },
      { id: "C", text: "Wenn Sie Daten vor Ablauf von 30 Tagen aus der Cool-Access-Ebene von Azure Blob Storage löschen, müssen Sie eine Gebühr für die vorzeitige Löschung zahlen." },
      { id: "D", text: "Wenn Sie Daten vor Ablauf von 30 Tagen aus der Hot-Access-Ebene von Azure Blob Storage löschen, müssen Sie eine Gebühr für die vorzeitige Löschung zahlen." },
    ],
    correct: "C",
    explanation: "Für Blobs wird eine Gebühr für vorzeitiges Löschen erhoben, wenn sie gelöscht, überschrieben oder auf eine andere Ebene verschoben werden, bevor die für die Ebene erforderliche Mindestanzahl von Tagen verstrichen ist. Beispielsweise wird für ein Blob in der kalten Ebene eines Allzweckkontos v2 eine Gebühr für vorzeitiges Löschen erhoben, wenn es vor Ablauf von 30 Tagen gelöscht oder auf eine andere Ebene verschoben wird. Für ein Blob in der kalten Ebene wird die Gebühr für vorzeitiges Löschen erhoben, wenn es vor Ablauf von 90 Tagen gelöscht oder auf eine andere Ebene verschoben wird. Diese Gebühr wird anteilig berechnet. Wenn beispielsweise ein Blob in die kalte Ebene verschoben und dann nach 21 Tagen gelöscht wird, wird Ihnen eine Gebühr für vorzeitiges Löschen in Höhe von 9 (30 minus 21) Tagen berechnet, die Sie für die Speicherung dieses Blobs in der kalten Ebene aufgewendet haben. Gebühren für vorzeitiges Löschen fallen auch an, wenn das gesamte Objekt innerhalb des angegebenen Zeitfensters durch eine beliebige Operation (z. B. „Blob einfügen“, „Blockliste einfügen“ oder „Blob kopieren“) neu geschrieben wird. Diese Gebühr wird anteilig basierend auf dem Datenspeicherpreis der entsprechenden Stufe berechnet. Das Löschen eines archivierten Blobs nach 120 Tagen führt dazu, dass für dieses Objekt 180 Tage berechnet werden. Hinweis: In einem Konto mit aktiviertem Soft Delete gilt ein Blob nach Ablauf der Aufbewahrungsfrist als gelöscht. Bis zum Ablauf dieser Frist wird das Blob nur weich gelöscht und unterliegt nicht der Strafe für vorzeitiges Löschen."
  },
  {
    id: "real-563",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Das Service-Level-Agreement (SLA) eines Cloud-Service-Providers drückt die Verfügbarkeit als Prozentsatz der Betriebszeit über ein bestimmtes Jahr aus." },
      { id: "B", text: "Das Service-Level-Agreement (SLA) eines Cloud-Service-Providers drückt die Elastizität als Prozentsatz der Betriebszeit über ein bestimmtes Jahr aus." },
      { id: "C", text: "Das Service-Level-Agreement (SLA) eines Cloud-Service-Providers drückt die Zuverlässigkeit als Prozentsatz der Betriebszeit über ein bestimmtes Jahr aus." },
      { id: "D", text: "Das Service-Level-Agreement (SLA) eines Cloud-Service-Providers drückt die Skalierbarkeit als Prozentsatz der Betriebszeit über ein bestimmtes Jahr aus." },
    ],
    correct: "A",
    explanation: "Die Service Level Agreements (SLA) beschreiben die Zusagen von Microsoft hinsichtlich Betriebszeit und Konnektivität für Microsoft Online Services. Die Dienstverfügbarkeit gibt an, wie lange der Dienst eines Anbieters zur Verfügung steht. Dies wird manchmal in einem Zeitfenster gemessen. Beispielsweise kann Ihr SLA festlegen, dass der Dienst eines Anbieters täglich für ein bestimmtes 12-Stunden-Fenster mit einer Kapazität von mindestens 99,5 % verfügbar ist."
  },
  {
    id: "real-548",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Sie können Application Insights verwenden , um Empfehlungen zur Kosteneinsparung abzugeben." },
      { id: "B", text: "Sie können Azure Advisor verwenden , um Empfehlungen zur Kosteneinsparung zu erhalten." },
      { id: "C", text: "Sie können Azure-Ressourcentags verwenden , um Empfehlungen zur Kosteneinsparung abzugeben. D Sie können Azure Service Health verwenden , um Empfehlungen zur Kosteneinsparung abzugeben." },
    ],
    correct: "B",
    explanation: "Advisor ist ein digitaler Cloud-Assistent, der Sie bei der Optimierung Ihrer Azure-Bereitstellungen mithilfe bewährter Methoden unterstützt. Er analysiert Ihre Ressourcenkonfiguration und -nutzungstelemetrie und empfiehlt anschließend Lösungen, mit denen Sie die Kosteneffizienz, Leistung, Zuverlässigkeit und Sicherheit Ihrer Azure-Ressourcen verbessern können. Mit Advisor können Sie: • Erhalten Sie proaktive, umsetzbare und personalisierte Best Practices-Empfehlungen. • Verbessern Sie die Leistung, Sicherheit und Zuverlässigkeit Ihrer Ressourcen, indem Sie Möglichkeiten zur Reduzierung Ihrer Azure-Gesamtausgaben identifizieren. • Erhalten Sie Empfehlungen mit vorgeschlagenen Aktionen inline. Sie können über das Azure-Portal auf Advisor zugreifen. Das Advisor-Dashboard zeigt personalisierte Empfehlungen für alle Ihre Abonnements an. Die Empfehlungen sind in fünf Kategorien unterteilt: • Zuverlässigkeit: Um die Kontinuität Ihrer geschäftskritischen Anwendungen sicherzustellen und zu verbessern. • Sicherheit: Zum Erkennen von Bedrohungen und Schwachstellen, die zu Sicherheitsverletzungen führen könnten. • Leistung: Um die Geschwindigkeit Ihrer Anwendungen zu verbessern. • Kosten: Um Ihre gesamten Azure-Ausgaben zu optimieren und zu reduzieren. • Operative Exzellenz: Wir helfen Ihnen dabei, Prozess- und Workflow-Effizienz, Ressourcenverwaltung und Best Practices für die Bereitstellung zu erreichen."
  },
  {
    id: "real-542",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Auf Verwaltungseinheiten kann eine Ressourcensperre angewendet werden ." },
      { id: "B", text: "Auf Azure-Richtlinien kann eine Ressourcensperre angewendet werden ." },
      { id: "C", text: "Auf Azure-Abonnements kann eine Ressourcensperre angewendet werden ." },
      { id: "D", text: "Auf Benutzerkonten kann eine Ressourcensperre angewendet werden ." },
    ],
    correct: "C",
    explanation: "Als Administrator können Sie ein Azure-Abonnement, eine Ressourcengruppe oder eine Ressource sperren, um sie vor versehentlichem Löschen und Ändern durch Benutzer zu schützen. Die Sperre überschreibt alle Benutzerberechtigungen. Sie können Sperren festlegen, die entweder Löschungen oder Änderungen verhindern. Im Portal heißen diese Sperren Löschen und Schreibgeschützt . In der Befehlszeile heißen diese Sperren CanNotDelete und ReadOnly . • „CanNotDelete“ bedeutet, dass autorisierte Benutzer eine Ressource lesen und ändern, aber nicht löschen können. • ReadOnly bedeutet, dass autorisierte Benutzer eine Ressource lesen, aber nicht löschen oder aktualisieren können. Das Anwenden dieser Sperre entspricht der Beschränkung aller autorisierten Benutzer auf die Berechtigungen der Leserrolle . Anders als bei der rollenbasierten Zugriffskontrolle (RBAC) verwenden Sie Verwaltungssperren, um eine Einschränkung auf alle Benutzer und Rollen anzuwenden. Wenn Sie eine Sperre auf einen übergeordneten Bereich anwenden, erben alle Ressourcen innerhalb dieses Bereichs dieselbe Sperre. Auch später hinzugefügte Ressourcen erben dieselbe übergeordnete Sperre. Die restriktivste Sperre in der Vererbungskette hat Vorrang."
  },
  {
    id: "real-541",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Virtuelles Netzwerk-Peering kann nur zwischen zwei virtuellen Netzwerken in derselben Azure-Region konfiguriert werden." },
      { id: "B", text: "Virtuelles Netzwerk-Peering kann nur zwischen zwei virtuellen Netzwerken in derselben Ressourcengruppe konfiguriert werden." },
      { id: "C", text: "Virtuelles Netzwerk-Peering kann nur zwischen zwei virtuellen Netzwerken im selben Azure-Abonnement konfiguriert werden ." },
      { id: "D", text: "Virtuelles Netzwerk-Peering kann zwischen zwei beliebigen virtuellen Netzwerken konfiguriert werden." },
    ],
    correct: "D",
    explanation: "Mithilfe von virtuellem Netzwerk-Peering können Sie zwei oder mehr virtuelle Netzwerke in Azure nahtlos miteinander verbinden. Die virtuellen Netzwerke werden aus Konnektivitätsgründen als ein einziges Netzwerk angezeigt. Der Datenverkehr zwischen virtuellen Computern in virtuellen Peering-Netzwerken nutzt die Microsoft-Backbone- Infrastruktur. Der Datenverkehr wird ausschließlich über das private Microsoft- Netzwerk geleitet. Azure unterstützt die folgenden Peeringtypen: • Virtuelles Netzwerk-Peering: Verbinden Sie virtuelle Netzwerke innerhalb derselben Azure-Region. • Globales virtuelles Netzwerk-Peering: Verbinden Sie virtuelle Netzwerke über Azure-Regionen hinweg."
  },
  {
    id: "real-534",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Die Zugriffsebene „Cool“ ist für Daten optimiert, auf die selten zugegriffen wird und die mindestens 30 Tage lang gespeichert werden." },
      { id: "B", text: "Die Zugriffsebene „Cool“ ist für Daten optimiert, auf die selten zugegriffen wird, die mindestens 180 Tage lang gespeichert werden und für die flexible Latenzanforderungen gelten." },
      { id: "C", text: "Die Cool-Zugriffsebene ist für die Speicherung von Daten optimiert, auf die häufig zugegriffen wird." },
    ],
    correct: "A",
    explanation: "Azure Storage bietet verschiedene Zugriffsebenen, sodass Sie Ihre Blobdaten je nach Verwendungszweck möglichst kostengünstig speichern können. Zu den Azure Storage- Zugriffsebenen gehören: • Hot Tier – Eine Online-Schicht, die für die Speicherung von Daten optimiert ist, auf die häufig zugegriffen oder die häufig geändert werden. Die Hot Tier verursacht die höchsten Speicherkosten, aber die niedrigsten Zugriffskosten. • Cool Tier – Eine Online-Ebene, die für die Speicherung selten abgerufener oder geänderter Daten optimiert ist. Daten in der Cool Tier sollten mindestens 30 Tage lang gespeichert werden. Die Cool Tier verursacht im Vergleich zur Hot Tier geringere Speicherkosten und höhere Zugriffskosten. • Cold Tier – Eine Online-Schicht, die für die Speicherung von Daten optimiert ist, auf die selten zugegriffen oder die selten geändert werden, die aber dennoch schnell abgerufen werden müssen. Daten in der Cold Tier sollten mindestens 90 Tage lang gespeichert werden. Die Cold Tier verursacht im Vergleich zur Cool Tier geringere Speicherkosten und höhere Zugriffskosten. • Archivebene : Eine Offlineebene, die für die Speicherung selten abgerufener Daten optimiert ist und flexible Latenzanforderungen im Stundenbereich hat. Daten in der Archivebene sollten mindestens 180 Tage lang gespeichert werden."
  },
  {
    id: "real-531",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Eine verwaltete Identität wertet Signale aus, um Anmeldungen bei Microsoft Entra ID zuzulassen oder zu verweigern." },
      { id: "B", text: "Der bedingte Zugriff wertet Signale aus, um Anmeldungen bei Microsoft Entra ID zuzulassen oder zu verweigern." },
      { id: "C", text: "Microsoft Intune wertet Signale aus, um Anmeldungen bei Microsoft Entra ID zuzulassen oder zu verweigern." },
      { id: "D", text: "Microsoft Defender for Identity wertet Signale aus, um Anmeldungen bei Microsoft Entra ID zuzulassen oder zu verweigern." },
    ],
    correct: "B",
    explanation: "Der moderne Sicherheitsperimeter geht über den Netzwerkperimeter einer Organisation hinaus und umfasst auch die Benutzer- und Geräteidentität. Organisationen nutzen heute identitätsbasierte Signale als Teil ihrer Zugriffskontrollentscheidungen. Microsoft Entra Conditional Access führt Signale zusammen, um Entscheidungen zu treffen und Unternehmensrichtlinien durchzusetzen. Conditional Access ist die Zero Trust-Richtlinien-Engine von Microsoft, die Signale aus verschiedenen Quellen bei der Durchsetzung von Richtlinienentscheidungen berücksichtigt. Richtlinien für bedingten Zugriff sind im einfachsten Fall Wenn-Dann-Anweisungen. Wenn ein Benutzer auf eine Ressource zugreifen möchte, muss er eine Aktion ausführen. Beispiel: Wenn ein Benutzer auf eine Anwendung oder einen Dienst wie Microsoft 365 zugreifen möchte, muss er eine mehrstufige Authentifizierung durchführen, um Zugriff zu erhalten."
  },
  {
    id: "real-526",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Bei der Verwendung von Verfügbarkeitsgruppen können Sie virtuelle Maschinen in einer Updatedomäne oder einer Fehlerdomäne gruppieren." },
      { id: "B", text: "Bei der Verwendung von Verfügbarkeitszonen können Sie virtuelle Maschinen in einer Updatedomäne oder einer Fehlerdomäne gruppieren." },
      { id: "C", text: "Wenn Sie Azure Load Balancer verwenden , können Sie virtuelle Maschinen in einer Updatedomäne oder einer Fehlerdomäne gruppieren." },
      { id: "D", text: "Wenn Sie Azure Virtual Machine Scale Sets verwenden , können Sie virtuelle Maschinen in einer Updatedomäne oder einer Fehlerdomäne gruppieren." },
    ],
    correct: "A",
    explanation: "Verfügbarkeitsgruppen sind logische Gruppierungen von VMs, die die Wahrscheinlichkeit korrelierter Fehler verringern, die gleichzeitig zum Absturz verwandter VMs führen. Verfügbarkeitsgruppen platzieren VMs in verschiedenen Fehlerdomänen, um die Zuverlässigkeit zu verbessern. Dies ist besonders nützlich, wenn eine Region keine Verfügbarkeitszonen unterstützt. Erstellen Sie bei Verwendung von Verfügbarkeitsgruppen zwei oder mehr VMs innerhalb einer Verfügbarkeitsgruppe. Die Verwendung von zwei oder mehr VMs in einer Verfügbarkeitsgruppe unterstützt hochverfügbare Anwendungen und erfüllt die Azure-SLA zu 99,95 %. Für die Verwendung von Verfügbarkeitsgruppen entstehen keine zusätzlichen Kosten. Sie zahlen nur für jede erstellte VM-Instanz. Verfügbarkeitsgruppen bieten im Vergleich zu Verfügbarkeitszonen verbesserte Latenzen zwischen VMs, da VMs in einer Verfügbarkeitsgruppe näher beieinander liegen. Verfügbarkeitsgruppen verfügen über eine Fehlerisolierung für viele mögliche Fehler, minimieren einzelne Fehlerpunkte und bieten Hochverfügbarkeit. Verfügbarkeitsgruppen sind dennoch anfällig für bestimmte Ausfälle gemeinsam genutzter Infrastrukturen, z. B. Netzwerkausfälle im Rechenzentrum, die mehrere Fehlerdomänen betreffen können. Wie funktionieren Verfügbarkeitsgruppen? Jeder virtuellen Maschine in Ihrem Verfügbarkeitssatz wird von der zugrunde liegenden Azure-Plattform eine Updatedomäne und eine Fehlerdomäne zugewiesen . Jeder Verfügbarkeitssatz kann mit bis zu 3 Fehlerdomänen und 20 Updatedomänen konfiguriert werden. Diese Konfigurationen können nach dem Erstellen des Verfügbarkeitssatzes nicht mehr geändert werden. Updatedomänen geben Gruppen von virtuellen Maschinen und zugrunde liegender physischer Hardware an, die gleichzeitig neu gestartet werden können. Wenn mehr als fünf virtuelle Maschinen innerhalb eines einzelnen Verfügbarkeitssatzes mit fünf Updatedomänen konfiguriert sind, wird die sechste virtuelle Maschine in derselben Updatedomäne wie die erste virtuelle Maschine platziert, die siebte in derselben Updatedomäne wie die zweite virtuelle Maschine usw. Die Reihenfolge des Neustarts der Updatedomänen kann während der geplanten Wartung unterschiedlich sein, aber es wird immer nur eine Updatedomäne neu gestartet. Einer neu gestarteten Updatedomäne werden 30 Minuten Zeit zur Wiederherstellung gegeben, bevor die Wartung einer anderen Updatedomäne gestartet wird. Fehlerdomänen definieren die Gruppe von virtuellen Maschinen, die eine gemeinsame Stromquelle und einen gemeinsamen Netzwerk-Switch verwenden. Standardmäßig sind die in Ihrem Verfügbarkeitssatz konfigurierten virtuellen Maschinen auf bis zu drei Fehlerdomänen verteilt. Das Platzieren Ihrer virtuellen Maschinen in einem Verfügbarkeitssatz schützt Ihre Anwendung zwar nicht vor Betriebssystem- oder anwendungsspezifischen Fehlern, begrenzt jedoch die Auswirkungen potenzieller physischer Hardwarefehler, Netzwerkausfälle oder Stromunterbrechungen."
  },
  {
    id: "real-524",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Azure Monitor bietet einen Überblick über den Zustand von Azure-Diensten und -Regionen." },
      { id: "B", text: "Azure Resource Health bietet einen Überblick über den Zustand von Azure-Diensten und -Regionen." },
      { id: "C", text: "Azure Service Health bietet einen Überblick über den Zustand von Azure-Diensten und -Regionen." },
      { id: "D", text: "Der Azure-Status bietet einen Überblick über den Zustand der Azure-Dienste und -Regionen." },
    ],
    correct: "D",
    explanation: "Der Azure-Status bietet Ihnen einen globalen Überblick über den Zustand von Azure-Diensten und -Regionen. Mit dem Azure-Status erhalten Sie Informationen zur Dienstverfügbarkeit. Der Azure-Status ist für alle verfügbar, um alle Dienste anzuzeigen, die ihren Dienstzustand melden, sowie Vorfälle mit weitreichenden Auswirkungen."
  },
  {
    id: "real-523",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Über Azure Cloud Shell können Sie die regulatorischen Standards und Vorschriften Ihres Unternehmens, beispielsweise ISO 27001, verfolgen." },
      { id: "B", text: "Über das Microsoft Cloud Partner Portal können Sie die regulatorischen Standards und Vorschriften Ihres Unternehmens, beispielsweise ISO 27001, verfolgen." },
      { id: "C", text: "Mit dem Compliance Manager können Sie die regulatorischen Standards und Vorschriften Ihres Unternehmens, beispielsweise ISO 27001, verfolgen." },
      { id: "D", text: "Vom Trust Center aus können Sie die regulatorischen Standards und Vorschriften Ihres Unternehmens, wie beispielsweise ISO 27001, verfolgen." },
    ],
    correct: "C",
    explanation: "Microsoft Compliance Manager ist eine Funktion im Microsoft 365 Compliance Center, mit der Sie die Compliance-Anforderungen Ihres Unternehmens einfacher und bequemer verwalten können. Compliance Manager unterstützt Sie auf Ihrem gesamten Weg zur Compliance – von der Bestandsaufnahme Ihrer Datenschutzrisiken über die Verwaltung der Komplexität der Implementierung von Kontrollen, die Einhaltung aktueller Vorschriften und Zertifizierungen bis hin zur Berichterstattung an Prüfer. Compliance Manager vereinfacht die Einhaltung von Vorschriften und reduziert Risiken durch folgende Funktionen: • Vorgefertigte Bewertungen für gängige Branchen- und regionale Standards und Vorschriften oder benutzerdefinierte Bewertungen, um Ihre individuellen Compliance- Anforderungen zu erfüllen (die verfügbaren Bewertungen hängen von Ihrer Lizenzvereinbarung ab). • Workflow-Funktionen helfen Ihnen, Ihre Risikobewertungen effizient mit einem einzigen Tool durchzuführen. • Detaillierte Schritt-für-Schritt-Anleitungen zu vorgeschlagenen Verbesserungsmaßnahmen, die Ihnen dabei helfen, die für Ihr Unternehmen relevantesten Standards und Vorschriften einzuhalten. Für von Microsoft verwaltete Aktionen werden Implementierungsdetails und Überwachungsergebnisse angezeigt. • Ein risikobasierter Compliance-Score, der Ihnen hilft, Ihre Compliance-Haltung zu verstehen, indem er Ihren Fortschritt bei der Durchführung von Verbesserungsmaßnahmen misst."
  },
  {
    id: "real-522",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Eine Organisation migriert zu Cloud-Diensten, um die Infrastrukturkosten sowohl als Kapital- als auch als Betriebsausgaben zu budgetieren ." },
      { id: "B", text: "Eine Organisation migriert zu Cloud-Diensten, um Infrastrukturkosten als Kapitalausgaben einzuplanen ." },
      { id: "C", text: "Eine Organisation migriert zu Cloud-Diensten, um Infrastrukturkosten weder als Kapital- noch als Betriebskosten einzuplanen ." },
      { id: "D", text: "Eine Organisation migriert zu Cloud-Diensten, um Infrastrukturkosten als Betriebsausgaben einzuplanen ." },
    ],
    correct: "D",
    explanation: "Das Standardmodell der traditionellen IT-Beschaffung sind die Investitionsausgaben (CapEx), während die Betriebsausgaben (OpEx) die Beschaffung von Cloud-Computing- Diensten darstellen. Beide haben sehr unterschiedliche Auswirkungen auf Kosten, Kontrolle und betriebliche Flexibilität. CapEx - Kapitalausgaben Bei der CapEx-Beschaffung tätigen Sie erhebliche Vorabinvestitionen, um Ihre kritischen IT-Ressourcen zu erwerben und zu warten. Dies geht mit versunkenen Kosten einher, die eine Anpassung an sich ändernde Geschäftsanforderungen erschweren und andere Projekte, die Finanzmittel benötigen, behindern oder zum Scheitern bringen können. Wenn die Nutzungsdauer eines Investitionsguts jedoch mehr als ein Jahr beträgt, kann es in der Regel durch Abschreibung finanziert werden. Dies ermöglicht Steuerabzüge, da der Kauf mit zunehmender Abnutzung einhergeht. Sie haben außerdem die volle Kontrolle über Ihre Ressourcen, ohne stark von externen Anbietern abhängig zu sein. CapEx ist mit zahlreichen Einschränkungen verbunden, unter anderem: • Der für diese Vermögenswerte erforderliche physische Platz, • Ihre stetige Abwertung, • Die erforderliche und oft komplexe technische Einrichtung und • Lange Akquisitionszyklen. Diese Einschränkungen machen die Cloud überhaupt erst zu einer attraktiven Upgrade-Option. Physische Server spielen jedoch für viele Unternehmen nach wie vor eine wichtige Rolle, da sie zum Aufbau ihrer Hybrid-IT- und Multi-Cloud-Strategien genutzt werden. Beispiele für CapEx-Projekte: • Aufbau einer Serverfarm zum Hosten von Geschäftsanwendungen • Erstellen eines Storage Area Network zum Hosten von Daten über Anwendungen hinweg • Investition in neue Netzwerkausrüstung zur Leistungsverbesserung OpEx - Betriebsausgaben Mit OpEx und Technologien wie der Public Cloud gewinnen Sie deutlich mehr Flexibilität als mit CapEx: • Die Pay-as-you-go-Struktur ermöglicht vorhersehbare Ausgaben, wobei die Kapazität an die aktuelle Nachfrage angepasst werden kann und zukünftiges Wachstum ermöglicht. • Die Kosten richten sich nach dem Verbrauch, wodurch das Risiko einer Überversorgung geringer ist. Um übermäßige Ausgaben zu vermeiden, ist es jedoch wichtig, eine Lösung zu verwenden, die auf den tatsächlichen Bedarf abgestimmt und durch Automatisierung unterstützt wird. • Dank der Verfügbarkeit von On-Demand-Ressourcen und der Möglichkeit, die Kapazität durch Bursting und Elastizität je nach Bedarf nach oben oder unten zu skalieren, lassen sich Projekte leichter umstellen. • Darüber hinaus können Geschäftseinheiten die Verantwortung für Budgets übernehmen, die früher ausschließlich in den Zuständigkeitsbereich der IT- Abteilung fielen. Gleichzeitig verlieren Sie einen Teil der Kontrolle über Ihre IT-Infrastruktur und müssen sich oft mit eingeschränkten Anbieter-Tools begnügen. Dies erschwert die Überwachung der Cloud-Leistung im Kontext Ihrer Geschäftsanforderungen. Die Betriebskosten können sogar teurer werden als der Kauf eines gleichwertigen Investitionsguts, insbesondere wenn es keine Verantwortlichkeit für Benutzer oder Optimierungen innerhalb des Cloud-Service-Budgets gibt . Unkontrolliert führt der Self-Service, der den Kern der Cloud ausmacht, häufig zu dem bekannten Problem der Kostenüberschreitung. Dies tritt typischerweise auf, wenn Abteilungen und einzelne Benutzer Cloud-Instanzen ohne konsistenten Governance-Rahmen bereitstellen, außer Betrieb nehmen und verwalten. Die Antwort auf die Frage „Soll ich für meine Infrastruktur ein CapEx- oder OpEx-Modell verwenden?“ hängt immer von der jeweiligen Situation ab. Mit der zunehmenden Beliebtheit der Public Cloud steigen jedoch auch die OpEx-Kosten. Entscheidende Entscheidungen über Ihre Cloud-Umgebungen und die optimale Nutzung einer OpEx- Bereitstellung sind deutlich einfacher, wenn Sie über einen klar definierten Prozess zur Kostenprognose und die technischen Lösungen für deren Verwaltung verfügen. Beispiele für OpEx-Ausgaben sind: • Nutzung der öffentlichen Cloud • Gebühren für Telekommunikationsdienste • Offsite-Backup/Archivspeicher"
  },
  {
    id: "real-521",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Der Azure Standard- Supportplan ist die kostengünstigste Option, um rund um die Uhr telefonischen Zugang zu Supporttechnikern zu erhalten. B Der Azure Developer- Supportplan ist die kostengünstigste Option, um rund um die Uhr telefonischen Zugang zu Supporttechnikern zu erhalten." },
      { id: "C", text: "Der Azure Basic- Supportplan ist die kostengünstigste Option, um rund um die Uhr telefonischen Zugang zu Supporttechnikern zu erhalten." },
      { id: "D", text: "Der Azure Professional Direct -Supportplan ist die kostengünstigste Option, um rund um die Uhr telefonischen Zugang zu Supporttechnikern zu erhalten." },
    ],
    correct: "A",
    explanation: "Es sind keine Änderungen erforderlich. Der Basis-Supportplan beinhaltet keinen 24/7-Zugang zum technischen Support und der Entwickler-Supportplan bietet technischen Support nur während der Geschäftszeiten und ausschließlich per E-Mail. Referenz Supportpläne vergleichen"
  },
  {
    id: "real-516",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Wenn Microsoft plant, den Support für einen Azure-Dienst einzustellen, für den es KEINEN Nachfolgedienst gibt, benachrichtigt Microsoft Sie mindestens 12 Monate im Voraus." },
      { id: "B", text: "Wenn Microsoft plant, den Support für einen Azure-Dienst einzustellen, für den es KEINEN Nachfolgedienst gibt, benachrichtigt Microsoft Sie mindestens sechs Monate vorher." },
      { id: "C", text: "Wenn Microsoft plant, den Support für einen Azure-Dienst einzustellen, für den es KEINEN Nachfolgedienst gibt, benachrichtigt Microsoft Sie mindestens 90 Tage vorher." },
      { id: "D", text: "Wenn Microsoft plant, den Support für einen Azure-Dienst einzustellen, für den es KEINEN Nachfolgedienst gibt, benachrichtigt Microsoft Sie mindestens 30 Tage vorher." },
    ],
    correct: "A",
    explanation: "Bei Produkten, die der Modern-Lifecycle-Richtlinie unterliegen, benachrichtigt Microsoft Sie mindestens 12 Monate vor dem Ende des Supports, wenn kein Nachfolgeprodukt oder -dienst angeboten wird – ausgenommen kostenlose Dienste oder Vorabversionen. Modern-Lifecycle-Richtlinie"
  },
  {
    id: "real-515",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Sie stellen eine Azure-Ressource bereit. Aufgrund eines Dienstausfalls ist die Ressource für einen längeren Zeitraum nicht verfügbar. Microsoft erstattet den Betrag automatisch auf Ihr Bankkonto zurück ." },
      { id: "B", text: "Sie stellen eine Azure-Ressource bereit. Aufgrund eines Dienstausfalls ist die Ressource für einen längeren Zeitraum nicht verfügbar. Microsoft migriert die Ressource automatisch in ein anderes Abonnement ." },
      { id: "C", text: "Sie stellen eine Azure-Ressource bereit. Aufgrund eines Dienstausfalls ist die Ressource für einen längeren Zeitraum nicht verfügbar. Microsoft schreibt Ihrem Konto automatisch den Betrag gut ." },
      { id: "D", text: "Sie stellen eine Azure-Ressource bereit. Aufgrund eines Dienstausfalls ist die Ressource für einen längeren Zeitraum nicht verfügbar. Microsoft sendet Ihnen einen Gutscheincode, den Sie gegen Azure-Guthaben einlösen können ." },
    ],
    correct: "C",
    explanation: "Microsoft ist bereit, für Azure-Dienstausfälle, die nicht im Service Level Agreement (SLA) vereinbart wurden, eine Rückerstattung zu zahlen. In manchen Fällen geschieht dies automatisch. In der Regel muss der Kunde die Rückerstattung jedoch selbst beantragen. Was passiert, wenn Microsoft sein SLA nicht einhält? Es liegt in der Verantwortung des Kunden oder Partners, festzustellen, ob das Microsoft Azure Service Level Agreement nicht eingehalten wurde. Um einen Anspruch bezüglich eines Vorfalls geltend machen zu können, muss der Kunde den Kundensupport innerhalb von fünf Werktagen nach dem Vorfall über den Vorfall informieren. Der Kunde muss außerdem ausreichende Beweise zur Unterstützung des Anspruchs vorlegen. Sobald der Anspruch von Microsoft bestätigt wurde, wird für SLAs zwischen 99,5 % und 99 % eine Gutschrift von 10 % gewährt. Für SLAs unter 99 % wird für den jeweiligen Monat, in dem das SLA nicht eingehalten wurde, eine Gutschrift von 25 % ausgestellt. Weitere Informationen zum Azure SLA finden Sie im Service Level Agreement."
  },
  {
    id: "real-514",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Azure Key Vault wird zum Speichern von Geheimnissen für Microsoft Entra ID-Benutzerkonten verwendet ." },
      { id: "B", text: "Azure Key Vault wird zum Speichern von Geheimnissen für Microsoft Entra ID-Administratorkonten verwendet ." },
      { id: "C", text: "Azure Key Vault wird zum Speichern von Geheimnissen für personenbezogene Daten (PII) verwendet ." },
      { id: "D", text: "Azure Key Vault wird zum Speichern von Geheimnissen für Serveranwendungen verwendet ." },
    ],
    correct: "D",
    explanation: "Durch die zentrale Speicherung von Anwendungsgeheimnissen in Azure Key Vault können Sie deren Verteilung steuern. Key Vault reduziert das Risiko eines versehentlichen Verlusts von Geheimnissen erheblich. Bei Verwendung von Key Vault müssen Anwendungsentwickler keine Sicherheitsinformationen mehr in ihrer Anwendung speichern. Da Sicherheitsinformationen nicht in Anwendungen gespeichert werden müssen, entfällt die Notwendigkeit, diese Informationen in den Code zu integrieren. Beispielsweise muss eine Anwendung möglicherweise eine Verbindung zu einer Datenbank herstellen. Anstatt die Verbindungszeichenfolge im Code der App zu speichern, können Sie sie sicher in Key Vault speichern. Azure Key Vault hilft bei der Lösung der folgenden Probleme: • Geheimnisverwaltung – Azure Key Vault kann verwendet werden, um Token, Passwörter, Zertifikate, API-Schlüssel und andere Geheimnisse sicher zu speichern und den Zugriff darauf streng zu kontrollieren. • Schlüsselverwaltung : Azure Key Vault kann auch als Schlüsselverwaltungslösung verwendet werden. Azure Key Vault erleichtert das Erstellen und Verwalten der Verschlüsselungsschlüssel, die zum Verschlüsseln Ihrer Daten verwendet werden. • Zertifikatsverwaltung – Azure Key Vault ist auch ein Dienst, mit dem Sie öffentliche und private Transport Layer Security/Secure Sockets Layer (TLS/SSL)- Zertifikate für die Verwendung mit Azure und Ihren intern verbundenen Ressourcen einfach bereitstellen, verwalten und einsetzen können. • Speichern Sie Geheimnisse, die durch Hardware-Sicherheitsmodule gesichert sind – Die Geheimnisse, Schlüssel und Zertifikate im Speicher werden entweder mit einem Softwareschlüssel (Standardstufe) oder einem FIPS 140-2 Level 2-validierten HSM-Schlüssel (Premiumstufe) verschlüsselt."
  },
  {
    id: "real-513",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Sie verfügen über ein virtuelles Azure-Netzwerk namens VNET1 in einer Ressourcengruppe namens RG1. Sie weisen eine Azure-Richtlinie zu, die angibt, dass virtuelle Netzwerke in RG1 kein zulässiger Ressourcentyp sind. VNET1 wird automatisch gelöscht ." },
      { id: "C", text: "Sie verfügen über ein virtuelles Azure-Netzwerk namens VNET1 in einer Ressourcengruppe namens RG1. Sie weisen eine Azure-Richtlinie zu, die angibt, dass virtuelle Netzwerke in RG1 kein zulässiger Ressourcentyp sind. VNET1 funktioniert weiterhin normal ." },
      { id: "D", text: "Sie verfügen über ein virtuelles Azure-Netzwerk namens VNET1 in einer Ressourcengruppe namens RG1. Sie weisen eine Azure-Richtlinie zu, die angibt, dass virtuelle Netzwerke in RG1 kein zulässiger Ressourcentyp sind. VNET1 ist jetzt ein schreibgeschütztes Objekt ." },
    ],
    correct: "C",
    explanation: "Mit der Richtlinie „Nicht zulässige Ressourcentypen“ können Sie die Ressourcentypen angeben, die Ihre Organisation in einem bestimmten Bereich nicht bereitstellen kann. Vorhandene Ressourcen sind von der Richtlinie nicht betroffen."
  },
  {
    id: "real-512",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Sie planen, 20 virtuelle Maschinen in einer Azure-Umgebung bereitzustellen. Um sicherzustellen, dass eine virtuelle Maschine mit dem Namen VM1 keine Verbindung zu den anderen virtuellen Maschinen herstellen kann, muss VM1 in einem separaten virtuellen Netzwerk bereitgestellt werden ." },
      { id: "C", text: "Sie planen, 20 virtuelle Maschinen in einer Azure-Umgebung bereitzustellen. Um sicherzustellen, dass eine virtuelle Maschine mit dem Namen VM1 keine Verbindung zu den anderen virtuellen Maschinen herstellen kann, muss VM1 in einer separaten Ressourcengruppe bereitgestellt werden ." },
      { id: "D", text: "Sie planen, 20 virtuelle Maschinen in einer Azure-Umgebung bereitzustellen. Um sicherzustellen, dass eine virtuelle Maschine mit dem Namen VM1 keine Verbindung zu den anderen virtuellen Maschinen herstellen kann, muss VM1 über zwei Netzwerkschnittstellen verfügen ." },
    ],
    correct: "A",
    explanation: "Die Anweisung verwendet die beste verfügbare Option zur Vervollständigung. Keine Änderung erforderlich."
  },
  {
    id: "real-511",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Wenn Sie eine Software-as-a-Service-Lösung (SaaS) implementieren, sind Sie für die Konfiguration der Hochverfügbarkeit verantwortlich ." },
      { id: "B", text: "Wenn Sie eine Software-as-a-Service-Lösung (SaaS) implementieren, sind Sie für die Definition von Skalierbarkeitsregeln verantwortlich ." },
      { id: "C", text: "Wenn Sie eine Software-as-a-Service-Lösung (SaaS) implementieren, sind Sie für die Installation der SaaS-Lösung verantwortlich ." },
      { id: "D", text: "Wenn Sie eine Software-as-a-Service-Lösung (SaaS) implementieren, sind Sie für die Konfiguration der SaaS-Lösung verantwortlich ." },
    ],
    correct: "D",
    explanation: "Software as a Service (SaaS) ist ein Softwarelizenzierungs- und Bereitstellungsmodell, bei dem Software an einen Benutzer lizenziert wird. Der Zugriff auf die Software bzw. Anwendung erfolgt über das Internet und einen Webbrowser. Sie müssen die Software nicht lokal installieren und warten. Sie können sofort mit der Konfiguration und Nutzung beginnen."
  },
  {
    id: "real-507",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Wenn für Windows Server- oder Microsoft SQL Server-Lizenzen ein Endbenutzer-Lizenzvertrag (EULA) gilt , können Sie die Lizenzen auf Azure Virtual Machines umfunktionieren." },
      { id: "B", text: "Wenn Windows Server- oder Microsoft SQL Server-Lizenzen durch die Microsoft Lifecycle Policy abgedeckt sind , können Sie die Lizenzen auf Azure Virtual Machines umfunktionieren." },
      { id: "C", text: "Wenn Windows Server- oder Microsoft SQL Server-Lizenzen durch Software Assurance abgedeckt sind , können Sie die Lizenzen auf Azure Virtual Machines umfunktionieren." },
    ],
    correct: "C",
    explanation: "Kunden mit Software Assurance- oder Abonnementlizenzen können mit dem Azure-Hybridvorteil für Windows Server ihre lokalen Windows Server-Lizenzen nutzen, um virtuelle Windows-Computer zu reduzierten Kosten in Azure zu erhalten. Mit dem Azure-Hybridvorteil für Windows Server können Sie neue virtuelle Computer mit Windows- Betriebssystem bereitstellen."
  },
  {
    id: "real-505",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Azure AD Connect erweitert die Azure-Compliance und -Überwachung auf Hybrid- und Multicloud-Konfigurationen." },
      { id: "B", text: "Azure Arc erweitert die Azure-Compliance und -Überwachung auf Hybrid- und Multicloud-Konfigurationen." },
      { id: "C", text: "Azure Front Door erweitert die Azure-Compliance und -Überwachung auf Hybrid- und Multicloud-Konfigurationen." },
      { id: "D", text: "Azure Policy erweitert die Azure-Compliance und -Überwachung auf Hybrid- und Multicloud-Konfigurationen." },
    ],
    correct: "B",
    explanation: "Unternehmen haben heute Schwierigkeiten, zunehmend komplexe Umgebungen zu kontrollieren und zu verwalten, die sich über Rechenzentren, mehrere Clouds und Edge- Umgebungen erstrecken. Jede Umgebung und Cloud verfügt über eigene Verwaltungstools, und neue DevOps- und ITOps-Betriebsmodelle lassen sich nur schwer ressourcenübergreifend implementieren. Azure Arc vereinfacht Governance und Verwaltung durch die Bereitstellung einer konsistenten Multicloud- und lokalen Verwaltungsplattform. Azure Arc bietet eine zentralisierte, einheitliche Möglichkeit für: • Verwalten Sie Ihre gesamte Umgebung gemeinsam, indem Sie Ihre vorhandenen Nicht-Azure- und/oder lokalen Ressourcen in Azure Resource Manager projizieren. • Verwalten Sie virtuelle Maschinen, Kubernetes-Cluster und Datenbanken, als würden sie in Azure ausgeführt. • Nutzen Sie vertraute Azure-Dienste und Verwaltungsfunktionen, unabhängig davon, wo sie sich befinden. • Verwenden Sie weiterhin traditionelle ITOps, während Sie DevOps-Praktiken einführen, um neue Cloud-native Muster in Ihrer Umgebung zu unterstützen. • Konfigurieren Sie benutzerdefinierte Standorte als Abstraktionsebene über Azure Arc-fähigen Kubernetes-Clustern und Clustererweiterungen. Derzeit können Sie mit Azure Arc die folgenden Ressourcentypen verwalten, die außerhalb von Azure gehostet werden: • Server: Verwalten Sie physische Windows- und Linux-Server und virtuelle Maschinen, die außerhalb von Azure gehostet werden. • Kubernetes-Cluster: Verbinden und konfigurieren Sie Kubernetes-Cluster, die überall ausgeführt werden können, mit mehreren unterstützten Distributionen. • Azure-Datendienste: Führen Sie Azure-Datendienste vor Ort, am Edge und in öffentlichen Clouds mit Kubernetes und der Infrastruktur Ihrer Wahl aus. SQL Managed Instance und PostgreSQL (Vorschau) sind derzeit verfügbar. • SQL Server: Erweitern Sie Azure-Dienste auf SQL Server-Instanzen, die außerhalb von Azure gehostet werden. • Virtuelle Maschinen (Vorschau): Bereitstellen, Ändern der Größe, Löschen und Verwalten virtueller Maschinen basierend auf VMware vSphere oder Azure Stack HCI und Aktivieren der VM-Selbstbedienung durch rollenbasierten Zugriff."
  },
  {
    id: "real-503",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Azure Data Box ist ein physischer Migrationsdienst, mit dem große Datenmengen schnell, kostengünstig und zuverlässig übertragen werden können." },
      { id: "B", text: "Azure Databricks ist ein physischer Migrationsdienst, mit dem große Datenmengen schnell, kostengünstig und zuverlässig übertragen werden können." },
      { id: "C", text: "Azure File Sync ist ein physischer Migrationsdienst, mit dem große Datenmengen schnell, kostengünstig und zuverlässig übertragen werden können." },
      { id: "D", text: "Azure Migrate ist ein physischer Migrationsdienst, mit dem große Datenmengen schnell, kostengünstig und zuverlässig übertragen werden können." },
    ],
    correct: "A",
    explanation: "Mit der Microsoft Azure Data Box-Cloudlösung können Sie schnell, kostengünstig und zuverlässig Terabyte an Daten in und aus Azure übertragen. Die sichere Datenübertragung wird durch die Lieferung eines proprietären Data Box-Speichergeräts beschleunigt. Jedes Speichergerät verfügt über eine maximal nutzbare Speicherkapazität von 80 TB und wird durch einen regionalen Spediteur zu Ihrem Rechenzentrum transportiert. Das Gerät verfügt über ein robustes Gehäuse zum Schutz und zur Sicherung der Daten während des Transports."
  },
  {
    id: "real-499",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Durch die hohe Verfügbarkeit wird der Zugriff auf Cloud-Ressourcen im Falle eines Dienstausfalls sichergestellt." },
      { id: "B", text: "Durch Vorhersehbarkeit wird der Zugriff auf Cloud-Ressourcen im Falle eines Dienstausfalls sichergestellt." },
      { id: "C", text: "Zuverlässigkeit gewährleistet den Zugriff auf Cloud-Ressourcen im Falle eines Dienstausfalls." },
      { id: "D", text: "Durch die Skalierbarkeit wird der Zugriff auf Cloud-Ressourcen im Falle eines Dienstausfalls sichergestellt." },
    ],
    correct: "A",
    explanation: "Hochverfügbarkeit (HA) bezeichnet die Fähigkeit eines Systems, über einen bestimmten Zeitraum hinweg störungsfrei zu arbeiten. HA stellt sicher, dass ein System ein vereinbartes Leistungsniveau erreicht. In der Informationstechnologie (IT) ist die sogenannte 99,999 %-Verfügbarkeit ein weit verbreiteter, aber schwer zu erreichender Verfügbarkeitsstandard. Dies bedeutet, dass das System oder Produkt zu 99,999 % der Zeit verfügbar ist. Um Hochverfügbarkeit auch bei hohem Benutzerzugriff auf ein System zu gewährleisten, ist Lastausgleich erforderlich. Lastausgleich verteilt Arbeitslasten automatisch auf die Systemressourcen, beispielsweise durch das Senden verschiedener Datenanfragen an unterschiedliche Dienste in einer Hybrid-Cloud-Architektur. Der Lastausgleich entscheidet, welche Systemressource welche Arbeitslast am effizientesten bewältigen kann. Durch den Einsatz mehrerer Lastausgleicher wird sichergestellt, dass keine Ressource überlastet wird. Die Server eines HA-Systems sind in Clustern angeordnet und in einer mehrstufigen Architektur organisiert, um auf Anfragen der Lastausgleicher reagieren zu können. Fällt ein Server im Cluster aus, kann ein replizierter Server in einem anderen Cluster die für den ausgefallenen Server vorgesehene Arbeitslast bewältigen. Diese Art der Redundanz ermöglicht ein Failover, bei dem eine sekundäre Komponente die Aufgabe einer primären Komponente übernimmt, wenn die erste Komponente ausfällt, mit minimalen Auswirkungen auf die Leistung."
  },
  {
    id: "real-495",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "VNet1 wird automatisch gelöscht ." },
      { id: "B", text: "VNet1 wird automatisch in eine andere Ressourcengruppe verschoben ." },
      { id: "C", text: "VNet1 funktioniert weiterhin normal ." },
      { id: "D", text: "VNet1 ist jetzt ein schreibgeschütztes Objekt ." },
    ],
    correct: "C",
    explanation: "Mit der Richtlinie „Nicht zulässige Ressourcentypen“ können Sie die Ressourcentypen angeben, die Ihre Organisation in einem bestimmten Bereich nicht bereitstellen kann. Vorhandene Ressourcen sind von der Richtlinie nicht betroffen."
  },
  {
    id: "real-494",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Ein Azure-SLA ist eine formelle Vereinbarung zwischen Microsoft und einem Kunden, die die Verpflichtung zur Bereitstellung der Funktionen einer Technologie-Roadmap definiert ." },
      { id: "B", text: "Ein Azure-SLA ist eine formelle Vereinbarung zwischen Microsoft und einem Kunden, die eine Verpflichtung zu Leistungsstandards definiert ." },
      { id: "C", text: "Ein Azure-SLA ist eine formelle Vereinbarung zwischen Microsoft und einem Kunden, die die maximalen Skalierbarkeitsgrenzen einer verfügbaren Infrastruktur definiert ." },
      { id: "D", text: "Ein Azure-SLA ist eine formelle Vereinbarung zwischen Microsoft und einem Kunden, die die Mindestgrenzen der Skalierbarkeit einer verfügbaren Infrastruktur definiert ." },
    ],
    correct: "B",
    explanation: "Das Azure Service Level Agreement (SLA) beschreibt Microsofts Verpflichtungen hinsichtlich Verfügbarkeit und Konnektivität für einzelne Azure-Dienste. Jeder Azure-Dienst verfügt über ein eigenes SLA mit zugehörigen Bedingungen, Einschränkungen und Servicegutschriften. Einige (kostenlose) Dienste, z. B. Azure DevTest Labs, haben kein SLA. Andere Dienste, wie z. B. virtuelle Maschinen, erfordern eine spezielle Konfiguration. Das SLA beginnt bei niedrigen 95 % für virtuelle Maschinen mit Einzelinstanzen und Standard-HDD-Festplatten und reicht bis zu 99,99 % für virtuelle Maschinen mit mehreren Instanzen, die in zwei oder mehr Verfügbarkeitszonen in derselben Azure-Region bereitgestellt werden. SLAs werden regelmäßig aktualisiert und haben daher immer eine Versionsnummer."
  },
  {
    id: "real-492",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Eine Azure DevOps-Pipeline führt Anwendungscode in Azure aus, ohne dass ein Server erforderlich ist." },
      { id: "B", text: "Eine Azure Resource Manager-Vorlage führt Anwendungscode in Azure aus, ohne dass ein Server erforderlich ist." },
      { id: "C", text: "Azure Application Gateway führt Anwendungscode in Azure aus, ohne dass ein Server erforderlich ist." },
      { id: "D", text: "Azure Functions führt Anwendungscode in Azure aus, ohne dass ein Server erforderlich ist." },
    ],
    correct: "D",
    explanation: "Azure Functions ist eine serverlose Lösung, mit der Sie weniger Code schreiben, weniger Infrastruktur pflegen und Kosten sparen. Anstatt sich um die Bereitstellung und Wartung von Servern zu kümmern, bietet die Cloud-Infrastruktur alle aktuellen Ressourcen, die Sie für den Betrieb Ihrer Anwendungen benötigen. Sie konzentrieren sich auf den Code, der für Sie am wichtigsten ist, in der für Sie produktivsten Sprache, und Azure Functions erledigt den Rest. Wir erstellen häufig Systeme, um auf eine Reihe kritischer Ereignisse zu reagieren. Ob Sie eine Web-API erstellen, auf Datenbankänderungen reagieren, IoT-Datenströme verarbeiten oder sogar Nachrichtenwarteschlangen verwalten – jede Anwendung muss Code ausführen können, wenn diese Ereignisse eintreten. Um diesem Bedarf gerecht zu werden, bietet Azure Functions „Compute on demand“ auf zwei wichtige Arten. Erstens können Sie mit Azure Functions die Logik Ihres Systems in sofort verfügbare Codeblöcke implementieren. Diese Codeblöcke werden als „Funktionen“ bezeichnet. Verschiedene Funktionen können jederzeit ausgeführt werden, wenn Sie auf kritische Ereignisse reagieren müssen. Zweitens erfüllt Azure Functions bei steigenden Anforderungen die Nachfrage mit so vielen Ressourcen und Funktionsinstanzen wie nötig – aber nur so lange, wie sie benötigt werden. Wenn die Anforderungen sinken, werden alle zusätzlichen Ressourcen und Anwendungsinstanzen automatisch abgeschaltet. Woher kommen all die Rechenressourcen? Azure Functions stellt so viele oder so wenige Rechenressourcen bereit, wie benötigt werden, um die Nachfrage Ihrer Anwendung zu erfüllen. Die Bereitstellung von Rechenressourcen on demand ist die Essenz des serverlosen Computing in Azure Functions."
  },
  {
    id: "real-469",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Wenn Sie die Migration einer öffentlichen Website zu Azure planen, müssen Sie die Bereitstellung eines VPN einplanen ." },
      { id: "B", text: "Wenn Sie planen, eine öffentliche Website zu Azure zu migrieren, müssen Sie mit monatlichen Nutzungskosten rechnen ." },
      { id: "C", text: "Wenn Sie planen, eine öffentliche Website zu Azure zu migrieren, müssen Sie mit der Zahlung für die Übertragung aller Website-Daten zu Azure rechnen ." },
      { id: "D", text: "Wenn Sie die Migration einer öffentlichen Website zu Azure planen, müssen Sie die Anzahl der Verbindungen zur Website reduzieren ." },
    ],
    correct: "B",
    explanation: "Azure ist ein Pay-as-you-go-Dienst, d. h. die Kosten werden nutzungsabhängig berechnet. Sie müssen monatliche Nutzungskosten für die Azure- Dienste und -Ressourcen einplanen, die Sie zum Hosten Ihrer Website verwenden."
  },
  {
    id: "real-467",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Wenn eine Cloud-App Ressourcen zuweisen und freigeben kann, verfügt sie über Elastizität ." },
      { id: "B", text: "Wenn eine Cloud-App Ressourcen zuweisen und freigeben kann, verfügt sie über Governance ." },
      { id: "C", text: "Wenn eine Cloud-App Ressourcen zuweisen und freigeben kann, verfügt sie über eine hohe Verfügbarkeit ." },
      { id: "D", text: "Wenn eine Cloud-App Ressourcen zuweisen und freigeben kann, ist sie vorhersehbar ." },
    ],
    correct: "A",
    explanation: "Elastic Computing ermöglicht es, Rechenleistung, Arbeitsspeicher und Speicherressourcen schnell zu erweitern oder zu reduzieren, um wechselnden Anforderungen gerecht zu werden, ohne sich um Kapazitätsplanung und -planung für Spitzenlasten kümmern zu müssen. Elastic Computing wird in der Regel durch Systemüberwachungstools gesteuert und gleicht die zugewiesene Ressourcenmenge mit der tatsächlich benötigten Ressourcenmenge ab, ohne den laufenden Betrieb zu unterbrechen. Dank Cloud-Elastizität vermeidet ein Unternehmen die Kosten für ungenutzte Kapazitäten oder ungenutzte Ressourcen und muss sich nicht um den Kauf oder die Wartung zusätzlicher Ressourcen und Geräte kümmern. Obwohl Sicherheit und eingeschränkte Kontrolle beim Elastic Cloud Computing zu berücksichtigen sind, bietet es viele Vorteile. Elastic Computing ist effizienter als eine herkömmliche IT-Infrastruktur, in der Regel automatisiert, sodass es nicht rund um die Uhr auf menschliche Administratoren angewiesen ist, und bietet durch die Vermeidung unnötiger Verlangsamungen oder Dienstunterbrechungen kontinuierliche Serviceverfügbarkeit."
  },
  {
    id: "real-465",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Sie können Überwachungsberichte und Compliance-bezogene Informationen für Azure-Dienste von Microsoft Defender für Cloud überprüfen ." },
      { id: "B", text: "Sie können Überwachungsberichte und Compliance-bezogene Informationen für Azure-Dienste im Microsoft Defender for Identity Admin Center überprüfen ." },
      { id: "C", text: "Sie können Überwachungsberichte und Compliance-bezogene Informationen für Azure-Dienste im Microsoft 365 Purview-Compliance- Portal überprüfen ." },
      { id: "D", text: "Sie können Überwachungsberichte und Compliance-bezogene Informationen für Azure-Dienste im Microsoft Service Trust Portal überprüfen ." },
    ],
    correct: "D",
    explanation: "Das Service Trust Portal ist die öffentliche Website von Microsoft zur Veröffentlichung von Prüfberichten und anderen Compliance-bezogenen Informationen zu den Microsoft- Clouddiensten. STP-Benutzer können Prüfberichte externer Prüfer herunterladen und sich in von Microsoft verfassten Whitepapern informieren, die detailliert beschreiben, wie Microsoft-Clouddienste Ihre Daten schützen und wie Sie die Cloud-Datensicherheit und -Compliance für Ihr Unternehmen verwalten können. Um auf einige Ressourcen im Service Trust Portal zugreifen zu können, müssen Sie sich als authentifizierter Benutzer mit Ihrem Microsoft-Clouddienstkonto (Azure Active Directory-Organisationskonto) anmelden und die Microsoft-Vertraulichkeitsvereinbarung für Compliance-Materialien lesen und akzeptieren."
  },
  {
    id: "real-452",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Agilität sorgt dafür, dass Sie die Kosten eines Cloud-Dienstes kalkulieren können." },
      { id: "B", text: "Durch die Elastizität ist die Kalkulation der Kosten eines Cloud-Dienstes möglich." },
      { id: "C", text: "Durch die hohe Verfügbarkeit ist die Kalkulation der Kosten eines Cloud-Dienstes gewährleistet." },
      { id: "D", text: "Durch die Vorhersehbarkeit können Sie die Kosten eines Cloud-Dienstes berechnen." },
    ],
    correct: "D",
    explanation: "Dank der Vorhersagbarkeit in der Cloud können Sie Ihre Aufgaben mit Zuversicht erledigen. Dabei kann der Schwerpunkt auf der Leistungs- oder Kostenvorhersagbarkeit liegen. Sowohl die Leistungs- als auch die Kostenvorhersagbarkeit werden maßgeblich vom Microsoft Azure Well-Architected Framework beeinflusst. Stellen Sie eine Lösung bereit, die auf diesem Framework basiert, und Sie erhalten eine Lösung mit vorhersagbaren Kosten und Leistungen. Bei der Leistungsvorhersage geht es darum, die Ressourcen vorherzusagen, die für ein positives Kundenerlebnis erforderlich sind. Autoscaling, Lastausgleich und Hochverfügbarkeit sind nur einige der Cloud-Konzepte, die die Leistungsvorhersage unterstützen. Wenn Sie plötzlich mehr Ressourcen benötigen, kann Autoscaling zusätzliche Ressourcen bereitstellen, um den Bedarf zu decken, und diese dann wieder reduzieren, wenn der Bedarf sinkt. Oder wenn der Datenverkehr stark auf einen Bereich konzentriert ist, hilft Lastausgleich dabei, einen Teil der Überlastung auf weniger belastete Bereiche umzuleiten. Bei der Kostenvorhersagbarkeit geht es darum, die Kosten der Cloud-Ausgaben vorherzusagen oder zu prognostizieren. Mit der Cloud können Sie Ihre Ressourcennutzung in Echtzeit verfolgen, Ressourcen überwachen, um sicherzustellen, dass Sie sie optimal nutzen, und Datenanalysen anwenden, um Muster und Trends zu erkennen, die eine bessere Planung der Ressourcenbereitstellung ermöglichen. Durch den Betrieb in der Cloud und die Nutzung von Cloud-Analysen und -Informationen können Sie zukünftige Kosten vorhersagen und Ihre Ressourcen bei Bedarf anpassen. Sie können sogar Tools wie die Gesamtbetriebskosten (TCO) oder den Preisrechner verwenden, um eine Schätzung der potenziellen Cloud-Ausgaben zu erhalten."
  },
  {
    id: "real-450",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Anwendungssicherheitsgruppen in Azure ermöglichen Benutzern die Authentifizierung bei mehreren Anwendungen mittels Single Sign-On (SSO)." },
      { id: "B", text: "Azure Active Directory (Azure AD) ermöglicht Benutzern die Authentifizierung bei mehreren Anwendungen mittels Single Sign-On (SSO)." },
      { id: "C", text: "Azure Key Vault ermöglicht Benutzern die Authentifizierung bei mehreren Anwendungen mittels Single Sign-On (SSO)." },
      { id: "D", text: "Microsoft Defender für Cloud ermöglicht Benutzern die Authentifizierung bei mehreren Anwendungen mittels Single Sign-On (SSO)." },
    ],
    correct: "B",
    explanation: "Sie können das Azure-Portal verwenden, um einmaliges Anmelden (Single Sign-On, SSO) für eine Unternehmensanwendung zu aktivieren, die Sie Ihrem Azure Active Directory-Mandanten (Azure AD) hinzugefügt haben. Nachdem Sie SSO konfiguriert haben, können sich Ihre Benutzer mit ihren Azure AD-Anmeldeinformationen anmelden. Darüber hinaus verfügt Azure AD über eine Galerie mit Tausenden vorintegrierten Anwendungen, die SSO verwenden."
  },
  {
    id: "real-447",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Sie können einen lokalen Windows-Server mithilfe von Azure AD Connect als Azure-Ressource verwalten ." },
      { id: "B", text: "Sie können einen lokalen Windows-Server mithilfe von Azure ARC als Azure-Ressource verwalten ." },
      { id: "C", text: "Sie können einen lokalen Windows-Server mithilfe eines Azure Pipelines-Agenten als Azure-Ressource verwalten . D Sie können einen lokalen Windows-Server mithilfe von Azure VPN Gateway als Azure-Ressource verwalten ." },
    ],
    correct: "B",
    explanation: "Unternehmen haben heute Schwierigkeiten, zunehmend komplexe Umgebungen zu kontrollieren und zu verwalten, die sich über Rechenzentren, mehrere Clouds und Edge- Umgebungen erstrecken. Jede Umgebung und Cloud verfügt über eigene Verwaltungstools, und neue DevOps- und ITOps-Betriebsmodelle lassen sich nur schwer ressourcenübergreifend implementieren. Azure Arc vereinfacht Governance und Verwaltung durch die Bereitstellung einer konsistenten Multicloud- und lokalen Verwaltungsplattform. Azure Arc bietet eine zentralisierte, einheitliche Möglichkeit für: • Verwalten Sie Ihre gesamte Umgebung gemeinsam, indem Sie Ihre vorhandenen Nicht-Azure- und/oder lokalen Ressourcen in Azure Resource Manager projizieren. • Verwalten Sie virtuelle Maschinen, Kubernetes-Cluster und Datenbanken, als würden sie in Azure ausgeführt. • Nutzen Sie vertraute Azure-Dienste und Verwaltungsfunktionen, unabhängig davon, wo sie sich befinden. • Verwenden Sie weiterhin traditionelle ITOps, während Sie DevOps-Praktiken einführen, um neue Cloud-native Muster in Ihrer Umgebung zu unterstützen. • Konfigurieren Sie benutzerdefinierte Standorte als Abstraktionsebene über Azure Arc-fähigen Kubernetes-Clustern und Clustererweiterungen. Derzeit können Sie mit Azure Arc die folgenden Ressourcentypen verwalten, die außerhalb von Azure gehostet werden: • Server: Verwalten Sie physische Windows- und Linux-Server und virtuelle Maschinen, die außerhalb von Azure gehostet werden. • Kubernetes-Cluster: Verbinden und konfigurieren Sie Kubernetes-Cluster, die überall ausgeführt werden können, mit mehreren unterstützten Distributionen. • Azure-Datendienste: Führen Sie Azure-Datendienste vor Ort, am Edge und in öffentlichen Clouds mit Kubernetes und der Infrastruktur Ihrer Wahl aus. SQL Managed Instance und PostgreSQL (Vorschau) sind derzeit verfügbar. • SQL Server: Erweitern Sie Azure-Dienste auf SQL Server-Instanzen, die außerhalb von Azure gehostet werden. • Virtuelle Maschinen (Vorschau): Bereitstellen, Ändern der Größe, Löschen und Verwalten virtueller Maschinen basierend auf VMware vSphere oder Azure Stack HCI und Aktivieren der VM-Selbstbedienung durch rollenbasierten Zugriff."
  },
  {
    id: "real-445",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Sie können über das Azure Active Directory Admin Center auf den Compliance Manager zugreifen ." },
      { id: "B", text: "Sie können über das Azure-Portal auf den Compliance Manager zugreifen ." },
      { id: "C", text: "Sie können über das Microsoft 365 Admin Center auf den Compliance Manager zugreifen ." },
      { id: "D", text: "Sie können über das Microsoft Service Trust Portal auf den Compliance Manager zugreifen ." },
    ],
    correct: "C",
    explanation: "Auf den Microsoft Compliance Manager kann über das Microsoft Purview-Compliance-Portal zugegriffen werden, das Teil des Microsoft 365-Admin Centers ist."
  },
  {
    id: "real-443",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Durch Elastizität können Azure-Ressourcen in der Nähe der Benutzer bereitgestellt werden." },
      { id: "B", text: "Durch die Geoverteilung können Azure-Ressourcen in der Nähe der Benutzer bereitgestellt werden." },
      { id: "C", text: "Durch die hohe Verfügbarkeit können Azure-Ressourcen in der Nähe der Benutzer bereitgestellt werden." },
      { id: "D", text: "Durch die Skalierbarkeit können Azure-Ressourcen in der Nähe der Benutzer bereitgestellt werden." },
    ],
    correct: "B",
    explanation: "Eine Cloud-Umgebung bietet gegenüber einer physischen Umgebung mehrere Vorteile, die ein Unternehmen nach der Migration zu Azure nutzen kann. • Hohe Verfügbarkeit: Abhängig von der von Ihnen gewählten Service-Level-Vereinbarung (SLA) können Ihre Cloud-basierten Apps ein kontinuierliches Benutzererlebnis ohne erkennbare Ausfallzeiten bieten, selbst wenn etwas schiefgeht. • Skalierbarkeit: Apps in der Cloud können vertikal und horizontal skaliert werden : o Skalieren Sie vertikal, um die Rechenkapazität zu erhöhen, indem Sie einer virtuellen Maschine RAM oder CPUs hinzufügen. o Durch horizontales Skalieren wird die Rechenkapazität durch das Hinzufügen von Ressourceninstanzen erhöht, beispielsweise durch das Hinzufügen von VMs zur Konfiguration. • Elastizität: Sie können Cloud-basierte Apps so konfigurieren, dass sie die Vorteile der automatischen Skalierung nutzen, sodass Ihre Apps immer über die Ressourcen verfügen, die sie benötigen. • Agilität: Stellen Sie cloudbasierte Ressourcen schnell bereit und konfigurieren Sie sie, wenn sich die Anforderungen Ihrer App ändern. • Geo-Verteilung: Sie können Apps und Daten in regionalen Rechenzentren auf der ganzen Welt bereitstellen und so sicherstellen, dass Ihre Kunden in ihrer Region immer die beste Leistung erhalten. • Notfallwiederherstellung: Durch die Nutzung cloudbasierter Sicherungsdienste, Datenreplikation und Geoverteilung können Sie Ihre Apps mit der Gewissheit bereitstellen, dass Ihre Daten im Katastrophenfall sicher sind."
  },
  {
    id: "real-435",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Application Insights ist eine Funktion von Azure Advisor ." },
      { id: "B", text: "Application Insights ist eine Funktion von Azure Application Gateway ." },
      { id: "C", text: "Application Insights ist eine Funktion von Azure Arc ." },
      { id: "D", text: "Application Insights ist eine Funktion von Azure Monitor ." },
    ],
    correct: "D",
    explanation: "Application Insights, eine Funktion von Azure Monitor, ist ein erweiterbarer Dienst zur Anwendungsleistungsverwaltung (APM) für Entwickler und DevOps-Experten. Verwenden Sie ihn, um Ihre Live-Anwendungen zu überwachen. Er erkennt automatisch Leistungsanomalien und enthält leistungsstarke Analysetools, die Ihnen bei der Diagnose von Problemen helfen und Ihnen helfen zu verstehen, was Benutzer tatsächlich mit Ihrer App machen. Er wurde entwickelt, um Ihnen bei der kontinuierlichen Verbesserung von Leistung und Benutzerfreundlichkeit zu helfen. Er funktioniert für Apps auf einer Vielzahl von Plattformen, darunter .NET, Node.js, Java und Python, die lokal, hybrid oder in einer öffentlichen Cloud gehostet werden. Er lässt sich in Ihren DevOps-Prozess integrieren und verfügt über Verbindungspunkte zu einer Vielzahl von Entwicklungstools. Durch die Integration mit Visual Studio App Center kann er Telemetriedaten von mobilen Apps überwachen und analysieren. Referenzen: Was ist Application Insights? Benutzerbindungsanalyse für Webanwendungen mit Application Insights"
  },
  {
    id: "real-433",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Azure Arc ist eine hochsichere IoT-Lösung, die eine Mikrocontrollereinheit (MCU) und ein angepasstes Linux-Betriebssystem umfasst. B Azure IoT Central ist eine hochsichere IoT-Lösung, die eine Mikrocontrollereinheit (MCU) und ein angepasstes Linux-Betriebssystem umfasst." },
      { id: "C", text: "Azure IoT Hub ist eine hochsichere IoT-Lösung, die eine Mikrocontrollereinheit (MCU) und ein angepasstes Linux-Betriebssystem umfasst." },
      { id: "D", text: "Azure Sphere ist eine hochsichere IoT-Lösung, die eine Mikrocontrollereinheit (MCU) und ein angepasstes Linux-Betriebssystem umfasst." },
    ],
    correct: "D",
    explanation: "Azure Sphere ist eine sichere, hochrangige Anwendungsplattform mit integrierten Kommunikations- und Sicherheitsfunktionen für internetfähige Geräte. Sie umfasst eine sichere, vernetzte Crossover-Mikrocontrollereinheit (MCU), ein benutzerdefiniertes, hochrangiges Linux-basiertes Betriebssystem (OS) und einen cloudbasierten Sicherheitsdienst, der kontinuierliche, erneuerbare Sicherheit bietet. Die Azure Sphere MCU integriert Echtzeitverarbeitungsfunktionen mit der Fähigkeit, ein übergeordnetes Betriebssystem auszuführen. Eine Azure Sphere MCU ermöglicht zusammen mit ihrem Betriebssystem und ihrer Anwendungsplattform die Erstellung sicherer, mit dem Internet verbundener Geräte, die remote aktualisiert, gesteuert, überwacht und gewartet werden können. Ein verbundenes Gerät mit einer Azure Sphere MCU – entweder zusätzlich zu oder anstelle einer vorhandenen MCU – bietet verbesserte Sicherheit, Produktivität und mehr Möglichkeiten. Beispiel: • Eine gesicherte Anwendungsumgebung, authentifizierte Verbindungen und die Opt-in-Nutzung von Peripheriegeräten minimieren Sicherheitsrisiken, die unter anderem durch Spoofing, betrügerische Software oder Denial-of-Service-Angriffe entstehen. • Software-Updates können automatisch aus der Cloud auf jedes verbundene Gerät verteilt werden, um Probleme zu beheben, neue Funktionen bereitzustellen oder neuen Angriffsmethoden entgegenzuwirken und so die Produktivität des Supportpersonals zu steigern. • Produktnutzungsdaten können über eine sichere Verbindung an die Cloud gemeldet werden, um bei der Diagnose von Problemen und der Entwicklung neuer Produkte zu helfen und so die Möglichkeit für Produktservice, positive Kundeninteraktionen und zukünftige Entwicklungen zu verbessern. Der Azure Sphere Security Service ist ein integraler Bestandteil von Azure Sphere. Mit diesem Dienst verbinden sich Azure Sphere MCUs sicher mit der Cloud und dem Internet. Der Dienst stellt sicher, dass das Gerät nur mit einer autorisierten Version originaler, freigegebener Software bootet. Darüber hinaus bietet er einen sicheren Kanal, über den Microsoft automatisch Betriebssystem-Updates auf im Einsatz befindliche Geräte herunterladen und installieren kann, um Sicherheitsprobleme zu minimieren. Weder Hersteller noch Endbenutzer müssen eingreifen, wodurch eine häufige Sicherheitslücke geschlossen wird. Referenzen: Azure Arc-Übersicht Was ist Azure IoT Central? IoT-Konzepte und Azure IoT Hub Was ist Azure Sphere?"
  },
  {
    id: "real-430",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Autoscaling ist ein Beispiel für Agilität ." },
      { id: "B", text: "Autoscaling ist ein Beispiel für Elastizität ." },
      { id: "C", text: "Autoscaling ist ein Beispiel für Geoverteilung ." },
      { id: "D", text: "Autoscaling ist ein Beispiel für Vorhersagbarkeit ." },
    ],
    correct: "B",
    explanation: "Elastic Computing ermöglicht es, Rechenleistung, Arbeitsspeicher und Speicherressourcen schnell zu erweitern oder zu reduzieren, um wechselnden Anforderungen gerecht zu werden, ohne sich um Kapazitätsplanung und -planung für Spitzenlasten kümmern zu müssen. Elastic Computing wird in der Regel durch Systemüberwachungstools gesteuert und gleicht die zugewiesene Ressourcenmenge mit der tatsächlich benötigten Ressourcenmenge ab, ohne den laufenden Betrieb zu unterbrechen. Dank Cloud-Elastizität vermeidet ein Unternehmen die Kosten für ungenutzte Kapazitäten oder ungenutzte Ressourcen und muss sich nicht um den Kauf oder die Wartung zusätzlicher Ressourcen und Geräte kümmern. Obwohl Sicherheit und eingeschränkte Kontrolle beim Elastic Cloud Computing zu berücksichtigen sind, bietet es viele Vorteile. Elastic Computing ist effizienter als eine herkömmliche IT-Infrastruktur, in der Regel automatisiert, sodass es nicht rund um die Uhr auf menschliche Administratoren angewiesen ist, und bietet durch die Vermeidung unnötiger Verlangsamungen oder Dienstunterbrechungen kontinuierliche Serviceverfügbarkeit. Referenzen: Was ist Elastic Computing oder Cloud-Elastizität? Übersicht über die automatische Skalierung mit Azure Virtual Machine Scale Sets"
  },
  {
    id: "real-428",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Azure Site Recovery bietet Fehlertoleranz für virtuelle Maschinen." },
      { id: "B", text: "Azure Site Recovery bietet Notfallwiederherstellung für virtuelle Maschinen." },
      { id: "C", text: "Azure Site Recovery bietet Elastizität für virtuelle Maschinen." },
      { id: "D", text: "Azure Site Recovery bietet Hochverfügbarkeit für virtuelle Maschinen." },
    ],
    correct: "B",
    explanation: "Der Azure Site Recovery-Dienst unterstützt Ihre Strategie für Geschäftskontinuität und Notfallwiederherstellung (BCDR), indem er Ihre Geschäftsanwendungen bei geplanten und ungeplanten Ausfällen online hält. Site Recovery verwaltet und orchestriert die Notfallwiederherstellung von lokalen Computern und virtuellen Azure-Computern (VM), einschließlich Replikation, Failover und Wiederherstellung. Referenzen: Informationen zum Site Recovery -Schnellstart: Einrichten der Notfallwiederherstellung in einer sekundären Azure-Region für eine Azure-VM"
  },
  {
    id: "real-393",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Anwendungsregeln in Azure Firewall ermöglichen Benutzern im Internet den Zugriff auf einen Server in einem virtuellen Netzwerk." },
      { id: "B", text: "Mithilfe von NAT-Regeln (Network Address Translation) in Azure Firewall können Benutzer im Internet auf einen Server in einem virtuellen Netzwerk zugreifen. C Netzwerkregeln in Azure Firewall ermöglichen Benutzern im Internet den Zugriff auf einen Server in einem virtuellen Netzwerk." },
      { id: "D", text: "Diensttags in Azure Firewall ermöglichen Benutzern im Internet den Zugriff auf einen Server in einem virtuellen Netzwerk." },
    ],
    correct: "B",
    explanation: "Sie können NAT-Regeln, Netzwerkregeln und Anwendungsregeln in Azure Firewall entweder mithilfe klassischer Regeln oder einer Firewallrichtlinie konfigurieren. Azure Firewall verweigert standardmäßig den gesamten Datenverkehr, bis manuell Regeln zum Zulassen des Datenverkehrs konfiguriert werden. Eingehende Internetverbindungen können durch Konfigurieren der Zielnetzwerkadressübersetzung (Destination Network Address Translation, DNAT) aktiviert werden. NAT- Regeln werden vorrangig vor Netzwerkregeln angewendet. Wenn eine Übereinstimmung gefunden wird, wird implizit eine entsprechende Netzwerkregel hinzugefügt, um den übersetzten Datenverkehr zuzulassen. Aus Sicherheitsgründen wird empfohlen, eine bestimmte Internetquelle hinzuzufügen, um DNAT-Zugriff auf das Netzwerk zu ermöglichen und die Verwendung von Platzhaltern zu vermeiden."
  },
  {
    id: "real-382",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Azure Blob Storage ist ein Datenspeicher zum Einreihen und zuverlässigen Übermitteln von Nachrichten zwischen Anwendungen. ." },
      { id: "B", text: "Azure Blob Storage ist eine Dateifreigabe, die als Netzwerklaufwerk zugeordnet werden kann. ." },
      { id: "C", text: "Azure Blob Storage ist ein Schlüssel-/Attributspeicher für nicht-relationale, strukturierte Daten. ." },
      { id: "D", text: "Azure Blob Storage ist ein Speicherdienst, der für sehr große Objekte wie Videodateien und Bitmaps optimiert ist. ." },
    ],
    correct: "D",
    explanation: "Azure Blob Storage ist die Objektspeicherlösung von Microsoft für die Cloud. Blob Storage ist für die Speicherung großer Mengen unstrukturierter Daten optimiert. Unstrukturierte Daten sind Daten, die keinem bestimmten Datenmodell oder keiner bestimmten Definition entsprechen, wie z. B. Text- oder Binärdaten. Blob-Speicher ist für Folgendes konzipiert: • Bilder oder Dokumente direkt an einen Browser senden. • Speichern von Dateien für verteilten Zugriff. • Streaming von Video und Audio. • Schreiben in Protokolldateien. • Speichern von Daten für Sicherung und Wiederherstellung, Notfallwiederherstellung und Archivierung. • Speichern von Daten zur Analyse durch einen lokalen oder in Azure gehosteten Dienst. Benutzer oder Clientanwendungen können von überall auf der Welt über HTTP/HTTPS auf Objekte im Blob-Speicher zugreifen."
  },
  {
    id: "real-380",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Mit dem Tool „Azure Migrate: Server Assessment“ können Sie Kosteneinsparungen aufgrund des geringeren Stromverbrauchs berechnen, die durch die Migration eines lokalen Microsoft SQL-Servers zu Azure entstehen." },
      { id: "B", text: "Mit dem Azure-TCO-Rechner (Total Cost of Ownership) können Sie die Kosteneinsparungen aufgrund des geringeren Stromverbrauchs berechnen, die durch die Migration eines lokalen Microsoft SQL-Servers zu Azure entstehen." },
      { id: "C", text: "Der Datenbankmigrationsassistent kann Kosteneinsparungen aufgrund des geringeren Stromverbrauchs berechnen, die durch die Migration eines lokalen Microsoft SQL-Servers zu Azure entstehen." },
      { id: "D", text: "Der Preisrechner in Azure kann Kosteneinsparungen aufgrund des geringeren Stromverbrauchs berechnen, die durch die Migration eines lokalen Microsoft SQL-Servers zu Azure entstehen." },
    ],
    correct: "B",
    explanation: "Mit dem TCO-Rechner können Sie die Kosteneinsparungen schätzen, die sich im Laufe der Zeit durch den Betrieb Ihrer Lösung auf Azure im Vergleich zum Betrieb in Ihrem lokalen Rechenzentrum ergeben. Der Begriff Gesamtbetriebskosten wird häufig im Finanzwesen verwendet. Es kann schwierig sein, alle versteckten Kosten zu erkennen, die mit dem Betrieb einer Technologie vor Ort verbunden sind. Softwarelizenzen und Hardware verursachen zusätzliche Kosten. Mit dem TCO-Rechner geben Sie die Details Ihrer lokalen Workloads ein. Anschließend können Sie die vorgeschlagenen durchschnittlichen Branchenkosten (die Sie anpassen können) für die zugehörigen Betriebskosten überprüfen. Diese Kosten umfassen Strom, Netzwerkwartung und IT-Arbeit. Ihnen wird dann ein Vergleichsbericht angezeigt. Mithilfe des Berichts können Sie diese Kosten mit denselben Workloads vergleichen, die auf Azure ausgeführt werden."
  },
  {
    id: "real-372",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Azure Resource Manager (ARM)-Vorlagen verwenden das CSV-Format." },
      { id: "B", text: "Azure Resource Manager (ARM)-Vorlagen verwenden das HTML-Format." },
      { id: "C", text: "Azure Resource Manager (ARM)-Vorlagen verwenden das JSON-Format." },
      { id: "D", text: "Azure Resource Manager (ARM)-Vorlagen verwenden das XML-Format." },
    ],
    correct: "C",
    explanation: "Verwenden Sie Azure Resource Manager-Vorlagen (ARM-Vorlagen), um Infrastruktur als Code für Ihre Azure-Lösungen zu implementieren. Die Vorlage ist eine JSON-Datei (JavaScript Object Notation), die die Infrastruktur und Konfiguration für Ihr Projekt definiert. Die Vorlage verwendet eine deklarative Syntax, mit der Sie angeben können, was Sie bereitstellen möchten, ohne die Abfolge der Programmierbefehle zum Erstellen schreiben zu müssen. In der Vorlage geben Sie die bereitzustellenden Ressourcen und die Eigenschaften für diese Ressourcen an."
  },
  {
    id: "real-371",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Das Microsoft Purview-Compliance-Portal bietet ausführliche Informationen zu Sicherheit, Datenschutz, Compliance-Angeboten, Richtlinien und Funktionen aller Microsoft-Cloud-Produkte." },
      { id: "B", text: "Das Microsoft 365 Defender-Portal bietet ausführliche Informationen zu Sicherheit, Datenschutz, Compliance-Angeboten, Richtlinien und Funktionen aller Microsoft-Cloudprodukte." },
      { id: "C", text: "Microsoft Defender für Cloud im Azure-Portal bietet ausführliche Informationen zu Sicherheit, Datenschutz, Compliance-Angeboten, Richtlinien und Funktionen aller Microsoft-Cloudprodukte." },
      { id: "D", text: "Das Microsoft Trust Center bietet ausführliche Informationen zu Sicherheit, Datenschutz, Compliance-Angeboten, Richtlinien und Funktionen aller Microsoft-Cloudprodukte." },
    ],
    correct: "D",
    explanation: "Das Trust Center bietet: • Ausführliche Informationen zu Sicherheit, Datenschutz, Compliance-Angeboten, Richtlinien, Funktionen und Praktiken für alle Microsoft-Cloudprodukte. • Zusätzliche Ressourcen zu jedem Thema. • Links zu Blogs zu Sicherheit, Datenschutz und Compliance sowie zu bevorstehenden Veranstaltungen. Das Trust Center ist eine hervorragende Ressource für andere Personen in Ihrem Unternehmen, die möglicherweise eine Rolle in den Bereichen Sicherheit, Datenschutz und Compliance spielen. Zu diesen Personen gehören Geschäftsführer, Risikobewertungs- und Datenschutzbeauftragte sowie Teams für die Einhaltung gesetzlicher Vorschriften."
  },
  {
    id: "real-368",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Eine Azure-Containerinstanz ist ein Beispiel für einen Azure- Rechendienst." },
      { id: "B", text: "Eine Azure-Containerinstanz ist ein Beispiel für einen Azure- Identitätsdienst." },
      { id: "C", text: "Eine Azure-Containerinstanz ist ein Beispiel für einen Azure -Netzwerkdienst." },
      { id: "D", text: "Eine Azure-Containerinstanz ist ein Beispiel für einen Azure- Speicherdienst." },
    ],
    correct: "A",
    explanation: "Azure Container Instances ist eine hervorragende Lösung für alle Szenarien, die in isolierten Containern ausgeführt werden können, einschließlich einfacher Anwendungen, Aufgabenautomatisierung und Buildaufträgen. Für Szenarien, in denen Sie eine vollständige Containerorchestrierung benötigen, einschließlich Diensterkennung über mehrere Container hinweg, automatischer Skalierung und koordinierter Anwendungsupgrades, empfehlen wir Azure Kubernetes Service (AKS). Container bieten gegenüber virtuellen Maschinen (VMs) erhebliche Startvorteile. Azure Container Instances können Container in Azure in Sekundenschnelle starten, ohne dass VMs bereitgestellt und verwaltet werden müssen. Bringen Sie Linux- oder Windows-Containerimages von Docker Hub, einem privaten Azure-Containerregister oder einem anderen Cloud-basierten Docker-Register. Azure Container Instances ermöglicht die direkte Bereitstellung Ihrer Containergruppen im Internet mit einer IP-Adresse und einem vollqualifizierten Domänennamen (FQDN). Beim Erstellen einer Containerinstanz können Sie eine benutzerdefinierte DNS-Namensbezeichnung angeben, sodass Ihre Anwendung unter customlabel . azureregion .azurecontainer.io erreichbar ist. Azure Container Instances unterstützt außerdem die Ausführung von Befehlen in einem laufenden Container. Dazu stellt es eine interaktive Shell bereit, die bei der Anwendungsentwicklung und Fehlerbehebung hilft. Der Zugriff erfolgt über HTTPS, wobei TLS zur Sicherung der Clientverbindungen verwendet wird."
  },
  {
    id: "real-361",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Premium-Blockblobs-Speicherkonten unterstützen nur georedundante Speicherredundanz (GRS) und lokal redundante Speicherredundanz (LRS) ." },
      { id: "B", text: "Premium-Blockblobs-Speicherkonten unterstützen nur die Redundanz von geozonenredundantem Speicher (GZRS) und zonenredundantem Speicher (ZRS) ." },
      { id: "C", text: "Premium-Blockblobs-Speicherkonten unterstützen nur lokal redundanten Speicher (LRS) und georedundanten Speicher (GRS) ." },
      { id: "D", text: "Premium-Blockblobs-Speicherkonten unterstützen nur zonenredundante Speicherredundanz (ZRS) und lokal redundante Speicherredundanz (LRS) ." },
    ],
    correct: "D",
    explanation: "Premium-Blockblob-Speicherkonten stellen Daten über Hochleistungshardware bereit. Die Daten werden auf Solid-State-Laufwerken (SSDs) gespeichert, die für geringe Latenz optimiert sind. SSDs bieten einen höheren Durchsatz als herkömmliche Festplatten. Die Dateiübertragung ist deutlich schneller, da die Daten auf sofort zugänglichen Speicherchips gespeichert werden. Alle Teile eines Laufwerks sind gleichzeitig zugänglich. Im Gegensatz dazu hängt die Leistung einer Festplatte (HDD) von der Nähe der Daten zu den Lese-/Schreibköpfen ab. Premium-Blockblob-Speicherkonten unterstützen nur zonenredundanten Speicher (ZRS) und lokal redundanten Speicher (LRS). Referenzen: Premium-Blockblob-Speicherkonten Azure Storage-Redundanz"
  },
  {
    id: "real-354",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Hybrides Cloud-Computing" },
      { id: "B", text: "Verteidigung in der Tiefe" },
      { id: "C", text: "Multi-Faktor-Authentifizierung (MFA)" },
      { id: "D", text: "Schutz vor Distributed Denial of Service (DDoS)" },
    ],
    correct: "C",
    explanation: "Wenn Sie zur Authentifizierung eines Benutzers ausschließlich ein Kennwort verwenden, ist dies ein unsicherer Angriffspunkt. Ist das Kennwort schwach oder anderweitig bekannt, könnte ein Angreifer es nutzen, um Zugriff zu erhalten. Wenn Sie eine zweite Authentifizierungsform verlangen, erhöht sich die Sicherheit, da dieser zusätzliche Faktor für einen Angreifer nicht so leicht zu erlangen oder zu duplizieren ist. Azure AD Multi-Factor Authentication erfordert zwei oder mehr der folgenden Authentifizierungsmethoden: • Etwas, das Sie wissen, normalerweise ein Passwort. • Etwas, das Sie besitzen, beispielsweise ein vertrauenswürdiges Gerät, das nicht so leicht dupliziert werden kann, wie ein Telefon oder ein Hardwareschlüssel. • Etwas, das Sie sind – biometrische Daten wie ein Fingerabdruck oder ein Gesichtsscan. Azure AD Multi-Factor Authentication kann die Kennwortzurücksetzung zusätzlich absichern. Wenn sich Benutzer für Azure AD Multi-Factor Authentication registrieren, können sie sich in einem Schritt auch für die Self-Service-Kennwortzurücksetzung registrieren. Administratoren können Formen der sekundären Authentifizierung auswählen und basierend auf Konfigurationsentscheidungen Herausforderungen für MFA konfigurieren."
  },
  {
    id: "real-353",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Azure IoT Edge" },
      { id: "B", text: "Azure IoT Hub" },
      { id: "C", text: "Azure Sphere" },
      { id: "D", text: "Azure IoT Central" },
    ],
    correct: "C",
    explanation: "Azure Sphere ist eine sichere, hochrangige Anwendungsplattform mit integrierten Kommunikations- und Sicherheitsfunktionen für internetfähige Geräte. Sie umfasst eine sichere, vernetzte Crossover-Mikrocontrollereinheit (MCU), ein benutzerdefiniertes, hochrangiges Linux-basiertes Betriebssystem (OS) und einen cloudbasierten Sicherheitsdienst, der kontinuierliche, erneuerbare Sicherheit bietet. Die Azure Sphere MCU integriert Echtzeitverarbeitungsfunktionen mit der Fähigkeit, ein übergeordnetes Betriebssystem auszuführen. Eine Azure Sphere MCU ermöglicht zusammen mit ihrem Betriebssystem und ihrer Anwendungsplattform die Erstellung sicherer, mit dem Internet verbundener Geräte, die remote aktualisiert, gesteuert, überwacht und gewartet werden können. Ein verbundenes Gerät mit einer Azure Sphere MCU – entweder zusätzlich zu oder anstelle einer vorhandenen MCU – bietet verbesserte Sicherheit, Produktivität und mehr Möglichkeiten. Beispiel: • Eine gesicherte Anwendungsumgebung, authentifizierte Verbindungen und die Opt-in-Nutzung von Peripheriegeräten minimieren Sicherheitsrisiken, die unter anderem durch Spoofing, betrügerische Software oder Denial-of-Service-Angriffe entstehen. • Software-Updates können automatisch aus der Cloud auf jedes verbundene Gerät verteilt werden, um Probleme zu beheben, neue Funktionen bereitzustellen oder neuen Angriffsmethoden entgegenzuwirken und so die Produktivität des Supportpersonals zu steigern. • Produktnutzungsdaten können über eine sichere Verbindung an die Cloud gemeldet werden, um bei der Diagnose von Problemen und der Entwicklung neuer Produkte zu helfen und so die Möglichkeit für Produktservice, positive Kundeninteraktionen und zukünftige Entwicklungen zu verbessern. Der Azure Sphere Security Service ist ein integraler Bestandteil von Azure Sphere. Mit diesem Dienst verbinden sich Azure Sphere MCUs sicher mit der Cloud und dem Internet. Der Dienst stellt sicher, dass das Gerät nur mit einer autorisierten Version originaler, freigegebener Software bootet. Darüber hinaus bietet er einen sicheren Kanal, über den Microsoft automatisch Betriebssystem-Updates auf im Einsatz befindliche Geräte herunterladen und installieren kann, um Sicherheitsprobleme zu minimieren. Weder Hersteller noch Endbenutzer müssen eingreifen, wodurch eine häufige Sicherheitslücke geschlossen wird."
  },
  {
    id: "real-343",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Network Address Translation (NAT)-Regeln" },
      { id: "B", text: "Netzwerkregeln" },
      { id: "C", text: "Bewerbungsregeln" },
    ],
    correct: "A",
    explanation: "Sie können NAT-Regeln, Netzwerkregeln und Anwendungsregeln in Azure Firewall entweder mithilfe klassischer Regeln oder einer Firewallrichtlinie konfigurieren. Azure Firewall verweigert standardmäßig den gesamten Datenverkehr, bis manuell Regeln zum Zulassen des Datenverkehrs konfiguriert werden. Eingehende Internetverbindungen können durch Konfigurieren der Zielnetzwerkadressübersetzung (Destination Network Address Translation, DNAT) aktiviert werden. NAT- Regeln werden vorrangig vor Netzwerkregeln angewendet. Wenn eine Übereinstimmung gefunden wird, wird implizit eine entsprechende Netzwerkregel hinzugefügt, um den übersetzten Datenverkehr zuzulassen. Aus Sicherheitsgründen wird empfohlen, eine bestimmte Internetquelle hinzuzufügen, um DNAT-Zugriff auf das Netzwerk zu ermöglichen und die Verwendung von Platzhaltern zu vermeiden."
  },
  {
    id: "real-342",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Rechenschicht" },
      { id: "B", text: "Anwendungsschicht" },
      { id: "C", text: "Umfangsschicht" },
      { id: "D", text: "Netzwerkschicht" },
    ],
    correct: "D",
    explanation: "Distributed-Denial-of-Service-Angriffe (DDoS) gehören zu den größten Verfügbarkeits- und Sicherheitsproblemen für Kunden, die ihre Anwendungen in die Cloud verlagern. Ein DDoS-Angriff zielt darauf ab, die Ressourcen einer Anwendung zu erschöpfen und sie so für legitime Benutzer unzugänglich zu machen. DDoS-Angriffe können auf jeden öffentlich über das Internet erreichbaren Endpunkt abzielen. Azure DDoS Protection Standard bietet in Kombination mit bewährten Methoden für das Anwendungsdesign erweiterte DDoS-Minderungsfunktionen zum Schutz vor DDoS- Angriffen. Die automatische Optimierung schützt Ihre spezifischen Azure-Ressourcen in einem virtuellen Netzwerk. Der Schutz lässt sich in jedem neuen oder vorhandenen virtuellen Netzwerk einfach aktivieren und erfordert keine Anwendungs- oder Ressourcenänderungen. DDoS Protection Standard ist für Dienste konzipiert, die in einem virtuellen Netzwerk bereitgestellt werden. Für andere Dienste gilt der standardmäßige DDoS-Schutz auf Infrastrukturebene, der vor gängigen Angriffen auf Netzwerkebene schützt. Der DDoS-Schutz wird auf der Netzwerkebene implementiert und auf der Perimeterebene zum Herausfiltern von Angriffen verwendet. Referenzen: Übersicht zum Azure DDoS Protection Standard DDoS Protection-Referenzarchitekturen"
  },
  {
    id: "real-340",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "E/A-Vorgänge" },
      { id: "B", text: "Lagerung" },
      { id: "C", text: "Rechenkapazität" },
      { id: "D", text: "Vernetzung" },
    ],
    correct: "B",
    explanation: "Indem Sie eine VM stoppen (Zuweisung aufheben), stoppen Sie nicht nur das Betriebssystem der VM, sondern geben auch die Hardware- und Netzwerkressourcen frei, die Azure zuvor dafür bereitgestellt hat (ein Vorgang, der als Freigabe bezeichnet wird). Sofern Sie keine statischen Adressen konfiguriert haben, geben Sie auch die interne DIP-Adresse sowie die öffentliche VIP-Adresse frei (sofern keine anderen VMs die öffentliche VIP verwenden, da die VIP dem Clouddienst und nicht direkt der virtuellen Maschine zugewiesen ist). Wenn Sie die VM neu starten, erhält sie eine neue öffentliche VIP (sofern sie nicht einem Clouddienst beitritt, der bereits eine hat) sowie eine neue DIP. Das Betriebssystem und die Datenträger der VM bleiben im Azure-Speicher intakt und können verwendet werden, um die VM später neu zu starten. Der mit der VM verknüpfte temporäre Datenträger (Scratch-Datenträger) wird jedoch freigegeben und alle Daten darauf können verloren gehen. Azure berechnet keine Gebühren für die VM-Kernstunden, während sie gestoppt (zuweisungsfreigegeben) ist. Es fallen weiterhin Gebühren für den Azure-Speicher an, der für den Betriebssystemdatenträger der VM und alle angeschlossenen Datenträger benötigt wird. Bei Premium-Datenträgern fallen Gebühren für die gesamte verwendete oder nicht verwendete Datenträgergröße an, während bei Standardspeichern Gebühren für den verwendeten Speicherplatz anfallen."
  },
  {
    id: "real-337",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Azure Logic Apps" },
      { id: "B", text: "Azure App Services" },
      { id: "C", text: "Azure-Container" },
      { id: "D", text: "Azure-Funktionen" },
    ],
    correct: "D",
    explanation: "Azure Functions ist eine serverlose Lösung, mit der Sie weniger Code schreiben, weniger Infrastruktur pflegen und Kosten sparen. Anstatt sich um die Bereitstellung und Wartung von Servern zu kümmern, bietet die Cloud-Infrastruktur alle aktuellen Ressourcen, die Sie für den Betrieb Ihrer Anwendungen benötigen."
  },
  {
    id: "real-336",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Trennen Sie die virtuelle Maschine während einer Remotedesktopsitzung" },
      { id: "B", text: "Wählen Sie im Azure-Portal „Beenden“ für die virtuelle Maschine aus." },
      { id: "C", text: "Fahren Sie die virtuelle Maschine über eine Remotedesktopsitzung herunter" },
      { id: "D", text: "Versetzen Sie die virtuelle Maschine über eine Remotedesktopsitzung in den Ruhemodus" },
    ],
    correct: "B",
    explanation: "Wenn Ihre VM nicht ausgeführt wird, weist sie einen von zwei Zuständen auf: „Gestoppt“ oder „Gestoppt (Zuweisung aufgehoben). Azure-Status „Gestoppt“: Wenn Sie beim Betriebssystem einer Azure-VM angemeldet sind, können Sie den Server herunterfahren. Dadurch werden Sie aus dem Betriebssystem ausgeschlossen und alle Prozesse gestoppt, die zugewiesene Hardware (einschließlich der aktuell zugewiesenen IP-Adressen) bleibt jedoch erhalten. Wenn Sie die VM in der Azure-Konsole finden, wird der Status „Gestoppt“ angezeigt. Wichtig zu wissen: Für diese Instanz werden Ihnen weiterhin stundenweise Gebühren berechnet . Azure-Status „Freigegeben“: Sie können Ihre virtuelle Maschine auch über Azure selbst stoppen, sei es über die Konsole, PowerShell oder die Azure-Befehlszeilenschnittstelle. Wenn Sie eine VM über Azure und nicht über das Betriebssystem stoppen, wechselt sie in den Status „Gestoppt (Freigegeben)“. Das bedeutet, dass alle nicht statischen öffentlichen IP-Adressen freigegeben werden, Sie aber auch keine Rechenkosten mehr für die VM zahlen . So sparen Sie Geld bei Ihren Azure-Kosten, wenn Sie diese VMs nicht benötigen."
  },
  {
    id: "real-332",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Anwendungsschicht" },
      { id: "B", text: "Rechenschicht" },
      { id: "C", text: "Umfangsschicht" },
      { id: "D", text: "Netzwerkschicht" },
    ],
    correct: "D",
    explanation: "Distributed-Denial-of-Service-Angriffe (DDoS) gehören zu den größten Verfügbarkeits- und Sicherheitsproblemen für Kunden, die ihre Anwendungen in die Cloud verlagern. Ein DDoS-Angriff zielt darauf ab, die Ressourcen einer Anwendung zu erschöpfen und sie so für legitime Benutzer unzugänglich zu machen. DDoS-Angriffe können auf jeden öffentlich über das Internet erreichbaren Endpunkt abzielen. Azure DDoS Protection Standard bietet in Kombination mit bewährten Methoden für das Anwendungsdesign erweiterte DDoS-Minderungsfunktionen zum Schutz vor DDoS- Angriffen. Die automatische Optimierung schützt Ihre spezifischen Azure-Ressourcen in einem virtuellen Netzwerk. Der Schutz lässt sich in jedem neuen oder vorhandenen virtuellen Netzwerk einfach aktivieren und erfordert keine Anwendungs- oder Ressourcenänderungen. DDoS Protection Standard ist für Dienste konzipiert, die in einem virtuellen Netzwerk bereitgestellt werden. Für andere Dienste gilt der standardmäßige DDoS-Schutz auf Infrastrukturebene, der vor gängigen Angriffen auf Netzwerkebene schützt. Der DDoS-Schutz wird auf der Netzwerkebene implementiert und auf der Perimeterebene zum Herausfiltern von Angriffen verwendet. Referenzen: Übersicht zum Azure DDoS Protection Standard DDoS Protection-Referenzarchitekturen"
  },
  {
    id: "real-331",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Reservierte Azure-VM-Instanzen" },
      { id: "B", text: "Azure Container Instances" },
      { id: "C", text: "Azure Virtual Machine-Skalierungsgruppen" },
      { id: "D", text: "Azure Spot-VM-Instanzen" },
    ],
    correct: "D",
    explanation: "Mit Azure Spot Virtual Machines können Sie ungenutzte Kapazitäten zu erheblichen Kosteneinsparungen nutzen. Sobald Azure die Kapazität wieder benötigt, werden die Azure-Infrastrukturen die Azure Spot Virtual Machines entfernen. Daher eignen sich Azure Spot Virtual Machines hervorragend für Workloads, die Unterbrechungen bewältigen können, wie z. B. Batchverarbeitungsaufträge, Entwicklungs-/Testumgebungen, große Rechenlasten und mehr. Die verfügbare Kapazität kann je nach Größe, Region, Tageszeit usw. variieren. Beim Bereitstellen von Azure Spot Virtual Machines weist Azure die VMs zu, sofern Kapazität verfügbar ist. Für diese VMs gibt es jedoch kein SLA. Eine Azure Spot Virtual Machine bietet keine Hochverfügbarkeitsgarantie. Wenn Azure die Kapazität wieder benötigt, wird die Azure-Infrastruktur die Azure Spot Virtual Machines mit einer Vorlaufzeit von 30 Sekunden entfernen. Räumungsrichtlinie VMs können basierend auf der Kapazität oder dem von Ihnen festgelegten Höchstpreis entfernt werden. Beim Erstellen einer Azure Spot Virtual Machine können Sie die Entfernungsrichtlinie auf Deallocate (Standard) oder Delete festlegen . Die Richtlinie „Deallocate“ versetzt Ihre VM in den Zustand „Stopped-Deallocated“, sodass Sie sie später erneut bereitstellen können. Es gibt jedoch keine Garantie dafür, dass die Zuweisung erfolgreich ist. Die freigegebenen VMs werden auf Ihr Kontingent angerechnet, und Ihnen werden Speicherkosten für die zugrunde liegenden Datenträger in Rechnung gestellt. Wenn Ihre VM beim Räumungsvorgang gelöscht werden soll, können Sie die Räumungsrichtlinie auf „ Löschen“ setzen . Die geräumten VMs werden zusammen mit den zugrunde liegenden Datenträgern gelöscht, sodass Ihnen für den Speicher keine weiteren Kosten entstehen."
  },
  {
    id: "real-330",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Microsoft 365 Admin Center" },
      { id: "B", text: "Microsoft 365 Defender" },
      { id: "C", text: "Microsoft Purview" },
      { id: "D", text: "Microsoft Endpoint Manager Admin Center" },
    ],
    correct: "C",
    explanation: "Auf Microsoft Compliance Manager kann über Microsoft Purview zugegriffen werden."
  },
  {
    id: "real-329",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Eine Microsoft SQL Server-Datenbank, die in der Cloud gehostet wird und deren Softwareupdates von Azure verwaltet werden, ist ein Beispiel für Disaster Recovery as a Service (DRaaS)." },
      { id: "B", text: "Eine Microsoft SQL Server-Datenbank, die in der Cloud gehostet wird und deren Softwareupdates von Azure verwaltet werden, ist ein Beispiel für Infrastructure as a Service (IaaS)." },
      { id: "C", text: "Eine Microsoft SQL Server-Datenbank, die in der Cloud gehostet wird und deren Softwareupdates von Azure verwaltet werden, ist ein Beispiel für Platform as a Service (PaaS)." },
      { id: "D", text: "Eine Microsoft SQL Server-Datenbank, die in der Cloud gehostet wird und deren Softwareupdates von Azure verwaltet werden, ist ein Beispiel für Software as a Service (SaaS)." },
    ],
    correct: "C",
    explanation: "Platform as a Service (PaaS) ist eine umfassende Entwicklungs- und Bereitstellungsumgebung in der Cloud mit Ressourcen, die Ihnen die Bereitstellung von Anwendungen aller Art ermöglichen – von einfachen Cloud-basierten Apps bis hin zu komplexen, Cloud-fähigen Unternehmensanwendungen. Sie erwerben die benötigten Ressourcen von einem Cloud-Service-Anbieter auf Pay-as-you-go-Basis und greifen über eine sichere Internetverbindung darauf zu. Wie IaaS umfasst PaaS die Infrastruktur – Server, Speicher und Netzwerke –, aber auch Middleware, Entwicklungstools, Business Intelligence (BI)-Dienste, Datenbankmanagementsysteme und mehr. PaaS unterstützt den gesamten Lebenszyklus von Webanwendungen: Erstellen, Testen, Bereitstellen, Verwalten und Aktualisieren. Mit PaaS sparen Sie sich die Kosten und den Aufwand für den Kauf und die Verwaltung von Softwarelizenzen, der zugrunde liegenden Anwendungsinfrastruktur und Middleware, Container-Orchestratoren wie Kubernetes oder der Entwicklungstools und anderer Ressourcen. Sie verwalten die von Ihnen entwickelten Anwendungen und Dienste, und der Cloud-Service-Anbieter kümmert sich in der Regel um alles Weitere. Durch die Bereitstellung von Infrastructure as a Service bietet PaaS dieselben Vorteile wie IaaS. Die zusätzlichen Funktionen – Middleware, Entwicklungstools und andere Business-Tools – bieten Ihnen jedoch weitere Vorteile. Hinweis: Eine Azure SQL-Datenbank kann auch als Datenbank als Service (DaaS) bezeichnet werden."
  },
  {
    id: "real-325",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Eine Azure-Region enthält ein oder mehrere Rechenzentren, die über ein Netzwerk mit geringer Latenz verbunden sind." },
      { id: "B", text: "In jedem Land, in dem Microsoft eine Niederlassung hat, gibt es eine Azure-Region ." },
      { id: "C", text: "Eine Azure-Region gibt es nur in jedem Land in Europa und Amerika." },
      { id: "D", text: "Eine Azure-Region enthält ein oder mehrere Rechenzentren, die über ein Netzwerk mit hoher Latenz verbunden sind." },
    ],
    correct: "A",
    explanation: "Eine Region besteht aus mehreren Rechenzentren, die innerhalb eines latenzdefinierten Umkreises bereitgestellt und über ein dediziertes regionales Netzwerk mit geringer Latenz verbunden sind. Azure bietet Ihnen die Flexibilität, Anwendungen dort bereitzustellen, wo Sie sie benötigen, auch über mehrere Regionen hinweg, um regionsübergreifende Ausfallsicherheit zu gewährleisten."
  },
  {
    id: "real-323",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Microsoft Sentinel verwendet Playbooks, um automatisch auf Bedrohungen zu reagieren." },
      { id: "B", text: "Microsoft Sentinel verwendet Playbooks, um Daten von Azure-Diensten zu sammeln." },
      { id: "C", text: "Microsoft Sentinel verwendet Playbooks, um anzugeben, wie lange Daten aufbewahrt werden." },
      { id: "D", text: "Microsoft Sentinel verwendet Playbooks zum Speichern von Passwörtern und Zertifikaten." },
    ],
    correct: "A",
    explanation: "Playbooks sind Sammlungen von Prozeduren, die von Microsoft Sentinel als Reaktion auf eine Warnung oder einen Vorfall ausgeführt werden können. Ein Playbook kann Ihnen dabei helfen, Ihre Reaktion zu automatisieren und zu orchestrieren. Es kann so eingestellt werden, dass es automatisch ausgeführt wird, wenn bestimmte Warnungen oder Vorfälle generiert werden, indem es an eine Analyseregel bzw. eine Automatisierungsregel angehängt wird. Es kann auch bei Bedarf manuell ausgeführt werden. Playbooks in Microsoft Sentinel basieren auf in Azure Logic Apps erstellten Workflows . Das bedeutet, dass Sie die gesamte Leistung, Anpassbarkeit und integrierten Vorlagen von Logic Apps nutzen können. Jedes Playbook wird für das jeweilige Abonnement erstellt, zu dem es gehört. In der Playbook-Anzeige werden jedoch alle für die ausgewählten Abonnements verfügbaren Playbooks angezeigt. Referenzen: Automatisieren Sie die Reaktion auf Bedrohungen mit Playbooks in Microsoft Sentinel. Tutorial: Verwenden Sie Playbooks mit Automatisierungsregeln in Microsoft Sentinel."
  },
  {
    id: "real-322",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Der Azure-DDOS-Schutz (Distributed Denial of Service) ist ein Beispiel für einen Schutz, der auf Anwendungsebene implementiert wird ." },
      { id: "B", text: "Der Azure-DDOS-Schutz (Distributed Denial of Service) ist ein Beispiel für einen Schutz, der auf der Compute-Ebene implementiert wird ." },
      { id: "C", text: "Der Azure-DDOS-Schutz (Distributed Denial of Service) ist ein Beispiel für einen Schutz, der auf der Netzwerkebene implementiert wird ." },
      { id: "D", text: "Der Azure-DDOS-Schutz (Distributed Denial of Service) ist ein Beispiel für einen Schutz, der auf der Perimeterebene implementiert wird ." },
    ],
    correct: "C",
    explanation: "Distributed-Denial-of-Service-Angriffe (DDoS) gehören zu den größten Verfügbarkeits- und Sicherheitsproblemen für Kunden, die ihre Anwendungen in die Cloud verlagern. Ein DDoS-Angriff zielt darauf ab, die Ressourcen einer Anwendung zu erschöpfen und sie so für legitime Benutzer unzugänglich zu machen. DDoS-Angriffe können auf jeden öffentlich über das Internet erreichbaren Endpunkt abzielen. Azure DDoS Protection Standard bietet in Kombination mit bewährten Methoden für das Anwendungsdesign erweiterte DDoS-Minderungsfunktionen zum Schutz vor DDoS- Angriffen. Die automatische Optimierung schützt Ihre spezifischen Azure-Ressourcen in einem virtuellen Netzwerk. Der Schutz lässt sich in jedem neuen oder vorhandenen virtuellen Netzwerk einfach aktivieren und erfordert keine Anwendungs- oder Ressourcenänderungen. DDoS Protection Standard ist für Dienste konzipiert, die in einem virtuellen Netzwerk bereitgestellt werden. Für andere Dienste gilt der standardmäßige DDoS-Schutz auf Infrastrukturebene, der vor gängigen Angriffen auf Netzwerkebene schützt. Der DDoS-Schutz wird auf der Netzwerkebene implementiert und auf der Perimeterebene zum Herausfiltern von Angriffen verwendet. Referenzen: Übersicht zum Azure DDoS Protection Standard DDoS Protection-Referenzarchitekturen"
  },
  {
    id: "real-316",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Ein Beispiel für Business-to-Customer-Identitätsdienste (B2C) ist die Anforderung, dass ein Benutzer bei der Anmeldung bei Azure Active Directory (Azure AD) ein Kennwort eingibt und eine Sicherheitsfrage beantwortet ." },
      { id: "B", text: "Ein Beispiel für verwaltete Identitäten ist die Anforderung, dass ein Benutzer bei der Anmeldung bei Azure Active Directory (Azure AD) ein Kennwort eingeben und eine Sicherheitsfrage beantworten muss ." },
      { id: "C", text: "Ein Beispiel für die Multi-Faktor-Authentifizierung (MFA) ist die Anforderung, dass ein Benutzer bei der Anmeldung bei Azure Active Directory (Azure AD) ein Kennwort eingibt und eine Sicherheitsfrage beantwortet ." },
      { id: "D", text: "Ein Beispiel für die rollenbasierte Zugriffssteuerung (RBAC) ist die Anforderung, dass ein Benutzer bei der Anmeldung bei Azure Active Directory (Azure AD) ein Kennwort eingibt und eine Sicherheitsfrage beantwortet ." },
    ],
    correct: "C",
    explanation: "Bei der Multi-Faktor-Authentifizierung handelt es sich um einen Prozess, bei dem Benutzer während des Anmeldevorgangs aufgefordert werden, eine zusätzliche Form der Identifizierung einzugeben, beispielsweise einen Code auf ihrem Mobiltelefon oder einen Fingerabdruckscan. Wenn Sie zur Authentifizierung eines Benutzers ausschließlich ein Kennwort verwenden, ist dies ein unsicherer Angriffspunkt. Ist das Kennwort schwach oder anderweitig bekannt, könnte ein Angreifer es nutzen, um Zugriff zu erhalten. Wenn Sie eine zweite Authentifizierungsform verlangen, erhöht sich die Sicherheit, da dieser zusätzliche Faktor für einen Angreifer nicht so leicht zu erlangen oder zu duplizieren ist. Azure AD Multi-Factor Authentication erfordert zwei oder mehr der folgenden Authentifizierungsmethoden: • Etwas, das Sie wissen, normalerweise ein Passwort. • Etwas, das Sie besitzen, beispielsweise ein vertrauenswürdiges Gerät, das nicht so leicht dupliziert werden kann, wie ein Telefon oder ein Hardwareschlüssel. • Etwas, das Sie sind – biometrische Daten wie ein Fingerabdruck oder ein Gesichtsscan. Azure AD Multi-Factor Authentication kann die Kennwortzurücksetzung zusätzlich absichern. Wenn sich Benutzer für Azure AD Multi-Factor Authentication registrieren, können sie sich in einem Schritt auch für die Self-Service-Kennwortzurücksetzung registrieren. Administratoren können Formen der sekundären Authentifizierung auswählen und basierend auf Konfigurationsentscheidungen Herausforderungen für MFA konfigurieren. Hinweis: Das Beantworten einer Sicherheitsfrage ist zwar kein wirkliches Beispiel für MFA, aber es ist die einzige sinnvolle Antwort."
  },
  {
    id: "real-308",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Azure China wird von Microsoft betrieben." },
      { id: "B", text: "Azure China verfügt über die gleichen Funktionen wie Azure Global." },
      { id: "C", text: "Auf Azure China- Dienste kann nur von China aus zugegriffen werden." },
      { id: "D", text: "Azure China ist eine eigenständige Instanz von Microsoft Azure." },
    ],
    correct: "D",
    explanation: "Microsoft Azure, betrieben von 21Vianet (Azure China), ist eine physisch getrennte Instanz von Cloud-Diensten mit Sitz in China. Die unabhängige Verwaltung und Abwicklung erfolgt durch Shanghai Blue Cloud Technology Co., Ltd. („21Vianet“), eine hundertprozentige Tochtergesellschaft der Beijing 21Vianet Broadband Data Center Co., Ltd. Azure China weist eine Feature-Paritätslücke auf, die sich jedoch verringert."
  },
  {
    id: "real-307",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Um die Kosten einer ungenutzten virtuellen Azure-Maschine zu sparen, auf der Windows 10 ausgeführt wird, sollten Sie die Verbindung zur virtuellen Maschine während einer Remotedesktopsitzung trennen." },
      { id: "B", text: "Um die Kosten einer ungenutzten virtuellen Azure-Maschine zu sparen, auf der Windows 10 ausgeführt wird, sollten Sie die virtuelle Maschine über eine Remotedesktopsitzung in den Ruhemodus versetzen." },
      { id: "C", text: "Um die Kosten einer ungenutzten virtuellen Azure-Maschine zu sparen, auf der Windows 10 ausgeführt wird, sollten Sie im Azure-Portal „Beenden“ für die virtuelle Maschine auswählen." },
      { id: "D", text: "Um die Kosten einer ungenutzten virtuellen Azure-Maschine zu sparen, auf der Windows 10 ausgeführt wird, sollten Sie die virtuelle Maschine über eine Remotedesktopsitzung herunterfahren." },
    ],
    correct: "C",
    explanation: "Wenn Ihre VM nicht ausgeführt wird, weist sie einen von zwei Zuständen auf: „Gestoppt“ oder „Gestoppt (Zuweisung aufgehoben). Azure-Status „Gestoppt“: Wenn Sie beim Betriebssystem einer Azure-VM angemeldet sind, können Sie den Server herunterfahren. Dadurch werden Sie aus dem Betriebssystem ausgeschlossen und alle Prozesse gestoppt, die zugewiesene Hardware (einschließlich der aktuell zugewiesenen IP-Adressen) bleibt jedoch erhalten. Wenn Sie die VM in der Azure-Konsole finden, wird der Status „Gestoppt“ angezeigt. Wichtig zu wissen: Für diese Instanz werden Ihnen weiterhin stundenweise Gebühren berechnet . Azure-Status „Freigegeben“: Sie können Ihre virtuelle Maschine auch über Azure selbst stoppen, sei es über die Konsole, PowerShell oder die Azure-Befehlszeilenschnittstelle. Wenn Sie eine VM über Azure und nicht über das Betriebssystem stoppen, wechselt sie in den Status „Gestoppt (Freigegeben)“. Das bedeutet, dass alle nicht statischen öffentlichen IP-Adressen freigegeben werden, Sie aber auch keine Rechenkosten mehr für die VM zahlen . So sparen Sie Geld bei Ihren Azure-Kosten, wenn Sie diese VMs nicht benötigen."
  },
  {
    id: "real-306",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Wenn eine virtuelle Azure-Maschine den Status „Angehalten (Zuweisung aufgehoben)“ hat, zahlen Sie weiterhin für die Rechenkapazität ." },
      { id: "B", text: "Wenn eine virtuelle Azure-Maschine den Status „Angehalten (Zuweisung aufgehoben)“ hat, zahlen Sie weiterhin für E/A-Vorgänge ." },
      { id: "C", text: "Wenn eine virtuelle Azure-Maschine den Status „Angehalten (Zuweisung aufgehoben)“ hat, zahlen Sie weiterhin für die Netzwerknutzung ." },
      { id: "D", text: "Wenn eine virtuelle Azure-Maschine den Status „Angehalten (Zuweisung aufgehoben)“ hat, zahlen Sie weiterhin für den Speicher ." },
    ],
    correct: "D",
    explanation: "Indem Sie eine VM stoppen (Zuweisung aufheben), stoppen Sie nicht nur das Betriebssystem der VM, sondern geben auch die Hardware- und Netzwerkressourcen frei, die Azure zuvor dafür bereitgestellt hat (ein Vorgang, der als Freigabe bezeichnet wird). Sofern Sie keine statischen Adressen konfiguriert haben, geben Sie auch die interne DIP-Adresse sowie die öffentliche VIP-Adresse frei (sofern keine anderen VMs die öffentliche VIP verwenden, da die VIP dem Clouddienst und nicht direkt der virtuellen Maschine zugewiesen ist). Wenn Sie die VM neu starten, erhält sie eine neue öffentliche VIP (sofern sie nicht einem Clouddienst beitritt, der bereits eine hat) sowie eine neue DIP. Das Betriebssystem und die Datenträger der VM bleiben im Azure-Speicher intakt und können verwendet werden, um die VM später neu zu starten. Der mit der VM verknüpfte temporäre Datenträger (Scratch-Datenträger) wird jedoch freigegeben und alle Daten darauf können verloren gehen. Azure berechnet keine Gebühren für die VM-Kernstunden, während sie gestoppt (zuweisungsfreigegeben) ist. Es fallen weiterhin Gebühren für den Azure-Speicher an, der für den Betriebssystemdatenträger der VM und alle angeschlossenen Datenträger benötigt wird. Bei Premium-Datenträgern fallen Gebühren für die gesamte verwendete oder nicht verwendete Datenträgergröße an, während bei Standardspeichern Gebühren für den verwendeten Speicherplatz anfallen."
  },
  {
    id: "real-296",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Sie können Advisor-Empfehlungen in Azure verwenden, um E-Mail-Benachrichtigungen zu senden, wenn die Kosten des aktuellen Abrechnungszeitraums für ein Azure-Abonnement einen angegebenen Grenzwert überschreiten." },
      { id: "B", text: "Sie können die Zugriffssteuerung (IAM) in Azure verwenden, um E-Mail-Benachrichtigungen zu senden, wenn die Kosten des aktuellen Abrechnungszeitraums für ein Azure-Abonnement einen angegebenen Grenzwert überschreiten." },
      { id: "C", text: "Sie können Budgetwarnungen in Azure verwenden, um E-Mail-Benachrichtigungen zu senden, wenn die Kosten des aktuellen Abrechnungszeitraums für ein Azure-Abonnement einen angegebenen Grenzwert überschreiten." },
      { id: "D", text: "Sie können den Compliance Manager in Azure verwenden, um E-Mail-Benachrichtigungen zu senden, wenn die Kosten des aktuellen Abrechnungszeitraums für ein Azure-Abonnement einen angegebenen Grenzwert überschreiten." },
    ],
    correct: "C",
    explanation: "Budgetwarnungen benachrichtigen Sie, wenn Ausgaben (basierend auf Nutzung oder Kosten) den in der Warnungsbedingung des Budgets festgelegten Betrag erreichen oder überschreiten. Cost Management-Budgets werden über das Azure-Portal oder die Azure Consumption API erstellt. Im Azure-Portal werden Budgets nach Kosten definiert. Mit der Azure Consumption API werden Budgets nach Kosten oder nach Verbrauch definiert. Budgetwarnungen unterstützen sowohl kosten- als auch nutzungsbasierte Budgets. Budgetwarnungen werden automatisch generiert, wenn die Bedingungen für Budgetwarnungen erfüllt sind. Sie können alle Kostenwarnungen im Azure-Portal anzeigen. Wenn eine Warnung generiert wird, wird sie in den Kostenwarnungen angezeigt. Eine Warn-E-Mail wird auch an die Personen in der Liste der Warnungsempfänger des Budgets gesendet."
  },
  {
    id: "real-292",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Azure Container Instances bieten Zugriff auf ungenutzte Azure-Rechenkapazität zu hohen Rabatten." },
      { id: "B", text: "Azure Reserved Virtual Machine Instances bieten Zugriff auf ungenutzte Azure-Rechenkapazität zu hohen Rabatten." },
      { id: "C", text: "Azure Spot Virtual Machine Instances bieten Zugriff auf ungenutzte Azure-Rechenkapazität zu hohen Rabatten." },
      { id: "D", text: "Azure Virtual Machine Scale Sets bieten Zugriff auf ungenutzte Azure-Rechenkapazität zu hohen Rabatten." },
    ],
    correct: "C",
    explanation: "Mit Azure Spot Virtual Machines können Sie ungenutzte Kapazitäten zu erheblichen Kosteneinsparungen nutzen. Sobald Azure die Kapazität wieder benötigt, werden die Azure-Infrastrukturen die Azure Spot Virtual Machines entfernen. Daher eignen sich Azure Spot Virtual Machines hervorragend für Workloads, die Unterbrechungen bewältigen können, wie z. B. Batchverarbeitungsaufträge, Entwicklungs-/Testumgebungen, große Rechenlasten und mehr. Die verfügbare Kapazität kann je nach Größe, Region, Tageszeit usw. variieren. Beim Bereitstellen von Azure Spot Virtual Machines weist Azure die VMs zu, sofern Kapazität verfügbar ist. Für diese VMs gibt es jedoch kein SLA. Eine Azure Spot Virtual Machine bietet keine Hochverfügbarkeitsgarantie. Wenn Azure die Kapazität wieder benötigt, wird die Azure-Infrastruktur die Azure Spot Virtual Machines mit einer Vorlaufzeit von 30 Sekunden entfernen. Räumungsrichtlinie VMs können basierend auf der Kapazität oder dem von Ihnen festgelegten Höchstpreis entfernt werden. Beim Erstellen einer Azure Spot Virtual Machine können Sie die Entfernungsrichtlinie auf Deallocate (Standard) oder Delete festlegen . Die Richtlinie „Deallocate“ versetzt Ihre VM in den Zustand „Stopped-Deallocated“, sodass Sie sie später erneut bereitstellen können. Es gibt jedoch keine Garantie dafür, dass die Zuweisung erfolgreich ist. Die freigegebenen VMs werden auf Ihr Kontingent angerechnet, und Ihnen werden Speicherkosten für die zugrunde liegenden Datenträger in Rechnung gestellt. Wenn Ihre VM beim Räumungsvorgang gelöscht werden soll, können Sie die Räumungsrichtlinie auf „ Löschen“ setzen . Die geräumten VMs werden zusammen mit den zugrunde liegenden Datenträgern gelöscht, sodass Ihnen für den Speicher keine weiteren Kosten entstehen."
  },
  {
    id: "real-291",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Sie können den Bericht zur Einhaltung gesetzlicher Vorschriften Ihres Unternehmens von Azure Advisor aus anzeigen ." },
      { id: "B", text: "Sie können den Bericht zur Einhaltung gesetzlicher Vorschriften Ihres Unternehmens in Azure Analysis Services anzeigen ." },
      { id: "C", text: "Sie können den Bericht zur Einhaltung gesetzlicher Vorschriften Ihres Unternehmens in Azure Monitor anzeigen ." },
      { id: "D", text: "Sie können den Bericht zur Einhaltung gesetzlicher Vorschriften Ihres Unternehmens im Azure Security Center anzeigen ." },
    ],
    correct: "D",
    explanation: "Azure Security Center trägt mithilfe des Dashboards zur Einhaltung gesetzlicher Vorschriften dazu bei, den Prozess zur Erfüllung gesetzlicher Vorschriften zu optimieren. Security Center bewertet Ihre Hybrid Cloud-Umgebung kontinuierlich, um die Risikofaktoren entsprechend den Kontrollen und bewährten Methoden der Standards zu analysieren, die Sie auf Ihre Abonnements angewendet haben. Das Dashboard zeigt den Status Ihrer Konformität mit diesen Standards an. Das Dashboard zur Einhaltung gesetzlicher Vorschriften zeigt den Status aller Bewertungen in Ihrer Umgebung für die von Ihnen gewählten Standards und Vorschriften an. Indem Sie die Empfehlungen umsetzen und Risikofaktoren in Ihrer Umgebung reduzieren, verbessern Sie Ihre Compliance-Situation."
  },
  {
    id: "real-285",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Eine Availability Zone in Azure verfügt über physisch getrennte Standorte auf zwei Kontinenten." },
      { id: "B", text: "Eine Verfügbarkeitszone in Azure verfügt über physisch getrennte Standorte innerhalb einer einzelnen Azure-Region." },
      { id: "C", text: "Eine Verfügbarkeitszone in Azure verfügt über physisch getrennte Standorte innerhalb mehrerer Azure-Regionen." },
      { id: "D", text: "Eine Verfügbarkeitszone in Azure verfügt über physisch getrennte Standorte innerhalb eines einzelnen Azure-Rechenzentrums." },
    ],
    correct: "B",
    explanation: "Eine Availability Zone ist ein Hochverfügbarkeitsangebot, das Ihre Anwendungen und Daten vor Rechenzentrumsausfällen schützt. Availability Zones sind eindeutige physische Standorte innerhalb einer Azure-Region. Jede Zone besteht aus einem oder mehreren Rechenzentren mit unabhängiger Stromversorgung, Kühlung und Netzwerk. Um Ausfallsicherheit zu gewährleisten, gibt es in allen aktivierten Regionen mindestens drei separate Zonen. Die physische Trennung der Availability Zones innerhalb einer Region schützt Anwendungen und Daten vor Rechenzentrumsausfällen. Zonenredundante Dienste replizieren Ihre Anwendungen und Daten über Availability Zones hinweg, um sie vor einzelnen Ausfallpunkten zu schützen. Mit Availability Zones bietet Azure das branchenweit beste SLA mit 99,99 % VM-Betriebszeit. Das vollständige Azure-SLA erklärt die garantierte Verfügbarkeit von Azure als Ganzes. Eine Verfügbarkeitszone in einer Azure-Region ist eine Kombination aus einer Fehlerdomäne und einer Updatedomäne. Wenn Sie beispielsweise drei oder mehr VMs in drei Zonen einer Azure-Region erstellen, werden Ihre VMs effektiv auf drei Fehlerdomänen und drei Updatedomänen verteilt. Die Azure-Plattform erkennt diese Verteilung auf Updatedomänen, um sicherzustellen, dass VMs in verschiedenen Zonen nicht gleichzeitig aktualisiert werden. Integrieren Sie Hochverfügbarkeit in Ihre Anwendungsarchitektur, indem Sie Ihre Rechen-, Speicher-, Netzwerk- und Datenressourcen innerhalb einer Zone zusammenlegen und in anderen Zonen replizieren. Azure-Dienste, die Verfügbarkeitszonen unterstützen, lassen sich in zwei Kategorien einteilen: • Zonale Dienste – bei denen eine Ressource an eine bestimmte Zone gebunden ist (z. B. virtuelle Maschinen, verwaltete Datenträger, Standard-IP-Adressen) oder • Zonenredundante Dienste – wenn die Azure-Plattform automatisch über Zonen hinweg repliziert wird (z. B. zonenredundanter Speicher, SQL-Datenbank). Um umfassende Geschäftskontinuität in Azure zu erreichen, erstellen Sie Ihre Anwendungsarchitektur mithilfe einer Kombination aus Verfügbarkeitszonen und Azure- Regionspaaren. Sie können Ihre Anwendungen und Daten mithilfe von Verfügbarkeitszonen innerhalb einer Azure-Region synchron replizieren, um Hochverfügbarkeit zu gewährleisten, und für den Notfallschutz eine asynchrone Replikation zwischen Azure-Regionen durchführen."
  },
  {
    id: "real-284",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Azure Databricks ist ein auf Apache Spark basierender Analysedienst." },
      { id: "B", text: "Azure Data Factory ist ein auf Apache Spark basierender Analysedienst." },
      { id: "C", text: "Azure DevOps ist ein auf Apache Spark basierender Analysedienst." },
      { id: "D", text: "Azure Synapse Analytics ist ein auf Apache Spark basierender Analysedienst." },
    ],
    correct: "A",
    explanation: "Azure Databricks ist eine für die Microsoft Azure-Clouddienstplattform optimierte Datenanalyseplattform. Azure Databricks bietet zwei Umgebungen für die Entwicklung datenintensiver Anwendungen: Azure Databricks SQL Analytics und Azure Databricks Workspace. Azure Databricks SQL Analytics bietet eine benutzerfreundliche Plattform für Analysten, die SQL-Abfragen in ihrem Data Lake ausführen, mehrere Visualisierungstypen erstellen möchten, um Abfrageergebnisse aus verschiedenen Perspektiven zu untersuchen, und Dashboards erstellen und freigeben möchten. Azure Databricks Workspace bietet einen interaktiven Arbeitsbereich, der die Zusammenarbeit zwischen Dateningenieuren, Datenwissenschaftlern und Ingenieuren für maschinelles Lernen ermöglicht. Für eine Big Data-Pipeline werden die Daten (roh oder strukturiert) über Azure Data Factory in Batches in Azure aufgenommen oder mit Apache Kafka, Event Hub oder IoT Hub nahezu in Echtzeit gestreamt. Diese Daten landen in einem Data Lake zur langfristigen persistenten Speicherung in Azure Blob Storage oder Azure Data Lake Storage. Verwenden Sie im Rahmen Ihres Analyse-Workflows Azure Databricks, um Daten aus mehreren Datenquellen zu lesen und sie mit Spark in bahnbrechende Erkenntnisse umzuwandeln. Azure Databricks bietet die neuesten Versionen von Apache Spark und ermöglicht Ihnen die nahtlose Integration mit Open-Source-Bibliotheken"
  },
  {
    id: "real-280",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "In der Datenschutzerklärung für Microsoft Onlinedienste wird erläutert, welche Daten Microsoft verarbeitet, wie Microsoft die Daten verarbeitet und zu welchem Zweck die Datenverarbeitung erfolgt." },
      { id: "B", text: "In den Bedingungen für Microsoft Online Services wird erläutert, welche Daten Microsoft verarbeitet, wie Microsoft die Daten verarbeitet und zu welchem Zweck die Datenverarbeitung erfolgt." },
      { id: "C", text: "Im Microsoft Online Services Level Agreement wird erläutert, welche Daten Microsoft verarbeitet, wie Microsoft die Daten verarbeitet und zu welchem Zweck die Datenverarbeitung erfolgt." },
      { id: "D", text: "Im Online-Abonnementvertrag für Microsoft Azure wird erläutert, welche Daten Microsoft verarbeitet, wie Microsoft die Daten verarbeitet und zu welchem Zweck die Datenverarbeitung erfolgt." },
    ],
    correct: "A",
    explanation: "Die Datenschutzerklärung für Microsoft Online Services erläutert, welche personenbezogenen Daten Microsoft verarbeitet, wie Microsoft sie verarbeitet und zu welchen Zwecken."
  },
  {
    id: "real-278",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Nachdem Sie eine virtuelle Maschine erstellt haben, müssen Sie die Netzwerksicherheitsgruppe (NSG) ändern , um Verbindungen vom TCP-Port 8080 zur virtuellen Maschine zuzulassen." },
      { id: "B", text: "Nachdem Sie eine virtuelle Maschine erstellt haben, müssen Sie das virtuelle Netzwerk-Gateway ändern , um Verbindungen vom TCP-Port 8080 zur virtuellen Maschine zuzulassen." },
      { id: "C", text: "Nachdem Sie eine virtuelle Maschine erstellt haben, müssen Sie das virtuelle Netzwerk ändern , um Verbindungen vom TCP-Port 8080 zur virtuellen Maschine zuzulassen." },
      { id: "D", text: "Nachdem Sie eine virtuelle Maschine erstellt haben, müssen Sie die Routentabelle ändern , um Verbindungen vom TCP-Port 8080 zur virtuellen Maschine zuzulassen." },
    ],
    correct: "A",
    explanation: "Eine Netzwerksicherheitsgruppe enthält Sicherheitsregeln, die eingehenden Netzwerkverkehr zu bzw. ausgehenden Netzwerkverkehr von verschiedenen Azure- Ressourcen zulassen oder verweigern. Für jede Regel können Sie Quelle und Ziel, Port und Protokoll angeben. Eingehender Datenverkehr über Port 8080 TCP wird beim Erstellen einer neuen Azure-VM standardmäßig blockiert."
  },
  {
    id: "real-276",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Wenn Sie Berechtigungen gleichzeitig an mehrere virtuelle Azure-Maschinen delegieren müssen, müssen Sie die virtuellen Azure-Maschinen in derselben Azure-Region bereitstellen ." },
      { id: "B", text: "Wenn Sie Berechtigungen gleichzeitig an mehrere virtuelle Azure-Computer delegieren müssen, müssen Sie die virtuellen Azure-Computer mithilfe derselben Azure Resource Manager-Vorlage bereitstellen ." },
      { id: "C", text: "Wenn Sie Berechtigungen gleichzeitig an mehrere virtuelle Azure-Maschinen delegieren müssen, müssen Sie die virtuellen Azure-Maschinen in derselben Ressourcengruppe bereitstellen ." },
      { id: "D", text: "Wenn Sie Berechtigungen gleichzeitig an mehrere virtuelle Azure-Maschinen delegieren müssen, müssen Sie die virtuellen Azure-Maschinen in derselben Verfügbarkeitszone bereitstellen ." },
    ],
    correct: "C",
    explanation: "Jede dem Abonnement zugewiesene Rolle wird nach unten weitergegeben und an alle Ressourcen vererbt, die unter dieses Abonnement fallen. Ebenso wird jede Rolle einer Ressourcengruppe an alle Ressourcen innerhalb dieser Ressourcengruppe vererbt. Diese Vererbung kann nicht blockiert werden, da sie so konzipiert ist und RBAC-Rollen je nach Anwendung der RBAC-Rolle von der obersten zur untersten Ebene weitergegeben werden."
  },
  {
    id: "real-274",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Alle Azure-Dienste in der öffentlichen Vorschau werden ohne Dokumentation bereitgestellt ." },
      { id: "B", text: "Alle Azure-Dienste in der öffentlichen Vorschau sind nur über die Azure CLI konfigurierbar ." },
      { id: "C", text: "Alle Azure-Dienste, die sich in der öffentlichen Vorschau befinden, sind von den Service Level Agreements ausgeschlossen . D Alle Azure-Dienste in der öffentlichen Vorschau können nur über das Azure-Portal konfiguriert werden ." },
    ],
    correct: "C",
    explanation: "Azure kann Vorschau-, Beta- oder andere Vorabversionen von Funktionen, Diensten, Software oder Regionen enthalten, die von Microsoft angeboten werden („Vorschauen“). Vorschauen werden Ihnen im Rahmen Ihres Azure-Nutzungsvertrags lizenziert. Gemäß den Bedingungen Ihres Azure-Abonnements werden Vorschauen „WIE BESEHEN“, „MIT ALLEN FEHLERN“ UND „WIE VERFÜGBAR“ BEREITGESTELLT UND SIND VON DEN SERVICE LEVEL AGREEMENTS UND DER EINGESCHRÄNKTEN GARANTIE AUSGESCHLOSSEN. Vorschauen werden möglicherweise nicht durch den Kundensupport abgedeckt. Für Vorschauen können reduzierte oder andere Sicherheits-, Compliance- und Datenschutzverpflichtungen gelten. Ergänzende Nutzungsbedingungen für Microsoft Azure-Vorschauen"
  },
  {
    id: "real-272",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Ein Azure-Dienst ist für alle Azure-Kunden verfügbar, wenn er sich in der öffentlichen Vorschau befindet" },
      { id: "B", text: "Ein Azure-Dienst ist für alle Azure-Kunden verfügbar, wenn er sich in der privaten Vorschau befindet" },
      { id: "C", text: "Ein Azure-Dienst steht allen Azure-Kunden zur Verfügung, wenn er sich in der Entwicklung befindet D Ein Azure-Dienst steht allen Azure-Kunden zur Verfügung, wenn er Teil eines Enterprise Agreement (EA)-Abonnements ist." },
    ],
    correct: "A",
    explanation: "Azure Active Directory stellt Updates und neue Funktionen in Form von Vorschauprogrammen bereit. Microsoft führt die Vorschauen phasenweise ein, um Microsoft und Kunden die Möglichkeit zu geben, die neue Funktion zu testen und zu verstehen, bevor sie Teil des Standarddienstes von Azure AD wird. Die Phasen sind wie folgt: 1. Private Vorschau – In dieser Phase laden wir einige Kunden ein, frühzeitig auf neue Konzepte und Funktionen zuzugreifen. Diese Phase beinhaltet keinen formellen Support. 2. Öffentliche Vorschau – In dieser Phase können alle Kunden mit der entsprechenden Azure AD-Lizenz die neue Funktion testen. Der Microsoft- Kundensupport bietet in dieser Phase Supportleistungen an, die üblichen Service Level Agreements gelten jedoch nicht. Bei neuen Funktionen im Azure AD- Portal werden Kunden in der Benutzeroberfläche Informationsbanner angezeigt, die auf die neue Funktion in der Vorschau aufmerksam machen. Durch Klicken auf das Informationsbanner können Kunden die Vorschau aktivieren. 3. Allgemein verfügbar (GA) – Nach Abschluss der öffentlichen Vorschau steht die Funktion allen lizenzierten Kunden zur Verfügung und wird über alle Microsoft-Supportkanäle unterstützt. Beachten Sie, dass sich die Nutzung der Funktion durch neue Funktionen ändern kann, wenn diese sich auf bestehende Funktionen auswirken. Für jedes Azure Active Directory-Vorschauprogramm gelten andere Opt-in-Anforderungen und Abhängigkeiten."
  },
  {
    id: "real-271",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Ressourcengruppen bieten Organisationen die Möglichkeit, die Compliance von Azure-Ressourcen über mehrere Abonnements hinweg zu verwalten." },
      { id: "B", text: "Verwaltungsgruppen bieten Organisationen die Möglichkeit, die Compliance von Azure-Ressourcen über mehrere Abonnements hinweg zu verwalten." },
      { id: "C", text: "Azure-Richtlinien bieten Organisationen die Möglichkeit, die Konformität von Azure-Ressourcen über mehrere Abonnements hinweg zu verwalten." },
      { id: "D", text: "Azure App Service-Pläne bieten Organisationen die Möglichkeit, die Compliance von Azure-Ressourcen über mehrere Abonnements hinweg zu verwalten." },
    ],
    correct: "C",
    explanation: "Azure Policy wertet Ressourcen in Azure aus, indem es die Eigenschaften dieser Ressourcen mit Geschäftsregeln vergleicht. Diese im JSON-Format beschriebenen Geschäftsregeln werden als Richtliniendefinitionen bezeichnet. Zur Vereinfachung der Verwaltung können mehrere Geschäftsregeln zu einer Richtlinieninitiative (manchmal auch als „PolicySet“ bezeichnet) zusammengefasst werden. Nachdem Ihre Geschäftsregeln erstellt wurden, wird die Richtliniendefinition oder -initiative jedem von Azure unterstützten Ressourcenbereich zugewiesen, z. B. Verwaltungsgruppen, Abonnements, Ressourcengruppen oder einzelnen Ressourcen. Die Zuweisung gilt für alle Ressourcen innerhalb dieses Bereichs. Unterbereiche können bei Bedarf ausgeschlossen werden. Azure Policy verwendet ein JSON-Format, um die Logik zu bilden, mit der die Auswertung ermittelt, ob eine Ressource konform ist oder nicht. Definitionen umfassen Metadaten und die Richtlinienregel. Die definierte Regel kann Funktionen, Parameter, logische Operatoren, Bedingungen und Eigenschaftsaliase verwenden, um genau dem gewünschten Szenario zu entsprechen. Die Richtlinienregel bestimmt, welche Ressourcen im Bereich der Zuweisung ausgewertet werden."
  },
  {
    id: "real-268",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Azure-Richtlinien bieten eine gemeinsame Plattform zum Bereitstellen von Objekten in einer Cloud-Infrastruktur und zum Implementieren von Konsistenz in der gesamten Azure-Umgebung." },
      { id: "B", text: "Ressourcengruppen bieten eine gemeinsame Plattform zum Bereitstellen von Objekten in einer Cloud-Infrastruktur und zum Implementieren von Konsistenz in der gesamten Azure-Umgebung." },
      { id: "C", text: "Azure Resource Manager bietet eine gemeinsame Plattform zum Bereitstellen von Objekten in einer Cloud-Infrastruktur und zum Implementieren von Konsistenz in der gesamten Azure-Umgebung." },
      { id: "D", text: "Verwaltungsgruppen bieten eine gemeinsame Plattform zum Bereitstellen von Objekten in einer Cloud-Infrastruktur und zum Implementieren von Konsistenz in der gesamten Azure-Umgebung." },
    ],
    correct: "C",
    explanation: "Azure Resource Manager ist der Bereitstellungs- und Verwaltungsdienst für Azure. Er bietet eine Verwaltungsebene, mit der Sie Ressourcen in Ihrem Azure-Konto erstellen, aktualisieren und löschen können. Mit Verwaltungsfunktionen wie Zugriffssteuerung, Sperren und Tags können Sie Ihre Ressourcen nach der Bereitstellung sichern und organisieren."
  },
  {
    id: "real-266",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Azure Cosmos DB ist ein Beispiel für ein Platform-as-a-Service -Angebot (PaaS)." },
      { id: "B", text: "Azure Cosmos DB ist ein Beispiel für ein Infrastructure-as-a-Service-Angebot (IaaS) ." },
      { id: "C", text: "Azure Cosmos DB ist ein Beispiel für ein serverloses Angebot." },
      { id: "D", text: "Azure Cosmos DB ist ein Beispiel für ein Software-as-a-Service -Angebot (SaaS)." },
    ],
    correct: "A",
    explanation: "Azure Cosmos DB ist eine vollständig verwaltete NoSQL-Datenbank für die moderne App-Entwicklung. Reaktionszeiten im einstelligen Millisekundenbereich sowie automatische und sofortige Skalierbarkeit garantieren Geschwindigkeit in jedem Maßstab. Geschäftskontinuität wird durch SLA-gestützte Verfügbarkeit und Sicherheit auf Unternehmensniveau gewährleistet. Die App-Entwicklung ist dank schlüsselfertiger, regionsübergreifender Datenverteilung weltweit sowie Open-Source-APIs und SDKs für gängige Sprachen schneller und produktiver. Als vollständig verwalteter Dienst nimmt Ihnen Azure Cosmos DB die Datenbankadministration mit automatischer Verwaltung, Updates und Patches ab. Darüber hinaus übernimmt es das Kapazitätsmanagement mit kostengünstigen serverlosen und automatischen Skalierungsoptionen, die auf Anwendungsanforderungen reagieren und die Kapazität an den Bedarf anpassen. Azure Cosmos DB ist ein Beispiel für einen Platform-as-a-Service (PaaS)-Clouddatenbankanbieter."
  },
  {
    id: "real-224",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Das zusammengesetzte SLA für die Anwendung ist das Produkt beider SLAs, das 99,94 Prozent entspricht." },
      { id: "B", text: "Das zusammengesetzte SLA für die Anwendung ist das niedrigste mit der Anwendung verbundene SLA, das 99,95 Prozent beträgt." },
      { id: "C", text: "Das zusammengesetzte SLA für die Anwendung ist das höchste mit der Anwendung verbundene SLA, nämlich 99,99 Prozent." },
      { id: "D", text: "Das zusammengesetzte SLA für die Anwendung ist die Differenz zwischen den beiden SLAs, also 0,05 Prozent." },
    ],
    correct: "A",
    explanation: "Zusammengesetzte SLAs umfassen mehrere Dienste, die eine Anwendung unterstützen, und zwar jeweils mit unterschiedlichen Verfügbarkeitsstufen. Betrachten Sie beispielsweise eine App Service-Web-App, die in die Azure SQL-Datenbank schreibt. Zum Zeitpunkt der Erstellung dieses Artikels gelten für diese Azure-Dienste die folgenden SLAs: • App Service-Web-Apps = 99,95 % • SQL-Datenbank = 99,99 % Mit welcher maximalen Ausfallzeit ist für diese Anwendung zu rechnen? Fällt einer der beiden Dienste aus, fällt die gesamte Anwendung aus. Da die Ausfallwahrscheinlichkeit der einzelnen Dienste unabhängig ist, beträgt das kombinierte SLA für diese Anwendung 99,95 % × 99,99 % = 99,94 %. Das ist weniger als die einzelnen SLAs, was nicht verwunderlich ist, da eine Anwendung, die auf mehreren Diensten basiert, mehr potenzielle Fehlerquellen aufweist."
  },
  {
    id: "real-220",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Microsoft erstattet den Betrag auf Ihr Bankkonto zurück." },
      { id: "B", text: "Microsoft migriert die Ressource zu einem anderen Abonnement." },
      { id: "C", text: "Microsoft schreibt den Betrag Ihrem Azure-Konto gut." },
      { id: "D", text: "Microsoft sendet Ihnen einen Gutscheincode, den Sie gegen Azure-Guthaben einlösen können." },
    ],
    correct: "C",
    explanation: "Microsoft ist bereit, für Azure-Dienstausfälle, die nicht im Service Level Agreement (SLA) vereinbart wurden, eine Rückerstattung zu zahlen. In manchen Fällen geschieht dies automatisch. In der Regel muss der Kunde die Rückerstattung jedoch selbst beantragen. Was passiert, wenn Microsoft sein SLA nicht einhält? Es liegt in der Verantwortung des Kunden oder Partners, festzustellen, ob das Microsoft Azure Service Level Agreement nicht eingehalten wurde. Um einen Anspruch bezüglich eines Vorfalls geltend machen zu können, muss der Kunde den Kundensupport innerhalb von fünf Werktagen nach dem Vorfall über den Vorfall informieren. Der Kunde muss außerdem ausreichende Beweise zur Unterstützung des Anspruchs vorlegen. Sobald der Anspruch von Microsoft bestätigt wurde, wird für SLAs zwischen 99,5 % und 99 % eine Gutschrift von 10 % gewährt. Für SLAs unter 99 % wird für den jeweiligen Monat, in dem das SLA nicht eingehalten wurde, eine Gutschrift von 25 % ausgestellt. Weitere Informationen zum Azure SLA finden Sie im Service Level Agreement."
  },
  {
    id: "real-209",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Einer der Vorteile von Azure SQL Data Warehouse besteht darin, dass die Plattform über eine hohe Verfügbarkeit verfügt." },
      { id: "B", text: "Einer der Vorteile von Azure SQL Data Warehouse besteht darin, dass die automatische Skalierung in die Plattform integriert ist." },
      { id: "C", text: "Einer der Vorteile von Azure SQL Data Warehouse besteht darin, dass die Datenkomprimierung in die Plattform integriert ist." },
      { id: "D", text: "Einer der Vorteile von Azure SQL Data Warehouse besteht darin, dass die Versionsverwaltung in die Plattform integriert ist." },
    ],
    correct: "A",
    explanation: "Azure SQL Data Warehouse ist ein verwalteter Dienst im Petabyte-Bereich mit Steuerelementen zur unabhängigen Verwaltung von Rechenleistung und Speicher. Neben der Flexibilität hinsichtlich der Rechenlastelastizität ermöglicht es Benutzern auch, die Rechenschicht anzuhalten und gleichzeitig die Daten beizubehalten, um die Kosten in einer Pay-as-you-go-Umgebung zu senken."
  },
  {
    id: "real-208",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Ihr Azure-Testkonto ist letzte Woche abgelaufen. Sie können jetzt keine weiteren Azure Active Directory (Azure AD)-Benutzerkonten erstellen." },
      { id: "B", text: "Ihr Azure-Testkonto ist letzte Woche abgelaufen. Sie können jetzt keine vorhandene virtuelle Azure-Maschine mehr starten." },
      { id: "C", text: "Ihr Azure-Testkonto ist letzte Woche abgelaufen. Sie können jetzt nicht mehr auf Ihre in Azure gespeicherten Daten zugreifen." },
      { id: "D", text: "Ihr Azure-Testkonto ist letzte Woche abgelaufen. Sie können jetzt nicht mehr auf das Azure-Portal zugreifen." },
    ],
    correct: "B",
    explanation: "Sie können eine vorhandene virtuelle Azure-Maschine nicht starten, wenn das Abonnement, das die VM enthält, abgelaufen ist. Wenn die VM bei Ablauf des Abonnements ausgeführt wird, wird sie heruntergefahren."
  },
  {
    id: "real-207",
    topicId: "cloud-konzepte",
    prompt: "",
    options: [
      { id: "A", text: "Eine Organisation, die ihre Infrastruktur in einer privaten Cloud hostet , benötigt kein Rechenzentrum mehr." },
      { id: "B", text: "Eine Organisation, die ihre Infrastruktur in einer Hybrid Cloud hostet , benötigt kein Rechenzentrum mehr." },
      { id: "C", text: "Eine Organisation, die ihre Infrastruktur in der öffentlichen Cloud hostet , benötigt kein Rechenzentrum mehr." },
      { id: "D", text: "Eine Organisation, die ihre Infrastruktur auf einem Hyper-V-Host hostet , benötigt kein Rechenzentrum mehr." },
    ],
    correct: "C",
    explanation: "Die Public Cloud umfasst Computing-Dienste von Drittanbietern über das öffentliche Internet, die jedem zur Verfügung stehen, der sie nutzen oder erwerben möchte. Sie können kostenlos oder bedarfsgerecht angeboten werden, sodass Kunden nur pro Nutzung für die von ihnen genutzten CPU- Zyklen, Speicher oder Bandbreite zahlen. Im Gegensatz zu Private Clouds ersparen Public Clouds Unternehmen die hohen Kosten für Anschaffung, Verwaltung und Wartung lokaler Hardware und Anwendungsinfrastruktur – der Cloud-Service-Provider ist für die gesamte Verwaltung und Wartung des Systems verantwortlich. Public Clouds lassen sich zudem schneller als lokale Infrastrukturen bereitstellen und bieten eine nahezu unbegrenzt skalierbare Plattform. Jeder Mitarbeiter eines Unternehmens kann dieselbe Anwendung von jedem Büro oder jeder Niederlassung aus mit seinem bevorzugten Gerät nutzen, sofern er Internetzugang hat. Zwar gibt es Sicherheitsbedenken gegenüber Public-Cloud-Umgebungen, doch bei korrekter Implementierung kann die Public Cloud genauso sicher sein wie die am besten verwaltete Private-Cloud-Implementierung, sofern der Anbieter geeignete Sicherheitsmaßnahmen wie Intrusion Detection and Prevention Systems (IDPS) einsetzt."
  },
  {
    id: "real-203",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Über Azure Control IAM können Sie anzeigen, welcher Benutzer in den letzten 14 Tagen eine bestimmte virtuelle Maschine ausgeschaltet hat." },
      { id: "B", text: "Über Azure Event Hubs können Sie anzeigen, welcher Benutzer in den letzten 14 Tagen eine bestimmte virtuelle Maschine ausgeschaltet hat." },
      { id: "C", text: "Im Azure-Aktivitätsprotokoll können Sie sehen, welcher Benutzer in den letzten 14 Tagen eine bestimmte virtuelle Maschine ausgeschaltet hat." },
      { id: "D", text: "Über Azure Service Health können Sie sehen, welcher Benutzer in den letzten 14 Tagen eine bestimmte virtuelle Maschine ausgeschaltet hat." },
    ],
    correct: "C",
    explanation: "Start- und Stoppvorgänge für virtuelle Maschinen können im Azure-Aktivitätsprotokoll überprüft werden."
  },
  {
    id: "real-201",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "..., VM1 muss in einem separaten virtuellen Netzwerk bereitgestellt werden ." },
      { id: "B", text: "..., VM1 muss ein anderes Betriebssystem ausführen als die anderen virtuellen Maschinen ." },
      { id: "C", text: "..., VM1 muss in einer separaten Ressourcengruppe bereitgestellt werden ." },
      { id: "D", text: "..., VM1 muss über zwei Netzwerkschnittstellen verfügen ." },
    ],
    correct: "A",
    explanation: "Um die Netzwerkkonnektivität zwischen virtuellen Maschinen zu verhindern, können wir die virtuellen Maschinen in verschiedenen virtuellen Netzwerken bereitstellen und die Kommunikation zwischen den virtuellen Netzwerken verhindern."
  },
  {
    id: "real-192",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "VNET1 wird automatisch gelöscht." },
      { id: "B", text: "VNET1 wird automatisch in eine andere Ressourcengruppe verschoben." },
      { id: "C", text: "VNET1 funktioniert weiterhin normal." },
      { id: "D", text: "VNET1 ist jetzt ein schreibgeschütztes Objekt." },
    ],
    correct: "C",
    explanation: "Mit der Richtlinie „Nicht zulässige Ressourcentypen“ können Sie die Ressourcentypen angeben, die Ihre Organisation in einem bestimmten Bereich nicht bereitstellen kann. Vorhandene Ressourcen sind von der Richtlinie nicht betroffen."
  },
  {
    id: "real-190",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Ihr Unternehmen implementiert Azure-Richtlinien , um Microsoft Word-Dokumenten, die Kreditkarteninformationen enthalten, automatisch ein Wasserzeichen hinzuzufügen." },
      { id: "B", text: "Ihr Unternehmen implementiert einen DDOS-Schutz , um Microsoft Word-Dokumenten, die Kreditkarteninformationen enthalten, automatisch ein Wasserzeichen hinzuzufügen." },
      { id: "C", text: "Ihr Unternehmen implementiert Azure Information Protection, um Microsoft Word-Dokumenten, die Kreditkarteninformationen enthalten, automatisch ein Wasserzeichen hinzuzufügen." },
      { id: "D", text: "Ihr Unternehmen implementiert Azure Active Directory Identity Protection, um Microsoft Word-Dokumenten, die Kreditkarteninformationen enthalten, automatisch ein Wasserzeichen hinzuzufügen." },
    ],
    correct: "C",
    explanation: "Azure Information Protection (AIP) ist eine Cloud-basierte Lösung, die es Organisationen ermöglicht, Dokumente und E-Mails durch das Anwenden von Bezeichnungen zu klassifizieren und zu schützen. Der Inhalt der Kennzeichnung umfasst: • Eine Klassifizierung , die unabhängig davon erkannt werden kann, wo die Daten gespeichert sind oder mit wem sie geteilt werden. • Visuelle Markierungen , wie Kopf- und Fußzeilen oder Wasserzeichen. • Metadaten , die Dateien und E-Mail-Headern im Klartext hinzugefügt werden. Die Klartext-Metadaten stellen sicher, dass andere Dienste die Klassifizierung erkennen und entsprechende Maßnahmen ergreifen können."
  },
  {
    id: "real-189",
    topicId: "azure-architektur",
    prompt: "",
    options: [
      { id: "A", text: "Wenn eine Ressourcengruppe mit dem Namen RG1 über eine Löschsperre verfügt, kann nur ein Mitglied der globalen Administratorgruppe RG1 löschen." },
      { id: "B", text: "Wenn eine Ressourcengruppe mit dem Namen RG1 über eine Löschsperre verfügt, muss die Löschsperre entfernt werden, bevor ein Administrator RG1 löschen kann." },
      { id: "C", text: "Wenn eine Ressourcengruppe mit dem Namen RG1 über eine Löschsperre verfügt, muss eine Azure-Richtlinie geändert werden, bevor ein Administrator RG1 löschen kann." },
      { id: "D", text: "Wenn eine Ressourcengruppe mit dem Namen RG1 über eine Löschsperre verfügt, muss ein Azure-Tag hinzugefügt werden, bevor ein Administrator RG1 löschen kann." },
    ],
    correct: "B",
    explanation: "Azure-Ressourcensperren gelten für alle Benutzer, einschließlich globaler Administratoren. Ressourcensperren verhindern, dass Benutzer und Administratoren in Ihrer Organisation versehentlich kritische Ressourcen löschen oder ändern. Die Löschsperre muss entfernt werden, bevor die Ressource gelöscht werden kann."
  },
  {
    id: "real-188",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Über Azure Control IAM können Sie anzeigen, welcher Benutzer in den letzten 14 Tagen eine bestimmte virtuelle Maschine ausgeschaltet hat." },
      { id: "B", text: "Über Azure Event Hubs können Sie anzeigen, welcher Benutzer in den letzten 14 Tagen eine bestimmte virtuelle Maschine ausgeschaltet hat." },
      { id: "C", text: "Im Azure-Aktivitätsprotokoll können Sie sehen, welcher Benutzer in den letzten 14 Tagen eine bestimmte virtuelle Maschine ausgeschaltet hat. D Über Azure Service Health können Sie sehen, welcher Benutzer in den letzten 14 Tagen eine bestimmte virtuelle Maschine ausgeschaltet hat." },
    ],
    correct: "C",
    explanation: "Start- und Stoppvorgänge für virtuelle Maschinen können im Azure-Aktivitätsprotokoll überprüft werden."
  },
  {
    id: "real-187",
    topicId: "azure-verwaltung",
    prompt: "",
    options: [
      { id: "A", text: "Bei der Autorisierung handelt es sich um den Vorgang der Überprüfung der Anmeldeinformationen eines Benutzers." },
      { id: "B", text: "Bei der Authentifizierung handelt es sich um den Vorgang der Überprüfung der Anmeldeinformationen eines Benutzers." },
      { id: "C", text: "Bei der Föderation handelt es sich um den Prozess der Überprüfung der Anmeldeinformationen eines Benutzers." },
      { id: "D", text: "Beim Ticketing handelt es sich um den Vorgang der Überprüfung der Anmeldeinformationen eines Benutzers." },
    ],
    correct: "B",
    explanation: "Bei der Authentifizierung werden Benutzer identifiziert, indem bestätigt wird, wer sie sind, während bei der Autorisierung die Rechte und Privilegien eines Benutzers festgelegt werden."
  },
  {
    type: "yesno",
    id: "real-yn-554",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Benutzer können eine Azure-Ressource ändern, auf die eine Löschsperre angewendet wurde", correct: "Ja" },
      { text: "Alle Azure-Ressourcen erben die Sperren, die ihrer übergeordneten Ressourcengruppe zugewiesen sind", correct: "Ja" },
      { text: "Eine schreibgeschützte Sperre verhindert, dass Benutzer eine Azure-Ressource löschen", correct: "Ja" },
    ],
    explanation: "Als Administrator können Sie ein Azure-Abonnement, eine Ressourcengruppe oder eine Ressource sperren, um sie vor versehentlichem Löschen und Ändern durch Benutzer zu schützen. Die Sperre überschreibt alle Benutzerberechtigungen. Sie können Sperren festlegen, die entweder Löschungen oder Änderungen verhindern. Im Portal heißen diese Sperren Löschen und Schreibgeschützt . In der Befehlszeile heißen diese Sperren CanNotDelete und ReadOnly . • „CanNotDelete“ bedeutet, dass autorisierte Benutzer eine Ressource lesen und ändern, aber nicht löschen können. • ReadOnly bedeutet, dass autorisierte Benutzer eine Ressource lesen, aber nicht löschen oder aktualisieren können. Das Anwenden dieser Sperre entspricht der Beschränkung aller autorisierten Benutzer auf die Berechtigungen der Leserrolle . Anders als bei der rollenbasierten Zugriffskontrolle (RBAC) verwenden Sie Verwaltungssperren, um eine Einschränkung auf alle Benutzer und Rollen anzuwenden. Wenn Sie eine Sperre auf einen übergeordneten Bereich anwenden, erben alle Ressourcen innerhalb dieses Bereichs dieselbe Sperre. Auch später hinzugefügte Ressourcen erben dieselbe übergeordnete Sperre. Die restriktivste Sperre in der Vererbungskette hat Vorrang."
  },
  {
    type: "yesno",
    id: "real-yn-547",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Microsoft Purview bietet Datenermittlung", correct: "Ja" },
      { text: "Microsoft Purview bietet Datenklassifizierung", correct: "Ja" },
      { text: "Microsoft Purview bietet Datensicherung", correct: "Nein" },
    ],
    explanation: "Microsoft Purview ist ein umfassendes Lösungspaket, das Ihr Unternehmen bei der Verwaltung, dem Schutz und der Verwaltung von Daten unterstützt, unabhängig davon, wo diese gespeichert sind. Microsoft Purview-Lösungen bieten eine integrierte Abdeckung und helfen, die Fragmentierung von Daten in Unternehmen, die mangelnde Transparenz, die Datenschutz und -verwaltung beeinträchtigt, sowie die Vermischung traditioneller IT-Management-Rollen zu beheben. Microsoft Purview ermöglicht das Erkennen und Klassifizieren von in Microsoft 365-Diensten gespeicherten Daten. Microsoft Purview bietet keine integrierte automatische Sicherungs- und Wiederherstellungsfunktion für seine Datenverwaltungslösungen. Kunden sind derzeit für die Implementierung eigener Sicherungs- und Wiederherstellungsstrategien für Microsoft Purview-Konten verantwortlich."
  },
  {
    type: "yesno",
    id: "real-yn-546",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure-Virtual Machines können Namen automatisch in Azure DNS registrieren", correct: "Ja" },
      { text: "Azure DNS kann eine benutzerdefinierte DNS-Domäne hosten", correct: "Ja" },
      { text: "Azure DNS unterstützt nur öffentliche DNS-Domänennamen", correct: "Nein" },
    ],
    explanation: "Das Domain Name System (DNS) ist für die Übersetzung (Auflösung) eines Dienstnamens in eine IP-Adresse verantwortlich. Azure DNS bietet DNS-Hosting, Auflösung und Lastenausgleich für Ihre Anwendungen mithilfe der Microsoft Azure-Infrastruktur. Azure DNS unterstützt sowohl internetbasierte DNS-Domänen als auch private DNS-Zonen und bietet die folgenden Dienste: • Azure Public DNS ist ein Hostingdienst für DNS-Domänen. Wenn Sie Ihre Domänen in Azure hosten, können Sie Ihre DNS-Einträge mit denselben Anmeldeinformationen, APIs, Tools und Abrechnungsmethoden wie bei Ihren anderen Azure-Diensten verwalten. • Azure Private DNS ist ein DNS-Dienst für Ihre virtuellen Netzwerke. Azure Private DNS verwaltet und löst Domänennamen im virtuellen Netzwerk auf, ohne dass eine benutzerdefinierte DNS-Lösung konfiguriert werden muss. • Azure DNS Private Resolver ist ein Dienst, mit dem Sie private Azure DNS-Zonen aus einer lokalen Umgebung und umgekehrt abfragen können, ohne VM-basierte DNS-Server bereitzustellen. • Azure Traffic Manager ist ein DNS-basierter Lastenausgleich für den Datenverkehr. Mit diesem Dienst können Sie den Datenverkehr an Ihre öffentlichen Anwendungen in den globalen Azure-Regionen verteilen. Azure DNS ermöglicht mehrere Szenarien, darunter: • Hosten und Auflösen öffentlicher Domänen • Verwalten der DNS-Auflösung in Ihren virtuellen Netzwerken • Aktivieren der automatischen Registrierung für VMs • Aktivieren der Namensauflösung zwischen Azure und Ihren lokalen Ressourcen • Sicheres Hybridnetzwerk • Überwachen Sie DNS-Metriken und -Warnungen • Integration mit Ihren anderen Azure-Diensten • Führen Sie eine Private Link- und DNS-Integration im großen Maßstab durch • Schützen Sie Ihre öffentlichen und privaten DNS-Zonen und -Einträge • Aktivieren Sie die automatische Fehlertoleranz und das Failover für die DNS-Auflösung • Lastenausgleich für Ihre Anwendungen • Erhöhen Sie die Anwendungsverfügbarkeit und -leistung • Überwachen Sie die Verkehrsmuster Ihrer Anwendungen"
  },
  {
    type: "yesno",
    id: "real-yn-545",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Sie können derselben virtuellen Azure-Maschine mehrere Ressourcensperren hinzufügen", correct: "Ja" },
      { text: "Sie können die Eigenschaften einer Azure-Ressource ändern, die über eine Löschsperre verfügt", correct: "Ja" },
      { text: "Sie können einem Microsoft Entra-Benutzer eine Ressourcensperre hinzufügen", correct: "Nein" },
    ],
    explanation: "Als Administrator können Sie ein Azure-Abonnement, eine Ressourcengruppe oder eine Ressource sperren, um sie vor versehentlichem Löschen und Ändern durch Benutzer zu schützen. Die Sperre überschreibt alle Benutzerberechtigungen. Sie können Sperren festlegen, die entweder Löschungen oder Änderungen verhindern. Im Portal heißen diese Sperren Löschen und Schreibgeschützt . In der Befehlszeile heißen diese Sperren CanNotDelete und ReadOnly . • „CanNotDelete“ bedeutet, dass autorisierte Benutzer eine Ressource lesen und ändern, aber nicht löschen können. • ReadOnly bedeutet, dass autorisierte Benutzer eine Ressource lesen, aber nicht löschen oder aktualisieren können. Das Anwenden dieser Sperre entspricht der Beschränkung aller autorisierten Benutzer auf die Berechtigungen der Leserrolle . Anders als bei der rollenbasierten Zugriffskontrolle (RBAC) verwenden Sie Verwaltungssperren, um eine Einschränkung auf alle Benutzer und Rollen anzuwenden. Wenn Sie eine Sperre auf einen übergeordneten Bereich anwenden, erben alle Ressourcen innerhalb dieses Bereichs dieselbe Sperre. Auch später hinzugefügte Ressourcen erben dieselbe übergeordnete Sperre. Die restriktivste Sperre in der Vererbungskette hat Vorrang. Sie können derselben Ressource mehrere Ressourcensperren (auch mehrere Sperren desselben Typs) hinzufügen. Sie können keine Sperren auf Benutzer und Gruppen anwenden."
  },
  {
    type: "yesno",
    id: "real-yn-544",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Vertikale Skalierung kann einer virtuellen Maschine automatisch zusätzlichen Speicher zuweisen", correct: "Ja" },
      { text: "Skalierung kann verwendet werden, um Kosten basierend auf der Nachfrage eines Dienstes zu verwalten", correct: "Ja" },
      { text: "Horizontale Skalierung kann die Anzahl der Instanzen virtueller Maschinen automatisch erhöhen", correct: "Ja" },
    ],
    explanation: "Horizontale Skalierung (auch Skalierung nach außen genannt) bezieht sich auf das Hinzufügen zusätzlicher Knoten oder Maschinen zu Ihrer Infrastruktur, um neuen Anforderungen gerecht zu werden. Wenn Sie eine Anwendung auf einem Server hosten und feststellen, dass dieser nicht mehr über die Kapazität oder die Möglichkeiten verfügt, den Datenverkehr zu bewältigen, kann das Hinzufügen eines Servers Ihre Lösung sein. Es ist ziemlich ähnlich, als würden Sie Arbeitslast auf mehrere Mitarbeiter verteilen, anstatt auf einen. Der Nachteil hierbei kann jedoch die zusätzliche Komplexität Ihres Betriebs sein. Sie müssen entscheiden, welche Maschine was macht und wie Ihre neuen Maschinen mit Ihren alten Maschinen zusammenarbeiten. Sie können dies als das Gegenteil von vertikaler Skalierung betrachten. Vertikale Skalierung (auch Skalierung nach oben genannt) beschreibt das Hinzufügen zusätzlicher Ressourcen zu einem System, um die Nachfrage zu decken. Wie unterscheidet sich dies von horizontaler Skalierung? Während sich horizontale Skalierung auf das Hinzufügen zusätzlicher Knoten bezieht, beschreibt vertikale Skalierung das Hinzufügen von mehr Leistung zu Ihren aktuellen Maschinen. Vertikale Skalierung würde beispielsweise bedeuten, die CPUs aufzurüsten, wenn Ihr Server mehr Rechenleistung benötigt. Sie können auch den Arbeitsspeicher, den Speicherplatz oder die Netzwerkgeschwindigkeit vertikal skalieren. Vertikale Skalierung kann auch den vollständigen Austausch eines Servers oder die Verlagerung der Arbeitslast eines Servers auf einen aktualisierten Server beschreiben."
  },
  {
    type: "yesno",
    id: "real-yn-543",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Die Cool-Zugriffsebene in Azure Storage ist für mindestens 90 Tage Datenspeicherung optimiert", correct: "Nein" },
      { text: "Die Archive-Zugriffsebene in Azure Storage ist für mindestens 180 Tage Datenspeicherung optimiert", correct: "Ja" },
      { text: "Die Cold-Zugriffsebene in Azure Storage ist für mindestens 90 Tage Datenspeicherung optimiert", correct: "Nein" },
    ],
    explanation: "Um die Kosten für Ihren wachsenden Speicherbedarf im Griff zu behalten, kann es hilfreich sein, Ihre Daten nach Zugriffshäufigkeit und Aufbewahrungsdauer zu organisieren. Azure Storage bietet verschiedene Zugriffsebenen, sodass Sie Ihre Blobdaten je nach Verwendungszweck möglichst kostengünstig speichern können. Zu den Zugriffsebenen von Azure Storage gehören: • Hot Tier – Eine Online-Schicht, die für die Speicherung von Daten optimiert ist, auf die häufig zugegriffen oder die häufig geändert werden. Die Hot Tier verursacht die höchsten Speicherkosten, aber die niedrigsten Zugriffskosten. • Cool Tier – Eine Online-Ebene, die für die Speicherung selten abgerufener oder geänderter Daten optimiert ist. Daten in der Cool Tier sollten mindestens 30 Tage lang gespeichert werden . Die Cool Tier verursacht im Vergleich zur Hot Tier geringere Speicherkosten und höhere Zugriffskosten. • Cold Tier – Eine Online-Schicht, die für die Speicherung von Daten optimiert ist, auf die selten zugegriffen oder die selten geändert werden, die aber dennoch schnell abgerufen werden müssen. Daten in der Cold Tier sollten mindestens 90 Tage lang gespeichert werden . Die Cold Tier verursacht im Vergleich zur Cool Tier geringere Speicherkosten und höhere Zugriffskosten. • Archivebene : Eine Offlineebene, die für die Speicherung selten abgerufener Daten optimiert ist und flexible Latenzanforderungen im Stundenbereich hat. Daten in der Archivebene sollten mindestens 180 Tage lang gespeichert werden ."
  },
  {
    type: "yesno",
    id: "real-yn-538",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure Advisor-Empfehlungen können nach Verwaltungseinheit gefiltert werden", correct: "Nein" },
      { text: "Azure Advisor bietet Empfehlungen zur Verbesserung der Leistung von Ressourcen", correct: "Ja" },
      { text: "Azure Advisor unterstützt Warnungen", correct: "Nein" },
    ],
    explanation: "Advisor ist ein digitaler Cloud-Assistent, der Sie bei der Optimierung Ihrer Azure-Bereitstellungen mithilfe bewährter Methoden unterstützt. Er analysiert Ihre Ressourcenkonfiguration und -nutzungstelemetrie und empfiehlt anschließend Lösungen, mit denen Sie die Kosteneffizienz, Leistung, Zuverlässigkeit und Sicherheit Ihrer Azure-Ressourcen verbessern können. Mit Advisor können Sie: • Erhalten Sie proaktive, umsetzbare und personalisierte Best Practices-Empfehlungen. • Verbessern Sie die Leistung, Sicherheit und Zuverlässigkeit Ihrer Ressourcen, indem Sie Möglichkeiten zur Reduzierung Ihrer Azure-Gesamtausgaben identifizieren. • Erhalten Sie Empfehlungen mit vorgeschlagenen Aktionen inline. Das Advisor-Dashboard zeigt personalisierte Empfehlungen für alle Ihre Abonnements an. Die Empfehlungen sind in fünf Kategorien unterteilt: • Zuverlässigkeit: Um die Kontinuität Ihrer geschäftskritischen Anwendungen sicherzustellen und zu verbessern. • Sicherheit: Zum Erkennen von Bedrohungen und Schwachstellen, die zu Sicherheitsverletzungen führen könnten. • Leistung: Um die Geschwindigkeit Ihrer Anwendungen zu verbessern. • Kosten: Um Ihre gesamten Azure-Ausgaben zu optimieren und zu reduzieren. • Operative Exzellenz: Wir helfen Ihnen dabei, Prozess- und Arbeitsablaufeffizienz, Ressourcenverwaltung und Best Practices für die Bereitstellung zu erreichen. Wenn Azure Advisor eine neue Empfehlung für eine Ihrer Ressourcen erkennt, wird ein Ereignis im Azure-Aktivitätsprotokoll gespeichert. Sie können Warnungen für diese Ereignisse von Azure Advisor aus einrichten, indem Sie eine empfehlungsspezifische Warnungserstellungsfunktion verwenden. Sie können ein Abonnement und optional eine Ressourcengruppe auswählen, um die Ressourcen anzugeben, für die Sie Warnungen erhalten möchten. Sie können Filter anwenden, um Empfehlungen für bestimmte Abonnements und Ressourcentypen anzuzeigen, jedoch nicht für Verwaltungseinheiten. Referenzen: Einführung in Azure Advisor Erstellen Sie Azure Advisor-Benachrichtigungen zu neuen Empfehlungen mithilfe des Azure-Portals"
  },
  {
    type: "yesno",
    id: "real-yn-536",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Im Platform-as-a-Service-Clouddienstmodell (PaaS) liegt die Codeaktualisierung für eine Azure-Web-App in der Verantwortung des Kunden", correct: "Ja" },
      { text: "Das Konfigurieren des Benutzerzugriffs auf ein Platform-as-a-Service-Clouddienstmodell (PaaS) liegt in der Verantwortung des Kunden", correct: "Ja" },
      { text: "Das Erstellen und Konfigurieren eines virtuellen Netzwerks ist Teil des Platform-as-a-Service-Clouddienstmodells (PaaS)", correct: "Nein" },
    ],
    explanation: "In einem lokalen Rechenzentrum besitzen Sie den gesamten Stack. Beim Wechsel in die Cloud gehen einige Verantwortlichkeiten auf Microsoft über. Das folgende Diagramm veranschaulicht die Verantwortungsbereiche zwischen Ihnen und Microsoft je nach Art der Bereitstellung Ihres Stacks. Bei allen Cloudbereitstellungstypen sind Sie Eigentümer Ihrer Daten und Identitäten. Sie sind für den Schutz Ihrer Daten und Identitäten, Ihrer lokalen Ressourcen und der von Ihnen kontrollierten Cloudkomponenten verantwortlich. Die von Ihnen kontrollierten Cloudkomponenten variieren je nach Diensttyp. Unabhängig von der Art des Einsatzes behalten Sie immer die folgenden Verantwortlichkeiten: • Daten • Endpunkte • Konto • Zugriffsverwaltung"
  },
  {
    type: "yesno",
    id: "real-yn-533",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Eine VM, die eine bestimmte Funktion ausführt, z. B. das Ausführen einer Firewall, wird auch als virtuelle Netzwerkanwendung bezeichnet", correct: "Ja" },
      { text: "Eine benutzerdefinierte Route (UDR) kann den Netzwerkverkehr nur zwischen Subnetzen eines einzelnen virtuellen Netzwerks steuern", correct: "Nein" },
      { text: "Netzwerksicherheitsgruppen (NSGs) können mehrere eingehende und ausgehende Sicherheitsregeln enthalten", correct: "Ja" },
    ],
    explanation: "Eine Netzwerksicherheitsgruppe enthält eine oder mehrere Sicherheitsregeln, die eingehenden oder ausgehenden Netzwerkverkehr zu verschiedenen Arten von Azure- Ressourcen zulassen oder verweigern. Für jede Regel können Sie Quelle und Ziel, Port und Protokoll angeben. Azure bietet VM-Images, mit denen Sie die Netzwerk-, Sicherheits- und anderen Funktionen Ihres bevorzugten Anbieters für eine vertraute Erfahrung in Azure integrieren können – und zwar mithilfe der Kenntnisse, die Ihr Team bereits besitzt. Virtuelle Maschinen, auf denen diese Images ausgeführt werden, werden auch als virtuelle Netzwerkgeräte bezeichnet. Sie können in Azure benutzerdefinierte oder benutzerdefinierte (statische) Routen erstellen, um die Standardsystemrouten von Azure zu überschreiben oder um der Routentabelle eines Subnetzes weitere Routen hinzuzufügen. In Azure erstellen Sie eine Routentabelle und ordnen diese dann null oder mehreren virtuellen Netzwerksubnetzen zu. Jedem Subnetz kann null oder eine Routentabelle zugeordnet sein. Referenzen: Netzwerksicherheitsgruppen, Netzwerkgeräte, Routing des virtuellen Netzwerkverkehrs"
  },
  {
    type: "yesno",
    id: "real-yn-532",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Der Total Cost of Ownership (TCO)-Rechner zeigt die Kosten für die Ausführung von Workloads in Azure an", correct: "Ja" },
      { text: "Der Total Cost of Ownership (TCO)-Rechner generiert grafische Berichte", correct: "Ja" },
      { text: "Der Total Cost of Ownership (TCO)-Rechner zeigt die Kosten für die Ausführung von Workloads in einem Rechenzentrum an", correct: "Ja" },
    ],
    explanation: "Mit dem TCO-Rechner (Total Cost of Ownership) von Microsoft Azure können Sie potenzielle Kosteneinsparungen ermitteln, wenn Sie lokale Anwendungsworkloads zu Microsoft Azure migrieren. Sie geben die Details Ihrer vorhandenen Infrastruktur sowie verschiedene Kostenannahmen an, mit denen das Tool arbeiten soll. Anschließend erhalten Sie einen Bericht, der die lokalen Kosten mit den Microsoft Azure-Kosten vergleicht."
  },
  {
    type: "yesno",
    id: "real-yn-530",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Tags können Azure-Ressourcen mithilfe von Azure Resource Manager (ARM)-Vorlagen zugewiesen werden", correct: "Ja" },
      { text: "Tags können verwendet werden, um Namensstandards für Azure-Ressourcen durchzusetzen", correct: "Nein" },
      { text: "Einer Azure-Ressource kann nur ein Tag zugewiesen werden", correct: "Nein" },
    ],
    explanation: "Tags sind Metadatenelemente, die Sie auf Ihre Azure-Ressourcen anwenden. Es handelt sich um Schlüssel-Wert-Paare, mit denen Sie Ressourcen anhand von für Ihre Organisation relevanten Einstellungen identifizieren können. Wenn Sie die Bereitstellungsumgebung für Ihre Ressourcen verfolgen möchten, fügen Sie einen Schlüssel mit dem Namen „Umgebung“ hinzu. Um die in der Produktion bereitgestellten Ressourcen zu identifizieren, weisen Sie ihnen den Wert „Produktion“ zu. Das vollständige Schlüssel- Wert-Paar lautet „Umgebung = Produktion“. Sie können Tags auf Ihre Azure-Ressourcen, Ressourcengruppen und Abonnements anwenden. Jeder Ressource können keine, ein oder mehrere Tags zugewiesen werden. Referenzen: Verwenden Sie Tags, um Ihre Azure-Ressourcen und Verwaltungshierarchie zu organisieren. Wenden Sie Tags mit dem Azure-Portal an."
  },
  {
    type: "yesno",
    id: "real-yn-528",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Das Hinzufügen einer zusätzlichen virtuellen Maschine je nach Bedarf ist ein Beispiel für vertikale Skalierung", correct: "Nein" },
      { text: "Horizontale Skalierung kann automatisch oder manuell erfolgen", correct: "Ja" },
      { text: "Das Hinzufügen von mehr RAM zu einer virtuellen Maschine ist ein Beispiel für horizontale Skalierung", correct: "Nein" },
    ],
    explanation: "Während sich horizontale Skalierung auf das Hinzufügen zusätzlicher Knoten bezieht, beschreibt vertikale Skalierung das Hinzufügen von mehr Leistung zu Ihren aktuellen Maschinen. Wenn Ihr Server beispielsweise mehr Verarbeitungsleistung benötigt, bedeutet vertikale Skalierung ein Upgrade der CPUs. Sie können auch den Arbeitsspeicher, den Speicherplatz oder die Netzwerkgeschwindigkeit vertikal skalieren. Horizontale Skalierung ist eine Erhöhung oder Verringerung der Anzahl von Ressourceninstanzen. Beispielsweise bedeutet Skalierung nach außen bei einem VM- Skalierungssatz das Hinzufügen weiterer virtueller Maschinen. Skalierung nach innen bedeutet das Entfernen virtueller Maschinen. Horizontale Skalierung ist in einer Cloudsituation flexibel, da Sie damit eine große Anzahl von VMs ausführen können, um die Last zu bewältigen. Im Gegensatz dazu bleibt bei der vertikalen Skalierung die Anzahl der Ressourceninstanzen konstant, aber sie erhalten mehr Kapazität in Bezug auf Arbeitsspeicher, CPU- Geschwindigkeit, Festplattenspeicher und Netzwerk. Vertikale Skalierung wird durch die Verfügbarkeit größerer Hardware begrenzt, die schließlich eine Obergrenze erreicht. Die Verfügbarkeit von Hardwaregrößen variiert in Azure je nach Region. Vertikale Skalierung kann während des Skalierungsvorgangs auch einen Neustart der VM erfordern."
  },
  {
    type: "yesno",
    id: "real-yn-520",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Microsoft Entra ID bietet Authentifizierungsdienste für Azure und Microsoft 365", correct: "Ja" },
      { text: "Jedem Benutzerkonto in Microsoft Entra ID kann nur eine Microsoft 365-Lizenz zugewiesen werden", correct: "Nein" },
      { text: "Microsoft Entra ID erfordert Domänencontroller auf virtuellen Azure-Maschinen", correct: "Nein" },
    ],
    explanation: "Die erste Aussage ist Unsinn. Microsoft Entra ID ist eine integrierte Cloud-Identitäts- und Zugriffslösung und führend im Markt für die Verwaltung von Verzeichnissen, die Ermöglichung des Anwendungszugriffs und den Schutz von Identitäten. Microsoft Entra ID bietet Authentifizierungsdienste für Azure und Microsoft 365. Jedem Benutzer in Microsoft Entra ID können mehrere Lizenzen zugewiesen werden. Es ist auch möglich, demselben Benutzer eine Microsoft 365 E3- und eine Microsoft 365 E5-Lizenz zuzuweisen. Referenzen: Was ist die Microsoft Entra ID? Zuweisen oder Aufheben der Zuweisung von Lizenzen für Benutzer im Microsoft 365 Admin Center"
  },
  {
    type: "yesno",
    id: "real-yn-510",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "ExpressRoute verwendet das Internet, um ein lokales Netzwerk mit Azure zu verbinden", correct: "Nein" },
      { text: "Sie können mehrere ExpressRoute-Schaltungen konfigurieren, um ein lokales Rechenzentrum mit Azure zu verbinden", correct: "Ja" },
      { text: "ExpressRoute verwendet Border Gateway Protocol (BGP)", correct: "Nein" },
    ],
    explanation: "Mit ExpressRoute können Sie Ihre lokalen Netzwerke mithilfe eines Konnektivitätsanbieters über eine private Verbindung in die Microsoft-Cloud erweitern. Mit ExpressRoute können Sie Verbindungen zu Microsoft-Clouddiensten wie Microsoft Azure und Microsoft 365 herstellen. Die Konnektivität kann über ein Any-to-Any-Netzwerk (IP VPN), ein Point-to-Point-Ethernet-Netzwerk oder eine virtuelle Querverbindung über einen Konnektivitätsanbieter in einer Colocation-Einrichtung erfolgen. ExpressRoute-Verbindungen laufen nicht über das öffentliche Internet. Dadurch bieten ExpressRoute-Verbindungen mehr Zuverlässigkeit, höhere Geschwindigkeiten, konsistente Latenzen und höhere Sicherheit als herkömmliche Verbindungen über das Internet. Hauptvorteile • Layer-3-Konnektivität zwischen Ihrem lokalen Netzwerk und der Microsoft Cloud über einen Konnektivitätsanbieter. Die Konnektivität kann über ein Any-to- Any-Netzwerk (IPVPN), eine Punkt-zu-Punkt-Ethernet-Verbindung oder eine virtuelle Querverbindung über einen Ethernet-Austausch erfolgen. • Konnektivität zu Microsoft-Clouddiensten in allen Regionen der geopolitischen Region. • Globale Konnektivität zu Microsoft-Diensten in allen Regionen mit dem ExpressRoute-Premium-Add-On. • Dynamisches Routing zwischen Ihrem Netzwerk und Microsoft über BGP. • Integrierte Redundanz an jedem Peering-Standort für höhere Zuverlässigkeit. • SLA für die Verbindungsverfügbarkeit. • QoS-Unterstützung für Skype for Business. Sie können Hochverfügbarkeit erreichen, indem Sie bis zu vier ExpressRoute-Verbindungen am selben Peeringstandort mit Ihrem virtuellen Netzwerk verbinden. Sie können auch bis zu 16 ExpressRoute-Verbindungen an verschiedenen Peeringstandorten mit Ihrem virtuellen Netzwerk verbinden. Referenzen: Was ist Azure ExpressRoute? ExpressRoute-FAQ"
  },
  {
    type: "yesno",
    id: "real-yn-506",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure Advisor kann Kostenempfehlungen für virtuelle Maschinen bereitstellen", correct: "Ja" },
      { text: "Azure Advisor kann Empfehlungen für mehrere Azure-Abonnements bereitstellen", correct: "Ja" },
      { text: "Azure Advisor bietet personalisierte Empfehlungen", correct: "Ja" },
    ],
    explanation: "Advisor ist ein personalisierter Cloudberater, der Sie bei der Optimierung Ihrer Azure-Bereitstellungen mithilfe bewährter Methoden unterstützt. Er analysiert Ihre Ressourcenkonfiguration und Nutzungstelemetrie und empfiehlt anschließend Lösungen, mit denen Sie die Kosteneffizienz, Leistung, Zuverlässigkeit (früher als Hochverfügbarkeit bezeichnet) und Sicherheit Ihrer Azure-Ressourcen verbessern können. Mit Advisor können Sie: • Erhalten Sie proaktive, umsetzbare und personalisierte Best Practices-Empfehlungen. • Verbessern Sie die Leistung, Sicherheit und Zuverlässigkeit Ihrer Ressourcen, indem Sie Möglichkeiten zur Reduzierung Ihrer Azure-Gesamtausgaben identifizieren. • Erhalten Sie Empfehlungen mit vorgeschlagenen Aktionen inline. Sie können über das Azure-Portal auf Advisor zugreifen. Melden Sie sich beim Portal an und suchen Sie im Navigationsmenü nach Advisor oder im Menü „Alle Dienste“ . Das Advisor-Dashboard zeigt personalisierte Empfehlungen für alle Ihre Abonnements an. Sie können Filter anwenden, um Empfehlungen für bestimmte Abonnements und Ressourcentypen anzuzeigen. Die Empfehlungen sind in fünf Kategorien unterteilt: • Zuverlässigkeit (früher Hochverfügbarkeit genannt): Um die Kontinuität Ihrer geschäftskritischen Anwendungen sicherzustellen und zu verbessern. • Sicherheit: Zum Erkennen von Bedrohungen und Schwachstellen, die zu Sicherheitsverletzungen führen könnten. • Leistung: Um die Geschwindigkeit Ihrer Anwendungen zu verbessern. • Kosten: Um Ihre gesamten Azure-Ausgaben zu optimieren und zu reduzieren. • Operative Exzellenz: Wir helfen Ihnen dabei, Prozess- und Arbeitsablaufeffizienz, Ressourcenverwaltung und Best Practices für die Bereitstellung zu erreichen."
  },
  {
    type: "yesno",
    id: "real-yn-504",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure Arc kann Azure Kubernetes Service (AKS)-Cluster im großen Maßstab verwalten", correct: "Ja" },
      { text: "Azure Arc kann eine Datenbanklösung eines Drittanbieters verwalten, die außerhalb von Azure gehostet wird", correct: "Nein" },
      { text: "Azure Arc kann physische Server verwalten, auf denen Linux ausgeführt wird", correct: "Ja" },
    ],
    explanation: "Unternehmen haben heute Schwierigkeiten, zunehmend komplexe Umgebungen zu kontrollieren und zu verwalten, die sich über Rechenzentren, mehrere Clouds und Edge- Umgebungen erstrecken. Jede Umgebung und Cloud verfügt über eigene Verwaltungstools, und neue DevOps- und ITOps-Betriebsmodelle lassen sich nur schwer ressourcenübergreifend implementieren. Azure Arc vereinfacht Governance und Verwaltung durch die Bereitstellung einer konsistenten Multicloud- und lokalen Verwaltungsplattform. Azure Arc bietet eine zentralisierte, einheitliche Möglichkeit für: • Verwalten Sie Ihre gesamte Umgebung gemeinsam, indem Sie Ihre vorhandenen Nicht-Azure- und/oder lokalen Ressourcen in Azure Resource Manager projizieren. • Verwalten Sie virtuelle Maschinen, Kubernetes-Cluster und Datenbanken, als würden sie in Azure ausgeführt. • Nutzen Sie vertraute Azure-Dienste und Verwaltungsfunktionen, unabhängig davon, wo sie sich befinden. • Verwenden Sie weiterhin traditionelle ITOps, während Sie DevOps-Praktiken einführen, um neue Cloud-native Muster in Ihrer Umgebung zu unterstützen. • Konfigurieren Sie benutzerdefinierte Standorte als Abstraktionsebene über Azure Arc-fähigen Kubernetes-Clustern und Clustererweiterungen. Derzeit können Sie mit Azure Arc die folgenden Ressourcentypen verwalten, die außerhalb von Azure gehostet werden: • Server: Verwalten Sie physische Windows- und Linux-Server und virtuelle Maschinen, die außerhalb von Azure gehostet werden. • Kubernetes-Cluster: Verbinden und konfigurieren Sie Kubernetes-Cluster, die überall ausgeführt werden können, mit mehreren unterstützten Distributionen. • Azure-Datendienste: Führen Sie Azure-Datendienste vor Ort, am Edge und in öffentlichen Clouds mit Kubernetes und der Infrastruktur Ihrer Wahl aus. SQL Managed Instance und PostgreSQL (Vorschau) sind derzeit verfügbar. • SQL Server: Erweitern Sie Azure-Dienste auf SQL Server-Instanzen, die außerhalb von Azure gehostet werden. • Virtuelle Maschinen (Vorschau): Bereitstellen, Ändern der Größe, Löschen und Verwalten virtueller Maschinen basierend auf VMware vSphere oder Azure Stack HCI und Aktivieren der VM-Selbstbedienung durch rollenbasierten Zugriff."
  },
  {
    type: "yesno",
    id: "real-yn-502",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure Storage Explorer ist ein in der Cloud gehosteter Migrationsdienst zum Übertragen großer Datenmengen", correct: "Nein" },
      { text: "Azure File Sync synchronisiert Dateien und Ordner zwischen Azure Files und Windows-Dateiservern", correct: "Ja" },
      { text: "AzCopy ist ein Befehlszeilenprogramm zum Kopieren von Blobs oder Dateien in ein oder aus einem Speicherkonto", correct: "Nein" },
    ],
    explanation: "AzCopy ist ein herunterladbares Befehlszeilenprogramm, mit dem Sie Blobs oder Dateien von oder in ein Speicherkonto kopieren können. Azure Storage Explorer ist eine Desktopanwendung mit grafischer Benutzeroberfläche, mit der Sie Ihre Azure-Cloudspeicherressourcen von Ihrem Desktop aus verwalten können . Azure File Sync ermöglicht die Zentralisierung der Dateifreigaben Ihres Unternehmens in Azure Files und bietet gleichzeitig die Flexibilität, Leistung und Kompatibilität eines Windows-Dateiservers. Während manche Benutzer eine vollständige Kopie ihrer Daten lokal speichern möchten, bietet Azure File Sync zusätzlich die Möglichkeit, Windows Server in einen schnellen Cache Ihrer Azure-Dateifreigabe zu verwandeln. Sie können jedes unter Windows Server verfügbare Protokoll verwenden, um lokal auf Ihre Daten zuzugreifen, einschließlich SMB, NFS und FTPS. Sie können weltweit beliebig viele Caches einrichten. Referenzen: Erste Schritte mit AzCopy Azure Storage Explorer. Was ist Azure File Sync?"
  },
  {
    type: "yesno",
    id: "real-yn-496",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Wenn einer Ressourcengruppe eine Azure-Richtlinie zugewiesen wird, werden nicht konforme Ressourcen aus der Gruppe entfernt", correct: "Nein" },
      { text: "Wenn einer Ressourcengruppe eine Azure-Richtlinie zugewiesen wird, können nur konforme Ressourcen in der Gruppe bereitgestellt werden", correct: "Ja" },
      { text: "Sie können einer virtuellen Maschine eine Azure-Richtlinie zuweisen", correct: "Nein" },
    ],
    explanation: "Azure Policy wertet Ressourcen und Aktionen in Azure aus, indem die Eigenschaften dieser Ressourcen mit Geschäftsregeln verglichen werden. Diese im JSON-Format beschriebenen Geschäftsregeln werden als Richtliniendefinitionen bezeichnet. Zur Vereinfachung der Verwaltung können mehrere Geschäftsregeln zu einer Richtlinieninitiative (manchmal auch als „PolicySet“ bezeichnet) zusammengefasst werden. Nachdem Ihre Geschäftsregeln erstellt wurden, wird die Richtliniendefinition oder Initiative einem beliebigen von Azure unterstützten Ressourcenbereich zugewiesen, z. B. Verwaltungsgruppen, Abonnements, Ressourcengruppen oder einzelnen Ressourcen. Die Zuweisung gilt für alle Ressourcen innerhalb des Resource Manager-Bereichs dieser Zuweisung. Unterbereiche können bei Bedarf ausgeschlossen werden. Standardmäßig wirkt sich Azure Policy nur dann auf eine Ressource aus, wenn diese erstellt oder aktualisiert wird."
  },
  {
    type: "yesno",
    id: "real-yn-468",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Premium-Speicherkonten können als Blockblobs-Speicher konfiguriert werden", correct: "Ja" },
      { text: "Premium-Speicherkonten können als StorageV2-Speicher konfiguriert werden", correct: "Nein" },
      { text: "Premium-Speicherkonten können als Azure-Dateifreigaben konfiguriert werden", correct: "Ja" },
    ],
    explanation: "Azure Storage bietet verschiedene Arten von Speicherkonten. Jeder Typ unterstützt unterschiedliche Features und verfügt über ein eigenes Preismodell. In der folgenden Tabelle werden die von Microsoft für die meisten Szenarien empfohlenen Speicherkontotypen beschrieben."
  },
  {
    type: "yesno",
    id: "real-yn-464",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Anwendungssicherheitsgruppen können als Teil der Regeln der Netzwerksicherheitsgruppe (NSG) angegeben werden", correct: "Ja" },
      { text: "Netzwerksicherheitsgruppen (NSGs) enthalten immer eingehende und ausgehende Sicherheitsregeln", correct: "Ja" },
      { text: "Eine Netzwerksicherheitsgruppe (NSG) blockiert standardmäßig den gesamten Netzwerkverkehr", correct: "Nein" },
    ],
    explanation: "Sie können eine Azure-Netzwerksicherheitsgruppe verwenden, um den Netzwerkverkehr zwischen Azure-Ressourcen in einem virtuellen Azure-Netzwerk zu filtern. Eine Netzwerksicherheitsgruppe enthält Sicherheitsregeln, die eingehenden oder ausgehenden Netzwerkverkehr zu verschiedenen Arten von Azure-Ressourcen zulassen oder verweigern. Für jede Regel können Sie Quelle und Ziel, Port und Protokoll angeben. Azure erstellt in jeder Netzwerksicherheitsgruppe Standardregeln, die den Datenverkehr zwischen virtuellen Netzwerken, eingehenden Datenverkehr zum Azure Load Balancer und ausgehenden Datenverkehr ins Internet zulassen. Mit Anwendungssicherheitsgruppen können Sie die Netzwerksicherheit als natürliche Erweiterung der Anwendungsstruktur konfigurieren, virtuelle Computer gruppieren und Netzwerksicherheitsregeln basierend auf diesen Gruppen definieren. Sie können Ihre Sicherheitsrichtlinie in großem Umfang wiederverwenden, ohne explizite IP-Adressen manuell pflegen zu müssen. Referenzen: Netzwerksicherheitsgruppen Anwendungssicherheitsgruppen"
  },
  {
    type: "yesno",
    id: "real-yn-463",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Sie können Cloud-Dienste über die Befehlszeile verwalten", correct: "Ja" },
      { text: "Sie können Cloud-Dienste mithilfe eines Webbrowsers verwalten", correct: "Ja" },
      { text: "Sie können Cloud-Dienste nur von Windows-Geräten aus verwalten", correct: "Nein" },
    ],
    explanation: "Sie können die Azure-Befehlszeilenschnittstelle (Azure CLI), Azure PowerShell oder das Azure-Portal verwenden, um Azure-Clouddienste zu verwalten. Die Azure CLI kann in Windows-, macOS- und Linux-Umgebungen installiert werden. Sie kann auch in einem Docker-Container und in Azure Cloud Shell ausgeführt werden. Das Azure-Portal ist von jedem modernen Webbrowser aus zugänglich."
  },
  {
    type: "yesno",
    id: "real-yn-448",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Microsoft Sentinel kann Vorfälle automatisch beheben", correct: "Ja" },
      { text: "Microsoft Sentinel kann Windows Defender Firewall-Protokolle von virtuellen Azure-Computern erfassen", correct: "Ja" },
      { text: "Microsoft Sentinel speichert erfasste Ereignisse in einem Azure Storage-Konto", correct: "Ja" },
    ],
    explanation: "Microsoft Sentinel ist eine skalierbare, Cloud-native SIEM-Lösung (Security Information and Event Management) sowie SOAR- Lösung (Security Orchestration, Automation and Response). Microsoft Sentinel bietet intelligente Sicherheitsanalysen und Bedrohungsinformationen für das gesamte Unternehmen und stellt eine zentrale Lösung für Angriffserkennung, Bedrohungstransparenz, proaktive Bedrohungssuche und Bedrohungsreaktion bereit. Microsoft Sentinel bietet Ihnen einen umfassenden Überblick über das gesamte Unternehmen und lindert den Stress durch immer raffiniertere Angriffe, eine steigende Anzahl von Warnmeldungen und lange Zeiträume zur Problemlösung. • Sammeln Sie Daten im Cloud-Maßstab über alle Benutzer, Geräte, Anwendungen und Infrastrukturen hinweg, sowohl vor Ort als auch in mehreren Clouds. • Erkennen Sie bisher unentdeckte Bedrohungen und minimieren Sie Fehlalarme mithilfe der Analysefunktionen und beispiellosen Bedrohungsinformationen von Microsoft. • Untersuchen Sie Bedrohungen mit künstlicher Intelligenz und suchen Sie in großem Umfang nach verdächtigen Aktivitäten, indem Sie auf die jahrelange Erfahrung von Microsoft im Bereich Cybersicherheit zurückgreifen. • Reagieren Sie schnell auf Vorfälle mit integrierter Orchestrierung und Automatisierung gängiger Aufgaben."
  },
  {
    type: "yesno",
    id: "real-yn-446",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Sie müssen eine Verwaltungs-App installieren, um Cloud-Dienste zu verwalten", correct: "Nein" },
      { text: "Sie können Cloud-Dienste von jedem modernen Webbrowser aus verwalten", correct: "Ja" },
      { text: "Sie müssen über eine Internetverbindung verfügen, um Cloud-Dienste zu verwalten", correct: "Nein" },
    ],
    explanation: "Vereinfacht ausgedrückt ist Cloud Computing die Bereitstellung von Computerdiensten – einschließlich Servern, Speicher, Datenbanken, Netzwerken, Software, Analysen und Informationen – über das Internet („die Cloud“), um schnellere Innovationen, flexible Ressourcen und Skaleneffekte zu ermöglichen. Sie zahlen in der Regel nur für die Cloud- Dienste, die Sie tatsächlich nutzen. Das hilft Ihnen, Ihre Betriebskosten zu senken, Ihre Infrastruktur effizienter zu betreiben und sie an veränderte Geschäftsanforderungen anzupassen. Cloud Computing bedeutet einen großen Wandel im Vergleich zur traditionellen Denkweise von Unternehmen hinsichtlich IT-Ressourcen. Hier sind sieben häufige Gründe, warum Unternehmen auf Cloud-Computing-Dienste zurückgreifen: • Kosten – Der Umstieg auf die Cloud hilft Unternehmen, ihre IT-Kosten zu optimieren. Denn Cloud Computing eliminiert die Investitionskosten für Hard- und Software sowie die Einrichtung und den Betrieb von Rechenzentren vor Ort – die Server-Racks, die rund um die Uhr verfügbare Stromversorgung und Kühlung sowie die IT-Experten für die Verwaltung der Infrastruktur. Das summiert sich schnell. • Geschwindigkeit – Die meisten Cloud-Computing-Dienste werden im Self-Service und auf Abruf bereitgestellt, sodass selbst große Mengen an Rechenressourcen in wenigen Minuten, in der Regel mit nur wenigen Mausklicks, bereitgestellt werden können. Dies bietet Unternehmen ein hohes Maß an Flexibilität und verringert den Druck bei der Kapazitätsplanung. • Globale Skalierung – Zu den Vorteilen von Cloud-Computing-Diensten gehört die Möglichkeit der elastischen Skalierung. In der Cloud-Sprache bedeutet dies, dass die richtige Menge an IT-Ressourcen – beispielsweise mehr oder weniger Rechenleistung, Speicher oder Bandbreite – genau dann bereitgestellt wird, wenn sie benötigt werden, und zwar vom richtigen geografischen Standort aus. • Produktivität – Rechenzentren vor Ort erfordern in der Regel viel „Racking and Stacking“ – Hardware-Setup, Software-Patches und andere zeitaufwändige IT- Verwaltungsaufgaben. Cloud Computing macht viele dieser Aufgaben überflüssig, sodass IT-Teams Zeit für wichtigere Geschäftsziele haben. • Leistung – Die größten Cloud-Computing-Dienste laufen in einem weltweiten Netzwerk sicherer Rechenzentren, die regelmäßig auf die neueste Generation schneller und effizienter Computerhardware aktualisiert werden. Dies bietet gegenüber einem einzelnen Unternehmensrechenzentrum mehrere Vorteile, darunter eine geringere Netzwerklatenz für Anwendungen und höhere Skaleneffekte. • Zuverlässigkeit – Cloud Computing vereinfacht und reduziert die Kosten für Datensicherung, Notfallwiederherstellung und Geschäftskontinuität, da Daten an mehreren redundanten Standorten im Netzwerk des Cloud-Anbieters gespiegelt werden können. • Sicherheit – Viele Cloud-Anbieter bieten eine breite Palette an Richtlinien, Technologien und Kontrollen an, die Ihre Sicherheitslage insgesamt stärken und dazu beitragen, Ihre Daten, Apps und Infrastruktur vor potenziellen Bedrohungen zu schützen."
  },
  {
    type: "yesno",
    id: "real-yn-442",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Eine virtuelle Azure-Maschine kann in mehreren Ressourcengruppen enthalten sein", correct: "Nein" },
      { text: "Eine Ressourcengruppe kann Ressourcen aus mehreren Azure-Regionen enthalten", correct: "Ja" },
      { text: "Sie können eine Ressourcengruppe innerhalb einer anderen Ressourcengruppe erstellen", correct: "Nein" },
    ],
    explanation: "Eine Ressourcengruppe ist ein Container, der zusammengehörige Ressourcen für eine Azure-Lösung enthält. Die Ressourcengruppe kann alle Ressourcen für die Lösung enthalten oder nur die Ressourcen, die Sie als Gruppe verwalten möchten. Sie entscheiden, wie Sie Ressourcen den Ressourcengruppen zuordnen möchten, je nachdem, was für Ihr Unternehmen am sinnvollsten ist. Fügen Sie Ressourcen mit demselben Lebenszyklus grundsätzlich derselben Ressourcengruppe hinzu, damit Sie sie problemlos als Gruppe bereitstellen, aktualisieren und löschen können. Die Ressourcengruppe speichert Metadaten zu den Ressourcen. Wenn Sie also einen Speicherort für die Ressourcengruppe angeben, geben Sie an, wo diese Metadaten gespeichert werden. Aus Compliancegründen müssen Sie möglicherweise sicherstellen, dass Ihre Daten in einer bestimmten Region gespeichert werden. Beim Definieren Ihrer Ressourcengruppe müssen Sie einige wichtige Faktoren berücksichtigen: • Alle Ressourcen in Ihrer Ressourcengruppe sollten denselben Lebenszyklus haben. Sie werden gemeinsam bereitgestellt, aktualisiert und gelöscht. Wenn eine Ressource, z. B. ein Server, einen anderen Bereitstellungszyklus benötigt, sollte sie sich in einer anderen Ressourcengruppe befinden. • Jede Ressource kann nur in einer Ressourcengruppe vorhanden sein. • Sie können einer Ressourcengruppe jederzeit eine Ressource hinzufügen oder daraus entfernen. • Sie können eine Ressource von einer Ressourcengruppe in eine andere Gruppe verschieben. • Die Ressourcen in einer Ressourcengruppe können sich in anderen Regionen als die Ressourcengruppe selbst befinden. • Wenn Sie eine Ressourcengruppe erstellen, müssen Sie einen Speicherort für diese Ressourcengruppe angeben. Sie fragen sich vielleicht: „Warum benötigt eine Ressourcengruppe einen Standort? Und wenn die Ressourcen andere Standorte als die Ressourcengruppe haben können, warum ist der Standort der Ressourcengruppe dann überhaupt wichtig?“ Die Ressourcengruppe speichert Metadaten zu den Ressourcen. Wenn Sie einen Speicherort für die Ressourcengruppe angeben, geben Sie an, wo diese Metadaten gespeichert werden. Aus Compliancegründen müssen Sie möglicherweise sicherstellen, dass Ihre Daten in einer bestimmten Region gespeichert werden. Um die Statuskonsistenz für die Ressourcengruppe sicherzustellen, werden alle Steuerungsebenenvorgänge über den Standort der Ressourcengruppe geleitet. Bei der Auswahl eines Ressourcengruppenstandorts empfehlen wir Ihnen, einen Standort in der Nähe des Ursprungsorts Ihrer Steuerungsvorgänge auszuwählen. Normalerweise ist dies der Standort, der Ihrem aktuellen Standort am nächsten liegt. Diese Routinganforderung gilt nur für Steuerungsebenenvorgänge der Ressourcengruppe. Sie wirkt sich nicht auf Anforderungen aus, die an Ihre Anwendungen gesendet werden. Wenn die Region einer Ressourcengruppe vorübergehend nicht verfügbar ist, können Sie die Ressourcen in der Ressourcengruppe nicht aktualisieren, da die Metadaten nicht verfügbar sind. Die Ressourcen in anderen Regionen funktionieren weiterhin wie erwartet, können aber nicht aktualisiert werden. Dieser Zustand gilt nicht für globale Ressourcen wie Azure Content Delivery Network, Azure DNS, Azure DNS Private Zones, Azure Traffic Manager und Azure Front Door. • Mithilfe einer Ressourcengruppe können Sie die Zugriffssteuerung für administrative Aktionen festlegen. Zum Verwalten einer Ressourcengruppe können Sie Azure- Richtlinien, Azure-Rollen oder Ressourcensperren zuweisen. • Sie können Tags auf eine Ressourcengruppe anwenden. Die Ressourcen in der Ressourcengruppe erben diese Tags nicht. • Eine Ressource kann eine Verbindung mit Ressourcen in anderen Ressourcengruppen herstellen. Dieses Szenario tritt häufig auf, wenn die beiden Ressourcen zwar miteinander verknüpft sind, aber nicht denselben Lebenszyklus aufweisen. Beispielsweise kann eine Web-App eine Verbindung mit einer Datenbank in einer anderen Ressourcengruppe herstellen. • Wenn Sie eine Ressourcengruppe löschen, werden auch alle Ressourcen in der Ressourcengruppe gelöscht. • Sie können in jeder Ressourcengruppe bis zu 800 Instanzen eines Ressourcentyps bereitstellen. Einige Ressourcentypen sind von der Beschränkung auf 800 Instanzen ausgenommen. Weitere Informationen finden Sie unter Ressourcengruppenbeschränkungen. • Einige Ressourcen können außerhalb einer Ressourcengruppe vorhanden sein. Diese Ressourcen werden im Abonnement, in der Verwaltungsgruppe oder im Mandanten bereitgestellt. In diesen Bereichen werden nur bestimmte Ressourcentypen unterstützt. • Zum Erstellen einer Ressourcengruppe können Sie das Portal, PowerShell, Azure CLI oder eine ARM-Vorlage verwenden. Referenzen: Verwalten von Azure-Ressourcengruppen mithilfe des Azure-Portals. Was ist Azure Resource Manager?"
  },
  {
    type: "yesno",
    id: "real-yn-427",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Sie müssen über eine Internetverbindung verfügen, um Cloud Computing zu nutzen", correct: "Ja" },
      { text: "Die Kosten für die Erhöhung der Cloud Computing-Kapazität sind geringer als die Kosten...", correct: "Ja" },
      { text: "Sie müssen über physische Server verfügen, um Cloud Computing zu nutzen", correct: "Nein" },
    ],
    explanation: "Vereinfacht ausgedrückt ist Cloud Computing die Bereitstellung von Computerdiensten – einschließlich Servern, Speicher, Datenbanken, Netzwerken, Software, Analysen und Informationen – über das Internet („die Cloud“), um schnellere Innovationen, flexible Ressourcen und Skaleneffekte zu ermöglichen. Sie zahlen in der Regel nur für die Cloud- Dienste, die Sie tatsächlich nutzen. Das hilft Ihnen, Ihre Betriebskosten zu senken, Ihre Infrastruktur effizienter zu betreiben und sie an veränderte Geschäftsanforderungen anzupassen. Cloud Computing bedeutet einen großen Wandel im Vergleich zur traditionellen Denkweise von Unternehmen hinsichtlich IT-Ressourcen. Hier sind sieben häufige Gründe, warum Unternehmen auf Cloud-Computing-Dienste zurückgreifen: • Kosten – Der Umstieg auf die Cloud hilft Unternehmen, ihre IT-Kosten zu optimieren. Denn Cloud Computing eliminiert die Investitionskosten für Hard- und Software sowie die Einrichtung und den Betrieb von Rechenzentren vor Ort – die Server-Racks, die rund um die Uhr verfügbare Stromversorgung und Kühlung sowie die IT-Experten für die Verwaltung der Infrastruktur. Das summiert sich schnell. • Geschwindigkeit – Die meisten Cloud-Computing-Dienste werden im Self-Service und auf Abruf bereitgestellt, sodass selbst große Mengen an Rechenressourcen in wenigen Minuten, in der Regel mit nur wenigen Mausklicks, bereitgestellt werden können. Dies bietet Unternehmen ein hohes Maß an Flexibilität und verringert den Druck bei der Kapazitätsplanung. • Globale Skalierung – Zu den Vorteilen von Cloud-Computing-Diensten gehört die Möglichkeit der elastischen Skalierung. In der Cloud-Sprache bedeutet dies, dass die richtige Menge an IT-Ressourcen – beispielsweise mehr oder weniger Rechenleistung, Speicher oder Bandbreite – genau dann bereitgestellt wird, wenn sie benötigt werden, und zwar vom richtigen geografischen Standort aus. • Produktivität – Rechenzentren vor Ort erfordern in der Regel viel „Racking and Stacking“ – Hardware-Setup, Software-Patches und andere zeitaufwändige IT- Verwaltungsaufgaben. Cloud Computing macht viele dieser Aufgaben überflüssig, sodass IT-Teams Zeit für wichtigere Geschäftsziele haben. • Leistung – Die größten Cloud-Computing-Dienste laufen in einem weltweiten Netzwerk sicherer Rechenzentren, die regelmäßig auf die neueste Generation schneller und effizienter Computerhardware aktualisiert werden. Dies bietet gegenüber einem einzelnen Unternehmensrechenzentrum mehrere Vorteile, darunter eine geringere Netzwerklatenz für Anwendungen und höhere Skaleneffekte. • Zuverlässigkeit – Cloud Computing vereinfacht und reduziert die Kosten für Datensicherung, Notfallwiederherstellung und Geschäftskontinuität, da Daten an mehreren redundanten Standorten im Netzwerk des Cloud-Anbieters gespiegelt werden können. • Sicherheit – Viele Cloud-Anbieter bieten eine breite Palette an Richtlinien, Technologien und Kontrollen an, die Ihre Sicherheitslage insgesamt stärken und dazu beitragen, Ihre Daten, Apps und Infrastruktur vor potenziellen Bedrohungen zu schützen."
  },
  {
    type: "yesno",
    id: "real-yn-426",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure SQL Database ist ein Beispiel für Platform as a Service (PaaS)", correct: "Ja" },
      { text: "Azure Cosmos DB ist ein Beispiel für Software as a Service (SaaS)", correct: "Nein" },
      { text: "Microsoft SQL Server 2019, installiert auf einer virtuellen Azure-Maschine, ist ein Beispiel für Platform as a Service (PaaS)", correct: "Nein" },
    ],
    explanation: "Platform as a Service (PaaS) ist eine umfassende Entwicklungs- und Bereitstellungsumgebung in der Cloud mit Ressourcen, die Ihnen die Bereitstellung von Anwendungen aller Art ermöglichen – von einfachen Cloud-basierten Apps bis hin zu komplexen, Cloud-fähigen Unternehmensanwendungen. Sie erwerben die benötigten Ressourcen von einem Cloud-Service-Anbieter auf Pay-as-you-go-Basis und greifen über eine sichere Internetverbindung darauf zu. Wie IaaS umfasst PaaS die Infrastruktur – Server, Speicher und Netzwerke –, aber auch Middleware, Entwicklungstools, Business Intelligence (BI)-Dienste, Datenbankmanagementsysteme und mehr. PaaS unterstützt den gesamten Lebenszyklus von Webanwendungen: Erstellen, Testen, Bereitstellen, Verwalten und Aktualisieren. Mit PaaS sparen Sie sich die Kosten und den Aufwand für den Kauf und die Verwaltung von Softwarelizenzen, der zugrunde liegenden Anwendungsinfrastruktur und Middleware, Container-Orchestratoren wie Kubernetes oder der Entwicklungstools und anderer Ressourcen. Sie verwalten die von Ihnen entwickelten Anwendungen und Dienste, und der Cloud-Service-Anbieter kümmert sich in der Regel um alles Weitere. Durch die Bereitstellung von Infrastructure as a Service bietet PaaS dieselben Vorteile wie IaaS. Die zusätzlichen Funktionen – Middleware, Entwicklungstools und andere Business-Tools – bieten Ihnen jedoch weitere Vorteile. Software as a Service (SaaS) ist ein Softwarelizenzierungs- und Bereitstellungsmodell, bei dem Software an einen Benutzer lizenziert wird. Der Zugriff auf die Software bzw. Anwendung erfolgt über das Internet und einen Webbrowser. Sie müssen die Software nicht lokal installieren und warten. Sie können sofort mit der Konfiguration und Nutzung beginnen. Infrastructure as a Service (IaaS) ist ein Cloud-Computing-Dienst, der wichtige Rechen-, Speicher- und Netzwerkressourcen bedarfsgerecht und nutzungsbasiert bereitstellt. Mit IaaS sparen Sie sich die Kosten und den Aufwand für den Kauf und die Verwaltung physischer Server und Rechenzentrumsinfrastruktur. Jede Ressource wird als separate Servicekomponente angeboten, und Sie zahlen nur für die jeweilige Ressource, solange Sie sie benötigen. Ein Cloud-Computing-Dienstanbieter wie Azure verwaltet die Infrastruktur, während Sie Ihre eigene Software – einschließlich Betriebssysteme, Middleware und Anwendungen – kaufen, installieren, konfigurieren und verwalten. Microsoft SQL Server 2019, installiert auf einer virtuellen Azure-Maschine, ist ein Beispiel für Infrastructure as a Service (IaaS). Azure Cosmos DB ist ein Beispiel für einen Platform as a Service (PaaS)-Cloud-Datenbankanbieter. Referenzen: Was ist PaaS? Was ist IaaS? Was ist SaaS?"
  },
  {
    type: "yesno",
    id: "real-yn-396",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Alle Funktionen von Microsoft Defender für Cloud sind kostenlos", correct: "Nein" },
      { text: "Für Microsoft Defender für Cloud können Sie einen Bericht zur Einhaltung gesetzlicher Vorschriften herunterladen", correct: "Ja" },
      { text: "Microsoft Defender für Cloud kann Azure-Ressourcen und lokale Ressourcen überwachen", correct: "Nein" },
    ],
    explanation: "Microsoft Defender für Cloud ist eine Cloud Security Posture Management- (CSPM) und Cloud Workload Protection-Plattform (CWPP) für alle Ihre Azure-, lokalen und Multicloud-Ressourcen (Amazon AWS und Google GCP). Defender für Cloud erfüllt drei wichtige Anforderungen bei der Verwaltung der Sicherheit Ihrer Ressourcen und Workloads in der Cloud und vor Ort: • Der Defender for Cloud-Sicherheitswert bewertet kontinuierlich Ihre Sicherheitslage, sodass Sie neue Sicherheitschancen verfolgen und präzise Berichte über den Fortschritt Ihrer Sicherheitsbemühungen erstellen können. • Die Empfehlungen von Defender für die Cloud sichern Ihre Workloads mit schrittweisen Aktionen, die Ihre Workloads vor bekannten Sicherheitsrisiken schützen. • Defender for Cloud-Warnungen schützen Ihre Workloads in Echtzeit, sodass Sie sofort reagieren und die Entstehung von Sicherheitsereignissen verhindern können. Das kostenlose Angebot von Microsoft Defender für die Cloud umfasst den Sicherheits-Score und zugehörige Tools. Durch die Aktivierung der erweiterten Sicherheit (kostenpflichtig) werden alle Microsoft Defender-Pläne aktiviert und bieten eine Reihe von Sicherheitsvorteilen für alle Ihre Ressourcen in Azure-, Hybrid- und Multicloud- Umgebungen. Microsoft Defender für die Cloud vergleicht die Konfiguration Ihrer Ressourcen kontinuierlich mit den Anforderungen von Branchenstandards, Vorschriften und Benchmarks. Das Dashboard zur Einhaltung gesetzlicher Vorschriften bietet Einblicke in Ihren Compliance-Status basierend darauf, wie Sie bestimmte Compliance-Anforderungen erfüllen. Über das Dashboard zur Einhaltung gesetzlicher Vorschriften können Sie PDF-/CSV-Berichte herunterladen. Referenzen: Was ist Microsoft Defender für die Cloud? Grundlegende und erweiterte Sicherheitsfunktionen von Microsoft Defender für die Cloud. Passen Sie die Standards in Ihrem Dashboard zur Einhaltung gesetzlicher Vorschriften an."
  },
  {
    type: "yesno",
    id: "real-yn-395",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Microsoft 365 ist ein Beispiel für ein Software-as-a-Service (SaaS)-Cloud-Servicemodell", correct: "Ja" },
      { text: "Eine virtuelle Azure-Maschine ist ein Beispiel für ein Infrastructure-as-a-Service (IaaS)-Cloud-Servicemodell", correct: "Ja" },
      { text: "Azure Functions ist ein Beispiel für ein Platform-as-a-Service (PaaS)-Cloud-Servicemodell", correct: "Ja" },
    ],
    explanation: "Software as a Service (SaaS) ist ein Softwarelizenzierungs- und Bereitstellungsmodell, bei dem Software an einen Benutzer lizenziert wird. Der Zugriff auf die Software bzw. Anwendung erfolgt über das Internet und einen Webbrowser. Sie müssen die Software nicht lokal installieren und warten. Sie können sofort mit der Konfiguration und Nutzung beginnen. Infrastructure as a Service (IaaS) ist ein Cloud-Computing-Dienst, der wichtige Rechen-, Speicher- und Netzwerkressourcen bedarfsgerecht und nutzungsbasiert bereitstellt. Mit IaaS sparen Sie sich die Kosten und den Aufwand für den Kauf und die Verwaltung physischer Server und Rechenzentrumsinfrastruktur. Jede Ressource wird als separate Servicekomponente angeboten, und Sie zahlen nur für die jeweilige Ressource, solange Sie sie benötigen. Ein Cloud-Computing-Dienstanbieter wie Azure verwaltet die Infrastruktur, während Sie Ihre eigene Software – einschließlich Betriebssystemen, Middleware und Anwendungen – kaufen, installieren, konfigurieren und verwalten. Wie IaaS umfasst PaaS Infrastruktur – Server, Speicher und Netzwerk –, aber auch Middleware, Entwicklungstools, Business Intelligence (BI)-Dienste, Datenbankmanagementsysteme und mehr. Azure Backup ist ein Beispiel für eine PaaS-Lösung. Referenzen: Was ist PaaS? Was ist IaaS? Was ist SaaS? Hosting-Modelle verstehen"
  },
  {
    type: "yesno",
    id: "real-yn-394",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Beim Kauf von Azure-Diensten über ein Enterprise Agreement (EA) müssen Sie einen festgelegten Betrag ausgeben", correct: "Ja" },
      { text: "Microsoft definiert die Preisstruktur aller über Azure Marketplace verkauften Dienste von Drittanbietern", correct: "Nein" },
      { text: "Die Kosten für ausgehenden Datenverkehr von Azure sind für alle Azure-Regionen gleich", correct: "Nein" },
    ],
    explanation: "Bandbreite bezieht sich auf den Datenverkehr in und aus Azure-Rechenzentren sowie auf den Datenverkehr zwischen Azure-Rechenzentren; andere Übertragungen werden ausdrücklich durch das Content Delivery Network, die ExpressRoute-Preise oder Peering abgedeckt. Die Kosten für ausgehenden Datenverkehr von Azure variieren je nach Quellkontinent. Beim Erwerb von Azure-Diensten über ein Enterprise Agreement (EA) ist eine Vorauszahlung erforderlich. Unternehmensadministratoren können im Azure Enterprise-Portal eine Zusammenfassung ihrer Nutzungsdaten, der verbrauchten Azure-Vorauszahlung und der mit zusätzlicher Nutzung verbundenen Gebühren anzeigen. Azure Marketplace ist ein Onlineshop mit Tausenden von IT-Softwareanwendungen und -Diensten branchenführender Technologieunternehmen. Im Azure Marketplace können Sie die Software und Dienste finden, testen, kaufen und bereitstellen, die Sie zum Erstellen neuer Lösungen und Verwalten Ihrer Cloud-Infrastruktur benötigen. Der Katalog enthält Lösungen für verschiedene Branchen und technische Bereiche, kostenlose Testversionen sowie Beratungsdienste von Microsoft-Partnern. Der Softwareanbieter legt Preis, Endbenutzer-Lizenzvereinbarung und Datenschutzrichtlinien fest. Referenzen: Bandbreitenpreise, Rechnungen für die Azure Enterprise-Registrierung. Was ist Azure Marketplace?"
  },
  {
    type: "yesno",
    id: "real-yn-392",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Cloud Computing bietet dieselben Konfigurationsoptionen wie On-Premises-Bereitstellungen", correct: "Nein" },
      { text: "Cloud Computing kann skaliert werden, wenn ein Unternehmen Änderungen benötigt", correct: "Ja" },
      { text: "Cloud Computing bietet geringere Investitionskosten (CapEx) als On-Premises-Bereitstellungen", correct: "Nein" },
    ],
    explanation: "Investitionsausgaben (CapEx) sind Mittel, die ein Unternehmen für den Erwerb, die Modernisierung und die Instandhaltung von Sachanlagen wie Immobilien, Anlagen, Gebäuden, Technologie oder Ausrüstung verwendet. Diese Kosten sind beim Cloud Computing geringer als bei lokalen Bereitstellungen. Cloud Computing bietet grundsätzlich die gleichen Konfigurationsmöglichkeiten wie lokale Bereitstellungen. Vergleicht man jedoch ein bestimmtes Produkt wie Exchange Online mit Exchange Server oder Azure SQL mit SQL Server, trifft dies möglicherweise nicht zu. Cloud Computing ermöglicht es, IT-Ressourcen je nach Bedarf zu erhöhen oder zu reduzieren, um der sich ändernden Nachfrage gerecht zu werden. Skalierbarkeit ist eines der Markenzeichen der Cloud und der Hauptgrund für ihre rasant steigende Beliebtheit bei Unternehmen."
  },
  {
    type: "yesno",
    id: "real-yn-391",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Virtuelle Netzwerke, die in derselben Ressourcengruppe erstellt werden, müssen eindeutige Namen haben", correct: "Ja" },
      { text: "Der Adressraum des virtuellen Azure-Netzwerks muss innerhalb eines Abonnements eindeutig sein", correct: "Nein" },
      { text: "In derselben Azure-Region bereitgestellte virtuelle Azure-Netzwerke sind standardmäßig verbunden", correct: "Nein" },
    ],
    explanation: "Azure Virtual Network (VNet) ist der grundlegende Baustein für Ihr privates Netzwerk in Azure. VNet ermöglicht vielen Arten von Azure-Ressourcen, z. B. Azure Virtual Machines (VM), die sichere Kommunikation untereinander, mit dem Internet und mit lokalen Netzwerken. VNet ähnelt einem herkömmlichen Netzwerk, das Sie in Ihrem eigenen Rechenzentrum betreiben, bietet jedoch zusätzliche Vorteile der Azure-Infrastruktur wie Skalierbarkeit, Verfügbarkeit und Isolation. In derselben Azure-Region oder im selben Azure-Abonnement bereitgestellte virtuelle Azure-Netzwerke sind standardmäßig nicht verbunden. Sie müssen virtuelles Netzwerk- Peering konfigurieren, um die Kommunikation zwischen verschiedenen virtuellen Netzwerken zu ermöglichen. In derselben Ressourcengruppe bereitgestellte virtuelle Netzwerke müssen eindeutige Namen haben. Sie können virtuelle Netzwerke mit demselben Namen jedoch in verschiedenen Ressourcengruppen innerhalb desselben Abonnements bereitstellen. Der Adressraum des virtuellen Azure-Netzwerks muss innerhalb eines Abonnements nicht eindeutig sein. Wenn Sie jedoch virtuelles Netzwerk-Peering konfigurieren möchten, müssen die Adressräume des virtuellen Netzwerks eindeutig sein. Referenzen: Was ist Azure Virtual Network? Azure Virtual Network-Konzepte und Best Practices"
  },
  {
    type: "yesno",
    id: "real-yn-383",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Ein Azure Virtual Desktop-Hostpool mit 20 Sitzungshosts unterstützt maximal 20 gleichzeitige Benutzerverbindungen", correct: "Nein" },
      { text: "Azure Virtual Desktop unterstützt Desktop- und App-Virtualisierung", correct: "Ja" },
      { text: "Auf einem Azure Virtual Desktop-Sitzungshost kann nur Windows 10 oder Windows 11 ausgeführt werden", correct: "Nein" },
    ],
    explanation: "Azure Virtual Desktop ist ein Desktop- und App-Virtualisierungsdienst, der in der Cloud ausgeführt wird. Folgendes können Sie tun, wenn Sie Azure Virtual Desktop auf Azure ausführen: • Richten Sie eine Multisession-Bereitstellung von Windows 11 oder Windows 10 ein, die ein vollständiges Windows-Erlebnis mit Skalierbarkeit bietet • Präsentieren Sie Microsoft 365 Apps für Unternehmen und optimieren Sie sie für die Ausführung in virtuellen Mehrbenutzerszenarien. • Versorgen Sie virtuelle Windows 7-Desktops mit kostenlosen erweiterten Sicherheitsupdates • Bringen Sie Ihre vorhandenen Remote Desktop Services (RDS) und Windows Server-Desktops und -Apps auf jeden Computer • Virtualisieren Sie sowohl Desktops als auch Apps • Verwalten Sie Desktops und Apps von verschiedenen Windows- und Windows Server-Betriebssystemen mit einer einheitlichen Verwaltungserfahrung Mit Azure Virtual Desktop können Sie eine skalierbare und flexible Umgebung einrichten: • Erstellen Sie in Ihrem Azure-Abonnement eine vollständige Desktopvirtualisierungsumgebung, ohne Gatewayserver auszuführen. • Veröffentlichen Sie Hostpools nach Bedarf, um Ihren unterschiedlichen Arbeitslasten gerecht zu werden. • Bringen Sie Ihr eigenes Image für Produktionsworkloads mit oder testen Sie es aus der Azure Gallery. • Reduzieren Sie Kosten mit gepoolten Multisession-Ressourcen. Mit der neuen Multisession-Funktion von Windows 11 und Windows 10 Enterprise, die exklusiv für Azure Virtual Desktop und die RDSH-Rolle (Remote Desktop Session Host) unter Windows Server verfügbar ist, können Sie die Anzahl der virtuellen Maschinen und den Betriebssystem-Overhead erheblich reduzieren und Ihren Benutzern dennoch dieselben Ressourcen zur Verfügung stellen. • Gewährleisten Sie individuelles Eigentum durch persönliche (persistente) Desktops. • Verwenden Sie die automatische Skalierung, um die Kapazität je nach Tageszeit, bestimmten Wochentagen oder Bedarfsänderungen automatisch zu erhöhen oder zu verringern und so die Kosten im Griff zu behalten."
  },
  {
    type: "yesno",
    id: "real-yn-381",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Kunden können ihre Investitionsausgaben (CapEx) durch die Nutzung einer öffentlichen Cloud minimieren", correct: "Ja" },
      { text: "Cloud Computing nutzt Virtualisierung, um Dienste für mehrere Kunden gleichzeitig bereitzustellen", correct: "Ja" },
      { text: "Cloud Computing bietet elastische Skalierbarkeit", correct: "Ja" },
    ],
    explanation: "Cloud Computing bedeutet einen großen Wandel im Vergleich zur traditionellen Denkweise von Unternehmen hinsichtlich IT-Ressourcen. Hier sind sieben häufige Gründe, warum Unternehmen auf Cloud Computing-Dienste zurückgreifen: Kosten – Cloud Computing macht die Anschaffung von Hard- und Software sowie die Einrichtung und den Betrieb von Rechenzentren vor Ort überflüssig – die Server-Racks, die rund um die Uhr verfügbare Stromversorgung und Kühlung sowie die IT-Experten für die Verwaltung der Infrastruktur. Das summiert sich schnell. Geschwindigkeit – Die meisten Cloud-Computing-Dienste werden im Self-Service und auf Abruf bereitgestellt, sodass selbst große Mengen an Rechenressourcen in wenigen Minuten, in der Regel mit nur wenigen Mausklicks, bereitgestellt werden können. Dies bietet Unternehmen ein hohes Maß an Flexibilität und verringert den Druck bei der Kapazitätsplanung. Globale Skalierung – Zu den Vorteilen von Cloud-Computing-Diensten gehört die Möglichkeit der elastischen Skalierung. In der Cloud-Sprache bedeutet dies, dass die richtige Menge an IT-Ressourcen – beispielsweise mehr oder weniger Rechenleistung, Speicher oder Bandbreite – genau dann bereitgestellt wird, wenn sie benötigt werden, und zwar vom richtigen geografischen Standort aus. Produktivität – Vor-Ort-Rechenzentren erfordern in der Regel viel „Racking and Stacking“ – Hardware-Setup, Software-Patches und andere zeitaufwändige IT-Management- Aufgaben. Cloud Computing macht viele dieser Aufgaben überflüssig, sodass IT-Teams Zeit für wichtigere Geschäftsziele haben. Leistung – Die größten Cloud-Computing-Dienste laufen in einem weltweiten Netzwerk sicherer Rechenzentren, die regelmäßig auf die neueste Generation schneller und effizienter Computerhardware aktualisiert werden. Dies bietet gegenüber einem einzelnen Unternehmensrechenzentrum mehrere Vorteile, darunter eine geringere Netzwerklatenz für Anwendungen und höhere Skaleneffekte. Zuverlässigkeit – Cloud Computing vereinfacht und reduziert die Kosten für Datensicherung, Notfallwiederherstellung und Geschäftskontinuität, da Daten an mehreren redundanten Standorten im Netzwerk des Cloud-Anbieters gespiegelt werden können. Sicherheit – Viele Cloud-Anbieter bieten eine breite Palette an Richtlinien, Technologien und Kontrollen an, die Ihre Sicherheitslage insgesamt stärken und dazu beitragen, Ihre Daten, Apps und Infrastruktur vor potenziellen Bedrohungen zu schützen."
  },
  {
    type: "yesno",
    id: "real-yn-379",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Die Anzahl der Azure-VMs in einer VM-Skalierungsgruppe kann automatisch erhöht werden", correct: "Ja" },
      { text: "Die Anzahl der Azure-VMs in einer VM-Skalierungsgruppe kann automatisch verringert werden", correct: "Ja" },
      { text: "In einer Azure-VM-Skalierungsgruppe sind die virtuellen Maschinen identisch konfiguriert", correct: "Ja" },
    ],
    explanation: "Mit Azure-VM-Skalierungsgruppen können Sie eine Gruppe von VMs mit Lastenausgleich erstellen und verwalten. Die Anzahl der VM-Instanzen kann je nach Bedarf oder nach einem definierten Zeitplan automatisch erhöht oder verringert werden. Skalierungsgruppen bieten die folgenden Hauptvorteile: • Einfaches Erstellen und Verwalten mehrerer VMs • Bietet hohe Verfügbarkeit und Anwendungsausfallsicherheit durch die Verteilung von VMs auf Verfügbarkeitszonen oder Fehlerdomänen • Ermöglicht die automatische Skalierung Ihrer Anwendung bei sich änderndem Ressourcenbedarf • Arbeiten im großen Maßstab"
  },
  {
    type: "yesno",
    id: "real-yn-378",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Ein DNS-Server, der auf einer virtuellen Azure-Maschine ausgeführt wird, ist ein Beispiel für Platform as a Service (PaaS)", correct: "Nein" },
      { text: "Microsoft Intune ist ein Beispiel für Software as a Service (SaaS)", correct: "Ja" },
      { text: "Azure Files ist ein Beispiel für Infrastructure as a Service (IaaS)", correct: "Nein" },
    ],
    explanation: "Software as a Service (SaaS) ist ein Softwarelizenzierungs- und Bereitstellungsmodell, bei dem Software an einen Benutzer lizenziert wird. Der Zugriff auf die Software bzw. Anwendung erfolgt über das Internet und einen Webbrowser. Sie müssen die Software nicht lokal installieren und warten. Sie können sofort mit der Konfiguration und Nutzung beginnen. Infrastructure as a Service (IaaS) ist ein Cloud-Computing-Dienst, der wichtige Rechen-, Speicher- und Netzwerkressourcen bedarfsgerecht und nutzungsbasiert bereitstellt. Mit IaaS sparen Sie sich die Kosten und den Aufwand für den Kauf und die Verwaltung physischer Server und Rechenzentrumsinfrastruktur. Jede Ressource wird als separate Servicekomponente angeboten, und Sie zahlen nur für die jeweilige Ressource, solange Sie sie benötigen. Ein Cloud-Computing-Dienstanbieter wie Azure verwaltet die Infrastruktur, während Sie Ihre eigene Software – einschließlich Betriebssystemen, Middleware und Anwendungen – kaufen, installieren, konfigurieren und verwalten. Wie IaaS umfasst PaaS Infrastruktur – Server, Speicher und Netzwerk –, aber auch Middleware, Entwicklungstools, Business Intelligence (BI)-Dienste, Datenbankmanagementsysteme und mehr. Azure Backup ist ein Beispiel für eine PaaS-Lösung. Referenzen: Was ist PaaS? Was ist IaaS? Was ist SaaS?"
  },
  {
    type: "yesno",
    id: "real-yn-377",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure Resource Manager (ARM)-Vorlagen können Infrastruktur mithilfe von Code definieren", correct: "Ja" },
      { text: "Jede bereitzustellende Azure-Ressource erfordert eine separate Azure Resource Manager (ARM)-Vorlage", correct: "Nein" },
      { text: "Sie können Azure Resource Manager (ARM)-Vorlagen mithilfe des Azure-Portals bereitstellen", correct: "Nein" },
    ],
    explanation: "Verwenden Sie Azure Resource Manager-Vorlagen (ARM-Vorlagen), um Infrastruktur als Code für Ihre Azure-Lösungen zu implementieren. Die Vorlage ist eine JSON-Datei (JavaScript Object Notation), die die Infrastruktur und Konfiguration für Ihr Projekt definiert. Die Vorlage verwendet eine deklarative Syntax, mit der Sie angeben können, was Sie bereitstellen möchten, ohne die Abfolge der Programmierbefehle zum Erstellen schreiben zu müssen. In der Vorlage geben Sie die bereitzustellenden Ressourcen und die Eigenschaften für diese Ressourcen an."
  },
  {
    type: "yesno",
    id: "real-yn-376",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure Active Directory (Azure AD) bietet Single Sign-On (SSO)", correct: "Ja" },
      { text: "iOS-Geräte können in Azure Active Directory (Azure AD) registriert werden", correct: "Ja" },
      { text: "Azure Active Directory (Azure AD) kann zum Verwalten des Zugriffs auf lokale Anwendungen verwendet werden", correct: "Ja" },
    ],
    explanation: "Der Anwendungsproxy von Azure Active Directory bietet sicheren Remotezugriff auf lokale Webanwendungen. Nach einmaligem Anmelden bei Azure AD können Benutzer über eine externe URL oder ein internes Anwendungsportal sowohl auf Cloud- als auch auf lokale Anwendungen zugreifen. Beispielsweise kann der Anwendungsproxy Remotezugriff und einmaliges Anmelden für Remotedesktop-, SharePoint-, Teams-, Tableau-, Qlik- und Branchenanwendungen (LOB) bereitstellen. Einmaliges Anmelden ist eine Authentifizierungsmethode, mit der sich Benutzer mit einem Satz Anmeldeinformationen bei mehreren unabhängigen Softwaresystemen anmelden können. Durch die Verwendung von SSO muss sich ein Benutzer nicht bei jeder verwendeten Anwendung anmelden. Mit SSO können Benutzer auf alle benötigten Anwendungen zugreifen, ohne sich mit unterschiedlichen Anmeldeinformationen authentifizieren zu müssen. In Azure AD sind bereits viele Anwendungen vorhanden, die Sie mit SSO verwenden können. Das Ziel von in Azure AD registrierten – auch als „Workplace Joined“ bezeichneten – Geräten besteht darin, Ihren Benutzern Unterstützung für BYOD-Szenarien (Bring Your Own Device) oder Mobilgeräte bereitzustellen. In diesen Szenarien kann ein Benutzer mit einem persönlichen Gerät auf die Ressourcen Ihrer Organisation zugreifen. Azure AD unterstützt die Registrierung von Geräten mit den folgenden Betriebssystemen: Windows 10 oder neuer, iOS, Android, macOS, Ubuntu 20.04/22.04. Referenzen: Remotezugriff auf lokale Anwendungen über Azure AD-Anwendungsproxy. Was ist Single Sign-On in Azure Active Directory? Azure AD-registrierte Geräte"
  },
  {
    type: "yesno",
    id: "real-yn-375",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Bei der Authentifizierung wird festgestellt, über welche Zugriffsebene ein authentifizierter Benutzer oder Dienst verfügt", correct: "Nein" },
      { text: "Beim bedingten Zugriff werden während des Anmeldevorgangs von einem Benutzer erfasste Signale verwendet, um zu entscheiden, ob...", correct: "Ja" },
      { text: "Single-Sign-On (SSO) erfordert, dass sich alle Benutzer über die Microsoft Authenticator-App anmelden", correct: "Nein" },
    ],
    explanation: "Single Sign-On ist eine Authentifizierungsmethode, die es Benutzern ermöglicht, sich mit einem Satz Anmeldeinformationen bei mehreren unabhängigen Softwaresystemen anzumelden. Durch die Verwendung von SSO muss sich ein Benutzer nicht bei jeder verwendeten Anwendung erneut anmelden. Mit SSO können Benutzer auf alle benötigten Anwendungen zugreifen, ohne sich mit unterschiedlichen Anmeldeinformationen authentifizieren zu müssen. Für SSO ist die Verwendung der Microsoft Authenticator-App nicht erforderlich. Bei der Autorisierung wird festgelegt, welche Zugriffsebene ein authentifizierter Benutzer oder Dienst hat. Bedingter Zugriff führt Signale zusammen, um Entscheidungen zu treffen und Unternehmensrichtlinien durchzusetzen. Richtlinien für bedingten Zugriff sind im einfachsten Fall Wenn-Dann-Anweisungen: Wenn ein Benutzer auf eine Ressource zugreifen möchte, muss er eine Aktion ausführen. Beispiel: Ein Lohnbuchhalter möchte auf die Lohn- und Gehaltsabrechnungsanwendung zugreifen und muss dafür eine mehrstufige Authentifizierung durchführen. Referenzen: Was ist Single Sign-On in Azure Active Directory? Was ist bedingter Zugriff?"
  },
  {
    type: "yesno",
    id: "real-yn-370",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Die Cool-Zugriffsebene ist für die Dateifreigaben im Premium-Speicher verfügbar", correct: "Nein" },
      { text: "Die Cool-Zugriffsebene kann auf Speicherkontoebene konfiguriert werden", correct: "Ja" },
      { text: "Die Hot-Zugriffsebene ist für Blobdaten verfügbar, die Standardspeicher verwenden", correct: "Nein" },
    ],
    explanation: "Azure Storage-Zugriffsebenen sind nur für Blob Storage verfügbar (nicht für Dateifreigaben). Zu den Azure Storage-Zugriffsebenen gehören: • Hot Tier – Eine Online-Schicht, die für die Speicherung von Daten optimiert ist, auf die häufig zugegriffen oder die häufig geändert werden. Die Hot Tier verursacht die höchsten Speicherkosten, aber die niedrigsten Zugriffskosten. • Cool Tier – Eine Online-Ebene, die für die Speicherung selten abgerufener oder geänderter Daten optimiert ist. Daten in der Cool Tier sollten mindestens 30 Tage lang gespeichert werden. Die Cool Tier verursacht im Vergleich zur Hot Tier geringere Speicherkosten und höhere Zugriffskosten. • Archivebene : Eine Offlineebene, die für die Speicherung selten abgerufener Daten optimiert ist und flexible Latenzanforderungen im Stundenbereich hat. Daten in der Archivebene sollten mindestens 180 Tage lang gespeichert werden. Speicherkonten verfügen über eine Standardeinstellung für die Zugriffsebene, die die Onlineebene angibt, auf der ein neues Blob erstellt wird. Die Standardeinstellung für die Zugriffsebene kann auf „Heiß“ oder „Kalt“ festgelegt werden. Benutzer können die Standardeinstellung für ein einzelnes Blob überschreiben, wenn sie das Blob hochladen oder seine Ebene ändern. Die Archivebene muss auf Blobebene konfiguriert werden."
  },
  {
    type: "yesno",
    id: "real-yn-369",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Die Azure-Befehlszeilenschnittstelle (CLI) ist in Windows 11 standardmäßig installiert", correct: "Nein" },
      { text: "Azure PowerShell kann auf Computern verwendet werden, auf denen Windows, Linux oder macOS ausgeführt wird", correct: "Ja" },
      { text: "Sie müssen Azure Cloud Shell auf Ihrem Computer installieren, bevor Sie es verwenden können", correct: "Nein" },
    ],
    explanation: "Azure Cloud Shell ist eine interaktive, authentifizierte und browserbasierte Shell zur Verwaltung von Azure-Ressourcen. Sie bietet Ihnen die Flexibilität, die Shell-Oberfläche zu wählen, die am besten zu Ihrer Arbeitsweise passt: Bash oder PowerShell. Azure Cloud Shell wird, wie der Name schon sagt, in der Cloud ausgeführt. Die Azure CLI kann in Windows-, macOS- und Linux-Umgebungen installiert werden. Sie kann auch in einem Docker-Container und in Azure Cloud Shell ausgeführt werden. Die Azure CLI ist auf keinem Betriebssystem standardmäßig installiert. Azure PowerShell ist für Windows-, Linux- und macOS-Plattformen verfügbar. Referenzen: Übersicht über Azure Cloud Shell So installieren Sie die Azure CLI Installieren Sie das Azure Az PowerShell-Modul"
  },
  {
    type: "yesno",
    id: "real-yn-367",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Die coole Zugriffsebene bietet die niedrigsten Kosten für die Speicherung von Blobs in Azure Storage", correct: "Nein" },
      { text: "Nachdem Blobs in einen Azure Storage-Container hochgeladen wurden, wird die Zugriffsebene des...", correct: "Ja" },
      { text: "Die Archivzugriffsebene für Azure Storage kann auf Kontoebene festgelegt werden", correct: "Nein" },
    ],
    explanation: "Die in der Cloud gespeicherten Daten wachsen exponentiell. Um die Kosten für Ihren wachsenden Speicherbedarf im Griff zu behalten, kann es hilfreich sein, Ihre Daten nach Zugriffshäufigkeit und Aufbewahrungsdauer zu organisieren. Azure Storage bietet verschiedene Zugriffsebenen, sodass Sie Ihre Blobdaten je nach Verwendungszweck möglichst kostengünstig speichern können. Zu den Zugriffsebenen von Azure Storage gehören: • Hot Tier – Eine Online-Ebene, die für die Speicherung von Daten optimiert ist, auf die häufig zugegriffen oder die häufig geändert werden. Die Hot Tier verursacht die höchsten Speicherkosten, aber die niedrigsten Zugriffskosten. • Cool Tier – Eine Online-Ebene, die für die Speicherung selten abgerufener oder geänderter Daten optimiert ist. Daten in der Cool Tier sollten mindestens 30 Tage lang gespeichert werden. Die Cool Tier hat im Vergleich zur Hot Tier geringere Speicherkosten und höhere Zugriffskosten. • Archivebene : Eine Offlineebene, die für die Speicherung selten abgerufener Daten optimiert ist und flexible Latenzanforderungen im Stundenbereich hat. Daten in der Archivebene sollten mindestens 180 Tage lang gespeichert werden. Die Kapazitätsgrenzen von Azure Storage werden auf Kontoebene und nicht nach Zugriffsebene festgelegt. Sie können die Kapazitätsauslastung in einer Ebene maximieren oder die Kapazität auf zwei oder mehr Ebenen verteilen. Online-Zugriffsebenen Wenn Ihre Daten in einer Online-Zugriffsebene (Hot oder Cool) gespeichert sind, können Benutzer sofort darauf zugreifen. Die Hot-Ebene eignet sich am besten für aktiv genutzte Daten, während die Cool-Ebene ideal für Daten ist, auf die seltener zugegriffen wird, die aber dennoch zum Lesen und Schreiben verfügbar sein müssen. Zu den Beispiel-Nutzungsszenarien für die Hot-Tier-Ebene gehören: • Daten, die aktiv verwendet werden oder bei denen häufig gelesen und geschrieben werden soll. • Daten, die für die Verarbeitung und die anschließende Migration in die Cool-Zugriffsebene bereitgestellt werden. Zu den Nutzungsszenarien für die Zugriffsebene „Cool“ gehören: • Kurzfristige Datensicherung und Notfallwiederherstellung. • Ältere Datensätze, die nicht häufig verwendet werden, aber voraussichtlich sofort verfügbar sein werden. • Große Datensätze, die kostengünstig gespeichert werden müssen, während zusätzliche Daten zur Verarbeitung gesammelt werden. Daten in der Cool-Tier-Stufe weisen eine etwas geringere Verfügbarkeit auf, bieten aber die gleiche hohe Haltbarkeit, Abruflatenz und Durchsatzeigenschaften wie die Hot-Tier- Stufe. Bei Daten in der Cool-Tier-Stufe können eine etwas geringere Verfügbarkeit und höhere Zugriffskosten im Vergleich zur Hot-Tier-Stufe ein akzeptabler Kompromiss für niedrigere Gesamtspeicherkosten sein. Für einen Blob in der Cool-Stufe eines allgemeinen v2-Kontos fällt eine Gebühr für vorzeitiges Löschen an, wenn er vor Ablauf von 30 Tagen gelöscht oder in eine andere Stufe verschoben wird. Diese Gebühr wird anteilig berechnet. Wenn ein Blob beispielsweise in die Cool-Stufe verschoben und nach 21 Tagen gelöscht wird, wird Ihnen eine Gebühr für vorzeitiges Löschen in Höhe von 9 (30 minus 21) Tagen berechnet, die Sie für die Speicherung dieses Blobs in der Cool-Stufe aufgewendet haben. Die Hot- und Cool-Stufen unterstützen alle Redundanzkonfigurationen. Archivzugriffsebene Die Archivebene ist eine Offlineebene zum Speichern selten abgerufener Daten. Die Archivzugriffsebene weist im Vergleich zu den Ebenen „Hot“ und „Cool“ die niedrigsten Speicherkosten, aber höhere Datenabrufkosten und eine höhere Latenz auf. Beispiele für Anwendungsszenarien für die Archivzugriffsebene: • Langzeitsicherung, Sekundärsicherung und Archivierung von Datensätzen • Originaldaten (Rohdaten), die auch nach der Verarbeitung in eine endgültige, nutzbare Form erhalten bleiben müssen • Compliance- und Archivdaten, die lange gespeichert werden müssen und auf die kaum zugegriffen wird"
  },
  {
    type: "yesno",
    id: "real-yn-360",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Benutzer in Azure Active Directory (Azure AD) werden mithilfe von Ressourcengruppen organisiert", correct: "Nein" },
      { text: "Azure Active Directory (Azure AD)-Gruppen unterstützen dynamische Mitgliedschaftsregeln", correct: "Ja" },
      { text: "So verwenden Sie Azure Active Directory (Azure AD)-Anmeldeinformationen, um sich bei einem Computer anzumelden...", correct: "Nein" },
    ],
    explanation: "Um sich mit einem Azure AD-Konto bei Ihrem Computer anmelden zu können, muss Ihr Computer Mitglied der Azure AD-Domäne sein (direkt oder hybrid). Für den Zugriff auf Azure-Ressourcen wie das Azure-Portal ist keine Domänenmitgliedschaft Ihres Computers erforderlich. Azure-Ressourcen werden mithilfe von Ressourcengruppen organisiert. Azure AD-Benutzer hingegen nicht. Azure unterstützt Gruppen mit dynamischen Mitgliedschaftsregeln."
  },
  {
    type: "yesno",
    id: "real-yn-359",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Eine private Cloud muss vom Internet getrennt sein", correct: "Nein" },
      { text: "Teil einer Hybrid Cloud ist die öffentliche Cloud", correct: "Ja" },
      { text: "Ein Unternehmen kann ein internes Netzwerk erweitern, indem es seine eigenen physischen Server zur öffentlichen Cloud hinzufügt", correct: "Nein" },
    ],
    explanation: "Azure Dedicated Host bietet physische Server, auf denen ein oder mehrere virtuelle Azure-Computer gehostet werden. Ihr Server ist Ihrer Organisation und Ihren Workloads gewidmet – die Kapazität wird nicht mit anderen Kunden geteilt. Diese Server gehören nicht den Kunden, sondern Microsoft. Die private Cloud umfasst Computing-Dienste, die entweder über das Internet oder ein privates internes Netzwerk und nur ausgewählten Benutzern statt der breiten Öffentlichkeit angeboten werden. Eine Hybrid Cloud – manchmal auch Cloud-Hybrid genannt – ist eine Computing-Umgebung, die ein lokales Rechenzentrum (auch Private Cloud genannt) mit einer öffentlichen Cloud kombiniert und die gemeinsame Nutzung von Daten und Anwendungen ermöglicht. Referenzen: Azure Dedicated Host Was ist eine private Cloud? Was ist eine Hybrid Cloud?"
  },
  {
    type: "yesno",
    id: "real-yn-356",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Eine Hybrid-Cloud-Lösung ermöglicht es einem Unternehmen zu kontrollieren, ob seine Anwendungen vor Ort oder in der Cloud ausgeführt werden", correct: "Ja" },
      { text: "Unternehmen sind für die Investitionsausgaben verantwortlich, wenn sie eine in einer öffentlichen Cloud gehostete virtuelle Maschine skalieren", correct: "Nein" },
      { text: "Ein Unternehmen hat die vollständige Kontrolle über die Ressourcen und die Sicherheit seiner privaten Cloud", correct: "Nein" },
    ],
    explanation: "Die Private Cloud umfasst Computing-Dienste, die entweder über das Internet oder ein privates internes Netzwerk angeboten werden und nur ausgewählten Nutzern, nicht der breiten Öffentlichkeit, zugänglich sind. Private Cloud Computing, auch als interne oder Unternehmens-Cloud bezeichnet, bietet Unternehmen viele der Vorteile einer Public Cloud – darunter Self-Service, Skalierbarkeit und Flexibilität – mit der zusätzlichen Kontrolle und Anpassungsfähigkeit dedizierter Ressourcen über eine lokal gehostete Computing-Infrastruktur. Darüber hinaus bieten Private Clouds ein höheres Maß an Sicherheit und Datenschutz durch Unternehmens-Firewalls und internes Hosting, um sicherzustellen, dass Vorgänge und vertrauliche Daten nicht für Drittanbieter zugänglich sind. Ein Nachteil ist, dass die IT-Abteilung des Unternehmens für die Kosten und die Verwaltung der Private Cloud verantwortlich ist. Daher verursachen Private Clouds die gleichen Personal-, Verwaltungs- und Wartungskosten wie herkömmliche Rechenzentren. Eine Hybrid Cloud ist eine Computing-Umgebung, die ein lokales Rechenzentrum (auch Private Cloud genannt) mit einer Public Cloud kombiniert und die gemeinsame Nutzung von Daten und Anwendungen ermöglicht. Unternehmen tragen die Betriebskosten, wenn sie eine in einer Public Cloud gehostete virtuelle Maschine skalieren . Unternehmen sind für die Investitionsausgaben verantwortlich , wenn sie eine in einer privaten Cloud gehostete virtuelle Maschine skalieren . Investitionsausgaben (CapEx): Unter CapEx versteht man die anfängliche Ausgabe von Geld für die physische Infrastruktur, die dann im Laufe der Zeit von der Steuer abgezogen wird. CapEx sind Vorlaufkosten, deren Wert mit der Zeit sinkt. Betriebsausgaben (OpEx): Unter OpEx versteht man die Ausgabe von Geld für Dienstleistungen oder Produkte, die sofort in Rechnung gestellt werden und die wir im selben Jahr von der Steuer absetzen können. Es gibt keine Vorlaufkosten, wir zahlen für eine Dienstleistung oder ein Produkt erst, wenn wir es nutzen."
  },
  {
    type: "yesno",
    id: "real-yn-351",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Zahlungen an Cloud-Service-Anbieter gelten als Investitionsausgaben (CapEx)", correct: "Nein" },
      { text: "Die über ein verbrauchsbasiertes Modell bereitgestellten Dienste gelten als Betriebsausgaben (OpEx)", correct: "Ja" },
      { text: "Pay-As-You-Go (PAYG) ist ein verbrauchsbasiertes Modell", correct: "Nein" },
    ],
    explanation: "IT- und Finanzorganisationen müssen sich darauf einigen, wie sie sich flexibel an schnell wechselnde Anforderungen anpassen und gleichzeitig eine schlanke Kostenstruktur für schwierige Marktbedingungen sicherstellen können. Angesichts dieses doppelten Fokus ist es wichtig, nicht nur die technischen Vorteile einer Cloud-Umstellung zu verstehen, sondern auch die damit verbundenen finanziellen und wirtschaftlichen Chancen. Investitionsansätze • Investitionsausgaben (CapEx): Unter CapEx versteht man die anfänglichen Ausgaben für die physische Infrastruktur, die dann im Laufe der Zeit von der Steuer abgezogen werden. CapEx sind Vorabkosten, deren Wert mit der Zeit sinkt. • Betriebsausgaben (OpEx): Unter OpEx versteht man die Ausgaben für Dienstleistungen oder Produkte, die sofort in Rechnung gestellt werden und die wir im selben Jahr von der Steuer absetzen können. Es fallen keine Vorabkosten an, da wir für eine Dienstleistung oder ein Produkt erst zahlen, wenn wir es nutzen. Beim Cloud Computing werden viele der mit einem lokalen Rechenzentrum verbundenen Kosten auf den Dienstanbieter verlagert. Beim Pay-As-You-Go-Modell zahlen Sie für die Dienste, die Sie nutzen. Dabei handelt es sich um OpEx (Operational Expenditure), nicht CapEx (Captial Expenditure). CapEx bedeutet, dass Sie im Voraus für etwas bezahlen, zum Beispiel für den Kauf eines neuen physischen Servers. Beim Pay-As-You-Go-Modell wird sekundengenau abgerechnet, und Sie können den Dienst jederzeit starten oder beenden – Sie zahlen nur für das, was Sie nutzen."
  },
  {
    type: "yesno",
    id: "real-yn-326",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Die Hot-Zugriffsebene wird für Daten empfohlen, auf die häufig zugegriffen und die häufig geändert werden", correct: "Ja" },
      { text: "Die Cool-Zugriffsebene wird für langfristige Sicherungen empfohlen", correct: "Nein" },
      { text: "Die Archivzugriffsebene wird auf Speicherkontoebene festgelegt", correct: "Nein" },
    ],
    explanation: "Die in der Cloud gespeicherten Daten wachsen exponentiell. Um die Kosten für Ihren wachsenden Speicherbedarf im Griff zu behalten, kann es hilfreich sein, Ihre Daten nach Zugriffshäufigkeit und Aufbewahrungsdauer zu organisieren. Azure Storage bietet verschiedene Zugriffsebenen, sodass Sie Ihre Blobdaten je nach Verwendungszweck möglichst kostengünstig speichern können. Zu den Zugriffsebenen von Azure Storage gehören: • Hot Tier – Eine Online-Ebene, die für die Speicherung von Daten optimiert ist, auf die häufig zugegriffen oder die häufig geändert werden. Die Hot Tier verursacht die höchsten Speicherkosten, aber die niedrigsten Zugriffskosten. • Cool Tier – Eine Online-Ebene, die für die Speicherung selten abgerufener oder geänderter Daten optimiert ist. Daten in der Cool Tier sollten mindestens 30 Tage lang gespeichert werden. Die Cool Tier hat im Vergleich zur Hot Tier geringere Speicherkosten und höhere Zugriffskosten. • Archivebene : Eine Offlineebene, die für die Speicherung selten abgerufener Daten optimiert ist und flexible Latenzanforderungen im Stundenbereich hat. Daten in der Archivebene sollten mindestens 180 Tage lang gespeichert werden. Die Kapazitätsgrenzen von Azure Storage werden auf Kontoebene und nicht nach Zugriffsebene festgelegt. Sie können die Kapazitätsauslastung in einer Ebene maximieren oder die Kapazität auf zwei oder mehr Ebenen verteilen. Online-Zugriffsebenen Wenn Ihre Daten in einer Online-Zugriffsebene (Hot oder Cool) gespeichert sind, können Benutzer sofort darauf zugreifen. Die Hot-Ebene eignet sich am besten für aktiv genutzte Daten, während die Cool-Ebene ideal für Daten ist, auf die seltener zugegriffen wird, die aber dennoch zum Lesen und Schreiben verfügbar sein müssen. Zu den Beispiel-Nutzungsszenarien für die Hot-Tier-Ebene gehören: • Daten, die aktiv verwendet werden oder bei denen häufig gelesen und geschrieben werden soll. • Daten, die für die Verarbeitung und die anschließende Migration in die Cool-Zugriffsebene bereitgestellt werden. Zu den Nutzungsszenarien für die Zugriffsebene „Cool“ gehören: • Kurzfristige Datensicherung und Notfallwiederherstellung. • Ältere Datensätze, die nicht häufig verwendet werden, aber voraussichtlich sofort verfügbar sein werden. • Große Datensätze, die kostengünstig gespeichert werden müssen, während zusätzliche Daten zur Verarbeitung gesammelt werden. Daten in der Cool-Tier-Stufe weisen eine etwas geringere Verfügbarkeit auf, bieten aber die gleiche hohe Haltbarkeit, Abruflatenz und Durchsatzeigenschaften wie die Hot-Tier- Stufe. Bei Daten in der Cool-Tier-Stufe können eine etwas geringere Verfügbarkeit und höhere Zugriffskosten im Vergleich zur Hot-Tier-Stufe ein akzeptabler Kompromiss für niedrigere Gesamtspeicherkosten sein. Für einen Blob in der Cool-Stufe eines allgemeinen v2-Kontos fällt eine Gebühr für vorzeitiges Löschen an, wenn er vor Ablauf von 30 Tagen gelöscht oder in eine andere Stufe verschoben wird. Diese Gebühr wird anteilig berechnet. Wenn ein Blob beispielsweise in die Cool-Stufe verschoben und nach 21 Tagen gelöscht wird, wird Ihnen eine Gebühr für vorzeitiges Löschen in Höhe von 9 (30 minus 21) Tagen berechnet, die Sie für die Speicherung dieses Blobs in der Cool-Stufe aufgewendet haben. Die Hot- und Cool-Stufen unterstützen alle Redundanzkonfigurationen. Archivzugriffsebene Die Archivebene ist eine Offlineebene zum Speichern selten abgerufener Daten. Die Archivzugriffsebene weist im Vergleich zu den Ebenen „Hot“ und „Cool“ die niedrigsten Speicherkosten, aber höhere Datenabrufkosten und eine höhere Latenz auf. Beispiele für Anwendungsszenarien für die Archivzugriffsebene: • Langzeitsicherung, Sekundärsicherung und Archivierung von Datensätzen • Originaldaten (Rohdaten), die auch nach der Verarbeitung in eine endgültige, nutzbare Form erhalten bleiben müssen • Compliance- und Archivdaten, die lange gespeichert werden müssen und auf die kaum zugegriffen wird"
  },
  {
    type: "yesno",
    id: "real-yn-324",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Sie können Azure Cost Management verwenden, um die mit Ressourcengruppen verbundenen Kosten anzuzeigen", correct: "Ja" },
      { text: "Sie können Azure Cost Management verwenden, um die Nutzung von VMs während der letzten drei Monate anzuzeigen", correct: "Ja" },
      { text: "Sie können Azure Cost Management verwenden, um die mit Verwaltungsgruppen verbundenen Kosten anzuzeigen", correct: "Ja" },
    ],
    explanation: "Cost Management zeigt mithilfe erweiterter Analysen organisatorische Kosten- und Nutzungsmuster an. Berichte in Cost Management zeigen die nutzungsbasierten Kosten von Azure-Diensten und Marketplace-Angeboten von Drittanbietern. Die Kosten basieren auf ausgehandelten Preisen und berücksichtigen Reservierungs- und Azure- Hybridvorteilsrabatte. Sie können den Berichtsbereich auf Verwaltungsgruppen, Abonnements oder einzelne Ressourcengruppen festlegen und einen bestimmten Datumsbereich auswählen. Anschließend können Sie Filter für einzelne Ressourcen hinzufügen."
  },
  {
    type: "yesno",
    id: "real-yn-314",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Sie können derselben Azure-Ressource mehrere Tags hinzufügen", correct: "Ja" },
      { text: "Eine Azure-Ressource erbt Tags von der Ressourcengruppe, in der die Ressource bereitgestellt wird", correct: "Nein" },
      { text: "Sie können Azure Policy verwenden, um Tags auf Ressourcen anzuwenden", correct: "Ja" },
    ],
    explanation: "Sie wenden Tags auf Ihre Azure-Ressourcen, Ressourcengruppen und Abonnements an, um sie logisch in einer Taxonomie zu organisieren. Jedes Tag besteht aus einem Namen-Wert-Paar. Sie können beispielsweise allen Ressourcen in der Produktion den Namen „Umgebung“ und den Wert „Produktion“ zuweisen. Sie können einer Azure-Ressource keine, ein oder mehrere Tags hinzufügen. Sie können Azure Policy verwenden, um Tagging-Regeln und -Konventionen durchzusetzen. Durch das Erstellen einer Richtlinie vermeiden Sie, dass in Ihrem Abonnement Ressourcen bereitgestellt werden, die nicht über die erwarteten Tags für Ihre Organisation verfügen. Anstatt Tags manuell anzuwenden oder nach nicht konformen Ressourcen zu suchen, erstellen Sie eine Richtlinie, die während der Bereitstellung automatisch die benötigten Tags anwendet. Mit dem neuen Effekt „Ändern“ und einer Korrekturaufgabe können jetzt auch Tags auf vorhandene Ressourcen angewendet werden. Eine Azure-Ressource erbt Berechtigungen, jedoch keine Tags von der Ressourcengruppe, in der die Ressource bereitgestellt wird. Referenzen: Zuweisen von Richtliniendefinitionen für die Tag-Compliance Verwenden von Tags zum Organisieren Ihrer Azure-Ressourcen und Verwaltungshierarchie Tutorial: Verwalten der Tag-Governance mit Azure Policy"
  },
  {
    type: "yesno",
    id: "real-yn-305",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Eine Azure-Reservierung wird verwendet, um Serverkapazität in einem bestimmten Rechenzentrum zu reservieren", correct: "Nein" },
      { text: "Sie können eine Azure SQL-Datenbankinstanz stoppen, um die Kosten zu senken", correct: "Nein" },
      { text: "Die Kosten für Azure-Ressourcen können je nach Region unterschiedlich sein", correct: "Nein" },
    ],
    explanation: "Die Kosten für Ressourcen können in verschiedenen Regionen teilweise erheblich voneinander abweichen. Beispielsweise beträgt der Unterschied zwischen den Regionen „USA, Osten 2“ und „Japan, Osten“ bei bestimmten VM-Größen etwa 58 %. Mit Azure-Reservierungen können Sie Geld sparen, indem Sie sich für Ein- oder Dreijahrespläne für mehrere Produkte entscheiden. Durch die Verpflichtung erhalten Sie einen Rabatt auf die von Ihnen genutzten Ressourcen. Reservierungen können Ihre Ressourcenkosten im Vergleich zu nutzungsbasierten Preisen um bis zu 72 % senken. Reservierungen bieten einen Rechnungsrabatt und wirken sich nicht auf den Laufzeitstatus Ihrer Ressourcen aus. Nachdem Sie eine Reservierung erworben haben, wird der Rabatt automatisch auf die entsprechenden Ressourcen angewendet. Azure SQL-Datenbank ist eine vollständig verwaltete Platform-as-a-Service (PaaS)-Datenbank-Engine, die die meisten Datenbankverwaltungsfunktionen wie Upgrades, Patches, Sicherungen und Überwachung ohne Benutzereingriff übernimmt. Azure SQL-Datenbank bietet keinen Zugriff auf den zugrunde liegenden SQL Server und ermöglicht daher nicht das Starten oder Stoppen einer Datenbank. Referenzen: Durchschnittspreis pro Azure-Region. Was sind Azure-Reservierungen? Was ist eine Azure SQL-Datenbank?"
  },
  {
    type: "yesno",
    id: "real-yn-304",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Bei Infrastructure as a Service (IaaS) müssen Sie die Software installieren, die Sie verwenden möchten", correct: "Ja" },
      { text: "Azure Backup ist ein Beispiel für Platform as a Service (PaaS)", correct: "Ja" },
      { text: "Bei Software as a Service (SaaS) müssen Sie Softwareupdates anwenden", correct: "Nein" },
    ],
    explanation: "Software as a Service (SaaS) ist ein Softwarelizenzierungs- und Bereitstellungsmodell, bei dem Software an einen Benutzer lizenziert wird. Der Zugriff auf die Software bzw. Anwendung erfolgt über das Internet und einen Webbrowser. Sie müssen die Software nicht lokal installieren und warten. Sie können sofort mit der Konfiguration und Nutzung beginnen. Infrastructure as a Service (IaaS) ist ein Cloud-Computing-Dienst, der wichtige Rechen-, Speicher- und Netzwerkressourcen bedarfsgerecht und nutzungsbasiert bereitstellt. Mit IaaS sparen Sie sich die Kosten und den Aufwand für den Kauf und die Verwaltung physischer Server und Rechenzentrumsinfrastruktur. Jede Ressource wird als separate Servicekomponente angeboten, und Sie zahlen nur für die jeweilige Ressource, solange Sie sie benötigen. Ein Cloud-Computing-Dienstanbieter wie Azure verwaltet die Infrastruktur, während Sie Ihre eigene Software – einschließlich Betriebssystemen, Middleware und Anwendungen – kaufen, installieren, konfigurieren und verwalten. Wie IaaS umfasst PaaS Infrastruktur – Server, Speicher und Netzwerk –, aber auch Middleware, Entwicklungstools, Business Intelligence (BI)-Dienste, Datenbankmanagementsysteme und mehr. Azure Backup ist ein Beispiel für eine PaaS-Lösung. Referenzen: Was ist PaaS? Was ist IaaS? Was ist SaaS?"
  },
  {
    type: "yesno",
    id: "real-yn-303",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure DevOps Services umfasst ein Git-Repository, in dem Entwickler Code speichern können", correct: "Ja" },
      { text: "Azure DevOps Services kann zum Erstellen und Hosten von Web-Apps verwendet werden", correct: "Nein" },
      { text: "Azure DevOps Services ermöglicht Entwicklern das Bereitstellen oder Aktualisieren von Anwendungen...", correct: "Ja" },
    ],
    explanation: "Azure DevOps bietet Entwicklerdienste für Supportteams zur Arbeitsplanung, zur Zusammenarbeit bei der Codeentwicklung sowie zum Erstellen und Bereitstellen von Anwendungen. Azure DevOps unterstützt eine Kultur und eine Reihe von Prozessen, die Entwickler, Projektmanager und Mitwirkende zusammenbringen, um die Softwareentwicklung abzuschließen. Dadurch können Unternehmen Produkte schneller erstellen und verbessern als mit herkömmlichen Softwareentwicklungsansätzen. Sie können mit Azure DevOps Services in der Cloud oder vor Ort mit Azure DevOps Server arbeiten. Azure DevOps bietet integrierte Funktionen, auf die Sie über Ihren Webbrowser oder IDE-Client zugreifen können. Sie können je nach Ihren Geschäftsanforderungen einen oder mehrere der folgenden eigenständigen Dienste verwenden: • Azure Repos bietet Git-Repositorys oder Team Foundation Version Control (TFVC) zur Quellcodeverwaltung Ihres Codes. • Azure Pipelines bietet Build- und Releasedienste zur Unterstützung der kontinuierlichen Integration und Bereitstellung Ihrer Anwendungen. • Azure Boards bietet eine Reihe agiler Tools zur Unterstützung der Planung und Nachverfolgung von Arbeit, Codefehlern und Problemen mithilfe von Kanban- und Scrum-Methoden. • Azure Test Plans bietet mehrere Tools zum Testen Ihrer Apps, darunter manuelles/exploratives Testen und kontinuierliches Testen. • Azure Artifacts ermöglicht es Teams, Pakete wie Maven, npm, NuGet und mehr aus öffentlichen und privaten Quellen freizugeben und die Paketfreigabe in Ihre Pipelines zu integrieren. Referenzen: Was ist Azure DevOps? Was ist Azure Pipelines?"
  },
  {
    type: "yesno",
    id: "real-yn-298",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Einem Benutzerkonto können mehrere Azure-Rollen zugewiesen werden", correct: "Ja" },
      { text: "Einer Ressourcengruppe kann die Rolle „Besitzer“ mehreren Benutzern zugewiesen werden", correct: "Ja" },
      { text: "Sie können benutzerdefinierte Azure-Rollen erstellen, um den Zugriff auf Ressourcen zu steuern", correct: "Ja" },
    ],
    explanation: "Die Zugriffsverwaltung für Cloudressourcen ist eine wichtige Funktion für jedes Unternehmen, das die Cloud nutzt. Mit der rollenbasierten Zugriffssteuerung von Azure (Azure RBAC) können Sie verwalten, wer Zugriff auf Azure-Ressourcen hat, welche Aktionen diese Personen ausführen können und auf welche Bereiche sie Zugriff haben. Mit Azure RBAC steuern Sie den Zugriff auf Ressourcen durch die Zuweisung von Azure-Rollen. Dies ist ein wichtiges Konzept, das Sie verstehen müssen – so werden Berechtigungen erzwungen. Eine Rollenzuweisung besteht aus drei Elementen: Sicherheitsprinzipal, Rollendefinition und Umfang. Eine Rollendefinition ist eine Sammlung von Berechtigungen. Sie wird normalerweise einfach als Rolle bezeichnet . Eine Rollendefinition listet die ausführbaren Vorgänge auf, z. B. Lesen, Schreiben und Löschen. Rollen können allgemeiner Natur sein, z. B. Besitzer, oder spezifisch, z. B. Leser virtueller Maschinen. Azure enthält mehrere integrierte Rollen, die Sie verwenden können. Beispielsweise ermöglicht die Rolle „Mitwirkender virtueller Computer“ einem Benutzer das Erstellen und Verwalten virtueller Computer. Wenn die integrierten Rollen die spezifischen Anforderungen Ihrer Organisation nicht erfüllen, können Sie eigene benutzerdefinierte Azure- Rollen erstellen. Eine Ressourcengruppe ist ein Container, der zusammengehörige Ressourcen für eine Azure-Lösung enthält. Die Ressourcengruppe kann alle Ressourcen für die Lösung enthalten oder nur die Ressourcen, die Sie als Gruppe verwalten möchten. Sie entscheiden, wie Sie Ressourcen den Ressourcengruppen zuordnen möchten, je nachdem, was für Ihre Organisation am sinnvollsten ist. Fügen Sie Ressourcen mit demselben Lebenszyklus grundsätzlich derselben Ressourcengruppe hinzu, damit Sie sie problemlos als Gruppe bereitstellen, aktualisieren und löschen können. Sie können der Besitzerrolle einer Ressourcengruppe mehrere Benutzer zuweisen, wie in der folgenden Abbildung gezeigt. Referenzen: Was ist die rollenbasierte Zugriffssteuerung in Azure (Azure RBAC)? Verwalten von Azure Resource Manager-Ressourcengruppen mithilfe des Azure-Portals"
  },
  {
    type: "yesno",
    id: "real-yn-295",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Bei einem verbrauchsbasierten Plan senken Sie die Gesamtkosten, indem Sie nur dann für zusätzliche Kapazität zahlen, wenn diese benötigt wird", correct: "Ja" },
      { text: "Serverloses Computing ist ein Beispiel für einen verbrauchsbasierten Plan", correct: "Ja" },
      { text: "Bei einem verbrauchsbasierten Plan zahlen Sie einen festen Preis für alle Daten, die an oder von in der Cloud gehosteten virtuellen Maschinen gesendet werden", correct: "Nein" },
    ],
    explanation: "Wenn Sie Computeressourcen wie Azure Functions in einem Verbrauchstarif ausführen, werden Ihnen die Computeressourcen nur dann in Rechnung gestellt, wenn Ihre Functions ausgeführt werden. Die Abrechnung basiert auf der Anzahl der Ausführungen, der Ausführungszeit und dem verwendeten Arbeitsspeicher."
  },
  {
    type: "yesno",
    id: "real-yn-290",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Microsoft Cloud Services verfolgen", correct: "Ja" },
      { text: "Mit der Funktion „Meine Bibliothek“ können Sie Dokumente und Ressourcen des Microsoft Service Trust Portal an einem einzigen Ort speichern", correct: "Ja" },
      { text: "Auf das Microsoft Service Trust Portal kann über ein Microsoft Cloud Services-Konto zugegriffen werden", correct: "Ja" },
    ],
    explanation: "Das Microsoft Service Trust Portal bietet eine Vielzahl von Inhalten, Tools und anderen Ressourcen zu den Sicherheits-, Datenschutz- und Compliance-Praktiken von Microsoft. Das Service Trust Portal enthält Details zur Implementierung von Kontrollen und Prozessen durch Microsoft zum Schutz unserer Cloud-Dienste und der darin enthaltenen Kundendaten. Um auf einige Ressourcen im Service Trust Portal zugreifen zu können, müssen Sie sich als authentifizierter Benutzer mit Ihrem Microsoft Cloud Services-Konto (entweder einem Azure Active Directory-Organisationskonto oder einem Microsoft-Konto) anmelden und die Microsoft-Vertraulichkeitsvereinbarung für Compliance- Materialien lesen und akzeptieren. Mit der Funktion „Meine Bibliothek“ können Sie Dokumente speichern (oder anheften ), um schnell auf Ihrer Seite „Meine Bibliothek“ darauf zugreifen zu können. Sie können auch Benachrichtigungen einrichten, sodass Microsoft Ihnen eine E-Mail-Nachricht sendet, wenn Dokumente in Ihrer „Meine Bibliothek“ aktualisiert werden. Microsoft Compliance Manager ist eine Funktion im Microsoft 365 Compliance Center, mit der Sie die Compliance-Anforderungen Ihres Unternehmens einfacher und bequemer verwalten können. Compliance Manager unterstützt Sie auf Ihrem gesamten Weg zur Compliance – von der Bestandsaufnahme Ihrer Datenschutzrisiken über die Verwaltung der Komplexität der Implementierung von Kontrollen, die Einhaltung aktueller Vorschriften und Zertifizierungen bis hin zur Berichterstattung an Prüfer. Compliance Manager vereinfacht die Einhaltung von Vorschriften und reduziert Risiken durch folgende Funktionen: • Vorgefertigte Bewertungen für gängige Branchen- und regionale Standards und Vorschriften oder benutzerdefinierte Bewertungen, um Ihre individuellen Compliance- Anforderungen zu erfüllen. • Workflow-Funktionen helfen Ihnen, Ihre Risikobewertungen effizient mit einem einzigen Tool durchzuführen. • Detaillierte Schritt-für-Schritt-Anleitungen zu vorgeschlagenen Verbesserungsmaßnahmen, die Ihnen dabei helfen, die für Ihr Unternehmen relevantesten Standards und Vorschriften einzuhalten. Für von Microsoft verwaltete Aktionen werden Implementierungsdetails und Überwachungsergebnisse angezeigt. • Ein risikobasierter Compliance-Score, der Ihnen hilft, Ihre Compliance-Haltung zu verstehen, indem er Ihren Fortschritt bei der Durchführung von Verbesserungsmaßnahmen misst. Ihr Compliance Manager-Dashboard zeigt Ihren aktuellen Compliance-Score an, hilft Ihnen zu erkennen, was Aufmerksamkeit erfordert, und führt Sie zu wichtigen Verbesserungsmaßnahmen. Referenzen: Erste Schritte mit dem Microsoft Service Trust Portal. Was ist Compliance Manager?"
  },
  {
    type: "yesno",
    id: "real-yn-282",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure Government wird von Microsoft betrieben", correct: "Ja" },
      { text: "Azure Government ist nur für US-Regierungsbehörden und deren Partner verfügbar", correct: "Ja" },
      { text: "Azure China wird von Microsoft betrieben", correct: "Nein" },
    ],
    explanation: "Microsoft Azure, betrieben von 21Vianet (Azure China), ist eine physisch getrennte Instanz von Cloud-Diensten mit Standort in China. Betrieb und Abwicklung erfolgen unabhängig durch Shanghai Blue Cloud Technology Co., Ltd. („21Vianet“), eine hundertprozentige Tochtergesellschaft der Beijing 21Vianet Broadband Data Center Co., Ltd. Azure Government bietet eine dedizierte Cloud, die es Regierungsbehörden und ihren Partnern ermöglicht, unternehmenskritische Workloads in die Cloud zu verlagern. Azure Government-Dienste verarbeiten Daten, die bestimmten staatlichen Vorschriften und Anforderungen unterliegen, wie z. B. FedRAMP, NIST 800.171 (DIB), ITAR, IRS 1075, DoD L4 und CJIS. Um Ihnen ein Höchstmaß an Sicherheit und Compliance zu bieten, verwendet Azure Government physisch isolierte Rechenzentren und Netzwerke (nur in den USA). Azure Government verwendet dieselben zugrunde liegenden Technologien wie das globale Azure, darunter die Kernkomponenten Infrastructure-as-a-Service (IaaS), Platform-as-a-Service (PaaS) und Software-as-a-Service (SaaS). Referenzen: Was ist Azure China? Was ist Azure Government?"
  },
  {
    type: "yesno",
    id: "real-yn-281",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Sie können einer Ressourcengruppe eine Azure-Blaupause zuweisen", correct: "Nein" },
      { text: "Sie können Azure-Blaupausen verwenden, um einer Ressource Berechtigungen zu erteilen", correct: "Ja" },
      { text: "Sie können einer Azure-Blaupause eine Azure-Ressourcenmanager-Vorlage hinzufügen", correct: "Nein" },
    ],
    explanation: "Blueprints sind eine deklarative Möglichkeit, die Bereitstellung verschiedener Ressourcenvorlagen und anderer Artefakte zu orchestrieren, wie beispielsweise: • Rollenzuweisungen • Richtlinienzuweisungen • Azure Resource Manager-Vorlagen (ARM-Vorlagen) • Ressourcengruppen Der Azure Blueprints-Dienst wird durch die global verteilte Azure Cosmos DB unterstützt. Blueprint-Objekte werden in mehrere Azure-Regionen repliziert. Der Dienst unterstützt Sie bei der Einrichtung Ihrer Umgebung . Diese besteht häufig aus Ressourcengruppen, Richtlinien, Rollenzuweisungen und ARM- Vorlagenbereitstellungen. Ein Blueprint ist ein Paket, das alle diese Artefakttypen zusammenführt und Ihnen die Erstellung und Versionierung dieses Pakets ermöglicht, auch über eine CI/CD-Pipeline (Continuous Integration und Continuous Delivery). Schließlich wird jedes Artefakt in einem einzigen Vorgang einem Abonnement zugewiesen, das geprüft und nachverfolgt werden kann. Fast alles, was Sie für die Bereitstellung in Azure Blueprints einschließen möchten, lässt sich mit einer ARM-Vorlage erreichen. Eine ARM-Vorlage ist jedoch ein Dokument, das in Azure nicht nativ vorhanden ist – jedes Dokument wird entweder lokal oder in der Quellcodeverwaltung gespeichert. Die Vorlage wird für die Bereitstellung einer oder mehrerer Azure-Ressourcen verwendet. Sobald diese Ressourcen bereitgestellt sind, besteht jedoch keine aktive Verbindung oder Beziehung mehr zur Vorlage. Mit Azure Blueprints bleibt die Beziehung zwischen der Blaupausendefinition (was bereitgestellt werden soll ) und der Blaupausenzuweisung (was bereitgestellt wurde ) erhalten. Diese Verbindung unterstützt eine verbesserte Nachverfolgung und Überwachung von Bereitstellungen. Azure Blueprints kann auch mehrere Abonnements gleichzeitig aktualisieren, die derselben Blaupause unterliegen. Sie müssen sich nicht zwischen einer ARM-Vorlage und einer Blaupause entscheiden. Jede Blaupause kann aus null oder mehreren ARM-Vorlagenartefakten bestehen . Diese Unterstützung bedeutet, dass frühere Bemühungen zur Entwicklung und Verwaltung einer Bibliothek von ARM-Vorlagen in Azure Blueprints wiederverwendet werden können. Eine Blaupause besteht aus Artefakten . Azure Blueprints unterstützt derzeit die folgenden Ressourcen als Artefakte:"
  },
  {
    type: "yesno",
    id: "real-yn-279",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Sie können Windows 10-Geräte mit Azure Active Directory (Azure AD) verbinden", correct: "Ja" },
      { text: "Sie können Android mit Azure Active Directory (Azure AD) verbinden", correct: "Nein" },
      { text: "Sie können Gruppenrichtlinien in Azure Active Directory (Azure AD) erstellen", correct: "Nein" },
    ],
    explanation: "Azure Active Directory (Azure AD) ist der cloudbasierte Identitäts- und Zugriffsverwaltungsdienst von Microsoft. Azure Active Directory (Azure AD) unterstützt keine Gruppenrichtlinien. Stattdessen verwenden Sie Intune-Konfigurationsrichtlinien für die Geräteverwaltung. Sie können Windows 10-Geräte bei Azure AD registrieren, verbinden oder hybrid verbinden. Android- und iOS-Geräte können bei Azure AD registriert, aber nicht verbunden werden. Die Registrierung eines Geräts bei Azure AD ermöglicht die Geräteauthentifizierung und entspricht einem Arbeitsplatzbeitritt in einer lokalen Active Directory-Domäne. Referenzen: Was ist Azure Active Directory? Vergleich von Active Directory und Azure Active Directory"
  },
  {
    type: "yesno",
    id: "real-yn-277",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure Monitor kann Warnungen an Azure Active Directory-Sicherheitsgruppen senden", correct: "Nein" },
      { text: "Azure Monitor kann Warnungen basierend auf Daten in einem Azure Log Analytics-Arbeitsbereich auslösen", correct: "Ja" },
      { text: "Azure Monitor kann die Leistung von lokalen Computern überwachen", correct: "Nein" },
    ],
    explanation: "Azure Monitor hilft Ihnen, die Verfügbarkeit und Leistung Ihrer Anwendungen und Dienste zu maximieren. Es bietet eine umfassende Lösung zum Erfassen, Analysieren und Reagieren auf Telemetriedaten aus Ihren Cloud- und lokalen Umgebungen. Anhand dieser Informationen können Sie die Leistung Ihrer Anwendungen nachvollziehen und Probleme, die diese und die von ihnen abhängigen Ressourcen betreffen, proaktiv erkennen. Hier sind nur einige Beispiele für die Möglichkeiten von Azure Monitor: • Erkennen und diagnostizieren Sie Probleme über Anwendungen und Abhängigkeiten hinweg mit Application Insights. • Korrelieren Sie Infrastrukturprobleme mit VM-Erkenntnissen und Container-Erkenntnissen. • Untersuchen Sie Ihre Überwachungsdaten mit Log Analytics zur Fehlerbehebung und für eine umfassende Diagnose. • Unterstützen Sie Vorgänge im großen Maßstab mit intelligenten Warnmeldungen und automatisierten Aktionen. • Erstellen Sie Visualisierungen mit Azure-Dashboards und -Arbeitsmappen. • Sammeln Sie Daten von überwachten Ressourcen mithilfe von Azure Monitor-Metriken. Sie können Azure Active Directory (Azure AD)-Aktivitätsprotokolle an verschiedene Endpunkte weiterleiten, darunter Azure Monitor/Azure Log Analytics, um Daten langfristig aufzubewahren und Einblicke in die Daten zu gewinnen. Außerdem können Sie Warnungen basierend auf Daten in einem Azure Log Analytics- Arbeitsbereich auslösen. Azure Monitor kann Warnungen an in Aktionsgruppen angegebene E-Mail-Adressen senden, jedoch nicht direkt an Azure Active Directory (Azure AD)- Sicherheitsgruppen. Referenzen: Azure Monitor-Übersicht, Azure AD-Aktivitätsprotokolle in Azure Monitor"
  },
  {
    type: "yesno",
    id: "real-yn-270",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Von Azure Monitor aus können Sie Ressourcen über mehrere Azure-Abonnements hinweg überwachen", correct: "Ja" },
      { text: "Von Azure Monitor aus können Sie Warnungen erstellen", correct: "Ja" },
      { text: "Sie können die Aktivitätsprotokolle von Azure Active Directory (Azure AD) so konfigurieren, dass sie in Azure Monitor angezeigt werden", correct: "Ja" },
    ],
    explanation: "Azure Monitor hilft Ihnen, die Verfügbarkeit und Leistung Ihrer Anwendungen und Dienste zu maximieren. Es bietet eine umfassende Lösung zum Erfassen, Analysieren und Reagieren auf Telemetriedaten aus Ihren Cloud- und lokalen Umgebungen. Anhand dieser Informationen können Sie die Leistung Ihrer Anwendungen nachvollziehen und Probleme, die diese und die von ihnen abhängigen Ressourcen betreffen, proaktiv erkennen. Hier sind nur einige Beispiele für die Möglichkeiten von Azure Monitor: • Erkennen und diagnostizieren Sie Probleme über Anwendungen und Abhängigkeiten hinweg mit Application Insights. • Korrelieren Sie Infrastrukturprobleme mit VM-Erkenntnissen und Container-Erkenntnissen. • Untersuchen Sie Ihre Überwachungsdaten mit Log Analytics zur Fehlerbehebung und für eine umfassende Diagnose. • Unterstützen Sie Vorgänge im großen Maßstab mit intelligenten Warnmeldungen und automatisierten Aktionen. • Erstellen Sie Visualisierungen mit Azure-Dashboards und -Arbeitsmappen. • Sammeln Sie Daten von überwachten Ressourcen mithilfe von Azure Monitor-Metriken. Sie können Azure Active Directory (Azure AD)-Aktivitätsprotokolle an verschiedene Endpunkte weiterleiten, darunter Azure Monitor/Azure Log Analytics, um Daten langfristig aufzubewahren und Einblicke in sie zu gewinnen. Referenzen: Azure Monitor-Übersicht, Azure AD-Aktivitätsprotokolle in Azure Monitor"
  },
  {
    type: "yesno",
    id: "real-yn-267",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Sie können Verfügbarkeitszonen in Azure verwenden, um virtuelle Azure-Computer vor einem Regionsausfall zu schützen", correct: "Nein" },
      { text: "Sie können Verfügbarkeitszonen in Azure verwenden, um verwaltete Azure-Datenträger vor einem Rechenzentrumsausfall zu schützen", correct: "Ja" },
      { text: "Sie können Verfügbarkeitszonen in Azure verwenden, um virtuelle Azure-Computer vor einem Rechenzentrumsausfall zu schützen", correct: "Nein" },
    ],
    explanation: "Eine Availability Zone ist ein Hochverfügbarkeitsangebot, das Ihre Anwendungen und Daten vor Rechenzentrumsausfällen schützt. Availability Zones sind eindeutige physische Standorte innerhalb einer Azure-Region. Jede Zone besteht aus einem oder mehreren Rechenzentren mit unabhängiger Stromversorgung, Kühlung und Netzwerk. Um Ausfallsicherheit zu gewährleisten, gibt es in allen aktivierten Regionen mindestens drei separate Zonen. Die physische Trennung der Availability Zones innerhalb einer Region schützt Anwendungen und Daten vor Rechenzentrumsausfällen. Zonenredundante Dienste replizieren Ihre Anwendungen und Daten über Availability Zones hinweg, um sie vor einzelnen Ausfallpunkten zu schützen. Mit Availability Zones bietet Azure das branchenweit beste SLA mit 99,99 % VM-Betriebszeit. Das vollständige Azure-SLA erklärt die garantierte Verfügbarkeit von Azure als Ganzes. Eine Verfügbarkeitszone in einer Azure-Region ist eine Kombination aus einer Fehlerdomäne und einer Updatedomäne. Wenn Sie beispielsweise drei oder mehr VMs in drei Zonen einer Azure-Region erstellen, werden Ihre VMs effektiv auf drei Fehlerdomänen und drei Updatedomänen verteilt. Die Azure-Plattform erkennt diese Verteilung auf Updatedomänen, um sicherzustellen, dass VMs in verschiedenen Zonen nicht gleichzeitig aktualisiert werden. Integrieren Sie Hochverfügbarkeit in Ihre Anwendungsarchitektur, indem Sie Ihre Rechen-, Speicher-, Netzwerk- und Datenressourcen innerhalb einer Zone zusammenlegen und in anderen Zonen replizieren. Azure-Dienste, die Verfügbarkeitszonen unterstützen, lassen sich in zwei Kategorien einteilen: • Zonale Dienste – bei denen eine Ressource an eine bestimmte Zone gebunden ist (z. B. virtuelle Maschinen, verwaltete Datenträger, Standard-IP-Adressen) oder • Zonenredundante Dienste – wenn die Azure-Plattform automatisch über Zonen hinweg repliziert wird (z. B. zonenredundanter Speicher, SQL-Datenbank). Um umfassende Geschäftskontinuität in Azure zu erreichen, erstellen Sie Ihre Anwendungsarchitektur mithilfe einer Kombination aus Verfügbarkeitszonen und Azure- Regionspaaren. Sie können Ihre Anwendungen und Daten mithilfe von Verfügbarkeitszonen innerhalb einer Azure-Region synchron replizieren, um Hochverfügbarkeit zu gewährleisten, und für den Notfallschutz eine asynchrone Replikation zwischen Azure-Regionen durchführen. Referenzen: Regionen und Verfügbarkeitszonen in Azure. Einführung in Azure Managed Disks."
  },
  {
    type: "yesno",
    id: "real-yn-265",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Die monatlichen Gehälter für technisches Personal sind ein Beispiel für Betriebsausgaben (OpEx)", correct: "Ja" },
      { text: "Das Leasing von Software ist ein Beispiel für Betriebsausgaben (OpEx)", correct: "Ja" },
      { text: "Der Aufbau einer Rechenzentrumsinfrastruktur ist ein Beispiel für Betriebsausgaben (OpEx)", correct: "Nein" },
    ],
    explanation: "IT- und Finanzorganisationen müssen sich darauf einigen, wie sie sich flexibel an schnell wechselnde Anforderungen anpassen und gleichzeitig eine schlanke Kostenstruktur für schwierige Marktbedingungen sicherstellen können. Angesichts dieses doppelten Fokus ist es wichtig, nicht nur die technischen Vorteile einer Cloud-Umstellung zu verstehen, sondern auch die damit verbundenen finanziellen und wirtschaftlichen Chancen. Investitionsansätze • Investitionsausgaben (CapEx): Unter CapEx versteht man die anfänglichen Ausgaben für die physische Infrastruktur, die dann im Laufe der Zeit von der Steuer abgezogen werden. CapEx sind Vorabkosten, deren Wert mit der Zeit sinkt. • Betriebsausgaben (OpEx): OpEx bezieht sich auf die Ausgaben für Dienstleistungen oder Produkte, die sofort in Rechnung gestellt werden und die wir im selben Jahr von der Steuer absetzen können. Es fallen keine Vorabkosten an, da wir für eine Dienstleistung oder ein Produkt erst zahlen, wenn wir es nutzen. Auch die monatlichen Gehälter der IT-Techniker zählen zu den Betriebskosten."
  },
  {
    type: "yesno",
    id: "real-yn-264",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Um eine Hybrid Cloud aufzubauen, müssen Sie Ressourcen in der öffentlichen Cloud bereitstellen", correct: "Ja" },
      { text: "Eine private Cloud muss vom Internet getrennt sein", correct: "Nein" },
      { text: "Ein Unternehmen kann eine private Cloud erweitern, indem es der öffentlichen Cloud seine eigenen physischen Server hinzufügt", correct: "Nein" },
    ],
    explanation: "Eine Hybrid Cloud ist eine Computing-Umgebung, die eine öffentliche und eine private Cloud kombiniert und den gemeinsamen Zugriff auf Daten und Anwendungen ermöglicht. Bei schwankendem Rechen- und Verarbeitungsbedarf ermöglicht Hybrid Cloud Computing Unternehmen die nahtlose Skalierung ihrer lokalen Infrastruktur in die öffentliche Cloud, um Überlastungen zu bewältigen – ohne externen Rechenzentren Zugriff auf ihre gesamten Daten zu gewähren. Unternehmen profitieren von der Flexibilität und Rechenleistung der öffentlichen Cloud für grundlegende und nicht sensible Computing-Aufgaben, während geschäftskritische Anwendungen und Daten vor Ort, sicher hinter einer Unternehmens-Firewall, verbleiben. Die öffentliche Cloud umfasst Computing-Dienste von Drittanbietern über das öffentliche Internet, die jedem zur Verfügung stehen, der sie nutzen oder erwerben möchte. Sie können kostenlos oder auf Abruf angeboten werden, sodass Kunden nur pro Nutzung für die von ihnen genutzten CPU-Zyklen, den Speicherplatz oder die Bandbreite zahlen. Die private Cloud umfasst Computing-Dienste, die entweder über das Internet oder ein privates internes Netzwerk angeboten werden und nur ausgewählten Nutzern und nicht der breiten Öffentlichkeit zugänglich sind. Private Cloud Computing, auch als interne oder Unternehmens-Cloud bezeichnet, bietet Unternehmen viele Vorteile einer öffentlichen Cloud – darunter Self-Service, Skalierbarkeit und Flexibilität – mit zusätzlicher Kontrolle und Anpassungsmöglichkeiten durch dedizierte Ressourcen über eine lokal gehostete Computing-Infrastruktur. Darüber hinaus bieten Private Clouds ein höheres Maß an Sicherheit und Datenschutz durch Unternehmens-Firewalls und internes Hosting, um sicherzustellen, dass Vorgänge und vertrauliche Daten nicht für Drittanbieter zugänglich sind. Ein Nachteil ist, dass die IT-Abteilung des Unternehmens für die Kosten und die Verwaltung der Private Cloud verantwortlich ist. Daher verursachen Private Clouds die gleichen Personal-, Verwaltungs- und Wartungskosten wie herkömmliche Rechenzentren."
  },
  {
    type: "yesno",
    id: "real-yn-263",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure Reserved VM-Instanzen sind ein Beispiel für OpEx", correct: "Nein" },
      { text: "Die Bereitstellung Ihres eigenen Rechenzentrums ist ein Beispiel für CapEx", correct: "Ja" },
      { text: "Azure Pay-As-You-Go-Preise sind ein Beispiel für CapEx", correct: "Nein" },
    ],
    explanation: "IT- und Finanzorganisationen müssen sich darauf einigen, wie sie sich flexibel an schnell wechselnde Anforderungen anpassen und gleichzeitig eine schlanke Kostenstruktur für schwierige Marktbedingungen sicherstellen können. Angesichts dieses doppelten Fokus ist es wichtig, nicht nur die technischen Vorteile einer Cloud-Umstellung zu verstehen, sondern auch die damit verbundenen finanziellen und wirtschaftlichen Chancen. Investitionsansätze • Investitionsausgaben (CapEx): Unter CapEx versteht man die anfänglichen Ausgaben für die physische Infrastruktur, die dann im Laufe der Zeit von der Steuer abgezogen werden. CapEx sind Vorabkosten, deren Wert mit der Zeit sinkt. • Betriebsausgaben (OpEx): Unter OpEx versteht man die Ausgaben für Dienstleistungen oder Produkte, die sofort in Rechnung gestellt werden und die wir im selben Jahr von der Steuer absetzen können. Es fallen keine Vorabkosten an, da wir für eine Dienstleistung oder ein Produkt erst zahlen, wenn wir es nutzen. Beim Cloud Computing werden viele der mit einem lokalen Rechenzentrum verbundenen Kosten auf den Dienstanbieter verlagert. Beim Pay-As-You-Go-Preismodell zahlen Sie für Dienste, sobald Sie diese nutzen. Dies sind OpEx (Betriebsausgaben), nicht CapEx (Kapitalausgaben). CapEx bedeutet, dass Sie etwas im Voraus bezahlen. Zum Beispiel den Kauf eines neuen physischen Servers. Bei einer reservierten Instanz zahlen Sie im Voraus für die Nutzung einer virtuellen Maschine für einen bestimmten Zeitraum (1 oder 3 Jahre). Sie können Geld sparen, da Sie einen Rabatt auf die Kosten einer VM erhalten, wenn Sie für eine reservierte Instanz im Voraus bezahlen. Da es sich jedoch um eine Vorauszahlung handelt, wird dies als CapEx und nicht als OpEx eingestuft. Die Bereitstellung eines eigenen Rechenzentrums ist ein typisches Beispiel für CapEx. Sie müssen die gesamte Infrastruktur im Voraus kaufen, bevor Sie sie nutzen können."
  },
  {
    type: "yesno",
    id: "real-yn-262",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Eine Platform-as-a-Service-Lösung (PaaS) bietet Apps zusätzlichen Speicher durch Änderung der Preisstufen", correct: "Ja" },
      { text: "Eine Platform-as-a-Service-Lösung (PaaS) kann die Anzahl der Instanzen automatisch skalieren", correct: "Ja" },
      { text: "Eine Platform-as-a-Service-Lösung (PaaS) bietet die vollständige Kontrolle über Betriebssysteme, die Anwendungen hosten", correct: "Nein" },
    ],
    explanation: "Stellen Sie sich Azure App Services als PaaS-Lösung vor. Sie haben keinen Zugriff auf das zugrunde liegende Betriebssystem einer Web-App. Sie können Rechen- und Speicherressourcen skalieren, indem Sie die Preisstufen ändern und metrikenbasierte Skalierungsregeln anwenden."
  },
  {
    type: "yesno",
    id: "real-yn-221",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Kopieren von 10 GB Daten von einem lokalen Netzwerk über ein VPN nach Azure ...", correct: "Nein" },
      { text: "Kopieren von 10 GB Daten von Azure in ein lokales Netzwerk über ein VPN...", correct: "Ja" },
      { text: "Das Hinzufügen von Ressourcengruppen in einem Azure-Abonnement verursacht zusätzliche Kosten", correct: "Ja" },
    ],
    explanation: "Azure-Ressourcengruppen sind kostenlos. Das Einrichten eines virtuellen Netzwerks ist kostenlos. Microsoft berechnet jedoch Gebühren für das VPN-Gateway, das eine Verbindung zu lokalen und anderen virtuellen Netzwerken in Azure herstellt. Diese Gebühr basiert auf der Zeit, in der das Gateway bereitgestellt und verfügbar ist. Datenübertragungen über die VPN-Verbindungen zu Ihren lokalen Standorten oder dem Internet im Allgemeinen werden separat zum regulären Datenübertragungstarif berechnet. Eingehende Datenübertragungen sind kostenlos. Ausgehende Datenübertragungen werden berechnet. Referenzen: VPN Gateway-Preise Bandbreitenpreisdetails"
  },
  {
    type: "yesno",
    id: "real-yn-219",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Das Service Level Agreement (SLA) für Azure Active Directory Premium P2 ist dasselbe...", correct: "Nein" },
      { text: "Alle zahlenden Kunden erhalten eine Gutschrift, wenn ihr monatlicher Verfügbarkeitsprozentsatz unter... liegt", correct: "Ja" },
      { text: "Azure Active Directory Premium P2 garantiert mindestens 99,9 Prozent Verfügbarkeit", correct: "Nein" },
    ],
    explanation: "Wir garantieren eine Verfügbarkeit von mindestens 99,9 % für die Azure Active Directory Basic- und Premium-Dienste. Die Dienste gelten in den folgenden Szenarien als verfügbar: • Benutzer können sich beim Dienst anmelden, sich beim Zugriffsbereich anmelden, auf Anwendungen im Zugriffsbereich zugreifen und Kennwörter zurücksetzen. • IT-Administratoren können Einträge im Verzeichnis erstellen, lesen, schreiben und löschen oder Benutzern Anwendungen im Verzeichnis bereitstellen oder die Bereitstellung aufheben. Für die kostenlose Stufe von Azure Active Directory wird kein SLA bereitgestellt. So und wann können Sie bei Microsoft eine Gutschrift für ein Service-Level-Agreement (SLA) anfordern Sie können bei Microsoft Gutschriften für Service-Level-Agreements (SLA) anfordern, wenn ein Dienst, den Sie Ihren Kunden bereitstellen, ausfällt. SLA-Gutschriften von Microsoft richten sich nach den betroffenen Diensten. Wenn Ihr Kunde beispielsweise über eine Office 365-Suite verfügt, aber nur SharePoint ausgefallen ist, wird die SLA-Gutschrift nur für SharePoint und nicht für den gesamten Plan des Kunden gewährt. Der Cloud Solution Provider (CSP)-Partner muss den Anspruch und alle erforderlichen Informationen bis zum Ende des Kalendermonats nach dem Monat einreichen, in dem der Vorfall aufgetreten ist. Wenn der Vorfall beispielsweise am 15. Februar aufgetreten ist, muss Microsoft den Anspruch und alle erforderlichen Informationen bis zum 31. März erhalten haben. Endkunden und indirekte Wiederverkäufer können keine SLA-Gutschriftenansprüche einreichen. Entweder der indirekte Anbieter oder der Direktabrechnungspartner muss die Ansprüche in ihrem Namen einreichen. Referenzen: SLA für Azure Active Directory Wie und wann Sie eine Gutschrift für ein Service-Level-Agreement (SLA) von Microsoft anfordern"
  },
  {
    type: "yesno",
    id: "real-yn-206",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Die Datenschutz-Grundverordnung (DSGVO) gilt für Unternehmen, die Waren anbieten...", correct: "Ja" },
      { text: "Azure kann zum Erstellen einer Datenschutz-Grundverordnung (DSGVO)-konformen... verwendet werden", correct: "Ja" },
      { text: "Die Datenschutz-Grundverordnung (DSGVO) definiert Datenschutz- und Privatsphäreregeln", correct: "Ja" },
    ],
    explanation: "Die Datenschutz-Grundverordnung (DSGVO) führt neue Regeln für Organisationen ein, die Waren und Dienstleistungen für Personen in der Europäischen Union (EU) anbieten oder Daten von EU-Bürgern sammeln und analysieren, unabhängig davon, wo Sie oder Ihr Unternehmen ansässig sind."
  },
  {
    type: "yesno",
    id: "real-yn-205",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Auf Azure Cloud Shell kann über einen Webbrowser auf einem Linux-Computer zugegriffen werden", correct: "Ja" },
      { text: "Auf das Azure-Portal kann nur von einem Windows-Gerät aus zugegriffen werden", correct: "Nein" },
      { text: "Azure PowerShell-Module können unter macOS installiert werden", correct: "Ja" },
    ],
    explanation: "Das Azure PowerShell-Modul kann auf Windows-, macOS- und Linux-Plattformen installiert werden. Azure Cloud Shell und das Azure-Portal sind webbasierte Dienste, auf die über einen Webbrowser zugegriffen werden kann. Das verwendete Betriebssystem spielt keine Rolle."
  },
  {
    type: "yesno",
    id: "real-yn-200",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Wenn Sie einer Ressourcengruppe ein Tag zuweisen, können alle Azure-Ressourcen in dieser Ressourcengruppe...", correct: "Nein" },
      { text: "Wenn Sie einem Benutzer Berechtigungen zum Verwalten einer Ressourcengruppe zuweisen, kann der Benutzer alle... verwalten", correct: "Ja" },
      { text: "Alle in einer einzelnen Ressourcengruppe bereitgestellten Azure-Ressourcen müssen dieselbe Azure-Region verwenden", correct: "Nein" },
    ],
    explanation: "Eine Ressourcengruppe ist ein Container, der zusammengehörige Ressourcen für eine Azure-Lösung enthält. Die Ressourcengruppe speichert Metadaten zu den Ressourcen. Wenn Sie also einen Speicherort für die Ressourcengruppe angeben, geben Sie an, wo diese Metadaten gespeichert werden. Ressourcengruppen und enthaltene Ressourcen müssen nicht in derselben Azure-Region liegen. Sie wenden Tags auf Ihre Azure-Ressourcen, Ressourcengruppen und Abonnements an, um sie logisch in einer Taxonomie zu organisieren. Jedes Tag besteht aus einem Namen-Wert-Paar. Sie können beispielsweise allen Ressourcen in der Produktion den Namen „Umgebung“ und den Wert „Produktion“ zuweisen. Auf eine Ressourcengruppe angewendete Tags werden nicht auf enthaltene Ressourcen vererbt. Alle Berechtigungen, die Sie einem Benutzer einer Ressourcengruppe zuweisen, werden auf alle Ressourcen innerhalb dieser Ressourcengruppe vererbt. Diese Vererbung lässt sich nicht blockieren, da sie so konzipiert ist und RBAC-Rollen je nach Anwendung der RBAC-Rolle von der obersten zur untersten Ebene weitergegeben werden."
  },
  {
    type: "yesno",
    id: "real-yn-191",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Über Azure Service Health kann ein Administrator eine Regel erstellen, um benachrichtigt zu werden ...", correct: "Ja" },
      { text: "Über Azure Service Health kann ein Administrator einen Dienstausfall verhindern", correct: "Nein" },
      { text: "Über Azure Service Health kann ein Administrator den Zustand aller ... anzeigen", correct: "Ja" },
    ],
    explanation: "Azure bietet eine Reihe von Funktionen, mit denen Sie über den Zustand Ihrer Cloudressourcen informiert bleiben. Diese Informationen umfassen aktuelle und bevorstehende Probleme wie Ereignisse mit Auswirkungen auf den Dienst, geplante Wartungsarbeiten und andere Änderungen, die sich auf Ihre Verfügbarkeit auswirken können. Azure Service Health ist eine Kombination aus drei separaten kleineren Diensten. Der Azure-Status informiert Sie auf der Azure-Statusseite über Dienstausfälle in Azure. Die Seite bietet eine globale Übersicht über den Zustand aller Azure-Dienste in allen Azure-Regionen. Die Statusseite ist eine gute Referenz für Vorfälle mit weitreichenden Auswirkungen. Wir empfehlen aktuellen Azure-Benutzern jedoch dringend, den Azure- Dienstzustand zu nutzen, um über Azure-Vorfälle und -Wartungsarbeiten auf dem Laufenden zu bleiben. Service Health bietet eine personalisierte Ansicht der Integrität der von Ihnen verwendeten Azure-Dienste und -Regionen. Hier finden Sie am besten Informationen zu Dienstausfällen, geplanten Wartungsaktivitäten und anderen Integritätshinweisen, da die authentifizierte Service Health-Erfahrung weiß, welche Dienste und Ressourcen Sie derzeit verwenden. Die beste Möglichkeit, Service Health zu nutzen, besteht darin, Service Health-Warnungen einzurichten, die Sie über Ihre bevorzugten Kommunikationskanäle benachrichtigen, wenn Serviceprobleme, geplante Wartungsarbeiten oder andere Änderungen die von Ihnen verwendeten Azure-Dienste und -Regionen beeinträchtigen können. Die Ressourcenintegrität liefert Informationen zum Zustand Ihrer einzelnen Cloudressourcen, z. B. einer bestimmten VM-Instanz. Mit Azure Monitor können Sie außerdem Warnungen konfigurieren, die Sie über Verfügbarkeitsänderungen Ihrer Cloudressourcen informieren. Dank der Ressourcenintegrität und der Azure Monitor-Benachrichtigungen sind Sie minütlich über die Verfügbarkeit Ihrer Ressourcen informiert und können schnell beurteilen, ob ein Problem auf Ihr Problem oder auf ein Azure-Plattformereignis zurückzuführen ist. Zusammen bieten Ihnen diese Erfahrungen einen umfassenden Einblick in den Zustand von Azure, und zwar in der für Sie relevantesten Granularität."
  },
  {
    type: "yesno",
    id: "real-yn-176",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Ausgehender Datenverkehr von Azure zu einem lokalen Netzwerk ist immer kostenlos", correct: "Nein" },
      { text: "Datenverkehr zwischen Azure-Diensten innerhalb derselben Azure-Region ist immer kostenlos", correct: "Ja" },
      { text: "Bei Verwendung einer Azure ExpressRoute-Verbindung ist eingehender Datenverkehr von einem lokalen Netzwerk immer kostenlos", correct: "Nein" },
    ],
    explanation: "ExpressRoute ist ein Dienst, mit dem Sie private Verbindungen zwischen Azure-Rechenzentren und Infrastruktur vor Ort oder in einer Colocation-Umgebung herstellen können. ExpressRoute-Verbindungen laufen nicht über das öffentliche Internet und bieten mehr Zuverlässigkeit, höhere Geschwindigkeiten, geringere Latenzen und mehr Sicherheit als herkömmliche Internetverbindungen. Alle eingehenden Datenübertragungen sind kostenlos, für alle ausgehenden Datenübertragungen wird ein fester Tarif berechnet. Für den Datenverkehr zwischen Diensten in derselben Region fallen keine zusätzlichen Datenübertragungskosten an. Referenzen: Azure ExpressRoute-Preise, Bandbreitenpreisdetails"
  },
  {
    type: "yesno",
    id: "real-yn-175",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Nachdem ein Azure-Dienst allgemein verfügbar geworden ist, wird der Dienst nicht mehr aktualisiert mit...", correct: "Nein" },
      { text: "Wenn Sie Azure-Ressourcen für einen Dienst in der öffentlichen Vorschau erstellen, müssen Sie die Ressourcen neu erstellen...", correct: "Nein" },
      { text: "Im Azure-Portal können Sie zwischen Diensten unterscheiden, die allgemein verfügbar sind...", correct: "Nein" },
    ],
    explanation: "Öffentliche Vorschau bedeutet, dass sich der Dienst in der öffentlichen Betaphase befindet und von jedem mit einem Azure-Abonnement ausprobiert werden kann. Sie können diese Dienste oft zu einem ermäßigten Preis nutzen, solange sie sich in der Vorschauphase befinden. Dienste und Funktionen in der öffentlichen Vorschauphase werden im Azure-Portal mit dem Zusatz „(Vorschau)“ gekennzeichnet. Dienste und Funktionen in der Vorschauphase werden nahtlos in die allgemeine Verfügbarkeit überführt."
  },
  {
    type: "yesno",
    id: "real-yn-174",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Ein kostenloses Azure-Konto hat ein Limit von 2 TB Daten, die in Azure hochgeladen werden können", correct: "Nein" },
      { text: "Ein kostenloses Azure-Konto kann eine unbegrenzte Anzahl von Web-Apps enthalten", correct: "Nein" },
      { text: "Ein kostenloses Azure-Konto hat ein Ausgabenlimit", correct: "Nein" },
    ],
    explanation: "Das kostenlose Azure-Konto umfasst den Zugriff auf eine Reihe von Azure-Produkten, die 12 Monate lang kostenlos sind, ein Guthaben von 200 USD, das Sie in den ersten 30 Tagen nach der Anmeldung ausgeben können, und Zugriff auf über 25 Produkte, die immer kostenlos sind. Für alle Azure-Kunden ist nur der Basissupport enthalten. Das Ausgabenlimit in Azure verhindert Ausgaben über Ihren Guthabenbetrag hinaus. Bei allen Neukunden, die sich für ein kostenloses Azure-Konto oder Abonnementtypen anmelden, die Guthaben für mehrere Monate umfassen, ist das Ausgabenlimit standardmäßig aktiviert. Das Ausgabenlimit entspricht dem Guthabenbetrag und kann nicht geändert werden. Wenn Sie sich beispielsweise für ein kostenloses Azure-Konto angemeldet haben, beträgt Ihr Ausgabenlimit 200 USD und Sie können es nicht auf 500 USD ändern. Sie können das Ausgabenlimit jedoch entfernen. Sie haben also entweder kein Limit oder ein Limit in Höhe des Guthabenbetrags. Dies verhindert, dass Sie die meisten Arten von Ausgaben tätigen. Das Ausgabenlimit ist für Abonnements mit Verpflichtungsplänen oder mit nutzungsbasierter Bezahlung nicht verfügbar. Das kostenlose Azure-Konto hat ein Blobspeicherlimit von 5 GB und ein Dateispeicherlimit von 5 GB. Das kostenlose Azure-Konto ist auf 10 Web-, Mobil- oder API-Apps mit Azure App Service und 1 GB Speicherplatz beschränkt."
  },
  {
    type: "yesno",
    id: "real-yn-173",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Ein kostenloses Azure-Konto hat ein Limit für die Datenmenge, die in Azure hochgeladen werden kann", correct: "Ja" },
      { text: "Ein kostenloses Azure-Konto kann eine unbegrenzte Anzahl von Web-Apps enthalten", correct: "Nein" },
      { text: "Ein kostenloses Azure-Konto hat ein Ausgabenlimit", correct: "Nein" },
    ],
    explanation: "Das kostenlose Azure-Konto umfasst den Zugriff auf eine Reihe von Azure-Produkten, die 12 Monate lang kostenlos sind, ein Guthaben von 200 USD, das Sie in den ersten 30 Tagen nach der Anmeldung ausgeben können, und Zugriff auf über 25 Produkte, die immer kostenlos sind. Für alle Azure-Kunden ist nur der Basissupport enthalten. Das Ausgabenlimit in Azure verhindert Ausgaben über Ihren Guthabenbetrag hinaus. Bei allen Neukunden, die sich für ein kostenloses Azure-Konto oder Abonnementtypen anmelden, die Guthaben für mehrere Monate umfassen, ist das Ausgabenlimit standardmäßig aktiviert. Das Ausgabenlimit entspricht dem Guthabenbetrag und kann nicht geändert werden. Wenn Sie sich beispielsweise für ein kostenloses Azure-Konto angemeldet haben, beträgt Ihr Ausgabenlimit 200 USD und Sie können es nicht auf 500 USD ändern. Sie können das Ausgabenlimit jedoch entfernen. Sie haben also entweder kein Limit oder ein Limit in Höhe des Guthabenbetrags. Dies verhindert, dass Sie die meisten Arten von Ausgaben tätigen. Das Ausgabenlimit ist für Abonnements mit Verpflichtungsplänen oder mit nutzungsbasierter Bezahlung nicht verfügbar. Das kostenlose Azure-Konto hat ein Blobspeicherlimit von 5 GB und ein Dateispeicherlimit von 5 GB. Das kostenlose Azure-Konto ist auf 10 Web-, Mobil- oder API-Apps mit Azure App Service und 1 GB Speicherplatz beschränkt."
  },
  {
    type: "yesno",
    id: "real-yn-172",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Ein Premier-Supportplan kann nur von Unternehmen erworben werden, die...", correct: "Ja" },
      { text: "Support von MSDN-Foren wird nur Unternehmen angeboten, die...", correct: "Nein" },
      { text: "Ein Standard-Supportplan ist in einem kostenlosen Azure-Konto enthalten", correct: "Nein" },
    ],
    explanation: "Das kostenlose Azure-Konto bietet Zugriff auf zahlreiche Azure-Produkte (12 Monate lang kostenlos), ein Guthaben von 200 $ für die ersten 30 Tage nach der Registrierung sowie Zugriff auf über 25 Produkte, die immer kostenlos sind. Für alle Azure-Kunden ist nur der Basis-Support enthalten. Der Premier-Supportplan eignet sich gut für große oder globale Unternehmen, die strategisch und geschäftskritisch von Microsoft-Produkten wie Azure abhängig sind. Für alle Azure-Kunden und -Partner stehen zwei Azure-Onlineforen zur Verfügung : MSDN und Stack Overflow. MSDN ist ein Online-Angebot von Microsoft. Stack Overflow steht in keiner Verbindung zu Microsoft. Referenzen: Häufig gestellte Fragen zum kostenlosen Azure-Konto, Supportpläne vergleichen, Azure-Support: Premier"
  },
  {
    type: "yesno",
    id: "real-yn-171",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure-Dienste in der öffentlichen Vorschau können in Produktionsumgebungen verwendet werden", correct: "Ja" },
      { text: "Azure-Dienste in der öffentlichen Vorschau unterliegen einem Service Level Agreement (SLA)", correct: "Nein" },
      { text: "Auf alle Azure-Dienste in der privaten Vorschau muss über ein separates Azure-Portal zugegriffen werden", correct: "Nein" },
    ],
    explanation: "Azure Active Directory stellt Updates und neue Funktionen in Form von Vorschauprogrammen bereit. Microsoft führt die Vorschauen phasenweise ein, um Microsoft und Kunden die Möglichkeit zu geben, die neue Funktion zu testen und zu verstehen, bevor sie Teil des Standarddienstes von Azure AD wird. Die Phasen sind wie folgt: 1. Private Vorschau – In dieser Phase laden wir einige Kunden ein, frühzeitig auf neue Konzepte und Funktionen zuzugreifen. Diese Phase beinhaltet keinen formellen Support. 2. Öffentliche Vorschau – In dieser Phase können alle Kunden mit der entsprechenden Azure AD-Lizenz die neue Funktion testen. Der Microsoft-Kundensupport bietet in dieser Phase Supportleistungen an, die üblichen Service Level Agreements gelten jedoch nicht. Bei neuen Funktionen im Azure AD-Portal werden Kunden in der Benutzeroberfläche Informationsbanner angezeigt, die auf die neue Funktion in der Vorschau aufmerksam machen. Durch Klicken auf das Informationsbanner können Kunden die Vorschau aktivieren. 3. Allgemein verfügbar (GA) – Nach Abschluss der öffentlichen Vorschau steht die Funktion allen lizenzierten Kunden zur Verfügung und wird über alle Microsoft- Supportkanäle unterstützt. Beachten Sie, dass sich die Nutzung der Funktion durch neue Funktionen ändern kann, wenn diese sich auf bestehende Funktionen auswirken. Für jedes Azure Active Directory-Vorschauprogramm gelten andere Opt-in-Anforderungen und Abhängigkeiten."
  },
  {
    type: "yesno",
    id: "real-yn-168",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Alle kostenlosen Azure-Konten laufen nach einem bestimmten Zeitraum ab", correct: "Ja" },
      { text: "Sie können bis zu 10 kostenlose Azure-Konten erstellen, indem Sie dasselbe Microsoft-Konto verwenden", correct: "Nein" },
      { text: "Wenn Ihr Unternehmen ein kostenloses Azure-Konto verwendet, steht Ihnen nur eine Teilmenge der Azure-Dienste zur Verfügung", correct: "Nein" },
    ],
    explanation: "Das kostenlose Azure-Konto umfasst den Zugriff auf eine Reihe von Azure-Produkten, die 12 Monate lang kostenlos sind, ein Guthaben von 200 US-Dollar für die ersten 30 Tage nach der Anmeldung und den Zugriff auf mehr als 25 Produkte, die immer kostenlos sind. Das kostenlose Azure-Konto steht allen neuen Azure-Kunden zur Verfügung. Auch wenn Sie Azure noch nie ausprobiert oder bezahlt haben, sind Sie berechtigt. Das kostenlose Azure-Konto bietet Zugriff auf alle Azure-Produkte und hindert Kunden nicht daran, ihre Ideen in die Produktion umzusetzen. Das kostenlose Azure-Konto enthält bestimmte Produkte – und bestimmte Mengen dieser Produkte – kostenlos. Um Ihre Produktionsszenarien zu ermöglichen, müssen Sie möglicherweise Ressourcen nutzen, die über die kostenlosen Mengen hinausgehen. Diese zusätzlichen Ressourcen werden Ihnen zu den nutzungsbasierten Tarifen in Rechnung gestellt. Es gibt maximal ein Konto mit 12 Monaten kostenlosem Produktzugriff und 200 $ Guthaben pro Neukunde. Sie können jedoch über die kostenlose Menge hinaus beliebig viele Produkte nutzen, indem Sie Ihr Konto auf Pay-as-you-go-Preise upgraden."
  },
  {
    type: "yesno",
    id: "real-yn-166",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "In Azure Active (Azure AD) oder Drittanbietern gespeicherte Identitäten ... können für den Zugriff auf Azure-Ressourcen verwendet werden", correct: "Ja" },
      { text: "Azure verfügt über integrierte Authentifizierungs- und Autorisierungsdienste ... sicherer Zugriff auf Azure-Ressourcen", correct: "Ja" },
      { text: "Die Autorisierung für den Zugriff auf Azure-Ressourcen kann nur Azure Active Directory-Benutzern erteilt werden", correct: "Nein" },
    ],
    explanation: "Authentifizierung ist der Prozess, mit dem Sie nachweisen, dass Sie die Person sind, für die Sie sich ausgeben. Authentifizierung wird manchmal als AuthN abgekürzt. Microsoft Identity Platform implementiert das OpenID Connect-Protokoll zur Authentifizierung. Bei der Autorisierung wird einer authentifizierten Partei die Berechtigung erteilt, etwas zu tun. Sie gibt an, auf welche Daten Sie zugreifen dürfen und was Sie mit diesen Daten tun dürfen. Anstatt Apps zu erstellen, die jeweils ihre eigenen Benutzernamen- und Kennwortinformationen verwalten, was einen hohen Verwaltungsaufwand verursacht, wenn Sie Benutzer über mehrere Apps hinweg hinzufügen oder entfernen müssen, können Apps diese Verantwortung an einen zentralen Identitätsanbieter delegieren. Azure Active Directory (Azure AD) ist ein zentraler Identitätsanbieter in der Cloud. Durch die Delegierung von Authentifizierung und Autorisierung an diesen Anbieter sind Szenarien wie Richtlinien für bedingten Zugriff möglich, die erfordern, dass sich ein Benutzer an einem bestimmten Ort befindet, die Verwendung der mehrstufigen Authentifizierung (manchmal auch als Zwei-Faktor-Authentifizierung oder 2FA bezeichnet) sowie die Möglichkeit, dass sich ein Benutzer einmal anmeldet und dann automatisch bei allen Web-Apps angemeldet wird, die dasselbe zentrale Verzeichnis verwenden. Diese Funktion wird als Single Sign-On (SSO) bezeichnet."
  },
  {
    type: "yesno",
    id: "real-yn-161",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Alle Daten, die in ein Azure Storage-Konto kopiert werden, werden automatisch gesichert...", correct: "Nein" },
      { text: "Ein Azure Storage-Konto kann bis zu 2 TB Daten und bis zu eine Million Dateien enthalten", correct: "Nein" },
      { text: "Daten, die in ein Azure Storage-Konto kopiert werden, werden automatisch verwaltet...", correct: "Nein" },
    ],
    explanation: "Das Azure-Speicherkonto enthält alle Ihre Azure Storage-Datenobjekte: Blobs, Dateien, Warteschlangen, Tabellen und Datenträger. Das Speicherkonto bietet einen eindeutigen Namespace für Ihre Azure Storage-Daten, auf den von überall auf der Welt über HTTP oder HTTPS zugegriffen werden kann. Die Daten in Ihrem Azure-Speicherkonto sind dauerhaft und hochverfügbar, sicher und massiv skalierbar. Azure Storage speichert immer mehrere Kopien (mindestens drei Kopien) Ihrer Daten, sodass diese vor geplanten und ungeplanten Ereignissen geschützt sind, einschließlich vorübergehender Hardwarefehler, Netzwerk- oder Stromausfälle und massiver Naturkatastrophen. Redundanz stellt sicher, dass Ihr Speicherkonto auch bei Ausfällen die Service Level Agreements (SLAs) für Azure Storage erfüllt. Jedes Azure-Abonnement kann bis zu 250 Speicherkonten mit jeweils bis zu 500 Terabyte Speicherplatz umfassen. Es gibt keine Begrenzung für die Anzahl der Blobs oder Dateien, die Sie in einem Speicherkonto ablegen können. Referenzen: Speicherkontoübersicht Azure Storage-Redundanz"
  },
  {
    type: "yesno",
    id: "real-yn-144",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Durch das Kopieren mehrerer GB Daten von einem lokalen Netzwerk über ein VPN nach Azure entstehen zusätzliche Daten...", correct: "Nein" },
      { text: "Durch das Kopieren mehrerer GB Daten von Azure in ein lokales Netzwerk über ein VPN entstehen zusätzliche Daten...", correct: "Ja" },
      { text: "Durch das Erstellen zusätzlicher Ressourcengruppen in einem Azure-Abonnement entstehen zusätzliche Kosten", correct: "Nein" },
    ],
    explanation: "Azure-Ressourcengruppen sind kostenlos. Das Einrichten eines virtuellen Netzwerks ist kostenlos. Microsoft berechnet jedoch Gebühren für das VPN-Gateway, das eine Verbindung zu lokalen und anderen virtuellen Netzwerken in Azure herstellt. Diese Gebühr basiert auf der Zeit, in der das Gateway bereitgestellt und verfügbar ist. Datenübertragungen über die VPN-Verbindungen zu Ihren lokalen Standorten oder dem Internet im Allgemeinen werden separat zum regulären Datenübertragungstarif berechnet. Eingehende Datenübertragungen sind kostenlos. Ausgehende Datenübertragungen werden berechnet. Referenzen: VPN Gateway-Preise Bandbreitenpreisdetails"
  },
  {
    type: "yesno",
    id: "real-yn-137",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Wenn Sie zwei virtuelle Azure-Maschinen erstellen, die die B2S-Größe verwenden, wird jede virtuelle Maschine...", correct: "Nein" },
      { text: "Wenn eine virtuelle Azure-Maschine gestoppt wird, zahlen Sie weiterhin die damit verbundenen Speicherkosten...", correct: "Ja" },
      { text: "Mit Azure-Reservierungen zahlen Sie weniger für virtuelle Maschinen als bei der nutzungsbasierten Bezahlung", correct: "Nein" },
    ],
    explanation: "Sie können durch den Kauf von Reservierungen einen Rabatt auf Ihre Azure-Dienste erhalten. Indem Sie Microsoft im Voraus Einblick in Ihren Ressourcenbedarf für ein oder drei Jahre geben, können Sie effizienter arbeiten. Im Gegenzug geben Sie diese Einsparungen in Form von Rabatten von bis zu 72 Prozent an Sie weiter. Azure berechnet keine Kosten für eine VM, während sie gestoppt (freigegeben) ist. Es fallen jedoch weiterhin Kosten für den Azure-Speicher an, der für die Betriebssystemfestplatte der VM und alle angeschlossenen Datenfestplatten benötigt wird. Die monatlichen Kosten für eine Azure-VM hängen von der Betriebszeit der VM ab. Referenzen: Reservierungen von Azure Virtual Machines – Stoppen versus Stoppen (Freigeben)"
  },
  {
    type: "yesno",
    id: "real-yn-135",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Das Service Level Agreement (SLA) für Azure Active Directory Basic ist dasselbe wie...", correct: "Nein" },
      { text: "Alle zahlenden Azure-Kunden können eine Gutschrift beantragen, wenn ihr monatlicher Verfügbarkeitsprozentsatz... beträgt", correct: "Ja" },
      { text: "In Azure Active Directory Premium ist eine Verfügbarkeit von mindestens 99,9 Prozent garantiert", correct: "Nein" },
    ],
    explanation: "Microsoft garantiert eine Verfügbarkeit von mindestens 99,9 % für die Azure Active Directory Basic- und Premium-Dienste. Für die kostenlose Version von Azure Active Directory wird kein SLA bereitgestellt. Was passiert, wenn Microsoft sein SLA nicht einhält? Es liegt in der Verantwortung des Kunden oder Partners, festzustellen, ob das Microsoft Azure Service Level Agreement nicht eingehalten wurde. Um einen Anspruch geltend machen zu können, muss der Kunde den Kundensupport innerhalb von fünf Werktagen nach dem Vorfall über den Vorfall informieren. Der Kunde muss außerdem ausreichende Beweise zur Untermauerung des Anspruchs vorlegen. Sobald der Anspruch von Microsoft bestätigt wurde, wird bei SLAs zwischen 99,5 % und 99 % eine Gutschrift von 10 % gewährt. Bei SLAs unter 99 % wird für den jeweiligen Monat, in dem das SLA nicht eingehalten wurde, eine Gutschrift von 25 % gewährt. Weitere Informationen zum Azure SLA finden Sie im Service Level Agreement. Referenzen: SLA für Azure Active Directory Was ist das Microsoft Azure Service Level Agreement (SLA)?"
  },
  {
    type: "yesno",
    id: "real-yn-134",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Über Azure Service Health kann ein Administrator eine Regel erstellen, um benachrichtigt zu werden, wenn ein Azure-Dienst ...", correct: "Ja" },
      { text: "Über Azure Service Health kann ein Administrator verhindern, dass ein Dienstausfall einen ... beeinträchtigt", correct: "Nein" },
      { text: "Über Azure Service Health kann ein Administrator den Zustand aller bereitgestellten Dienste anzeigen ...", correct: "Ja" },
    ],
    explanation: "Azure bietet eine Reihe von Funktionen, mit denen Sie über den Zustand Ihrer Cloudressourcen informiert bleiben. Diese Informationen umfassen aktuelle und bevorstehende Probleme wie Ereignisse mit Auswirkungen auf den Dienst, geplante Wartungsarbeiten und andere Änderungen, die sich auf Ihre Verfügbarkeit auswirken können. Azure Service Health ist eine Kombination aus drei separaten kleineren Diensten. Der Azure-Status informiert Sie auf der Azure-Statusseite über Dienstausfälle in Azure. Die Seite bietet eine globale Übersicht über den Zustand aller Azure-Dienste in allen Azure-Regionen. Die Statusseite ist eine gute Referenz für Vorfälle mit weitreichenden Auswirkungen. Wir empfehlen aktuellen Azure-Benutzern jedoch dringend, den Azure- Dienstzustand zu nutzen, um über Azure-Vorfälle und -Wartungsarbeiten auf dem Laufenden zu bleiben. Service Health bietet eine personalisierte Ansicht der Integrität der von Ihnen verwendeten Azure-Dienste und -Regionen. Hier finden Sie am besten Informationen zu Dienstausfällen, geplanten Wartungsaktivitäten und anderen Integritätshinweisen, da die authentifizierte Service Health-Erfahrung weiß, welche Dienste und Ressourcen Sie derzeit verwenden. Die beste Möglichkeit, Service Health zu nutzen, besteht darin, Service Health-Warnungen einzurichten, die Sie über Ihre bevorzugten Kommunikationskanäle benachrichtigen, wenn Serviceprobleme, geplante Wartungsarbeiten oder andere Änderungen die von Ihnen verwendeten Azure-Dienste und -Regionen beeinträchtigen können. Die Ressourcenintegrität liefert Informationen zum Zustand Ihrer einzelnen Cloudressourcen, z. B. einer bestimmten VM-Instanz. Mit Azure Monitor können Sie außerdem Warnungen konfigurieren, die Sie über Verfügbarkeitsänderungen Ihrer Cloudressourcen informieren. Dank der Ressourcenintegrität und der Azure Monitor-Benachrichtigungen sind Sie minütlich über die Verfügbarkeit Ihrer Ressourcen informiert und können schnell beurteilen, ob ein Problem auf Ihr Problem oder auf ein Azure-Plattformereignis zurückzuführen ist. Zusammen bieten Ihnen diese Erfahrungen einen umfassenden Einblick in den Zustand von Azure, und zwar in der für Sie relevantesten Granularität."
  },
  {
    type: "yesno",
    id: "real-yn-133",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Eine Netzwerksicherheitsgruppe (NSG) verschlüsselt den gesamten Netzwerkverkehr, der von Azure gesendet wird...", correct: "Nein" },
      { text: "Azure-VMs, auf denen Windows Server 2016 ausgeführt wird, können den gesendeten Netzwerkverkehr verschlüsseln...", correct: "Ja" },
      { text: "Azure Firewall verschlüsselt den gesamten Netzwerkverkehr, der von Azure ins Internet gesendet wird", correct: "Nein" },
    ],
    explanation: "Weder Azure Firewall noch eine Netzwerksicherheitsgruppe (NSG) verschlüsseln Daten für die Übertragung. Windows Server kann so konfiguriert werden, dass die Kommunikation mit einem bestimmten Host im Internet mithilfe von IPSec verschlüsselt wird. Dies kann über die Windows-Firewall oder über ein Gruppenrichtlinienobjekt erfolgen. Die IPSec-Verschlüsselung muss auf beiden oder allen an der Kommunikation beteiligten Hosts konfiguriert sein."
  },
  {
    type: "yesno",
    id: "real-yn-112",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Sie können das Azure-Abonnement Ihres Unternehmens von der kostenlosen Testversion auf Pay-As-You-Go umstellen", correct: "Ja" },
      { text: "Das Azure-Ausgabenlimit ist festgelegt und kann nicht erhöht oder verringert werden", correct: "Ja" },
      { text: "Ein Benutzer, dem die Rolle „Besitzer“ zugewiesen ist, kann den Besitz eines Azure-Abonnements übertragen", correct: "Ja" },
    ],
    explanation: "Um einen Benutzer zum Administrator eines Azure-Abonnements zu machen, weist ihm ein vorhandener Administrator die Rolle „Besitzer“ (eine Azure-Rolle) auf Abonnementebene zu. Die Rolle „Besitzer“ gewährt dem Benutzer Vollzugriff auf alle Ressourcen des Abonnements und berechtigt ihn, den Zugriff an andere zu delegieren. Sie können Ihr kostenloses Azure-Konto oder Ihr Azure for Students Starter-Konto im Azure-Portal auf die nutzungsbasierte Bezahlung upgraden. Das Ausgabenlimit in Azure verhindert Ausgaben über Ihr Guthaben. Bei allen Neukunden, die sich für ein kostenloses Azure-Konto oder Abonnementtypen mit Guthaben über mehrere Monate anmelden, ist das Ausgabenlimit standardmäßig aktiviert. Das Ausgabenlimit entspricht dem Guthaben und kann nicht geändert werden. Wenn Sie sich beispielsweise für ein kostenloses Azure-Konto angemeldet haben, beträgt Ihr Ausgabenlimit 200 $ und Sie können es nicht auf 500 $ ändern. Sie können das Ausgabenlimit jedoch entfernen. Sie haben also entweder kein Limit oder ein Limit in Höhe des Guthabens. Dadurch werden Sie von den meisten Arten von Ausgaben ausgeschlossen. Das Ausgabenlimit ist für Abonnements mit Verpflichtungsplänen oder nutzungsbasierter Bezahlung nicht verfügbar. Referenzen: Azure-Abonnementadministratoren hinzufügen oder ändern Upgrade Ihres kostenlosen Azure-Kontos oder Azure for Students Starter-Kontos Azure-Ausgabenlimit"
  },
  {
    type: "yesno",
    id: "real-yn-106",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Wenn Sie eine Ressourcengruppe löschen, werden alle Ressourcen in der Ressourcengruppe gelöscht", correct: "Ja" },
      { text: "Eine Ressourcengruppe kann Ressourcen aus mehreren Azure-Regionen enthalten", correct: "Ja" },
      { text: "Azure-Ressourcen können nur auf andere Ressourcen in derselben Ressourcengruppe zugreifen", correct: "Nein" },
    ],
    explanation: "Eine Ressourcengruppe ist ein Container, der zusammengehörige Ressourcen für eine Azure-Lösung enthält. Die Ressourcengruppe kann alle Ressourcen für die Lösung enthalten oder nur die Ressourcen, die Sie als Gruppe verwalten möchten. Sie entscheiden, wie Sie Ressourcen den Ressourcengruppen zuordnen möchten, je nachdem, was für Ihre Organisation am sinnvollsten ist. Fügen Sie Ressourcen mit demselben Lebenszyklus grundsätzlich derselben Ressourcengruppe hinzu, damit Sie sie problemlos als Gruppe bereitstellen, aktualisieren und löschen können. Die Ressourcengruppe speichert Metadaten zu den Ressourcen. Wenn Sie einen Speicherort für die Ressourcengruppe angeben, geben Sie daher an, wo diese Metadaten gespeichert werden. Aus Compliance-Gründen müssen Sie möglicherweise sicherstellen, dass Ihre Daten in einer bestimmten Region gespeichert werden. Die Ressourcengruppe kann jedoch Ressourcen von mehreren Standorten enthalten."
  },
  {
    type: "yesno",
    id: "real-yn-104",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Ein Unternehmen kann die Kapazität seines internen Netzwerks durch die Nutzung der öffentlichen Cloud erweitern", correct: "Ja" },
      { text: "In einem öffentlichen Cloud-Modell können nur Gastbenutzer Ihres Unternehmens auf die Ressourcen in der Cloud zugreifen", correct: "Nein" },
      { text: "Um ein Hybrid-Cloud-Modell zu erreichen, muss ein Unternehmen immer von einem privaten Cloud-Modell migrieren", correct: "Nein" },
    ],
    explanation: "Eine Hybrid Cloud umfasst Public Cloud- und Private Cloud-Ressourcen. Ein Unternehmen muss nicht unbedingt mit einem Private Cloud-Modell beginnen. Ein Unternehmen, das eine Public Cloud nutzt, kann seine Kapazitäten auf eine Private Cloud erweitern und so eine Hybrid Cloud erhalten. Ein Unternehmen kann die Kapazität seines internen Netzwerks durch die Nutzung der Public Cloud erweitern. Ja, dies ist einer der Hauptanwendungsbereiche einer Public Cloud. Auch Benutzer anderer Unternehmen oder Einzelpersonen können als Gastbenutzer zu Ihrem Mandanten eingeladen werden."
  },
  {
    type: "yesno",
    id: "real-yn-57",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Zwei Azure-Abonnements können durch Erstellen einer Supportanfrage zu einem einzigen Abonnement zusammengeführt werden", correct: "Nein" },
      { text: "Ein Unternehmen kann Ressourcen in mehreren Abonnements speichern", correct: "Ja" },
      { text: "Ein einzelnes Microsoft-Konto kann zum Verwalten mehrerer Azure-Abonnements verwendet werden", correct: "Nein" },
    ],
    explanation: "Sie können ein Microsoft-Konto als Gast zu einem oder mehreren Azure AD-Mandanten hinzufügen und dem Konto die Berechtigung zum Verwalten von Ressourcen und Abonnements erteilen. Das Zusammenführen zweier Abonnements durch Erstellen einer Supportanfrage ist nicht möglich. Sie können Ressourcen aus zwei Abonnements jedoch selbst zusammenführen, indem Sie sie verschieben. Sie verwenden den Mandanten, um den Zugriff auf Ihre Abonnements und Ressourcen zu verwalten. Wenn Sie den Abrechnungsbesitz Ihres Abonnements auf ein Konto in einem anderen Azure AD-Mandanten übertragen, können Sie das Abonnement sogar in den Mandanten des neuen Kontos verschieben. Selbstverständlich kann ein Unternehmen mehrere Abonnements und auch mehrere Mandanten besitzen."
  },
  {
    type: "yesno",
    id: "real-yn-48",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure Advisor ... senkt die Kosten für den Betrieb virtueller Azure-Computer", correct: "Ja" },
      { text: "Azure Advisor ... konfiguriert die Netzwerkeinstellungen auf virtuellen Azure-Computern", correct: "Nein" },
      { text: "Azure Advisor ... verbessert die Sicherheit einer Azure Active Directory (Azure AD)-Umgebung", correct: "Ja" },
    ],
    explanation: "Advisor ist ein personalisierter Cloudberater, der Sie bei der Optimierung Ihrer Azure-Bereitstellungen mithilfe bewährter Methoden unterstützt. Er analysiert Ihre Ressourcenkonfiguration und Nutzungstelemetrie und empfiehlt anschließend Lösungen, mit denen Sie die Kosteneffizienz, Leistung, Zuverlässigkeit (früher als Hochverfügbarkeit bezeichnet) und Sicherheit Ihrer Azure-Ressourcen verbessern können. Mit Advisor können Sie: • Erhalten Sie proaktive, umsetzbare und personalisierte Best Practices-Empfehlungen. • Verbessern Sie die Leistung, Sicherheit und Zuverlässigkeit Ihrer Ressourcen, indem Sie Möglichkeiten zur Reduzierung Ihrer Azure-Gesamtausgaben identifizieren. • Erhalten Sie Empfehlungen mit vorgeschlagenen Aktionen inline. Das Advisor-Dashboard zeigt personalisierte Empfehlungen für alle Ihre Abonnements an. Sie können Filter anwenden, um Empfehlungen für bestimmte Abonnements und Ressourcentypen anzuzeigen. Die Empfehlungen sind in fünf Kategorien unterteilt: • Zuverlässigkeit (früher Hochverfügbarkeit genannt): Um die Kontinuität Ihrer geschäftskritischen Anwendungen sicherzustellen und zu verbessern. • Sicherheit: Zum Erkennen von Bedrohungen und Schwachstellen, die zu Sicherheitsverletzungen führen könnten. • Leistung: Um die Geschwindigkeit Ihrer Anwendungen zu verbessern. • Kosten: Um Ihre gesamten Azure-Ausgaben zu optimieren und zu reduzieren. • Operative Exzellenz: Wir helfen Ihnen dabei, Prozess- und Arbeitsablaufeffizienz, Ressourcenverwaltung und Best Practices für die Bereitstellung zu erreichen."
  },
  {
    type: "yesno",
    id: "real-yn-46",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Wenn Sie einer Ressourcengruppe ein Tag zuweisen, werden alle Azure-Ressourcen in dieser Ressourcengruppe demselben Tag zugewiesen", correct: "Nein" },
      { text: "Wenn Sie einer Ressourcengruppe eine Berechtigung erben, erben alle Azure-Ressourcen in dieser Ressourcengruppe die Berechtigungen", correct: "Ja" },
      { text: "Alle in einer einzelnen Ressourcengruppe bereitgestellten Azure-Ressourcen müssen dieselbe Azure-Region gemeinsam nutzen", correct: "Nein" },
    ],
    explanation: "Eine Ressourcengruppe ist ein Container, der zusammengehörige Ressourcen für eine Azure-Lösung enthält. Die Ressourcengruppe speichert Metadaten zu den Ressourcen. Wenn Sie also einen Speicherort für die Ressourcengruppe angeben, geben Sie an, wo diese Metadaten gespeichert werden. Ressourcengruppen und enthaltene Ressourcen müssen nicht in derselben Azure-Region liegen. Sie wenden Tags auf Ihre Azure-Ressourcen, Ressourcengruppen und Abonnements an, um sie logisch in einer Taxonomie zu organisieren. Jedes Tag besteht aus einem Namen-Wert-Paar. Sie können beispielsweise allen Ressourcen in der Produktion den Namen „Umgebung“ und den Wert „Produktion“ zuweisen. Auf eine Ressourcengruppe angewendete Tags werden nicht auf enthaltene Ressourcen vererbt. Jede Rolle einer Ressourcengruppe wird auf alle Ressourcen innerhalb dieser Ressourcengruppe vererbt. Diese Vererbung lässt sich nicht blockieren, da sie so beabsichtigt ist und RBAC-Rollen je nachdem, wo die RBAC-Rolle angewendet wird, von der obersten zur untersten Ebene weitergegeben werden."
  },
  {
    type: "yesno",
    id: "real-yn-45",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Ein Azure-Dienst in der öffentlichen Vorschau wird für alle Azure-Kunden freigegeben", correct: "Ja" },
      { text: "Ein Azure-Dienst mit allgemeiner Verfügbarkeit wird für eine Teilmenge der Azure-Kunden freigegeben", correct: "Nein" },
      { text: "Ein Azure-Dienst in der privaten Vorschau wird für alle Azure-Kunden freigegeben", correct: "Nein" },
    ],
    explanation: "Azure Active Directory stellt Updates und neue Funktionen in Form von Vorschauprogrammen bereit. Microsoft führt die Vorschauen phasenweise ein, um Microsoft und Kunden die Möglichkeit zu geben, die neue Funktion zu testen und zu verstehen, bevor sie Teil des Standarddienstes von Azure AD wird. Die Phasen sind wie folgt: 1. Private Vorschau – In dieser Phase laden wir einige Kunden ein, frühzeitig auf neue Konzepte und Funktionen zuzugreifen. Diese Phase beinhaltet keinen formellen Support. 2. Öffentliche Vorschau – In dieser Phase können alle Kunden mit der entsprechenden Azure AD-Lizenz die neue Funktion testen. Der Microsoft-Kundensupport bietet in dieser Phase Supportleistungen an, die üblichen Service Level Agreements gelten jedoch nicht. Bei neuen Funktionen im Azure AD-Portal werden Kunden in der Benutzeroberfläche Informationsbanner angezeigt, die auf die neue Funktion in der Vorschau aufmerksam machen. Durch Klicken auf das Informationsbanner können Kunden die Vorschau aktivieren. 3. Allgemein verfügbar (GA) – Nach Abschluss der öffentlichen Vorschau steht die Funktion allen lizenzierten Kunden zur Verfügung und wird über alle Microsoft- Supportkanäle unterstützt. Beachten Sie, dass sich die Nutzung der Funktion durch neue Funktionen ändern kann, wenn diese sich auf bestehende Funktionen auswirken. Für jedes Azure Active Directory-Vorschauprogramm gelten andere Opt-in-Anforderungen und Abhängigkeiten."
  },
  {
    type: "yesno",
    id: "real-yn-44",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Unternehmen können die im Service Level Agreement (SLA) garantierte Betriebszeit erhöhen, indem sie Azure hinzufügen ...", correct: "Ja" },
      { text: "Unternehmen können die im Service Level Agreement (SLA) garantierte Betriebszeit erhöhen, indem sie ... kaufen", correct: "Nein" },
      { text: "Die im Service Level Agreement (SLA) garantierte Betriebszeit für kostenpflichtige Azure-Dienste beträgt mindestens ...", correct: "Nein" },
    ],
    explanation: "Das Service Level Agreement (SLA) beschreibt die Verpflichtungen von Microsoft hinsichtlich Verfügbarkeit und Konnektivität. Die SLA für einzelne Azure-Dienste sind im folgenden Azure-Artikel aufgeführt. Service Level Agreements"
  },
  {
    type: "yesno",
    id: "real-yn-43",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Azure-Dienste in der öffentlichen Vorschau können nur mithilfe der Azure CLI verwaltet werden", correct: "Nein" },
      { text: "Die Kosten eines Azure-Dienstes in der privaten Vorschau sinken, wenn der Dienst...", correct: "Nein" },
      { text: "Die meisten Azure-Dienste werden in der privaten Vorschau eingeführt, bevor sie eingeführt werden...", correct: "Nein" },
    ],
    explanation: "Azure Active Directory stellt Updates und neue Funktionen in Form von Vorschauprogrammen bereit. Microsoft führt die Vorschauen phasenweise ein, um Microsoft und Kunden die Möglichkeit zu geben, die neue Funktion zu testen und zu verstehen, bevor sie Teil des Standarddienstes von Azure AD wird. Die Phasen sind wie folgt: 1. Private Vorschau – In dieser Phase laden wir einige Kunden ein, frühzeitig auf neue Konzepte und Funktionen zuzugreifen. Diese Phase beinhaltet keinen formellen Support. 2. Öffentliche Vorschau – In dieser Phase können alle Kunden mit der entsprechenden Azure AD-Lizenz die neue Funktion testen. Der Microsoft-Kundensupport bietet in dieser Phase Supportleistungen an, die üblichen Service Level Agreements gelten jedoch nicht. Bei neuen Funktionen im Azure AD-Portal werden Kunden in der Benutzeroberfläche Informationsbanner angezeigt, die auf die neue Funktion in der Vorschau aufmerksam machen. Durch Klicken auf das Informationsbanner können Kunden die Vorschau aktivieren. 3. Allgemein verfügbar (GA) – Nach Abschluss der öffentlichen Vorschau steht die Funktion allen lizenzierten Kunden zur Verfügung und wird über alle Microsoft-Supportkanäle unterstützt. Beachten Sie, dass sich die Nutzung der Funktion durch neue Funktionen ändern kann, wenn diese sich auf bestehende Funktionen auswirken. Für jedes Azure Active Directory-Vorschauprogramm gelten andere Opt-in-Anforderungen und Abhängigkeiten."
  },
  {
    type: "yesno",
    id: "real-yn-41",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Zwei gültige Methoden für Azure Multi-Factor Authentication (MFA) sind...", correct: "Nein" },
      { text: "Azure Multi-Factor Authentication (MFA) kann erforderlich sein für...", correct: "Ja" },
      { text: "So implementieren Sie eine Azure Multi-Factor Authentication (MFA)-Lösung...", correct: "Nein" },
    ],
    explanation: "Bei der Multi-Faktor-Authentifizierung handelt es sich um einen Prozess, bei dem ein Benutzer während des Anmeldevorgangs zu einer zusätzlichen Form der Identifizierung aufgefordert wird, beispielsweise zur Eingabe eines Codes auf seinem Mobiltelefon oder zur Bereitstellung eines Fingerabdruckscans. Azure Multi-Factor Authentication erfordert zwei oder mehr der folgenden Authentifizierungsmethoden: • Etwas, das Sie wissen, normalerweise ein Passwort. • Etwas, das Sie besitzen, beispielsweise ein vertrauenswürdiges Gerät, das nicht so leicht dupliziert werden kann, wie ein Telefon oder ein Hardwareschlüssel. • Etwas, das Sie sind – biometrische Daten wie ein Fingerabdruck oder ein Gesichtsscan. Die folgenden zusätzlichen Überprüfungsformen können mit Azure Multi-Factor Authentication verwendet werden: • Microsoft Authenticator-App • OATH-Hardware-Token • SMS • Sprachanruf"
  },
  {
    type: "yesno",
    id: "real-yn-31",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Wenn Sie zwei virtuelle Azure-Computer erstellen, die die B2S-Größe verwenden, ... die gleichen monatlichen Kosten", correct: "Nein" },
      { text: "Wenn ein virtueller Azure-Computer gestoppt wird, zahlen Sie weiterhin ... virtueller Computer", correct: "Ja" },
      { text: "Azure bietet Flexibilität zwischen Investitionsausgaben (CapEx) und ... (OpEx)", correct: "Nein" },
    ],
    explanation: "IT- und Finanzorganisationen müssen sich darauf einigen, wie sie sich flexibel an schnell wechselnde Anforderungen anpassen und gleichzeitig eine schlanke Kostenstruktur für schwierige Marktbedingungen sicherstellen können. Angesichts dieses doppelten Fokus ist es wichtig, nicht nur die technischen Vorteile einer Cloud-Umstellung zu verstehen, sondern auch die damit verbundenen finanziellen und wirtschaftlichen Chancen. Investitionsansätze • Investitionsausgaben (CapEx): Unter CapEx versteht man die anfänglichen Ausgaben für die physische Infrastruktur, die dann im Laufe der Zeit von der Steuer abgezogen werden. CapEx sind Vorabkosten, deren Wert mit der Zeit sinkt. • Betriebsausgaben (OpEx): Unter OpEx versteht man die Ausgaben für Dienstleistungen oder Produkte, die sofort in Rechnung gestellt werden und die wir im selben Jahr von der Steuer absetzen können. Es fallen keine Vorabkosten an, da wir für eine Dienstleistung oder ein Produkt erst zahlen, wenn wir es nutzen. Beim Cloud Computing werden viele der mit einem lokalen Rechenzentrum verbundenen Kosten auf den Dienstanbieter verlagert. Die Kosten für virtuelle Azure-Maschinen hängen in erster Linie von der Nutzungsdauer ab. Wenn Sie Azure-VMs stoppen und in den Zustand „Gestoppt (Freigegeben)“ versetzen, zahlen Sie weiterhin für die Nutzung des Azure-Speicherkontos (aber nicht für die Rechenleistung). Denken Sie daran, dass das Speicherkonto der Speicherort der VM-VHD-Imagedatei ist. Beim Stoppen der VM bleiben alle Einstellungen/Konfigurationen der VM sowie das im Azure-Speicher gespeicherte VHD-Image erhalten. Dadurch entstehen zwar weiterhin Kosten für den Speicher, Sie sparen aber zumindest VM-Ressourcen."
  },
  {
    type: "yesno",
    id: "real-yn-30",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.",
    statements: [
      { text: "Eine Plattform ... bietet die Möglichkeit, die Plattform automatisch zu skalieren", correct: "Ja" },
      { text: "Eine Plattform ... bietet professionelle Entwicklungsdienste, um benutzerdefinierten Anwendungen kontinuierlich Funktionen hinzuzufügen", correct: "Ja" },
      { text: "Eine Plattform ... bietet die vollständige Kontrolle über die Betriebssysteme, auf denen Anwendungen gehostet werden", correct: "Nein" },
    ],
    explanation: "Azure App Services abstrahieren die Bereitstellung und Verwaltung von Web-Apps vom Webserver. Sie benötigen keinen Zugriff auf den zugrunde liegenden Webserver. Azure App Services ermöglichen horizontale und vertikale Skalierung. Azure App Services bietet Bereitstellungsslots für die Entwicklung und einfache Bereitstellung von Updates und neuen Funktionen."
  },
  {
    type: "matching",
    id: "real-match-1",
    topicId: "cloud-konzepte",
    prompt: "Ordnen Sie die Ressourcen den entsprechenden Beschreibungen zu.",
    instructions:
      "Ordnen Sie jede Ressource der passenden Beschreibung zu. Jede Ressource kann einmal, mehrmals oder gar nicht verwendet werden. HINWEIS: Jede richtige Zuordnung zählt einen Punkt.",
    items: [
      { id: "dpa", label: "Data Protection Addendum" },
      { id: "privacy", label: "Microsoft Privacy Statement" },
      { id: "ost", label: "Online Services Terms" },
    ],
    descriptions: [
      {
        id: "d1",
        text: "Beschreibt, welche personenbezogenen Daten gesammelt werden, wie die Daten verwendet werden und wofür die Daten verwendet werden.",
        correctItemId: "privacy",
      },
      {
        id: "d2",
        text: "Ein rechtsverbindlicher Vertrag, der die Verpflichtungen zwischen Microsoft und einem Kunden in Bezug auf die Verarbeitung und Sicherheit von Kunden- und personenbezogenen Daten festlegt.",
        correctItemId: "dpa",
      },
      {
        id: "d3",
        text: "Definiert die Datenverarbeitungs- und Sicherheitsbedingungen für Online-Dienste, einschließlich der Offenlegung verarbeiteter Daten sowie der Übertragung, Aufbewahrung und Löschung von Daten.",
        correctItemId: "ost",
      },
    ],
    explanation:
      "Das Microsoft Privacy Statement beschreibt, welche personenbezogenen Daten gesammelt und wie sie verwendet werden. Das Data Protection Addendum (DPA) ist der rechtsverbindliche Vertrag zu Verarbeitung und Sicherheit von Kundendaten. Die Online Services Terms (OST) definieren die Datenverarbeitungs- und Sicherheitsbedingungen für die Online-Dienste selbst.",
  },
];
