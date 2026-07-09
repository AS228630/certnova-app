// English translations for the hand-authored learn tracks (AZ900_MODULES,
// AZ104_MODULES in lib/learnData.ts). Keyed by certId -> moduleId for
// module-level fields, certId -> moduleId -> lessonId for lesson titles.
// Falls back to German for anything not listed here.

export type LearnTrackTranslation = {
  modules: Partial<
    Record<
      string,
      {
        title?: string;
        description?: string;
        lockedHint?: string;
        lessons?: Partial<Record<string, string>>;
      }
    >
  >;
};

const learnTracks_en: Record<string, LearnTrackTranslation> = {
  "az-900": {
    modules: {
      einfuehrung: {
        title: "Introduction to Azure",
        description: "Azure fundamentals, global infrastructure, regions, and availability zones.",
        lessons: {
          l1: "What Is Cloud Computing?",
          l2: "Azure Regions and Availability Zones",
          l3: "Resource Groups and Subscriptions",
          l4: "Quiz: Fundamentals",
        },
      },
      kernservices: {
        title: "Core Azure Services",
        description: "An overview of compute, storage, network, and database services.",
        lessons: {
          l1: "Virtual Machines",
          l2: "App Services & Containers",
          l3: "Comparing Storage Options",
          l4: "Quiz: Core Services",
        },
      },
      sicherheit: {
        title: "Security, Compliance, and Trust",
        description: "Identity management, governance tools, and Azure's compliance offerings.",
        lessons: {
          l1: "Microsoft Entra ID Fundamentals",
          l2: "Azure Policy and RBAC",
          l3: "Quiz: Security & Compliance",
        },
      },
      preise: {
        title: "Cost and Support",
        description: "Pricing models, cost management, and Azure support plans.",
        lockedHint: "Complete Module 3 to unlock",
        lessons: {
          l1: "Pricing Calculator and TCO",
          l2: "Comparing Support Plans",
          l3: "Quiz: Cost & Support",
        },
      },
    },
  },
  "az-104": {
    modules: {
      einfuehrung: {
        title: "Introduction to Azure",
        description: "Azure fundamentals, global infrastructure, regions, and availability zones.",
        lessons: {
          l1: "Azure Administrator: Role & Responsibilities",
          l2: "Azure Resource Hierarchy",
          l3: "Azure CLI & PowerShell Overview",
          l4: "Quiz: Fundamentals",
        },
      },
      identitaeten: {
        title: "Azure Identity and Access Management",
        description: "Managing users, groups, roles, and access control with Azure AD.",
        lessons: {
          l1: "Managing Users and Groups",
          l2: "Role-Based Access Control (RBAC)",
          l3: "Conditional Access",
          l4: "Quiz: Identity & Access",
        },
      },
      governance: {
        title: "Azure Governance and Compliance",
        description: "Managing policies, role assignments, and compliance in Azure.",
        lessons: {
          l1: "Azure Policy Fundamentals",
          l2: "Role Assignments in Azure",
          l3: "Compliance and Standards",
          l4: "Identity Governance",
          l5: "Quiz: Governance Fundamentals",
        },
      },
      speicher: {
        title: "Azure Storage Solutions",
        description: "An overview of Blob Storage, Files, Queues, and Tables in Azure.",
        lockedHint: "Complete Module 3 to unlock",
        lessons: {
          l1: "Blob Storage Fundamentals",
          l2: "Azure Files and Storage Shares",
          l3: "Quiz: Storage Solutions",
        },
      },
    },
  },
};

export default learnTracks_en;
