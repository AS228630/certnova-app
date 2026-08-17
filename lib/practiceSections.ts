// Shared section-sizing logic used by both QuestionNavigator and
// SectionScorecard, so they always agree on where each "Abschnitt" starts
// and ends. Aims for 5 roughly-equal sections for small/medium question
// banks; caps each section at 50 questions for large banks (500+), so a
// huge bank naturally produces more (e.g. ~11-12) sections instead of a
// few huge ones.

export const TARGET_SECTIONS = 5;
export const MAX_SECTION_SIZE = 50;
export const UNLOCK_THRESHOLD = 90;

// Per-cert override — set by explicit owner decision when a cert's real
// section boundaries need to differ from the automatic 5-section rule
// above (e.g. ab-900's 104 real questions organized into 35-question
// parts: 35/35/34 = 3 real sections, not the 5 the automatic rule would
// otherwise produce). Every function below accepts an optional certId
// and checks this map first; omitting certId (or a certId not listed
// here) always falls back to the automatic calculation unchanged.
const CERT_SECTION_SIZE_OVERRIDES: Record<string, number> = {
  "ab-900": 35,
};

export function getSectionSize(total: number, certId?: string): number {
  const override = certId ? CERT_SECTION_SIZE_OVERRIDES[certId] : undefined;
  if (override) return Math.max(1, Math.min(override, total));
  return Math.max(1, Math.min(MAX_SECTION_SIZE, Math.ceil(total / TARGET_SECTIONS)));
}

export function getSectionCount(total: number, certId?: string): number {
  const size = getSectionSize(total, certId);
  return Math.max(1, Math.ceil(total / size));
}

export function getSectionRange(total: number, sectionIndex: number, certId?: string): [number, number] {
  const size = getSectionSize(total, certId);
  return [sectionIndex * size, Math.min(total, (sectionIndex + 1) * size)];
}

export function getSectionForIndex(total: number, questionIndex: number, certId?: string): number {
  return Math.floor(questionIndex / getSectionSize(total, certId));
}
