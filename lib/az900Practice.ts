// Practice-question data for AZ-900 (Microsoft Azure Fundamentals).
//
// AZ900_QUESTIONS now contains REAL exam-prep questions extracted directly
// from the user's authoritative German PDF (Pruefungsfragen_AZ-900_De.pdf,
// 564 questions total, one per PDF page in reverse page order — page N =
// Frage (565-N)). Extraction/parsing script + intermediate JSON live in the
// sandbox at /home/claude/az900_extract/ (parse3.py, parsed_q1_100.json)
// for reference when extracting the next batch.
//
// PROGRESS: questions 1-100 of 564 done (real-az900-1 .. real-az900-100).
// TODO next: extract 101-200, 201-300, ... 501-564 the same way (PDF pages
// 365-464, 265-364, ..., 1-64) and append to this array with the same
// `real-az900-<n>` id scheme and topicId mapping:
//   "Beschreiben von Cloud-Konzepten"            -> "cloud-konzepte"
//   "Beschreiben Sie die Azure-Architektur..."   -> "azure-architektur"
//   "Beschreiben Sie Azure-Management..."        -> "azure-verwaltung"
// Section sizing (lib/practiceSections.ts) is fully automatic — once all
// 564 are in, it will produce 12 sections of 50 (last one with 14) with no
// further code changes needed.

export type PracticeOptionId = "A" | "B" | "C" | "D" | "E" | "F";

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
    id: "real-az900-1",
    topicId: "azure-architektur",
    prompt: "Sie planen, ein Netzlaufwerk mehrerer Computer mit Windows 10 Azure Storage zuzuordnen. Sie müssen in Azure eine Speicherlösung für das geplante zugeordnete Laufwerk erstellen. Was sollten Sie erstellen?",
    options: [
      { id: "A", text: "Eine Azure SQL-Datenbank" },
      { id: "B", text: "Eine Datenfestplatte für virtuelle Maschinen" },
      { id: "C", text: "Ein Dateidienst in einem Speicherkonto" },
      { id: "D", text: "Ein Blobs-Dienst in einem Speicherkonto" },
    ],
    correct: "C",
    explanation: "Azure Files bietet vollständig verwaltete Dateifreigaben in der Cloud, auf die über das branchenübliche Server Message Block (SMB)-Protokoll oder das Network File System (NFS)-Protokoll zugegriffen werden kann. Azure-Dateifreigaben können gleichzeitig von Cloud- oder lokalen Bereitstellungen eingebunden werden. Auf Azure Files SMB-Dateifreigaben kann von Windows-, Linux- und macOS-Clients zugegriffen werden. Auf Azure Files NFS-Dateifreigaben kann von Linux- oder macOS-Clients zugegriffen werden. Darüber hinaus können Azure Files SMB-Dateifreigaben mit Azure File Sync auf Windows-Servern zwischengespeichert werden, um einen schnellen Zugriff in der Nähe des Datennutzungsorts zu ermöglichen.",
  },
  {
    id: "real-az900-2",
    topicId: "azure-verwaltung",
    prompt: "Ihr Unternehmen plant die Bereitstellung einer KI-Lösung (künstliche Intelligenz) in Azure. Was sollte das Unternehmen zum Erstellen, Testen und Bereitstellen von Predictive Analytics-Lösungen verwenden?",
    options: [
      { id: "A", text: "Azure Logic Apps" },
      { id: "B", text: "Azure Machine Learning Studio" },
      { id: "C", text: "Azure Batch" },
      { id: "D", text: "Azure Cosmos DB" },
    ],
    correct: "B",
    explanation: "Maschinelles Lernen ist eine datenwissenschaftliche Technik, die es Computern ermöglicht, anhand vorhandener Daten zukünftige Verhaltensweisen, Ergebnisse und Trends vorherzusagen. Durch maschinelles Lernen lernen Computer, ohne explizit programmiert zu werden. Prognosen oder Vorhersagen durch maschinelles Lernen können Apps und Geräte intelligenter machen. Wenn Sie beispielsweise online einkaufen, hilft Ihnen maschinelles Lernen dabei, Ihnen basierend auf Ihren Einkäufen andere Produkte zu empfehlen, die Sie interessieren könnten. Oder wenn Ihre Kreditkarte durchgezogen wird, vergleicht maschinelles Lernen die Transaktion mit einer Datenbank von Transaktionen und hilft bei der Erkennung von Betrug. Und wenn Ihr Roboterstaubsauger einen Raum saugt, hilft ihm maschinelles Lernen bei der Entscheidung, ob die Arbeit erledigt ist. Azure Machine Learning Studio ist ein Webportal in Azure Machine Learning für Low-Code- und No-Code-Optionen für Modelltraining, Bereitstellung und Assetverwaltung. Das Studio ist für ein nahtloses Erlebnis in das Azure Machine Learning SDK integriert.",
  },
  {
    id: "real-az900-3",
    topicId: "azure-verwaltung",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Azure-Richtlinien bieten eine gemeinsame Plattform für die Bereitstellung von Objekten in einer Cloud-Infrastruktur und für die Implementierung von Konsistenz in der gesamten Azure-Umgebung. ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, die die Aussage richtig macht.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "Ressourcengruppen bieten" },
      { id: "C", text: "Azure Resource Manager bietet" },
      { id: "D", text: "Managementgruppen bieten" },
    ],
    correct: "C",
    explanation: "Azure Resource Manager ist der Bereitstellungs- und Verwaltungsdienst für Azure. Er bietet eine Verwaltungsebene, mit der Sie Ressourcen in Ihrem Azure-Konto erstellen, aktualisieren und löschen können. Mit Verwaltungsfunktionen wie Zugriffssteuerung, Sperren und Tags können Sie Ihre Ressourcen nach der Bereitstellung sichern und organisieren.",
  },
  {
    id: "real-az900-4",
    topicId: "azure-architektur",
    prompt: "Ihr Unternehmen verfügt über mehrere Geschäftsbereiche. Jeder Geschäftsbereich benötigt 20 verschiedene Azure-Ressourcen für den täglichen Betrieb. Alle Geschäftsbereiche benötigen denselben Typ von Azure-Ressourcen. Sie benötigen eine Lösung zur Automatisierung der Erstellung der Azure-Ressourcen. Was sollten Sie in die Empfehlungen aufnehmen?",
    options: [
      { id: "A", text: "Azure Resource Manager-Vorlagen" },
      { id: "B", text: "VM-Skalierungsgruppen" },
      { id: "C", text: "Der Azure API Management-Dienst" },
      { id: "D", text: "Verwaltungsgruppen" },
    ],
    correct: "A",
    explanation: "Azure Resource Manager ist der Bereitstellungs- und Verwaltungsdienst für Azure. Er bietet eine Verwaltungsebene, mit der Sie Ressourcen in Ihrem Azure-Konto erstellen, aktualisieren und löschen können. Mit Verwaltungsfunktionen wie Zugriffssteuerung, Sperren und Tags sichern und organisieren Sie Ihre Ressourcen nach der Bereitstellung. Eine Azure Resource Manager-Vorlage (ARM) ist eine JSON-Datei (JavaScript Object Notation), die eine oder mehrere Ressourcen definiert, die in einer Ressourcengruppe, einem Abonnement, einer Verwaltungsgruppe oder einem Mandanten bereitgestellt werden sollen. Mit der Vorlage können die Ressourcen konsistent und wiederholt bereitgestellt werden.",
  },
  {
    id: "real-az900-5",
    topicId: "azure-verwaltung",
    prompt: "Welchen Azure-Dienst sollten Sie verwenden, um Ereignisse aus mehreren Ressourcen in einem zentralen Repository zu korrelieren?",
    options: [
      { id: "A", text: "Azure Event Hubs" },
      { id: "B", text: "Azure Analysis Services" },
      { id: "C", text: "Azure Monitor" },
      { id: "D", text: "Azure Log Analytics" },
    ],
    correct: "D",
    explanation: "Log Analytics ist das primäre Tool im Azure-Portal zum Schreiben von Protokollabfragen und zur interaktiven Analyse der Ergebnisse. Auch wenn eine Protokollabfrage an anderer Stelle in Azure Monitor verwendet wird, schreiben und testen Sie die Abfrage in der Regel zuerst mit Log Analytics. Sie können Log Analytics von mehreren Stellen im Azure-Portal aus starten.",
  },
  {
    id: "real-az900-6",
    topicId: "azure-architektur",
    prompt: "Einige Fragensätze enthalten möglicherweise mehrere richtige Lösungen, während andere möglicherweise keine richtige Lösung enthalten. Stellen Sie fest, ob die Lösung die angegebenen Ziele erreicht. Ihre Azure-Umgebung enthält mehrere virtuelle Azure-Computer. Sie müssen sicherstellen, dass ein virtueller Computer namens VM1 über HTTP aus dem Internet erreichbar ist. Lösung: Sie ändern einen DDoS-Schutzplan. Erreicht dies das Ziel?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "B",
    explanation: "Wir müssen sicherstellen, dass eingehender HTTP-Verkehr aus dem Internet alle Firewalls und Netzwerksicherheitsgruppen (NSGs) passieren kann, die für VM1 gelten.",
  },
  {
    id: "real-az900-7",
    topicId: "azure-architektur",
    prompt: "Einige Fragensätze haben möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Stellen Sie fest, ob die Lösung die angegebenen Ziele erreicht. Ihre Azure-Umgebung enthält mehrere virtuelle Azure-Computer. Sie müssen sicherstellen, dass ein virtueller Computer namens VM1 über HTTP aus dem Internet erreichbar ist. Lösung: Sie ändern eine Azure-Firewall. Erreicht dies das Ziel?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "A",
    explanation: "Wir müssen sicherstellen, dass eingehender HTTP-Verkehr aus dem Internet alle Firewalls und Netzwerksicherheitsgruppen (NSGs) passieren kann, die für VM1 gelten.",
  },
  {
    id: "real-az900-8",
    topicId: "azure-architektur",
    prompt: "Einige Fragensätze enthalten möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung enthalten. Stellen Sie fest, ob die Lösung die angegebenen Ziele erreicht. Ihre Azure-Umgebung enthält mehrere virtuelle Azure-Computer. Sie müssen sicherstellen, dass ein virtueller Computer namens VM1 über HTTP aus dem Internet erreichbar ist. Lösung: Sie ändern ein Azure Traffic Manager-Profil. Wird damit das Ziel erreicht?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "B",
    explanation: "Wir müssen sicherstellen, dass eingehender HTTP-Verkehr aus dem Internet alle Firewalls und Netzwerksicherheitsgruppen (NSGs) passieren kann, die für VM1 gelten.",
  },
  {
    id: "real-az900-9",
    topicId: "cloud-konzepte",
    prompt: "Welche zwei Merkmale hat die öffentliche Cloud? (Jede richtige Antwort stellt eine Komplettlösung dar. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    options: [
      { id: "A", text: "Dedizierte Hardware" },
      { id: "B", text: "Ungesicherte Verbindungen" },
      { id: "C", text: "Begrenzter Speicherplatz" },
      { id: "D", text: "Verbrauchsabhängige Preise" },
      { id: "E", text: "Self-Service-Verwaltung" },
    ],
    correct: "D",
    explanation: "Zu den Merkmalen und Vorteilen des Cloud Computing gehören die folgenden. • On-Demand-Self-Service • Umfassender Netzwerkzugriff • Mandantenfähigkeit und Ressourcenpooling • Schnelle Elastizität und Skalierbarkeit • Gemessener Service",
  },
  {
    id: "real-az900-10",
    topicId: "azure-architektur",
    prompt: "Einige Fragensätze enthalten möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Bestimmen Sie, ob die Lösung die angegebenen Ziele erreicht. Ein Azure-Administrator plant, ein PowerShell-Skript auszuführen, das Azure-Ressourcen erstellt. Sie müssen empfehlen, welche Computerkonfiguration zum Ausführen des Skripts verwendet werden soll. Lösung: Führen Sie das Skript von einem Computer aus, auf dem Linux läuft und auf dem die Azure CLI-Tools installiert sind. Wird damit das Ziel erreicht?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "B",
    explanation: "Die Azure-Befehlszeilenschnittstelle (Azure CLI) umfasst eine Reihe von Befehlen zum Erstellen und Verwalten von Azure-Ressourcen. Azure CLI ist eine Alternative zu Azure PowerShell. Azure PowerShell ist für die Verwaltung von Azure-Ressourcen über die Befehlszeile konzipiert. Verwenden Sie Azure PowerShell, wenn Sie automatisierte Tools erstellen möchten, die das Azure Resource Manager-Modell verwenden. Testen Sie Azure PowerShell in Ihrem Browser mit Azure Cloud Shell oder installieren Sie es auf Ihrem lokalen Computer.",
  },
  {
    id: "real-az900-11",
    topicId: "azure-architektur",
    prompt: "Einige Fragensätze enthalten möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Bestimmen Sie, ob die Lösung die angegebenen Ziele erreicht. Ein Azure-Administrator plant, ein PowerShell-Skript auszuführen, das Azure-Ressourcen erstellt. Sie müssen empfehlen, welche Computerkonfiguration zum Ausführen des Skripts verwendet werden soll. Lösung: Führen Sie das Skript von einem Computer aus, auf dem Chrome OS ausgeführt wird und der Azure Cloud Shell verwendet. Wird damit das Ziel erreicht?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "A",
    explanation: "Azure PowerShell ist für die Verwaltung von Azure-Ressourcen über die Befehlszeile konzipiert. Verwenden Sie Azure PowerShell, wenn Sie automatisierte Tools erstellen möchten, die das Azure Resource Manager-Modell verwenden. Testen Sie es in Ihrem Browser mit Azure Cloud Shell oder installieren Sie es auf Ihrem lokalen Computer.",
  },
  {
    id: "real-az900-12",
    topicId: "azure-architektur",
    prompt: "Einige Fragensätze haben möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Bestimmen Sie, ob die Lösung die angegebenen Ziele erreicht. Ein Azure-Administrator plant, ein PowerShell-Skript auszuführen, das Azure-Ressourcen erstellt. Sie müssen empfehlen, welche Computerkonfiguration zum Ausführen des Skripts verwendet werden soll. Lösung: Führen Sie das Skript von einem Computer aus, auf dem macOS läuft und auf dem PowerShell Core 6.0 installiert ist. Wird damit das Ziel erreicht?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "A",
    explanation: "Azure PowerShell ist für die Verwaltung von Azure-Ressourcen über die Befehlszeile konzipiert. Verwenden Sie Azure PowerShell, wenn Sie automatisierte Tools erstellen möchten, die das Azure Resource Manager-Modell verwenden. Testen Sie es in Ihrem Browser mit Azure Cloud Shell oder installieren Sie es auf Ihrem lokalen Computer. Das Azure PowerShell-Modul kann auf Windows-, macOS- und Linux-Plattformen installiert werden.",
  },
  {
    id: "real-az900-13",
    topicId: "azure-verwaltung",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Ihr Azure-Testkonto ist letzte Woche abgelaufen. Sie können jetzt keine weiteren Azure Active Directory (Azure AD)-Benutzerkonten mehr erstellen . ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, die die Aussage richtig macht.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "Starten einer vorhandenen Azure-VM" },
      { id: "C", text: "Greifen Sie auf Ihre in Azure gespeicherten Daten zu" },
      { id: "D", text: "Zugriff auf das Azure-Portal" },
    ],
    correct: "B",
    explanation: "Wenn Ihr Azure-Testkonto abgelaufen ist, können Sie weiterhin Azure AD-Benutzerkonten erstellen. Die Aussage ist daher nicht korrekt und muss geändert werden. Sie können eine vorhandene virtuelle Azure-Maschine nicht starten, wenn das Abonnement, das die VM enthält, abgelaufen ist. Wenn die VM bei Ablauf des Abonnements ausgeführt wird, wird sie heruntergefahren.",
  },
  {
    id: "real-az900-14",
    topicId: "azure-architektur",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er richtig ist. Sie haben mehrere virtuelle Maschinen in einem Azure-Abonnement. Sie erstellen ein neues Abonnement. Die virtuellen Maschinen können nicht in das neue Abonnement verschoben werden . ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch richtig ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, mit der die Aussage richtig ist.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich." },
      { id: "B", text: "Die virtuellen Maschinen können in das neue Abonnement verschoben werden." },
      { id: "C", text: "Die virtuellen Maschinen können nur dann in das neue Abonnement verschoben werden, wenn sie sich alle in derselben Ressourcengruppe befinden." },
      { id: "D", text: "Die virtuellen Maschinen können nur dann in das neue Abonnement verschoben werden, wenn sie Windows Server 2016 ausführen." },
    ],
    correct: "B",
    explanation: "VMs können zwischen Abonnements verschoben werden. Unabhängig davon, welches Betriebssystem sie ausführen oder in welcher Ressourcengruppe sie sich befinden.",
  },
  {
    id: "real-az900-15",
    topicId: "azure-verwaltung",
    prompt: "Welche zwei Kundentypen sind berechtigt, Azure Government zur Entwicklung einer Cloud-Lösung zu verwenden? (Jede richtige Antwort stellt eine vollständige Lösung dar. Hinweis: Jede richtige Auswahl ist einen Punkt wert.)",
    options: [
      { id: "A", text: "Ein Auftragnehmer der kanadischen Regierung" },
      { id: "B", text: "Ein europäischer Regierungsauftragnehmer" },
      { id: "C", text: "Eine Regierungsbehörde der Vereinigten Staaten" },
      { id: "D", text: "Ein Auftragnehmer der US-Regierung" },
      { id: "E", text: "Eine europäische Regierungsbehörde" },
    ],
    correct: "C",
    explanation: "Azure Government ist eine Cloud-Umgebung, die speziell entwickelt wurde, um die Compliance- und Sicherheitsanforderungen der US-Regierung zu erfüllen. Diese unternehmenskritische Cloud bietet Kunden der US-Regierung und ihren Partnern bahnbrechende Innovationen. Azure Government gilt für Behörden aller Ebenen – von bundesstaatlichen und lokalen Behörden bis hin zu Bundesbehörden, einschließlich der Behörden des Verteidigungsministeriums. Obwohl es im öffentlichen Sektor zahlreiche Cloud-Anbieter gibt, können nicht viele die einzigartigen Funktionen bieten, die von staatlichen, lokalen und bundesstaatlichen Behörden benötigt werden. Azure Government bietet hybride Flexibilität, umfassende Sicherheit und umfassende Compliance-Abdeckung für alle gesetzlichen Standards. Der Hauptunterschied zwischen Microsoft Azure und Microsoft Azure Government besteht darin, dass Azure Government eine souveräne Cloud ist. Es handelt sich um eine physisch getrennte Instanz von Azure, die ausschließlich für die Workloads der US-Regierung bestimmt ist. Sie wurde exklusiv für Regierungsbehörden und ihre Lösungsanbieter entwickelt. Azure Government ist für hochsensible Daten konzipiert und ermöglicht Regierungskunden die sichere Übertragung unternehmenskritischer Workloads in die Cloud.",
  },
  {
    id: "real-az900-16",
    topicId: "azure-architektur",
    prompt: "Sie müssen sicherstellen, dass Azure Active Directory-Benutzer (Azure AD), die sich über eine anonyme IP-Adresse aus dem Internet mit Azure AD verbinden, automatisch aufgefordert werden, ihr Kennwort zu ändern. Welchen Azure-Dienst sollten Sie verwenden?",
    options: [
      { id: "A", text: "Azure AD Connect-Integrität" },
      { id: "B", text: "Azure AD Privileged Identity Management" },
      { id: "C", text: "Azure Advanced Threat Protection (ATP)" },
      { id: "D", text: "Azure AD-Identitätsschutz" },
    ],
    correct: "D",
    explanation: "Identity Protection identifiziert Risiken in den folgenden Klassifizierungen: Die Risikosignale können Abhilfemaßnahmen auslösen, z. B. indem Benutzer aufgefordert werden, die Azure Multi-Factor Authentication durchzuführen, ihr Kennwort mithilfe der Self-Service-Kennwortzurücksetzung zurückzusetzen oder die Anwendung zu blockieren, bis ein Administrator Maßnahmen ergreift.br/>",
  },
  {
    id: "real-az900-17",
    topicId: "azure-architektur",
    prompt: "Ihr Unternehmen plant die Bereitstellung mehrerer Webserver und Datenbankserver in Azure. Sie benötigen eine Azure-Lösung, um die Verbindungsarten zwischen Webservern und Datenbankservern zu begrenzen. Was sollte Ihre Empfehlung beinhalten?",
    options: [
      { id: "A", text: "Netzwerksicherheitsgruppen (NSGs)" },
      { id: "B", text: "Azure Service Bus" },
      { id: "C", text: "Ein lokales Netzwerk-Gateway" },
      { id: "D", text: "Ein Routenfilter" },
    ],
    correct: "A",
    explanation: "Wir können Netzwerksicherheitsgruppen (NSGs) verwenden, um Ports und Protokolle für das Subnetz der Datenbankserver oder die VMs der Datenbankserver einzuschränken.",
  },
  {
    id: "real-az900-18",
    topicId: "azure-architektur",
    prompt: "Womit sollte sich eine Anwendung verbinden, um Sicherheitstoken abzurufen?",
    options: [
      { id: "A", text: "Ein Azure Storage-Konto" },
      { id: "B", text: "Azure Active Directory (Azure AD)" },
      { id: "C", text: "Ein Zertifikatsspeicher" },
      { id: "D", text: "Ein Azure-Schlüsseltresor" },
    ],
    correct: "B",
    explanation: "Ein zentraler Identitätsanbieter ist besonders nützlich für Apps mit Benutzern weltweit, die sich nicht unbedingt über das Unternehmensnetzwerk anmelden. Microsoft Identity Platform authentifiziert Benutzer und stellt Sicherheitstoken wie Zugriffstoken, Aktualisierungstoken und ID-Token bereit, die einer Clientanwendung den Zugriff auf geschützte Ressourcen auf einem Ressourcenserver ermöglichen. Ein Zugriffstoken ist ein Sicherheitstoken, das von einem Autorisierungsserver im Rahmen eines OAuth 2.0-Flows ausgestellt wird. Es enthält Informationen über den Benutzer und die App, für die das Token bestimmt ist. Diese können für den Zugriff auf Web-APIs und andere geschützte Ressourcen verwendet werden. Die Validierung des Tokens obliegt der App, für die das Token generiert wurde, der Web-App, die den Benutzer angemeldet hat, oder der aufgerufenen Web-API. Das Token wird vom Sicherheitstokenserver (STS) mit einem privaten Schlüssel signiert. Der STS veröffentlicht den entsprechenden öffentlichen Schlüssel. Zur Validierung eines Tokens überprüft die App die Signatur mithilfe des öffentlichen STS-Schlüssels, um sicherzustellen, dass die Signatur mit dem privaten Schlüssel erstellt wurde. Token sind nur zeitlich begrenzt gültig. In einer Azure-Umgebung fungiert Azure AD als Identitätsanbieter.",
  },
  {
    id: "real-az900-19",
    topicId: "azure-verwaltung",
    prompt: "Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Ressourcengruppen bieten Organisationen die Möglichkeit, die Compliance von Azure-Ressourcen über mehrere Abonnements hinweg zu verwalten. ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, die die Aussage richtig macht.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "Verwaltungsgruppen" },
      { id: "C", text: "Azure-Richtlinien" },
      { id: "D", text: "Azure App Service-Pläne" },
    ],
    correct: "C",
    explanation: "Azure Policy wertet Ressourcen in Azure aus, indem es die Eigenschaften dieser Ressourcen mit Geschäftsregeln vergleicht. Diese im JSON-Format beschriebenen Geschäftsregeln werden als Richtliniendefinitionen bezeichnet. Zur Vereinfachung der Verwaltung können mehrere Geschäftsregeln zu einer Richtlinieninitiative (manchmal auch als „PolicySet“ bezeichnet) zusammengefasst werden. Nachdem Ihre Geschäftsregeln erstellt wurden, wird die Richtliniendefinition oder -initiative jedem von Azure unterstützten Ressourcenbereich zugewiesen, z. B. Verwaltungsgruppen, Abonnements, Ressourcengruppen oder einzelnen Ressourcen. Die Zuweisung gilt für alle Ressourcen innerhalb dieses Bereichs. Unterbereiche können bei Bedarf ausgeschlossen werden. Azure Policy verwendet ein JSON-Format, um die Logik zu bilden, mit der die Auswertung ermittelt, ob eine Ressource konform ist oder nicht. Definitionen umfassen Metadaten und die Richtlinienregel. Die definierte Regel kann Funktionen, Parameter, logische Operatoren, Bedingungen und Eigenschaftsaliase verwenden, um genau dem gewünschten Szenario zu entsprechen. Die Richtlinienregel bestimmt, welche Ressourcen im Bereich der Zuweisung ausgewertet werden.",
  },
  {
    id: "real-az900-20",
    topicId: "azure-architektur",
    prompt: "Ihr Netzwerk enthält eine Active Directory-Gesamtstruktur mit 5.000 Benutzerkonten. Ihr Unternehmen plant, alle Netzwerkressourcen nach Azure zu migrieren und das lokale Rechenzentrum außer Betrieb zu nehmen. Sie benötigen eine Lösung, um die Auswirkungen auf die Benutzer nach der geplanten Migration zu minimieren. Was sollten Sie empfehlen?",
    options: [
      { id: "A", text: "Implementieren Sie die Azure Multi-Factor Authentication (MFA)." },
      { id: "B", text: "Synchronisieren Sie alle Active Directory-Benutzerkonten mit Azure Active Directory (Azure AD)." },
      { id: "C", text: "Weisen Sie alle Benutzer an, ihr Passwort zu ändern." },
      { id: "D", text: "Erstellen Sie für jeden Benutzer ein Gastbenutzerkonto in Azure Active Directory (Azure AD)." },
    ],
    correct: "B",
    explanation: "Durch die Synchronisierung aller Active Directory-Benutzerkonten mit Azure AD können Benutzer mit ihren gewohnten Anmeldeinformationen auf Cloud-Ressourcen zugreifen.",
  },
  {
    id: "real-az900-21",
    topicId: "azure-verwaltung",
    prompt: "Einige Fragensätze enthalten möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung enthalten. Stellen Sie fest, ob die Lösung die angegebenen Ziele erreicht. Ihr Unternehmen plant, Azure zu erwerben. Die Supportrichtlinie des Unternehmens besagt, dass die Azure-Umgebung die Möglichkeit bieten muss, Supporttechniker per Telefon oder E-Mail zu erreichen. Sie müssen empfehlen, welcher Supportplan die Anforderungen der Supportrichtlinie erfüllt. Lösung: Empfehlen Sie einen Basis-Supportplan. Erfüllt dieser das Ziel?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "B",
    explanation: "Der Zugang zum technischen Support per E-Mail und Telefon ist in allen Support-Paketen außer dem Basic-Paket enthalten.",
  },
  {
    id: "real-az900-22",
    topicId: "azure-verwaltung",
    prompt: "Einige Fragensätze enthalten möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung enthalten. Stellen Sie fest, ob die Lösung die angegebenen Ziele erreicht. Ihr Unternehmen plant, Azure zu erwerben. Die Supportrichtlinie des Unternehmens besagt, dass die Azure-Umgebung die Möglichkeit bieten muss, Supporttechniker per Telefon oder E-Mail zu erreichen. Sie müssen empfehlen, welcher Supportplan die Anforderungen der Supportrichtlinie erfüllt. Lösung: Empfehlen Sie einen Standard-Supportplan. Erfüllt dieser das Ziel?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "A",
    explanation: "Der technische Support per E-Mail und Telefon ist rund um die Uhr in allen Support-Paketen (mit Ausnahme des Basic-Pakets) enthalten.",
  },
  {
    id: "real-az900-23",
    topicId: "azure-verwaltung",
    prompt: "Einige Fragensätze enthalten möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung enthalten. Stellen Sie fest, ob die Lösung die angegebenen Ziele erreicht. Ihr Unternehmen plant, Azure zu erwerben. Die Supportrichtlinie des Unternehmens besagt, dass die Azure-Umgebung die Möglichkeit bieten muss, Supporttechniker per Telefon oder E-Mail zu erreichen. Sie müssen empfehlen, welcher Supportplan die Anforderungen der Supportrichtlinie erfüllt. Lösung: Empfehlen Sie einen Premier-Supportplan. Erfüllt dieser das Ziel?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "A",
    explanation: "Der technische Support per E-Mail und Telefon ist rund um die Uhr in allen Support-Paketen (mit Ausnahme des Basic-Pakets) enthalten.",
  },
  {
    id: "real-az900-24",
    topicId: "azure-verwaltung",
    prompt: "Ihr Unternehmen plant, bei Microsoft eine Architekturüberprüfung einer Azure-Umgebung anzufordern. Das Unternehmen verfügt derzeit über einen Basic- Supportplan. Sie möchten dem Unternehmen einen neuen Supportplan empfehlen. Die Lösung muss die Kosten minimieren. Welchen Supportplan sollten Sie empfehlen?",
    options: [
      { id: "A", text: "Premier" },
      { id: "B", text: "Entwickler" },
      { id: "C", text: "Professionelle Direkt" },
      { id: "D", text: "Standard" },
    ],
    correct: "A",
    explanation: "Während Developer und Standard allgemeine Architekturunterstützung beinhalten, umfasst der Premier-Support Architektur- und Codeüberprüfung.",
  },
  {
    id: "real-az900-25",
    topicId: "azure-verwaltung",
    prompt: "Was ist für die Verwendung von Azure Cost Management erforderlich?",
    options: [
      { id: "A", text: "Ein Dev/Test-Abonnement" },
      { id: "B", text: "Software Assurance" },
      { id: "C", text: "Ein Enterprise Agreement (EA)" },
      { id: "D", text: "Ein Pay-as-you-go-Abonnement" },
    ],
    correct: "C",
    explanation: "Durch die Nutzung der Microsoft Cloud können Sie die technische Leistung Ihrer Geschäftsworkloads deutlich verbessern. Darüber hinaus können Sie Ihre Kosten und den Verwaltungsaufwand für Unternehmensressourcen senken. Diese Geschäftsmöglichkeit birgt jedoch auch Risiken, da Ihre Cloudbereitstellungen zu Verschwendung und Ineffizienzen führen können. Azure Cost Management + Billing ist eine Suite von Tools von Microsoft, mit denen Sie die Kosten Ihrer Workloads analysieren, verwalten und optimieren können. Mithilfe dieser Suite können Sie sicherstellen, dass Ihr Unternehmen die Vorteile der Cloud optimal nutzt. Stellen Sie sich Ihre Azure-Workloads wie die Lichter in Ihrem Zuhause vor. Wenn Sie das Haus verlassen, lassen Sie das Licht an? Könnten Sie andere, effizientere Glühbirnen verwenden, um Ihre monatliche Stromrechnung zu senken? Haben Sie in einem Raum mehr Lichter als nötig? Mit Azure Cost Management + Billing können Sie einen ähnlichen Denkprozess auf die Workloads Ihres Unternehmens anwenden. Bei Azure-Produkten und -Diensten zahlen Sie nur für das, was Sie tatsächlich nutzen. Wenn Sie Azure-Ressourcen erstellen und verwenden, werden Ihnen diese in Rechnung gestellt. Da die Bereitstellung neuer Ressourcen so einfach ist, können die Kosten Ihrer Workloads ohne entsprechende Analyse und Überwachung erheblich steigen. Sie verwenden die Azure-Kostenverwaltungs- und Abrechnungsfunktionen für Folgendes: • Führen Sie Abrechnungsverwaltungsaufgaben durch, z. B. die Bezahlung Ihrer Rechnung • Verwalten des Abrechnungszugriffs auf Kosten • Laden Sie die Kosten- und Nutzungsdaten herunter, die zur Erstellung Ihrer monatlichen Rechnung verwendet wurden • Wenden Sie proaktiv Datenanalysen auf Ihre Kosten an • Legen Sie Ausgabenschwellen fest • Identifizieren Sie Möglichkeiten zur Änderung der Arbeitsbelastung, die Ihre Ausgaben optimieren können Das Azure-Portal unterstützt derzeit die folgenden Arten von Abrechnungskonten: • Microsoft Online Services-Programm: Ein individuelles Abrechnungskonto für ein Microsoft Online Services-Programm wird erstellt, wenn Sie sich über die Azure- Website für Azure registrieren. Dies kann beispielsweise der Fall sein, wenn Sie sich für ein kostenloses Azure-Konto, ein Konto mit nutzungsbasierter Bezahlung oder als Visual Studio-Abonnent registrieren. • Enterprise Agreement: Ein Abrechnungskonto für ein Enterprise Agreement wird erstellt, wenn Ihre Organisation ein Enterprise Agreement (EA) zur Verwendung von Azure unterzeichnet. • Microsoft-Kundenvereinbarung: Ein Abrechnungskonto für eine Microsoft-Kundenvereinbarung wird erstellt, wenn Ihr Unternehmen mit einem Microsoft-Vertreter zusammenarbeitet, um eine Microsoft-Kundenvereinbarung zu unterzeichnen. Einige Kunden in ausgewählten Regionen, die sich über die Azure-Website für ein Konto mit nutzungsbasierter Bezahlung anmelden oder ihr kostenloses Azure-Konto aktualisieren, verfügen möglicherweise auch über ein Abrechnungskonto für eine Microsoft-Kundenvereinbarung.",
  },
  {
    id: "real-az900-26",
    topicId: "azure-architektur",
    prompt: "Sie verfügen über eine Azure-Umgebung mit zehn virtuellen Netzwerken und 100 virtuellen Computern. Sie müssen den eingehenden Datenverkehr für alle virtuellen Azure-Netzwerke begrenzen. Was sollten Sie erstellen?",
    options: [
      { id: "A", text: "Eine Netzwerksicherheitsgruppe (NSG)" },
      { id: "B", text: "10 virtuelle Netzwerk-Gateways" },
      { id: "C", text: "10 Azure ExpressRoute-Schaltungen" },
      { id: "D", text: "Eine Azure-Firewall" },
    ],
    correct: "D",
    explanation: "Azure Firewall ist ein verwalteter, cloudbasierter Netzwerksicherheitsdienst zum Schutz Ihrer Azure Virtual Network-Ressourcen. Es handelt sich um eine vollständig zustandsbehaftete Firewall als Dienst mit integrierter Hochverfügbarkeit und uneingeschränkter Cloud-Skalierbarkeit. Sie können Anwendungs- und Netzwerkkonnektivitätsrichtlinien zentral über Abonnements und virtuelle Netzwerke hinweg erstellen, durchsetzen und protokollieren. Azure Firewall verwendet eine statische öffentliche IP-Adresse für Ihre virtuellen Netzwerkressourcen, sodass externe Firewalls den aus Ihrem virtuellen Netzwerk stammenden Datenverkehr identifizieren können. Der Dienst ist vollständig in Azure Monitor für Protokollierung und Analyse integriert.",
  },
  {
    id: "real-az900-27",
    topicId: "cloud-konzepte",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Wenn Sie planen, eine öffentliche Website zu Azure zu migrieren, müssen Sie mit monatlichen Nutzungskosten rechnen . ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, mit der die Aussage richtig ist.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich." },
      { id: "B", text: "Stellen Sie ein VPN bereit." },
      { id: "C", text: "Bezahlen Sie für die Übertragung aller Websitedaten nach Azure." },
      { id: "D", text: "Reduzieren Sie die Anzahl der Verbindungen zur Website." },
    ],
    correct: "A",
    explanation: "Das stimmt. Sie müssen für die von Ihnen genutzten Dienste monatlich bezahlen.",
  },
  {
    id: "real-az900-28",
    topicId: "cloud-konzepte",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Ein Unternehmen, das seine Infrastruktur in einer privaten Cloud hostet , kann sein Rechenzentrum außer Betrieb nehmen. ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, die die Aussage richtig macht.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich." },
      { id: "B", text: "In einer Hybrid Cloud." },
      { id: "C", text: "In der öffentlichen Cloud." },
      { id: "D", text: "Auf einem Hyper-V-Host." },
    ],
    correct: "C",
    explanation: "Wenn Sie in die Cloud wechseln, benötigen Sie kein lokales Rechenzentrum mehr.",
  },
  {
    id: "real-az900-29",
    topicId: "azure-verwaltung",
    prompt: "Ihr Unternehmen plant die Bereitstellung einer KI-Lösung (künstliche Intelligenz) in Azure. Was sollte das Unternehmen zum Erstellen, Testen und Bereitstellen von Predictive Analytics-Lösungen verwenden?",
    options: [
      { id: "A", text: "Azure Logic Apps" },
      { id: "B", text: "Azure Machine Learning Studio" },
      { id: "C", text: "Azure Batch" },
      { id: "D", text: "Azure Cosmos DB" },
    ],
    correct: "B",
    explanation: "Maschinelles Lernen ist eine datenwissenschaftliche Technik, die es Computern ermöglicht, anhand vorhandener Daten zukünftige Verhaltensweisen, Ergebnisse und Trends vorherzusagen. Durch maschinelles Lernen lernen Computer, ohne explizit programmiert zu werden. Prognosen oder Vorhersagen durch maschinelles Lernen können Apps und Geräte intelligenter machen. Wenn Sie beispielsweise online einkaufen, hilft Ihnen maschinelles Lernen dabei, Ihnen basierend auf Ihren Einkäufen andere Produkte zu empfehlen, die Sie interessieren könnten. Oder wenn Ihre Kreditkarte durchgezogen wird, vergleicht maschinelles Lernen die Transaktion mit einer Datenbank von Transaktionen und hilft bei der Erkennung von Betrug. Und wenn Ihr Roboterstaubsauger einen Raum saugt, hilft ihm maschinelles Lernen bei der Entscheidung, ob die Arbeit erledigt ist. Azure Machine Learning Studio ist ein Webportal in Azure Machine Learning für Low-Code- und No-Code-Optionen für Modelltraining, Bereitstellung und Assetverwaltung. Das Studio ist für ein nahtloses Erlebnis in das Azure Machine Learning SDK integriert.",
  },
  {
    type: "yesno",
    id: "real-az900-30",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie wahr ist. Andernfalls wählen Sie „Nein“. (Hinweis: Jede richtige Antwort ist einen Punkt wert.) Eine Plattform ... bietet die vollständige Kontrolle über die Betriebssysteme, auf denen Anwendungen gehostet werden: Ja",
    statements: [
      { text: "Eine Plattform ... bietet die Möglichkeit, die Plattform automatisch zu skalieren", correct: "Ja" },
      { text: "Eine Plattform ... bietet professionelle Entwicklungsdienste, um benutzerdefinierten Anwendungen kontinuierlich Funktionen hinzuzufügen", correct: "Ja" },
      { text: "Eine Plattform ... bietet die vollständige Kontrolle über die Betriebssysteme, auf denen Anwendungen gehostet werden", correct: "Nein" },
    ],
    explanation: "Azure App Services abstrahieren die Bereitstellung und Verwaltung von Web-Apps vom Webserver. Sie benötigen keinen Zugriff auf den zugrunde liegenden Webserver. Azure App Services ermöglichen horizontale und vertikale Skalierung. Azure App Services bietet Bereitstellungsslots für die Entwicklung und einfache Bereitstellung von Updates und neuen Funktionen.",
  },
  {
    type: "yesno",
    id: "real-az900-31",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie wahr ist. Andernfalls wählen Sie „Nein“. (Hinweis: Jede richtige Antwort ist einen Punkt wert.) Azure bietet Flexibilität zwischen Investitionsausgaben (CapEx) und ... (OpEx): Ja",
    statements: [
      { text: "Wenn Sie zwei virtuelle Azure-Computer erstellen, die die B2S-Größe verwenden, ... dieselben monatlichen Kosten", correct: "Nein" },
      { text: "Wenn ein virtueller Azure-Computer gestoppt wird, zahlen Sie weiterhin ... virtueller Computer", correct: "Ja" },
      { text: "Azure bietet Flexibilität zwischen Investitionsausgaben (CapEx) und ... (OpEx)", correct: "Nein" },
    ],
    explanation: "IT- und Finanzorganisationen müssen sich darauf einigen, wie sie sich flexibel an schnell wechselnde Anforderungen anpassen und gleichzeitig eine schlanke Kostenstruktur für schwierige Marktbedingungen sicherstellen können. Angesichts dieses doppelten Fokus ist es wichtig, nicht nur die technischen Vorteile einer Cloud-Umstellung zu verstehen, sondern auch die damit verbundenen finanziellen und wirtschaftlichen Chancen. Investitionsansätze • Investitionsausgaben (CapEx): Unter CapEx versteht man die anfänglichen Ausgaben für die physische Infrastruktur, die dann im Laufe der Zeit von der Steuer abgezogen werden. CapEx sind Vorabkosten, deren Wert mit der Zeit sinkt. • Betriebsausgaben (OpEx): Unter OpEx versteht man die Ausgaben für Dienstleistungen oder Produkte, die sofort in Rechnung gestellt werden und die wir im selben Jahr von der Steuer absetzen können. Es fallen keine Vorabkosten an, da wir für eine Dienstleistung oder ein Produkt erst zahlen, wenn wir es nutzen. Beim Cloud Computing werden viele der mit einem lokalen Rechenzentrum verbundenen Kosten auf den Dienstanbieter verlagert. Die Kosten für virtuelle Azure-Maschinen hängen in erster Linie von der Nutzungsdauer ab. Wenn Sie Azure-VMs stoppen und in den Zustand „Gestoppt (Freigegeben)“ versetzen, zahlen Sie weiterhin für die Nutzung des Azure-Speicherkontos (aber nicht für die Rechenleistung). Denken Sie daran, dass das Speicherkonto der Speicherort der VM-VHD-Imagedatei ist. Beim Stoppen der VM bleiben alle Einstellungen/Konfigurationen der VM sowie das im Azure-Speicher gespeicherte VHD-Image erhalten. Dadurch entstehen zwar weiterhin Kosten für den Speicher, Sie sparen aber zumindest VM-Ressourcen.",
  },
  {
    id: "real-az900-32",
    topicId: "azure-verwaltung",
    prompt: "Sie benötigen eine Liste der geplanten Wartungsereignisse, die die Verfügbarkeit eines Azure-Abonnements beeinträchtigen können. Welches Blade sollten Sie im Azure-Portal verwenden? (Wählen Sie zur Beantwortung das entsprechende Blade im Antwortbereich aus.)",
    options: [
      { id: "A", text: "Alle Ressourcen" },
      { id: "B", text: "Azure Active Directory" },
      { id: "C", text: "Sicherheitscenter" },
      { id: "D", text: "Azure AD Connect-Integrität" },
      { id: "E", text: "Hilfe + Support" },
      { id: "F", text: "Berater" },
    ],
    correct: "E",
    explanation: "Unter „Hilfe + Support“ können Sie die Azure Service Health überprüfen.",
  },
  {
    id: "real-az900-33",
    topicId: "azure-verwaltung",
    prompt: "Ordnen Sie die Azure-Dienste der richtigen Definition zu. (Ziehen Sie dazu den entsprechenden Azure-Dienst aus der linken Spalte in die rechte Beschreibung. Jeder Dienst kann einmal, mehrmals oder gar nicht verwendet werden. HINWEIS: Jede richtige Zuordnung zählt einen Punkt.) Platzhalter 1: Azure DevOps Platzhalter 2: Azure Advisor",
    options: [
      { id: "A", text: "Platzhalter 3: Azure Cognitive Services Platzhalter 4: Azure Applications Insights Platzhalter 1: Azure DevOps Platzhalter 2: Azure Cognitive Services" },
      { id: "B", text: "Platzhalter 3: Azure Advisor Platzhalter 4: Azure Applications Insights Platzhalter 1: Azure Advisor Platzhalter 2: Azure DevOps" },
      { id: "C", text: "Platzhalter 3: Azure Applications Insights Platzhalter 4: Azure Advisor Platzhalter 1: Azure Advisor Platzhalter 2: Azure DevOps" },
      { id: "D", text: "Platzhalter 3: Azure Cognitive Services Platzhalter 4: Azure Applications Insights Platzhalter 1: Azure DevOps Platzhalter 2: Azure Applications Insights" },
      { id: "E", text: "Platzhalter 3: Azure Advisor Platzhalter 4: Azure Cognitive Services Platzhalter 1: Azure Cognitive Services Platzhalter 2: Azure Advisor" },
      { id: "F", text: "Platzhalter 3: Azure Applications Insights Platzhalter 4: Azure DevOps" },
    ],
    correct: "A",
    explanation: "Azure Advisor Advisor ist ein personalisierter Cloud-Berater, der Sie bei der Umsetzung bewährter Methoden zur Optimierung Ihrer Azure-Bereitstellungen unterstützt. Er analysiert Ihre Ressourcenkonfiguration und Nutzungstelemetrie und empfiehlt Ihnen Lösungen zur Verbesserung von Kosteneffizienz, Leistung, Zuverlässigkeit (früher Hochverfügbarkeit genannt) und Sicherheit Ihrer Azure-Ressourcen. Azure Cognitive Services Cognitive Services bringt KI für jeden Entwickler in Reichweite – ohne Machine-Learning-Kenntnisse. Ein API-Aufruf genügt, um die Fähigkeit zum Sehen, Hören, Sprechen, Suchen, Verstehen und Beschleunigen der Entscheidungsfindung in Ihre Apps zu integrieren. Azure Applications Insights Application Insights, eine Funktion von Azure Monitor, ist ein erweiterbarer Dienst zur Anwendungsleistungsverwaltung (Application Performance Management, APM) für Entwickler und DevOps-Experten. Nutzen Sie ihn zur Überwachung Ihrer Live-Anwendungen. Er erkennt automatisch Leistungsanomalien und enthält leistungsstarke Analysetools, die Ihnen bei der Diagnose von Problemen helfen und Ihnen helfen zu verstehen, was Benutzer tatsächlich mit Ihrer App tun. Er wurde entwickelt, um Ihnen zu helfen, Leistung und Benutzerfreundlichkeit kontinuierlich zu verbessern. Er funktioniert für Apps auf einer Vielzahl von Plattformen, darunter .NET, Node.js, Java und Python, die lokal, hybrid oder in einer öffentlichen Cloud gehostet werden. Es lässt sich in Ihren DevOps-Prozess integrieren und verfügt über Verbindungspunkte zu einer Vielzahl von Entwicklungstools. Durch die Integration mit Visual Studio App Center kann es Telemetriedaten von mobilen Apps überwachen und analysieren. Azure DevOps Azure DevOps bietet Entwicklerdienste, um Teams bei der Arbeitsplanung, der gemeinsamen Codeentwicklung sowie beim Erstellen und Bereitstellen von Anwendungen zu unterstützen. Entwickler können in der Cloud mit Azure DevOps Services oder lokal mit Azure DevOps Server arbeiten. Azure DevOps Server hieß früher Visual Studio Team Foundation Server (TFS). Azure DevOps bietet integrierte Funktionen, auf die Sie über Ihren Webbrowser oder IDE-Client zugreifen können.",
  },
  {
    id: "real-az900-34",
    topicId: "azure-architektur",
    prompt: "Sie planen die Implementierung einer Azure-Datenbanklösung. Sie müssen eine Datenbanklösung implementieren, die die folgenden Anforderungen erfüllt: • Kann Daten aus mehreren Regionen gleichzeitig hinzufügen • Kann JSON-Dokumente speichern Welchen Datenbankdienst sollten Sie einsetzen? (Wählen Sie zur Beantwortung den entsprechenden Dienst im Antwortbereich aus.)",
    options: [
      { id: "A", text: "Azure Cosmos DB" },
      { id: "B", text: "SQL-Server" },
      { id: "C", text: "Azure SQL" },
      { id: "D", text: "Azure Database für PostgreSQL-Server" },
      { id: "E", text: "Azure Database für MariaDB-Server" },
      { id: "F", text: "Datenfabriken" },
    ],
    correct: "A",
    explanation: "Azure Cosmos DB eignet sich hervorragend zum Speichern unstrukturierter und JSON-Daten. In Kombination mit Azure Functions ermöglicht Cosmos DB die schnelle und einfache Datenspeicherung mit deutlich weniger Code als in einer relationalen Datenbank.",
  },
  {
    id: "real-az900-35",
    topicId: "cloud-konzepte",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Wenn Sie eine Software-as-a-Service-Lösung (SaaS) implementieren, sind Sie für die Konfiguration der Hochverfügbarkeit verantwortlich . ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, mit der die Aussage richtig ist.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "Definieren von Skalierbarkeitsregeln" },
      { id: "C", text: "Installieren der SaaS-Lösung" },
      { id: "D", text: "Konfigurieren der SaaS-Lösung" },
    ],
    correct: "D",
    explanation: "Software as a Service (SaaS) ist ein Softwarelizenzierungs- und Bereitstellungsmodell, bei dem Software an einen Benutzer lizenziert wird. Der Zugriff auf die Software bzw. Anwendung erfolgt über das Internet und einen Webbrowser. Sie müssen die Software nicht lokal installieren und warten. Sie können sofort mit der Konfiguration und Nutzung beginnen.",
  },
  {
    id: "real-az900-36",
    topicId: "cloud-konzepte",
    prompt: "Sie verfügen über ein lokales Netzwerk mit mehreren Servern. Sie planen, alle Server zu Azure zu migrieren. Sie benötigen eine Lösungsempfehlung, um sicherzustellen, dass einige Server verfügbar bleiben, wenn ein einzelnes Azure-Rechenzentrum für längere Zeit offline ist. Was sollte die Empfehlung enthalten?",
    options: [
      { id: "A", text: "Fehlertoleranz" },
      { id: "B", text: "Elastizität" },
      { id: "C", text: "Skalierbarkeit" },
      { id: "D", text: "Geringe Latenz" },
    ],
    correct: "A",
    explanation: "Fehlertolerante Technologie ermöglicht es Computersystemen, elektronischen Systemen oder Netzwerken, trotz Ausfall einer oder mehrerer Komponenten einen unterbrechungsfreien Betrieb zu gewährleisten. Fehlertoleranz behebt auch potenzielle Serviceunterbrechungen aufgrund von Software- oder Logikfehlern. Ziel ist es, katastrophale Ausfälle zu verhindern, die durch einen einzelnen Fehlerpunkt verursacht werden könnten.",
  },
  {
    id: "real-az900-37",
    topicId: "cloud-konzepte",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Ein Unternehmen, das seine Infrastruktur in einer privaten Cloud hostet , kann sein Rechenzentrum außer Betrieb nehmen. ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, die die Aussage richtig macht.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "In einer Hybrid Cloud" },
      { id: "C", text: "In der Public Cloud" },
      { id: "D", text: "Auf einem Hyper-V-Host" },
    ],
    correct: "C",
    explanation: "Wenn Sie Cloud-basierte Software nutzen, können Sie jederzeit und überall über das Internet auf das System zugreifen. Sie benötigen lediglich eine Internetverbindung und die Möglichkeit, sich über einen Webbrowser in das System einzuloggen. Sie können einen Desktop-Computer, ein Smartphone oder einen PC verwenden. Egal ob im Büro, zu Hause oder am Flughafen – Hauptsache WLAN. Vor der Einführung von Cloud Computing benötigten Unternehmen eigene Server oder Hardware vor Ort, um Softwareanwendungen nutzen zu können. Sie mussten eine CD auf Ihrem PC installieren, um sie nutzen zu können. Aus IT-Sicht müssen Teams keine eigene Hard- und Software mehr besitzen und betreiben. Anders ausgedrückt: Sie benötigen kein umfassendes Fachwissen, um ihre Ressourcen einzurichten, zu warten und zu sichern. Ein Cloud-Service-Provider hingegen ist ein Drittanbieter, der Ihre Software auf Remote-Servern hostet, wo er Ihre Daten speichert und verarbeitet. Diese Server befinden sich in Rechenzentren auf der ganzen Welt. Cloud Computing kann helfen, IT-Servicekosten zu sparen, da der Anbieter die Computersystemdienste für mehrere Unternehmen verwaltet und bereitstellt. Kurz gesagt: Cloud Computing ist ein Netzwerk von Remote-Servern im Internet, die anstelle eines lokalen Servers Daten speichern und verarbeiten. Ihre öffentlichen Cloud-Ressourcen können problemlos außer Betrieb genommen werden.",
  },
  {
    id: "real-az900-38",
    topicId: "azure-verwaltung",
    prompt: "Ordnen Sie den Azure-Dienst der richtigen Definition zu. (Ziehen Sie dazu den entsprechenden Azure-Dienst aus der linken Spalte in die rechte Beschreibung. Jeder Dienst kann einmal, mehrmals oder gar nicht verwendet werden. HINWEIS: Jede richtige Auswahl zählt einen Punkt.) Platzhalter 1: Azure Functions Platzhalter 2: Azure Applications Insights",
    options: [
      { id: "A", text: "Platzhalter 3: Azure Databricks Platzhalter 4: Azure App Service Platzhalter 1: Azure Databricks Platzhalter 2: Azure Functions" },
      { id: "B", text: "Platzhalter 3: Azure Applications Insights Platzhalter 4: Azure App Service Platzhalter 1: Azure Functions Platzhalter 2: Azure Databricks" },
      { id: "C", text: "Platzhalter 3: Azure Applications Insights Platzhalter 4: Azure App Service Platzhalter 1: Azure App Service Platzhalter 2: Azure Applications Insights" },
      { id: "D", text: "Platzhalter 3: Azure Databricks Platzhalter 4: Azure Databricks Platzhalter 1: Azure Applications Insights Platzhalter 2: Azure Databricks" },
      { id: "E", text: "Platzhalter 3: Azure App Service Platzhalter 4: Azure App Service Platzhalter 1: Azure Functions Platzhalter 2: Azure Functions" },
      { id: "F", text: "Platzhalter 3: Azure Applications Insights Platzhalter 4: Azure App Service" },
    ],
    correct: "C",
    explanation: "Microsoft Azure Databricks bietet Data-Science- und Data-Engineering-Teams eine schnelle, einfache und kollaborative Spark-basierte Plattform auf Azure. Azure-Benutzer erhalten damit eine zentrale Plattform für die Verarbeitung von Big Data und maschinelles Lernen. Azure Functions ist eine ereignisgesteuerte Compute-on-Demand-Lösung, die die vorhandene Azure-Anwendungsplattform um Funktionen zur Implementierung von Code erweitert, der durch Ereignisse in Azure, Drittanbieterdiensten sowie lokalen Systemen ausgelöst wird. Azure App Service ist ein HTTP-basierter Dienst zum Hosten von Webanwendungen, REST-APIs und mobilen Back-Ends. Sie können in Ihrer bevorzugten Sprache entwickeln, sei es .NET, .NET Core, Java, Ruby, Node.js, PHP oder Python. Anwendungen lassen sich problemlos in Windows- und Linux-Umgebungen ausführen und skalieren. Application Insights , eine Funktion von Azure Monitor, ist ein erweiterbarer APM-Dienst (Application Performance Management) für Entwickler und DevOps-Experten. Verwenden Sie ihn zur Überwachung Ihrer Live-Anwendungen. Er erkennt automatisch Leistungsanomalien und enthält leistungsstarke Analysetools, die Ihnen bei der Diagnose von Problemen helfen und Ihnen helfen zu verstehen, was Benutzer tatsächlich mit Ihrer App machen. Es wurde entwickelt, um Ihnen dabei zu helfen, Leistung und Benutzerfreundlichkeit kontinuierlich zu verbessern. Es funktioniert für Apps auf einer Vielzahl von Plattformen, darunter .NET, Node.js, Java und Python, die lokal, hybrid oder in einer öffentlichen Cloud gehostet werden. Es lässt sich in Ihren DevOps-Prozess integrieren und verfügt über Verbindungspunkte zu einer Vielzahl von Entwicklungstools. Durch die Integration mit Visual Studio App Center kann es Telemetriedaten von mobilen Apps überwachen und analysieren.",
  },
  {
    id: "real-az900-39",
    topicId: "azure-architektur",
    prompt: "Sie planen die Bereitstellung einer geschäftskritischen Branchenanwendung in Azure. Die Anwendung wird auf einer virtuellen Azure-Maschine ausgeführt. Sie müssen eine Bereitstellungslösung für die Anwendung empfehlen. Die Lösung muss eine garantierte Verfügbarkeit von 99,99 Prozent bieten. Wie viele virtuelle Maschinen und Verfügbarkeitszonen sollten Sie für die Bereitstellung mindestens empfehlen? (Wählen Sie zur Beantwortung die entsprechenden Optionen im Antwortbereich aus. HINWEIS: Jede richtige Auswahl zählt einen Punkt.) Mindestanzahl virtueller Maschinen: 1",
    options: [
      { id: "A", text: "Mindestanzahl Verfügbarkeitszonen: 1 Mindestanzahl virtueller Maschinen: 2" },
      { id: "B", text: "Mindestanzahl Verfügbarkeitszonen: 2 Mindestanzahl virtueller Maschinen: 3" },
      { id: "C", text: "Mindestanzahl Verfügbarkeitszonen: 3 Mindestanzahl virtueller Maschinen: 2" },
      { id: "D", text: "Mindestanzahl Verfügbarkeitszonen: 1 Mindestanzahl virtueller Maschinen: 1" },
      { id: "E", text: "Mindestanzahl Verfügbarkeitszonen: 2" },
    ],
    correct: "B",
    explanation: "SLA für virtuelle Maschinen • Für alle virtuellen Maschinen, bei denen zwei oder mehr Instanzen in zwei oder mehr Verfügbarkeitszonen in derselben Azure-Region bereitgestellt sind, garantieren wir, dass Sie in mindestens 99,99 % der Fälle über eine virtuelle Maschinenkonnektivität mit mindestens einer Instanz verfügen. • Für alle virtuellen Maschinen, bei denen zwei oder mehr Instanzen im selben Verfügbarkeitssatz oder in derselben dedizierten Hostgruppe bereitgestellt sind, garantieren wir Ihnen, dass Sie in mindestens 99,95 % der Fälle über eine virtuelle Maschinenkonnektivität mit mindestens einer Instanz verfügen. • Für jede virtuelle Einzelinstanzmaschine, die Premium SSD oder Ultra Disk für alle Betriebssystem- und Datenfestplatten verwendet, garantieren wir Ihnen eine Konnektivität der virtuellen Maschine von mindestens 99,9 %. • Für jede virtuelle Einzelinstanzmaschine, die verwaltete Standard-SSD-Datenträger für Betriebssystemdatenträger und Datenträger verwendet, garantieren wir Ihnen eine Konnektivität der virtuellen Maschine von mindestens 99,5 %. • Für jede virtuelle Einzelinstanzmaschine, die verwaltete Standard-HDD-Datenträger für Betriebssystemdatenträger und Datenträger verwendet, garantieren wir Ihnen eine Konnektivität der virtuellen Maschine von mindestens 95 %.",
  },
  {
    id: "real-az900-40",
    topicId: "azure-verwaltung",
    prompt: "Ordnen Sie den Begriff der richtigen Definition zu. (Ziehen Sie dazu den entsprechenden Begriff aus der linken Spalte in die rechte Spalte. Jeder Begriff kann einmal, mehrmals oder gar nicht vorkommen. HINWEIS: Jede richtige Zuordnung zählt einen Punkt.) Platzhalter 1: ISO Platzhalter 2: NIST",
    options: [
      { id: "A", text: "Platzhalter 3: DSGVO Platzhalter 4: Azure Government Platzhalter 1: Azure Government Platzhalter 2: ISO" },
      { id: "B", text: "Platzhalter 3: NIST Platzhalter 4: GDPR Platzhalter 1: ISO Platzhalter 2: Azure Government" },
      { id: "C", text: "Platzhalter 3: NIST Platzhalter 4: DSGVO Platzhalter 1: Azure Government Platzhalter 2: Azure Government" },
      { id: "D", text: "Platzhalter 3: ISO Platzhalter 4: NIST Platzhalter 1: NIST Platzhalter 2: ISO" },
      { id: "E", text: "Platzhalter 3: DSGVO Platzhalter 4: Azure Government" },
    ],
    correct: "A",
    explanation: "Azure Government ist eine einzigartige Cloud-Instanz, die ausschließlich für US-Regierungsbehörden und ihre Lösungsanbieter bestimmt ist, darunter: US-Regierungsstellen in ihrer Regierungsfunktion. Staatliche und lokale Regierungsstellen. Partner, die Azure Government zur Bereitstellung von Lösungen nutzen. GDPR steht für General Data Protection Regulation (DSGVO). Sie ist der Kern der europäischen Gesetzgebung zum digitalen Datenschutz. Die Internationale Organisation für Normung ( ISO ) entwickelt und veröffentlicht internationale Standards. Das National Institute of Standards and Technology ( NIST ) ist ein physikalisches Wissenschaftslabor und eine nicht regulierende Agentur des US-Handelsministeriums. Seine Aufgabe besteht darin, Innovation und industrielle Wettbewerbsfähigkeit zu fördern. Die Aktivitäten von NIST sind in Laborprogramme gegliedert, die Nanowissenschaft und -technologie, Ingenieurwesen, Informationstechnologie, Neutronenforschung, Materialmessung und physikalische Messung umfassen. Von 1901 bis 1988 trug die Agentur den Namen National Bureau of Standards.",
  },
  {
    type: "yesno",
    id: "real-az900-41",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“. So implementieren Sie eine Azure Multi-Factor Authentication (MFA)-Lösung...: Ja",
    statements: [
      { text: "Zwei gültige Methoden für Azure Multi-Factor Authentication (MFA) sind...", correct: "Nein" },
      { text: "Azure Multi-Factor Authentication (MFA) kann erforderlich sein für...", correct: "Ja" },
      { text: "So implementieren Sie eine Azure Multi-Factor Authentication (MFA)-Lösung...", correct: "Nein" },
    ],
    explanation: "Bei der Multi-Faktor-Authentifizierung handelt es sich um einen Prozess, bei dem ein Benutzer während des Anmeldevorgangs zu einer zusätzlichen Form der Identifizierung aufgefordert wird, beispielsweise zur Eingabe eines Codes auf seinem Mobiltelefon oder zur Bereitstellung eines Fingerabdruckscans. Azure Multi-Factor Authentication erfordert zwei oder mehr der folgenden Authentifizierungsmethoden: • Etwas, das Sie wissen, normalerweise ein Passwort. • Etwas, das Sie besitzen, beispielsweise ein vertrauenswürdiges Gerät, das nicht so leicht dupliziert werden kann, wie ein Telefon oder ein Hardwareschlüssel. • Etwas, das Sie sind – biometrische Daten wie ein Fingerabdruck oder ein Gesichtsscan. Die folgenden zusätzlichen Überprüfungsformen können mit Azure Multi-Factor Authentication verwendet werden: • Microsoft Authenticator-App • OATH-Hardware-Token • SMS • Sprachanruf",
  },
  {
    id: "real-az900-42",
    topicId: "azure-architektur",
    prompt: "Sie erstellen im Azure Resource Manager eine Ressourcengruppe namens RG1. Sie möchten das Löschen der Ressourcen in RG1 verhindern. Welche Einstellung sollten Sie verwenden? (Wählen Sie zur Beantwortung die entsprechende Einstellung im Antwortbereich aus.)",
    options: [
      { id: "A", text: "Schnellstart" },
      { id: "B", text: "Bereitstellungen" },
      { id: "C", text: "Richtlinien" },
      { id: "D", text: "Eigenschaften" },
      { id: "E", text: "Schlösser" },
      { id: "F", text: "Automatisierungsskript" },
    ],
    correct: "E",
    explanation: "Als Administrator müssen Sie möglicherweise ein Abonnement, eine Ressourcengruppe oder eine Ressource sperren, um zu verhindern, dass andere Benutzer in Ihrer Organisation versehentlich wichtige Ressourcen löschen oder ändern. Sie können die Sperrebene auf „CanNotDelete“ oder „ReadOnly“ festlegen. Im Portal heißen die Sperren „Löschen“ bzw. „Schreibgeschützt“. • „CanNotDelete“ bedeutet, dass autorisierte Benutzer eine Ressource weiterhin lesen und ändern können, sie können die Ressource jedoch nicht löschen. • ReadOnly bedeutet, dass autorisierte Benutzer eine Ressource lesen, aber nicht löschen oder aktualisieren können. Das Anwenden dieser Sperre entspricht der Beschränkung aller autorisierten Benutzer auf die Berechtigungen der Rolle „Leser“. Wenn Sie eine Sperre auf einen übergeordneten Bereich anwenden, erben alle Ressourcen innerhalb dieses Bereichs dieselbe Sperre. Auch später hinzugefügte Ressourcen erben die Sperre vom übergeordneten Bereich. Die restriktivste Sperre in der Vererbung hat Vorrang.",
  },
  {
    type: "yesno",
    id: "real-az900-43",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“. Die meisten Azure-Dienste werden in der privaten Vorschau eingeführt, bevor sie eingeführt werden...: Ja",
    statements: [
      { text: "Azure-Dienste in der öffentlichen Vorschau können nur mithilfe der Azure CLI verwaltet werden", correct: "Nein" },
      { text: "Die Kosten eines Azure-Dienstes in der privaten Vorschau sinken, wenn der Dienst... wird", correct: "Nein" },
      { text: "Die meisten Azure-Dienste werden in der privaten Vorschau eingeführt, bevor sie eingeführt werden...", correct: "Nein" },
    ],
    explanation: "Azure Active Directory stellt Updates und neue Funktionen in Form von Vorschauprogrammen bereit. Microsoft führt die Vorschauen phasenweise ein, um Microsoft und Kunden die Möglichkeit zu geben, die neue Funktion zu testen und zu verstehen, bevor sie Teil des Standarddienstes von Azure AD wird. Die Phasen sind wie folgt: 1. Private Vorschau – In dieser Phase laden wir einige Kunden ein, frühzeitig auf neue Konzepte und Funktionen zuzugreifen. Diese Phase beinhaltet keinen formellen Support. 2. Öffentliche Vorschau – In dieser Phase können alle Kunden mit der entsprechenden Azure AD-Lizenz die neue Funktion testen. Der Microsoft-Kundensupport bietet in dieser Phase Supportleistungen an, die üblichen Service Level Agreements gelten jedoch nicht. Bei neuen Funktionen im Azure AD-Portal werden Kunden in der Benutzeroberfläche Informationsbanner angezeigt, die auf die neue Funktion in der Vorschau aufmerksam machen. Durch Klicken auf das Informationsbanner können Kunden die Vorschau aktivieren. 3. Allgemein verfügbar (GA) – Nach Abschluss der öffentlichen Vorschau steht die Funktion allen lizenzierten Kunden zur Verfügung und wird über alle Microsoft-Supportkanäle unterstützt. Beachten Sie, dass sich die Nutzung der Funktion durch neue Funktionen ändern kann, wenn diese sich auf bestehende Funktionen auswirken. Für jedes Azure Active Directory-Vorschauprogramm gelten andere Opt-in-Anforderungen und Abhängigkeiten.",
  },
  {
    type: "yesno",
    id: "real-az900-44",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“. Die im Service Level Agreement (SLA) garantierte Betriebszeit für kostenpflichtige Azure-Dienste beträgt mindestens ...: Ja",
    statements: [
      { text: "C . Unternehmen können die im Service Level Agreement (SLA) garantierte Betriebszeit erhöhen, indem sie Azure hinzufügen ...", correct: "Ja" },
      { text: "Unternehmen können die im Service Level Agreement (SLA) garantierte Betriebszeit erhöhen, indem sie ... kaufen", correct: "Nein" },
      { text: "Die im Service Level Agreement (SLA) garantierte Betriebszeit für kostenpflichtige Azure-Dienste beträgt mindestens ...", correct: "Nein" },
    ],
    explanation: "Das Service Level Agreement (SLA) beschreibt die Verpflichtungen von Microsoft hinsichtlich Verfügbarkeit und Konnektivität. Die SLA für einzelne Azure-Dienste sind im folgenden Azure-Artikel aufgeführt. Service Level Agreements",
  },
  {
    type: "yesno",
    id: "real-az900-45",
    topicId: "cloud-konzepte",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“. Ein Azure-Dienst in der privaten Vorschau wird für alle Azure-Kunden freigegeben: Ja",
    statements: [
      { text: "Ein Azure-Dienst in der öffentlichen Vorschau wird für alle Azure-Kunden freigegeben", correct: "Ja" },
      { text: ". Ein Azure-Dienst in der allgemeinen Verfügbarkeit wird für eine Teilmenge der Azure-Kunden freigegeben", correct: "Nein" },
      { text: "Ein Azure-Dienst in der privaten Vorschau wird für alle Azure-Kunden freigegeben", correct: "Nein" },
    ],
    explanation: "Azure Active Directory stellt Updates und neue Funktionen in Form von Vorschauprogrammen bereit. Microsoft führt die Vorschauen phasenweise ein, um Microsoft und Kunden die Möglichkeit zu geben, die neue Funktion zu testen und zu verstehen, bevor sie Teil des Standarddienstes von Azure AD wird. Die Phasen sind wie folgt: 1. Private Vorschau – In dieser Phase laden wir einige Kunden ein, frühzeitig auf neue Konzepte und Funktionen zuzugreifen. Diese Phase beinhaltet keinen formellen Support. 2. Öffentliche Vorschau – In dieser Phase können alle Kunden mit der entsprechenden Azure AD-Lizenz die neue Funktion testen. Der Microsoft-Kundensupport bietet in dieser Phase Supportleistungen an, die üblichen Service Level Agreements gelten jedoch nicht. Bei neuen Funktionen im Azure AD-Portal werden Kunden in der Benutzeroberfläche Informationsbanner angezeigt, die auf die neue Funktion in der Vorschau aufmerksam machen. Durch Klicken auf das Informationsbanner können Kunden die Vorschau aktivieren. 3. Allgemein verfügbar (GA) – Nach Abschluss der öffentlichen Vorschau steht die Funktion allen lizenzierten Kunden zur Verfügung und wird über alle Microsoft- Supportkanäle unterstützt. Beachten Sie, dass sich die Nutzung der Funktion durch neue Funktionen ändern kann, wenn diese sich auf bestehende Funktionen auswirken. Für jedes Azure Active Directory-Vorschauprogramm gelten andere Opt-in-Anforderungen und Abhängigkeiten.",
  },
  {
    type: "yesno",
    id: "real-az900-46",
    topicId: "azure-architektur",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“. Alle in einer einzelnen Ressourcengruppe bereitgestellten Azure-Ressourcen müssen dieselbe Azure-Region gemeinsam nutzen: Ja",
    statements: [
      { text: "Wenn Sie einer Ressourcengruppe ein Tag zuweisen, werden alle Azure-Ressourcen in dieser Ressourcengruppe demselben Tag zugewiesen", correct: "Nein" },
      { text: "Wenn Sie einer Ressourcengruppe eine Berechtigung erben, erben alle Azure-Ressourcen in dieser Ressourcengruppe die Berechtigungen", correct: "Ja" },
      { text: "Alle in einer einzelnen Ressourcengruppe bereitgestellten Azure-Ressourcen müssen dieselbe Azure-Region gemeinsam nutzen", correct: "Nein" },
    ],
    explanation: "Eine Ressourcengruppe ist ein Container, der zusammengehörige Ressourcen für eine Azure-Lösung enthält. Die Ressourcengruppe speichert Metadaten zu den Ressourcen. Wenn Sie also einen Speicherort für die Ressourcengruppe angeben, geben Sie an, wo diese Metadaten gespeichert werden. Ressourcengruppen und enthaltene Ressourcen müssen nicht in derselben Azure-Region liegen. Sie wenden Tags auf Ihre Azure-Ressourcen, Ressourcengruppen und Abonnements an, um sie logisch in einer Taxonomie zu organisieren. Jedes Tag besteht aus einem Namen-Wert-Paar. Sie können beispielsweise allen Ressourcen in der Produktion den Namen „Umgebung“ und den Wert „Produktion“ zuweisen. Auf eine Ressourcengruppe angewendete Tags werden nicht auf enthaltene Ressourcen vererbt. Jede Rolle einer Ressourcengruppe wird auf alle Ressourcen innerhalb dieser Ressourcengruppe vererbt. Diese Vererbung lässt sich nicht blockieren, da sie so beabsichtigt ist und RBAC-Rollen je nachdem, wo die RBAC-Rolle angewendet wird, von der obersten zur untersten Ebene weitergegeben werden.",
  },
  {
    id: "real-az900-47",
    topicId: "azure-verwaltung",
    prompt: "Mehrere Supporttechniker planen, Azure mithilfe der in der folgenden Tabelle aufgeführten Computer zu verwalten: Sie müssen ermitteln, welche Azure-Verwaltungstools von jedem Computer aus verwendet werden können. Was sollten Sie für jeden Computer ermitteln? (Wählen Sie zur Beantwortung die entsprechenden Optionen im Antwortbereich aus. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.) Computer1: Die Azure CLI, das Azure-Portal und Azure PowerShell",
    options: [
      { id: "A", text: "Computer2: Die Azure CLI und das Azure-Portal Computer3: Die Azure CLI und das Azure-Portal Computer1: Die Azure CLI, das Azure-Portal und Azure PowerShell" },
      { id: "B", text: "Computer2: Die Azure CLI, das Azure-Portal und Azure PowerShell Computer3: Die Azure CLI, das Azure-Portal und Azure PowerShell Computer1: Die Azure CLI, das Azure-Portal und Azure PowerShell" },
      { id: "C", text: "Computer2: Die Azure CLI und das Azure-Portal Computer3: Das Azure-Portal und Azure PowerShell Computer1: Die Azure CLI, das Azure-Portal und Azure PowerShell" },
      { id: "D", text: "Computer2: Das Azure-Portal und Azure PowerShell Computer3: Das Azure-Portal und Azure PowerShell Computer1: Die Azure CLI, das Azure-Portal und Azure PowerShell" },
      { id: "E", text: "Computer2: Das Azure-Portal und Azure PowerShell Computer3: Die Azure CLI und das Azure-Portal" },
    ],
    correct: "B",
    explanation: "Das Azure-Portal ist eine öffentliche Website, auf die Sie mit jedem Webbrowser zugreifen können. Sobald Sie sich mit Ihrem Azure-Konto angemeldet haben, können Sie alle verfügbaren Azure-Dienste erstellen, verwalten und überwachen. Azure PowerShell ist ein Modul, das Sie zu Windows PowerShell oder PowerShell Core hinzufügen – einer plattformübergreifenden Version von PowerShell, die unter Windows, Linux oder macOS läuft – und Ihnen ermöglicht, eine Verbindung zu Ihrem Azure-Abonnement herzustellen und Ressourcen zu verwalten. Azure CLI ist ein plattformübergreifendes Befehlszeilenprogramm, das eine Verbindung zu Azure herstellt und administrative Befehle für Azure-Ressourcen ausführt. Plattformübergreifend bedeutet, dass es unter Windows, Linux oder macOS ausgeführt werden kann.",
  },
  {
    type: "yesno",
    id: "real-az900-48",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“. Azure Advisor ... verbessert die Sicherheit einer Azure Active Directory (Azure AD)-Umgebung: Ja",
    statements: [
      { text: "Azure Advisor ... senkt die Kosten für den Betrieb virtueller Azure-Computer", correct: "Ja" },
      { text: "Azure Advisor ... konfiguriert die Netzwerkeinstellungen auf virtuellen Azure-Computern", correct: "Nein" },
      { text: "Azure Advisor ... verbessert die Sicherheit einer Azure Active Directory (Azure AD)-Umgebung", correct: "Ja" },
    ],
    explanation: "Advisor ist ein personalisierter Cloudberater, der Sie bei der Optimierung Ihrer Azure-Bereitstellungen mithilfe bewährter Methoden unterstützt. Er analysiert Ihre Ressourcenkonfiguration und Nutzungstelemetrie und empfiehlt anschließend Lösungen, mit denen Sie die Kosteneffizienz, Leistung, Zuverlässigkeit (früher als Hochverfügbarkeit bezeichnet) und Sicherheit Ihrer Azure-Ressourcen verbessern können. Mit Advisor können Sie: • Erhalten Sie proaktive, umsetzbare und personalisierte Best Practices-Empfehlungen. • Verbessern Sie die Leistung, Sicherheit und Zuverlässigkeit Ihrer Ressourcen, indem Sie Möglichkeiten zur Reduzierung Ihrer Azure-Gesamtausgaben identifizieren. • Erhalten Sie Empfehlungen mit vorgeschlagenen Aktionen inline. Das Advisor-Dashboard zeigt personalisierte Empfehlungen für alle Ihre Abonnements an. Sie können Filter anwenden, um Empfehlungen für bestimmte Abonnements und Ressourcentypen anzuzeigen. Die Empfehlungen sind in fünf Kategorien unterteilt: • Zuverlässigkeit (früher Hochverfügbarkeit genannt): Um die Kontinuität Ihrer geschäftskritischen Anwendungen sicherzustellen und zu verbessern. • Sicherheit: Zum Erkennen von Bedrohungen und Schwachstellen, die zu Sicherheitsverletzungen führen könnten. • Leistung: Um die Geschwindigkeit Ihrer Anwendungen zu verbessern. • Kosten: Um Ihre gesamten Azure-Ausgaben zu optimieren und zu reduzieren. • Operative Exzellenz: Wir helfen Ihnen dabei, Prozess- und Arbeitsablaufeffizienz, Ressourcenverwaltung und Best Practices für die Bereitstellung zu erreichen.",
  },
  {
    id: "real-az900-49",
    topicId: "azure-verwaltung",
    prompt: "Ordnen Sie den Azure-Dienst der richtigen Beschreibung zu. (Ziehen Sie dazu den entsprechenden Azure-Dienst aus der linken Spalte in die rechte Spalte mit der Beschreibung. Jeder Dienst kann einmal, mehrmals oder gar nicht verwendet werden. HINWEIS: Jede richtige Auswahl zählt einen Punkt.) Platzhalter 1: Azure Machine Learning Platzhalter 2: Azure Functions",
    options: [
      { id: "A", text: "Platzhalter 3: Azure AI Bot Platzhalter 4: Azure IoT Hub Platzhalter 1: Azure AI Bot Platzhalter 2: Azure Machine Learning" },
      { id: "B", text: "Platzhalter 3: Azure Functions Platzhalter 4: Azure IoT Hub Platzhalter 1: Azure Functions Platzhalter 2: Azure IoT Hub" },
      { id: "C", text: "Platzhalter 3: Azure IoT Hub Platzhalter 4: Azure AI Bot Platzhalter 1: Azure IoT Hub Platzhalter 2: Azure Machine Learning" },
      { id: "D", text: "Platzhalter 3: Azure Machine Learning Platzhalter 4: Azure Functions Platzhalter 1: Azure AI Bot Platzhalter 2: Azure Functions" },
      { id: "E", text: "Platzhalter 3: Azure Functions Platzhalter 4: Azure IoT Hub Platzhalter 1: Azure Functions Platzhalter 2: Azure Functions" },
      { id: "F", text: "Platzhalter 3: Azure AI Bot Platzhalter 4: Azure Machine Learning" },
    ],
    correct: "B",
    explanation: "Azure Machine Learning (Azure ML) ist ein cloudbasierter Dienst zum Erstellen und Verwalten von Machine-Learning-Lösungen. Er unterstützt Datenwissenschaftler und Machine-Learning-Ingenieure dabei, ihre vorhandenen Fähigkeiten und Frameworks in den Bereichen Datenverarbeitung und Modellentwicklung optimal zu nutzen. Azure IoT Hub ist ein verwalteter, in der Cloud gehosteter Dienst, der als zentraler Nachrichten-Hub für die bidirektionale Kommunikation zwischen Ihrer IoT-Anwendung und den von ihr verwalteten Geräten fungiert. Mit Azure IoT Hub erstellen Sie IoT-Lösungen mit zuverlässiger und sicherer Kommunikation zwischen Millionen von IoT-Geräten und einem Cloud-basierten Lösungs-Backend. Sie können praktisch jedes Gerät mit IoT Hub verbinden. Azure Bot Service ist Microsofts KI-Chatbot, der als Service im Azure Cloud Service Marketplace angeboten wird. Azure Bot Service bietet die Möglichkeit, intelligente, kommunikationsfähige Agenten hinzuzufügen, ohne Ressourcen für die Entwicklung einer eigenen KI aufwenden zu müssen. Azure Functions ist eine ereignisgesteuerte, bedarfsgesteuerte Compute-on-Demand-Lösung, die die bestehende Azure-Anwendungsplattform um Funktionen zur Implementierung von Code erweitert, der durch Ereignisse in Azure, Drittanbieterdiensten sowie lokalen Systemen ausgelöst wird.",
  },
  {
    id: "real-az900-50",
    topicId: "cloud-konzepte",
    prompt: "Sie haben 1.000 virtuelle Maschinen auf den Hyper-V-Hosts in einem Rechenzentrum gehostet. Sie planen, alle virtuellen Maschinen auf ein Azure-Abonnement mit nutzungsbasierter Bezahlung zu migrieren. Sie müssen das für die geplante Azure-Lösung zu verwendende Kostenmodell ermitteln. Welches Kostenmodell sollten Sie ermitteln?",
    options: [
      { id: "A", text: "Betriebsbereit" },
      { id: "B", text: "Elastisch" },
      { id: "C", text: "Hauptstadt" },
      { id: "D", text: "Skalierbar" },
    ],
    correct: "A",
    explanation: "Microsoft Azure und andere Cloud-/Software-as-a-Service-Produkte arbeiten nach dem Opex-Modell (oder Betriebsausgabenmodell). Das bedeutet, dass Sie grundsätzlich für abonnementbasierte Dienste und Ressourcen auf monatlicher oder verbrauchsabhängiger Basis zahlen – im Gegensatz zum herkömmlichen Capex- Modell (oder Kapitalausgabenmodell), bei dem Sie im Voraus für etwas bezahlen, unabhängig davon, ob Sie es nutzen oder nicht, und das normalerweise zu Kapitalverschwendung durch überdimensionierte Maschinen oder den Kauf von mehr als benötigt führt. Die Verwendung von Opex bietet mehr Flexibilität hinsichtlich dessen, was Sie derzeit verbrauchen (und was nicht) und was Sie verbrauchen möchten. Bedenken Sie, dass etwas, wenn es hochskaliert wird, jederzeit wieder herunterskaliert werden kann, und zwar mit geringen (oder in manchen Fällen gar keinen) Ausfallzeiten oder Risiken.",
  },
  {
    id: "real-az900-51",
    topicId: "azure-verwaltung",
    prompt: "Ihr Unternehmen verfügt über ein lokales Netzwerk mit mehreren Servern. Das Unternehmen plant, die folgenden administrativen Aufgaben der Netzwerkadministratoren zu reduzieren: • Sichern von Anwendungsdaten • Austausch ausgefallener Serverhardware • Verwalten der physischen Serversicherheit • Aktualisieren von Serverbetriebssystemen • Verwalten von Berechtigungen für freigegebene Dokumente Das Unternehmen plant die Migration mehrerer Server auf virtuelle Azure-Computer. Sie müssen ermitteln, welche administrativen Aufgaben nach der geplanten Migration reduziert werden. Welche zwei Aufgaben sollten Sie identifizieren? (Jede richtige Antwort stellt eine Komplettlösung dar. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    options: [
      { id: "A", text: "Austausch ausgefallener Serverhardware" },
      { id: "B", text: "Sichern von Anwendungsdaten" },
      { id: "C", text: "Verwalten der physischen Serversicherheit" },
      { id: "D", text: "Aktualisieren von Serverbetriebssystemen" },
      { id: "E", text: "Verwalten von Berechtigungen für freigegebene Dokumente" },
    ],
    correct: "A",
    explanation: "Ausgefallene Serverhardware in Azure-Rechenzentren wird durch Microsoft-Hardware ersetzt. Auch die physische Sicherheit (Zugriff auf physische Server) in Azure-Rechenzentren wird von Microsoft gewährleistet.",
  },
  {
    id: "real-az900-52",
    topicId: "azure-verwaltung",
    prompt: "Ihr Unternehmen plant die Bereitstellung einer KI-Lösung (künstliche Intelligenz) in Azure. Was sollte das Unternehmen zum Erstellen, Testen und Bereitstellen von Predictive Analytics-Lösungen verwenden?",
    options: [
      { id: "A", text: "Azure Logic Apps" },
      { id: "B", text: "Azure Machine Learning Studio" },
      { id: "C", text: "Azure Batch" },
      { id: "D", text: "Azure Cosmos DB" },
    ],
    correct: "B",
    explanation: "Azure Machine Learning Studio ist ein Webportal in Azure Machine Learning, das Low-Code- und No-Code-Optionen für die Projekterstellung und das Asset-Management bietet. Das Studio bietet je nach Projekttyp und Benutzererfahrung verschiedene Erstellungsfunktionen.",
  },
  {
    id: "real-az900-53",
    topicId: "azure-verwaltung",
    prompt: "Einige Fragensätze haben möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Stellen Sie fest, ob die Lösung die angegebenen Ziele erreicht. Sie verfügen über eine Azure-Umgebung. Sie müssen eine neue virtuelle Azure-Maschine aus einem Android-Laptop erstellen. Lösung: Sie verwenden PowerShell in Azure Cloud Shell. Erreicht dies das Ziel?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "A",
    explanation: "Azure Cloud Shell ist eine interaktive, authentifizierte und browserbasierte Shell zur Verwaltung von Azure-Ressourcen. Sie bietet die Flexibilität, die Shell-Oberfläche auszuwählen, die am besten zu Ihrer Arbeitsweise passt: Bash oder PowerShell.",
  },
  {
    id: "real-az900-54",
    topicId: "azure-verwaltung",
    prompt: "Einige Fragensätze haben möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Stellen Sie fest, ob die Lösung die angegebenen Ziele erfüllt. Sie verfügen über eine Azure-Umgebung. Sie müssen eine neue virtuelle Azure-Maschine aus einem Android-Laptop erstellen. Lösung: Sie verwenden das PowerApps-Portal. Erfüllt dies das Ziel?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "B",
    explanation: "Mit PowerApps-Portalen können Organisationen Websites erstellen, die mit Benutzern außerhalb ihrer Organisation entweder anonym oder über den Anmeldeanbieter ihrer Wahl wie LinkedIn, Microsoft Account oder andere kommerzielle Anmeldeanbieter geteilt werden können.",
  },
  {
    id: "real-az900-55",
    topicId: "azure-verwaltung",
    prompt: "Einige Fragensätze haben möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Stellen Sie fest, ob die Lösung die angegebenen Ziele erreicht. Sie verfügen über eine Azure-Umgebung. Sie müssen eine neue virtuelle Azure-Maschine aus einem Android-Laptop erstellen. Lösung: Sie verwenden das Azure-Portal. Erreicht dies das Ziel?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "A",
    explanation: "Das Azure-Portal ist eine webbasierte, einheitliche Konsole, die eine Alternative zu Befehlszeilentools bietet. Mit dem Azure-Portal verwalten Sie Ihr Azure-Abonnement über eine grafische Benutzeroberfläche. Sie können alles erstellen, verwalten und überwachen – von einfachen Web-Apps bis hin zu komplexen Cloud-Bereitstellungen. Erstellen Sie benutzerdefinierte Dashboards für eine übersichtliche Ressourcenansicht. Konfigurieren Sie Barrierefreiheitsoptionen für ein optimales Erlebnis. Das Azure-Portal ist auf Ausfallsicherheit und kontinuierliche Verfügbarkeit ausgelegt und in jedem Azure-Rechenzentrum verfügbar. Diese Konfiguration macht das Azure-Portal widerstandsfähig gegenüber einzelnen Rechenzentrumsausfällen und vermeidet Netzwerkverlangsamungen durch die Nähe zum Benutzer. Das Azure-Portal wird kontinuierlich aktualisiert und erfordert keine Ausfallzeiten für Wartungsarbeiten.",
  },
  {
    id: "real-az900-56",
    topicId: "azure-verwaltung",
    prompt: "Einige Fragensätze haben möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Stellen Sie fest, ob die Lösung die angegebenen Ziele erreicht. Sie verfügen über eine Azure-Umgebung. Sie müssen eine neue virtuelle Azure-Maschine aus einem Android-Laptop erstellen. Lösung: Sie verwenden Bash in Azure Cloud Shell. Erreicht dies das Ziel?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "A",
    explanation: "Azure Cloud Shell ist eine interaktive, authentifizierte und browserbasierte Shell zur Verwaltung von Azure-Ressourcen. Sie bietet Ihnen die Flexibilität, die Shell- Oberfläche zu wählen, die am besten zu Ihrer Arbeitsweise passt: Bash oder PowerShell. Azure Cloud Shell ist browserbasiert. Sie können in Azure Cloud Shell zu Bash wechseln und „az vm create“ eingeben, um einen neuen virtuellen Computer zu erstellen.",
  },
  {
    type: "yesno",
    id: "real-az900-57",
    topicId: "azure-verwaltung",
    prompt: "Wählen Sie für jede der folgenden Aussagen „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“. Ein einzelnes Microsoft-Konto kann zum Verwalten mehrerer Azure-Abonnements verwendet werden: Ja.",
    statements: [
      { text: "Zwei Azure-Abonnements können durch Erstellen einer Supportanfrage zu einem einzigen Abonnement zusammengeführt werden", correct: "Nein" },
      { text: "Ein Unternehmen kann Ressourcen in mehreren Abonnements speichern", correct: "Ja" },
      { text: "Ein einzelnes Microsoft-Konto kann zum Verwalten mehrerer Azure-Abonnements verwendet werden", correct: "Nein" },
    ],
    explanation: "Sie können ein Microsoft-Konto als Gast zu einem oder mehreren Azure AD-Mandanten hinzufügen und dem Konto die Berechtigung zum Verwalten von Ressourcen und Abonnements erteilen. Das Zusammenführen zweier Abonnements durch Erstellen einer Supportanfrage ist nicht möglich. Sie können Ressourcen aus zwei Abonnements jedoch selbst zusammenführen, indem Sie sie verschieben. Sie verwenden den Mandanten, um den Zugriff auf Ihre Abonnements und Ressourcen zu verwalten. Wenn Sie den Abrechnungsbesitz Ihres Abonnements auf ein Konto in einem anderen Azure AD-Mandanten übertragen, können Sie das Abonnement sogar in den Mandanten des neuen Kontos verschieben. Selbstverständlich kann ein Unternehmen mehrere Abonnements und auch mehrere Mandanten besitzen.",
  },
  {
    id: "real-az900-58",
    topicId: "cloud-konzepte",
    prompt: "Einige Fragensätze haben möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Stellen Sie fest, ob die Lösung die angegebenen Ziele erfüllt. Ihr Unternehmen plant, alle seine Daten und Ressourcen nach Azure zu migrieren. Der Migrationsplan des Unternehmens sieht vor, dass in Azure nur Platform-as-a-Service-Lösungen (PaaS) verwendet werden dürfen. Sie müssen eine Azure-Umgebung bereitstellen, die die geplante Migration unterstützt. Lösung: Sie erstellen einen Azure App Service und Azure SQL-Datenbanken. Wird damit das Ziel erreicht?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "A",
    explanation: "Platform as a Service (PaaS) ist eine umfassende Entwicklungs- und Bereitstellungsumgebung in der Cloud mit Ressourcen, die Ihnen die Bereitstellung von Anwendungen aller Art ermöglichen – von einfachen Cloud-basierten Apps bis hin zu komplexen, Cloud-fähigen Unternehmensanwendungen. Sie erwerben die benötigten Ressourcen von einem Cloud-Service-Anbieter auf Pay-as-you-go-Basis und greifen über eine sichere Internetverbindung darauf zu. Wie IaaS umfasst PaaS die Infrastruktur – Server, Speicher und Netzwerke –, aber auch Middleware, Entwicklungstools, Business Intelligence (BI)-Dienste, Datenbankmanagementsysteme und mehr. PaaS unterstützt den gesamten Lebenszyklus von Webanwendungen: Erstellen, Testen, Bereitstellen, Verwalten und Aktualisieren. Mit PaaS sparen Sie sich die Kosten und den Aufwand für den Kauf und die Verwaltung von Softwarelizenzen, der zugrunde liegenden Anwendungsinfrastruktur und Middleware, Container-Orchestratoren wie Kubernetes oder der Entwicklungstools und anderer Ressourcen. Sie verwalten die von Ihnen entwickelten Anwendungen und Dienste, und der Cloud-Service-Anbieter kümmert sich in der Regel um alles Weitere. Durch die Bereitstellung von Infrastructure as a Service bietet PaaS dieselben Vorteile wie IaaS. Die zusätzlichen Funktionen – Middleware, Entwicklungstools und andere Business-Tools – bieten Ihnen jedoch weitere Vorteile.",
  },
  {
    id: "real-az900-59",
    topicId: "cloud-konzepte",
    prompt: "Einige Fragensätze enthalten möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Stellen Sie fest, ob die Lösung die angegebenen Ziele erfüllt. Ihr Unternehmen plant, alle seine Daten und Ressourcen nach Azure zu migrieren. Der Migrationsplan des Unternehmens sieht vor, dass in Azure nur Platform-as-a-Service-Lösungen (PaaS) verwendet werden dürfen. Sie müssen eine Azure-Umgebung bereitstellen, die die geplante Migration unterstützt. Lösung: Sie erstellen einen Azure App Service und virtuelle Azure-Computer, auf denen Microsoft SQL Server installiert ist. Wird damit das Ziel erreicht?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "B",
    explanation: "Platform as a Service (PaaS) ist eine umfassende Entwicklungs- und Bereitstellungsumgebung in der Cloud mit Ressourcen, die Ihnen die Bereitstellung von Anwendungen aller Art ermöglichen – von einfachen Cloud-basierten Apps bis hin zu komplexen, Cloud-fähigen Unternehmensanwendungen. Sie erwerben die benötigten Ressourcen von einem Cloud-Service-Anbieter auf Pay-as-you-go-Basis und greifen über eine sichere Internetverbindung darauf zu. Wie IaaS umfasst PaaS die Infrastruktur – Server, Speicher und Netzwerke –, aber auch Middleware, Entwicklungstools, Business Intelligence (BI)-Dienste, Datenbankmanagementsysteme und mehr. PaaS unterstützt den gesamten Lebenszyklus von Webanwendungen: Erstellen, Testen, Bereitstellen, Verwalten und Aktualisieren. Mit PaaS sparen Sie sich die Kosten und den Aufwand für den Kauf und die Verwaltung von Softwarelizenzen, der zugrunde liegenden Anwendungsinfrastruktur und Middleware, Container-Orchestratoren wie Kubernetes oder der Entwicklungstools und anderer Ressourcen. Sie verwalten die von Ihnen entwickelten Anwendungen und Dienste, und der Cloud-Service-Anbieter kümmert sich in der Regel um alles Weitere. Durch die Bereitstellung von Infrastructure as a Service bietet PaaS dieselben Vorteile wie IaaS. Die zusätzlichen Funktionen – Middleware, Entwicklungstools und andere Business-Tools – bieten Ihnen jedoch weitere Vorteile.",
  },
  {
    id: "real-az900-60",
    topicId: "cloud-konzepte",
    prompt: "Einige Fragensätze haben möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Stellen Sie fest, ob die Lösung die angegebenen Ziele erreicht. Ihr Unternehmen plant, alle seine Daten und Ressourcen nach Azure zu migrieren. Der Migrationsplan des Unternehmens sieht vor, dass in Azure nur Platform-as-a-Service-Lösungen (PaaS) verwendet werden dürfen. Sie müssen eine Azure-Umgebung bereitstellen, die die geplante Migration unterstützt. Lösung: Sie erstellen ein Azure App Service- und Azure Storage-Konto. Wird damit das Ziel erreicht?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "B",
    explanation: "Platform as a Service (PaaS) ist eine umfassende Entwicklungs- und Bereitstellungsumgebung in der Cloud mit Ressourcen, die Ihnen die Bereitstellung von Anwendungen aller Art ermöglichen – von einfachen Cloud-basierten Apps bis hin zu komplexen, Cloud-fähigen Unternehmensanwendungen. Sie erwerben die benötigten Ressourcen von einem Cloud-Service-Anbieter auf Pay-as-you-go-Basis und greifen über eine sichere Internetverbindung darauf zu. Wie IaaS umfasst PaaS die Infrastruktur – Server, Speicher und Netzwerke –, aber auch Middleware, Entwicklungstools, Business Intelligence (BI)-Dienste, Datenbankmanagementsysteme und mehr. PaaS unterstützt den gesamten Lebenszyklus von Webanwendungen: Erstellen, Testen, Bereitstellen, Verwalten und Aktualisieren. Mit PaaS sparen Sie sich die Kosten und den Aufwand für den Kauf und die Verwaltung von Softwarelizenzen, der zugrunde liegenden Anwendungsinfrastruktur und Middleware, Container-Orchestratoren wie Kubernetes oder der Entwicklungstools und anderer Ressourcen. Sie verwalten die von Ihnen entwickelten Anwendungen und Dienste, und der Cloud-Service-Anbieter kümmert sich in der Regel um alles Weitere. Durch die Bereitstellung von Infrastructure as a Service bietet PaaS dieselben Vorteile wie IaaS. Die zusätzlichen Funktionen – Middleware, Entwicklungstools und andere Business-Tools – bieten Ihnen jedoch weitere Vorteile. Referenzen: Was ist PaaS? Was ist IaaS?",
  },
  {
    id: "real-az900-61",
    topicId: "cloud-konzepte",
    prompt: "Ihr Unternehmen hostet eine Anwendung namens App1, die von allen Kunden des Unternehmens verwendet wird. App1 wird in den ersten drei Wochen jedes Monats wenig und in der letzten Woche sehr stark genutzt. Welcher Vorteil von Azure Cloud Services unterstützt das Kostenmanagement bei diesem Nutzungsmuster?",
    options: [
      { id: "A", text: "Hohe Verfügbarkeit" },
      { id: "B", text: "Hohe Latenz" },
      { id: "C", text: "Elastizität" },
      { id: "D", text: "Lastenausgleich" },
    ],
    correct: "C",
    explanation: "Elastic Computing ermöglicht es, Rechenleistung, Arbeitsspeicher und Speicherressourcen schnell zu erweitern oder zu reduzieren, um wechselnden Anforderungen gerecht zu werden, ohne sich um Kapazitätsplanung und -planung für Spitzenlasten kümmern zu müssen. Elastic Computing wird in der Regel durch Systemüberwachungstools gesteuert und gleicht die zugewiesene Ressourcenmenge mit der tatsächlich benötigten Ressourcenmenge ab, ohne den laufenden Betrieb zu unterbrechen. Dank Cloud-Elastizität vermeidet ein Unternehmen die Kosten für ungenutzte Kapazitäten oder ungenutzte Ressourcen und muss sich nicht um den Kauf oder die Wartung zusätzlicher Ressourcen und Geräte kümmern. Obwohl Sicherheit und eingeschränkte Kontrolle beim Elastic Cloud Computing zu berücksichtigen sind, bietet es viele Vorteile. Elastic Computing ist effizienter als eine herkömmliche IT-Infrastruktur, in der Regel automatisiert, sodass es nicht rund um die Uhr auf menschliche Administratoren angewiesen ist, und bietet durch die Vermeidung unnötiger Verlangsamungen oder Dienstunterbrechungen kontinuierliche Serviceverfügbarkeit.",
  },
  {
    id: "real-az900-62",
    topicId: "cloud-konzepte",
    prompt: "Sie planen die Migration einer Webanwendung nach Azure. Externe Benutzer greifen auf die Webanwendung zu. Sie benötigen eine Cloud-Bereitstellungslösung, um den Verwaltungsaufwand für die Webanwendung zu minimieren. Was sollte Ihre Empfehlung beinhalten?",
    options: [
      { id: "A", text: "Software als Service (SaaS)" },
      { id: "B", text: "Plattform als Service (PaaS)" },
      { id: "C", text: "Infrastruktur als Service (IaaS)" },
      { id: "D", text: "Datenbank als Service (DaaS)" },
    ],
    correct: "B",
    explanation: "Azure App Service ist eine vollständig verwaltete „Platform as a Service“ (PaaS), die Microsoft Azure-Websites, Mobile Services und BizTalk Services in einem einzigen Dienst integriert und neue Funktionen hinzufügt, die die Integration mit lokalen oder Cloud-Systemen ermöglichen.",
  },
  {
    id: "real-az900-63",
    topicId: "azure-verwaltung",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Einer der Vorteile von Azure SQL Data Warehouse ist die integrierte Hochverfügbarkeit der Plattform. ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, die die Aussage richtig macht.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "Automatische Skalierung" },
      { id: "C", text: "Datenkomprimierung" },
      { id: "D", text: "Versionierung" },
    ],
    correct: "A",
    explanation: "Azure SQL Data Warehouse ist ein verwalteter Dienst im Petabyte-Bereich mit Steuerelementen zur unabhängigen Verwaltung von Rechenleistung und Speicher. Neben der Flexibilität hinsichtlich der Rechenlastelastizität ermöglicht es Benutzern auch, die Rechenschicht anzuhalten und gleichzeitig die Daten beizubehalten, um die Kosten in einer Pay-as-you-go-Umgebung zu senken.",
  },
  {
    id: "real-az900-64",
    topicId: "azure-verwaltung",
    prompt: "Ein Supporttechniker plant, mehrere Azure-Verwaltungsaufgaben mithilfe der Azure CLI auszuführen. Sie installieren die CLI auf einem Computer. Sie müssen dem Supporttechniker mitteilen, welche Tools er zum Ausführen der CLI verwenden soll. Welche zwei Tools sollten Sie dem Supporttechniker empfehlen? (Jede richtige Antwort stellt eine vollständige Lösung dar. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    options: [
      { id: "A", text: "Eingabeaufforderung" },
      { id: "B", text: "Azure-Ressourcen-Explorer" },
      { id: "C", text: "Windows PowerShell" },
      { id: "D", text: "Windows Defender-Firewall" },
      { id: "E", text: "Netzwerk- und Freigabecenter" },
    ],
    correct: "A",
    explanation: "Unter Windows wird die Azure CLI über eine MSI-Datei installiert, die Ihnen den Zugriff auf die CLI über die Windows-Eingabeaufforderung (CMD) oder PowerShell ermöglicht. Bei der Installation für das Windows-Subsystem für Linux (WSL) stehen Pakete für Ihre Linux-Distribution zur Verfügung.",
  },
  {
    id: "real-az900-65",
    topicId: "azure-verwaltung",
    prompt: "Sie planen, 20 TB Daten in Azure zu speichern. Auf die Daten wird nur selten zugegriffen, und sie werden mit Microsoft Power BI visualisiert. Sie müssen eine Speicherlösung für die Daten empfehlen. Welche zwei Lösungen sollten Sie empfehlen? (Jede richtige Antwort stellt eine Komplettlösung dar. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    options: [
      { id: "A", text: "Azure Data Lake" },
      { id: "B", text: "Azure Cosmos DB" },
      { id: "C", text: "Azure SQL-Data Warehouse" },
      { id: "D", text: "Azure SQL-Datenbank" },
      { id: "E", text: "Azure-Datenbank für PostgreSQL" },
    ],
    correct: "A",
    explanation: "Microsoft Power BI unterstützt alle aufgeführten Datenquellen. Azure Data Lake und Azure SQL Data Warehouse unterstützen das Anhalten und Fortsetzen von Rechenkapazitäten. Da die Daten nur selten abgerufen werden, werden die Azure-Kosten dadurch erheblich minimiert.",
  },
  {
    id: "real-az900-66",
    topicId: "azure-architektur",
    prompt: "Sie müssen den Fehlertyp ermitteln, bei dem eine Azure-Verfügbarkeitszone zum Schutz des Zugriffs auf Azure-Dienste verwendet werden kann. Was sollten Sie ermitteln?",
    options: [
      { id: "A", text: "Ein physischer Serverausfall" },
      { id: "B", text: "Ein Ausfall der Azure-Region" },
      { id: "C", text: "Ein Speicherfehler" },
      { id: "D", text: "Ein Azure-Rechenzentrumsausfall" },
    ],
    correct: "D",
    explanation: "Verfügbarkeitszonen sind einzigartige physische Standorte mit unabhängiger Stromversorgung, Netzwerk und Kühlung. Jede Verfügbarkeitszone besteht aus einem oder mehreren Rechenzentren und beherbergt Infrastruktur zur Unterstützung hochverfügbarer, geschäftskritischer Anwendungen. Verfügbarkeitszonen sind durch Redundanz und logische Isolierung von Diensten tolerant gegenüber Rechenzentrumsausfällen.",
  },
  {
    id: "real-az900-67",
    topicId: "azure-verwaltung",
    prompt: "Sie verfügen über eine virtuelle Maschine namens VM1, auf der Windows Server 2016 ausgeführt wird. VM1 befindet sich in der Azure-Region „USA, Osten“. Welchen Azure-Dienst sollten Sie im Azure-Portal verwenden, um Benachrichtigungen über Dienstfehler anzuzeigen, die die Verfügbarkeit von VM1 beeinträchtigen können?",
    options: [
      { id: "A", text: "Azure Service Fabric" },
      { id: "B", text: "Azure Monitor" },
      { id: "C", text: "Virtuelle Azure-Computer" },
      { id: "D", text: "Azure-Berater" },
    ],
    correct: "B",
    explanation: "Dienstintegritätsbenachrichtigungen werden von der Azure-Infrastruktur im Azure-Aktivitätsprotokoll veröffentlicht. Die Benachrichtigungen enthalten Informationen zu den Ressourcen Ihres Abonnements. Angesichts der möglicherweise großen Menge an Informationen, die im Aktivitätsprotokoll gespeichert sind, gibt es eine separate Benutzeroberfläche, die das Anzeigen und Einrichten von Benachrichtigungen zu Dienstintegritätsbenachrichtigungen vereinfacht. Azure Monitor vereint alle Ihre Überwachungseinstellungen und -daten in einer konsolidierten Ansicht. Zunächst wird der Abschnitt Aktivitätsprotokoll geöffnet. Azure Monitor ermöglicht das Einrichten einer Benachrichtigung, um sicherzustellen, dass Sie über zukünftige Dienstbenachrichtigungen informiert werden.",
  },
  {
    id: "real-az900-68",
    topicId: "azure-architektur",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er richtig ist. Eine Azure-Region enthält ein oder mehrere Rechenzentren, die über ein Netzwerk mit geringer Latenz verbunden sind . ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch richtig ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, mit der die Aussage richtig ist.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "ist in jedem Land zu finden, in dem Microsoft eine Niederlassung hat" },
      { id: "C", text: "ist in jedem Land Europas und Amerikas zu finden" },
      { id: "D", text: "enthält ein oder mehrere Rechenzentren, die über ein Netzwerk mit hoher Latenz verbunden sind" },
    ],
    correct: "A",
    explanation: "Eine Region besteht aus mehreren Rechenzentren, die innerhalb eines latenzdefinierten Umkreises bereitgestellt und über ein dediziertes regionales Netzwerk mit geringer Latenz verbunden sind. Azure bietet Ihnen die Flexibilität, Anwendungen dort bereitzustellen, wo Sie sie benötigen, auch über mehrere Regionen hinweg, um regionsübergreifende Ausfallsicherheit zu gewährleisten.",
  },
  {
    id: "real-az900-69",
    topicId: "azure-verwaltung",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Wenn Sie Berechtigungen gleichzeitig an mehrere virtuelle Azure-Computer delegieren müssen, müssen Sie die virtuellen Azure-Computer in derselben Azure- Region bereitstellen . ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, mit der die Aussage richtig ist.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "durch Verwendung derselben Azure Resource Manager-Vorlage" },
      { id: "C", text: "zur gleichen Ressourcengruppe" },
      { id: "D", text: "zur gleichen Verfügbarkeitszone" },
    ],
    correct: "C",
    explanation: "Jede dem Abonnement zugewiesene Rolle wird nach unten weitergegeben und an alle Ressourcen vererbt, die unter dieses Abonnement fallen. Ebenso wird jede Rolle einer Ressourcengruppe an alle Ressourcen innerhalb dieser Ressourcengruppe vererbt. Diese Vererbung kann nicht blockiert werden, da sie so konzipiert ist und RBAC-Rollen je nach Anwendung der RBAC-Rolle von der obersten zur untersten Ebene weitergegeben werden.",
  },
  {
    id: "real-az900-70",
    topicId: "azure-verwaltung",
    prompt: "Ein Entwicklerteam in Ihrem Unternehmen plant, jede Woche 50 angepasste virtuelle Maschinen bereitzustellen und anschließend zu entfernen. 30 dieser virtuellen Maschinen laufen unter Windows Server 2016 und 20 unter Ubuntu Linux. Sie müssen empfehlen, welcher Azure-Dienst den Verwaltungsaufwand für die Bereitstellung und Entfernung der virtuellen Maschinen minimiert. Was sollten Sie empfehlen?",
    options: [
      { id: "A", text: "Azure Reservierte VM-Instanzen" },
      { id: "B", text: "Azure-VM-Skalierungsgruppen" },
      { id: "C", text: "Azure DevTest Labs" },
      { id: "D", text: "Microsoft Managed Desktop" },
    ],
    correct: "C",
    explanation: "Azure DevTest Labs ermöglicht Entwicklern in Teams die effiziente Selbstverwaltung virtueller Maschinen (VMs) und PaaS-Ressourcen, ohne auf Genehmigungen warten zu müssen. DevTest Labs erstellt Labs, die aus vorkonfigurierten Basis- oder Azure Resource Manager-Vorlagen bestehen. Diese verfügen über alle erforderlichen Tools und Software, mit denen Sie Umgebungen erstellen können. Sie können Umgebungen in wenigen Minuten erstellen, anstatt in Stunden oder Tagen. Mithilfe von DevTest Labs können Sie die neuesten Versionen Ihrer Anwendungen testen, indem Sie die folgenden Aufgaben ausführen: • Stellen Sie Windows- und Linux-Umgebungen mithilfe wiederverwendbarer Vorlagen und Artefakte schnell bereit. • Integrieren Sie Ihre Bereitstellungspipeline problemlos mit DevTest Labs, um On-Demand-Umgebungen bereitzustellen. • Skalieren Sie Ihre Belastungstests, indem Sie mehrere Testagenten bereitstellen und vorab bereitgestellte Umgebungen für Schulungen und Demos erstellen. DevTest Labs bietet Entwicklern, die mit VMs arbeiten, die folgenden Funktionen: • Erstellen Sie VMs schnell in weniger als fünf einfachen Schritten. • Wählen Sie aus einer kuratierten Liste von VM-Basen, die vom Teamleiter oder der zentralen IT konfiguriert, genehmigt und autorisiert wurden. • Erstellen Sie VMs aus vorgefertigten benutzerdefinierten Images, auf denen die gesamte Software und alle Tools bereits installiert sind. • Erstellen Sie VMs anhand von Formeln, bei denen es sich im Wesentlichen um benutzerdefinierte Images handelt, kombiniert mit den neuesten Builds der Software, die beim Erstellen der VMs installiert wird. • Installieren Sie Artefakte, bei denen es sich um Erweiterungen handelt, die auf VMs bereitgestellt werden, nachdem diese bereitgestellt wurden. • Legen Sie Zeitpläne für das automatische Herunterfahren und Starten von VMs fest. • Fordern Sie eine vorab erstellte VM an, ohne den Erstellungsprozess durchlaufen zu müssen.",
  },
  {
    id: "real-az900-71",
    topicId: "cloud-konzepte",
    prompt: "Sie verfügen über ein lokales Netzwerk mit 100 Servern. Sie möchten eine Lösung empfehlen, die Ihren Benutzern zusätzliche Ressourcen bietet. Die Lösung muss die Investitions- und Betriebskosten minimieren. Was sollte Ihre Empfehlung beinhalten?",
    options: [
      { id: "A", text: "Eine vollständige Migration in die Public Cloud" },
      { id: "B", text: "Ein zusätzliches Rechenzentrum" },
      { id: "C", text: "Eine private Cloud" },
      { id: "D", text: "Eine Hybrid Cloud" },
    ],
    correct: "D",
    explanation: "Eine Hybrid Cloud ist eine Computing-Umgebung, die eine öffentliche und eine private Cloud kombiniert und die gemeinsame Nutzung von Daten und Anwendungen ermöglicht. Bei schwankendem Rechen- und Verarbeitungsbedarf ermöglicht Hybrid Cloud Computing Unternehmen die nahtlose Skalierung ihrer lokalen Infrastruktur in die öffentliche Cloud, um Überlastungen zu bewältigen – ohne externen Rechenzentren Zugriff auf ihre gesamten Daten zu gewähren. Unternehmen profitieren von der Flexibilität und Rechenleistung der öffentlichen Cloud für grundlegende und weniger sensible Computing-Aufgaben, während geschäftskritische Anwendungen und Daten vor Ort, sicher hinter einer Unternehmens-Firewall, verbleiben. Die Nutzung einer Hybrid Cloud ermöglicht Unternehmen nicht nur die Skalierung ihrer Rechenressourcen, sondern vermeidet auch massive Investitionen zur Bewältigung kurzfristiger Nachfragespitzen sowie zur Freigabe lokaler Ressourcen für sensiblere Daten oder Anwendungen. Unternehmen zahlen nur für Ressourcen, die sie temporär nutzen, anstatt zusätzliche Ressourcen und Geräte kaufen, programmieren und warten zu müssen, die möglicherweise über längere Zeit ungenutzt bleiben. Hybrides Cloud Computing ist eine Plattform, die das Beste aus allen möglichen Welten vereint und alle Vorteile des Cloud Computing – Flexibilität, Skalierbarkeit und Kosteneffizienz – mit dem geringstmöglichen Risiko einer Datenfreigabe bietet.",
  },
  {
    id: "real-az900-72",
    topicId: "cloud-konzepte",
    prompt: "Sie planen die Migration mehrerer Server aus einem lokalen Netzwerk zu Azure. Sie müssen den Hauptvorteil der Nutzung eines öffentlichen Cloud-Dienstes für die Server ermitteln. Welche Vorteile sollten Sie ermitteln?",
    options: [
      { id: "A", text: "Die öffentliche Cloud ist Eigentum der Öffentlichkeit und NICHT eines privaten Unternehmens." },
      { id: "B", text: "Die öffentliche Cloud ist eine Crowdsourcing-Lösung, die Unternehmen die Möglichkeit bietet, die Cloud zu verbessern." },
      { id: "C", text: "Auf alle öffentlichen Cloud-Ressourcen kann jeder frei zugreifen." },
      { id: "D", text: "Die öffentliche Cloud ist eine gemeinsam genutzte Einheit, bei der mehrere Unternehmen jeweils einen Teil der Ressourcen in der Cloud nutzen." },
    ],
    correct: "D",
    explanation: "Microsoft Azure ist ein Beispiel für eine öffentliche Cloud. In einer öffentlichen Cloud teilen Sie Hardware, Speicher und Netzwerkgeräte mit anderen Organisationen oder Cloud-Mietern. Sie greifen über einen Webbrowser auf Dienste zu und verwalten Ihr Konto.",
  },
  {
    id: "real-az900-73",
    topicId: "azure-architektur",
    prompt: "Einige Fragensätze enthalten möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Bestimmen Sie, ob die Lösung die angegebenen Ziele erreicht. Sie planen die Bereitstellung mehrerer virtueller Azure-Computer. Sie müssen sicherstellen, dass die auf den virtuellen Computern ausgeführten Dienste verfügbar sind, wenn ein einzelnes Rechenzentrum ausfällt. Lösung: Sie stellen die virtuellen Computer in zwei oder mehr Skalierungsgruppen bereit. Wird damit das Ziel erreicht?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "B",
    explanation: "Wir gehen davon aus, dass die virtuellen Maschinen dieselben Dienste ausführen. Es geht darum, sicherzustellen, dass mindestens eine der virtuellen Maschinen betriebsbereit ist. Um die Verfügbarkeit von mehreren VMs sicherzustellen, müssen wir die VMs in verschiedenen Update- und Fehlerdomänen bereitstellen. Dazu können wir Verfügbarkeitszonen nutzen. Eine Verfügbarkeitszone ist ein logisches Rechenzentrum in einer Region, das jedem Azure-Kunden zur Verfügung steht. Jede Zone einer Region verfügt über redundante und separate Stromversorgung, Netzwerk und Konnektivität, um die Wahrscheinlichkeit eines gleichzeitigen Ausfalls zweier Zonen zu verringern.",
  },
  {
    id: "real-az900-74",
    topicId: "azure-architektur",
    prompt: "Einige Fragensätze haben möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Stellen Sie fest, ob die Lösung die angegebenen Ziele erreicht. Sie planen die Bereitstellung mehrerer virtueller Azure-Computer. Sie müssen sicherstellen, dass die auf den virtuellen Computern ausgeführten Dienste verfügbar sind, wenn ein einzelnes Rechenzentrum ausfällt. Lösung: Sie stellen die virtuellen Computer in zwei oder mehr Verfügbarkeitszonen bereit. Wird damit das Ziel erreicht?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "A",
    explanation: "Wir gehen davon aus, dass die virtuellen Maschinen dieselben Dienste ausführen. Es geht darum, sicherzustellen, dass mindestens eine der virtuellen Maschinen betriebsbereit ist. Um die Verfügbarkeit von mehreren VMs sicherzustellen, müssen wir die VMs in verschiedenen Update- und Fehlerdomänen bereitstellen. Dazu können wir Verfügbarkeitszonen nutzen. Eine Verfügbarkeitszone ist ein logisches Rechenzentrum in einer Region, das jedem Azure-Kunden zur Verfügung steht. Jede Zone einer Region verfügt über redundante und separate Stromversorgung, Netzwerk und Konnektivität, um die Wahrscheinlichkeit eines gleichzeitigen Ausfalls zweier Zonen zu verringern.",
  },
  {
    id: "real-az900-75",
    topicId: "azure-architektur",
    prompt: "Einige Fragensätze enthalten möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Bestimmen Sie, ob die Lösung die angegebenen Ziele erreicht. Sie planen die Bereitstellung mehrerer virtueller Azure-Computer. Sie müssen sicherstellen, dass die auf den virtuellen Computern ausgeführten Dienste verfügbar sind, wenn ein einzelnes Rechenzentrum ausfällt. Lösung: Sie stellen die virtuellen Computer in zwei oder mehr Regionen bereit. Wird damit das Ziel erreicht?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "A",
    explanation: "Wenn wir Ressourcen in verschiedenen Azure-Regionen bereitstellen, werden die Ressourcen in verschiedenen Rechenzentren bereitgestellt.",
  },
  {
    id: "real-az900-76",
    topicId: "azure-architektur",
    prompt: "Einige Fragensätze haben möglicherweise mehr als eine richtige Lösung, während andere möglicherweise keine richtige Lösung haben. Bestimmen Sie, ob die Lösung die angegebenen Ziele erreicht. Sie planen die Bereitstellung mehrerer virtueller Azure-Computer. Sie müssen sicherstellen, dass die auf den virtuellen Computern ausgeführten Dienste verfügbar sind, wenn ein einzelnes Rechenzentrum ausfällt. Lösung: Sie stellen die virtuellen Computer in zwei oder mehr Ressourcengruppen bereit. Wird damit das Ziel erreicht?",
    options: [
      { id: "A", text: "Ja" },
      { id: "B", text: "NEIN" },
    ],
    correct: "B",
    explanation: "Wir gehen davon aus, dass die virtuellen Maschinen dieselben Dienste ausführen. Es geht darum, sicherzustellen, dass mindestens eine der virtuellen Maschinen betriebsbereit ist. Um die Verfügbarkeit von mehreren VMs sicherzustellen, müssen wir die VMs in verschiedenen Update- und Fehlerdomänen bereitstellen. Dazu können wir Verfügbarkeitszonen nutzen. Eine Verfügbarkeitszone ist ein logisches Rechenzentrum in einer Region, das jedem Azure-Kunden zur Verfügung steht. Jede Zone einer Region verfügt über redundante und separate Stromversorgung, Netzwerk und Konnektivität, um die Wahrscheinlichkeit eines gleichzeitigen Ausfalls zweier Zonen zu verringern.",
  },
  {
    id: "real-az900-77",
    topicId: "azure-architektur",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Sie planen, 20 virtuelle Maschinen in einer Azure-Umgebung bereitzustellen. Um sicherzustellen, dass eine virtuelle Maschine namens VM1 keine Verbindung zu den anderen virtuellen Maschinen herstellen kann, muss VM1 in einem separaten virtuellen Netzwerk bereitgestellt werden . Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, mit der die Aussage richtig ist.",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "Führen Sie ein anderes Betriebssystem als die anderen virtuellen Maschinen aus" },
      { id: "C", text: "In einer separaten Ressourcengruppe bereitgestellt werden" },
      { id: "D", text: "Verfügt über zwei Netzwerkschnittstellen" },
    ],
    correct: "A",
    explanation: "Die Anweisung verwendet die beste verfügbare Option zur Vervollständigung. Keine Änderung erforderlich.",
  },
  {
    id: "real-az900-78",
    topicId: "azure-architektur",
    prompt: "Sie verfügen über eine Azure-Umgebung mit mehreren virtuellen Azure-Computern. Sie planen die Implementierung einer Lösung, die es den Clientcomputern in Ihrem lokalen Netzwerk ermöglicht, mit den virtuellen Azure-Computern zu kommunizieren. Sie müssen empfehlen, welche Azure-Ressourcen für die geplante Lösung erstellt werden müssen. Welche zwei Azure-Ressourcen sollten Sie in die Empfehlung aufnehmen? (Jede richtige Antwort stellt einen Teil der Lösung dar. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    options: [
      { id: "A", text: "Ein virtuelles Netzwerk-Gateway" },
      { id: "B", text: "Ein Load Balancer" },
      { id: "C", text: "Ein Anwendungsgateway" },
      { id: "D", text: "Ein virtuelles Netzwerk" },
      { id: "E", text: "Ein Gateway-Subnetz" },
    ],
    correct: "A",
    explanation: "Ihre virtuellen Maschinen in Azure müssen nicht von Ihrer lokalen Umgebung isoliert sein. Um virtuelle Azure-Maschinen mit Ihren lokalen Netzwerkressourcen zu verbinden, müssen Sie ein standortübergreifendes virtuelles Azure-Netzwerk konfigurieren. In Azure benötigen wir ein virtuelles Netzwerk und ein Gateway-Subnetz mit einem virtuellen Netzwerk-Gateway (VPN-Gateway) und einem lokalen Netzwerk- Gateway. Da unsere Azure-Umgebung mehrere virtuelle Azure-Maschinen enthält, sollte auch ein VNET vorhanden sein.",
  },
  {
    id: "real-az900-79",
    topicId: "azure-verwaltung",
    prompt: "Womit sollten Sie beurteilen, ob die Azure-Umgebung Ihres Unternehmens die gesetzlichen Anforderungen erfüllt?",
    options: [
      { id: "A", text: "Die Knowledge Center-Website" },
      { id: "B", text: "Das Advisor-Blade aus dem Azure-Portal" },
      { id: "C", text: "Compliance Manager aus dem Service Trust Portal" },
      { id: "D", text: "Das Security Center-Blade aus dem Azure-Portal" },
    ],
    correct: "C",
    explanation: "Compliance Manager ist ein Tool für Organisationen, mit dem sie ihre Compliance mit den Sicherheits- und Complianceanforderungen von Microsoft bewerten und verwalten können. Compliance Manager bietet über 360 regulatorische Vorlagen, mit denen Sie schnell Bewertungen erstellen können. Auf Compliance Manager kann über das Microsoft Purview-Complianceportal und das Service Trust Portal zugegriffen werden.",
  },
  {
    id: "real-az900-80",
    topicId: "azure-verwaltung",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Ihr Unternehmen implementiert Azure-Richtlinien , um Microsoft Word-Dokumenten mit Kreditkarteninformationen automatisch ein Wasserzeichen hinzuzufügen. ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, die die Aussage korrigiert.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "DDoS-Schutz" },
      { id: "C", text: "Azure Information Protection" },
      { id: "D", text: "Identitätsschutz für Azure Active Directory (Azure AD)" },
    ],
    correct: "C",
    explanation: "Azure Information Protection (AIP) ist eine Cloud-basierte Lösung, die es Organisationen ermöglicht, Dokumente und E-Mails durch das Anwenden von Bezeichnungen zu klassifizieren und zu schützen. Der Inhalt der Kennzeichnung umfasst: • Eine Klassifizierung , die unabhängig davon erkannt werden kann, wo die Daten gespeichert sind oder mit wem sie geteilt werden. • Visuelle Markierungen , wie Kopf- und Fußzeilen oder Wasserzeichen. • Metadaten , die Dateien und E-Mail-Headern im Klartext hinzugefügt werden. Die Klartext-Metadaten stellen sicher, dass andere Dienste die Klassifizierung erkennen und entsprechende Maßnahmen ergreifen können.",
  },
  {
    id: "real-az900-81",
    topicId: "azure-verwaltung",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er richtig ist. In Azure Monitor können Sie sehen, welcher Benutzer in den letzten 14 Tagen eine bestimmte virtuelle Maschine ausgeschaltet hat. ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch richtig ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, die die Aussage richtig macht.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "Azure Event Hubs" },
      { id: "C", text: "Azure-Aktivitätsprotokoll" },
      { id: "D", text: "Azure-Dienstintegrität" },
    ],
    correct: "C",
    explanation: "Sie können das Aktivitätsprotokoll verwenden, um anzuzeigen, welcher Benutzer eine bestimmte virtuelle Maschine ausgeschaltet hat. Das Aktivitätsprotokoll ist in Azure Monitor integriert. Die Aussage ist korrekt und muss nicht unbedingt geändert werden. Die Änderung von Azure Monitor in Azure-Aktivitätsprotokoll präzisiert die Aussage jedoch.",
  },
  {
    id: "real-az900-82",
    topicId: "azure-verwaltung",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Sie verfügen über ein virtuelles Azure-Netzwerk namens VNET1 in einer Ressourcengruppe namens RG1. Sie weisen eine Azure-Richtlinie zu, die angibt, dass virtuelle Netzwerke in RG1 kein zulässiger Ressourcentyp sind. VNET1 wird automatisch gelöscht . ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, die die Aussage korrigiert.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "wird automatisch in eine andere Ressourcengruppe verschoben" },
      { id: "C", text: "funktioniert weiterhin normal" },
      { id: "D", text: "ist jetzt ein schreibgeschütztes Objekt" },
    ],
    correct: "C",
    explanation: "Mit der Richtlinie „Nicht zulässige Ressourcentypen“ können Sie die Ressourcentypen angeben, die Ihre Organisation in einem bestimmten Bereich nicht bereitstellen kann. Vorhandene Ressourcen sind von der Richtlinie nicht betroffen.",
  },
  {
    id: "real-az900-83",
    topicId: "azure-verwaltung",
    prompt: "Ihr Unternehmen verfügt über eine Azure-Umgebung mit Ressourcen in mehreren Regionen. Eine Unternehmensrichtlinie besagt, dass Administratoren zusätzliche Azure-Ressourcen nur in einer Region des Landes erstellen dürfen, in dem sich ihr Büro befindet. Sie müssen die Azure-Ressource erstellen, die zur Erfüllung der Richtlinienanforderung verwendet werden muss. Was sollten Sie erstellen?",
    options: [
      { id: "A", text: "Eine schreibgeschützte Sperre" },
      { id: "B", text: "Eine Azure-Richtlinie" },
      { id: "C", text: "Eine Managementgruppe" },
      { id: "D", text: "Eine Reservierung" },
    ],
    correct: "B",
    explanation: "Azure Policy unterstützt Sie bei der Durchsetzung organisatorischer Standards und der bedarfsgerechten Compliance-Bewertung. Das Compliance-Dashboard bietet eine aggregierte Ansicht zur Bewertung des Gesamtzustands der Umgebung mit der Möglichkeit, Details pro Ressource und Richtlinie anzuzeigen. Azure Policy trägt außerdem dazu bei, die Compliance Ihrer Ressourcen durch Massenkorrekturen für vorhandene und automatische Korrekturen für neue Ressourcen zu gewährleisten. Zu den gängigen Anwendungsfällen von Azure Policy gehören die Implementierung von Governance für Ressourcenkonsistenz, Einhaltung gesetzlicher Vorschriften, Sicherheit, Kosten und Verwaltung. Richtliniendefinitionen für diese häufigen Anwendungsfälle sind bereits in Ihrer Azure-Umgebung integriert und erleichtern Ihnen den Einstieg.",
  },
  {
    id: "real-az900-84",
    topicId: "azure-verwaltung",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Bei der Autorisierung werden die Anmeldeinformationen eines Benutzers überprüft. ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, die die Aussage richtig macht.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "Authentifizierung" },
      { id: "C", text: "Föderation" },
      { id: "D", text: "Buchung" },
    ],
    correct: "B",
    explanation: "Bei der Authentifizierung werden Benutzer identifiziert, indem bestätigt wird, wer sie sind, während bei der Autorisierung die Rechte und Privilegien eines Benutzers festgelegt werden.",
  },
  {
    id: "real-az900-85",
    topicId: "azure-verwaltung",
    prompt: "Ihr Unternehmen plant, mehrere Server nach Azure zu migrieren. Die Compliance-Richtlinie des Unternehmens besagt, dass sich ein Server namens FinServer in einem separaten Netzwerksegment befinden muss. Sie prüfen, welche Azure-Dienste zur Erfüllung der Compliance-Richtlinienanforderungen verwendet werden können. Welche Azure-Lösung würden Sie empfehlen?",
    options: [
      { id: "A", text: "Eine Ressourcengruppe für FinServer und eine weitere Ressourcengruppe für alle anderen Server" },
      { id: "B", text: "Ein virtuelles Netzwerk für FinServer und ein weiteres virtuelles Netzwerk für alle anderen Server" },
      { id: "C", text: "Ein VPN für FinServer und ein virtuelles Netzwerk-Gateway für jeden anderen Server" },
      { id: "D", text: "Eine Ressourcengruppe für alle Server und eine Ressourcensperre für FinServer" },
    ],
    correct: "B",
    explanation: "Netzwerksegmentierung in der Computervernetzung bezeichnet die Aufteilung eines Computernetzwerks in Subnetze, die jeweils ein Netzwerksegment darstellen. Die Vorteile einer solchen Aufteilung liegen vor allem in der Leistungssteigerung und der Verbesserung der Sicherheit. Durch die Isolierung von Aspekten von Unternehmensnetzwerken – beispielsweise die Trennung der für die Arbeit der Mitarbeiter benötigten Ressourcen von den Gehaltsabrechnungsdaten – ermöglicht ein Netzwerksegment eine effektivere Kontrolle darüber, wer auf was Zugriff hat. Dies ist nicht nur für die interne Zugriffssteuerung unerlässlich, sondern kann auch dazu beitragen, die Bedrohung durch Cyberangriffe zu mindern.",
  },
  {
    id: "real-az900-86",
    topicId: "azure-verwaltung",
    prompt: "Ihr Unternehmen plant die Migration aller Netzwerkressourcen nach Azure. Beginnen Sie den Planungsprozess mit der Erkundung von Azure. Was sollten Sie zuerst erstellen?",
    options: [
      { id: "A", text: "Ein Abonnement" },
      { id: "B", text: "Eine Ressourcengruppe" },
      { id: "C", text: "Ein virtuelles Netzwerk" },
      { id: "D", text: "Eine Managementgruppe" },
    ],
    correct: "A",
    explanation: "Ein Azure-Abonnement verfügt über eine Vertrauensbeziehung mit Azure Active Directory (Azure AD). Ein Abonnement vertraut Azure AD bei der Authentifizierung von Benutzern, Diensten und Geräten. Mehrere Abonnements können demselben Azure AD-Verzeichnis vertrauen. Jedes Abonnement kann nur einem einzigen Verzeichnis vertrauen. Ein oder mehrere Azure-Abonnements können eine Vertrauensstellung mit einer Instanz von Azure Active Directory (Azure AD) herstellen, um Sicherheitsprinzipale und Geräte gegenüber Azure-Diensten zu authentifizieren und zu autorisieren. Wenn ein Abonnement abläuft, bleibt die vertrauenswürdige Instanz des Azure AD-Dienstes bestehen, die Sicherheitsprinzipale verlieren jedoch den Zugriff auf Azure-Ressourcen. Wenn sich ein Benutzer für einen Microsoft-Clouddienst anmeldet, wird ein neuer Azure AD-Mandant erstellt und der Benutzer erhält die Rolle „Globaler Administrator“. Wenn der Besitzer eines Abonnements sein Abonnement jedoch einem vorhandenen Mandanten hinzufügt, wird ihm nicht die Rolle „Globaler Administrator“ zugewiesen. Alle Ihre Benutzer verfügen über ein einziges Basisverzeichnis zur Authentifizierung. Ihre Benutzer können auch Gäste in anderen Verzeichnissen sein. Sie können sowohl das Basis- als auch das Gastverzeichnis für jeden Benutzer in Azure AD sehen.",
  },
  {
    id: "real-az900-87",
    topicId: "azure-verwaltung",
    prompt: "Sie verfügen über eine lokale Anwendung, die basierend auf einer Regel automatisch E-Mail-Benachrichtigungen versendet. Sie planen, die Anwendung zu Azure zu migrieren. Sie benötigen eine serverlose Computing-Lösung für die Anwendung. Was sollte die Empfehlung enthalten?",
    options: [
      { id: "A", text: "Eine Web-App" },
      { id: "B", text: "Ein Serverimage im Azure Marketplace" },
      { id: "C", text: "Eine Logik-App" },
      { id: "D", text: "Eine API-App" },
    ],
    correct: "C",
    explanation: "Azure Logic Apps ist ein Clouddienst, der Sie bei der Planung, Automatisierung und Orchestrierung von Aufgaben, Geschäftsprozessen und Workflows unterstützt, wenn Sie Apps, Daten, Systeme und Dienste unternehmens- oder organisationsübergreifend integrieren müssen. Logic Apps vereinfacht das Entwerfen und Erstellen skalierbarer Lösungen für die App-Integration, Datenintegration, Systemintegration, Enterprise Application Integration (EAI) und Business-to-Business-Kommunikation (B2B) – ob in der Cloud, vor Ort oder beidem. Hier sind beispielsweise nur einige Workloads, die Sie mit Logik-Apps automatisieren können: • Verarbeiten und leiten Sie Bestellungen über lokale Systeme und Cloud-Dienste weiter. • Senden Sie mit Office 365 E-Mail-Benachrichtigungen, wenn Ereignisse in verschiedenen Systemen, Apps und Diensten auftreten. • Verschieben Sie hochgeladene Dateien von einem SFTP- oder FTP-Server in Azure Storage. • Überwachen Sie Tweets zu einem bestimmten Thema, analysieren Sie die Stimmung und erstellen Sie Warnungen oder Aufgaben für Elemente, die überprüft werden müssen. Für die Entwicklung von Unternehmensintegrationslösungen mit Azure Logic Apps steht Ihnen eine wachsende Auswahl an einsatzbereiten Konnektoren zur Verfügung, darunter Dienste wie Azure Service Bus, Azure Functions, Azure Storage, SQL Server, Office 365, Dynamics, Salesforce, BizTalk, SAP, Oracle DB, Dateifreigaben und mehr. Konnektoren bieten Trigger, Aktionen oder beides zum Erstellen von Logik-Apps, die sicher auf Daten in Echtzeit zugreifen und diese verarbeiten.",
  },
  {
    id: "real-az900-88",
    topicId: "azure-architektur",
    prompt: "Sie planen die Bereitstellung einer Website in Azure. Die Website wird von Benutzern weltweit aufgerufen und enthält große Videodateien. Sie möchten empfehlen, welche Azure-Funktion für eine optimale Videowiedergabe verwendet werden sollte. Was sollten Sie empfehlen?",
    options: [
      { id: "A", text: "Ein Anwendungsgateway" },
      { id: "B", text: "Eine Azure ExpressRoute-Verbindung" },
      { id: "C", text: "Ein Content Delivery Network (CDN)" },
      { id: "D", text: "Ein Azure Traffic Manager-Profil" },
    ],
    correct: "C",
    explanation: "Azure Content Delivery Network (CDN) ist eine globale CDN-Lösung für die Bereitstellung von Inhalten mit hoher Bandbreite. Es kann in Azure oder an einem anderen Standort gehostet werden. Mit Azure CDN können Sie statische Objekte, die aus Azure Blob Storage, einer Webanwendung oder einem öffentlich zugänglichen Webserver geladen wurden, zwischenspeichern, indem Sie den nächstgelegenen Point of Presence (POP)-Server verwenden. Azure CDN kann auch dynamische Inhalte, die nicht zwischengespeichert werden können, durch verschiedene Netzwerk- und Routingoptimierungen beschleunigen.",
  },
  {
    id: "real-az900-89",
    topicId: "azure-architektur",
    prompt: "Ihr Unternehmen plant die Bereitstellung mehrerer Millionen Sensoren, die Daten nach Azure hochladen. Sie müssen ermitteln, welche Azure-Ressourcen zur Unterstützung der geplanten Lösung erstellt werden müssen. Welche zwei Azure-Ressourcen sollten Sie identifizieren? (Jede richtige Antwort stellt einen Teil der Lösung dar. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    options: [
      { id: "A", text: "Azure Data Lake" },
      { id: "B", text: "Azure-Warteschlangenspeicher" },
      { id: "C", text: "Azure-Dateispeicher" },
      { id: "D", text: "Azure IoT Hub" },
      { id: "E", text: "Azure Notification Hubs" },
    ],
    correct: "A",
    explanation: "IoT Hub ist ein verwalteter, in der Cloud gehosteter Dienst, der als zentraler Nachrichten-Hub für die bidirektionale Kommunikation zwischen Ihrer IoT-Anwendung und den von ihr verwalteten Geräten fungiert. Mit Azure IoT Hub können Sie IoT-Lösungen mit zuverlässiger und sicherer Kommunikation zwischen Millionen von IoT- Geräten und einem in der Cloud gehosteten Lösungs-Back-End erstellen. Sie können praktisch jedes Gerät mit IoT Hub verbinden. IoT Hub unterstützt die Kommunikation sowohl vom Gerät zur Cloud als auch von der Cloud zum Gerät. IoT Hub unterstützt mehrere Nachrichtenmuster wie Gerät-zu- Cloud-Telemetrie, Dateiupload von Geräten und Anforderung-Antwort-Methoden zur Steuerung Ihrer Geräte aus der Cloud. Die IoT Hub-Überwachung hilft Ihnen, die Integrität Ihrer Lösung zu erhalten, indem Ereignisse wie Geräteerstellung, Geräteausfälle und Geräteverbindungen nachverfolgt werden. Die Funktionen von IoT Hub unterstützen Sie beim Erstellen skalierbarer, voll funktionsfähiger IoT-Lösungen, z. B. zur Verwaltung von Industrieanlagen in der Fertigung, zur Nachverfolgung wertvoller Vermögenswerte im Gesundheitswesen und zur Überwachung der Bürogebäudenutzung. Ein IoT Hub verfügt über einen standardmäßig integrierten Endpunkt (Nachrichten/Ereignisse), der mit Event Hubs kompatibel ist. Sie können benutzerdefinierte Endpunkte zum Weiterleiten von Nachrichten erstellen, indem Sie andere Dienste in Ihrem Abonnement mit dem IoT Hub verknüpfen. IoT Hub unterstützt derzeit die folgenden Endpunkte: • Integrierter Endpunkt • Azure-Speicher • Service Bus-Warteschlangen und Service Bus-Themen • Ereignis-Hubs Referenzen: Was ist Azure IoT Hub? Verwenden Sie IoT Hub-Nachrichtenrouting, um Gerät-zu-Cloud-Nachrichten an verschiedene Endpunkte zu senden",
  },
  {
    id: "real-az900-90",
    topicId: "azure-verwaltung",
    prompt: "Ihr Unternehmen plant, die Bereitstellung von Servern in Azure zu automatisieren. Ihr Vorgesetzter befürchtet, dass Sie während der Bereitstellung Administratoranmeldeinformationen preisgeben könnten. Sie müssen eine Azure-Lösung empfehlen, die die Administratoranmeldeinformationen während der Bereitstellung verschlüsselt. Was sollte Ihre Empfehlung beinhalten?",
    options: [
      { id: "A", text: "Azure-Schlüsseltresor" },
      { id: "B", text: "Azure Information Protection" },
      { id: "C", text: "Azure-Sicherheitscenter" },
      { id: "D", text: "Azure Multi-Factor Authentication (MFA)" },
    ],
    correct: "A",
    explanation: "Sichere Schlüsselverwaltung ist unerlässlich, um Daten in der Cloud zu schützen. Verwenden Sie Azure Key Vault, um Schlüssel und kleine Geheimnisse wie Passwörter mithilfe von Schlüsseln zu verschlüsseln, die in Hardware-Sicherheitsmodulen (HSMs) gespeichert sind. Für mehr Sicherheit importieren oder generieren Sie Schlüssel in HSMs. Microsoft verarbeitet Ihre Schlüssel dann in FIPS-validierten HSMs (Hardware und Firmware) – FIPS 140-2 Level 2 für Tresore und FIPS 140-2 Level 3 für HSM-Pools. Mit Key Vault sieht oder extrahiert Microsoft Ihre Schlüssel nicht.",
  },
  {
    id: "real-az900-91",
    topicId: "azure-architektur",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Wenn eine Ressourcengruppe namens RG1 eine Löschsperre hat, kann nur ein Mitglied der globalen Administratorengruppe RG1 löschen. ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, die die Aussage richtig macht.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "Die Löschsperre muss entfernt werden, bevor ein Administrator" },
      { id: "C", text: "Eine Azure-Richtlinie muss geändert werden, bevor ein Administrator" },
      { id: "D", text: "Ein Azure-Tag muss hinzugefügt werden, bevor ein Administrator" },
    ],
    correct: "B",
    explanation: "Azure-Ressourcensperren gelten für alle Benutzer, einschließlich globaler Administratoren. Ressourcensperren verhindern, dass Benutzer und Administratoren in Ihrer Organisation versehentlich kritische Ressourcen löschen oder ändern.",
  },
  {
    id: "real-az900-92",
    topicId: "azure-architektur",
    prompt: "Sie müssen eine Azure-Lösung konfigurieren, die die folgenden Anforderungen erfüllt: • Schützt Websites vor Angriffen • Erstellt Berichte, die Details zu versuchten Angriffen enthalten Was sollte in die Lösung aufgenommen werden?",
    options: [
      { id: "A", text: "Azure Web Application Firewall (WAF)" },
      { id: "B", text: "Eine Netzwerksicherheitsgruppe (NSG)" },
      { id: "C", text: "Azure Information Protection" },
      { id: "D", text: "DDoS-Schutz" },
    ],
    correct: "A",
    explanation: "Azure Web Application Firewall (WAF) auf Azure Application Gateway bietet zentralen Schutz für Ihre Webanwendungen vor gängigen Exploits und Sicherheitsrisiken. Webanwendungen sind zunehmend Ziel bösartiger Angriffe, die bekannte Sicherheitsrisiken ausnutzen. SQL-Injection und Cross-Site-Scripting gehören zu den häufigsten Angriffen. Hinweis: DoS Protection Standard wird auf öffentliche IP-Adressen angewendet, die mit in virtuellen Netzwerken bereitgestellten Ressourcen verknüpft sind, z. B. Azure Load Balancer, Azure Application Gateway und Azure Service Fabric-Instanzen. Dieser Schutz gilt jedoch NICHT für App Service-Umgebungen.",
  },
  {
    id: "real-az900-93",
    topicId: "azure-verwaltung",
    prompt: "Ihr Unternehmen plant, alle lokalen Daten nach Azure zu migrieren. Sie müssen feststellen, ob Azure den regionalen Anforderungen des Unternehmens entspricht. Welche Lösung sollten Sie verwenden?",
    options: [
      { id: "A", text: "Das Wissenszentrum" },
      { id: "B", text: "Azure Marketplace" },
      { id: "C", text: "Das Azure-Portal" },
      { id: "D", text: "Das Trust Center" },
    ],
    correct: "D",
    explanation: "Das Microsoft Trust Center ist für alle interessant, die wissen möchten, wie Microsoft weltweit Gesetze einhält.",
  },
  {
    id: "real-az900-94",
    topicId: "azure-architektur",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Azure Key Vault wird zum Speichern von Geheimnissen für Azure Active Directory (Azure AD)-Benutzerkonten verwendet . ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, mit der die Aussage richtig ist.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "Azure Active Directory (Azure AD)-Administratorkonten" },
      { id: "C", text: "Persönlich identifizierbare Informationen (PII)" },
      { id: "D", text: "Serveranwendungen" },
    ],
    correct: "D",
    explanation: "Durch die zentrale Speicherung von Anwendungsgeheimnissen in Azure Key Vault können Sie deren Verteilung steuern. Key Vault reduziert das Risiko eines versehentlichen Verlusts von Geheimnissen erheblich. Bei Verwendung von Key Vault müssen Anwendungsentwickler keine Sicherheitsinformationen mehr in ihrer Anwendung speichern. Da Sicherheitsinformationen nicht in Anwendungen gespeichert werden müssen, entfällt die Notwendigkeit, diese Informationen in den Code zu integrieren. Beispielsweise muss eine Anwendung möglicherweise eine Verbindung zu einer Datenbank herstellen. Anstatt die Verbindungszeichenfolge im Code der App zu speichern, können Sie sie sicher in Key Vault speichern. Azure Key Vault hilft bei der Lösung der folgenden Probleme: • Geheimnisverwaltung – Azure Key Vault kann verwendet werden, um Token, Passwörter, Zertifikate, API-Schlüssel und andere Geheimnisse sicher zu speichern und den Zugriff darauf streng zu kontrollieren. • Schlüsselverwaltung : Azure Key Vault kann auch als Schlüsselverwaltungslösung verwendet werden. Azure Key Vault erleichtert das Erstellen und Verwalten der Verschlüsselungsschlüssel, die zum Verschlüsseln Ihrer Daten verwendet werden. • Zertifikatsverwaltung – Azure Key Vault ist auch ein Dienst, mit dem Sie öffentliche und private Transport Layer Security/Secure Sockets Layer (TLS/SSL)- Zertifikate für die Verwendung mit Azure und Ihren intern verbundenen Ressourcen einfach bereitstellen, verwalten und einsetzen können. • Speichern Sie Geheimnisse, die durch Hardware-Sicherheitsmodule gesichert sind – Die Geheimnisse, Schlüssel und Zertifikate im Speicher werden entweder mit einem Softwareschlüssel (Standardstufe) oder einem FIPS 140-2 Level 2-validierten HSM-Schlüssel (Premiumstufe) verschlüsselt.",
  },
  {
    id: "real-az900-95",
    topicId: "azure-verwaltung",
    prompt: "Sie versuchen, mehrere verwaltete Microsoft SQL Server-Instanzen in einer Azure-Umgebung zu erstellen und erhalten die Meldung, dass Sie Ihre Azure- Abonnementlimits erhöhen müssen. Was können Sie tun, um die Limits zu erhöhen?",
    options: [
      { id: "A", text: "Erstellen einer Dienstintegritätswarnung" },
      { id: "B", text: "Aktualisieren Sie Ihren Supportplan" },
      { id: "C", text: "Ändern einer Azure-Richtlinie" },
      { id: "D", text: "Erstellen Sie eine neue Supportanfrage" },
    ],
    correct: "D",
    explanation: "Für einige Dienste sind anpassbare Limits verfügbar. Wenn Sie das Limit oder Kontingent über das Standardlimit hinaus erhöhen möchten, können Sie kostenlos eine Online- Kundensupportanfrage stellen.",
  },
  {
    id: "real-az900-96",
    topicId: "azure-verwaltung",
    prompt: "Ihr Unternehmen verfügt über zehn Niederlassungen. Sie planen, mehrere Abrechnungsberichte über das Azure-Portal zu erstellen. Jeder Bericht enthält die Azure- Ressourcennutzung der einzelnen Niederlassungen. Welche Azure Resource Manager-Funktion sollten Sie vor der Berichterstellung verwenden?",
    options: [
      { id: "A", text: "Schlagwörter" },
      { id: "B", text: "Vorlagen" },
      { id: "C", text: "Schlösser" },
      { id: "D", text: "Richtlinien" },
    ],
    correct: "A",
    explanation: "Sie wenden Tags auf Ihre Azure-Ressourcen, Ressourcengruppen und Abonnements an, um sie logisch in einer Taxonomie zu organisieren. Jedes Tag besteht aus einem Namen und einem Wert. Wir sollten die Ressourcen pro Büro taggen.",
  },
  {
    id: "real-az900-97",
    topicId: "cloud-konzepte",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er richtig ist. Azure Deutschland kann nur von Personen mit legalem Wohnsitz in Deutschland genutzt werden . ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch richtig ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, mit der die Aussage richtig ist.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "nur Unternehmen mit Sitz in Deutschland" },
      { id: "C", text: "nur Unternehmen, die ihre Azure-Lizenzen von einem Partner mit Sitz in Deutschland beziehen" },
      { id: "D", text: "alle Benutzer oder Unternehmen, deren Daten in Deutschland gespeichert sein müssen" },
    ],
    correct: "D",
    explanation: "Microsoft Azure Deutschland bietet eine Cloud-Plattform, die auf den Grundprinzipien von Sicherheit, Datenschutz, Compliance und Transparenz basiert. Azure Deutschland ist eine physisch isolierte Instanz von Microsoft Azure. Sie nutzt erstklassige Sicherheits- und Compliance-Dienste, die für die Einhaltung deutscher Datenschutzbestimmungen für alle auf ihrer Architektur basierenden Systeme und Anwendungen unerlässlich sind. Azure Deutschland steht berechtigten Kunden und Partnern weltweit zur Verfügung, die in der EU/EFTA, einschließlich Großbritannien, geschäftlich tätig sein möchten.",
  },
  {
    id: "real-az900-98",
    topicId: "azure-architektur",
    prompt: "Hinweis: Bei dieser Frage müssen Sie den unterstrichenen Text prüfen, um festzustellen, ob er korrekt ist. Nachdem Sie eine virtuelle Maschine erstellt haben, müssen Sie die Netzwerksicherheitsgruppe (NSG) ändern , um Verbindungen von TCP-Port 8080 zur virtuellen Maschine zuzulassen. ( Anleitung: Überprüfen Sie den unterstrichenen Text. Wenn die Aussage dadurch korrekt ist, wählen Sie „Keine Änderung erforderlich“. Wenn die Aussage falsch ist, wählen Sie die Antwortmöglichkeit, die die Aussage richtig macht.)",
    options: [
      { id: "A", text: "Es ist keine Änderung erforderlich" },
      { id: "B", text: "virtuelles Netzwerkgateway" },
      { id: "C", text: "virtuelles Netzwerk" },
      { id: "D", text: "Routentabelle" },
    ],
    correct: "A",
    explanation: "Eine Netzwerksicherheitsgruppe enthält Sicherheitsregeln, die eingehenden Netzwerkverkehr zu bzw. ausgehenden Netzwerkverkehr von verschiedenen Azure- Ressourcen zulassen oder verweigern. Für jede Regel können Sie Quelle und Ziel, Port und Protokoll angeben. Eingehender Datenverkehr über Port 8080 TCP wird beim Erstellen einer neuen Azure-VM standardmäßig blockiert.",
  },
  {
    id: "real-az900-99",
    topicId: "azure-architektur",
    prompt: "Welchen Azure-Dienst sollten Sie zum Speichern von Zertifikaten verwenden?",
    options: [
      { id: "A", text: "Azure-Sicherheitscenter" },
      { id: "B", text: "Ein Azure Storage-Konto" },
      { id: "C", text: "Azure-Schlüsseltresor" },
      { id: "D", text: "Azure Information Protection" },
    ],
    correct: "C",
    explanation: "Durch die zentrale Speicherung von Anwendungsgeheimnissen in Azure Key Vault können Sie deren Verteilung steuern. Key Vault reduziert das Risiko eines versehentlichen Verlusts von Geheimnissen erheblich. Bei Verwendung von Key Vault müssen Anwendungsentwickler keine Sicherheitsinformationen mehr in ihrer Anwendung speichern. Da Sicherheitsinformationen nicht in Anwendungen gespeichert werden müssen, entfällt die Notwendigkeit, diese Informationen in den Code zu integrieren. Beispielsweise muss eine Anwendung möglicherweise eine Verbindung zu einer Datenbank herstellen. Anstatt die Verbindungszeichenfolge im Code der App zu speichern, können Sie sie sicher in Key Vault speichern. Azure Key Vault hilft bei der Lösung der folgenden Probleme: • Geheimnisverwaltung – Azure Key Vault kann verwendet werden, um Token, Passwörter, Zertifikate, API-Schlüssel und andere Geheimnisse sicher zu speichern und den Zugriff darauf streng zu kontrollieren. • Schlüsselverwaltung : Azure Key Vault kann auch als Schlüsselverwaltungslösung verwendet werden. Azure Key Vault erleichtert das Erstellen und Verwalten der Verschlüsselungsschlüssel, die zum Verschlüsseln Ihrer Daten verwendet werden. • Zertifikatsverwaltung – Azure Key Vault ist auch ein Dienst, mit dem Sie öffentliche und private Transport Layer Security/Secure Sockets Layer (TLS/SSL)- Zertifikate für die Verwendung mit Azure und Ihren intern verbundenen Ressourcen einfach bereitstellen, verwalten und einsetzen können. • Speichern Sie Geheimnisse, die durch Hardware-Sicherheitsmodule gesichert sind – Die Geheimnisse, Schlüssel und Zertifikate im Speicher werden entweder mit einem Softwareschlüssel (Standardstufe) oder einem FIPS 140-2 Level 2-validierten HSM-Schlüssel (Premiumstufe) verschlüsselt.",
  },
  {
    id: "real-az900-100",
    topicId: "azure-verwaltung",
    prompt: "Sie verfügen über eine Ressourcengruppe namens RG1. Sie planen, in RG1 virtuelle Netzwerke und App-Dienste zu erstellen. Sie möchten die Erstellung virtueller Maschinen ausschließlich in RG1 verhindern. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Ein Schloss" },
      { id: "B", text: "Eine Azure-Rolle" },
      { id: "C", text: "Ein Tag" },
      { id: "D", text: "Eine Azure-Richtlinie" },
    ],
    correct: "D",
    explanation: "Azure Policy wertet Ressourcen in Azure aus, indem es deren Eigenschaften mit Geschäftsregeln vergleicht. Diese im JSON-Format beschriebenen Geschäftsregeln werden als Richtliniendefinitionen bezeichnet. Zur Vereinfachung der Verwaltung können mehrere Geschäftsregeln zu einer Richtlinieninitiative (auch PolicySet genannt) zusammengefasst werden. Sobald Ihre Geschäftsregeln erstellt sind, wird die Richtliniendefinition oder -initiative jedem von Azure unterstützten Ressourcenbereich zugewiesen, z. B. Verwaltungsgruppen, Abonnements, Ressourcengruppen oder einzelnen Ressourcen. Die Zuweisung gilt für alle Ressourcen innerhalb des Resource Manager-Bereichs dieser Zuweisung. Unterbereiche können bei Bedarf ausgeschlossen werden. Weitere Informationen finden Sie unter Geltungsbereich in Azure Policy. Azure Policy verwendet ein JSON-Format, um die Logik zu erstellen, mit der die Auswertung ermittelt, ob eine Ressource konform ist oder nicht. Definitionen umfassen Metadaten und die Richtlinienregel. Die definierte Regel kann Funktionen, Parameter, logische Operatoren, Bedingungen und Eigenschaftsaliase verwenden, um genau dem gewünschten Szenario zu entsprechen. Die Richtlinienregel bestimmt, welche Ressourcen im Rahmen der Zuweisung ausgewertet werden.",
  },
];
