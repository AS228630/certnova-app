import re

def parse_combinatorial_v2(section_text, correct_letter):
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
