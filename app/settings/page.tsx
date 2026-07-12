"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, Sun, Moon, Globe } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import AvatarUpload from "@/components/AvatarUpload";
import { useUser } from "@/components/UserContext";
import { useProfileStore } from "@/lib/store/profileStore";
import { useTheme } from "@/components/ThemeProvider";
import { useLocale } from "@/components/LocaleProvider";
import { LANGUAGES } from "@/components/LanguageSwitcher";
import { supabase } from "@/lib/supabase/client";
import { getFullName, getFirstName } from "@/lib/supabase/useUser";
import DeleteAccountButton from "@/components/settings/DeleteAccountButton";

function ProfileForm({ user, profile }: { user: NonNullable<ReturnType<typeof useUser>["user"]>; profile: ReturnType<typeof useProfileStore.getState>["profile"] }) {
  const { t } = useLocale();
  const [fullName, setFullName] = useState(profile?.full_name ?? getFullName(user));
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [location, setLocation] = useState(profile?.location ?? "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSaved(false);
    await useProfileStore.getState().updateFields(user.id, {
      full_name: fullName.trim() || null,
      bio: bio.trim() || null,
      location: location.trim() || null,
    });
    setSavingProfile(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  }

  return (
    <form onSubmit={handleSaveProfile} className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
      <h2 className="mb-4 font-bold text-text">{t("settings.profileSection")}</h2>

      <div className="mb-6 flex items-center gap-4">
        <AvatarUpload userId={user.id} initial={getFirstName(user).charAt(0).toUpperCase()} size={72} />
        <div>
          <p className="text-sm font-bold text-text">{getFullName(user)}</p>
          <p className="text-xs text-text-faint">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("settings.fullName")}</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("settings.location")}</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t("settings.locationPlaceholder")}
            className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("settings.bio")}</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          placeholder={t("settings.bioPlaceholder")}
          className="w-full resize-none rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={savingProfile}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {savingProfile && <Loader2 size={14} className="animate-spin" />}
          {t("settings.saveChanges")}
        </button>
        {profileSaved && (
          <span className="flex items-center gap-1 text-xs font-semibold text-success">
            <Check size={14} />
            {t("settings.saved")}
          </span>
        )}
      </div>
    </form>
  );
}

function SettingsBody() {
  const { user } = useUser();
  const { t, locale, setLocale, availableLocales } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const profile = useProfileStore((s) => s.profile);
  const profileLoading = useProfileStore((s) => s.loading);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSaved, setPasswordSaved] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSaved(false);
    if (newPassword.length < 8) {
      setPasswordError(t("settings.passwordTooShort"));
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(t("settings.passwordMismatch"));
      return;
    }
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);
    if (error) {
      setPasswordError(error.message);
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 2500);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  if (profileLoading || !user) {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <Loader2 size={22} className="animate-spin text-text-faint" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-3 sm:p-4 md:p-8">
      <div>
        <h1 className="text-xl font-extrabold text-text sm:text-2xl">{t("nav.settings")}</h1>
        <p className="mt-1 text-sm text-text-muted">{t("settings.subtitle")}</p>
      </div>

      {/* Profile — keyed so it remounts (and re-derives initial state) if the signed-in user ever changes */}
      <ProfileForm key={user.id} user={user} profile={profile} />

      {/* Password */}
      <form onSubmit={handleChangePassword} className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
        <h2 className="mb-4 font-bold text-text">{t("settings.passwordSection")}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("settings.newPassword")}</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("settings.confirmPassword")}</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        {passwordError && <p className="mt-3 text-xs font-medium text-danger">{passwordError}</p>}
        <div className="mt-5 flex items-center gap-3">
          <button
            type="submit"
            disabled={savingPassword}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {savingPassword && <Loader2 size={14} className="animate-spin" />}
            {t("settings.updatePassword")}
          </button>
          {passwordSaved && (
            <span className="flex items-center gap-1 text-xs font-semibold text-success">
              <Check size={14} />
              {t("settings.saved")}
            </span>
          )}
        </div>
      </form>

      {/* Preferences */}
      <div className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
        <h2 className="mb-4 font-bold text-text">{t("settings.preferencesSection")}</h2>

        <div className="flex items-center justify-between border-b border-border-soft py-3">
          <div className="flex items-center gap-2">
            {theme === "dark" ? <Moon size={16} className="text-text-muted" /> : <Sun size={16} className="text-text-muted" />}
            <span className="text-sm font-medium text-text">{t("sidebar.darkMode")}</span>
          </div>
          <button
            onClick={toggleTheme}
            aria-label={t("sidebar.darkMode")}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              theme === "dark" ? "bg-primary" : "bg-panel-alt"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                theme === "dark" ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="py-3">
          <div className="mb-2 flex items-center gap-2">
            <Globe size={16} className="text-text-muted" />
            <span className="text-sm font-medium text-text">{t("settings.language")}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {LANGUAGES.map((lang) => {
              const isAvailable = availableLocales.includes(lang.code);
              const active = locale === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => isAvailable && setLocale(lang.code)}
                  disabled={!isAvailable}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm ${
                    active
                      ? "border-primary bg-primary-light text-primary"
                      : isAvailable
                        ? "border-border-soft text-text hover:border-primary/40"
                        : "cursor-not-allowed border-border-soft text-text-faint"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="flex-1">{lang.label}</span>
                  {active && <Check size={14} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
        <h2 className="mb-4 font-bold text-text">{t("settings.accountSection")}</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleLogout}
            className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-bold text-text transition-colors hover:bg-panel-alt"
          >
            {t("nav.logout")}
          </button>
          <DeleteAccountButton />
        </div>
      </div>
    </main>
  );
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <SettingsBody />
    </DashboardShell>
  );
}
