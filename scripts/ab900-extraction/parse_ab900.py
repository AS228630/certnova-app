"""
AB-900 (Microsoft 365 Copilot) question extractor.

Source: Ab-900.pdf, 104 questions, bilingual (EN then DE, mostly combined
in one PDF "page pair" per question: prompt page + Antwort page). Per
explicit instruction, this extracts ONLY the German content.

Key structural findings from manual inspection (see conversation record):
  1. Most questions (~90%): EN prompt + DE prompt combined in one text
     block, followed by a page break and "Antwort:" with EN answer then
     DE answer. We must split out the DE half of both the prompt and the
     answer.
  2. ~13 questions: the PDF's own printed question numbers are reused
     across genuinely DIFFERENT questions (a real numbering bug in the
     source document, confirmed by inspection — e.g. two different "23."
     questions). We do NOT trust the printed number for question
     identity; we assign our own sequential id based on block order.
  3. ~12 questions: EN-only block (no "Antwort:") is immediately followed
     by a separate DE-only block that DOES contain "Antwort:". These are
     already single-language and don't need splitting.
  4. A few questions use a direct "statement: Ja/Nein" per-line format
     (not A-F lettered options) rather than the combinatorial "choose
     A-F where each letter is a full Ja/Nein pattern" format used
     elsewhere (e.g. Q51, Q103 style).
  5. Some questions are "fill in the blank" / "select the answer that
     completes the sentence" — structurally identical to single-choice
     for our purposes (same A-F option format), just phrased differently.

Strategy: iterate blocks in document order (not by printed number),
determine language composition, extract the German-only prompt +
options/statements + explanation, classify format, and emit clean
PracticeQuestion-shaped JSON for later conversion to TypeScript.
"""
import re
import json

with open("full.txt", encoding="utf-8") as f:
    content = f.read()

# Fix a rare source-PDF typo (confirmed exactly 2 occurrences via systematic
# scan): an option letter glued directly to the next word with no space,
# e.g. "BEs dient..." should read "B Es dient...". Only touches a standalone
# letter at the start of an option line directly followed by a capitalized
# German word — narrow enough to avoid false positives elsewhere.
content = re.sub(r"(\n[ \t]{0,4})([A-F])([A-ZÄÖÜ][a-zäöüß])", r"\1\2 \3", content)

BLOCK_START = re.compile(r"(?:^|\n|\x0c)[ \t]{0,6}(\d{1,3})\.[ \t]+(?=[A-ZÄÖÜ\"„])")
matches = list(BLOCK_START.finditer(content))
raw_blocks = []
for i, m in enumerate(matches):
    start = m.start()
    end = matches[i + 1].start() if i + 1 < len(matches) else len(content)
    raw_blocks.append((int(m.group(1)), content[start:end]))


def clean_ws(t: str) -> str:
    return " ".join(t.split())


def strip_leading_number(t: str) -> str:
    return re.sub(r"^[\x0c\s]*\d{1,3}\.\s*", "", t, count=1)


OPT_PATTERN = re.compile(r"(?:^|\n)[ \t]{0,4}([A-F])[ \t]+(?=\S)", re.MULTILINE)


def split_lettered_options(text: str):
    """Given a text region, find A/B/C... option markers and return
    {letter: option_text} in document order. Returns {} if <2 found."""
    ms = list(OPT_PATTERN.finditer(text))
    seen = {}
    for mo in ms:
        letter = mo.group(1)
        if letter not in seen:  # first occurrence only
            seen[letter] = mo.start()
    if len(seen) < 2:
        return {}
    ordered = sorted(seen.items(), key=lambda kv: kv[1])
    out = {}
    for i, (letter, start) in enumerate(ordered):
        end = ordered[i + 1][1] if i + 1 < len(ordered) else len(text)
        chunk = text[start:end]
        chunk = re.sub(r"^[\r\n]*[ \t]{0,4}[A-F][ \t]+", "", chunk)
        out[letter] = clean_ws(chunk)
    return out


def find_option_blocks(text):
    """Returns list of (block_start, block_end) for each contiguous
    A,B[,C,D...] option sequence, where block_end is the position right
    after the LAST option's letter marker (i.e. where that option's text
    begins) — used to find where one language's option list ends and the
    next language's intro clause begins."""
    ms = list(OPT_PATTERN.finditer(text))
    runs = []
    current_run = []
    expected = "A"
    for mo in ms:
        letter = mo.group(1)
        if letter == "A":
            if current_run:
                runs.append(current_run)
            current_run = [mo]
            expected = "B"
        elif letter == expected and current_run and (mo.start() - current_run[-1].start()) < 800:
            current_run.append(mo)
            expected = chr(ord(expected) + 1)
    if current_run:
        runs.append(current_run)
    blocks = [(run[0].start(), run[-1].end()) for run in runs if len(run) >= 2]
    return blocks


def find_option_block_starts(text):
    """Returns start positions of each contiguous A,B[,C,D...] option
    sequence found in text (there should be exactly one per language for
    bilingual-combined blocks, or one total for monolingual blocks)."""
    return [s for s, _ in find_option_blocks(text)]


def find_second_half(text: str):
    """Split a prompt region into (english_part, german_part). The German
    half must start at the END of the English option block's last option
    (where that option's TEXT begins — we approximate with a following
    newline) rather than at the start of the German option block, so the
    German intro clause between the two option blocks is preserved."""
    blocks = find_option_blocks(text)
    if len(blocks) >= 2:
        first_block_start, first_block_end = blocks[0]
        # first_block_end points right after the LAST option's letter
        # marker (start of its text); walk forward to the end of that
        # option's own text (next blank-line run) to get past it entirely.
        rest = text[first_block_end:]
        # End of the last option's text: up to the first run of 2+ newlines,
        # or up to the second option block's start if that comes first.
        second_start_in_rest = blocks[1][0] - first_block_end
        blank_run = re.search(r"\n\s*\n", rest[:second_start_in_rest] or rest)
        cut = first_block_end + (blank_run.end() if blank_run else 0)
        return text[:cut], text[cut:]
    # Fallback: split on a run of 2+ blank lines
    parts = re.split(r"\n\s*\n\s*\n", text)
    if len(parts) >= 2:
        mid = len(parts) // 2
        return "\n\n".join(parts[:mid]), "\n\n".join(parts[mid:])
    return "", text


GERMAN_MARKERS = [
    "Sie ", "sie ", "Ihre ", "Ihr ", "können", "müssen", "sollten", "verwenden",
    "Benutzer", "Organisation", "wählen", "Wählen", "welche", "Welche",
    "für die", "für den", "für jede", "während", " und ", " der ", " die ",
    " das ", "einen ", "einem ", "einer ", "zugreifen", "bereitstellen",
    "Administratoren", "Antwortbereich", "Aussage", "richtige", "HINWEIS",
]
ENGLISH_MARKERS = [
    " You ", "Your ", " should ", "need to", " users ", "organization",
    "which ", "What ", "the following", " your ", " you ", "administrator",
    "NOTE:", "statement", "correct selection",
]


def german_score(t):
    return sum(t.count(w) for w in GERMAN_MARKERS)


def english_score(t):
    return sum(t.count(w) for w in ENGLISH_MARKERS)


def is_german(t):
    de_s, en_s = german_score(t), english_score(t)
    return de_s > 0 and de_s >= en_s


results = []
skipped = []

for idx, (printed_num, block) in enumerate(raw_blocks):
    if "Antwort:" not in block:
        continue  # the EN-only half of a split-block pair; its DE twin (with Antwort) is handled separately

    prompt_region, answer_region = block.split("Antwort:", 1)
    prompt_region = strip_leading_number(prompt_region)

    # Determine if prompt_region is bilingual-combined or monolingual.
    en_half, de_half = find_second_half(prompt_region)
    combined_bilingual = bool(en_half.strip()) and is_german(de_half) and not is_german(en_half)

    if combined_bilingual:
        de_prompt_region = de_half
    else:
        # Monolingual block: use whole prompt_region only if it's German;
        # otherwise this is a stray English block we should skip (its
        # German twin, if any, will appear as its own separate block).
        if not is_german(prompt_region):
            skipped.append((idx, printed_num, "monolingual-english-skip"))
            continue
        de_prompt_region = prompt_region

    # --- Split the answer region the same way (EN answer, blank line(s), DE answer) ---
    # Answer region pattern observed: EN answer text, blank line(s), DE answer text.
    ans_parts = [p for p in re.split(r"\n\s*\n", answer_region.strip()) if p.strip()]
    if len(ans_parts) >= 2:
        # Heuristic: last part most likely to be German (it's printed second
        # in every sample inspected). Confirm with language score; if the
        # last part scores as English, fall back to using whichever part
        # scores higher for German.
        candidate = ans_parts[-1]
        if not is_german(candidate) and any(is_german(p) for p in ans_parts):
            candidate = max(ans_parts, key=lambda p: german_score(p) - english_score(p))
        de_answer_region = candidate
    elif len(ans_parts) == 1:
        de_answer_region = ans_parts[0]
    else:
        skipped.append((idx, printed_num, "empty-answer"))
        continue

    # --- Classify format ---
    is_combinatorial = bool(re.search(r"für jede der folgenden Aussagen|Für jede der folgenden Aussagen", de_prompt_region))
    opts = split_lettered_options(de_prompt_region)

    if is_combinatorial and opts:
        # Each option A-F is a full multi-statement Ja/Nein pattern; the
        # Antwort region names the correct letter + repeats that letter's
        # We need the individual statement TEXTS (unique, in order) with
        # their correct Ja/Nein from the winning option block. Statement
        # text frequently wraps across multiple PDF lines, so find every
        # ": Ja"/": Nein" end-marker and take the full run of text since
        # the previous marker (or the option's own leading "X " marker) as
        # that statement's complete text — this correctly spans line breaks,
        # unlike a single-line "(.+?):" regex would.
        end_marker = re.compile(r":\s*(Ja|Nein)\b\.?")
        end_matches = list(end_marker.finditer(de_answer_region))
        stmts_raw = []
        prev_end = 0
        for mo in end_matches:
            stmt_text = de_answer_region[prev_end:mo.start()]
            stmts_raw.append((stmt_text, mo.group(1)))
            prev_end = mo.end()
        if not stmts_raw:
            # correct-letter block sometimes on prompt side needs cross-reference;
            # try scanning the DE answer region more loosely
            skipped.append((idx, printed_num, "combinatorial-no-statements"))
            continue
        statements = [{"text": clean_ws(re.sub(r"^[\r\n]*[ \t]{0,4}[A-F][ \t]+", "", t)), "correct": c} for t, c in stmts_raw]
        # de-dup consecutive identical (can happen from regex spanning option boundary)
        seen_texts = set()
        clean_statements = []
        for s in statements:
            key = s["text"]
            if key not in seen_texts:
                seen_texts.add(key)
                clean_statements.append(s)
        prompt_text = clean_ws(re.split(r"(?:^|\n)[ \t]{0,4}[A-F][ \t]+", de_prompt_region)[0])
        results.append({
            "seq": idx,
            "printed_num": printed_num,
            "type": "yesno",
            "prompt": prompt_text,
            "statements": clean_statements,
            "explanation": "",
        })
        continue

    if opts:
        # Standard single-choice (or fill-in-the-blank, structurally same).
        # Find the TRUE start of the option block (a real A,B,C... run) to
        # correctly separate any intro clause from the options — a bare
        # search for the first "A" can misfire if the intro clause happens
        # to contain a standalone capital A elsewhere.
        block_starts = find_option_block_starts(de_prompt_region)
        prompt_text = clean_ws(de_prompt_region[: block_starts[0]]) if block_starts else clean_ws(de_prompt_region)

        # A handful of questions in the source PDF genuinely omit the
        # German intro clause (only the English "Select the answer that
        # correctly completes the sentence." is present; the translator
        # skipped the German line for that one instance). Rather than
        # leaving an empty prompt or inventing new wording, reuse the
        # EXACT German sentence the same PDF uses elsewhere for the same
        # instruction type — this is real text extracted from this
        # document, not fabricated.
        if len(prompt_text) < 10:
            if "Select the answer that correctly completes the sentence" in en_half:
                prompt_text = "Wählen Sie die Antwort aus, die den Satz korrekt vervollständigt."
            elif re.search(r"select Yes if the statement is true", en_half, re.IGNORECASE):
                prompt_text = "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein."

        # Determine correct letter from the DE answer region. Usually it
        # starts with "X " (the letter). But some answers omit the letter
        # entirely and just restate the option text — in that case, match
        # the answer text against each option's text to find which one it is.
        letter_match = re.match(r"\s*([A-F])[ \t]+(?=\S)", de_answer_region)
        correct_letter = letter_match.group(1) if letter_match else None

        if not correct_letter:
            ans_text_norm = clean_ws(de_answer_region).rstrip(".").lower()
            for letter, opt_text in opts.items():
                opt_norm = opt_text.rstrip(".").lower()
                if opt_norm and (opt_norm in ans_text_norm or ans_text_norm in opt_norm):
                    correct_letter = letter
                    break

        if not correct_letter:
            # Fuzzy fallback: strip leading articles/filler words and compare
            # the last ~6 significant words — handles cases like DE answer
            # saying "Ein Microsoft Defender-Portal" vs option text "Das
            # Microsoft Defender-Portal" (different article, same referent).
            def significant_words(t):
                t = re.sub(r"^(Ein|Eine|Der|Die|Das|A|An|The)\s+", "", t, flags=re.IGNORECASE)
                return set(w.lower()[:5] for w in re.findall(r"[A-Za-zÄÖÜäöüß0-9]{3,}", t))

            ans_words = significant_words(clean_ws(de_answer_region))
            best_letter, best_overlap = None, 0
            for letter, opt_text in opts.items():
                opt_words = significant_words(opt_text)
                if not opt_words:
                    continue
                overlap = len(ans_words & opt_words) / len(opt_words)
                if overlap > best_overlap:
                    best_overlap, best_letter = overlap, letter
            if best_overlap >= 0.6:
                correct_letter = best_letter

        if not correct_letter:
            # Last resort: use the English answer half (before the German
            # half) to find an explicit "X " letter prefix, and trust that
            # the option lists are in the same A-F order in both languages.
            if en_half.strip():
                en_letter_match = re.search(r"(?:^|\n)\s*([A-F])[ \t]+(?=\S)", en_half)
                if not en_letter_match:
                    # Try the answer_region's English half too (before the DE half we already sliced out)
                    en_answer_part = ans_parts[0] if ans_parts else ""
                    en_letter_match = re.match(r"\s*([A-F])[ \t]+(?=\S)", en_answer_part)
                if en_letter_match and en_letter_match.group(1) in opts:
                    correct_letter = en_letter_match.group(1)

        explanation_text = ""  # this PDF has no separate "Erläuterung" section

        if not correct_letter or correct_letter not in opts:
            skipped.append((idx, printed_num, f"bad-correct-letter opts={list(opts.keys())}"))
            continue

        results.append({
            "seq": idx,
            "printed_num": printed_num,
            "type": "single",
            "prompt": prompt_text,
            "options": opts,
            "correct": correct_letter,
            "explanation": explanation_text,
        })
        continue

    # Direct "statement: Ja/Nein" list without A-F combinatorial wrapper.
    # Statement text frequently wraps across multiple lines in the PDF, so
    # we can't rely on a single-line regex — instead, find every ": Ja"/
    # ": Nein" END marker in the DE answer region, then take the full run
    # of text since the previous marker (or the start) as that statement's
    # complete text, correctly spanning line breaks.
    end_marker = re.compile(r":\s*(Ja|Nein)\b\.?")
    end_matches = list(end_marker.finditer(de_answer_region))
    stmts_raw = []
    prev_end = 0
    for mo in end_matches:
        stmt_text = de_answer_region[prev_end:mo.start()]
        stmts_raw.append((stmt_text, mo.group(1)))
        prev_end = mo.end()
    if stmts_raw:
        statements = [{"text": clean_ws(re.sub(r"^[\r\n]*[ \t]{0,4}[A-F][ \t]+", "", t)), "correct": c} for t, c in stmts_raw]
        seen_texts = set()
        clean_statements = []
        for s in statements:
            if s["text"] and s["text"] not in seen_texts:
                seen_texts.add(s["text"])
                clean_statements.append(s)
        # Prompt is the DE prompt region minus any statement-list content —
        # for this format the prompt is usually just the intro clause
        # before the first statement's distinctive opening words appear.
        prompt_text = clean_ws(de_prompt_region)
        if clean_statements:
            first_words = " ".join(clean_statements[0]["text"].split()[:4])
            if first_words and first_words in prompt_text:
                prompt_text = clean_ws(prompt_text.split(first_words)[0])
        results.append({
            "seq": idx,
            "printed_num": printed_num,
            "type": "yesno",
            "prompt": prompt_text if prompt_text else "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein.",
            "statements": clean_statements,
            "explanation": "",
        })
        continue

    # Fill-in-the-blank format: a short list of unlettered candidate phrases
    # appears (each on its own line, no "A "/"B " prefix), followed by the
    # rest of the sentence. The Antwort gives the completed sentence with
    # the correct phrase inline. We assign letters A, B, C... in the order
    # the candidates appear, and identify the correct one by checking which
    # candidate phrase appears in the DE answer sentence.
    candidate_lines = [
        clean_ws(ln) for ln in de_prompt_region.split("\n")
        if clean_ws(ln) and not clean_ws(ln).endswith(":")
    ]
    # Heuristic: candidates are short (<8 words) standalone lines that
    # don't end with typical sentence punctuation, sitting between two
    # longer prose lines. Extract via a stricter regex instead: lines with
    # 1-6 words, no trailing period, appearing consecutively.
    fitb_pattern = re.compile(
        r"(?:^|\n)[ \t]{2,}([^\n]{2,60}?)\n(?=[ \t]{2,}[^\n]{2,60}\n|[ \t]{2,}\S)"
    )
    lines = [ln for ln in de_prompt_region.split("\n")]
    # The first candidate is often appended after the intro clause on the
    # SAME line, separated by a large run of spaces (PDF column layout
    # artifact) rather than sitting on its own line like the rest. Detect
    # and split that off as a synthetic extra line before scanning.
    gap_split = re.compile(r"^(.*?\S)( {4,})(\S.*)$")
    expanded_lines = []
    for ln in lines:
        gm = gap_split.match(ln)
        if gm and not gm.group(1).strip().endswith((".", ":")):
            expanded_lines.append(gm.group(1))
            expanded_lines.append(gm.group(3))
        else:
            expanded_lines.append(ln)
    lines = expanded_lines

    # Find a run of 2-6 short lines (candidates), each under ~50 chars,
    # not starting with a capital-letter-plus-period option marker. Skip
    # past the intro-clause fragment first (identified by ending in a verb
    # like "verwenden"/"sollten" — a real candidate phrase is a noun
    # phrase and won't end that way).
    verb_endings = ("verwenden", "sollten", "nutzen", "verwendet", "benötigen", "verwenden,")
    candidate_run = []
    run_start_idx = None
    for i, ln in enumerate(lines):
        s = ln.strip()
        if s.rstrip(",").endswith(verb_endings):
            # This is the sentence-intro fragment, not a candidate — reset
            # any accumulated run and continue scanning after it.
            candidate_run = []
            run_start_idx = None
            continue
        looks_like_candidate = 0 < len(s) <= 50 and not s.endswith(".") and not s.endswith(":")
        if looks_like_candidate:
            if run_start_idx is None:
                run_start_idx = i
            candidate_run.append(s)
        else:
            if len(candidate_run) >= 2:
                break
            candidate_run = []
            run_start_idx = None

    if len(candidate_run) >= 2:
        lettered = {chr(65 + i): txt for i, txt in enumerate(candidate_run)}
        prefix = "\n".join(lines[:run_start_idx]).strip() if run_start_idx else ""
        suffix_start = run_start_idx + len(candidate_run) if run_start_idx is not None else len(lines)
        suffix = "\n".join(lines[suffix_start:]).strip()
        template = clean_ws(prefix) + " ___ " + clean_ws(suffix)

        # Determine which candidate is correct by checking the DE answer text.
        # Try exact substring first, then fuzzy significant-word overlap
        # (handles cases where the answer restates a term differently, e.g.
        # "Researcher-Agenten" vs the option's "Forscher-Agent").
        ans_norm = clean_ws(de_answer_region).lower()
        correct_letter = None
        for letter, txt in lettered.items():
            if txt.lower() in ans_norm:
                correct_letter = letter
                break
        if not correct_letter:
            def sig_words(t):
                t = re.sub(r"^(ein|eine|der|die|das)\s+", "", t, flags=re.IGNORECASE)
                return set(w.lower()[:5] for w in re.findall(r"[A-Za-zÄÖÜäöüß]{4,}", t))
            ans_words = sig_words(de_answer_region)
            best_letter, best_overlap = None, 0
            for letter, txt in lettered.items():
                txt_words = sig_words(txt)
                if not txt_words:
                    continue
                overlap = len(txt_words & ans_words) / len(txt_words)
                if overlap > best_overlap:
                    best_overlap, best_letter = overlap, letter
            if best_overlap >= 0.5:
                correct_letter = best_letter
        if correct_letter:
            results.append({
                "seq": idx,
                "printed_num": printed_num,
                "type": "single",
                "prompt": template,
                "options": lettered,
                "correct": correct_letter,
                "explanation": "",
                "isFillBlank": True,
            })
            continue

    skipped.append((idx, printed_num, "no-format-matched"))

print(f"Extracted: {len(results)}")
print(f"Skipped: {len(skipped)}")
for s in skipped:
    print(" ", s)

with open("ab900_parsed.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
