// Real-world exam logistics (question count, duration, passing score, format,
// delivery method) for the fourth journey window ("Über die Prüfung").
//
// IMPORTANT — follows the project's core rule (no fake data): only certs with
// independently verified numbers (currently AZ-900, AZ-104, AB-900 — sourced
// from Microsoft Learn's official exam pages and Pearson VUE / Certiport) get
// exact figures here. Every other cert (~167 of them) falls back to a
// clearly-labeled generic block that gives real, useful general guidance
// about how Microsoft/vendor exams work without inventing a specific number
// for a specific exam we haven't verified. Add a cert's real entry to
// VERIFIED_EXAM_INFO once you have a source for it — nothing else needs to
// change, every cert page already reads from this file automatically.

export type ExamInfo = {
  /** True only for entries with a verified, cert-specific source. */
  verified: boolean;
  questionRange: string; // e.g. "40–60"
  durationMinutes: string; // e.g. "45–60"
  passingScore: string; // e.g. "700 / 1000"
  format: string[]; // short tags, rendered as pills
  deliveredBy: string;
  price?: string;
  languages?: string;
  sourceNote: string;
  /** Single concrete numbers used to actually run the timed mock exam
   * (picked from the middle of the verified range, or a reasonable
   * generic default) — a real exam session needs one fixed number, not
   * a range, even though the real vendor exam varies per sitting. */
  simQuestionCount: number;
  simDurationMinutes: number;
};

export const VERIFIED_EXAM_INFO: Record<string, ExamInfo> = {
  "az-900": {
    verified: true,
    questionRange: "40–60",
    durationMinutes: "45–60",
    passingScore: "700 / 1000",
    format: ["Multiple Choice", "Multiple Response", "Drag-and-Drop", "Hotspot"],
    deliveredBy: "Pearson VUE (Testcenter oder Online-Proctoring)",
    price: "99 $",
    languages: "Verfügbar in Deutsch und weiteren Sprachen",
    sourceNote: "Offizielle Angaben von Microsoft Learn / Pearson VUE",
    simQuestionCount: 40,
    simDurationMinutes: 45,
  },
  "az-104": {
    verified: true,
    questionRange: "40–60",
    durationMinutes: "100–120",
    passingScore: "700 / 1000",
    format: ["Multiple Choice", "Fallstudien", "Drag-and-Drop", "Szenario"],
    deliveredBy: "Pearson VUE (Testcenter oder Online-Proctoring)",
    price: "165 $",
    languages: "Verfügbar in Deutsch und weiteren Sprachen",
    sourceNote: "Offizielle Angaben von Microsoft Learn / Pearson VUE",
    simQuestionCount: 50,
    simDurationMinutes: 100,
  },
  "ab-900": {
    verified: true,
    questionRange: "40–60",
    durationMinutes: "45–60",
    passingScore: "700 / 1000",
    format: ["Multiple Choice", "Multiple Response", "Szenario"],
    deliveredBy: "Pearson VUE (Testcenter oder Online-Proctoring)",
    price: "99 $",
    languages: "Aktuell auf Englisch verfügbar",
    sourceNote: "Offizielle Angaben von Microsoft Learn / Pearson VUE",
    simQuestionCount: 40,
    simDurationMinutes: 45,
  },
};

// Honest, non-invented fallback shown for every cert without a verified
// entry above. Ranges here describe how vendor certification exams
// generally work (true across the industry) rather than claiming to know
// this specific exam's exact numbers.
export const GENERIC_EXAM_INFO: ExamInfo = {
  verified: false,
  questionRange: "meist 40–60",
  durationMinutes: "meist 45–120",
  passingScore: "meist 700 / 1000",
  format: ["Multiple Choice", "Szenario-Fragen"],
  deliveredBy: "je nach Anbieter (z. B. Pearson VUE)",
  sourceNote: "Allgemeine Richtwerte — die exakten Prüfungsdetails für dieses Zertifikat werden noch ergänzt.",
  simQuestionCount: 20,
  simDurationMinutes: 30,
};

export function getExamInfo(certId: string): ExamInfo {
  return VERIFIED_EXAM_INFO[certId] ?? GENERIC_EXAM_INFO;
}
