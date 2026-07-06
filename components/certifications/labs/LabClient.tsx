"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, LifeBuoy, ChevronLeft } from "lucide-react";
import type { Lab, LabTask } from "@/lib/labsData";
import { useLabStore, TARGET_RG_NAME, TARGET_VM_NAME, TARGET_VNET_NAME } from "@/lib/store/labStore";
import { useAwsLabStore, TARGET_BUCKET_REGION } from "@/lib/store/awsLabStore";
import { useAdLabStore, TARGET_OU } from "@/lib/store/adLabStore";
import { useGcpLabStore, TARGET_LOCATION } from "@/lib/store/gcpLabStore";
import { useM365LabStore } from "@/lib/store/m365LabStore";
import { useVSphereLabStore, ESXI_TARGET_HOST } from "@/lib/store/vsphereLabStore";
import { useCiscoLabStore, TARGET_HOSTNAME, TARGET_IP, TARGET_MASK } from "@/lib/store/ciscoLabStore";
import LabHeader from "./LabHeader";
import LabStepsOverview from "./LabStepsOverview";
import LabOverviewPanel from "./LabOverviewPanel";
import VirtualEnvironment from "@/components/certifications/journey/labs/LabEnvironment";
import RealCloudShell from "./RealCloudShell";
import LabSidebar from "./LabSidebar";
import AzurePortalFrame from "./azure-portal/AzurePortalFrame";
import ResourceGroupsBlade from "./azure-portal/ResourceGroupsBlade";
import CreateResourceGroupBlade from "./azure-portal/CreateResourceGroupBlade";
import StorageAccountsBlade from "./azure-portal/StorageAccountsBlade";
import CreateStorageAccountBlade from "./azure-portal/CreateStorageAccountBlade";
import VirtualMachinesBlade from "./azure-portal/VirtualMachinesBlade";
import CreateVirtualMachineBlade from "./azure-portal/CreateVirtualMachineBlade";
import VirtualNetworksBlade from "./azure-portal/VirtualNetworksBlade";
import CreateVirtualNetworkBlade from "./azure-portal/CreateVirtualNetworkBlade";
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
  const virtualMachines = useLabStore((s) => s.virtualMachines);
  const virtualNetworks = useLabStore((s) => s.virtualNetworks);
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
    if (t.id === "vm-created")
      return {
        ...t,
        done: virtualMachines.some(
          (vm) =>
            vm.resourceGroup.toLowerCase() === TARGET_RG_NAME.toLowerCase() &&
            vm.name.toLowerCase() === TARGET_VM_NAME.toLowerCase()
        ),
      };
    if (t.id === "vnet-created")
      return {
        ...t,
        done: virtualNetworks.some(
          (vnet) =>
            vnet.resourceGroup.toLowerCase() === TARGET_RG_NAME.toLowerCase() &&
            vnet.name.toLowerCase() === TARGET_VNET_NAME.toLowerCase() &&
            vnet.addressSpace === "10.0.0.0/16"
        ),
      };
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

  const SECTION_META = {
    "resource-groups": { label: "Resource groups", createLabel: "a resource group" },
    "storage-accounts": { label: "Storage accounts", createLabel: "a storage account" },
    "virtual-machines": { label: "Virtual machines", createLabel: "a virtual machine" },
    "virtual-networks": { label: "Virtual networks", createLabel: "a virtual network" },
  } as const;
  const sectionLabel = SECTION_META[activeSection].label;
  const bladeContent =
    activeSection === "resource-groups" ? (
      activeBlade === "create" ? (
        <CreateResourceGroupBlade />
      ) : (
        <ResourceGroupsBlade />
      )
    ) : activeSection === "storage-accounts" ? (
      activeBlade === "create" ? (
        <CreateStorageAccountBlade />
      ) : (
        <StorageAccountsBlade />
      )
    ) : activeSection === "virtual-machines" ? (
      activeBlade === "create" ? (
        <CreateVirtualMachineBlade />
      ) : (
        <VirtualMachinesBlade />
      )
    ) : activeBlade === "create" ? (
      <CreateVirtualNetworkBlade />
    ) : (
      <VirtualNetworksBlade />
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
          <AzurePortalFrame
            breadcrumb={[
              "Home",
              sectionLabel,
              ...(activeBlade === "create" ? [`Create ${SECTION_META[activeSection].createLabel}`] : []),
            ]}
          >
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
  environment,
}: {
  companyName: string;
  companySlug: string;
  certCode: string;
  certId: string;
  lab: Lab;
  /** Defaults to the Azure Portal simulator. Pass a different mock (e.g. AWS Console) to reuse this same lab chrome for another provider. */
  environment?: ReactNode;
}) {
  const [remaining, setRemaining] = useState(lab.totalMinutes);
  const [tasks, setTasks] = useState<LabTask[]>(lab.tasks);
  const [ended, setEnded] = useState(false);
  const [simulatorOpen, setSimulatorOpen] = useState(!lab.steps || lab.steps.length === 0);
  const resetStore = useLabStore((s) => s.reset);
  const awsBuckets = useAwsLabStore((s) => s.buckets);
  const resetAwsStore = useAwsLabStore((s) => s.reset);
  const adUsers = useAdLabStore((s) => s.users);
  const adSelectedOu = useAdLabStore((s) => s.selectedOu);
  const resetAdStore = useAdLabStore((s) => s.reset);
  const gcpBuckets = useGcpLabStore((s) => s.buckets);
  const resetGcpStore = useGcpLabStore((s) => s.reset);
  const m365Users = useM365LabStore((s) => s.users);
  const resetM365Store = useM365LabStore((s) => s.reset);
  const vsphereVms = useVSphereLabStore((s) => s.vms);
  const resetVSphereStore = useVSphereLabStore((s) => s.reset);
  const ciscoHostname = useCiscoLabStore((s) => s.hostname);
  const ciscoHasEnteredPrivileged = useCiscoLabStore((s) => s.hasEnteredPrivileged);
  const ciscoInterfaces = useCiscoLabStore((s) => s.interfaces);
  const resetCiscoStore = useCiscoLabStore((s) => s.reset);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [ended]);

  // For labs backed by a real store (currently only s3-bucket outside the
  // dedicated Azure path), derive task completion from that store instead of
  // relying on the user to tick checkboxes by hand.
  const TASK_CHECKERS: Partial<Record<NonNullable<Lab["interactive"]>, (taskId: string) => boolean>> = {
    "s3-bucket": (taskId) => {
      if (taskId === "bucket-created") return awsBuckets.length > 0;
      if (taskId === "bucket-region") return awsBuckets.some((b) => b.region === TARGET_BUCKET_REGION);
      if (taskId === "bucket-secure") return awsBuckets.some((b) => b.blockPublicAccess);
      return false;
    },
    "ad-user": (taskId) => {
      if (taskId === "ou-selected") return adSelectedOu === TARGET_OU;
      if (taskId === "user-created") return adUsers.length > 0;
      if (taskId === "user-in-ou") return adUsers.some((u) => u.ou === TARGET_OU);
      return false;
    },
    "gcs-bucket": (taskId) => {
      if (taskId === "bucket-created") return gcpBuckets.length > 0;
      if (taskId === "bucket-region") return gcpBuckets.some((b) => b.location === TARGET_LOCATION);
      if (taskId === "bucket-storage-class") return gcpBuckets.length > 0;
      return false;
    },
    "m365-user": (taskId) => {
      if (taskId === "user-created") return m365Users.length > 0;
      if (taskId === "user-licensed") return m365Users.some((u) => u.license !== "Keine Lizenz");
      return false;
    },
    "cisco-router": (taskId) => {
      if (taskId === "privileged-mode") return ciscoHasEnteredPrivileged;
      if (taskId === "hostname-set") return ciscoHostname === TARGET_HOSTNAME;
      if (taskId === "interface-ip") return ciscoInterfaces.some((i) => i.ip === TARGET_IP && i.mask === TARGET_MASK);
      if (taskId === "interface-enabled") return ciscoInterfaces.some((i) => i.ip === TARGET_IP && i.enabled);
      return false;
    },
    "vsphere-vm": (taskId) => {
      if (taskId === "vsphere-vm-created") return vsphereVms.length > 0;
      if (taskId === "vsphere-vm-host") return vsphereVms.some((v) => v.host === ESXI_TARGET_HOST);
      if (taskId === "vsphere-vm-resources") return vsphereVms.length > 0;
      return false;
    },
  };
  const activeChecker = lab.interactive ? TASK_CHECKERS[lab.interactive] : undefined;
  const effectiveTasks: LabTask[] = activeChecker
    ? tasks.map((t) => ({ ...t, done: activeChecker(t.id) }))
    : tasks;

  function toggleTask(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function restart() {
    setEnded(false);
    setRemaining(lab.totalMinutes);
    if (
      lab.interactive === "resource-group" ||
      lab.interactive === "virtual-machine" ||
      lab.interactive === "virtual-network"
    )
      resetStore();
    if (lab.interactive === "s3-bucket") resetAwsStore();
    if (lab.interactive === "ad-user") resetAdStore();
    if (lab.interactive === "gcs-bucket") resetGcpStore();
    if (lab.interactive === "m365-user") resetM365Store();
    if (lab.interactive === "cisco-router") resetCiscoStore();
    if (lab.interactive === "vsphere-vm") resetVSphereStore();
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

  if (
    lab.interactive === "resource-group" ||
    lab.interactive === "virtual-machine" ||
    lab.interactive === "virtual-network"
  ) {
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
    <div className={simulatorOpen ? "" : "p-4 md:p-8"}>
      {!simulatorOpen && (
        <LabHeader
          companyName={companyName}
          companySlug={companySlug}
          certCode={certCode}
          certId={certId}
          lab={lab}
          remainingSeconds={remaining}
          onEnd={() => setEnded(true)}
        />
      )}

      {!simulatorOpen && lab.steps && lab.steps.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_280px]">
          <div>
            <LabStepsOverview steps={lab.steps} onOpen={() => setSimulatorOpen(true)} />
          </div>
          <div>
            <LabSidebar lab={lab} tasks={effectiveTasks} onToggleTask={toggleTask} />
          </div>
        </div>
      ) : (
        <>
          {simulatorOpen && (
            <Link
              href={`/certifications/${companySlug}/${certId}`}
              className="mb-2 ml-2 mt-2 inline-flex items-center gap-1 text-xs text-text-faint hover:text-text"
            >
              <ChevronLeft size={14} />
              Zurück zum Lab
            </Link>
          )}
          <div className={simulatorOpen ? "" : "mt-4"}>
            {environment ?? <VirtualEnvironment />}
          </div>

          {!simulatorOpen && (
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_280px]">
              <div>
                <LabOverviewPanel lab={lab} />
              </div>
              <div>
                <LabSidebar lab={lab} tasks={effectiveTasks} onToggleTask={toggleTask} />
              </div>
            </div>
          )}
        </>
      )}

      {(lab.docs.length > 0 || true) && (
        <div
          className={`grid grid-cols-1 gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px] ${
            simulatorOpen ? "bg-[#0D1324] px-4 py-6 md:px-8" : "px-4 pb-6 pt-6 md:px-8"
          }`}
        >
          <div className="hidden xl:order-1 xl:block" />

          {lab.docs.length > 0 && (
            <div
              className={`xl:order-2 ${
                simulatorOpen ? "p-1" : "rounded-2xl border border-border-soft bg-panel p-5"
              }`}
            >
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

          <div
            className={`xl:order-3 ${simulatorOpen ? "p-1" : "rounded-2xl border border-border-soft bg-panel p-5"}`}
          >
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
