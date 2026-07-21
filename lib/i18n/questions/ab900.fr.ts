import type { QuestionTranslations } from "./types";

// French (Français) translations of AB900_QUESTIONS (Microsoft 365
// Copilot). Hand-translated from the German source in
// lib/ab900Practice.ts, with Microsoft product/feature names kept in
// their official English form — standard practice in French
// technical/IT writing (same convention as ab900.fa.ts / ab900.ar.ts /
// ab900.uk.ts / ab900.es.ts).
//
// PROGRESS: 100% COMPLETE. All 101 of 101 questions translated.

const ab900_fr: QuestionTranslations = {
  "real-ab900-1": {
    prompt: "Pour chacune des affirmations suivantes, sélectionnez Oui si l'affirmation est vraie. Sinon, sélectionnez Non.",
    statements: [
      "Pour utiliser Microsoft 365 Copilot Chat afin de raisonner sur des données web, vous avez besoin d'une licence Microsoft 365 Copilot",
      "Pour utiliser l'agent Researcher dans Microsoft 365 Copilot, vous avez besoin d'une licence Microsoft 365 Copilot",
      "Pour ajouter un agent dans l'application Microsoft 365 Copilot, vous avez besoin d'une licence Microsoft 365 Copilot",
    ],
  },
  "real-ab900-2": {
    prompt: "Pour chacune des affirmations suivantes, sélectionnez Oui si l'affirmation est vraie. Sinon, sélectionnez Non.",
    statements: [
      "Microsoft 365 Copilot n'affiche que les données organisationnelles pour lesquelles les utilisateurs individuels disposent d'autorisations",
      "Microsoft 365 Copilot utilise les mêmes contrôles d'accès aux données sous-jacents que les autres services Microsoft 365",
      "Microsoft 365 Copilot peut utiliser des connecteurs pour récupérer des informations à partir de sources de données tierces",
    ],
  },
  "real-ab900-3": {
    prompt: "Dans Microsoft 365 Copilot, vous devez utiliser ___ pour effectuer un raisonnement en plusieurs étapes sur des données non structurées.",
    options: { A: "un notebook", B: "Chat", C: "l'agent Analyst", D: "l'agent Researcher" },
  },
  "real-ab900-4": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365 E5. Vous devez vous assurer qu'un service cloud tiers peut s'authentifier auprès de Microsoft Entra. Que devez-vous configurer ?",
    options: {
      A: "Un connecteur Microsoft 365 Copilot",
      B: "L'authentification multifacteur (MFA)",
      C: "Une stratégie d'accès conditionnel (Conditional Access)",
      D: "Un enregistrement d'application (app registration)",
    },
  },
  "real-ab900-5": {
    prompt: "Le principe de Microsoft pour l'IA responsable concernant ___ exige la supervision des systèmes d'IA afin de garantir que les humains gardent le contrôle.",
    options: {
      A: "la responsabilité (accountability)",
      B: "l'inclusivité",
      C: "la confidentialité et la sécurité",
      D: "la fiabilité et la sécurité",
      E: "la transparence",
    },
  },
  "real-ab900-6": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Vous devez évaluer l'Identity Secure Score de votre organisation. Quels sont les deux facteurs qui influencent le score ? (Chaque bonne réponse constitue une solution complète. REMARQUE : chaque sélection correcte vaut un point.)",
    options: {
      A: "Les autorisations du site SharePoint",
      B: "Le nombre d'administrateurs généraux",
      C: "Les mots de passe qui n'expirent jamais",
      D: "L'emplacement des utilisateurs",
    },
  },
  "real-ab900-7": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Vous devez examiner l'impact d'un incident de phishing récent ciblant les utilisateurs de messagerie. Que devez-vous utiliser ?",
    options: {
      A: "Le portail Microsoft Defender",
      B: "Le centre d'administration Microsoft 365",
      C: "Le centre d'administration Microsoft Entra",
      D: "Le centre d'administration Microsoft Exchange",
    },
  },
  "real-ab900-8": {
    prompt: "Votre organisation dispose d'un abonnement Microsoft 365. Vous devez attribuer une licence à un utilisateur. Que devez-vous utiliser ?",
    options: {
      A: "Le portail Microsoft Purview",
      B: "Le centre d'administration Microsoft 365",
      C: "Le centre d'administration Microsoft Teams",
    },
  },
  "real-ab900-9": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Microsoft 365 Copilot récupère les données d'Azure OpenAI à l'aide de Microsoft Graph.",
      B: "Microsoft 365 Copilot récupère les données d'utilisateurs externes à l'aide de Microsoft Graph.",
      C: "Microsoft 365 Copilot récupère les données de fichiers Microsoft SharePoint à l'aide de Microsoft Graph.",
      D: "Microsoft 365 Copilot récupère les données de moteurs de recherche Internet à l'aide de Microsoft Graph.",
    },
  },
  "real-ab900-10": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Microsoft Entra Privileged Identity Management (PIM) fournit un accès limité aux services Microsoft 365.",
      B: "Microsoft Entra Privileged Identity Management (PIM) fournit la gestion du cycle de vie des utilisateurs.",
      C: "Microsoft Entra Privileged Identity Management (PIM) fournit la gestion des applications d'entreprise.",
      D: "Microsoft Entra Privileged Identity Management (PIM) fournit une attribution de rôle limitée dans le temps.",
    },
  },
  "real-ab900-11": {
    prompt:
      "Un utilisateur nommé User5 se rend sur https://myapps.microsoft.com. Après avoir saisi son nom d'utilisateur et son mot de passe, User5 reçoit le message suivant sur son appareil mobile. Utilisez les menus déroulants pour sélectionner la réponse qui complète l'affirmation en fonction des informations présentées dans le diagramme.",
    options: {
      A: "User5 utilise un code à usage unique par e-mail (Email OTP) pour l'authentification multifacteur (MFA).",
      B: "User5 utilise l'application Microsoft Authenticator pour l'authentification multifacteur (MFA).",
      C: "User5 utilise un SMS pour l'authentification multifacteur (MFA).",
      D: "User5 utilise un mot de passe d'accès temporaire pour l'authentification multifacteur (MFA).",
    },
  },
  "real-ab900-12": {
    prompt: "Pour chacune des affirmations suivantes, sélectionnez Oui si l'affirmation est vraie. Sinon, sélectionnez Non. (REMARQUE : chaque sélection correcte vaut un point.)",
    statements: [
      "Microsoft Defender for Office 365 offre une protection contre les attaques de phishing et les logiciels malveillants",
      "Microsoft Defender for Identity surveille les identités dans les domaines Active Directory",
      "Microsoft Defender Vulnerability Management offre une protection pour les applications SaaS (Software as a Service)",
    ],
  },
  "real-ab900-13": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365 contenant un site Microsoft SharePoint nommé Site1. Les autorisations de Site1 sont configurées comme illustré dans l'image suivante. Vous créez un nouvel utilisateur nommé User1 dans l'abonnement. Utilisez les menus déroulants pour sélectionner la réponse qui complète l'affirmation en fonction des informations présentées dans le diagramme.",
    options: {
      A: "User1 est un visiteur de Site1.",
      B: "User1 est propriétaire de Site1.",
      C: "User1 est membre de Site1.",
      D: "User1 est bloqué et ne peut pas accéder à Site1.",
    },
  },
  "real-ab900-14": {
    prompt:
      "Une entreprise multinationale de plus de 5 000 utilisateurs déploie Microsoft 365 Copilot. L'entreprise dispose actuellement d'un mélange de licences Microsoft 365 E3 et Office 365 E3 pour ses travailleurs du savoir. L'administrateur informatique doit garantir que tous les utilisateurs peuvent accéder aux capacités complètes d'IA générative de Copilot dans des applications comme Word et Excel. Quelle action de licence minimale est requise pour permettre à tous les travailleurs du savoir existants d'accéder à Microsoft 365 Copilot ?",
    options: {
      A: "Mettre à niveau toutes les licences Office 365 E3 existantes vers des licences Microsoft 365 E5.",
      B: "Acheter la licence complémentaire distincte Microsoft 365 Copilot pour tous les utilisateurs.",
      C: "Convertir toutes les licences existantes des plans d'entreprise en plans Microsoft 365 Business Premium.",
      D: "Acheter la licence complémentaire Microsoft 365 Copilot uniquement pour les utilisateurs disposant de licences Microsoft 365 E3, car Office 365 E3 n'est pas éligible.",
    },
  },
  "real-ab900-15": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Lorsqu'un utilisateur partage un agent Microsoft 365 Copilot, vous pouvez utiliser Microsoft Foundry pour empêcher les utilisateurs d'utiliser l'agent.",
      B: "Lorsqu'un utilisateur partage un agent Microsoft 365 Copilot, vous pouvez utiliser Microsoft Copilot Studio pour empêcher les utilisateurs d'utiliser l'agent.",
      C: "Lorsqu'un utilisateur partage un agent Microsoft 365 Copilot, vous pouvez utiliser le centre d'administration Microsoft 365 pour empêcher les utilisateurs d'utiliser l'agent.",
      D: "Lorsqu'un utilisateur partage un agent Microsoft 365 Copilot, vous pouvez utiliser le portail Power Apps pour empêcher les utilisateurs d'utiliser l'agent.",
    },
  },
  "real-ab900-16": {
    prompt:
      "L'équipe d'administration informatique de votre organisation, Contoso Ltd., a acquis un nouveau nom de domaine, contosoglobal.com, et doit l'ajouter dans son environnement Microsoft 365. Ce nouveau domaine sera utilisé pour tous les nouveaux noms d'utilisateur principaux (UPN) et adresses e-mail. Quelle section du centre d'administration Microsoft 365 l'administrateur doit-il utiliser pour gérer, vérifier et définir le nouveau domaine par défaut pour les nouveaux utilisateurs ?",
    options: {
      A: "Paramètres > Paramètres de l'organisation > Services",
      B: "Facturation > Licences > Liste des produits",
      C: "Configuration > Configuration du domaine > Connecter un domaine",
      D: "Paramètres > Domaines",
    },
  },
  "real-ab900-17": {
    prompt:
      "Un utilisateur du service financier a reçu un e-mail de phishing sophistiqué contenant un lien malveillant qui a été neutralisé. L'équipe de sécurité a besoin d'une vue centralisée unique pour examiner la chronologie de l'incident, les alertes associées (e-mail et point de terminaison) et les actions recommandées pour renforcer la posture de sécurité de la messagerie et des points de terminaison. Quelle fonctionnalité de Defender XDR ou section du portail fournit à l'équipe de sécurité cette vue unifiée de l'incident et ces recommandations d'amélioration ?",
    options: {
      A: "Microsoft Defender for Identity",
      B: "Microsoft Defender for Office 365",
      C: "Microsoft Defender Vulnerability Management",
      D: "L'expérience unifiée des incidents et alertes ainsi que le Secure Score sur le portail Microsoft Defender",
    },
  },
  "real-ab900-18": {
    prompt:
      "Un utilisateur a été bloqué lors de la connexion, et l'administrateur soupçonne Conditional Access ou la détection d'un signal de risque. Quels sont les deux outils du centre d'administration Microsoft Entra que l'administrateur doit utiliser en premier pour identifier l'erreur de connexion exacte et la stratégie responsable ? (Chaque sélection correcte constitue une partie de la solution. REMARQUE : chaque sélection correcte vaut un point.)",
    options: {
      A: "L'outil Conditional Access What If",
      B: "Le tableau de bord d'état des services Microsoft 365",
      C: "Les journaux de connexion et le dépannage et l'assistance dans Microsoft Entra ID",
      D: "Le suivi des messages Exchange Online",
      E: "Le proxy d'application Microsoft Entra ID",
    },
  },
  "real-ab900-19": {
    prompt: "Pour chacune des affirmations suivantes, sélectionnez Oui si l'affirmation est vraie. Sinon, sélectionnez Non. (REMARQUE : chaque sélection correcte vaut un point.)",
    statements: [
      "Microsoft Purview Compliance Manager fournit une évaluation de la conformité basée sur les risques pour vous aider à comprendre votre situation en matière de conformité",
      "Microsoft Purview Compliance Manager fournit des conseils étape par étape pour résoudre les problèmes de conformité",
      "Compliance Manager fait partie de Microsoft Defender",
    ],
  },
  "real-ab900-20": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Vous remarquez que des fichiers Microsoft SharePoint sont partagés avec des utilisateurs en dehors de votre organisation. Vous devez déterminer quels fichiers sont partagés avec les utilisateurs externes. Quel rapport devez-vous utiliser dans le centre d'administration SharePoint ? (Pour répondre, sélectionnez le rapport approprié dans la zone de réponse.)",
    options: {
      A: "Informations sur les agents (Agent insights)",
      B: "Informations sur les applications (App insights)",
      C: "Historique des modifications",
      D: "Gestion de l'accès aux données",
      E: "Comptes OneDrive",
      F: "Comparaison des stratégies de site",
    },
  },
  "real-ab900-21": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Le service RH de votre entreprise demande une copie de tous les fichiers récemment modifiés par un utilisateur nommé User1. Que devez-vous utiliser dans le portail Microsoft Purview ? (Pour répondre, sélectionnez les solutions appropriées dans la zone de réponse.)",
    options: {
      A: "Audit",
      B: "Catalogue de données",
      C: "Prévention de la perte de données",
      D: "eDiscovery",
      E: "Protection des informations",
      F: "Gestion des risques internes",
    },
  },
  "real-ab900-22": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Vous devez utiliser Microsoft Purview pour répondre aux exigences suivantes : • Empêcher les utilisateurs de partager des fichiers contenant des informations personnelles identifiables (PII). • Utiliser l'apprentissage automatique pour entraîner un modèle qui détecte le contenu sensible. Quelle solution Microsoft Purview devez-vous utiliser pour chaque exigence ? (Pour répondre, sélectionnez les options appropriées dans la zone de réponse. REMARQUE : chaque sélection correcte vaut un point.)",
    options: {
      A: "Empêcher le partage de PII : Communication Compliance / Entraîner un modèle : Data Loss Prevention",
      B: "Empêcher le partage de PII : Data Loss Prevention / Entraîner un modèle : Information Protection",
      C: "Empêcher le partage de PII : Information Protection / Entraîner un modèle : Insider Risk Management",
      D: "Empêcher le partage de PII : Insider Risk Management / Entraîner un modèle : Communication Compliance",
      E: "Empêcher le partage de PII : Data Loss Prevention / Entraîner un modèle : DSPM for AI",
      F: "Empêcher le partage de PII : DSPM for AI / Entraîner un modèle : Insider Risk Management",
    },
  },
  "real-ab900-23": {
    prompt:
      "Vous souhaitez visualiser les actions administratives effectuées par un administrateur de service dans Microsoft 365. Pour chacune des affirmations suivantes, sélectionnez Oui si l'affirmation est vraie. Sinon, sélectionnez Non. (REMARQUE : chaque sélection correcte vaut un point.)",
    options: {
      A: "Vous pouvez utiliser Search & Intelligence dans le centre d'administration Microsoft 365 : Oui / Vous pouvez utiliser Audit dans le portail Microsoft Defender : Oui / Vous pouvez utiliser Audit dans le portail Microsoft Purview : Oui",
      B: "Vous pouvez utiliser Search & Intelligence dans le centre d'administration Microsoft 365 : Oui / Vous pouvez utiliser Audit dans le portail Microsoft Defender : Oui / Vous pouvez utiliser Audit dans le portail Microsoft Purview : Non",
      C: "Vous pouvez utiliser Search & Intelligence dans le centre d'administration Microsoft 365 : Oui / Vous pouvez utiliser Audit dans le portail Microsoft Defender : Non / Vous pouvez utiliser Audit dans le portail Microsoft Purview : Oui",
      D: "Vous pouvez utiliser Search & Intelligence dans le centre d'administration Microsoft 365 : Non / Vous pouvez utiliser Audit dans le portail Microsoft Defender : Oui / Vous pouvez utiliser Audit dans le portail Microsoft Purview : Non",
      E: "Vous pouvez utiliser Search & Intelligence dans le centre d'administration Microsoft 365 : Non / Vous pouvez utiliser Audit dans le portail Microsoft Defender : Non / Vous pouvez utiliser Audit dans le portail Microsoft Purview : Oui",
      F: "Vous pouvez utiliser Search & Intelligence dans le centre d'administration Microsoft 365 : Non / Vous pouvez utiliser Audit dans le portail Microsoft Defender : Non / Vous pouvez utiliser Audit dans le portail Microsoft Purview : Non",
    },
  },
  "real-ab900-24": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Les stratégies Conditional Access sont configurées via le portail Microsoft Defender.",
      B: "Les stratégies Conditional Access ne s'appliquent qu'aux ressources locales.",
      C: "Les stratégies Conditional Access offrent un contrôle sur la façon dont les utilisateurs accèdent aux applications cloud.",
      D: "Les stratégies Conditional Access nécessitent une boîte aux lettres Microsoft Exchange.",
    },
  },
  "real-ab900-25": {
    prompt:
      "Un administrateur doit gérer l'accès à un site SharePoint RH sensible et attribuer des licences complémentaires Copilot aux 50 membres de l'équipe \"HR-Data-Users\". L'appartenance change fréquemment en raison d'un taux de rotation élevé. Quel objet Microsoft Entra est le choix le plus efficace à la fois pour le contrôle d'accès et la gestion des groupes basée sur les licences ?",
    options: {
      A: "Groupe de sécurité dynamique",
      B: "Groupe de sécurité activé pour la messagerie",
      C: "Groupe Microsoft 365",
      D: "Liste de distribution",
    },
  },
  "real-ab900-26": {
    prompt: "Vous utilisez Microsoft 365 Copilot. Avec quoi Copilot crée-t-il des réponses basées sur les données de l'entreprise stockées dans Microsoft SharePoint ?",
    options: {
      A: "Microsoft Intune",
      B: "Microsoft Defender",
      C: "Microsoft Graph",
      D: "Microsoft Purview",
    },
  },
  "real-ab900-27": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Vous pouvez utiliser la solution Data Lifecycle Management de Microsoft Purview pour détecter les invites Microsoft 365 Copilot contenant des informations sensibles.",
      B: "Vous pouvez utiliser la solution DSPM for AI de Microsoft Purview pour détecter les invites Microsoft 365 Copilot contenant des informations sensibles.",
      C: "Vous pouvez utiliser la solution Information Barriers de Microsoft Purview pour détecter les invites Microsoft 365 Copilot contenant des informations sensibles.",
      D: "Vous pouvez utiliser la solution Information Protection de Microsoft Purview pour détecter les invites Microsoft 365 Copilot contenant des informations sensibles.",
    },
  },
  "real-ab900-28": {
    prompt:
      "Un utilisateur du marketing demande à Copilot de résumer la \"dernière proposition de budget\" stockée sur un site SharePoint accessible uniquement au service financier. L'utilisateur du marketing n'est pas membre du site. Quel principe contrôle le comportement de Copilot et l'empêche de renvoyer le contenu restreint ?",
    options: {
      A: "Copilot applique la vérification Zero-Trust avant de traiter la demande.",
      B: "Copilot n'utilise que le contenu explicitement étiqueté avec une étiquette de confidentialité spécifique.",
      C: "Copilot applique strictement les autorisations Microsoft 365 existantes de l'utilisateur et ne renvoie pas de contenu auquel l'utilisateur n'a pas accès.",
      D: "Microsoft Purview DLP masque automatiquement les chiffres financiers dans les réponses de Copilot.",
    },
  },
  "real-ab900-29": {
    prompt:
      "Lorsqu'un utilisateur demande à Copilot : \"Quels documents récents m'ont été partagés concernant 'Project Phoenix' ?\", Copilot renvoie des documents personnalisés de OneDrive, SharePoint et Teams. Quel rôle principal Microsoft Graph joue-t-il pour permettre cette réponse ?",
    options: {
      A: "Il fournit au LLM ses connaissances générales préentraînées.",
      B: "Il sert de moteur de conformité aux politiques de rédaction.",
      C: "Il agit comme un index sémantique qui associe la demande de l'utilisateur au contexte, aux relations et aux autorisations de l'utilisateur pour les données organisationnelles.",
      D: "Il applique les stratégies Conditional Access en temps réel.",
    },
  },
  "real-ab900-30": {
    statements: [
      "Pour que les administrateurs puissent utiliser SharePoint Advanced Management, tous les utilisateurs de votre organisation ont besoin d'une licence Microsoft 365 Copilot",
      "SharePoint Advanced Management peut aider à restreindre l'accès de Microsoft 365 Copilot au contenu Microsoft SharePoint",
      "SharePoint Advanced Management est disponible en tant que licence autonome pour les organisations sans Microsoft 365 Copilot",
    ],
  },
  "real-ab900-31": {
    prompt:
      "Un agent IA en cours de préparation pour résumer les dossiers clients montre un biais en faveur de certaines régions géographiques. Quel principe Microsoft Responsible AI est principalement violé et doit être résolu avant le déploiement ?",
    options: {
      A: "L'équité (Fairness)",
      B: "La transparence",
      C: "La responsabilité",
      D: "L'inclusivité",
    },
  },
  "real-ab900-32": {
    prompt:
      "La conformité a besoin d'un rapport répertoriant les sites SharePoint contenant des documents hautement sensibles mais partagés avec de grands groupes tels que \"Tout le monde sauf les utilisateurs externes\". Quelle fonctionnalité Microsoft est conçue pour générer des rapports Data Access Governance (DAG) identifiant le contenu sensible ainsi que des pratiques de partage plus permissives ?",
    options: {
      A: "Microsoft Entra ID Protection",
      B: "Microsoft Purview Data Loss Prevention (DLP)",
      C: "Microsoft Defender for Cloud Apps",
      D: "SharePoint Advanced Management (SAM)",
    },
  },
  "real-ab900-33": {
    prompt: "Vous avez un site Microsoft SharePoint comme illustré dans l'image suivante. Vous devez afficher les paramètres de SLabel1. Que devez-vous utiliser ?",
    options: {
      A: "Le portail Microsoft Defender",
      B: "Le centre d'administration SharePoint",
      C: "Le centre d'administration Microsoft 365",
      D: "Le portail Microsoft Purview",
    },
  },
  "real-ab900-34": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Vous pouvez utiliser Microsoft Defender for Office 365 pour examiner les indicateurs de menace corrélés entre les incidents de messagerie, d'identité et d'appareil dans une seule vue.",
      B: "Vous pouvez utiliser Microsoft Defender XDR pour examiner les indicateurs de menace corrélés entre les incidents de messagerie, d'identité et d'appareil dans une seule vue.",
      C: "Vous pouvez utiliser Microsoft Purview Compliance Manager pour examiner les indicateurs de menace corrélés entre les incidents de messagerie, d'identité et d'appareil dans une seule vue.",
      D: "Vous pouvez utiliser Microsoft Purview Data Loss Prevention pour examiner les indicateurs de menace corrélés entre les incidents de messagerie, d'identité et d'appareil dans une seule vue.",
    },
  },
  "real-ab900-35": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365 contenant un utilisateur nommé User1. User1 prévoit de quitter votre entreprise dans deux semaines. Vous devez capturer les activités de User1 pour déterminer si l'utilisateur exfiltre des données. Quelle solution Microsoft Purview devez-vous utiliser ?",
    options: {
      A: "Communication Compliance",
      B: "Data Security Posture Management",
      C: "Insider Risk Management",
      D: "Data Lifecycle Management",
    },
  },
  "real-ab900-36": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365 contenant des sites Microsoft SharePoint et des équipes Microsoft Teams. Vous remarquez que les sites et équipes sont partagés avec des utilisateurs en dehors de votre organisation. Vous devez déterminer quels sites et équipes ont été partagés avec les utilisateurs externes. Que devez-vous utiliser ?",
    options: {
      A: "Le centre d'administration SharePoint",
      B: "Le centre d'administration Microsoft Teams",
      C: "Le centre d'administration Microsoft 365",
      D: "Le portail Microsoft Defender",
    },
  },
  "real-ab900-37": {
    prompt:
      "Une organisation exige que Copilot n'inclue jamais les résultats de recherches web publiques dans les réponses, afin d'éviter une éventuelle divulgation d'invites/données internes. Quelle fonctionnalité de Copilot un administrateur doit-il désactiver pour bloquer l'ancrage web (web grounding) des réponses de Copilot ?",
    options: {
      A: "Copilot dans Word",
      B: "Copilot for Microsoft 365",
      C: "Copilot Chat",
      D: "Les fonctionnalités Copilot dans les applications Microsoft 365",
    },
  },
  "real-ab900-38": {
    statements: [
      "Le rapport d'utilisation de Microsoft 365 Copilot peut être utilisé pour afficher les invites soumises par les utilisateurs à Copilot",
      "Le rapport d'utilisation de Microsoft 365 Copilot affiche le nombre total d'utilisateurs uniques dans votre organisation",
      "Le rapport d'utilisation de Microsoft 365 Copilot affiche l'utilisation de Copilot pour chaque application Microsoft 365 individuelle",
    ],
  },
  "real-ab900-39": {
    prompt:
      "Vous prévoyez de créer un agent dans l'application Microsoft 365 Copilot pour résoudre un problème métier. Quelles sont les deux raisons de créer l'agent ? (Chaque bonne réponse constitue une solution complète. REMARQUE : chaque sélection correcte vaut un point.)",
    options: {
      A: "Vous devez utiliser un modèle IA personnalisé.",
      B: "Vous devez utiliser un jeu d'instructions personnalisé différent de l'expérience de chat.",
      C: "Vous devez raisonner sur un site spécifique.",
      D: "Vous devez regrouper des chats liés dans un notebook Copilot.",
    },
  },
  "real-ab900-40": {
    prompt:
      "L'un des principaux risques de gouvernance lors du déploiement de Microsoft 365 Copilot est la fuite potentielle de données de l'entreprise. Le directeur de la conformité s'inquiète du fait que, puisque Copilot utilise toutes les données auxquelles l'utilisateur a accès, un utilisateur pourrait accéder par inadvertance à des informations sensibles auxquelles il ne devrait pas avoir accès. Quelle est la cause la plus courante de ce risque de sur-partage que les administrateurs doivent traiter en priorité avant un déploiement large de Copilot ?",
    options: {
      A: "Copilot contourne les contrôles d'accès SharePoint lors de l'indexation du contenu.",
      B: "Des autorisations trop larges sur les sites ou fichiers.",
      C: "Les journaux de chat de Copilot ne sont pas soumis à eDiscovery ou à la rétention.",
      D: "L'entraînement du modèle Azure OpenAI utilise les données du locataire (tenant) et les conserve au sein du locataire.",
    },
  },
  "real-ab900-41": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Vous devez enquêter sur les incidents de sécurité et les alertes déclenchés par les appareils Windows 11 de votre organisation. Que devez-vous utiliser ?",
    options: {
      A: "Microsoft Entra ID Protection",
      B: "Microsoft Defender for Identity",
      C: "Microsoft Purview Insider Risk Management",
      D: "Microsoft Defender for Endpoint",
    },
  },
  "real-ab900-42": {
    prompt:
      "Votre entreprise exige que tous les sites Microsoft SharePoint aient au moins deux propriétaires. Vous devez vous assurer que les sites ayant moins de deux propriétaires sont marqués en lecture seule s'ils ne sont PAS corrigés. Que devez-vous configurer dans le centre d'administration SharePoint ?",
    options: {
      A: "Restriction d'accès au niveau du site",
      B: "Rapports de gestion de l'accès aux données",
      C: "Gestion du cycle de vie du site",
      D: "Stratégie de blocage du téléchargement pour SharePoint et OneDrive",
    },
  },
  "real-ab900-43": {
    prompt:
      "Le directeur informatique souhaite des indicateurs agrégés au niveau du locataire, tels que les utilisateurs actifs de Copilot, l'utilisation par application et par catégorie d'invites, afin de mesurer le ROI de Copilot. Quel outil administratif fournit cette évaluation agrégée de l'adoption et de l'utilisation ?",
    options: {
      A: "Le journal d'audit Microsoft Purview",
      B: "Le tableau de bord d'analyse Copilot",
      C: "Les journaux de connexion Microsoft Entra ID",
      D: "L'état du service Microsoft 365",
    },
  },
  "real-ab900-44": {
    prompt:
      "Avant qu'un agent IA créé dans Copilot Studio, qui se connecte à une base de données financière locale, puisse être publié, un administrateur doit examiner l'accès, les performances et l'état du cycle de vie. Quels sont les deux centres d'administration Microsoft principalement utilisés pour gérer et surveiller le cycle de vie de l'agent et les paramètres d'environnement ? (Chaque sélection correcte constitue une partie de la solution. REMARQUE : chaque sélection correcte vaut un point.)",
    options: {
      A: "Le portail Microsoft Purview",
      B: "Le centre d'administration Microsoft Entra",
      C: "Le centre d'administration Microsoft 365",
      D: "L'administration Microsoft Power Platform",
      E: "Le centre d'administration Exchange",
    },
  },
  "real-ab900-45": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Depuis le centre d'administration SharePoint, vous pouvez créer un serveur.",
      B: "Depuis le centre d'administration SharePoint, vous pouvez créer un utilisateur.",
      C: "Depuis le centre d'administration SharePoint, vous pouvez créer un site.",
      D: "Depuis le centre d'administration SharePoint, vous pouvez créer un rôle.",
    },
  },
  "real-ab900-46": {
    prompt: "Vous devez créer un agent Microsoft 365 Copilot capable de créer des graphiques et des visualisations à partir d'un classeur Microsoft Excel. Que devez-vous configurer pour l'agent ?",
    options: {
      A: "La fonctionnalité de génération d'images",
      B: "Le modèle Scrum Assistant",
      C: "Le modèle Customer Insights Assistant",
      D: "La fonctionnalité d'interpréteur de code (Code Interpreter)",
    },
  },
  "real-ab900-47": {
    prompt:
      "Votre entreprise teste l'utilisation de Microsoft 365 Copilot et a acheté 100 licences Microsoft 365 Copilot. Vous devez consulter des rapports détaillés sur l'utilisation de Copilot dans Microsoft Teams, tels que les heures de réunion résumées par Copilot et les actions de réunion effectuées par Copilot. Que devez-vous utiliser ?",
    options: {
      A: "Le rapport de préparation Microsoft 365 Copilot dans le centre d'administration Microsoft 365",
      B: "Le rapport d'utilisation Microsoft 365 Copilot dans le centre d'administration Microsoft 365",
      C: "Le tableau de bord Microsoft 365 Copilot dans Microsoft Viva Insights",
      D: "Le rapport d'utilisation des applications Microsoft 365 dans le centre d'administration Microsoft 365",
    },
  },
  "real-ab900-48": {
    prompt: "Un utilisateur nommé User1 crée un agent Microsoft 365 Copilot nommé Agent1 et le partage avec un utilisateur nommé User2. Que se passe-t-il lorsqu'un administrateur bloque Agent1 ?",
    options: {
      A: "Agent1 reste accessible à User1 et User2 jusqu'à ce que les utilisateurs désinstallent manuellement l'agent. Aucun autre utilisateur ne peut installer Agent1.",
      B: "Agent1 reste accessible à User1 et User2, et aucun autre utilisateur ne peut installer Agent1.",
      C: "Agent1 est supprimé de User2, et User1 peut continuer à utiliser Agent1.",
      D: "Agent1 est supprimé de User1 et User2, et aucun utilisateur ne peut installer Agent1.",
    },
  },
  "real-ab900-49": {
    statements: [
      "Les administrateurs peuvent supprimer un agent Copilot spécifique pour tous les utilisateurs",
      "Depuis le centre d'administration Microsoft 365, les administrateurs peuvent configurer les invites d'un agent Copilot",
      "Les administrateurs peuvent déployer des agents Copilot pour des utilisateurs spécifiques",
    ],
  },
  "real-ab900-50": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Depuis le centre d'administration Microsoft Teams, vous pouvez attribuer une licence Teams à un utilisateur.",
      B: "Depuis le centre d'administration Microsoft Teams, vous pouvez déployer le client Teams.",
      C: "Depuis le centre d'administration Microsoft Teams, vous pouvez gérer un appareil de salle Teams.",
      D: "Depuis le centre d'administration Microsoft Teams, vous pouvez empêcher les utilisateurs de créer des équipes (Teams).",
    },
  },
  "real-ab900-51": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Tous les utilisateurs disposent de licences Microsoft 365 Copilot. Vous devez déterminer où le contenu sensible est utilisé pendant les interactions avec Copilot, analyser les schémas d'utilisation du contenu et fournir des recommandations pour appliquer une protection appropriée. Que devez-vous utiliser ?",
    options: {
      A: "Microsoft Viva Insights",
      B: "La solution DSPM for AI de Microsoft Purview",
      C: "Microsoft Security Copilot",
      D: "La solution Insider Risk Management de Microsoft Purview",
    },
  },
  "real-ab900-52": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Des licences Microsoft 365 Copilot ont été attribuées à tous les utilisateurs. Certains utilisateurs signalent recevoir des réponses de Copilot contenant des informations d'un site Microsoft SharePoint nommé Finance. Les utilisateurs indiquent que ces informations sont commercialement sensibles. Vous devez empêcher Copilot de fournir des réponses contenant des informations du site Finance. Que devez-vous faire ?",
    options: {
      A: "Créer une stratégie Information Barrier (IB) dans Microsoft Purview.",
      B: "Créer un connecteur de données dans Microsoft Defender.",
      C: "Créer une stratégie Conditional Access dans Microsoft Entra.",
      D: "Configurer les autorisations sur le site Finance.",
    },
  },
  "real-ab900-53": {
    prompt:
      "Un manager demande : \"Quelle est la principale différence de capacités entre Microsoft 365 Copilot intégré dans Word/Excel et un agent IA personnalisé créé dans Copilot Studio ?\" Quelle est la bonne réponse ?",
    options: {
      A: "Seul le Copilot intégré peut accéder aux données de Microsoft Graph et les résumer.",
      B: "Le Copilot intégré est un assistant de productivité général. Les agents IA personnalisés sont conçus pour des tâches spécifiques en plusieurs étapes et des intégrations avec des systèmes externes.",
      C: "Seuls les agents IA personnalisés peuvent baser leurs réponses sur des données organisationnelles.",
      D: "Les agents personnalisés ne sont accessibles que via le portail Copilot Studio, tandis que Copilot est intégré dans les applications.",
    },
  },
  "real-ab900-54": {
    prompt:
      "Le responsable d'un service a développé une invite Microsoft 365 Copilot complexe et à fort impact pour analyser les données de ventes hebdomadaires. Le responsable souhaite que les 30 membres de son équipe commerciale aient un accès facile et cohérent à ce modèle d'invite spécifique. Quelle méthode est recommandée pour garantir que ce modèle précieux soit utilisé de manière uniforme par toute l'équipe ?",
    options: {
      A: "Utiliser l'interface Copilot Studio pour publier l'invite en tant que nouvel agent.",
      B: "Envoyer le texte de l'invite à l'équipe par e-mail et leur demander de l'enregistrer dans leur OneDrive personnel.",
      C: "Partager le modèle d'invite directement depuis la bibliothèque d'invites Microsoft 365 Copilot.",
      D: "Créer un flux Power Automate qui exécute l'invite chaque semaine.",
    },
  },
  "real-ab900-55": {
    statements: [
      "Une stratégie Communication Compliance peut détecter un texte inapproprié dans les messages Microsoft Teams",
      "Une stratégie Communication Compliance peut détecter un langage offensant dans les invites Microsoft 365 Copilot",
      "Une stratégie Communication Compliance peut être utilisée pour conserver les messages électroniques pendant 10 ans",
    ],
  },
  "real-ab900-56": {
    statements: [
      "Depuis la galerie d'invites Copilot, vous pouvez modifier une invite enregistrée",
      "Depuis la galerie d'invites Copilot, vous pouvez partager une invite enregistrée avec une équipe Microsoft Teams",
      "Vous pouvez créer un lien partagé pour une invite qui N'a PAS été enregistrée dans la galerie d'invites Copilot",
    ],
  },
  "real-ab900-57": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Vous remarquez que certains utilisateurs ne peuvent pas se connecter à Microsoft 365. Vous devez consulter les tentatives de connexion échouées à Microsoft 365. Que devez-vous utiliser ?",
    options: {
      A: "Le portail Microsoft Defender",
      B: "Le centre d'administration Microsoft Entra",
      C: "Le portail Microsoft Purview",
      D: "Le centre d'administration Microsoft 365",
    },
  },
  "real-ab900-58": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365 contenant un site Microsoft SharePoint nommé Site1. Vous devez empêcher les utilisateurs de partager le contenu de Site1 avec des utilisateurs externes. Que devez-vous utiliser ?",
    options: {
      A: "Le contenu de Site1",
      B: "Le centre d'administration SharePoint",
      C: "Le centre d'administration Microsoft 365",
      D: "Le centre d'administration Microsoft Entra",
    },
  },
  "real-ab900-59": {
    prompt: "Quelle affirmation décrit précisément Microsoft Defender XDR ?",
    options: {
      A: "Microsoft Defender XDR est une suite d'entreprise unifiée qui coordonne la détection, la prévention, l'investigation et la réponse sur les points de terminaison, les identités, la messagerie et les applications afin de fournir une protection intégrée contre les attaques sophistiquées.",
      B: "Microsoft Entra Conditional Access est une suite d'entreprise unifiée qui coordonne la détection, la prévention, l'investigation et la réponse sur les points de terminaison, les identités, la messagerie et les applications afin de fournir une protection intégrée contre les attaques sophistiquées.",
      C: "Microsoft Entra ID Protection est une suite d'entreprise unifiée qui coordonne la détection, la prévention, l'investigation et la réponse sur les points de terminaison, les identités, la messagerie et les applications afin de fournir une protection intégrée contre les attaques sophistiquées.",
      D: "Microsoft Purview est une suite d'entreprise unifiée qui coordonne la détection, la prévention, l'investigation et la réponse sur les points de terminaison, les identités, la messagerie et les applications afin de fournir une protection intégrée contre les attaques sophistiquées.",
    },
  },
  "real-ab900-60": {
    prompt: "Votre organisation dispose d'un abonnement Microsoft 365. Un utilisateur nommé Alex Wilber s'est vu attribuer un rôle administratif comme illustré dans l'image suivante.",
    options: {
      A: "Alex Wilber peut afficher tous les utilisateurs dans le locataire Microsoft Entra.",
      B: "Alex Wilber peut afficher tout le contenu sur les sites Microsoft SharePoint.",
      C: "Alex Wilber peut lire tout le contenu dans les boîtes aux lettres Microsoft Exchange.",
      D: "Alex Wilber peut effectuer l'eDiscovery des invites Microsoft 365 Copilot.",
    },
  },
  "real-ab900-61": {
    statements: [
      "Vous pouvez utiliser un groupe de sécurité Microsoft Entra pour attribuer des autorisations aux ressources Microsoft Entra ID",
      "Vous pouvez utiliser un groupe de sécurité Microsoft Entra pour attribuer des licences Microsoft 365",
      "Vous pouvez utiliser un groupe de sécurité Microsoft Entra pour attribuer des autorisations aux boîtes aux lettres Microsoft Exchange",
    ],
  },
  "real-ab900-62": {
    prompt: "Quelle affirmation décrit précisément l'autorisation dans Microsoft 365 ?",
    options: {
      A: "Un processus permettant de vérifier qu'une identité est réellement celle qu'elle prétend être",
      B: "Un processus qui exige des méthodes d'authentification supplémentaires avant qu'une identité puisse accéder aux ressources",
      C: "Un processus permettant de vérifier qu'une identité est autorisée à accéder à une ressource",
      D: "Un processus permettant de valider une identité provenant d'un système externe",
    },
  },
  "real-ab900-63": {
    statements: [
      "Un membre d'un site Microsoft SharePoint peut inviter des utilisateurs à accéder au contenu du site",
      "Un propriétaire de site Microsoft SharePoint peut ajouter des groupes Microsoft 365 en tant que membres du site",
      "Un propriétaire de site Microsoft SharePoint peut supprimer un autre propriétaire du site",
    ],
  },
  "real-ab900-64": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Quelles sont les deux tâches que vous pouvez effectuer à l'aide du centre d'administration Exchange ? (Chaque bonne réponse constitue une partie de la solution. REMARQUE : chaque sélection correcte vaut un point.)",
    options: {
      A: "Attribuer une licence Microsoft Exchange.",
      B: "Créer une règle de flux de messagerie.",
      C: "Créer une boîte aux lettres partagée.",
      D: "Ajouter un domaine personnalisé.",
    },
  },
  "real-ab900-65": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Dans Microsoft Entra Privileged Identity Management (PIM), un administrateur vous a habilité pour le rôle d'administrateur des utilisateurs. Avant de pouvoir créer un compte utilisateur, vous devez activer le rôle.",
      B: "Dans Microsoft Entra Privileged Identity Management (PIM), un administrateur vous a habilité pour le rôle d'administrateur des utilisateurs. Avant de pouvoir créer un compte utilisateur, vous devez installer l'application Microsoft Authenticator.",
      C: "Dans Microsoft Entra Privileged Identity Management (PIM), un administrateur vous a habilité pour le rôle d'administrateur des utilisateurs. Avant de pouvoir créer un compte utilisateur, vous devez demander une licence.",
      D: "Dans Microsoft Entra Privileged Identity Management (PIM), un administrateur vous a habilité pour le rôle d'administrateur des utilisateurs. Avant de pouvoir créer un compte utilisateur, vous devez mettre à jour les informations de votre emplacement.",
    },
  },
  "real-ab900-66": {
    prompt: "Vous ouvrez le centre d'administration Microsoft Entra comme illustré dans l'image suivante. Quelle action améliorera le plus l'Identity Secure Score ?",
    options: {
      B: "Résoudre la recommandation \"Utiliser des rôles administratifs à privilèges minimaux\" améliorera le plus l'Identity Secure Score.",
      C: "Résoudre la recommandation \"Activer la stratégie de blocage de l'authentification héritée\" améliorera le plus l'Identity Secure Score.",
      D: "Résoudre la recommandation \"Exiger l'authentification multifacteur pour les rôles administratifs\" améliorera le plus l'Identity Secure Score.",
    },
  },
  "real-ab900-67": {
    prompt: "Avec quoi pouvez-vous verrouiller automatiquement un compte utilisateur lorsqu'une connexion à risque est détectée ?",
    options: {
      A: "Microsoft Defender for Identity",
      B: "Microsoft Entra ID Protection",
      C: "Microsoft Defender for Office 365",
      D: "Microsoft Entra Privileged Identity Management (PIM)",
    },
  },
  "real-ab900-68": {
    prompt: "Vous examinez les stratégies de sécurité de votre entreprise dans le cadre d'une stratégie Zero Trust. Quelle affirmation décrit précisément les principes Zero Trust ?",
    options: {
      A: "Zero Trust améliore l'expérience utilisateur en minimisant les invites d'authentification.",
      B: "Zero Trust suppose une violation de sécurité et vérifie chaque demande.",
      C: "Zero Trust traite toutes les demandes provenant du réseau de votre entreprise comme fiables.",
      D: "Zero Trust élimine la nécessité de réviser et d'ajuster régulièrement les autorisations d'accès.",
    },
  },
  "real-ab900-69": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Vous devez créer un rapport montrant les autorisations et les liens de partage actifs du contenu stocké dans les comptes Microsoft OneDrive. Que devez-vous utiliser ?",
    options: {
      A: "Audit dans le portail Microsoft Defender",
      B: "Rapports dans le centre d'administration Microsoft 365",
      C: "Gestion de l'accès aux données dans le centre d'administration SharePoint",
      D: "eDiscovery dans le portail Microsoft Purview",
    },
  },
  "real-ab900-70": {
    statements: [
      "Microsoft utilise les invites et réponses émises par les utilisateurs dans Microsoft 365 Copilot pour entraîner des modèles",
      "Microsoft utilise le contenu récupéré depuis Microsoft Graph pour entraîner des modèles",
      "Microsoft 365 Copilot respecte les autorisations de sécurité de votre abonnement Microsoft 365",
    ],
  },
  "real-ab900-71": {
    prompt:
      "Votre entreprise utilise la facturation à l'usage (pay-as-you-go) pour Microsoft 365 Copilot. L'entreprise souhaite une meilleure visibilité des coûts d'utilisation de Copilot et la capacité de prévoir les dépenses des départements. Vous devez vous assurer de pouvoir consulter les coûts de Copilot par département. Que devez-vous utiliser ? (Pour répondre, sélectionnez les options appropriées dans la zone de réponse. REMARQUE : chaque sélection correcte vaut un point.)",
    options: {
      A: "Portail : Le centre d'administration Microsoft 365 / Fonctionnalité : Une stratégie de facturation",
      B: "Portail : Le centre d'administration Microsoft 365 / Fonctionnalité : Un connecteur Copilot",
      C: "Portail : Le centre d'administration Microsoft Entra / Fonctionnalité : Une stratégie de réclamation automatique",
      D: "Portail : Le centre d'administration Microsoft Entra / Fonctionnalité : Une stratégie de facturation",
      E: "Portail : Le portail Microsoft Purview / Fonctionnalité : Un connecteur Copilot",
      F: "Portail : Le portail Microsoft Purview / Fonctionnalité : Une stratégie de réclamation automatique",
    },
  },
  "real-ab900-72": {
    statements: [
      "Les utilisateurs disposant d'une licence Microsoft 365 E5 ne peuvent pas créer d'agents Microsoft 365 Copilot basés sur le web",
      "Les utilisateurs doivent avoir une licence Microsoft 365 Copilot attribuée pour utiliser l'agent Analyst",
      "Les utilisateurs peuvent utiliser une invite en langage naturel pour créer un agent Microsoft 365 Copilot",
    ],
  },
  "real-ab900-73": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Vous pouvez utiliser la solution Audit de Microsoft Purview pour trouver tout le contenu lié au terme \"Project Falcon\" dans les e-mails échangés entre deux utilisateurs.",
      B: "Vous pouvez utiliser la solution Data Catalog de Microsoft Purview pour trouver tout le contenu lié au terme \"Project Falcon\" dans les e-mails échangés entre deux utilisateurs.",
      C: "Vous pouvez utiliser la solution eDiscovery de Microsoft Purview pour trouver tout le contenu lié au terme \"Project Falcon\" dans les e-mails échangés entre deux utilisateurs.",
      D: "Vous pouvez utiliser la solution Insider Risk Management de Microsoft Purview pour trouver tout le contenu lié au terme \"Project Falcon\" dans les e-mails échangés entre deux utilisateurs.",
    },
  },
  "real-ab900-74": {
    prompt:
      "Votre entreprise utilise des stratégies Microsoft Purview Data Loss Prevention (DLP). Un utilisateur nommé User1 partage des informations sensibles avec un utilisateur externe via Microsoft Teams. Vous devez identifier le contenu sensible partagé. Que devez-vous utiliser dans le portail Microsoft Purview ?",
    options: {
      A: "Diagnostics",
      B: "Data Explorer",
      C: "Content Explorer",
      D: "Activity Explorer",
    },
  },
  "real-ab900-75": {
    statements: [
      "Zero Trust nécessite un abonnement Azure",
      "Zero Trust est une stratégie de sécurité, PAS un produit spécifique",
      "Via le centre d'administration Microsoft 365, vous pouvez activer Zero Trust pour votre organisation",
    ],
  },
  "real-ab900-76": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Microsoft Copilot Studio contient des signaux tels que l'historique de collaboration, la pertinence des documents et la fréquence de communication, qui influencent les réponses de Microsoft 365 Copilot.",
      B: "Microsoft Graph contient des signaux tels que l'historique de collaboration, la pertinence des documents et la fréquence de communication, qui influencent les réponses de Microsoft 365 Copilot.",
      C: "Microsoft Purview contient des signaux tels que l'historique de collaboration, la pertinence des documents et la fréquence de communication, qui influencent les réponses de Microsoft 365 Copilot.",
      D: "Microsoft Viva Insights contient des signaux tels que l'historique de collaboration, la pertinence des documents et la fréquence de communication, qui influencent les réponses de Microsoft 365 Copilot.",
    },
  },
  "real-ab900-77": {
    statements: [
      "Les utilisateurs peuvent utiliser Microsoft 365 Copilot de manière anonyme",
      "Les administrateurs peuvent autoriser l'achat autonome de licences Microsoft 365 Copilot",
      "Les licences Microsoft 365 Copilot peuvent être attribuées à des utilisateurs invités Microsoft Entra ID d'autres organisations",
    ],
  },
  "real-ab900-78": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Vous devez utiliser Microsoft Purview pour répondre aux exigences suivantes : • Détecter et classer les données sensibles sur plusieurs plateformes. • Empêcher les utilisateurs de partager de la propriété intellectuelle avec des utilisateurs externes. Quelle solution Microsoft Purview devez-vous utiliser pour chaque exigence ? (Pour répondre, sélectionnez les options appropriées dans la zone de réponse. REMARQUE : chaque sélection correcte vaut un point.)",
    options: {
      A: "Détecter et classer les données sensibles sur plusieurs plateformes : Communication Compliance / Empêcher le partage de propriété intellectuelle : Data Loss Prevention",
      B: "Détecter et classer les données sensibles sur plusieurs plateformes : Data Loss Prevention / Empêcher le partage de propriété intellectuelle : Information Protection",
      C: "Détecter et classer les données sensibles sur plusieurs plateformes : Data Loss Prevention / Empêcher le partage de propriété intellectuelle : Insider Risk Management",
      D: "Détecter et classer les données sensibles sur plusieurs plateformes : Information Protection / Empêcher le partage de propriété intellectuelle : Communication Compliance",
      E: "Détecter et classer les données sensibles sur plusieurs plateformes : Information Protection / Empêcher le partage de propriété intellectuelle : Insider Risk Management",
      F: "Détecter et classer les données sensibles sur plusieurs plateformes : Insider Risk Management / Empêcher le partage de propriété intellectuelle : Data Loss Prevention",
    },
  },
  "real-ab900-79": {
    prompt: "Votre organisation dispose d'un abonnement Microsoft 365 E5. Vous devez empêcher les utilisateurs de partager des données financières internes de l'entreprise avec des utilisateurs externes. Que devez-vous utiliser ?",
    options: {
      A: "Groupes de rôles",
      B: "Stratégies de prévention de la perte de données (DLP)",
      C: "Stratégies de gestion des risques internes",
      D: "Étiquettes de rétention",
    },
  },
  "real-ab900-80": {
    prompt: "Vous devez identifier les fichiers et e-mails contenant des numéros de sécurité sociale (SSN) et des numéros de carte de crédit. Que devez-vous utiliser dans le portail Microsoft Purview ?",
    options: {
      A: "Data Explorer",
      B: "Rapports de protection des informations",
      C: "Stratégies de protection des informations",
      D: "Activity Explorer",
    },
  },
  "real-ab900-81": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Les étiquettes de confidentialité Microsoft Purview peuvent être appliquées à Azure Blob Storage.",
      B: "Les étiquettes de confidentialité Microsoft Purview peuvent être appliquées aux conversations Microsoft 365 Copilot.",
      C: "Les étiquettes de confidentialité Microsoft Purview peuvent être appliquées aux sites Microsoft SharePoint.",
    },
  },
  "real-ab900-82": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "La recherche restreinte SharePoint vous permet de restreindre l'accès administratif aux sites Microsoft SharePoint, sans empêcher les utilisateurs d'accéder aux fichiers et au contenu pour lesquels ils disposent d'autorisations.",
      B: "La recherche restreinte SharePoint vous permet de restreindre l'accès des utilisateurs invités aux sites Microsoft SharePoint, sans empêcher les utilisateurs d'accéder aux fichiers et au contenu pour lesquels ils disposent d'autorisations.",
      C: "La recherche restreinte SharePoint vous permet de restreindre l'accès de Microsoft 365 Copilot aux sites Microsoft SharePoint, sans empêcher les utilisateurs d'accéder aux fichiers et au contenu pour lesquels ils disposent d'autorisations.",
      D: "La recherche restreinte SharePoint vous permet de restreindre l'accès de Microsoft Purview eDiscovery aux sites Microsoft SharePoint, sans empêcher les utilisateurs d'accéder aux fichiers et au contenu pour lesquels ils disposent d'autorisations.",
    },
  },
  "real-ab900-83": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365 E5. Vous créez une étiquette de confidentialité Microsoft Purview nommée \"Label1\". Vous devez vous assurer que les utilisateurs peuvent appliquer \"Label1\" aux fichiers dans Microsoft 365. Que devez-vous utiliser ?",
    options: {
      A: "Une stratégie d'étiquettes de confidentialité",
      B: "Un classificateur entraînable",
      C: "Une stratégie d'étiquettes de rétention",
      D: "Une stratégie d'étiquetage automatique",
    },
  },
  "real-ab900-84": {
    prompt: "Votre entreprise a une politique de conformité écrite exigeant que tous les e-mails soient conservés pendant sept ans, puis définitivement supprimés. Quelle solution Microsoft Purview devez-vous utiliser ?",
    options: {
      A: "Protection des informations",
      B: "Gestion du cycle de vie des données",
      C: "Prévention de la perte de données",
      D: "Gestion des risques internes",
    },
  },
  "real-ab900-85": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Dans le centre d'administration Microsoft 365, la métrique \"Crédits utilisés\" du rapport de crédits Copilot affiche le nombre total de crédits consommés par les utilisateurs de votre organisation qui utilisent Microsoft Teams et interagissent avec des agents basés sur le travail dans le chat Microsoft 365 Copilot.",
      B: "Dans le centre d'administration Microsoft 365, la métrique \"Crédits utilisés\" du rapport de crédits Copilot affiche le nombre total de crédits consommés par des utilisateurs n'appartenant pas à votre organisation et interagissant avec des agents métier dans le chat Microsoft 365 Copilot.",
      C: "Dans le centre d'administration Microsoft 365, la métrique \"Crédits utilisés\" du rapport de crédits Copilot affiche le nombre total de crédits consommés par les utilisateurs de votre organisation auxquels une licence Microsoft 365 Copilot a été attribuée et qui interagissent avec des agents basés sur le travail dans le chat Microsoft 365 Copilot.",
      D: "Dans le centre d'administration Microsoft 365, la métrique \"Crédits utilisés\" du rapport de crédits Copilot affiche le nombre total de crédits utilisés par les utilisateurs de votre organisation auxquels AUCUNE licence Microsoft 365 Copilot n'a été attribuée et qui interagissent avec des agents basés sur le travail dans le chat Microsoft 365 Copilot.",
    },
  },
  "real-ab900-86": {
    prompt:
      "Vous avez un site Microsoft SharePoint nommé \"Site1\" et un groupe de sécurité nommé \"Group1\". Vous souhaitez empêcher tous les utilisateurs ayant actuellement accès à \"Site1\" d'accéder au contenu du site, sauf si l'utilisateur est également membre du groupe \"Group1\". Quels paramètres devez-vous configurer ? (Pour répondre, sélectionnez les paramètres appropriés dans la zone de réponse.)",
    options: {
      A: "E-mail",
      B: "Confidentialité",
      C: "Partage de fichiers externe",
      D: "Étiquette de confidentialité",
      E: "Restreindre la découverte de contenu",
      F: "Accès restreint au site",
    },
  },
  "real-ab900-87": {
    statements: [
      "Microsoft 365 Copilot respecte les étiquettes de confidentialité de Microsoft Purview",
      "Microsoft 365 Copilot ignore les stratégies de prévention de la perte de données (DLP) de Microsoft Purview",
    ],
  },
  "real-ab900-88": {
    statements: [
      "Une étiquette de confidentialité peut être appliquée à un site Microsoft SharePoint",
      "Une étiquette de confidentialité peut être appliquée à un message électronique dans Microsoft Exchange",
      "Une étiquette de confidentialité peut être appliquée à des appareils Windows 11",
    ],
  },
  "real-ab900-89": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Votre entreprise a récemment acheté des licences Microsoft 365 Copilot pour certains utilisateurs. Vous devez déterminer combien d'utilisateurs non licenciés ont utilisé Copilot dans Microsoft Teams. Quel rapport d'utilisation devez-vous utiliser dans le centre d'administration Microsoft 365 ?",
    options: {
      A: "Microsoft 365 Copilot Chat",
      B: "Microsoft 365 Copilot Search",
      C: "Microsoft 365 Apps",
      D: "Microsoft 365 Copilot",
    },
  },
  "real-ab900-90": {
    prompt:
      "Un utilisateur nommé \"User1\" est responsable des rapports trimestriels de revenus. \"User1\" doit détecter les tendances de performance, obtenir des informations visuelles et créer un résumé des anomalies sur plusieurs fichiers contenant différents jeux de données. Que devez-vous utiliser ?",
    options: {
      A: "L'agent \"Analyst\" dans Microsoft 365 Copilot",
      B: "L'agent \"Researcher\" dans Microsoft 365 Copilot",
      C: "La recherche Microsoft 365 Copilot",
      D: "Copilot dans Excel",
    },
  },
  "real-ab900-91": {
    prompt: "Votre entreprise évalue actuellement la licence Microsoft 365 Copilot. Dans quel scénario devriez-vous utiliser la facturation à l'usage ?",
    options: {
      A: "Pour donner aux utilisateurs accès à l'assistant IA dans Copilot dans Word",
      B: "Pour résumer les actions lors des réunions Microsoft Teams",
      C: "Pour générer des images dans les chats Premium",
      D: "Pour fournir un agent personnalisé à des utilisateurs non licenciés",
    },
  },
  "real-ab900-92": {
    prompt: "Vous utilisez Microsoft 365 Copilot. Vous souhaitez planifier l'exécution d'une invite à minuit. Quelle tâche devez-vous inclure dans votre solution ?",
    options: {
      A: "Créer un agent.",
      B: "Créer un notebook.",
      C: "Exécuter l'invite.",
      D: "Enregistrer l'invite.",
    },
  },
  "real-ab900-93": {
    prompt:
      "Votre entreprise prévoit de déployer Microsoft 365 Copilot. Vous devez permettre à un utilisateur d'utiliser Microsoft 365 Copilot, y compris les agents \"Researcher\" et \"Analyst\". Que devez-vous utiliser ?",
    options: {
      A: "Le centre d'administration Microsoft 365",
      B: "Le portail Microsoft Purview",
      C: "Le centre d'administration Microsoft Entra",
      D: "Le portail Microsoft Defender",
    },
  },
  "real-ab900-94": {
    prompt:
      "Votre entreprise envisage d'utiliser Microsoft 365 Copilot avec la facturation à l'usage (Pay-as-you-go) plutôt que d'acheter une licence Microsoft 365 Copilot. Dans quel scénario la facturation à l'usage s'applique-t-elle ?",
    options: {
      A: "Effectuer un raisonnement en plusieurs étapes à l'aide de l'agent Researcher",
      B: "Créer un résumé d'une réunion Microsoft Teams",
      C: "Utiliser un agent personnalisé basé sur des données de travail",
      D: "Utiliser l'assistant IA pour modifier un document dans Copilot dans Word",
    },
  },
  "real-ab900-95": {
    prompt:
      "Votre entreprise dispose d'un site Microsoft SharePoint nommé \"Site1\". \"Site1\" contient toutes les politiques du service RH de l'entreprise. Les politiques sont stockées sous forme de documents Microsoft Word. Tous les utilisateurs ont un accès en lecture à \"Site1\". Le responsable RH signale que les demandes des utilisateurs concernant les politiques ne sont PAS traitées en temps opportun, en particulier autour des principaux jours fériés. Vous devez proposer une solution permettant aux utilisateurs de trouver les politiques RH. La solution doit fournir aux utilisateurs une liste de questions fréquentes et garantir que les réponses sont exclusivement basées sur Site1. Que devez-vous inclure dans votre recommandation ?",
    options: {
      A: "L'assistant personnel dans Copilot dans Word",
      B: "Un agent Microsoft 365 Copilot personnalisé",
      C: "L'agent Researcher dans Microsoft 365 Copilot",
      D: "Un notebook Microsoft 365 Copilot",
    },
  },
  "real-ab900-96": {
    prompt: "Sélectionnez la réponse qui complète correctement la phrase.",
    options: {
      A: "Depuis le portail Microsoft Purview, vous pouvez utiliser Data Explorer pour créer et gérer des stratégies de confidentialité.",
      B: "Depuis le portail Microsoft Purview, vous pouvez utiliser Data Explorer pour rechercher du contenu dans les boîtes aux lettres et les sites.",
      C: "Depuis le portail Microsoft Purview, vous pouvez utiliser Data Explorer pour identifier les informations sensibles et leurs emplacements de stockage.",
      D: "Depuis le portail Microsoft Purview, vous pouvez utiliser Data Explorer pour vérifier l'efficacité de vos stratégies de prévention de la perte de données (DLP).",
    },
  },
  "real-ab900-97": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365 contenant un site Microsoft SharePoint nommé \"Site1\". Vous devez déterminer toutes les modifications apportées par un administrateur de site aux paramètres du site \"Site1\". Quel rapport devez-vous utiliser dans le centre d'administration SharePoint ? (Pour répondre, sélectionnez le rapport approprié dans la zone de réponse.)",
    options: {
      A: "Agent Insights",
      B: "Gestion du catalogue App Insights",
      D: "Historique des modifications",
      E: "Gouvernance de l'accès aux données",
      F: "Comptes OneDrive",
    },
  },
  "real-ab900-98": {
    statements: [
      "Microsoft Purview Communications Compliance peut détecter un texte offensant dans des images stockées sur des sites Microsoft SharePoint",
      "Microsoft Purview Communications Compliance anonymise par défaut les identités des utilisateurs pendant les enquêtes",
      "Microsoft Purview Communications Compliance ajoute une clause de non-responsabilité à toutes les communications surveillées",
    ],
  },
  "real-ab900-99": {
    prompt:
      "Votre organisation dispose d'un abonnement Microsoft 365. Une licence Microsoft 365 Copilot a été attribuée à tous les utilisateurs. Vous devez empêcher les utilisateurs de créer des images avec Copilot. Que devez-vous utiliser ?",
    options: {
      A: "Le portail Microsoft Defender",
      B: "Le centre d'administration Microsoft Entra",
      C: "Le portail Microsoft Purview",
      D: "Le centre d'administration Microsoft 365",
    },
  },
  "real-ab900-100": {
    statements: [
      "Les administrateurs peuvent bloquer des sites spécifiques pour leur utilisation par Microsoft 365 Copilot",
      "Les administrateurs peuvent empêcher Microsoft 365 Copilot d'utiliser la recherche web lors de la réponse aux demandes des utilisateurs",
      "Les administrateurs peuvent bloquer l'accès à l'agent Researcher dans Microsoft 365 Copilot tout en autorisant l'accès à l'agent Analyst",
    ],
  },
  "real-ab900-101": {
    prompt:
      "Vous devez vous assurer que les utilisateurs peuvent utiliser un système externe comme source de connaissances pour des agents Microsoft 365 Copilot personnalisés. Que devez-vous configurer dans le centre d'administration Microsoft 365 ? (Pour répondre, sélectionnez les paramètres appropriés dans la zone de réponse.)",
    options: {
      A: "Copilot – Connecteurs",
      B: "Copilot – Recherche",
      C: "Copilot – Paramètres",
      D: "Agents – Vue d'ensemble",
      E: "Agents – Outils",
      F: "Agents – Paramètres",
    },
  },
};

export default ab900_fr;
