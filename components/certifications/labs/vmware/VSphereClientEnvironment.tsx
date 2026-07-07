"use client";

import { useState } from "react";
import {
  Server24Regular,
  Database24Regular,
  Search24Regular,
  Alert24Regular,
  Settings24Regular,
  QuestionCircle24Regular,
  Power24Regular,
} from "@fluentui/react-icons";
import { Cpu, MemoryStick, HardDrive, Plus, Trash2, CheckCircle2, AlertCircle, X, Power } from "lucide-react";
import {
  useVSphereLabStore,
  ESXI_HOSTS,
  GUEST_OS_OPTIONS,
  CPU_OPTIONS,
  MEMORY_OPTIONS_GB,
  validateVmName,
} from "@/lib/store/vsphereLabStore";

function CreateVmDialog() {
  const closeCreateDialog = useVSphereLabStore((s) => s.closeCreateDialog);
  const createVm = useVSphereLabStore((s) => s.createVm);

  const [name, setName] = useState("");
  const [host, setHost] = useState<string>(ESXI_HOSTS[0]);
  const [guestOs, setGuestOs] = useState<string>(GUEST_OS_OPTIONS[0]);
  const [cpu, setCpu] = useState<number>(CPU_OPTIONS[0]);
  const [memoryGb, setMemoryGb] = useState<number>(MEMORY_OPTIONS_GB[0]);
  const [diskGb, setDiskGb] = useState(40);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleNameChange(v: string) {
    setName(v);
    setLiveError(v ? validateVmName(v) : null);
  }

  function handleCreate() {
    const result = createVm(name, host, guestOs, cpu, memoryGb, diskGb);
    if (!result.ok) {
      setError(result.message);
      setSuccess(null);
    } else {
      setError(null);
      setSuccess(result.message);
    }
  }

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
      <div className="w-[420px] rounded border border-[#3b3b3b] bg-[#252526] text-[#e0e0e0] shadow-2xl">
        <div className="flex items-center justify-between bg-[#1e3a5f] px-3 py-2">
          <span className="text-[12px] font-semibold text-white">Neue virtuelle Maschine</span>
          <button onClick={closeCreateDialog}>
            <X size={14} className="text-white" />
          </button>
        </div>
        <div className="space-y-3 p-4">
          <div>
            <label className="mb-1 block text-[11px] font-semibold">
              Name der virtuellen Maschine <span className="text-[#f14c4c]">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="z.B. cc-lab-vm-01"
              className="w-full rounded border bg-[#1e1e1e] px-2 py-1.5 text-[12px] outline-none"
              style={{ borderColor: liveError ? "#f14c4c" : "#3b3b3b" }}
            />
            <p className="mt-1 text-[11px]" style={{ color: liveError ? "#f14c4c" : "#9d9d9d" }}>
              {liveError ?? "Max. 80 Zeichen, keine Sonderzeichen wie / \\ [ ] : * ? \" < > |"}
            </p>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold">Host</label>
            <select
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="w-full rounded border border-[#3b3b3b] bg-[#1e1e1e] px-2 py-1.5 text-[12px] outline-none"
            >
              {ESXI_HOSTS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold">Gastbetriebssystem</label>
            <select
              value={guestOs}
              onChange={(e) => setGuestOs(e.target.value)}
              className="w-full rounded border border-[#3b3b3b] bg-[#1e1e1e] px-2 py-1.5 text-[12px] outline-none"
            >
              {GUEST_OS_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="mb-1 flex items-center gap-1 text-[11px] font-semibold">
                <Cpu size={11} /> CPU
              </label>
              <select
                value={cpu}
                onChange={(e) => setCpu(Number(e.target.value))}
                className="w-full rounded border border-[#3b3b3b] bg-[#1e1e1e] px-2 py-1.5 text-[12px] outline-none"
              >
                {CPU_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c} vCPU
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 flex items-center gap-1 text-[11px] font-semibold">
                <MemoryStick size={11} /> RAM
              </label>
              <select
                value={memoryGb}
                onChange={(e) => setMemoryGb(Number(e.target.value))}
                className="w-full rounded border border-[#3b3b3b] bg-[#1e1e1e] px-2 py-1.5 text-[12px] outline-none"
              >
                {MEMORY_OPTIONS_GB.map((m) => (
                  <option key={m} value={m}>
                    {m} GB
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 flex items-center gap-1 text-[11px] font-semibold">
                <HardDrive size={11} /> Disk
              </label>
              <input
                type="number"
                min={1}
                value={diskGb}
                onChange={(e) => setDiskGb(Number(e.target.value))}
                className="w-full rounded border border-[#3b3b3b] bg-[#1e1e1e] px-2 py-1.5 text-[12px] outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded border border-[#f14c4c] p-2 text-[11px] text-[#f14c4c]">
              <AlertCircle size={13} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-start gap-2 rounded border border-[#89d185] p-2 text-[11px] text-[#89d185]">
              <CheckCircle2 size={13} className="mt-0.5 shrink-0" />
              {success}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={closeCreateDialog}
              className="rounded border border-[#3b3b3b] px-3 py-1.5 text-[12px]"
            >
              {success ? "Schließen" : "Abbrechen"}
            </button>
            {!success && (
              <button
                onClick={handleCreate}
                disabled={!name.trim() || !!liveError}
                className="rounded bg-[#1e88e5] px-3 py-1.5 text-[12px] font-semibold text-white disabled:opacity-40"
              >
                Fertig stellen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VSphereClientEnvironment() {
  const vms = useVSphereLabStore((s) => s.vms);
  const createDialogOpen = useVSphereLabStore((s) => s.createDialogOpen);
  const openCreateDialog = useVSphereLabStore((s) => s.openCreateDialog);
  const powerOff = useVSphereLabStore((s) => s.powerOff);
  const powerOn = useVSphereLabStore((s) => s.powerOn);
  const deleteVm = useVSphereLabStore((s) => s.deleteVm);

  return (
    <div className="relative rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border-soft bg-[#1e1e1e]">
        <div className="overflow-x-auto">
          <div className="relative min-w-[900px] text-[#e0e0e0]">
            {createDialogOpen && <CreateVmDialog />}

            <div className="flex items-center gap-3 bg-[#1e3a5f] px-3 py-1.5">
              <Server24Regular fontSize={18} className="text-white" />
              <span className="text-sm font-semibold text-white">vSphere Client</span>
              <div className="ml-2 flex h-7 flex-1 max-w-md items-center gap-2 rounded bg-white/10 px-2">
                <Search24Regular fontSize={13} className="shrink-0 text-white/70" />
                <span className="truncate text-[11px] text-white/70">Suchen in allen Umgebungen</span>
              </div>
              <div className="ml-auto flex items-center gap-3 text-white/80">
                <Alert24Regular fontSize={16} />
                <Settings24Regular fontSize={16} />
                <QuestionCircle24Regular fontSize={16} />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold text-white">
                  A
                </span>
              </div>
            </div>

            <div className="flex" style={{ height: 340 }}>
              <div className="w-56 shrink-0 overflow-y-auto border-r border-[#3b3b3b] bg-[#252526] p-2 text-[12px]">
                <p className="flex items-center gap-2 rounded px-2 py-1.5 font-semibold text-[#e0e0e0]">
                  <Database24Regular fontSize={15} style={{ color: "#9d9d9d" }} />
                  certcoach-lab.local
                </p>
                {ESXI_HOSTS.map((h) => (
                  <div key={h} style={{ paddingLeft: 16 }}>
                    <p className="flex items-center gap-2 rounded px-2 py-1.5 text-[#e0e0e0]">
                      <Server24Regular fontSize={14} style={{ color: "#9d9d9d" }} />
                      {h}
                    </p>
                    {vms
                      .filter((v) => v.host === h)
                      .map((v) => (
                        <p
                          key={v.name}
                          style={{ paddingLeft: 20 }}
                          className="flex items-center gap-2 rounded py-1 text-[11px] text-[#c0c0c0]"
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: v.status === "Powered On" ? "#89d185" : "#9d9d9d" }}
                          />
                          {v.name}
                        </p>
                      ))}
                  </div>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <h2 className="mb-1 text-lg font-semibold text-white">Virtuelle Maschinen</h2>
                <p className="mb-3 text-[12px] text-[#9d9d9d]">
                  Erstelle und verwalte virtuelle Maschinen in deinem vSphere-Cluster.
                </p>

                <button
                  onClick={openCreateDialog}
                  className="mb-3 flex items-center gap-1.5 rounded bg-[#1e88e5] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#1976d2]"
                >
                  <Plus size={13} />
                  Neue virtuelle Maschine
                </button>

                <div className="rounded border border-[#3b3b3b]">
                  <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto_auto] gap-3 border-b border-[#3b3b3b] bg-[#2d2d2d] px-3 py-2 text-[11px] font-semibold text-[#9d9d9d]">
                    <span>Name</span>
                    <span>Host</span>
                    <span>Gastbetriebssystem</span>
                    <span>Ressourcen</span>
                    <span>Status</span>
                    <span></span>
                  </div>

                  {vms.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-10 text-center">
                      <Server24Regular fontSize={26} style={{ color: "#5a5a5a" }} />
                      <p className="text-[12px] text-[#9d9d9d]">
                        Keine virtuellen Maschinen gefunden. Klicke auf „Neue virtuelle Maschine“.
                      </p>
                    </div>
                  ) : (
                    vms.map((vm) => (
                      <div
                        key={vm.name}
                        className="grid grid-cols-[1fr_1fr_1fr_1fr_auto_auto] items-center gap-3 border-b border-[#3b3b3b] px-3 py-2.5 text-[12px] last:border-b-0"
                      >
                        <span className="font-medium text-[#4fc3f7]">{vm.name}</span>
                        <span className="text-[#c0c0c0]">{vm.host}</span>
                        <span className="text-[#c0c0c0]">{vm.guestOs}</span>
                        <span className="text-[#c0c0c0]">
                          {vm.cpu} vCPU · {vm.memoryGb} GB · {vm.diskGb} GB
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: vm.status === "Powered On" ? "#89d185" : "#9d9d9d" }}
                          />
                          <span style={{ color: vm.status === "Powered On" ? "#89d185" : "#9d9d9d" }}>
                            {vm.status}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <button
                            onClick={() => (vm.status === "Powered On" ? powerOff(vm.name) : powerOn(vm.name))}
                            title={vm.status === "Powered On" ? "Ausschalten" : "Einschalten"}
                            className="rounded p-1 text-[#9d9d9d] hover:bg-white/10"
                          >
                            {vm.status === "Powered On" ? <Power size={13} /> : <Power24Regular fontSize={13} />}
                          </button>
                          <button
                            onClick={() => deleteVm(vm.name)}
                            title="Löschen"
                            className="rounded p-1 text-[#9d9d9d] hover:bg-white/10"
                          >
                            <Trash2 size={13} />
                          </button>
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[#3b3b3b] bg-[#252526] px-3 py-1.5 text-[10px] text-[#9d9d9d]">
              © 2026 Broadcom / VMware by Broadcom (Simulation)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
