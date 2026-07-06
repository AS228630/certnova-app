"use client";

import { useState } from "react";
import {
  Folder24Regular,
  Building24Regular,
  Person24Regular,
  Desktop24Regular,
  Server24Regular,
  Search24Regular,
  ArrowSync24Regular,
} from "@fluentui/react-icons";
import { UserPlus, Trash2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useAdLabStore, AD_OUS, DOMAIN_SUFFIX, validateLogonName } from "@/lib/store/adLabStore";

const BUILT_IN_OBJECTS: Record<string, { name: string; type: string; description: string }[]> = {
  Users: [
    { name: "Administrator", type: "Benutzer", description: "Integriertes Administratorkonto" },
    { name: "Domain Admins", type: "Sicherheitsgruppe", description: "Designierte Administratoren der Domäne" },
    { name: "Domain Users", type: "Sicherheitsgruppe", description: "Alle Domänenbenutzer" },
  ],
  Computers: [],
  "Domain Controllers": [{ name: "CC-DC01", type: "Computer", description: "Primärer Domänencontroller" }],
  "IT-Abteilung (OU)": [],
};

function NewUserDialog() {
  const closeCreateDialog = useAdLabStore((s) => s.closeCreateDialog);
  const createUser = useAdLabStore((s) => s.createUser);
  const selectedOu = useAdLabStore((s) => s.selectedOu);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [logonName, setLogonName] = useState("");
  const [liveError, setLiveError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleLogonChange(v: string) {
    setLogonName(v);
    setLiveError(v ? validateLogonName(v) : null);
  }

  function handleCreate() {
    const result = createUser(firstName, lastName, logonName);
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
      <div className="w-[380px] rounded border border-[#c8c8c8] bg-white shadow-lg">
        <div className="flex items-center justify-between bg-[#0a3d91] px-3 py-2 text-white">
          <span className="text-[12px] font-semibold">Neues Objekt – Benutzer</span>
          <button onClick={closeCreateDialog}>
            <X size={14} />
          </button>
        </div>
        <div className="space-y-3 p-4">
          <p className="text-[11px] text-[#605e5c]">
            Erstellt in: <span className="font-medium text-[#1f1f1f]">{selectedOu}</span>
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-[#1f1f1f]">
                Vorname <span className="text-[#d13212]">*</span>
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded border border-[#c8c8c8] px-2 py-1.5 text-[12px] outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-[#1f1f1f]">
                Nachname <span className="text-[#d13212]">*</span>
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded border border-[#c8c8c8] px-2 py-1.5 text-[12px] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold text-[#1f1f1f]">
              Benutzeranmeldename <span className="text-[#d13212]">*</span>
            </label>
            <div className="flex items-center gap-1">
              <input
                value={logonName}
                onChange={(e) => handleLogonChange(e.target.value)}
                placeholder="z.B. mmustermann"
                className="w-full rounded border px-2 py-1.5 text-[12px] outline-none"
                style={{ borderColor: liveError ? "#d13212" : "#c8c8c8" }}
              />
              <span className="whitespace-nowrap text-[11px] text-[#605e5c]">@{DOMAIN_SUFFIX}</span>
            </div>
            <p className="mt-1 text-[11px]" style={{ color: liveError ? "#d13212" : "#605e5c" }}>
              {liveError ?? "Max. 20 Zeichen, keine Leerzeichen oder Sonderzeichen."}
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded border border-[#d13212] p-2 text-[11px] text-[#d13212]">
              <AlertCircle size={13} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-start gap-2 rounded border border-[#1d8102] p-2 text-[11px] text-[#1d8102]">
              <CheckCircle2 size={13} className="mt-0.5 shrink-0" />
              {success}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={closeCreateDialog}
              className="rounded border border-[#c8c8c8] px-3 py-1.5 text-[12px] text-[#1f1f1f]"
            >
              {success ? "Schließen" : "Abbrechen"}
            </button>
            {!success && (
              <button
                onClick={handleCreate}
                disabled={!firstName.trim() || !lastName.trim() || !logonName.trim() || !!liveError}
                className="rounded bg-[#0a3d91] px-3 py-1.5 text-[12px] font-semibold text-white disabled:opacity-40"
              >
                Erstellen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActiveDirectoryMockEnvironment() {
  const selectedOu = useAdLabStore((s) => s.selectedOu);
  const selectOu = useAdLabStore((s) => s.selectOu);
  const users = useAdLabStore((s) => s.users);
  const createDialogOpen = useAdLabStore((s) => s.createDialogOpen);
  const openCreateDialog = useAdLabStore((s) => s.openCreateDialog);
  const deleteUser = useAdLabStore((s) => s.deleteUser);

  const usersInOu = users.filter((u) => u.ou === selectedOu);
  const objectsInOu = [
    ...(BUILT_IN_OBJECTS[selectedOu] ?? []),
    ...usersInOu.map((u) => ({
      name: `${u.firstName} ${u.lastName}`,
      type: "Benutzer",
      description: `${u.logonName}@${DOMAIN_SUFFIX}`,
    })),
  ];

  return (
    <div className="relative rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border-soft bg-bg">
        <div className="overflow-x-auto">
          <div className="relative min-w-[900px] bg-[#f0f0f0] text-[#1f1f1f]">
            {createDialogOpen && <NewUserDialog />}

            <div className="flex items-center gap-2 bg-[#0a3d91] px-3 py-1.5 text-white">
              <Server24Regular fontSize={16} />
              <span className="text-sm font-semibold">Active Directory-Benutzer und -Computer</span>
            </div>

            <div className="flex items-center gap-3 border-b border-[#c8c8c8] bg-[#f3f3f3] px-3 py-1.5 text-[12px] text-[#1f1f1f]">
              <button onClick={openCreateDialog} className="flex items-center gap-1.5 hover:text-[#0a3d91]">
                <UserPlus size={13} />
                Neuer Benutzer
              </button>
              <span className="flex items-center gap-1.5 text-[#605e5c]">
                <ArrowSync24Regular fontSize={14} />
                Aktualisieren
              </span>
              <div className="ml-auto flex h-7 w-56 items-center gap-2 rounded border border-[#c8c8c8] bg-white px-2">
                <Search24Regular fontSize={12} className="text-[#605e5c]" />
                <span className="text-[11px] text-[#605e5c]">Suchen</span>
              </div>
            </div>

            <div className="flex" style={{ height: 340 }}>
              <div className="w-56 shrink-0 overflow-y-auto border-r border-[#c8c8c8] bg-white p-2 text-[12px]">
                <p className="flex items-center gap-2 rounded py-1.5 pr-2 pl-2 text-[#1f1f1f]">
                  <Building24Regular fontSize={15} style={{ color: "#605e5c" }} />
                  {DOMAIN_SUFFIX}
                </p>
                {AD_OUS.map((ou) => {
                  const Icon = ou === "Users" ? Person24Regular : ou === "Computers" ? Desktop24Regular : ou === "Domain Controllers" ? Server24Regular : Folder24Regular;
                  const active = ou === selectedOu;
                  return (
                    <button
                      key={ou}
                      onClick={() => selectOu(ou)}
                      style={{ paddingLeft: 24 }}
                      className={`flex w-full items-center gap-2 rounded py-1.5 pr-2 text-left ${
                        active ? "bg-[#cce4f7] font-semibold text-[#0a3d91]" : "text-[#1f1f1f] hover:bg-black/5"
                      }`}
                    >
                      <Icon fontSize={15} style={{ color: active ? "#0a3d91" : "#605e5c" }} />
                      {ou}
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 overflow-y-auto bg-white p-4">
                <h2 className="mb-1 text-base font-semibold text-[#1f1f1f]">{selectedOu}</h2>
                <p className="mb-3 text-[12px] text-[#605e5c]">
                  {objectsInOu.length} Objekt{objectsInOu.length === 1 ? "" : "e"} in dieser Organisationseinheit (OU).
                </p>

                <div className="rounded border border-[#c8c8c8]">
                  <div className="grid grid-cols-[1fr_1fr_1.4fr_auto] gap-4 border-b border-[#c8c8c8] bg-[#f3f3f3] px-3 py-2 text-[11px] font-semibold text-[#605e5c]">
                    <span>Name</span>
                    <span>Typ</span>
                    <span>Beschreibung</span>
                    <span></span>
                  </div>
                  {objectsInOu.length === 0 ? (
                    <div className="p-4 text-center text-[12px] text-[#605e5c]">Keine Objekte in dieser OU.</div>
                  ) : (
                    objectsInOu.map((o) => {
                      const isCustomUser = usersInOu.some((u) => `${u.firstName} ${u.lastName}` === o.name);
                      return (
                        <div
                          key={o.name}
                          className="grid grid-cols-[1fr_1fr_1.4fr_auto] items-center gap-4 border-b border-[#eaeaea] px-3 py-2 text-[12px] last:border-b-0"
                        >
                          <span className="flex items-center gap-1.5 font-medium text-[#0a3d91]">
                            <Person24Regular fontSize={14} />
                            {o.name}
                          </span>
                          <span className="text-[#1f1f1f]">{o.type}</span>
                          <span className="text-[#605e5c]">{o.description}</span>
                          {isCustomUser ? (
                            <button
                              onClick={() => {
                                const u = usersInOu.find((u) => `${u.firstName} ${u.lastName}` === o.name);
                                if (u) deleteUser(u.logonName);
                              }}
                              title="Löschen"
                              className="rounded p-1 text-[#605e5c] hover:bg-black/5"
                            >
                              <Trash2 size={13} />
                            </button>
                          ) : (
                            <span />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[#c8c8c8] bg-[#f3f3f3] px-3 py-1.5 text-[10px] text-[#605e5c]">
              © 2026 Windows Server (Simulation)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
