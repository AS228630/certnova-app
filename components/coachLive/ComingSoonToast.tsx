"use client";

export default function ComingSoonToast({ label, onClose }: { label: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl border border-border-soft bg-panel px-5 py-3 shadow-2xl">
      <p className="text-sm text-text">
        <span className="font-bold">{label}</span> ist bald verfügbar — wir bauen diesen Bereich gerade.
      </p>
      <button onClick={onClose} className="mt-1 text-xs font-semibold text-primary hover:underline">
        Schließen
      </button>
    </div>
  );
}
