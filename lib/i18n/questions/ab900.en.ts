import type { QuestionTranslations } from "./types";

// English translations of AB900_QUESTIONS (Microsoft 365 Copilot). Hand
// translated with attention to Microsoft product terminology, verified
// against the original English text in the source PDF where available
// (not blindly re-translated from the German extraction, since the PDF
// itself is bilingual and Microsoft's own English wording is the most
// accurate source). PROGRESS: 10 of 101 questions translated
// (real-ab900-1 through real-ab900-10). Extend incrementally; anything
// not listed here falls back to German.

const ab900_en: QuestionTranslations = {
  // Batch 1: questions 1-10, verified against the original English text
  // in the source PDF (Ab-900.pdf) — the same document's own English
  // wording, not re-translated from the German extraction.
  "real-ab900-1": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
    statements: [
      "To use Microsoft 365 Copilot Chat to reason over web data, you need a Microsoft 365 Copilot license",
      "To use the Researcher agent in Microsoft 365 Copilot, you need a Microsoft 365 Copilot license",
      "To add an agent in the Microsoft 365 Copilot app, you need a Microsoft 365 Copilot license",
    ],
  },
  "real-ab900-2": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
    statements: [
      "Microsoft 365 Copilot only surfaces the organizational data for which individual users have permissions",
      "Microsoft 365 Copilot uses the same underlying controls for data access as other Microsoft 365 services",
      "Microsoft 365 Copilot can use connectors to retrieve information from third-party data sources",
    ],
  },
  "real-ab900-3": {
    prompt: "In Microsoft 365 Copilot, you should use ___ to perform multi-step reasoning over unstructured data.",
    options: { A: "a notebook", B: "Chat", C: "the Analyst agent", D: "the Researcher agent" },
  },
  "real-ab900-4": {
    prompt: "Your organization has a Microsoft 365 E5 subscription. You need to ensure that a third-party cloud service can authenticate to Microsoft Entra. What should you configure?",
    options: {
      A: "A Microsoft 365 Copilot connector",
      B: "Multifactor authentication (MFA)",
      C: "A Conditional Access policy",
      D: "An app registration",
    },
  },
  "real-ab900-5": {
    prompt: "The Microsoft responsible AI principle of ___ requires the oversight of AI systems to ensure that humans remain in control.",
    options: {
      A: "accountability",
      B: "Inclusiveness",
      C: "privacy and security",
      D: "reliability & safety",
      E: "Transparency",
    },
  },
  "real-ab900-6": {
    prompt: "Your organization has a Microsoft 365 subscription. You need to evaluate your organization's Identity Secure Score. Which two factors affect the score? (Each correct answer presents part of the solution. NOTE: Each correct selection is worth one point.)",
    options: {
      A: "The SharePoint site permissions",
      B: "The number of global administrators",
      C: "Passwords that never expire",
      D: "The location of the users",
    },
  },
  "real-ab900-7": {
    prompt: "Your organization has a Microsoft 365 subscription. You need to review the impact of a recent phishing incident that targeted email users. What should you use?",
    options: {
      A: "The Microsoft Defender portal",
      B: "The Microsoft 365 admin center",
      C: "The Microsoft Entra admin center",
      D: "The Microsoft Exchange admin center",
    },
  },
  "real-ab900-8": {
    prompt: "Your organization has a Microsoft 365 subscription. You need to assign a license to a user. What should you use?",
    options: {
      A: "The Microsoft Purview portal",
      B: "The Microsoft 365 admin center",
      C: "The Microsoft Teams admin center",
    },
  },
  "real-ab900-9": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "Microsoft 365 Copilot retrieves data from Azure OpenAI by using Microsoft Graph.",
      B: "Microsoft 365 Copilot retrieves data from external users by using Microsoft Graph.",
      C: "Microsoft 365 Copilot retrieves data from Microsoft SharePoint files by using Microsoft Graph.",
      D: "Microsoft 365 Copilot retrieves data from web searches by using Microsoft Graph.",
    },
  },
  "real-ab900-10": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "Microsoft Entra Privileged Identity Management (PIM) provides restricted access to Microsoft 365 services.",
      B: "Microsoft Entra Privileged Identity Management (PIM) provides the lifecycle management of users.",
      C: "Microsoft Entra Privileged Identity Management (PIM) provides the management of enterprise applications.",
      D: "Microsoft Entra Privileged Identity Management (PIM) provides time-bound role activation.",
    },
  },
  // Batch 2: questions 11-20.
  "real-ab900-11": {
    prompt: "A user named User5 navigates to https://myapps.microsoft.com. After entering their username and password, User5 receives the following message on their mobile device. Use the drop-down menus to select the answer choice that completes the statement based on the information presented in the graphic.",
    options: {
      A: "User5 is using email OTP for multifactor authentication (MFA).",
      B: "User5 is using the Microsoft Authenticator app for multifactor authentication (MFA).",
      C: "User5 is using SMS for multifactor authentication (MFA).",
      D: "User5 is using a Temporary Access Pass for multifactor authentication (MFA).",
    },
  },
  "real-ab900-12": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "Microsoft Defender for Office 365 provides protection from phishing and malware attacks",
      "Microsoft Defender for Identity monitors identities in Active Directory domains",
      "Microsoft Defender Vulnerability Management provides protection for software as a service (SaaS) applications",
    ],
  },
  "real-ab900-13": {
    prompt: "Your organization has a Microsoft 365 subscription that contains a Microsoft SharePoint site named Site1. The permissions for Site1 are configured as shown in the following exhibit. You create a new user named User1 in the subscription. Use the drop-down menus to select the answer choice that completes the statement based on the information presented in the graphic.",
    options: {
      A: "User1 is a site visitor of Site1.",
      B: "User1 is a site owner of Site1.",
      C: "User1 is a site member of Site1.",
      D: "User1 is prevented from accessing Site1.",
    },
  },
  "real-ab900-14": {
    prompt: "A multinational corporation with over 5,000 users is rolling out Microsoft 365 Copilot. The company currently has a mix of Microsoft 365 E3 and Office 365 E3 licenses for its information workers. The IT administrator must ensure that all users can access the full generative AI capabilities of Copilot within applications like Word and Excel. What is the minimum licensing action required to provide all existing information workers with access to Microsoft 365 Copilot?",
    options: {
      A: "Upgrade all existing Office 365 E3 licenses to Microsoft 365 E5 licenses.",
      B: "Purchase the separate Microsoft 365 Copilot add-on license for all users.",
      C: "Switch all existing licenses from Enterprise plans to Microsoft 365 Business Premium plans.",
      D: "Only purchase the Microsoft 365 Copilot add-on for users with Microsoft 365 E3 licenses, as Office 365 E3 is not eligible.",
    },
  },
  "real-ab900-15": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "If a user shares a Microsoft 365 Copilot agent, you can use Microsoft Foundry to block users from using the agent.",
      B: "If a user shares a Microsoft 365 Copilot agent, you can use Microsoft Copilot Studio to block users from using the agent.",
      C: "If a user shares a Microsoft 365 Copilot agent, you can use the Microsoft 365 admin center to block users from using the agent.",
      D: "If a user shares a Microsoft 365 Copilot agent, you can use the Power Apps portal to block users from using the agent.",
    },
  },
  "real-ab900-16": {
    prompt: "The IT administration team at your organization, Contoso Ltd., has acquired a new domain name, contosoglobal.com, and needs to add it to their Microsoft 365 environment. This new domain will be used for all new user principal names (UPNs) and email addresses. Which section of the Microsoft 365 admin center must the administrator use to manage, verify, and set the new domain as the default for new users?",
    options: {
      A: "Settings > Org settings > Services",
      B: "Billing > Licenses > Product List",
      C: "Setup > Domain setup > Connect domain",
      D: "Settings > Domains",
    },
  },
  "real-ab900-17": {
    prompt: "A Finance user received a sophisticated phishing email with a malicious link that was neutralized. The security team needs a single, centralized view to review the incident timeline, related alerts (email and endpoint), and recommended actions to harden posture across email and endpoints. Which Defender XDR capability or portal area gives the security operations team that unified incident timeline and improvement recommendations?",
    options: {
      A: "Microsoft Defender for Identity",
      B: "Microsoft Defender for Office 365",
      C: "Microsoft Defender Vulnerability Management",
      D: "The unified Incidents and Alerts experience plus Secure Score in the Microsoft Defender portal",
    },
  },
  "real-ab900-18": {
    prompt: "A user is blocked from signing in and the admin suspects Conditional Access or a risky sign-in detection. Which two tools in the Microsoft Entra admin center should the administrator use first to identify the exact sign-in failure and which policy caused it? (Each correct selection presents part of the solution. NOTE: Each correct selection is worth one point.)",
    options: {
      A: "Conditional Access What If tool",
      B: "Microsoft 365 Service Health dashboard",
      C: "Sign-in logs and Troubleshoot and support in Microsoft Entra ID",
      D: "Exchange Online Message Trace",
      E: "Microsoft Entra ID Application proxy",
    },
  },
  "real-ab900-19": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "Microsoft Purview Compliance Manager provides a risk-based compliance score to help you understand your compliance posture",
      "Microsoft Purview Compliance Manager provides step-by-step guidance to remediate compliance issues",
      "Compliance Manager is part of Microsoft Defender",
    ],
  },
  "real-ab900-20": {
    prompt: "Your organization has a Microsoft 365 subscription. You discover that Microsoft SharePoint files are being shared to users outside your organization. You need to identify which files are being shared to the external users. Which report should you use in the SharePoint admin center? (To answer, select the appropriate report in the answer area.)",
    options: {
      A: "Agent insights",
      B: "App insights",
      C: "Change history",
      D: "Data access governance",
      E: "OneDrive accounts",
      F: "Site policy comparison",
    },
  },
  // Batch 3: questions 21-30.
  "real-ab900-21": {
    prompt: "Your organization has a Microsoft 365 subscription. The HR department at your company asks for a copy of all the recent files that were modified by a user named User1. What should you use in the Microsoft Purview portal? (To answer, select the appropriate solutions in the answer area.)",
    options: {
      A: "Prevent users from sharing PII: Communication Compliance / Use machine learning to train a model: Data Loss Prevention",
      B: "Prevent users from sharing PII: Data Loss Prevention / Use machine learning to train a model: Information Protection",
      C: "Prevent users from sharing PII: Information Protection / Use machine learning to train a model: Insider Risk Management",
      D: "Prevent users from sharing PII: Insider Risk Management / Use machine learning to train a model: Communication Compliance",
      E: "Prevent users from sharing PII: Data Loss Prevention / Use machine learning to train a model: DSPM for AI",
      F: "Prevent users from sharing PII: DSPM for AI / Use machine learning to train a model: Insider Risk Management",
    },
  },
  "real-ab900-22": {
    prompt: "Your organization has a Microsoft 365 subscription. You need to use Microsoft Purview to meet the following requirements: • Prevent users from sharing files that contain personally identifiable information (PII). • Use machine learning to train a model that detects sensitive content. Which Microsoft Purview solution should you use for each requirement? (To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.)",
    options: {
      A: "Prevent users from sharing PII: Communication Compliance / Use machine learning to train a model: Data Loss Prevention",
      B: "Prevent users from sharing PII: Data Loss Prevention / Use machine learning to train a model: Information Protection",
      C: "Prevent users from sharing PII: Information Protection / Use machine learning to train a model: Insider Risk Management",
      D: "Prevent users from sharing PII: Insider Risk Management / Use machine learning to train a model: Communication Compliance",
      E: "Prevent users from sharing PII: Data Loss Prevention / Use machine learning to train a model: DSPM for AI",
      F: "Prevent users from sharing PII: DSPM for AI / Use machine learning to train a model: Insider Risk Management",
    },
  },
  "real-ab900-23": {
    prompt: "You want to view the administrative actions taken by a service administrator in Microsoft 365. For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    options: {
      A: "You can use Search & intelligence in the Microsoft 365 admin center: Yes / You can use Audit in the Microsoft Defender portal: Yes / You can use Audit in the Microsoft Purview portal: Yes",
      B: "You can use Search & intelligence in the Microsoft 365 admin center: Yes / You can use Audit in the Microsoft Defender portal: Yes / You can use Audit in the Microsoft Purview portal: No",
      C: "You can use Search & intelligence in the Microsoft 365 admin center: Yes / You can use Audit in the Microsoft Defender portal: No / You can use Audit in the Microsoft Purview portal: Yes",
      D: "You can use Search & intelligence in the Microsoft 365 admin center: No / You can use Audit in the Microsoft Defender portal: Yes / You can use Audit in the Microsoft Purview portal: No",
      E: "You can use Search & intelligence in the Microsoft 365 admin center: No / You can use Audit in the Microsoft Defender portal: No / You can use Audit in the Microsoft Purview portal: Yes",
      F: "You can use Search & intelligence in the Microsoft 365 admin center: No / You can use Audit in the Microsoft Defender portal: No / You can use Audit in the Microsoft Purview portal: No",
    },
  },
  "real-ab900-24": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "Conditional Access policies are configured by using the Microsoft Defender portal.",
      B: "Conditional Access policies are applied only to on-premises resources.",
      C: "Conditional Access policies provide control over how users can access cloud apps.",
      D: "Conditional Access policies require a Microsoft Exchange mailbox.",
    },
  },
  "real-ab900-25": {
    prompt: "An administrator must manage SharePoint site access for a sensitive HR site and assign Copilot add-on licenses to the 50 members of the \"HR-Data-Users\" team. Membership changes frequently due to high turnover. Which Microsoft Entra object is the most efficient choice for both access control and group based license assignment?",
    options: {
      A: "Dynamic Security Group",
      B: "Mail-enabled Security Group",
      C: "Microsoft 365 Group",
      D: "Distribution List",
    },
  },
  "real-ab900-26": {
    prompt: "You use Microsoft 365 Copilot. What does Copilot use to generate responses based on corporate data stored in Microsoft SharePoint?",
    options: {
      A: "Microsoft Intune",
      B: "Microsoft Defender",
      C: "Microsoft Graph",
      D: "Microsoft Purview",
    },
  },
  "real-ab900-27": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "You can use the Data Lifecycle Management Microsoft Purview solution to detect Microsoft 365 Copilot prompts that contain sensitive information.",
      B: "You can use the DSPM for AI Microsoft Purview solution to detect Microsoft 365 Copilot prompts that contain sensitive information.",
      C: "You can use the Information Barriers Microsoft Purview solution to detect Microsoft 365 Copilot prompts that contain sensitive information.",
      D: "You can use the Information Protection Microsoft Purview solution to detect Microsoft 365 Copilot prompts that contain sensitive information.",
    },
  },
  "real-ab900-28": {
    prompt: "A Marketing user requests Copilot to \"Summarize the latest budget proposal\" stored on a SharePoint site restricted to Finance. The Marketing user is not a site member. Which principle governs Copilot's behavior and prevents it from returning the restricted content?",
    options: {
      A: "Copilot applies Zero Trust verification before processing the request.",
      B: "Copilot only uses content explicitly tagged with a specific sensitivity label.",
      C: "Copilot strictly enforces the user's existing Microsoft 365 permissions and will not return content the user cannot access.",
      D: "Microsoft Purview DLP automatically redacts financial figures from Copilot responses.",
    },
  },
  "real-ab900-29": {
    prompt: "When a user asks Copilot, \"What are the latest documents shared with me about 'Project Phoenix'?\", Copilot returns personalized documents from OneDrive, SharePoint, and Teams. What is Microsoft Graph's primary role in enabling this response?",
    options: {
      A: "It provides the LLM with its pre-trained world knowledge.",
      B: "It serves as the compliance redaction engine.",
      C: "It acts as the semantic index that maps the user's query to the user's context, relationships, and permissions for organizational data.",
      D: "It enforces Conditional Access policies in real time.",
    },
  },
  "real-ab900-30": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "For administrators to use SharePoint Advanced Management, all the users in your organization need a Microsoft 365 Copilot license",
      "SharePoint Advanced Management can help restrict Microsoft 365 Copilot from accessing Microsoft SharePoint content",
      "SharePoint Advanced Management is available as a standalone license for organizations without Microsoft 365 Copilot",
    ],
  },
  // Batch 4: questions 31-40.
  "real-ab900-31": {
    prompt: "An AI agent being prepared to summarize customer records shows bias favoring certain geographic regions. Which Microsoft Responsible AI principle is primarily being violated and should be addressed before deployment?",
    options: { A: "Fairness", B: "Transparency", C: "Accountability", D: "Inclusiveness" },
  },
  "real-ab900-32": {
    prompt: "Compliance needs a report listing SharePoint sites that contain highly sensitive documents but are shared with broad groups such as \"Everyone except external users\". Which Microsoft capability is designed to produce Data Access Governance (DAG) reports that identify sensitive content along with overly permissive sharing practices?",
    options: {
      A: "Microsoft Entra ID Protection",
      B: "Microsoft Purview Data Loss Prevention (DLP)",
      C: "Microsoft Defender for Cloud Apps",
      D: "SharePoint Advanced Management (SAM)",
    },
  },
  "real-ab900-33": {
    prompt: "You have a Microsoft SharePoint site as shown in the following exhibit. You need to view the settings of SLabel1. What should you use?",
    options: {
      A: "The Microsoft Defender portal",
      B: "The SharePoint admin center",
      C: "The Microsoft 365 admin center",
      D: "The Microsoft Purview portal",
    },
  },
  "real-ab900-34": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "You can use Microsoft Defender for Office 365 to review threat indicators correlated across email, identity, and device incidents in a single view.",
      B: "You can use Microsoft Defender XDR to review threat indicators correlated across email, identity, and device incidents in a single view.",
      C: "You can use Microsoft Purview Compliance Manager to review threat indicators correlated across email, identity, and device incidents in a single view.",
      D: "You can use Microsoft Purview Data Loss Prevention to review threat indicators correlated across email, identity, and device incidents in a single view.",
    },
  },
  "real-ab900-35": {
    prompt: "Your organization has a Microsoft 365 subscription that contains a user named User1. User1 plans to leave your company in two weeks. You need to capture User1's activities to determine whether the user is exfiltrating data. Which Microsoft Purview solution should you use?",
    options: {
      A: "Communication Compliance",
      B: "Data Security Posture Management",
      C: "Insider Risk Management",
      D: "Data Lifecycle Management",
    },
  },
  "real-ab900-36": {
    prompt: "Your organization has a Microsoft 365 subscription that contains Microsoft SharePoint sites and Microsoft Teams teams. You discover that the sites and teams are being shared with users outside your organization. You need to identify which sites and teams have been shared with the external users. What should you use?",
    options: {
      A: "The SharePoint admin center",
      B: "The Microsoft Teams admin center",
      C: "The Microsoft 365 admin center",
      D: "The Microsoft Defender portal",
    },
  },
  "real-ab900-37": {
    prompt: "An organization requires that Copilot never incorporate results from public web searches into responses, to avoid potential disclosure of internal prompts/data. Which Copilot capability should an administrator disable to block web grounding for Copilot responses?",
    options: {
      A: "Copilot in Word",
      B: "Copilot for Microsoft 365",
      C: "Copilot Chat",
      D: "Copilot capabilities in Microsoft 365 apps",
    },
  },
  "real-ab900-38": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "The Microsoft 365 Copilot usage report can be used to view Copilot prompts submitted by users",
      "The Microsoft 365 Copilot usage report shows the total number of unique users in your organization",
      "The Microsoft 365 Copilot usage report shows Copilot usage for each individual Microsoft 365 app",
    ],
  },
  "real-ab900-39": {
    prompt: "You plan to create an agent in the Microsoft 365 Copilot app to solve a business problem. What are two reasons to create the agent? (Each correct answer presents a complete solution. NOTE: Each correct selection is worth one point.)",
    options: {
      A: "You need to use a custom AI model.",
      B: "You need to use a custom instruction set that differs from that of the chat experience.",
      C: "You need to reason over a specific site.",
      D: "You need to group related chats in a Copilot notebook.",
    },
  },
  "real-ab900-40": {
    prompt: "A significant governance risk when implementing Microsoft 365 Copilot is the potential oversharing of corporate data. The Chief Compliance Officer is concerned that, because Copilot uses all the data a user has access to, a user could inadvertently gain access to sensitive information they should not actually be able to access. What is the most common root cause of this oversharing risk that administrators must address as a high-priority governance task before Copilot is broadly deployed?",
    options: {
      A: "Copilot bypasses SharePoint access controls when content is indexed.",
      B: "Overly broad permissions on sites or files.",
      C: "Copilot's chat logs are not subject to eDiscovery or retention.",
      D: "Azure OpenAI model training uses tenant data and retains it within the tenant.",
    },
  },
  // Batch 5: questions 41-50.
  "real-ab900-41": {
    prompt: "Your organization has a Microsoft 365 subscription. You need to investigate security incidents and alerts triggered by the Windows 11 devices in your organization. What should you use?",
    options: {
      A: "Microsoft Entra ID Protection",
      B: "Microsoft Defender for Identity",
      C: "Microsoft Purview Insider Risk Management",
      D: "Microsoft Defender for Endpoint",
    },
  },
  "real-ab900-42": {
    prompt: "Your company requires that all Microsoft SharePoint sites have at least two owners. You need to ensure that sites with fewer than two owners are marked read-only if the sites are NOT remediated. What should you configure in the SharePoint admin center?",
    options: {
      A: "Site access restriction",
      B: "Data access governance reports",
      C: "Site lifecycle management",
      D: "Block download policy for SharePoint and OneDrive",
    },
  },
  "real-ab900-43": {
    prompt: "The IT lead wants aggregated, tenant-wide metrics such as active Copilot users, usage by app, and prompt categories, in order to measure Copilot's ROI. Which management tool provides this aggregated adoption and usage analysis?",
    options: {
      A: "Microsoft Purview audit log",
      B: "Copilot analytics dashboard",
      C: "Microsoft Entra ID sign-in logs",
      D: "Microsoft 365 service health",
    },
  },
  "real-ab900-44": {
    prompt: "Before an AI agent created in Copilot Studio that connects to an on-premises finance database can be published, an administrator must review access, performance, and lifecycle status. Which two Microsoft admin centers are primarily used to manage and monitor the agent's lifecycle and environment settings? (Each correct selection presents part of the solution. NOTE: Each correct selection is worth one point.)",
    options: {
      A: "Microsoft Purview portal",
      B: "Microsoft Entra admin center",
      C: "Microsoft 365 admin center",
      D: "Microsoft Power Platform admin center",
      E: "Exchange admin center",
    },
  },
  "real-ab900-45": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "From the SharePoint admin center, you can create a server.",
      B: "From the SharePoint admin center, you can create a user.",
      C: "From the SharePoint admin center, you can create a site.",
      D: "From the SharePoint admin center, you can create a role.",
    },
  },
  "real-ab900-46": {
    prompt: "You need to create a Microsoft 365 Copilot agent that can generate charts and visualizations based on a Microsoft Excel workbook. What should you configure for the agent?",
    options: {
      A: "The image generation feature",
      B: "The Scrum Assistant template",
      C: "The Customer Insights Assistant template",
      D: "The code interpreter feature",
    },
  },
  "real-ab900-47": {
    prompt: "Your company is piloting the use of Microsoft 365 Copilot and has purchased 100 Microsoft 365 Copilot licenses. You need to view detailed reports on Copilot usage in Microsoft Teams, such as meeting hours summarized by Copilot and meeting actions taken by Copilot. What should you use?",
    options: {
      A: "The Microsoft 365 Copilot readiness report in the Microsoft 365 admin center",
      B: "The Microsoft 365 Copilot usage report in the Microsoft 365 admin center",
      C: "The Microsoft 365 Copilot dashboard in Microsoft Viva Insights",
      D: "The Microsoft 365 apps usage report in the Microsoft 365 admin center",
    },
  },
  "real-ab900-48": {
    prompt: "A user named User1 creates a Microsoft 365 Copilot agent named Agent1 and shares the agent with a user named User2. What happens when an administrator blocks Agent1?",
    options: {
      A: "Agent1 remains accessible to User1 and User2 until the users manually uninstall the agent. No other user can install Agent1.",
      B: "Agent1 remains accessible to User1 and User2, and no other user can install Agent1.",
      C: "Agent1 is removed from User2, and User1 can continue to use Agent1.",
      D: "Agent1 is removed from User1 and User2, and no user can install Agent1.",
    },
  },
  "real-ab900-49": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "Administrators can remove a specific Copilot agent from all users",
      "From the Microsoft 365 admin center, administrators can configure the prompts of a Copilot agent",
      "Administrators can deploy Copilot agents to specific users",
    ],
  },
  "real-ab900-50": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "From the Microsoft Teams admin center, you can assign a Teams license to a user.",
      B: "From the Microsoft Teams admin center, you can deploy the Teams client.",
      C: "From the Microsoft Teams admin center, you can manage a Teams Rooms device.",
      D: "From the Microsoft Teams admin center, you can prevent users from creating teams.",
    },
  },
};

export default ab900_en;
