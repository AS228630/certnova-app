// English translations for the deep hand-authored content of the 4 real
// Azure labs (lib/labsData.ts). CLI commands, resource names (CC-Lab-RG,
// CC-Lab-VM, etc.), and region names are left unchanged since they're
// literal values the user types/sees in the simulator, not prose.

export type LabTranslation = {
  goal?: string;
  goalChecklist?: string[];
  instructions?: string[];
  details?: Partial<Record<string, string>>; // keyed by the German label, translates the label
  detailValues?: Partial<Record<string, string>>; // keyed by German label, translates the value (e.g. role names)
  resources?: Partial<Record<string, string>>; // keyed by resource id
  tasks?: Partial<Record<string, string>>; // keyed by task id
  docs?: Partial<Record<string, string>>; // keyed by German doc label
  steps?: Partial<
    Record<
      string,
      { title?: string; description?: string; goal?: string; prerequisites?: string[]; notes?: string }
    >
  >; // keyed by step id, for AZ104_B2C_LAB
};

const labs_en: Record<string, LabTranslation> = {
  "resource-group-basics": {
    goal: 'Create a resource group named "CC-Lab-RG" in "West Europe" and a storage account inside it.',
    goalChecklist: [
      'Create a resource group named "CC-Lab-RG"',
      "Select the West Europe region",
      "Create a storage account inside this resource group",
      "Confirm the result via az group list / az storage account list",
    ],
    instructions: [
      'Portal: On the left, select "Resource groups", click "Create", name CC-Lab-RG, region West Europe.',
      "CLI: az group create --name CC-Lab-RG --location westeurope",
      'Then select "Storage accounts" on the left and create one in CC-Lab-RG (lowercase letters/numbers only, 3-24 characters).',
      "CLI: az storage account create --name certcoachstorage --resource-group CC-Lab-RG --location westeurope",
      "The checklist on the right updates automatically once both resources exist correctly.",
    ],
    details: { "Azure Region": "Azure Region", "Benötigte Rollen": "Required Role", "Ziel-Ressourcengruppe": "Target Resource Group", "Ressourcen": "Resources", "Kosten": "Cost" },
    detailValues: { "Benötigte Rollen": "Contributor", "Kosten": "$0.00 (included in the lab)" },
    resources: { r1: "Resource Group (not yet created)", r2: "Storage Account (not yet created)" },
    tasks: { "rg-created": 'Resource group "CC-Lab-RG" created', "rg-region": "Region West Europe set correctly", "storage-created": "Storage account created in CC-Lab-RG" },
    docs: { "Was ist eine Ressourcengruppe?": "What is a resource group?", "az group create Referenz": "az group create reference" },
  },
  "az104-vm-creation": {
    goal: 'Create a resource group named "CC-Lab-RG" in "West Europe" and a virtual machine named "CC-Lab-VM" inside it.',
    goalChecklist: [
      'Create a resource group named "CC-Lab-RG"',
      "Select the West Europe region",
      'Create a virtual machine named "CC-Lab-VM" inside this resource group',
      "Confirm the result via az group list / az vm list",
    ],
    instructions: [
      'Portal: On the left, select "Resource groups", click "Create", name CC-Lab-RG, region West Europe.',
      "CLI: az group create --name CC-Lab-RG --location westeurope",
      'Then select "Virtual machines" on the left and create a VM named CC-Lab-VM in CC-Lab-RG.',
      "CLI: az vm create --name CC-Lab-VM --resource-group CC-Lab-RG --location westeurope --image Ubuntu2204 --admin-username azureuser",
      "The checklist on the right updates automatically once both resources exist correctly.",
    ],
    details: { "Azure Region": "Azure Region", "Benötigte Rollen": "Required Role", "Ziel-Ressourcengruppe": "Target Resource Group", "Ressourcen": "Resources", "Kosten": "Cost" },
    detailValues: { "Benötigte Rollen": "Contributor", "Kosten": "$0.00 (included in the lab)" },
    resources: { r1: "Resource Group (not yet created)", r2: "Virtual Machine (not yet created)" },
    tasks: { "rg-created": 'Resource group "CC-Lab-RG" created', "rg-region": "Region West Europe set correctly", "vm-created": 'Virtual machine "CC-Lab-VM" created' },
    docs: { "Was ist eine virtuelle Maschine?": "What is a virtual machine?", "az vm create Referenz": "az vm create reference" },
  },
  "az104-vnet-creation": {
    goal: 'Create a resource group named "CC-Lab-RG" in "West Europe" and a virtual network named "CC-Lab-VNet" with address range 10.0.0.0/16 inside it.',
    goalChecklist: [
      'Create a resource group named "CC-Lab-RG"',
      "Select the West Europe region",
      'Create a virtual network named "CC-Lab-VNet" with address range 10.0.0.0/16',
      "Confirm the result via az group list / az network vnet list",
    ],
    instructions: [
      'Portal: On the left, select "Resource groups", click "Create", name CC-Lab-RG, region West Europe.',
      "CLI: az group create --name CC-Lab-RG --location westeurope",
      'Then select "Virtual networks" on the left and create one named CC-Lab-VNet in CC-Lab-RG with address range 10.0.0.0/16.',
      "CLI: az network vnet create --name CC-Lab-VNet --resource-group CC-Lab-RG --location westeurope --address-prefix 10.0.0.0/16 --subnet-name default --subnet-prefix 10.0.0.0/24",
      "The checklist on the right updates automatically once both resources exist correctly.",
    ],
    details: { "Azure Region": "Azure Region", "Benötigte Rollen": "Required Role", "Ziel-Ressourcengruppe": "Target Resource Group", "Ressourcen": "Resources", "Kosten": "Cost" },
    detailValues: { "Benötigte Rollen": "Network Contributor", "Kosten": "$0.00 (included in the lab)" },
    resources: { r1: "Resource Group (not yet created)", r2: "Virtual Network (not yet created)" },
    tasks: { "rg-created": 'Resource group "CC-Lab-RG" created', "rg-region": "Region West Europe set correctly", "vnet-created": 'Virtual network "CC-Lab-VNet" with 10.0.0.0/16 created' },
    docs: { "Was ist ein virtuelles Netzwerk?": "What is a virtual network?", "az network vnet create Referenz": "az network vnet create reference" },
  },
  "b2c-identitaeten": {
    goal: "Configure Azure AD B2C for external users.",
    goalChecklist: [
      "Create a B2C tenant",
      "User flow for sign-up and sign-in",
      "Verification methods (email)",
      "Test sign-up and sign-in",
    ],
    instructions: [
      "Create an Azure AD B2C tenant.",
      "Configure a sign-up/sign-in user flow.",
      "Enable email verification.",
      "Test the sign-up and sign-in process.",
      "Review the users in the Azure portal.",
    ],
    details: { "Azure Region": "Azure Region", "Benötigte Rollen": "Required Role", "Ressourcengruppe": "Resource Group", "Ressourcen": "Resources", "Kosten": "Cost" },
    detailValues: { "Benötigte Rollen": "Global Administrator", "Kosten": "$0.00 (included in the lab)" },
    resources: { r1: "Azure AD B2C Tenant", r2: "Web App (Demo)", r3: "Storage Account", r4: "App Service Plan" },
    tasks: { t1: "Create B2C tenant", t2: "Create user flow", t3: "Enable email verification", t4: "Test sign-up", t5: "Test sign-in" },
    docs: {
      "Azure AD B2C Documentation": "Azure AD B2C Documentation",
      "Tutorial: Azure AD B2C": "Tutorial: Azure AD B2C",
      "Best Practices für Identität": "Identity Best Practices",
    },
    steps: {
      s1: {
        title: "Azure AD B2C – Creating a Tenant",
        description: "Create a new Azure AD B2C tenant that serves as a standalone directory for external users (customers), separate from your internal company directory.",
        goal: "An Azure AD B2C tenant is created and linked to your subscription.",
        prerequisites: ["Active Azure subscription", "Global Administrator access"],
        notes: "The tenant name must be globally unique and ends in .onmicrosoft.com.",
      },
      s2: {
        title: "Create User Flow",
        description: "Configure a sign-up/sign-in user flow that determines how external users can register and sign in.",
        goal: "A working user flow is created and ready to test.",
        prerequisites: ["Azure AD B2C tenant exists"],
        notes: "Choose the 'Recommended' version for the latest customization options.",
      },
      s3: {
        title: "Enable Email Verification",
        description: "Enable email verification so new users must confirm their email address via a one-time code.",
        goal: "New sign-ups require a confirmed email address.",
        prerequisites: ["User flow created"],
      },
      s4: {
        title: "Configure Sign-Up",
        description: "Customize the sign-up page: which attributes are collected and returned in the token.",
        goal: "The sign-up form collects exactly the required user attributes.",
        prerequisites: ["User flow created"],
      },
      s5: {
        title: "Test Sign-In",
        description: "Test the complete sign-up and sign-in process using 'Run user flow'.",
        goal: "A test user can successfully sign up and sign in.",
        prerequisites: ["Sign-up configured"],
      },
      s6: {
        title: "Configure Password Policies",
        description: "Set complexity requirements for passwords (length, character types, lockout behavior).",
        goal: "Password policies meet the lab's security requirements.",
        prerequisites: ["User flow created"],
      },
    },
  },
};

export default labs_en;
