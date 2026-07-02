export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-lg border border-border-soft px-3 py-1.5 text-sm font-medium text-text-muted transition-colors hover:bg-panel-alt disabled:cursor-not-allowed disabled:opacity-40"
      >
        ‹ Zurück
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-1.5 text-sm text-text-faint">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`h-8 w-8 rounded-lg text-sm font-semibold transition-colors ${
                p === page ? "bg-primary text-white" : "text-text-muted hover:bg-panel-alt"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-lg border border-border-soft px-3 py-1.5 text-sm font-medium text-text-muted transition-colors hover:bg-panel-alt disabled:cursor-not-allowed disabled:opacity-40"
      >
        Weiter ›
      </button>
    </div>
  );
}
