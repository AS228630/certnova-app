"use client";

import { useEffect, useState } from "react";
import type { Lab, LabTask } from "@/lib/labsData";
import LabHeader from "./LabHeader";
import LabOverviewPanel from "./LabOverviewPanel";
import VirtualEnvironment from "./VirtualEnvironment";
import CloudShell from "./CloudShell";
import LabSidebar from "./LabSidebar";

export default function LabClient({
  companyName,
  companySlug,
  certCode,
  certId,
  lab,
}: {
  companyName: string;
  companySlug: string;
  certCode: string;
  certId: string;
  lab: Lab;
}) {
  const [remaining, setRemaining] = useState(lab.totalMinutes);
  const [tasks, setTasks] = useState<LabTask[]>(lab.tasks);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [ended]);

  function toggleTask(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  if (ended) {
    return (
      <div className="rounded-2xl border border-border-soft bg-panel p-10 text-center">
        <p className="mb-2 text-lg font-bold text-text">Lab beendet</p>
        <p className="mb-5 text-sm text-text-muted">
          Deine Umgebung wurde zurückgesetzt. Du kannst dieses Lab jederzeit erneut starten.
        </p>
        <button
          onClick={() => {
            setEnded(false);
            setRemaining(lab.totalMinutes);
          }}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          Lab erneut starten
        </button>
      </div>
    );
  }

  return (
    <div>
      <LabHeader
        companyName={companyName}
        companySlug={companySlug}
        certCode={certCode}
        certId={certId}
        lab={lab}
        remainingSeconds={remaining}
        onEnd={() => setEnded(true)}
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr_300px]">
        <div className="lg:order-1">
          <LabOverviewPanel lab={lab} />
        </div>

        <div className="space-y-6 lg:order-2">
          <VirtualEnvironment />
          <CloudShell />
        </div>

        <div className="lg:order-3">
          <LabSidebar lab={lab} tasks={tasks} onToggleTask={toggleTask} />
        </div>
      </div>
    </div>
  );
}
