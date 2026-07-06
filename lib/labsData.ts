// Data for the hands-on "Lab Environment" pages. `AZ104_B2C_LAB` is a fully
// authored, real lab. `generateLab` produces a sensible generic lab for any
// cert that doesn't have hand-authored content yet, using that cert's own
// title — so every company/cert gets a working, correctly-labelled page.

export type LabResource = { id: string; label: string; active: boolean };
export type LabTask = { id: string; label: string; done: boolean };
export type LabStep = {
  id: string;
  title: string;
  durationLabel: string;
  status: "ready" | "locked";
  description?: string;
  goal?: string;
  prerequisites?: string[];
  notes?: string;
};

export type Lab = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationLabel: string;
  totalMinutes: number;
  tags: string[];
  goal: string;
  goalChecklist: string[];
  instructions: string[];
  details: { label: string; value: string }[];
  resources: LabResource[];
  tasks: LabTask[];
  docs: { label: string; url: string }[];
  /** Numbered sub-labs shown in the "Lab-Übersicht" overview grid. */
  steps?: LabStep[];
  /** When set, the lab renders a real, state-driven simulation instead of the static mock. */
  interactive?: "resource-group" | "virtual-machine" | "virtual-network" | "s3-bucket" | "ad-user" | "gcs-bucket" | "m365-user";
  /** URL segment for this lab under /certifications/[company]/[certId]/labs/[labSlug]. */
  slug?: string;
};

export const AZ900_RG_LAB: Lab = {
  id: "resource-group-basics",
  slug: "resource-group-basics",
  title: "Lab: Erste Ressourcengruppe erstellen",
  description:
    "Erstelle deine erste Azure-Ressourcengruppe — entweder über das Portal oder direkt per Azure CLI in der Cloud Shell. Diese Simulation prüft dein Ergebnis in Echtzeit.",
  level: "Beginner",
  durationLabel: "20-30 Minuten",
  totalMinutes: 25 * 60,
  tags: ["Online-Lab", "Echtzeit-Validierung", "Reset möglich", "Portal + CLI"],
  goal: 'Erstelle eine Ressourcengruppe namens "CC-Lab-RG" in "West Europe" und darin ein Speicherkonto.',
  goalChecklist: [
    'Ressourcengruppe mit dem Namen "CC-Lab-RG" erstellen',
    "Region West Europe auswählen",
    "Ein Speicherkonto in dieser Ressourcengruppe erstellen",
    "Ergebnis über az group list / az storage account list bestätigen",
  ],
  instructions: [
    'Portal: Wähle links "Resource groups", klicke "Create", Name CC-Lab-RG, Region West Europe.',
    'CLI: az group create --name CC-Lab-RG --location westeurope',
    'Wähle danach links "Storage accounts" und erstelle eins in CC-Lab-RG (nur Kleinbuchstaben/Zahlen, 3-24 Zeichen).',
    'CLI: az storage account create --name certcoachstorage --resource-group CC-Lab-RG --location westeurope',
    "Die Checkliste rechts aktualisiert sich automatisch, sobald beide Ressourcen korrekt existieren.",
  ],
  details: [
    { label: "Azure Region", value: "West Europe" },
    { label: "Benötigte Rollen", value: "Mitwirkender" },
    { label: "Ziel-Ressourcengruppe", value: "CC-Lab-RG" },
    { label: "Ressourcen", value: "2" },
    { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
  ],
  resources: [
    { id: "r1", label: "Resource Group (noch nicht erstellt)", active: false },
    { id: "r2", label: "Storage Account (noch nicht erstellt)", active: false },
  ],
  tasks: [
    { id: "rg-created", label: 'Ressourcengruppe "CC-Lab-RG" erstellt', done: false },
    { id: "rg-region", label: "Region West Europe korrekt gesetzt", done: false },
    { id: "storage-created", label: "Speicherkonto in CC-Lab-RG erstellt", done: false },
  ],
  docs: [
    {
      label: "Was ist eine Ressourcengruppe?",
      url: "https://learn.microsoft.com/de-de/azure/azure-resource-manager/management/overview",
    },
    { label: "az group create Referenz", url: "https://learn.microsoft.com/de-de/cli/azure/group" },
  ],
  interactive: "resource-group",
};

export const AZ104_VM_LAB: Lab = {
  id: "az104-vm-creation",
  slug: "vm-creation",
  title: "Lab: Erste virtuelle Maschine erstellen",
  description:
    "Erstelle eine Ressourcengruppe und darin eine virtuelle Maschine — über das Portal oder direkt per Azure CLI in der Cloud Shell. Diese Simulation prüft dein Ergebnis in Echtzeit.",
  level: "Beginner",
  durationLabel: "20-30 Minuten",
  totalMinutes: 25 * 60,
  tags: ["Online-Lab", "Echtzeit-Validierung", "Reset möglich", "Portal + CLI"],
  goal: 'Erstelle eine Ressourcengruppe namens "CC-Lab-RG" in "West Europe" und darin eine virtuelle Maschine namens "CC-Lab-VM".',
  goalChecklist: [
    'Ressourcengruppe mit dem Namen "CC-Lab-RG" erstellen',
    "Region West Europe auswählen",
    'Eine virtuelle Maschine namens "CC-Lab-VM" in dieser Ressourcengruppe erstellen',
    "Ergebnis über az group list / az vm list bestätigen",
  ],
  instructions: [
    'Portal: Wähle links "Resource groups", klicke "Create", Name CC-Lab-RG, Region West Europe.',
    'CLI: az group create --name CC-Lab-RG --location westeurope',
    'Wähle danach links "Virtual machines" und erstelle eine VM namens CC-Lab-VM in CC-Lab-RG.',
    'CLI: az vm create --name CC-Lab-VM --resource-group CC-Lab-RG --location westeurope --image Ubuntu2204 --admin-username azureuser',
    "Die Checkliste rechts aktualisiert sich automatisch, sobald beide Ressourcen korrekt existieren.",
  ],
  details: [
    { label: "Azure Region", value: "West Europe" },
    { label: "Benötigte Rollen", value: "Mitwirkender" },
    { label: "Ziel-Ressourcengruppe", value: "CC-Lab-RG" },
    { label: "Ressourcen", value: "2" },
    { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
  ],
  resources: [
    { id: "r1", label: "Resource Group (noch nicht erstellt)", active: false },
    { id: "r2", label: "Virtual Machine (noch nicht erstellt)", active: false },
  ],
  tasks: [
    { id: "rg-created", label: 'Ressourcengruppe "CC-Lab-RG" erstellt', done: false },
    { id: "rg-region", label: "Region West Europe korrekt gesetzt", done: false },
    { id: "vm-created", label: 'Virtuelle Maschine "CC-Lab-VM" erstellt', done: false },
  ],
  docs: [
    {
      label: "Was ist eine virtuelle Maschine?",
      url: "https://learn.microsoft.com/de-de/azure/virtual-machines/overview",
    },
    { label: "az vm create Referenz", url: "https://learn.microsoft.com/de-de/cli/azure/vm" },
  ],
  interactive: "virtual-machine",
};

export const AZ104_VNET_LAB: Lab = {
  id: "az104-vnet-creation",
  slug: "vnet-creation",
  title: "Lab: Virtuelles Netzwerk erstellen",
  description:
    "Erstelle eine Ressourcengruppe und darin ein virtuelles Netzwerk mit Subnetz — über das Portal oder direkt per Azure CLI in der Cloud Shell. Diese Simulation prüft dein Ergebnis in Echtzeit.",
  level: "Beginner",
  durationLabel: "20-30 Minuten",
  totalMinutes: 25 * 60,
  tags: ["Online-Lab", "Echtzeit-Validierung", "Reset möglich", "Portal + CLI"],
  goal: 'Erstelle eine Ressourcengruppe namens "CC-Lab-RG" in "West Europe" und darin ein virtuelles Netzwerk namens "CC-Lab-VNet" mit Adressbereich 10.0.0.0/16.',
  goalChecklist: [
    'Ressourcengruppe mit dem Namen "CC-Lab-RG" erstellen',
    "Region West Europe auswählen",
    'Ein virtuelles Netzwerk namens "CC-Lab-VNet" mit Adressbereich 10.0.0.0/16 erstellen',
    "Ergebnis über az group list / az network vnet list bestätigen",
  ],
  instructions: [
    'Portal: Wähle links "Resource groups", klicke "Create", Name CC-Lab-RG, Region West Europe.',
    'CLI: az group create --name CC-Lab-RG --location westeurope',
    'Wähle danach links "Virtual networks" und erstelle eins namens CC-Lab-VNet in CC-Lab-RG mit Adressbereich 10.0.0.0/16.',
    'CLI: az network vnet create --name CC-Lab-VNet --resource-group CC-Lab-RG --location westeurope --address-prefix 10.0.0.0/16 --subnet-name default --subnet-prefix 10.0.0.0/24',
    "Die Checkliste rechts aktualisiert sich automatisch, sobald beide Ressourcen korrekt existieren.",
  ],
  details: [
    { label: "Azure Region", value: "West Europe" },
    { label: "Benötigte Rollen", value: "Netzwerkmitwirkender" },
    { label: "Ziel-Ressourcengruppe", value: "CC-Lab-RG" },
    { label: "Ressourcen", value: "2" },
    { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
  ],
  resources: [
    { id: "r1", label: "Resource Group (noch nicht erstellt)", active: false },
    { id: "r2", label: "Virtual Network (noch nicht erstellt)", active: false },
  ],
  tasks: [
    { id: "rg-created", label: 'Ressourcengruppe "CC-Lab-RG" erstellt', done: false },
    { id: "rg-region", label: "Region West Europe korrekt gesetzt", done: false },
    { id: "vnet-created", label: 'Virtuelles Netzwerk "CC-Lab-VNet" mit 10.0.0.0/16 erstellt', done: false },
  ],
  docs: [
    {
      label: "Was ist ein virtuelles Netzwerk?",
      url: "https://learn.microsoft.com/de-de/azure/virtual-network/virtual-networks-overview",
    },
    { label: "az network vnet create Referenz", url: "https://learn.microsoft.com/de-de/cli/azure/network/vnet" },
  ],
  interactive: "virtual-network",
};

export const AZ104_B2C_LAB: Lab = {
  id: "b2c-identitaeten",
  slug: "b2c-identitaeten",
  title: "Lab: Verwalten von Azure-Identitäten (B2C)",
  description: "Konfigurieren und verwalten Sie Azure AD B2C für externe Benutzer (B2C = Business to Customer).",
  level: "Intermediate",
  durationLabel: "90-120 Minuten",
  totalMinutes: 119 * 60 + 32,
  tags: ["Online-Lab", "Sichere Umgebung", "Reset möglich", "Auto-Validierung", "Schritt-für-Schritt-Anleitung"],
  goal: "Konfigurieren Sie Azure AD B2C für externe Benutzer.",
  goalChecklist: [
    "B2C-Tenant erstellen",
    "Benutzerflow für Registrierung und Anmeldung",
    "Verifizierungsmethoden (E-Mail)",
    "Testen der Registrierung und Anmeldung",
  ],
  instructions: [
    "Erstellen Sie einen Azure AD B2C Tenant.",
    "Konfigurieren Sie einen Sign-up/Sign-in-Benutzerflow.",
    "Aktivieren Sie die E-Mail-Verifizierung.",
    "Testen Sie die Registrierung und Anmeldung.",
    "Überprüfen Sie die Benutzer im Azure Portal.",
  ],
  details: [
    { label: "Azure Region", value: "West Europe" },
    { label: "Benötigte Rollen", value: "Globaler Administrator" },
    { label: "Ressourcengruppe", value: "CC-Lab-RG" },
    { label: "Ressourcen", value: "4" },
    { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
  ],
  resources: [
    { id: "r1", label: "Azure AD B2C Tenant", active: true },
    { id: "r2", label: "Web App (Demo)", active: true },
    { id: "r3", label: "Storage Account", active: true },
    { id: "r4", label: "App Service Plan", active: true },
  ],
  tasks: [
    { id: "t1", label: "B2C Tenant erstellen", done: true },
    { id: "t2", label: "Benutzerflow erstellen", done: true },
    { id: "t3", label: "E-Mail-Verifizierung aktivieren", done: true },
    { id: "t4", label: "Registrierung testen", done: true },
    { id: "t5", label: "Anmeldung testen", done: false },
  ],
  docs: [
    { label: "Azure AD B2C Documentation", url: "https://learn.microsoft.com/de-de/azure/active-directory-b2c/" },
    { label: "Tutorial: Azure AD B2C", url: "https://learn.microsoft.com/de-de/azure/active-directory-b2c/tutorial-create-tenant" },
    { label: "Best Practices für Identität", url: "https://learn.microsoft.com/de-de/azure/active-directory-b2c/best-practices" },
  ],
  steps: [
    {
      id: "s1",
      title: "Azure AD B2C – Erstellen eines Mandanten",
      durationLabel: "10-15 Min.",
      status: "ready",
      description:
        "Lege einen neuen Azure AD B2C-Mandanten an, der als eigenständiges Verzeichnis für externe Benutzer (Kunden) dient, getrennt von deinem internen Unternehmensverzeichnis.",
      goal: "Ein Azure AD B2C-Mandant ist erstellt und mit deinem Abonnement verknüpft.",
      prerequisites: ["Aktives Azure-Abonnement", "Globaler Administrator-Zugriff"],
      notes: "Der Mandantenname muss global eindeutig sein und endet auf .onmicrosoft.com.",
    },
    {
      id: "s2",
      title: "Benutzerflow erstellen",
      durationLabel: "15-20 Min.",
      status: "ready",
      description:
        "Konfiguriere einen Sign-up/Sign-in-Benutzerflow, der festlegt, wie sich externe Benutzer registrieren und anmelden können.",
      goal: "Ein funktionierender Benutzerflow ist erstellt und kann getestet werden.",
      prerequisites: ["Azure AD B2C-Mandant vorhanden"],
      notes: "Wähle die Version 'Empfohlen' für die neuesten Anpassungsoptionen.",
    },
    {
      id: "s3",
      title: "E-Mail-Verifizierung aktivieren",
      durationLabel: "10-15 Min.",
      status: "ready",
      description:
        "Aktiviere die E-Mail-Verifizierung, damit neue Benutzer ihre E-Mail-Adresse per Einmalcode bestätigen müssen.",
      goal: "Neue Registrierungen erfordern eine bestätigte E-Mail-Adresse.",
      prerequisites: ["Benutzerflow erstellt"],
    },
    {
      id: "s4",
      title: "Registrierung konfigurieren",
      durationLabel: "15-20 Min.",
      status: "ready",
      description: "Passe die Registrierungsseite an: welche Attribute abgefragt und im Token zurückgegeben werden.",
      goal: "Das Registrierungsformular sammelt genau die benötigten Benutzerattribute.",
      prerequisites: ["Benutzerflow erstellt"],
    },
    {
      id: "s5",
      title: "Anmeldung testen",
      durationLabel: "10-15 Min.",
      status: "ready",
      description: "Teste den kompletten Registrierungs- und Anmeldevorgang über 'Benutzerflow ausführen'.",
      goal: "Ein Testbenutzer kann sich erfolgreich registrieren und anmelden.",
      prerequisites: ["Registrierung konfiguriert"],
    },
    {
      id: "s6",
      title: "Passwortrichtlinien konfigurieren",
      durationLabel: "15-20 Min.",
      status: "ready",
      description: "Lege Komplexitätsanforderungen für Passwörter fest (Länge, Zeichenarten, Sperrverhalten).",
      goal: "Passwortrichtlinien entsprechen den Sicherheitsanforderungen des Labs.",
      prerequisites: ["Benutzerflow erstellt"],
    },
    {
      id: "s7",
      title: "Multi-Faktor-Authentifizierung aktivieren",
      durationLabel: "10-15 Min.",
      status: "ready",
      description: "Aktiviere MFA (z.B. per SMS oder E-Mail-Code) als zusätzliche Sicherheitsebene beim Anmelden.",
      goal: "MFA ist für den Benutzerflow verpflichtend aktiviert.",
      prerequisites: ["Anmeldung getestet"],
    },
    {
      id: "s8",
      title: "Benutzerattribute verwalten",
      durationLabel: "10-15 Min.",
      status: "ready",
      description: "Definiere benutzerdefinierte Attribute (z.B. Firmenname, Kundennummer) für dein Verzeichnis.",
      goal: "Benutzerdefinierte Attribute sind angelegt und im Registrierungsflow sichtbar.",
      prerequisites: ["Azure AD B2C-Mandant vorhanden"],
    },
    {
      id: "s9",
      title: "API-Verbindungen konfigurieren",
      durationLabel: "15-20 Min.",
      status: "ready",
      description: "Verbinde den Benutzerflow mit einer REST-API zur Validierung von Eingaben während der Registrierung.",
      goal: "Eine API-Verbindung ist konfiguriert und wird im Flow aufgerufen.",
      prerequisites: ["Registrierung konfiguriert"],
    },
    {
      id: "s10",
      title: "Anwendungen integrieren",
      durationLabel: "15-20 Min.",
      status: "ready",
      description: "Registriere eine Beispielanwendung in Azure AD B2C und verbinde sie mit dem Benutzerflow.",
      goal: "Eine App-Registrierung existiert und akzeptiert Anmeldungen über B2C.",
      prerequisites: ["Benutzerflow erstellt"],
    },
    {
      id: "s11",
      title: "Identitätsanbieter konfigurieren",
      durationLabel: "15-20 Min.",
      status: "ready",
      description: "Füge einen externen Identitätsanbieter (z.B. Google oder Microsoft-Konto) als Anmeldeoption hinzu.",
      goal: "Benutzer können sich zusätzlich über einen externen Anbieter anmelden.",
      prerequisites: ["Benutzerflow erstellt"],
    },
    {
      id: "s12",
      title: "Überwachung und Protokollierung",
      durationLabel: "10-15 Min.",
      status: "ready",
      description: "Richte Azure Monitor / Log Analytics ein, um Anmeldeversuche und Fehler zu protokollieren.",
      goal: "Anmeldeereignisse werden protokolliert und sind im Log Analytics-Workspace sichtbar.",
      prerequisites: ["Mindestens ein Benutzerflow aktiv"],
    },
  ],
};

// Each certId can now have multiple hand-authored labs, addressed by slug
// (/certifications/[company]/[certId]/labs/[labSlug]). The first entry in
// each array is the "primary" lab shown at the no-slug /labs route, so
// existing links and getLab(certId, ...) calls keep working unchanged.
const LABS: Record<string, Lab[]> = {
  "az-104": [AZ104_VM_LAB, AZ104_VNET_LAB, AZ104_B2C_LAB],
  "az-900": [AZ900_RG_LAB],
};

function generateLab(certId: string, certTitle: string, level: string): Lab {
  return {
    id: `${certId}-praxis-lab`,
    title: `Lab: Praxisübung zu ${certTitle}`,
    description: `Wende die Konzepte von „${certTitle}“ in einer echten, isolierten Cloud-Umgebung an.`,
    level: (level as Lab["level"]) ?? "Beginner",
    durationLabel: "45-60 Minuten",
    totalMinutes: 50 * 60,
    tags: ["Online-Lab", "Sichere Umgebung", "Reset möglich", "Schritt-für-Schritt-Anleitung"],
    goal: `Setze die Kernkonzepte von ${certTitle} praktisch um.`,
    goalChecklist: ["Umgebung vorbereiten", "Ressource konfigurieren", "Ergebnis überprüfen"],
    instructions: [
      "Öffnen Sie die virtuelle Umgebung.",
      "Folgen Sie den Schritt-für-Schritt-Anweisungen.",
      "Überprüfen Sie Ihr Ergebnis mit der Validierung.",
    ],
    details: [
      { label: "Azure Region", value: "West Europe" },
      { label: "Benötigte Rollen", value: "Mitwirkender" },
      { label: "Ressourcengruppe", value: `${certId.toUpperCase()}-Lab-RG` },
      { label: "Ressourcen", value: "2" },
      { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
    ],
    resources: [
      { id: "r1", label: "Demo-Ressource 1", active: true },
      { id: "r2", label: "Demo-Ressource 2", active: true },
    ],
    tasks: [
      { id: "t1", label: "Umgebung vorbereiten", done: false },
      { id: "t2", label: "Ressource konfigurieren", done: false },
      { id: "t3", label: "Ergebnis validieren", done: false },
    ],
    docs: [],
  };
}

export function generateAwsLab(certId: string, certTitle: string, level: string): Lab {
  return {
    id: `${certId}-s3-lab`,
    title: `Lab: Ersten S3-Bucket erstellen`,
    description: `Wende die Konzepte von „${certTitle}“ praktisch an: erstelle und konfiguriere einen Amazon-S3-Bucket in einer echten, isolierten AWS-Umgebung.`,
    level: (level as Lab["level"]) ?? "Beginner",
    durationLabel: "30-40 Minuten",
    totalMinutes: 35 * 60,
    tags: ["Online-Lab", "Sichere Umgebung", "Reset möglich", "Schritt-für-Schritt-Anleitung"],
    goal: "Erstelle einen S3-Bucket mit den richtigen Einstellungen für sicheres Speichern.",
    goalChecklist: [
      "Bucket mit eindeutigem Namen erstellen",
      "Region auswählen",
      "Blockierung des öffentlichen Zugriffs aktiviert lassen",
      "Bucket in der Übersicht bestätigen",
    ],
    instructions: [
      "Öffne die AWS-Konsole und navigiere zu S3.",
      "Klicke auf „Bucket erstellen“ und vergib einen eindeutigen Namen.",
      "Wähle die Region eu-central-1 (Frankfurt).",
      "Überprüfe dein Ergebnis mit der Validierung.",
    ],
    details: [
      { label: "AWS Region", value: "eu-central-1 (Frankfurt)" },
      { label: "Benötigte Rollen", value: "S3 Full Access" },
      { label: "Ziel-Bucket", value: `${certId}-lab-bucket` },
      { label: "Ressourcen", value: "1" },
      { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
    ],
    resources: [{ id: "r1", label: "S3 Bucket (Demo)", active: true }],
    tasks: [
      { id: "bucket-created", label: "Bucket erstellen", done: false },
      { id: "bucket-region", label: "Region eu-central-1 (Frankfurt) auswählen", done: false },
      { id: "bucket-secure", label: "Öffentlichen Zugriff blockiert lassen", done: false },
    ],
    docs: [
      { label: "Amazon S3 Dokumentation", url: "https://docs.aws.amazon.com/s3/" },
      { label: "S3-Bucket-Benennungsregeln", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html" },
    ],
    interactive: "s3-bucket",
  };
}

export function generateM365Lab(certId: string, certTitle: string, level: string): Lab {
  return {
    id: `${certId}-user-lab`,
    title: `Lab: Neuen Benutzer im Microsoft 365 Admin Center anlegen`,
    description: `Wende die Konzepte von „${certTitle}“ praktisch an: lege einen neuen Benutzer an und weise eine Lizenz zu.`,
    level: (level as Lab["level"]) ?? "Beginner",
    durationLabel: "20-30 Minuten",
    totalMinutes: 25 * 60,
    tags: ["Online-Lab", "Sichere Umgebung", "Reset möglich", "Schritt-für-Schritt-Anleitung"],
    goal: "Erstelle einen neuen Benutzer und weise ihm eine Microsoft-365-Lizenz zu.",
    goalChecklist: [
      "Benutzer mit Anzeigename und Benutzername anlegen",
      "Passwort festlegen",
      "Lizenz zuweisen",
      "Benutzer in der Übersicht bestätigen",
    ],
    instructions: [
      "Öffne das Microsoft 365 Admin Center und navigiere zu „Benutzer“.",
      "Klicke auf „Benutzer hinzufügen“ und fülle Name und Benutzername aus.",
      "Weise eine passende Lizenz zu.",
      "Überprüfe dein Ergebnis mit der Validierung.",
    ],
    details: [
      { label: "Organisation", value: "CertCoach GmbH (Lab)" },
      { label: "Benötigte Rollen", value: "Benutzeradministrator" },
      { label: "Ziel-Domain", value: `${certId}-lab.onmicrosoft.com` },
      { label: "Ressourcen", value: "1" },
      { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
    ],
    resources: [{ id: "r1", label: "Benutzerkonto (Demo)", active: true }],
    tasks: [
      { id: "user-created", label: "Benutzer anlegen", done: false },
      { id: "user-licensed", label: "Lizenz zuweisen", done: false },
    ],
    docs: [
      { label: "Benutzer hinzufügen (Microsoft Learn)", url: "https://learn.microsoft.com/microsoft-365/admin/add-users/add-users" },
      { label: "Lizenzen zuweisen", url: "https://learn.microsoft.com/microsoft-365/admin/manage/assign-licenses-to-users" },
    ],
    interactive: "m365-user",
  };
}

export function generateLinuxLab(certId: string, certTitle: string, level: string): Lab {
  return {
    id: `${certId}-terminal-lab`,
    title: `Lab: Linux-Terminal Grundlagen`,
    description: `Wende die Konzepte von „${certTitle}“ praktisch an: navigiere das Dateisystem, lege Verzeichnisse an und setze Berechtigungen in einem echten, isolierten Linux-Terminal.`,
    level: (level as Lab["level"]) ?? "Beginner",
    durationLabel: "20-30 Minuten",
    totalMinutes: 25 * 60,
    tags: ["Online-Lab", "Sichere Umgebung", "Reset möglich", "Schritt-für-Schritt-Anleitung"],
    goal: "Navigiere das Dateisystem, lege ein Verzeichnis mit einer Datei an und setze die richtigen Berechtigungen.",
    goalChecklist: [
      "Aktuelles Verzeichnis mit pwd anzeigen",
      "Verzeichnis lab-data anlegen",
      "Datei notes.txt in lab-data erstellen",
      "Ausführungsrechte für notes.txt setzen",
    ],
    instructions: [
      "Zeige mit pwd dein aktuelles Verzeichnis an.",
      "Lege mit mkdir lab-data ein neues Verzeichnis an.",
      "Wechsle mit cd lab-data hinein und erstelle mit touch notes.txt eine Datei.",
      "Setze mit chmod +x notes.txt die Ausführungsrechte und überprüfe mit ls -l.",
    ],
    details: [
      { label: "Distribution", value: "Ubuntu 22.04 LTS" },
      { label: "Benötigte Rechte", value: "Standardnutzer (kein root)" },
      { label: "Arbeitsverzeichnis", value: "/home/student" },
      { label: "Ressourcen", value: "1 virtuelles Terminal" },
      { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
    ],
    resources: [{ id: "r1", label: "Linux-Terminal (Demo)", active: true }],
    tasks: [
      { id: "t1", label: "Verzeichnis anlegen", done: false },
      { id: "t2", label: "Datei erstellen", done: false },
      { id: "t3", label: "Berechtigungen setzen", done: false },
      { id: "t4", label: "Ergebnis validieren", done: false },
    ],
    docs: [
      { label: "Linux-Dateisystem-Grundlagen", url: "https://linuxjourney.com/" },
      { label: "chmod-Berechtigungen erklärt", url: "https://en.wikipedia.org/wiki/Chmod" },
    ],
  };
}

export function generateWindowsServerLab(certId: string, certTitle: string, level: string): Lab {
  return {
    id: `${certId}-ad-lab`,
    title: `Lab: Active Directory-Benutzer verwalten`,
    description: `Wende die Konzepte von „${certTitle}“ praktisch an: navigiere die Domänenstruktur und lege einen neuen Active-Directory-Benutzer an.`,
    level: (level as Lab["level"]) ?? "Beginner",
    durationLabel: "20-30 Minuten",
    totalMinutes: 25 * 60,
    tags: ["Online-Lab", "Sichere Umgebung", "Reset möglich", "Schritt-für-Schritt-Anleitung"],
    goal: "Navigiere die Organisationseinheiten der Domäne und lege einen neuen Benutzer in der OU „Users“ an.",
    goalChecklist: [
      "Domänenstruktur in Active Directory-Benutzer und -Computer öffnen",
      "Organisationseinheit „Users“ auswählen",
      "Neuen Benutzer anlegen",
      "Ergebnis validieren",
    ],
    instructions: [
      "Öffne „Active Directory-Benutzer und -Computer“.",
      "Navigiere zur Organisationseinheit „Users“.",
      "Klicke auf „Neuer Benutzer“ und vergib einen Anzeigenamen.",
      "Überprüfe dein Ergebnis mit der Validierung.",
    ],
    details: [
      { label: "Domäne", value: "certcoach-lab.local" },
      { label: "Benötigte Rollen", value: "Domänen-Administrator" },
      { label: "Ziel-OU", value: "Users" },
      { label: "Ressourcen", value: "1" },
      { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
    ],
    resources: [{ id: "r1", label: "Domänencontroller (Demo)", active: true }],
    tasks: [
      { id: "ou-selected", label: "OU „Users“ öffnen", done: false },
      { id: "user-created", label: "Benutzer anlegen", done: false },
      { id: "user-in-ou", label: "Benutzer befindet sich in „Users“", done: false },
    ],
    docs: [
      { label: "Active Directory-Grundlagen (Microsoft Learn)", url: "https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview" },
      { label: "Benutzer und Computer verwalten", url: "https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/adac/introduction-to-active-directory-administrative-center-enhancements" },
    ],
    interactive: "ad-user",
  };
}

export function generateGcpLab(certId: string, certTitle: string, level: string): Lab {
  return {
    id: `${certId}-gcs-lab`,
    title: `Lab: Ersten Cloud-Storage-Bucket erstellen`,
    description: `Wende die Konzepte von „${certTitle}“ praktisch an: erstelle und konfiguriere einen Google-Cloud-Storage-Bucket in einer echten, isolierten GCP-Umgebung.`,
    level: (level as Lab["level"]) ?? "Beginner",
    durationLabel: "25-35 Minuten",
    totalMinutes: 30 * 60,
    tags: ["Online-Lab", "Sichere Umgebung", "Reset möglich", "Schritt-für-Schritt-Anleitung"],
    goal: "Erstelle einen Cloud-Storage-Bucket mit den richtigen Einstellungen für sicheres Speichern.",
    goalChecklist: [
      "Bucket mit global eindeutigem Namen erstellen",
      "Standort/Region auswählen",
      "Standardspeicherklasse festlegen",
      "Bucket in der Übersicht bestätigen",
    ],
    instructions: [
      "Öffne die Google Cloud Console und navigiere zu Cloud Storage.",
      "Klicke auf „Erstellen“ und vergib einen global eindeutigen Namen.",
      "Wähle die Region europe-west3 (Frankfurt).",
      "Überprüfe dein Ergebnis mit der Validierung.",
    ],
    details: [
      { label: "GCP-Region", value: "europe-west3 (Frankfurt)" },
      { label: "Benötigte Rollen", value: "Storage Admin" },
      { label: "Ziel-Bucket", value: `${certId}-lab-bucket` },
      { label: "Ressourcen", value: "1" },
      { label: "Kosten", value: "$0.00 (im Lab enthalten)" },
    ],
    resources: [{ id: "r1", label: "Cloud Storage Bucket (Demo)", active: true }],
    tasks: [
      { id: "bucket-created", label: "Bucket erstellen", done: false },
      { id: "bucket-region", label: "Region europe-west3 (Frankfurt) auswählen", done: false },
      { id: "bucket-storage-class", label: "Speicherklasse festlegen", done: false },
    ],
    docs: [
      { label: "Cloud Storage Dokumentation", url: "https://cloud.google.com/storage/docs" },
      { label: "Bucket-Namensregeln", url: "https://cloud.google.com/storage/docs/buckets#naming" },
    ],
    interactive: "gcs-bucket",
  };
}

/**
 * Resolve a lab for a cert. With no `labSlug`, returns the cert's primary
 * (first) hand-authored lab, or a generated fallback if none exists — this
 * keeps every existing call site (no slug) working exactly as before.
 * With a `labSlug`, looks that specific lab up within the cert's list.
 */
export function getLab(certId: string, certTitle: string, level: string, labSlug?: string): Lab {
  const labs = LABS[certId];
  if (!labs || labs.length === 0) return generateLab(certId, certTitle, level);
  if (!labSlug) return labs[0];
  return labs.find((l) => l.slug === labSlug) ?? labs[0];
}

/** All hand-authored labs for a cert, for building a lab picker/list UI. */
export function getLabsForCert(certId: string): Lab[] {
  return LABS[certId] ?? [];
}
