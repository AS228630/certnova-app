import Link from "next/link";
import { CheckCircle2, Lock } from "lucide-react";

export type SampleQuestion = {
  prompt: string;
  options: { id: string; text: string }[];
  correct: string;
};

/**
 * Public, no-login sample questions shown on a certification's own
 * intro page (not the auth-gated /practice page) — real questions
 * pulled directly from the real practice bank by id (never duplicated/
 * retyped, so they can't drift out of sync), plus a CTA into the full,
 * login-required question bank. Paired with Quiz/Question JSON-LD in
 * the parent server component so these specific questions (and only
 * these) are crawlable and eligible for Google's Quiz rich results.
 */
export default function SampleQuiz({
  questions,
  companySlug,
  certId,
}: {
  questions: SampleQuestion[];
  companySlug: string;
  certId: string;
}) {
  if (questions.length === 0) return null;

  return (
    <div className="mt-8 rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
      <h2 className="mb-1 text-lg font-bold text-text">Beispiel-Fragen</h2>
      <p className="mb-5 text-sm text-text-faint">Ein kleiner Vorgeschmack aus dem echten Fragenpool — ohne Anmeldung.</p>

      <div className="space-y-5">
        {questions.map((q, qi) => (
          <div key={qi} className="rounded-xl border border-border-soft p-4">
            <p className="mb-3 text-sm font-semibold text-text">{q.prompt}</p>
            <div className="space-y-1.5">
              {q.options.map((opt) => {
                const isCorrect = opt.id === q.correct;
                return (
                  <div
                    key={opt.id}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                      isCorrect ? "border-success bg-success-light text-success" : "border-border-soft text-text-muted"
                    }`}
                  >
                    {isCorrect ? <CheckCircle2 size={13} className="shrink-0" /> : <span className="w-[13px] shrink-0" />}
                    <span className="font-semibold">{opt.id}.</span> {opt.text}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Link
        href={`/certifications/${companySlug}/${certId}/practice`}
        className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-dark"
      >
        <Lock size={14} />
        Zum vollständigen Fragenpool (kostenlos anmelden)
      </Link>
    </div>
  );
}
