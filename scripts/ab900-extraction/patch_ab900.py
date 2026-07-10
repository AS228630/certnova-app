"""
Post-processing patches for questions the automated parser couldn't
handle correctly due to unusual source-PDF formatting (verified by
manual inspection of the raw PDF text — see conversation record).
Run this AFTER parse_ab900.py on every re-run.
"""
import json

with open("ab900_parsed.json", encoding="utf-8") as f:
    data = json.load(f)

by_key = {(q["printed_num"], q["seq"]): q for q in data}


def find(printed_num, seq=None):
    for q in data:
        if q["printed_num"] == printed_num and (seq is None or q["seq"] == seq):
            return q
    return None


# Q33: source PDF has all-English options, then German intro, then German
# options — the option-block splitter mis-parsed the boundary. Content
# hand-extracted from the raw PDF text (see conversation record).
q = find(33)
if q:
    q["prompt"] = (
        "Compliance benötigt einen Bericht, der SharePoint-Websites auflistet, die "
        "hochsensible Dokumente enthalten, aber mit großen Gruppen wie „Jeder außer "
        "externen Benutzern\" geteilt werden. Welche Microsoft-Funktion ist dafür "
        "ausgelegt, Data Access Governance (DAG)-Berichte zu erstellen, die sensible "
        "Inhalte sowie eine nachsichtigere Freigabepraxis identifizieren?"
    )
    q["options"] = {
        "A": "Microsoft Entra ID Protection",
        "B": "Microsoft Purview Data Loss Prevention (DLP)",
        "C": "Microsoft Defender for Cloud Apps",
        "D": "SharePoint Advanced Management (SAM)",
    }
    q["correct"] = "D"

# Q57: source PDF's German statements each start with "A " as part of the
# grammatical article ("Eine Richtlinie...") not an option-letter marker,
# which broke the combinatorial parser's statement-vs-option-letter
# detection. Content hand-extracted from the raw PDF text.
q = find(57)
if q:
    q["type"] = "yesno"
    q["prompt"] = (
        'Sie bewerten Microsoft Purview-Lösungen. Wählen Sie für jede der folgenden '
        'Aussagen "Ja" aus, wenn die Aussage zutrifft. Andernfalls wählen Sie "Nein".'
    )
    q["statements"] = [
        {"text": "Eine Richtlinie zur Kommunikations-Compliance kann unangemessene Texte in Microsoft Teams-Nachrichten erkennen", "correct": "Ja"},
        {"text": "Eine Richtlinie zur Kommunikations-Compliance kann anstößige Sprache in Microsoft 365 Copilot-Eingabeaufforderungen erkennen", "correct": "Ja"},
        {"text": "Eine Richtlinie zur Kommunikations-Compliance kann verwendet werden, um E-Mail-Nachrichten 10 Jahre lang aufzubewahren", "correct": "Nein"},
    ]
    q.pop("options", None)
    q.pop("correct", None)

# Q62 (first occurrence, seq=70): source PDF genuinely has no intro
# sentence for this question — options start immediately after the
# number. A short, honest prompt is synthesized (not fabricated content —
# just a neutral framing of what's being compared) since leaving it blank
# would look broken in the UI.
q = find(62, seq=70)
if q:
    q["prompt"] = "Welche Aussage beschreibt Microsoft Defender XDR korrekt?"

# Q91: combinatorial yes/no whose statement-extraction regex truncated
# mid-sentence due to line-wrap interaction with the statement pattern.
# Content hand-extracted from the raw PDF text.
q = find(91)
if q:
    q["prompt"] = (
        'Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. '
        'Andernfalls wählen Sie "Nein". (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)'
    )
    q["statements"] = [
        {"text": "Eine Vertraulichkeitskennzeichnung kann auf eine Microsoft SharePoint-Website angewendet werden", "correct": "Ja"},
        {"text": "Eine Vertraulichkeitskennzeichnung kann auf eine E-Mail-Nachricht in Microsoft Exchange angewendet werden", "correct": "Ja"},
        {"text": "Eine Vertraulichkeitskennzeichnung kann auf Windows 11-Geräte angewendet werden", "correct": "Nein"},
    ]

# Q101: combinatorial yes/no mis-classified as single-choice because its
# prompt region was corrupted (the intro sentence was truncated and
# statement fragments leaked into what should have been the prompt).
# Content hand-extracted from the raw PDF text.
q = find(101)
if q:
    q["type"] = "yesno"
    q["prompt"] = (
        'Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. '
        'Andernfalls wählen Sie "Nein". (HINWEIS: Jede richtige Auswahl bringt einen Punkt.)'
    )
    q["statements"] = [
        {"text": "Microsoft Purview Communications Compliance kann beleidigende Texte in Bildern erkennen, die auf Microsoft SharePoint-Websites gespeichert sind", "correct": "Ja"},
        {"text": "Microsoft Purview Communications Compliance anonymisiert Benutzeridentitäten standardmäßig während Untersuchungen", "correct": "Ja"},
        {"text": "Microsoft Purview Communications Compliance fügt allen überwachten Kommunikationen einen Haftungsausschluss hinzu", "correct": "Nein"},
    ]
    q.pop("options", None)
    q.pop("correct", None)

# Q1: source PDF has no separate intro sentence — the three statements
# themselves ARE the question, with no framing text at all. Use the
# document's own standard instruction sentence (found verbatim elsewhere
# in this PDF) as the prompt.
q = find(1, seq=0)
if q:
    q["prompt"] = "Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein."

# Q12, Q19, Q39, Q51, Q58, Q72, Q74, Q103: combinatorial yes/no questions
# where the German option block's own formatting (a stray "Ein" instead of
# "A", or the correct-answer statements spanning many wrapped lines) broke
# automatic option-block detection, causing the English de_prompt_region to
# leak through. All content below is the German text hand-extracted
# directly from the raw PDF (see conversation record) — nothing invented.
STANDARD_YESNO_PROMPT = 'Für jede der folgenden Aussagen wählen Sie Ja, wenn die Aussage wahr ist. Andernfalls wählen Sie Nein. (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)'

q = find(12, seq=11)
if q:
    q["prompt"] = STANDARD_YESNO_PROMPT
    q["statements"] = [
        {"text": "Microsoft Defender für Office 365 bietet Schutz vor Phishing- und Malware-Angriffen", "correct": "Ja"},
        {"text": "Microsoft Defender für Identität überwacht Identitäten in Active-Directory-Domänen", "correct": "Ja"},
        {"text": "Microsoft Defender Schwachstellenmanagement bietet Schutz für Software-as-a-Service-(SaaS)-Anwendungen", "correct": "Nein"},
    ]

q = find(19, seq=18)
if q:
    q["prompt"] = STANDARD_YESNO_PROMPT
    q["statements"] = [
        {"text": "Microsoft Purview Compliance Manager bietet eine risikobasierte Compliance-Bewertung, um Ihnen zu helfen, Ihre Compliance-Situation zu verstehen", "correct": "Ja"},
        {"text": "Microsoft Purview Compliance Manager bietet Schritt-für-Schritt-Anleitungen zur Behebung von Compliance-Problemen", "correct": "Ja"},
        {"text": "Compliance Manager ist Teil von Microsoft Defender", "correct": "Nein"},
    ]

q = find(39, seq=43)
if q:
    q["prompt"] = STANDARD_YESNO_PROMPT
    q["statements"] = [
        {"text": "Der Microsoft 365 Copilot-Nutzungsbericht kann verwendet werden, um von Benutzern eingereichte Copilot-Prompts anzuzeigen", "correct": "Nein"},
        {"text": "Der Microsoft 365 Copilot-Nutzungsbericht zeigt die Gesamtzahl der eindeutigen Benutzer in Ihrer Organisation", "correct": "Ja"},
        {"text": "Der Microsoft 365 Copilot-Nutzungsbericht zeigt die Copilot-Nutzung jeder einzelnen Microsoft 365-App", "correct": "Ja"},
    ]

q = find(51, seq=58)
if q:
    q["prompt"] = STANDARD_YESNO_PROMPT
    q["statements"] = [
        {"text": "Administratoren können einen bestimmten Copilot-Agenten von allen Benutzern entfernen", "correct": "Ja"},
        {"text": "Vom Microsoft 365 Admin Center aus können Administratoren die Eingabeaufforderungen eines Copilot-Agenten konfigurieren", "correct": "Nein"},
        {"text": "Administratoren können Copilot-Agenten bestimmten Benutzern bereitstellen", "correct": "Ja"},
    ]

q = find(58, seq=65)
if q:
    q["prompt"] = STANDARD_YESNO_PROMPT
    q["statements"] = [
        {"text": "Aus der Copilot-Prompt-Galerie können Sie einen gespeicherten Prompt bearbeiten", "correct": "Ja"},
        {"text": "Aus der Copilot-Prompt-Galerie können Sie einen gespeicherten Prompt mit einem Microsoft Teams-Team teilen", "correct": "Ja"},
        {"text": "Sie können einen freigegebenen Link für einen Prompt erstellen, der NICHT in der Copilot-Prompt-Galerie gespeichert wurde", "correct": "Ja"},
    ]

q = find(72, seq=82)
if q:
    q["prompt"] = STANDARD_YESNO_PROMPT
    q["statements"] = [
        {"text": "Eingabeaufforderungen und Antworten, die von Benutzern in Microsoft 365 Copilot ausgegeben werden, werden von Microsoft zum Trainieren von Modellen verwendet", "correct": "Nein"},
        {"text": "Von Microsoft Graph abgerufene Inhalte werden von Microsoft zum Trainieren von Modellen verwendet", "correct": "Nein"},
        {"text": "Microsoft 365 Copilot respektiert die Sicherheitsberechtigungen in Ihrem Microsoft 365-Abonnement", "correct": "Ja"},
    ]

q = find(74, seq=84)
if q:
    q["prompt"] = STANDARD_YESNO_PROMPT
    q["statements"] = [
        {"text": "Benutzer, denen eine Microsoft 365 E5-Lizenz zugewiesen ist, können keine auf dem Web basierenden Microsoft 365 Copilot-Agenten erstellen", "correct": "Nein"},
        {"text": "Benutzer müssen eine Microsoft 365 Copilot-Lizenz zugewiesen bekommen, um den Analyst-Agenten zu verwenden", "correct": "Ja"},
        {"text": "Benutzer können eine natürliche Sprachaufforderung verwenden, um einen Microsoft 365 Copilot-Agenten zu erstellen", "correct": "Ja"},
    ]

q = find(103, seq=115)
if q:
    q["prompt"] = 'Wählen Sie für jede der folgenden Aussagen „Ja", wenn die Aussage wahr ist. Andernfalls wählen Sie „Nein". (HINWEIS: Jede richtige Auswahl bringt einen Punkt.)'
    q["statements"] = [
        {"text": "Administratoren können bestimmte Websites für die Nutzung durch Microsoft 365 Copilot sperren", "correct": "Ja"},
        {"text": "Administratoren können Microsoft 365 Copilot daran hindern, bei der Beantwortung von Benutzeranfragen die Websuche zu nutzen", "correct": "Ja"},
        {"text": "Administratoren können den Zugriff auf den Researcher-Agenten in Microsoft 365 Copilot sperren, während sie den Zugriff auf den Analyst-Agenten zulassen", "correct": "Ja"},
    ]

q = find(63, seq=72)
if q:
    q["prompt"] = 'Wählen Sie für jede der folgenden Aussagen "Ja", wenn die Aussage zutrifft. Andernfalls wählen Sie "Nein". (HINWEIS: Jede richtige Auswahl ist einen Punkt wert.)'

def full_text(q):
    parts = [q["prompt"]]
    if q["type"] == "single":
        parts += list(q.get("options", {}).values())
    else:
        parts += [s["text"] for s in q.get("statements", [])]
    return " ".join(parts).lower()

TOPIC_RULES = [
    ("copilot-grundlagen", ["copilot chat", "copilot studio", "notizbuch", "researcher", "analyst agent", "prompt", "eingabeaufforderung", "grounding", "semantisch", "weltwissen", "vortrainiert"]),
    ("copilot-agenten", ["agent1", "agenten", "agent-", "custom ai model", "benutzerdefiniertes ki-modell", "connector"]),
    ("sicherheit-identitaet", ["entra", "conditional access", "mfa", "authentifizierung", "pim", "privileged identity", "anmeld"]),
    ("purview-compliance", ["purview", "compliance", "vertraulichkeitskennzeichnung", "sensitivity label", "edp", "dlp", "data loss", "kommunikations-compliance", "insider-risiko", "ediscovery"]),
    ("verwaltung-governance", ["admin center", "admincenter", "lizenz", "rollout", "bericht", "report", "governance", "richtlinie", "policy"]),
    ("verantwortungsvolle-ki", ["responsible ai", "verantwortungsbewusst", "verantwortungsvoll", "fairness", "transparenz", "rechenschaft", "voreingenommenheit", "bias"]),
]

def assign_topic(q):
    text = full_text(q)
    for topic_id, keywords in TOPIC_RULES:
        if any(kw in text for kw in keywords):
            return topic_id
    return "copilot-grundlagen"

for q in data:
    q["topicId"] = assign_topic(q)

with open("ab900_parsed.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Patches applied. Total questions:", len(data))
