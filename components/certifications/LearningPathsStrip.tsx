import type { LearningPath } from "@/lib/companiesData";

export default function LearningPathsStrip({ paths }: { paths: LearningPath[] }) {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-text">Beliebte Lernpfade</h2>
        <button className="text-sm font-semibold text-primary hover:underline">Alle ansehen</button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paths.map((path) => (
          <div key={path.title} className="rounded-xl border border-border-soft bg-panel p-4">
            <p className="mb-1 text-sm font-bold text-text">{path.title}</p>
            <p className="mb-1 text-xs text-text-faint">{path.certCount} Zertifizierungen</p>
            <p className="mb-3 text-xs text-text-muted">{path.levelRange}</p>
            {path.progress !== null ? (
              <div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-panel-alt">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${path.progress}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-text-faint">{path.progress}% abgeschlossen</p>
              </div>
            ) : (
              <span className="rounded-full bg-primary-light px-2 py-0.5 text-[11px] font-semibold text-primary">
                {path.levelRange}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
