// Maps the fine-grained topicId used inside practice questions
// (lib/az900Practice.ts, az104Practice.ts, ab900Practice.ts) to one of a
// small set of broad skill areas shown on the dashboard's mastery chart.
//
// These 5 areas were chosen to match what the platform's content
// actually covers today (Azure/Microsoft certifications) rather than a
// generic list — there is no Linux or general DevOps content in the
// catalog yet, so a "Linux" bucket would always read 0% and mislead
// rather than inform. If Linux/AWS/GCP question banks are added later,
// extend TOPIC_AREA_MAP and TOPIC_AREAS together.
export const TOPIC_AREAS = [
  { id: "cloud", labelKey: "mastery.cloud" },
  { id: "security", labelKey: "mastery.security" },
  { id: "networking", labelKey: "mastery.networking" },
  { id: "governance", labelKey: "mastery.governance" },
  { id: "ai", labelKey: "mastery.ai" },
] as const;

export type TopicAreaId = (typeof TOPIC_AREAS)[number]["id"];

const TOPIC_AREA_MAP: Record<string, TopicAreaId> = {
  "azure-architektur": "cloud",
  "azure-verwaltung": "cloud",
  "cloud-konzepte": "cloud",
  compute: "cloud",
  speicher: "cloud",
  bereitstellung: "cloud",

  "azure-identitaeten": "security",
  "sicherheit-identitaet": "security",

  netzwerke: "networking",

  governance: "governance",
  "verwaltung-governance": "governance",
  "purview-compliance": "governance",
  ueberwachung: "governance",

  "copilot-agenten": "ai",
  "copilot-grundlagen": "ai",
  "verantwortungsvolle-ki": "ai",
};

/** Returns null for any topicId not in the map, so callers can skip
 * recording mastery for content that doesn't map to a known area yet,
 * rather than silently miscategorizing it. */
export function topicAreaFor(topicId: string): TopicAreaId | null {
  return TOPIC_AREA_MAP[topicId] ?? null;
}
