"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Diamond, User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { FaGoogle, FaGithub, FaMicrosoft } from "react-icons/fa";
import { supabase } from "@/lib/supabase/client";
import AuthHero from "@/components/AuthHero";

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

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const strength = passwordStrength(password);

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
    "w-full rounded-lg border border-border-soft bg-panel-alt px-3.5 py-2.5 text-sm text-text placeholder:text-text-faint outline-none transition-colors focus:border-primary";

  return (
    <div className="flex min-h-screen w-full bg-bg">
      <AuthHero />

      <div className="flex w-full flex-1 items-center justify-center p-4 sm:p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile-only logo */}
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <Diamond size={22} className="fill-primary text-primary" />
            <span className="text-lg font-bold tracking-tight text-text">CertCoach</span>
          </div>

          <h1 className="text-2xl font-bold text-text">Willkommen bei CertCoach 👋</h1>
          <p className="mt-1 text-sm text-text-muted">
            {mode === "register"
              ? "Erstelle dein Konto und starte deine Lernreise."
              : "Melde dich an, um deine Lernreise fortzusetzen."}
          </p>

          {/* Tabs */}
          <div className="mt-6 grid grid-cols-2 gap-1 rounded-lg border border-border-soft bg-panel-alt p-1">
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`rounded-md py-2 text-sm font-bold transition-colors ${
                mode === "register" ? "bg-primary text-white" : "text-text-muted hover:text-text"
              }`}
            >
              Registrieren
            </button>
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`rounded-md py-2 text-sm font-bold transition-colors ${
                mode === "login" ? "bg-primary text-white" : "text-text-muted hover:text-text"
              }`}
            >
              Anmelden
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</p>
          )}
          {info && (
            <p className="mt-4 rounded-lg bg-success/10 p-3 text-sm text-success">{info}</p>
          )}

          <form
            onSubmit={mode === "register" ? handleRegister : handleLogin}
            className="mt-5 space-y-4"
          >
            {mode === "register" && (
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-text-muted">
                  <User size={13} /> Vollständiger Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="z.B. Arman Sediqi"
                  className={inputClass}
                  required
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-text-muted">
                <Mail size={13} /> E-Mail Adresse
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="z.B. arman@example.com"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-text-muted">
                <Lock size={13} /> Passwort
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mindestens 8 Zeichen"
                  className={`${inputClass} pr-10`}
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
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-text-muted">
                    <Lock size={13} /> Passwort bestätigen
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Passwort wiederholen"
                      className={`${inputClass} pr-10`}
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
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {loading
                ? "Einen Moment …"
                : mode === "register"
                ? "Konto erstellen"
                : "Anmelden"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border-soft" />
            <span className="text-xs text-text-faint">
              {mode === "register" ? "oder registriere dich mit" : "oder melde dich an mit"}
            </span>
            <div className="h-px flex-1 bg-border-soft" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2 rounded-lg border border-border-soft bg-panel-alt py-2.5 text-sm font-semibold text-text transition-colors hover:bg-panel disabled:opacity-60"
            >
              <FaGoogle size={14} />
              <span className="hidden sm:inline">Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("github")}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2 rounded-lg border border-border-soft bg-panel-alt py-2.5 text-sm font-semibold text-text transition-colors hover:bg-panel disabled:opacity-60"
            >
              <FaGithub size={14} />
              <span className="hidden sm:inline">GitHub</span>
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("azure")}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2 rounded-lg border border-border-soft bg-panel-alt py-2.5 text-sm font-semibold text-text transition-colors hover:bg-panel disabled:opacity-60"
            >
              <FaMicrosoft size={14} />
              <span className="hidden sm:inline">Microsoft</span>
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-text-faint">
            {mode === "register" ? (
              <>
                Mit der Registrierung stimmst du unseren{" "}
                <a href="/agb" className="font-semibold text-primary hover:underline">AGB</a> und{" "}
                <a href="/datenschutz" className="font-semibold text-primary hover:underline">
                  Datenschutzbestimmungen
                </a>{" "}
                zu.
              </>
            ) : (
              <>
                Noch kein Konto?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="font-semibold text-primary hover:underline"
                >
                  Registrieren
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
