import type { QuestionTranslations } from "./types";

// Farsi (فارسی) translations of AB900_QUESTIONS (Microsoft 365 Copilot).
// Hand-translated from the German source in lib/ab900Practice.ts, with
// Microsoft product/feature names kept in their official English form
// (standard practice in Farsi technical/IT writing — translating names
// like "Conditional Access" or "SharePoint" would make them
// unrecognizable against Microsoft's own Farsi documentation and the
// real exam interface, which also keeps these terms in English).
//
// PROGRESS: questions 1-28 of 101 translated and verified against the
// full German source (including cross-checking every option to avoid
// leaving any field blank). Extend incrementally — any question id not
// listed here falls back to German automatically (see
// getAb900Questions in lib/ab900Practice.ts), so a partial file never
// shows a blank field.

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
};

export default ab900_fa;
