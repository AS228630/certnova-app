import type { QuestionTranslations } from "./types";

// Farsi (فارسی) translations of AB900_QUESTIONS (Microsoft 365 Copilot).
// Hand-translated from the German source in lib/ab900Practice.ts, with
// Microsoft product/feature names kept in their official English form
// (standard practice in Farsi technical/IT writing — translating names
// like "Conditional Access" or "SharePoint" would make them
// unrecognizable against Microsoft's own Farsi documentation and the
// real exam interface, which also keeps these terms in English).
//
// PROGRESS: all 101 of 101 questions translated and verified against
// the full German source (including cross-checking every option to
// avoid leaving any field blank, and cleaning up known PDF-extraction
// artifacts in questions 78 and 87 the same way ab900.en.ts already
// does, rather than translating the garbled prefix literally).

const ab900_fa: QuestionTranslations = {
  "real-ab900-1": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید.",
    statements: [
      "برای استفاده از Microsoft 365 Copilot Chat جهت استدلال روی داده‌های وب، به لایسنس Microsoft 365 Copilot نیاز دارید",
      "برای استفاده از عامل Researcher در Microsoft 365 Copilot، به لایسنس Microsoft 365 Copilot نیاز دارید",
      "برای افزودن یک عامل (agent) در اپلیکیشن Microsoft 365 Copilot، به لایسنس Microsoft 365 Copilot نیاز دارید",
    ],
  },
  "real-ab900-2": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید.",
    statements: [
      "Microsoft 365 Copilot فقط داده‌های سازمانی‌ای را نشان می‌دهد که کاربر مجوز دسترسی به آن‌ها را دارد",
      "Microsoft 365 Copilot از همان کنترل‌های زیرساختی برای دسترسی به داده استفاده می‌کند که سایر سرویس‌های Microsoft 365 استفاده می‌کنند",
      "Microsoft 365 Copilot می‌تواند از کانکتورها برای دریافت اطلاعات از منابع داده‌ی شخص ثالث استفاده کند",
    ],
  },
  "real-ab900-3": {
    prompt: "در Microsoft 365 Copilot، برای انجام استدلال چندمرحله‌ای روی داده‌های ساخت‌نیافته باید از ___ استفاده کنید.",
    options: { A: "یک notebook", B: "Chat", C: "عامل Analyst", D: "عامل Researcher" },
  },
  "real-ab900-4": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 E5 است. باید مطمئن شوید که یک سرویس ابری شخص ثالث می‌تواند نزد Microsoft Entra احراز هویت شود. چه چیزی را باید پیکربندی کنید؟",
    options: {
      A: "یک کانکتور Microsoft 365 Copilot",
      B: "احراز هویت چندعاملی (MFA)",
      C: "یک خط‌مشی Conditional Access",
      D: "یک ثبت اپلیکیشن (app registration)",
    },
  },
  "real-ab900-5": {
    prompt: "اصل مایکروسافت برای هوش مصنوعی مسئولانه در رابطه با ___ نیازمند نظارت بر سیستم‌های هوش مصنوعی است تا اطمینان حاصل شود که انسان‌ها کنترل را در دست دارند.",
    options: {
      A: "پاسخگویی (accountability)",
      B: "فراگیری (inclusiveness)",
      C: "حریم خصوصی و امنیت",
      D: "قابلیت اطمینان و ایمنی",
      E: "شفافیت",
    },
  },
  "real-ab900-6": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. باید Identity Secure Score سازمان خود را ارزیابی کنید. کدام دو عامل بر این امتیاز تأثیر می‌گذارند؟ (هر پاسخ درست بخشی از راه‌حل کامل است. نکته: هر انتخاب درست یک امتیاز دارد.)",
    options: {
      A: "مجوزهای سایت SharePoint",
      B: "تعداد Global Administrator ها",
      C: "رمزهای عبوری که هرگز منقضی نمی‌شوند",
      D: "موقعیت مکانی کاربران",
    },
  },
  "real-ab900-7": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. باید تأثیرات یک حادثه‌ی فیشینگ اخیر که کاربران ایمیل را هدف قرار داده بررسی کنید. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "پرتال Microsoft Defender",
      B: "Microsoft 365 Admin Center",
      C: "Microsoft Entra Admin Center",
      D: "Microsoft Exchange Admin Center",
    },
  },
  "real-ab900-8": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. باید یک لایسنس به یک کاربر اختصاص دهید. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "پرتال Microsoft Purview",
      B: "Microsoft 365 Admin Center",
      C: "Microsoft Teams Admin Center",
    },
  },
  "real-ab900-9": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "Microsoft 365 Copilot داده‌ها را از Azure OpenAI با استفاده از Microsoft Graph دریافت می‌کند.",
      B: "Microsoft 365 Copilot داده‌ها را از کاربران خارجی با استفاده از Microsoft Graph دریافت می‌کند.",
      C: "Microsoft 365 Copilot داده‌ها را از فایل‌های Microsoft SharePoint با استفاده از Microsoft Graph دریافت می‌کند.",
      D: "Microsoft 365 Copilot داده‌ها را از موتورهای جستجوی اینترنتی با استفاده از Microsoft Graph دریافت می‌کند.",
    },
  },
  "real-ab900-10": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "Microsoft Entra Privileged Identity Management ‏(PIM) دسترسی محدود به سرویس‌های Microsoft 365 ارائه می‌دهد.",
      B: "Microsoft Entra Privileged Identity Management ‏(PIM) مدیریت چرخه‌ی عمر کاربر ارائه می‌دهد.",
      C: "Microsoft Entra Privileged Identity Management ‏(PIM) مدیریت اپلیکیشن‌های سازمانی ارائه می‌دهد.",
      D: "Microsoft Entra Privileged Identity Management ‏(PIM) تخصیص نقش محدود به زمان ارائه می‌دهد.",
    },
  },
  "real-ab900-11": {
    prompt: "کاربری به‌نام User5 به آدرس https://myapps.microsoft.com مراجعه می‌کند. پس از وارد کردن نام کاربری و رمز عبور خود، User5 پیام زیر را روی دستگاه موبایل خود دریافت می‌کند. با استفاده از منوهای کشویی، پاسخی را انتخاب کنید که عبارت را بر اساس اطلاعات نمایش‌داده‌شده در نمودار تکمیل می‌کند.",
    options: {
      A: "User5 از ایمیل OTP برای احراز هویت چندعاملی (MFA) استفاده می‌کند.",
      B: "User5 از اپلیکیشن Microsoft Authenticator برای احراز هویت چندعاملی (MFA) استفاده می‌کند.",
      C: "User5 از پیامک برای احراز هویت چندعاملی (MFA) استفاده می‌کند.",
      D: "User5 از رمز عبور موقت برای احراز هویت چندعاملی (MFA) استفاده می‌کند.",
    },
  },
  "real-ab900-12": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "Microsoft Defender for Office 365 محافظت در برابر حملات فیشینگ و بدافزار ارائه می‌دهد",
      "Microsoft Defender for Identity هویت‌ها را در دامنه‌های Active Directory نظارت می‌کند",
      "Microsoft Defender Vulnerability Management محافظت برای اپلیکیشن‌های Software-as-a-Service ‏(SaaS) ارائه می‌دهد",
    ],
  },
  "real-ab900-13": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است که شامل یک سایت Microsoft SharePoint به‌نام Site1 است. مجوزهای Site1 مطابق تصویر زیر پیکربندی شده‌اند. شما یک کاربر جدید به‌نام User1 در این اشتراک ایجاد می‌کنید. با استفاده از منوهای کشویی، پاسخی را انتخاب کنید که عبارت را بر اساس اطلاعات نمایش‌داده‌شده در نمودار تکمیل می‌کند.",
    options: {
      A: "User1 یک بازدیدکننده (visitor) از Site1 است.",
      B: "User1 یک مالک (owner) از Site1 است.",
      C: "User1 یک عضو (member) از Site1 است.",
      D: "User1 از دسترسی به Site1 محروم است.",
    },
  },
  "real-ab900-14": {
    prompt: "یک شرکت چندملیتی با بیش از ۵٬۰۰۰ کاربر در حال پیاده‌سازی Microsoft 365 Copilot است. این شرکت در حال حاضر ترکیبی از لایسنس‌های Microsoft 365 E3 و Office 365 E3 را برای کارکنان اطلاعاتی خود دارد. مدیر IT باید مطمئن شود که همه‌ی کاربران به قابلیت‌های کامل هوش مصنوعی مولد Copilot در اپلیکیشن‌هایی مانند Word و Excel دسترسی دارند. حداقل اقدام لایسنسی لازم برای دسترسی همه‌ی کارکنان اطلاعاتی موجود به Microsoft 365 Copilot چیست؟",
    options: {
      A: "ارتقای همه‌ی لایسنس‌های موجود Office 365 E3 به لایسنس‌های Microsoft 365 E5.",
      B: "خرید لایسنس افزوده‌ی جداگانه‌ی Microsoft 365 Copilot برای همه‌ی کاربران.",
      C: "تبدیل همه‌ی لایسنس‌های موجود از پلن‌های Enterprise به پلن‌های Microsoft 365 Business Premium.",
      D: "خرید لایسنس افزوده‌ی Microsoft 365 Copilot فقط برای کاربران دارای لایسنس Microsoft 365 E3، زیرا Office 365 E3 واجد شرایط نیست.",
    },
  },
  "real-ab900-15": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "اگر کاربری یک عامل Microsoft 365 Copilot را به اشتراک بگذارد، می‌توانید از Microsoft Foundry برای جلوگیری از استفاده‌ی کاربران از آن عامل استفاده کنید.",
      B: "اگر کاربری یک عامل Microsoft 365 Copilot را به اشتراک بگذارد، می‌توانید از Microsoft Copilot Studio برای جلوگیری از استفاده‌ی کاربران از آن عامل استفاده کنید.",
      C: "اگر کاربری یک عامل Microsoft 365 Copilot را به اشتراک بگذارد، می‌توانید از Microsoft 365 Admin Center برای جلوگیری از استفاده‌ی کاربران از آن عامل استفاده کنید.",
      D: "اگر کاربری یک عامل Microsoft 365 Copilot را به اشتراک بگذارد، می‌توانید از پرتال Power Apps برای جلوگیری از استفاده‌ی کاربران از آن عامل استفاده کنید.",
    },
  },
  "real-ab900-16": {
    prompt: "تیم مدیریت IT سازمان شما، Contoso Ltd.، یک نام دامنه‌ی جدید، contosoglobal.com، خریداری کرده و باید آن را به محیط Microsoft 365 خود اضافه کند. این دامنه‌ی جدید برای همه‌ی نام‌های اصلی کاربری (UPN) و آدرس‌های ایمیل جدید استفاده خواهد شد. مدیر باید از کدام بخش Microsoft 365 Admin Center برای مدیریت، تأیید و تنظیم این دامنه به‌عنوان پیش‌فرض برای کاربران جدید استفاده کند؟",
    options: {
      A: "Settings > Org settings > Services",
      B: "Billing > Licenses > Product list",
      C: "Setup > Domain setup > Connect domain",
      D: "Settings > Domains",
    },
  },
  "real-ab900-17": {
    prompt: "یک کاربر مالی یک ایمیل فیشینگ پیچیده حاوی یک لینک مخرب دریافت کرد که خنثی شد. تیم امنیتی به یک نمای واحد و متمرکز نیاز دارد تا خط زمانی حادثه، هشدارهای مرتبط (ایمیل و اندپوینت)، و اقدامات پیشنهادی برای تقویت وضعیت امنیتی ایمیل و اندپوینت‌ها را بررسی کند. کدام قابلیت Defender XDR یا بخش پرتال، این نمای یکپارچه از خط زمانی حادثه و توصیه‌های بهبود را در اختیار تیم امنیتی قرار می‌دهد؟",
    options: {
      A: "Microsoft Defender for Identity",
      B: "Microsoft Defender for Office 365",
      C: "Microsoft Defender Vulnerability Management",
      D: "محیط یکپارچه‌ی حوادث و هشدارها به همراه Secure Score در پرتال Microsoft Defender",
    },
  },
  "real-ab900-18": {
    prompt: "یک کاربر از ورود به سیستم محروم شده و مدیر مشکوک به Conditional Access یا تشخیص ورود پرخطر (risky sign-in) است. مدیر ابتدا باید از کدام دو ابزار در Microsoft Entra Admin Center برای شناسایی دقیق خطای ورود و خط‌مشی مسئول آن استفاده کند؟ (هر پاسخ درست بخشی از راه‌حل است. نکته: هر انتخاب درست یک امتیاز دارد.)",
    options: {
      A: "ابزار Conditional Access What If",
      B: "Microsoft 365 Service Health Dashboard",
      C: "گزارش‌های ورود (Sign-in logs) و بخش عیب‌یابی و پشتیبانی در Microsoft Entra ID",
      D: "ردیابی پیام در Exchange Online",
      E: "Microsoft Entra ID Application Proxy",
    },
  },
  "real-ab900-19": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "Microsoft Purview Compliance Manager یک ارزیابی کامپلاینس مبتنی بر ریسک ارائه می‌دهد تا به شما در درک وضعیت کامپلاینستان کمک کند",
      "Microsoft Purview Compliance Manager راهنمای گام‌به‌گام برای رفع مشکلات کامپلاینس ارائه می‌دهد",
      "Compliance Manager بخشی از Microsoft Defender است",
    ],
  },
  "real-ab900-20": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. متوجه می‌شوید که فایل‌های Microsoft SharePoint با کاربرانی خارج از سازمانتان به اشتراک گذاشته می‌شوند. باید مشخص کنید کدام فایل‌ها با کاربران خارجی به اشتراک گذاشته شده‌اند. باید از کدام گزارش در SharePoint Admin Center استفاده کنید؟ (برای پاسخ، گزارش مناسب را در بخش پاسخ انتخاب کنید.)",
    options: {
      A: "Agent insights",
      B: "App insights",
      C: "Change history",
      D: "Data access governance",
      E: "OneDrive accounts",
      F: "مقایسه‌ی خط‌مشی‌های سایت (Site policy comparison)",
    },
  },
  "real-ab900-21": {
    prompt: "سازمان شما یک اشتراک Microsoft 365 دارد. بخش منابع انسانی شرکت شما درخواست یک نسخه از تمام فایل‌هایی را دارد که اخیراً توسط کاربری به‌نام User1 تغییر یافته‌اند. از چه چیزی باید در پرتال Microsoft Purview استفاده کنید؟ (برای پاسخ، راه‌حل‌های مناسب را در بخش پاسخ انتخاب کنید.)",
    options: {
      A: "Audit",
      B: "Data Catalog",
      C: "Data Loss Prevention",
      D: "eDiscovery",
      E: "Information Protection",
      F: "Insider Risk Management",
    },
  },
  "real-ab900-22": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. باید از Microsoft Purview برای برآورده‌کردن الزامات زیر استفاده کنید: • جلوگیری از اشتراک‌گذاری فایل‌های حاوی اطلاعات قابل شناسایی شخصی (PII) توسط کاربران. • استفاده از یادگیری ماشین برای آموزش یک مدل که محتوای حساس را تشخیص دهد. برای هر الزام باید از کدام راه‌حل Microsoft Purview استفاده کنید؟ (برای پاسخ، گزینه‌های مناسب را در بخش پاسخ انتخاب کنید. نکته: هر انتخاب درست یک امتیاز دارد.)",
    options: {
      A: "جلوگیری از اشتراک‌گذاری PII: Communication Compliance | آموزش مدل با یادگیری ماشین: Data Loss Prevention",
      B: "جلوگیری از اشتراک‌گذاری PII: Data Loss Prevention | آموزش مدل با یادگیری ماشین: Information Protection",
      C: "جلوگیری از اشتراک‌گذاری PII: Information Protection | آموزش مدل با یادگیری ماشین: Insider Risk Management",
      D: "جلوگیری از اشتراک‌گذاری PII: Insider Risk Management | آموزش مدل با یادگیری ماشین: Communication Compliance",
      E: "جلوگیری از اشتراک‌گذاری PII: Data Loss Prevention | آموزش مدل با یادگیری ماشین: DSPM for AI",
      F: "جلوگیری از اشتراک‌گذاری PII: DSPM for AI | آموزش مدل با یادگیری ماشین: Insider Risk Management",
    },
  },
  "real-ab900-23": {
    prompt: "می‌خواهید اقدامات مدیریتی انجام‌شده توسط یک مدیر سرویس در Microsoft 365 را مشاهده کنید. برای هر یک از عبارات زیر، اگر عبارت صحیح است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    options: {
      A: "می‌توانید از Search & intelligence در Microsoft 365 Admin Center استفاده کنید: بله | می‌توانید از Audit در پرتال Microsoft Defender استفاده کنید: بله | می‌توانید از Audit در پرتال Microsoft Purview استفاده کنید: بله",
      B: "می‌توانید از Search & intelligence در Microsoft 365 Admin Center استفاده کنید: بله | می‌توانید از Audit در پرتال Microsoft Defender استفاده کنید: بله | می‌توانید از Audit در پرتال Microsoft Purview استفاده کنید: خیر",
      C: "می‌توانید از Search & intelligence در Microsoft 365 Admin Center استفاده کنید: بله | می‌توانید از Audit در پرتال Microsoft Defender استفاده کنید: خیر | می‌توانید از Audit در پرتال Microsoft Purview استفاده کنید: بله",
      D: "می‌توانید از Search & intelligence در Microsoft 365 Admin Center استفاده کنید: خیر | می‌توانید از Audit در پرتال Microsoft Defender استفاده کنید: بله | می‌توانید از Audit در پرتال Microsoft Purview استفاده کنید: خیر",
      E: "می‌توانید از Search & intelligence در Microsoft 365 Admin Center استفاده کنید: خیر | می‌توانید از Audit در پرتال Microsoft Defender استفاده کنید: خیر | می‌توانید از Audit در پرتال Microsoft Purview استفاده کنید: بله",
      F: "می‌توانید از Search & intelligence در Microsoft 365 Admin Center استفاده کنید: خیر | می‌توانید از Audit در پرتال Microsoft Defender استفاده کنید: خیر | می‌توانید از Audit در پرتال Microsoft Purview استفاده کنید: خیر",
    },
  },
  "real-ab900-24": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "خط‌مشی‌های Conditional Access از طریق پرتال Microsoft Defender پیکربندی می‌شوند.",
      B: "خط‌مشی‌های Conditional Access فقط روی منابع محلی (on-premises) اعمال می‌شوند.",
      C: "خط‌مشی‌های Conditional Access کنترلی روی نحوه‌ی دسترسی کاربران به اپلیکیشن‌های ابری ارائه می‌دهند.",
      D: "خط‌مشی‌های Conditional Access نیازمند یک صندوق پستی Microsoft Exchange هستند.",
    },
  },
  "real-ab900-25": {
    prompt: "یک مدیر باید دسترسی به یک سایت SharePoint حساس مربوط به منابع انسانی را مدیریت کرده و لایسنس‌های افزوده‌ی Copilot را به ۵۰ عضو تیم «HR-Data-Users» اختصاص دهد. عضویت این تیم به دلیل جابه‌جایی زیاد نیرو مرتباً تغییر می‌کند. کدام شیء Microsoft Entra، هم برای کنترل دسترسی و هم برای مدیریت گروه بر پایه‌ی لایسنس، کارآمدترین انتخاب است؟",
    options: {
      A: "گروه امنیتی پویا (Dynamic security group)",
      B: "گروه امنیتی ایمیل‌فعال (Mail-enabled security group)",
      C: "گروه Microsoft 365",
      D: "لیست توزیع (Distribution list)",
    },
  },
  "real-ab900-26": {
    prompt: "شما از Microsoft 365 Copilot استفاده می‌کنید. Copilot با استفاده از چه چیزی، پاسخ‌ها را بر اساس داده‌های سازمانی ذخیره‌شده در Microsoft SharePoint می‌سازد؟",
    options: { A: "Microsoft Intune", B: "Microsoft Defender", C: "Microsoft Graph", D: "Microsoft Purview" },
  },
  "real-ab900-27": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "می‌توانید از راه‌حل Data Lifecycle Management در Microsoft Purview برای شناسایی ورودی‌های Microsoft 365 Copilot که حاوی اطلاعات حساس هستند استفاده کنید.",
      B: "می‌توانید از راه‌حل DSPM for AI در Microsoft Purview برای شناسایی ورودی‌های Microsoft 365 Copilot که حاوی اطلاعات حساس هستند استفاده کنید.",
      C: "می‌توانید از راه‌حل Information Barriers در Microsoft Purview برای شناسایی ورودی‌های Microsoft 365 Copilot که حاوی اطلاعات حساس هستند استفاده کنید.",
      D: "می‌توانید از راه‌حل Information Protection در Microsoft Purview برای شناسایی ورودی‌های Microsoft 365 Copilot که حاوی اطلاعات حساس هستند استفاده کنید.",
    },
  },
  "real-ab900-28": {
    prompt: "یک کاربر بازاریابی از Copilot می‌خواهد «آخرین پیش‌نویس بودجه» را خلاصه کند که در یک سایت SharePoint ذخیره شده که فقط برای بخش مالی قابل دسترسی است. این کاربر بازاریابی عضو آن سایت نیست. کدام اصل، رفتار Copilot را کنترل کرده و مانع بازگرداندن محتوای محدودشده می‌شود؟",
    options: {
      A: "Copilot پیش از پردازش درخواست، اعتبارسنجی Zero Trust را اعمال می‌کند.",
      B: "Copilot فقط از محتوایی استفاده می‌کند که صراحتاً با یک برچسب حساسیت (sensitivity label) خاص علامت‌گذاری شده باشد.",
      C: "Copilot مجوزهای موجود Microsoft 365 کاربر را به‌طور دقیق اعمال می‌کند و هیچ محتوایی را که کاربر به آن دسترسی ندارد بازنمی‌گرداند.",
      D: "Microsoft Purview DLP به‌طور خودکار ارقام مالی را در پاسخ‌های Copilot سانسور (redact) می‌کند.",
    },
  },
  "real-ab900-29": {
    prompt: "وقتی کاربری از Copilot می‌پرسد: «چه اسناد اخیری با من درباره‌ی 'پروژه فونیکس' به اشتراک گذاشته شده؟»، Copilot اسناد شخصی‌سازی‌شده‌ای از OneDrive، SharePoint و Teams ارائه می‌دهد. Microsoft Graph چه نقش اصلی‌ای در ایجاد این پاسخ ایفا می‌کند؟",
    options: {
      A: "دانش پیش‌آموزش‌دیده‌ی جهانی خود را در اختیار LLM قرار می‌دهد.",
      B: "به‌عنوان موتور اعمال خط‌مشی‌های سردبیری (redaction) عمل می‌کند.",
      C: "به‌عنوان یک ایندکس معنایی عمل می‌کند که درخواست کاربر را به زمینه، روابط و مجوزهای کاربر برای داده‌های سازمانی نگاشت می‌کند.",
      D: "خط‌مشی‌های Conditional Access را به‌صورت بلادرنگ اعمال می‌کند.",
    },
  },
  "real-ab900-30": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "برای استفاده‌ی مدیران از SharePoint Advanced Management، همه‌ی کاربران سازمان شما به لایسنس Microsoft 365 Copilot نیاز دارند",
      "SharePoint Advanced Management می‌تواند به محدودکردن دسترسی Microsoft 365 Copilot به محتوای Microsoft SharePoint کمک کند",
      "SharePoint Advanced Management به‌صورت لایسنس مستقل برای سازمان‌های بدون Microsoft 365 Copilot در دسترس است",
    ],
  },
  "real-ab900-31": {
    prompt: "یک عامل هوش مصنوعی که برای خلاصه‌سازی سوابق مشتریان آماده می‌شود، تعصب (bias) به نفع مناطق جغرافیایی خاصی نشان می‌دهد. کدام اصل Microsoft Responsible AI در درجه‌ی اول نقض می‌شود و باید پیش از استقرار برطرف شود؟",
    options: { A: "انصاف (Fairness)", B: "شفافیت", C: "پاسخگویی", D: "فراگیری (Inclusiveness)" },
  },
  "real-ab900-32": {
    prompt: "بخش کامپلاینس به گزارشی نیاز دارد که سایت‌های SharePoint حاوی اسناد بسیار حساس را که با گروه‌های بزرگی مانند «همه به‌جز کاربران خارجی» به اشتراک گذاشته شده‌اند فهرست کند. کدام قابلیت مایکروسافت برای ایجاد گزارش‌های Data Access Governance (DAG) طراحی شده که محتوای حساس و رویه‌ی اشتراک‌گذاری بیش‌ازحد سهل‌گیرانه را شناسایی می‌کند؟",
    options: {
      A: "Microsoft Entra ID Protection",
      B: "Microsoft Purview Data Loss Prevention (DLP)",
      C: "Microsoft Defender for Cloud Apps",
      D: "SharePoint Advanced Management (SAM)",
    },
  },
  "real-ab900-33": {
    prompt: "شما یک سایت Microsoft SharePoint مطابق تصویر زیر دارید. باید تنظیمات SLabel1 را مشاهده کنید. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "پرتال Microsoft Defender",
      B: "SharePoint Admin Center",
      C: "Microsoft 365 Admin Center",
      D: "پرتال Microsoft Purview",
    },
  },
  "real-ab900-34": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "می‌توانید از Microsoft Defender for Office 365 برای بررسی شاخص‌های تهدید که در یک نمای واحد میان حوادث ایمیل، هویت و دستگاه هم‌بسته شده‌اند استفاده کنید.",
      B: "می‌توانید از Microsoft Defender XDR برای بررسی شاخص‌های تهدید که در یک نمای واحد میان حوادث ایمیل، هویت و دستگاه هم‌بسته شده‌اند استفاده کنید.",
      C: "می‌توانید از Microsoft Purview Compliance Manager برای بررسی شاخص‌های تهدید که در یک نمای واحد میان حوادث ایمیل، هویت و دستگاه هم‌بسته شده‌اند استفاده کنید.",
      D: "می‌توانید از Microsoft Purview Data Loss Prevention برای بررسی شاخص‌های تهدید که در یک نمای واحد میان حوادث ایمیل، هویت و دستگاه هم‌بسته شده‌اند استفاده کنید.",
    },
  },
  "real-ab900-35": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است که شامل کاربری به‌نام User1 است. User1 قصد دارد ظرف دو هفته شرکت شما را ترک کند. باید فعالیت‌های User1 را ثبت کنید تا مشخص شود آیا این کاربر داده‌ای را استخراج (exfiltrate) می‌کند. باید از کدام راه‌حل Microsoft Purview استفاده کنید؟",
    options: {
      A: "Communication Compliance",
      B: "Data Security Posture Management",
      C: "Insider Risk Management",
      D: "Data Lifecycle Management",
    },
  },
  "real-ab900-36": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است که شامل سایت‌های Microsoft SharePoint و تیم‌های Microsoft Teams است. متوجه می‌شوید که سایت‌ها و تیم‌ها با کاربرانی خارج از سازمان شما به اشتراک گذاشته می‌شوند. باید مشخص کنید کدام سایت‌ها و تیم‌ها با کاربران خارجی به اشتراک گذاشته شده‌اند. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "SharePoint Admin Center",
      B: "Microsoft Teams Admin Center",
      C: "Microsoft 365 Admin Center",
      D: "پرتال Microsoft Defender",
    },
  },
  "real-ab900-37": {
    prompt: "یک سازمان می‌خواهد Copilot هرگز نتایج جستجوی عمومی وب را در پاسخ‌ها لحاظ نکند تا از افشای احتمالی prompt/داده‌ی داخلی جلوگیری شود. مدیر باید کدام قابلیت Copilot را غیرفعال کند تا مبنای وب (web grounding) برای پاسخ‌های Copilot مسدود شود؟",
    options: {
      A: "Copilot in Word",
      B: "Copilot for Microsoft 365",
      C: "Copilot Chat",
      D: "قابلیت‌های Copilot در اپلیکیشن‌های Microsoft 365",
    },
  },
  "real-ab900-38": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "گزارش استفاده‌ی Microsoft 365 Copilot می‌تواند برای مشاهده‌ی prompt های ارسال‌شده توسط کاربران استفاده شود",
      "گزارش استفاده‌ی Microsoft 365 Copilot تعداد کل کاربران یکتای سازمان شما را نشان می‌دهد",
      "گزارش استفاده‌ی Microsoft 365 Copilot استفاده از Copilot را برای هر اپلیکیشن Microsoft 365 به‌طور جداگانه نشان می‌دهد",
    ],
  },
  "real-ab900-39": {
    prompt: "قصد دارید یک عامل در اپلیکیشن Microsoft 365 Copilot ایجاد کنید تا یک مسئله‌ی کسب‌وکاری را حل کند. دو دلیل برای ایجاد این عامل کدام‌اند؟ (هر پاسخ درست یک راه‌حل کامل است. نکته: هر انتخاب درست یک امتیاز دارد.)",
    options: {
      A: "باید از یک مدل هوش مصنوعی سفارشی استفاده کنید.",
      B: "باید از مجموعه‌ی دستورالعمل سفارشی‌ای استفاده کنید که با تجربه‌ی Chat متفاوت است.",
      C: "باید درباره‌ی یک سایت خاص استدلال کنید.",
      D: "باید چت‌های مرتبط را در یک notebook از Copilot گروه‌بندی کنید.",
    },
  },
  "real-ab900-40": {
    prompt: "یکی از ریسک‌های مهم حاکمیتی در پیاده‌سازی Microsoft 365 Copilot، احتمال افشای داده‌های سازمانی است. مدیر ارشد کامپلاینس نگران این است که چون Copilot از تمام داده‌هایی که کاربر به آن‌ها دسترسی دارد استفاده می‌کند، ممکن است کاربر به‌طور ناخواسته به اطلاعات حساسی دسترسی پیدا کند که در واقع نباید به آن دسترسی داشته باشد. شایع‌ترین علت این ریسک اشتراک‌گذاری بیش‌ازحد (over-sharing) که مدیران باید آن را به‌عنوان یک وظیفه‌ی حاکمیتی با اولویت بالا پیش از استقرار گسترده‌ی Copilot برطرف کنند، چیست؟",
    options: {
      A: "Copilot هنگام ایندکس‌شدن محتوا، کنترل‌های دسترسی SharePoint را دور می‌زند.",
      B: "مجوزهای بیش‌ازحد گسترده برای سایت‌ها یا فایل‌ها.",
      C: "لاگ‌های چت Copilot مشمول eDiscovery یا نگه‌داری (retention) نمی‌شوند.",
      D: "آموزش مدل Azure OpenAI از داده‌های مستأجر (tenant) استفاده کرده و آن‌ها را در مستأجر نگه می‌دارد.",
    },
  },
  "real-ab900-41": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. باید حوادث و هشدارهای امنیتی ایجادشده توسط دستگاه‌های Windows 11 در سازمان خود را بررسی کنید. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "Microsoft Entra ID Protection",
      B: "Microsoft Defender for Identity",
      C: "Microsoft Purview Insider Risk Management",
      D: "Microsoft Defender for Endpoint",
    },
  },
  "real-ab900-42": {
    prompt: "شرکت شما الزام دارد که همه‌ی سایت‌های Microsoft SharePoint حداقل دو مالک داشته باشند. باید مطمئن شوید سایت‌هایی که کمتر از دو مالک دارند، در صورت عدم رفع مشکل، به‌عنوان فقط‌خواندنی علامت‌گذاری می‌شوند. باید چه چیزی را در SharePoint Admin Center پیکربندی کنید؟",
    options: {
      A: "محدودیت دسترسی در سطح سایت",
      B: "گزارش‌های Data Access Governance",
      C: "مدیریت چرخه‌ی عمر سایت (Site lifecycle management)",
      D: "خط‌مشی مسدودسازی دانلود برای SharePoint و OneDrive",
    },
  },
  "real-ab900-43": {
    prompt: "مدیر IT می‌خواهد شاخص‌های تجمیعی و مربوط به کل مستأجر مانند کاربران فعال Copilot، استفاده بر اساس اپلیکیشن، و دسته‌بندی prompt ها را داشته باشد تا بازگشت سرمایه‌ی (ROI) Copilot را اندازه‌گیری کند. کدام ابزار مدیریتی این ارزیابی تجمیعیِ پذیرش و استفاده را ارائه می‌دهد؟",
    options: {
      A: "لاگ Audit در Microsoft Purview",
      B: "داشبورد تحلیلی Copilot",
      C: "لاگ‌های ورود Microsoft Entra ID",
      D: "وضعیت سرویس Microsoft 365",
    },
  },
  "real-ab900-44": {
    prompt: "پیش از انتشار یک عامل هوش مصنوعی ساخته‌شده در Copilot Studio که به یک پایگاه‌داده‌ی مالی محلی (on-premises) وصل می‌شود، مدیر باید دسترسی، عملکرد و وضعیت چرخه‌ی عمر آن را بررسی کند. کدام دو مرکز مدیریت مایکروسافت عمدتاً برای مدیریت و نظارت بر چرخه‌ی عمر و تنظیمات محیط این عامل استفاده می‌شوند؟ (هر پاسخ درست بخشی از راه‌حل است. نکته: هر انتخاب درست یک امتیاز دارد.)",
    options: {
      A: "پرتال Microsoft Purview",
      B: "Microsoft Entra Admin Center",
      C: "Microsoft 365 Admin Center",
      D: "Microsoft Power Platform Admin",
      E: "Exchange Admin Center",
    },
  },
  "real-ab900-45": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "از SharePoint Admin Center می‌توانید یک سرور ایجاد کنید.",
      B: "از SharePoint Admin Center می‌توانید یک کاربر ایجاد کنید.",
      C: "از SharePoint Admin Center می‌توانید یک سایت ایجاد کنید.",
      D: "از SharePoint Admin Center می‌توانید یک نقش ایجاد کنید.",
    },
  },
  "real-ab900-46": {
    prompt: "باید یک عامل Microsoft 365 Copilot ایجاد کنید که بتواند نمودارها و تجسم‌های داده‌ای را بر اساس یک کارپوشه‌ی Microsoft Excel بسازد. برای این عامل باید چه چیزی را پیکربندی کنید؟",
    options: {
      A: "قابلیت تولید تصویر",
      B: "قالب Scrum Assistant",
      C: "قالب Customer Insights Assistant",
      D: "قابلیت Code Interpreter",
    },
  },
  "real-ab900-47": {
    prompt: "شرکت شما در حال آزمایش استفاده از Microsoft 365 Copilot است و ۱۰۰ لایسنس Microsoft 365 Copilot خریداری کرده. باید گزارش‌های تفصیلی از استفاده‌ی Copilot در Microsoft Teams مشاهده کنید، مانند ساعات جلسه‌ی خلاصه‌شده توسط Copilot و اقدامات جلسه‌ای که Copilot انجام داده. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "گزارش آمادگی Microsoft 365 Copilot در Microsoft 365 Admin Center",
      B: "گزارش استفاده‌ی Microsoft 365 Copilot در Microsoft 365 Admin Center",
      C: "داشبورد Microsoft 365 Copilot در Microsoft Viva Insights",
      D: "گزارش استفاده‌ی اپلیکیشن‌های Microsoft 365 در Microsoft 365 Admin Center",
    },
  },
  "real-ab900-48": {
    prompt: "کاربری به‌نام User1 عامل Microsoft 365 Copilot به‌نام Agent1 را ایجاد کرده و آن را با کاربری به‌نام User2 به اشتراک می‌گذارد. اگر مدیری Agent1 را مسدود کند، چه اتفاقی می‌افتد؟",
    options: {
      A: "Agent1 برای User1 و User2 در دسترس می‌ماند تا زمانی که کاربران آن را به‌صورت دستی حذف نصب کنند. هیچ کاربر دیگری نمی‌تواند Agent1 را نصب کند.",
      B: "Agent1 برای User1 و User2 در دسترس می‌ماند، و هیچ کاربر دیگری نمی‌تواند Agent1 را نصب کند.",
      C: "Agent1 از User2 حذف می‌شود، و User1 همچنان می‌تواند از Agent1 استفاده کند.",
      D: "Agent1 از User1 و User2 حذف می‌شود، و هیچ کاربری نمی‌تواند Agent1 را نصب کند.",
    },
  },
  "real-ab900-49": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "مدیران می‌توانند یک عامل Copilot مشخص را از تمام کاربران حذف کنند",
      "از Microsoft 365 Admin Center، مدیران می‌توانند prompt های یک عامل Copilot را پیکربندی کنند",
      "مدیران می‌توانند عامل‌های Copilot را برای کاربران خاصی در دسترس قرار دهند",
    ],
  },
  "real-ab900-50": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "از Microsoft Teams Admin Center می‌توانید یک لایسنس Teams به کاربری اختصاص دهید.",
      B: "از Microsoft Teams Admin Center می‌توانید کلاینت Teams را مستقر کنید.",
      C: "از Microsoft Teams Admin Center می‌توانید یک دستگاه اتاق Teams را مدیریت کنید.",
      D: "از Microsoft Teams Admin Center می‌توانید مانع ایجاد تیم توسط کاربران شوید.",
    },
  },
  "real-ab900-51": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. همه‌ی کاربران لایسنس Microsoft 365 Copilot دارند. باید مشخص کنید محتوای حساس در کجای تعاملات Copilot استفاده می‌شود، الگوهای استفاده از محتوا را تحلیل کنید، و توصیه‌هایی برای اعمال حفاظت‌های مناسب ارائه دهید. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "Microsoft Viva Insights",
      B: "راه‌حل Microsoft Purview DSPM for AI",
      C: "Microsoft Security Copilot",
      D: "راه‌حل Microsoft Purview Insider Risk Management",
    },
  },
  "real-ab900-52": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. به همه‌ی کاربران لایسنس Microsoft 365 Copilot اختصاص داده شده. برخی کاربران گزارش می‌دهند پاسخ‌هایی از Copilot دریافت می‌کنند که حاوی اطلاعاتی از یک سایت Microsoft SharePoint به‌نام Finance است. این کاربران می‌گویند اطلاعات از نظر تجاری حساس است. باید مانع شوید Copilot پاسخ‌هایی حاوی اطلاعات از سایت Finance ارائه دهد. چه کاری باید انجام دهید؟",
    options: {
      A: "یک خط‌مشی Information Barrier (IB) در Microsoft Purview ایجاد کنید.",
      B: "یک کانکتور داده در Microsoft Defender ایجاد کنید.",
      C: "یک خط‌مشی Conditional Access در Microsoft Entra ایجاد کنید.",
      D: "مجوزهای سایت Finance را پیکربندی کنید.",
    },
  },
  "real-ab900-53": {
    prompt: "یک مدیر می‌پرسد: «تفاوت اصلی توانمندی‌ها میان Microsoft 365 Copilot که در Word/Excel ادغام شده و یک عامل هوش مصنوعی سفارشی که در Copilot Studio ساخته شده چیست؟» پاسخ درست چیست؟",
    options: {
      A: "فقط Copilot ادغام‌شده می‌تواند به داده‌های Microsoft Graph دسترسی داشته باشد و آن‌ها را خلاصه کند.",
      B: "Copilot ادغام‌شده یک دستیار بهره‌وری عمومی است. عامل‌های هوش مصنوعی سفارشی برای وظایف چندمرحله‌ای خاص و یکپارچگی با سیستم‌های خارجی طراحی شده‌اند.",
      C: "فقط عامل‌های هوش مصنوعی سفارشی می‌توانند پاسخ‌ها را بر پایه‌ی داده‌های سازمانی قرار دهند.",
      D: "عامل‌های سفارشی فقط از طریق پرتال Copilot Studio قابل دسترسی‌اند، درحالی‌که Copilot در اپلیکیشن‌ها جاسازی شده است.",
    },
  },
  "real-ab900-54": {
    prompt: "یک مدیر بخش یک prompt پیچیده و بسیار مؤثر برای Microsoft 365 Copilot جهت تحلیل داده‌های فروش هفتگی توسعه داده. این مدیر می‌خواهد همه‌ی ۳۰ عضو تیم فروشش دسترسی ساده و یکسانی به این قالب prompt خاص داشته باشند. کدام روش برای اطمینان از استفاده‌ی یکنواخت این قالب باارزش توسط کل تیم توصیه می‌شود؟",
    options: {
      A: "از رابط Copilot Studio برای انتشار prompt به‌عنوان یک عامل جدید استفاده کنید.",
      B: "متن prompt را با ایمیل برای تیم ارسال کنید و به آن‌ها بگویید آن را در OneDrive شخصی خود ذخیره کنند.",
      C: "قالب prompt را مستقیماً از کتابخانه‌ی prompt های Microsoft 365 Copilot به اشتراک بگذارید.",
      D: "یک جریان Power Automate ایجاد کنید که prompt را هفتگی اجرا کند.",
    },
  },
  "real-ab900-55": {
    prompt: "در حال ارزیابی راه‌حل‌های Microsoft Purview هستید. برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید.",
    statements: [
      "یک خط‌مشی Communication Compliance می‌تواند متن نامناسب را در پیام‌های Microsoft Teams شناسایی کند",
      "یک خط‌مشی Communication Compliance می‌تواند زبان توهین‌آمیز را در prompt های Microsoft 365 Copilot شناسایی کند",
      "یک خط‌مشی Communication Compliance می‌تواند برای نگه‌داری پیام‌های ایمیل به مدت ۱۰ سال استفاده شود",
    ],
  },
  "real-ab900-56": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "از گالری prompt های Copilot می‌توانید یک prompt ذخیره‌شده را ویرایش کنید",
      "از گالری prompt های Copilot می‌توانید یک prompt ذخیره‌شده را با یک تیم Microsoft Teams به اشتراک بگذارید",
      "می‌توانید یک لینک اشتراک‌گذاری برای prompt ای بسازید که در گالری prompt های Copilot ذخیره نشده است",
    ],
  },
  "real-ab900-57": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. متوجه می‌شوید برخی کاربران نمی‌توانند وارد Microsoft 365 شوند. باید تلاش‌های ناموفق ورود به Microsoft 365 را مشاهده کنید. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "پرتال Microsoft Defender",
      B: "Microsoft Entra Admin Center",
      C: "پرتال Microsoft Purview",
      D: "Microsoft 365 Admin Center",
    },
  },
  "real-ab900-58": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است که شامل یک سایت Microsoft SharePoint به‌نام Site1 است. باید مانع شوید کاربران محتوای Site1 را با کاربران خارجی به اشتراک بگذارند. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "محتوای Site1",
      B: "SharePoint Admin Center",
      C: "Microsoft 365 Admin Center",
      D: "Microsoft Entra Admin Center",
    },
  },
  "real-ab900-59": {
    prompt: "کدام عبارت Microsoft Defender XDR را به‌درستی توصیف می‌کند؟",
    options: {
      A: "Microsoft Defender XDR یک مجموعه‌ی سازمانی یکپارچه است که شناسایی، پیشگیری، بررسی و پاسخ را در سراسر اندپوینت‌ها، هویت‌ها، ایمیل و اپلیکیشن‌ها هماهنگ می‌کند تا حفاظت یکپارچه در برابر حملات پیچیده ارائه دهد.",
      B: "Microsoft Entra Conditional Access یک مجموعه‌ی سازمانی یکپارچه است که شناسایی، پیشگیری، بررسی و پاسخ را در سراسر اندپوینت‌ها، هویت‌ها، ایمیل و اپلیکیشن‌ها هماهنگ می‌کند تا حفاظت یکپارچه در برابر حملات پیچیده ارائه دهد.",
      C: "Microsoft Entra ID Protection یک مجموعه‌ی سازمانی یکپارچه است که شناسایی، پیشگیری، بررسی و پاسخ را در سراسر اندپوینت‌ها، هویت‌ها، ایمیل و اپلیکیشن‌ها هماهنگ می‌کند تا حفاظت یکپارچه در برابر حملات پیچیده ارائه دهد.",
      D: "Microsoft Purview یک مجموعه‌ی سازمانی یکپارچه است که شناسایی، پیشگیری، بررسی و پاسخ را در سراسر اندپوینت‌ها، هویت‌ها، ایمیل و اپلیکیشن‌ها هماهنگ می‌کند تا حفاظت یکپارچه در برابر حملات پیچیده ارائه دهد.",
    },
  },
  "real-ab900-60": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. کاربری به‌نام Alex Wilber مطابق تصویر زیر به یک نقش مدیریتی اختصاص یافته.",
    options: {
      A: "Alex Wilber می‌تواند همه‌ی کاربران مستأجر Microsoft Entra را مشاهده کند.",
      B: "Alex Wilber می‌تواند همه‌ی محتوای سایت‌های Microsoft SharePoint را مشاهده کند.",
      C: "Alex Wilber می‌تواند همه‌ی محتوای صندوق‌های پستی Microsoft Exchange را بخواند.",
      D: "Alex Wilber می‌تواند eDiscovery روی prompt های Microsoft 365 Copilot انجام دهد.",
    },
  },
  "real-ab900-61": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "می‌توانید از یک گروه امنیتی Microsoft Entra برای اختصاص مجوز به منابع Microsoft Entra ID استفاده کنید",
      "می‌توانید از یک گروه امنیتی Microsoft Entra برای اختصاص لایسنس‌های Microsoft 365 استفاده کنید",
      "می‌توانید از یک گروه امنیتی Microsoft Entra برای اختصاص مجوز به صندوق‌های پستی Microsoft Exchange استفاده کنید",
    ],
  },
  "real-ab900-62": {
    prompt: "کدام عبارت مجوزدهی (authorization) در Microsoft 365 را دقیقاً توصیف می‌کند؟",
    options: {
      A: "فرآیندی برای تأیید اینکه یک هویت واقعاً همان چیزی است که ادعا می‌کند",
      B: "فرآیندی که پیش از دسترسی یک هویت به منابع، روش‌های احراز هویت اضافی را الزامی می‌کند",
      C: "فرآیندی برای بررسی اینکه آیا یک هویت اجازه‌ی دسترسی به یک منبع را دارد",
      D: "فرآیندی برای اعتبارسنجی یک هویت از یک سیستم خارجی",
    },
  },
  "real-ab900-63": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "یک عضو سایت Microsoft SharePoint می‌تواند کاربران را برای دسترسی به محتوای سایت دعوت کند",
      "یک مالک سایت Microsoft SharePoint می‌تواند گروه‌های Microsoft 365 را به‌عنوان عضو سایت اضافه کند",
      "یک مالک سایت Microsoft SharePoint می‌تواند یک مالک دیگر را از سایت حذف کند",
    ],
  },
  "real-ab900-64": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. کدام دو وظیفه را می‌توانید با استفاده از Exchange Admin Center انجام دهید؟ (هر پاسخ درست بخشی از راه‌حل است. نکته: هر انتخاب درست یک امتیاز دارد.)",
    options: {
      A: "اختصاص یک لایسنس Microsoft Exchange.",
      B: "ایجاد یک قانون جریان ایمیل (mail flow rule).",
      C: "ایجاد یک صندوق پستی اشتراکی (shared mailbox).",
      D: "افزودن یک دامنه‌ی سفارشی.",
    },
  },
  "real-ab900-65": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "در Microsoft Entra Privileged Identity Management (PIM)، مدیری شما را برای نقش User Administrator واجد شرایط کرده. پیش از ایجاد یک حساب کاربری، باید این نقش را فعال کنید.",
      B: "در Microsoft Entra Privileged Identity Management (PIM)، مدیری شما را برای نقش User Administrator واجد شرایط کرده. پیش از ایجاد یک حساب کاربری، باید اپلیکیشن Microsoft Authenticator را نصب کنید.",
      C: "در Microsoft Entra Privileged Identity Management (PIM)، مدیری شما را برای نقش User Administrator واجد شرایط کرده. پیش از ایجاد یک حساب کاربری، باید یک لایسنس درخواست کنید.",
      D: "در Microsoft Entra Privileged Identity Management (PIM)، مدیری شما را برای نقش User Administrator واجد شرایط کرده. پیش از ایجاد یک حساب کاربری، باید اطلاعات موقعیت مکانی خود را به‌روزرسانی کنید.",
    },
  },
  "real-ab900-66": {
    prompt: "شما Microsoft Entra Admin Center را مطابق تصویر زیر باز می‌کنید. کدام گزینه بیشترین بهبود را در Identity Secure Score ایجاد می‌کند؟",
    options: {
      A: "رفع توصیه‌ی «Do not expire passwords»",
      B: "رفع توصیه‌ی «Use least privileged administrative roles»",
      C: "رفع توصیه‌ی «Enable policy to block legacy authentication»",
      D: "رفع توصیه‌ی «Require multifactor authentication for administrative roles»",
    },
  },
  "real-ab900-67": {
    prompt: "با چه چیزی می‌توانید در صورت شناسایی یک ورود پرخطر (risky sign-in)، حساب کاربری را به‌طور خودکار قفل کنید؟",
    options: {
      A: "Microsoft Defender for Identity",
      B: "Microsoft Entra ID Protection",
      C: "Microsoft Defender for Office 365",
      D: "Microsoft Entra Privileged Identity Management (PIM)",
    },
  },
  "real-ab900-68": {
    prompt: "در حال بررسی خط‌مشی‌های امنیتی شرکت خود در چارچوب یک استراتژی Zero Trust هستید. کدام عبارت اصول Zero Trust را دقیقاً توصیف می‌کند؟",
    options: {
      A: "Zero Trust با کاهش درخواست‌های احراز هویت، تجربه‌ی کاربری را بهبود می‌بخشد.",
      B: "Zero Trust فرض یک نقض امنیتی (breach) را می‌کند و هر درخواست را تأیید می‌کند.",
      C: "Zero Trust با تمام درخواست‌های داخل شبکه‌ی شرکتی به‌عنوان قابل‌اعتماد رفتار می‌کند.",
      D: "Zero Trust نیاز به بازبینی و تنظیم منظم مجوزهای دسترسی را از بین می‌برد.",
    },
  },
  "real-ab900-69": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. باید گزارشی ایجاد کنید که مجوزها و لینک‌های اشتراک‌گذاری فعال محتوای ذخیره‌شده در حساب‌های Microsoft OneDrive را نشان دهد. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "Audit در پرتال Microsoft Defender",
      B: "گزارش‌ها در Microsoft 365 Admin Center",
      C: "Data Access Governance در SharePoint Admin Center",
      D: "eDiscovery در پرتال Microsoft Purview",
    },
  },
  "real-ab900-70": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "prompt ها و پاسخ‌های صادرشده توسط کاربران در Microsoft 365 Copilot توسط مایکروسافت برای آموزش مدل‌ها استفاده می‌شوند",
      "محتوای دریافت‌شده از Microsoft Graph توسط مایکروسافت برای آموزش مدل‌ها استفاده می‌شود",
      "Microsoft 365 Copilot به مجوزهای امنیتیِ اشتراک Microsoft 365 شما احترام می‌گذارد",
    ],
  },
  "real-ab900-71": {
    prompt: "شرکت شما از صورت‌حساب بر مبنای مصرف (pay-as-you-go) برای Microsoft 365 Copilot استفاده می‌کند. این شرکت می‌خواهد دید بهتری روی هزینه‌های استفاده از Copilot داشته باشد و بتواند مخارج بخش‌ها را پیش‌بینی کند. باید مطمئن شوید که می‌توانید هزینه‌های Copilot را بر اساس بخش مشاهده کنید. از چه چیزی باید استفاده کنید؟ (برای پاسخ، گزینه‌های مناسب را در بخش پاسخ انتخاب کنید. نکته: هر انتخاب درست یک امتیاز دارد.)",
    options: {
      A: "پرتال: Microsoft 365 Admin Center | قابلیت: یک خط‌مشی صورت‌حساب (billing policy)",
      B: "پرتال: Microsoft 365 Admin Center | قابلیت: یک کانکتور Copilot",
      C: "پرتال: Microsoft Entra Admin Center | قابلیت: یک خط‌مشی auto-claim",
      D: "پرتال: Microsoft Entra Admin Center | قابلیت: یک خط‌مشی صورت‌حساب (billing policy)",
      E: "پرتال: پرتال Microsoft Purview | قابلیت: یک کانکتور Copilot",
      F: "پرتال: پرتال Microsoft Purview | قابلیت: یک خط‌مشی auto-claim",
    },
  },
  "real-ab900-72": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "کاربرانی که لایسنس Microsoft 365 E5 دارند نمی‌توانند عامل‌های Microsoft 365 Copilot مبتنی بر وب ایجاد کنند",
      "کاربران برای استفاده از عامل Analyst باید لایسنس Microsoft 365 Copilot داشته باشند",
      "کاربران می‌توانند از یک prompt به زبان طبیعی برای ایجاد یک عامل Microsoft 365 Copilot استفاده کنند",
    ],
  },
  "real-ab900-73": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "می‌توانید از راه‌حل Audit در Microsoft Purview برای یافتن تمام محتوای مرتبط با عبارت «Project Falcon» در ایمیل‌های ردوبدل‌شده بین دو کاربر استفاده کنید.",
      B: "می‌توانید از راه‌حل Data Catalog در Microsoft Purview برای یافتن تمام محتوای مرتبط با عبارت «Project Falcon» در ایمیل‌های ردوبدل‌شده بین دو کاربر استفاده کنید.",
      C: "می‌توانید از راه‌حل eDiscovery در Microsoft Purview برای یافتن تمام محتوای مرتبط با عبارت «Project Falcon» در ایمیل‌های ردوبدل‌شده بین دو کاربر استفاده کنید.",
      D: "می‌توانید از راه‌حل Insider Risk Management در Microsoft Purview برای یافتن تمام محتوای مرتبط با عبارت «Project Falcon» در ایمیل‌های ردوبدل‌شده بین دو کاربر استفاده کنید.",
    },
  },
  "real-ab900-74": {
    prompt: "شرکت شما از خط‌مشی‌های Microsoft Purview Data Loss Prevention (DLP) استفاده می‌کند. کاربری به‌نام User1 اطلاعات حساسی را از طریق Microsoft Teams با یک کاربر خارجی به اشتراک می‌گذارد. باید محتوای حساس به‌اشتراک‌گذاشته‌شده را شناسایی کنید. از چه چیزی باید در پرتال Microsoft Purview استفاده کنید؟",
    options: { A: "Diagnostics", B: "Data Explorer", C: "Content Explorer", D: "Activity Explorer" },
  },
  "real-ab900-75": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "Zero Trust نیازمند یک اشتراک Azure است",
      "Zero Trust یک استراتژی امنیتی است، نه یک محصول خاص",
      "از طریق Microsoft 365 Admin Center می‌توانید Zero Trust را برای سازمان خود فعال کنید",
    ],
  },
  "real-ab900-76": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "Microsoft Copilot Studio شامل سیگنال‌هایی مانند تاریخچه‌ی همکاری، ارتباط اسناد و فراوانی ارتباطات است که بر پاسخ‌های Microsoft 365 Copilot تأثیر می‌گذارند.",
      B: "Microsoft Graph شامل سیگنال‌هایی مانند تاریخچه‌ی همکاری، ارتباط اسناد و فراوانی ارتباطات است که بر پاسخ‌های Microsoft 365 Copilot تأثیر می‌گذارند.",
      C: "Microsoft Purview شامل سیگنال‌هایی مانند تاریخچه‌ی همکاری، ارتباط اسناد و فراوانی ارتباطات است که بر پاسخ‌های Microsoft 365 Copilot تأثیر می‌گذارند.",
      D: "Microsoft Viva Insights شامل سیگنال‌هایی مانند تاریخچه‌ی همکاری، ارتباط اسناد و فراوانی ارتباطات است که بر پاسخ‌های Microsoft 365 Copilot تأثیر می‌گذارند.",
    },
  },
  "real-ab900-77": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "کاربران می‌توانند به‌صورت ناشناس از Microsoft 365 Copilot استفاده کنند",
      "مدیران می‌توانند خرید مستقیم لایسنس‌های Microsoft 365 Copilot توسط کاربران را مجاز کنند",
      "لایسنس‌های Microsoft 365 Copilot را می‌توان به کاربران مهمان (guest) Microsoft Entra ID از سازمان‌های دیگر اختصاص داد",
    ],
  },
  "real-ab900-78": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. باید از Microsoft Purview برای برآورده‌کردن الزامات زیر استفاده کنید: • کشف و طبقه‌بندی داده‌های حساس در چند پلتفرم. • جلوگیری از اشتراک‌گذاری مالکیت فکری با کاربران خارجی توسط کاربران. برای هر الزام باید از کدام راه‌حل Microsoft Purview استفاده کنید؟ (برای پاسخ، گزینه‌های مناسب را در بخش پاسخ انتخاب کنید. نکته: هر انتخاب درست یک امتیاز دارد.)",
    options: {
      A: "کشف و طبقه‌بندی داده‌های حساس در چند پلتفرم: Communication Compliance | جلوگیری از اشتراک‌گذاری مالکیت فکری: Data Loss Prevention",
      B: "کشف و طبقه‌بندی داده‌های حساس در چند پلتفرم: Data Loss Prevention | جلوگیری از اشتراک‌گذاری مالکیت فکری: Information Protection",
      C: "کشف و طبقه‌بندی داده‌های حساس در چند پلتفرم: Data Loss Prevention | جلوگیری از اشتراک‌گذاری مالکیت فکری: Insider Risk Management",
      D: "کشف و طبقه‌بندی داده‌های حساس در چند پلتفرم: Information Protection | جلوگیری از اشتراک‌گذاری مالکیت فکری: Communication Compliance",
      E: "کشف و طبقه‌بندی داده‌های حساس در چند پلتفرم: Information Protection | جلوگیری از اشتراک‌گذاری مالکیت فکری: Insider Risk Management",
      F: "کشف و طبقه‌بندی داده‌های حساس در چند پلتفرم: Insider Risk Management | جلوگیری از اشتراک‌گذاری مالکیت فکری: Data Loss Prevention",
    },
  },
  "real-ab900-79": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 E5 است. باید مانع شوید کاربران داده‌های مالی داخلی شرکت را با کاربران خارجی به اشتراک بگذارند. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "گروه‌های نقش (Role groups)",
      B: "خط‌مشی‌های Data Loss Prevention (DLP)",
      C: "خط‌مشی‌های Insider Risk Management",
      D: "برچسب‌های نگه‌داری (Retention labels)",
    },
  },
  "real-ab900-80": {
    prompt: "باید فایل‌ها و ایمیل‌هایی را که حاوی شماره‌های تأمین اجتماعی (SSN) و شماره‌های کارت اعتباری هستند شناسایی کنید. از چه چیزی باید در پرتال Microsoft Purview استفاده کنید؟",
    options: {
      A: "Data Explorer",
      B: "گزارش‌های Information Protection",
      C: "خط‌مشی‌های Information Protection",
      D: "Activity Explorer",
    },
  },
  "real-ab900-81": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "برچسب‌های حساسیت Microsoft Purview را می‌توان روی Azure Blob Storage اعمال کرد.",
      B: "برچسب‌های حساسیت Microsoft Purview را می‌توان روی مکالمات Microsoft 365 Copilot اعمال کرد.",
      C: "برچسب‌های حساسیت Microsoft Purview را می‌توان روی سایت‌های Microsoft SharePoint اعمال کرد.",
    },
  },
  "real-ab900-82": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "با Restricted SharePoint Search می‌توانید دسترسی مدیریتی به سایت‌های Microsoft SharePoint را محدود کنید، بدون اینکه مانع دسترسی کاربران به فایل‌ها و محتوایی شوید که مجوز آن‌ها را دارند.",
      B: "با Restricted SharePoint Search می‌توانید دسترسی کاربران مهمان (guest) به سایت‌های Microsoft SharePoint را محدود کنید، بدون اینکه مانع دسترسی کاربران به فایل‌ها و محتوایی شوید که مجوز آن‌ها را دارند.",
      C: "با Restricted SharePoint Search می‌توانید دسترسی Microsoft 365 Copilot به سایت‌های Microsoft SharePoint را محدود کنید، بدون اینکه مانع دسترسی کاربران به فایل‌ها و محتوایی شوید که مجوز آن‌ها را دارند.",
      D: "با Restricted SharePoint Search می‌توانید دسترسی Microsoft Purview eDiscovery به سایت‌های Microsoft SharePoint را محدود کنید، بدون اینکه مانع دسترسی کاربران به فایل‌ها و محتوایی شوید که مجوز آن‌ها را دارند.",
    },
  },
  "real-ab900-83": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 E5 است. یک برچسب حساسیت Microsoft Purview به‌نام «Label1» ایجاد می‌کنید. باید مطمئن شوید کاربران می‌توانند «Label1» را روی فایل‌های Microsoft 365 اعمال کنند. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "یک خط‌مشی برچسب حساسیت",
      B: "یک طبقه‌بند قابل‌آموزش (trainable classifier)",
      C: "یک خط‌مشی برچسب نگه‌داری",
      D: "یک خط‌مشی برچسب‌گذاری خودکار",
    },
  },
  "real-ab900-84": {
    prompt: "شرکت شما یک خط‌مشی کامپلاینس مکتوب دارد که طبق آن همه‌ی ایمیل‌ها باید هفت سال نگه‌داری شوند و سپس به‌طور دائم حذف شوند. کدام راه‌حل Microsoft Purview را باید استفاده کنید؟",
    options: {
      A: "Information Protection",
      B: "Data Lifecycle Management",
      C: "Data Loss Prevention",
      D: "Insider Risk Management",
    },
  },
  "real-ab900-85": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "در Microsoft 365 Admin Center، شاخص «Credits Used» در گزارش Copilot Credits تعداد کل کردیت‌های مصرف‌شده توسط کاربران سازمان شما که از Microsoft Teams استفاده می‌کنند و با عامل‌های مبتنی بر کار در Microsoft 365 Copilot Chat تعامل دارند را نشان می‌دهد.",
      B: "در Microsoft 365 Admin Center، شاخص «Credits Used» در گزارش Copilot Credits تعداد کل کردیت‌های مصرف‌شده توسط کاربرانی که به سازمان شما تعلق ندارند و با عامل‌های کسب‌وکاری در Microsoft 365 Copilot Chat تعامل دارند را نشان می‌دهد.",
      C: "در Microsoft 365 Admin Center، شاخص «Credits Used» در گزارش Copilot Credits تعداد کل کردیت‌های مصرف‌شده توسط کاربرانی از سازمان شما که لایسنس Microsoft 365 Copilot دارند و با عامل‌های مبتنی بر کار در Microsoft 365 Copilot Chat تعامل دارند را نشان می‌دهد.",
      D: "در Microsoft 365 Admin Center، شاخص «Credits Used» در گزارش Copilot Credits تعداد کل کردیت‌های مصرف‌شده توسط کاربرانی از سازمان شما که لایسنس Microsoft 365 Copilot ندارند و با عامل‌های مبتنی بر کار در Microsoft 365 Copilot Chat تعامل دارند را نشان می‌دهد.",
    },
  },
  "real-ab900-86": {
    prompt: "شما یک سایت Microsoft SharePoint به‌نام «Site1» و یک گروه امنیتی به‌نام «Group1» دارید. می‌خواهید مانع شوید همه‌ی کاربرانی که در حال حاضر به «Site1» دسترسی دارند به محتوای آن سایت دسترسی داشته باشند، مگر اینکه کاربر عضو گروه «Group1» هم باشد. کدام تنظیمات را باید پیکربندی کنید؟ (برای پاسخ، تنظیمات مناسب را در بخش پاسخ انتخاب کنید.)",
    options: {
      A: "Email",
      B: "Privacy",
      C: "External sharing",
      D: "Sensitivity label",
      E: "Limit content discovery",
      F: "Limited-access site",
    },
  },
  "real-ab900-87": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "Microsoft 365 Copilot به برچسب‌های حساسیت Microsoft Purview احترام می‌گذارد",
      "Microsoft 365 Copilot خط‌مشی‌های Data Loss Prevention (DLP) در Microsoft Purview را نادیده می‌گیرد",
    ],
  },
  "real-ab900-88": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "یک برچسب حساسیت را می‌توان روی یک سایت Microsoft SharePoint اعمال کرد",
      "یک برچسب حساسیت را می‌توان روی یک پیام ایمیل در Microsoft Exchange اعمال کرد",
      "یک برچسب حساسیت را می‌توان روی دستگاه‌های Windows 11 اعمال کرد",
    ],
  },
  "real-ab900-89": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. شرکت شما اخیراً لایسنس‌های Microsoft 365 Copilot را برای برخی کاربران خریداری کرده. باید تعیین کنید چند کاربر بدون لایسنس از Copilot در Microsoft Teams استفاده کرده‌اند. کدام گزارش استفاده را باید در Microsoft 365 Admin Center استفاده کنید؟",
    options: {
      A: "Microsoft 365 Copilot Chat",
      B: "Microsoft 365 Copilot Search",
      C: "Microsoft 365 Apps",
      D: "Microsoft 365 Copilot",
    },
  },
  "real-ab900-90": {
    prompt: "کاربری به‌نام «User1» مسئول گزارش‌دهی درآمد فصلی است. «User1» باید روندهای عملکرد را تشخیص دهد، بینش‌های تصویری به‌دست آورد، و خلاصه‌ای از ناهنجاری‌ها (anomalies) در چندین فایل حاوی مجموعه‌داده‌های مختلف ایجاد کند. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "عامل «Analyst» در Microsoft 365 Copilot",
      B: "عامل «Researcher» در Microsoft 365 Copilot",
      C: "جستجوی Microsoft 365 Copilot",
      D: "Copilot in Excel",
    },
  },
  "real-ab900-91": {
    prompt: "شرکت شما در حال بررسی لایسنس‌دهی Microsoft 365 Copilot است. در کدام سناریو باید از صورت‌حساب بر مبنای مصرف (pay-as-you-go) استفاده کنید؟",
    options: {
      A: "برای اعطای دسترسی کاربران به دستیار هوش مصنوعی در Copilot in Word",
      B: "برای خلاصه‌سازی اقدامات جلسات Microsoft Teams",
      C: "برای تولید تصویر در چت‌های Premium",
      D: "برای دراختیارگذاشتن یک عامل سفارشی برای کاربران بدون لایسنس",
    },
  },
  "real-ab900-92": {
    prompt: "شما از Microsoft 365 Copilot استفاده می‌کنید. می‌خواهید یک prompt را طوری زمان‌بندی کنید که نیمه‌شب اجرا شود. کدام وظیفه را باید در راه‌حل خود بگنجانید؟",
    options: {
      A: "ایجاد یک عامل.",
      B: "ایجاد یک notebook.",
      C: "اجرای prompt.",
      D: "ذخیره‌ی prompt.",
    },
  },
  "real-ab900-93": {
    prompt: "شرکت شما قصد استقرار Microsoft 365 Copilot را دارد. باید به یک کاربر امکان استفاده از Microsoft 365 Copilot را بدهید، از جمله عامل‌های «Researcher» و «Analyst». از چه چیزی باید استفاده کنید؟",
    options: {
      A: "Microsoft 365 Admin Center",
      B: "پرتال Microsoft Purview",
      C: "Microsoft Entra Admin Center",
      D: "پرتال Microsoft Defender",
    },
  },
  "real-ab900-94": {
    prompt: "شرکت شما در حال بررسی استفاده از Microsoft 365 Copilot بر مبنای pay-as-you-go به‌جای خرید لایسنس Microsoft 365 Copilot است. در کدام سناریو صورت‌حساب pay-as-you-go موضوعیت دارد؟",
    options: {
      A: "انجام استدلال چندمرحله‌ای با استفاده از عامل Researcher",
      B: "ایجاد خلاصه‌ای از یک جلسه‌ی Microsoft Teams",
      C: "استفاده از یک عامل سفارشی مبتنی بر داده‌های کاری",
      D: "استفاده از دستیار هوش مصنوعی برای ویرایش یک سند در Copilot in Word",
    },
  },
  "real-ab900-95": {
    prompt: "شرکت شما یک وب‌سایت Microsoft SharePoint به‌نام «Site1» دارد. «Site1» شامل تمام خط‌مشی‌های بخش منابع انسانی شرکت است. این خط‌مشی‌ها به‌عنوان اسناد Microsoft Word ذخیره شده‌اند. همه‌ی کاربران دسترسی خواندن به «Site1» دارند. رئیس منابع انسانی گزارش می‌دهد درخواست‌های کاربران درباره‌ی خط‌مشی‌ها به‌موقع پاسخ داده نمی‌شوند، به‌خصوص نزدیک تعطیلات مهم. باید راه‌حلی پیشنهاد دهید که به کاربران امکان یافتن خط‌مشی‌های منابع انسانی را بدهد. راه‌حل باید فهرستی از سؤالات متداول در اختیار کاربران بگذارد و اطمینان حاصل کند پاسخ‌ها فقط بر پایه‌ی «Site1» هستند. چه چیزی باید در توصیه بگنجانید؟",
    options: {
      A: "دستیار شخصی در Copilot in Word",
      B: "یک عامل سفارشی Microsoft 365 Copilot",
      C: "عامل Researcher در Microsoft 365 Copilot",
      D: "یک notebook در Microsoft 365 Copilot",
    },
  },
  "real-ab900-96": {
    prompt: "پاسخی را انتخاب کنید که جمله را به‌درستی تکمیل می‌کند.",
    options: {
      A: "از طریق پرتال Microsoft Purview، می‌توانید با Data Explorer خط‌مشی‌های حریم خصوصی ایجاد و مدیریت کنید.",
      B: "از طریق پرتال Microsoft Purview، می‌توانید با Data Explorer در صندوق‌های پستی و سایت‌ها جستجو کنید.",
      C: "از طریق پرتال Microsoft Purview، می‌توانید با Data Explorer اطلاعات حساس را شناسایی و محل ذخیره‌ی آن‌ها را تعیین کنید.",
      D: "از طریق پرتال Microsoft Purview، می‌توانید با Data Explorer اثربخشی خط‌مشی‌های Data Loss Prevention (DLP) خود را بررسی کنید.",
    },
  },
  "real-ab900-97": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است که شامل یک سایت Microsoft SharePoint به‌نام «Site1» است. باید تمام تغییراتی را که یک مدیر سایت در تنظیمات «Site1» ایجاد کرده تعیین کنید. کدام گزارش را باید در SharePoint Admin Center استفاده کنید؟ (برای پاسخ، گزارش مناسب را در بخش پاسخ انتخاب کنید.)",
    options: {
      A: "Agent insights",
      B: "App insights",
      C: "مدیریت کاتالوگ",
      D: "Change history",
      E: "Data access governance",
      F: "OneDrive accounts",
    },
  },
  "real-ab900-98": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "Microsoft Purview Communications Compliance می‌تواند متن توهین‌آمیز موجود در تصاویر ذخیره‌شده روی سایت‌های Microsoft SharePoint را شناسایی کند",
      "Microsoft Purview Communications Compliance به‌طور پیش‌فرض هویت کاربران را در طول بررسی‌ها ناشناس (anonymize) می‌کند",
      "Microsoft Purview Communications Compliance به تمام ارتباطات نظارت‌شده یک سلب مسئولیت (disclaimer) اضافه می‌کند",
    ],
  },
  "real-ab900-99": {
    prompt: "سازمان شما دارای یک اشتراک Microsoft 365 است. به همه‌ی کاربران لایسنس Microsoft 365 Copilot اختصاص داده شده. باید مانع شوید کاربران با Copilot تصویر بسازند. از چه چیزی باید استفاده کنید؟",
    options: {
      A: "پرتال Microsoft Defender",
      B: "Microsoft Entra Admin Center",
      C: "پرتال Microsoft Purview",
      D: "Microsoft 365 Admin Center",
    },
  },
  "real-ab900-100": {
    prompt: "برای هر یک از عبارات زیر، اگر عبارت درست است «بله» را انتخاب کنید. در غیر این صورت «خیر» را انتخاب کنید. (نکته: هر انتخاب درست یک امتیاز دارد.)",
    statements: [
      "مدیران می‌توانند سایت‌های خاصی را برای استفاده‌ی Microsoft 365 Copilot مسدود کنند",
      "مدیران می‌توانند مانع شوند Microsoft 365 Copilot در پاسخ به درخواست‌های کاربران از جستجوی وب استفاده کند",
      "مدیران می‌توانند دسترسی به عامل Researcher در Microsoft 365 Copilot را مسدود کنند در حالی که دسترسی به عامل Analyst را مجاز نگه‌دارند",
    ],
  },
  "real-ab900-101": {
    prompt: "باید مطمئن شوید کاربران می‌توانند یک سیستم خارجی را به‌عنوان منبع دانش برای عامل‌های سفارشی Microsoft 365 Copilot استفاده کنند. چه چیزی را باید در Microsoft 365 Admin Center پیکربندی کنید؟ (برای پاسخ، تنظیمات مناسب را در بخش پاسخ انتخاب کنید.)",
    options: {
      A: "Copilot – Connectors",
      B: "Copilot – Search",
      C: "Copilot – Settings",
      D: "Agents – Overview",
      E: "Agents – Tools",
      F: "Agents – Settings",
    },
  },
};

export default ab900_fa;
