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
  title: string;
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
      { id: "windows-support", title: "Windows Support", category: "technical", questionCount: 120 },
      { id: "active-directory", title: "Active Directory", category: "technical", questionCount: 110 },
      { id: "microsoft-365", title: "Microsoft 365", category: "technical", questionCount: 140 },
      { id: "netzwerk-grundlagen", title: "Netzwerk Grundlagen", category: "technical", questionCount: 130 },
      { id: "troubleshooting", title: "Troubleshooting", category: "practical", questionCount: 150 },
      { id: "ticketing-systeme", title: "Ticketing Systeme", category: "practical", questionCount: 90 },
      { id: "hardware-support", title: "Hardware Support", category: "systems", questionCount: 100 },
      { id: "drucker-scanner", title: "Drucker & Scanner", category: "systems", questionCount: 80 },
    ],
  },
  {
    careerPathSlug: "help-desk-technician",
    topics: [
      { id: "incident-management", title: "Incident Management", category: "technical", questionCount: 110 },
      { id: "remote-support-tools", title: "Remote-Support-Tools", category: "technical", questionCount: 90 },
      { id: "sla-management", title: "SLA-Management", category: "practical", questionCount: 70 },
      { id: "eskalationsprozesse", title: "Eskalationsprozesse", category: "practical", questionCount: 80 },
    ],
  },
  {
    careerPathSlug: "desktop-support-engineer",
    topics: [
      { id: "hardware-diagnose", title: "Hardware-Diagnose", category: "technical", questionCount: 100 },
      { id: "os-deployment", title: "Betriebssystem-Deployment", category: "technical", questionCount: 90 },
      { id: "endpoint-management", title: "Endpoint Management", category: "technical", questionCount: 100 },
    ],
  },
  {
    careerPathSlug: "system-administrator",
    topics: [
      { id: "windows-server", title: "Windows Server Administration", category: "technical", questionCount: 150 },
      { id: "group-policy", title: "Active Directory & Group Policy", category: "technical", questionCount: 130 },
      { id: "virtualisierung", title: "Virtualisierung", category: "technical", questionCount: 110 },
      { id: "backup-recovery", title: "Backup & Disaster Recovery", category: "practical", questionCount: 90 },
      { id: "powershell", title: "PowerShell-Scripting", category: "technical", questionCount: 100 },
    ],
  },
  {
    careerPathSlug: "azure-administrator",
    topics: [
      { id: "azure-identitaeten", title: "Azure-Identitäten & Governance", category: "technical", questionCount: 130 },
      { id: "azure-storage-compute", title: "Azure Storage & Compute", category: "technical", questionCount: 140 },
      { id: "virtuelle-netzwerke", title: "Virtuelle Netzwerke", category: "technical", questionCount: 120 },
      { id: "azure-monitor", title: "Azure Monitor", category: "practical", questionCount: 80 },
      { id: "kostenmanagement", title: "Kostenmanagement", category: "practical", questionCount: 60 },
    ],
  },
  {
    careerPathSlug: "cloud-engineer",
    topics: [
      { id: "multi-cloud-architektur", title: "Multi-Cloud-Architektur", category: "technical", questionCount: 140 },
      { id: "infrastructure-as-code", title: "Infrastructure as Code", category: "technical", questionCount: 120 },
      { id: "container-kubernetes", title: "Container & Kubernetes", category: "technical", questionCount: 130 },
      { id: "cicd-pipelines", title: "CI/CD-Pipelines", category: "technical", questionCount: 100 },
    ],
  },
  {
    careerPathSlug: "network-administrator",
    topics: [
      { id: "routing-switching", title: "Routing & Switching", category: "technical", questionCount: 140 },
      { id: "firewall-konfiguration", title: "Firewall-Konfiguration", category: "technical", questionCount: 110 },
      { id: "vpn-netzwerksicherheit", title: "VPN & Netzwerksicherheit", category: "technical", questionCount: 100 },
      { id: "netzwerk-monitoring", title: "Netzwerk-Monitoring", category: "practical", questionCount: 70 },
    ],
  },
  {
    careerPathSlug: "cyber-security-analyst",
    topics: [
      { id: "threat-detection", title: "Threat Detection & Response", category: "technical", questionCount: 130 },
      { id: "siem-tools", title: "SIEM-Tools", category: "technical", questionCount: 100 },
      { id: "vulnerability-management", title: "Vulnerability-Management", category: "technical", questionCount: 110 },
      { id: "incident-response", title: "Incident-Response", category: "practical", questionCount: 90 },
    ],
  },
  {
    careerPathSlug: "devops-engineer",
    topics: [
      { id: "cicd-pipelines-devops", title: "CI/CD-Pipelines", category: "technical", questionCount: 130 },
      { id: "docker-kubernetes", title: "Docker & Kubernetes", category: "technical", questionCount: 140 },
      { id: "iac-devops", title: "Infrastructure as Code", category: "technical", questionCount: 110 },
      { id: "monitoring-logging", title: "Monitoring & Logging", category: "practical", questionCount: 80 },
    ],
  },
  {
    careerPathSlug: "database-engineer",
    topics: [
      { id: "sql-datenmodellierung", title: "SQL & Datenmodellierung", category: "technical", questionCount: 140 },
      { id: "performance-tuning", title: "Datenbank-Performance-Tuning", category: "technical", questionCount: 100 },
      { id: "backup-recovery-db", title: "Backup & Recovery", category: "practical", questionCount: 70 },
    ],
  },
  {
    careerPathSlug: "ai-engineer",
    topics: [
      { id: "ml-grundlagen", title: "Machine-Learning-Grundlagen", category: "technical", questionCount: 130 },
      { id: "python-data-engineering", title: "Python & Data Engineering", category: "technical", questionCount: 120 },
      { id: "model-deployment", title: "Modell-Deployment & MLOps", category: "technical", questionCount: 100 },
      { id: "prompt-engineering", title: "Prompt Engineering", category: "practical", questionCount: 60 },
    ],
  },
  {
    careerPathSlug: "software-developer",
    topics: [
      { id: "programmiersprachen", title: "Programmiersprachen", category: "technical", questionCount: 150 },
      { id: "git-versionskontrolle", title: "Versionskontrolle (Git)", category: "technical", questionCount: 80 },
      { id: "apis-web-services", title: "APIs & Web-Services", category: "technical", questionCount: 110 },
      { id: "testing-debugging", title: "Testing & Debugging", category: "practical", questionCount: 90 },
    ],
  },
  {
    careerPathSlug: "data-analyst",
    topics: [
      { id: "excel-power-bi", title: "Excel & Power BI", category: "technical", questionCount: 110 },
      { id: "sql-grundlagen", title: "SQL-Grundlagen", category: "technical", questionCount: 100 },
      { id: "datenvisualisierung", title: "Datenvisualisierung", category: "practical", questionCount: 70 },
    ],
  },
  {
    careerPathSlug: "it-project-manager",
    topics: [
      { id: "agile-scrum", title: "Agile & Scrum", category: "technical", questionCount: 100 },
      { id: "projektplanung", title: "Projektplanung & Budgetierung", category: "practical", questionCount: 90 },
      { id: "stakeholder-management", title: "Stakeholder-Management", category: "practical", questionCount: 70 },
    ],
  },
];

export function getInterviewTopics(careerPathSlug: string): InterviewTopic[] {
  return interviewJobData.find((j) => j.careerPathSlug === careerPathSlug)?.topics ?? [];
}
