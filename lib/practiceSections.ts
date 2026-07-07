// Shared section-sizing logic used by both QuestionNavigator and
// SectionScorecard, so they always agree on where each "Abschnitt" starts
// and ends. Aims for 5 roughly-equal sections for small/medium question
// banks; caps each section at 50 questions for large banks (500+), so a
// huge bank naturally produces more (e.g. ~11-12) sections instead of a
// few huge ones.

export const TARGET_SECTIONS = 5;
export const MAX_SECTION_SIZE = 50;
export const UNLOCK_THRESHOLD = 90;

export function getSectionSize(total: number): number {
  return Math.max(1, Math.min(MAX_SECTION_SIZE, Math.ceil(total / TARGET_SECTIONS)));
}

export function getSectionCount(total: number): number {
  const size = getSectionSize(total);
  return Math.max(1, Math.ceil(total / size));
}

export function getSectionRange(total: number, sectionIndex: number): [number, number] {
  const size = getSectionSize(total);
  return [sectionIndex * size, Math.min(total, (sectionIndex + 1) * size)];
}

export function getSectionForIndex(total: number, questionIndex: number): number {
  return Math.floor(questionIndex / getSectionSize(total));
}
