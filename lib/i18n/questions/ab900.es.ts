import type { QuestionTranslations } from "./types";

// Spanish (Español) translations of AB900_QUESTIONS (Microsoft 365
// Copilot). Hand-translated from the German source in
// lib/ab900Practice.ts, with Microsoft product/feature names kept in
// their official English form — standard practice in Spanish
// technical/IT writing (same convention as ab900.fa.ts / ab900.ar.ts /
// ab900.uk.ts).
//
// PROGRESS: 100% COMPLETE. All 101 of 101 questions translated
// (real-ab900-1 through real-ab900-101). Anything not listed here
// falls back to German (shouldn't occur, but kept as a safety net).

const ab900_es: QuestionTranslations = {
  "real-ab900-1": {
    prompt: "Para cada una de las siguientes afirmaciones, seleccione Sí si la afirmación es verdadera. De lo contrario, seleccione No.",
    statements: [
      "Para usar Microsoft 365 Copilot Chat con el fin de razonar sobre datos web, necesita una licencia de Microsoft 365 Copilot",
      "Para usar el agente Researcher en Microsoft 365 Copilot, necesita una licencia de Microsoft 365 Copilot",
      "Para agregar un agente en la aplicación Microsoft 365 Copilot, necesita una licencia de Microsoft 365 Copilot",
    ],
  },
  "real-ab900-2": {
    prompt: "Para cada una de las siguientes afirmaciones, seleccione Sí si la afirmación es verdadera. De lo contrario, seleccione No.",
    statements: [
      "Microsoft 365 Copilot solo muestra los datos organizativos para los que los usuarios individuales tienen permisos",
      "Microsoft 365 Copilot usa los mismos controles subyacentes de acceso a datos que otros servicios de Microsoft 365",
      "Microsoft 365 Copilot puede usar conectores para recuperar información de fuentes de datos de terceros",
    ],
  },
  "real-ab900-3": {
    prompt: "En Microsoft 365 Copilot, debe usar ___ para realizar razonamiento de varios pasos sobre datos no estructurados.",
    options: { A: "un notebook", B: "Chat", C: "el agente Analyst", D: "el agente Researcher" },
  },
  "real-ab900-4": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365 E5. Debe asegurarse de que un servicio en la nube de terceros pueda autenticarse con Microsoft Entra. ¿Qué debería configurar?",
    options: {
      A: "Un conector de Microsoft 365 Copilot",
      B: "Autenticación multifactor (MFA)",
      C: "Una directiva de acceso condicional (Conditional Access)",
      D: "Un registro de aplicación (app registration)",
    },
  },
  "real-ab900-5": {
    prompt: "El principio de Microsoft para la IA responsable relacionado con ___ requiere la supervisión de los sistemas de IA para garantizar que las personas mantengan el control.",
    options: {
      A: "responsabilidad (accountability)",
      B: "inclusión",
      C: "privacidad y seguridad",
      D: "confiabilidad y seguridad",
      E: "transparencia",
    },
  },
  "real-ab900-6": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. Debe evaluar el Identity Secure Score de su organización. ¿Qué dos factores influyen en la puntuación? (Cada respuesta correcta presenta una solución completa. NOTA: cada selección correcta vale un punto.)",
    options: {
      A: "Los permisos del sitio de SharePoint",
      B: "El número de administradores globales",
      C: "Las contraseñas que nunca caducan",
      D: "La ubicación de los usuarios",
    },
  },
  "real-ab900-7": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. Debe revisar el impacto de un incidente reciente de phishing dirigido a usuarios de correo electrónico. ¿Qué debería usar?",
    options: {
      A: "El portal de Microsoft Defender",
      B: "El centro de administración de Microsoft 365",
      C: "El centro de administración de Microsoft Entra",
      D: "El centro de administración de Microsoft Exchange",
    },
  },
  "real-ab900-8": {
    prompt: "Su organización tiene una suscripción a Microsoft 365. Debe asignar una licencia a un usuario. ¿Qué debería usar?",
    options: {
      A: "El portal de Microsoft Purview",
      B: "El centro de administración de Microsoft 365",
      C: "El centro de administración de Microsoft Teams",
    },
  },
  "real-ab900-9": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "Microsoft 365 Copilot recupera datos de Azure OpenAI mediante Microsoft Graph.",
      B: "Microsoft 365 Copilot recupera datos de usuarios externos mediante Microsoft Graph.",
      C: "Microsoft 365 Copilot recupera datos de archivos de Microsoft SharePoint mediante Microsoft Graph.",
      D: "Microsoft 365 Copilot recupera datos de motores de búsqueda de Internet mediante Microsoft Graph.",
    },
  },
  "real-ab900-10": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "Microsoft Entra Privileged Identity Management (PIM) proporciona acceso limitado a los servicios de Microsoft 365.",
      B: "Microsoft Entra Privileged Identity Management (PIM) proporciona gestión del ciclo de vida del usuario.",
      C: "Microsoft Entra Privileged Identity Management (PIM) proporciona gestión de aplicaciones empresariales.",
      D: "Microsoft Entra Privileged Identity Management (PIM) proporciona asignación de roles limitada en el tiempo.",
    },
  },
  "real-ab900-11": {
    prompt:
      "Un usuario llamado User5 navega a https://myapps.microsoft.com. Después de introducir su nombre de usuario y contraseña, User5 recibe el siguiente mensaje en su dispositivo móvil. Use los menús desplegables para seleccionar la respuesta que completa la afirmación según la información mostrada en el diagrama.",
    options: {
      A: "User5 usa un código de un solo uso por correo electrónico (Email OTP) para la autenticación multifactor (MFA).",
      B: "User5 usa la aplicación Microsoft Authenticator para la autenticación multifactor (MFA).",
      C: "User5 usa SMS para la autenticación multifactor (MFA).",
      D: "User5 usa una contraseña de acceso temporal para la autenticación multifactor (MFA).",
    },
  },
  "real-ab900-12": {
    prompt: "Para cada una de las siguientes afirmaciones, seleccione Sí si la afirmación es verdadera. De lo contrario, seleccione No. (NOTA: cada selección correcta vale un punto.)",
    statements: [
      "Microsoft Defender for Office 365 proporciona protección contra ataques de phishing y malware",
      "Microsoft Defender for Identity supervisa las identidades en los dominios de Active Directory",
      "Microsoft Defender Vulnerability Management proporciona protección para aplicaciones de software como servicio (SaaS)",
    ],
  },
  "real-ab900-13": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365 que contiene un sitio de Microsoft SharePoint llamado Site1. Los permisos de Site1 están configurados como se muestra en la siguiente imagen. Crea un nuevo usuario llamado User1 en la suscripción. Use los menús desplegables para seleccionar la respuesta que completa la afirmación según la información mostrada en el diagrama.",
    options: {
      A: "User1 es un visitante de Site1.",
      B: "User1 es propietario de Site1.",
      C: "User1 es miembro de Site1.",
      D: "User1 tiene bloqueado el acceso a Site1.",
    },
  },
  "real-ab900-14": {
    prompt:
      "Una empresa multinacional con más de 5000 usuarios está implementando Microsoft 365 Copilot. Actualmente, la empresa tiene una combinación de licencias Microsoft 365 E3 y Office 365 E3 para sus trabajadores del conocimiento. El administrador de TI debe garantizar que todos los usuarios puedan acceder a las capacidades completas de IA generativa de Copilot en aplicaciones como Word y Excel. ¿Qué acción mínima de licenciamiento se requiere para habilitar el acceso a Microsoft 365 Copilot para todos los trabajadores del conocimiento existentes?",
    options: {
      A: "Actualizar todas las licencias existentes de Office 365 E3 a licencias de Microsoft 365 E5.",
      B: "Comprar la licencia adicional independiente de Microsoft 365 Copilot para todos los usuarios.",
      C: "Convertir todas las licencias existentes de planes empresariales a planes de Microsoft 365 Business Premium.",
      D: "Comprar la licencia adicional de Microsoft 365 Copilot solo para usuarios con licencias Microsoft 365 E3, ya que Office 365 E3 no es elegible.",
    },
  },
  "real-ab900-15": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "Cuando un usuario comparte un agente de Microsoft 365 Copilot, puede usar Microsoft Foundry para impedir que los usuarios utilicen el agente.",
      B: "Cuando un usuario comparte un agente de Microsoft 365 Copilot, puede usar Microsoft Copilot Studio para impedir que los usuarios utilicen el agente.",
      C: "Cuando un usuario comparte un agente de Microsoft 365 Copilot, puede usar el centro de administración de Microsoft 365 para impedir que los usuarios utilicen el agente.",
      D: "Cuando un usuario comparte un agente de Microsoft 365 Copilot, puede usar el portal de Power Apps para impedir que los usuarios utilicen el agente.",
    },
  },
  "real-ab900-16": {
    prompt:
      "El equipo de administración de TI de su organización, Contoso Ltd., ha adquirido un nuevo nombre de dominio, contosoglobal.com, y necesita agregarlo en su entorno de Microsoft 365. Este nuevo dominio se usará para todos los nuevos nombres principales de usuario (UPN) y direcciones de correo electrónico. ¿Qué sección del centro de administración de Microsoft 365 debe usar el administrador para gestionar, verificar y establecer el nuevo dominio como predeterminado para los nuevos usuarios?",
    options: {
      A: "Configuración > Configuración de la organización > Servicios",
      B: "Facturación > Licencias > Lista de productos",
      C: "Configuración > Configuración de dominio > Conectar dominio",
      D: "Configuración > Dominios",
    },
  },
  "real-ab900-17": {
    prompt:
      "Un usuario del departamento financiero recibió un sofisticado correo de phishing con un enlace malicioso que fue neutralizado. El equipo de seguridad necesita una vista centralizada única para revisar la línea de tiempo del incidente, las alertas relacionadas (correo electrónico y endpoint) y las acciones recomendadas para fortalecer la postura de seguridad tanto del correo electrónico como de los endpoints. ¿Qué función de Defender XDR o sección del portal proporciona al equipo de seguridad esta vista unificada del incidente y recomendaciones de mejora?",
    options: {
      A: "Microsoft Defender for Identity",
      B: "Microsoft Defender for Office 365",
      C: "Microsoft Defender Vulnerability Management",
      D: "La experiencia unificada de incidentes y alertas junto con Secure Score en el portal de Microsoft Defender",
    },
  },
  "real-ab900-18": {
    prompt:
      "A un usuario se le ha bloqueado el inicio de sesión, y el administrador sospecha de Conditional Access o de la detección de una señal de riesgo. ¿Qué dos herramientas del centro de administración de Microsoft Entra debería usar primero el administrador para identificar el error exacto de inicio de sesión y la directiva responsable? (Cada selección correcta presenta parte de la solución. NOTA: cada selección correcta vale un punto.)",
    options: {
      A: "La herramienta Conditional Access What If",
      B: "El panel de estado de servicios de Microsoft 365",
      C: "Los registros de inicio de sesión y la solución de problemas y soporte en Microsoft Entra ID",
      D: "El seguimiento de mensajes de Exchange Online",
      E: "El proxy de aplicaciones de Microsoft Entra ID",
    },
  },
  "real-ab900-19": {
    prompt: "Para cada una de las siguientes afirmaciones, seleccione Sí si la afirmación es verdadera. De lo contrario, seleccione No. (NOTA: cada selección correcta vale un punto.)",
    statements: [
      "Microsoft Purview Compliance Manager proporciona una evaluación de cumplimiento basada en riesgos para ayudarle a comprender su situación de cumplimiento",
      "Microsoft Purview Compliance Manager proporciona orientación paso a paso para solucionar problemas de cumplimiento",
      "Compliance Manager forma parte de Microsoft Defender",
    ],
  },
  "real-ab900-20": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. Observa que los archivos de Microsoft SharePoint se comparten con usuarios fuera de su organización. Debe averiguar qué archivos se comparten con los usuarios externos. ¿Qué informe debería usar en el centro de administración de SharePoint? (Para responder, seleccione el informe adecuado en el área de respuesta.)",
    options: {
      A: "Estadísticas de agentes (Agent insights)",
      B: "Estadísticas de aplicaciones (App insights)",
      C: "Historial de cambios",
      D: "Gestión de acceso a datos",
      E: "Cuentas de OneDrive",
      F: "Comparación de directivas de sitios",
    },
  },
  "real-ab900-21": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. El departamento de recursos humanos de su empresa solicita una copia de todos los archivos modificados recientemente por un usuario llamado User1. ¿Qué debería usar en el portal de Microsoft Purview? (Para responder, seleccione las soluciones adecuadas en el área de respuesta.)",
    options: {
      A: "Auditoría (Audit)",
      B: "Catálogo de datos",
      C: "Prevención de pérdida de datos",
      D: "eDiscovery",
      E: "Protección de la información",
      F: "Gestión de riesgos internos",
    },
  },
  "real-ab900-22": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. Debe usar Microsoft Purview para cumplir los siguientes requisitos: • Impedir que los usuarios compartan archivos que contengan información de identificación personal (PII). • Usar aprendizaje automático para entrenar un modelo que detecte contenido confidencial. ¿Qué solución de Microsoft Purview debería usar para cada requisito? (Para responder, seleccione las opciones adecuadas en el área de respuesta. NOTA: cada selección correcta vale un punto.)",
    options: {
      A: "Impedir compartir PII: Communication Compliance / Entrenar modelo: Data Loss Prevention",
      B: "Impedir compartir PII: Data Loss Prevention / Entrenar modelo: Information Protection",
      C: "Impedir compartir PII: Information Protection / Entrenar modelo: Insider Risk Management",
      D: "Impedir compartir PII: Insider Risk Management / Entrenar modelo: Communication Compliance",
      E: "Impedir compartir PII: Data Loss Prevention / Entrenar modelo: DSPM for AI",
      F: "Impedir compartir PII: DSPM for AI / Entrenar modelo: Insider Risk Management",
    },
  },
  "real-ab900-23": {
    prompt:
      "Desea ver las acciones administrativas realizadas por un administrador de servicio en Microsoft 365. Para cada una de las siguientes afirmaciones, seleccione Sí si la afirmación es verdadera. De lo contrario, seleccione No. (NOTA: cada selección correcta vale un punto.)",
    options: {
      A: "Puede usar Search & Intelligence en el centro de administración de Microsoft 365: Sí / Puede usar Audit en el portal de Microsoft Defender: Sí / Puede usar Audit en el portal de Microsoft Purview: Sí",
      B: "Puede usar Search & Intelligence en el centro de administración de Microsoft 365: Sí / Puede usar Audit en el portal de Microsoft Defender: Sí / Puede usar Audit en el portal de Microsoft Purview: No",
      C: "Puede usar Search & Intelligence en el centro de administración de Microsoft 365: Sí / Puede usar Audit en el portal de Microsoft Defender: No / Puede usar Audit en el portal de Microsoft Purview: Sí",
      D: "Puede usar Search & Intelligence en el centro de administración de Microsoft 365: No / Puede usar Audit en el portal de Microsoft Defender: Sí / Puede usar Audit en el portal de Microsoft Purview: No",
      E: "Puede usar Search & Intelligence en el centro de administración de Microsoft 365: No / Puede usar Audit en el portal de Microsoft Defender: No / Puede usar Audit en el portal de Microsoft Purview: Sí",
      F: "Puede usar Search & Intelligence en el centro de administración de Microsoft 365: No / Puede usar Audit en el portal de Microsoft Defender: No / Puede usar Audit en el portal de Microsoft Purview: No",
    },
  },
  "real-ab900-24": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "Las directivas de Conditional Access se configuran a través del portal de Microsoft Defender.",
      B: "Las directivas de Conditional Access solo se aplican a los recursos locales.",
      C: "Las directivas de Conditional Access proporcionan control sobre cómo los usuarios acceden a las aplicaciones en la nube.",
      D: "Las directivas de Conditional Access requieren un buzón de Microsoft Exchange.",
    },
  },
  "real-ab900-25": {
    prompt:
      "Un administrador debe gestionar el acceso a un sitio confidencial de SharePoint de recursos humanos y asignar licencias adicionales de Copilot a los 50 miembros del equipo \"HR-Data-Users\". La membresía cambia con frecuencia debido a una alta rotación. ¿Qué objeto de Microsoft Entra es la opción más eficiente tanto para el control de acceso como para la gestión de grupos basada en licencias?",
    options: {
      A: "Grupo de seguridad dinámico",
      B: "Grupo de seguridad habilitado para correo",
      C: "Grupo de Microsoft 365",
      D: "Lista de distribución",
    },
  },
  "real-ab900-26": {
    prompt: "Usa Microsoft 365 Copilot. ¿Con qué genera Copilot respuestas basadas en datos de la empresa almacenados en Microsoft SharePoint?",
    options: {
      A: "Microsoft Intune",
      B: "Microsoft Defender",
      C: "Microsoft Graph",
      D: "Microsoft Purview",
    },
  },
  "real-ab900-27": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "Puede usar la solución Data Lifecycle Management de Microsoft Purview para detectar entradas de Microsoft 365 Copilot que contengan información confidencial.",
      B: "Puede usar la solución DSPM for AI de Microsoft Purview para detectar entradas de Microsoft 365 Copilot que contengan información confidencial.",
      C: "Puede usar la solución Information Barriers de Microsoft Purview para detectar entradas de Microsoft 365 Copilot que contengan información confidencial.",
      D: "Puede usar la solución Information Protection de Microsoft Purview para detectar entradas de Microsoft 365 Copilot que contengan información confidencial.",
    },
  },
  "real-ab900-28": {
    prompt:
      "Un usuario de marketing le pide a Copilot que resuma la \"última propuesta de presupuesto\" almacenada en un sitio de SharePoint accesible solo para el departamento financiero. El usuario de marketing no es miembro del sitio. ¿Qué principio controla el comportamiento de Copilot e impide que devuelva el contenido restringido?",
    options: {
      A: "Copilot aplica la verificación de Zero-Trust antes de procesar la solicitud.",
      B: "Copilot solo usa contenido etiquetado explícitamente con una etiqueta de confidencialidad específica.",
      C: "Copilot aplica estrictamente los permisos existentes del usuario en Microsoft 365 y no devuelve contenido al que el usuario no tiene acceso.",
      D: "Microsoft Purview DLP redacta automáticamente las cifras financieras en las respuestas de Copilot.",
    },
  },
  "real-ab900-29": {
    prompt:
      "Cuando un usuario le pregunta a Copilot: \"¿Qué documentos recientes se han compartido conmigo sobre 'Project Phoenix'?\", Copilot devuelve documentos personalizados de OneDrive, SharePoint y Teams. ¿Qué papel principal desempeña Microsoft Graph al permitir esta respuesta?",
    options: {
      A: "Proporciona al LLM su conocimiento general preentrenado.",
      B: "Actúa como motor de cumplimiento de políticas de redacción.",
      C: "Actúa como un índice semántico que asigna la consulta del usuario al contexto, las relaciones y los permisos del usuario para los datos organizativos.",
      D: "Aplica directivas de Conditional Access en tiempo real.",
    },
  },
  "real-ab900-30": {
    statements: [
      "Para que los administradores puedan usar SharePoint Advanced Management, todos los usuarios de su organización necesitan una licencia de Microsoft 365 Copilot",
      "SharePoint Advanced Management puede ayudar a restringir el acceso de Microsoft 365 Copilot al contenido de Microsoft SharePoint",
      "SharePoint Advanced Management está disponible como licencia independiente para organizaciones sin Microsoft 365 Copilot",
    ],
  },
  "real-ab900-31": {
    prompt:
      "Un agente de IA que se está preparando para resumir registros de clientes muestra un sesgo a favor de ciertas regiones geográficas. ¿Qué principio de Microsoft Responsible AI se está violando principalmente y debería abordarse antes de la implementación?",
    options: {
      A: "Equidad (Fairness)",
      B: "Transparencia",
      C: "Responsabilidad",
      D: "Inclusión",
    },
  },
  "real-ab900-32": {
    prompt:
      "Cumplimiento necesita un informe que enumere los sitios de SharePoint que contienen documentos altamente confidenciales pero que se comparten con grupos grandes como \"Todos excepto usuarios externos\". ¿Qué función de Microsoft está diseñada para generar informes de Data Access Governance (DAG) que identifican contenido confidencial y prácticas de uso compartido más permisivas?",
    options: {
      A: "Microsoft Entra ID Protection",
      B: "Microsoft Purview Data Loss Prevention (DLP)",
      C: "Microsoft Defender for Cloud Apps",
      D: "SharePoint Advanced Management (SAM)",
    },
  },
  "real-ab900-33": {
    prompt: "Tiene un sitio de Microsoft SharePoint como se muestra en la siguiente imagen. Debe ver la configuración de SLabel1. ¿Qué debería usar?",
    options: {
      A: "El portal de Microsoft Defender",
      B: "El centro de administración de SharePoint",
      C: "El centro de administración de Microsoft 365",
      D: "El portal de Microsoft Purview",
    },
  },
  "real-ab900-34": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "Puede usar Microsoft Defender for Office 365 para revisar los indicadores de amenazas correlacionados en incidentes de correo electrónico, identidad y dispositivo en una sola vista.",
      B: "Puede usar Microsoft Defender XDR para revisar los indicadores de amenazas correlacionados en incidentes de correo electrónico, identidad y dispositivo en una sola vista.",
      C: "Puede usar Microsoft Purview Compliance Manager para revisar los indicadores de amenazas correlacionados en incidentes de correo electrónico, identidad y dispositivo en una sola vista.",
      D: "Puede usar Microsoft Purview Data Loss Prevention para revisar los indicadores de amenazas correlacionados en incidentes de correo electrónico, identidad y dispositivo en una sola vista.",
    },
  },
  "real-ab900-35": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365 que contiene un usuario llamado User1. User1 planea dejar su empresa en dos semanas. Debe registrar las actividades de User1 para determinar si el usuario está exfiltrando datos. ¿Qué solución de Microsoft Purview debería usar?",
    options: {
      A: "Communication Compliance",
      B: "Data Security Posture Management",
      C: "Insider Risk Management",
      D: "Data Lifecycle Management",
    },
  },
  "real-ab900-36": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365 que contiene sitios de Microsoft SharePoint y equipos de Microsoft Teams. Observa que los sitios y equipos se comparten con usuarios fuera de su organización. Debe averiguar qué sitios y equipos se han compartido con los usuarios externos. ¿Qué debería usar?",
    options: {
      A: "El centro de administración de SharePoint",
      B: "El centro de administración de Microsoft Teams",
      C: "El centro de administración de Microsoft 365",
      D: "El portal de Microsoft Defender",
    },
  },
  "real-ab900-37": {
    prompt:
      "Una organización requiere que Copilot nunca incluya resultados de búsquedas web públicas en las respuestas, para evitar una posible divulgación de indicaciones/datos internos. ¿Qué función de Copilot debería deshabilitar un administrador para bloquear la fundamentación web (web grounding) en las respuestas de Copilot?",
    options: {
      A: "Copilot en Word",
      B: "Copilot for Microsoft 365",
      C: "Copilot Chat",
      D: "Las funciones de Copilot en las aplicaciones de Microsoft 365",
    },
  },
  "real-ab900-38": {
    statements: [
      "El informe de uso de Microsoft 365 Copilot se puede usar para ver las indicaciones (prompts) enviadas por los usuarios a Copilot",
      "El informe de uso de Microsoft 365 Copilot muestra el número total de usuarios únicos en su organización",
      "El informe de uso de Microsoft 365 Copilot muestra el uso de Copilot de cada aplicación individual de Microsoft 365",
    ],
  },
  "real-ab900-39": {
    prompt:
      "Planea crear un agente en la aplicación Microsoft 365 Copilot para resolver un problema empresarial. ¿Cuáles son dos razones para crear el agente? (Cada respuesta correcta presenta una solución completa. NOTA: cada selección correcta vale un punto.)",
    options: {
      A: "Necesita usar un modelo de IA personalizado.",
      B: "Necesita usar un conjunto de instrucciones personalizado que difiera de la experiencia de chat.",
      C: "Necesita razonar sobre un sitio específico.",
      D: "Necesita agrupar chats relacionados en un notebook de Copilot.",
    },
  },
  "real-ab900-40": {
    prompt:
      "Uno de los principales riesgos de gobernanza al implementar Microsoft 365 Copilot es la posible fuga de datos de la empresa. El director de cumplimiento le preocupa que, dado que Copilot usa todos los datos a los que el usuario tiene acceso, un usuario podría obtener acceso involuntario a información confidencial a la que no debería tener acceso. ¿Cuál es la causa más común de este riesgo de sobreexposición que los administradores deben abordar como tarea de gobernanza de alta prioridad antes de implementar Copilot ampliamente?",
    options: {
      A: "Copilot evita los controles de acceso de SharePoint al indexar contenido.",
      B: "Permisos demasiado amplios en sitios o archivos.",
      C: "Los registros de chat de Copilot no están sujetos a eDiscovery ni a retención.",
      D: "El entrenamiento del modelo de Azure OpenAI usa datos del inquilino (tenant) y los retiene dentro del inquilino.",
    },
  },
  "real-ab900-41": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. Debe investigar incidentes de seguridad y alertas generados por los dispositivos Windows 11 de su organización. ¿Qué debería usar?",
    options: {
      A: "Microsoft Entra ID Protection",
      B: "Microsoft Defender for Identity",
      C: "Microsoft Purview Insider Risk Management",
      D: "Microsoft Defender for Endpoint",
    },
  },
  "real-ab900-42": {
    prompt:
      "Su empresa requiere que todos los sitios de Microsoft SharePoint tengan al menos dos propietarios. Debe asegurarse de que los sitios con menos de dos propietarios se marquen como de solo lectura si NO se corrigen. ¿Qué debería configurar en el centro de administración de SharePoint?",
    options: {
      A: "Restricción de acceso a nivel de sitio",
      B: "Informes de gestión de acceso a datos",
      C: "Gestión del ciclo de vida del sitio",
      D: "Directiva de bloqueo de descargas para SharePoint y OneDrive",
    },
  },
  "real-ab900-43": {
    prompt:
      "El director de TI quiere métricas agregadas a nivel de inquilino, como usuarios activos de Copilot, uso por aplicación y categorías de indicaciones, para medir el ROI de Copilot. ¿Qué herramienta administrativa proporciona esta evaluación agregada de adopción y uso?",
    options: {
      A: "El registro de auditoría de Microsoft Purview",
      B: "El panel de análisis de Copilot",
      C: "Los registros de inicio de sesión de Microsoft Entra ID",
      D: "El estado del servicio de Microsoft 365",
    },
  },
  "real-ab900-44": {
    prompt:
      "Antes de que se pueda publicar un agente de IA creado en Copilot Studio que se conecta a una base de datos financiera local, un administrador debe revisar el acceso, el rendimiento y el estado del ciclo de vida. ¿Qué dos centros de administración de Microsoft se usan principalmente para gestionar y supervisar el ciclo de vida del agente y la configuración del entorno? (Cada selección correcta presenta parte de la solución. NOTA: cada selección correcta vale un punto.)",
    options: {
      A: "El portal de Microsoft Purview",
      B: "El centro de administración de Microsoft Entra",
      C: "El centro de administración de Microsoft 365",
      D: "La administración de Microsoft Power Platform",
      E: "El centro de administración de Exchange",
    },
  },
  "real-ab900-45": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "Desde el centro de administración de SharePoint, puede crear un servidor.",
      B: "Desde el centro de administración de SharePoint, puede crear un usuario.",
      C: "Desde el centro de administración de SharePoint, puede crear un sitio.",
      D: "Desde el centro de administración de SharePoint, puede crear un rol.",
    },
  },
  "real-ab900-46": {
    prompt: "Debe crear un agente de Microsoft 365 Copilot capaz de generar gráficos y visualizaciones basados en un libro de Microsoft Excel. ¿Qué debería configurar para el agente?",
    options: {
      A: "La función de generación de imágenes",
      B: "La plantilla de Scrum Assistant",
      C: "La plantilla de Customer Insights Assistant",
      D: "La función de intérprete de código (Code Interpreter)",
    },
  },
  "real-ab900-47": {
    prompt:
      "Su empresa está probando el uso de Microsoft 365 Copilot y ha adquirido 100 licencias de Microsoft 365 Copilot. Debe ver informes detallados sobre el uso de Copilot en Microsoft Teams, como horas de reunión resumidas por Copilot y acciones de reunión realizadas por Copilot. ¿Qué debería usar?",
    options: {
      A: "El informe de preparación de Microsoft 365 Copilot en el centro de administración de Microsoft 365",
      B: "El informe de uso de Microsoft 365 Copilot en el centro de administración de Microsoft 365",
      C: "El panel de Microsoft 365 Copilot en Microsoft Viva Insights",
      D: "El informe de uso de las aplicaciones de Microsoft 365 en el centro de administración de Microsoft 365",
    },
  },
  "real-ab900-48": {
    prompt:
      "Un usuario llamado User1 crea un agente de Microsoft 365 Copilot llamado Agent1 y lo comparte con un usuario llamado User2. ¿Qué sucede cuando un administrador bloquea Agent1?",
    options: {
      A: "Agent1 permanece accesible para User1 y User2 hasta que los usuarios desinstalen manualmente el agente. Ningún otro usuario puede instalar Agent1.",
      B: "Agent1 permanece accesible para User1 y User2, y ningún otro usuario puede instalar Agent1.",
      C: "Agent1 se elimina de User2, y User1 puede seguir usando Agent1.",
      D: "Agent1 se elimina de User1 y User2, y ningún usuario puede instalar Agent1.",
    },
  },
  "real-ab900-49": {
    statements: [
      "Los administradores pueden eliminar un agente específico de Copilot para todos los usuarios",
      "Desde el centro de administración de Microsoft 365, los administradores pueden configurar las indicaciones de un agente de Copilot",
      "Los administradores pueden implementar agentes de Copilot para usuarios específicos",
    ],
  },
  "real-ab900-50": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "Desde el centro de administración de Microsoft Teams, puede asignar una licencia de Teams a un usuario.",
      B: "Desde el centro de administración de Microsoft Teams, puede implementar el cliente de Teams.",
      C: "Desde el centro de administración de Microsoft Teams, puede gestionar un dispositivo de sala de Teams.",
      D: "Desde el centro de administración de Microsoft Teams, puede impedir que los usuarios creen equipos (Teams).",
    },
  },
  "real-ab900-51": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. Todos los usuarios tienen licencias de Microsoft 365 Copilot. Debe determinar dónde se usa el contenido confidencial durante las interacciones con Copilot, analizar los patrones de uso del contenido y proporcionar recomendaciones para aplicar la protección adecuada. ¿Qué debería usar?",
    options: {
      A: "Microsoft Viva Insights",
      B: "La solución DSPM for AI de Microsoft Purview",
      C: "Microsoft Security Copilot",
      D: "La solución Insider Risk Management de Microsoft Purview",
    },
  },
  "real-ab900-52": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. Se han asignado licencias de Microsoft 365 Copilot a todos los usuarios. Algunos usuarios informan que reciben respuestas de Copilot que contienen información de un sitio de Microsoft SharePoint llamado Finance. Los usuarios indican que esta información es comercialmente sensible. Debe impedir que Copilot proporcione respuestas que contengan información del sitio Finance. ¿Qué debería hacer?",
    options: {
      A: "Crear una directiva de Information Barrier (IB) en Microsoft Purview.",
      B: "Crear un conector de datos en Microsoft Defender.",
      C: "Crear una directiva de Conditional Access en Microsoft Entra.",
      D: "Configurar los permisos en el sitio Finance.",
    },
  },
  "real-ab900-53": {
    prompt:
      "Un gerente pregunta: \"¿Cuál es la principal diferencia de capacidades entre Microsoft 365 Copilot integrado en Word/Excel y un agente de IA personalizado creado en Copilot Studio?\" ¿Cuál es la respuesta correcta?",
    options: {
      A: "Solo el Copilot integrado puede acceder a los datos de Microsoft Graph y resumirlos.",
      B: "El Copilot integrado es un asistente de productividad general. Los agentes de IA personalizados están diseñados para tareas específicas de varios pasos e integraciones con sistemas externos.",
      C: "Solo los agentes de IA personalizados pueden fundamentar sus respuestas en datos organizativos.",
      D: "Los agentes personalizados solo son accesibles a través del portal de Copilot Studio, mientras que Copilot está integrado en las aplicaciones.",
    },
  },
  "real-ab900-54": {
    prompt:
      "El jefe de un departamento ha desarrollado una indicación (prompt) compleja y de alto impacto en Microsoft 365 Copilot para analizar datos de ventas semanales. El jefe quiere que los 30 miembros de su equipo de ventas tengan acceso fácil y coherente a esta plantilla de indicación específica. ¿Qué método se recomienda para garantizar que esta valiosa plantilla se use de manera uniforme en todo el equipo?",
    options: {
      A: "Usar la interfaz de Copilot Studio para publicar la indicación como un nuevo agente.",
      B: "Enviar el texto de la indicación al equipo por correo electrónico e indicarles que la guarden en su OneDrive personal.",
      C: "Compartir la plantilla de indicación directamente desde la biblioteca de indicaciones de Microsoft 365 Copilot.",
      D: "Crear un flujo de Power Automate que ejecute la indicación semanalmente.",
    },
  },
  "real-ab900-55": {
    statements: [
      "Una directiva de Communication Compliance puede detectar texto inapropiado en mensajes de Microsoft Teams",
      "Una directiva de Communication Compliance puede detectar lenguaje ofensivo en las indicaciones de Microsoft 365 Copilot",
      "Una directiva de Communication Compliance se puede usar para retener mensajes de correo electrónico durante 10 años",
    ],
  },
  "real-ab900-56": {
    statements: [
      "Desde la galería de indicaciones de Copilot, puede editar una indicación guardada",
      "Desde la galería de indicaciones de Copilot, puede compartir una indicación guardada con un equipo de Microsoft Teams",
      "Puede crear un enlace compartido para una indicación que NO se ha guardado en la galería de indicaciones de Copilot",
    ],
  },
  "real-ab900-57": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. Observa que algunos usuarios no pueden iniciar sesión en Microsoft 365. Debe ver los intentos fallidos de inicio de sesión en Microsoft 365. ¿Qué debería usar?",
    options: {
      A: "El portal de Microsoft Defender",
      B: "El centro de administración de Microsoft Entra",
      C: "El portal de Microsoft Purview",
      D: "El centro de administración de Microsoft 365",
    },
  },
  "real-ab900-58": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365 que contiene un sitio de Microsoft SharePoint llamado Site1. Debe impedir que los usuarios compartan el contenido de Site1 con usuarios externos. ¿Qué debería usar?",
    options: {
      A: "El contenido de Site1",
      B: "El centro de administración de SharePoint",
      C: "El centro de administración de Microsoft 365",
      D: "El centro de administración de Microsoft Entra",
    },
  },
  "real-ab900-59": {
    prompt: "¿Qué afirmación describe con precisión Microsoft Defender XDR?",
    options: {
      A: "Microsoft Defender XDR es un conjunto empresarial unificado que coordina la detección, prevención, investigación y respuesta en endpoints, identidades, correo electrónico y aplicaciones para proporcionar protección integrada contra ataques sofisticados.",
      B: "Microsoft Entra Conditional Access es un conjunto empresarial unificado que coordina la detección, prevención, investigación y respuesta en endpoints, identidades, correo electrónico y aplicaciones para proporcionar protección integrada contra ataques sofisticados.",
      C: "Microsoft Entra ID Protection es un conjunto empresarial unificado que coordina la detección, prevención, investigación y respuesta en endpoints, identidades, correo electrónico y aplicaciones para proporcionar protección integrada contra ataques sofisticados.",
      D: "Microsoft Purview es un conjunto empresarial unificado que coordina la detección, prevención, investigación y respuesta en endpoints, identidades, correo electrónico y aplicaciones para proporcionar protección integrada contra ataques sofisticados.",
    },
  },
  "real-ab900-60": {
    prompt: "Su organización tiene una suscripción a Microsoft 365. A un usuario llamado Alex Wilber se le ha asignado un rol administrativo, como se muestra en la siguiente imagen.",
    options: {
      A: "Alex Wilber puede ver a todos los usuarios en el inquilino de Microsoft Entra.",
      B: "Alex Wilber puede ver todo el contenido en los sitios de Microsoft SharePoint.",
      C: "Alex Wilber puede leer todo el contenido en los buzones de Microsoft Exchange.",
      D: "Alex Wilber puede realizar eDiscovery de las indicaciones de Microsoft 365 Copilot.",
    },
  },
  "real-ab900-61": {
    statements: [
      "Puede usar un grupo de seguridad de Microsoft Entra para asignar permisos a los recursos de Microsoft Entra ID",
      "Puede usar un grupo de seguridad de Microsoft Entra para asignar licencias de Microsoft 365",
      "Puede usar un grupo de seguridad de Microsoft Entra para asignar permisos a los buzones de Microsoft Exchange",
    ],
  },
  "real-ab900-62": {
    prompt: "¿Qué afirmación describe con precisión la autorización en Microsoft 365?",
    options: {
      A: "Un proceso para verificar que una identidad es realmente quien dice ser",
      B: "Un proceso que requiere métodos de autenticación adicionales antes de que una identidad pueda acceder a los recursos",
      C: "Un proceso para verificar que a una identidad se le permite acceder a un recurso",
      D: "Un proceso para validar una identidad de un sistema externo",
    },
  },
  "real-ab900-63": {
    statements: [
      "Un miembro de un sitio de Microsoft SharePoint puede invitar a usuarios a acceder al contenido del sitio",
      "Un propietario de un sitio de Microsoft SharePoint puede agregar grupos de Microsoft 365 como miembros del sitio",
      "Un propietario de un sitio de Microsoft SharePoint puede eliminar a otro propietario del sitio",
    ],
  },
  "real-ab900-64": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. ¿Cuáles son dos tareas que puede realizar con el centro de administración de Exchange? (Cada respuesta correcta presenta parte de la solución. NOTA: cada selección correcta vale un punto.)",
    options: {
      A: "Asignar una licencia de Microsoft Exchange.",
      B: "Crear una regla de flujo de correo.",
      C: "Crear un buzón compartido.",
      D: "Agregar un dominio personalizado.",
    },
  },
  "real-ab900-65": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "En Microsoft Entra Privileged Identity Management (PIM), un administrador le ha habilitado para el rol de administrador de usuarios. Antes de poder crear una cuenta de usuario, debe activar el rol.",
      B: "En Microsoft Entra Privileged Identity Management (PIM), un administrador le ha habilitado para el rol de administrador de usuarios. Antes de poder crear una cuenta de usuario, debe instalar la aplicación Microsoft Authenticator.",
      C: "En Microsoft Entra Privileged Identity Management (PIM), un administrador le ha habilitado para el rol de administrador de usuarios. Antes de poder crear una cuenta de usuario, debe solicitar una licencia.",
      D: "En Microsoft Entra Privileged Identity Management (PIM), un administrador le ha habilitado para el rol de administrador de usuarios. Antes de poder crear una cuenta de usuario, debe actualizar la información de su ubicación.",
    },
  },
  "real-ab900-66": {
    prompt: "Abre el centro de administración de Microsoft Entra, como se muestra en la siguiente imagen. ¿Qué acción mejorará más el Identity Secure Score?",
    options: {
      B: "Solucionar la recomendación \"Usar roles administrativos con privilegios mínimos\" mejorará más el Identity Secure Score.",
      C: "Solucionar la recomendación \"Habilitar la directiva de bloqueo de autenticación heredada\" mejorará más el Identity Secure Score.",
      D: "Solucionar la recomendación \"Exigir autenticación multifactor para roles administrativos\" mejorará más el Identity Secure Score.",
    },
  },
  "real-ab900-67": {
    prompt: "¿Con qué puede bloquear automáticamente una cuenta de usuario cuando se detecta un inicio de sesión de riesgo?",
    options: {
      A: "Microsoft Defender for Identity",
      B: "Microsoft Entra ID Protection",
      C: "Microsoft Defender for Office 365",
      D: "Microsoft Entra Privileged Identity Management (PIM)",
    },
  },
  "real-ab900-68": {
    prompt: "Está revisando las directivas de seguridad de su empresa como parte de una estrategia de Zero Trust. ¿Qué afirmación describe con precisión los principios de Zero Trust?",
    options: {
      A: "Zero Trust mejora la experiencia del usuario minimizando las solicitudes de autenticación.",
      B: "Zero Trust asume una vulneración de seguridad y verifica cada solicitud.",
      C: "Zero Trust trata todas las solicitudes de la red de su empresa como confiables.",
      D: "Zero Trust elimina la necesidad de revisar y ajustar regularmente los permisos de acceso.",
    },
  },
  "real-ab900-69": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. Debe crear un informe que muestre los permisos y enlaces de uso compartido activos del contenido almacenado en cuentas de Microsoft OneDrive. ¿Qué debería usar?",
    options: {
      A: "Audit en el portal de Microsoft Defender",
      B: "Informes en el centro de administración de Microsoft 365",
      C: "Gestión de acceso a datos en el centro de administración de SharePoint",
      D: "eDiscovery en el portal de Microsoft Purview",
    },
  },
  "real-ab900-70": {
    statements: [
      "Microsoft usa las indicaciones y respuestas emitidas por los usuarios en Microsoft 365 Copilot para entrenar modelos",
      "Microsoft usa el contenido recuperado de Microsoft Graph para entrenar modelos",
      "Microsoft 365 Copilot respeta los permisos de seguridad en su suscripción de Microsoft 365",
    ],
  },
  "real-ab900-71": {
    prompt:
      "Su empresa usa facturación por uso (pay-as-you-go) para Microsoft 365 Copilot. La empresa desea una mejor visibilidad de los costos de uso de Copilot y la capacidad de predecir el gasto de los departamentos. Debe asegurarse de poder ver los costos de Copilot por departamento. ¿Qué debería usar? (Para responder, seleccione las opciones adecuadas en el área de respuesta. NOTA: cada selección correcta vale un punto.)",
    options: {
      A: "Portal: El centro de administración de Microsoft 365 / Función: Una directiva de facturación",
      B: "Portal: El centro de administración de Microsoft 365 / Función: Un conector de Copilot",
      C: "Portal: El centro de administración de Microsoft Entra / Función: Una directiva de reclamación automática",
      D: "Portal: El centro de administración de Microsoft Entra / Función: Una directiva de facturación",
      E: "Portal: El portal de Microsoft Purview / Función: Un conector de Copilot",
      F: "Portal: El portal de Microsoft Purview / Función: Una directiva de reclamación automática",
    },
  },
  "real-ab900-72": {
    statements: [
      "Los usuarios con una licencia de Microsoft 365 E5 no pueden crear agentes de Microsoft 365 Copilot basados en web",
      "Los usuarios deben tener asignada una licencia de Microsoft 365 Copilot para usar el agente Analyst",
      "Los usuarios pueden usar una indicación en lenguaje natural para crear un agente de Microsoft 365 Copilot",
    ],
  },
  "real-ab900-73": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "Puede usar la solución Audit de Microsoft Purview para encontrar todo el contenido relacionado con el término \"Project Falcon\" en los correos intercambiados entre dos usuarios.",
      B: "Puede usar la solución Data Catalog de Microsoft Purview para encontrar todo el contenido relacionado con el término \"Project Falcon\" en los correos intercambiados entre dos usuarios.",
      C: "Puede usar la solución eDiscovery de Microsoft Purview para encontrar todo el contenido relacionado con el término \"Project Falcon\" en los correos intercambiados entre dos usuarios.",
      D: "Puede usar la solución Insider Risk Management de Microsoft Purview para encontrar todo el contenido relacionado con el término \"Project Falcon\" en los correos intercambiados entre dos usuarios.",
    },
  },
  "real-ab900-74": {
    prompt:
      "Su empresa usa directivas de Microsoft Purview Data Loss Prevention (DLP). Un usuario llamado User1 comparte información confidencial con un usuario externo a través de Microsoft Teams. Debe identificar el contenido confidencial compartido. ¿Qué debería usar en el portal de Microsoft Purview?",
    options: {
      A: "Diagnostics",
      B: "Data Explorer",
      C: "Content Explorer",
      D: "Activity Explorer",
    },
  },
  "real-ab900-75": {
    statements: [
      "Zero Trust requiere una suscripción a Azure",
      "Zero Trust es una estrategia de seguridad, NO un producto específico",
      "A través del centro de administración de Microsoft 365, puede habilitar Zero Trust para su organización",
    ],
  },
  "real-ab900-76": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "Microsoft Copilot Studio contiene señales como el historial de colaboración, la relevancia de documentos y la frecuencia de comunicación, que influyen en las respuestas de Microsoft 365 Copilot.",
      B: "Microsoft Graph contiene señales como el historial de colaboración, la relevancia de documentos y la frecuencia de comunicación, que influyen en las respuestas de Microsoft 365 Copilot.",
      C: "Microsoft Purview contiene señales como el historial de colaboración, la relevancia de documentos y la frecuencia de comunicación, que influyen en las respuestas de Microsoft 365 Copilot.",
      D: "Microsoft Viva Insights contiene señales como el historial de colaboración, la relevancia de documentos y la frecuencia de comunicación, que influyen en las respuestas de Microsoft 365 Copilot.",
    },
  },
  "real-ab900-77": {
    statements: [
      "Los usuarios pueden usar Microsoft 365 Copilot de forma anónima",
      "Los administradores pueden permitir la autocompra de licencias de Microsoft 365 Copilot",
      "Las licencias de Microsoft 365 Copilot se pueden asignar a usuarios invitados de Microsoft Entra ID de otras organizaciones",
    ],
  },
  "real-ab900-78": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. Debe usar Microsoft Purview para cumplir los siguientes requisitos: • Detectar y clasificar datos confidenciales en múltiples plataformas. • Impedir que los usuarios compartan propiedad intelectual con usuarios externos. ¿Qué solución de Microsoft Purview debería usar para cada requisito? (Para responder, seleccione las opciones adecuadas en el área de respuesta. NOTA: cada selección correcta vale un punto.)",
    options: {
      A: "Detectar y clasificar datos confidenciales en múltiples plataformas: Communication Compliance / Impedir compartir propiedad intelectual: Data Loss Prevention",
      B: "Detectar y clasificar datos confidenciales en múltiples plataformas: Data Loss Prevention / Impedir compartir propiedad intelectual: Information Protection",
      C: "Detectar y clasificar datos confidenciales en múltiples plataformas: Data Loss Prevention / Impedir compartir propiedad intelectual: Insider Risk Management",
      D: "Detectar y clasificar datos confidenciales en múltiples plataformas: Information Protection / Impedir compartir propiedad intelectual: Communication Compliance",
      E: "Detectar y clasificar datos confidenciales en múltiples plataformas: Information Protection / Impedir compartir propiedad intelectual: Insider Risk Management",
      F: "Detectar y clasificar datos confidenciales en múltiples plataformas: Insider Risk Management / Impedir compartir propiedad intelectual: Data Loss Prevention",
    },
  },
  "real-ab900-79": {
    prompt: "Su organización tiene una suscripción a Microsoft 365 E5. Debe impedir que los usuarios compartan datos financieros internos de la empresa con usuarios externos. ¿Qué debería usar?",
    options: {
      A: "Grupos de roles",
      B: "Directivas de prevención de pérdida de datos (DLP)",
      C: "Directivas de gestión de riesgos internos",
      D: "Etiquetas de retención",
    },
  },
  "real-ab900-80": {
    prompt: "Debe identificar archivos y correos electrónicos que contengan números de seguro social (SSN) y números de tarjetas de crédito. ¿Qué debería usar en el portal de Microsoft Purview?",
    options: {
      A: "Data Explorer",
      B: "Informes de protección de la información",
      C: "Directivas de protección de la información",
      D: "Activity Explorer",
    },
  },
  "real-ab900-81": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "Las etiquetas de confidencialidad de Microsoft Purview se pueden aplicar a Azure Blob Storage.",
      B: "Las etiquetas de confidencialidad de Microsoft Purview se pueden aplicar a las conversaciones de Microsoft 365 Copilot.",
      C: "Las etiquetas de confidencialidad de Microsoft Purview se pueden aplicar a los sitios de Microsoft SharePoint.",
    },
  },
  "real-ab900-82": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "La búsqueda restringida de SharePoint le permite restringir el acceso administrativo a los sitios de Microsoft SharePoint, sin impedir que los usuarios accedan a los archivos y contenido para los que tienen permisos.",
      B: "La búsqueda restringida de SharePoint le permite restringir el acceso de usuarios invitados a los sitios de Microsoft SharePoint, sin impedir que los usuarios accedan a los archivos y contenido para los que tienen permisos.",
      C: "La búsqueda restringida de SharePoint le permite restringir el acceso de Microsoft 365 Copilot a los sitios de Microsoft SharePoint, sin impedir que los usuarios accedan a los archivos y contenido para los que tienen permisos.",
      D: "La búsqueda restringida de SharePoint le permite restringir el acceso de Microsoft Purview eDiscovery a los sitios de Microsoft SharePoint, sin impedir que los usuarios accedan a los archivos y contenido para los que tienen permisos.",
    },
  },
  "real-ab900-83": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365 E5. Crea una etiqueta de confidencialidad de Microsoft Purview llamada \"Label1\". Debe asegurarse de que los usuarios puedan aplicar \"Label1\" a los archivos en Microsoft 365. ¿Qué debería usar?",
    options: {
      A: "Una directiva de etiquetas de confidencialidad",
      B: "Un clasificador entrenable",
      C: "Una directiva de etiquetas de retención",
      D: "Una directiva de etiquetado automático",
    },
  },
  "real-ab900-84": {
    prompt: "Su empresa tiene una directiva de cumplimiento por escrito que exige que todos los correos electrónicos se retengan durante siete años y luego se eliminen permanentemente. ¿Qué solución de Microsoft Purview debería usar?",
    options: {
      A: "Protección de la información",
      B: "Gestión del ciclo de vida de datos",
      C: "Prevención de pérdida de datos",
      D: "Gestión de riesgos internos",
    },
  },
  "real-ab900-85": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "En el centro de administración de Microsoft 365, la métrica \"Créditos usados\" en el informe de créditos de Copilot muestra el número total de créditos consumidos por los usuarios de su organización que usan Microsoft Teams e interactúan con agentes basados en el trabajo en el chat de Microsoft 365 Copilot.",
      B: "En el centro de administración de Microsoft 365, la métrica \"Créditos usados\" en el informe de créditos de Copilot muestra el número total de créditos consumidos por usuarios que no pertenecen a su organización e interactúan con agentes empresariales en el chat de Microsoft 365 Copilot.",
      C: "En el centro de administración de Microsoft 365, la métrica \"Créditos usados\" en el informe de créditos de Copilot muestra el número total de créditos consumidos por los usuarios de su organización a quienes se les ha asignado una licencia de Microsoft 365 Copilot e interactúan con agentes basados en el trabajo en el chat de Microsoft 365 Copilot.",
      D: "En el centro de administración de Microsoft 365, la métrica \"Créditos usados\" en el informe de créditos de Copilot muestra el número total de créditos usados por los usuarios de su organización a quienes NO se les ha asignado una licencia de Microsoft 365 Copilot e interactúan con agentes basados en el trabajo en el chat de Microsoft 365 Copilot.",
    },
  },
  "real-ab900-86": {
    prompt:
      "Tiene un sitio de Microsoft SharePoint llamado \"Site1\" y un grupo de seguridad llamado \"Group1\". Desea impedir que todos los usuarios que actualmente tienen acceso a \"Site1\" puedan acceder al contenido del sitio, a menos que el usuario también sea miembro del grupo \"Group1\". ¿Qué configuraciones debería configurar? (Para responder, seleccione las configuraciones adecuadas en el área de respuesta.)",
    options: {
      A: "Correo electrónico",
      B: "Privacidad",
      C: "Uso compartido de archivos externo",
      D: "Etiqueta de confidencialidad",
      E: "Restringir el descubrimiento de contenido",
      F: "Acceso restringido al sitio",
    },
  },
  "real-ab900-87": {
    statements: [
      "Microsoft 365 Copilot respeta las etiquetas de confidencialidad de Microsoft Purview",
      "Microsoft 365 Copilot ignora las directivas de prevención de pérdida de datos (DLP) de Microsoft Purview",
    ],
  },
  "real-ab900-88": {
    statements: [
      "Una etiqueta de confidencialidad se puede aplicar a un sitio de Microsoft SharePoint",
      "Una etiqueta de confidencialidad se puede aplicar a un mensaje de correo electrónico en Microsoft Exchange",
      "Una etiqueta de confidencialidad se puede aplicar a dispositivos Windows 11",
    ],
  },
  "real-ab900-89": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. Su empresa ha adquirido recientemente licencias de Microsoft 365 Copilot para algunos usuarios. Debe determinar cuántos usuarios sin licencia han usado Copilot en Microsoft Teams. ¿Qué informe de uso debería usar en el centro de administración de Microsoft 365?",
    options: {
      A: "Microsoft 365 Copilot Chat",
      B: "Microsoft 365 Copilot Search",
      C: "Microsoft 365 Apps",
      D: "Microsoft 365 Copilot",
    },
  },
  "real-ab900-90": {
    prompt:
      "Un usuario llamado \"User1\" es responsable del informe trimestral de ingresos. \"User1\" necesita detectar tendencias de rendimiento, obtener información visual y crear un resumen de anomalías en varios archivos que contienen diferentes conjuntos de datos. ¿Qué debería usar?",
    options: {
      A: "El agente \"Analyst\" en Microsoft 365 Copilot",
      B: "El agente \"Researcher\" en Microsoft 365 Copilot",
      C: "La búsqueda de Microsoft 365 Copilot",
      D: "Copilot en Excel",
    },
  },
  "real-ab900-91": {
    prompt: "Su empresa está evaluando actualmente el licenciamiento de Microsoft 365 Copilot. ¿En qué escenario debería usarse la facturación por uso?",
    options: {
      A: "Para dar a los usuarios acceso al asistente de IA en Copilot en Word",
      B: "Para resumir las acciones en las reuniones de Microsoft Teams",
      C: "Para generar imágenes en chats Premium",
      D: "Para proporcionar un agente personalizado a usuarios sin licencia",
    },
  },
  "real-ab900-92": {
    prompt: "Usa Microsoft 365 Copilot. Desea programar una indicación para que se ejecute a medianoche. ¿Qué tarea debería incluir en su solución?",
    options: {
      A: "Crear un agente.",
      B: "Crear un notebook.",
      C: "Ejecutar la indicación.",
      D: "Guardar la indicación.",
    },
  },
  "real-ab900-93": {
    prompt:
      "Su empresa planea implementar Microsoft 365 Copilot. Debe habilitar a un usuario para usar Microsoft 365 Copilot, incluidos los agentes \"Researcher\" y \"Analyst\". ¿Qué debería usar?",
    options: {
      A: "El centro de administración de Microsoft 365",
      B: "El portal de Microsoft Purview",
      C: "El centro de administración de Microsoft Entra",
      D: "El portal de Microsoft Defender",
    },
  },
  "real-ab900-94": {
    prompt:
      "Su empresa está considerando usar Microsoft 365 Copilot con facturación por uso (Pay-as-you-go) en lugar de comprar una licencia de Microsoft 365 Copilot. ¿En qué escenario se aplica la facturación por uso?",
    options: {
      A: "Realizar razonamiento de varios pasos usando el agente Researcher",
      B: "Crear un resumen de una reunión de Microsoft Teams",
      C: "Usar un agente personalizado basado en datos de trabajo",
      D: "Usar el asistente de IA para editar un documento en Copilot en Word",
    },
  },
  "real-ab900-95": {
    prompt:
      "Su empresa tiene un sitio de Microsoft SharePoint llamado \"Site1\". \"Site1\" contiene todas las políticas del departamento de recursos humanos de la empresa. Las políticas se almacenan como documentos de Microsoft Word. Todos los usuarios tienen acceso de lectura a \"Site1\". El jefe de recursos humanos informa que las consultas de los usuarios sobre las políticas NO se manejan de manera oportuna, especialmente en torno a las fechas festivas principales. Debe proponer una solución que permita a los usuarios encontrar las políticas de recursos humanos. La solución debe proporcionar a los usuarios una lista de preguntas frecuentes y garantizar que las respuestas se basen exclusivamente en Site1. ¿Qué debería incluir en su recomendación?",
    options: {
      A: "El asistente personal en Copilot en Word",
      B: "Un agente personalizado de Microsoft 365 Copilot",
      C: "El agente Researcher en Microsoft 365 Copilot",
      D: "Un notebook de Microsoft 365 Copilot",
    },
  },
  "real-ab900-96": {
    prompt: "Seleccione la respuesta que completa correctamente la frase.",
    options: {
      A: "Desde el portal de Microsoft Purview, puede usar Data Explorer para crear y gestionar directivas de privacidad.",
      B: "Desde el portal de Microsoft Purview, puede usar Data Explorer para buscar contenido en buzones y sitios.",
      C: "Desde el portal de Microsoft Purview, puede usar Data Explorer para identificar información confidencial y sus ubicaciones de almacenamiento.",
      D: "Desde el portal de Microsoft Purview, puede usar Data Explorer para verificar la eficacia de sus directivas de prevención de pérdida de datos (DLP).",
    },
  },
  "real-ab900-97": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365 que contiene un sitio de Microsoft SharePoint llamado \"Site1\". Debe determinar todos los cambios realizados por un administrador de sitio en la configuración del sitio \"Site1\". ¿Qué informe debería usar en el centro de administración de SharePoint? (Para responder, seleccione el informe adecuado en el área de respuesta.)",
    options: {
      A: "Agent Insights",
      B: "Gestión del catálogo de App Insights",
      D: "Historial de cambios",
      E: "Gobernanza de acceso a datos",
      F: "Cuentas de OneDrive",
    },
  },
  "real-ab900-98": {
    statements: [
      "Microsoft Purview Communications Compliance puede detectar texto ofensivo en imágenes almacenadas en sitios de Microsoft SharePoint",
      "Microsoft Purview Communications Compliance anonimiza las identidades de los usuarios de forma predeterminada durante las investigaciones",
      "Microsoft Purview Communications Compliance agrega una exención de responsabilidad a todas las comunicaciones supervisadas",
    ],
  },
  "real-ab900-99": {
    prompt:
      "Su organización tiene una suscripción a Microsoft 365. A todos los usuarios se les ha asignado una licencia de Microsoft 365 Copilot. Debe impedir que los usuarios creen imágenes con Copilot. ¿Qué debería usar?",
    options: {
      A: "El portal de Microsoft Defender",
      B: "El centro de administración de Microsoft Entra",
      C: "El portal de Microsoft Purview",
      D: "El centro de administración de Microsoft 365",
    },
  },
  "real-ab900-100": {
    statements: [
      "Los administradores pueden bloquear sitios específicos para su uso por Microsoft 365 Copilot",
      "Los administradores pueden impedir que Microsoft 365 Copilot use la búsqueda web al responder a las consultas de los usuarios",
      "Los administradores pueden bloquear el acceso al agente Researcher en Microsoft 365 Copilot mientras permiten el acceso al agente Analyst",
    ],
  },
  "real-ab900-101": {
    prompt:
      "Debe asegurarse de que los usuarios puedan usar un sistema externo como fuente de conocimiento para agentes personalizados de Microsoft 365 Copilot. ¿Qué debería configurar en el centro de administración de Microsoft 365? (Para responder, seleccione las configuraciones adecuadas en el área de respuesta.)",
    options: {
      A: "Copilot – Conectores",
      B: "Copilot – Búsqueda",
      C: "Copilot – Configuración",
      D: "Agentes – Información general",
      E: "Agentes – Herramientas",
      F: "Agentes – Configuración",
    },
  },
};

export default ab900_es;
