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
};

export default ab900_en;
