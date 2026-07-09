// English translations of the 42 hand-authored Microsoft cert descriptions
// (lib/companiesData.ts's MICROSOFT_CERTS). Kept as a standalone lookup
// (like lib/i18n/questions/) rather than part of the shared Dictionary
// type, since these are per-cert-id overrides, not UI chrome strings.
// Falls back to the German original for any cert id not listed here.

const msCertDescriptions_en: Record<string, string> = {
  "az-104": "Manages Azure identities, governance, storage, and more.",
  "az-900": "Understand fundamental cloud concepts and services.",
  "ab-900": "Will soon be filled with its own course material.",
  "az-305": "Design and optimize solutions on Azure.",
  "az-204": "Develop solutions on Microsoft Azure.",
  "az-400": "Design and implement DevOps processes.",
  "az-500": "Implement security controls and protective measures.",
  "az-700": "Implement network solutions on Microsoft Azure.",
  "az-800": "Manage hybrid environments with Windows Server.",
  "dp-900": "Fundamental data concepts and services in Azure.",
  "az-801": "Advanced management of hybrid Windows Server environments.",
  "az-140": "Plan and configure an Azure Virtual Desktop infrastructure.",
  "az-120": "Manage Microsoft cloud data center solutions.",
  "az-220": "Design and implement IoT solutions on Azure.",
  "az-600": "Configure and operate Azure Stack Hub.",
  "az-720": "Troubleshoot network connectivity issues in Azure.",
  "sc-900": "Fundamentals of security, compliance, and identity in Microsoft services.",
  "sc-200": "Detect, investigate, and respond to threats.",
  "sc-300": "Design and implement identity solutions.",
  "sc-400": "Protect information in Microsoft 365 environments.",
  "sc-100": "Design cybersecurity strategies for enterprises.",
  "md-102": "Manage and protect devices in enterprises.",
  "sc-401": "Implement data security and compliance solutions.",
  "sc-5001": "Advanced threat detection with Microsoft security tools.",
  "ai-900": "Fundamental concepts of AI and machine learning.",
  "ai-102": "Design and implement AI solutions on Azure.",
  "ai-fdc": "Fundamentals of using Microsoft Copilot in everyday work.",
  "dp-100": "Design and implement machine learning solutions.",
  "ai-102x": "Architecture of large-scale AI solutions for enterprises.",
  "pl-300ai": "Prepare, model, and visualize data with Power BI.",
  "dp-203": "Design and implement data solutions on Azure.",
  "dp-300": "Manage relational databases in the cloud.",
  "dp-420": "Design and implement Cosmos DB solutions.",
  "dp-500": "Scalable analytics solutions with Azure and Power BI.",
  "dp-600": "Build analytics solutions with Microsoft Fabric.",
  "dp-700": "Implement data engineering solutions with Microsoft Fabric.",
  "pl-300": "Data modeling and visualization with Power BI.",
  "ms-900": "Fundamental concepts and core services of Microsoft 365.",
  "ms-102": "Manage services, security, and compliance in Microsoft 365.",
  "md-1021": "Deploy and manage devices in Microsoft 365.",
  "mo-201": "Advanced data analysis and automation in Excel.",
  "ms-700": "Plan and manage Microsoft Teams environments.",
};

export default msCertDescriptions_en;
