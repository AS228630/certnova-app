"use client";

import { useEffect, useState } from "react";
import type { Lab, LabTask } from "@/lib/labsData";
import { useLabStore, TARGET_RG_NAME } from "@/lib/store/labStore";
import LabHeader from "./LabHeader";
import LabOverviewPanel from "./LabOverviewPanel";
import VirtualEnvironment from "./VirtualEnvironment";
import CloudShell from "./CloudShell";
import RealCloudShell from "./RealCloudShell";
import LabSidebar from "./LabSidebar";
import AzurePortalFrame from "./azure-portal/AzurePortalFrame";
import ResourceGroupsBlade from "./azure-portal/ResourceGroupsBlade";
import CreateResourceGroupBlade from "./azure-portal/CreateResourceGroupBlade";
import StorageAccountsBlade from "./azure-portal/StorageAccountsBlade";
import CreateStorageAccountBlade from "./azure-portal/CreateStorageAccountBlade";

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

  const created = resourceGroups.find((rg) => rg.name.toLowerCase() === TARGET_RG_NAME.toLowerCase());
  const tasks: LabTask[] = lab.tasks.map((t) => {
    if (t.id === "rg-created") return { ...t, done: !!created };
    if (t.id === "rg-region")
      return { ...t, done: !!created && created.location.toLowerCase().replace(/\s+/g, "") === "westeurope" };
    if (t.id === "storage-created")
      return { ...t, done: storageAccounts.some((sa) => sa.resourceGroup.toLowerCase() === TARGET_RG_NAME.toLowerCase()) };
    return t;
  });

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

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr_300px]">
        <div className="lg:order-1">
          <LabOverviewPanel lab={lab} />
        </div>

        <div className="space-y-6 lg:order-2">
          <AzurePortalFrame breadcrumb={["Home", sectionLabel, ...(activeBlade === "create" ? [`Create ${activeSection === "resource-groups" ? "a resource group" : "a storage account"}`] : [])]}>
            {bladeContent}
          </AzurePortalFrame>
          <RealCloudShell />
        </div>

        <div className="lg:order-3">
          <LabSidebar lab={lab} tasks={tasks} onToggleTask={() => {}} readOnly />
        </div>
      </div>
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
