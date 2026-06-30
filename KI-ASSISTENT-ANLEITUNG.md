# KI-Assistent einrichten — kostenlose Anleitung (Gemini + Cloudflare Worker)

Diese Anleitung verbindet deine Website mit Gemini (Google), **komplett kostenlos**, ohne dass dein API-Key jemals im Browser sichtbar wird.

> **Wichtig zu wissen, bevor du startest:** Microsoft Copilot hat **keine** kostenlose öffentliche API, die man auf einer eigenen Website einbinden kann — es gibt schlicht keinen "Copilot-API-Key" für Privatpersonen. Gemini dagegen hat eine echte kostenlose API (Google AI Studio). Deshalb nutzt diese Anleitung **nur Gemini** — im Frontend deiner Seite wird der Name aber nirgends angezeigt, der Chat heißt einfach "KI-Assistent".

## Warum brauche ich überhaupt einen "Worker"?

Ein API-Key, der direkt im HTML/JavaScript deiner Seite steht, ist für **jeden Besucher sichtbar** (einfach Rechtsklick → "Seitenquelltext anzeigen"). Jeder könnte deinen Key kopieren und dein kostenloses Kontingent verbrauchen. Ein Cloudflare Worker ist ein winziges, kostenloses Stück Code, das zwischen deiner Seite und Gemini sitzt: er kennt den Key, deine Seite nicht.

```
Besucher  →  deine Website (HTML)  →  Cloudflare Worker (kennt den Key)  →  Gemini API
```

---

## Schritt 1 — Gemini-API-Key holen (kostenlos)

1. Gehe zu **https://aistudio.google.com/app/apikey**
2. Mit einem Google-Konto anmelden
3. Auf **"Create API key"** klicken
4. Den Key kopieren (lange Zeichenkette) — du brauchst ihn in Schritt 4

Keine Kreditkarte nötig, keine Kosten im Rahmen der kostenlosen Limits.

---

## Schritt 2 — Kostenlosen Cloudflare-Account anlegen

1. Gehe zu **https://dash.cloudflare.com/sign-up**
2. Account erstellen (E-Mail + Passwort reicht, keine Zahlungsdaten nötig)
3. Im Dashboard links auf **"Workers & Pages"** klicken

---

## Schritt 3 — Den Worker erstellen

1. Auf **"Create"** → **"Workers"** → **"Create Worker"** klicken
2. Einen Namen vergeben, z. B. `certcoach-ai` (der Name wird Teil deiner URL)
3. Auf **"Deploy"** klicken (es entsteht erst ein leerer Standard-Worker)
4. Danach auf **"Edit code"** klicken — ein Code-Editor öffnet sich
5. **Den gesamten Inhalt löschen** und durch den Inhalt der Datei **`worker.js`** (im Anhang) ersetzen
6. Oben in der Datei `worker.js`, bei `ALLOWED_ORIGINS`, deine echte Domain eintragen, z. B.:
   ```js
   const ALLOWED_ORIGINS = [
     'https://www.certcoach.de',
     'https://certcoach.de',
   ];
   ```
7. Auf **"Deploy"** klicken

---

## Schritt 4 — Den API-Key sicher hinterlegen (als "Secret")

Der Key darf **nicht** direkt im Code stehen — er gehört in die sicheren Cloudflare-Einstellungen:

1. Im Worker auf **"Settings"** → **"Variables and Secrets"** gehen
2. **"Add"** klicken
3. Name: `GEMINI_API_KEY`
4. Wert: dein Key aus Schritt 1 einfügen
5. Typ: **"Secret"** auswählen (nicht "Plaintext" — Secrets sind verschlüsselt und für niemanden sichtbar, auch nicht für dich erneut)
6. Speichern / Deploy

---

## Schritt 5 — Die Worker-URL in deine Website eintragen

1. Auf der Worker-Übersichtsseite siehst du deine URL, z. B.:
   ```
   https://certcoach-ai.DEIN-NAME.workers.dev
   ```
2. Öffne die Datei **`index.html`** deiner Website
3. Suche die Zeile (ganz am Ende, im Abschnitt "KI-ASSISTENT WIDGET"):
   ```js
   var AI_WORKER_URL = 'https://DEIN-WORKER-NAME.DEIN-SUBDOMAIN.workers.dev/';
   ```
4. Ersetze sie durch deine echte URL aus Schritt 5.1

---

## Schritt 6 — Testen

1. Lade deine Website neu
2. Unten rechts solltest du den runden 🤖-Button sehen
3. Klicke darauf, stelle eine Testfrage (z. B. "Was ist IaaS?")
4. Wenn eine Antwort erscheint → fertig!

Falls eine Fehlermeldung kommt:
- Prüfe, ob die Worker-URL korrekt eingetragen ist (Tippfehler, fehlendes `/` am Ende)
- Prüfe in Cloudflare unter **"Logs"**, ob der Worker Anfragen erhält
- Prüfe, ob `GEMINI_API_KEY` korrekt als Secret hinterlegt ist
- Prüfe, ob deine Domain in `ALLOWED_ORIGINS` im Worker-Code steht

---

## Was du am Ende hast

- Ein Chat-Widget unten rechts, "KI-Assistent" genannt — **nirgends steht "Gemini" oder "Google"** im sichtbaren Text
- Jede Prüfungsfrage hat jetzt einen **"🤖 KI fragen"**-Button direkt neben "Kopieren" — ein Klick öffnet den Chat und lässt die KI die Frage direkt erklären, ohne dass der Nutzer etwas kopieren/einfügen muss
- Alles läuft im kostenlosen Rahmen:
  - Cloudflare Workers: 100.000 Anfragen/Tag kostenlos
  - Gemini (Flash-Modell): mehrere hundert bis 1.500 Anfragen/Tag kostenlos, je nach aktuellem Stand bei Google

## Wichtige Grenzen, die du kennen solltest

- Die kostenlosen Limits können sich bei Google jederzeit ändern (das ist in der Vergangenheit schon öfter passiert)
- Bei sehr vielen Besuchern gleichzeitig könnte das Tageslimit erreicht werden — dann zeigt der Chat eine Fehlermeldung, bis das Limit am nächsten Tag zurückgesetzt wird
- Google darf laut den Nutzungsbedingungen der kostenlosen Stufe die gestellten Fragen zur Verbesserung der eigenen Modelle verwenden — für eine reine Lernplattform mit allgemeinen IT-Fragen ist das in der Regel unproblematisch, aber gut zu wissen
