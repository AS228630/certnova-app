# AZ-900 Question Extraction Scripts

Extracts real exam-prep questions from the user's authoritative PDF
(`Pruefungsfragen_AZ-900_De.pdf`, 564 questions, one per page, in
**reverse** page order — page N = Frage (565-N)).

## Status
100% COMPLETE. All 564 questions extracted and verified in
`lib/az900Practice.ts`. Zero missing, zero duplicates, nothing fabricated.

## ⚠️ Critical lesson #2: use OCR, not "look at the image"
For ~30 questions, the answer-table content ("Answer options / Answer
Area") was embedded in the PDF as an IMAGE, not real text — pdftotext
(with or without -layout) genuinely cannot see it, confirmed by testing
both. The fix is NOT to try to visually inspect the rendered/extracted
image directly — that channel proved unreliable and inconsistent in this
environment. Instead:

```bash
pdfimages -f <page> -l <page> -png Pruefungsfragen_AZ-900_De.pdf out
tesseract out-000.png stdout -l eng
```

`tesseract` (already installed) reliably and deterministically extracts
the English answer-table text every time. This is how Q40, Q49, Q125,
Q293, Q297, etc. were recovered. It even correctly identified that Q429's
page is a broken "404 error — page not found" placeholder graphic in the
SOURCE PDF itself (not a reading failure on our end) — run OCR before
concluding a page is unreadable.

## ⚠️ Critical lesson (read before extracting more)
A full QA audit after batch 4 found that 18 "successfully parsed" questions
from batches 1-3 were actually **silently wrong**: multi-item matching
questions ("Ordnen Sie ... Spalte", "Ziehen Sie ... Ebenen/Modell") got
mis-parsed into single-choice format with multiple "Term: Value" fragments
concatenated into one option string. The result looked structurally valid
(4 options, a correct letter) but the actual text was garbled/wrong.
These were all removed. `parse.py` now:
1. Detects "Ordnen Sie" / "Ziehen Sie ... Ebenen/Positionen/Modell" and
   skips those questions entirely (they need proper `MatchingQuestion`
   handling, not single-choice).
2. Runs an automated post-parse QA check (duplicate option text, or any
   option containing 2+ colons) and drops anything suspicious before
   writing output.

**Never trust "Parsed OK" alone — always spot-check a sample of the actual
generated TypeScript against the raw PDF text for every batch**, the same
way this bug was caught (grep for "Antwortbereich"/"Ordnen Sie"/"Ziehen
Sie" across the whole file and manually inspect a sample of hits).

## To extract the next batch (e.g. 301-400)

1. Compute the PDF page range: `page = 565 - questionNumber`, so
   questions 301-400 → pages 165-264 (in reverse: page 264 = Frage 301,
   page 165 = Frage 400).

2. Extract the raw text:
   ```bash
   pdftotext -f 165 -l 264 -layout Pruefungsfragen_AZ-900_De.pdf q301_400_raw.txt
   ```

3. Run the parser (edit the filename constants at the top of `parse.py`
   first, or pass them as args if you add that):
   ```bash
   python3 parse.py   # writes parsed_q1_100.json by default — rename per batch
   ```

4. Spot-check a few entries in the output JSON for sanity (prompt/options/
   explanation not truncated, category makes sense).

5. Generate the TypeScript fragment (see the inline generator used in the
   original extraction session — same `esc()` + topicId-mapping logic) and
   append to `AZ900_QUESTIONS` in `lib/az900Practice.ts`, using ids
   `real-az900-<n>`.

6. Update the progress comment at the top of `az900Practice.ts`.

## Files
- `parse.py` — the main parser (single-choice 2-6 options + combinatorial
  Ja/Nein statement questions). Self-contained, no external imports beyond
  stdlib.
- `combinatorial.py` — reference copy of the safer combinatorial-question
  parser (`parse_combinatorial`) already merged into `parse.py`; kept here
  standalone for readability/reuse.
