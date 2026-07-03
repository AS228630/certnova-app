// Generic fallback practice-question bank, used for any certification that
// doesn't have a hand-authored bank yet (see az900Practice.ts / az104Practice.ts
// for the real, fully-authored examples). Produces a small, genuinely
// answerable seed set labelled with that cert's own title, plus a few
// locked topics with real target counts — same pattern as lib/labsData.ts
// and lib/learnData.ts.

import type { PracticeQuestion, PracticeTopic } from "./az900Practice";

export function generatePracticeBank(certId: string, certTitle: string) {
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
      explanation: `„${certTitle}“ prüft die Kernkonzepte, Werkzeuge und Best Practices, die für diesen Bereich relevant sind.`,
    },
  ];

  return { topics, questions };
}
