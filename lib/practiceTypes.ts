// Types and pure helper functions shared by every practice-question bank
// (AZ-900, AB-900, AZ-104, ...). Deliberately kept in its own file, with
// zero question content: client components that only need a type or a
// scoring helper should import from HERE, not from az900Practice.ts /
// ab900Practice.ts — importing this file can never pull the actual
// question banks (including correct answers) into the browser bundle.

export type PracticeOptionId = "A" | "B" | "C" | "D" | "E" | "F";

export type SingleChoiceQuestion = {
  type?: "single";
  id: string;
  topicId: string;
  prompt: string;
  /** For "check the underlined text" questions: the exact substring of
   * `prompt` that should be rendered with an underline, so the student
   * knows which part to evaluate/replace. */
  underlinedText?: string;
  /** Path to a reference screenshot the question depends on (e.g. an Azure
   * Portal navigation panel), shown above the answer options. */
  imageUrl?: string;
  /** For "complete the sentence" questions that, in the real exam, offer a
   * live fill-in-the-blank dropdown as an alternative to picking one of the
   * full pre-written sentences below. `choices[i]` always corresponds to
   * `options[i]` (same order, same underlying answer) — picking a blank
   * choice calls the exact same onSelect as picking the matching full
   * option, so both input methods stay in sync automatically. */
  blankFill?: {
    /** The sentence with exactly one "___" marking where the dropdown goes. */
    template: string;
    /** German-translated short choices, in the same order as `options`. */
    choices: string[];
  };
  /** For "complete the sentence" questions with TWO OR THREE simultaneous
   * blanks (e.g. "minimum VMs: ___, minimum zones: ___"), rather than one.
   * Only a full combination of picks that matches one of the curated
   * `options` (via `combos`) results in a selection — an incomplete or
   * unlisted combination simply doesn't select anything yet. */
  blankFillMulti?: {
    /** Sentence template with one "___" per blank, in order. */
    template: string;
    /** Per-blank list of German choices, in the order they appear in the template. */
    blanks: string[][];
    /** combos[i] = the chosen choice-index for each blank that reproduces
     * options[i] — same order/length as `options`. */
    combos: number[][];
  };
  options: { id: PracticeOptionId; text: string }[];
  /** A single letter for normal single-choice questions, or an array of
   * letters for "select all that apply" / multi-response questions (real
   * AZ-900 exam questions include both types — e.g. "Welche zwei..."). */
  correct: PracticeOptionId | PracticeOptionId[];
  explanation: string;
  /** A diagram/screenshot from the source material illustrating the
   * explanation (e.g. an architecture diagram) — shown inside the
   * explanation panel, below the explanation text, never as part of the
   * question/options themselves. */
  explanationImageUrl?: string;
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
  explanationImageUrl?: string;
  resources?: { label: string; url: string }[];
  /** The exact set of combined answer options (A, B, C...) as they appear in
   * the source PDF, each a full Ja/Nein pattern across all statements in
   * order. Optional — only present for questions where this has been
   * extracted. Lets the UI offer "pick the whole combination at once" as an
   * alternative to answering each statement individually. */
  combinedOptions?: ("Ja" | "Nein")[][];
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
  /** Reference image (e.g. a diagram the matching is based on) shown
   * above the interactive matching UI, same purpose as SingleChoice/
   * YesNo's imageUrl. */
  imageUrl?: string;
  /** Full pre-combined answer options exactly as shown in the source PDF
   * (e.g. "Platzhalter 1: X, Platzhalter 2: Y, ..."), letting the user
   * pick one whole combination directly instead of matching items one by
   * one. combos[i][j] = the itemId assigned to descriptions[j] for combo
   * i — same order as `descriptions`. */
  combos?: string[][];
  explanation: string;
  explanationImageUrl?: string;
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

/** True for "select all that apply" questions (question.correct is an
 * array of letters instead of a single letter). */
export function isMultiSelectQuestion(q: SingleChoiceQuestion): boolean {
  return Array.isArray(q.correct);
}

/** Always returns the correct answer(s) as an array, regardless of
 * whether the question is single-or multi-select. */
export function correctOptionIds(q: SingleChoiceQuestion): PracticeOptionId[] {
  return Array.isArray(q.correct) ? q.correct : [q.correct];
}

/** Checks a single-choice/multi-select answer against the question's
 * correct answer(s), treating the given answer as either one letter
 * (single-select) or an array of letters (multi-select) — correct only
 * if the sets match exactly, with no missing or extra selections. */
export function isSingleChoiceAnswerCorrect(
  q: SingleChoiceQuestion,
  answer: PracticeOptionId | PracticeOptionId[] | undefined
): boolean {
  if (answer === undefined) return false;
  const correctIds = correctOptionIds(q);
  const givenIds = Array.isArray(answer) ? answer : [answer];
  if (correctIds.length !== givenIds.length) return false;
  const correctSet = new Set(correctIds);
  return givenIds.every((id) => correctSet.has(id));
}
