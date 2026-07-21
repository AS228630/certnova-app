import type { QuestionTranslations } from "./types";

// Turkish (Türkçe) translations of AB900_QUESTIONS (Microsoft 365
// Copilot). Hand-translated from the German source in
// lib/ab900Practice.ts, with Microsoft product/feature names kept in
// their official English form — standard practice in Turkish
// technical/IT writing (same convention as ab900.fa.ts / ab900.ar.ts /
// ab900.uk.ts / ab900.es.ts / ab900.fr.ts / ab900.ru.ts).
//
// PROGRESS: 100% COMPLETE. All 101 of 101 questions translated. This
// completes AB-900 translation coverage across all 9 site languages
// (de, en, fa, ar, uk, es, fr, ru, tr).

const ab900_tr: QuestionTranslations = {
  "real-ab900-1": {
    prompt: "Aşağıdaki ifadelerin her biri için, ifade doğruysa Evet'i seçin. Aksi takdirde Hayır'ı seçin.",
    statements: [
      "Web verileri üzerinde akıl yürütmek için Microsoft 365 Copilot Chat'i kullanmak için Microsoft 365 Copilot lisansına ihtiyacınız vardır",
      "Microsoft 365 Copilot'ta Researcher aracısını kullanmak için Microsoft 365 Copilot lisansına ihtiyacınız vardır",
      "Microsoft 365 Copilot uygulamasına bir aracı eklemek için Microsoft 365 Copilot lisansına ihtiyacınız vardır",
    ],
  },
  "real-ab900-2": {
    prompt: "Aşağıdaki ifadelerin her biri için, ifade doğruysa Evet'i seçin. Aksi takdirde Hayır'ı seçin.",
    statements: [
      "Microsoft 365 Copilot yalnızca tek tek kullanıcıların izinlerinin olduğu kurumsal verileri gösterir",
      "Microsoft 365 Copilot, diğer Microsoft 365 hizmetleriyle aynı temel veri erişim denetimlerini kullanır",
      "Microsoft 365 Copilot, üçüncü taraf veri kaynaklarından bilgi almak için bağlayıcılar kullanabilir",
    ],
  },
  "real-ab900-3": {
    prompt: "Microsoft 365 Copilot'ta, yapılandırılmamış veriler üzerinde çok adımlı akıl yürütme yapmak için ___ kullanmalısınız.",
    options: { A: "bir not defteri (notebook)", B: "Chat", C: "Analyst aracısı", D: "Researcher aracısı" },
  },
  "real-ab900-4": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 E5 aboneliği var. Üçüncü taraf bir bulut hizmetinin Microsoft Entra'da kimlik doğrulaması yapabildiğinden emin olmanız gerekir. Ne yapılandırmalısınız?",
    options: {
      A: "Bir Microsoft 365 Copilot bağlayıcısı",
      B: "Çok faktörlü kimlik doğrulama (MFA)",
      C: "Bir Koşullu Erişim (Conditional Access) ilkesi",
      D: "Bir uygulama kaydı (app registration)",
    },
  },
  "real-ab900-5": {
    prompt: "Microsoft'un sorumlu yapay zeka ilkesi ___ ile ilgili olarak, insanların kontrolü elinde tutmasını sağlamak için yapay zeka sistemlerinin denetlenmesini gerektirir.",
    options: {
      A: "hesap verebilirlik (accountability)",
      B: "kapsayıcılık",
      C: "gizlilik ve güvenlik",
      D: "güvenilirlik ve güvenlik",
      E: "şeffaflık",
    },
  },
  "real-ab900-6": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Kuruluşunuzun Identity Secure Score'unu değerlendirmeniz gerekir. Puanı hangi iki faktör etkiler? (Her doğru cevap tam bir çözüm sunar. NOT: her doğru seçim bir puan değerindedir.)",
    options: {
      A: "SharePoint sitesi izinleri",
      B: "Genel yönetici sayısı",
      C: "Hiçbir zaman süresi dolmayan parolalar",
      D: "Kullanıcıların konumu",
    },
  },
  "real-ab900-7": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. E-posta kullanıcılarını hedef alan yakın zamandaki bir kimlik avı olayının etkisini incelemeniz gerekir. Ne kullanmalısınız?",
    options: {
      A: "Microsoft Defender portalı",
      B: "Microsoft 365 yönetim merkezi",
      C: "Microsoft Entra yönetim merkezi",
      D: "Microsoft Exchange yönetim merkezi",
    },
  },
  "real-ab900-8": {
    prompt: "Kuruluşunuzda bir Microsoft 365 aboneliği var. Bir kullanıcıya lisans atamanız gerekir. Ne kullanmalısınız?",
    options: {
      A: "Microsoft Purview portalı",
      B: "Microsoft 365 yönetim merkezi",
      C: "Microsoft Teams yönetim merkezi",
    },
  },
  "real-ab900-9": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "Microsoft 365 Copilot, Microsoft Graph kullanarak Azure OpenAI'den veri alır.",
      B: "Microsoft 365 Copilot, Microsoft Graph kullanarak dış kullanıcılardan veri alır.",
      C: "Microsoft 365 Copilot, Microsoft Graph kullanarak Microsoft SharePoint dosyalarından veri alır.",
      D: "Microsoft 365 Copilot, Microsoft Graph kullanarak internet arama motorlarından veri alır.",
    },
  },
  "real-ab900-10": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "Microsoft Entra Privileged Identity Management (PIM), Microsoft 365 hizmetlerine sınırlı erişim sağlar.",
      B: "Microsoft Entra Privileged Identity Management (PIM), kullanıcı yaşam döngüsü yönetimi sağlar.",
      C: "Microsoft Entra Privileged Identity Management (PIM), kurumsal uygulama yönetimi sağlar.",
      D: "Microsoft Entra Privileged Identity Management (PIM), zaman sınırlı rol ataması sağlar.",
    },
  },
  "real-ab900-11": {
    prompt:
      "User5 adlı bir kullanıcı https://myapps.microsoft.com adresine gider. Kullanıcı adını ve parolasını girdikten sonra User5, mobil cihazında aşağıdaki mesajı alır. Şemada gösterilen bilgilere dayanarak ifadeyi tamamlayan yanıtı seçmek için açılır menüleri kullanın.",
    options: {
      A: "User5, çok faktörlü kimlik doğrulama (MFA) için e-posta ile tek kullanımlık kod (Email OTP) kullanıyor.",
      B: "User5, çok faktörlü kimlik doğrulama (MFA) için Microsoft Authenticator uygulamasını kullanıyor.",
      C: "User5, çok faktörlü kimlik doğrulama (MFA) için SMS kullanıyor.",
      D: "User5, çok faktörlü kimlik doğrulama (MFA) için geçici erişim parolası kullanıyor.",
    },
  },
  "real-ab900-12": {
    prompt: "Aşağıdaki ifadelerin her biri için, ifade doğruysa Evet'i seçin. Aksi takdirde Hayır'ı seçin. (NOT: her doğru seçim bir puan değerindedir.)",
    statements: [
      "Microsoft Defender for Office 365, kimlik avı ve kötü amaçlı yazılım saldırılarına karşı koruma sağlar",
      "Microsoft Defender for Identity, Active Directory alanlarındaki kimlikleri izler",
      "Microsoft Defender Vulnerability Management, SaaS (Hizmet Olarak Yazılım) uygulamaları için koruma sağlar",
    ],
  },
  "real-ab900-13": {
    prompt:
      "Kuruluşunuzda Site1 adlı bir Microsoft SharePoint sitesi içeren bir Microsoft 365 aboneliği var. Site1'in izinleri aşağıdaki resimde gösterildiği gibi yapılandırılmıştır. Abonelikte User1 adlı yeni bir kullanıcı oluşturuyorsunuz. Şemada gösterilen bilgilere dayanarak ifadeyi tamamlayan yanıtı seçmek için açılır menüleri kullanın.",
    options: {
      A: "User1, Site1'in ziyaretçisidir.",
      B: "User1, Site1'in sahibidir.",
      C: "User1, Site1'in üyesidir.",
      D: "User1'in Site1'e erişimi engellenmiştir.",
    },
  },
  "real-ab900-14": {
    prompt:
      "5000'den fazla kullanıcısı olan çok uluslu bir şirket Microsoft 365 Copilot'u devreye alıyor. Şirket şu anda bilgi çalışanları için Microsoft 365 E3 ve Office 365 E3 lisanslarının bir karışımına sahip. BT yöneticisi, tüm kullanıcıların Word ve Excel gibi uygulamalarda Copilot'un tam üretken yapay zeka özelliklerine erişebilmesini sağlamalıdır. Mevcut tüm bilgi çalışanlarına Microsoft 365 Copilot erişimini etkinleştirmek için gereken minimum lisanslama eylemi nedir?",
    options: {
      A: "Mevcut tüm Office 365 E3 lisanslarını Microsoft 365 E5 lisanslarına yükseltin.",
      B: "Tüm kullanıcılar için ayrı Microsoft 365 Copilot ek lisansını satın alın.",
      C: "Mevcut tüm lisansları kurumsal planlardan Microsoft 365 Business Premium planlarına dönüştürün.",
      D: "Office 365 E3 uygun olmadığı için Microsoft 365 Copilot ek lisansını yalnızca Microsoft 365 E3 lisansı olan kullanıcılar için satın alın.",
    },
  },
  "real-ab900-15": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "Bir kullanıcı bir Microsoft 365 Copilot aracısını paylaştığında, kullanıcıların aracıyı kullanmasını engellemek için Microsoft Foundry'yi kullanabilirsiniz.",
      B: "Bir kullanıcı bir Microsoft 365 Copilot aracısını paylaştığında, kullanıcıların aracıyı kullanmasını engellemek için Microsoft Copilot Studio'yu kullanabilirsiniz.",
      C: "Bir kullanıcı bir Microsoft 365 Copilot aracısını paylaştığında, kullanıcıların aracıyı kullanmasını engellemek için Microsoft 365 yönetim merkezini kullanabilirsiniz.",
      D: "Bir kullanıcı bir Microsoft 365 Copilot aracısını paylaştığında, kullanıcıların aracıyı kullanmasını engellemek için Power Apps portalını kullanabilirsiniz.",
    },
  },
  "real-ab900-16": {
    prompt:
      "Kuruluşunuzun BT yönetim ekibi, Contoso Ltd., yeni bir alan adı, contosoglobal.com, edindi ve bunu Microsoft 365 ortamına eklemesi gerekiyor. Bu yeni alan adı, tüm yeni kullanıcı asıl adları (UPN) ve e-posta adresleri için kullanılacaktır. Yönetici, yeni alan adını yönetmek, doğrulamak ve yeni kullanıcılar için varsayılan olarak ayarlamak için Microsoft 365 yönetim merkezinin hangi bölümünü kullanmalıdır?",
    options: {
      A: "Ayarlar > Kuruluş ayarları > Hizmetler",
      B: "Faturalama > Lisanslar > Ürün listesi",
      C: "Kurulum > Alan adı kurulumu > Alan adı bağla",
      D: "Ayarlar > Alan adları",
    },
  },
  "real-ab900-17": {
    prompt:
      "Finans departmanındaki bir kullanıcı, etkisiz hale getirilen kötü amaçlı bir bağlantı içeren sofistike bir kimlik avı e-postası aldı. Güvenlik ekibinin, olay zaman çizelgesini, ilgili uyarıları (e-posta ve uç nokta) ve hem e-posta hem de uç noktalar için güvenlik duruşunu güçlendirmek üzere önerilen eylemleri gözden geçirmek için tek bir merkezi görünüme ihtiyacı vardır. Defender XDR'nin hangi özelliği veya portal bölümü, güvenlik ekibine bu birleşik olay görünümünü ve iyileştirme önerilerini sunar?",
    options: {
      A: "Microsoft Defender for Identity",
      B: "Microsoft Defender for Office 365",
      C: "Microsoft Defender Vulnerability Management",
      D: "Microsoft Defender portalındaki birleşik olaylar ve uyarılar deneyimi ile Secure Score",
    },
  },
  "real-ab900-18": {
    prompt:
      "Bir kullanıcının oturum açması engellendi ve yönetici Koşullu Erişim'den veya bir risk sinyali algılanmasından şüpheleniyor. Yönetici, tam giriş hatasını ve bundan sorumlu ilkeyi belirlemek için Microsoft Entra yönetim merkezindeki hangi iki aracı önce kullanmalıdır? (Her doğru seçim çözümün bir bölümünü sunar. NOT: her doğru seçim bir puan değerindedir.)",
    options: {
      A: "Koşullu Erişim What If aracı",
      B: "Microsoft 365 hizmet durumu panosu",
      C: "Microsoft Entra ID'de oturum açma günlükleri ve sorun giderme ve destek",
      D: "Exchange Online ileti izleme",
      E: "Microsoft Entra ID uygulama proxy'si",
    },
  },
  "real-ab900-19": {
    prompt: "Aşağıdaki ifadelerin her biri için, ifade doğruysa Evet'i seçin. Aksi takdirde Hayır'ı seçin. (NOT: her doğru seçim bir puan değerindedir.)",
    statements: [
      "Microsoft Purview Compliance Manager, uyumluluk durumunuzu anlamanıza yardımcı olmak için risk tabanlı bir uyumluluk değerlendirmesi sunar",
      "Microsoft Purview Compliance Manager, uyumluluk sorunlarını çözmek için adım adım rehberlik sunar",
      "Compliance Manager, Microsoft Defender'ın bir parçasıdır",
    ],
  },
  "real-ab900-20": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Microsoft SharePoint dosyalarının kuruluşunuz dışındaki kullanıcılarla paylaşıldığını fark ediyorsunuz. Hangi dosyaların dış kullanıcılarla paylaşıldığını belirlemeniz gerekir. SharePoint yönetim merkezinde hangi raporu kullanmalısınız? (Yanıtlamak için yanıt alanında uygun raporu seçin.)",
    options: {
      A: "Aracı içgörüleri (Agent insights)",
      B: "Uygulama içgörüleri (App insights)",
      C: "Değişiklik geçmişi",
      D: "Veri erişim yönetimi",
      E: "OneDrive hesapları",
      F: "Site ilkesi karşılaştırması",
    },
  },
  "real-ab900-21": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Şirketinizin İK departmanı, User1 adlı bir kullanıcının yakın zamanda değiştirdiği tüm dosyaların bir kopyasını istiyor. Microsoft Purview portalında ne kullanmalısınız? (Yanıtlamak için yanıt alanında uygun çözümleri seçin.)",
    options: {
      A: "Denetim (Audit)",
      B: "Veri kataloğu",
      C: "Veri kaybı önleme",
      D: "eDiscovery",
      E: "Bilgi koruması",
      F: "İç risk yönetimi",
    },
  },
  "real-ab900-22": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Aşağıdaki gereksinimleri karşılamak için Microsoft Purview'u kullanmanız gerekir: • Kullanıcıların kişisel olarak tanımlanabilir bilgiler (PII) içeren dosyaları paylaşmasını engelleyin. • Hassas içeriği algılayan bir modeli eğitmek için makine öğrenimini kullanın. Her gereksinim için hangi Microsoft Purview çözümünü kullanmalısınız? (Yanıtlamak için yanıt alanında uygun seçenekleri seçin. NOT: her doğru seçim bir puan değerindedir.)",
    options: {
      A: "PII paylaşımını engelleme: Communication Compliance / Model eğitimi: Data Loss Prevention",
      B: "PII paylaşımını engelleme: Data Loss Prevention / Model eğitimi: Information Protection",
      C: "PII paylaşımını engelleme: Information Protection / Model eğitimi: Insider Risk Management",
      D: "PII paylaşımını engelleme: Insider Risk Management / Model eğitimi: Communication Compliance",
      E: "PII paylaşımını engelleme: Data Loss Prevention / Model eğitimi: DSPM for AI",
      F: "PII paylaşımını engelleme: DSPM for AI / Model eğitimi: Insider Risk Management",
    },
  },
  "real-ab900-23": {
    prompt:
      "Microsoft 365'te bir hizmet yöneticisi tarafından gerçekleştirilen yönetimsel eylemleri görüntülemek istiyorsunuz. Aşağıdaki ifadelerin her biri için, ifade doğruysa Evet'i seçin. Aksi takdirde Hayır'ı seçin. (NOT: her doğru seçim bir puan değerindedir.)",
    options: {
      A: "Microsoft 365 yönetim merkezinde Search & Intelligence kullanabilirsiniz: Evet / Microsoft Defender portalında Audit kullanabilirsiniz: Evet / Microsoft Purview portalında Audit kullanabilirsiniz: Evet",
      B: "Microsoft 365 yönetim merkezinde Search & Intelligence kullanabilirsiniz: Evet / Microsoft Defender portalında Audit kullanabilirsiniz: Evet / Microsoft Purview portalında Audit kullanabilirsiniz: Hayır",
      C: "Microsoft 365 yönetim merkezinde Search & Intelligence kullanabilirsiniz: Evet / Microsoft Defender portalında Audit kullanabilirsiniz: Hayır / Microsoft Purview portalında Audit kullanabilirsiniz: Evet",
      D: "Microsoft 365 yönetim merkezinde Search & Intelligence kullanabilirsiniz: Hayır / Microsoft Defender portalında Audit kullanabilirsiniz: Evet / Microsoft Purview portalında Audit kullanabilirsiniz: Hayır",
      E: "Microsoft 365 yönetim merkezinde Search & Intelligence kullanabilirsiniz: Hayır / Microsoft Defender portalında Audit kullanabilirsiniz: Hayır / Microsoft Purview portalında Audit kullanabilirsiniz: Evet",
      F: "Microsoft 365 yönetim merkezinde Search & Intelligence kullanabilirsiniz: Hayır / Microsoft Defender portalında Audit kullanabilirsiniz: Hayır / Microsoft Purview portalında Audit kullanabilirsiniz: Hayır",
    },
  },
  "real-ab900-24": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "Koşullu Erişim ilkeleri Microsoft Defender portalı üzerinden yapılandırılır.",
      B: "Koşullu Erişim ilkeleri yalnızca şirket içi kaynaklara uygulanır.",
      C: "Koşullu Erişim ilkeleri, kullanıcıların bulut uygulamalarına nasıl erişebileceği konusunda kontrol sağlar.",
      D: "Koşullu Erişim ilkeleri bir Microsoft Exchange posta kutusu gerektirir.",
    },
  },
  "real-ab900-25": {
    prompt:
      "Bir yönetici, hassas bir İK SharePoint sitesine erişimi yönetmeli ve \"HR-Data-Users\" ekibinin 50 üyesine Copilot ek lisanslarını atamalıdır. Yüksek personel devir hızı nedeniyle üyelik sık sık değişmektedir. Hem erişim denetimi hem de lisans tabanlı grup yönetimi için en verimli seçenek hangi Microsoft Entra nesnesidir?",
    options: {
      A: "Dinamik güvenlik grubu",
      B: "E-posta etkin güvenlik grubu",
      C: "Microsoft 365 grubu",
      D: "Dağıtım listesi",
    },
  },
  "real-ab900-26": {
    prompt: "Microsoft 365 Copilot kullanıyorsunuz. Copilot, Microsoft SharePoint'te depolanan şirket verilerine dayalı yanıtları neyle oluşturur?",
    options: {
      A: "Microsoft Intune",
      B: "Microsoft Defender",
      C: "Microsoft Graph",
      D: "Microsoft Purview",
    },
  },
  "real-ab900-27": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "Hassas bilgi içeren Microsoft 365 Copilot istemlerini algılamak için Microsoft Purview'daki Data Lifecycle Management çözümünü kullanabilirsiniz.",
      B: "Hassas bilgi içeren Microsoft 365 Copilot istemlerini algılamak için Microsoft Purview'daki DSPM for AI çözümünü kullanabilirsiniz.",
      C: "Hassas bilgi içeren Microsoft 365 Copilot istemlerini algılamak için Microsoft Purview'daki Information Barriers çözümünü kullanabilirsiniz.",
      D: "Hassas bilgi içeren Microsoft 365 Copilot istemlerini algılamak için Microsoft Purview'daki Information Protection çözümünü kullanabilirsiniz.",
    },
  },
  "real-ab900-28": {
    prompt:
      "Pazarlama departmanındaki bir kullanıcı, yalnızca finans departmanının erişebildiği bir SharePoint sitesinde depolanan \"son bütçe teklifini\" özetlemesini Copilot'tan ister. Pazarlama kullanıcısı sitenin üyesi değildir. Copilot'un davranışını kontrol eden ve kısıtlı içeriği döndürmesini engelleyen ilke nedir?",
    options: {
      A: "Copilot, isteği işlemeden önce Zero-Trust doğrulamasını uygular.",
      B: "Copilot yalnızca belirli bir hassasiyet etiketiyle açıkça etiketlenmiş içeriği kullanır.",
      C: "Copilot, kullanıcının mevcut Microsoft 365 izinlerini sıkı bir şekilde uygular ve kullanıcının erişimi olmayan içeriği döndürmez.",
      D: "Microsoft Purview DLP, Copilot yanıtlarındaki finansal rakamları otomatik olarak gizler.",
    },
  },
  "real-ab900-29": {
    prompt:
      "Bir kullanıcı Copilot'a \"'Project Phoenix' ile ilgili bana hangi son belgeler paylaşıldı?\" diye sorduğunda, Copilot OneDrive, SharePoint ve Teams'den kişiselleştirilmiş belgeler döndürür. Bu yanıtı sağlamada Microsoft Graph'ın temel rolü nedir?",
    options: {
      A: "LLM'e önceden eğitilmiş genel bilgisini sağlar.",
      B: "Düzenleme ilkelerine uyum motoru görevi görür.",
      C: "Kullanıcının isteğini kurumsal veriler için kullanıcının bağlamı, ilişkileri ve izinleriyle eşleştiren anlamsal bir dizin olarak işlev görür.",
      D: "Koşullu Erişim ilkelerini gerçek zamanlı olarak uygular.",
    },
  },
  "real-ab900-30": {
    statements: [
      "Yöneticilerin SharePoint Advanced Management'ı kullanabilmesi için kuruluşunuzdaki tüm kullanıcıların Microsoft 365 Copilot lisansına ihtiyacı vardır",
      "SharePoint Advanced Management, Microsoft 365 Copilot'un Microsoft SharePoint içeriğine erişimini kısıtlamaya yardımcı olabilir",
      "SharePoint Advanced Management, Microsoft 365 Copilot'u olmayan kuruluşlar için bağımsız bir lisans olarak sunulur",
    ],
  },
  "real-ab900-31": {
    prompt:
      "Müşteri kayıtlarını özetlemek üzere hazırlanan bir yapay zeka aracısı, belirli coğrafi bölgeler lehine bir önyargı gösteriyor. Öncelikle hangi Microsoft Responsible AI ilkesi ihlal ediliyor ve dağıtımdan önce ele alınmalıdır?",
    options: {
      A: "Adalet (Fairness)",
      B: "Şeffaflık",
      C: "Hesap verebilirlik",
      D: "Kapsayıcılık",
    },
  },
  "real-ab900-32": {
    prompt:
      "Uyumluluk ekibi, çok hassas belgeler içeren ancak \"Dış kullanıcılar hariç herkes\" gibi büyük gruplarla paylaşılan SharePoint sitelerini listeleyen bir rapora ihtiyaç duyuyor. Hangi Microsoft özelliği, hassas içeriği ve daha izin verici paylaşım uygulamalarını tanımlayan Data Access Governance (DAG) raporları oluşturmak için tasarlanmıştır?",
    options: {
      A: "Microsoft Entra ID Protection",
      B: "Microsoft Purview Data Loss Prevention (DLP)",
      C: "Microsoft Defender for Cloud Apps",
      D: "SharePoint Advanced Management (SAM)",
    },
  },
  "real-ab900-33": {
    prompt: "Aşağıdaki resimde gösterildiği gibi bir Microsoft SharePoint siteniz var. SLabel1'in ayarlarını görüntülemeniz gerekir. Ne kullanmalısınız?",
    options: {
      A: "Microsoft Defender portalı",
      B: "SharePoint yönetim merkezi",
      C: "Microsoft 365 yönetim merkezi",
      D: "Microsoft Purview portalı",
    },
  },
  "real-ab900-34": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "E-posta, kimlik ve cihaz olayları genelinde ilişkilendirilmiş tehdit göstergelerini tek bir görünümde incelemek için Microsoft Defender for Office 365'i kullanabilirsiniz.",
      B: "E-posta, kimlik ve cihaz olayları genelinde ilişkilendirilmiş tehdit göstergelerini tek bir görünümde incelemek için Microsoft Defender XDR'yi kullanabilirsiniz.",
      C: "E-posta, kimlik ve cihaz olayları genelinde ilişkilendirilmiş tehdit göstergelerini tek bir görünümde incelemek için Microsoft Purview Compliance Manager'ı kullanabilirsiniz.",
      D: "E-posta, kimlik ve cihaz olayları genelinde ilişkilendirilmiş tehdit göstergelerini tek bir görünümde incelemek için Microsoft Purview Data Loss Prevention'ı kullanabilirsiniz.",
    },
  },
  "real-ab900-35": {
    prompt:
      "Kuruluşunuzda User1 adlı bir kullanıcı içeren bir Microsoft 365 aboneliği var. User1, iki hafta içinde şirketinizden ayrılmayı planlıyor. Kullanıcının veri sızdırıp sızdırmadığını belirlemek için User1'in etkinliklerini yakalamanız gerekir. Hangi Microsoft Purview çözümünü kullanmalısınız?",
    options: {
      A: "Communication Compliance",
      B: "Data Security Posture Management",
      C: "Insider Risk Management",
      D: "Data Lifecycle Management",
    },
  },
  "real-ab900-36": {
    prompt:
      "Kuruluşunuzda Microsoft SharePoint siteleri ve Microsoft Teams ekipleri içeren bir Microsoft 365 aboneliği var. Sitelerin ve ekiplerin kuruluşunuz dışındaki kullanıcılarla paylaşıldığını fark ediyorsunuz. Hangi sitelerin ve ekiplerin dış kullanıcılarla paylaşıldığını belirlemeniz gerekir. Ne kullanmalısınız?",
    options: {
      A: "SharePoint yönetim merkezi",
      B: "Microsoft Teams yönetim merkezi",
      C: "Microsoft 365 yönetim merkezi",
      D: "Microsoft Defender portalı",
    },
  },
  "real-ab900-37": {
    prompt:
      "Bir kuruluş, iç istemlerin/verilerin olası ifşasını önlemek için Copilot'un yanıtlara asla kamuya açık web aramalarından sonuç eklememesini istiyor. Copilot yanıtları için web temellendirmesini (web grounding) engellemek üzere bir yönetici hangi Copilot özelliğini devre dışı bırakmalıdır?",
    options: {
      A: "Word'de Copilot",
      B: "Copilot for Microsoft 365",
      C: "Copilot Chat",
      D: "Microsoft 365 uygulamalarındaki Copilot özellikleri",
    },
  },
  "real-ab900-38": {
    statements: [
      "Microsoft 365 Copilot kullanım raporu, kullanıcılar tarafından Copilot'a gönderilen istemleri (prompts) görüntülemek için kullanılabilir",
      "Microsoft 365 Copilot kullanım raporu, kuruluşunuzdaki toplam benzersiz kullanıcı sayısını gösterir",
      "Microsoft 365 Copilot kullanım raporu, her bir Microsoft 365 uygulamasının Copilot kullanımını gösterir",
    ],
  },
  "real-ab900-39": {
    prompt:
      "Bir iş sorununu çözmek için Microsoft 365 Copilot uygulamasında bir aracı oluşturmayı planlıyorsunuz. Aracıyı oluşturmak için iki neden nedir? (Her doğru cevap tam bir çözüm sunar. NOT: her doğru seçim bir puan değerindedir.)",
    options: {
      A: "Özel bir yapay zeka modeli kullanmanız gerekiyor.",
      B: "Sohbet deneyiminden farklı özel bir talimat kümesi kullanmanız gerekiyor.",
      C: "Belirli bir site hakkında akıl yürütmeniz gerekiyor.",
      D: "İlgili sohbetleri bir Copilot not defterinde gruplandırmanız gerekiyor.",
    },
  },
  "real-ab900-40": {
    prompt:
      "Microsoft 365 Copilot'u devreye alırken önemli yönetişim risklerinden biri, olası şirket veri sızıntısıdır. Uyumluluk direktörü, Copilot kullanıcının erişimi olan tüm verileri kullandığından, bir kullanıcının yanlışlıkla erişmemesi gereken hassas bilgilere erişebileceğinden endişe ediyor. Yöneticilerin Copilot'u geniş çapta dağıtmadan önce yüksek öncelikli bir yönetişim görevi olarak ele alması gereken bu aşırı paylaşım riskinin en yaygın nedeni nedir?",
    options: {
      A: "Copilot, içerik indekslenirken SharePoint erişim denetimlerini atlar.",
      B: "Site veya dosyalarda çok geniş izinler.",
      C: "Copilot sohbet günlükleri eDiscovery veya saklamaya tabi değildir.",
      D: "Azure OpenAI model eğitimi kiracı (tenant) verilerini kullanır ve bunları kiracı içinde tutar.",
    },
  },
  "real-ab900-41": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Kuruluşunuzdaki Windows 11 cihazları tarafından tetiklenen güvenlik olaylarını ve uyarılarını araştırmanız gerekir. Ne kullanmalısınız?",
    options: {
      A: "Microsoft Entra ID Protection",
      B: "Microsoft Defender for Identity",
      C: "Microsoft Purview Insider Risk Management",
      D: "Microsoft Defender for Endpoint",
    },
  },
  "real-ab900-42": {
    prompt:
      "Şirketiniz tüm Microsoft SharePoint sitelerinin en az iki sahibi olmasını gerektiriyor. İkiden az sahibi olan sitelerin, düzeltilmezse yalnızca okunabilir olarak işaretlenmesini sağlamanız gerekir. SharePoint yönetim merkezinde ne yapılandırmalısınız?",
    options: {
      A: "Site düzeyinde erişim kısıtlaması",
      B: "Veri erişim yönetimi raporları",
      C: "Site yaşam döngüsü yönetimi",
      D: "SharePoint ve OneDrive için indirmeleri engelleme ilkesi",
    },
  },
  "real-ab900-43": {
    prompt:
      "BT direktörü, Copilot'un yatırım getirisini (ROI) ölçmek için aktif Copilot kullanıcıları, uygulama bazında kullanım ve istem kategorileri gibi kiracı düzeyinde toplu ölçümler istiyor. Hangi yönetim aracı bu toplu benimseme ve kullanım değerlendirmesini sunar?",
    options: {
      A: "Microsoft Purview denetim günlüğü",
      B: "Copilot analiz panosu",
      C: "Microsoft Entra ID oturum açma günlükleri",
      D: "Microsoft 365 hizmet durumu",
    },
  },
  "real-ab900-44": {
    prompt:
      "Copilot Studio'da oluşturulan ve şirket içi bir finans veritabanına bağlanan bir yapay zeka aracısı yayımlanmadan önce, bir yöneticinin erişimi, performansı ve yaşam döngüsü durumunu incelemesi gerekir. Aracının yaşam döngüsünü ve ortam ayarlarını yönetmek ve izlemek için öncelikle hangi iki Microsoft yönetim merkezi kullanılır? (Her doğru seçim çözümün bir bölümünü sunar. NOT: her doğru seçim bir puan değerindedir.)",
    options: {
      A: "Microsoft Purview portalı",
      B: "Microsoft Entra yönetim merkezi",
      C: "Microsoft 365 yönetim merkezi",
      D: "Microsoft Power Platform yönetimi",
      E: "Exchange yönetim merkezi",
    },
  },
  "real-ab900-45": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "SharePoint yönetim merkezinden bir sunucu oluşturabilirsiniz.",
      B: "SharePoint yönetim merkezinden bir kullanıcı oluşturabilirsiniz.",
      C: "SharePoint yönetim merkezinden bir site oluşturabilirsiniz.",
      D: "SharePoint yönetim merkezinden bir rol oluşturabilirsiniz.",
    },
  },
  "real-ab900-46": {
    prompt: "Bir Microsoft Excel çalışma kitabına dayalı grafikler ve görselleştirmeler oluşturabilen bir Microsoft 365 Copilot aracısı oluşturmanız gerekir. Aracı için ne yapılandırmalısınız?",
    options: {
      A: "Görüntü oluşturma özelliği",
      B: "Scrum Assistant şablonu",
      C: "Customer Insights Assistant şablonu",
      D: "Kod yorumlayıcı (Code Interpreter) özelliği",
    },
  },
  "real-ab900-47": {
    prompt:
      "Şirketiniz Microsoft 365 Copilot kullanımını test ediyor ve 100 Microsoft 365 Copilot lisansı satın aldı. Copilot tarafından özetlenen toplantı saatleri ve Copilot tarafından gerçekleştirilen toplantı eylemleri gibi Microsoft Teams'deki Copilot kullanımına ilişkin ayrıntılı raporları görüntülemeniz gerekir. Ne kullanmalısınız?",
    options: {
      A: "Microsoft 365 yönetim merkezindeki Microsoft 365 Copilot hazırlık raporu",
      B: "Microsoft 365 yönetim merkezindeki Microsoft 365 Copilot kullanım raporu",
      C: "Microsoft Viva Insights'taki Microsoft 365 Copilot panosu",
      D: "Microsoft 365 yönetim merkezindeki Microsoft 365 uygulamaları kullanım raporu",
    },
  },
  "real-ab900-48": {
    prompt: "User1 adlı bir kullanıcı Agent1 adlı bir Microsoft 365 Copilot aracısı oluşturur ve bunu User2 adlı bir kullanıcıyla paylaşır. Bir yönetici Agent1'i engellediğinde ne olur?",
    options: {
      A: "Kullanıcılar aracıyı manuel olarak kaldırana kadar Agent1, User1 ve User2 için erişilebilir kalır. Başka hiçbir kullanıcı Agent1'i yükleyemez.",
      B: "Agent1, User1 ve User2 için erişilebilir kalır ve başka hiçbir kullanıcı Agent1'i yükleyemez.",
      C: "Agent1, User2'den kaldırılır ve User1, Agent1'i kullanmaya devam edebilir.",
      D: "Agent1, User1 ve User2'den kaldırılır ve hiçbir kullanıcı Agent1'i yükleyemez.",
    },
  },
  "real-ab900-49": {
    statements: [
      "Yöneticiler belirli bir Copilot aracısını tüm kullanıcılardan kaldırabilir",
      "Microsoft 365 yönetim merkezinden yöneticiler bir Copilot aracısının istemlerini yapılandırabilir",
      "Yöneticiler Copilot aracılarını belirli kullanıcılara dağıtabilir",
    ],
  },
  "real-ab900-50": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "Microsoft Teams yönetim merkezinden bir kullanıcıya Teams lisansı atayabilirsiniz.",
      B: "Microsoft Teams yönetim merkezinden Teams istemcisini dağıtabilirsiniz.",
      C: "Microsoft Teams yönetim merkezinden bir Teams oda cihazını yönetebilirsiniz.",
      D: "Microsoft Teams yönetim merkezinden kullanıcıların ekip (Teams) oluşturmasını engelleyebilirsiniz.",
    },
  },
  "real-ab900-51": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Tüm kullanıcıların Microsoft 365 Copilot lisansı var. Copilot etkileşimleri sırasında hassas içeriğin nerede kullanıldığını belirlemeniz, içerik kullanım kalıplarını analiz etmeniz ve uygun koruma uygulamak için öneriler sunmanız gerekir. Ne kullanmalısınız?",
    options: {
      A: "Microsoft Viva Insights",
      B: "Microsoft Purview DSPM for AI çözümü",
      C: "Microsoft Security Copilot",
      D: "Microsoft Purview Insider Risk Management çözümü",
    },
  },
  "real-ab900-52": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Tüm kullanıcılara Microsoft 365 Copilot lisansları atanmıştır. Bazı kullanıcılar, Finance adlı bir Microsoft SharePoint sitesinden bilgi içeren Copilot yanıtları aldıklarını bildiriyor. Kullanıcılar bu bilgilerin ticari açıdan hassas olduğunu belirtiyor. Copilot'un Finance sitesinden bilgi içeren yanıtlar vermesini engellemeniz gerekir. Ne yapmalısınız?",
    options: {
      A: "Microsoft Purview'da bir Information Barrier (IB) ilkesi oluşturun.",
      B: "Microsoft Defender'da bir veri bağlayıcısı oluşturun.",
      C: "Microsoft Entra'da bir Koşullu Erişim ilkesi oluşturun.",
      D: "Finance sitesindeki izinleri yapılandırın.",
    },
  },
  "real-ab900-53": {
    prompt:
      "Bir yönetici şunu soruyor: \"Word/Excel'e entegre Microsoft 365 Copilot ile Copilot Studio'da oluşturulan özel bir yapay zeka aracısı arasındaki temel yetenek farkı nedir?\" Doğru cevap nedir?",
    options: {
      A: "Yalnızca entegre Copilot, Microsoft Graph verilerine erişip özetleyebilir.",
      B: "Entegre Copilot genel amaçlı bir verimlilik asistanıdır. Özel yapay zeka aracıları, belirli çok adımlı görevler ve dış sistemlerle entegrasyonlar için tasarlanmıştır.",
      C: "Yalnızca özel yapay zeka aracıları yanıtlarını kurumsal verilere dayandırabilir.",
      D: "Özel aracılar yalnızca Copilot Studio portalı üzerinden erişilebilirken, Copilot uygulamalara gömülüdür.",
    },
  },
  "real-ab900-54": {
    prompt:
      "Bir departman başkanı, haftalık satış verilerini analiz etmek için yüksek etkili, karmaşık bir Microsoft 365 Copilot istemi geliştirdi. Başkan, satış ekibinin 30 üyesinin bu belirli istem şablonuna kolay ve tutarlı erişime sahip olmasını istiyor. Bu değerli şablonun tüm ekip tarafından tutarlı bir şekilde kullanılmasını sağlamak için hangi yöntem önerilir?",
    options: {
      A: "İstemi yeni bir aracı olarak yayımlamak için Copilot Studio arayüzünü kullanın.",
      B: "İstemin metnini e-posta ile ekibe gönderin ve kişisel OneDrive'larına kaydetmelerini söyleyin.",
      C: "İstem şablonunu doğrudan Microsoft 365 Copilot istem kitaplığından paylaşın.",
      D: "İstemi haftalık olarak çalıştıran bir Power Automate akışı oluşturun.",
    },
  },
  "real-ab900-55": {
    statements: [
      "Bir Communication Compliance ilkesi, Microsoft Teams mesajlarındaki uygunsuz metni algılayabilir",
      "Bir Communication Compliance ilkesi, Microsoft 365 Copilot istemlerindeki saldırgan dili algılayabilir",
      "Bir Communication Compliance ilkesi, e-posta mesajlarını 10 yıl boyunca saklamak için kullanılabilir",
    ],
  },
  "real-ab900-56": {
    statements: [
      "Copilot istem galerisinden kaydedilmiş bir istemi düzenleyebilirsiniz",
      "Copilot istem galerisinden kaydedilmiş bir istemi bir Microsoft Teams ekibiyle paylaşabilirsiniz",
      "Copilot istem galerisine kaydedilmemiş bir istem için paylaşılan bir bağlantı oluşturabilirsiniz",
    ],
  },
  "real-ab900-57": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Bazı kullanıcıların Microsoft 365'te oturum açamadığını fark ediyorsunuz. Başarısız Microsoft 365 oturum açma girişimlerini görüntülemeniz gerekir. Ne kullanmalısınız?",
    options: {
      A: "Microsoft Defender portalı",
      B: "Microsoft Entra yönetim merkezi",
      C: "Microsoft Purview portalı",
      D: "Microsoft 365 yönetim merkezi",
    },
  },
  "real-ab900-58": {
    prompt:
      "Kuruluşunuzda Site1 adlı bir Microsoft SharePoint sitesi içeren bir Microsoft 365 aboneliği var. Kullanıcıların Site1'in içeriğini dış kullanıcılarla paylaşmasını engellemeniz gerekir. Ne kullanmalısınız?",
    options: {
      A: "Site1'in içeriği",
      B: "SharePoint yönetim merkezi",
      C: "Microsoft 365 yönetim merkezi",
      D: "Microsoft Entra yönetim merkezi",
    },
  },
  "real-ab900-59": {
    prompt: "Hangi ifade Microsoft Defender XDR'yi doğru şekilde açıklar?",
    options: {
      A: "Microsoft Defender XDR, sofistike saldırılara karşı entegre koruma sağlamak için uç noktalar, kimlikler, e-posta ve uygulamalar genelinde algılama, önleme, araştırma ve yanıtı koordine eden birleşik bir kurumsal paket.",
      B: "Microsoft Entra Conditional Access, sofistike saldırılara karşı entegre koruma sağlamak için uç noktalar, kimlikler, e-posta ve uygulamalar genelinde algılama, önleme, araştırma ve yanıtı koordine eden birleşik bir kurumsal paket.",
      C: "Microsoft Entra ID Protection, sofistike saldırılara karşı entegre koruma sağlamak için uç noktalar, kimlikler, e-posta ve uygulamalar genelinde algılama, önleme, araştırma ve yanıtı koordine eden birleşik bir kurumsal paket.",
      D: "Microsoft Purview, sofistike saldırılara karşı entegre koruma sağlamak için uç noktalar, kimlikler, e-posta ve uygulamalar genelinde algılama, önleme, araştırma ve yanıtı koordine eden birleşik bir kurumsal paket.",
    },
  },
  "real-ab900-60": {
    prompt: "Kuruluşunuzda bir Microsoft 365 aboneliği var. Alex Wilber adlı bir kullanıcıya aşağıdaki resimde gösterildiği gibi bir yönetim rolü atanmıştır.",
    options: {
      A: "Alex Wilber, Microsoft Entra kiracısındaki tüm kullanıcıları görüntüleyebilir.",
      B: "Alex Wilber, Microsoft SharePoint sitelerindeki tüm içeriği görüntüleyebilir.",
      C: "Alex Wilber, Microsoft Exchange posta kutularındaki tüm içeriği okuyabilir.",
      D: "Alex Wilber, Microsoft 365 Copilot istemlerinin eDiscovery'sini gerçekleştirebilir.",
    },
  },
  "real-ab900-61": {
    statements: [
      "Microsoft Entra ID kaynaklarına izin atamak için bir Microsoft Entra güvenlik grubu kullanabilirsiniz",
      "Microsoft 365 lisansları atamak için bir Microsoft Entra güvenlik grubu kullanabilirsiniz",
      "Microsoft Exchange posta kutularına izin atamak için bir Microsoft Entra güvenlik grubu kullanabilirsiniz",
    ],
  },
  "real-ab900-62": {
    prompt: "Hangi ifade Microsoft 365'te yetkilendirmeyi doğru şekilde açıklar?",
    options: {
      A: "Bir kimliğin gerçekten iddia ettiği kişi olup olmadığını doğrulama süreci",
      B: "Bir kimliğin kaynaklara erişebilmesinden önce ek kimlik doğrulama yöntemleri gerektiren bir süreç",
      C: "Bir kimliğin bir kaynağa erişimine izin verilip verilmediğini doğrulama süreci",
      D: "Harici bir sistemden bir kimliği doğrulama süreci",
    },
  },
  "real-ab900-63": {
    statements: [
      "Bir Microsoft SharePoint sitesinin üyesi, kullanıcıları site içeriğine erişmeye davet edebilir",
      "Bir Microsoft SharePoint sitesinin sahibi, Microsoft 365 gruplarını site üyesi olarak ekleyebilir",
      "Bir Microsoft SharePoint sitesinin sahibi, başka bir sahibi siteden kaldırabilir",
    ],
  },
  "real-ab900-64": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Exchange yönetim merkezini kullanarak hangi iki görevi gerçekleştirebilirsiniz? (Her doğru cevap çözümün bir bölümünü sunar. NOT: her doğru seçim bir puan değerindedir.)",
    options: {
      A: "Bir Microsoft Exchange lisansı atayın.",
      B: "Bir posta akışı kuralı oluşturun.",
      C: "Paylaşılan bir posta kutusu oluşturun.",
      D: "Özel bir alan adı ekleyin.",
    },
  },
  "real-ab900-65": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "Microsoft Entra Privileged Identity Management (PIM)'de bir yönetici sizi kullanıcı yöneticisi rolü için uygun hale getirdi. Bir kullanıcı hesabı oluşturabilmeden önce rolü etkinleştirmeniz gerekir.",
      B: "Microsoft Entra Privileged Identity Management (PIM)'de bir yönetici sizi kullanıcı yöneticisi rolü için uygun hale getirdi. Bir kullanıcı hesabı oluşturabilmeden önce Microsoft Authenticator uygulamasını yüklemeniz gerekir.",
      C: "Microsoft Entra Privileged Identity Management (PIM)'de bir yönetici sizi kullanıcı yöneticisi rolü için uygun hale getirdi. Bir kullanıcı hesabı oluşturabilmeden önce bir lisans talep etmeniz gerekir.",
      D: "Microsoft Entra Privileged Identity Management (PIM)'de bir yönetici sizi kullanıcı yöneticisi rolü için uygun hale getirdi. Bir kullanıcı hesabı oluşturabilmeden önce konum bilgilerinizi güncellemeniz gerekir.",
    },
  },
  "real-ab900-66": {
    prompt: "Aşağıdaki resimde gösterildiği gibi Microsoft Entra yönetim merkezini açıyorsunuz. Hangi eylem Identity Secure Score'u en çok iyileştirecektir?",
    options: {
      B: "\"En az ayrıcalıklı yönetim rollerini kullan\" önerisini çözmek Identity Secure Score'u en çok iyileştirecektir.",
      C: "\"Eski kimlik doğrulamayı engelleme ilkesini etkinleştir\" önerisini çözmek Identity Secure Score'u en çok iyileştirecektir.",
      D: "\"Yönetim rolleri için çok faktörlü kimlik doğrulamayı gerektir\" önerisini çözmek Identity Secure Score'u en çok iyileştirecektir.",
    },
  },
  "real-ab900-67": {
    prompt: "Riskli bir oturum açma algılandığında bir kullanıcı hesabını otomatik olarak neyle kilitleyebilirsiniz?",
    options: {
      A: "Microsoft Defender for Identity",
      B: "Microsoft Entra ID Protection",
      C: "Microsoft Defender for Office 365",
      D: "Microsoft Entra Privileged Identity Management (PIM)",
    },
  },
  "real-ab900-68": {
    prompt: "Bir Zero Trust stratejisinin parçası olarak şirketinizin güvenlik ilkelerini gözden geçiriyorsunuz. Hangi ifade Zero Trust ilkelerini doğru şekilde açıklar?",
    options: {
      A: "Zero Trust, kimlik doğrulama istemlerini en aza indirerek kullanıcı deneyimini iyileştirir.",
      B: "Zero Trust, bir güvenlik ihlali olduğunu varsayar ve her isteği doğrular.",
      C: "Zero Trust, şirketinizin ağından gelen tüm istekleri güvenilir olarak kabul eder.",
      D: "Zero Trust, erişim izinlerini düzenli olarak gözden geçirme ve ayarlama gereksinimini ortadan kaldırır.",
    },
  },
  "real-ab900-69": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Microsoft OneDrive hesaplarında depolanan içeriğin izinlerini ve aktif paylaşım bağlantılarını gösteren bir rapor oluşturmanız gerekir. Ne kullanmalısınız?",
    options: {
      A: "Microsoft Defender portalında Audit",
      B: "Microsoft 365 yönetim merkezinde raporlar",
      C: "SharePoint yönetim merkezinde veri erişim yönetimi",
      D: "Microsoft Purview portalında eDiscovery",
    },
  },
  "real-ab900-70": {
    statements: [
      "Microsoft, kullanıcılar tarafından Microsoft 365 Copilot'ta gönderilen istemleri ve yanıtları modelleri eğitmek için kullanır",
      "Microsoft, Microsoft Graph'tan alınan içeriği modelleri eğitmek için kullanır",
      "Microsoft 365 Copilot, Microsoft 365 aboneliğinizdeki güvenlik izinlerine saygı gösterir",
    ],
  },
  "real-ab900-71": {
    prompt:
      "Şirketiniz Microsoft 365 Copilot için kullanım bazlı faturalama (pay-as-you-go) kullanıyor. Şirket, Copilot kullanım maliyetlerini daha iyi görmek ve departman harcamalarını tahmin etme yeteneği istiyor. Copilot maliyetlerini departmana göre görüntüleyebildiğinizden emin olmanız gerekir. Ne kullanmalısınız? (Yanıtlamak için yanıt alanında uygun seçenekleri seçin. NOT: her doğru seçim bir puan değerindedir.)",
    options: {
      A: "Portal: Microsoft 365 yönetim merkezi / Özellik: Bir faturalama ilkesi",
      B: "Portal: Microsoft 365 yönetim merkezi / Özellik: Bir Copilot bağlayıcısı",
      C: "Portal: Microsoft Entra yönetim merkezi / Özellik: Bir otomatik talep ilkesi",
      D: "Portal: Microsoft Entra yönetim merkezi / Özellik: Bir faturalama ilkesi",
      E: "Portal: Microsoft Purview portalı / Özellik: Bir Copilot bağlayıcısı",
      F: "Portal: Microsoft Purview portalı / Özellik: Bir otomatik talep ilkesi",
    },
  },
  "real-ab900-72": {
    statements: [
      "Microsoft 365 E5 lisansına sahip kullanıcılar web tabanlı Microsoft 365 Copilot aracıları oluşturamaz",
      "Analyst aracısını kullanmak için kullanıcılara Microsoft 365 Copilot lisansı atanmış olmalıdır",
      "Kullanıcılar, bir Microsoft 365 Copilot aracısı oluşturmak için doğal dil istemi kullanabilir",
    ],
  },
  "real-ab900-73": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "İki kullanıcı arasında değiş tokuş edilen e-postalarda \"Project Falcon\" terimiyle ilgili tüm içeriği bulmak için Microsoft Purview'daki Audit çözümünü kullanabilirsiniz.",
      B: "İki kullanıcı arasında değiş tokuş edilen e-postalarda \"Project Falcon\" terimiyle ilgili tüm içeriği bulmak için Microsoft Purview'daki Data Catalog çözümünü kullanabilirsiniz.",
      C: "İki kullanıcı arasında değiş tokuş edilen e-postalarda \"Project Falcon\" terimiyle ilgili tüm içeriği bulmak için Microsoft Purview'daki eDiscovery çözümünü kullanabilirsiniz.",
      D: "İki kullanıcı arasında değiş tokuş edilen e-postalarda \"Project Falcon\" terimiyle ilgili tüm içeriği bulmak için Microsoft Purview'daki Insider Risk Management çözümünü kullanabilirsiniz.",
    },
  },
  "real-ab900-74": {
    prompt:
      "Şirketiniz Microsoft Purview Data Loss Prevention (DLP) ilkelerini kullanıyor. User1 adlı bir kullanıcı, Microsoft Teams üzerinden hassas bilgileri dış bir kullanıcıyla paylaşıyor. Paylaşılan hassas içeriği belirlemeniz gerekir. Microsoft Purview portalında ne kullanmalısınız?",
    options: {
      A: "Diagnostics",
      B: "Data Explorer",
      C: "Content Explorer",
      D: "Activity Explorer",
    },
  },
  "real-ab900-75": {
    statements: [
      "Zero Trust bir Azure aboneliği gerektirir",
      "Zero Trust bir güvenlik stratejisidir, belirli bir ürün DEĞİLDİR",
      "Microsoft 365 yönetim merkezi üzerinden kuruluşunuz için Zero Trust'ı etkinleştirebilirsiniz",
    ],
  },
  "real-ab900-76": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "Microsoft Copilot Studio, Microsoft 365 Copilot yanıtlarını etkileyen işbirliği geçmişi, belge alaka düzeyi ve iletişim sıklığı gibi sinyaller içerir.",
      B: "Microsoft Graph, Microsoft 365 Copilot yanıtlarını etkileyen işbirliği geçmişi, belge alaka düzeyi ve iletişim sıklığı gibi sinyaller içerir.",
      C: "Microsoft Purview, Microsoft 365 Copilot yanıtlarını etkileyen işbirliği geçmişi, belge alaka düzeyi ve iletişim sıklığı gibi sinyaller içerir.",
      D: "Microsoft Viva Insights, Microsoft 365 Copilot yanıtlarını etkileyen işbirliği geçmişi, belge alaka düzeyi ve iletişim sıklığı gibi sinyaller içerir.",
    },
  },
  "real-ab900-77": {
    statements: [
      "Kullanıcılar Microsoft 365 Copilot'u anonim olarak kullanabilir",
      "Yöneticiler, Microsoft 365 Copilot lisanslarının kendi kendine satın alınmasına izin verebilir",
      "Microsoft 365 Copilot lisansları, diğer kuruluşlardan gelen Microsoft Entra ID konuk kullanıcılarına atanabilir",
    ],
  },
  "real-ab900-78": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Aşağıdaki gereksinimleri karşılamak için Microsoft Purview'u kullanmanız gerekir: • Birden çok platformda hassas verileri keşfedin ve sınıflandırın. • Kullanıcıların fikri mülkiyeti dış kullanıcılarla paylaşmasını engelleyin. Her gereksinim için hangi Microsoft Purview çözümünü kullanmalısınız? (Yanıtlamak için yanıt alanında uygun seçenekleri seçin. NOT: her doğru seçim bir puan değerindedir.)",
    options: {
      A: "Birden çok platformda hassas verileri keşfetme ve sınıflandırma: Communication Compliance / Fikri mülkiyet paylaşımını engelleme: Data Loss Prevention",
      B: "Birden çok platformda hassas verileri keşfetme ve sınıflandırma: Data Loss Prevention / Fikri mülkiyet paylaşımını engelleme: Information Protection",
      C: "Birden çok platformda hassas verileri keşfetme ve sınıflandırma: Data Loss Prevention / Fikri mülkiyet paylaşımını engelleme: Insider Risk Management",
      D: "Birden çok platformda hassas verileri keşfetme ve sınıflandırma: Information Protection / Fikri mülkiyet paylaşımını engelleme: Communication Compliance",
      E: "Birden çok platformda hassas verileri keşfetme ve sınıflandırma: Information Protection / Fikri mülkiyet paylaşımını engelleme: Insider Risk Management",
      F: "Birden çok platformda hassas verileri keşfetme ve sınıflandırma: Insider Risk Management / Fikri mülkiyet paylaşımını engelleme: Data Loss Prevention",
    },
  },
  "real-ab900-79": {
    prompt: "Kuruluşunuzda bir Microsoft 365 E5 aboneliği var. Kullanıcıların şirketin iç finansal verilerini dış kullanıcılarla paylaşmasını engellemeniz gerekir. Ne kullanmalısınız?",
    options: {
      A: "Rol grupları",
      B: "Veri kaybı önleme (DLP) ilkeleri",
      C: "İç risk yönetimi ilkeleri",
      D: "Saklama etiketleri",
    },
  },
  "real-ab900-80": {
    prompt: "Sosyal güvenlik numaraları (SSN) ve kredi kartı numaraları içeren dosyaları ve e-postaları belirlemeniz gerekir. Microsoft Purview portalında ne kullanmalısınız?",
    options: {
      A: "Data Explorer",
      B: "Bilgi koruması raporları",
      C: "Bilgi koruması ilkeleri",
      D: "Activity Explorer",
    },
  },
  "real-ab900-81": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "Microsoft Purview gizlilik etiketleri Azure Blob Storage'a uygulanabilir.",
      B: "Microsoft Purview gizlilik etiketleri Microsoft 365 Copilot konuşmalarına uygulanabilir.",
      C: "Microsoft Purview gizlilik etiketleri Microsoft SharePoint sitelerine uygulanabilir.",
    },
  },
  "real-ab900-82": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "Kısıtlı SharePoint araması, kullanıcıların izin sahibi oldukları dosyalara ve içeriğe erişmesini engellemeden Microsoft SharePoint sitelerine yönetimsel erişimi kısıtlamanıza olanak tanır.",
      B: "Kısıtlı SharePoint araması, kullanıcıların izin sahibi oldukları dosyalara ve içeriğe erişmesini engellemeden konuk kullanıcıların Microsoft SharePoint sitelerine erişimini kısıtlamanıza olanak tanır.",
      C: "Kısıtlı SharePoint araması, kullanıcıların izin sahibi oldukları dosyalara ve içeriğe erişmesini engellemeden Microsoft 365 Copilot'un Microsoft SharePoint sitelerine erişimini kısıtlamanıza olanak tanır.",
      D: "Kısıtlı SharePoint araması, kullanıcıların izin sahibi oldukları dosyalara ve içeriğe erişmesini engellemeden Microsoft Purview eDiscovery'nin Microsoft SharePoint sitelerine erişimini kısıtlamanıza olanak tanır.",
    },
  },
  "real-ab900-83": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 E5 aboneliği var. \"Label1\" adlı bir Microsoft Purview gizlilik etiketi oluşturuyorsunuz. Kullanıcıların Microsoft 365'teki dosyalara \"Label1\"i uygulayabildiğinden emin olmanız gerekir. Ne kullanmalısınız?",
    options: {
      A: "Bir gizlilik etiketi ilkesi",
      B: "Eğitilebilir bir sınıflandırıcı",
      C: "Bir saklama etiketi ilkesi",
      D: "Bir otomatik etiketleme ilkesi",
    },
  },
  "real-ab900-84": {
    prompt: "Şirketinizin, tüm e-postaların yedi yıl saklanmasını ve ardından kalıcı olarak silinmesini gerektiren yazılı bir uyumluluk ilkesi var. Hangi Microsoft Purview çözümünü kullanmalısınız?",
    options: {
      A: "Bilgi koruması",
      B: "Veri yaşam döngüsü yönetimi",
      C: "Veri kaybı önleme",
      D: "İç risk yönetimi",
    },
  },
  "real-ab900-85": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "Microsoft 365 yönetim merkezinde, Copilot kredi raporundaki \"Kullanılan Krediler\" ölçütü, Microsoft Teams'i kullanan ve Microsoft 365 Copilot sohbetinde iş tabanlı aracılarla etkileşime giren kuruluşunuzdaki kullanıcılar tarafından tüketilen toplam kredi sayısını gösterir.",
      B: "Microsoft 365 yönetim merkezinde, Copilot kredi raporundaki \"Kullanılan Krediler\" ölçütü, kuruluşunuza ait olmayan ve Microsoft 365 Copilot sohbetinde iş aracılarıyla etkileşime giren kullanıcılar tarafından tüketilen toplam kredi sayısını gösterir.",
      C: "Microsoft 365 yönetim merkezinde, Copilot kredi raporundaki \"Kullanılan Krediler\" ölçütü, kendilerine Microsoft 365 Copilot lisansı atanan ve Microsoft 365 Copilot sohbetinde iş tabanlı aracılarla etkileşime giren kuruluşunuzdaki kullanıcılar tarafından tüketilen toplam kredi sayısını gösterir.",
      D: "Microsoft 365 yönetim merkezinde, Copilot kredi raporundaki \"Kullanılan Krediler\" ölçütü, kendilerine Microsoft 365 Copilot lisansı ATANMAYAN ve Microsoft 365 Copilot sohbetinde iş tabanlı aracılarla etkileşime giren kuruluşunuzdaki kullanıcılar tarafından kullanılan toplam kredi sayısını gösterir.",
    },
  },
  "real-ab900-86": {
    prompt:
      "\"Site1\" adlı bir Microsoft SharePoint siteniz ve \"Group1\" adlı bir güvenlik grubunuz var. Kullanıcı aynı zamanda \"Group1\" grubunun üyesi olmadığı sürece, şu anda \"Site1\"e erişimi olan tüm kullanıcıların site içeriğine erişmesini engellemek istiyorsunuz. Hangi ayarları yapılandırmalısınız? (Yanıtlamak için yanıt alanında uygun ayarları seçin.)",
    options: {
      A: "E-posta",
      B: "Gizlilik",
      C: "Harici dosya paylaşımı",
      D: "Gizlilik etiketi",
      E: "İçerik keşfini kısıtla",
      F: "Kısıtlı site erişimi",
    },
  },
  "real-ab900-87": {
    statements: [
      "Microsoft 365 Copilot, Microsoft Purview gizlilik etiketlerine saygı gösterir",
      "Microsoft 365 Copilot, Microsoft Purview veri kaybı önleme (DLP) ilkelerini görmezden gelir",
    ],
  },
  "real-ab900-88": {
    statements: [
      "Bir gizlilik etiketi bir Microsoft SharePoint sitesine uygulanabilir",
      "Bir gizlilik etiketi Microsoft Exchange'de bir e-posta mesajına uygulanabilir",
      "Bir gizlilik etiketi Windows 11 cihazlarına uygulanabilir",
    ],
  },
  "real-ab900-89": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Şirketiniz yakın zamanda bazı kullanıcılar için Microsoft 365 Copilot lisansları satın aldı. Kaç lisanssız kullanıcının Microsoft Teams'de Copilot kullandığını belirlemeniz gerekir. Microsoft 365 yönetim merkezinde hangi kullanım raporunu kullanmalısınız?",
    options: {
      A: "Microsoft 365 Copilot Chat",
      B: "Microsoft 365 Copilot Search",
      C: "Microsoft 365 Apps",
      D: "Microsoft 365 Copilot",
    },
  },
  "real-ab900-90": {
    prompt:
      "\"User1\" adlı bir kullanıcı üç aylık gelir raporlamasından sorumludur. \"User1\"in performans eğilimlerini tespit etmesi, görsel içgörüler elde etmesi ve farklı veri kümeleri içeren birden çok dosyada anormalliklerin bir özetini oluşturması gerekir. Ne kullanmalısınız?",
    options: {
      A: "Microsoft 365 Copilot'taki \"Analyst\" aracısı",
      B: "Microsoft 365 Copilot'taki \"Researcher\" aracısı",
      C: "Microsoft 365 Copilot Search",
      D: "Excel'de Copilot",
    },
  },
  "real-ab900-91": {
    prompt: "Şirketiniz şu anda Microsoft 365 Copilot lisanslamasını değerlendiriyor. Kullanım bazlı faturalamayı hangi senaryoda kullanmalısınız?",
    options: {
      A: "Kullanıcılara Word'deki Copilot'ta yapay zeka asistanına erişim vermek için",
      B: "Microsoft Teams toplantılarındaki eylemleri özetlemek için",
      C: "Premium sohbetlerde görüntü oluşturmak için",
      D: "Lisanssız kullanıcılara özel bir aracı sağlamak için",
    },
  },
  "real-ab900-92": {
    prompt: "Microsoft 365 Copilot kullanıyorsunuz. Gece yarısı çalışacak bir istemi planlamak istiyorsunuz. Çözümünüze hangi görevi eklemelisiniz?",
    options: {
      A: "Bir aracı oluşturun.",
      B: "Bir not defteri oluşturun.",
      C: "İstemi çalıştırın.",
      D: "İstemi kaydedin.",
    },
  },
  "real-ab900-93": {
    prompt:
      "Şirketiniz Microsoft 365 Copilot'u devreye almayı planlıyor. \"Researcher\" ve \"Analyst\" aracıları dahil olmak üzere bir kullanıcının Microsoft 365 Copilot'u kullanmasını sağlamanız gerekir. Ne kullanmalısınız?",
    options: {
      A: "Microsoft 365 yönetim merkezi",
      B: "Microsoft Purview portalı",
      C: "Microsoft Entra yönetim merkezi",
      D: "Microsoft Defender portalı",
    },
  },
  "real-ab900-94": {
    prompt:
      "Şirketiniz, Microsoft 365 Copilot lisansı satın almak yerine kullanım bazlı (Pay-as-you-go) Microsoft 365 Copilot kullanmayı düşünüyor. Kullanım bazlı faturalama hangi senaryoda geçerlidir?",
    options: {
      A: "Researcher aracısını kullanarak çok adımlı akıl yürütme gerçekleştirme",
      B: "Bir Microsoft Teams toplantısının özetini oluşturma",
      C: "İş verilerine dayalı özel bir aracı kullanma",
      D: "Word'deki Copilot'ta bir belgeyi düzenlemek için yapay zeka asistanını kullanma",
    },
  },
  "real-ab900-95": {
    prompt:
      "Şirketinizin \"Site1\" adlı bir Microsoft SharePoint sitesi var. \"Site1\", şirketin İK departmanının tüm ilkelerini içerir. İlkeler Microsoft Word belgeleri olarak depolanır. Tüm kullanıcıların \"Site1\"e okuma erişimi var. İK başkanı, kullanıcı sorularının, özellikle önemli tatiller civarında, zamanında ele alınmadığını bildiriyor. Kullanıcıların İK ilkelerini bulmasını sağlayacak bir çözüm önermeniz gerekir. Çözüm, kullanıcılara sık sorulan sorular listesi sunmalı ve yanıtların yalnızca Site1'e dayandığından emin olmalıdır. Öneriniz neyi içermelidir?",
    options: {
      A: "Word'deki Copilot'ta kişisel asistan",
      B: "Özel bir Microsoft 365 Copilot aracısı",
      C: "Microsoft 365 Copilot'taki Researcher aracısı",
      D: "Bir Microsoft 365 Copilot not defteri",
    },
  },
  "real-ab900-96": {
    prompt: "Cümleyi doğru tamamlayan yanıtı seçin.",
    options: {
      A: "Microsoft Purview portalından, gizlilik ilkeleri oluşturmak ve yönetmek için Data Explorer'ı kullanabilirsiniz.",
      B: "Microsoft Purview portalından, posta kutularında ve sitelerde içerik aramak için Data Explorer'ı kullanabilirsiniz.",
      C: "Microsoft Purview portalından, hassas bilgileri ve depolama konumlarını belirlemek için Data Explorer'ı kullanabilirsiniz.",
      D: "Microsoft Purview portalından, veri kaybı önleme (DLP) ilkelerinizin etkinliğini doğrulamak için Data Explorer'ı kullanabilirsiniz.",
    },
  },
  "real-ab900-97": {
    prompt:
      "Kuruluşunuzda \"Site1\" adlı bir Microsoft SharePoint sitesi içeren bir Microsoft 365 aboneliği var. Bir site yöneticisinin \"Site1\" site ayarlarında yaptığı tüm değişiklikleri belirlemeniz gerekir. SharePoint yönetim merkezinde hangi raporu kullanmalısınız? (Yanıtlamak için yanıt alanında uygun raporu seçin.)",
    options: {
      A: "Agent Insights",
      B: "App Insights katalog yönetimi",
      D: "Değişiklik geçmişi",
      E: "Veri erişim yönetişimi",
      F: "OneDrive hesapları",
    },
  },
  "real-ab900-98": {
    statements: [
      "Microsoft Purview Communications Compliance, Microsoft SharePoint sitelerinde depolanan görsellerdeki saldırgan metni algılayabilir",
      "Microsoft Purview Communications Compliance, soruşturmalar sırasında kullanıcı kimliklerini varsayılan olarak anonimleştirir",
      "Microsoft Purview Communications Compliance, izlenen tüm iletişimlere bir sorumluluk reddi ekler",
    ],
  },
  "real-ab900-99": {
    prompt:
      "Kuruluşunuzda bir Microsoft 365 aboneliği var. Tüm kullanıcılara bir Microsoft 365 Copilot lisansı atanmıştır. Kullanıcıların Copilot ile görüntü oluşturmasını engellemeniz gerekir. Ne kullanmalısınız?",
    options: {
      A: "Microsoft Defender portalı",
      B: "Microsoft Entra yönetim merkezi",
      C: "Microsoft Purview portalı",
      D: "Microsoft 365 yönetim merkezi",
    },
  },
  "real-ab900-100": {
    statements: [
      "Yöneticiler, belirli sitelerin Microsoft 365 Copilot tarafından kullanılmasını engelleyebilir",
      "Yöneticiler, kullanıcı sorularına yanıt verirken Microsoft 365 Copilot'un web aramasını kullanmasını engelleyebilir",
      "Yöneticiler, Analyst aracısına erişime izin verirken Microsoft 365 Copilot'taki Researcher aracısına erişimi engelleyebilir",
    ],
  },
  "real-ab900-101": {
    prompt:
      "Kullanıcıların özel Microsoft 365 Copilot aracıları için bilgi kaynağı olarak harici bir sistem kullanabildiğinden emin olmanız gerekir. Microsoft 365 yönetim merkezinde ne yapılandırmalısınız? (Yanıtlamak için yanıt alanında uygun ayarları seçin.)",
    options: {
      A: "Copilot – Bağlayıcılar",
      B: "Copilot – Arama",
      C: "Copilot – Ayarlar",
      D: "Aracılar – Genel Bakış",
      E: "Aracılar – Araçlar",
      F: "Aracılar – Ayarlar",
    },
  },
};

export default ab900_tr;
