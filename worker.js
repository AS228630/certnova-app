/**
 * CertCoach KI-Assistent — Cloudflare Worker
 * ============================================
 * Dieser Worker ist die "Brücke" zwischen deiner Website und Gemini.
 * Er hält deinen Gemini-API-Key geheim — der Key wird NIE im Browser sichtbar.
 *
 * Einrichtung: siehe KI-ASSISTENT-ANLEITUNG.md
 */

// Erlaubte Domains, die diesen Worker aufrufen dürfen (CORS).
// Trage hier deine echte Domain ein, z.B. "https://www.certcoach.de"
const ALLOWED_ORIGINS = [
  'https://www.certcoach.de',
  'https://certcoach.de',
  // Für lokales Testen kannst du diese Zeile vorübergehend offen lassen:
  // '*',
];

const SYSTEM_PROMPT = `Du bist der KI-Assistent von CertCoach, einer Lernplattform für die Microsoft AZ-900 Prüfung (Azure Fundamentals).
Antworte immer auf Deutsch, klar und verständlich, wie ein guter Tutor.
Wenn der Nutzer eine Prüfungsfrage einfügt, erkläre die richtige Antwort und warum die anderen Optionen falsch sind — ohne die Frage einfach nur zu wiederholen.
Halte Antworten kompakt (max. ca. 150-200 Wörter), außer der Nutzer bittet ausdrücklich um mehr Details.
Nenne niemals den Namen des zugrunde liegenden KI-Modells oder Anbieters (sag z.B. nicht "ich bin Gemini" oder "von Google") — du bist einfach "der KI-Assistent von CertCoach".`;

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes('*') || ALLOWED_ORIGINS.includes(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
        status: 405,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    try {
      const body = await request.json();
      const history = Array.isArray(body.history) ? body.history : [];

      // Einfaches Sicherheitsnetz: Verlauf kürzen, falls zu lang
      const trimmedHistory = history.slice(-20);

      // In Gemini-Format umwandeln
      const contents = trimmedHistory.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(m.text || '').slice(0, 4000) }],
      }));

      if (contents.length === 0) {
        return new Response(JSON.stringify({ error: 'no_messages' }), {
          status: 400,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      const apiKey = env.GEMINI_API_KEY; // wird als "Secret" in Cloudflare gespeichert, siehe Anleitung
      const model = 'gemini-2.5-flash'; // schnell + im kostenlosen Kontingent

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 600,
            },
          }),
        }
      );

      if (!geminiRes.ok) {
        const errText = await geminiRes.text();
        console.log('Gemini error:', geminiRes.status, errText);
        return new Response(JSON.stringify({ error: 'upstream_error' }), {
          status: 502,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      const data = await geminiRes.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ||
        null;

      if (!reply) {
        return new Response(JSON.stringify({ error: 'empty_reply' }), {
          status: 502,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ reply }), {
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.log('Worker error:', err.message);
      return new Response(JSON.stringify({ error: 'server_error' }), {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }
  },
};
