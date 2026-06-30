/* ============================================================
   CertCoach — Supabase Auth & Purchase Layer
   ============================================================
   این فایل سیستم قدیمی مبتنی بر localStorage را با Supabase
   جایگزین می‌کند. باید با <script> بعد از Supabase SDK و قبل
   از تگ بسته‌شدن </head> یا ابتدای <body> بارگذاری شود، اما
   PRE از اسکریپت اصلی برنامه (همان اسکریپت بزرگ index.html).

   نکته‌ی مهم معماری:
   این فایل عمداً همان نام توابع قدیمی را دوباره تعریف می‌کند
   (isPurchased, isOwner, getSession, doLogin, doRegister, ...)
   تا بدون دست‌کاری در فایل ۱.۳ مگابایتی index.html، تمام منطق
   موجود (renderSections, isUnlocked, و غیره) بدون تغییر کار کند.
   ============================================================ */

// ---- 1. تنظیمات Supabase ----
// این دو مقدار امن هستند که در کد frontend باشند (Publishable key
// طراحی شده برای همین کار، برخلاف Secret key که هرگز نباید اینجا بیاید).
const SUPABASE_URL = 'https://glbrqlxrjjulzoxweyko.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_KJPKAPp8DCPqNub0ijvTpQ_SKDkRa0e';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// ---- 2. وضعیت داخلی (کش شده در حافظه، نه localStorage) ----
let _ccSession = null;       // { id, email, username }
let _ccPurchasedCache = {};  // { 'az-900': true/false, ... }
let _ccProfileCache = null;  // { id, email, is_owner }

const CURRENT_PRODUCT_CODE = (function(){
  // تشخیص خودکار این‌که کدام صفحه باز است، برای جدول purchases/progress
  var path = window.location.pathname.toLowerCase();
  if(path.indexOf('ab-900') !== -1) return 'ab-900';
  return 'az-900'; // index.html و az-900.html هر دو دوره‌ی AZ-900 هستند
})();

// ---- 3. مقداردهی اولیه: گرفتن سشن فعلی هنگام بار شدن صفحه ----
async function ccInitAuth(){
  try{
    const { data: { session } } = await supabaseClient.auth.getSession();
    if(session && session.user){
      await ccLoadUserContext(session.user);
    }
  }catch(e){
    console.error('Supabase init error', e);
  }
  // وقتی Auth تغییر کند (ورود/خروج در یک تب دیگر هم) رابط کاربری به‌روز شود
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if(session && session.user){
      await ccLoadUserContext(session.user);
    } else {
      _ccSession = null;
      _ccPurchasedCache = {};
      _ccProfileCache = null;
    }
    if(typeof updateNavUser === 'function') updateNavUser();
    if(typeof renderSections === 'function' && document.getElementById('sectionList')) renderSections();
  });
}

async function ccLoadUserContext(user){
  _ccSession = {
    id: user.id,
    email: user.email,
    username: (user.email || '').split('@')[0]
  };
  // گرفتن وضعیت owner از جدول profiles
  try{
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('is_owner')
      .eq('id', user.id)
      .single();
    _ccProfileCache = profile || { is_owner: false };
  }catch(e){
    _ccProfileCache = { is_owner: false };
  }
  // گرفتن همه‌ی خریدهای تأیید‌شده‌ی این کاربر
  try{
    const { data: purchases } = await supabaseClient
      .from('purchases')
      .select('product_code,status')
      .eq('user_id', user.id)
      .eq('status', 'completed');
    _ccPurchasedCache = {};
    (purchases || []).forEach(function(p){ _ccPurchasedCache[p.product_code] = true; });
  }catch(e){
    _ccPurchasedCache = {};
  }
}

// ---- 4. توابعی که جای نسخه‌ی قدیمی localStorage را می‌گیرند ----

function getSession(){
  return _ccSession; // { id, email, username } یا null
}

function isOwner(){
  return !!(_ccProfileCache && _ccProfileCache.is_owner);
}

function isPurchased(){
  // اگر کاربر وارد نشده، قطعاً خریدی ثبت نشده
  if(!_ccSession) return false;
  return !!_ccPurchasedCache[CURRENT_PRODUCT_CODE];
}

// ---- 5. ثبت‌نام / ورود / خروج با Supabase Auth واقعی ----

async function doRegister(){
  var email = document.getElementById('regEmail').value.trim();
  var pass = document.getElementById('regPass').value;
  if(!email || !pass){ showAuthMsg('registerMsg', 'Bitte alle Felder ausfüllen.', 'err'); return; }
  if(pass.length < 6){ showAuthMsg('registerMsg', 'Passwort muss mindestens 6 Zeichen haben.', 'err'); return; }

  showAuthMsg('registerMsg', 'Einen Moment …', '');

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: pass
  });

  if(error){
    var msg = error.message === 'User already registered'
      ? 'Diese E-Mail ist bereits registriert.'
      : 'Registrierung fehlgeschlagen: ' + error.message;
    showAuthMsg('registerMsg', msg, 'err');
    return;
  }

  // اگر تأیید ایمیل فعال باشد (که هست)، کاربر هنوز سشن کامل ندارد
  if(data.user && !data.session){
    showAuthMsg('registerMsg', '✓ Fast geschafft! Bitte bestätigen Sie Ihre E-Mail-Adresse über den Link, den wir Ihnen gerade gesendet haben.', '');
    return;
  }

  // اگر سشن فوری برگشت (مثلاً تأیید ایمیل غیرفعال بود)
  if(data.session){
    await ccLoadUserContext(data.session.user);
    if(typeof updateNavUser === 'function') updateNavUser();
    showPage('dashboard');
  }
}

async function doLogin(){
  var email = document.getElementById('loginEmail').value.trim();
  var pass = document.getElementById('loginPass').value;
  if(!email || !pass){ showAuthMsg('loginMsg', 'Bitte alle Felder ausfüllen.', 'err'); return; }

  showAuthMsg('loginMsg', 'Einen Moment …', '');

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: pass
  });

  if(error){
    var msg = 'E-Mail oder Passwort falsch.';
    if(error.message && error.message.indexOf('Email not confirmed') !== -1){
      msg = 'Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse (Link in Ihrem Posteingang).';
    }
    showAuthMsg('loginMsg', msg, 'err');
    return;
  }

  await ccLoadUserContext(data.user);
  if(typeof updateNavUser === 'function') updateNavUser();
  showPage('dashboard');
}

async function doLogout(){
  await supabaseClient.auth.signOut();
  _ccSession = null;
  _ccPurchasedCache = {};
  _ccProfileCache = null;
  if(typeof updateNavUser === 'function') updateNavUser();
  showPage('home');
}

async function deleteAccount(){
  if(!_ccSession) return;
  if(!confirm('Konto wirklich löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.')) return;
  // حذف کامل حساب نیاز به یک Edge Function با service_role دارد
  // (کاربر عادی اجازه‌ی حذف خودش از auth.users را در Supabase ندارد).
  // فعلاً کاربر را خارج می‌کنیم و یک پیام راهنما می‌دهیم.
  alert('Bitte kontaktieren Sie unseren Support unter info@certcoach.de, um Ihr Konto vollständig löschen zu lassen.');
}

function showForgot(){
  var email = prompt('Bitte geben Sie Ihre E-Mail-Adresse ein, um den Link zum Zurücksetzen des Passworts zu erhalten:');
  if(!email) return;
  supabaseClient.auth.resetPasswordForEmail(email).then(function(res){
    if(res.error){
      showAuthMsg('loginMsg', 'Fehler: ' + res.error.message, 'err');
    } else {
      showAuthMsg('loginMsg', '✓ Falls diese E-Mail registriert ist, wurde ein Link zum Zurücksetzen des Passworts gesendet.', '');
    }
  });
}

// ---- 6. پرداخت واقعی PayPal با تأیید سروری ----
// این بخش جای handlePaypalClick / activatePurchase قدیمی را می‌گیرد.
// به‌جای لینک ساده‌ی paypal.me، از PayPal Checkout SDK استفاده می‌کند
// که یک Order ID رسمی می‌سازد؛ این Order ID سپس به Edge Function
// verify-paypal-payment فرستاده می‌شود تا روی سرور (نه مرورگر) تأیید شود.

function openPurchaseModal(si){
  if(!_ccSession){
    alert('Bitte melden Sie sich zuerst an oder registrieren Sie sich, um fortzufahren.');
    showPage('auth');
    switchAuthTab('login');
    return;
  }
  var certName = CURRENT_PRODUCT_CODE === 'ab-900' ? 'AB-900' : 'AZ-900';
  var desc='Wählen Sie Ihre Zugangsdauer. Mit einer einmaligen Zahlung (kein Abo) werden alle verbleibenden Teile der '+certName+' Prüfung freigeschaltet.';
  document.getElementById('modalBundleDesc').textContent=desc;
  document.getElementById('purchaseModal').classList.add('open');
  document.body.style.overflow='hidden';
  ccRenderPayPalButton();
}

function ccRenderPayPalButton(){
  var container = document.getElementById('paypalButtonContainer');
  if(!container) return;
  container.innerHTML = ''; // هربار که قیمت عوض می‌شود دوباره رندر می‌کنیم
  if(!window.paypal){
    container.innerHTML = '<p style="color:#c0392b">PayPal konnte nicht geladen werden. Bitte Seite neu laden.</p>';
    return;
  }
  window.paypal.Buttons({
    style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
    createOrder: function(data, actions){
      return actions.order.create({
        purchase_units: [{
          amount: { value: SELECTED_TIER.price, currency_code: 'EUR' },
          description: 'CertCoach ' + (CURRENT_PRODUCT_CODE === 'ab-900' ? 'AB-900' : 'AZ-900') + ' — ' + SELECTED_TIER.days + ' Tage Zugang'
        }]
      });
    },
    onApprove: async function(data, actions){
      // PayPal خودش پرداخت را روی سرور خودش "capture" می‌کند
      await actions.order.capture();
      // حالا Order ID را برای تأیید نهایی به Edge Function خودمان می‌فرستیم
      document.getElementById('paypalInstructions').style.display = 'block';
      document.getElementById('paypalInstructions').textContent = 'Zahlung wird überprüft …';
      try{
        const { data: sessionData } = await supabaseClient.auth.getSession();
        const accessToken = sessionData.session.access_token;
        const res = await fetch(SUPABASE_URL + '/functions/v1/verify-paypal-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
          },
          body: JSON.stringify({ orderId: data.orderID, productCode: CURRENT_PRODUCT_CODE })
        });
        const result = await res.json();
        if(res.ok && result.success){
          await ccLoadUserContext(sessionData.session.user); // به‌روزرسانی کش خرید
          closePurchaseModalDirect();
          if(typeof renderSections === 'function') renderSections();
          alert('✓ Zahlung erfolgreich überprüft! Ihr Zugang ist freigeschaltet.\n\n⚠ Wichtig: Um von einem Abschnitt zum nächsten zu gelangen, müssen Sie weiterhin mindestens 90% der Fragen im aktuellen Abschnitt richtig beantworten. Viel Erfolg bei Ihrer Prüfung!');
        } else {
          document.getElementById('paypalInstructions').textContent = 'Die Zahlung konnte nicht verifiziert werden. Bitte kontaktieren Sie info@certcoach.de mit Ihrer PayPal-Bestellnummer: ' + data.orderID;
        }
      }catch(e){
        document.getElementById('paypalInstructions').textContent = 'Ein Fehler ist aufgetreten. Bitte kontaktieren Sie info@certcoach.de mit Ihrer PayPal-Bestellnummer: ' + data.orderID;
      }
    },
    onError: function(err){
      console.error('PayPal error', err);
      document.getElementById('paypalInstructions').style.display = 'block';
      document.getElementById('paypalInstructions').textContent = 'Bei der Zahlung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';
    }
  }).render('#paypalButtonContainer');
}

// ---- 7. شروع به کار هنگام بار شدن صفحه ----
document.addEventListener('DOMContentLoaded', function(){
  ccInitAuth();
});
