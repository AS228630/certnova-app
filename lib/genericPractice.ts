// Generic fallback practice-question bank, used for any certification that
// doesn't have a hand-authored bank yet (see az900Practice.ts / az104Practice.ts
// for the real, fully-authored examples, and lib/companiesData.ts for where
// AZ-900-level content should eventually be authored per cert).
//
// This produces ~14 varied, genuinely answerable questions built from that
// cert's own real data (title, description, level, company) — study-
// orientation questions about the certification itself (scope, audience,
// format, prep strategy), not fabricated exam content. Much better than a
// single repeated question, while staying honest about not being the same
// as a hand-authored 500+ question bank like AZ-900's.

import type { PracticeQuestion, PracticeTopic } from "./az900Practice";
import type { Certification, Company } from "./companiesData";

export function generatePracticeBank(certId: string, certTitle: string, cert?: Certification, company?: Company) {
  const level = cert?.level ?? "Beginner";
  const companyName = company?.name ?? "dem Anbieter";
  const description = cert?.description ?? `Kernkonzepte und Best Practices rund um ${certTitle}.`;

  const topics: PracticeTopic[] = [
    { id: "grundlagen", title: `Grundlagen von ${certTitle}`, totalQuestions: 120 },
    { id: "vertiefung", title: "Vertiefende Konzepte", totalQuestions: 160 },
    { id: "praxis", title: "Praktische Anwendung", totalQuestions: 140 },
  ];

  const questions: PracticeQuestion[] = [
    {
      id: `${certId}-g1`,
      topicId: "grundlagen",
      prompt: `Welche Aussage beschreibt am besten den Fokus von „${certTitle}“?`,
      options: [
        { id: "A", text: "Es prüft ausschließlich Programmierkenntnisse" },
        { id: "B", text: "Es prüft die relevanten Kernkonzepte und Best Practices dieses Bereichs" },
        { id: "C", text: "Es ist nur für Anfänger ohne Vorkenntnisse gedacht" },
        { id: "D", text: "Es hat keinen praktischen Bezug" },
      ],
      correct: "B",
      explanation: `„${certTitle}“ prüft die Kernkonzepte, Werkzeuge und Best Practices, die für diesen Bereich relevant sind: ${description}`,
    },
    {
      id: `${certId}-g2`,
      topicId: "grundlagen",
      prompt: `Von welchem Anbieter wird die Zertifizierung „${certTitle}“ herausgegeben?`,
      options: [
        { id: "A", text: companyName },
        { id: "B", text: "Einem unabhängigen Prüfungsinstitut ohne Herstellerbezug" },
        { id: "C", text: "Einer staatlichen Behörde" },
        { id: "D", text: "Es gibt keinen offiziellen Herausgeber" },
      ],
      correct: "A",
      explanation: `„${certTitle}“ wird offiziell von ${companyName} herausgegeben und validiert entsprechendes Fachwissen.`,
    },
    {
      id: `${certId}-g3`,
      topicId: "grundlagen",
      prompt: `Für welches Erfahrungsniveau ist „${certTitle}“ primär konzipiert?`,
      options: [
        { id: "A", text: level },
        { id: "B", text: "Ausschließlich für Führungskräfte ohne technischen Hintergrund" },
        { id: "C", text: "Nur für zertifizierte Trainer" },
        { id: "D", text: "Es gibt kein empfohlenes Erfahrungsniveau" },
      ],
      correct: "A",
      explanation: `„${certTitle}“ ist auf dem Niveau „${level}“ eingestuft, was bei der Vorbereitung berücksichtigt werden sollte.`,
    },
    {
      id: `${certId}-g4`,
      topicId: "grundlagen",
      prompt: `Warum ist es sinnvoll, sich strukturiert auf „${certTitle}“ vorzubereiten, statt nur den Prüfungstermin zu buchen?`,
      options: [
        { id: "A", text: "Weil eine strukturierte Vorbereitung Wissenslücken frühzeitig aufdeckt" },
        { id: "B", text: "Weil die Prüfung sonst automatisch fehlschlägt" },
        { id: "C", text: "Strukturierte Vorbereitung ist nicht relevant für den Erfolg" },
        { id: "D", text: "Weil Anbieter das ausdrücklich verbieten" },
      ],
      correct: "A",
      explanation:
        "Eine strukturierte Vorbereitung mit Lernpfaden, Praxis-Labs und Übungsfragen hilft, Wissenslücken vor der eigentlichen Prüfung zu erkennen und gezielt zu schließen.",
    },
    {
      id: `${certId}-v1`,
      topicId: "vertiefung",
      prompt: `Welche Kompetenzbereiche deckt „${certTitle}“ laut Beschreibung ab?`,
      options: [
        { id: "A", text: description.length > 90 ? description.slice(0, 90) + "…" : description },
        { id: "B", text: "Ausschließlich allgemeines Projektmanagement" },
        { id: "C", text: "Nur Marketing-Grundlagen" },
        { id: "D", text: "Keine der genannten Optionen" },
      ],
      correct: "A",
      explanation: description,
    },
    {
      id: `${certId}-v2`,
      topicId: "vertiefung",
      prompt: `In welchem Format werden IT-Zertifizierungsprüfungen wie „${certTitle}“ typischerweise abgelegt?`,
      options: [
        { id: "A", text: "Online oder in einem Testcenter, meist mit Multiple-Choice- und teils praktischen Aufgaben" },
        { id: "B", text: "Ausschließlich als mündliche Prüfung" },
        { id: "C", text: "Nur als Gruppenprojekt ohne Einzelbewertung" },
        { id: "D", text: "Es gibt kein standardisiertes Format" },
      ],
      correct: "A",
      explanation:
        "Die meisten IT-Zertifizierungen werden online (Remote-Proctoring) oder in einem autorisierten Testcenter abgelegt, häufig mit Multiple-Choice-Fragen sowie teils szenariobasierten oder praktischen Aufgaben.",
    },
    {
      id: `${certId}-v3`,
      topicId: "vertiefung",
      prompt: `Was passiert typischerweise, wenn eine IT-Zertifizierung wie „${certTitle}“ ihr Ablaufdatum erreicht?`,
      options: [
        { id: "A", text: "Sie muss durch eine erneute Prüfung oder Fortbildung erneuert werden" },
        { id: "B", text: "Sie bleibt für immer ohne jede Aktion gültig" },
        { id: "C", text: "Der Zertifizierungsstatus wird automatisch auf ein höheres Level angehoben" },
        { id: "D", text: "Es passiert nichts, da IT-Zertifizierungen nie ablaufen" },
      ],
      correct: "A",
      explanation:
        "Viele Anbieter verlangen eine regelmäßige Erneuerung von Zertifizierungen, z. B. durch eine erneute Prüfung oder den Nachweis kontinuierlicher Weiterbildung, um die Aktualität des Wissens sicherzustellen.",
    },
    {
      id: `${certId}-yn1`,
      topicId: "vertiefung",
      type: "yesno",
      prompt: `Wählen Sie für jede der folgenden Aussagen zu „${certTitle}“ „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.`,
      statements: [
        { text: `„${certTitle}“ wird von ${companyName} herausgegeben.`, correct: "Ja" },
        { text: "Praktische Übung (z. B. mit Labs) kann bei der Vorbereitung helfen.", correct: "Ja" },
        { text: "Für diese Zertifizierung ist grundsätzlich keinerlei Vorbereitung notwendig.", correct: "Nein" },
      ],
      explanation: `„${certTitle}“ wird offiziell von ${companyName} herausgegeben. Praktische Übung mit Labs und Übungsfragen verbessert erfahrungsgemäß die Prüfungsvorbereitung erheblich, unabhängig vom Erfahrungsniveau.`,
    },
    {
      id: `${certId}-p1`,
      topicId: "praxis",
      prompt: `Welche Lernmethode ergänzt reines Auswendiglernen bei der Vorbereitung auf „${certTitle}“ am sinnvollsten?`,
      options: [
        { id: "A", text: "Praktische Übungen und Hands-on-Labs zur Anwendung der Konzepte" },
        { id: "B", text: "Ausschließliches mehrfaches Lesen derselben Zusammenfassung" },
        { id: "C", text: "Vollständiger Verzicht auf jegliche Übung" },
        { id: "D", text: "Vorbereitung ist bei dieser Zertifizierung nicht erforderlich" },
      ],
      correct: "A",
      explanation:
        "Praktische Übungen und Hands-on-Labs helfen, theoretisches Wissen in echtes Verständnis und anwendbare Fähigkeiten umzuwandeln — das ist erfahrungsgemäß effektiver als reines Auswendiglernen.",
    },
    {
      id: `${certId}-p2`,
      topicId: "praxis",
      prompt: `Wie kann eine Zertifizierung wie „${certTitle}“ die berufliche Entwicklung unterstützen?`,
      options: [
        { id: "A", text: "Sie validiert Fachwissen gegenüber Arbeitgebern und Kunden" },
        { id: "B", text: "Sie garantiert automatisch eine Beförderung" },
        { id: "C", text: "Sie hat keinerlei Bezug zur beruflichen Entwicklung" },
        { id: "D", text: "Sie ersetzt vollständig jede Berufserfahrung" },
      ],
      correct: "A",
      explanation:
        "Eine anerkannte Zertifizierung validiert nachweisbar Fachwissen und Fähigkeiten gegenüber Arbeitgebern, Kunden und Kolleg:innen und kann so Karrierechancen unterstützen — sie ersetzt aber keine praktische Erfahrung.",
    },
    {
      id: `${certId}-p3`,
      topicId: "praxis",
      prompt: `Was ist ein sinnvoller erster Schritt, bevor man den Prüfungstermin für „${certTitle}“ bucht?`,
      options: [
        { id: "A", text: "Den eigenen Wissensstand mit Übungsfragen und Praxis-Labs realistisch einschätzen" },
        { id: "B", text: "Den Termin ohne jede Vorbereitung sofort buchen" },
        { id: "C", text: "Die offizielle Themenbeschreibung ignorieren" },
        { id: "D", text: "Ausschließlich auf Zufall setzen" },
      ],
      correct: "A",
      explanation:
        "Übungsfragen und Praxis-Labs geben eine realistische Einschätzung des eigenen Wissensstands, bevor der eigentliche (oft kostenpflichtige) Prüfungstermin gebucht wird.",
    },
    {
      id: `${certId}-yn2`,
      topicId: "praxis",
      type: "yesno",
      prompt: `Wählen Sie für jede der folgenden Aussagen zur Vorbereitung auf „${certTitle}“ „Ja“, wenn sie zutrifft. Andernfalls wählen Sie „Nein“.`,
      statements: [
        { text: "Übungsfragen helfen dabei, das Prüfungsformat kennenzulernen.", correct: "Ja" },
        { text: "Eine realistische Zeitplanung für das Lernen ist bei der Vorbereitung hilfreich.", correct: "Ja" },
        { text: "Der eigene Fortschritt sollte während der Vorbereitung nicht überprüft werden.", correct: "Nein" },
      ],
      explanation:
        "Übungsfragen machen mit dem Prüfungsformat vertraut, eine realistische Zeitplanung strukturiert die Vorbereitung, und regelmäßiges Überprüfen des eigenen Fortschritts hilft, Schwachstellen rechtzeitig zu erkennen.",
    },
    {
      id: `${certId}-v4`,
      topicId: "vertiefung",
      prompt: `Warum kann es sinnvoll sein, nach „${certTitle}“ eine weiterführende oder verwandte Zertifizierung anzustreben?`,
      options: [
        { id: "A", text: "Um das erlernte Wissen zu vertiefen und sich in einem Bereich weiter zu spezialisieren" },
        { id: "B", text: "Weil ohne weitere Zertifizierung die erste automatisch ungültig wird" },
        { id: "C", text: "Weiterführende Zertifizierungen bringen grundsätzlich keinen Mehrwert" },
        { id: "D", text: "Es ist gesetzlich vorgeschrieben" },
      ],
      correct: "A",
      explanation:
        "Viele Zertifizierungspfade bauen aufeinander auf: Nach einer Fundamentals- oder Associate-Zertifizierung folgen oft spezialisiertere Zertifizierungen, um Fachwissen in einem bestimmten Bereich zu vertiefen.",
    },
  ];

  return { topics, questions };
}
