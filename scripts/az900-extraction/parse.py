import re
import json

def strip_marker_artifact(text):
    """Removes a stray leading single-letter marker (e.g. 'A Eine Azure...'
    -> 'Eine Azure...') that can leak in from extraction quirks, without
    touching legitimate text."""
    return re.sub(r"^[A-F]\s(?=[A-ZÄÖÜ])", "", text).strip()


with open("q301_400_raw.txt", encoding="utf-8") as f:
    raw = f.read()

blocks = [b for b in raw.split("\f") if b.strip()]

questions = []
errors = []

def parse_combinatorial(section_text, correct_letter):
    """Robust: finds all statement occurrences in the whole section,
    determines N (unique statement count), groups the flat sequence into
    blocks of N, and picks the block containing the correct_letter's
    marker position. Returns None (skip) if anything is ambiguous —
    correctness matters more than completeness for real exam content."""
    stmt_pattern = re.compile(r"(.+?):\s*(Ja|Nein)\.?\s*$", re.MULTILINE)
    occs = list(stmt_pattern.finditer(section_text))
    if not occs:
        return None

    def clean(t):
        t = re.sub(r"^\s{0,3}[A-F]\s+", "", t.strip())
        t = re.sub(r"^\.\s*", "", t)  # drop a stray leading period artifact
        return " ".join(t.split())

    unique_texts = []
    seen_texts = set()
    for mo in occs:
        t = clean(mo.group(1))
        if t not in seen_texts:
            seen_texts.add(t)
            unique_texts.append(t)
    n = len(unique_texts)
    if n < 2 or len(occs) % n != 0:
        return None  # ambiguous — skip rather than guess

    letter_pattern = re.compile(r"(?:^|\n)\s{0,3}(" + correct_letter + r")(?:\s{2,}|\s*\n)", re.MULTILINE)
    lm = letter_pattern.search(section_text)
    if not lm:
        return None
    letter_pos = lm.start()

    occ_idx = None
    for i, mo in enumerate(occs):
        if mo.start() >= letter_pos:
            occ_idx = i
            break
    if occ_idx is None:
        occ_idx = len(occs) - 1

    block_start = (occ_idx // n) * n
    block = occs[block_start: block_start + n]
    if len(block) != n:
        return None

    texts_in_block = [clean(mo.group(1)) for mo in block]
    if len(set(texts_in_block)) != n:
        return None  # block doesn't contain each unique statement exactly once — skip

    return [{"text": clean(mo.group(1)), "correct": mo.group(2)} for mo in block]


for block in blocks:
    m = re.search(r"Frage\s*-\s*(\d+)\s*-", block)
    if not m:
        errors.append(("no-frage-number", block[:100]))
        continue
    qnum = int(m.group(1))

    after_header = block[m.end():]
    lines = after_header.split("\n")
    idx = 0
    while idx < len(lines) and not lines[idx].strip():
        idx += 1
    category = lines[idx].strip() if idx < len(lines) else ""
    rest = "\n".join(lines[idx+1:])

    ra_match = re.search(r"Richtige\s+Antwort\s*:\s*([A-F])", rest)
    correct_letter = ra_match.group(1) if ra_match else None
    main_part = rest[:ra_match.start()] if ra_match else rest

    erl_match = re.search(r"Erläuterung\s*:", main_part)
    if erl_match:
        prompt_and_options = main_part[:erl_match.start()]
        explanation_and_ref = main_part[erl_match.end():]
    else:
        prompt_and_options = main_part
        explanation_and_ref = ""

    ref_match = re.search(r"Referenz\s*:\s*(.+)", explanation_and_ref)
    reference = ref_match.group(1).strip() if ref_match else None
    explanation = explanation_and_ref[:ref_match.start()] if ref_match else explanation_and_ref
    explanation = re.sub(r"\n{2,}", "\n\n", explanation).strip()

    prompt_and_options = re.sub(r"(?:^|\n)\s{0,3}Ein\s{2,}", "\n A              ", prompt_and_options)

    # Detect the "choose Ja/Nein for each statement" combinatorial format.
    is_matching = bool(re.search(r"Ordnen Sie|Ziehen Sie.{0,40}(Ebenen|Positionen|Modell)", prompt_and_options))
    if is_matching:
        errors.append((f"q{qnum}-matching-type-skipped",))
        continue
    is_combinatorial = bool(re.search(r"für jede der folgenden Aussagen", prompt_and_options))

    if is_combinatorial and correct_letter:
        # prompt = everything before the first option marker
        first_marker = re.search(r"(?:^|\n)\s{0,3}[A-F]\s{2,}", prompt_and_options)
        prompt_text = prompt_and_options[:first_marker.start()] if first_marker else prompt_and_options
        prompt_text = re.sub(r"\(Hinweis:.*?Punkt\.?\)", "", prompt_text, flags=re.IGNORECASE | re.DOTALL)
        prompt_text = " ".join(prompt_text.split())

        stmts = parse_combinatorial(prompt_and_options, correct_letter)
        if stmts:
            questions.append({
                "number": qnum,
                "category": category,
                "type": "yesno",
                "prompt": prompt_text,
                "statements": stmts,
                "explanation": " ".join(explanation.split()) if explanation else "",
                "reference": reference,
            })
            continue
        else:
            errors.append((f"q{qnum}-combinatorial-failed",))
            continue

    # Standard single-choice (2-6 options)
    opt_pattern = re.compile(r"(?:^|\n)\s{0,3}([A-F])\s{2,}(.*)", re.MULTILINE)
    matches = list(opt_pattern.finditer(prompt_and_options))
    seen = {}
    for mo in matches:
        letter = mo.group(1)
        if letter not in seen:
            seen[letter] = mo.start()

    if len(seen) < 2:
        errors.append((f"q{qnum}-too-few-options", list(seen.keys())))
        continue

    first_opt_start = min(seen.values())
    prompt_text = prompt_and_options[:first_opt_start].strip()
    prompt_text = re.sub(
        r"Hinweis:\s*Diese Frage ist Teil einer Reihe von Fragen.*?angegebenen\s*\n?Ziele[^.]*\.\s*",
        "",
        prompt_text,
        flags=re.DOTALL,
    )
    prompt_text = re.sub(r"\n{2,}", "\n\n", prompt_text).strip()

    ordered_starts = sorted(seen.items(), key=lambda kv: kv[1])
    options = {}
    for i, (letter, start) in enumerate(ordered_starts):
        end = ordered_starts[i+1][1] if i+1 < len(ordered_starts) else len(prompt_and_options)
        chunk = prompt_and_options[start:end]
        chunk = re.sub(r"^\s{0,3}[A-F]\s{2,}", "", chunk)
        chunk = " ".join(chunk.split())
        options[letter] = strip_marker_artifact(chunk.strip())

    # Drop trailing empty options (e.g. an unused "F" placeholder)
    options = {k: v for k, v in options.items() if v}

    if not correct_letter or correct_letter not in options:
        errors.append((f"q{qnum}-bad-correct", correct_letter, list(options.keys())))
        continue

    questions.append({
        "number": qnum,
        "category": category,
        "type": "single",
        "prompt": " ".join(prompt_text.split()),
        "options": options,
        "correct": correct_letter,
        "explanation": " ".join(explanation.split()) if explanation else "",
        "reference": reference,
    })

questions.sort(key=lambda q: q["number"])

# Post-parse safety check: catch mangled matching-question fragments that
# slipped through as "valid" single-choice options. Better to drop a
# question here than ship wrong content in a real exam-prep tool.
clean_questions = []
dropped_for_qa = []
for q in questions:
    bad = False
    if q["type"] == "single":
        texts = list(q["options"].values())
        if len(texts) != len(set(t.strip() for t in texts)):
            bad = True
        if any(t.count(":") >= 2 for t in texts):
            bad = True
    else:
        texts = [s["text"] for s in q["statements"]]
        if len(texts) != len(set(t.strip() for t in texts)):
            bad = True
    if bad:
        dropped_for_qa.append(q["number"])
    else:
        clean_questions.append(q)

if dropped_for_qa:
    print(f"QA DROPPED (mangled matching content, needs manual review): {sorted(dropped_for_qa)}")
questions = clean_questions

print(f"Parsed OK: {len(questions)} / {len(blocks)}")
print(f"Errors: {len(errors)}")
for e in errors:
    print(e)

with open("parsed_q301_400.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)
