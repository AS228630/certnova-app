"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

function translateResetError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("password") && m.includes("least")) return "Das Passwort muss mindestens 8 Zeichen lang sein.";
  if (m.includes("same password")) return "Das neue Passwort muss sich vom alten unterscheiden.";
  return "Etwas ist schiefgelaufen. Bitte fordere einen neuen Link an.";
}

/**
 * Receives Supabase's password-recovery link (fired as a
 * PASSWORD_RECOVERY auth event once Supabase parses the token in the
 * URL) and lets the person actually set a new password —
 * AuthCard.tsx's "Passwort vergessen?" only ever called
 * resetPasswordForEmail() and told them "we sent you a link", but
 * nothing on the site could receive that link before this page existed.
 */
export default function UpdatePasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    // Supabase may have already processed the recovery token and fired
    // the event before this listener attached — a real existing
    // session at this point (reached only via the emailed link) means
    // we're genuinely in the recovery flow either way.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) return setError("Das Passwort muss mindestens 8 Zeichen lang sein.");
    if (password !== confirmPassword) return setError("Die Passwörter stimmen nicht überein.");

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) return setError(translateResetError(updateError.message));
    setDone(true);
    setTimeout(() => router.push("/dashboard"), 2000);
  }

  const inputClass =
    "w-full rounded-lg border border-border-soft bg-panel-alt px-3.5 py-2.5 pr-10 text-sm text-text placeholder:text-text-faint outline-none transition-colors focus:border-primary";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-bg px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo size={36} />
        </div>
        <div className="rounded-2xl border border-border-soft bg-panel p-6 shadow-xl sm:p-8">
          {done ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-light text-success">
                <CheckCircle2 size={26} />
              </div>
              <h1 className="mb-2 text-lg font-extrabold text-text">Passwort aktualisiert</h1>
              <p className="text-sm text-text-muted">Du wirst zu deinem Dashboard weitergeleitet…</p>
            </div>
          ) : !ready ? (
            <div className="text-center">
              <h1 className="mb-2 text-lg font-extrabold text-text">Link wird geprüft…</h1>
              <p className="text-sm text-text-muted">
                Falls hier nichts passiert, ist der Link eventuell abgelaufen.{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Zurück zur Anmeldung
                </Link>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h1 className="mb-1 text-lg font-extrabold text-text">Neues Passwort festlegen</h1>
              <p className="mb-5 text-sm text-text-muted">Wähle ein sicheres, neues Passwort für dein Konto.</p>

              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-semibold text-text-muted">Neues Passwort</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mindestens 8 Zeichen"
                    className={inputClass}
                    minLength={8}
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-muted"
                    aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-1.5 block text-xs font-semibold text-text-muted">Passwort bestätigen</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Passwort wiederholen"
                  className={inputClass.replace("pr-10", "pr-3.5")}
                  minLength={8}
                  required
                />
              </div>

              {error && <p className="mb-4 text-xs font-medium text-danger">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
              >
                {loading ? "Wird gespeichert…" : "Passwort speichern"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
