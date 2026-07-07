"use client";

import { create } from "zustand";

export type DockerContainer = {
  id: string;
  name: string;
  image: string;
  status: "running" | "exited";
  ports: string;
  createdAt: number;
};

export type DockerImage = {
  repository: string;
  tag: string;
  imageId: string;
  createdAt: number;
};

export type CliLine = { type: "in" | "out" | "err"; text: string };

export const TARGET_IMAGE = "nginx";
export const TARGET_CONTAINER_NAME = "cc-lab-web";

const BASE_IMAGES: Record<string, string> = {
  nginx: "605c77e624dd",
  "httpd": "2622e6cca7eb",
  redis: "7614ae9453d1",
  "ubuntu": "3339fde08fc3",
  "node": "5a41d1c96f26",
};

function randomContainerId(): string {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

type DockerLabState = {
  images: DockerImage[];
  containers: DockerContainer[];
  cliLog: CliLine[];
  mistakeCount: number;

  runCliCommand: (raw: string) => void;
  reset: () => void;
};

const initialCliLog: CliLine[] = [
  { type: "out", text: "Willkommen in der isolierten Docker-CLI. Tippe `help` für verfügbare Befehle." },
];

export const useDockerLabStore = create<DockerLabState>((set, get) => ({
  images: [],
  containers: [],
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
            text: "Unterstützt: docker pull <image>, docker images, docker run -d --name <name> -p <host>:<container> <image>, docker ps, docker ps -a, docker stop <name>, docker rm <name>, docker rmi <image>, clear",
          },
        ],
      }));
      return;
    }

    const pullMatch = text.match(/^docker\s+pull\s+([a-z0-9._/-]+)(?::([a-z0-9._-]+))?$/i);
    if (pullMatch) {
      const repository = pullMatch[1].toLowerCase();
      const tag = pullMatch[2]?.toLowerCase() ?? "latest";
      if (get().images.some((i) => i.repository === repository && i.tag === tag)) {
        set((s) => ({
          cliLog: [...s.cliLog, { type: "out", text: `Image is up to date for ${repository}:${tag}` }],
        }));
        return;
      }
      const imageId = BASE_IMAGES[repository] ?? randomContainerId();
      const image: DockerImage = { repository, tag, imageId, createdAt: Date.now() };
      set((s) => ({
        images: [...s.images, image],
        cliLog: [
          ...s.cliLog,
          {
            type: "out",
            text: `${tag}: Pulling from library/${repository}\nDigest: sha256:${imageId}...\nStatus: Downloaded newer image for ${repository}:${tag}`,
          },
        ],
      }));
      return;
    }

    if (/^docker\s+images$/i.test(text)) {
      const images = get().images;
      if (images.length === 0) {
        set((s) => ({
          cliLog: [...s.cliLog, { type: "out", text: "REPOSITORY   TAG       IMAGE ID       CREATED" }],
        }));
        return;
      }
      const table = [
        "REPOSITORY   TAG       IMAGE ID       CREATED",
        ...images.map((i) => `${i.repository.padEnd(13)}${i.tag.padEnd(10)}${i.imageId.slice(0, 12).padEnd(15)}gerade eben`),
      ].join("\n");
      set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: table }] }));
      return;
    }

    const runMatch = text.match(
      /^docker\s+run\s+(?:(-d)\s+)?(?:--name\s+([a-zA-Z0-9._-]+)\s+)?(?:-p\s+(\d+):(\d+)\s+)?([a-z0-9._/-]+)(?::([a-z0-9._-]+))?$/i
    );
    if (runMatch) {
      const [, , nameFlag, hostPort, containerPort, repository, tag] = runMatch;
      const image = `${repository.toLowerCase()}:${tag?.toLowerCase() ?? "latest"}`;
      if (!get().images.some((i) => `${i.repository}:${i.tag}` === image)) {
        set((s) => ({
          cliLog: [
            ...s.cliLog,
            {
              type: "err",
              text: `Unable to find image '${image}' locally\ndocker: Error response from daemon: pull access denied, run "docker pull ${repository}" first.`,
            },
          ],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      const name = nameFlag ?? `container-${randomContainerId().slice(0, 6)}`;
      if (get().containers.some((c) => c.name === name)) {
        set((s) => ({
          cliLog: [
            ...s.cliLog,
            { type: "err", text: `docker: Error response from daemon: Conflict. The container name "${name}" is already in use.` },
          ],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      const id = randomContainerId();
      const container: DockerContainer = {
        id,
        name,
        image,
        status: "running",
        ports: hostPort && containerPort ? `${hostPort}->${containerPort}/tcp` : "",
        createdAt: Date.now(),
      };
      set((s) => ({
        containers: [...s.containers, container],
        cliLog: [...s.cliLog, { type: "out", text: id }],
      }));
      return;
    }

    if (/^docker\s+ps(\s+-a)?$/i.test(text)) {
      const showAll = /-a/.test(text);
      const containers = get().containers.filter((c) => showAll || c.status === "running");
      const header = "CONTAINER ID   IMAGE        COMMAND   STATUS      PORTS                  NAMES";
      if (containers.length === 0) {
        set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: header }] }));
        return;
      }
      const table = [
        header,
        ...containers.map(
          (c) =>
            `${c.id.slice(0, 12).padEnd(15)}${c.image.padEnd(13)}"..."     ${(c.status === "running" ? "Up" : "Exited").padEnd(12)}${c.ports.padEnd(23)}${c.name}`
        ),
      ].join("\n");
      set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: table }] }));
      return;
    }

    const stopMatch = text.match(/^docker\s+stop\s+([a-zA-Z0-9._-]+)$/i);
    if (stopMatch) {
      const name = stopMatch[1];
      if (!get().containers.some((c) => c.name === name)) {
        set((s) => ({
          cliLog: [...s.cliLog, { type: "err", text: `Error: No such container: ${name}` }],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      set((s) => ({
        containers: s.containers.map((c) => (c.name === name ? { ...c, status: "exited" } : c)),
        cliLog: [...s.cliLog, { type: "out", text: name }],
      }));
      return;
    }

    const rmMatch = text.match(/^docker\s+rm\s+(-f\s+)?([a-zA-Z0-9._-]+)$/i);
    if (rmMatch) {
      const name = rmMatch[2];
      const container = get().containers.find((c) => c.name === name);
      if (!container) {
        set((s) => ({
          cliLog: [...s.cliLog, { type: "err", text: `Error: No such container: ${name}` }],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      if (container.status === "running" && !rmMatch[1]) {
        set((s) => ({
          cliLog: [
            ...s.cliLog,
            { type: "err", text: `Error response from daemon: You cannot remove a running container. Stop it first or use -f.` },
          ],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      set((s) => ({
        containers: s.containers.filter((c) => c.name !== name),
        cliLog: [...s.cliLog, { type: "out", text: name }],
      }));
      return;
    }

    const rmiMatch = text.match(/^docker\s+rmi\s+([a-z0-9._/-]+)(?::([a-z0-9._-]+))?$/i);
    if (rmiMatch) {
      const repository = rmiMatch[1].toLowerCase();
      const tag = rmiMatch[2]?.toLowerCase() ?? "latest";
      set((s) => ({
        images: s.images.filter((i) => !(i.repository === repository && i.tag === tag)),
        cliLog: [...s.cliLog, { type: "out", text: `Untagged: ${repository}:${tag}` }],
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

  reset: () => set({ images: [], containers: [], cliLog: initialCliLog, mistakeCount: 0 }),
}));
