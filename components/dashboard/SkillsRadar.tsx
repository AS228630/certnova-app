"use client";

import { useTopicMasteryStore } from "@/lib/store/topicMasteryStore";
import { TOPIC_AREAS } from "@/lib/topicMastery";
import { useLocale } from "@/components/LocaleProvider";

// A simple SVG radar (spider) chart. No charting library needed for 5
// fixed axes — keeps the bundle small and the rendering fully under our
// control for the empty/partial-data states below.
function RadarChart({ values }: { values: number[] }) {
  const size = 180;
  const center = size / 2;
  const maxRadius = 68;
  const axisCount = values.length;

  function pointFor(index: number, valuePercent: number) {
    const angle = (Math.PI * 2 * index) / axisCount - Math.PI / 2;
    const r = (valuePercent / 100) * maxRadius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  }

  const dataPoints = values.map((v, i) => pointFor(i, v));
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const rings = [25, 50, 75, 100];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-44 w-44 shrink-0">
      {rings.map((ring) => {
        const ringPoints = Array.from({ length: axisCount }, (_, i) => pointFor(i, ring));
        return (
          <polygon
            key={ring}
            points={ringPoints.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="var(--color-border-soft)"
            strokeWidth="1"
          />
        );
      })}
      {Array.from({ length: axisCount }, (_, i) => {
        const p = pointFor(i, 100);
        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="var(--color-border-soft)" strokeWidth="1" />;
      })}
      <polygon points={dataPath} fill="var(--color-primary)" fillOpacity="0.25" stroke="var(--color-primary)" strokeWidth="2" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="var(--color-primary)" />
      ))}
    </svg>
  );
}

export default function SkillsRadar() {
  const masteryMap = useTopicMasteryStore((s) => s.masteryMap);
  const hasEnoughData = useTopicMasteryStore((s) => s.hasEnoughData);
  const { t } = useLocale();

  if (!hasEnoughData()) {
    return (
      <div className="rounded-xl border border-dashed border-border-soft p-5 text-center">
        <p className="text-xs text-text-faint">{t("mastery.notEnoughData")}</p>
      </div>
    );
  }

  const percentages = TOPIC_AREAS.map((area) => {
    const detail = masteryMap[area.id];
    if (!detail || detail.questionsAnswered === 0) return 0;
    return Math.round((detail.questionsCorrect / detail.questionsAnswered) * 100);
  });

  const overallAnswered = TOPIC_AREAS.reduce((sum, a) => sum + (masteryMap[a.id]?.questionsAnswered ?? 0), 0);
  const overallCorrect = TOPIC_AREAS.reduce((sum, a) => sum + (masteryMap[a.id]?.questionsCorrect ?? 0), 0);
  const overallPercent = overallAnswered === 0 ? 0 : Math.round((overallCorrect / overallAnswered) * 100);

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
      <div className="relative flex items-center justify-center">
        <RadarChart values={percentages} />
        <div className="pointer-events-none absolute flex flex-col items-center">
          <span className="text-lg font-extrabold text-text">{overallPercent}%</span>
          <span className="text-[9px] text-text-faint">{t("mastery.average")}</span>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-1.5 text-xs">
        {TOPIC_AREAS.map((area, i) => (
          <div key={area.id} className="flex items-center justify-between gap-2">
            <span className="text-text-muted">{t(area.labelKey)}</span>
            <span className="font-semibold text-text">{percentages[i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
