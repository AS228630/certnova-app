// Practice-question data for AB-900 (Microsoft 365 Copilot).
//
// AB900_QUESTIONS contains REAL exam-prep questions extracted directly from
// the user's authoritative German/English bilingual PDF (Ab-900.pdf). Per
// explicit instruction, only the German content was extracted — no English
// text is present in the final content.
//
// PROGRESS: 100 questions from the original PDF extraction (real-ab900-1
// through real-ab900-101, with real-ab900-3 removed after being found to
// be a broken duplicate with the wrong correct answer — see real-ab900-102
// below for the corrected version), plus additional real questions
// (starting at real-ab900-102) added afterward from a second source
// (cert2brain.com screenshots), each cross-checked for duplicates against
// the existing bank before being added. The original PDF's own question
// numbering goes up to 104,
// but a careful count (verified independently three ways: block-splitting,
// counting "Antwort:" answer pages, and a full manual page-by-page listing)
// confirms the PDF contains exactly 101 complete question+answer pairs — the
// printed number 104 does not equal the true count because several numbers
// are reused in the source document for entirely different questions (e.g.
// two distinct questions both printed as "23."), and question 50 was never
// printed as its own page at all. Every answer was verified against the raw
// PDF text; a number of questions with corrupted/incomplete German text in the
// source PDF (missing intro sentences, truncated multi-line statements, or a
// stray formatting quirk breaking automated parsing) were manually
// reconstructed using ONLY text taken directly from elsewhere in this same
// document (its own standard instruction sentences, or hand-transcribing the
// correct raw paragraph) — nothing was invented. See scripts/ab900-extraction/
// for the extraction/parsing/patch scripts used.

import type { PracticeQuestion, PracticeTopic, SingleChoiceQuestion, YesNoQuestion } from "./az900Practice";

export const AB900_TOPICS: PracticeTopic[] = [
  { id: "copilot-grundlagen", title: "Microsoft 365 Copilot Grundlagen", totalQuestions: 28 },
  { id: "copilot-agenten", title: "Copilot-Agenten verwalten", totalQuestions: 12 },
  { id: "sicherheit-identitaet", title: "Sicherheit und Identität", totalQuestions: 20 },
  { id: "purview-compliance", title: "Purview und Compliance", totalQuestions: 27 },
  { id: "verwaltung-governance", title: "Verwaltung und Governance", totalQuestions: 13 },
  { id: "verantwortungsvolle-ki", title: "Verantwortungsvolle KI", totalQuestions: 2 },
];

export const AB900_QUESTIONS: PracticeQuestion[] = [
  {
    type: "yesno",
    id: "real-ab900-1",
    topicId: "copilot-grundlagen",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein.",
    statements: [
      { text: "Um Microsoft 365 Copilot Chat zu verwenden, um über Webdaten zu argumentieren, benötigen Sie eine Microsoft 365 Copilot-Lizenz", correct: "Nein" },
      { text: "Um den Researcher-Agenten in Microsoft 365 Copilot zu verwenden, benötigen Sie eine Microsoft 365 Copilot-Lizenz", correct: "Ja" },
      { text: "Um einen Agenten in der Microsoft 365 Copilot-App hinzuzufügen, benötigen Sie eine Microsoft 365 Copilot-Lizenz", correct: "Nein" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Organisationen setzen in der Regel eine Kombination aus Microsoft 365 Copilot Chat und Microsoft 365 Copilot ein. Microsoft 365 Copilot Chat steht allen Microsoft Entra-Benutzern mit einem Microsoft 365- oder Office 365-Abonnement ohne zusätzliche Kosten zur Verfügung – auch für das Argumentieren über Web-Daten wird also keine Copilot-Lizenz benötigt. Der Researcher-Agent ist dagegen ein intelligenter Assistent für komplexe, mehrstufige Recherchen, der einen strukturierten, quellenbelegten Bericht liefert und dabei Web-Daten sowie – am Arbeitsplatz – Dateien, E-Mails, Besprechungen und Chats einbezieht, auf die der Benutzer bereits Zugriff hat; er steht ausschließlich Microsoft 365 Premium-Abonnenten sowie Business-/Enterprise-Benutzern mit einer Microsoft 365 Copilot-Add-on-Lizenz zur Verfügung. Mitglieder einer Organisation können zudem kostenlose Agenten aus dem Agent Store nutzen, sofern der Administrator diese aktiviert hat; Agenten, die auf Unternehmensdaten zugreifen, werden stattdessen nach tatsächlichem Verbrauch abgerechnet – für das bloße Hinzufügen eines Agenten in der App ist somit ebenfalls keine Copilot-Lizenz erforderlich.",
    resources: [
      { label: "Prerequisites for managing agents in Microsoft 365", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/agent-essentials/agent-prerequisites" },
      { label: "Get started with Researcher in Microsoft 365 Copilot", url: "https://support.microsoft.com/en-us/topic/get-started-with-researcher-in-microsoft-365-copilot-e63ab760-f3de-4c47-ae87-dad601b0e9c4" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-2",
    topicId: "copilot-grundlagen",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein.",
    statements: [
      { text: "Microsoft 365 Copilot zeigt nur die organisatorischen Daten an, für die einzelne Benutzer Berechtigungen haben", correct: "Ja" },
      { text: "Microsoft 365 Copilot verwendet dieselben zugrunde liegenden Kontrollen für den Datenzugriff wie andere Microsoft 365-Dienste", correct: "Ja" },
      { text: "Microsoft 365 Copilot kann Konnektoren verwenden, um Informationen aus Datenquellen von Drittanbietern abzurufen", correct: "Ja" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Ja"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Microsoft 365 Copilot schafft Mehrwert, indem es große Sprachmodelle (LLMs) mit den organisatorischen Daten verbindet. Über Microsoft Graph greift Copilot auf Inhalte und Kontext zu und kann Antworten generieren, die in echten Organisationsdaten verankert sind – etwa Dokumenten, E-Mails, Kalendern, Chats, Besprechungen und Kontakten. Diese Inhalte werden mit dem aktuellen Arbeitskontext des Benutzers kombiniert (z. B. die laufende Besprechung, frühere E-Mail-Verläufe zu einem Thema oder Chat-Unterhaltungen der letzten Woche), um präzise und relevante Antworten zu liefern. Copilot zeigt dabei ausschließlich organisatorische Daten an, für die der jeweilige Benutzer mindestens Anzeigeberechtigungen besitzt – es gelten also dieselben Berechtigungsmodelle wie in den übrigen Microsoft 365-Diensten (z. B. SharePoint), weshalb eine korrekte Rechtevergabe in diesen Diensten entscheidend bleibt. Zusätzlich lassen sich über Copilot-Konnektoren externe Daten aus Drittanbieter-Quellen einbinden: synchronisierte Konnektoren indizieren externe Inhalte in Microsoft Graph, während föderierte Konnektoren (aktuell als Early-Access-Vorschau über das Model Context Protocol, MCP) Inhalte in Echtzeit abrufen, ohne sie zu indizieren.",
    resources: [
      { label: "Data, Privacy, and Security for Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy" },
      { label: "Microsoft 365 Copilot connectors overview", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/overview-copilot-connector" },
    ],
  },
  {
    id: "real-ab900-102",
    topicId: "copilot-agenten",
    prompt: "Sie müssen sicherstellen, dass Benutzer ein externes System als Wissensquelle für benutzerdefinierte Microsoft 365 Copilot-Agenten nutzen können. Was sollten Sie im Microsoft 365 Admin Center konfigurieren? (Wählen Sie zur Beantwortung die entsprechenden Einstellungen im Antwortbereich aus.)",
    blankFill: {
      template: "Sie sollten ___ im Microsoft 365 Admin Center konfigurieren.",
      choices: ["Copilot – Konnektoren", "Copilot – Suche", "Copilot – Einstellungen", "Agenten – Übersicht", "Agenten – Tools", "Agenten – Einstellungen"],
    },
    options: [
      { id: "A", text: "Copilot – Konnektoren" },
      { id: "B", text: "Copilot – Suche" },
      { id: "C", text: "Copilot – Einstellungen" },
      { id: "D", text: "Agenten – Übersicht" },
      { id: "E", text: "Agenten – Tools" },
      { id: "F", text: "Agenten – Einstellungen" },
    ],
    correct: "A",
    imageUrl: "/exam-images/ab900-q102.png",
    explanation: "Microsoft 365 Copilot-Konnektoren erweitern die Reichweite von Microsoft 365 Copilot und der Microsoft Search-Erlebnisse, indem sie eine Verbindung zu Daten außerhalb von Microsoft 365 herstellen. Ihre Organisation kann externe Daten entweder mithilfe synchronisierter Konnektoren indizieren oder mithilfe föderierter Konnektoren (Early-Access-Vorschau) in Echtzeit mit Daten verbinden. Diese Flexibilität stellt sicher, dass Benutzer sowohl Unternehmens- als auch externe Datenquellen sicher innerhalb der Microsoft 365-Apps und Copilot-Erlebnisse durchsuchen und mit ihnen interagieren können.",
    resources: [
      { label: "Connectors overview", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/overview" },
      { label: "Microsoft 365 Copilot connectors overview", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/overview-copilot-connector" },
    ],
  },
  {
    id: "real-ab900-102-displaced-researcher-multistep-reasoning",
    topicId: "copilot-agenten",
    prompt: "Um den Satz zu vervollständigen, wählen Sie im Antwortbereich die entsprechende Option aus.",
    blankFill: {
      template: "In Microsoft 365 Copilot sollten Sie ___ verwenden, um mehrstufiges Schlussfolgern über unstrukturierte Daten durchzuführen.",
      choices: ["ein Notizbuch", "den Chat", "den Analyst-Agenten", "den Researcher-Agenten"],
    },
    options: [
      { id: "A", text: "In Microsoft 365 Copilot sollten Sie ein Notizbuch verwenden, um mehrstufiges Schlussfolgern über unstrukturierte Daten durchzuführen." },
      { id: "B", text: "In Microsoft 365 Copilot sollten Sie den Chat verwenden, um mehrstufiges Schlussfolgern über unstrukturierte Daten durchzuführen." },
      { id: "C", text: "In Microsoft 365 Copilot sollten Sie den Analyst-Agenten verwenden, um mehrstufiges Schlussfolgern über unstrukturierte Daten durchzuführen." },
      { id: "D", text: "In Microsoft 365 Copilot sollten Sie den Researcher-Agenten verwenden, um mehrstufiges Schlussfolgern über unstrukturierte Daten durchzuführen." },
    ],
    correct: "D",
    explanation: "Der Researcher-Agent ist ein intelligenter Assistent innerhalb von Microsoft 365 Copilot, der für komplexe, mehrstufige Recherche-Aufgaben konzipiert ist. Er liefert umfassende, quellenbelegte Berichte, die fundierte Entscheidungen beschleunigen, und zieht dabei Erkenntnisse sowohl aus dem Web als auch aus Arbeitsinhalten (Dateien, E-Mails, Besprechungen, Chats), auf die der Benutzer bereits Zugriff hat. Der Researcher-Agent ist speziell für tiefergehendes Schlussfolgern ausgelegt und eignet sich besonders für komplexe Aufgaben, die eine sorgfältige Analyse erfordern – durch eine längere Verarbeitungszeit liefert er eine umfassendere, aufschlussreichere Antwort. Der Standard-Copilot-Chat dagegen unterstützt ein breites Spektrum alltäglicher Aufgaben in den Microsoft 365-Apps: Er ist auf Geschwindigkeit und Effizienz optimiert und eignet sich gut für schnellere Aufgaben wie das Zusammenfassen von E-Mails oder das Verfassen kurzer Antworten.",
    resources: [
      { label: "Get started with Researcher agent in Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/researcher-agent" },
    ],
  },
  {
    id: "real-ab900-4",
    topicId: "copilot-agenten",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365 E5-Abonnement. Sie müssen sicherstellen, dass ein Cloud-Dienst eines Drittanbieters sich bei Microsoft Entra authentifizieren kann. Was sollten Sie konfigurieren?",
    options: [
      { id: "A", text: "Ein Microsoft 365 Copilot-Connector" },
      { id: "B", text: "Mehrstufige Authentifizierung (MFA)" },
      { id: "C", text: "Eine Richtlinie für bedingten Zugriff" },
      { id: "D", text: "Eine App-Registrierung" },
    ],
    correct: "D",
    explanation: "Die Registrierung Ihrer Anwendung oder eines Cloud-Dienstes eines Drittanbieters in Microsoft Entra ID stellt eine Vertrauensbeziehung zwischen Ihrer App und der Microsoft-Identitätsplattform her. Dieses Vertrauen ist unidirektional: Ihre App vertraut der Microsoft-Identitätsplattform, nicht umgekehrt. Sobald das Anwendungsobjekt erstellt wurde, kann es nicht mehr zwischen verschiedenen Mandanten (Tenants) verschoben werden.",
    resources: [
      { label: "Register an application in Microsoft Entra ID", url: "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app" },
    ],
  },
  {
    id: "real-ab900-5",
    topicId: "verantwortungsvolle-ki",
    prompt: "Um den Satz zu vervollständigen, wählen Sie im Antwortbereich die entsprechende Option aus.",
    blankFill: {
      template: "Das Microsoft-Prinzip für verantwortungsbewusste KI in Bezug auf ___ erfordert die Überwachung von KI-Systemen, um sicherzustellen, dass Menschen die Kontrolle behalten.",
      choices: ["Rechenschaftspflicht", "Inklusivität", "Datenschutz und Sicherheit", "Zuverlässigkeit & Sicherheit", "Transparenz"],
    },
    options: [
      { id: "A", text: "Das Microsoft-Prinzip für verantwortungsbewusste KI in Bezug auf Rechenschaftspflicht erfordert die Überwachung von KI-Systemen, um sicherzustellen, dass Menschen die Kontrolle behalten." },
      { id: "B", text: "Das Microsoft-Prinzip für verantwortungsbewusste KI in Bezug auf Inklusivität erfordert die Überwachung von KI-Systemen, um sicherzustellen, dass Menschen die Kontrolle behalten." },
      { id: "C", text: "Das Microsoft-Prinzip für verantwortungsbewusste KI in Bezug auf Datenschutz und Sicherheit erfordert die Überwachung von KI-Systemen, um sicherzustellen, dass Menschen die Kontrolle behalten." },
      { id: "D", text: "Das Microsoft-Prinzip für verantwortungsbewusste KI in Bezug auf Zuverlässigkeit & Sicherheit erfordert die Überwachung von KI-Systemen, um sicherzustellen, dass Menschen die Kontrolle behalten." },
      { id: "E", text: "Das Microsoft-Prinzip für verantwortungsbewusste KI in Bezug auf Transparenz erfordert die Überwachung von KI-Systemen, um sicherzustellen, dass Menschen die Kontrolle behalten." },
    ],
    correct: "A",
    explanation: "Microsoft integriert KI in seine Abläufe mit starkem Fokus auf Ethik und Verantwortung. Die sechs Leitprinzipien dieses Ansatzes sind: Fairness (Microsoft strebt an, Voreingenommenheit zu beseitigen und alle Nutzer gleich zu behandeln), Zuverlässigkeit & Sicherheit (strenge Tests stellen sicher, dass Microsofts KI konsistent und sicher funktioniert), Datenschutz & Sicherheit (Nutzerdaten werden sowohl während des Trainings als auch nach der Bereitstellung geschützt), Inklusivität (KI-Tools werden so gestaltet, dass sie für alle zugänglich und nützlich sind, unabhängig von körperlichen Fähigkeiten, Geschlecht oder Herkunft), Transparenz (Microsoft informiert Nutzer offen darüber, wie seine KI-Systeme funktionieren und wofür sie gedacht sind) und Rechenschaftspflicht (ethische und rechtliche Standards stehen im Vordergrund; Entwickler und Designer von KI-Systemen werden für ihre Ergebnisse zur Verantwortung gezogen). Die Rechenschaftspflicht ist dabei das Prinzip, das konkret die menschliche Überwachung (Human Oversight) von KI-Systemen verlangt, damit Menschen jederzeit die Kontrolle behalten.",
    explanationImageUrl: "/exam-images/ab900-q5-explain.png",
  },
  {
    id: "real-ab900-6",
    topicId: "copilot-grundlagen",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Sie müssen die Identity Secure Score Ihrer Organisation bewerten. Welche zwei Faktoren beeinflussen die Punktzahl? (Jede richtige Antwort stellt einen Teil der Lösung dar. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    options: [
      { id: "A", text: "Die Berechtigungen der SharePoint-Site" },
      { id: "B", text: "Die Anzahl der globalen Administratoren" },
      { id: "C", text: "Passwörter, die niemals ablaufen" },
      { id: "D", text: "Der Standort der Benutzer" },
    ],
    correct: ["B", "C"],
    explanation: "Die Identity Secure Score wird als Prozentsatz angezeigt und dient als Indikator dafür, wie gut die eigene Konfiguration mit den Sicherheitsempfehlungen von Microsoft übereinstimmt. Jede Verbesserungsmaßnahme in der Identity Secure Score ist individuell auf die jeweilige Konfiguration zugeschnitten; Punktzahl und einzelne Empfehlungen lassen sich über die Microsoft Entra-Empfehlungen einsehen, ebenso die Entwicklung der Punktzahl über die Zeit. Der Wert hilft dabei, die eigene Identitätssicherheitslage objektiv zu messen, Verbesserungen zu planen und deren Erfolg zu überprüfen. Zu den Empfehlungen, die in die Identity Secure Score einfließen, zählen unter anderem: mehr als einen globalen Administrator festlegen, Passwörter nicht unbegrenzt gültig lassen (nicht ablaufen lassen), Multi-Faktor-Authentifizierung für administrative Rollen verlangen, veraltete Authentifizierungsverfahren blockieren, Self-Service-Passwortzurücksetzung aktivieren, alle Benutzer mit einer Anmelde- bzw. Benutzerrisikorichtlinie schützen, ruhende Konten aus sensiblen Gruppen entfernen sowie geringstmögliche administrative Rechte (Least Privilege) verwenden. Die Berechtigungen einer SharePoint-Site und der Standort der Benutzer sind dagegen keine Faktoren, die in die Identity Secure Score einfließen.",
    resources: [
      { label: "What is Identity Secure Score?", url: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score" },
    ],
  },
  {
    id: "real-ab900-7",
    topicId: "sicherheit-identitaet",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Sie müssen die Auswirkungen eines kürzlich auf E-Mail-Benutzer abzielenden Phishing- Vorfalls überprüfen. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Das Microsoft Defender-Portal" },
      { id: "B", text: "Das Microsoft 365 Admin Center" },
      { id: "C", text: "Das Microsoft Entra Admin Center" },
      { id: "D", text: "Das Microsoft Exchange Admin Center" },
    ],
    correct: "A",
    explanation: "Das Microsoft Defender-Portal fasst korrelierte Warnungen, betroffene Assets, Untersuchungen und Beweise aus dem gesamten Bestand einer Organisation zu einem einzigen Vorfall (Incident) zusammen und liefert so einen umfassenden Überblick über das gesamte Ausmaß eines Angriffs – etwa eines Phishing-Vorfalls, der E-Mail-Benutzer betroffen hat. Innerhalb eines Vorfalls lassen sich die Warnungen analysieren, ihre Bedeutung verstehen und die Beweise sammeln, um einen wirksamen Plan zur Behebung zu erstellen. Das Microsoft 365 Admin Center, das Microsoft Entra Admin Center und das Microsoft Exchange Admin Center dienen dagegen der allgemeinen Verwaltung von Diensten, Identitäten bzw. Postfächern und bieten keine vergleichbare, vorfallsübergreifende Sicherheitsuntersuchung.",
    resources: [
      { label: "Investigate incidents in the Microsoft Defender portal", url: "https://learn.microsoft.com/en-us/defender-xdr/investigate-incidents" },
    ],
  },
  {
    id: "real-ab900-8",
    topicId: "verwaltung-governance",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Sie müssen einem Benutzer eine Lizenz zuweisen. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Das Microsoft Purview-Portal" },
      { id: "B", text: "Das Microsoft 365 Admin Center" },
      { id: "C", text: "Das Microsoft Teams Admin Center" },
    ],
    correct: "B",
    explanation: "Lizenzen für Benutzer lassen sich im Microsoft 365 Admin Center entweder auf der Seite „Aktive Benutzer“ oder auf der Seite „Lizenzen“ zuweisen bzw. entziehen. Welche Methode geeignet ist, hängt davon ab, ob Lizenzen für bestimmte Benutzer zugewiesen/entzogen werden sollen oder ob Benutzer für ein bestimmtes Produkt zugewiesen/entzogen werden sollen. Das Microsoft Purview-Portal dient der Daten-Governance und Compliance, nicht der Lizenzverwaltung; das Microsoft Teams Admin Center verwaltet ausschließlich Teams-spezifische Einstellungen.",
    resources: [
      { label: "Assign or unassign licenses for users in the Microsoft 365 admin center", url: "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/assign-licenses-to-users" },
    ],
  },
  {
    id: "real-ab900-9",
    topicId: "copilot-grundlagen",
    prompt: "Um den Satz zu vervollständigen, wählen Sie im Antwortbereich die entsprechende Option aus.",
    blankFill: {
      template: "Microsoft 365 Copilot ruft Daten von ___ mithilfe von Microsoft Graph ab.",
      choices: ["Azure OpenAI", "externen Benutzern", "Microsoft SharePoint-Dateien", "Internetsuchmaschinen"],
    },
    options: [
      { id: "A", text: "Microsoft 365 Copilot ruft Daten von Azure OpenAI mithilfe von Microsoft Graph ab." },
      { id: "B", text: "Microsoft 365 Copilot ruft Daten von externen Benutzern mithilfe von Microsoft Graph ab." },
      { id: "C", text: "Microsoft 365 Copilot ruft Daten von Microsoft SharePoint-Dateien mithilfe von Microsoft Graph ab." },
      { id: "D", text: "Microsoft 365 Copilot ruft Daten von Internetsuchmaschinen mithilfe von Microsoft Graph ab." },
    ],
    correct: "C",
    explanation: "Beim Erstellen eines Microsoft 365-Abonnements wird automatisch ein Mandant (Tenant) für die Organisation angelegt. Dieser Mandant liegt innerhalb der Microsoft 365-Dienstgrenze, innerhalb derer Microsoft 365 Copilot auf die Daten der Organisation zugreifen kann – dazu zählen unter anderem SharePoint-Dateien, Exchange-Postfächer, OneDrive-Dateien und Microsoft Teams-Daten, auf die über Microsoft Graph zugegriffen wird. Innerhalb der Dienstgrenze zu arbeiten verschafft Copilot jedoch keine mandantenweite Sichtbarkeit: Der Datenzugriff ist immer auf die Berechtigungen des angemeldeten Benutzers beschränkt. Diese Daten umfassen Informationen, auf die der Benutzer zugreifen kann, einschließlich seiner Aktivitäten sowie der Inhalte, die er in Microsoft 365-Apps erstellt und mit denen er interagiert. Azure OpenAI liefert dagegen das zugrunde liegende Sprachmodell (LLM), externe Benutzer und Internetsuchmaschinen sind keine Datenquellen, auf die Copilot über Microsoft Graph zugreift.",
    explanationImageUrl: "/exam-images/ab900-q9-explain.png",
    resources: [
      { label: "Microsoft 365 Copilot architecture and how it works", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-architecture" },
    ],
  },
  {
    id: "real-ab900-10",
    topicId: "sicherheit-identitaet",
    prompt: "Um den Satz zu vervollständigen, wählen Sie im Antwortbereich die entsprechende Option aus.",
    blankFill: {
      template: "Microsoft Entra Privileged Identity Management (PIM) bietet ___.",
      choices: ["eingeschränkten Zugriff auf Microsoft 365-Dienste", "die Verwaltung des Benutzerlebenszyklus", "die Verwaltung von Unternehmensanwendungen", "zeitlich begrenzte Rollenaktivierung"],
    },
    options: [
      { id: "A", text: "Microsoft Entra Privileged Identity Management (PIM) bietet eingeschränkten Zugriff auf Microsoft 365-Dienste." },
      { id: "B", text: "Microsoft Entra Privileged Identity Management (PIM) bietet die Verwaltung des Benutzerlebenszyklus." },
      { id: "C", text: "Microsoft Entra Privileged Identity Management (PIM) bietet die Verwaltung von Unternehmensanwendungen." },
      { id: "D", text: "Microsoft Entra Privileged Identity Management (PIM) bietet zeitlich begrenzte Rollenaktivierung." },
    ],
    correct: "D",
    explanation: "Privileged Identity Management (PIM) ist ein Dienst in Microsoft Entra ID, mit dem sich der Zugriff auf wichtige Ressourcen einer Organisation verwalten, steuern und überwachen lässt – dazu zählen Ressourcen in Microsoft Entra ID, Azure sowie anderen Microsoft-Onlinediensten wie Microsoft 365 oder Microsoft Intune. PIM ermöglicht eine zeitbasierte und genehmigungsbasierte Rollenaktivierung, um Risiken durch übermäßige, unnötige oder missbräuchlich genutzte Zugriffsrechte zu verringern. Zu den wichtigsten Funktionen zählen: Just-in-Time-Zugriff auf privilegierte Rollen in Microsoft Entra ID und Azure-Ressourcen, zeitlich begrenzter Zugriff mit Start- und Enddatum, Genehmigungspflicht zur Aktivierung privilegierter Rollen, verpflichtende Multi-Faktor-Authentifizierung bei der Aktivierung, Begründungspflicht bei der Aktivierung, Benachrichtigungen bei Rollenaktivierungen, Zugriffsüberprüfungen, herunterladbare Prüfprotokolle sowie Schutz davor, dass die letzte aktive Zuweisung der Rollen „Globaler Administrator“ und „Privileged Role Administrator“ entfernt wird.",
    resources: [
      { label: "What is Microsoft Entra Privileged Identity Management?", url: "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure" },
    ],
  },
  {
    id: "real-ab900-11",
    topicId: "sicherheit-identitaet",
    prompt: "Ein Benutzer namens User5 navigiert zu https://myapps.microsoft.com. Nachdem er seinen Benutzernamen und sein Passwort eingegeben hat, erhält User5 die folgende Nachricht auf seinem Mobilgerät. Verwenden Sie die Dropdown-Menüs, um die Antwort auszuwählen, die die Aussage basierend auf den im Diagramm dargestellten Informationen vervollständigt.",
    imageUrl: "/exam-images/ab900-q11.png",
    blankFill: {
      template: "User5 verwendet ___ für die Multi-Faktor-Authentifizierung (MFA).",
      choices: ["E-Mail-OTP", "die Microsoft Authenticator-App", "SMS", "ein Temporäres Zugangspasswort"],
    },
    options: [
      { id: "A", text: "User5 verwendet E-Mail-OTP für die Multi-Faktor-Authentifizierung (MFA)." },
      { id: "B", text: "User5 verwendet die Microsoft Authenticator-App für die Multi-Faktor- Authentifizierung (MFA)." },
      { id: "C", text: "User5 verwendet SMS für die Multi-Faktor-Authentifizierung (MFA)." },
      { id: "D", text: "User5 verwendet ein Temporäres Zugangspasswort für die Multi-Faktor- Authentifizierung (MFA)." },
    ],
    correct: "B",
    explanation: "Microsoft Authenticator ist eine kostenlose App, mit der man sich bei allen Konten ohne Passwort anmelden kann – stattdessen genügen Fingerabdruck, Gesichtserkennung oder eine PIN. Die App lässt sich für persönliche, geschäftliche, schulische oder andere Microsoft-Konten verwenden und auf drei Arten einsetzen: als zusätzliche Bestätigung der Anmeldung, falls das Passwort vergessen wurde; als Zwei-Faktor- bzw. Multi-Faktor-Authentifizierung, bei der bei jeder Anmeldung ein Einmalcode verwendet wird, um die Kontosicherheit zu erhöhen; oder als alleinige Anmeldemethode, bei der einfach eine Anmeldeanfrage auf dem Smartphone bestätigt wird (passwortlose Anmeldung). Die abgebildete Meldung „Are you trying to sign in?“ mit einer anzuzeigenden Zahl, die im Smartphone bestätigt werden muss, ist genau diese Benachrichtigung der Microsoft Authenticator-App – nicht die eines SMS-Codes, eines E-Mail-Einmalcodes oder eines temporären Zugangspasses.",
    resources: [
      { label: "About Microsoft Authenticator", url: "https://support.microsoft.com/en-us/authenticator/about-microsoft-authenticator" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-12",
    topicId: "sicherheit-identitaet",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein. (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Microsoft Defender für Office 365 bietet Schutz vor Phishing- und Malware-Angriffen", correct: "Ja" },
      { text: "Microsoft Defender für Identität überwacht Identitäten in Active-Directory-Domänen", correct: "Ja" },
      { text: "Microsoft Defender Schwachstellenmanagement bietet Schutz für Software-as-a-Service-(SaaS)-Anwendungen", correct: "Nein" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Microsoft Defender für Office 365 (MDO) schützt vor aktuellen E-Mail-Sicherheitsbedrohungen und ist als Plan 1 und Plan 2 für Organisationen unterschiedlicher Größe verfügbar; es ist die primäre E-Mail-Sicherheitslösung innerhalb von Microsoft 365 und schützt insbesondere vor Phishing- und Malware-Angriffen. Microsoft Defender für Identität hilft Organisationen, identitätsbasierte Angriffe in lokalen, Cloud- und Hybridumgebungen zu erkennen, zu untersuchen und darauf zu reagieren; da Angreifer häufig Identitäten wie Benutzer, Anwendungen und Dienstkonten angreifen, überwacht der Dienst Identitätssignale aus der lokalen Active Directory und Microsoft Entra ID (sowie weiteren IAM-Lösungen) und analysiert sie mittels Verhaltensanalyse, Bedrohungsdaten und bekannten Angriffsmustern. Microsoft Defender Schwachstellenmanagement liefert dagegen Asset-Transparenz, intelligente Bewertungen und integrierte Behebungstools für Windows, macOS, Linux, Android, iOS und Netzwerkgeräte – es priorisiert Schwachstellen auf Basis von Bedrohungsdaten und Geräte-Bewertungen, bietet jedoch keinen Schutz für SaaS-Anwendungen.",
    resources: [
      { label: "Microsoft Defender for Office 365 service description", url: "https://learn.microsoft.com/en-us/office365/servicedescriptions/office-365-advanced-threat-protection-service-description" },
      { label: "Microsoft Defender for Identity overview", url: "https://learn.microsoft.com/en-us/defender-for-identity/what-is" },
      { label: "What is Microsoft Defender Vulnerability Management", url: "https://learn.microsoft.com/en-us/defender-vulnerability-management/defender-vulnerability-management" },
    ],
  },
  {
    id: "real-ab900-13",
    topicId: "copilot-grundlagen",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement, das eine Microsoft SharePoint-Website namens Site1 enthält. Die Berechtigungen für Site1 sind wie in der folgenden Abbildung dargestellt konfiguriert. Sie erstellen einen neuen Benutzer namens User1 im Abonnement. Verwenden Sie die Dropdown-Menüs, um die Antwort auszuwählen, die die Aussage basierend auf den im Diagramm dargestellten Informationen vervollständigt.",
    imageUrl: "/exam-images/ab900-q13.png",
    blankFill: {
      template: "User1 ist ___ Site1.",
      choices: ["ein Besucher von", "ein Eigentümer von", "ein Mitglied von", "daran gehindert, zuzugreifen auf"],
    },
    options: [
      { id: "A", text: "User1 ist ein Besucher der Site1." },
      { id: "B", text: "User1 ist ein Eigentümer der Site1." },
      { id: "C", text: "User1 ist ein Mitglied der Site1." },
      { id: "D", text: "User1 ist daran gehindert, auf Site1 zuzugreifen." },
    ],
    correct: "C",
    explanation: "Als Websitebesitzer einer Microsoft SharePoint-Website kann man anderen Personen Zugriff auf die Website gewähren, indem man sie als Eigentümer, Mitglieder oder Besucher hinzufügt – je nach den von der Organisation und für die jeweilige Website festgelegten Berechtigungen ist es auch möglich, die Website mit Personen außerhalb der Organisation zu teilen. Site1 ist standardmäßig für „Everyone except external users“ (alle außer externen Benutzern) mit den Mitgliedsberechtigungen (Anzeigen und Bearbeiten) freigegeben. Das bedeutet: Alle Benutzer der Organisation – einschließlich eines neu erstellten Benutzers wie User1 – werden automatisch als Site-Mitglieder zur Website hinzugefügt, ohne dass eine manuelle Zuweisung als Eigentümer oder Besucher nötig wäre.",
    resources: [
      { label: "Share a site", url: "https://support.microsoft.com/en-us/office/share-a-site-958771a8-d041-4eb8-b51c-afea2eae3658" },
      { label: "SharePoint Online is permissioned for \"everyone except external users\" but why are internal users still having to request access?", url: "https://learn.microsoft.com/en-us/answers/questions/5205764/sharepoint-online-is-permissioned-for-everyone-exc" },
    ],
  },
  {
    id: "real-ab900-14",
    topicId: "verwaltung-governance",
    prompt: "Ein multinationales Unternehmen mit über 5.000 Benutzern führt Microsoft 365 Copilot ein. Das Unternehmen verfügt derzeit über eine Mischung aus Microsoft 365 E3- und Office 365 E3-Lizenzen für seine Informationsmitarbeiter. Der IT-Administrator muss sicherstellen, dass alle Benutzer auf die vollständigen generativen KI-Funktionen von Copilot in Anwendungen wie Word und Excel zugreifen können. Welche minimale Lizenzmaßnahme ist erforderlich, um allen bestehenden Informationsmitarbeitern den Zugriff auf Microsoft 365 Copilot zu ermöglichen?",
    options: [
      { id: "A", text: "Alle vorhandenen Office 365 E3-Lizenzen auf Microsoft 365 E5-Lizenzen upgraden." },
      { id: "B", text: "Die separate Microsoft 365 Copilot-Zusatzlizenz für alle Benutzer erwerben." },
      { id: "C", text: "Alle bestehenden Lizenzen von Enterprise-Plänen auf Microsoft 365 Business Premium-Pläne umstellen." },
      { id: "D", text: "Nur die Microsoft 365 Copilot-Zusatzlizenz für Benutzer mit Microsoft 365 E3-Lizenzen erwerben, da Office 365 E3 nicht berechtigt ist." },
    ],
    correct: "B",
    explanation: "Microsoft 365 Copilot ist als Zusatzlizenz (Add-on) verfügbar. Sowohl Microsoft 365 E3- als auch Office 365 E3-Lizenzen berechtigen zum Erwerb dieser Zusatzlizenz – ein Upgrade auf höherwertige Pläne wie Microsoft 365 E5 oder ein Wechsel des Lizenzmodells (z. B. auf Business Premium) ist dafür nicht erforderlich. Die minimale und ausreichende Maßnahme ist daher, für alle bestehenden Benutzer unabhängig von ihrer aktuellen E3-Lizenz die separate Microsoft 365 Copilot-Zusatzlizenz zu erwerben.",
    resources: [
      { label: "License options for Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-licensing" },
    ],
  },
  {
    id: "real-ab900-15",
    topicId: "copilot-agenten",
    prompt: "Um den Satz zu vervollständigen, wählen Sie im Antwortbereich die entsprechende Option aus.",
    blankFill: {
      template: "Wenn ein Benutzer einen Microsoft 365 Copilot-Agenten teilt, können Sie ___ verwenden, um Benutzer daran zu hindern, den Agenten zu verwenden.",
      choices: ["Microsoft Foundry", "Microsoft Copilot Studio", "das Microsoft 365 Admin Center", "das Power Apps-Portal"],
    },
    options: [
      { id: "A", text: "Wenn ein Benutzer einen Microsoft 365 Copilot-Agenten teilt, können Sie Microsoft Foundry verwenden, um Benutzer daran zu hindern, den Agenten zu verwenden." },
      { id: "B", text: "Wenn ein Benutzer einen Microsoft 365 Copilot-Agenten teilt, können Sie Microsoft Copilot Studio verwenden, um Benutzer daran zu hindern, den Agenten zu verwenden." },
      { id: "C", text: "Wenn ein Benutzer einen Microsoft 365 Copilot-Agenten teilt, können Sie das Microsoft 365 Admin Center verwenden, um Benutzer daran zu hindern, den Agenten zu verwenden." },
      { id: "D", text: "Wenn ein Benutzer einen Microsoft 365 Copilot-Agenten teilt, können Sie das Power Apps-Portal verwenden, um Benutzer daran zu hindern, den Agenten zu verwenden." },
    ],
    correct: "C",
    explanation: "Agenten für Copilot lassen sich über das Microsoft 365 Admin Center verwalten: Dort können sie für die Organisation aktiviert, deaktiviert, zugewiesen, blockiert oder entfernt werden, und auch die allgemeinen Copilot-Funktionen lassen sich dort steuern. Als Administrator sieht man geteilte Agenten auf der Seite „Agenten“ im Microsoft 365 Admin Center – mit einer Liste aller geteilten Agenten samt Name, Ersteller, Erstellungsdatum, Host-Produkten und Verfügbarkeitsstatus. Man kann dort gezielt nach Agenten suchen und ihren gesamten Lebenszyklus verwalten, einschließlich des Blockierens von Agenten, die als unsicher oder nicht konform eingestuft werden. Microsoft Foundry und Copilot Studio dienen der Entwicklung bzw. dem Erstellen von Agenten, nicht dem Blockieren bereits geteilter Agenten; das Power Apps-Portal ist für Power-Apps-Anwendungen zuständig, nicht für Copilot-Agenten.",
    resources: [
      { label: "Manage agents in the Microsoft 365 admin center", url: "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-copilot-agents-integrated-apps" },
    ],
  },
  {
    id: "real-ab900-16",
    topicId: "verwaltung-governance",
    prompt: "Das IT-Administrationsteam Ihrer Organisation, Contoso Ltd., hat einen neuen Domainnamen, contosoglobal.com, erworben und muss ihn in ihrer Microsoft 365-Umgebung hinzufügen. Diese neue Domain wird für alle neuen Benutzerprinzipalnamen (UPNs) und E-Mail-Adressen verwendet. Welchen Abschnitt des Microsoft 365-Administrationscenters muss der Administrator verwenden, um die neue Domain zu verwalten, zu verifizieren und als Standard für neue Benutzer einzustellen?",
    options: [
      { id: "A", text: "Einstellungen > Organisations-Einstellungen > Dienste" },
      { id: "B", text: "Abrechnung > Lizenzen > Produktliste" },
      { id: "C", text: "Einrichtung > Domäneneinrichtung > Domäne verbinden" },
      { id: "D", text: "Einstellungen > Domains" },
    ],
    correct: "D",
    explanation: "Bevor eine Standarddomäne festgelegt werden kann, muss mindestens eine benutzerdefinierte Domäne zu Microsoft 365 hinzugefügt worden sein. Der Weg dorthin führt im Admin Center über Einstellungen > Domains: Auf der Seite „Domains“ wird die gewünschte Domäne ausgewählt, die als Standard für neue E-Mail-Adressen dienen soll, und anschließend „Als Standard festlegen“ gewählt. Dieser Bereich dient auch der allgemeinen Verwaltung und Verifizierung von Domänen. Die übrigen Optionen betreffen andere Aufgaben: Organisations-Einstellungen > Dienste steuert allgemeine Diensteinstellungen, Abrechnung > Lizenzen > Produktliste verwaltet Lizenzen, und „Domäne verbinden“ unter Einrichtung ist Teil des ersten Einrichtungsassistenten, nicht der laufenden Domänenverwaltung.",
    explanationImageUrl: "/exam-images/ab900-q16-explain.png",
    resources: [
      { label: "Domains Frequently Asked Questions", url: "https://learn.microsoft.com/en-us/microsoft-365/admin/setup/domains-faq" },
    ],
  },
  {
    id: "real-ab900-17",
    topicId: "sicherheit-identitaet",
    prompt: "Ein Finanzbenutzer erhielt eine ausgeklügelte Phishing-E-Mail mit einem schädlichen Link, der neutralisiert wurde. Das Sicherheitsteam benötigt eine einzige, zentrale Ansicht, um den Vorfallzeitplan, verwandte Warnungen (E-Mail und Endpunkt) und empfohlene Maßnahmen zur Stärkung der Sicherheitsposition für E-Mail und Endpunkte zu überprüfen. Welche Defender XDR-Funktion oder welcher Portalbereich bietet dem Sicherheitsteam diese einheitliche Vorfallchronik und Verbesserungsempfehlungen?",
    options: [
      { id: "A", text: "Microsoft Defender for Identity" },
      { id: "B", text: "Microsoft Defender for Office 365" },
      { id: "C", text: "Microsoft Defender Vulnerability Management" },
      { id: "D", text: "Die einheitliche Erlebniswelt für Vorfälle und Warnungen sowie Secure Score im Microsoft Defender-Portal" },
    ],
    correct: "D",
    explanation: "Die einheitliche Erlebniswelt für Vorfälle und Warnungen (Incidents and Alerts) im Microsoft Defender-Portal korreliert Signale aus E-Mail (Defender for Office 365) und Endpunkten (Defender for Endpoint) zu einer einzigen Vorfallchronik. Sie liefert eine durchgängige Angriffserzählung, korrelierte Warnungen über mehrere Workloads hinweg sowie Details zur automatisierten Untersuchung und Reaktion. Secure Score ergänzt dies um konkrete Empfehlungen zur Verbesserung der Sicherheitslage, mit Anleitungen, die E-Mail, Endpunkte, Identität und Apps abdecken. Microsoft Defender for Identity, Microsoft Defender for Office 365 und Defender Vulnerability Management liefern dagegen jeweils nur Signale für ihren eigenen Bereich (Identität, E-Mail bzw. Schwachstellen) und bieten keine übergreifende, konsolidierte Vorfallchronik über mehrere Workloads hinweg.",
    resources: [
      { label: "Incidents and alerts in the Microsoft Defender portal", url: "https://learn.microsoft.com/en-us/defender-xdr/incidents-overview" },
      { label: "Investigate incidents in the Microsoft Defender portal", url: "https://learn.microsoft.com/en-us/defender-xdr/investigate-incidents" },
    ],
  },
  {
    id: "real-ab900-18",
    topicId: "sicherheit-identitaet",
    prompt: "Ein Benutzer ist daran gehindert, sich anzumelden, und der Administrator vermutet Conditional Access oder eine Risikosigniererkennung. Welche zwei Tools im Microsoft Entra Admin Center sollte der Administrator zuerst verwenden, um den genauen Anmeldefehler und die dafür verantwortliche Richtlinie zu identifizieren? (Jede richtige Auswahl stellt einen Teil der Lösung dar. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    options: [
      { id: "A", text: "Conditional Access What If Tool" },
      { id: "B", text: "Microsoft 365 Service Health Dashboard" },
      { id: "C", text: "Anmeldeprotokolle und Fehlerbehebung und Support in Microsoft Entra ID" },
      { id: "D", text: "Exchange Online Nachrichtenverfolgung" },
      { id: "E", text: "Microsoft Entra ID Anwendungsproxy" },
    ],
    correct: ["A", "C"],
    explanation: "Das Conditional Access What-If-Tool hilft zu verstehen, welches Ergebnis die vorhandenen Conditional-Access-Richtlinien für eine bestimmte Anmeldung liefern würden. Es eignet sich besonders zum Simulieren ungewöhnlicher Szenarien und erlaubt es, statt mehrerer manueller Testanmeldungen eine Anmeldung für einen Benutzer, eine Agentenidentität oder einen Single-Tenant-Dienstprinzipal zu simulieren – die Simulation schätzt ab, wie sich die Richtlinien auf diese Anmeldung auswirken, und erstellt einen Bericht. Damit lässt sich schnell ermitteln, welche Richtlinien auf eine bestimmte Anmeldung angewendet werden, um Probleme zu beheben und komplexe Anmeldeszenarien zu verstehen. Die Anmeldeprotokolle in Microsoft Entra ID liefern zusätzlich wertvolle Einblicke in tatsächlich aufgetretene Anmeldefehler und -muster – etwa wie viele fehlgeschlagene Anmeldeversuche in den letzten 24 Stunden aufgetreten sind oder von welchem Browser/Betriebssystem aus sich Benutzer anmelden – und zeigen zu jeder Anmeldeanfrage, wer (Identität), wie (Anwendung) und was (Ressource) betroffen war; in Kombination mit der Fehlerbehebung und dem Support in Microsoft Entra ID lässt sich so die genaue Ursache eines blockierten Sign-ins nachvollziehen. Das Microsoft 365 Service Health Dashboard, Exchange Online Nachrichtenverfolgung und der Microsoft Entra ID Anwendungsproxy dienen anderen Zwecken (Dienststatus, E-Mail-Zustellung bzw. Zugriff auf lokale Apps) und liefern keine Auskunft über die konkrete Ursache eines Anmeldefehlers.",
    resources: [
      { label: "Troubleshoot Conditional Access Policies with the What If Tool", url: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/what-if-tool" },
      { label: "What are Microsoft Entra sign-in logs?", url: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-19",
    topicId: "purview-compliance",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein. (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Microsoft Purview Compliance Manager bietet eine risikobasierte Compliance-Bewertung, um Ihnen zu helfen, Ihre Compliance-Situation zu verstehen", correct: "Ja" },
      { text: "Microsoft Purview Compliance Manager bietet Schritt-für-Schritt-Anleitungen zur Behebung von Compliance-Problemen", correct: "Ja" },
      { text: "Compliance Manager ist Teil von Microsoft Defender", correct: "Nein" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Microsoft Purview Compliance Manager ist eine Lösung, die dabei hilft, die Compliance in einer Multicloud-Umgebung automatisch zu bewerten und zu verwalten – von der Bestandsaufnahme der Datenschutzrisiken über die Umsetzung von Kontrollen und das Einhalten aktueller Vorschriften und Zertifizierungen bis hin zur Berichterstattung an Prüfer. Compliance Manager vereinfacht Compliance und reduziert Risiken durch: vorgefertigte Bewertungen für gängige Branchen- und regionale Standards sowie benutzerdefinierte Bewertungen (abhängig vom Lizenzvertrag); Workflow-Funktionen zur effizienten Durchführung von Risikobewertungen in einem einzigen Tool; detaillierte Schritt-für-Schritt-Anleitungen zu empfohlenen Verbesserungsmaßnahmen (inklusive Implementierungsdetails und Prüfergebnissen bei von Microsoft verwalteten Maßnahmen); sowie eine risikobasierte Compliance-Bewertung, die den Fortschritt bei der Umsetzung von Verbesserungsmaßnahmen misst. Compliance Manager ist Teil der Microsoft-Purview-Suite – nicht von Microsoft Defender.",
    resources: [
      { label: "Microsoft Purview Compliance Manager", url: "https://learn.microsoft.com/en-us/purview/compliance-manager" },
    ],
  },
  {
    id: "real-ab900-20",
    topicId: "purview-compliance",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Sie stellen fest, dass Microsoft SharePoint-Dateien mit Benutzern außerhalb Ihrer Organisation geteilt werden. Sie müssen herausfinden, welche Dateien mit den externen Benutzern geteilt werden. Welchen Bericht sollten Sie im SharePoint Admin Center verwenden? (Wählen Sie zur Beantwortung den entsprechenden Bericht im Antwortbereich aus.)",
    imageUrl: "/exam-images/ab900-q20.png",
    options: [
      { id: "A", text: "Agenten-Einblicke" },
      { id: "B", text: "App-Einblicke" },
      { id: "C", text: "Änderungsverlauf" },
      { id: "D", text: "Datenzugriffsverwaltung" },
      { id: "E", text: "OneDrive-Konten" },
      { id: "F", text: "Vergleich von Website-Richtlinien" },
    ],
    correct: "D",
    explanation: "Die Datenzugriffsverwaltung (Data Access Governance) im SharePoint Admin Center hilft dabei, mögliche Ursachen für übermäßige Freigaben (Oversharing) zu erkennen, indem sie unter anderem anzeigt, auf welchen Websites die meisten neuen Freigabelinks erstellt wurden – einschließlich Berichten zu Inhalten, die mit „Jeder außer externen Benutzern“ sowie über Freigabelinks des Typs „Jeder“, „Personen in der Organisation“ oder „Bestimmte Personen (extern geteilt)“ zugänglich sind. Damit lässt sich gezielt nachvollziehen, welche SharePoint-Inhalte an externe Benutzer freigegeben wurden. Agenten-Einblicke und App-Einblicke betreffen die Nutzung von Copilot-Agenten bzw. Anwendungen, der Änderungsverlauf protokolliert administrative Änderungen, OneDrive-Konten listet Benutzerkonten auf, und der Vergleich von Website-Richtlinien vergleicht Richtlinieneinstellungen zwischen Websites – keiner dieser Berichte liefert eine Übersicht über extern geteilte Dateien.",
    resources: [
      { label: "Data access governance reports", url: "https://learn.microsoft.com/en-us/sharepoint/data-access-governance-reports" },
    ],
  },
  {
    id: "real-ab900-21",
    topicId: "purview-compliance",
    prompt: "Ihre Organisation hat ein Microsoft 365-Abonnement. Die Personalabteilung Ihres Unternehmens bittet um eine Kopie aller kürzlich von einem Benutzer namens User1 geänderten Dateien. Was sollten Sie im Microsoft Purview-Portal verwenden? (Wählen Sie zur Beantwortung die entsprechenden Lösungen im Antwortbereich aus.)",
    imageUrl: "/exam-images/ab900-q21.png",
    options: [
      { id: "A", text: "Überprüfung" },
      { id: "B", text: "Datenkatalog" },
      { id: "C", text: "Verlustprävention von Daten" },
      { id: "D", text: "eDiscovery" },
      { id: "E", text: "Informationsschutz" },
      { id: "F", text: "Insider-Risikomanagement" },
    ],
    correct: "D",
    explanation: "Electronic Discovery (eDiscovery) ist der Prozess, elektronisch gespeicherte Informationen (ESI) zu identifizieren und bereitzustellen, die als Beweismittel in Untersuchungen und Rechtsfällen dienen können. Mit Microsoft Purview eDiscovery lassen sich Inhalte in Microsoft-365-Diensten identifizieren, überprüfen und verwalten, um Untersuchungen zu unterstützen – unterstützte Dienste sind unter anderem Exchange Online, Microsoft Teams, Microsoft 365-Gruppen, OneDrive, SharePoint und Viva Engage. Postfächer und Websites lassen sich in derselben eDiscovery-Suche durchsuchen, die Ergebnisse anschließend exportieren; eDiscovery-Fälle dienen dem Identifizieren, In-Bereitschaft-Setzen (Hold) und Exportieren von Inhalten aus Postfächern und Websites. Mit einem Office 365 E5- oder Microsoft 365 E5-Abonnement (bzw. entsprechenden E5-Zusatzlizenzen) lassen sich Fälle zusätzlich mit erweiterten eDiscovery-Funktionen verwalten und analysieren – etwa über eine gezielte Inhaltssuche mit einer Abfrage wie „Author:User1 OR ModifiedBy:User1“. Die übrigen Lösungen decken andere Aufgaben ab: Überwachung protokolliert Aktivitäten, Datenkatalog katalogisiert Datenquellen, Verlustprävention von Daten verhindert das Abfließen sensibler Daten, Informationsschutz klassifiziert und schützt Inhalte, und Insider-Risikomanagement erkennt riskantes Nutzerverhalten – keine davon liefert gezielt eine Kopie der von einem bestimmten Benutzer geänderten Dateien.",
    resources: [
      { label: "Learn about eDiscovery", url: "https://learn.microsoft.com/en-us/purview/edisc" },
    ],
  },
  {
    id: "real-ab900-22",
    topicId: "purview-compliance",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Sie müssen Microsoft Purview verwenden, um die folgenden Anforderungen zu erfüllen: • Verhindern, dass Benutzer Dateien teilen, die persönlich identifizierbare Informationen (PII) enthalten. • Maschinelles Lernen verwenden, um ein Modell zu trainieren, das sensible Inhalte erkennt. Welche Microsoft Purview- Lösung sollten Sie für jede Anforderung verwenden? (Um zu antworten, wählen Sie die entsprechenden Optionen im Antwortbereich aus. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    blankFillMulti: {
      template: "Verhindern, dass Benutzer PII teilen: ___; Maschinelles Lernen verwenden, um ein Modell zu trainieren: ___.",
      blanks: [
        ["Kommunikations-Compliance", "Verlustprävention von Daten", "DSPM für KI", "Informationsschutz", "Insider-Risikomanagement"],
        ["Kommunikations-Compliance", "Verlustprävention von Daten", "DSPM für KI", "Informationsschutz", "Insider-Risikomanagement"],
      ],
      combos: [
        [0, 1],
        [1, 3],
        [3, 4],
        [4, 0],
        [1, 2],
        [2, 4],
      ],
    },
    options: [
      { id: "A", text: "Verhindern, dass Benutzer PII teilen: Kommunikations-Compliance; Maschinelles Lernen verwenden, um ein Modell zu trainieren: Verlustprävention von Daten" },
      { id: "B", text: "Verhindern, dass Benutzer PII teilen: Verlustprävention von Daten; Maschinelles Lernen verwenden, um ein Modell zu trainieren: Informationsschutz" },
      { id: "C", text: "Verhindern, dass Benutzer PII teilen: Informationsschutz; Maschinelles Lernen verwenden, um ein Modell zu trainieren: Insider-Risikomanagement" },
      { id: "D", text: "Verhindern, dass Benutzer PII teilen: Insider-Risikomanagement; Maschinelles Lernen verwenden, um ein Modell zu trainieren: Kommunikations-Compliance" },
      { id: "E", text: "Verhindern, dass Benutzer PII teilen: Verlustprävention von Daten; Maschinelles Lernen verwenden, um ein Modell zu trainieren: DSPM für KI" },
      { id: "F", text: "Verhindern, dass Benutzer PII teilen: DSPM für KI; Maschinelles Lernen verwenden, um ein Modell zu trainieren: Insider-Risikomanagement" },
    ],
    correct: "B",
    explanation: "Data Loss Prevention (DLP) in Microsoft Purview erkennt sensible Informationen wie persönlich identifizierbare Informationen (PII) anhand von Richtlinien und verhindert, dass Benutzer solche Inhalte unbeabsichtigt oder unautorisiert teilen – etwa per E-Mail, SharePoint, OneDrive oder Teams. Informationsschutz (Information Protection) stellt dagegen die Klassifizierungs- und Kennzeichnungsfunktionen bereit, mit denen sich Modelle zur Erkennung sensibler Inhalte mithilfe von maschinellem Lernen trainieren lassen (z. B. trainierbare Klassifizierer), die anschließend von anderen Purview-Lösungen wie DLP genutzt werden können. Kommunikations-Compliance überwacht Nachrichteninhalte auf Richtlinienverstöße, Insider-Risikomanagement erkennt riskantes Nutzerverhalten, und DSPM für KI bewertet den Sicherheitsstatus von KI-Anwendungen – keine dieser drei Lösungen ist primär für das Verhindern von PII-Freigaben oder das Trainieren von Erkennungsmodellen zuständig.",
    resources: [
      { label: "Learn about data loss prevention", url: "https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp" },
      { label: "Learn about trainable classifiers", url: "https://learn.microsoft.com/en-us/purview/classifier-learn-about" },
    ],
  },
  {
    id: "real-ab900-23",
    type: "yesno",
    topicId: "purview-compliance",
    prompt: "Sie möchten die von einem Serviceadministrator in Microsoft 365 durchgeführten administrativen Maßnahmen anzeigen. Wählen Sie für jede der folgenden Aussagen „Ja“, wenn die Aussage zutrifft. Andernfalls wählen Sie „Nein“. (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Sie können Suche & Intelligenz im Microsoft 365 Admin Center verwenden", correct: "Nein" },
      { text: "Sie können Überwachung im Microsoft Defender-Portal verwenden", correct: "Ja" },
      { text: "Sie können Überwachung im Microsoft Purview-Portal verwenden", correct: "Ja" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Ja", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Microsoft Search bietet eine benutzerfreundliche Oberfläche, um Informationen wie Dateien und Dokumente, interne Websites und Business-Tools, Personen und Gruppen sowie Antworten zu finden – Suche & Intelligenz im Microsoft 365 Admin Center eignet sich jedoch nicht dafür, Überwachungsprotokolle oder administrative Maßnahmen anzuzeigen. Die Überwachung (Audit) ist standardmäßig aktiviert, und das Überwachungsprotokoll lässt sich sowohl über das Microsoft Defender-Portal als auch über das Microsoft Purview-Portal durchsuchen – beide Portale greifen auf dasselbe zugrunde liegende Überwachungsprotokoll zu und eignen sich damit zur Überprüfung administrativer Maßnahmen eines Serviceadministrators.",
    resources: [
      { label: "Set up Microsoft Search", url: "https://learn.microsoft.com/en-us/microsoftsearch/set-up-microsoft-search" },
      { label: "Audit log search in the Microsoft Defender portal", url: "https://learn.microsoft.com/en-us/purview/audit-log-search-defender-portal" },
      { label: "Audit log activities", url: "https://learn.microsoft.com/en-us/purview/audit-log-activities" },
    ],
  },
  {
    id: "real-ab900-24",
    topicId: "sicherheit-identitaet",
    prompt: "Um den Satz zu vervollständigen, wählen Sie im Antwortbereich die entsprechende Option aus.",
    blankFill: {
      template: "Conditional Access-Richtlinien ___.",
      choices: ["werden über das Microsoft Defender-Portal konfiguriert", "werden nur auf lokale Ressourcen angewendet", "bieten Kontrolle darüber, wie Benutzer auf Cloud-Apps zugreifen können", "erfordern ein Microsoft Exchange-Postfach"],
    },
    options: [
      { id: "A", text: "Conditional Access-Richtlinien werden über das Microsoft Defender-Portal konfiguriert." },
      { id: "B", text: "Conditional Access-Richtlinien werden nur auf lokale Ressourcen angewendet." },
      { id: "C", text: "Conditional Access-Richtlinien bieten Kontrolle darüber, wie Benutzer auf Cloud-Apps zugreifen können." },
      { id: "D", text: "Conditional Access-Richtlinien erfordern ein Microsoft Exchange-Postfach." },
    ],
    correct: "C",
    explanation: "Conditional-Access-Richtlinien sind im Kern Wenn-Dann-Anweisungen: Wenn ein Benutzer auf eine Ressource zugreifen möchte, muss zuvor eine bestimmte Bedingung erfüllt werden. Möchte ein Benutzer beispielsweise auf eine Anwendung oder einen Dienst wie Microsoft 365 zugreifen, kann eine Richtlinie verlangen, dass zuvor eine Multi-Faktor-Authentifizierung durchgeführt wird. Damit bieten Conditional-Access-Richtlinien gezielte Kontrolle darüber, wie Benutzer auf Cloud-Apps zugreifen können. Sie werden über Microsoft Entra ID konfiguriert (nicht über das Microsoft Defender-Portal), gelten für Cloud-Ressourcen (nicht nur lokale Ressourcen) und setzen kein Microsoft-Exchange-Postfach voraus.",
    resources: [
      { label: "What is Conditional Access?", url: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview" },
    ],
  },
  {
    id: "real-ab900-25",
    topicId: "sicherheit-identitaet",
    prompt: "Ein Administrator muss den Zugriff auf eine SharePoint-Website für eine sensible HR- Site verwalten und Copilot-Add-on-Lizenzen den 50 Mitgliedern des Teams \"HR-Data- Users\" zuweisen. Die Mitgliedschaft ändert sich aufgrund der hohen Fluktuation häufig. Welches Microsoft Entra-Objekt ist sowohl für die Zugriffskontrolle als auch für die lizenzbasierte Gruppenverwaltung die effizienteste Wahl?",
    options: [
      { id: "A", text: "Dynamische Sicherheitsgruppe" },
      { id: "B", text: "E-Mail-fähige Sicherheitsgruppe" },
      { id: "C", text: "Microsoft 365-Gruppe" },
      { id: "D", text: "Verteilerliste" },
    ],
    correct: "A",
    explanation: "Microsoft Entra ID bietet gruppenbasierte Lizenzierung, mit der einer Gruppe eine oder mehrere Produktlizenzen zugewiesen werden können. Microsoft Entra ID stellt dabei sicher, dass die Lizenzen allen Mitgliedern der Gruppe zugewiesen werden; neue Mitglieder erhalten die passenden Lizenzen automatisch, und beim Austritt aus der Gruppe werden die Lizenzen wieder entzogen. Dieses Verfahren macht eine manuelle, per PowerShell automatisierte Lizenzverwaltung überflüssig, um organisatorische und abteilungsbezogene Änderungen pro Benutzer nachzuvollziehen – besonders wertvoll bei hoher Fluktuation wie im HR-Data-Users-Team. Lizenzen lassen sich jeder Sicherheitsgruppe in Microsoft Entra ID zuweisen; Sicherheitsgruppen können aus der lokalen Umgebung über Microsoft Entra Connect synchronisiert, direkt in Microsoft Entra ID (Cloud-only) erstellt oder automatisch über die dynamische Gruppenfunktion gepflegt werden. Eine dynamische Sicherheitsgruppe eignet sich hier am besten, da sie sowohl die Zugriffskontrolle auf die SharePoint-Website übernehmen als auch – dank automatischer, attributbasierter Mitgliedschaftspflege – die Lizenzzuweisung ohne manuellen Aufwand bei häufigen Personalwechseln sicherstellen kann. E-Mail-fähige Sicherheitsgruppen, Microsoft 365-Gruppen und Verteilerlisten unterstützen entweder keine oder nur eingeschränkte Lizenzzuweisung bzw. keine dynamische, attributbasierte Mitgliedschaft.",
    resources: [
      { label: "What is group-based licensing in Microsoft Entra ID?", url: "https://learn.microsoft.com/en-us/entra/fundamentals/concept-group-based-licensing" },
    ],
  },
  {
    id: "real-ab900-26",
    topicId: "copilot-grundlagen",
    prompt: "Sie verwenden Microsoft 365 Copilot. Womit erstellt Copilot Antworten basierend auf in Microsoft SharePoint gespeicherten Unternehmensdaten?",
    options: [
      { id: "A", text: "Microsoft Intune" },
      { id: "B", text: "Microsoft Defender" },
      { id: "C", text: "Microsoft Graph" },
      { id: "D", text: "Microsoft Purview" },
    ],
    correct: "C",
    explanation: "Beim Erstellen eines Microsoft 365-Abonnements wird automatisch ein Mandant (Tenant) für die Organisation angelegt. Dieser Mandant liegt innerhalb der Microsoft 365-Dienstgrenze, innerhalb derer Microsoft 365 Copilot auf die Daten der Organisation zugreifen kann. Innerhalb dieser Dienstgrenze zu arbeiten verschafft Copilot jedoch keine mandantenweite Sichtbarkeit: Der Datenzugriff ist immer auf die Berechtigungen des angemeldeten Benutzers beschränkt und umfasst Informationen, auf die der Benutzer bereits zugreifen kann, einschließlich seiner Aktivitäten sowie der Inhalte, die er in Microsoft 365-Apps erstellt und mit denen er interagiert. Copilot nutzt Microsoft Graph, um auf Benutzerdaten im individuellen Kontext des jeweiligen Benutzers zuzugreifen – dazu zählen E-Mails, Chats und Dokumente (einschließlich SharePoint-Dateien), auf die der Benutzer Zugriffsberechtigung hat. Microsoft Intune, Microsoft Defender und Microsoft Purview dienen dagegen der Geräteverwaltung, der Sicherheit bzw. der Compliance und liefern nicht die Datengrundlage für Copilot-Antworten.",
    resources: [
      { label: "Microsoft 365 Copilot architecture and how it works", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-architecture" },
      { label: "Overview of Microsoft Graph", url: "https://learn.microsoft.com/en-us/graph/overview" },
    ],
  },
  {
    id: "real-ab900-27",
    topicId: "purview-compliance",
    prompt: "Um den Satz zu vervollständigen, wählen Sie im Antwortbereich die entsprechende Option aus.",
    blankFill: {
      template: "Sie können die ___ Microsoft Purview-Lösung verwenden, um Microsoft 365 Copilot-Eingaben zu erkennen, die sensible Informationen enthalten.",
      choices: ["Data Lifecycle Management", "DSPM for AI", "Information Barriers", "Information Protection"],
    },
    options: [
      { id: "A", text: "Sie können die Data Lifecycle Management Microsoft Purview-Lösung verwenden, um Microsoft 365 Copilot-Eingaben zu erkennen, die sensible Informationen enthalten." },
      { id: "B", text: "Sie können die DSPM for AI Microsoft Purview-Lösung verwenden, um Microsoft 365 Copilot-Eingaben zu erkennen, die sensible Informationen enthalten." },
      { id: "C", text: "Sie können die Information Barriers Microsoft Purview-Lösung verwenden, um Microsoft 365 Copilot-Eingaben zu erkennen, die sensible Informationen enthalten." },
      { id: "D", text: "Sie können die Information Protection Microsoft Purview-Lösung verwenden, um Microsoft 365 Copilot-Eingaben zu erkennen, die sensible Informationen enthalten." },
    ],
    correct: "B",
    explanation: "Microsoft Purview Data Security Posture Management (DSPM) for AI bietet im Microsoft Purview-Portal eine zentrale Verwaltungsstelle, um Daten für KI-Anwendungen schnell abzusichern und die KI-Nutzung proaktiv zu überwachen – dazu zählen Copilots, Agenten und andere KI-Anwendungen, die auch Large Language Models (LLMs) von Drittanbietern nutzen. DSPM for AI bietet unter anderem: Einblicke und Analysen zur KI-Aktivität in der Organisation, einsatzbereite Richtlinien zum Schutz von Daten und zur Vermeidung von Datenverlust in KI-Eingaben (Prompts), Risikobewertungen zur Identifizierung, Behebung und Überwachung möglicher Datenüberfreigabe sowie Compliance-Kontrollen für eine optimale Daten- und Speicherhandhabung. Data Lifecycle Management steuert die Aufbewahrung und Löschung von Inhalten, Information Barriers verhindert Kommunikation zwischen bestimmten Benutzergruppen, und Information Protection klassifiziert und kennzeichnet Inhalte – keine dieser drei Lösungen ist speziell auf das Erkennen sensibler Informationen in Copilot-Eingaben ausgerichtet.",
    resources: [
      { label: "Learn about Data Security Posture Management for AI - (classic)", url: "https://learn.microsoft.com/en-us/purview/dspm-for-ai" },
    ],
  },
  {
    id: "real-ab900-28",
    topicId: "copilot-grundlagen",
    prompt: "Ein Marketing-Benutzer bittet Copilot, den „neueste Haushaltsvorschlag“ zusammenzufassen, der auf einer SharePoint-Website gespeichert ist, die nur für die Finanzabteilung zugänglich ist. Der Marketing-Benutzer ist kein Mitglied der Website. Welches Prinzip steuert das Verhalten von Copilot und verhindert, dass es die eingeschränkten Inhalte zurückgibt?",
    options: [
      { id: "A", text: "Copilot wendet vor der Verarbeitung der Anfrage die Zero-Trust-Verifizierung an." },
      { id: "B", text: "Copilot verwendet nur Inhalte, die ausdrücklich mit einem bestimmten Sensitivitätslabel gekennzeichnet sind." },
      { id: "C", text: "Copilot setzt strikt die bestehenden Microsoft 365-Berechtigungen des Benutzers durch und gibt keine Inhalte zurück, auf die der Benutzer keinen Zugriff hat." },
      { id: "D", text: "Microsoft Purview DLP schwärzt automatisch finanzielle Zahlen in Copilot- Antworten." },
    ],
    correct: "C",
    explanation: "Microsoft 365 Copilot schafft Mehrwert, indem es große Sprachmodelle (LLMs) mit den organisatorischen Daten verbindet. Über Microsoft Graph greift Copilot auf Inhalte und Kontext zu und kann Antworten generieren, die in echten Organisationsdaten verankert sind – etwa Dokumenten, E-Mails, Kalendern, Chats, Besprechungen und Kontakten. Diese Inhalte werden mit dem aktuellen Arbeitskontext des Benutzers kombiniert, um präzise und relevante Antworten zu liefern. Copilot zeigt dabei ausschließlich organisatorische Daten an, für die der jeweilige Benutzer mindestens Anzeigeberechtigungen besitzt – es gelten also dieselben Berechtigungsmodelle wie in den übrigen Microsoft 365-Diensten (z. B. SharePoint), einschließlich Berechtigungen, die Benutzern außerhalb der Organisation über tenantübergreifende Zusammenarbeit (z. B. freigegebene Kanäle in Microsoft Teams) gewährt werden. Da der Marketing-Benutzer kein Mitglied der Finance-Website ist, hat er auf SharePoint-Ebene keinen Zugriff auf den Haushaltsvorschlag – und genau diese bestehende Berechtigung setzt Copilot strikt durch, unabhängig von Zero-Trust-Verifizierung, Sensitivitätslabeln oder DLP-Schwärzung, die hier keine Rolle spielen.",
    resources: [
      { label: "Data, Privacy, and Security for Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy" },
    ],
  },
  {
    id: "real-ab900-29",
    topicId: "copilot-grundlagen",
    prompt: "Wenn ein Benutzer Copilot fragt: „Welche aktuellen Dokumente wurden mir zu 'Projekt Phoenix' geteilt?“, liefert Copilot personalisierte Dokumente aus OneDrive, SharePoint und Teams. Welche Hauptrolle spielt Microsoft Graph bei der Ermöglichung dieser Antwort?",
    options: [
      { id: "A", text: "Es stellt dem LLM sein vortrainiertes Weltwissen zur Verfügung." },
      { id: "B", text: "Es dient als Engine zur Einhaltung von Redaktionsrichtlinien." },
      { id: "C", text: "Es fungiert als semantischer Index, der die Anfrage des Benutzers auf den Kontext, die Beziehungen und Berechtigungen des Benutzers für organisatorische Daten abbildet." },
      { id: "D", text: "Es setzt Conditional Access-Richtlinien in Echtzeit durch." },
    ],
    correct: "C",
    explanation: "Microsoft 365 Copilot bildet die Daten einer Organisation auf einen fortschrittlichen lexikalischen und semantischen Index ab, um Suchrelevanz und -genauigkeit zu ermöglichen. Über Microsoft Graph erhält Copilot Zugriff auf Kontext und Beziehungen innerhalb der Daten, was eine kontextuell präzisere Informationssuche ermöglicht. Der semantische Index wird aus Inhalten in Microsoft Graph erzeugt und hilft dabei, kontextrelevante Antworten auf Benutzeranfragen zu erzeugen; er ermöglicht es, Milliarden von Vektoren (mathematische Darstellungen von Merkmalen) zu durchsuchen und passende Ergebnisse zurückzugeben. In Kombination mit Erweiterungen in Microsoft Graph verbindet der semantische Index Benutzer mit relevanten Informationen in der Organisation – personalisiert auf Basis der Verbindungen zwischen Inhalten und Personen im jeweiligen Netzwerk. Dabei respektiert er stets die Sicherheits-, Compliance- und Datenschutzgrenzen innerhalb des Mandanten, einschließlich der individuellen Berechtigungen des Benutzers. Microsoft Graph liefert also weder das vortrainierte Weltwissen des LLM (das kommt vom Sprachmodell selbst) noch fungiert es als Redaktions-Engine oder als Durchsetzungsmechanismus für Conditional-Access-Richtlinien.",
    resources: [
      { label: "Semantic indexing for Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/microsoftsearch/semantic-index-for-copilot" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-30",
    topicId: "verwaltung-governance",
    prompt: "Für jede der folgenden Aussagen wählen Sie 'Ja', wenn die Aussage zutrifft. Andernfalls wählen Sie 'Nein'. (HINWEIS: Jede korrekte Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Damit Administratoren SharePoint Advanced Management verwenden können, benötigen alle Benutzer in Ihrer Organisation eine Microsoft 365 Copilot-Lizenz", correct: "Nein" },
      { text: "SharePoint Advanced Management kann helfen, den Zugriff von Microsoft 365 Copilot auf Microsoft SharePoint-Inhalte einzuschränken", correct: "Ja" },
      { text: "SharePoint Advanced Management ist als eigenständige Lizenz für Organisationen ohne Microsoft 365 Copilot verfügbar", correct: "Ja" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Ja", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "SharePoint Advanced Management (SAM) ist eine umfassende Governance-Lösung für SharePoint und OneDrive, mit der sich Inhaltswachstum effizient verwalten, Zugriffe absichern und Änderungen in der gesamten Organisation überwachen lassen – so bleibt die Kontrolle über den digitalen Arbeitsbereich erhalten und die Umgebung wird auf Microsoft 365 Copilot vorbereitet. Der Zugriff auf SAM-Funktionen erfolgt über eine von zwei Lizenzoptionen: Verfügt eine Organisation über eine Copilot-Lizenz und ist mindestens einem Benutzer eine solche zugewiesen, erhalten SharePoint-Administratoren automatisch Zugriff auf die für die Copilot-Einführung nötigen SAM-Funktionen (einzige Ausnahme: „Restricted Site Creation“ ist nicht enthalten) – es ist also keine Copilot-Lizenz für alle Benutzer der Organisation erforderlich. Organisationen ohne Copilot-Lizenz können SAM-Funktionen alternativ über eine eigenständige SharePoint-Advanced-Management-Lizenz erwerben. SAM umfasst zudem Governance-Kontrollen wie „Restricted Content Discovery“ und „Restricted SharePoint Search“, die gezielt dafür ausgelegt sind, SharePoint-Websites und -Inhalte von der Auffindung und Nutzung durch Copilot auszuschließen oder einzuschränken.",
    resources: [
      { label: "What is SharePoint Advanced Management?", url: "https://learn.microsoft.com/en-us/sharepoint/advanced-management" },
      { label: "Restrict discovery of SharePoint sites and content", url: "https://learn.microsoft.com/en-us/sharepoint/restricted-content-discovery" },
      { label: "How does licensing work for SharePoint Advanced Management?", url: "https://learn.microsoft.com/en-us/sharepoint/sharepoint-advanced-management-licensing" },
    ],
  },
  {
    id: "real-ab900-31",
    type: "yesno",
    topicId: "purview-compliance",
    prompt: "Für jede der folgenden Aussagen wählen Sie 'Ja', wenn die Aussage zutrifft. Andernfalls wählen Sie 'Nein'. (HINWEIS: Jede korrekte Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Microsoft Purview DSPM for AI kann Einblick in die ChatGPT-Nutzung geben", correct: "Ja" },
      { text: "Microsoft Purview DSPM for AI kann Einblick in die Microsoft 365 Copilot-Nutzung geben", correct: "Ja" },
      { text: "Microsoft Purview DSPM for AI kann Benutzer daran hindern, Microsoft 365 Copilot zu verwenden", correct: "Nein" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Microsoft Purview Data Security Posture Management (DSPM) for AI bietet im Microsoft Purview-Portal eine zentrale Verwaltungsstelle, um Daten für KI-Anwendungen schnell abzusichern und die KI-Nutzung proaktiv zu überwachen – dazu zählen Copilots, Agenten und andere KI-Anwendungen, die auch Large Language Models (LLMs) von Drittanbietern wie ChatGPT nutzen. DSPM for AI liefert unter anderem Einblicke und Analysen zur KI-Aktivität in der Organisation, einsatzbereite Richtlinien zum Schutz von Daten in KI-Eingaben, Risikobewertungen zur möglichen Datenüberfreigabe sowie Compliance-Kontrollen. DSPM for AI ist jedoch darauf ausgelegt, die Nutzung sensibler Daten mit KI zu erkennen, zu bewerten und sichtbar zu machen – es blockiert Benutzer aber NICHT direkt daran, Microsoft 365 Copilot zu verwenden. Um Copilot einzuschränken oder zu blockieren, wird stattdessen das Microsoft 365 Admin Center zur Konfiguration von Lizenzen und Diensteplänen oder das Microsoft Entra Admin Center zur Konfiguration von Conditional Access verwendet.",
    resources: [
      { label: "Learn about Data Security Posture Management", url: "https://learn.microsoft.com/en-us/purview/data-security-posture-management-learn-about" },
      { label: "Considerations for Microsoft Purview Data Security Posture Management", url: "https://learn.microsoft.com/en-us/purview/data-security-posture-management-considerations" },
    ],
  },
  {
    id: "real-ab900-32",
    topicId: "verantwortungsvolle-ki",
    prompt: "Ein KI-Agent, der darauf vorbereitet wird, Kundenprotokolle zusammenzufassen, zeigt eine Voreingenommenheit zugunsten bestimmter geografischer Regionen. Welches Microsoft Responsible AI-Prinzip wird in erster Linie verletzt und sollte vor der Bereitstellung angesprochen werden?",
    options: [
      { id: "A", text: "Fairness" },
      { id: "B", text: "Transparenz" },
      { id: "C", text: "Verantwortlichkeit" },
      { id: "D", text: "Inklusivität" },
    ],
    correct: "A",
    explanation: "Microsoft hat den Responsible AI Standard geschaffen, ein Rahmenwerk für die Entwicklung von KI-Systemen auf Basis von sechs Prinzipien: Fairness, Zuverlässigkeit & Sicherheit, Datenschutz & Sicherheit, Inklusivität, Transparenz und Rechenschaftspflicht. Diese Prinzipien bilden die Grundlage für einen verantwortungsvollen und vertrauenswürdigen Umgang mit KI, insbesondere da intelligente Technologien in alltäglichen Produkten und Diensten immer präsenter werden. Fairness bedeutet, dass KI-Systeme alle Menschen fair behandeln und ähnliche Gruppen nicht unterschiedlich beeinflussen sollen – etwa sollten KI-Systeme bei medizinischen Empfehlungen, Kreditanträgen oder Bewerbungen Personen mit ähnlichen Symptomen, finanziellen Verhältnissen oder Qualifikationen gleich behandeln. Eine Voreingenommenheit zugunsten bestimmter geografischer Regionen ist damit in erster Linie eine Verletzung des Fairness-Prinzips, nicht der Transparenz (verständliche Erklärung von Entscheidungen), der Rechenschaftspflicht (Verantwortlichkeit der Entwickler für das Systemverhalten) oder der Inklusivität (Zugänglichkeit für alle Nutzergruppen unabhängig von Fähigkeiten, Geschlecht oder Herkunft).",
    resources: [
      { label: "What is Responsible AI?", url: "https://learn.microsoft.com/en-us/azure/machine-learning/concept-responsible-ai" },
    ],
  },
  {
    id: "real-ab900-33",
    topicId: "sicherheit-identitaet",
    prompt: "Compliance benötigt einen Bericht, der SharePoint-Websites auflistet, die hochsensible Dokumente enthalten, aber mit großen Gruppen wie „Jeder außer externen Benutzern\" geteilt werden. Welche Microsoft-Funktion ist dafür ausgelegt, Data Access Governance (DAG)-Berichte zu erstellen, die sensible Inhalte sowie eine nachsichtigere Freigabepraxis identifizieren?",
    options: [
      { id: "A", text: "Microsoft Entra ID Protection" },
      { id: "B", text: "Microsoft Purview Data Loss Prevention (DLP)" },
      { id: "C", text: "Microsoft Defender for Cloud Apps" },
      { id: "D", text: "SharePoint Advanced Management (SAM)" },
    ],
    correct: "D",
    explanation: "SharePoint Advanced Management (SAM) ist eine umfassende Governance-Lösung für SharePoint und OneDrive, mit der sich Inhaltswachstum effizient verwalten, Zugriffe absichern und Änderungen in der gesamten Organisation überwachen lassen – so bleibt die Kontrolle über den digitalen Arbeitsbereich erhalten und die Umgebung wird auf Microsoft 365 Copilot vorbereitet. SAM umfasst Data-Access-Governance-Berichte, die dabei helfen, den Zugriff auf SharePoint-Daten zu steuern: Die Berichte zeigen Websites auf, die potenziell übermäßig freigegebene oder sensible Inhalte enthalten, sodass sich passende Sicherheits- und Compliance-Richtlinien anwenden lassen – genau das gesuchte Szenario mit hochsensiblen Dokumenten, die breit mit „Jeder außer externen Benutzern“ geteilt sind. Microsoft Entra ID Protection erkennt riskante Anmeldungen und Identitäten, Microsoft Purview DLP verhindert das Teilen sensibler Daten anhand von Richtlinien, und Microsoft Defender for Cloud Apps überwacht Cloud-App-Nutzung – keine dieser drei Lösungen liefert speziell DAG-Berichte zur SharePoint-Freigabepraxis.",
    resources: [
      { label: "What is SharePoint Advanced Management?", url: "https://learn.microsoft.com/en-us/sharepoint/advanced-management" },
      { label: "Data access governance reports for SharePoint and OneDrive sites", url: "https://learn.microsoft.com/en-us/sharepoint/data-access-governance-reports" },
    ],
  },
  {
    id: "real-ab900-34",
    topicId: "purview-compliance",
    prompt: "Sie haben eine Microsoft SharePoint-Website wie in der folgenden Abbildung gezeigt. Sie müssen die Einstellungen von SLabel1 anzeigen. Was sollten Sie verwenden?",
    imageUrl: "/exam-images/ab900-q34.png",
    options: [
      { id: "A", text: "Das Microsoft Defender-Portal" },
      { id: "B", text: "Das SharePoint-Admin-Center" },
      { id: "C", text: "Das Microsoft 365-Admin-Center" },
      { id: "D", text: "Das Microsoft Purview-Portal" },
    ],
    correct: "D",
    explanation: "Vertraulichkeitsbezeichnungen (Sensitivity Labels) aus Microsoft Purview Information Protection ermöglichen es, die Daten einer Organisation zu klassifizieren und zu schützen, ohne dabei die Produktivität der Benutzer oder ihre Zusammenarbeit zu beeinträchtigen. Da SLabel1 in der Spalte „Sensitivity“ (Vertraulichkeit) der SharePoint-Dokumentbibliothek als Bezeichnung eines Dokuments erscheint, handelt es sich um eine solche Vertraulichkeitsbezeichnung – ihre Einstellungen (Name, Priorität, Schutzeinstellungen) werden zentral im Microsoft Purview-Portal unter Information Protection > Sensitivity labels verwaltet, nicht im Microsoft Defender-, SharePoint- oder Microsoft 365-Admin-Center.",
    resources: [
      { label: "Learn about sensitivity labels", url: "https://learn.microsoft.com/en-us/purview/sensitivity-labels" },
      { label: "Create and configure sensitivity labels with Microsoft Purview", url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-information-protect-information" },
    ],
  },
  {
    id: "real-ab900-35",
    topicId: "purview-compliance",
    prompt: "Um den Satz zu vervollständigen, wählen Sie im Antwortbereich die entsprechende Option aus.",
    blankFill: {
      template: "Sie können ___ verwenden, um Bedrohungsindikatoren zu überprüfen, die über E-Mail-, Identitäts- und Gerätevorfälle hinweg in einer einzigen Ansicht korreliert sind.",
      choices: ["Microsoft Defender für Office 365", "Microsoft Defender XDR", "Microsoft Purview Compliance Manager", "Microsoft Purview Data Loss Prevention"],
    },
    options: [
      { id: "A", text: "Sie können Microsoft Defender für Office 365 verwenden, um Bedrohungsindikatoren zu überprüfen, die über E-Mail-, Identitäts- und Gerätevorfälle hinweg in einer einzigen Ansicht korreliert sind." },
      { id: "B", text: "Sie können Microsoft Defender XDR verwenden, um Bedrohungsindikatoren zu überprüfen, die über E-Mail-, Identitäts- und Gerätevorfälle hinweg in einer einzigen Ansicht korreliert sind." },
      { id: "C", text: "Sie können Microsoft Purview Compliance Manager verwenden, um Bedrohungsindikatoren zu überprüfen, die über E-Mail-, Identitäts- und Gerätevorfälle hinweg in einer einzigen Ansicht korreliert sind." },
      { id: "D", text: "Sie können Microsoft Purview Data Loss Prevention verwenden, um Bedrohungsindikatoren zu überprüfen, die über E-Mail-, Identitäts- und Gerätevorfälle hinweg in einer einzigen Ansicht korreliert sind." },
    ],
    correct: "B",
    explanation: "Mit Microsoft Defender XDR lassen sich benutzerdefinierte Bedrohungswarnungen erstellen, die helfen, mögliche Angriffsaktivitäten in der Organisation im Blick zu behalten. Verdächtige Ereignisse können markiert werden, um Hinweise zusammenzufügen und möglicherweise eine Angriffskette zu stoppen. Diese benutzerdefinierten Bedrohungswarnungen gelten nur für die eigene Organisation und markieren genau die Ereignisse, die überwacht werden sollen – Defender XDR korreliert dabei Signale über E-Mail-, Identitäts- und Gerätevorfälle hinweg in einer einzigen, zusammenhängenden Ansicht. Microsoft Defender für Office 365 deckt nur E-Mail-Bedrohungen ab, Microsoft Purview Compliance Manager bewertet die Compliance-Lage, und Microsoft Purview Data Loss Prevention verhindert das Teilen sensibler Daten – keines dieser drei liefert eine vorfallsübergreifende, korrelierte Bedrohungsansicht über E-Mail, Identität und Geräte hinweg.",
    resources: [
      { label: "Understand threat intelligence concepts", url: "https://learn.microsoft.com/en-us/defender-endpoint/threat-indicator-concepts" },
    ],
  },
  {
    id: "real-ab900-36",
    topicId: "purview-compliance",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement, das einen Benutzer namens User1 enthält. User1 plant, Ihr Unternehmen in zwei Wochen zu verlassen. Sie müssen die Aktivitäten von User1 erfassen, um festzustellen, ob der Benutzer Daten exfiltriert. Welche Microsoft Purview-Lösung sollten Sie verwenden?",
    options: [
      { id: "A", text: "Kommunikations-Compliance" },
      { id: "B", text: "Verwaltung der Datensicherheitslage" },
      { id: "C", text: "Verwaltung von Insider-Risiken" },
      { id: "D", text: "Datenlebenszyklusverwaltung" },
    ],
    correct: "C",
    explanation: "Microsoft Purview Insider Risk Management ist eine Compliance-Lösung, die interne Risiken minimiert, indem sie böswillige und unbeabsichtigte Aktivitäten in der Organisation erkennt, untersucht und Maßnahmen dagegen ermöglicht. Über Insider-Risikorichtlinien lässt sich festlegen, welche Arten von Risiken erkannt werden sollen. Insider Risk Management bietet vordefinierte Richtlinienvorlagen mit festgelegten Risikoindikatoren und einem Risikobewertungsmodell — darunter eine eigene Vorlage für „Datendiebstahl durch ausscheidende Benutzer“: Beim Verlassen einer Organisation treten typische Risikoindikatoren für möglichen Datendiebstahl auf, etwa das Herunterladen von Dateien aus SharePoint Online, das Drucken von Dateien oder das Kopieren von Daten auf private Cloud-Speicher- und Messaging-Dienste in der Nähe des Kündigungs- und Austrittsdatums. Genau diese Exfiltrationsindikatoren nutzt die Vorlage zur Risikobewertung und für Erkennung/Warnungen in diesem Bereich. Kommunikations-Compliance überwacht Nachrichteninhalte auf Richtlinienverstöße, Verwaltung der Datensicherheitslage bewertet die allgemeine Datensicherheit (u. a. für KI), und Datenlebenszyklusverwaltung steuert Aufbewahrung und Löschung — keine dieser drei ist auf die Erkennung von Datenexfiltration durch einzelne (z. B. ausscheidende) Benutzer spezialisiert.",
    resources: [
      { label: "Learn about Insider Risk Management", url: "https://learn.microsoft.com/en-us/purview/insider-risk-management" },
      { label: "Learn about Insider Risk Management policy templates", url: "https://learn.microsoft.com/en-us/purview/insider-risk-management-policy-templates" },
    ],
  },
  {
    id: "real-ab900-37",
    topicId: "verwaltung-governance",
    prompt: "Ihre Organisation hat ein Microsoft 365-Abonnement, das Microsoft SharePoint- Websites und Microsoft Teams-Teams enthält. Sie stellen fest, dass die Websites und Teams mit Benutzern außerhalb Ihrer Organisation geteilt werden. Sie müssen herausfinden, welche Websites und Teams mit den externen Benutzern geteilt wurden. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Das SharePoint-Admincenter" },
      { id: "B", text: "Das Microsoft Teams-Admincenter" },
      { id: "C", text: "Das Microsoft 365-Admincenter" },
      { id: "D", text: "Das Microsoft Defender-Portal" },
    ],
    correct: "A",
    explanation: "Mit zunehmender Datenmenge wachsen auch die unkontrollierte Ausbreitung (Sprawl) und übermäßige Freigabe (Oversharing) von SharePoint-Websites, weshalb Organisationen Unterstützung bei der Data Governance benötigen. Die Data-Access-Governance-Berichte helfen dabei, den Zugriff auf SharePoint-Daten zu steuern: Sie zeigen Websites auf, die potenziell übermäßig freigegebene oder sensible Inhalte enthalten, sodass sich passende Sicherheits- und Compliance-Richtlinien anwenden lassen — genau das gesuchte Szenario mit extern geteilten Websites und Teams. Der Zugriff erfolgt, indem man sich mit SharePoint-Administratorrechten im SharePoint-Admincenter anmeldet und im linken Bereich unter „Berichte“ den Punkt „Data Access Governance“ auswählt. Das Microsoft Teams-Admincenter, das Microsoft 365-Admincenter und das Microsoft Defender-Portal bieten keine vergleichbaren, speziell auf externe Freigabe von Websites/Teams ausgerichteten Berichte.",
    resources: [
      { label: "Data access governance reports for SharePoint and OneDrive sites", url: "https://learn.microsoft.com/en-us/sharepoint/data-access-governance-reports" },
    ],
  },
  {
    id: "real-ab900-38",
    topicId: "copilot-grundlagen",
    prompt: "Eine Organisation verlangt, dass Copilot niemals Ergebnisse aus öffentlichen Websuchen in Antworten einbezieht, um eine mögliche Offenlegung interner Aufforderungen/Daten zu vermeiden. Welche Copilot-Funktion sollte ein Administrator deaktivieren, um die Webgrundlage für Copilot-Antworten zu blockieren?",
    options: [
      { id: "A", text: "Copilot in Word" },
      { id: "B", text: "Copilot für Microsoft 365" },
      { id: "C", text: "Copilot Chat" },
      { id: "D", text: "Copilot-Funktionen in Microsoft 365 Apps" },
    ],
    correct: "C",
    explanation: "Um die Qualität der Antworten zu verbessern, kann Copilot Chat Websuchanfragen an den Bing-Suchdienst senden, um Antworten mit aktuellen Informationen aus dem Web zu untermauern. Die Websuche in Copilot Chat lässt sich über die Richtlinie „Allow web search in Copilot“ steuern, die im Cloud Policy-Dienst für Microsoft 365 verfügbar ist und sich auch im Einstellungsbereich der Copilot-Control-System-Seite im Microsoft 365 Admin Center befindet. Die Richtlinie erlaubt die Verwaltung der Websuche auf Mandantenebene und lässt sich bei Bedarf für bestimmte Gruppen und Benutzer anpassen — auch für Benutzer mit einer Microsoft 365 Copilot-Lizenz. Wird die Richtlinie nicht konfiguriert, ist die Websuche standardmäßig sowohl in Microsoft 365 Copilot als auch in Copilot Chat verfügbar. Da genau Copilot Chat die Websuchfunktion nutzt, ist die Deaktivierung dieser Funktion (über die genannte Richtlinie) der richtige Ansatzpunkt, um die Webgrundlage für Copilot-Antworten zu blockieren.",
    explanationImageUrl: "/exam-images/ab900-q38-explain.png",
    resources: [
      { label: "Manage web search queries in Copilot Chat", url: "https://learn.microsoft.com/en-us/copilot/manage#manage-web-search-queries-in--chat" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-39",
    topicId: "copilot-grundlagen",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein. (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Der Microsoft 365 Copilot-Nutzungsbericht kann verwendet werden, um von Benutzern eingereichte Copilot-Prompts anzuzeigen", correct: "Nein" },
      { text: "Der Microsoft 365 Copilot-Nutzungsbericht zeigt die Gesamtzahl der eindeutigen Benutzer in Ihrer Organisation, denen Microsoft 365 Copilot-Lizenzen zugewiesen sind", correct: "Ja" },
      { text: "Der Microsoft 365 Copilot-Nutzungsbericht zeigt die Copilot-Nutzung jeder einzelnen Microsoft 365-App", correct: "Ja" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Ja", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Das Microsoft 365-Nutzungsbericht-Dashboard zeigt einen Aktivitätsüberblick über die Microsoft 365-Apps der Organisation und erlaubt es, in einzelne produktbezogene Berichte für detailliertere Einblicke zu wechseln. Der Microsoft 365 Copilot-Nutzungsbericht im Microsoft 365 Admin Center zeigt aggregierte Nutzungskennzahlen wie aktivierte Benutzer, aktive Benutzer, Adaptionstrends und Prompt-Zahlen in aggregierter Form – er zeigt jedoch NICHT den tatsächlichen Prompt-Text, den Benutzer eingereicht haben. Zu den verfügbaren Kennzahlen zählen unter anderem: „Aktivierte Benutzer“ (Gesamtzahl eindeutiger Benutzer mit Microsoft 365 Copilot-Lizenz im gewählten Zeitraum), „Aktive Benutzer“ (Benutzer, die eine Copilot-Funktion tatsächlich genutzt haben), die „Aktive-Benutzer-Rate“, „Aktive Agent-Benutzer“ sowie „Insgesamt gesendete Prompts“ und der „Durchschnitt gesendeter Prompts pro Benutzer“ – letztere unter anderem aufgeschlüsselt nach einzelnen Microsoft 365-Apps. Der Bericht liefert also Nutzungszahlen pro App und die Gesamtzahl lizenzierter Benutzer, aber keinen Einblick in den Inhalt einzelner Prompts.",
    resources: [
      { label: "Microsoft 365 Copilot usage report - Microsoft 365 admin center", url: "https://learn.microsoft.com/en-us/microsoft-365/admin/activity-reports/microsoft-365-copilot-usage" },
    ],
  },
  {
    id: "real-ab900-40",
    topicId: "copilot-grundlagen",
    prompt: "Sie planen, einen Agenten in der Microsoft 365 Copilot-App zu erstellen, um ein geschäftliches Problem zu lösen. Was sind zwei Gründe, den Agenten zu erstellen? (Jede richtige Antwort stellt eine vollständige Lösung dar. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    options: [
      { id: "A", text: "Sie müssen ein benutzerdefiniertes KI-Modell verwenden." },
      { id: "B", text: "Sie müssen eine benutzerdefinierte Anweisungsmenge verwenden, die sich von der der Chat-Erfahrung unterscheidet." },
      { id: "C", text: "Sie müssen über eine bestimmte Website nachdenken." },
      { id: "D", text: "Sie müssen verwandte Chats in einem Copilot-Notizbuch gruppieren." },
    ],
    correct: ["B", "C"],
    explanation: "Agenten erweitern die Funktionalität von Copilot, indem sie als spezialisierte KI-Assistenten für bestimmte Bereiche fungieren. Sie nutzen organisatorisches Wissen und Automatisierung, um Geschäftsprozesse zu optimieren, Entscheidungen zu verbessern und die Effizienz zu steigern — sie können Informationen abrufen, Daten zusammenfassen oder sogar Aktionen wie das Senden von E-Mails oder das Aktualisieren von Datensätzen ausführen. Agenten lassen sich auf zwei Arten erstellen: deklarativ (mit eigenen Anweisungen, Wissensquellen und Aktionen in Kombination mit Copilots Orchestrator und Modellen) oder mit einer eigenen Engine (mit eigenem Orchestrator und Modellen für eine vollständig maßgeschneiderte Lösung). Ein Agent lohnt sich insbesondere, wenn eine benutzerdefinierte Anweisungsmenge benötigt wird, die sich von der Standard-Chat-Erfahrung unterscheidet, oder wenn über eine bestimmte Wissensquelle (z. B. eine bestimmte Website) argumentiert werden muss — beides sind Kernkomponenten eines Agenten (Wissen und Aktionen). Ein benutzerdefiniertes KI-Modell ist dagegen nur beim Custom-Engine-Ansatz relevant (nicht bei jedem Agenten grundsätzlich erforderlich), und das Gruppieren verwandter Chats in einem Copilot-Notizbuch ist eine reine Chat-Organisationsfunktion, kein Grund, einen Agenten zu erstellen.",
    resources: [
      { label: "Agents for Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agents-overview" },
      { label: "Copilot and AI agents", url: "https://www.microsoft.com/en-us/microsoft-copilot/copilot-101/copilot-ai-agents" },
    ],
  },
  {
    id: "real-ab900-41",
    topicId: "purview-compliance",
    prompt: "Ein wesentliches Governance-Risiko bei der Implementierung von Microsoft 365 Copilot ist das mögliche Übermitteln von Unternehmensdaten. Der Chief Compliance Officer ist besorgt, dass ein Benutzer, da Copilot alle Daten nutzt, auf die er Zugriff hat, versehentlich Zugang zu sensiblen Informationen erhalten könnte, auf die er eigentlich keinen Zugriff haben sollte. Was ist die häufigste Ursache dieses Risikos des übermäßigen Teilens, die Administratoren als Governance-Aufgabe mit hoher Priorität angehen müssen, bevor Copilot breit eingesetzt wird?",
    options: [
      { id: "A", text: "Copilot umgeht SharePoint-Zugriffskontrollen, wenn Inhalte indexiert werden." },
      { id: "B", text: "Zu weit gefasste Berechtigungen für Sites oder Dateien." },
      { id: "C", text: "Die Chatprotokolle von Copilot unterliegen nicht der eDiscovery oder Aufbewahrung." },
      { id: "D", text: "Das Training des Azure OpenAI-Modells verwendet Mandantendaten und behält sie im Mandanten." },
    ],
    correct: "B",
    explanation: "Copilot respektiert das bestehende Identitätsmodell und die Berechtigungen einer Organisation, übernimmt Vertraulichkeitsbezeichnungen, wendet Aufbewahrungsrichtlinien an, unterstützt die Überwachung von Interaktionen und folgt den administrativen Einstellungen. Da Copilot dabei jedoch grundsätzlich auf alle Daten zugreifen kann, auf die der jeweilige Benutzer bereits Zugriff hat, wird ein bestehendes, aber bislang oft unbemerktes Problem sichtbar: zu weit gefasste Berechtigungen für Sites oder Dateien (z. B. Freigaben an „Jeder außer externen Benutzern“ oder überholte Berechtigungsstrukturen). Genau diese übermäßig freizügigen Berechtigungen sind die häufigste Ursache für das Risiko des übermäßigen Teilens (Oversharing) und müssen vor einer breiten Copilot-Einführung als Governance-Aufgabe priorisiert bereinigt werden – um sicherzustellen, dass Benutzer keine unnötigen Datenzugriffsrechte besitzen. Copilot umgeht keine SharePoint-Zugriffskontrollen bei der Indexierung, Chatprotokolle unterliegen sehr wohl eDiscovery und Aufbewahrung, und das Modelltraining verwendet keine Mandantendaten des Kunden zum Training des zugrunde liegenden Modells.",
    resources: [
      { label: "Enterprise data protection in Microsoft 365 Copilot and Microsoft 365 Copilot Chat", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/enterprise-data-protection" },
    ],
  },
  {
    id: "real-ab900-42",
    topicId: "sicherheit-identitaet",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Sie müssen Sicherheitsvorfälle und Warnungen untersuchen, die von den Windows 11- Geräten in Ihrer Organisation ausgelöst wurden. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Microsoft Entra ID Protection" },
      { id: "B", text: "Microsoft Defender for Identity" },
      { id: "C", text: "Microsoft Purview Insider Risk Management" },
      { id: "D", text: "Microsoft Defender for Endpoint" },
    ],
    correct: "D",
    explanation: "Microsoft Defender for Endpoint ist eine Endpunktsicherheitsplattform für Unternehmen, die dabei hilft, fortgeschrittene Bedrohungen auf Endpunkten zu verhindern, zu erkennen, zu untersuchen und darauf zu reagieren. Zu den Endpunkten zählen Laptops, Smartphones, Tablets, PCs, Access Points, Router und Firewalls. Defender for Endpoint ist Teil von Microsoft Defender XDR und lässt sich mit weiteren Microsoft-Lösungen integrieren, darunter Intune, Microsoft Defender for Cloud, Microsoft Defender for Cloud Apps, Microsoft Defender for Identity, Microsoft Defender for Office, Microsoft Defender Vulnerability Management und Microsoft Sentinel. Es unterstützt die Betriebssysteme Windows, macOS, Linux, Android und iOS — damit ist es die richtige Wahl, um Sicherheitsvorfälle und Warnungen zu untersuchen, die von Windows-11-Geräten ausgelöst wurden. Microsoft Entra ID Protection und Microsoft Defender for Identity konzentrieren sich auf identitätsbezogene Risiken, und Microsoft Purview Insider Risk Management erkennt riskantes Nutzerverhalten — keines davon ist auf Gerätesicherheitsvorfälle spezialisiert.",
    resources: [
      { label: "Microsoft Defender for Endpoint", url: "https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint" },
    ],
  },
  {
    id: "real-ab900-43",
    topicId: "verwaltung-governance",
    prompt: "Ihr Unternehmen verlangt, dass alle Microsoft SharePoint-Websites mindestens zwei Besitzer haben. Sie müssen sicherstellen, dass Websites, die weniger als zwei Besitzer haben, als nur lesbar markiert werden, wenn die Websites NICHT behoben werden. Was sollten Sie im SharePoint-Admincenter konfigurieren?",
    options: [
      { id: "A", text: "Einschränkung des Zugriffs auf Website-Ebene" },
      { id: "B", text: "Berichte zur Datenzugriffsverwaltung" },
      { id: "C", text: "Website-Lebenszyklusverwaltung" },
      { id: "D", text: "Richtlinie zum Blockieren von Downloads für SharePoint und OneDrive" },
    ],
    correct: "C",
    explanation: "Hierfür wird die Website-Lebenszyklusverwaltung (Site Lifecycle Management) aus SharePoint Advanced Management genutzt. Richtlinien zur Website-Eigentümerschaft sind Teil der Website-Lebenszyklusverwaltung und helfen dabei, die Eigentümerschaftsanforderungen einer Organisation automatisch zu überwachen und durchzusetzen. Mit diesen Richtlinien lässt sich festlegen, wer für jede Website verantwortlich sein soll, eine Mindestanzahl an Besitzern oder Administratoren definieren und Benachrichtigungen automatisieren, wenn Websites die festgelegten Kriterien nicht erfüllen. Durch regelmäßiges Erkennen nicht konformer Websites und das Auffordern der Benutzer zum Handeln unterstützen Richtlinien zur Website-Eigentümerschaft ein effektives Website-Management, verringern das Risiko besitzerloser Websites und helfen, Sicherheit und Compliance in der SharePoint-Umgebung aufrechtzuerhalten — einschließlich der Möglichkeit, Websites bei Nichtbehebung automatisch auf „Nur Lesen“ zu setzen. Die Einschränkung des Zugriffs auf Website-Ebene, Berichte zur Datenzugriffsverwaltung und die Richtlinie zum Blockieren von Downloads dienen anderen Zwecken und setzen keine Eigentümerschaftsanforderungen durch.",
    resources: [
      { label: "What is SharePoint Advanced Management?", url: "https://learn.microsoft.com/en-us/sharepoint/advanced-management" },
    ],
  },
  {
    id: "real-ab900-44",
    topicId: "copilot-grundlagen",
    prompt: "Der IT-Leiter möchte aggregierte, mandantenbezogene Kennzahlen wie aktive Copilot-Benutzer, Nutzung nach App und Prompt-Kategorien, um den ROI von Copilot zu messen. Welches Verwaltungstool bietet diese aggregierte Adoption- und Nutzungsauswertung?",
    options: [
      { id: "A", text: "Microsoft Purview Auditprotokoll" },
      { id: "B", text: "Copilot-Analyse-Dashboard" },
      { id: "C", text: "Microsoft Entra ID Anmeldeprotokolle" },
      { id: "D", text: "Microsoft 365 Service-Status" },
    ],
    correct: "B",
    explanation: "Das Microsoft Copilot Analytics Dashboard in Viva Insights ist das zentrale, dediziert für Microsoft 365 Copilot entwickelte Verwaltungstool zur Überwachung von Nutzung und Adoption. Es liefert wichtige Berichte und Einblicke zu aktiven Benutzern, Nutzung nach Anwendung (Word, Teams, Excel), Benutzerbindung und sogar Kategorien der Prompt-Nutzung — allesamt zentrale Kennzahlen, um Adoption und ROI (Return on Investment) zu messen. Das Microsoft Purview Auditprotokoll protokolliert einzelne Aktivitäten, die Microsoft Entra ID Anmeldeprotokolle betreffen Anmeldevorgänge, und der Microsoft 365 Service-Status zeigt den Betriebsstatus der Dienste — keines davon liefert aggregierte, mandantenweite Copilot-Adoptionskennzahlen wie das Copilot Analytics Dashboard.",
    resources: [
      { label: "Copilot Analytics introduction", url: "https://learn.microsoft.com/en-us/viva/insights/copilot-analytics-introduction" },
      { label: "Connect to the Microsoft Copilot Dashboard for Microsoft 365 customers", url: "https://learn.microsoft.com/en-us/viva/insights/org-team-insights/copilot-dashboard" },
    ],
  },
  {
    id: "real-ab900-45",
    topicId: "copilot-agenten",
    prompt: "Bevor ein in Copilot Studio erstellter KI-Agent, der eine Verbindung zu einer lokalen Finanzdatenbank herstellt, veröffentlicht werden kann, muss ein Administrator den Zugriff, die Leistung und den Lebenszyklusstatus überprüfen. Welche zwei Microsoft-Admin-Center werden hauptsächlich verwendet, um den Lebenszyklus und die Umgebungseinstellungen des Agenten zu verwalten und zu überwachen? (Jede richtige Auswahl stellt einen Teil der Lösung dar. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    options: [
      { id: "A", text: "Microsoft Purview-Portal" },
      { id: "B", text: "Microsoft Entra-Admincenter" },
      { id: "C", text: "Microsoft 365-Admincenter" },
      { id: "D", text: "Microsoft Power Platform-Admin" },
      { id: "E", text: "Exchange-Administrationscenter" },
    ],
    correct: ["C", "D"],
    explanation: "Die Verwaltungskontrollen des Copilot Control System helfen dabei, die Bereitstellung und Anpassung von Microsoft 365 Copilot-Lizenzen und -Agenten an die individuellen Anforderungen einer Organisation zu steuern. Die entsprechenden Verwaltungskontrollen finden sich hauptsächlich im Microsoft 365 Admin Center, im Power Platform Admin Center und in Copilot Studio selbst. Das Microsoft 365-Admincenter ist die zentrale Steuerungsebene für Governance und Lebenszyklus-Freigabe von Copilot-Agenten (z. B. Genehmigung, Sichtbarkeit, Blockieren). Das Microsoft Power Platform-Admincenter ist die Steuerungsebene für Umgebung, Leistung und Infrastruktur von Copilot Studio — hier werden Umgebungen, Kapazität und Konnektoren (wie die Verbindung zur lokalen Finanzdatenbank) verwaltet. Das Microsoft Purview-Portal, das Microsoft Entra-Admincenter und das Exchange-Administrationscenter decken andere Bereiche (Compliance, Identität bzw. E-Mail) ab und sind nicht die primären Steuerungsebenen für den Lebenszyklus und die Umgebungseinstellungen von Copilot-Agenten.",
    resources: [
      { label: "Copilot Control System management controls", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/copilot-control-system" },
      { label: "Manage Copilot Studio credits and capacity", url: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing-capacity" },
    ],
  },
  {
    id: "real-ab900-46",
    topicId: "verwaltung-governance",
    prompt: "Um den Satz zu vervollständigen, wählen Sie im Antwortbereich die entsprechende Option aus.",
    blankFill: {
      template: "Vom SharePoint-Admincenter aus können Sie ___ erstellen.",
      choices: ["einen Server", "einen Benutzer", "eine Website", "eine Rolle"],
    },
    options: [
      { id: "A", text: "Vom SharePoint-Admincenter aus können Sie einen Server erstellen." },
      { id: "B", text: "Vom SharePoint-Admincenter aus können Sie einen Benutzer erstellen." },
      { id: "C", text: "Vom SharePoint-Admincenter aus können Sie eine Website erstellen." },
      { id: "D", text: "Vom SharePoint-Admincenter aus können Sie eine Rolle erstellen." },
    ],
    correct: "C",
    explanation: "Die Seite „Aktive Websites“ im SharePoint-Admincenter zeigt die SharePoint-Websites einer Organisation an, einschließlich Kommunikationswebsites, Kanalwebsites und Websites, die zu Microsoft 365-Gruppen gehören. Dort lassen sich Websites sortieren und filtern, nach einer Website suchen und neue Websites erstellen. Die Seite listet jeweils die Root-Website jeder Websitesammlung auf. Server, Benutzer und Rollen werden dagegen nicht über das SharePoint-Admincenter erstellt, sondern über andere Verwaltungsbereiche (z. B. das Microsoft 365 Admin Center für Benutzer).",
    resources: [
      { label: "Manage sites in the SharePoint admin center", url: "https://learn.microsoft.com/en-us/sharepoint/manage-sites-in-new-admin-center" },
    ],
  },
  {
    id: "real-ab900-47",
    topicId: "copilot-agenten",
    prompt: "Sie müssen einen Microsoft 365 Copilot-Agenten erstellen, der Diagramme und Visualisierungen basierend auf einer Microsoft Excel-Arbeitsmappe erstellen kann. Was sollten Sie für den Agenten konfigurieren?",
    options: [
      { id: "A", text: "Die Bildgenerierungsfunktion" },
      { id: "B", text: "Die Scrum Assistant-Vorlage" },
      { id: "C", text: "Die Customer Insights Assistant-Vorlage" },
      { id: "D", text: "Die Code-Interpreter-Funktion" },
    ],
    correct: "D",
    explanation: "Mit der Code-Interpreter-Funktion können Copilot Studio-Agenten Python-Code generieren und ausführen, um auf Benutzeranfragen zu antworten. Der Code-Interpreter unterstützt Aufgaben wie statistische Analysen, Tabellenverknüpfungen, Prognosen und die Erstellung von Diagrammen — und arbeitet dabei mit strukturierten Dateien wie CSV und Excel. Der Mehrwert liegt darin, dass durch deterministische, reproduzierbare Berechnungen vertrauenswürdige Analysen innerhalb von Agenten möglich werden (statt sich allein auf die mathematischen und logischen Fähigkeiten des Sprachmodells zu verlassen), die Einstiegshürde für fortgeschrittene Analysen durch natürlichsprachliche Fragen gesenkt wird und Tabellen sowie Visualisierungen programmatisch erzeugt werden, die Benutzer ansehen, herunterladen und weiterverwenden können. Strukturierte Dateien lassen sich dem Agenten auf zwei Arten bereitstellen: durch den Endbenutzer per Upload während des Chats, oder durch den Ersteller über eine SharePoint-Dokumentbibliothek als Wissensquelle. Die Bildgenerierungsfunktion erzeugt Bilder statt Datenvisualisierungen, und die Scrum-Assistant- bzw. Customer-Insights-Assistant-Vorlagen sind für andere, nicht datenanalytische Anwendungsfälle konzipiert.",
    resources: [
      { label: "Use code interpreter to analyze structured data", url: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-code-interpreter-structured-data" },
    ],
  },
  {
    id: "real-ab900-48",
    topicId: "verwaltung-governance",
    prompt: "Ihr Unternehmen testet die Verwendung von Microsoft 365 Copilot und hat 100 Microsoft 365 Copilot-Lizenzen erworben. Sie müssen detaillierte Berichte über die Nutzung von Copilot in Microsoft Teams anzeigen, wie z. B. zusammengefasste Besprechungsstunden durch Copilot und durch Copilot vorgenommene Besprechungsaktionen. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Der Microsoft 365 Copilot-Bereitschaftsbericht im Microsoft 365 Admin Center" },
      { id: "B", text: "Der Microsoft 365 Copilot-Nutzungsbericht im Microsoft 365 Admin Center" },
      { id: "C", text: "Das Microsoft 365 Copilot-Dashboard in Microsoft Viva Insights" },
      { id: "D", text: "Der Microsoft 365 Apps-Nutzungsbericht im Microsoft 365 Admin Center" },
    ],
    correct: "C",
    explanation: "Copilot-Kennzahlen auf Besprechungsebene in Microsoft Teams sind im Microsoft Copilot Dashboard innerhalb von Viva Insights verfügbar. Das Copilot Dashboard enthält Besprechungskennzahlen, die zusammengefasste bzw. nachträglich rekapitulierte Besprechungsstunden sowie in Teams durch Copilot vorgenommene Aktionen anzeigen — speziell konzipiert, um die Wirkung und den ROI von Copilot zu messen. Da der Mandant über 100 Microsoft 365 Copilot-Lizenzen verfügt, ist die Schwelle für die vollständigen Funktionen des Copilot Dashboards in Viva Insights erreicht, einschließlich dieser erweiterten Besprechungseinblicke. Der Bereitschaftsbericht, der Nutzungsbericht und der Apps-Nutzungsbericht im Microsoft 365 Admin Center liefern dagegen keine derart detaillierten, besprechungsbezogenen Copilot-Kennzahlen.",
    resources: [
      { label: "Connect to the Microsoft Copilot Dashboard for Microsoft 365 customers", url: "https://learn.microsoft.com/en-us/viva/insights/org-team-insights/copilot-dashboard" },
    ],
  },
  {
    id: "real-ab900-49",
    topicId: "copilot-agenten",
    prompt: "Ein Benutzer namens User1 erstellt einen Microsoft 365 Copilot-Agenten namens Agent1 und teilt den Agenten mit einem Benutzer namens User2. Was passiert, wenn ein Administrator Agent1 blockiert?",
    options: [
      { id: "A", text: "Agent1 ist für User1 und User2 zugänglich, bis die Benutzer den Agenten manuell deinstallieren. Kein anderer Benutzer kann Agent1 installieren." },
      { id: "B", text: "Agent1 ist für User1 und User2 zugänglich, und kein anderer Benutzer kann Agent1 installieren." },
      { id: "C", text: "Agent1 wird von User2 entfernt, und User1 kann weiterhin Agent1 verwenden." },
      { id: "D", text: "Agent1 wird von User1 und User2 entfernt, und kein Benutzer kann Agent1 installieren." },
    ],
    correct: "D",
    explanation: "Agenten für Copilot lassen sich über das Microsoft 365 Admin Center verwalten: Administratoren können Agenten für die Organisation aktivieren, deaktivieren, zuweisen, blockieren oder entfernen und die Copilot-Funktionen insgesamt steuern. Auf der Seite „Agenten“ im Microsoft 365 Admin Center sehen Administratoren alle geteilten Agenten mit Details wie Name, Ersteller, Erstellungsdatum, Host-Produkten und Verfügbarkeitsstatus und können gezielt danach suchen sowie ihren gesamten Lebenszyklus verwalten — einschließlich des Blockierens von Agenten, die als unsicher oder nicht konform eingestuft werden. Für Benutzer sind geteilte Agenten über Copilot auf verschiedenen Oberflächen verfügbar. Wenn ein Administrator einen Microsoft 365 Copilot-Agenten blockiert, gilt dieser Block organisationsweit und setzt sich über jede Benutzerfreigabe oder Eigentümerschaft hinweg durch — Agent1 wird also sowohl von User1 als auch von User2 entfernt, und kein Benutzer kann ihn installieren.",
    resources: [
      { label: "Manage agents in the Microsoft 365 admin center", url: "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-copilot-agents-integrated-apps" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-50",
    topicId: "copilot-agenten",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein. (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Administratoren können einen bestimmten Copilot-Agenten von allen Benutzern entfernen", correct: "Ja" },
      { text: "Vom Microsoft 365 Admin Center aus können Administratoren die Eingabeaufforderungen eines Copilot-Agenten konfigurieren", correct: "Nein" },
      { text: "Administratoren können Copilot-Agenten bestimmten Benutzern bereitstellen", correct: "Ja" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Agenten für Copilot lassen sich über das Microsoft 365 Admin Center verwalten: Administratoren können Agenten für die Organisation aktivieren, deaktivieren, zuweisen, blockieren oder entfernen und die Copilot-Funktionen insgesamt steuern. Auf der Seite „Agenten“ im Microsoft 365 Admin Center sehen Administratoren alle geteilten Agenten mit Details wie Name, Ersteller, Erstellungsdatum, Host-Produkten und Verfügbarkeitsstatus und können ihren gesamten Lebenszyklus verwalten, einschließlich des Entfernens von Agenten für alle Benutzer und des Zuweisens von Agenten an bestimmte Benutzer. Für Benutzer sind zugewiesene Agenten über Copilot auf verschiedenen Oberflächen verfügbar. Die eigentlichen Eingabeaufforderungen (Prompts/Instruktionen) eines Agenten lassen sich jedoch nicht über das Microsoft 365 Admin Center konfigurieren — das ist Aufgabe des Erstellungswerkzeugs (z. B. Copilot Studio oder Agent Builder), nicht der Admin-Verwaltungsoberfläche.",
    resources: [
      { label: "Manage agents in the Microsoft 365 admin center", url: "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-copilot-agents-integrated-apps" },
    ],
  },
  {
    id: "real-ab900-51",
    topicId: "verwaltung-governance",
    prompt: "Um den Satz zu vervollständigen, wählen Sie im Antwortbereich die entsprechende Option aus.",
    blankFill: {
      template: "Vom Microsoft Teams Admin Center aus können Sie ___.",
      choices: ["einem Benutzer eine Teams-Lizenz zuweisen", "den Teams-Client bereitstellen", "ein Teams-Raumgerät verwalten", "verhindern, dass Benutzer Teams erstellen"],
    },
    options: [
      { id: "A", text: "Vom Microsoft Teams Admin Center aus können Sie einem Benutzer eine Teams-Lizenz zuweisen." },
      { id: "B", text: "Vom Microsoft Teams Admin Center aus können Sie den Teams-Client bereitstellen." },
      { id: "C", text: "Vom Microsoft Teams Admin Center aus können Sie ein Teams-Raumgerät verwalten." },
      { id: "D", text: "Vom Microsoft Teams Admin Center aus können Sie verhindern, dass Benutzer Teams erstellen." },
    ],
    correct: "C",
    explanation: "Wer über ein Microsoft Teams Rooms-Gerät verfügt, kann die Geräte im Teams Rooms Pro Management Portal oder im Teams Admin Center verwalten. Um Teams-Raumgeräte im Teams Admin Center zu verwalten, öffnet man das Microsoft Teams Admin Center und navigiert zu „Teams-Geräte“; dafür ist die Rolle Teams-Administrator oder Teams-Geräteadministrator erforderlich. Die Zuweisung von Teams-Lizenzen erfolgt über das Microsoft 365 Admin Center, die Bereitstellung des Teams-Clients über Endpoint-Management-Tools (z. B. Intune), und das Verhindern der Team-Erstellung durch Benutzer wird über Microsoft Entra ID-Gruppenrichtlinien gesteuert — keines davon läuft über das Teams Admin Center selbst.",
    resources: [
      { label: "Managing Microsoft Teams Rooms", url: "https://learn.microsoft.com/en-us/microsoftteams/rooms/rooms-manage" },
    ],
  },
  {
    id: "real-ab900-52",
    topicId: "purview-compliance",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Alle Benutzer haben Lizenzen für Microsoft 365 Copilot. Sie müssen ermitteln, wo sensible Inhalte während der Copilot-Interaktionen verwendet werden, die Nutzungsmuster der Inhalte analysieren und Empfehlungen zur Anwendung der geeigneten Schutzmaßnahmen geben. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Microsoft Viva Insights" },
      { id: "B", text: "Die Microsoft Purview DSPM für AI-Lösung" },
      { id: "C", text: "Microsoft Security Copilot" },
      { id: "D", text: "Die Microsoft Purview Insider Risk Management-Lösung" },
    ],
    correct: "B",
    explanation: "Microsoft Purview Data Security Posture Management (DSPM) hilft Organisationen, Risiken bei sensiblen Daten im gesamten digitalen Bestand zu erkennen, zu schützen und zu untersuchen. Die Lösung bietet einheitliche Sichtbarkeit und Kontrolle sowohl für klassische Anwendungen als auch für KI-Apps und -Agenten und unterstützt die Daten-Governance über Microsoft 365, Azure, Fabric sowie integrierte Drittanbieter-SaaS-Plattformen hinweg — Datenrisiken lassen sich überwachen, bewerten und beheben, unabhängig davon, wo die sensiblen Daten liegen. Statt sich auf Infrastruktur oder Endpunkte zu konzentrieren, stellt DSPM die Daten selbst in den Mittelpunkt: wo sie sich befinden, wer darauf zugreifen kann, wie sie verwendet werden und ob sie ausreichend geschützt sind — besonders wichtig in einer zunehmend KI-getriebenen Arbeitswelt, in der Daten sich ständig bewegen und verändern. DSPM scannt die Umgebung kontinuierlich, um sensible Daten zu identifizieren, Risiken zu bewerten und Maßnahmen zur Risikominderung zu empfehlen, und konsolidiert dabei Erkenntnisse aus DLP, Insider Risk Management, Informationsschutz mit Vertraulichkeitsbezeichnungen und Data Security Investigations zu einer einheitlichen Ansicht für Datenrisiken, Richtlinienabdeckung und Trends. Microsoft Viva Insights liefert Produktivitäts- statt Datenrisiko-Einblicke, Microsoft Security Copilot ist ein allgemeiner KI-Sicherheitsassistent, und Insider Risk Management fokussiert auf riskantes Nutzerverhalten statt auf Copilot-spezifische Inhaltsnutzungsmuster.",
    resources: [
      { label: "Learn about Data Security Posture Management", url: "https://learn.microsoft.com/en-us/purview/data-security-posture-management-learn-about" },
    ],
  },
  {
    id: "real-ab900-53",
    topicId: "copilot-agenten",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Allen Benutzern wurden Microsoft 365 Copilot-Lizenzen zugewiesen. Einige Benutzer berichten, dass sie Copilot-Antworten erhalten, die Informationen von einer Microsoft SharePoint-Website namens Finance enthalten. Die Benutzer geben an, dass die Informationen geschäftlich sensibel sind. Sie müssen verhindern, dass Copilot Antworten bereitstellt, die Informationen von der Finance-Website enthalten. Was sollten Sie tun?",
    options: [
      { id: "A", text: "Erstellen Sie eine Informationsbarriere (IB)-Richtlinie in Microsoft Purview." },
      { id: "B", text: "Erstellen Sie einen Datenconnector in Microsoft Defender." },
      { id: "C", text: "Erstellen Sie eine Richtlinie für bedingten Zugriff in Microsoft Entra." },
      { id: "D", text: "Konfigurieren Sie die Berechtigungen auf der Finance-Website." },
    ],
    correct: "D",
    explanation: "Microsoft 365 Copilot arbeitet innerhalb der Microsoft 365-Dienstgrenze und respektiert dieselben Datenschutz-, Zugriffskontroll- und Compliance-Funktionen, die für ganz Microsoft 365 gelten. Wenn Benutzer geschäftlich sensible Informationen von der Finance-SharePoint-Website in Copilot-Antworten sehen, bedeutet das, dass diese Benutzer bereits Zugriff auf die Website oder ihre Inhalte haben — Copilot zeigt schließlich nur Daten an, auf die der jeweilige Benutzer ohnehin zugreifen kann. Um das Problem zu lösen, muss daher direkt an der Ursache angesetzt werden: Der Zugriff der betroffenen Benutzer auf die Finance-SharePoint-Website selbst muss über die Website-Berechtigungen eingeschränkt werden. Eine Informationsbarriere-Richtlinie verhindert Kommunikation zwischen bestimmten Gruppen, ein Datenconnector in Defender dient der Bedrohungserkennung, und eine Conditional-Access-Richtlinie steuert Anmeldebedingungen — keines davon entzieht direkt den Zugriff auf die Inhalte der Finance-Website.",
    resources: [
      { label: "How data is protected and audited in Microsoft 365 and Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-architecture-data-protection-auditing" },
    ],
  },
  {
    id: "real-ab900-54",
    topicId: "copilot-grundlagen",
    prompt: "Ein Manager fragt: „Was ist der hauptsächliche Unterschied in den Fähigkeiten zwischen Microsoft 365 Copilot, das in Word/Excel integriert ist, und einem benutzerdefinierten KI-Agenten, der in Copilot Studio erstellt wurde?“ Was ist die richtige Antwort?",
    options: [
      { id: "A", text: "Nur der integrierte Copilot kann auf Microsoft Graph-Daten zugreifen und diese zusammenfassen." },
      { id: "B", text: "Der integrierte Copilot ist ein allgemeiner Produktivitätsassistent. Benutzerdefinierte KI-Agenten sind für spezifische mehrstufige Aufgaben und Integrationen mit externen Systemen konzipiert." },
      { id: "C", text: "Nur benutzerdefinierte KI-Agenten können Antworten auf organisatorische Daten stützen." },
      { id: "D", text: "Benutzerdefinierte Agenten sind nur über das Copilot Studio-Portal zugänglich, während Copilot in Apps eingebettet ist." },
    ],
    correct: "B",
    explanation: "Microsoft 365 Copilot ist ein KI-gestütztes Produktivitätstool, das Arbeitsabläufe in Microsoft-365-Anwendungen wie Copilot Chat, Outlook, Teams und Word verbessert und dabei Unternehmensdaten aus Microsoft Graph nutzt. Obwohl Copilot leistungsstarke integrierte Fähigkeiten bietet, benötigen Organisationen oft zusätzliches Wissen, weitere Datenquellen oder Anwendungen, um spezifische Anwendungsfälle abzudecken. Agenten erweitern die Funktionalität von Copilot, indem sie als spezialisierte KI-Assistenten für bestimmte Bereiche fungieren. Sie nutzen organisatorisches Wissen und Automatisierung, um Geschäftsprozesse zu optimieren, Entscheidungen zu verbessern und die Effizienz zu steigern — sie können Informationen abrufen, Daten zusammenfassen oder sogar Aktionen wie das Senden von E-Mails oder das Aktualisieren von Datensätzen ausführen. Der integrierte Copilot deckt also die breite, alltägliche Produktivität ab, während benutzerdefinierte Agenten für spezifische, mehrstufige Aufgaben und die Integration externer Systeme konzipiert sind — beide können auf organisatorische Daten über Microsoft Graph zugreifen, und beide sind auf unterschiedliche Weise in die Arbeitsumgebung eingebettet.",
    resources: [
      { label: "Agents for Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agents-overview" },
    ],
  },
  {
    id: "real-ab900-55",
    topicId: "copilot-grundlagen",
    prompt: "Ein Abteilungsleiter hat einen hochwirksamen, komplexen Microsoft 365 Copilot- Prompt zur Analyse wöchentlicher Verkaufsdaten entwickelt. Der Leiter möchte, dass alle 30 Mitglieder seines Verkaufsteams einfachen und konsistenten Zugriff auf diese spezielle Prompt-Vorlage haben. Welche Methode wird empfohlen, um sicherzustellen, dass diese wertvolle Vorlage vom gesamten Team einheitlich verwendet wird?",
    options: [
      { id: "A", text: "Verwenden Sie die Copilot Studio-Oberfläche, um den Prompt als neuen Agenten zu veröffentlichen." },
      { id: "B", text: "Senden Sie den Text des Prompts per E-Mail an das Team und weisen Sie sie an, ihn in ihrem persönlichen OneDrive zu speichern." },
      { id: "C", text: "Teilen Sie die Prompt-Vorlage direkt aus der Microsoft 365 Copilot Prompt- Bibliothek." },
      { id: "D", text: "Erstellen Sie einen Power Automate-Flow, der den Prompt wöchentlich ausführt." },
    ],
    correct: "C",
    explanation: "Copilot-Prompts sind Anweisungen oder Fragen, mit denen man Copilot mitteilt, was man erreichen möchte — sie können aus bis zu vier Teilen bestehen: Ziel, Kontext, Erwartungen und Quelle. Microsoft 365 Copilot enthält eine integrierte Prompt-Galerie, die speziell dafür entwickelt wurde, wertvolle Prompts im Team zu speichern, wiederzuverwenden und zu teilen. Mit wachsender Erfahrung im Umgang mit Microsoft 365 Copilot und beim Erstellen hilfreicher Prompts lohnt es sich, diese nicht für sich zu behalten: Die Copilot-Prompt-Galerie macht es einfach, Prompts zu finden, zu speichern und zu teilen, die dem eigenen Team und der gesamten Organisation helfen, effektiver zu arbeiten. Das Veröffentlichen als Agent, der Versand per E-Mail oder ein automatisierter Power-Automate-Flow sind für diesen Zweck nicht die vorgesehene bzw. praktikabelste Lösung, um eine Prompt-Vorlage konsistent im gesamten Team verfügbar zu machen.",
    resources: [
      { label: "Learn about Copilot prompts", url: "https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5" },
      { label: "Sharing prompts with a Team", url: "https://support.microsoft.com/en-us/topic/sharing-prompts-with-a-team-2fa7a228-8645-4dc4-beec-d75d6d0bc752" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-56",
    topicId: "purview-compliance",
    prompt: "Sie bewerten Microsoft Purview-Lösungen. Wählen Sie für jede der folgenden Aussagen \"Ja\" aus, wenn die Aussage zutrifft. Andernfalls wählen Sie \"Nein\".",
    statements: [
      { text: "Eine Richtlinie zur Kommunikations-Compliance kann unangemessene Texte in Microsoft Teams-Nachrichten erkennen", correct: "Ja" },
      { text: "Eine Richtlinie zur Kommunikations-Compliance kann anstößige Sprache in Microsoft 365 Copilot-Eingabeaufforderungen erkennen", correct: "Ja" },
      { text: "Eine Richtlinie zur Kommunikations-Compliance kann verwendet werden, um E-Mail-Nachrichten 10 Jahre lang aufzubewahren", correct: "Nein" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Microsoft Purview Kommunikations-Compliance ist eine Insider-Risk-Lösung, die hilft, Kommunikationsrisiken zu minimieren, indem sie unterstützt, potenziell unangemessene Nachrichten in der Organisation zu erkennen, zu erfassen und zu bearbeiten. Vordefinierte und benutzerdefinierte Richtlinien prüfen interne und externe Kommunikation auf Richtlinienübereinstimmungen, damit festgelegte Prüfer sie untersuchen können. Prüfer können dabei E-Mail, Microsoft Teams, Microsoft 365 Copilot und Microsoft 365 Copilot Chat, Viva Engage oder Kommunikation von Drittanbietern in der Organisation untersuchen und geeignete Maßnahmen ergreifen, um die Einhaltung der Nachrichtenstandards der Organisation sicherzustellen — Kommunikations-Compliance deckt also sowohl Teams-Nachrichten als auch Copilot-Eingabeaufforderungen ab. Kommunikations-Compliance dient jedoch der Erkennung und Überprüfung von Inhalten, nicht der langfristigen Aufbewahrung von E-Mail-Nachrichten über Jahre hinweg — dafür ist stattdessen die Datenlebenszyklusverwaltung (Aufbewahrungsrichtlinien) zuständig.",
    resources: [
      { label: "Learn about Communication Compliance", url: "https://learn.microsoft.com/en-us/purview/communication-compliance" },
      { label: "Create and manage Communication Compliance policies", url: "https://learn.microsoft.com/en-us/purview/communication-compliance-policies" },
      { label: "Configure a Communication Compliance policy to detect generative AI interactions", url: "https://learn.microsoft.com/en-us/purview/communication-compliance-copilot" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-57",
    topicId: "copilot-grundlagen",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein. (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Aus der Copilot-Prompt-Galerie können Sie einen gespeicherten Prompt bearbeiten", correct: "Ja" },
      { text: "Aus der Copilot-Prompt-Galerie können Sie einen gespeicherten Prompt mit einem Microsoft Teams-Team teilen", correct: "Ja" },
      { text: "Sie können einen freigegebenen Link für einen Prompt erstellen, der NICHT in der Copilot-Prompt-Galerie gespeichert wurde", correct: "Nein" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Ja", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Copilot-Prompts sind Anweisungen oder Fragen, mit denen man Copilot mitteilt, was man erreichen möchte — sie können aus bis zu vier Teilen bestehen: Ziel, Kontext, Erwartungen und Quelle. Das Speichern von Prompts in der Copilot-Prompt-Galerie ist eine ideale Möglichkeit, tägliche Aufgaben zu vereinfachen: Ein häufig genutzter Prompt lässt sich speichern und muss nicht jedes Mal neu eingegeben werden. Jeder gespeicherte Prompt lässt sich anklicken, um ihn anzusehen, zu bearbeiten oder auszuführen. Die Prompt-Galerie macht es außerdem einfach, Prompts mit einem Microsoft-Teams-Team in der Organisation zu teilen oder einen Prompt-Link direkt zu kopieren und weiterzugeben. Um jedoch einen freigegebenen Link für einen Prompt zu erstellen, muss der Prompt zuerst in der Copilot-Prompt-Galerie gespeichert werden — nur gespeicherte Prompts lassen sich teilen. Ist ein Prompt nicht gespeichert, kann dafür kein freigegebener Link erzeugt werden.",
    resources: [
      { label: "Understand Prompt Gallery in Copilot", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/copilot-prompt-gallery" },
      { label: "How to save prompts", url: "https://support.microsoft.com/en-us/topic/how-to-save-prompts-55373730-2627-46a5-b0d8-772abe22dba4" },
      { label: "Sharing prompts with a Team", url: "https://support.microsoft.com/en-us/topic/sharing-prompts-with-a-team-2fa7a228-8645-4dc4-beec-d75d6d0bc752" },
      { label: "Share your best prompts", url: "https://support.microsoft.com/en-us/topic/share-your-best-prompts-75402b14-b419-494d-9e58-1709b4f334a2" },
    ],
  },
  {
    id: "real-ab900-58",
    topicId: "sicherheit-identitaet",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Sie stellen fest, dass sich einige Benutzer nicht bei Microsoft 365 anmelden können. Sie müssen die fehlgeschlagenen Microsoft 365-Anmeldeversuche anzeigen. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Das Microsoft Defender-Portal" },
      { id: "B", text: "Das Microsoft Entra Admin Center" },
      { id: "C", text: "Das Microsoft Purview-Portal" },
      { id: "D", text: "Das Microsoft 365 Admin Center" },
    ],
    correct: "B",
    explanation: "Die Microsoft Entra-Anmeldeprotokolle helfen dabei, Fragen rund um die Verwaltung des Zugriffs auf Anwendungen der Organisation zu beantworten — etwa welches Anmeldemuster ein Benutzer zeigt, wie viele Benutzer sich innerhalb einer Woche angemeldet haben oder welchen Status diese Anmeldungen hatten. Zusätzlich helfen die Anmeldeprotokolle bei der Fehlerbehebung fehlgeschlagener Anmeldeversuche von Benutzern der Organisation. Um Anmeldedetails zu erfassen: mit mindestens der Rolle „Reports Reader“ im Microsoft Entra Admin Center anmelden, zu Entra ID > Überwachung & Integrität > Anmeldeprotokolle navigieren, die Ergebnisse mit Filtern eingrenzen (z. B. nach Benutzername, nach Anwendung, oder „Fehler“ im Status-Menü auswählen, um nur fehlgeschlagene Anmeldungen anzuzeigen) und den gewünschten fehlgeschlagenen Anmeldeversuch für Details wie Korrelations-ID, Anmeldefehlercode, Fehlerursache sowie Benutzername/Benutzer-ID auswählen. Das Microsoft Defender-Portal, das Microsoft Purview-Portal und das Microsoft 365 Admin Center bieten keine vergleichbar detaillierten Anmeldeprotokolle.",
    resources: [
      { label: "How to troubleshoot Microsoft Entra sign-in errors", url: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-troubleshoot-sign-in-errors" },
    ],
  },
  {
    id: "real-ab900-59",
    topicId: "verwaltung-governance",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement, das eine Microsoft SharePoint-Website namens Site1 enthält. Sie müssen verhindern, dass Benutzer die Inhalte von Site1 mit externen Benutzern teilen. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Die Inhalte von Site1" },
      { id: "B", text: "Das SharePoint-Admincenter" },
      { id: "C", text: "Das Microsoft 365-Admincenter" },
      { id: "D", text: "Das Microsoft Entra-Admincenter" },
    ],
    correct: "B",
    explanation: "Externe Freigabe in SharePoint und OneDrive ermöglicht es Benutzern, Inhalte mit Personen außerhalb der Organisation zu teilen, etwa Partnern, Lieferanten, Klienten oder Kunden — sie lässt sich auch nutzen, um zwischen lizenzierten Benutzern mehrerer Microsoft 365-Abonnements zu teilen. SharePoint bietet Einstellungen zur externen Freigabe sowohl auf Organisationsebene als auch auf Websiteebene (früher „Websitesammlungsebene“ genannt). Damit externe Freigabe auf einer Website überhaupt möglich ist, muss sie zunächst auf Organisationsebene erlaubt sein; für einzelne Websites lässt sie sich dann weiter einschränken. Stimmen die Freigabeoption einer Website und die Organisationsebene nicht überein, gilt stets der restriktivere Wert. Die Freigabeeinstellungen von OneDrive können denen von SharePoint entsprechen oder restriktiver sein. Sowohl SharePoint- als auch OneDrive-Freigabe lassen sich zentral über das SharePoint-Admincenter konfigurieren — das Microsoft 365-Admincenter und das Microsoft Entra-Admincenter bieten diese spezifischen Freigabeeinstellungen nicht.",
    resources: [
      { label: "Overview of external sharing in SharePoint and OneDrive in Microsoft 365", url: "https://learn.microsoft.com/en-us/sharepoint/turn-external-sharing-on-or-off" },
      { label: "Manage sharing settings for SharePoint and OneDrive in Microsoft 365", url: "https://learn.microsoft.com/en-us/sharepoint/manage-sharing-settings" },
    ],
  },
  {
    id: "real-ab900-60",
    topicId: "sicherheit-identitaet",
    prompt: "Um den Satz zu vervollständigen, wählen Sie im Antwortbereich die entsprechende Option aus.",
    blankFill: {
      template: "___ ist eine einheitliche Unternehmenssuite, die Erkennung, Prävention, Untersuchung und Reaktion über Endpunkte, Identitäten, E-Mail und Anwendungen koordiniert, um integrierten Schutz gegen ausgeklügelte Angriffe zu bieten.",
      choices: ["Microsoft Defender XDR", "Microsoft Entra Conditional Access", "Microsoft Entra ID Protection", "Microsoft Purview"],
    },
    options: [
      { id: "A", text: "Microsoft Defender XDR ist eine einheitliche Unternehmenssuite, die Erkennung, Prävention, Untersuchung und Reaktion über Endpunkte, Identitäten, E-Mail und Anwendungen koordiniert, um integrierten Schutz gegen ausgeklügelte Angriffe zu bieten." },
      { id: "B", text: "Microsoft Entra Conditional Access ist eine einheitliche Unternehmenssuite, die Erkennung, Prävention, Untersuchung und Reaktion über Endpunkte, Identitäten, E-Mail und Anwendungen koordiniert, um integrierten Schutz gegen ausgeklügelte Angriffe zu bieten." },
      { id: "C", text: "Microsoft Entra ID Protection ist eine einheitliche Unternehmenssuite, die Erkennung, Prävention, Untersuchung und Reaktion über Endpunkte, Identitäten, E-Mail und Anwendungen koordiniert, um integrierten Schutz gegen ausgeklügelte Angriffe zu bieten." },
      { id: "D", text: "Microsoft Purview ist eine einheitliche Unternehmenssuite, die Erkennung, Prävention, Untersuchung und Reaktion über Endpunkte, Identitäten, E-Mail und Anwendungen koordiniert, um integrierten Schutz gegen ausgeklügelte Angriffe zu bieten." },
    ],
    correct: "A",
    explanation: "Microsoft Defender XDR ist eine einheitliche Unternehmens-Verteidigungssuite für die Zeit vor und nach einem Sicherheitsvorfall, die Erkennung, Prävention, Untersuchung und Reaktion nativ über Endpunkte, Identitäten, E-Mail und Anwendungen koordiniert, um integrierten Schutz gegen ausgeklügelte Angriffe zu bieten. Defender XDR hilft Sicherheitsteams dabei, ihre Organisationen zu schützen und Bedrohungen zu erkennen, indem Informationen aus weiteren Microsoft-Sicherheitsprodukten genutzt werden — darunter Microsoft Defender for Endpoint, Microsoft Defender for Office 365, Microsoft Defender for Identity, Microsoft Defender for Cloud Apps, Microsoft Defender Vulnerability Management, Microsoft Defender for Cloud, Microsoft Entra ID Protection, Microsoft Data Loss Prevention, App Governance, Microsoft Purview Insider Risk Management und Microsoft Security Exposure Management. Mit der integrierten Defender-XDR-Lösung können Sicherheitsfachleute die Bedrohungssignale dieser Produkte zusammenführen und den vollen Umfang sowie die Auswirkung einer Bedrohung bestimmen — wie sie in die Umgebung gelangt ist, was sie betroffen hat und wie sie die Organisation derzeit beeinträchtigt. Defender XDR ergreift automatisch Maßnahmen, um den Angriff zu verhindern oder zu stoppen, und stellt betroffene Postfächer, Endpunkte und Benutzeridentitäten selbstständig wieder her. Microsoft Entra Conditional Access, Microsoft Entra ID Protection und Microsoft Purview sind dagegen jeweils spezialisierte Einzellösungen (Zugriffssteuerung, Identitätsrisiko bzw. Compliance), keine vereinheitlichte XDR-Verteidigungssuite.",
  },
  {
    id: "real-ab900-61",
    topicId: "sicherheit-identitaet",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Ein Benutzer namens Alex Wilber ist wie in der folgenden Abbildung gezeigt einer Administratorrolle zugewiesen. Verwenden Sie die Dropdown-Menüs, um die Antwort auszuwählen, die die Aussage basierend auf den im Diagramm dargestellten Informationen vervollständigt.",
    imageUrl: "/exam-images/ab900-q61.png",
    blankFill: {
      template: "Alex Wilber kann ___.",
      choices: ["alle Benutzer im Microsoft Entra-Mandanten anzeigen", "alle Inhalte auf Microsoft SharePoint-Websites anzeigen", "alle Inhalte in Microsoft Exchange-Postfächern lesen", "eDiscovery von Microsoft 365 Copilot-Eingabeaufforderungen durchführen"],
    },
    options: [
      { id: "A", text: "Alex Wilber kann alle Benutzer im Microsoft Entra-Mandanten anzeigen." },
      { id: "B", text: "Alex Wilber kann alle Inhalte auf Microsoft SharePoint-Websites anzeigen." },
      { id: "C", text: "Alex Wilber kann alle Inhalte in Microsoft Exchange-Postfächern lesen." },
      { id: "D", text: "Alex Wilber kann eDiscovery von Microsoft 365 Copilot-Eingabeaufforderungen durchführen." },
    ],
    correct: "A",
    explanation: "In Microsoft Entra ID wird einer Person, die Microsoft-Entra-Ressourcen verwalten muss (Administrator oder Nicht-Administrator), eine Microsoft-Entra-Rolle mit den benötigten Berechtigungen zugewiesen — etwa zum Hinzufügen oder Ändern von Benutzern, Zurücksetzen von Kennwörtern, Verwalten von Lizenzen oder Domänennamen. Die Rolle „Global Reader“ ist eine privilegierte Rolle: Benutzer in dieser Rolle können Einstellungen und administrative Informationen (keine Benutzerinhalte) über Microsoft-365-Dienste hinweg lesen, aber keine Verwaltungsmaßnahmen durchführen. Global Reader ist damit das reine Lese-Gegenstück zu Global Administrator und wird stattdessen für Planung, Audits oder Untersuchungen zugewiesen — oft in Kombination mit weiteren eingeschränkten Admin-Rollen wie Exchange Administrator, um Aufgaben zu erledigen, ohne die Rolle Global Administrator vergeben zu müssen. Global Reader funktioniert mit dem Microsoft 365 Admin Center, dem Exchange Admin Center, dem SharePoint Admin Center, dem Teams Admin Center, dem Microsoft Defender-Portal, dem Microsoft Purview-Portal, dem Azure-Portal und dem Device-Management-Admin-Center — Alex Wilber kann also alle Benutzer im Microsoft-Entra-Mandanten (lesend) anzeigen, jedoch keine Inhalte in SharePoint oder Exchange lesen oder eDiscovery durchführen, da Global Reader ausdrücklich keinen Zugriff auf Benutzerinhalte gewährt.",
  },
  {
    type: "yesno",
    id: "real-ab900-62",
    topicId: "sicherheit-identitaet",
    prompt: "Wählen Sie für jede der folgenden Aussagen \"Ja\", wenn die Aussage zutrifft. Andernfalls wählen Sie \"Nein\". (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Sie können eine Microsoft Entra-Sicherheitsgruppe verwenden, um Berechtigungen für Microsoft Entra ID-Ressourcen zuzuweisen", correct: "Ja" },
      { text: "Sie können eine Microsoft Entra-Sicherheitsgruppe verwenden, um Microsoft 365-Lizenzen zuzuweisen", correct: "Ja" },
      { text: "Sie können eine Microsoft Entra-Sicherheitsgruppe verwenden, um Berechtigungen für Microsoft Exchange-Postfächer zuzuweisen", correct: "Ja" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Microsoft Entra ID bietet mehrere Möglichkeiten, den Zugriff auf Ressourcen, Anwendungen und Aufgaben zu verwalten. Mit Microsoft-Entra-Gruppen lässt sich Zugriff und Berechtigungen einer ganzen Gruppe von Benutzern statt jedem einzelnen Benutzer gewähren — den Zugriff auf Microsoft-Entra-Ressourcen auf genau die Benutzer zu beschränken, die ihn benötigen, ist eines der Kernprinzipien von Zero Trust. Microsoft Entra ID bietet außerdem gruppenbasierte Lizenzierung, mit der einer Gruppe eine oder mehrere Produktlizenzen zugewiesen werden können; Microsoft Entra ID stellt sicher, dass alle Gruppenmitglieder diese Lizenzen erhalten, neue Mitglieder automatisch lizenziert werden und beim Austritt die Lizenzen wieder entzogen werden. Freigegebene Postfächer erlauben es einer Gruppe von Personen, von einem gemeinsamen Konto aus E-Mails zu überwachen und zu senden (z. B. info@contoso.com); dafür lässt sich beispielsweise ein freigegebenes Postfach für die Vertriebsabteilung erstellen und der Sicherheitsgruppe „MarketingSG“ die Berechtigungen „Vollzugriff“ und „Senden im Auftrag von“ erteilen — Mitglieder dieser Sicherheitsgruppe erhalten dadurch automatisch die entsprechenden Postfachberechtigungen. Eine Microsoft-Entra-Sicherheitsgruppe lässt sich also für alle drei Zwecke nutzen: Berechtigungen für Entra-ID-Ressourcen, Lizenzzuweisung und Berechtigungen für Exchange-Postfächer.",
    resources: [
      { label: "Learn about group types, membership types, and access management", url: "https://learn.microsoft.com/en-us/entra/fundamentals/concept-learn-about-groups" },
      { label: "What is group-based licensing in Microsoft Entra ID?", url: "https://learn.microsoft.com/en-us/entra/fundamentals/concept-group-based-licensing" },
      { label: "Shared mailboxes in Exchange Online", url: "https://learn.microsoft.com/en-us/exchange/collaboration-exo/shared-mailboxes" },
    ],
  },
  {
    id: "real-ab900-63",
    topicId: "sicherheit-identitaet",
    prompt: "Welche Aussage beschreibt die Autorisierung in Microsoft 365 genau?",
    options: [
      { id: "A", text: "Ein Prozess zur Überprüfung, ob eine Identität tatsächlich diejenige ist, die sie vorgibt zu sein" },
      { id: "B", text: "Ein Prozess, der zusätzliche Authentifizierungsmethoden verlangt, bevor eine Identität auf Ressourcen zugreifen kann" },
      { id: "C", text: "Ein Prozess zur Überprüfung, ob einer Identität der Zugriff auf eine Ressource erlaubt ist" },
      { id: "D", text: "Ein Prozess zur Validierung einer Identität aus einem externen System" },
    ],
    correct: "C",
    explanation: "Autorisierung bedeutet, einer bereits authentifizierten Partei die Erlaubnis zu erteilen, etwas Bestimmtes zu tun — sie legt fest, auf welche Daten zugegriffen werden darf und was mit diesen Daten getan werden kann. Autorisierung wird manchmal mit „AuthZ“ abgekürzt. Die Microsoft-Identitätsplattform stellt Ressourcenbesitzern das OAuth-2.0-Protokoll zur Handhabung der Autorisierung zur Verfügung; die Microsoft-Cloud bietet darüber hinaus weitere Autorisierungssysteme wie integrierte Microsoft-Entra-Rollen, Azure RBAC und Exchange RBAC. Die Überprüfung, ob eine Identität tatsächlich diejenige ist, die sie vorgibt zu sein, ist dagegen die Authentifizierung (nicht Autorisierung); zusätzliche Authentifizierungsmethoden beschreiben Multi-Faktor-Authentifizierung, und die Validierung einer Identität aus einem externen System betrifft Föderation — keines davon ist die korrekte Definition von Autorisierung.",
    resources: [
      { label: "Authentication vs. authorization", url: "https://learn.microsoft.com/en-us/entra/identity-platform/authentication-vs-authorization" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-64",
    topicId: "verwaltung-governance",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein. (HINWEIS: Jede korrekte Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Ein Mitglied einer Microsoft SharePoint-Website kann Benutzer einladen, auf die Inhalte der Website zuzugreifen", correct: "Ja" },
      { text: "Ein Websitebesitzer einer Microsoft SharePoint-Website kann Microsoft 365- Gruppen als Mitglieder der Website hinzufügen", correct: "Ja" },
      { text: "Ein Websitebesitzer einer Microsoft SharePoint-Website kann einen anderen Websitebesitzer von der Website entfernen", correct: "Ja" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Mitglieder einer Website können Benutzer einladen; die Einladung löst dabei je nach Mandanten- und Website-Einstellungen typischerweise eine Zugriffsanfrage aus, die von einem Websitebesitzer genehmigt werden muss. Websitebesitzer können Benutzer, Microsoft-365-Gruppen oder Sicherheitsgruppen als Mitglieder der Website hinzufügen und ihnen Berechtigungsstufen zuweisen. Websitebesitzer mit voller Kontrolle können außerdem andere Besitzer, Mitglieder oder Besucher der Website hinzufügen oder entfernen — ein Websitebesitzer kann also durchaus einen anderen Websitebesitzer von der Website entfernen.",
    resources: [
      { label: "Understand groups and permissions on a SharePoint site", url: "https://learn.microsoft.com/en-us/sharepoint/site-permissions" },
      { label: "Share a site", url: "https://support.microsoft.com/en-us/office/share-a-site-958771a8-d041-4eb8-b51c-afea2eae3658" },
      { label: "Overview: Site governance, permission, and sharing for site owners", url: "https://support.microsoft.com/en-us/office/overview-site-governance-permission-and-sharing-for-site-owners-c631723c-2ec8-4be8-a11b-a5e64ea2b52c" },
    ],
  },
  {
    id: "real-ab900-65",
    topicId: "verwaltung-governance",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Welche zwei Aufgaben können Sie mithilfe des Exchange-Verwaltungscenters ausführen? (Jede richtige Antwort bildet einen Teil der Lösung. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    options: [
      { id: "A", text: "Zuweisen einer Microsoft Exchange-Lizenz." },
      { id: "B", text: "Erstellen einer Mailflussregel." },
      { id: "C", text: "Erstellen eines freigegebenen Postfachs." },
      { id: "D", text: "Hinzufügen einer benutzerdefinierten Domain." },
    ],
    correct: ["B", "C"],
    explanation: "Mailflussregeln ähneln den Posteingangsregeln, die in Outlook und Outlook im Web verfügbar sind — der Hauptunterschied ist, dass Mailflussregeln auf Nachrichten wirken, während diese sich noch im Transit befinden, und nicht erst nachdem die Nachricht im Postfach zugestellt wurde. Mailflussregeln bieten einen umfangreicheren Satz an Bedingungen, Ausnahmen und Aktionen, was die Flexibilität ermöglicht, viele Arten von Nachrichtenrichtlinien umzusetzen; sie lassen sich im Exchange-Verwaltungscenter (EAC) oder in PowerShell erstellen. Ein freigegebenes Postfach ist ein Postfach, das mehrere Benutzer zum Lesen und Senden von E-Mails nutzen können — es lässt sich zudem für einen gemeinsamen Kalender verwenden, sodass mehrere Benutzer Urlaubszeiten oder Schichten einsehen und planen können. Auch freigegebene Postfächer lassen sich im Exchange-Verwaltungscenter oder in PowerShell erstellen. Die Zuweisung einer Exchange-Lizenz erfolgt über das Microsoft 365 Admin Center (Lizenzverwaltung), und das Hinzufügen einer benutzerdefinierten Domain erfolgt ebenfalls über das Microsoft 365 Admin Center — beides gehört nicht zu den Aufgaben des Exchange-Verwaltungscenters.",
    resources: [
      { label: "Mail flow rules (transport rules) in Exchange Online", url: "https://learn.microsoft.com/en-us/exchange/security-and-compliance/mail-flow-rules/mail-flow-rules" },
      { label: "Manage mail flow rules in Exchange Online", url: "https://learn.microsoft.com/en-us/exchange/security-and-compliance/mail-flow-rules/manage-mail-flow-rules" },
      { label: "Shared mailboxes in Exchange Server", url: "https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/shared-mailboxes" },
      { label: "Create shared mailboxes in the Exchange admin center", url: "https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes" },
    ],
  },
  {
    id: "real-ab900-66",
    topicId: "sicherheit-identitaet",
    prompt: "Um den Satz zu vervollständigen, wählen Sie im Antwortbereich die entsprechende Option aus.",
    blankFill: {
      template: "In Microsoft Entra Privileged Identity Management (PIM) hat ein Administrator Sie für die Rolle des Benutzeradministrators berechtigt. Bevor Sie ein Benutzerkonto erstellen können, müssen Sie ___.",
      choices: ["die Rolle aktivieren", "die Microsoft Authenticator-App installieren", "eine Lizenz anfordern", "Ihre Standortinformationen aktualisieren"],
    },
    options: [
      { id: "A", text: "In Microsoft Entra Privileged Identity Management (PIM) hat ein Administrator Sie für die Rolle des Benutzeradministrators berechtigt. Bevor Sie ein Benutzerkonto erstellen können, müssen Sie die Rolle aktivieren." },
      { id: "B", text: "In Microsoft Entra Privileged Identity Management (PIM) hat ein Administrator Sie für die Rolle des Benutzeradministrators berechtigt. Bevor Sie ein Benutzerkonto erstellen können, müssen Sie die Microsoft Authenticator-App installieren." },
      { id: "C", text: "In Microsoft Entra Privileged Identity Management (PIM) hat ein Administrator Sie für die Rolle des Benutzeradministrators berechtigt. Bevor Sie ein Benutzerkonto erstellen können, müssen Sie eine Lizenz anfordern." },
      { id: "D", text: "In Microsoft Entra Privileged Identity Management (PIM) hat ein Administrator Sie für die Rolle des Benutzeradministrators berechtigt. Bevor Sie ein Benutzerkonto erstellen können, müssen Sie Ihre Standortinformationen aktualisieren." },
    ],
    correct: "A",
    explanation: "Microsoft Entra Privileged Identity Management (PIM) vereinfacht die Verwaltung des privilegierten Zugriffs auf Ressourcen in Microsoft Entra ID und anderen Microsoft-Onlinediensten wie Microsoft 365 oder Microsoft Intune. Wurde eine Person für eine administrative Rolle berechtigt („eligible“), muss sie die Rollenzuweisung aktivieren, sobald privilegierte Aktionen ausgeführt werden müssen. Wer beispielsweise nur gelegentlich Microsoft-365-Funktionen verwaltet, wird von den Privileged Role Administrators der Organisation oft nicht dauerhaft zum Global Administrator gemacht, da diese Rolle auch andere Dienste betrifft — stattdessen wird die Person für Microsoft-Entra-Rollen wie Exchange Online Administrator berechtigt. Die Aktivierung dieser Rolle kann bei Bedarf angefordert werden, wodurch für einen festgelegten Zeitraum administrative Kontrolle gewährt wird. Das Installieren der Authenticator-App, das Anfordern einer Lizenz oder das Aktualisieren von Standortinformationen sind keine Voraussetzungen für die Nutzung einer berechtigten PIM-Rolle.",
    resources: [
      { label: "Activate a Microsoft Entra role in PIM", url: "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-activate-role" },
    ],
  },
  {
    id: "real-ab900-67",
    topicId: "sicherheit-identitaet",
    prompt: "Sie öffnen das Microsoft Entra Admin Center wie in der folgenden Abbildung gezeigt. Verwenden Sie die Dropdown-Menüs, um die Antwort auszuwählen, die die Aussage basierend auf den im Diagramm dargestellten Informationen vervollständigt.",
    imageUrl: "/exam-images/ab900-q67.png",
    blankFill: {
      template: "Das Beheben der Empfehlung ___ wird den Identity Secure Score am meisten verbessern.",
      choices: ["'Passwörter nicht ablaufen lassen'", "'Verwenden von Administrationsrollen mit minimalen Rechten'", "'Richtlinie zur Blockierung von veralteter Authentifizierung aktivieren'", "'Multifaktor-Authentifizierung für Verwaltungsrollen erforderlich machen'"],
    },
    options: [
      { id: "A", text: "Das Beheben der Empfehlung 'Passwörter nicht ablaufen lassen' wird den Identity Secure Score am meisten verbessern." },
      { id: "B", text: "Das Beheben der Empfehlung 'Verwenden von Administrationsrollen mit minimalen Rechten' wird den Identity Secure Score am meisten verbessern." },
      { id: "C", text: "Das Beheben der Empfehlung 'Richtlinie zur Blockierung von veralteter Authentifizierung aktivieren' wird den Identity Secure Score am meisten verbessern." },
      { id: "D", text: "Das Beheben der Empfehlung 'Multifaktor-Authentifizierung für Verwaltungsrollen erforderlich machen' wird den Identity Secure Score am meisten verbessern." },
    ],
    correct: "D",
    explanation: "Die Identity Secure Score wird als Prozentsatz angezeigt und dient als Indikator dafür, wie gut die eigene Konfiguration mit den Sicherheitsempfehlungen von Microsoft übereinstimmt. Jede Verbesserungsmaßnahme ist individuell auf die jeweilige Konfiguration zugeschnitten; der Wert hilft dabei, die Identitätssicherheitslage objektiv zu messen, Verbesserungen zu planen und deren Erfolg zu überprüfen. Alle 24 Stunden wird die Sicherheitskonfiguration mit den empfohlenen Best Practices verglichen und daraus ein neuer Score berechnet — ist eine Empfehlung nur teilweise umgesetzt, wird ein entsprechender Teil der maximal möglichen Punktzahl für diese Maßnahme vergeben. Laut der abgebildeten Tabelle hat „Passwörter nicht ablaufen lassen“ bereits volle 8/8 Punkte erreicht, „Verwenden von Administrationsrollen mit minimalen Rechten“ bereits 1/1 und „Richtlinie zur Blockierung von veralteter Authentifizierung aktivieren“ bereits 0,73/8 Punkte — bei diesen dreien ist also nur noch wenig oder gar kein zusätzlicher Punktegewinn möglich. Die Empfehlung „Multifaktor-Authentifizierung für Verwaltungsrollen erforderlich machen“ steht dagegen bei 0/10 Punkten und bietet damit das größte ungenutzte Verbesserungspotenzial (10 Punkte) — ihre Umsetzung verbessert den Identity Secure Score am meisten.",
    resources: [
      { label: "What is Identity Secure Score?", url: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score" },
      { label: "What are Microsoft Entra recommendations?", url: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/overview-recommendations" },
    ],
  },
  {
    id: "real-ab900-68",
    topicId: "sicherheit-identitaet",
    prompt: "Womit können Sie ein Benutzerkonto automatisch sperren, wenn eine riskante Anmeldung erkannt wird?",
    options: [
      { id: "A", text: "Microsoft Defender für Identity" },
      { id: "B", text: "Microsoft Entra ID-Schutz" },
      { id: "C", text: "Microsoft Defender für Office 365" },
      { id: "D", text: "Microsoft Entra Privileged Identity Management (PIM)" },
    ],
    correct: "B",
    explanation: "Microsoft sammelt und analysiert täglich Billionen anonymisierter Signale aus Anmeldeversuchen. Diese Signale helfen dabei, Muster für normales Anmeldeverhalten zu erkennen und potenziell riskante Anmeldeversuche zu identifizieren. Microsoft Entra ID Protection überprüft Anmeldeversuche und kann bei verdächtigem Verhalten zusätzliche Maßnahmen auslösen — etwa bei Benutzern mit kompromittierten Zugangsdaten, Anmeldungen von anonymen IP-Adressen, unmöglichen Reisen zu untypischen Standorten, Anmeldungen von infizierten Geräten, Anmeldungen von IP-Adressen mit verdächtiger Aktivität oder Anmeldungen von unbekannten Standorten. Zum Schutz der Benutzer lassen sich risikobasierte Conditional-Access-Richtlinien in Microsoft Entra konfigurieren, die automatisch auf riskantes Verhalten reagieren — sie können einen Anmeldeversuch automatisch blockieren oder zusätzliche Maßnahmen verlangen, etwa eine sichere Kennwortänderung oder Multi-Faktor-Authentifizierung. Microsoft Defender for Identity erkennt identitätsbasierte Angriffe in lokalen Umgebungen, Microsoft Defender for Office 365 schützt vor E-Mail-Bedrohungen, und PIM verwaltet privilegierten Zugriff — keines davon blockiert automatisch Konten bei riskanten Anmeldungen.",
    resources: [
      { label: "Tutorial: Use risk detections for user sign-ins to trigger Microsoft Entra multifactor authentication or password changes", url: "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-risk-based-sspr-mfa" },
    ],
  },
  {
    id: "real-ab900-69",
    topicId: "sicherheit-identitaet",
    prompt: "Sie überprüfen die Sicherheitsrichtlinien Ihres Unternehmens im Rahmen einer Zero-Trust-Strategie. Welche Aussage beschreibt die Zero-Trust-Prinzipien genau?",
    options: [
      { id: "A", text: "Zero Trust verbessert die Benutzererfahrung, indem Authentifizierungsaufforderungen minimiert werden." },
      { id: "B", text: "Zero Trust geht von einem Sicherheitsvorfall aus und überprüft jede Anforderung." },
      { id: "C", text: "Zero Trust behandelt alle Anfragen aus Ihrem Firmennetzwerk als vertrauenswürdig." },
      { id: "D", text: "Zero Trust entfernt die Notwendigkeit, Zugriffsberechtigungen regelmäßig zu überprüfen und anzupassen." },
    ],
    correct: "B",
    explanation: "Zero Trust ist eine Sicherheitsstrategie – kein Produkt und kein Dienst, sondern ein Ansatz zur Gestaltung und Umsetzung der drei Sicherheitsprinzipien in der Tabelle unten. Diese Prinzipien bilden den Kern von Zero Trust. Statt davon auszugehen, dass alles hinter der Unternehmensfirewall sicher ist, geht das Zero-Trust-Modell von einem Sicherheitsvorfall aus und überprüft jede Anfrage so, als käme sie aus einem nicht kontrollierten Netzwerk. Unabhängig davon, woher eine Anfrage stammt oder auf welche Ressource sie zugreift, gilt beim Zero-Trust-Modell: „Never trust, always verify\" (Vertraue nie, überprüfe immer).",
    explanationImageUrl: "/exam-images/ab900-q69-explain.png",
    resources: [
      { label: "What is Zero Trust?", url: "https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview" },
    ],
  },
  {
    id: "real-ab900-70",
    topicId: "purview-compliance",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Sie müssen einen Bericht erstellen, der die Berechtigungen und aktiven Freigabelinks von Inhalten zeigt, die in Microsoft OneDrive-Konten gespeichert sind. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Überwachung im Microsoft Defender-Portal" },
      { id: "B", text: "Berichte im Microsoft 365 Admin Center" },
      { id: "C", text: "Datenzugriffsverwaltung im SharePoint Admin Center" },
      { id: "D", text: "eDiscovery im Microsoft Purview-Portal" },
    ],
    correct: "C",
    explanation: "Da Sprawl und übermäßige Freigabe von SharePoint-Websites mit dem exponentiellen Datenwachstum zunehmen, benötigen Organisationen Unterstützung bei der Verwaltung ihrer Daten. Berichte zur Datenzugriffsverwaltung (Data Access Governance) helfen, den Zugriff auf SharePoint-Daten zu steuern. Die Berichte ermöglichen es, Websites zu entdecken, die potenziell übermäßig freigegebene oder vertrauliche Inhalte enthalten. Anhand dieser Berichte können Sie die passenden Sicherheits- und Compliance-Richtlinien bewerten und anwenden. Momentaufnahmeberichte (Snapshot Reports) zeigen den aktuellen Status Ihrer Organisation basierend auf bestimmten Berichtskriterien zum Zeitpunkt der Erstellung. Derzeit gibt es drei Arten von Momentaufnahmeberichten: Bericht zu Websiteberechtigungen – bietet eine umfassende Momentaufnahme der Berechtigungsstruktur aller SharePoint- und OneDrive-Websites und hilft, Websites mit dem breitesten Benutzerzugriff zu identifizieren (z. B. Websites mit Tausenden von Benutzern, externen Gästen oder der Berechtigung „Jeder außer externen Benutzern\"). Bericht zu Websiteberechtigungen für Benutzer – listet alle Websites auf, auf die ein bestimmter Benutzer zugreifen kann, und zeigt, ob der Zugriff auf die gesamte Website oder nur bestimmte Bereiche besteht, direkt zugewiesen oder indirekt über Gruppen. Bericht zu Vertraulichkeitsbezeichnungen für Dateien – identifiziert SharePoint-Websites mit Dateien, denen bestimmte Vertraulichkeitsbezeichnungen zugewiesen sind, damit überprüft werden kann, ob für die sensibelsten Inhalte die passenden Sicherheitsrichtlinien gelten.",
    resources: [
      { label: "Data access governance reports for SharePoint and OneDrive sites", url: "https://learn.microsoft.com/en-us/sharepoint/data-access-governance-reports" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-71",
    topicId: "copilot-grundlagen",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein. (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Eingabeaufforderungen und Antworten, die von Benutzern in Microsoft 365 Copilot ausgegeben werden, werden von Microsoft zum Trainieren von Modellen verwendet", correct: "Nein" },
      { text: "Von Microsoft Graph abgerufene Inhalte werden von Microsoft zum Trainieren von Modellen verwendet", correct: "Nein" },
      { text: "Microsoft 365 Copilot respektiert die Sicherheitsberechtigungen in Ihrem Microsoft 365-Abonnement", correct: "Ja" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Kundeneingaben, -antworten und -daten werden NICHT zum Trainieren der Foundation-Modelle verwendet. Microsoft 365 Copilot arbeitet unter dem Enterprise Data Protection (EDP)-Standard, und Kundendaten verbleiben innerhalb der Microsoft-365-Dienstgrenze.\n\nInhalte, auf die über Microsoft Graph zugegriffen wird, werden ausschließlich zur Laufzeit genutzt, um Antworten zu fundieren und kontextbezogene Ergebnisse zu erzeugen. Microsoft stellt ausdrücklich klar, dass diese Daten nicht zum Trainieren von Modellen verwendet werden.\n\nMicrosoft 365 Copilot respektiert die bestehenden Sicherheits- und Datenschutzkontrollen Ihrer Organisation. Copilot greift ausschließlich auf Daten zu, für die der jeweilige Benutzer bereits berechtigt ist, und hält sich dabei an die Compliance-, Datenschutz- und Datenresidenz-Zusagen von Microsoft 365.",
    resources: [
      { label: "Security for Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/security-microsoft-365-copilot" },
      { label: "Microsoft 365 Copilot architecture and how it works", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture" },
    ],
  },
  {
    id: "real-ab900-72",
    topicId: "copilot-agenten",
    prompt: "Ihr Unternehmen verwendet die Abrechnung nach Verbrauch (Pay-as-you-go) für Microsoft 365 Copilot. Das Unternehmen möchte eine bessere Übersicht über die Copilot-Nutzungskosten und die Möglichkeit, die Ausgaben der Abteilungen vorherzusagen. Sie müssen sicherstellen, dass Sie die Copilot-Kosten nach Abteilung einsehen können. Was sollten Sie verwenden? (Um zu antworten, wählen Sie die entsprechenden Optionen im Antwortbereich aus. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    blankFillMulti: {
      template: "Portal: ___; Funktion: ___.",
      blanks: [
        ["Das Microsoft 365 Admin Center", "Das Microsoft Entra Admin Center", "Das Microsoft Purview-Portal"],
        ["Eine Auto-Claim-Richtlinie", "Eine Abrechnungsrichtlinie", "Ein Copilot-Connector"],
      ],
      combos: [
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [2, 2],
        [2, 0],
      ],
    },
    options: [
      { id: "A", text: "Portal: Das Microsoft 365 Admin Center Funktion: Eine Abrechnungsrichtlinie" },
      { id: "B", text: "Portal: Das Microsoft 365 Admin Center Funktion: Ein Copilot-Connector" },
      { id: "C", text: "Portal: Das Microsoft Entra Admin Center Funktion: Eine Auto-Claim-Richtlinie" },
      { id: "D", text: "Portal: Das Microsoft Entra Admin Center Funktion: Eine Abrechnungsrichtlinie" },
      { id: "E", text: "Portal: Das Microsoft Purview-Portal Funktion: Ein Copilot-Connector" },
      { id: "F", text: "Portal: Das Microsoft Purview-Portal Funktion: Eine Auto-Claim-Richtlinie" },
    ],
    correct: "A",
    explanation: "Der Microsoft 365 Copilot Pay-as-you-go-Plan bietet Organisationen einen flexiblen und kosteneffizienten Weg, um auf Copilot-Dienste zuzugreifen. Dieser Plan ermöglicht es Administratoren, für bestimmte Copilot-Szenarien eine nutzungsbasierte Abrechnung zu aktivieren, sodass Benutzer Copilot-Funktionen nutzen können, ohne sich auf eine vollständige Lizenz festzulegen.\n\nDie Nutzung des Pay-as-you-go-Dienstes durch die Organisation lässt sich im Microsoft 365 Admin Center auf der Seite „Kostenverwaltung“ für jeden verwendeten Microsoft 365 Pay-as-you-go-Dienst überwachen. Die Abrechnungsrichtlinie fungiert als eigenständige Abrechnungskennung, die einer für die entstandenen Kosten verantwortlichen Gruppe zugeordnet werden kann. Die wichtigsten Ziele einer Pay-as-you-go-Abrechnungsrichtlinie sind:\n\n– Abrechnungsverantwortung auf Abteilungen zu verteilen\n– Die Wiederverwendung von Abrechnungskonfigurationen über verschiedene Pay-as-you-go-Szenarien hinweg zu erleichtern\n– Administratoren die Durchsetzung von Governance zu ermöglichen\n– Benutzer mit einer Richtlinie zu verknüpfen und so Abrechnungsregeln für eine Benutzergruppe festzulegen\n\nAls Administrator können Sie einer Abrechnungsrichtlinie ein Budgetlimit hinzufügen und das Budget so konfigurieren, dass beim Erreichen bestimmter Prozent-Meilensteine E-Mail-Benachrichtigungen versendet werden.",
    resources: [
      { label: "Microsoft 365 Copilot pay-as-you-go overview for IT admins", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/pay-as-you-go/overview" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-73",
    topicId: "copilot-agenten",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein. (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Benutzer, denen eine Microsoft 365 E5-Lizenz zugewiesen ist, können auf dem Web basierende Microsoft 365 Copilot-Agenten erstellen", correct: "Nein" },
      { text: "Benutzer müssen eine Microsoft 365 Copilot-Lizenz zugewiesen bekommen, um den Analyst-Agenten zu verwenden", correct: "Ja" },
      { text: "Benutzer können eine natürliche Sprachaufforderung verwenden, um einen Microsoft 365 Copilot-Agenten zu erstellen", correct: "Ja" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Nein", "Ja", "Nein"], ["Nein", "Ja", "Ja"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Eine Microsoft 365 E5-Lizenz allein enthält kein Microsoft 365 Copilot. Web-fundierte Agenten stehen über Copilot Chat zur Verfügung, während das Erstellen und Verwalten von Copilot-Agenten Copilot-Funktionen voraussetzt – für erweiterte oder auf den Mandanten fundierte Agenten zusätzlich eine eigene Konfiguration und Abrechnung. Eine E5-Lizenz allein gewährt keine Berechtigung zum Erstellen von Copilot-Agenten.\n\nMicrosoft gibt an, dass die Agenten Analyst und Researcher ausschließlich Benutzern mit einer Microsoft 365 Copilot-Lizenz zur Verfügung stehen. Diese Agenten sind Teil des erweiterten Copilot-Erlebnisses und in Standard-Microsoft-365-Lizenzen wie E3 oder E5 allein nicht enthalten.\n\nDie Funktion Agent Builder in Microsoft 365 Copilot bietet eine einfache Oberfläche, mit der sich deklarative Agenten mithilfe natürlicher Sprache schnell erstellen lassen.",
    resources: [
      { label: "Compare Microsoft 365 Copilot licensing models", url: "https://learn.microsoft.com/en-us/training/modules/explore-microsoft-365-copilot-agents/5-compare-microsoft-365-copilot-licensing-models" },
      { label: "Introducing Researcher and Analyst in Microsoft 365 Copilot", url: "https://www.microsoft.com/en-us/microsoft-365/blog/2025/03/25/introducing-researcher-and-analyst-in-microsoft-365-copilot" },
      { label: "Build agents by using Agent Builder in Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agent-builder-build-agents" },
    ],
  },
  {
    id: "real-ab900-74",
    topicId: "purview-compliance",
    prompt: "Wählen Sie die Antwort aus, die den Satz korrekt vervollständigt.",
    blankFill: {
      template: "Sie können die ___ Microsoft Purview-Lösung verwenden, um alle Inhalte zu finden, die sich auf den Begriff \"Project Falcon\" in den E-Mails beziehen, die zwischen zwei Benutzern ausgetauscht wurden.",
      choices: ["Audit", "Data Catalog", "eDiscovery", "Insider Risk Management"],
    },
    options: [
      { id: "A", text: "Sie können die Audit Microsoft Purview-Lösung verwenden, um alle Inhalte zu finden, die sich auf den Begriff \"Project Falcon\" in den E-Mails beziehen, die zwischen zwei Benutzern ausgetauscht wurden." },
      { id: "B", text: "Sie können die Data Catalog Microsoft Purview-Lösung verwenden, um alle Inhalte zu finden, die sich auf den Begriff \"Project Falcon\" in den E-Mails beziehen, die zwischen zwei Benutzern ausgetauscht wurden." },
      { id: "C", text: "Sie können die eDiscovery Microsoft Purview-Lösung verwenden, um alle Inhalte zu finden, die sich auf den Begriff \"Project Falcon\" in den E-Mails beziehen, die zwischen zwei Benutzern ausgetauscht wurden." },
      { id: "D", text: "Sie können die Insider Risk Management Microsoft Purview-Lösung verwenden, um alle Inhalte zu finden, die sich auf den Begriff \"Project Falcon\" in den E-Mails beziehen, die zwischen zwei Benutzern ausgetauscht wurden." },
    ],
    correct: "C",
    explanation: "Electronic Discovery (eDiscovery) ist der Prozess, elektronisch gespeicherte Informationen (ESI) zu identifizieren und bereitzustellen, die als Beweismittel in Untersuchungen und Rechtsfällen dienen können. Mit Microsoft Purview eDiscovery lassen sich Inhalte in Microsoft-365-Diensten identifizieren, überprüfen und verwalten, um Untersuchungen zu unterstützen. Unterstützte Microsoft-365-Dienste sind:\n\n– Exchange Online\n– Microsoft Teams\n– Microsoft 365-Gruppen\n– OneDrive\n– SharePoint\n– Viva Engage\n\nPostfächer und Websites lassen sich in derselben eDiscovery-Suche durchsuchen, die Suchergebnisse anschließend exportieren. Mit eDiscovery-Fällen werden Inhalte in Postfächern und Websites identifiziert, in Bereitschaft gesetzt (Hold) und exportiert. Verfügt Ihre Organisation über ein Office 365 E5- oder Microsoft 365 E5-Abonnement (oder entsprechende E5-Zusatzlizenzen), lassen sich Fälle zusätzlich mit erweiterten eDiscovery-Funktionen verwalten und Inhalte analysieren.",
    resources: [
      { label: "Learn about eDiscovery", url: "https://learn.microsoft.com/en-us/purview/edisc" },
    ],
  },
  {
    id: "real-ab900-75",
    topicId: "purview-compliance",
    prompt: "Ihr Unternehmen verwendet Microsoft Purview Data Loss Prevention (DLP)-Richtlinien. Ein Benutzer namens User1 teilt sensible Informationen mit einem externen Benutzer über Microsoft Teams. Sie müssen die geteilten sensiblen Inhalte identifizieren. Was sollten Sie im Microsoft Purview-Portal verwenden?",
    options: [
      { id: "A", text: "Diagnosen" },
      { id: "B", text: "Daten-Explorer" },
      { id: "C", text: "Inhalts-Explorer" },
      { id: "D", text: "Aktivitäts-Explorer" },
    ],
    correct: "D",
    explanation: "In Microsoft Purview setzen Sie Data Loss Prevention um, indem Sie DLP-Richtlinien definieren und anwenden. Eine DLP-Richtlinie hilft Ihnen, sensible Daten in Unternehmensanwendungen und -geräten sowie im eingehenden Web-Datenverkehr zu identifizieren, zu überwachen und automatisch zu schützen. DLP-Richtlinien wirken auf verschiedene Speicherorte, Übertragungsarten und Benutzeraktivitäten.\n\nDLP-Richtlinien überwachen die Aktivitäten, die Benutzer mit sensiblen Elementen durchführen, und ergreifen bei Erfüllung der Richtlinienbedingungen Schutzmaßnahmen. Versucht ein Benutzer beispielsweise eine untersagte Aktion – etwa das Kopieren eines sensiblen Elements an einen nicht genehmigten Ort oder das Teilen medizinischer Informationen per E-Mail –, kann DLP:\n\n– einen Pop-up-Richtlinientipp anzeigen, der den Benutzer warnt, dass er versucht, ein sensibles Element unangemessen zu teilen\n– das Teilen blockieren und dem Benutzer über einen Richtlinientipp erlauben, die Blockierung zu überschreiben, wobei die Begründung des Benutzers erfasst wird\n– das Teilen ohne Überschreibungsoption blockieren\n– bei ruhenden Daten sensible Elemente sperren und in einen sicheren Quarantänebereich verschieben\n– bei einem Teams-Chat die sensiblen Informationen nicht anzeigen\n\nAlle von DLP überwachten Aktivitäten werden standardmäßig im Microsoft-365-Überwachungsprotokoll (Audit Log) erfasst und an den Aktivitäts-Explorer weitergeleitet.",
    resources: [
      { label: "Learn about data loss prevention", url: "https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-76",
    topicId: "verwaltung-governance",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein. (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Zero Trust erfordert ein Azure-Abonnement", correct: "Nein" },
      { text: "Zero Trust ist eine Sicherheitsstrategie, KEIN spezifisches Produkt", correct: "Ja" },
      { text: "Über das Microsoft 365 Admin Center können Sie Zero Trust für Ihre Organisation aktivieren", correct: "Nein" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Zero Trust ist eine Sicherheitsstrategie. Es handelt sich nicht um ein Produkt oder einen Dienst, sondern um einen Ansatz zur Gestaltung und Umsetzung der folgenden Sicherheitsprinzipien:\n\n– Explizit überprüfen – Authentifizierung und Autorisierung erfolgen stets auf Basis aller verfügbaren Datenpunkte.\n– Zugriff mit den geringsten Rechten verwenden – der Benutzerzugriff wird durch Just-in-Time- und Just-Enough-Access (JIT/JEA), risikobasierte adaptive Richtlinien und Datenschutz eingeschränkt.\n– Von einem Sicherheitsvorfall ausgehen (Assume Breach) – der Explosionsradius wird minimiert und der Zugriff segmentiert; Ende-zu-Ende-Verschlüsselung wird überprüft, und Analysen werden genutzt, um Transparenz zu schaffen, Bedrohungen zu erkennen und die Abwehr zu verbessern.\n\nDiese Prinzipien bilden den Kern von Zero Trust. Statt davon auszugehen, dass alles hinter der Unternehmensfirewall sicher ist, geht das Zero-Trust-Modell von einem Sicherheitsvorfall aus und überprüft jede Anfrage so, als käme sie aus einem nicht kontrollierten Netzwerk. Unabhängig davon, woher eine Anfrage stammt oder auf welche Ressource sie zugreift, gilt beim Zero-Trust-Modell: „Never trust, always verify\" (Vertraue nie, überprüfe immer).\n\nZero Trust ist darauf ausgelegt, sich an die Komplexität der modernen, mobilen Arbeitswelt anzupassen. Zero Trust schützt Benutzerkonten, Geräte, Anwendungen und Daten unabhängig von ihrem Standort.\n\nEin Zero-Trust-Ansatz sollte sich über die gesamte Organisation erstrecken und als integrierte Sicherheitsphilosophie sowie durchgängige Strategie dienen.\n\nUnterschiedliche organisatorische Anforderungen, bestehende technische Implementierungen und Sicherheitsreifegrade beeinflussen jeweils, wie die Umsetzung eines Zero-Trust-Sicherheitsmodells geplant und durchgeführt wird. Mit Zero Trust bewegen Sie sich weg von einer standardmäßigen Vertrauensperspektive hin zu einer Vertrauen-nur-mit-Ausnahme-Perspektive. Eine integrierte Fähigkeit, diese Ausnahmen und Warnungen automatisch zu verwalten, ist dabei wichtig – so lassen sich Bedrohungen leichter erkennen, darauf reagieren und unerwünschte Ereignisse in der gesamten Organisation verhindern oder blockieren.",
    explanationImageUrl: "/exam-images/ab900-q69-explain.png",
    resources: [
      { label: "What is Zero Trust?", url: "https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview" },
    ],
  },
  {
    id: "real-ab900-77",
    topicId: "copilot-grundlagen",
    prompt: "Wählen Sie die Antwort, die den Satz korrekt vervollständigt.",
    blankFill: {
      template: "___ enthält Signale wie Zusammenarbeitsverlauf, Dokumentenrelevanz und Kommunikationshäufigkeit, die die Antworten von Microsoft 365 Copilot beeinflussen.",
      choices: ["Microsoft Copilot Studio", "Microsoft Graph", "Microsoft Purview", "Microsoft Viva Insights"],
    },
    options: [
      { id: "A", text: "Microsoft Copilot Studio enthält Signale wie Zusammenarbeitsverlauf, Dokumentenrelevanz und Kommunikationshäufigkeit, die die Antworten von Microsoft 365 Copilot beeinflussen." },
      { id: "B", text: "Microsoft Graph enthält Signale wie Zusammenarbeitsverlauf, Dokumentenrelevanz und Kommunikationshäufigkeit, die die Antworten von Microsoft 365 Copilot beeinflussen." },
      { id: "C", text: "Microsoft Purview enthält Signale wie Zusammenarbeitsverlauf, Dokumentenrelevanz und Kommunikationshäufigkeit, die die Antworten von Microsoft 365 Copilot beeinflussen." },
      { id: "D", text: "Microsoft Viva Insights enthält Signale wie Zusammenarbeitsverlauf, Dokumentenrelevanz und Kommunikationshäufigkeit, die die Antworten von Microsoft 365 Copilot beeinflussen." },
    ],
    correct: "B",
    explanation: "Microsoft Graph fundiert Copilot mit Ihren Microsoft-365-Daten. Microsoft Graph integriert Dokumente, E-Mails, Chats, Besprechungen und weitere Inhalte, um innerhalb der Sicherheits- und Datenschutzgrenzen von Microsoft relevante und kontextbezogene Antworten in Microsoft 365 Copilot bereitzustellen.",
    resources: [
      { label: "Expand the knowledge of Microsoft 365 Copilot with Microsoft Graph", url: "https://adoption.microsoft.com/en-us/microsoft-graph" },
      { label: "Overview of Microsoft Graph", url: "https://learn.microsoft.com/en-us/graph/overview" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-78",
    topicId: "sicherheit-identitaet",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage zutrifft. Andernfalls wählen Sie Nein. (HINWEIS: Jede korrekte Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Benutzer können Microsoft 365 Copilot anonym verwenden", correct: "Nein" },
      { text: "Administratoren können den Selbstkauf von Microsoft 365 Copilot-Lizenzen erlauben", correct: "Ja" },
      { text: "Microsoft 365 Copilot-Lizenzen können an Microsoft Entra ID-Gastbenutzer aus anderen Organisationen zugewiesen werden", correct: "Nein" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Nein", "Nein"], ["Nein", "Ja", "Nein"], ["Nein", "Ja", "Ja"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Benutzer können Microsoft 365 Copilot nicht anonym verwenden. Microsoft 365 Copilot setzt einen lizenzierten, authentifizierten Microsoft Entra ID-Benutzer voraus.\n\nAls Administrator können Sie im Microsoft 365 Admin Center den Selbstkauf von Microsoft 365 Copilot erlauben oder einschränken. Für jeden Kauf oder jedes Testabonnement sehen Sie die folgenden Details:\n\n– Produktname\n– Name des Käufers\n– erworbene Abonnements\n– Ablaufdatum\n– Kaufpreis\n– zugewiesene Benutzer\n\nSie können außerdem steuern, ob Benutzer in Ihrer Organisation Käufe tätigen oder sich für Testversionen anmelden dürfen.\n\nMicrosoft 365 Copilot-Lizenzen sind für Mitgliedsbenutzer (Member) vorgesehen. Gastbenutzer (B2B) werden für die Copilot-Lizenzierung nicht unterstützt. Copilot setzt ein Benutzerpostfach und vollständigen Zugriff auf Microsoft-365-Workloads voraus.",
  },
  {
    id: "real-ab900-79",
    topicId: "purview-compliance",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Sie müssen Microsoft Purview verwenden, um die folgenden Anforderungen zu erfüllen: • Sensible Daten auf mehreren Plattformen entdecken und klassifizieren. • Benutzer daran hindern, geistiges Eigentum mit externen Benutzern zu teilen. Welche Microsoft Purview-Lösung sollten Sie für jede Anforderung verwenden? (Um zu antworten, wählen Sie die entsprechenden Optionen im Antwortbereich aus. HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    blankFillMulti: {
      template: "Sensible Daten auf mehreren Plattformen entdecken und klassifizieren: ___; Benutzer daran hindern, geistiges Eigentum mit externen Benutzern zu teilen: ___.",
      blanks: [
        ["Kommunikations-Compliance", "Verlustprävention von Daten", "Informationsschutz", "Insider-Risikomanagement"],
        ["Kommunikations-Compliance", "Verlustprävention von Daten", "Informationsschutz", "Insider-Risikomanagement"],
      ],
      combos: [
        [0, 1],
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 3],
        [3, 1],
      ],
    },
    options: [
      { id: "A", text: "Sensible Daten auf mehreren Plattformen entdecken und klassifizieren: Kommunikations-Compliance; Benutzer daran hindern, geistiges Eigentum mit externen Benutzern zu teilen: Verlustprävention von Daten" },
      { id: "B", text: "Sensible Daten auf mehreren Plattformen entdecken und klassifizieren: Verlustprävention von Daten; Benutzer daran hindern, geistiges Eigentum mit externen Benutzern zu teilen: Informationsschutz" },
      { id: "C", text: "Sensible Daten auf mehreren Plattformen entdecken und klassifizieren: Verlustprävention von Daten; Benutzer daran hindern, geistiges Eigentum mit externen Benutzern zu teilen: Insider-Risikomanagement" },
      { id: "D", text: "Sensible Daten auf mehreren Plattformen entdecken und klassifizieren: Informationsschutz; Benutzer daran hindern, geistiges Eigentum mit externen Benutzern zu teilen: Verlustprävention von Daten" },
      { id: "E", text: "Sensible Daten auf mehreren Plattformen entdecken und klassifizieren: Informationsschutz; Benutzer daran hindern, geistiges Eigentum mit externen Benutzern zu teilen: Insider-Risikomanagement" },
      { id: "F", text: "Sensible Daten auf mehreren Plattformen entdecken und klassifizieren: Insider-Risikomanagement; Benutzer daran hindern, geistiges Eigentum mit externen Benutzern zu teilen: Verlustprävention von Daten" },
    ],
    correct: "D",
    explanation: "Microsoft Purview Informationsschutz (früher Microsoft Information Protection) hilft Ihnen, sensible Informationen zu entdecken, zu klassifizieren und zu schützen – unabhängig davon, wo sie gespeichert sind oder wohin sie sich bewegen.\n\nMicrosoft Purview Verlustprävention von Daten (Data Loss Prevention) ist speziell dafür konzipiert, sensible Informationen einschließlich geistigen Eigentums zu erkennen, das Teilen dieser Daten mit externen Benutzern zu verhindern und Richtlinien über Microsoft-365-Workloads hinweg durchzusetzen – etwa in SharePoint, OneDrive, Exchange, Teams und sogar in Copilot-Szenarien.",
    resources: [
      { label: "Protect your sensitive data with Microsoft Purview", url: "https://learn.microsoft.com/en-us/purview/information-protection" },
      { label: "Learn about data loss prevention", url: "https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp" },
    ],
  },
  {
    id: "real-ab900-80",
    topicId: "purview-compliance",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365 E5-Abonnement. Sie müssen verhindern, dass Benutzer unternehmensinterne Finanzdaten an externe Benutzer weitergeben. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Rollengruppen" },
      { id: "B", text: "Richtlinien zur Verhinderung von Datenverlusten (DLP)" },
      { id: "C", text: "Richtlinien zum Insider-Risikomanagement" },
      { id: "D", text: "Aufbewahrungsbezeichnungen" },
    ],
    correct: "B",
    explanation: "Organisationen kontrollieren sensible Informationen wie:\n\n– Finanzdaten\n– proprietäre Daten\n– Kreditkartennummern\n– Gesundheitsdaten\n– Sozialversicherungsnummern\n\nUm diese sensiblen Daten zu schützen und das Risiko einer übermäßigen Freigabe zu verringern, benötigen Organisationen eine Möglichkeit, ihre Benutzer daran zu hindern, sensible Daten unangemessen mit Personen zu teilen, die keinen Zugriff darauf haben sollten. Diese Praxis wird Verlustprävention von Daten (Data Loss Prevention, DLP) genannt.\n\nIn Microsoft Purview setzen Sie Data Loss Prevention um, indem Sie DLP-Richtlinien definieren und anwenden. Eine DLP-Richtlinie hilft Ihnen, sensible Daten in Unternehmensanwendungen und -geräten sowie im eingehenden Web-Datenverkehr zu identifizieren, zu überwachen und automatisch zu schützen. DLP-Richtlinien wirken auf verschiedene Speicherorte, Übertragungsarten und Benutzeraktivitäten.\n\nDLP nutzt eine tiefgehende Inhaltsanalyse – keinen einfachen Textscan. Der Inhalt wird analysiert durch:\n\n– primäre Datenübereinstimmungen mit Schlüsselwörtern\n– die Auswertung regulärer Ausdrücke\n– interne Funktionsvalidierung\n– sekundäre Datenübereinstimmungen in der Nähe der primären Übereinstimmung\n– zusätzlich nutzt DLP Algorithmen des maschinellen Lernens und weitere Methoden, um Inhalte zu erkennen, die Ihren DLP-Richtlinien entsprechen\n– inline über Microsoft Edge for Business für Windows-Geräte, die noch nicht in Microsoft Purview eingebunden wurden (Vorschau), sowie über Network Data Security, um das Teilen sensibler Informationen mit nicht verwalteter KI zu verhindern (Vorschau)",
    resources: [
      { label: "Learn about data loss prevention", url: "https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp" },
    ],
  },
  {
    id: "real-ab900-81",
    topicId: "purview-compliance",
    prompt: "Sie müssen Dateien und E-Mails identifizieren, die Sozialversicherungsnummern (SSNs) und Kreditkartennummern enthalten. Was sollten Sie im Microsoft Purview-Portal verwenden?",
    options: [
      { id: "A", text: "Daten-Explorer" },
      { id: "B", text: "Berichte zum Informationsschutz" },
      { id: "C", text: "Richtlinien zum Informationsschutz" },
      { id: "D", text: "Aktivitäts-Explorer" },
    ],
    correct: "C",
    explanation: "Das Identifizieren und Klassifizieren sensibler Elemente, die der Kontrolle Ihrer Organisation unterliegen, ist der erste Schritt in der Disziplin Informationsschutz. Microsoft Purview bietet drei Möglichkeiten, Elemente zu identifizieren, damit sie klassifiziert werden können:\n\n– manuell, durch Benutzer\n– über automatisierte Mustererkennung, wie bei vertraulichen Informationstypen\n– über maschinelles Lernen\n\nVertrauliche Informationstypen (Sensitive Information Types, SITs) sind musterbasierte Klassifizierer. Sie erkennen sensible Informationen wie Sozialversicherungsnummern, Kreditkarten- oder Bankkontonummern, um sensible Elemente zu identifizieren.",
    resources: [
      { label: "Protect your sensitive data with Microsoft Purview", url: "https://learn.microsoft.com/en-us/purview/information-protection" },
      { label: "Learn about sensitive information types", url: "https://learn.microsoft.com/en-us/purview/sit-sensitive-information-type-learn-about" },
    ],
  },
  {
    id: "real-ab900-82",
    topicId: "purview-compliance",
    prompt: "Wählen Sie die Antwort aus, die den Satz richtig vervollständigt.",
    blankFill: {
      template: "Microsoft Purview-Vertraulichkeitskennzeichnungen können auf ___ angewendet werden.",
      choices: ["Azure Blob Storage", "Microsoft 365 Copilot-Konversationen", "Microsoft SharePoint-Websites"],
    },
    options: [
      { id: "A", text: "Microsoft Purview-Vertraulichkeitskennzeichnungen können auf Azure Blob Storage angewendet werden." },
      { id: "B", text: "Microsoft Purview-Vertraulichkeitskennzeichnungen können auf Microsoft 365 Copilot-Konversationen angewendet werden." },
      { id: "C", text: "Microsoft Purview-Vertraulichkeitskennzeichnungen können auf Microsoft SharePoint-Websites angewendet werden." },
    ],
    correct: "C",
    explanation: "Vertraulichkeitskennzeichnungen von Microsoft Purview Informationsschutz ermöglichen es Ihnen, die Daten Ihrer Organisation zu klassifizieren und zu schützen, ohne dabei die Produktivität der Benutzer und ihre Zusammenarbeitsfähigkeit zu beeinträchtigen.\n\nSie können Vertraulichkeitskennzeichnungen für Folgendes verwenden:\n\n– Schutzeinstellungen bereitstellen, einschließlich Verschlüsselung und Inhaltskennzeichnungen. Wenden Sie beispielsweise die Kennzeichnung „Vertraulich“ auf ein Dokument oder eine E-Mail an – die Kennzeichnung verschlüsselt den Inhalt und fügt ein „Vertraulich“-Wasserzeichen hinzu. Inhaltskennzeichnungen umfassen Kopf- und Fußzeilen sowie Wasserzeichen, und die Verschlüsselung kann zusätzlich einschränken, welche Aktionen bestimmte Personen mit dem Inhalt durchführen dürfen.\n– SharePoint-Schutz beim Herunterladen von Dateien erweitern, wenn Sie eine Standard-Vertraulichkeitskennzeichnung für SharePoint-Dokumentbibliotheken konfigurieren und die Option zur Erweiterung des Schutzes für unverschlüsselte Dateien auswählen. Beim Herunterladen dieser Dateien werden dann die aktuellen SharePoint-Berechtigungen mit der gekennzeichneten Datei übertragen.\n– Inhalte in Office-Apps plattform- und geräteübergreifend schützen. Unterstützt von Word, Excel, PowerPoint und Outlook in den Office-Desktop-Apps sowie Office für das Web, unter Windows, macOS, iOS und Android.\n– Inhalte in Apps und Diensten von Drittanbietern mit Microsoft Defender for Cloud Apps schützen – etwa in SalesForce, Box oder DropBox, selbst wenn die Drittanbieter-App Vertraulichkeitskennzeichnungen nicht selbst liest oder unterstützt.\n– Inhalte für eDiscovery-Fälle identifizieren. Der Bedingungs-Generator zum Erstellen von Suchabfragen in eDiscovery unterstützt Vertraulichkeitskennzeichnungen, die auf Inhalte angewendet wurden.\n– Container schützen, darunter Teams, Microsoft 365-Gruppen, SharePoint-Websites, Viva Engage-Communitys und Loop-Arbeitsbereiche – z. B. Datenschutzeinstellungen, Zugriff externer Benutzer, externe Freigabe und Zugriff von nicht verwalteten Geräten.\n– Besprechungen und Chats schützen, indem Besprechungseinladungen und Antworten gekennzeichnet (und optional verschlüsselt) werden, und Teams-spezifische Optionen erzwingen.\n– Vertraulichkeitskennzeichnungen auf Power BI erweitern: Kennzeichnungen können in Power BI angewendet und angezeigt werden, und Daten werden auch außerhalb des Diensts geschützt.\n– Vertraulichkeitskennzeichnungen auf Objekte in Microsoft Purview Data Map erweitern (derzeit in der Vorschau) – einschließlich Dateien und schematisierter Datenobjekte wie SQL, Azure SQL, Azure Synapse, Azure Cosmos DB und AWS RDS.\n– Vertraulichkeitskennzeichnungen auf Apps und Dienste von Drittanbietern erweitern. Mithilfe des Microsoft Information Protection SDK können Drittanbieter-Apps Vertraulichkeitskennzeichnungen lesen und Schutzeinstellungen anwenden.\n– Inhalte kennzeichnen, ohne Schutzeinstellungen zu verwenden – als reine Klassifizierung der Datensensibilität, mit Nutzungsberichten und Aktivitätsdaten, sodass Schutzeinstellungen bei Bedarf später hinzugefügt werden können.\n– Daten schützen, wenn Microsoft 365 Copilot verwendet wird. Copilot und Agenten erkennen Vertraulichkeitskennzeichnungen und binden sie in die Benutzerinteraktionen ein, um gekennzeichnete Daten weiterhin geschützt zu halten.\n\nIn all diesen Fällen helfen Ihnen Vertraulichkeitskennzeichnungen von Microsoft Purview dabei, die richtigen Maßnahmen für die richtigen Inhalte zu ergreifen. Mit Vertraulichkeitskennzeichnungen lässt sich die Sensibilität von Daten in der gesamten Organisation erkennen, und die Kennzeichnung kann passende Schutzeinstellungen erzwingen – dieser Schutz bleibt dann dauerhaft mit dem Inhalt verbunden.",
    resources: [
      { label: "Learn about sensitivity labels", url: "https://learn.microsoft.com/en-us/purview/sensitivity-labels" },
    ],
  },
  {
    id: "real-ab900-83",
    topicId: "purview-compliance",
    prompt: "Wählen Sie die Antwort aus, die den Satz korrekt vervollständigt.",
    blankFill: {
      template: "Mit der eingeschränkten SharePoint-Suche können Sie den Zugriff von ___ auf Microsoft SharePoint-Websites einschränken, ohne dass Benutzer daran gehindert werden, auf die Dateien und Inhalte zuzugreifen, für die sie über Berechtigungen verfügen.",
      choices: ["Administrator", "Gastbenutzer", "Microsoft 365 Copilot", "Microsoft Purview eDiscovery"],
    },
    options: [
      { id: "A", text: "Mit der eingeschränkten SharePoint-Suche können Sie den Administratorzugriff auf Microsoft SharePoint-Websites einschränken, ohne dass Benutzer daran gehindert werden, auf die Dateien und Inhalte zuzugreifen, für die sie über Berechtigungen verfügen." },
      { id: "B", text: "Mit der eingeschränkten SharePoint-Suche können Sie den Zugriff von Gastbenutzern auf Microsoft SharePoint-Websites einschränken, ohne dass Benutzer daran gehindert werden, auf die Dateien und Inhalte zuzugreifen, für die sie über Berechtigungen verfügen." },
      { id: "C", text: "Mit der eingeschränkten SharePoint-Suche können Sie den Zugriff von Microsoft 365 Copilot auf Microsoft SharePoint-Websites einschränken, ohne dass Benutzer daran gehindert werden, auf die Dateien und Inhalte zuzugreifen, für die sie Berechtigungen besitzen." },
      { id: "D", text: "Mit der eingeschränkten SharePoint-Suche können Sie den Zugriff von Microsoft Purview eDiscovery auf Microsoft SharePoint-Websites einschränken, ohne dass Benutzer daran gehindert werden, auf die Dateien und Inhalte zuzugreifen, für die sie Berechtigungen besitzen." },
    ],
    correct: "C",
    explanation: "Die eingeschränkte SharePoint-Suche (Restricted SharePoint Search) ist eine Einstellung, mit der Sie als SharePoint-Administrator oder anderer Microsoft-365-Administrator eine Liste von SharePoint-Websites (eine „Zulassungsliste“) pflegen können, für die Sie die Berechtigungen überprüft und eine Data Governance angewendet haben. Die Zulassungsliste legt fest, welche SharePoint-Websites in organisationsweiten Suchanfragen sowie – als vorübergehende Maßnahme – in Copilot-Chat und agentischen Erlebnissen verwendet werden können.\n\nStandardmäßig ist die Einstellung „Eingeschränkte SharePoint-Suche“ deaktiviert und die Zulassungsliste ist leer. Ist die eingeschränkte SharePoint-Suche aktiviert, können Benutzer in Copilot mit Dateien und Inhalten interagieren, die ihnen gehören oder auf die sie zuvor bereits zugegriffen haben.",
    resources: [
      { label: "Restricted SharePoint Search", url: "https://learn.microsoft.com/en-us/sharepoint/restricted-sharepoint-search" },
      { label: "Introducing Restricted SharePoint Search to help you get started with Copilot for Microsoft 365", url: "https://techcommunity.microsoft.com/blog/microsoft365copilotblog/introducing-restricted-sharepoint-search-to-help-you-get-started-with-copilot-fo/4071060" },
    ],
  },
  {
    id: "real-ab900-84",
    topicId: "purview-compliance",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365 E5-Abonnement. Sie erstellen eine Microsoft Purview-Vertraulichkeitskennzeichnung mit dem Namen „Label1“. Sie müssen sicherstellen, dass Benutzer „Label1“ auf Dateien in Microsoft 365 anwenden können. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Eine Richtlinie für Vertraulichkeitskennzeichnungen" },
      { id: "B", text: "Einen trainierbaren Klassifikator" },
      { id: "C", text: "Eine Richtlinie für Aufbewahrungskennzeichnungen" },
      { id: "D", text: "Eine Richtlinie für die automatische Kennzeichnung" },
    ],
    correct: "A",
    explanation: "Alle Lösungen von Microsoft Purview Informationsschutz werden mithilfe von Vertraulichkeitskennzeichnungen umgesetzt. Um diese Kennzeichnungen zu erstellen und zu veröffentlichen, verwenden Sie das Microsoft Purview-Portal.\n\nErstellen und konfigurieren Sie zunächst die Vertraulichkeitskennzeichnungen, die Sie für Apps und andere Dienste verfügbar machen möchten – etwa die Kennzeichnungen, die Benutzer in Office-Apps sehen und anwenden können sollen.\n\nErstellen Sie anschließend eine oder mehrere Kennzeichnungsrichtlinien, die die von Ihnen konfigurierten Kennzeichnungen und Richtlinieneinstellungen enthalten. Wenn Sie die Kennzeichnungsrichtlinie für die gewählten Benutzer veröffentlichen:\n\n– werden die Kennzeichnungen für diese Benutzer in ihren Apps sichtbar, die Vertraulichkeitskennzeichnungen unterstützen\n– werden die Richtlinieneinstellungen auf diese Benutzer angewendet",
    resources: [
      { label: "Create and configure sensitivity labels and their policies", url: "https://learn.microsoft.com/en-us/purview/create-sensitivity-labels" },
    ],
  },
  {
    id: "real-ab900-85",
    topicId: "purview-compliance",
    prompt: "Ihr Unternehmen verfügt über eine schriftliche Compliance-Richtlinie, wonach alle E-Mails sieben Jahre lang aufbewahrt und anschließend endgültig gelöscht werden müssen. Welche Microsoft Purview-Lösung sollten Sie verwenden?",
    options: [
      { id: "A", text: "Informationsschutz" },
      { id: "B", text: "Datenlebenszyklusmanagement" },
      { id: "C", text: "Schutz vor Datenverlust" },
      { id: "D", text: "Insider-Risikomanagement" },
    ],
    correct: "B",
    explanation: "Mit den Lösungen Datenlebenszyklusmanagement und Datensatzverwaltung (Records Management) in Microsoft Purview verwalten Sie die Compliance- und regulatorischen Anforderungen Ihrer Organisation für Daten und Datensätze über deren gesamten Lebenszyklus hinweg.\n\nDie Aufbewahrungsrichtlinien von Microsoft Purview Datenlebenszyklusmanagement für Microsoft-365-Workloads ermöglichen es Ihnen, Inhalte mit Richtlinienverwaltung für E-Mail, Dokumente sowie Teams- und Viva-Engage-Nachrichten aufzubewahren oder zu löschen.",
    resources: [
      { label: "Data lifecycle and records management in Microsoft Purview", url: "https://learn.microsoft.com/en-us/purview/manage-data-governance" },
    ],
  },
  {
    id: "real-ab900-86",
    topicId: "copilot-grundlagen",
    prompt: "Wählen Sie die Antwort aus, die den Satz korrekt vervollständigt.",
    blankFill: {
      template: "Im Microsoft 365-Admincenter zeigt die Kennzahl „Verwendete Credits“ im Copilot-Credits-Bericht die Gesamtzahl der Credits an, die von Benutzern in Ihrer Organisation verbraucht wurden, die ___, und die mit arbeitsbasierten Agenten im Microsoft 365 Copilot-Chat interagieren.",
      choices: ["Microsoft Teams nutzen", "extern zu Ihrer Organisation sind", "denen eine Microsoft 365 Copilot-Lizenz zugewiesen ist", "denen KEINE Microsoft 365 Copilot-Lizenz zugewiesen ist"],
    },
    options: [
      { id: "A", text: "Im Microsoft 365-Admincenter zeigt die Kennzahl „Verwendete Credits“ im Copilot-Credits-Bericht die Gesamtzahl der Credits an, die von Benutzern in Ihrer Organisation verbraucht wurden, die Microsoft Teams nutzen und mit arbeitsbasierten Agenten im Microsoft 365 Copilot-Chat interagieren." },
      { id: "B", text: "Im Microsoft 365 Admin Center zeigt die Metrik „Verwendete Credits“ im Copilot-Credits-Bericht die Gesamtzahl der Credits an, die von Benutzern in Ihrer Organisation verbraucht wurden, die nicht zu Ihrer Organisation gehören und mit geschäftlichen Agenten im Microsoft 365 Copilot Chat interagieren." },
      { id: "C", text: "Im Microsoft 365-Admincenter zeigt die Metrik „Verwendete Credits“ im Copilot-Credits-Bericht die Gesamtzahl der Credits an, die von Benutzern in Ihrer Organisation verbraucht wurden, denen eine Microsoft 365 Copilot-Lizenz zugewiesen ist und die mit arbeitsbasierten Agenten im Microsoft 365 Copilot- Chat interagieren." },
      { id: "D", text: "Im Microsoft 365-Admincenter zeigt die Metrik „Verwendete Credits“ im Copilot-Credits-Bericht die Gesamtzahl der Credits an, die von Benutzern in Ihrer Organisation verwendet wurden, denen KEINE Microsoft 365 Copilot-Lizenz zugewiesen ist und die mit arbeitsbasierten Agenten in Microsoft 365 Copilot Chat interagieren." },
    ],
    correct: "D",
    explanation: "Der Microsoft 365 Copilot Pay-as-you-go-Plan bietet Organisationen einen flexiblen und kosteneffizienten Weg, um auf Copilot-Dienste zuzugreifen. Dieser Plan ermöglicht es Administratoren, für bestimmte Copilot-Szenarien eine nutzungsbasierte Abrechnung zu aktivieren, sodass Benutzer Copilot-Funktionen nutzen können, ohne sich auf eine vollständige Lizenz festzulegen.\n\nDer Copilot-Credits-Bericht hilft Ihnen, die verbrauchsabhängigen Kosten für Microsoft 365 Copilot Chat zu verwalten. Dieser Bericht bietet Ihnen Transparenz über die verwendeten Credits im Zusammenhang mit Ihren Pay-as-you-go-Abrechnungsrichtlinien für Microsoft 365 Copilot und enthält wichtige Kennzahlen wie:\n\n– Gesamtzahl der verwendeten Credits\n– kumulative und tägliche Zeitreihen\n– verwendete Credits pro Benutzer, pro Agent, pro Abrechnungsrichtlinie und pro Agent-Benutzer-Paar",
    resources: [
      { label: "Microsoft 365 Copilot pay-as-you-go overview for IT admins", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/pay-as-you-go/overview" },
      { label: "Understand Microsoft 365 Copilot reports", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/agent-essentials/agent-usage-billing/agent-usage-cs-reports" },
    ],
  },
  {
    id: "real-ab900-87",
    topicId: "copilot-grundlagen",
    prompt: "Sie haben eine Microsoft SharePoint-Website namens „Site1“ und eine Sicherheitsgruppe namens „Group1“. Sie möchten verhindern, dass alle Benutzer, die derzeit Zugriff auf „Site1“ haben, auf die Inhalte der Website zugreifen können, es sei denn, der Benutzer ist auch Mitglied der Gruppe „Group1“. Welche Einstellungen sollten Sie konfigurieren? (Wählen Sie zur Beantwortung die entsprechenden Einstellungen im Antwortbereich aus.)",
    options: [
      { id: "A", text: "E-Mail" },
      { id: "B", text: "Datenschutz" },
      { id: "C", text: "Externe Dateifreigabe" },
      { id: "D", text: "Vertraulichkeitsbezeichnung" },
      { id: "E", text: "Erkennung von Inhalten einschränken" },
      { id: "F", text: "Eingeschränkter Zugriff auf die Website" },
    ],
    correct: ["B", "F"],
    imageUrl: "/exam-images/ab900-q87.png",
    explanation: "Sie müssen die Datenschutzeinstellung von Öffentlich auf Privat ändern und den eingeschränkten Websitezugriff für „Group1“ aktivieren.\n\nDie Steuerung für eingeschränkten Websitezugriff hilft, übermäßige Freigabe zu verhindern, indem der Zugriff auf SharePoint-Websites und ihre Inhalte auf Benutzer in einer bestimmten Gruppe beschränkt wird. Benutzer, die nicht Teil der angegebenen Gruppe sind, können nicht auf die Website oder ihre Inhalte zugreifen – selbst wenn sie zuvor Berechtigungen hatten oder über einen Freigabelink verfügten. Diese Richtlinie kann auf Microsoft-365-Gruppen-verbundene, Teams-verbundene und nicht gruppenverbundene Websites angewendet werden, wobei entweder Microsoft-365-Gruppen oder Microsoft Entra-Sicherheitsgruppen verwendet werden.\n\nRichtlinien zur Einschränkung des Websitezugriffs greifen, wenn ein Benutzer versucht, eine Website zu öffnen oder auf eine Datei zuzugreifen. Benutzer mit direkten Berechtigungen für die Datei können diese weiterhin in Suchergebnissen sehen. Sie können jedoch nicht auf die Dateien zugreifen, wenn sie nicht Teil der angegebenen Gruppe sind.\n\nDie Datenschutzeinstellung in den Einstellungen einer SharePoint-Online-Website steuert standardmäßig, wer auf die Website zugreifen kann. Konkret legt sie fest, ob die Website innerhalb Ihrer Microsoft-365-Organisation öffentlich oder privat ist:\n\n– Private Website: Nur Benutzer, die explizit als Besitzer oder Mitglieder hinzugefügt wurden, können auf die Website und ihre Inhalte zugreifen. Dies wird typischerweise für team-spezifische, vertrauliche oder eingeschränkte Zusammenarbeitsszenarien verwendet.\n– Öffentliche Website: Alle authentifizierten Benutzer in der Organisation können auf die Website und ihre Inhalte zugreifen, auch wenn sie nicht explizit als Mitglieder hinzugefügt wurden. Dies wird üblicherweise für organisationsweite Informationen, Wissensdatenbanken oder gemeinsam genutzte Ressourcen verwendet.",
    resources: [
      { label: "Restrict SharePoint site access with Microsoft 365 groups and Microsoft Entra security groups", url: "https://learn.microsoft.com/en-us/sharepoint/restricted-access-control" },
      { label: "How to Manage SharePoint Sites' Privacy Settings in Microsoft 365", url: "https://m365scripts.com/microsoft365/how-to-manage-sharepoint-sites-privacy-settings-in-microsoft-365" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-88",
    topicId: "purview-compliance",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie „Nein“. (HINWEIS: Jede richtige Auswahl bringt einen Punkt.)",
    statements: [
      { text: "Microsoft 365 Copilot berücksichtigt die Vertraulichkeitskennzeichnungen von Microsoft Purview", correct: "Ja" },
      { text: "Microsoft 365 Copilot ignoriert die Richtlinien zur Verhinderung von Datenverlusten (DLP) von Microsoft Purview", correct: "Nein" },
      { text: "Microsoft 365 Copilot berücksichtigt die bestehenden Microsoft 365-Berechtigungen", correct: "Ja" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Microsoft 365 Copilot arbeitet mit den Vertraulichkeitskennzeichnungen von Microsoft Purview zusammen und setzt deren Schutzeinstellungen während der Fundierung (Grounding) und der Inhaltsgenerierung durch. Copilot kann Inhalte nur gemäß den Verschlüsselungs- und Nutzungsrechten der jeweiligen Kennzeichnung abrufen und zusammenfassen, und generierte Inhalte können die Vertraulichkeitskennzeichnung mit der höchsten Priorität übernehmen.\n\nDLP-Richtlinien von Microsoft Purview gelten auch für Microsoft 365 Copilot. DLP kann Copilot daran hindern, sensible Eingabeaufforderungen zu verarbeiten, die externe Web-Fundierung blockieren und verhindern, dass gekennzeichnete Dateien und E-Mails in Copilot-Antworten verwendet werden.\n\nMicrosoft 365 Copilot greift ausschließlich auf Daten zu, für die der angemeldete Benutzer bereits berechtigt ist, und arbeitet innerhalb der bestehenden Microsoft-365-Berechtigungen – einschließlich der Zugriffssteuerungen von SharePoint, OneDrive und Microsoft Graph.",
    resources: [
      { label: "How data is protected and audited in Microsoft 365 and Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing" },
      { label: "Learn about using Microsoft Purview Data Loss Prevention to protect interactions with Microsoft 365 Copilot and Copilot Chat", url: "https://learn.microsoft.com/en-us/purview/dlp-microsoft365-copilot-location-learn-about" },
      { label: "Microsoft 365 Copilot architecture and how it works", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-89",
    topicId: "purview-compliance",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie \"Nein\". (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Eine Vertraulichkeitskennzeichnung kann auf eine Microsoft SharePoint-Website angewendet werden", correct: "Ja" },
      { text: "Eine Vertraulichkeitskennzeichnung kann auf eine E-Mail-Nachricht in Microsoft Exchange angewendet werden", correct: "Ja" },
      { text: "Eine Vertraulichkeitskennzeichnung kann auf Windows 11-Geräte angewendet werden", correct: "Nein" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Microsoft Purview unterstützt Vertraulichkeitskennzeichnungen auf Container-Ebene, die auf SharePoint-Websites angewendet werden können, um Einstellungen wie die Datenschutzstufe der Website, externe Freigabe und den Zugriff von nicht verwalteten Geräten zu steuern.\n\nVertraulichkeitskennzeichnungen können auf E-Mail-Nachrichten in Exchange Online angewendet werden – sowohl manuell durch Benutzer in Outlook als auch automatisch über Richtlinien zur automatischen Kennzeichnung, die von Exchange verarbeitet werden.\n\nVertraulichkeitskennzeichnungen können nicht direkt auf Windows-11-Geräte selbst angewendet werden. Vertraulichkeitskennzeichnungen gelten für Inhalte wie Dateien und E-Mails sowie für Container, nicht für Geräte. Unter Windows 11 können Kennzeichnungen auf Dateien angewendet werden, die auf dem Gerät gespeichert sind – das Gerät selbst kann jedoch nicht gekennzeichnet werden.",
    resources: [
      { label: "Learn about sensitivity labels", url: "https://learn.microsoft.com/en-us/purview/sensitivity-labels" },
      { label: "Protect your sensitive data with Microsoft Purview", url: "https://learn.microsoft.com/en-us/purview/information-protection" },
      { label: "Create and configure sensitivity labels and their policies", url: "https://learn.microsoft.com/en-us/purview/create-sensitivity-labels" },
    ],
  },
  {
    id: "real-ab900-90",
    topicId: "copilot-grundlagen",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Ihr Unternehmen hat kürzlich Microsoft 365 Copilot-Lizenzen für einige Benutzer erworben. Sie müssen ermitteln, wie viele nicht lizenzierte Benutzer Copilot in Microsoft Teams genutzt haben. Welchen Nutzungsbericht sollten Sie im Microsoft 365 Admin Center verwenden?",
    options: [
      { id: "A", text: "Microsoft 365 Copilot Chat" },
      { id: "B", text: "Microsoft 365 Copilot Search" },
      { id: "C", text: "Microsoft 365 Apps" },
      { id: "D", text: "Microsoft 365 Copilot" },
    ],
    correct: "D",
    explanation: "Um zu ermitteln, wie viele nicht lizenzierte Benutzer Copilot in Microsoft Teams genutzt haben, müssen Sie die Microsoft 365 Copilot-Berichte im Microsoft 365 Admin Center verwenden – konkret die Daten aus Copilot-Credits und Copilot-Nutzung.\n\nDer Copilot-Credits-Bericht zeigt die Nutzung durch Benutzer, die KEINE Microsoft 365 Copilot-Lizenz besitzen und mit Copilot-Agenten interagieren, unter anderem in Microsoft Teams über Copilot Chat.",
    resources: [
      { label: "Microsoft 365 Copilot usage report - Microsoft 365 admin center", url: "https://learn.microsoft.com/en-us/microsoft-365/admin/activity-reports/microsoft-365-copilot-usage" },
      { label: "Microsoft 365 Copilot credits report - Microsoft 365 admin center", url: "https://learn.microsoft.com/en-us/microsoft-365/admin/activity-reports/microsoft-365-copilot-credits" },
    ],
  },
  {
    id: "real-ab900-91",
    topicId: "copilot-grundlagen",
    prompt: "Ein Benutzer namens „User1“ ist für die vierteljährliche Umsatzberichterstattung zuständig. „User1“ muss Leistungstrends erkennen, visuelle Erkenntnisse gewinnen und eine Zusammenfassung von Anomalien über mehrere Dateien hinweg erstellen, die verschiedene Datensätze enthalten. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Den „Analyst“-Agenten in Microsoft 365 Copilot" },
      { id: "B", text: "Den „Researcher“-Agenten in Microsoft 365 Copilot" },
      { id: "C", text: "Die Microsoft 365 Copilot-Suche" },
      { id: "D", text: "Copilot in Excel" },
    ],
    correct: "A",
    explanation: "Der Analyst-Agent in Microsoft 365 Copilot ist ein KI-gestützter Assistent für die Datenanalyse. Der Analyst-Agent ist vergleichbar mit einem erfahrenen Datenanalysten an Ihrer Seite, der Ihnen hilft, Daten schnell zu verstehen, ohne dass Sie selbst über fortgeschrittene Fachkenntnisse verfügen müssen.\n\nAnalyst denkt wie ein erfahrener Data Scientist, sodass Sie in wenigen Minuten von Rohdaten zu Erkenntnissen gelangen. Aufbauend auf dem o3-mini-Reasoning-Modell von OpenAI und optimiert für fortgeschrittene Datenanalyse im Arbeitsalltag nutzt Analyst Chain-of-Thought-Reasoning, um Probleme schrittweise iterativ zu durchdenken – mit so vielen Schritten wie nötig, um die Argumentation zu verfeinern und eine hochwertige Antwort zu liefern, die menschlichem analytischem Denken nahekommt. Analyst kann Python ausführen, um selbst komplexeste Datenabfragen zu bewältigen – und Sie können den ausgeführten Code in Echtzeit einsehen und überprüfen. So lassen sich beispielsweise Rohdaten, die über mehrere Tabellen verteilt sind, in eine Nachfrageprognose für ein neues Produkt, eine Visualisierung von Kundenkaufmustern oder eine Umsatzprojektion verwandeln.\n\nWarum Analyst verwenden?\n\n– Zeit sparen: Sie müssen nicht Tausende Datenzeilen oder mehrere Dateien wie Excel-Tabellen, CSV-Dateien, Datenbanken und Ähnliches durchsuchen und diese Daten dann selbst für die Analyse zusammenführen – Analyst übernimmt das für Sie.\n– Sie müssen kein Datenanalyst sein: Stellen Sie einfach eine Frage zu Ihren Daten, und Analyst berechnet Statistiken, erkennt Trends und zeigt Ausreißer auf.\n– Leicht verständliche Berichte erhalten: Sie erhalten zu Ihrer Frage einen Bericht in leicht verständlicher Sprache und Formatierung, der Erkenntnisse aufzeigt und Visualisierungen wie Diagramme und Tabellen enthalten kann.",
    resources: [
      { label: "Get started with Analyst in Microsoft 365 Copilot", url: "https://support.microsoft.com/en-us/topic/get-started-with-analyst-in-microsoft-365-copilot-ff505b9c-a06c-4be9-b855-69d89b1d25d2" },
      { label: "Introducing Researcher and Analyst in Microsoft 365 Copilot", url: "https://www.microsoft.com/en-us/microsoft-365/blog/2025/03/25/introducing-researcher-and-analyst-in-microsoft-365-copilot" },
    ],
  },
  {
    id: "real-ab900-92",
    topicId: "copilot-agenten",
    prompt: "Ihr Unternehmen prüft derzeit die Lizenzierung von Microsoft 365 Copilot. In welchem Szenario sollten Sie die nutzungsabhängige Abrechnung nutzen?",
    options: [
      { id: "A", text: "Um Benutzern Zugriff auf den KI-Assistenten in Copilot in Word zu gewähren" },
      { id: "B", text: "Um die Aktionen in Microsoft Teams-Besprechungen zusammenzufassen" },
      { id: "C", text: "Um Bilder in Premium-Chats zu generieren" },
      { id: "D", text: "Um nicht lizenzierten Benutzern einen benutzerdefinierten Agenten zur Verfügung zu stellen" },
    ],
    correct: "D",
    explanation: "Der Microsoft 365 Copilot Pay-as-you-go-Plan bietet Organisationen einen flexiblen und kosteneffizienten Weg, um auf Copilot-Dienste zuzugreifen. Dieser Plan ermöglicht es Administratoren, für bestimmte Copilot-Szenarien eine nutzungsbasierte Abrechnung zu aktivieren, sodass Benutzer Copilot-Funktionen nutzen können, ohne sich auf eine vollständige Lizenz festzulegen.\n\nPay-as-you-go gilt für Copilot Chat, SharePoint-Agenten und Copilot-Studio-Agenten. Nicht lizenzierte Benutzer verbrauchen Copilot-Credits, wenn sie mit benutzerdefinierten oder organisationsinternen Agenten interagieren.",
    resources: [
      { label: "Microsoft 365 Copilot pay-as-you-go overview for IT admins", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/pay-as-you-go/overview" },
      { label: "Flexible Copilot plans for every organization", url: "https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/copilot-studio" },
    ],
  },
  {
    id: "real-ab900-93",
    topicId: "copilot-grundlagen",
    prompt: "Sie verwenden Microsoft 365 Copilot. Sie möchten eine Eingabeaufforderung so planen, dass sie um Mitternacht ausgeführt wird. Welche Aufgabe sollten Sie in Ihre Lösung aufnehmen?",
    options: [
      { id: "A", text: "Einen Agenten erstellen." },
      { id: "B", text: "Ein Notizbuch erstellen." },
      { id: "C", text: "Die Eingabeaufforderung ausführen." },
      { id: "D", text: "Die Eingabeaufforderung speichern." },
    ],
    correct: "C",
    explanation: "Wenn Sie eine nützliche Copilot-Eingabeaufforderung erstellt haben und diese weiterhin verwenden möchten, können Sie sie so planen, dass sie automatisch ausgeführt wird. Sie müssen sich dann nicht mehr merken, sie jedes Mal selbst auszuführen. Legen Sie einfach Uhrzeit und Häufigkeit fest, und Copilot übernimmt den Rest.\n\nWenn Sie Copilot beispielsweise häufig nutzen, um E-Mails zusammenzufassen, die vor dem Wochenende noch Ihre Aufmerksamkeit brauchen, können Sie diese Eingabeaufforderung so planen, dass sie jeden Freitagnachmittag ausgeführt wird. So erhalten Sie eine hilfreiche Liste, ohne die Eingabeaufforderung selbst ausführen zu müssen – das erleichtert den Wochenabschluss und verhindert, dass Sie wichtige Nachrichten übersehen.\n\nEine geplante Eingabeaufforderung erstellen:\n\n1. Öffnen Sie Copilot und senden (führen) Sie eine Eingabeaufforderung aus. Um Copilot zu öffnen, rufen Sie microsoft365.com/chat in Ihrem Browser auf – oder wählen Sie das Copilot-Symbol entweder in der Taskleiste in Teams oder in der vertikalen Taskleiste in Outlook für das Web oder Desktop.\n2. Bewegen Sie den Mauszeiger über die Eingabeaufforderung und wählen Sie „Diese Eingabeaufforderung planen“.\n3. Legen Sie fest, wann die Eingabeaufforderung ausgeführt wird, wie oft sie ausgeführt wird, und ob Sie eine E-Mail-Benachrichtigung erhalten möchten, sobald die Antwort bereit ist.\n4. Wählen Sie „Speichern“.\n\nHinweis: Sie können bis zu 10 verschiedene geplante Eingabeaufforderungen erstellen.",
    resources: [
      { label: "Schedule Copilot prompts", url: "https://support.microsoft.com/en-us/topic/schedule-copilot-prompts-29dfd5fb-211a-4515-88a6-730b8074e489" },
    ],
  },
  {
    id: "real-ab900-94",
    topicId: "copilot-grundlagen",
    prompt: "Ihr Unternehmen plant den Einsatz von Microsoft 365 Copilot. Sie müssen einem Benutzer die Möglichkeit geben, Microsoft 365 Copilot zu nutzen, einschließlich der Agenten „Researcher“ und „Analyst“. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Das Microsoft 365 Admin Center" },
      { id: "B", text: "Das Microsoft Purview-Portal" },
      { id: "C", text: "Das Microsoft Entra Admin Center" },
      { id: "D", text: "Das Microsoft Defender-Portal" },
    ],
    correct: "A",
    explanation: "Die Verwendung vorgefertigter Microsoft-Agenten, einschließlich Researcher, Analyst und Facilitator, setzt eine Microsoft 365 Copilot-Lizenz voraus. Sie müssen die Lizenz erwerben und über das Microsoft 365 Admin Center zuweisen.",
    resources: [
      { label: "Flexible Copilot plans for every organization", url: "https://www.microsoft.com/en-us/microsoft-365-copilot/pricing" },
    ],
  },
  {
    id: "real-ab900-95",
    topicId: "copilot-grundlagen",
    prompt: "Ihr Unternehmen erwägt, Microsoft 365 Copilot auf Pay-as-you-go-Basis zu nutzen, anstatt eine Microsoft 365 Copilot-Lizenz zu erwerben. In welchem Szenario kommt die Pay-as-you-go-Abrechnung in Frage?",
    options: [
      { id: "A", text: "Durchführung einer mehrstufigen Schlussfolgerung mithilfe des Researcher- Agenten" },
      { id: "B", text: "Erstellung einer Zusammenfassung eines Microsoft Teams-Meetings" },
      { id: "C", text: "Verwendung eines benutzerdefinierten Agenten, der auf Arbeitsdaten basiert" },
      { id: "D", text: "Verwendung des KI-Assistenten zum Bearbeiten eines Dokuments in Copilot in Word" },
    ],
    correct: "C",
    explanation: "Der Microsoft 365 Copilot Pay-as-you-go-Plan bietet Organisationen einen flexiblen und kosteneffizienten Weg, um auf Copilot-Dienste zuzugreifen. Dieser Plan ermöglicht es Administratoren, für bestimmte Copilot-Szenarien eine nutzungsbasierte Abrechnung zu aktivieren, sodass Benutzer Copilot-Funktionen nutzen können, ohne sich auf eine vollständige Lizenz festzulegen.\n\nDie Pay-as-you-go-Abrechnung für Microsoft-365-Copilot-Dienste – darunter Microsoft 365 Copilot Chat und SharePoint-Agenten (Lite-Agenten) – bietet die Möglichkeit, benutzerdefinierte Agenten zu nutzen, ohne Microsoft 365 Copilot-Lizenzen erwerben zu müssen. Die Pay-as-you-go-Abrechnung kann auch beim Rollout neuer Agenten oder bei einem schnellen Anstieg der Nachfrage hilfreich sein. Administratoren müssen Abrechnungsrichtlinien konfigurieren, um zu steuern, wer auf Microsoft-365-Copilot-Dienste zugreifen kann, und um die Pay-as-you-go-Kosten zu überwachen.",
    resources: [
      { label: "Microsoft 365 Copilot pay-as-you-go overview for IT admins", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/pay-as-you-go/overview" },
      { label: "Understanding Pay as You Go Billing for M365 Copilot \"Lite\" Agents", url: "https://www.directionsonmicrosoft.com/reports/understanding-pay-as-you-go-billing-for-m365-copilot-lite-agents" },
    ],
  },
  {
    id: "real-ab900-96",
    topicId: "copilot-grundlagen",
    prompt: "Ihr Unternehmen verfügt über eine Microsoft SharePoint-Website namens „Site1“. „Site1“ enthält alle Richtlinien der Personalabteilung des Unternehmens. Die Richtlinien sind als Microsoft Word-Dokumente gespeichert. Alle Benutzer haben Lesezugriff auf „Site1“. Der Leiter der Personalabteilung berichtet, dass Benutzeranfragen zu den Richtlinien NICHT zeitnah bearbeitet werden, insbesondere im Umfeld wichtiger Feiertage. Sie müssen eine Lösung vorschlagen, die es den Benutzern ermöglicht, die Richtlinien der Personalabteilung zu finden. Die Lösung muss den Benutzern eine Liste häufiger Fragen bereitstellen und sicherstellen, dass die Antworten ausschließlich auf Site1 basieren. Was sollten Sie in die Empfehlung aufnehmen?",
    options: [
      { id: "A", text: "Den persönlichen Assistenten in Copilot in Word" },
      { id: "B", text: "Einen benutzerdefinierten Microsoft 365 Copilot-Agenten" },
      { id: "C", text: "Den Researcher-Agenten in Microsoft 365 Copilot" },
      { id: "D", text: "Ein Microsoft 365 Copilot-Notizbuch" },
    ],
    correct: "B",
    explanation: "Microsoft 365 Copilot ist ein KI-gestütztes Produktivitätstool, das Arbeitsabläufe in Microsoft-365-Anwendungen wie Copilot Chat, Outlook, Teams und Word mithilfe von Unternehmensdaten aus Microsoft Graph verbessert. Obwohl Copilot leistungsstarke integrierte Funktionen bietet, müssen Organisationen häufig zusätzliches Wissen, Datenquellen oder Anwendungen einbinden, um spezifische Anwendungsfälle abzudecken.\n\nAgenten erweitern die Funktionalität von Copilot, indem sie als spezialisierte KI-Assistenten für bestimmte Fachbereiche fungieren. Diese Agenten wenden organisationsspezifisches Wissen und Automatisierung an, um Geschäftsprozesse zu vereinfachen, die Entscheidungsfindung zu verbessern und die Effizienz zu steigern. Agenten können Informationen abrufen, Daten zusammenfassen oder sogar Aktionen wie das Versenden von E-Mails oder das Aktualisieren von Datensätzen durchführen.\n\nMit einem benutzerdefinierten Copilot-Agenten können Sie die Fundierung (Grounding) auf eine bestimmte SharePoint-Website beschränken und so sicherstellen, dass Antworten ausschließlich auf den HR-Richtliniendokumenten basieren. Sie können außerdem vorgeschlagene Eingabeaufforderungen definieren, zum Beispiel:\n\n– „Wie lautet die Urlaubsrichtlinie?“\n– „Wie funktioniert der Elternurlaub?“\n– „Wie viele Krankheitstage stehen mir zu?“\n\nBenutzerdefinierte Agenten können in Apps wie Microsoft Teams bereitgestellt werden, wo Benutzer bereits ihre Fragen stellen.",
    resources: [
      { label: "Agents for Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agents-overview" },
    ],
  },
  {
    id: "real-ab900-97",
    topicId: "purview-compliance",
    prompt: "Wählen Sie die Antwort aus, die den Satz richtig vervollständigt.",
    blankFill: {
      template: "Über das Microsoft Purview-Portal können Sie mit dem Data Explorer ___.",
      choices: ["Datenschutzrichtlinien erstellen und verwalten", "nach Inhalten in Postfächern und Websites suchen", "sensible Informationen identifizieren und deren Speicherorte ermitteln", "die Wirksamkeit Ihrer Richtlinien zur Verhinderung von Datenverlusten (DLP) überprüfen"],
    },
    options: [
      { id: "A", text: "Über das Microsoft Purview-Portal können Sie mit dem Data Explorer Datenschutzrichtlinien erstellen und verwalten." },
      { id: "B", text: "Über das Microsoft Purview-Portal können Sie mit dem Data Explorer nach Inhalten in Postfächern und Websites suchen." },
      { id: "C", text: "Über das Microsoft Purview-Portal können Sie mit dem Data Explorer sensible Informationen identifizieren und deren Speicherorte ermitteln." },
      { id: "D", text: "Über das Microsoft Purview-Portal können Sie den Data Explorer verwenden, um die Wirksamkeit Ihrer Richtlinien zur Verhinderung von Datenverlusten (DLP) zu überprüfen." },
    ],
    correct: "C",
    explanation: "Der Data Explorer zeigt eine aktuelle Momentaufnahme der Elemente, die in Ihrer Organisation eine Vertraulichkeitskennzeichnung oder eine Aufbewahrungskennzeichnung besitzen oder als vertraulicher Informationstyp klassifiziert wurden.\n\nDas Identifizieren klassifizierter Elemente und das Anzeigen ihrer Speicherorte ist der Kernzweck des Data Explorer.",
    resources: [
      { label: "Get started with data explorer", url: "https://learn.microsoft.com/en-us/purview/data-classification-data-explorer" },
    ],
  },
  {
    id: "real-ab900-98",
    topicId: "verwaltung-governance",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement, das eine Microsoft SharePoint-Website namens „Site1“ enthält. Sie müssen alle Änderungen ermitteln, die ein Websiteadministrator an den Websiteeinstellungen von „Site1“ vorgenommen hat. Welchen Bericht sollten Sie im SharePoint-Verwaltungscenter verwenden? (Wählen Sie zur Beantwortung den entsprechenden Bericht im Antwortbereich aus.)",
    options: [
      { id: "A", text: "Agent Insights" },
      { id: "B", text: "App Insights" },
      { id: "C", text: "Katalogverwaltung" },
      { id: "D", text: "Änderungshistorie" },
      { id: "E", text: "Datenzugriffs-Governance" },
      { id: "F", text: "OneDrive-Konten" },
    ],
    correct: "D",
    imageUrl: "/exam-images/ab900-q98.png",
    explanation: "Als SharePoint-Administrator können Sie im SharePoint-Verwaltungscenter benutzerdefinierte Änderungshistorienberichte erstellen, um CSV-Berichte zu Websiteaktionen oder organisationsweiten Einstellungsänderungen der letzten 180 Tage einzusehen.\n\nÄnderungshistorienberichte erhöhen die Transparenz und ermöglichen es Ihnen, Änderungen an der SharePoint-Konfiguration auf verschiedenen Ebenen Ihrer Organisation zu überwachen.\n\nSie können bis zu 10 Berichte erstellen, die nachverfolgen, was geändert wurde, wann es geschah und wer die Änderung an den Website- und Organisationseinstellungen ausgelöst hat.",
    resources: [
      { label: "Track site actions or organization setting changes made within the last 180 days with change history reports", url: "https://learn.microsoft.com/en-us/sharepoint/change-history-report" },
    ],
  },
  {
    type: "yesno",
    id: "real-ab900-99",
    topicId: "purview-compliance",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie \"Nein\". (HINWEIS: Jede richtige Auswahl bringt einen Punkt.)",
    statements: [
      { text: "Microsoft Purview Communications Compliance kann beleidigende Texte in Bildern erkennen, die auf Microsoft SharePoint-Websites gespeichert sind", correct: "Ja" },
      { text: "Microsoft Purview Communications Compliance anonymisiert Benutzeridentitäten standardmäßig während Untersuchungen", correct: "Ja" },
      { text: "Microsoft Purview Communications Compliance fügt allen überwachten Kommunikationen einen Haftungsausschluss hinzu", correct: "Nein" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Microsoft Purview Communication Compliance wertet text- und bildbasierte Nachrichten auf unangemessene Inhalte aus. Dazu gehört das Erkennen anstößiger oder unangemessener Inhalte mithilfe von Bildanalyse (OCR und Klassifizierer) in unterstützten Microsoft-365-Workloads, einschließlich in SharePoint gespeicherter Inhalte, die über unterstützte Kommunikationskanäle sichtbar werden.\n\nDie Identitäten von Absender und Empfänger werden standardmäßig pseudonymisiert – als Teil des „Privacy by Design“-Ansatzes von Communication Compliance. Prüfer sehen die tatsächlichen Benutzeridentitäten erst nach einem expliziten Opt-in durch einen Administrator.\n\nMicrosoft Purview Communication Compliance überwacht, erkennt und untersucht Kommunikationen, fügt jedoch nicht automatisch Haftungsausschlüsse zu Nachrichten hinzu.",
    resources: [
      { label: "Communication Compliance", url: "https://learn.microsoft.com/en-us/purview/communication-compliance-solution-overview" },
    ],
  },
  {
    id: "real-ab900-100",
    topicId: "sicherheit-identitaet",
    prompt: "Ihre Organisation verfügt über ein Microsoft 365-Abonnement. Allen Benutzern wurde eine Microsoft 365 Copilot-Lizenz zugewiesen. Sie müssen verhindern, dass die Benutzer mit Copilot Bilder erstellen. Was sollten Sie verwenden?",
    options: [
      { id: "A", text: "Das Microsoft Defender-Portal" },
      { id: "B", text: "Das Microsoft Entra Admin Center" },
      { id: "C", text: "Das Microsoft Purview-Portal" },
      { id: "D", text: "Das Microsoft 365 Admin Center" },
    ],
    correct: "D",
    explanation: "Die Bilderzeugung von Copilot lässt sich im Microsoft 365 Admin Center aktivieren oder deaktivieren, wie unten gezeigt.",
    explanationImageUrl: "/exam-images/ab900-q100-explain.png",
  },
  {
    type: "yesno",
    id: "real-ab900-101",
    topicId: "copilot-agenten",
    prompt: "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein. (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)",
    statements: [
      { text: "Administratoren können bestimmte Websites für die Nutzung durch Microsoft 365 Copilot sperren", correct: "Ja" },
      { text: "Administratoren können Microsoft 365 Copilot daran hindern, bei der Beantwortung von Benutzeranfragen die Websuche zu nutzen", correct: "Ja" },
      { text: "Administratoren können den Zugriff auf den Researcher-Agenten in Microsoft 365 Copilot sperren, während sie den Zugriff auf den Analyst-Agenten zulassen", correct: "Ja" },
    ],
    combinedOptions: [["Ja", "Ja", "Ja"], ["Ja", "Ja", "Nein"], ["Ja", "Nein", "Ja"], ["Nein", "Ja", "Nein"], ["Nein", "Nein", "Ja"], ["Nein", "Nein", "Nein"]],
    explanation: "Microsoft 365 Copilot unterstützt den Ausschluss bestimmter Domänen für die Web-Fundierung (Web Grounding), wodurch Administratoren bestimmte externe Websites sperren können, wenn Copilot auf Webinhalte verweist.\n\nIT-Administratoren können den Zugriff auf die Websuche über die Richtlinie „Allow web search in Copilot“ steuern, die ausschließlich im Cloud Policy Service für Microsoft 365 verfügbar ist (im Microsoft 365 Apps Admin Center). Mit dieser Richtlinie können IT-Administratoren die Websuche für Benutzer oder Benutzergruppen im gesamten von ihnen verwalteten Mandanten ein- oder ausschalten – im Einklang mit den Richtlinien der Organisation, Datenschutzgesetzen oder anderen regulatorischen Anforderungen.\n\nWir sperren den Zugriff auf den Researcher-Agenten, ohne andere Agenten zu beeinträchtigen, direkt über das Microsoft 365 Admin Center, wie unten gezeigt.",
    explanationImageUrl: "/exam-images/ab900-q101-explain.png",
    resources: [
      { label: "Data, privacy, and security for web search in Microsoft 365 Copilot and Microsoft 365 Copilot Chat", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/manage-public-web-access" },
      { label: "Get started with Researcher agent in Microsoft 365 Copilot", url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/researcher-agent" },
    ],
  },
];

// ---------------------------------------------------------------------
// Locale translations. Same pattern as lib/az900Practice.ts's
// getAz900Questions/applyTranslation — see that file for the detailed
// rationale. Each locale file in lib/i18n/questions/ab900.<locale>.ts is
// optional and can be filled in incrementally; any question id not yet
// present in a given locale's file falls back to the German original
// above, so a partially-translated language never shows an empty field.
// ---------------------------------------------------------------------
import type { QuestionTranslations } from "@/lib/i18n/questions/types";
import ab900_en from "@/lib/i18n/questions/ab900.en";
import ab900_fa from "@/lib/i18n/questions/ab900.fa";
import ab900_ar from "@/lib/i18n/questions/ab900.ar";
import ab900_uk from "@/lib/i18n/questions/ab900.uk";
import ab900_es from "@/lib/i18n/questions/ab900.es";
import ab900_fr from "@/lib/i18n/questions/ab900.fr";
import ab900_ru from "@/lib/i18n/questions/ab900.ru";
import ab900_tr from "@/lib/i18n/questions/ab900.tr";

const AB900_TRANSLATIONS: Partial<Record<string, QuestionTranslations>> = {
  en: ab900_en,
  fa: ab900_fa,
  ar: ab900_ar,
  uk: ab900_uk,
  es: ab900_es,
  fr: ab900_fr,
  ru: ab900_ru,
  tr: ab900_tr,
};

function applyAb900Translation(
  q: PracticeQuestion,
  tr: QuestionTranslations[string] | undefined
): PracticeQuestion {
  if (!tr) return q;
  const merged = { ...q } as PracticeQuestion & { prompt: string; explanation: string };
  if (tr.prompt) merged.prompt = tr.prompt;
  if (tr.explanation) merged.explanation = tr.explanation;
  if (tr.options && "options" in q) {
    (merged as SingleChoiceQuestion).options = (q as SingleChoiceQuestion).options.map((o) => ({
      ...o,
      text: tr.options?.[o.id] ?? o.text,
    }));
  }
  if (tr.statements && q.type === "yesno") {
    (merged as YesNoQuestion).statements = (q as YesNoQuestion).statements.map((s, i) => ({
      ...s,
      text: tr.statements?.[i] ?? s.text,
    }));
  }
  return merged;
}

/** Returns AB900_QUESTIONS with any available translations for the given
 * locale applied. Falls back to German for locales with no translation
 * file yet, and per-question for any field not yet translated. */
export function getAb900Questions(locale: string): PracticeQuestion[] {
  const translations = AB900_TRANSLATIONS[locale];
  if (!translations) return AB900_QUESTIONS;
  return AB900_QUESTIONS.map((q) => applyAb900Translation(q, translations[q.id]));
}