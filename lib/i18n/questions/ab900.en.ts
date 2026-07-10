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
};

export default ab900_en;
