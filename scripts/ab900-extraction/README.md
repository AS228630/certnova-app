# AB-900 Question Extraction Scripts

Extracts real exam-prep questions from the user's authoritative PDF
(`Ab-900.pdf`, a Microsoft 365 Copilot exam-prep document, bilingual
English/German, 104 printed question numbers / 101 true unique questions).

## Status
COMPLETE. All 101 real question+answer pairs extracted and verified in
`lib/ab900Practice.ts`. Nothing fabricated; a handful of questions with
corrupted German text in the source PDF were manually reconstructed using
only text found elsewhere in the same document (its own standard
instruction sentences, or hand-transcribed correct paragraphs) — see the
patch functions in `patch_ab900.py` for exactly which questions and why.

## Why 101, not 104
The source PDF's own question numbering goes up to 104, but this does NOT
equal the true question count: several numbers are reused for entirely
different questions (e.g. two distinct questions are both printed as
"23."), and question 50 was never printed as its own page at all — its
content appears attached to question 49's German half instead. Verified
independently three ways: counting raw text blocks, counting "Antwort:"
answer pages (101), and a full manual page-by-page listing of the PDF.

## Key structural findings (read before extracting a similar PDF)
1. Most questions: English prompt+options and German prompt+options are
   combined in ONE block, followed by a page break and "Antwort:" with the
   English answer then the German answer.
2. ~13 questions: the PDF's own printed numbers are reused across
   genuinely different questions — never trust the printed number for
   question identity; assign a sequential id based on block/answer order
   instead (this script does not rely on printed_num for id generation).
3. ~12 questions: an English-only block (no "Antwort:") is immediately
   followed by a separate German-only block that DOES contain "Antwort:".
   These don't need splitting — filter for "Antwort:" presence.
4. A few "combinatorial" yes/no questions (choose A-F where each letter is
   a full multi-statement Ja/Nein pattern) have statement text that wraps
   across multiple PDF lines. A naive single-line regex like `(.+?):\s*
   (Ja|Nein)` will TRUNCATE the statement to only its last line — this was
   a major bug caught during QA (see `parse_ab900.py`'s `end_marker`
   approach, which finds every ": Ja"/": Nein" end-marker and takes the
   full run of text since the previous marker, correctly spanning line
   breaks).
5. A handful of questions have quirky source-PDF formatting that defeats
   automated splitting entirely (e.g. all-English options first, then a
   German intro, then German options in a different order than expected;
   or a stray "Ein" instead of "A" breaking option-letter detection).
   These were fixed with hand-verified patches in `patch_ab900.py` rather
   than by further generalizing the parser — diminishing returns past a
   certain point, and manual verification against the raw PDF is safer
   than an ever-more-complex heuristic for a handful of edge cases.

## Files
- `parse_ab900.py` — main parser. Run first: `python3 parse_ab900.py`
  (expects `full.txt`, the `pdftotext -layout` output of the source PDF,
  in the same directory). Writes `ab900_parsed.json`.
- `patch_ab900.py` — post-processing patches for the ~15 questions the
  automated parser couldn't handle correctly, plus final topicId
  assignment. Run second: `python3 patch_ab900.py`. ALWAYS re-run this
  after re-running parse_ab900.py, since the parser overwrites the JSON.
- No separate TypeScript generator script was preserved — the JSON→TS
  conversion (escaping, topic titles, id numbering) was done inline in the
  extraction session; re-derive it from `lib/ab900Practice.ts`'s existing
  structure if regenerating.

## Lesson for extracting the next certification's PDF
1. `pdftotext -layout` the source PDF to `full.txt`.
2. Use the union of: form-feed splitting + a number-prefix regex that
   accounts for a leading form-feed character directly attached to the
   number (no newline in between) — `(?:^|\n|\x0c)[ \t]{0,6}(\d{1,3})\.
   [ \t]+(?=[A-ZÄÖÜ"„])` worked well here.
3. Filter blocks to only those containing the answer-section marker
   ("Antwort:" for German PDFs).
4. Build a real language-detection heuristic (word markers, not just
   letter case) rather than assuming position/order — some PDFs put German
   first, others English first, inconsistently within the same document.
5. QA relentlessly: check every prompt/option/statement for language
   correctness, truncation, letter-prefix leakage, and suspicious
   length — don't trust "N extracted, 0 skipped" as a quality signal on
   its own. A parser reporting 0 skips can still be silently producing
   garbled content for edge-case questions; only field-by-field content
   audits catch that.
