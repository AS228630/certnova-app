"use client";

import { useState } from "react";
import {
  Search24Regular,
  Alert24Regular,
  Settings24Regular,
  QuestionCircle24Regular,
  Grid24Regular,
} from "@fluentui/react-icons";
import { Folder, Plus, RefreshCw, Trash2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { useAwsLabStore, AWS_REGIONS, validateBucketName } from "@/lib/store/awsLabStore";

const NAV_ITEMS = ["Allgemeine Konfiguration", "Buckets", "Zugriffspunkte", "Objekt-Lambda-Zugriffspunkte", "Batch-Operationen"];

function CreateBucketView() {
  const createBucket = useAwsLabStore((s) => s.createBucket);
  const closeCreateView = useAwsLabStore((s) => s.closeCreateView);

  const [name, setName] = useState("");
  const [region, setRegion] = useState<string>(AWS_REGIONS[0].value);
  const [blockPublicAccess, setBlockPublicAccess] = useState(true);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleNameChange(v: string) {
    setName(v);
    setLiveError(v ? validateBucketName(v) : null);
  }

  function handleCreate() {
    const result = createBucket(name, region, blockPublicAccess);
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
      <h2 className="mb-1 text-lg font-semibold text-[#16191f]">Bucket erstellen</h2>
      <p className="mb-4 text-[12px] text-[#545b64]">
        Buckets sind Container für in Amazon S3 gespeicherte Daten.
      </p>

      <div className="max-w-md space-y-4">
        <div>
          <label className="mb-1 block text-[12px] font-semibold text-[#16191f]">
            Bucket-Name <span className="text-[#d13212]">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="z.B. certcoach-lab-bucket"
            className="w-full rounded border px-3 py-2 text-[12px] text-[#16191f] outline-none"
            style={{ borderColor: liveError ? "#d13212" : "#879596" }}
          />
          <p className="mt-1 text-[11px]" style={{ color: liveError ? "#d13212" : "#687078" }}>
            {liveError ?? "3-63 Zeichen, Kleinbuchstaben/Zahlen/Punkte/Bindestriche, global eindeutig."}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-semibold text-[#16191f]">
            AWS-Region <span className="text-[#d13212]">*</span>
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full rounded border border-[#879596] px-3 py-2 text-[12px] text-[#16191f] outline-none"
          >
            {AWS_REGIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded border border-[#e9ebed] p-3">
          <label className="flex items-start gap-2 text-[12px]">
            <input
              type="checkbox"
              checked={blockPublicAccess}
              onChange={(e) => setBlockPublicAccess(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              <span className="flex items-center gap-1 font-semibold text-[#16191f]">
                <ShieldCheck size={13} className="text-[#0972d3]" />
                Gesamten öffentlichen Zugriff blockieren
              </span>
              <span className="text-[#545b64]">Empfohlen für die meisten Anwendungsfälle.</span>
            </span>
          </label>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded border border-[#d13212] p-2.5 text-[12px] text-[#d13212]">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-start gap-2 rounded border border-[#1d8102] p-2.5 text-[12px] text-[#1d8102]">
            <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
            {success}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={closeCreateView}
            className="rounded border border-[#879596] px-4 py-2 text-[12px] font-medium text-[#16191f]"
          >
            Abbrechen
          </button>
          {success ? (
            <button
              onClick={closeCreateView}
              className="rounded bg-[#1d8102] px-4 py-2 text-[12px] font-semibold text-white"
            >
              Zu den Buckets
            </button>
          ) : (
            <button
              onClick={handleCreate}
              disabled={!name.trim() || !!liveError}
              className="rounded bg-[#ec7211] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#eb5f07] disabled:opacity-40"
            >
              Bucket erstellen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function BucketListView() {
  const buckets = useAwsLabStore((s) => s.buckets);
  const openCreateView = useAwsLabStore((s) => s.openCreateView);
  const deleteBucket = useAwsLabStore((s) => s.deleteBucket);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h2 className="mb-1 text-lg font-semibold text-[#16191f]">Buckets ({buckets.length})</h2>
      <p className="mb-3 text-[12px] text-[#545b64]">
        Buckets sind Container für in Amazon S3 gespeicherte Daten.
      </p>

      <div className="mb-3 flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded border border-[#e9ebed] px-2.5 py-1.5 text-[12px] text-[#16191f] hover:bg-black/5">
          <RefreshCw size={12} />
        </button>
        <button
          onClick={openCreateView}
          className="ml-auto flex items-center gap-1.5 rounded bg-[#ec7211] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#eb5f07]"
        >
          <Plus size={13} />
          Bucket erstellen
        </button>
      </div>

      <div className="rounded border border-[#e9ebed]">
        <div className="grid grid-cols-[1fr_1fr_auto] gap-4 border-b border-[#e9ebed] bg-[#fafafa] px-3 py-2 text-[11px] font-semibold text-[#545b64]">
          <span>Name</span>
          <span>Region</span>
          <span></span>
        </div>

        {buckets.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <Folder size={26} className="text-[#c9cfd3]" />
            <p className="text-[12px] text-[#545b64]">Du hast noch keine Buckets in dieser Region.</p>
          </div>
        ) : (
          buckets.map((b) => (
            <div
              key={b.name}
              className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 border-b border-[#e9ebed] px-3 py-2.5 text-[12px] last:border-b-0"
            >
              <span className="font-medium text-[#0972d3]">{b.name}</span>
              <span className="text-[#16191f]">{b.region}</span>
              <button
                onClick={() => deleteBucket(b.name)}
                title="Löschen"
                className="rounded p-1 text-[#687078] hover:bg-black/5"
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

export default function AwsConsoleEnvironment() {
  const activeView = useAwsLabStore((s) => s.activeView);

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border-soft bg-bg">
        <div className="overflow-x-auto">
          <div className="min-w-[900px] bg-white text-[#16191f]">
            {/* Real AWS console top bar */}
            <div className="flex items-center gap-3 bg-[#232f3e] px-3 py-1.5">
              <span className="text-lg font-bold text-white">aws</span>
              <span className="text-xs text-[#d5dbdb]">Services</span>
              <div className="ml-2 flex h-7 flex-1 max-w-md items-center gap-2 rounded bg-white px-2">
                <Search24Regular fontSize={13} className="shrink-0 text-[#545b64]" />
                <span className="truncate text-[11px] text-[#545b64]">
                  Nach Diensten, Features, Blogs, Docs und mehr suchen
                </span>
              </div>
              <div className="ml-auto flex items-center gap-3 text-xs text-white">
                <span className="hidden sm:inline">Europe (Frankfurt) eu-central-1</span>
                <Alert24Regular fontSize={16} />
                <Settings24Regular fontSize={16} />
                <QuestionCircle24Regular fontSize={16} />
                <span className="rounded border border-white/30 px-2 py-1 text-[11px]">student@certcoach-lab</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 border-b border-[#e9ebed] bg-[#fafafa] px-3 py-2 text-[12px] text-[#545b64]">
              <Grid24Regular fontSize={14} />
              <span>S3</span>
              <span className="text-[#879596]">&gt;</span>
              <span className="font-semibold text-[#16191f]">{activeView === "create" ? "Bucket erstellen" : "Buckets"}</span>
            </div>

            <div className="flex" style={{ height: 340 }}>
              <div className="w-48 shrink-0 overflow-y-auto border-r border-[#e9ebed] bg-[#f9f9f9] p-2 text-[11px]">
                {NAV_ITEMS.map((n, i) => (
                  <p
                    key={n}
                    className={`flex items-center gap-2 rounded px-2 py-1.5 ${
                      i === 1 ? "bg-[#e9f2fe] font-semibold text-[#0972d3]" : "text-[#16191f] hover:bg-black/5"
                    }`}
                  >
                    <Folder size={13} className={i === 1 ? "text-[#0972d3]" : "text-[#545b64]"} />
                    {n}
                  </p>
                ))}
              </div>

              {activeView === "create" ? <CreateBucketView /> : <BucketListView />}
            </div>

            <div className="flex items-center gap-3 border-t border-[#e9ebed] bg-[#fafafa] px-3 py-1.5 text-[10px] text-[#545b64]">
              © 2026, Amazon Web Services, Inc. (Simulation)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
