"use client";

import { create } from "zustand";

export type K8sPod = {
  name: string;
  namespace: string;
  image: string;
  status: "Running" | "Pending" | "Terminating";
  restarts: number;
  createdAt: number;
};

export type K8sDeployment = {
  name: string;
  namespace: string;
  image: string;
  replicas: number;
  readyReplicas: number;
  createdAt: number;
};

export type CliLine = { type: "in" | "out" | "err"; text: string };

export const TARGET_NAMESPACE = "default";
export const TARGET_DEPLOYMENT_NAME = "cc-lab-app";

function randomSuffix(): string {
  return Array.from({ length: 5 }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join(
    ""
  );
}

type K8sLabState = {
  deployments: K8sDeployment[];
  pods: K8sPod[];
  cliLog: CliLine[];
  mistakeCount: number;

  runCliCommand: (raw: string) => void;
  reset: () => void;
};

const initialCliLog: CliLine[] = [
  { type: "out", text: "Willkommen in der isolierten kubectl-CLI. Tippe `help` für verfügbare Befehle." },
];

function podsForDeployment(dep: K8sDeployment): K8sPod[] {
  return Array.from({ length: dep.replicas }).map((_, i) => ({
    name: `${dep.name}-${randomSuffix()}-${randomSuffix().slice(0, 5)}`,
    namespace: dep.namespace,
    image: dep.image,
    status: "Running" as const,
    restarts: 0,
    createdAt: Date.now(),
  }));
}

export const useK8sLabStore = create<K8sLabState>((set, get) => ({
  deployments: [],
  pods: [],
  cliLog: initialCliLog,
  mistakeCount: 0,

  runCliCommand: (raw) => {
    const text = raw.trim();
    if (!text) return;
    set((s) => ({ cliLog: [...s.cliLog, { type: "in", text: `$ ${text}` }] }));

    if (text === "clear") {
      set({ cliLog: [] });
      return;
    }

    if (text === "help") {
      set((s) => ({
        cliLog: [
          ...s.cliLog,
          {
            type: "out",
            text: "Unterstützt: kubectl create deployment <name> --image=<image> [--replicas=<n>], kubectl get deployments, kubectl get pods, kubectl scale deployment <name> --replicas=<n>, kubectl delete deployment <name>, clear",
          },
        ],
      }));
      return;
    }

    const createMatch = text.match(
      /^kubectl\s+create\s+deployment\s+([a-z0-9-]+)\s+--image=([a-z0-9._/-]+(?::[a-z0-9._-]+)?)(?:\s+--replicas=(\d+))?$/i
    );
    if (createMatch) {
      const [, name, image, replicasStr] = createMatch;
      if (get().deployments.some((d) => d.name === name)) {
        set((s) => ({
          cliLog: [...s.cliLog, { type: "err", text: `Error from server (AlreadyExists): deployments.apps "${name}" already exists` }],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      const replicas = replicasStr ? Number(replicasStr) : 1;
      const dep: K8sDeployment = {
        name,
        namespace: TARGET_NAMESPACE,
        image,
        replicas,
        readyReplicas: replicas,
        createdAt: Date.now(),
      };
      const newPods = podsForDeployment(dep);
      set((s) => ({
        deployments: [...s.deployments, dep],
        pods: [...s.pods, ...newPods],
        cliLog: [...s.cliLog, { type: "out", text: `deployment.apps/${name} created` }],
      }));
      return;
    }

    if (/^kubectl\s+get\s+deployments?$/i.test(text)) {
      const deployments = get().deployments;
      const header = "NAME           READY   UP-TO-DATE   AVAILABLE   AGE";
      if (deployments.length === 0) {
        set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: "No resources found in default namespace." }] }));
        return;
      }
      const table = [
        header,
        ...deployments.map(
          (d) => `${d.name.padEnd(15)}${`${d.readyReplicas}/${d.replicas}`.padEnd(8)}${String(d.replicas).padEnd(13)}${String(d.readyReplicas).padEnd(12)}gerade eben`
        ),
      ].join("\n");
      set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: table }] }));
      return;
    }

    if (/^kubectl\s+get\s+pods?$/i.test(text)) {
      const pods = get().pods;
      const header = "NAME                          READY   STATUS    RESTARTS   AGE";
      if (pods.length === 0) {
        set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: "No resources found in default namespace." }] }));
        return;
      }
      const table = [
        header,
        ...pods.map((p) => `${p.name.padEnd(30)}${"1/1".padEnd(8)}${p.status.padEnd(10)}${String(p.restarts).padEnd(11)}gerade eben`),
      ].join("\n");
      set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: table }] }));
      return;
    }

    const scaleMatch = text.match(/^kubectl\s+scale\s+deployment\s+([a-z0-9-]+)\s+--replicas=(\d+)$/i);
    if (scaleMatch) {
      const [, name, replicasStr] = scaleMatch;
      const replicas = Number(replicasStr);
      const dep = get().deployments.find((d) => d.name === name);
      if (!dep) {
        set((s) => ({
          cliLog: [...s.cliLog, { type: "err", text: `Error from server (NotFound): deployments.apps "${name}" not found` }],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      const updatedDep = { ...dep, replicas, readyReplicas: replicas };
      const otherPods = get().pods.filter((p) => !p.name.startsWith(`${name}-`));
      const newPods = podsForDeployment(updatedDep);
      set((s) => ({
        deployments: s.deployments.map((d) => (d.name === name ? updatedDep : d)),
        pods: [...otherPods, ...newPods],
        cliLog: [...s.cliLog, { type: "out", text: `deployment.apps/${name} scaled` }],
      }));
      return;
    }

    const deleteMatch = text.match(/^kubectl\s+delete\s+deployment\s+([a-z0-9-]+)$/i);
    if (deleteMatch) {
      const name = deleteMatch[1];
      if (!get().deployments.some((d) => d.name === name)) {
        set((s) => ({
          cliLog: [...s.cliLog, { type: "err", text: `Error from server (NotFound): deployments.apps "${name}" not found` }],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      set((s) => ({
        deployments: s.deployments.filter((d) => d.name !== name),
        pods: s.pods.filter((p) => !p.name.startsWith(`${name}-`)),
        cliLog: [...s.cliLog, { type: "out", text: `deployment.apps "${name}" deleted` }],
      }));
      return;
    }

    set((s) => ({
      cliLog: [
        ...s.cliLog,
        { type: "err", text: `Befehl nicht erkannt: "${text}". Tippe \`help\` für verfügbare Befehle.` },
      ],
      mistakeCount: s.mistakeCount + 1,
    }));
  },

  reset: () => set({ deployments: [], pods: [], cliLog: initialCliLog, mistakeCount: 0 }),
}));
