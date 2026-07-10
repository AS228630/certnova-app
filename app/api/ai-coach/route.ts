import { NextRequest } from "next/server";

export const runtime = "nodejs";

// This route is the only place that knows which AI provider actually
// answers the user's question. The client never sees a provider name,
// model name, or API key — it only ever talks to "/api/ai-coach" and
// renders the reply under the "KI Coach" brand.
//
// Configure exactly one of these in your Vercel project's Environment
// Variables (Settings → Environment Variables), never in the codebase:
//   GEMINI_API_KEY      — from https://aistudio.google.com/apikey (free tier)
//   AZURE_OPENAI_API_KEY + AZURE_OPENAI_ENDPOINT + AZURE_OPENAI_DEPLOYMENT
//                        — from Azure AI Foundry
// If both are set, Gemini is tried first and Azure is used as a fallback
// if the Gemini call fails.

const SYSTEM_PROMPT = `Du bist der KI Coach von CertCoach, einer Lernplattform für IT-Zertifizierungen (Microsoft, AWS, Cisco, CompTIA u. a.) und Sprachkurse.

Antworte immer auf Deutsch, es sei denn, der Nutzer schreibt in einer anderen Sprache – dann antworte in dieser Sprache.

Dein Stil:
- Fachlich präzise, wie ein erfahrener deutschsprachiger IT-Dozent.
- Klar strukturiert: nutze Zwischenüberschriften, Aufzählungen und, wenn es das Thema verlangt, Vergleichstabellen.
- Praxisnah: erkläre Konzepte anhand realistischer Szenarien aus der IT-Praxis.
- Ermutigend und geduldig, nie herablassend.

Du hilfst beim Verstehen von Konzepten, beim Zusammenfassen von Lerninhalten, beim Erstellen von Übungsfragen und Lernplänen, und bei der Vorbereitung auf Vorstellungsgespräche.

Erwähne niemals, welches KI-Modell oder welcher Anbieter im Hintergrund läuft, selbst wenn danach gefragt wird — du bist schlicht "der KI Coach von CertCoach".`;

type ChatMessage = { role: "user" | "assistant"; content: string };

async function callGemini(messages: ChatMessage[], apiKey: string): Promise<string> {
  // Gemini's REST API uses "user"/"model" roles and a separate systemInstruction field.
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: { temperature: 0.6, maxOutputTokens: 2048 },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Gemini request failed (${res.status}): ${errText.slice(0, 300)}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("");
  if (!text) throw new Error("Gemini returned an empty response");
  return text;
}

async function callAzureOpenAI(
  messages: ChatMessage[],
  apiKey: string,
  endpoint: string,
  deployment: string
): Promise<string> {
  const url = `${endpoint.replace(/\/$/, "")}/openai/deployments/${deployment}/chat/completions?api-version=2024-08-01-preview`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.6,
      max_tokens: 2048,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Azure OpenAI request failed (${res.status}): ${errText.slice(0, 300)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Azure OpenAI returned an empty response");
  return text;
}

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Keine Nachricht übermittelt." }, { status: 400 });
  }
  // Keep the payload bounded — this is a server cost/abuse guard, not a UX limit.
  const trimmed = messages.slice(-30);

  const geminiKey = process.env.GEMINI_API_KEY;
  const azureKey = process.env.AZURE_OPENAI_API_KEY;
  const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT;

  if (!geminiKey && !(azureKey && azureEndpoint && azureDeployment)) {
    return Response.json(
      {
        error:
          "Der KI Coach ist noch nicht eingerichtet. Ein Administrator muss GEMINI_API_KEY oder die Azure-OpenAI-Variablen in den Umgebungsvariablen setzen.",
      },
      { status: 503 }
    );
  }

  let reply: string | null = null;
  let lastError: unknown = null;

  if (geminiKey) {
    try {
      reply = await callGemini(trimmed, geminiKey);
    } catch (err) {
      lastError = err;
    }
  }

  if (!reply && azureKey && azureEndpoint && azureDeployment) {
    try {
      reply = await callAzureOpenAI(trimmed, azureKey, azureEndpoint, azureDeployment);
    } catch (err) {
      lastError = err;
    }
  }

  if (!reply) {
    console.error("AI Coach provider error:", lastError);
    return Response.json(
      { error: "Der KI Coach ist gerade nicht erreichbar. Bitte versuche es in Kürze erneut." },
      { status: 502 }
    );
  }

  return Response.json({ reply });
}
