export type SimpleChatMessage = { role: "user" | "assistant"; content: string };

/** Human-readable language names (with English gloss) for building an
 * explicit "reply in this language" instruction. Used whenever the AI's
 * opening message can't infer the language from what the user typed
 * (e.g. an auto-generated greeting or interview opener) — otherwise the
 * model has no signal and defaults to German regardless of the site's
 * selected UI language. */
export const AI_LANGUAGE_NAMES: Record<string, string> = {
  de: "German (Deutsch)",
  en: "English",
  es: "Spanish (Español)",
  fr: "French (Français)",
  ru: "Russian (Русский)",
  tr: "Turkish (Türkçe)",
  uk: "Ukrainian (Українська)",
  ar: "Arabic (العربية)",
  fa: "Persian/Farsi (فارسی)",
};

export function languageInstruction(locale: string): string {
  const name = AI_LANGUAGE_NAMES[locale] ?? AI_LANGUAGE_NAMES.de;
  return `[Anweisung: Antworte in dieser Sprache: ${name}.]\n\n`;
}

export class AiCoachRequestError extends Error {
  isRateLimit: boolean;
  constructor(message: string, isRateLimit: boolean) {
    super(message);
    this.name = "AiCoachRequestError";
    this.isRateLimit = isRateLimit;
  }
}

/** Calls the real KI Coach backend (/api/ai-coach) with a message history
 * and returns the assistant's reply text. Throws AiCoachRequestError with a
 * user-facing German message on failure (network error, timeout, rate
 * limit, or provider error) so callers can display it directly.
 * `mode: "interview"` switches the backend to the interview-persona system
 * prompt (one question at a time, feedback, stays in character). */
export async function askAiCoach(
  messages: SimpleChatMessage[],
  options?: { timeoutMs?: number; mode?: "general" | "interview" }
): Promise<string> {
  const timeoutMs = options?.timeoutMs ?? 45_000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch("/api/ai-coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, mode: options?.mode ?? "general" }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await res.json();
    if (!res.ok) {
      throw new AiCoachRequestError(data.error ?? "Etwas ist schiefgelaufen.", res.status === 429);
    }
    return data.reply as string;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof AiCoachRequestError) throw err;
    const isTimeout = err instanceof DOMException && err.name === "AbortError";
    throw new AiCoachRequestError(
      isTimeout
        ? "Die Antwort hat zu lange gedauert. Bitte versuche es erneut."
        : "Der KI Coach ist gerade nicht erreichbar. Bitte versuche es erneut.",
      false
    );
  }
}
