import type { QuestionTranslations } from "./types";

// Arabic (العربية) translations of AB900_QUESTIONS (Microsoft 365 Copilot).
// Hand-translated from the German source in lib/ab900Practice.ts, with
// Microsoft product/feature names kept in their official English form —
// standard practice in Arabic technical/IT writing (same convention
// already established in ab900.fa.ts for Farsi).
//
// PROGRESS: 100% COMPLETE. All 101 of 101 questions translated
// (real-ab900-1 through real-ab900-101). Anything not listed here
// falls back to German (shouldn't occur, but kept as a safety net).

const ab900_ar: QuestionTranslations = {
  "real-ab900-1": {
    prompt: "لكل عبارة من العبارات التالية، اختر «نعم» إذا كانت العبارة صحيحة. وإلا، اختر «لا».",
    statements: [
      "لاستخدام Microsoft 365 Copilot Chat للاستدلال على بيانات الويب، تحتاج إلى ترخيص Microsoft 365 Copilot",
      "لاستخدام وكيل Researcher في Microsoft 365 Copilot، تحتاج إلى ترخيص Microsoft 365 Copilot",
      "لإضافة وكيل في تطبيق Microsoft 365 Copilot، تحتاج إلى ترخيص Microsoft 365 Copilot",
    ],
  },
  "real-ab900-2": {
    prompt: "لكل عبارة من العبارات التالية، اختر «نعم» إذا كانت العبارة صحيحة. وإلا، اختر «لا».",
    statements: [
      "يعرض Microsoft 365 Copilot فقط البيانات التنظيمية التي يملك المستخدمون الأفراد أذونات للوصول إليها",
      "يستخدم Microsoft 365 Copilot نفس عناصر التحكم الأساسية للوصول إلى البيانات مثل خدمات Microsoft 365 الأخرى",
      "يمكن لـ Microsoft 365 Copilot استخدام موصلات (connectors) لاسترجاع معلومات من مصادر بيانات تابعة لجهات خارجية",
    ],
  },
  "real-ab900-3": {
    prompt: "في Microsoft 365 Copilot، يجب استخدام ___ لإجراء استدلال متعدد الخطوات على بيانات غير منظمة.",
    options: { A: "دفتر ملاحظات (notebook)", B: "Chat", C: "وكيل Analyst", D: "وكيل Researcher" },
  },
  "real-ab900-4": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365 E5. يجب عليك التأكد من أن خدمة سحابية تابعة لجهة خارجية يمكنها المصادقة مع Microsoft Entra. ماذا يجب أن تُهيّئ؟",
    options: {
      A: "موصل Microsoft 365 Copilot",
      B: "المصادقة متعددة العوامل (MFA)",
      C: "سياسة Conditional Access",
      D: "تسجيل تطبيق (app registration)",
    },
  },
  "real-ab900-5": {
    prompt: "مبدأ مايكروسوفت للذكاء الاصطناعي المسؤول المتعلق بـ ___ يتطلب مراقبة أنظمة الذكاء الاصطناعي لضمان بقاء السيطرة بيد البشر.",
    options: {
      A: "المساءلة (accountability)",
      B: "الشمولية (inclusiveness)",
      C: "الخصوصية والأمان",
      D: "الموثوقية والأمان",
      E: "الشفافية",
    },
  },
  "real-ab900-6": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. يجب عليك تقييم Identity Secure Score الخاص بمؤسستك. ما هما العاملان اللذان يؤثران على النتيجة؟ (كل إجابة صحيحة تمثل حلاً كاملاً. ملاحظة: كل اختيار صحيح يستحق نقطة واحدة.)",
    options: {
      A: "أذونات موقع SharePoint",
      B: "عدد المسؤولين العامين (global administrators)",
      C: "كلمات المرور التي لا تنتهي صلاحيتها أبداً",
      D: "موقع المستخدمين",
    },
  },
  "real-ab900-7": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. يجب عليك مراجعة تأثير حادثة تصيد احتيالي (phishing) استهدفت مؤخراً مستخدمي البريد الإلكتروني. ماذا يجب أن تستخدم؟",
    options: {
      A: "بوابة Microsoft Defender",
      B: "مركز إدارة Microsoft 365",
      C: "مركز إدارة Microsoft Entra",
      D: "مركز إدارة Microsoft Exchange",
    },
  },
  "real-ab900-8": {
    prompt: "لدى مؤسستك اشتراك Microsoft 365. يجب عليك تعيين ترخيص لمستخدم. ماذا يجب أن تستخدم؟",
    options: {
      A: "بوابة Microsoft Purview",
      B: "مركز إدارة Microsoft 365",
      C: "مركز إدارة Microsoft Teams",
    },
  },
  "real-ab900-9": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "يسترجع Microsoft 365 Copilot البيانات من Azure OpenAI باستخدام Microsoft Graph.",
      B: "يسترجع Microsoft 365 Copilot البيانات من مستخدمين خارجيين باستخدام Microsoft Graph.",
      C: "يسترجع Microsoft 365 Copilot البيانات من ملفات Microsoft SharePoint باستخدام Microsoft Graph.",
      D: "يسترجع Microsoft 365 Copilot البيانات من محركات بحث الإنترنت باستخدام Microsoft Graph.",
    },
  },
  "real-ab900-10": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "يوفر Microsoft Entra Privileged Identity Management (PIM) وصولاً محدوداً إلى خدمات Microsoft 365.",
      B: "يوفر Microsoft Entra Privileged Identity Management (PIM) إدارة دورة حياة المستخدم.",
      C: "يوفر Microsoft Entra Privileged Identity Management (PIM) إدارة تطبيقات المؤسسة.",
      D: "يوفر Microsoft Entra Privileged Identity Management (PIM) تعيين أدوار محدود زمنياً.",
    },
  },
  "real-ab900-11": {
    prompt:
      "ينتقل مستخدم يُدعى User5 إلى https://myapps.microsoft.com. بعد إدخال اسم المستخدم وكلمة المرور، يتلقى User5 الرسالة التالية على جهازه المحمول. استخدم القوائم المنسدلة لاختيار الإجابة التي تكمل العبارة بناءً على المعلومات الموضحة في الرسم البياني.",
    options: {
      A: "يستخدم User5 رمز مرور لمرة واحدة عبر البريد الإلكتروني (Email OTP) للمصادقة متعددة العوامل (MFA).",
      B: "يستخدم User5 تطبيق Microsoft Authenticator للمصادقة متعددة العوامل (MFA).",
      C: "يستخدم User5 الرسائل النصية القصيرة (SMS) للمصادقة متعددة العوامل (MFA).",
      D: "يستخدم User5 كلمة مرور وصول مؤقتة للمصادقة متعددة العوامل (MFA).",
    },
  },
  "real-ab900-12": {
    prompt: "لكل عبارة من العبارات التالية، اختر «نعم» إذا كانت العبارة صحيحة. وإلا، اختر «لا». (ملاحظة: كل اختيار صحيح يستحق نقطة واحدة.)",
    statements: [
      "يوفر Microsoft Defender for Office 365 حماية من هجمات التصيد الاحتيالي والبرمجيات الخبيثة",
      "يراقب Microsoft Defender for Identity الهويات في نطاقات Active Directory",
      "توفر إدارة الثغرات في Microsoft Defender حماية لتطبيقات البرمجيات كخدمة (SaaS)",
    ],
  },
  "real-ab900-13": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365 يحتوي على موقع Microsoft SharePoint يُدعى Site1. أذونات Site1 مُهيّأة كما هو موضح في الصورة التالية. تُنشئ مستخدماً جديداً يُدعى User1 في الاشتراك. استخدم القوائم المنسدلة لاختيار الإجابة التي تكمل العبارة بناءً على المعلومات الموضحة في الرسم البياني.",
    options: {
      A: "User1 هو زائر (visitor) في Site1.",
      B: "User1 هو مالك (owner) لـ Site1.",
      C: "User1 هو عضو (member) في Site1.",
      D: "User1 محظور من الوصول إلى Site1.",
    },
  },
  "real-ab900-14": {
    prompt:
      "تُطبّق شركة متعددة الجنسيات لديها أكثر من 5000 مستخدم Microsoft 365 Copilot. تمتلك الشركة حالياً مزيجاً من تراخيص Microsoft 365 E3 و Office 365 E3 لموظفي المعرفة لديها. يجب على مسؤول تقنية المعلومات ضمان قدرة جميع المستخدمين على الوصول إلى قدرات الذكاء الاصطناعي التوليدي الكاملة لـ Copilot في تطبيقات مثل Word و Excel. ما هو الحد الأدنى من إجراء الترخيص المطلوب لتمكين جميع موظفي المعرفة الحاليين من الوصول إلى Microsoft 365 Copilot؟",
    options: {
      A: "ترقية جميع تراخيص Office 365 E3 الحالية إلى تراخيص Microsoft 365 E5.",
      B: "شراء ترخيص Microsoft 365 Copilot الإضافي المنفصل لجميع المستخدمين.",
      C: "تحويل جميع التراخيص الحالية من خطط المؤسسات إلى خطط Microsoft 365 Business Premium.",
      D: "شراء ترخيص Microsoft 365 Copilot الإضافي فقط للمستخدمين الذين لديهم تراخيص Microsoft 365 E3، لأن Office 365 E3 غير مؤهل.",
    },
  },
  "real-ab900-15": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "عندما يشارك مستخدم وكيل Microsoft 365 Copilot، يمكنك استخدام Microsoft Foundry لمنع المستخدمين من استخدام الوكيل.",
      B: "عندما يشارك مستخدم وكيل Microsoft 365 Copilot، يمكنك استخدام Microsoft Copilot Studio لمنع المستخدمين من استخدام الوكيل.",
      C: "عندما يشارك مستخدم وكيل Microsoft 365 Copilot، يمكنك استخدام مركز إدارة Microsoft 365 لمنع المستخدمين من استخدام الوكيل.",
      D: "عندما يشارك مستخدم وكيل Microsoft 365 Copilot، يمكنك استخدام بوابة Power Apps لمنع المستخدمين من استخدام الوكيل.",
    },
  },
  "real-ab900-16": {
    prompt:
      "حصل فريق إدارة تقنية المعلومات في مؤسستك، Contoso Ltd.، على اسم نطاق جديد، contosoglobal.com، ويحتاج إلى إضافته في بيئة Microsoft 365 الخاصة به. سيُستخدم هذا النطاق الجديد لجميع أسماء المستخدمين الأساسية (UPNs) الجديدة وعناوين البريد الإلكتروني. أي قسم من مركز إدارة Microsoft 365 يجب أن يستخدمه المسؤول لإدارة النطاق الجديد والتحقق منه وتعيينه كافتراضي للمستخدمين الجدد؟",
    options: {
      A: "الإعدادات > إعدادات المؤسسة > الخدمات",
      B: "الفوترة > التراخيص > قائمة المنتجات",
      C: "الإعداد > إعداد النطاق > ربط نطاق",
      D: "الإعدادات > النطاقات",
    },
  },
  "real-ab900-17": {
    prompt:
      "تلقّى مستخدم في القسم المالي رسالة تصيّد احتيالي متطورة تحتوي على رابط ضار تم تحييده. يحتاج فريق الأمان إلى عرض مركزي واحد لمراجعة الجدول الزمني للحادثة، والتنبيهات ذات الصلة (البريد الإلكتروني ونقاط النهاية)، والإجراءات الموصى بها لتعزيز وضع الأمان للبريد الإلكتروني ونقاط النهاية. أي ميزة في Defender XDR أو أي قسم من البوابة يوفر لفريق الأمان هذا العرض الموحد للحادثة وتوصيات التحسين؟",
    options: {
      A: "Microsoft Defender for Identity",
      B: "Microsoft Defender for Office 365",
      C: "Microsoft Defender Vulnerability Management",
      D: "تجربة الحوادث والتنبيهات الموحدة إلى جانب Secure Score في بوابة Microsoft Defender",
    },
  },
  "real-ab900-18": {
    prompt:
      "مُنع مستخدم من تسجيل الدخول، ويشتبه المسؤول في وجود Conditional Access أو اكتشاف علامة خطر (risk signal). ما هما الأداتان في مركز إدارة Microsoft Entra اللتان يجب على المسؤول استخدامهما أولاً لتحديد خطأ تسجيل الدخول الدقيق والسياسة المسؤولة عنه؟ (كل اختيار صحيح يمثل جزءاً من الحل. ملاحظة: كل اختيار صحيح يستحق نقطة واحدة.)",
    options: {
      A: "أداة Conditional Access What If",
      B: "لوحة معلومات حالة خدمة Microsoft 365",
      C: "سجلات تسجيل الدخول واستكشاف الأخطاء وإصلاحها والدعم في Microsoft Entra ID",
      D: "تتبع الرسائل في Exchange Online",
      E: "بروكسي تطبيقات Microsoft Entra ID",
    },
  },
  "real-ab900-19": {
    prompt: "لكل عبارة من العبارات التالية، اختر «نعم» إذا كانت العبارة صحيحة. وإلا، اختر «لا». (ملاحظة: كل اختيار صحيح يستحق نقطة واحدة.)",
    statements: [
      "يوفر Microsoft Purview Compliance Manager تقييماً للامتثال قائماً على المخاطر لمساعدتك على فهم وضعك من حيث الامتثال",
      "يوفر Microsoft Purview Compliance Manager إرشادات خطوة بخطوة لمعالجة مشكلات الامتثال",
      "Compliance Manager جزء من Microsoft Defender",
    ],
  },
  "real-ab900-20": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. تلاحظ أن ملفات Microsoft SharePoint تُشارَك مع مستخدمين خارج مؤسستك. يجب عليك معرفة أي ملفات تُشارَك مع المستخدمين الخارجيين. أي تقرير يجب أن تستخدمه في مركز إدارة SharePoint؟ (للإجابة، اختر التقرير المناسب في منطقة الإجابة.)",
    options: {
      A: "رؤى الوكلاء (Agent insights)",
      B: "رؤى التطبيقات (App insights)",
      C: "سجل التغييرات",
      D: "إدارة الوصول إلى البيانات",
      E: "حسابات OneDrive",
      F: "مقارنة سياسات المواقع",
    },
  },
  "real-ab900-21": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. يطلب قسم الموارد البشرية في شركتك نسخة من جميع الملفات التي عدّلها مؤخراً مستخدم يُدعى User1. ماذا يجب أن تستخدم في بوابة Microsoft Purview؟ (للإجابة، اختر الحلول المناسبة في منطقة الإجابة.)",
    options: {
      A: "التدقيق (Audit)",
      B: "كتالوج البيانات",
      C: "منع فقدان البيانات",
      D: "eDiscovery",
      E: "حماية المعلومات",
      F: "إدارة مخاطر الداخل (Insider Risk)",
    },
  },
  "real-ab900-22": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. يجب عليك استخدام Microsoft Purview لتلبية المتطلبات التالية: • منع المستخدمين من مشاركة الملفات التي تحتوي على معلومات تعريف شخصية (PII). • استخدام التعلم الآلي لتدريب نموذج يكتشف المحتوى الحساس. أي حل من Microsoft Purview يجب أن تستخدمه لكل متطلب؟ (للإجابة، اختر الخيارات المناسبة في منطقة الإجابة. ملاحظة: كل اختيار صحيح يستحق نقطة واحدة.)",
    options: {
      A: "منع مشاركة PII: Communication Compliance / التعلم الآلي لتدريب نموذج: Data Loss Prevention",
      B: "منع مشاركة PII: Data Loss Prevention / التعلم الآلي لتدريب نموذج: Information Protection",
      C: "منع مشاركة PII: Information Protection / التعلم الآلي لتدريب نموذج: Insider Risk Management",
      D: "منع مشاركة PII: Insider Risk Management / التعلم الآلي لتدريب نموذج: Communication Compliance",
      E: "منع مشاركة PII: Data Loss Prevention / التعلم الآلي لتدريب نموذج: DSPM for AI",
      F: "منع مشاركة PII: DSPM for AI / التعلم الآلي لتدريب نموذج: Insider Risk Management",
    },
  },
  "real-ab900-23": {
    prompt:
      "تريد عرض الإجراءات الإدارية التي قام بها مسؤول خدمة في Microsoft 365. لكل عبارة من العبارات التالية، اختر «نعم» إذا كانت العبارة صحيحة. وإلا، اختر «لا». (ملاحظة: كل اختيار صحيح يستحق نقطة واحدة.)",
    options: {
      A: "يمكنك استخدام Search & Intelligence في مركز إدارة Microsoft 365: نعم / يمكنك استخدام Audit في بوابة Microsoft Defender: نعم / يمكنك استخدام Audit في بوابة Microsoft Purview: نعم",
      B: "يمكنك استخدام Search & Intelligence في مركز إدارة Microsoft 365: نعم / يمكنك استخدام Audit في بوابة Microsoft Defender: نعم / يمكنك استخدام Audit في بوابة Microsoft Purview: لا",
      C: "يمكنك استخدام Search & Intelligence في مركز إدارة Microsoft 365: نعم / يمكنك استخدام Audit في بوابة Microsoft Defender: لا / يمكنك استخدام Audit في بوابة Microsoft Purview: نعم",
      D: "يمكنك استخدام Search & Intelligence في مركز إدارة Microsoft 365: لا / يمكنك استخدام Audit في بوابة Microsoft Defender: نعم / يمكنك استخدام Audit في بوابة Microsoft Purview: لا",
      E: "يمكنك استخدام Search & Intelligence في مركز إدارة Microsoft 365: لا / يمكنك استخدام Audit في بوابة Microsoft Defender: لا / يمكنك استخدام Audit في بوابة Microsoft Purview: نعم",
      F: "يمكنك استخدام Search & Intelligence في مركز إدارة Microsoft 365: لا / يمكنك استخدام Audit في بوابة Microsoft Defender: لا / يمكنك استخدام Audit في بوابة Microsoft Purview: لا",
    },
  },
  "real-ab900-24": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "تُهيَّأ سياسات Conditional Access عبر بوابة Microsoft Defender.",
      B: "تُطبَّق سياسات Conditional Access فقط على الموارد المحلية.",
      C: "توفر سياسات Conditional Access تحكماً في كيفية وصول المستخدمين إلى تطبيقات السحابة.",
      D: "تتطلب سياسات Conditional Access صندوق بريد Microsoft Exchange.",
    },
  },
  "real-ab900-25": {
    prompt:
      "يجب على مسؤول إدارة الوصول إلى موقع SharePoint حساس تابع للموارد البشرية وتعيين تراخيص Copilot الإضافية لأعضاء فريق \"HR-Data-Users\" الخمسين. تتغير العضوية بشكل متكرر بسبب معدل دوران مرتفع. أي كائن من Microsoft Entra هو الخيار الأكثر كفاءة لكل من التحكم في الوصول وإدارة المجموعات القائمة على الترخيص؟",
    options: {
      A: "مجموعة أمان ديناميكية (Dynamic security group)",
      B: "مجموعة أمان ممكّنة للبريد الإلكتروني",
      C: "مجموعة Microsoft 365",
      D: "قائمة توزيع",
    },
  },
  "real-ab900-26": {
    prompt: "أنت تستخدم Microsoft 365 Copilot. بماذا ينشئ Copilot الإجابات بناءً على بيانات الشركة المخزنة في Microsoft SharePoint؟",
    options: {
      A: "Microsoft Intune",
      B: "Microsoft Defender",
      C: "Microsoft Graph",
      D: "Microsoft Purview",
    },
  },
  "real-ab900-27": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "يمكنك استخدام حل Data Lifecycle Management من Microsoft Purview لاكتشاف مُدخلات Microsoft 365 Copilot التي تحتوي على معلومات حساسة.",
      B: "يمكنك استخدام حل DSPM for AI من Microsoft Purview لاكتشاف مُدخلات Microsoft 365 Copilot التي تحتوي على معلومات حساسة.",
      C: "يمكنك استخدام حل Information Barriers من Microsoft Purview لاكتشاف مُدخلات Microsoft 365 Copilot التي تحتوي على معلومات حساسة.",
      D: "يمكنك استخدام حل Information Protection من Microsoft Purview لاكتشاف مُدخلات Microsoft 365 Copilot التي تحتوي على معلومات حساسة.",
    },
  },
  "real-ab900-28": {
    prompt:
      "يطلب مستخدم من قسم التسويق من Copilot تلخيص \"أحدث اقتراح ميزانية\" المخزّن على موقع SharePoint المتاح فقط للقسم المالي. مستخدم التسويق ليس عضواً في الموقع. أي مبدأ يتحكم في سلوك Copilot ويمنعه من إرجاع المحتوى المقيّد؟",
    options: {
      A: "يطبّق Copilot التحقق من Zero-Trust قبل معالجة الطلب.",
      B: "يستخدم Copilot فقط المحتوى المُعلَّم صراحةً بتصنيف حساسية معيّن.",
      C: "يفرض Copilot بصرامة أذونات Microsoft 365 الحالية للمستخدم ولا يُرجع محتوى لا يملك المستخدم صلاحية الوصول إليه.",
      D: "يقوم Microsoft Purview DLP تلقائياً بإخفاء الأرقام المالية في إجابات Copilot.",
    },
  },
  "real-ab900-29": {
    prompt:
      "عندما يسأل مستخدم Copilot: \"ما هي المستندات الحديثة التي شُورِكَت معي حول 'مشروع فينيكس'؟\"، يُرجع Copilot مستندات مخصصة من OneDrive و SharePoint و Teams. ما هو الدور الرئيسي الذي يلعبه Microsoft Graph في تمكين هذه الإجابة؟",
    options: {
      A: "يوفر لنموذج اللغة الكبير (LLM) معرفته العالمية المُدرَّبة مسبقاً.",
      B: "يعمل كمحرك للامتثال لسياسات التحرير.",
      C: "يعمل كفهرس دلالي (semantic index) يربط طلب المستخدم بسياق وعلاقات وأذونات المستخدم للبيانات التنظيمية.",
      D: "يفرض سياسات Conditional Access في الوقت الفعلي.",
    },
  },
  "real-ab900-30": {
    statements: [
      "لكي يتمكن المسؤولون من استخدام SharePoint Advanced Management، يحتاج جميع المستخدمين في مؤسستك إلى ترخيص Microsoft 365 Copilot",
      "يمكن لـ SharePoint Advanced Management أن يساعد في تقييد وصول Microsoft 365 Copilot إلى محتوى Microsoft SharePoint",
      "يتوفر SharePoint Advanced Management كترخيص مستقل للمؤسسات التي لا تملك Microsoft 365 Copilot",
    ],
  },
  "real-ab900-31": {
    prompt:
      "يُظهر وكيل ذكاء اصطناعي يتم إعداده لتلخيص سجلات العملاء تحيّزاً لصالح مناطق جغرافية معينة. أي مبدأ من مبادئ Microsoft Responsible AI يُنتهك بشكل أساسي ويجب معالجته قبل النشر؟",
    options: {
      A: "العدالة (Fairness)",
      B: "الشفافية",
      C: "المسؤولية",
      D: "الشمولية",
    },
  },
  "real-ab900-32": {
    prompt:
      "يحتاج فريق الامتثال إلى تقرير يسرد مواقع SharePoint التي تحتوي على مستندات شديدة الحساسية ولكن تُشارَك مع مجموعات كبيرة مثل \"الجميع باستثناء المستخدمين الخارجيين\". أي ميزة من مايكروسوفت مصممة لإنشاء تقارير Data Access Governance (DAG) التي تحدد المحتوى الحساس بالإضافة إلى ممارسات المشاركة الأكثر تساهلاً؟",
    options: {
      A: "Microsoft Entra ID Protection",
      B: "Microsoft Purview Data Loss Prevention (DLP)",
      C: "Microsoft Defender for Cloud Apps",
      D: "SharePoint Advanced Management (SAM)",
    },
  },
  "real-ab900-33": {
    prompt: "لديك موقع Microsoft SharePoint كما هو موضح في الصورة التالية. يجب عليك عرض إعدادات SLabel1. ماذا يجب أن تستخدم؟",
    options: {
      A: "بوابة Microsoft Defender",
      B: "مركز إدارة SharePoint",
      C: "مركز إدارة Microsoft 365",
      D: "بوابة Microsoft Purview",
    },
  },
  "real-ab900-34": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "يمكنك استخدام Microsoft Defender for Office 365 لمراجعة مؤشرات التهديد المترابطة عبر حوادث البريد الإلكتروني والهوية والجهاز في عرض واحد.",
      B: "يمكنك استخدام Microsoft Defender XDR لمراجعة مؤشرات التهديد المترابطة عبر حوادث البريد الإلكتروني والهوية والجهاز في عرض واحد.",
      C: "يمكنك استخدام Microsoft Purview Compliance Manager لمراجعة مؤشرات التهديد المترابطة عبر حوادث البريد الإلكتروني والهوية والجهاز في عرض واحد.",
      D: "يمكنك استخدام Microsoft Purview Data Loss Prevention لمراجعة مؤشرات التهديد المترابطة عبر حوادث البريد الإلكتروني والهوية والجهاز في عرض واحد.",
    },
  },
  "real-ab900-35": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365 يحتوي على مستخدم يُدعى User1. يخطط User1 لمغادرة شركتك خلال أسبوعين. يجب عليك تسجيل أنشطة User1 لتحديد ما إذا كان المستخدم يُسرّب بيانات. أي حل من Microsoft Purview يجب أن تستخدمه؟",
    options: {
      A: "Communication Compliance",
      B: "Data Security Posture Management",
      C: "Insider Risk Management",
      D: "Data Lifecycle Management",
    },
  },
  "real-ab900-36": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365 يحتوي على مواقع Microsoft SharePoint وفرق Microsoft Teams. تلاحظ أن المواقع والفرق تُشارَك مع مستخدمين خارج مؤسستك. يجب عليك معرفة أي مواقع وفرق شُورِكَت مع المستخدمين الخارجيين. ماذا يجب أن تستخدم؟",
    options: {
      A: "مركز إدارة SharePoint",
      B: "مركز إدارة Microsoft Teams",
      C: "مركز إدارة Microsoft 365",
      D: "بوابة Microsoft Defender",
    },
  },
  "real-ab900-37": {
    prompt:
      "تطلب إحدى المؤسسات ألا يُدرج Copilot أبداً نتائج من عمليات بحث الويب العامة في الإجابات، لتجنب احتمال الكشف عن مطالبات/بيانات داخلية. أي ميزة من ميزات Copilot يجب على المسؤول تعطيلها لحظر أساس الويب (web grounding) لإجابات Copilot؟",
    options: {
      A: "Copilot في Word",
      B: "Copilot for Microsoft 365",
      C: "Copilot Chat",
      D: "ميزات Copilot في تطبيقات Microsoft 365",
    },
  },
  "real-ab900-38": {
    statements: [
      "يمكن استخدام تقرير استخدام Microsoft 365 Copilot لعرض المطالبات (prompts) التي أرسلها المستخدمون إلى Copilot",
      "يعرض تقرير استخدام Microsoft 365 Copilot العدد الإجمالي للمستخدمين الفريدين في مؤسستك",
      "يعرض تقرير استخدام Microsoft 365 Copilot استخدام Copilot لكل تطبيق من تطبيقات Microsoft 365 على حدة",
    ],
  },
  "real-ab900-39": {
    prompt:
      "تخطط لإنشاء وكيل في تطبيق Microsoft 365 Copilot لحل مشكلة تجارية. ما هما السببان لإنشاء الوكيل؟ (كل إجابة صحيحة تمثل حلاً كاملاً. ملاحظة: كل اختيار صحيح يستحق نقطة واحدة.)",
    options: {
      A: "تحتاج إلى استخدام نموذج ذكاء اصطناعي مخصص.",
      B: "تحتاج إلى استخدام مجموعة تعليمات مخصصة تختلف عن تجربة الدردشة (chat).",
      C: "تحتاج إلى التفكير حول موقع معين.",
      D: "تحتاج إلى تجميع المحادثات ذات الصلة في دفتر ملاحظات Copilot.",
    },
  },
  "real-ab900-40": {
    prompt:
      "أحد المخاطر الحوكمية الجوهرية عند تطبيق Microsoft 365 Copilot هو احتمال تسريب بيانات الشركة. يشعر رئيس مكتب الامتثال بالقلق من أنه، بما أن Copilot يستخدم جميع البيانات التي يملك المستخدم صلاحية الوصول إليها، قد يحصل مستخدم عن غير قصد على معلومات حساسة لا ينبغي أن يصل إليها. ما هو السبب الأكثر شيوعاً لخطر المشاركة المفرطة هذا والذي يجب على المسؤولين معالجته كمهمة حوكمة ذات أولوية عالية قبل نشر Copilot على نطاق واسع؟",
    options: {
      A: "يتجاوز Copilot ضوابط الوصول في SharePoint عند فهرسة المحتوى.",
      B: "أذونات فضفاضة جداً على المواقع أو الملفات.",
      C: "سجلات محادثات Copilot لا تخضع لـ eDiscovery أو الاحتفاظ بالبيانات.",
      D: "يستخدم تدريب نموذج Azure OpenAI بيانات المستأجر (tenant) ويحتفظ بها داخل المستأجر.",
    },
  },
  "real-ab900-41": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. يجب عليك التحقيق في حوادث وتنبيهات أمنية أُطلِقت من أجهزة Windows 11 في مؤسستك. ماذا يجب أن تستخدم؟",
    options: {
      A: "Microsoft Entra ID Protection",
      B: "Microsoft Defender for Identity",
      C: "Microsoft Purview Insider Risk Management",
      D: "Microsoft Defender for Endpoint",
    },
  },
  "real-ab900-42": {
    prompt:
      "تتطلب شركتك أن يكون لكل مواقع Microsoft SharePoint مالكان على الأقل. يجب عليك التأكد من أن المواقع التي تملك أقل من مالكَين تُوسَم كقراءة فقط إذا لم تُصحَّح. ماذا يجب أن تُهيّئ في مركز إدارة SharePoint؟",
    options: {
      A: "تقييد الوصول على مستوى الموقع",
      B: "تقارير إدارة الوصول إلى البيانات",
      C: "إدارة دورة حياة الموقع",
      D: "سياسة حظر التنزيل لـ SharePoint و OneDrive",
    },
  },
  "real-ab900-43": {
    prompt:
      "يريد مدير تقنية المعلومات مقاييس مجمّعة على مستوى المستأجر مثل مستخدمي Copilot النشطين، والاستخدام حسب التطبيق، وفئات المطالبات، لقياس عائد الاستثمار (ROI) لـ Copilot. أي أداة إدارية توفر هذا التقييم المجمّع للاعتماد والاستخدام؟",
    options: {
      A: "سجل تدقيق Microsoft Purview",
      B: "لوحة معلومات تحليلات Copilot",
      C: "سجلات تسجيل الدخول في Microsoft Entra ID",
      D: "حالة خدمة Microsoft 365",
    },
  },
  "real-ab900-44": {
    prompt:
      "قبل نشر وكيل ذكاء اصطناعي تم إنشاؤه في Copilot Studio ويتصل بقاعدة بيانات مالية محلية، يجب على المسؤول مراجعة الوصول والأداء وحالة دورة الحياة. ما هما مركزا إدارة مايكروسوفت الرئيسيان المستخدمان لإدارة ومراقبة دورة حياة الوكيل وإعدادات البيئة؟ (كل اختيار صحيح يمثل جزءاً من الحل. ملاحظة: كل اختيار صحيح يستحق نقطة واحدة.)",
    options: {
      A: "بوابة Microsoft Purview",
      B: "مركز إدارة Microsoft Entra",
      C: "مركز إدارة Microsoft 365",
      D: "مركز إدارة Microsoft Power Platform",
      E: "مركز إدارة Exchange",
    },
  },
  "real-ab900-45": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "من مركز إدارة SharePoint، يمكنك إنشاء خادم (server).",
      B: "من مركز إدارة SharePoint، يمكنك إنشاء مستخدم.",
      C: "من مركز إدارة SharePoint، يمكنك إنشاء موقع.",
      D: "من مركز إدارة SharePoint، يمكنك إنشاء دور (role).",
    },
  },
  "real-ab900-46": {
    prompt: "يجب عليك إنشاء وكيل Microsoft 365 Copilot قادر على إنشاء مخططات وتصورات بناءً على مصنّف Microsoft Excel. ماذا يجب أن تُهيّئ للوكيل؟",
    options: {
      A: "ميزة توليد الصور",
      B: "قالب Scrum Assistant",
      C: "قالب Customer Insights Assistant",
      D: "ميزة مُفسِّر الأكواد (Code Interpreter)",
    },
  },
  "real-ab900-47": {
    prompt:
      "تختبر شركتك استخدام Microsoft 365 Copilot واشترت 100 ترخيص Microsoft 365 Copilot. يجب عليك عرض تقارير مفصلة عن استخدام Copilot في Microsoft Teams، مثل ساعات الاجتماعات الملخّصة بواسطة Copilot وإجراءات الاجتماعات التي اتخذها Copilot. ماذا يجب أن تستخدم؟",
    options: {
      A: "تقرير جاهزية Microsoft 365 Copilot في مركز إدارة Microsoft 365",
      B: "تقرير استخدام Microsoft 365 Copilot في مركز إدارة Microsoft 365",
      C: "لوحة معلومات Microsoft 365 Copilot في Microsoft Viva Insights",
      D: "تقرير استخدام تطبيقات Microsoft 365 في مركز إدارة Microsoft 365",
    },
  },
  "real-ab900-48": {
    prompt:
      "أنشأ مستخدم يُدعى User1 وكيل Microsoft 365 Copilot يُدعى Agent1 وشاركه مع مستخدم يُدعى User2. ماذا يحدث عندما يحظر المسؤول Agent1؟",
    options: {
      A: "يظل Agent1 متاحاً لـ User1 و User2 حتى يقوم المستخدمون بإلغاء تثبيت الوكيل يدوياً. لا يمكن لأي مستخدم آخر تثبيت Agent1.",
      B: "يظل Agent1 متاحاً لـ User1 و User2، ولا يمكن لأي مستخدم آخر تثبيت Agent1.",
      C: "تتم إزالة Agent1 من User2، ويمكن لـ User1 الاستمرار في استخدام Agent1.",
      D: "تتم إزالة Agent1 من User1 و User2، ولا يمكن لأي مستخدم تثبيت Agent1.",
    },
  },
  "real-ab900-49": {
    statements: [
      "يمكن للمسؤولين إزالة وكيل Copilot معيّن من جميع المستخدمين",
      "من مركز إدارة Microsoft 365، يمكن للمسؤولين تهيئة مطالبات (prompts) وكيل Copilot",
      "يمكن للمسؤولين نشر وكلاء Copilot لمستخدمين محددين",
    ],
  },
  "real-ab900-50": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "من مركز إدارة Microsoft Teams، يمكنك تعيين ترخيص Teams لمستخدم.",
      B: "من مركز إدارة Microsoft Teams، يمكنك نشر عميل Teams.",
      C: "من مركز إدارة Microsoft Teams، يمكنك إدارة جهاز غرفة Teams.",
      D: "من مركز إدارة Microsoft Teams، يمكنك منع المستخدمين من إنشاء فرق (Teams).",
    },
  },
  "real-ab900-51": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. جميع المستخدمين لديهم تراخيص Microsoft 365 Copilot. يجب عليك تحديد أين يُستخدم المحتوى الحساس أثناء تفاعلات Copilot، وتحليل أنماط استخدام المحتوى، وتقديم توصيات لتطبيق الحماية المناسبة. ماذا يجب أن تستخدم؟",
    options: {
      A: "Microsoft Viva Insights",
      B: "حل Microsoft Purview DSPM for AI",
      C: "Microsoft Security Copilot",
      D: "حل Microsoft Purview Insider Risk Management",
    },
  },
  "real-ab900-52": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. تم تعيين تراخيص Microsoft 365 Copilot لجميع المستخدمين. يُبلّغ بعض المستخدمين عن تلقّي إجابات من Copilot تحتوي على معلومات من موقع Microsoft SharePoint يُدعى Finance. يذكر المستخدمون أن هذه المعلومات حساسة تجارياً. يجب عليك منع Copilot من تقديم إجابات تحتوي على معلومات من موقع Finance. ماذا يجب أن تفعل؟",
    options: {
      A: "إنشاء سياسة Information Barrier (IB) في Microsoft Purview.",
      B: "إنشاء موصل بيانات (data connector) في Microsoft Defender.",
      C: "إنشاء سياسة Conditional Access في Microsoft Entra.",
      D: "تهيئة الأذونات على موقع Finance.",
    },
  },
  "real-ab900-53": {
    prompt:
      "يسأل مدير: \"ما الفرق الرئيسي في القدرات بين Microsoft 365 Copilot المدمج في Word/Excel، ووكيل ذكاء اصطناعي مخصص تم إنشاؤه في Copilot Studio؟\" ما هي الإجابة الصحيحة؟",
    options: {
      A: "فقط Copilot المدمج يمكنه الوصول إلى بيانات Microsoft Graph وتلخيصها.",
      B: "Copilot المدمج هو مساعد إنتاجية عام. الوكلاء المخصصون مصمَّمون لمهام محددة متعددة الخطوات وتكاملات مع أنظمة خارجية.",
      C: "فقط الوكلاء المخصصون يمكنهم الاستناد في إجاباتهم إلى بيانات تنظيمية.",
      D: "الوكلاء المخصصون متاحون فقط عبر بوابة Copilot Studio، بينما Copilot مدمج في التطبيقات.",
    },
  },
  "real-ab900-54": {
    prompt:
      "طوّر رئيس قسم مطالبة (prompt) معقدة وعالية التأثير في Microsoft 365 Copilot لتحليل بيانات المبيعات الأسبوعية. يريد الرئيس أن يتمتع جميع أعضاء فريق المبيعات الثلاثين بوصول سهل ومتّسق إلى قالب المطالبة هذا. ما هي الطريقة الموصى بها لضمان استخدام هذا القالب القيّم بشكل موحّد من قبل الفريق بأكمله؟",
    options: {
      A: "استخدام واجهة Copilot Studio لنشر المطالبة كوكيل جديد.",
      B: "إرسال نص المطالبة عبر البريد الإلكتروني إلى الفريق وتوجيههم لحفظه في OneDrive الشخصي الخاص بهم.",
      C: "مشاركة قالب المطالبة مباشرةً من مكتبة مطالبات Microsoft 365 Copilot.",
      D: "إنشاء تدفق Power Automate يُشغِّل المطالبة أسبوعياً.",
    },
  },
  "real-ab900-55": {
    statements: [
      "يمكن لسياسة Communication Compliance اكتشاف نصوص غير لائقة في رسائل Microsoft Teams",
      "يمكن لسياسة Communication Compliance اكتشاف لغة مسيئة في مطالبات (prompts) Microsoft 365 Copilot",
      "يمكن استخدام سياسة Communication Compliance للاحتفاظ برسائل البريد الإلكتروني لمدة 10 سنوات",
    ],
  },
  "real-ab900-56": {
    statements: [
      "من معرض مطالبات Copilot، يمكنك تحرير مطالبة محفوظة",
      "من معرض مطالبات Copilot، يمكنك مشاركة مطالبة محفوظة مع فريق Microsoft Teams",
      "يمكنك إنشاء رابط مشاركة لمطالبة لم تُحفظ في معرض مطالبات Copilot",
    ],
  },
  "real-ab900-57": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. تلاحظ أن بعض المستخدمين لا يستطيعون تسجيل الدخول إلى Microsoft 365. يجب عليك عرض محاولات تسجيل الدخول الفاشلة في Microsoft 365. ماذا يجب أن تستخدم؟",
    options: {
      A: "بوابة Microsoft Defender",
      B: "مركز إدارة Microsoft Entra",
      C: "بوابة Microsoft Purview",
      D: "مركز إدارة Microsoft 365",
    },
  },
  "real-ab900-58": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365 يحتوي على موقع Microsoft SharePoint يُدعى Site1. يجب عليك منع المستخدمين من مشاركة محتوى Site1 مع مستخدمين خارجيين. ماذا يجب أن تستخدم؟",
    options: {
      A: "محتوى Site1",
      B: "مركز إدارة SharePoint",
      C: "مركز إدارة Microsoft 365",
      D: "مركز إدارة Microsoft Entra",
    },
  },
  "real-ab900-59": {
    prompt: "أي عبارة تصف Microsoft Defender XDR بشكل صحيح؟",
    options: {
      A: "Microsoft Defender XDR هو مجموعة أدوات مؤسسية موحّدة تنسّق الكشف والوقاية والتحقيق والاستجابة عبر نقاط النهاية والهويات والبريد الإلكتروني والتطبيقات لتوفير حماية متكاملة ضد الهجمات المتطورة.",
      B: "Microsoft Entra Conditional Access هو مجموعة أدوات مؤسسية موحّدة تنسّق الكشف والوقاية والتحقيق والاستجابة عبر نقاط النهاية والهويات والبريد الإلكتروني والتطبيقات لتوفير حماية متكاملة ضد الهجمات المتطورة.",
      C: "Microsoft Entra ID Protection هو مجموعة أدوات مؤسسية موحّدة تنسّق الكشف والوقاية والتحقيق والاستجابة عبر نقاط النهاية والهويات والبريد الإلكتروني والتطبيقات لتوفير حماية متكاملة ضد الهجمات المتطورة.",
      D: "Microsoft Purview هو مجموعة أدوات مؤسسية موحّدة تنسّق الكشف والوقاية والتحقيق والاستجابة عبر نقاط النهاية والهويات والبريد الإلكتروني والتطبيقات لتوفير حماية متكاملة ضد الهجمات المتطورة.",
    },
  },
  "real-ab900-60": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. تم تعيين مستخدم يُدعى Alex Wilber لدور إداري كما هو موضح في الصورة التالية.",
    options: {
      A: "يمكن لـ Alex Wilber عرض جميع المستخدمين في مستأجر Microsoft Entra.",
      B: "يمكن لـ Alex Wilber عرض جميع المحتوى في مواقع Microsoft SharePoint.",
      C: "يمكن لـ Alex Wilber قراءة جميع المحتوى في صناديق بريد Microsoft Exchange.",
      D: "يمكن لـ Alex Wilber إجراء eDiscovery على مطالبات Microsoft 365 Copilot.",
    },
  },
  "real-ab900-61": {
    statements: [
      "يمكنك استخدام مجموعة أمان Microsoft Entra لتعيين أذونات لموارد Microsoft Entra ID",
      "يمكنك استخدام مجموعة أمان Microsoft Entra لتعيين تراخيص Microsoft 365",
      "يمكنك استخدام مجموعة أمان Microsoft Entra لتعيين أذونات لصناديق بريد Microsoft Exchange",
    ],
  },
  "real-ab900-62": {
    prompt: "أي عبارة تصف التفويض (authorization) في Microsoft 365 بدقة؟",
    options: {
      A: "عملية للتحقق من أن هوية ما هي بالفعل ما تدّعيه",
      B: "عملية تتطلب طرق مصادقة إضافية قبل أن تتمكن هوية من الوصول إلى الموارد",
      C: "عملية للتحقق من السماح لهوية بالوصول إلى مورد",
      D: "عملية للتحقق من صحة هوية من نظام خارجي",
    },
  },
  "real-ab900-63": {
    statements: [
      "يمكن لعضو موقع Microsoft SharePoint دعوة مستخدمين للوصول إلى محتوى الموقع",
      "يمكن لمالك موقع Microsoft SharePoint إضافة مجموعات Microsoft 365 كأعضاء في الموقع",
      "يمكن لمالك موقع Microsoft SharePoint إزالة مالك آخر من الموقع",
    ],
  },
  "real-ab900-64": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. ما هما المهمتان اللتان يمكنك تنفيذهما باستخدام مركز إدارة Exchange؟ (كل إجابة صحيحة تشكّل جزءاً من الحل. ملاحظة: كل اختيار صحيح يستحق نقطة واحدة.)",
    options: {
      A: "تعيين ترخيص Microsoft Exchange.",
      B: "إنشاء قاعدة تدفق بريد (mail flow rule).",
      C: "إنشاء صندوق بريد مشترك.",
      D: "إضافة نطاق مخصص.",
    },
  },
  "real-ab900-65": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "في Microsoft Entra Privileged Identity Management (PIM)، أهّلك مسؤول لدور مسؤول المستخدمين. قبل أن تتمكن من إنشاء حساب مستخدم، يجب عليك تفعيل الدور.",
      B: "في Microsoft Entra Privileged Identity Management (PIM)، أهّلك مسؤول لدور مسؤول المستخدمين. قبل أن تتمكن من إنشاء حساب مستخدم، يجب عليك تثبيت تطبيق Microsoft Authenticator.",
      C: "في Microsoft Entra Privileged Identity Management (PIM)، أهّلك مسؤول لدور مسؤول المستخدمين. قبل أن تتمكن من إنشاء حساب مستخدم، يجب عليك طلب ترخيص.",
      D: "في Microsoft Entra Privileged Identity Management (PIM)، أهّلك مسؤول لدور مسؤول المستخدمين. قبل أن تتمكن من إنشاء حساب مستخدم، يجب عليك تحديث معلومات موقعك.",
    },
  },
  "real-ab900-66": {
    prompt:
      "تفتح مركز إدارة Microsoft Entra كما هو موضح في الصورة التالية. أي إجراء سيُحسّن Identity Secure Score أكثر من غيره؟",
    options: {
      B: "معالجة توصية \"استخدام أدوار إدارية بأقل الصلاحيات\" ستُحسّن Identity Secure Score أكثر من غيرها.",
      C: "معالجة توصية \"تفعيل سياسة حظر المصادقة القديمة\" ستُحسّن Identity Secure Score أكثر من غيرها.",
      D: "معالجة توصية \"إلزام المصادقة متعددة العوامل للأدوار الإدارية\" ستُحسّن Identity Secure Score أكثر من غيرها.",
    },
  },
  "real-ab900-67": {
    prompt: "بماذا يمكنك قفل حساب مستخدم تلقائياً عند اكتشاف تسجيل دخول محفوف بالمخاطر؟",
    options: {
      A: "Microsoft Defender for Identity",
      B: "Microsoft Entra ID Protection",
      C: "Microsoft Defender for Office 365",
      D: "Microsoft Entra Privileged Identity Management (PIM)",
    },
  },
  "real-ab900-68": {
    prompt: "تراجع سياسات الأمان في شركتك كجزء من استراتيجية Zero Trust. أي عبارة تصف مبادئ Zero Trust بدقة؟",
    options: {
      A: "يُحسّن Zero Trust تجربة المستخدم عن طريق تقليل طلبات المصادقة.",
      B: "يفترض Zero Trust وقوع اختراق أمني ويتحقق من كل طلب.",
      C: "يعامل Zero Trust جميع الطلبات القادمة من شبكة شركتك على أنها موثوقة.",
      D: "يُلغي Zero Trust الحاجة إلى مراجعة أذونات الوصول وتعديلها بانتظام.",
    },
  },
  "real-ab900-69": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. يجب عليك إنشاء تقرير يُظهر الأذونات وروابط المشاركة النشطة للمحتوى المخزّن في حسابات Microsoft OneDrive. ماذا يجب أن تستخدم؟",
    options: {
      A: "Audit في بوابة Microsoft Defender",
      B: "التقارير في مركز إدارة Microsoft 365",
      C: "إدارة الوصول إلى البيانات في مركز إدارة SharePoint",
      D: "eDiscovery في بوابة Microsoft Purview",
    },
  },
  "real-ab900-70": {
    statements: [
      "تستخدم مايكروسوفت المطالبات والإجابات الصادرة من المستخدمين في Microsoft 365 Copilot لتدريب النماذج",
      "تستخدم مايكروسوفت المحتوى المسترجَع من Microsoft Graph لتدريب النماذج",
      "يحترم Microsoft 365 Copilot أذونات الأمان في اشتراك Microsoft 365 الخاص بك",
    ],
  },
  "real-ab900-71": {
    prompt:
      "تستخدم شركتك الفوترة حسب الاستخدام (Pay-as-you-go) لـ Microsoft 365 Copilot. تريد الشركة رؤية أفضل لتكاليف استخدام Copilot والقدرة على التنبؤ بإنفاق الأقسام. يجب عليك التأكد من قدرتك على عرض تكاليف Copilot حسب القسم. ماذا يجب أن تستخدم؟ (للإجابة، اختر الخيارات المناسبة في منطقة الإجابة. ملاحظة: كل اختيار صحيح يستحق نقطة واحدة.)",
    options: {
      A: "البوابة: مركز إدارة Microsoft 365 / الميزة: سياسة فوترة",
      B: "البوابة: مركز إدارة Microsoft 365 / الميزة: موصل Copilot",
      C: "البوابة: مركز إدارة Microsoft Entra / الميزة: سياسة مطالبة تلقائية",
      D: "البوابة: مركز إدارة Microsoft Entra / الميزة: سياسة فوترة",
      E: "البوابة: بوابة Microsoft Purview / الميزة: موصل Copilot",
      F: "البوابة: بوابة Microsoft Purview / الميزة: سياسة مطالبة تلقائية",
    },
  },
  "real-ab900-72": {
    statements: [
      "لا يمكن للمستخدمين الذين لديهم ترخيص Microsoft 365 E5 إنشاء وكلاء Microsoft 365 Copilot قائمين على الويب",
      "يحتاج المستخدمون إلى تعيين ترخيص Microsoft 365 Copilot لاستخدام وكيل Analyst",
      "يمكن للمستخدمين استخدام مطالبة بلغة طبيعية لإنشاء وكيل Microsoft 365 Copilot",
    ],
  },
  "real-ab900-73": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "يمكنك استخدام حل Audit من Microsoft Purview للعثور على كل المحتوى المتعلق بمصطلح \"Project Falcon\" في رسائل البريد الإلكتروني المتبادلة بين مستخدمَين.",
      B: "يمكنك استخدام حل Data Catalog من Microsoft Purview للعثور على كل المحتوى المتعلق بمصطلح \"Project Falcon\" في رسائل البريد الإلكتروني المتبادلة بين مستخدمَين.",
      C: "يمكنك استخدام حل eDiscovery من Microsoft Purview للعثور على كل المحتوى المتعلق بمصطلح \"Project Falcon\" في رسائل البريد الإلكتروني المتبادلة بين مستخدمَين.",
      D: "يمكنك استخدام حل Insider Risk Management من Microsoft Purview للعثور على كل المحتوى المتعلق بمصطلح \"Project Falcon\" في رسائل البريد الإلكتروني المتبادلة بين مستخدمَين.",
    },
  },
  "real-ab900-74": {
    prompt:
      "تستخدم شركتك سياسات Microsoft Purview Data Loss Prevention (DLP). يشارك مستخدم يُدعى User1 معلومات حساسة مع مستخدم خارجي عبر Microsoft Teams. يجب عليك تحديد المحتوى الحساس المشارَك. ماذا يجب أن تستخدم في بوابة Microsoft Purview؟",
    options: {
      A: "التشخيصات (Diagnostics)",
      B: "مستكشف البيانات (Data Explorer)",
      C: "مستكشف المحتوى (Content Explorer)",
      D: "مستكشف النشاط (Activity Explorer)",
    },
  },
  "real-ab900-75": {
    statements: [
      "يتطلب Zero Trust اشتراك Azure",
      "Zero Trust استراتيجية أمنية، وليست منتجاً محدداً",
      "من خلال مركز إدارة Microsoft 365، يمكنك تفعيل Zero Trust لمؤسستك",
    ],
  },
  "real-ab900-76": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "يحتوي Microsoft Copilot Studio على إشارات مثل سجل التعاون وأهمية المستندات وتكرار التواصل، والتي تؤثر على إجابات Microsoft 365 Copilot.",
      B: "يحتوي Microsoft Graph على إشارات مثل سجل التعاون وأهمية المستندات وتكرار التواصل، والتي تؤثر على إجابات Microsoft 365 Copilot.",
      C: "يحتوي Microsoft Purview على إشارات مثل سجل التعاون وأهمية المستندات وتكرار التواصل، والتي تؤثر على إجابات Microsoft 365 Copilot.",
      D: "يحتوي Microsoft Viva Insights على إشارات مثل سجل التعاون وأهمية المستندات وتكرار التواصل، والتي تؤثر على إجابات Microsoft 365 Copilot.",
    },
  },
  "real-ab900-77": {
    statements: [
      "يمكن للمستخدمين استخدام Microsoft 365 Copilot بشكل مجهول",
      "يمكن للمسؤولين السماح بالشراء الذاتي لتراخيص Microsoft 365 Copilot",
      "يمكن تعيين تراخيص Microsoft 365 Copilot لمستخدمين ضيوف (guest) في Microsoft Entra ID من مؤسسات أخرى",
    ],
  },
  "real-ab900-78": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. يجب عليك استخدام Microsoft Purview لتلبية المتطلبات التالية: • اكتشاف وتصنيف البيانات الحساسة عبر منصات متعددة. • منع المستخدمين من مشاركة الملكية الفكرية مع مستخدمين خارجيين. أي حل من Microsoft Purview يجب أن تستخدمه لكل متطلب؟ (للإجابة، اختر الخيارات المناسبة في منطقة الإجابة. ملاحظة: كل اختيار صحيح يستحق نقطة واحدة.)",
    options: {
      A: "اكتشاف وتصنيف البيانات الحساسة عبر منصات متعددة: Communication Compliance / منع مشاركة الملكية الفكرية: Data Loss Prevention",
      B: "اكتشاف وتصنيف البيانات الحساسة عبر منصات متعددة: Data Loss Prevention / منع مشاركة الملكية الفكرية: Information Protection",
      C: "اكتشاف وتصنيف البيانات الحساسة عبر منصات متعددة: Data Loss Prevention / منع مشاركة الملكية الفكرية: Insider Risk Management",
      D: "اكتشاف وتصنيف البيانات الحساسة عبر منصات متعددة: Information Protection / منع مشاركة الملكية الفكرية: Communication Compliance",
      E: "اكتشاف وتصنيف البيانات الحساسة عبر منصات متعددة: Information Protection / منع مشاركة الملكية الفكرية: Insider Risk Management",
      F: "اكتشاف وتصنيف البيانات الحساسة عبر منصات متعددة: Insider Risk Management / منع مشاركة الملكية الفكرية: Data Loss Prevention",
    },
  },
  "real-ab900-79": {
    prompt: "لدى مؤسستك اشتراك Microsoft 365 E5. يجب عليك منع المستخدمين من مشاركة بيانات مالية داخلية للشركة مع مستخدمين خارجيين. ماذا يجب أن تستخدم؟",
    options: {
      A: "مجموعات الأدوار (Role groups)",
      B: "سياسات منع فقدان البيانات (DLP)",
      C: "سياسات إدارة مخاطر الداخل",
      D: "تسميات الاحتفاظ (Retention labels)",
    },
  },
  "real-ab900-80": {
    prompt: "يجب عليك تحديد الملفات ورسائل البريد الإلكتروني التي تحتوي على أرقام الضمان الاجتماعي (SSNs) وأرقام بطاقات الائتمان. ماذا يجب أن تستخدم في بوابة Microsoft Purview؟",
    options: {
      A: "مستكشف البيانات",
      B: "تقارير حماية المعلومات",
      C: "سياسات حماية المعلومات",
      D: "مستكشف النشاط",
    },
  },
  "real-ab900-81": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "يمكن تطبيق تسميات الحساسية من Microsoft Purview على Azure Blob Storage.",
      B: "يمكن تطبيق تسميات الحساسية من Microsoft Purview على محادثات Microsoft 365 Copilot.",
      C: "يمكن تطبيق تسميات الحساسية من Microsoft Purview على مواقع Microsoft SharePoint.",
    },
  },
  "real-ab900-82": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "يتيح لك البحث المقيّد في SharePoint تقييد وصول المسؤولين إلى مواقع Microsoft SharePoint، دون منع المستخدمين من الوصول إلى الملفات والمحتوى الذي يملكون أذونات له.",
      B: "يتيح لك البحث المقيّد في SharePoint تقييد وصول المستخدمين الضيوف إلى مواقع Microsoft SharePoint، دون منع المستخدمين من الوصول إلى الملفات والمحتوى الذي يملكون أذونات له.",
      C: "يتيح لك البحث المقيّد في SharePoint تقييد وصول Microsoft 365 Copilot إلى مواقع Microsoft SharePoint، دون منع المستخدمين من الوصول إلى الملفات والمحتوى الذي يملكون أذونات له.",
      D: "يتيح لك البحث المقيّد في SharePoint تقييد وصول Microsoft Purview eDiscovery إلى مواقع Microsoft SharePoint، دون منع المستخدمين من الوصول إلى الملفات والمحتوى الذي يملكون أذونات له.",
    },
  },
  "real-ab900-83": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365 E5. تُنشئ تسمية حساسية من Microsoft Purview تُدعى \"Label1\". يجب عليك التأكد من قدرة المستخدمين على تطبيق \"Label1\" على الملفات في Microsoft 365. ماذا يجب أن تستخدم؟",
    options: {
      A: "سياسة تسميات الحساسية",
      B: "مُصنِّف قابل للتدريب (trainable classifier)",
      C: "سياسة تسميات الاحتفاظ",
      D: "سياسة وسم تلقائي (auto-labeling)",
    },
  },
  "real-ab900-84": {
    prompt: "لدى شركتك سياسة امتثال مكتوبة تقضي بالاحتفاظ بجميع رسائل البريد الإلكتروني لمدة سبع سنوات ثم حذفها نهائياً. أي حل من Microsoft Purview يجب أن تستخدمه؟",
    options: {
      A: "حماية المعلومات",
      B: "إدارة دورة حياة البيانات",
      C: "منع فقدان البيانات",
      D: "إدارة مخاطر الداخل",
    },
  },
  "real-ab900-85": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "في مركز إدارة Microsoft 365، يعرض مقياس \"الاعتمادات المُستخدَمة\" في تقرير اعتمادات Copilot إجمالي عدد الاعتمادات التي استهلكها مستخدمو مؤسستك الذين يستخدمون Microsoft Teams ويتفاعلون مع وكلاء قائمين على العمل في محادثة Microsoft 365 Copilot.",
      B: "في مركز إدارة Microsoft 365، يعرض مقياس \"الاعتمادات المُستخدَمة\" في تقرير اعتمادات Copilot إجمالي عدد الاعتمادات التي استهلكها مستخدمون لا ينتمون إلى مؤسستك ويتفاعلون مع وكلاء أعمال في محادثة Microsoft 365 Copilot.",
      C: "في مركز إدارة Microsoft 365، يعرض مقياس \"الاعتمادات المُستخدَمة\" في تقرير اعتمادات Copilot إجمالي عدد الاعتمادات التي استهلكها مستخدمو مؤسستك الذين تم تعيين ترخيص Microsoft 365 Copilot لهم ويتفاعلون مع وكلاء قائمين على العمل في محادثة Microsoft 365 Copilot.",
      D: "في مركز إدارة Microsoft 365، يعرض مقياس \"الاعتمادات المُستخدَمة\" في تقرير اعتمادات Copilot إجمالي عدد الاعتمادات التي استخدمها مستخدمو مؤسستك الذين لم يُعيَّن لهم ترخيص Microsoft 365 Copilot ويتفاعلون مع وكلاء قائمين على العمل في محادثة Microsoft 365 Copilot.",
    },
  },
  "real-ab900-86": {
    prompt:
      "لديك موقع Microsoft SharePoint يُدعى \"Site1\" ومجموعة أمان تُدعى \"Group1\". تريد منع جميع المستخدمين الذين يملكون حالياً وصولاً إلى \"Site1\" من الوصول إلى محتوى الموقع، إلا إذا كان المستخدم أيضاً عضواً في مجموعة \"Group1\". أي إعدادات يجب أن تُهيّئ؟ (للإجابة، اختر الإعدادات المناسبة في منطقة الإجابة.)",
    options: {
      A: "البريد الإلكتروني",
      B: "الخصوصية",
      C: "مشاركة الملفات الخارجية",
      D: "تسمية الحساسية",
      E: "تقييد اكتشاف المحتوى",
      F: "الوصول المقيّد للموقع",
    },
  },
  "real-ab900-87": {
    statements: [
      "يحترم Microsoft 365 Copilot تسميات الحساسية من Microsoft Purview",
      "يتجاهل Microsoft 365 Copilot سياسات منع فقدان البيانات (DLP) من Microsoft Purview",
    ],
  },
  "real-ab900-88": {
    statements: [
      "يمكن تطبيق تسمية الحساسية على موقع Microsoft SharePoint",
      "يمكن تطبيق تسمية الحساسية على رسالة بريد إلكتروني في Microsoft Exchange",
      "يمكن تطبيق تسمية الحساسية على أجهزة Windows 11",
    ],
  },
  "real-ab900-89": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. اشترت شركتك مؤخراً تراخيص Microsoft 365 Copilot لبعض المستخدمين. يجب عليك تحديد عدد المستخدمين غير المرخَّصين الذين استخدموا Copilot في Microsoft Teams. أي تقرير استخدام يجب أن تستخدمه في مركز إدارة Microsoft 365؟",
    options: {
      A: "Microsoft 365 Copilot Chat",
      B: "Microsoft 365 Copilot Search",
      C: "Microsoft 365 Apps",
      D: "Microsoft 365 Copilot",
    },
  },
  "real-ab900-90": {
    prompt:
      "مستخدم يُدعى \"User1\" مسؤول عن تقرير الإيرادات الفصلي. يحتاج \"User1\" إلى اكتشاف اتجاهات الأداء، والحصول على رؤى بصرية، وإنشاء ملخص للحالات الشاذة عبر عدة ملفات تحتوي على مجموعات بيانات مختلفة. ماذا يجب أن يستخدم؟",
    options: {
      A: "وكيل \"Analyst\" في Microsoft 365 Copilot",
      B: "وكيل \"Researcher\" في Microsoft 365 Copilot",
      C: "بحث Microsoft 365 Copilot",
      D: "Copilot في Excel",
    },
  },
  "real-ab900-91": {
    prompt: "تراجع شركتك حالياً ترخيص Microsoft 365 Copilot. في أي سيناريو يجب استخدام الفوترة حسب الاستخدام (usage-based billing)؟",
    options: {
      A: "لمنح المستخدمين وصولاً إلى مساعد الذكاء الاصطناعي في Copilot في Word",
      B: "لتلخيص الإجراءات في اجتماعات Microsoft Teams",
      C: "لتوليد صور في محادثات Premium",
      D: "لتوفير وكيل مخصص لمستخدمين غير مرخَّصين",
    },
  },
  "real-ab900-92": {
    prompt: "تستخدم Microsoft 365 Copilot. تريد جدولة مطالبة (prompt) لتُنفَّذ عند منتصف الليل. أي مهمة يجب أن تُدرجها في حلّك؟",
    options: {
      A: "إنشاء وكيل.",
      B: "إنشاء دفتر ملاحظات.",
      C: "تنفيذ المطالبة.",
      D: "حفظ المطالبة.",
    },
  },
  "real-ab900-93": {
    prompt:
      "تخطط شركتك لنشر Microsoft 365 Copilot. يجب عليك تمكين مستخدم من استخدام Microsoft 365 Copilot، بما في ذلك وكيلَي \"Researcher\" و\"Analyst\". ماذا يجب أن تستخدم؟",
    options: {
      A: "مركز إدارة Microsoft 365",
      B: "بوابة Microsoft Purview",
      C: "مركز إدارة Microsoft Entra",
      D: "بوابة Microsoft Defender",
    },
  },
  "real-ab900-94": {
    prompt:
      "تفكّر شركتك في استخدام Microsoft 365 Copilot على أساس الفوترة حسب الاستخدام (Pay-as-you-go) بدلاً من شراء ترخيص Microsoft 365 Copilot. في أي سيناريو تنطبق الفوترة حسب الاستخدام؟",
    options: {
      A: "إجراء استدلال متعدد الخطوات باستخدام وكيل Researcher",
      B: "إنشاء ملخص لاجتماع Microsoft Teams",
      C: "استخدام وكيل مخصص يعتمد على بيانات العمل",
      D: "استخدام مساعد الذكاء الاصطناعي لتحرير مستند في Copilot في Word",
    },
  },
  "real-ab900-95": {
    prompt:
      "لدى شركتك موقع Microsoft SharePoint يُدعى \"Site1\". يحتوي \"Site1\" على جميع سياسات قسم الموارد البشرية في الشركة. تُخزَّن السياسات كمستندات Microsoft Word. جميع المستخدمين لديهم صلاحية قراءة على \"Site1\". يُبلّغ رئيس الموارد البشرية أن استفسارات المستخدمين حول السياسات لا تُعالَج في الوقت المناسب، خاصةً حول العطلات الرئيسية. يجب عليك اقتراح حل يمكّن المستخدمين من العثور على سياسات الموارد البشرية. يجب أن يوفر الحل للمستخدمين قائمة بالأسئلة الشائعة ويضمن استناد الإجابات حصراً إلى Site1. ماذا يجب أن تُدرج في توصيتك؟",
    options: {
      A: "المساعد الشخصي في Copilot في Word",
      B: "وكيل Microsoft 365 Copilot مخصص",
      C: "وكيل Researcher في Microsoft 365 Copilot",
      D: "دفتر ملاحظات Microsoft 365 Copilot",
    },
  },
  "real-ab900-96": {
    prompt: "اختر الإجابة التي تكمل الجملة بشكل صحيح.",
    options: {
      A: "من بوابة Microsoft Purview، يمكنك استخدام Data Explorer لإنشاء وإدارة سياسات الخصوصية.",
      B: "من بوابة Microsoft Purview، يمكنك استخدام Data Explorer للبحث عن محتوى في صناديق البريد والمواقع.",
      C: "من بوابة Microsoft Purview، يمكنك استخدام Data Explorer لتحديد المعلومات الحساسة ومواقع تخزينها.",
      D: "من بوابة Microsoft Purview، يمكنك استخدام Data Explorer للتحقق من فعالية سياسات منع فقدان البيانات (DLP) الخاصة بك.",
    },
  },
  "real-ab900-97": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365 يحتوي على موقع Microsoft SharePoint يُدعى \"Site1\". يجب عليك تحديد جميع التغييرات التي أجراها مسؤول الموقع على إعدادات موقع \"Site1\". أي تقرير يجب أن تستخدمه في مركز إدارة SharePoint؟ (للإجابة، اختر التقرير المناسب في منطقة الإجابة.)",
    options: {
      A: "Agent Insights",
      B: "إدارة كتالوج App Insights",
      D: "سجل التغييرات",
      E: "حوكمة الوصول إلى البيانات",
      F: "حسابات OneDrive",
    },
  },
  "real-ab900-98": {
    statements: [
      "يمكن لـ Microsoft Purview Communications Compliance اكتشاف نصوص مسيئة في صور مخزّنة على مواقع Microsoft SharePoint",
      "يُخفي Microsoft Purview Communications Compliance هوية المستخدمين افتراضياً أثناء التحقيقات",
      "يُضيف Microsoft Purview Communications Compliance إخلاء مسؤولية إلى جميع الاتصالات الخاضعة للمراقبة",
    ],
  },
  "real-ab900-99": {
    prompt:
      "لدى مؤسستك اشتراك Microsoft 365. تم تعيين ترخيص Microsoft 365 Copilot لجميع المستخدمين. يجب عليك منع المستخدمين من إنشاء صور باستخدام Copilot. ماذا يجب أن تستخدم؟",
    options: {
      A: "بوابة Microsoft Defender",
      B: "مركز إدارة Microsoft Entra",
      C: "بوابة Microsoft Purview",
      D: "مركز إدارة Microsoft 365",
    },
  },
  "real-ab900-100": {
    statements: [
      "يمكن للمسؤولين حظر مواقع معينة من استخدام Microsoft 365 Copilot لها",
      "يمكن للمسؤولين منع Microsoft 365 Copilot من استخدام بحث الويب عند الإجابة عن استفسارات المستخدمين",
      "يمكن للمسؤولين حظر الوصول إلى وكيل Researcher في Microsoft 365 Copilot مع السماح بالوصول إلى وكيل Analyst",
    ],
  },
  "real-ab900-101": {
    prompt:
      "يجب عليك التأكد من قدرة المستخدمين على استخدام نظام خارجي كمصدر معرفة لوكلاء Microsoft 365 Copilot المخصصين. ماذا يجب أن تُهيّئ في مركز إدارة Microsoft 365؟ (للإجابة، اختر الإعدادات المناسبة في منطقة الإجابة.)",
    options: {
      A: "Copilot – الموصلات (Connectors)",
      B: "Copilot – البحث",
      C: "Copilot – الإعدادات",
      D: "الوكلاء – نظرة عامة",
      E: "الوكلاء – الأدوات",
      F: "الوكلاء – الإعدادات",
    },
  },
};

export default ab900_ar;
