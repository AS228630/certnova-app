import {
  Headset,
  Monitor,
  Laptop,
  ServerCog,
  Cloud,
  CloudCog,
  Network,
  ShieldCheck,
  GitBranch,
  Database,
  BrainCircuit,
  Code2,
  LineChart,
  Kanban,
  type LucideIcon,
} from "lucide-react";
import type { CareerPath } from "@/lib/careerPathsData";

const ICONS: Record<CareerPath["icon"], LucideIcon> = {
  headset: Headset,
  desktop: Monitor,
  monitor: Laptop,
  server: ServerCog,
  "cloud-azure": Cloud,
  "cloud-gcp": CloudCog,
  network: Network,
  shield: ShieldCheck,
  devops: GitBranch,
  database: Database,
  ai: BrainCircuit,
  code: Code2,
  chart: LineChart,
  kanban: Kanban,
};

export function getCareerPathIcon(icon: CareerPath["icon"]): LucideIcon {
  return ICONS[icon];
}

export function renderCareerPathIcon(icon: CareerPath["icon"], size = 20) {
  const Icon = ICONS[icon];
  return <Icon size={size} />;
}
