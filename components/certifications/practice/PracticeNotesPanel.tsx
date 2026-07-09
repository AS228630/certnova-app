"use client";

import { useState } from "react";
import { StickyNote, X } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function PracticeNotesPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLocale();
  const [notes, setNotes] = useState<{ id: string; text: string }[]>([]);
  const [draft, setDraft] = useState("");

  function save() {
    if (!draft.trim()) return;
    setNotes((prev) => [{ id: crypto.randomUUID(), text: draft.trim() }, ...prev]);
    setDraft("");
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-sm flex-col border-l border-border-soft bg-panel p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-center gap-1.5 font-bold text-text">
            <StickyNote size={16} />
            {t("practice.notes")}
          </p>
          <button onClick={onClose} className="text-text-muted hover:text-text">
            <X size={18} />
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder={t("practice.notePlaceholder")}
            className="w-full rounded-lg border border-border-soft bg-panel-alt p-2.5 text-sm text-text placeholder:text-text-faint outline-none focus:border-primary"
          />
        </div>
        <button
          onClick={save}
          className="mb-4 rounded-lg bg-primary py-2 text-sm font-bold text-white hover:bg-primary-dark"
        >
          {t("practice.saveNote")}
        </button>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {notes.length === 0 && <p className="text-sm text-text-faint">{t("practice.noNotesYet")}</p>}
          {notes.map((n) => (
            <p key={n.id} className="rounded-lg bg-panel-alt p-3 text-xs text-text-muted">
              {n.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
