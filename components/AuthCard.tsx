"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Diamond, User, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CreditCard, Star, Check } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import AuthHero from "@/components/AuthHero";

function MicrosoftLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 23 23">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

type Mode = "register" | "login";

function passwordStrength(pw: string): { label: string; score: number; color: string } {
  if (!pw) return { label: "Schwach", score: 1, color: "bg-danger" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { label: "Schwach", score: 1, color: "bg-danger" };
  if (score <= 2) return { label: "Mittel", score: 2, color: "bg-warning" };
  return { label: "Stark", score: 3, color: "bg-success" };
}

function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("already registered") || m.includes("already exists"))
    return "Für diese E-Mail-Adresse existiert bereits ein Konto.";
  if (m.includes("invalid login credentials"))
    return "E-Mail oder Passwort ist falsch.";
  if (m.includes("email not confirmed"))
    return "Bitte bestätige zuerst deine E-Mail-Adresse.";
  if (m.includes("password") && m.includes("least"))
    return "Das Passwort muss mindestens 8 Zeichen lang sein.";
  if (m.includes("rate limit"))
    return "Zu viele Versuche. Bitte warte einen Moment.";
  return "Etwas ist schiefgelaufen. Bitte versuche es erneut.";
}

export default function AuthCard({ initialMode }: { initialMode: Mode }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initialMode);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const strength = passwordStrength(password);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/dashboard");
    });
  }, [router]);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setInfo(null);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!fullName.trim()) return setError("Bitte gib deinen vollständigen Namen ein.");
    if (password.length < 8) return setError("Das Passwort muss mindestens 8 Zeichen lang sein.");
    if (password !== confirmPassword) return setError("Die Passwörter stimmen nicht überein.");

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (signUpError) {
      setLoading(false);
      return setError(translateAuthError(signUpError.message));
    }

    if (data.user) {
      // Best-effort profile row; ignored if a DB trigger already handles this or RLS blocks it.
      try {
        await supabase
          .from("profiles")
          .upsert({ id: data.user.id, full_name: fullName, email }, { onConflict: "id" });
      } catch {
        // non-fatal
      }
    }

    setLoading(false);

    if (!data.session) {
      setInfo("Fast geschafft! Wir haben dir einen Bestätigungslink per E-Mail geschickt.");
      return;
    }

    router.push("/dashboard");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (signInError) return setError(translateAuthError(signInError.message));

    router.push("/dashboard");
  }

  async function handleOAuth(provider: "google" | "github" | "azure") {
    setError(null);
    setOauthLoading(provider);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (oauthError) {
      setOauthLoading(null);
      setError(translateAuthError(oauthError.message));
    }
    // On success, Supabase redirects the browser away — no further action needed here.
  }

  const inputClass =
    "w-full rounded-lg border border-border-soft bg-panel-alt px-3.5 py-2.5 pr-10 text-sm text-text placeholder:text-text-faint outline-none transition-colors focus:border-primary";

  return (
    <div className="min-h-screen w-full bg-bg">
      {/* Shared top bar */}
      <header className="border-b border-border-soft">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Diamond size={22} className="fill-primary text-primary" />
            <span className="text-lg font-bold tracking-tight text-text">CertCoach</span>
          </Link>
          <p className="text-sm text-text-muted">
            {mode === "register" ? (
              <>
                Bereits ein Konto?{" "}
                <button type="button" onClick={() => switchMode("login")} className="font-semibold text-primary hover:underline">
                  Anmelden
                </button>
              </>
            ) : (
              <>
                Neu hier?{" "}
                <button type="button" onClick={() => switchMode("register")} className="font-semibold text-primary hover:underline">
                  Jetzt registrieren
                </button>
              </>
            )}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-16">
        <AuthHero mode={mode} />

        <div className="w-full">
          <div className="rounded-2xl border border-border-soft bg-panel p-6 shadow-xl sm:p-8">
            <h2 className="text-center text-xl font-extrabold text-text sm:text-2xl">
              {mode === "register" ? "Konto erstellen" : "Willkommen zurück"}
            </h2>

            {error && (
              <p className="mt-4 rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</p>
            )}
            {info && (
              <p className="mt-4 rounded-lg bg-success/10 p-3 text-sm text-success">{info}</p>
            )}

            {/* OAuth buttons — stacked, real brand marks */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => handleOAuth("google")}
                disabled={oauthLoading !== null}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-border-soft bg-panel-alt py-2.5 text-sm font-semibold text-text transition-colors hover:bg-panel disabled:opacity-60"
              >
                <FcGoogle size={18} />
                Mit Google fortfahren
              </button>
              <button
                type="button"
                onClick={() => handleOAuth("github")}
                disabled={oauthLoading !== null}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-border-soft bg-panel-alt py-2.5 text-sm font-semibold text-text transition-colors hover:bg-panel disabled:opacity-60"
              >
                <FaGithub size={18} />
                Mit GitHub fortfahren
              </button>
              <button
                type="button"
                onClick={() => handleOAuth("azure")}
                disabled={oauthLoading !== null}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-border-soft bg-panel-alt py-2.5 text-sm font-semibold text-text transition-colors hover:bg-panel disabled:opacity-60"
              >
                <MicrosoftLogo size={16} />
                Mit Microsoft fortfahren
              </button>
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border-soft" />
              <span className="text-xs text-text-faint">
                {mode === "register" ? "oder registriere dich mit E-Mail" : "oder melde dich an mit E-Mail"}
              </span>
              <div className="h-px flex-1 bg-border-soft" />
            </div>

            <form
              onSubmit={mode === "register" ? handleRegister : handleLogin}
              className="space-y-4"
            >
              {mode === "register" && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text-muted">
                    Vollständiger Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="z.B. Arman Semmas"
                      className={inputClass}
                      required
                    />
                    <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint" />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text-muted">
                  E-Mail Adresse
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="z.B. arman@example.com"
                    className={inputClass}
                    required
                  />
                  <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text-muted">
                  Passwort
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mindestens 8 Zeichen"
                    className={inputClass}
                    minLength={8}
                    required
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

              {mode === "register" && (
                <>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-text-muted">
                      Passwort bestätigen
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Passwort erneut eingeben"
                        className={inputClass}
                        minLength={8}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-muted"
                        aria-label={showConfirmPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {password && (
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-faint">Passwortstärke:</span>
                        <span className="font-semibold text-text-muted">{strength.label}</span>
                      </div>
                      <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-1.5 rounded-full ${
                              i <= strength.score ? strength.color : "bg-panel-alt"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <label className="flex items-start gap-2.5 text-xs text-text-muted">
                    <button
                      type="button"
                      onClick={() => setAcceptTerms((v) => !v)}
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                        acceptTerms ? "border-primary bg-primary" : "border-border-soft"
                      }`}
                      aria-pressed={acceptTerms}
                    >
                      {acceptTerms && <Check size={11} className="text-white" />}
                    </button>
                    <span>
                      Ich akzeptiere die{" "}
                      <a href="/agb" className="font-semibold text-primary hover:underline">Nutzungsbedingungen</a>{" "}
                      und{" "}
                      <a href="/datenschutz" className="font-semibold text-primary hover:underline">
                        Datenschutzrichtlinie
                      </a>
                    </span>
                  </label>
                </>
              )}

              {mode === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!email) return setError("Gib zuerst deine E-Mail-Adresse ein.");
                      setError(null);
                      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
                      if (resetError) setError(translateAuthError(resetError.message));
                      else setInfo("Wir haben dir einen Link zum Zurücksetzen geschickt.");
                    }}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Passwort vergessen?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || (mode === "register" && !acceptTerms)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Einen Moment …"
                  : mode === "register"
                  ? "Konto erstellen"
                  : "Anmelden"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            <p className="mt-5 flex items-start gap-2 text-xs text-text-faint">
              <Lock size={13} className="mt-0.5 shrink-0" />
              Deine Daten sind bei uns sicher. Wir geben deine Daten niemals an Dritte weiter.
            </p>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="border-t border-border-soft">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-6 sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <Lock size={13} className="text-success" /> SSL Verschlüsselt
          </span>
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <CreditCard size={13} className="text-primary" /> Sichere Zahlung
          </span>
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <ShieldCheck size={13} className="text-sky-400" /> GDPR Konform
          </span>
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <Star size={13} className="text-warning" /> Trusted by 100.000+ Lernende
          </span>
        </div>
      </div>
    </div>
  );
}
