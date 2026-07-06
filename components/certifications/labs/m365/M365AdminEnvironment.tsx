"use client";

import { useState } from "react";
import {
  Home24Regular,
  People24Regular,
  PeopleTeam24Regular,
  DeviceMeetingRoom24Regular,
  Shield24Regular,
  Money24Regular,
  Settings24Regular,
  Alert24Regular,
  QuestionCircle24Regular,
  Search24Regular,
} from "@fluentui/react-icons";
import { UserPlus, RefreshCw, Trash2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useM365LabStore, M365_DOMAIN, M365_LICENSES, validateUsername } from "@/lib/store/m365LabStore";

const NAV_ITEMS = [
  { label: "Home", icon: Home24Regular },
  { label: "Benutzer", icon: People24Regular },
  { label: "Gruppen", icon: PeopleTeam24Regular },
  { label: "Geräte", icon: DeviceMeetingRoom24Regular },
  { label: "Sicherheit", icon: Shield24Regular },
  { label: "Abrechnung", icon: Money24Regular },
  { label: "Einstellungen", icon: Settings24Regular },
];

function AddUserDialog() {
  const closeCreateDialog = useM365LabStore((s) => s.closeCreateDialog);
  const createUser = useM365LabStore((s) => s.createUser);

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [license, setLicense] = useState<string>(M365_LICENSES[0]);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleUsernameChange(v: string) {
    setUsername(v);
    setLiveError(v ? validateUsername(v) : null);
  }

  function handleCreate() {
    const result = createUser(displayName, username, password, license);
    if (!result.ok) {
      setError(result.message);
      setSuccess(null);
    } else {
      setError(null);
      setSuccess(result.message);
    }
  }

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
      <div className="w-[400px] rounded border border-[#e1dfdd] bg-white shadow-lg">
        <div className="flex items-center justify-between bg-[#5b5fc7] px-3 py-2 text-white">
          <span className="text-[12px] font-semibold">Neuer Benutzer</span>
          <button onClick={closeCreateDialog}>
            <X size={14} />
          </button>
        </div>
        <div className="space-y-3 p-4">
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-[#242424]">
              Anzeigename <span className="text-[#c4314b]">*</span>
            </label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="z.B. Max Mustermann"
              className="w-full rounded border border-[#e1dfdd] px-2 py-1.5 text-[12px] outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold text-[#242424]">
              Benutzername <span className="text-[#c4314b]">*</span>
            </label>
            <div className="flex items-center gap-1">
              <input
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                placeholder="z.B. mmustermann"
                className="w-full rounded border px-2 py-1.5 text-[12px] outline-none"
                style={{ borderColor: liveError ? "#c4314b" : "#e1dfdd" }}
              />
              <span className="whitespace-nowrap text-[11px] text-[#605e5c]">@{M365_DOMAIN}</span>
            </div>
            {liveError && <p className="mt-1 text-[11px] text-[#c4314b]">{liveError}</p>}
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold text-[#242424]">
              Passwort <span className="text-[#c4314b]">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mindestens 8 Zeichen"
              className="w-full rounded border border-[#e1dfdd] px-2 py-1.5 text-[12px] outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold text-[#242424]">Produktlizenz zuweisen</label>
            <select
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="w-full rounded border border-[#e1dfdd] px-2 py-1.5 text-[12px] outline-none"
            >
              {M365_LICENSES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded border border-[#c4314b] p-2 text-[11px] text-[#c4314b]">
              <AlertCircle size={13} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-start gap-2 rounded border border-[#0f7b0f] p-2 text-[11px] text-[#0f7b0f]">
              <CheckCircle2 size={13} className="mt-0.5 shrink-0" />
              {success}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={closeCreateDialog}
              className="rounded border border-[#e1dfdd] px-3 py-1.5 text-[12px] text-[#242424]"
            >
              {success ? "Schließen" : "Abbrechen"}
            </button>
            {!success && (
              <button
                onClick={handleCreate}
                disabled={!displayName.trim() || !username.trim() || !!liveError}
                className="rounded bg-[#5b5fc7] px-3 py-1.5 text-[12px] font-semibold text-white disabled:opacity-40"
              >
                Benutzer erstellen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function M365AdminEnvironment() {
  const users = useM365LabStore((s) => s.users);
  const createDialogOpen = useM365LabStore((s) => s.createDialogOpen);
  const openCreateDialog = useM365LabStore((s) => s.openCreateDialog);
  const deleteUser = useM365LabStore((s) => s.deleteUser);

  return (
    <div className="relative rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border-soft bg-bg">
        <div className="overflow-x-auto">
          <div className="relative min-w-[900px] bg-white text-[#242424]">
            {createDialogOpen && <AddUserDialog />}

            <div className="flex items-center gap-3 bg-[#f3f2f1] px-3 py-1.5">
              <div className="flex items-center gap-1.5">
                <svg width="18" height="18" viewBox="0 0 23 23">
                  <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                  <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
                  <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
                  <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
                </svg>
                <span className="text-sm font-semibold text-[#242424]">Microsoft 365 Admin Center</span>
              </div>
              <div className="ml-2 flex h-7 flex-1 max-w-md items-center gap-2 rounded border border-[#e1dfdd] bg-white px-2">
                <Search24Regular fontSize={13} className="shrink-0 text-[#605e5c]" />
                <span className="truncate text-[11px] text-[#605e5c]">Suchen</span>
              </div>
              <div className="ml-auto flex items-center gap-3 text-[#605e5c]">
                <Alert24Regular fontSize={16} />
                <Settings24Regular fontSize={16} />
                <QuestionCircle24Regular fontSize={16} />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5b5fc7] text-[10px] font-bold text-white">
                  A
                </span>
              </div>
            </div>

            <div className="flex" style={{ height: 340 }}>
              <div className="w-48 shrink-0 overflow-y-auto border-r border-[#e1dfdd] bg-[#faf9f8] p-2 text-[12px]">
                {NAV_ITEMS.map((n, i) => (
                  <p
                    key={n.label}
                    className={`flex items-center gap-2 rounded px-2 py-1.5 ${
                      i === 1 ? "bg-[#e8e6fa] font-semibold text-[#5b5fc7]" : "text-[#242424] hover:bg-black/5"
                    }`}
                  >
                    <n.icon fontSize={16} style={{ color: i === 1 ? "#5b5fc7" : "#605e5c" }} />
                    {n.label}
                  </p>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <h2 className="mb-1 text-lg font-semibold text-[#242424]">Aktive Benutzer</h2>
                <p className="mb-3 text-[12px] text-[#605e5c]">
                  Verwalte Benutzerkonten, Lizenzen und Rollen für deine Organisation.
                </p>

                <div className="mb-3 flex items-center gap-2">
                  <button
                    onClick={openCreateDialog}
                    className="flex items-center gap-1.5 rounded bg-[#5b5fc7] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#4f52b2]"
                  >
                    <UserPlus size={13} />
                    Benutzer hinzufügen
                  </button>
                  <button className="flex items-center gap-1.5 rounded border border-[#e1dfdd] px-2.5 py-1.5 text-[12px] text-[#242424] hover:bg-black/5">
                    <RefreshCw size={12} />
                    Aktualisieren
                  </button>
                </div>

                <div className="rounded border border-[#e1dfdd]">
                  <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 border-b border-[#e1dfdd] bg-[#faf9f8] px-3 py-2 text-[11px] font-semibold text-[#605e5c]">
                    <span>Anzeigename</span>
                    <span>Benutzername</span>
                    <span>Lizenz</span>
                    <span></span>
                  </div>
                  <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-4 border-b border-[#e1dfdd] px-3 py-2.5 text-[12px] last:border-b-0">
                    <span className="font-medium text-[#5b5fc7]">CertCoach Admin</span>
                    <span className="text-[#242424]">admin@{M365_DOMAIN}</span>
                    <span className="text-[#242424]">Microsoft 365 E5</span>
                    <span />
                  </div>
                  {users.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-8 text-center">
                      <People24Regular fontSize={26} className="text-[#c8c6c4]" />
                      <p className="text-[12px] text-[#605e5c]">
                        Noch keine weiteren Benutzer angelegt. Klicke auf „Benutzer hinzufügen“.
                      </p>
                    </div>
                  ) : (
                    users.map((u) => (
                      <div
                        key={u.username}
                        className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-4 border-b border-[#e1dfdd] px-3 py-2.5 text-[12px] last:border-b-0"
                      >
                        <span className="font-medium text-[#5b5fc7]">{u.displayName}</span>
                        <span className="text-[#242424]">
                          {u.username}@{M365_DOMAIN}
                        </span>
                        <span className="text-[#242424]">{u.license}</span>
                        <button
                          onClick={() => deleteUser(u.username)}
                          title="Löschen"
                          className="rounded p-1 text-[#605e5c] hover:bg-black/5"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[#e1dfdd] bg-[#faf9f8] px-3 py-1.5 text-[10px] text-[#605e5c]">
              © 2026 Microsoft (Simulation)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
