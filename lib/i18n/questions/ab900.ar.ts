import type { QuestionTranslations } from "./types";

// Arabic (العربية) translations of AB900_QUESTIONS (Microsoft 365 Copilot).
// Hand-translated from the German source in lib/ab900Practice.ts, with
// Microsoft product/feature names kept in their official English form —
// standard practice in Arabic technical/IT writing (same convention
// already established in ab900.fa.ts for Farsi).
//
// PROGRESS: 50 of 101 questions translated so far (real-ab900-1 through
// real-ab900-50). First installment of an ongoing effort — extend in
// future sessions. Anything not listed here falls back to German.

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
};

export default ab900_ar;
