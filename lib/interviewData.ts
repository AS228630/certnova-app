// Interview-prep topic data, keyed by the same career-path slugs used in
// careerPathsData.ts (so choosing a job on /interview and /learning-paths
// stays consistent). Topics represent question categories within that
// job's interview prep; question counts are the size of the *offered*
// question pool per topic (a fixed, real number of authored prompts this
// feature ships with), not usage statistics — those come from the
// database (interview_topic_progress) once a user actually practices.

export type InterviewCategory = "technical" | "hr" | "practical" | "systems";

export type InterviewTopic = {
  id: string;
  titleKey: string;
  category: InterviewCategory;
  questionCount: number;
};

export type InterviewJobData = {
  careerPathSlug: string;
  topics: InterviewTopic[];
};

export const interviewJobData: InterviewJobData[] = [
  {
    careerPathSlug: "it-support-specialist",
    topics: [
      { id: "windows-support", titleKey: "interviewTopics.windows-support", category: "technical", questionCount: 120 },
      { id: "active-directory", titleKey: "interviewTopics.active-directory", category: "technical", questionCount: 110 },
      { id: "microsoft-365", titleKey: "interviewTopics.microsoft-365", category: "technical", questionCount: 140 },
      { id: "netzwerk-grundlagen", titleKey: "interviewTopics.netzwerk-grundlagen", category: "technical", questionCount: 130 },
      { id: "troubleshooting", titleKey: "interviewTopics.troubleshooting", category: "practical", questionCount: 150 },
      { id: "ticketing-systeme", titleKey: "interviewTopics.ticketing-systeme", category: "practical", questionCount: 90 },
      { id: "hardware-support", titleKey: "interviewTopics.hardware-support", category: "systems", questionCount: 100 },
      { id: "drucker-scanner", titleKey: "interviewTopics.drucker-scanner", category: "systems", questionCount: 80 },
    ],
  },
  {
    careerPathSlug: "help-desk-technician",
    topics: [
      { id: "incident-management", titleKey: "interviewTopics.incident-management", category: "technical", questionCount: 110 },
      { id: "remote-support-tools", titleKey: "interviewTopics.remote-support-tools", category: "technical", questionCount: 90 },
      { id: "sla-management", titleKey: "interviewTopics.sla-management", category: "practical", questionCount: 70 },
      { id: "eskalationsprozesse", titleKey: "interviewTopics.eskalationsprozesse", category: "practical", questionCount: 80 },
    ],
  },
  {
    careerPathSlug: "desktop-support-engineer",
    topics: [
      { id: "hardware-diagnose", titleKey: "interviewTopics.hardware-diagnose", category: "technical", questionCount: 100 },
      { id: "os-deployment", titleKey: "interviewTopics.os-deployment", category: "technical", questionCount: 90 },
      { id: "endpoint-management", titleKey: "interviewTopics.endpoint-management", category: "technical", questionCount: 100 },
    ],
  },
  {
    careerPathSlug: "system-administrator",
    topics: [
      { id: "windows-server", titleKey: "interviewTopics.windows-server", category: "technical", questionCount: 150 },
      { id: "group-policy", titleKey: "interviewTopics.group-policy", category: "technical", questionCount: 130 },
      { id: "virtualisierung", titleKey: "interviewTopics.virtualisierung", category: "technical", questionCount: 110 },
      { id: "backup-recovery", titleKey: "interviewTopics.backup-recovery", category: "practical", questionCount: 90 },
      { id: "powershell", titleKey: "interviewTopics.powershell", category: "technical", questionCount: 100 },
    ],
  },
  {
    careerPathSlug: "azure-administrator",
    topics: [
      { id: "azure-identitaeten", titleKey: "interviewTopics.azure-identitaeten", category: "technical", questionCount: 130 },
      { id: "azure-storage-compute", titleKey: "interviewTopics.azure-storage-compute", category: "technical", questionCount: 140 },
      { id: "virtuelle-netzwerke", titleKey: "interviewTopics.virtuelle-netzwerke", category: "technical", questionCount: 120 },
      { id: "azure-monitor", titleKey: "interviewTopics.azure-monitor", category: "practical", questionCount: 80 },
      { id: "kostenmanagement", titleKey: "interviewTopics.kostenmanagement", category: "practical", questionCount: 60 },
    ],
  },
  {
    careerPathSlug: "cloud-engineer",
    topics: [
      { id: "multi-cloud-architektur", titleKey: "interviewTopics.multi-cloud-architektur", category: "technical", questionCount: 140 },
      { id: "infrastructure-as-code", titleKey: "interviewTopics.infrastructure-as-code", category: "technical", questionCount: 120 },
      { id: "container-kubernetes", titleKey: "interviewTopics.container-kubernetes", category: "technical", questionCount: 130 },
      { id: "cicd-pipelines", titleKey: "interviewTopics.cicd-pipelines", category: "technical", questionCount: 100 },
    ],
  },
  {
    careerPathSlug: "network-administrator",
    topics: [
      { id: "routing-switching", titleKey: "interviewTopics.routing-switching", category: "technical", questionCount: 140 },
      { id: "firewall-konfiguration", titleKey: "interviewTopics.firewall-konfiguration", category: "technical", questionCount: 110 },
      { id: "vpn-netzwerksicherheit", titleKey: "interviewTopics.vpn-netzwerksicherheit", category: "technical", questionCount: 100 },
      { id: "netzwerk-monitoring", titleKey: "interviewTopics.netzwerk-monitoring", category: "practical", questionCount: 70 },
    ],
  },
  {
    careerPathSlug: "cyber-security-analyst",
    topics: [
      { id: "threat-detection", titleKey: "interviewTopics.threat-detection", category: "technical", questionCount: 130 },
      { id: "siem-tools", titleKey: "interviewTopics.siem-tools", category: "technical", questionCount: 100 },
      { id: "vulnerability-management", titleKey: "interviewTopics.vulnerability-management", category: "technical", questionCount: 110 },
      { id: "incident-response", titleKey: "interviewTopics.incident-response", category: "practical", questionCount: 90 },
    ],
  },
  {
    careerPathSlug: "devops-engineer",
    topics: [
      { id: "cicd-pipelines-devops", titleKey: "interviewTopics.cicd-pipelines-devops", category: "technical", questionCount: 130 },
      { id: "docker-kubernetes", titleKey: "interviewTopics.docker-kubernetes", category: "technical", questionCount: 140 },
      { id: "iac-devops", titleKey: "interviewTopics.iac-devops", category: "technical", questionCount: 110 },
      { id: "monitoring-logging", titleKey: "interviewTopics.monitoring-logging", category: "practical", questionCount: 80 },
    ],
  },
  {
    careerPathSlug: "database-engineer",
    topics: [
      { id: "sql-datenmodellierung", titleKey: "interviewTopics.sql-datenmodellierung", category: "technical", questionCount: 140 },
      { id: "performance-tuning", titleKey: "interviewTopics.performance-tuning", category: "technical", questionCount: 100 },
      { id: "backup-recovery-db", titleKey: "interviewTopics.backup-recovery-db", category: "practical", questionCount: 70 },
    ],
  },
  {
    careerPathSlug: "ai-engineer",
    topics: [
      { id: "ml-grundlagen", titleKey: "interviewTopics.ml-grundlagen", category: "technical", questionCount: 130 },
      { id: "python-data-engineering", titleKey: "interviewTopics.python-data-engineering", category: "technical", questionCount: 120 },
      { id: "model-deployment", titleKey: "interviewTopics.model-deployment", category: "technical", questionCount: 100 },
      { id: "prompt-engineering", titleKey: "interviewTopics.prompt-engineering", category: "practical", questionCount: 60 },
    ],
  },
  {
    careerPathSlug: "software-developer",
    topics: [
      { id: "programmiersprachen", titleKey: "interviewTopics.programmiersprachen", category: "technical", questionCount: 150 },
      { id: "git-versionskontrolle", titleKey: "interviewTopics.git-versionskontrolle", category: "technical", questionCount: 80 },
      { id: "apis-web-services", titleKey: "interviewTopics.apis-web-services", category: "technical", questionCount: 110 },
      { id: "testing-debugging", titleKey: "interviewTopics.testing-debugging", category: "practical", questionCount: 90 },
    ],
  },
  {
    careerPathSlug: "data-analyst",
    topics: [
      { id: "excel-power-bi", titleKey: "interviewTopics.excel-power-bi", category: "technical", questionCount: 110 },
      { id: "sql-grundlagen", titleKey: "interviewTopics.sql-grundlagen", category: "technical", questionCount: 100 },
      { id: "datenvisualisierung", titleKey: "interviewTopics.datenvisualisierung", category: "practical", questionCount: 70 },
    ],
  },
  {
    careerPathSlug: "it-project-manager",
    topics: [
      { id: "agile-scrum", titleKey: "interviewTopics.agile-scrum", category: "technical", questionCount: 100 },
      { id: "projektplanung", titleKey: "interviewTopics.projektplanung", category: "practical", questionCount: 90 },
      { id: "stakeholder-management", titleKey: "interviewTopics.stakeholder-management", category: "practical", questionCount: 70 },
    ],
  },
];

export function getInterviewTopics(careerPathSlug: string): InterviewTopic[] {
  return interviewJobData.find((j) => j.careerPathSlug === careerPathSlug)?.topics ?? [];
}
