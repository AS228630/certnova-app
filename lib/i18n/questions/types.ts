// Locale overrides for AZ900_QUESTIONS. Only questions that have been
// translated appear here; anything not listed here falls back to the
// original German text (lib/az900Practice.ts), so a partially-translated
// question bank never shows a broken/empty field — only the fields that
// have a real, verified translation get overridden.
//
// Structure per question id: only the fields that changed. `options` is
// keyed by option id (A/B/C/...) so a translation can't accidentally
// mismatch options to the wrong letter.

export type QuestionTranslation = {
  prompt?: string;
  underlinedText?: string;
  options?: Partial<Record<string, string>>;
  explanation?: string;
  statements?: string[]; // for yesno questions, same order as the German statements
  items?: Partial<Record<string, string>>; // for matching questions, keyed by item id
  descriptions?: Partial<Record<string, string>>; // for matching questions, keyed by description id
};

export type QuestionTranslations = Record<string, QuestionTranslation>;
