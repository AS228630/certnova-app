"use client";

import { useState } from "react";
import { Search24Regular, Alert24Regular, Settings24Regular, QuestionCircle24Regular } from "@fluentui/react-icons";
import {
  Folder,
  Plus,
  RefreshCw,
  Cloud,
  Database,
  Server,
  Network,
  ShieldCheck,
  BarChart3,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useGcpLabStore, GCP_LOCATIONS, STORAGE_CLASSES, validateGcsBucketName } from "@/lib/store/gcpLabStore";

const NAV_ITEMS = [
  { label: "Cloud Storage", icon: Database, active: true },
  { label: "Compute Engine", icon: Server },
  { label: "Kubernetes Engine", icon: Network },
  { label: "IAM & Verwaltung", icon: ShieldCheck },
  { label: "Monitoring", icon: BarChart3 },
];

function CreateBucketView() {
  const createBucket = useGcpLabStore((s) => s.createBucket);
  const closeCreateView = useGcpLabStore((s) => s.closeCreateView);

  const [name, setName] = useState("");
  const [location, setLocation] = useState<string>(GCP_LOCATIONS[0].value);
  const [storageClass, setStorageClass] = useState<string>(STORAGE_CLASSES[0]);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleNameChange(v: string) {
    setName(v);
    setLiveError(v ? validateGcsBucketName(v) : null);
  }

  function handleCreate() {
    const result = createBucket(name, location, storageClass);
    if (!result.ok) {
      setError(result.message);
      setSuccess(null);
    } else {
      setError(null);
      setSuccess(result.message);
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h2 className="mb-1 text-lg font-medium text-[#202124]">Bucket erstellen</h2>
      <p className="mb-4 text-[12px] text-[#5f6368]">
        Konfiguriere den Namen, den Standort und die Speicherklasse deines Buckets.
      </p>

      <div className="max-w-md space-y-4">
        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202124]">
            Name deines Buckets <span className="text-[#d93025]">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="z.B. certcoach-lab-bucket"
            className="w-full rounded border px-3 py-2 text-[12px] text-[#202124] outline-none"
            style={{ borderColor: liveError ? "#d93025" : "#dadce0" }}
          />
          <p className="mt-1 text-[11px]" style={{ color: liveError ? "#d93025" : "#5f6368" }}>
            {liveError ?? "3-63 Zeichen, Kleinbuchstaben/Zahlen/Punkte/Bindestriche, global eindeutig."}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202124]">
            Standort für Ihre Daten <span className="text-[#d93025]">*</span>
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded border border-[#dadce0] px-3 py-2 text-[12px] text-[#202124] outline-none"
          >
            {GCP_LOCATIONS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202124]">
            Standardspeicherklasse für Ihre Daten <span className="text-[#d93025]">*</span>
          </label>
          <select
            value={storageClass}
            onChange={(e) => setStorageClass(e.target.value)}
            className="w-full rounded border border-[#dadce0] px-3 py-2 text-[12px] text-[#202124] outline-none"
          >
            {STORAGE_CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded border border-[#d93025] p-2.5 text-[12px] text-[#d93025]">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-start gap-2 rounded border border-[#188038] p-2.5 text-[12px] text-[#188038]">
            <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
            {success}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={closeCreateView}
            className="rounded border border-[#dadce0] px-4 py-2 text-[12px] font-medium text-[#3c4043]"
          >
            Abbrechen
          </button>
          {success ? (
            <button
              onClick={closeCreateView}
              className="rounded bg-[#188038] px-4 py-2 text-[12px] font-medium text-white"
            >
              Zu den Buckets
            </button>
          ) : (
            <button
              onClick={handleCreate}
              disabled={!name.trim() || !!liveError}
              className="rounded bg-[#1a73e8] px-4 py-2 text-[12px] font-medium text-white hover:bg-[#1765cc] disabled:opacity-40"
            >
              Erstellen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function BucketListView() {
  const buckets = useGcpLabStore((s) => s.buckets);
  const openCreateView = useGcpLabStore((s) => s.openCreateView);
  const deleteBucket = useGcpLabStore((s) => s.deleteBucket);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <p className="mb-1 text-[11px] text-[#5f6368]">Cloud Storage</p>
      <h2 className="mb-1 text-lg font-medium text-[#202124]">Buckets</h2>
      <p className="mb-3 text-[12px] text-[#5f6368]">
        Buckets sind die grundlegenden Container zum Speichern deiner Daten in Cloud Storage.
      </p>

      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={openCreateView}
          className="flex items-center gap-1.5 rounded bg-[#1a73e8] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-[#1765cc]"
        >
          <Plus size={13} />
          Erstellen
        </button>
        <button className="flex items-center gap-1.5 rounded border border-[#dadce0] px-2.5 py-1.5 text-[12px] text-[#3c4043] hover:bg-black/5">
          <RefreshCw size={12} />
        </button>
      </div>

      <div className="rounded border border-[#e8eaed]">
        <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 border-b border-[#e8eaed] bg-[#f8f9fa] px-3 py-2 text-[11px] font-medium text-[#5f6368]">
          <span>Name</span>
          <span>Standort</span>
          <span>Speicherklasse</span>
          <span></span>
        </div>

        {buckets.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <Folder size={26} className="text-[#dadce0]" />
            <p className="text-[12px] text-[#5f6368]">Es sind noch keine Buckets in diesem Projekt vorhanden.</p>
          </div>
        ) : (
          buckets.map((b) => (
            <div
              key={b.name}
              className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-4 border-b border-[#eaeaea] px-3 py-2.5 text-[12px] last:border-b-0"
            >
              <span className="font-medium text-[#1967d2]">{b.name}</span>
              <span className="text-[#202124]">{b.location}</span>
              <span className="text-[#202124]">{b.storageClass}</span>
              <button
                onClick={() => deleteBucket(b.name)}
                title="Löschen"
                className="rounded p-1 text-[#5f6368] hover:bg-black/5"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function GcpConsoleEnvironment() {
  const activeView = useGcpLabStore((s) => s.activeView);

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border-soft bg-bg">
        <div className="overflow-x-auto">
          <div className="min-w-[900px] bg-white text-[#202124]">
            <div className="flex items-center gap-3 border-b border-[#e8eaed] px-3 py-1.5">
              <span className="flex items-center gap-1.5 text-base font-medium text-[#5f6368]">
                <Cloud size={20} className="text-[#4285F4]" />
                Google Cloud
              </span>
              <span className="rounded border border-[#dadce0] px-2 py-1 text-[12px] text-[#3c4043]">
                CertCoach-Lab ▾
              </span>
              <div className="ml-2 flex h-8 flex-1 max-w-lg items-center gap-2 rounded bg-[#f1f3f4] px-3">
                <Search24Regular fontSize={14} className="shrink-0 text-[#5f6368]" />
                <span className="truncate text-[12px] text-[#5f6368]">Suchen (nach Ressourcen, Docs, Produkten und mehr)</span>
              </div>
              <div className="ml-auto flex items-center gap-3 text-[#5f6368]">
                <Alert24Regular fontSize={16} />
                <QuestionCircle24Regular fontSize={16} />
                <Settings24Regular fontSize={16} />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4285F4] text-[10px] font-bold text-white">
                  S
                </span>
              </div>
            </div>

            <div className="flex" style={{ height: 340 }}>
              <div className="w-52 shrink-0 overflow-y-auto border-r border-[#e8eaed] bg-white p-2 text-[12px]">
                {NAV_ITEMS.map((n) => (
                  <p
                    key={n.label}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${
                      n.active ? "bg-[#e8f0fe] font-medium text-[#1967d2]" : "text-[#3c4043] hover:bg-black/5"
                    }`}
                  >
                    <n.icon size={15} className={n.active ? "text-[#1967d2]" : "text-[#5f6368]"} />
                    {n.label}
                  </p>
                ))}
              </div>

              {activeView === "create" ? <CreateBucketView /> : <BucketListView />}
            </div>

            <div className="flex items-center gap-3 border-t border-[#e8eaed] bg-[#f8f9fa] px-3 py-1.5 text-[10px] text-[#5f6368]">
              © 2026, Google Cloud (Simulation)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
