import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

const INTERVIEW_SYSTEM_PROMPT = `Du bist der KI-Interviewer von CertCoach und führst ein realistisches Mock-Interview für eine IT-Stelle in Deutschland.

Regeln:
- Antworte immer auf Deutsch, es sei denn, der Nutzer schreibt in einer anderen Sprache.
- Stelle IMMER nur EINE Frage pro Nachricht, wie in einem echten Interview. Warte auf die Antwort des Nutzers, bevor du die nächste Frage stellst.
- Nach der Antwort des Nutzers auf eine Frage: gib eine kurze, konstruktive Rückmeldung (1-3 Sätze) — was war gut, was könnte präziser sein — bevor du zur nächsten Frage übergehst.
- Passe den Schwierigkeitsgrad und die Art der Fragen an die im Kontext angegebene Zielposition und das gewählte Thema an (technisch, HR/Verhalten, oder Praxisszenario).
- Bleib während des gesamten Gesprächs im Charakter eines professionellen, aber freundlichen Interviewers — nicht als Lehrer, sondern als jemand, der wirklich eine Einstellungsentscheidung vorbereitet.
- Wenn die Nachricht des Nutzers das Tag "[END_INTERVIEW]" enthält (unabhängig von sonstigem Text), fasse in 3-5 Sätzen zusammen, wie er sich geschlagen hat, mit konkreten Stärken und einem konkreten Verbesserungsvorschlag — in der Sprache, in der das Interview bisher geführt wurde.

Erwähne niemals, welches KI-Modell oder welcher Anbieter im Hintergrund läuft, selbst wenn danach gefragt wird.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

async function callGemini(messages: ChatMessage[], apiKey: string, systemPrompt: string): Promise<string> {
  // Gemini's REST API uses "user"/"model" roles and a separate systemInstruction field.
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  // Google now issues newer "Auth key" API keys (prefixed "AQ.") by default
  // instead of the older "AIzaSy..." Standard keys. AQ. keys are rejected
  // when passed as the `?key=` query parameter (401 UNAUTHENTICATED /
  // ACCESS_TOKEN_TYPE_UNSUPPORTED) — they must be sent via the
  // `X-goog-api-key` header instead. The header form works for both key
  // formats, so we always use it.
  const res = await fetch(
    // gemini-2.0-flash was deprecated on June 1, 2026 — gemini-2.5-flash is
    // the current free-tier-eligible replacement (as of this writing; check
    // https://ai.google.dev/gemini-api/docs/models for the latest).
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { temperature: 0.6, maxOutputTokens: 2048 },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    if (res.status === 429) {
      const err = new Error(`Gemini rate limit: ${errText.slice(0, 300)}`);
      err.name = "RateLimitError";
      throw err;
    }
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
  deployment: string,
  systemPrompt: string
): Promise<string> {
  const url = `${endpoint.replace(/\/$/, "")}/openai/deployments/${deployment}/chat/completions?api-version=2024-08-01-preview`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      messages: [{ role: "system", content: systemPrompt }, ...messages],
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
  let body: { messages?: ChatMessage[]; mode?: "general" | "interview"; accessToken?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Require a real, logged-in user — this endpoint calls a paid external
  // API on our behalf, so it must never be reachable anonymously (someone
  // could otherwise script requests directly against it and drain our
  // Gemini/Azure quota with no cost to themselves).
  if (!body.accessToken) {
    return Response.json({ error: "Bitte melde dich an, um den KI Coach zu nutzen." }, { status: 401 });
  }
  const authSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
  const {
    data: { user },
  } = await authSupabase.auth.getUser(body.accessToken);
  if (!user) {
    return Response.json({ error: "Bitte melde dich an, um den KI Coach zu nutzen." }, { status: 401 });
  }

  // Simple per-user abuse guard: count this user's own messages sent in
  // the last hour (using the same ai_messages table the chat UI already
  // writes to) and block once a generous ceiling is hit. This is a cost
  // control, not a product limit — real usage should never come close.
  const RATE_LIMIT_PER_HOUR = 60;
  const serviceSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  );
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await serviceSupabase
    .from("ai_messages")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("role", "user")
    .gte("created_at", oneHourAgo);

  if ((count ?? 0) >= RATE_LIMIT_PER_HOUR) {
    return Response.json(
      { error: "Du hast das stündliche Nachrichtenlimit des KI Coach erreicht. Bitte versuche es später erneut." },
      { status: 429 }
    );
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Keine Nachricht übermittelt." }, { status: 400 });
  }
  // Keep the payload bounded — this is a server cost/abuse guard, not a UX limit.
  const trimmed = messages.slice(-30);
  const systemPrompt = body.mode === "interview" ? INTERVIEW_SYSTEM_PROMPT : SYSTEM_PROMPT;

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
      reply = await callGemini(trimmed, geminiKey, systemPrompt);
    } catch (err) {
      lastError = err;
    }
  }

  if (!reply && azureKey && azureEndpoint && azureDeployment) {
    try {
      reply = await callAzureOpenAI(trimmed, azureKey, azureEndpoint, azureDeployment, systemPrompt);
    } catch (err) {
      lastError = err;
    }
  }

  if (!reply) {
    console.error("AI Coach provider error:", lastError);
    const isRateLimit = lastError instanceof Error && lastError.name === "RateLimitError";
    return Response.json(
      {
        error: isRateLimit
          ? "Das kostenlose Nutzungslimit des KI Coach ist für den Moment erreicht. Bitte versuche es in ein paar Minuten erneut."
          : "Der KI Coach ist gerade nicht erreichbar. Bitte versuche es in Kürze erneut.",
      },
      { status: isRateLimit ? 429 : 502 }
    );
  }

  return Response.json({ reply });
}
