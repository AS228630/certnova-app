import type { QuestionTranslations } from "./types";

// English translations of AB900_QUESTIONS (Microsoft 365 Copilot). Hand
// translated with attention to Microsoft product terminology, verified
// against the original English text in the source PDF where available
// (not blindly re-translated from the German extraction, since the PDF
// itself is bilingual and Microsoft's own English wording is the most
// accurate source). PROGRESS: all 101 of 101 questions translated
// (real-ab900-1 through real-ab900-101).

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
  // Batch 6: questions 51-70.
  "real-ab900-51": {
    prompt: "Your organization has a Microsoft 365 subscription. All users have Microsoft 365 Copilot licenses. You need to identify where sensitive content is being used during Copilot interactions, analyze the content's usage patterns, and provide recommendations for applying appropriate protections. What should you use?",
    options: {
      A: "Microsoft Viva Insights",
      B: "The Microsoft Purview DSPM for AI solution",
      C: "Microsoft Security Copilot",
      D: "The Microsoft Purview Insider Risk Management solution",
    },
  },
  "real-ab900-52": {
    prompt: "Your organization has a Microsoft 365 subscription. All users have been assigned Microsoft 365 Copilot licenses. Some users report that they're receiving Copilot responses that include information from a Microsoft SharePoint site named Finance. The users state that the information is commercially sensitive. You need to prevent Copilot from providing responses that include information from the Finance site. What should you do?",
    options: {
      A: "Create an Information Barrier (IB) policy in Microsoft Purview.",
      B: "Create a data connector in Microsoft Defender.",
      C: "Create a Conditional Access policy in Microsoft Entra.",
      D: "Configure the permissions on the Finance site.",
    },
  },
  "real-ab900-53": {
    prompt: "A manager asks: \"What is the main difference in capabilities between Microsoft 365 Copilot integrated into Word/Excel and a custom AI agent built in Copilot Studio?\" What is the correct answer?",
    options: {
      A: "Only the built-in Copilot can access and summarize Microsoft Graph data.",
      B: "The built-in Copilot is a general-purpose productivity assistant. Custom AI agents are designed for specific multi-step tasks and integrations with external systems.",
      C: "Only custom AI agents can ground responses in organizational data.",
      D: "Custom agents are only accessible via the Copilot Studio portal, whereas Copilot is embedded in apps.",
    },
  },
  "real-ab900-54": {
    prompt: "A department head has developed a high-impact, complex Microsoft 365 Copilot prompt for analyzing weekly sales data. The head wants all 30 members of their sales team to have easy, consistent access to this particular prompt template. Which method is recommended to ensure this valuable template is used consistently by the entire team?",
    options: {
      A: "Use the Copilot Studio interface to publish the prompt as a new agent.",
      B: "Email the prompt text to the team and instruct them to save it in their personal OneDrive.",
      C: "Share the prompt template directly from the Microsoft 365 Copilot prompt library.",
      D: "Create a Power Automate flow that runs the prompt weekly.",
    },
  },
  "real-ab900-55": {
    prompt: "You are evaluating Microsoft Purview solutions. For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
    statements: [
      "A Communication Compliance policy can detect inappropriate text in Microsoft Teams messages",
      "A Communication Compliance policy can detect offensive language in Microsoft 365 Copilot prompts",
      "A Communication Compliance policy can be used to retain email messages for 10 years",
    ],
  },
  "real-ab900-56": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "From the Copilot prompt gallery, you can edit a saved prompt",
      "From the Copilot prompt gallery, you can share a saved prompt with a Microsoft Teams team",
      "You can create a shared link for a prompt that is NOT saved in the Copilot prompt gallery",
    ],
  },
  "real-ab900-57": {
    prompt: "Your organization has a Microsoft 365 subscription. You discover that some users are unable to sign in to Microsoft 365. You need to view the failed Microsoft 365 sign-in attempts. What should you use?",
    options: {
      A: "The Microsoft Defender portal",
      B: "The Microsoft Entra admin center",
      C: "The Microsoft Purview portal",
      D: "The Microsoft 365 admin center",
    },
  },
  "real-ab900-58": {
    prompt: "Your organization has a Microsoft 365 subscription that contains a Microsoft SharePoint site named Site1. You need to prevent users from sharing Site1's content with external users. What should you use?",
    options: {
      A: "Site1's content",
      B: "The SharePoint admin center",
      C: "The Microsoft 365 admin center",
      D: "The Microsoft Entra admin center",
    },
  },
  "real-ab900-59": {
    prompt: "Which statement correctly describes Microsoft Defender XDR?",
    options: {
      A: "Microsoft Defender XDR is a unified enterprise suite that coordinates detection, prevention, investigation, and response across endpoints, identities, email, and applications to provide integrated protection against sophisticated attacks.",
      B: "Microsoft Entra Conditional Access is a unified enterprise suite that coordinates detection, prevention, investigation, and response across endpoints, identities, email, and applications to provide integrated protection against sophisticated attacks.",
      C: "Microsoft Entra ID Protection is a unified enterprise suite that coordinates detection, prevention, investigation, and response across endpoints, identities, email, and applications to provide integrated protection against sophisticated attacks.",
      D: "Microsoft Purview is a unified enterprise suite that coordinates detection, prevention, investigation, and response across endpoints, identities, email, and applications to provide integrated protection against sophisticated attacks.",
    },
  },
  "real-ab900-60": {
    prompt: "Your organization has a Microsoft 365 subscription. A user named Alex Wilber is assigned an admin role as shown in the following exhibit.",
    options: {
      A: "Alex Wilber can view all the users in the Microsoft Entra tenant.",
      B: "Alex Wilber can view all the content on Microsoft SharePoint sites.",
      C: "Alex Wilber can read all the content in Microsoft Exchange mailboxes.",
      D: "Alex Wilber can perform eDiscovery of Microsoft 365 Copilot prompts.",
    },
  },
  "real-ab900-61": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "You can use a Microsoft Entra security group to assign permissions to Microsoft Entra ID resources",
      "You can use a Microsoft Entra security group to assign Microsoft 365 licenses",
      "You can use a Microsoft Entra security group to assign permissions to Microsoft Exchange mailboxes",
    ],
  },
  "real-ab900-62": {
    prompt: "Which statement accurately describes authorization in Microsoft 365?",
    options: {
      A: "A process that verifies whether an identity is actually who it claims to be",
      B: "A process that requires additional authentication methods before an identity can access resources",
      C: "A process that verifies whether an identity is allowed to access a resource",
      D: "A process that validates an identity from an external system",
    },
  },
  "real-ab900-63": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "A member of a Microsoft SharePoint site can invite users to access the site's content",
      "A site owner of a Microsoft SharePoint site can add Microsoft 365 groups as members of the site",
      "A site owner of a Microsoft SharePoint site can remove another site owner from the site",
    ],
  },
  "real-ab900-64": {
    prompt: "Your organization has a Microsoft 365 subscription. Which two tasks can you perform by using the Exchange admin center? (Each correct answer presents part of the solution. NOTE: Each correct selection is worth one point.)",
    options: {
      A: "Assign a Microsoft Exchange license.",
      B: "Create a mail flow rule.",
      C: "Create a shared mailbox.",
      D: "Add a custom domain.",
    },
  },
  "real-ab900-65": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "In Microsoft Entra Privileged Identity Management (PIM), an administrator has made you eligible for the User Administrator role. Before you can create a user account, you must activate the role.",
      B: "In Microsoft Entra Privileged Identity Management (PIM), an administrator has made you eligible for the User Administrator role. Before you can create a user account, you must install the Microsoft Authenticator app.",
      C: "In Microsoft Entra Privileged Identity Management (PIM), an administrator has made you eligible for the User Administrator role. Before you can create a user account, you must request a license.",
      D: "In Microsoft Entra Privileged Identity Management (PIM), an administrator has made you eligible for the User Administrator role. Before you can create a user account, you must update your location information.",
    },
  },
  "real-ab900-66": {
    prompt: "You open the Microsoft Entra admin center as shown in the following exhibit.",
    options: {
      A: "Remediating the 'Do not expire passwords' recommendation will improve the Identity Secure Score the most.",
      B: "Remediating the 'Use least privileged administrative roles' recommendation will improve the Identity Secure Score the most.",
      C: "Remediating the 'Enable policy to block legacy authentication' recommendation will improve the Identity Secure Score the most.",
      D: "Remediating the 'Require multifactor authentication for administrative roles' recommendation will improve the Identity Secure Score the most.",
    },
  },
  "real-ab900-67": {
    prompt: "What can you use to automatically lock a user account when a risky sign-in is detected?",
    options: {
      A: "Microsoft Defender for Identity",
      B: "Microsoft Entra ID Protection",
      C: "Microsoft Defender for Office 365",
      D: "Microsoft Entra Privileged Identity Management (PIM)",
    },
  },
  "real-ab900-68": {
    prompt: "You are reviewing your company's security policies as part of a Zero Trust strategy. Which statement accurately describes Zero Trust principles?",
    options: {
      A: "Zero Trust improves the user experience by minimizing authentication prompts.",
      B: "Zero Trust assumes breach and verifies each request explicitly.",
      C: "Zero Trust treats all requests from your corporate network as trusted.",
      D: "Zero Trust removes the need to regularly review and adjust access permissions.",
    },
  },
  "real-ab900-69": {
    prompt: "Your organization has a Microsoft 365 subscription. You need to generate a report that shows the permissions and active sharing links of content stored in Microsoft OneDrive accounts. What should you use?",
    options: {
      A: "Audit in the Microsoft Defender portal",
      B: "Reports in the Microsoft 365 admin center",
      C: "Data access governance in the SharePoint admin center",
      D: "eDiscovery in the Microsoft Purview portal",
    },
  },
  "real-ab900-70": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "Prompts and responses issued by users in Microsoft 365 Copilot are used by Microsoft to train models",
      "Content retrieved from Microsoft Graph is used by Microsoft to train models",
      "Microsoft 365 Copilot honors the security permissions in your Microsoft 365 subscription",
    ],
  },
  // Batch 7: questions 71-90.
  "real-ab900-71": {
    prompt: "Your company uses pay-as-you-go billing for Microsoft 365 Copilot. The company wants better visibility into Copilot usage costs and the ability to forecast departmental spending. You need to ensure that you can view Copilot costs by department. What should you use? (To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.)",
    options: {
      A: "Portal: The Microsoft 365 admin center; Feature: A billing policy",
      B: "Portal: The Microsoft 365 admin center; Feature: A Copilot connector",
      C: "Portal: The Microsoft Entra admin center; Feature: An auto-claim policy",
      D: "Portal: The Microsoft Entra admin center; Feature: A billing policy",
      E: "Portal: The Microsoft Purview portal; Feature: A Copilot connector",
      F: "Portal: The Microsoft Purview portal; Feature: An auto-claim policy",
    },
  },
  "real-ab900-72": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "Users assigned a Microsoft 365 E5 license cannot create web-based Microsoft 365 Copilot agents",
      "Users must be assigned a Microsoft 365 Copilot license to use the Analyst agent",
      "Users can use a natural-language prompt to create a Microsoft 365 Copilot agent",
    ],
  },
  "real-ab900-73": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "You can use the Audit Microsoft Purview solution to find all content related to the term \"Project Falcon\" in emails exchanged between two users.",
      B: "You can use the Data Catalog Microsoft Purview solution to find all content related to the term \"Project Falcon\" in emails exchanged between two users.",
      C: "You can use the eDiscovery Microsoft Purview solution to find all content related to the term \"Project Falcon\" in emails exchanged between two users.",
      D: "You can use the Insider Risk Management Microsoft Purview solution to find all content related to the term \"Project Falcon\" in emails exchanged between two users.",
    },
  },
  "real-ab900-74": {
    prompt: "Your company uses Microsoft Purview Data Loss Prevention (DLP) policies. A user named User1 shares sensitive information with an external user over Microsoft Teams. You need to identify the shared sensitive content. What should you use in the Microsoft Purview portal?",
    options: {
      A: "Diagnostics",
      B: "Data Explorer",
      C: "Content Explorer",
      D: "Activity Explorer",
    },
  },
  "real-ab900-75": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "Zero Trust requires an Azure subscription",
      "Zero Trust is a security strategy, NOT a specific product",
      "You can enable Zero Trust for your organization from the Microsoft 365 admin center",
    ],
  },
  "real-ab900-76": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "Microsoft Copilot Studio contains signals such as collaboration history, document relevance, and communication frequency that influence Microsoft 365 Copilot's responses.",
      B: "Microsoft Graph contains signals such as collaboration history, document relevance, and communication frequency that influence Microsoft 365 Copilot's responses.",
      C: "Microsoft Purview contains signals such as collaboration history, document relevance, and communication frequency that influence Microsoft 365 Copilot's responses.",
      D: "Microsoft Viva Insights contains signals such as collaboration history, document relevance, and communication frequency that influence Microsoft 365 Copilot's responses.",
    },
  },
  "real-ab900-77": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "Users can use Microsoft 365 Copilot anonymously",
      "Administrators can allow self-service purchase of Microsoft 365 Copilot licenses",
      "Microsoft 365 Copilot licenses can be assigned to Microsoft Entra ID guest users from other organizations",
    ],
  },
  "real-ab900-78": {
    prompt: "Your organization has a Microsoft 365 subscription. You need to use Microsoft Purview to meet the following requirements: • Discover and classify sensitive data across multiple platforms. • Block users from sharing intellectual property with external users. Which Microsoft Purview solution should you use for each requirement? (To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.)",
    options: {
      A: "Discover and classify sensitive data across multiple platforms: Communication Compliance / Block users from sharing intellectual property with external users: Data Loss Prevention",
      B: "Discover and classify sensitive data across multiple platforms: Data Loss Prevention / Block users from sharing intellectual property with external users: Information Protection",
      C: "Discover and classify sensitive data across multiple platforms: Data Loss Prevention / Block users from sharing intellectual property with external users: Insider Risk Management",
      D: "Discover and classify sensitive data across multiple platforms: Information Protection / Block users from sharing intellectual property with external users: Communication Compliance",
      E: "Discover and classify sensitive data across multiple platforms: Information Protection / Block users from sharing intellectual property with external users: Insider Risk Management",
      F: "Discover and classify sensitive data across multiple platforms: Insider Risk Management / Block users from sharing intellectual property with external users: Data Loss Prevention",
    },
  },
  "real-ab900-79": {
    prompt: "Your organization has a Microsoft 365 E5 subscription. You need to prevent users from sharing internal company financial data with external users. What should you use?",
    options: {
      A: "Role groups",
      B: "Data Loss Prevention (DLP) policies",
      C: "Insider Risk Management policies",
      D: "Retention labels",
    },
  },
  "real-ab900-80": {
    prompt: "You need to identify files and emails that contain Social Security numbers (SSNs) and credit card numbers. What should you use in the Microsoft Purview portal?",
    options: {
      A: "Data Explorer",
      B: "Information Protection reports",
      C: "Information Protection policies",
      D: "Activity Explorer",
    },
  },
  "real-ab900-81": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "Microsoft Purview sensitivity labels can be applied to Azure Blob Storage.",
      B: "Microsoft Purview sensitivity labels can be applied to Microsoft 365 Copilot conversations.",
      C: "Microsoft Purview sensitivity labels can be applied to Microsoft SharePoint sites.",
    },
  },
  "real-ab900-82": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "Restricted SharePoint Search lets you restrict administrator access to Microsoft SharePoint sites, without preventing users from accessing the files and content they have permissions for.",
      B: "Restricted SharePoint Search lets you restrict guest user access to Microsoft SharePoint sites, without preventing users from accessing the files and content they have permissions for.",
      C: "Restricted SharePoint Search lets you restrict Microsoft 365 Copilot's access to Microsoft SharePoint sites, without preventing users from accessing the files and content they have permissions for.",
      D: "Restricted SharePoint Search lets you restrict Microsoft Purview eDiscovery's access to Microsoft SharePoint sites, without preventing users from accessing the files and content they have permissions for.",
    },
  },
  "real-ab900-83": {
    prompt: "Your organization has a Microsoft 365 E5 subscription. You create a Microsoft Purview sensitivity label named \"Label1\". You need to ensure that users can apply \"Label1\" to files in Microsoft 365. What should you use?",
    options: {
      A: "A sensitivity label policy",
      B: "A trainable classifier",
      C: "A retention label policy",
      D: "An auto-labeling policy",
    },
  },
  "real-ab900-84": {
    prompt: "Your company has a written compliance policy requiring that all emails be retained for seven years and then permanently deleted. Which Microsoft Purview solution should you use?",
    options: {
      A: "Information Protection",
      B: "Data Lifecycle Management",
      C: "Data Loss Prevention",
      D: "Insider Risk Management",
    },
  },
  "real-ab900-85": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "In the Microsoft 365 admin center, the 'Credits used' metric in the Copilot credits report shows the total number of credits consumed by users in your organization who use Microsoft Teams and interact with work-based agents in Microsoft 365 Copilot Chat.",
      B: "In the Microsoft 365 admin center, the 'Credits used' metric in the Copilot credits report shows the total number of credits consumed by users who do not belong to your organization and interact with business agents in Microsoft 365 Copilot Chat.",
      C: "In the Microsoft 365 admin center, the 'Credits used' metric in the Copilot credits report shows the total number of credits consumed by users in your organization who are assigned a Microsoft 365 Copilot license and interact with work-based agents in Microsoft 365 Copilot Chat.",
      D: "In the Microsoft 365 admin center, the 'Credits used' metric in the Copilot credits report shows the total number of credits consumed by users in your organization who are NOT assigned a Microsoft 365 Copilot license and interact with work-based agents in Microsoft 365 Copilot Chat.",
    },
  },
  "real-ab900-86": {
    prompt: "You have a Microsoft SharePoint site named \"Site1\" and a security group named \"Group1\". You want to prevent all users who currently have access to \"Site1\" from accessing the site's content, unless the user is also a member of \"Group1\". Which settings should you configure? (To answer, select the appropriate settings in the answer area.)",
    options: {
      A: "Email",
      B: "Privacy",
      C: "External sharing",
      D: "Sensitivity label",
      E: "Restrict content discovery",
      F: "Restricted access to the site",
    },
  },
  "real-ab900-87": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "Microsoft 365 Copilot honors Microsoft Purview sensitivity labels",
      "Microsoft 365 Copilot ignores Microsoft Purview data loss prevention (DLP) policies",
    ],
  },
  "real-ab900-88": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "A sensitivity label can be applied to a Microsoft SharePoint site",
      "A sensitivity label can be applied to an email message in Microsoft Exchange",
      "A sensitivity label can be applied to Windows 11 devices",
    ],
  },
  "real-ab900-89": {
    prompt: "Your organization has a Microsoft 365 subscription. Your company recently purchased Microsoft 365 Copilot licenses for some users. You need to determine how many unlicensed users have used Copilot in Microsoft Teams. Which usage report should you use in the Microsoft 365 admin center?",
    options: {
      A: "Microsoft 365 Copilot Chat",
      B: "Microsoft 365 Copilot Search",
      C: "Microsoft 365 Apps",
      D: "Microsoft 365 Copilot",
    },
  },
  "real-ab900-90": {
    prompt: "A user named \"User1\" is responsible for quarterly revenue reporting. \"User1\" needs to identify performance trends, gain visual insights, and produce a summary of anomalies across multiple files containing different datasets. What should you use?",
    options: {
      A: "The \"Analyst\" agent in Microsoft 365 Copilot",
      B: "The \"Researcher\" agent in Microsoft 365 Copilot",
      C: "Microsoft 365 Copilot Search",
      D: "Copilot in Excel",
    },
  },
  // Batch 8 (final): questions 91-101.
  "real-ab900-91": {
    prompt: "Your company is currently reviewing Microsoft 365 Copilot licensing. In which scenario should you use pay-as-you-go billing?",
    options: {
      A: "To give users access to the AI assistant in Copilot in Word",
      B: "To summarize the actions from Microsoft Teams meetings",
      C: "To generate images in premium chats",
      D: "To provide a custom agent to unlicensed users",
    },
  },
  "real-ab900-92": {
    prompt: "You use Microsoft 365 Copilot. You want to schedule a prompt to run at midnight. Which task should you include in your solution?",
    options: {
      A: "Create an agent.",
      B: "Create a notebook.",
      C: "Run the prompt.",
      D: "Save the prompt.",
    },
  },
  "real-ab900-93": {
    prompt: "Your company plans to deploy Microsoft 365 Copilot. You need to give a user the ability to use Microsoft 365 Copilot, including the \"Researcher\" and \"Analyst\" agents. What should you use?",
    options: {
      A: "The Microsoft 365 admin center",
      B: "The Microsoft Purview portal",
      C: "The Microsoft Entra admin center",
      D: "The Microsoft Defender portal",
    },
  },
  "real-ab900-94": {
    prompt: "Your company is considering using Microsoft 365 Copilot on a pay-as-you-go basis instead of purchasing a Microsoft 365 Copilot license. In which scenario does pay-as-you-go billing apply?",
    options: {
      A: "Performing multi-step reasoning using the Researcher agent",
      B: "Creating a summary of a Microsoft Teams meeting",
      C: "Using a custom agent grounded in work data",
      D: "Using the AI assistant to edit a document in Copilot in Word",
    },
  },
  "real-ab900-95": {
    prompt: "Your company has a Microsoft SharePoint site named \"Site1\". \"Site1\" contains all the company's HR department policies. The policies are stored as Microsoft Word documents. All users have read access to \"Site1\". The head of HR reports that user questions about the policies are NOT being answered in a timely manner, especially around major holidays. You need to propose a solution that lets users find the HR department's policies. The solution must provide users with a list of frequently asked questions and ensure that answers are grounded exclusively in Site1. What should you include in the recommendation?",
    options: {
      A: "The personal assistant in Copilot in Word",
      B: "A custom Microsoft 365 Copilot agent",
      C: "The Researcher agent in Microsoft 365 Copilot",
      D: "A Microsoft 365 Copilot notebook",
    },
  },
  "real-ab900-96": {
    prompt: "Select the answer that correctly completes the sentence.",
    options: {
      A: "From the Microsoft Purview portal, you can use Data Explorer to create and manage data protection policies.",
      B: "From the Microsoft Purview portal, you can use Data Explorer to search for content in mailboxes and sites.",
      C: "From the Microsoft Purview portal, you can use Data Explorer to identify sensitive information and determine its storage locations.",
      D: "From the Microsoft Purview portal, you can use Data Explorer to review the effectiveness of your Data Loss Prevention (DLP) policies.",
    },
  },
  "real-ab900-97": {
    prompt: "Your organization has a Microsoft 365 subscription that contains a Microsoft SharePoint site named \"Site1\". You need to identify all the changes a site administrator made to \"Site1\"'s site settings. Which report should you use in the SharePoint admin center? (To answer, select the appropriate report in the answer area.)",
    options: {
      A: "Agent insights",
      B: "App insights",
      C: "Catalog management",
      D: "Change history",
      E: "Data access governance",
      F: "OneDrive accounts",
    },
  },
  "real-ab900-98": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "Microsoft Purview Communications Compliance can detect offensive text in images stored on Microsoft SharePoint sites",
      "Microsoft Purview Communications Compliance anonymizes user identities by default during investigations",
      "Microsoft Purview Communications Compliance adds a disclaimer to all monitored communications",
    ],
  },
  "real-ab900-99": {
    prompt: "Your organization has a Microsoft 365 subscription. All users have been assigned a Microsoft 365 Copilot license. You need to prevent users from generating images with Copilot. What should you use?",
    options: {
      A: "The Microsoft Defender portal",
      B: "The Microsoft Entra admin center",
      C: "The Microsoft Purview portal",
      D: "The Microsoft 365 admin center",
    },
  },
  "real-ab900-100": {
    prompt: "For each of the following statements, select Yes if the statement is true. Otherwise, select No. (NOTE: Each correct selection is worth one point.)",
    statements: [
      "Administrators can block specific sites from being used by Microsoft 365 Copilot",
      "Administrators can prevent Microsoft 365 Copilot from using web search when answering user queries",
      "Administrators can block access to the Researcher agent in Microsoft 365 Copilot while still allowing access to the Analyst agent",
    ],
  },
  "real-ab900-101": {
    prompt: "You need to ensure that users can use an external system as a knowledge source for custom Microsoft 365 Copilot agents. What should you configure in the Microsoft 365 admin center? (To answer, select the appropriate settings in the answer area.)",
    options: {
      A: "Copilot - Connectors",
      B: "Copilot - Search",
      C: "Copilot - Settings",
      D: "Agents - Overview",
      E: "Agents - Tools",
      F: "Agents - Settings",
    },
  },
};

export default ab900_en;
