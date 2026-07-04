"use client";

import { useEffect, useState } from "react";
import { BookOpen, ExternalLink, LifeBuoy } from "lucide-react";
import type { Lab, LabTask } from "@/lib/labsData";
import { useLabStore, TARGET_RG_NAME } from "@/lib/store/labStore";
import LabHeader from "./LabHeader";
import LabOverviewPanel from "./LabOverviewPanel";
import VirtualEnvironment from "@/components/certifications/journey/labs/LabEnvironment";
import RealCloudShell from "./RealCloudShell";
import LabSidebar from "./LabSidebar";
import AzurePortalFrame from "./azure-portal/AzurePortalFrame";
import ResourceGroupsBlade from "./azure-portal/ResourceGroupsBlade";
import CreateResourceGroupBlade from "./azure-portal/CreateResourceGroupBlade";
import StorageAccountsBlade from "./azure-portal/StorageAccountsBlade";
import CreateStorageAccountBlade from "./azure-portal/CreateStorageAccountBlade";
import ChaosModeToggle from "./ChaosModeToggle";
import LabScorecardModal from "./LabScorecardModal";

function InteractiveResourceGroupLab({
  companyName,
  companySlug,
  certCode,
  certId,
  lab,
  remaining,
  onEnd,
}: {
  companyName: string;
  companySlug: string;
  certCode: string;
  certId: string;
  lab: Lab;
  remaining: number;
  onEnd: () => void;
}) {
  const resourceGroups = useLabStore((s) => s.resourceGroups);
  const storageAccounts = useLabStore((s) => s.storageAccounts);
  const activeBlade = useLabStore((s) => s.activeBlade);
  const activeSection = useLabStore((s) => s.activeSection);
  const mistakeCount = useLabStore((s) => s.mistakeCount);
  const startedAt = useLabStore((s) => s.startedAt);
  const resetStore = useLabStore((s) => s.reset);

  const created = resourceGroups.find((rg) => rg.name.toLowerCase() === TARGET_RG_NAME.toLowerCase());
  const tasks: LabTask[] = lab.tasks.map((t) => {
    if (t.id === "rg-created") return { ...t, done: !!created };
    if (t.id === "rg-region")
      return { ...t, done: !!created && created.location.toLowerCase().replace(/\s+/g, "") === "westeurope" };
    if (t.id === "storage-created")
      return { ...t, done: storageAccounts.some((sa) => sa.resourceGroup.toLowerCase() === TARGET_RG_NAME.toLowerCase()) };
    return t;
  });

  const allDone = tasks.every((t) => t.done);
  const [completedAt, setCompletedAt] = useState<number | null>(null);
  const [scorecardDismissed, setScorecardDismissed] = useState(false);

  useEffect(() => {
    // Date.now() is an impure read, so it belongs here (an effect), not in
    // the render body. The `completedAt === null` / `!== null` guards make
    // this idempotent — it only ever fires once per completion transition,
    // so it does not cause a render cascade despite the lint rule's default
    // suspicion of any setState call inside an effect body.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (allDone && completedAt === null) setCompletedAt(Date.now());
    if (!allDone && completedAt !== null) {
      setCompletedAt(null);
      setScorecardDismissed(false);
    }
  }, [allDone, completedAt]);

  const sectionLabel = activeSection === "resource-groups" ? "Resource groups" : "Storage accounts";
  const bladeContent =
    activeSection === "resource-groups" ? (
      activeBlade === "create" ? (
        <CreateResourceGroupBlade />
      ) : (
        <ResourceGroupsBlade />
      )
    ) : activeBlade === "create" ? (
      <CreateStorageAccountBlade />
    ) : (
      <StorageAccountsBlade />
    );

  return (
    <div>
      <LabHeader
        companyName={companyName}
        companySlug={companySlug}
        certCode={certCode}
        certId={certId}
        lab={lab}
        remainingSeconds={remaining}
        onEnd={onEnd}
      />

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
        <div className="xl:order-1">
          <LabOverviewPanel lab={lab} />
        </div>

        <div className="space-y-6 xl:order-2">
          <ChaosModeToggle />
          <AzurePortalFrame breadcrumb={["Home", sectionLabel, ...(activeBlade === "create" ? [`Create ${activeSection === "resource-groups" ? "a resource group" : "a storage account"}`] : [])]}>
            {bladeContent}
          </AzurePortalFrame>
          <RealCloudShell />
        </div>

        <div className="xl:order-3">
          <LabSidebar lab={lab} tasks={tasks} onToggleTask={() => {}} readOnly />
        </div>
      </div>

      {allDone && !scorecardDismissed && completedAt !== null && (
        <LabScorecardModal
          elapsedMs={completedAt - startedAt}
          mistakeCount={mistakeCount}
          onDismiss={() => setScorecardDismissed(true)}
          onRestart={() => {
            resetStore();
            setScorecardDismissed(true);
          }}
        />
      )}
    </div>
  );
}

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
  const resetStore = useLabStore((s) => s.reset);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [ended]);

  function toggleTask(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function restart() {
    setEnded(false);
    setRemaining(lab.totalMinutes);
    if (lab.interactive === "resource-group") resetStore();
  }

  if (ended) {
    return (
      <div className="rounded-2xl border border-border-soft bg-panel p-10 text-center">
        <p className="mb-2 text-lg font-bold text-text">Lab beendet</p>
        <p className="mb-5 text-sm text-text-muted">
          Deine Umgebung wurde zurückgesetzt. Du kannst dieses Lab jederzeit erneut starten.
        </p>
        <button
          onClick={restart}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          Lab erneut starten
        </button>
      </div>
    );
  }

  if (lab.interactive === "resource-group") {
    return (
      <InteractiveResourceGroupLab
        companyName={companyName}
        companySlug={companySlug}
        certCode={certCode}
        certId={certId}
        lab={lab}
        remaining={remaining}
        onEnd={() => setEnded(true)}
      />
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

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
        <div className="xl:order-1">
          <LabOverviewPanel lab={lab} />
        </div>

        <div className="space-y-6 xl:order-2">
          <VirtualEnvironment />
        </div>

        <div className="xl:order-3">
          <LabSidebar lab={lab} tasks={tasks} onToggleTask={toggleTask} />
        </div>
      </div>

      {(lab.docs.length > 0 || true) && (
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
          <div className="hidden xl:order-1 xl:block" />

          {lab.docs.length > 0 && (
            <div className="rounded-2xl border border-border-soft bg-panel p-5 xl:order-2">
              <p className="mb-3 flex items-center gap-1.5 text-sm font-bold text-text">
                <BookOpen size={14} />
                Dokumentation &amp; Hilfe
              </p>
              <ul className="space-y-2">
                {lab.docs.map((d) => (
                  <li key={d.url}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary"
                    >
                      <ExternalLink size={12} className="flex-none" />
                      {d.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl border border-border-soft bg-panel p-5 xl:order-3">
            <p className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-text">
              <LifeBuoy size={14} />
              Support
            </p>
            <p className="mb-3 text-xs text-text-muted">Brauchen Sie Hilfe? Unser Support-Team ist für Sie da.</p>
            <button className="w-full rounded-lg border border-border-soft py-2 text-xs font-semibold text-text hover:border-primary hover:text-primary">
              Ticket erstellen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
