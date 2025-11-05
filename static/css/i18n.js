// Simple i18n system with persistent language
(function(){
  const LS_KEY = "rb_lang";
  window.RB_I18N = window.RB_I18N || {};
  RB_I18N.langs = ["en","kn","hi","bn"];
  RB_I18N.langMap = { en:"en-US", kn:"kn-IN", hi:"hi-IN", bn:"bn-IN" };
  RB_I18N.t = {
    en: {
      app_name: "Raitha Bandhu",
      select_language: "Language",
      register_title: "Create Account",
      login_title: "Login",
      username: "Username",
      password: "Password",
      email: "Email",
      have_account: "Already have an account?",
      no_account: "Don't have an account?",
      login_link: "Login",
      register_link: "Register",
      register_btn: "Register",
      login_btn: "Login",
      register_success: "Registration successful",
      register_fail: "Registration failed",
      user_exists: "Username already exists",
      login_success: "Login successfully",
      login_fail: "Invalid credentials",
      select_category: "Select Crop Category",
      cat_foodgrain: "Food Grains",
      cat_vegetable: "Vegetables",
      cat_fruit: "Fruits",
      cat_spice: "Spices",
      cat_pulse: "Pulses",
      cat_oilseed: "Oilseed Crops",
      cat_commercial: "Commercial Crops",
      cat_flower: "Flowers",
      crop_details: "Crop Details",
      back_to_categories: "Back to Categories",
      details: "Details",
      season: "Season",
      soil: "Soil",
      rainfall: "Rainfall",
      temperature: "Temperature",
      duration: "Duration",
      months: "months",
      speak_details: "Speak Details"
    },
    kn: {
      app_name: "ರೈತ ಬಂಧು",
      select_language: "ಭಾಷೆ",
      register_title: "ಖಾತೆ ರಚಿಸಿ",
      login_title: "ಲಾಗಿನ್",
      username: "ಬಳಕೆದಾರ ಹೆಸರು",
      password: "ಗುಪ್ತಪದ",
      email: "ಇಮೇಲ್",
      have_account: "ಈಗಾಗಲೇ ಖಾತೆಯಿದೆಯಾ?",
      no_account: "ಖಾತೆ ಇಲ್ಲವಾ?",
      login_link: "ಲಾಗಿನ್",
      register_link: "ನೋಂದಣಿ",
      register_btn: "ನೋಂದಣಿ",
      login_btn: "ಲಾಗಿನ್",
      register_success: "ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಯಿತು",
      register_fail: "ನೋಂದಣಿ ವಿಫಲವಾಯಿತು",
      user_exists: "ಬಳಕೆದಾರ ಹೆಸರು ಈಗಾಗಲೇ ಇದೆ",
      login_success: "ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಯಿತು",
      login_fail: "ಅಮಾನ್ಯ ಮಾಹಿತಿ",
      select_category: "ಬೆಳೆ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      cat_foodgrain: "ಅನ್ನಧಾನ್ಯಗಳು",
      cat_vegetable: "ತರಕಾರಿಗಳು",
      cat_fruit: "ಹಣ್ಣುಗಳು",
      cat_spice: "ಮಸಾಲೆ ಬೆಳೆಗಳು",
      cat_pulse: "ಕಾಳುಗಳು",
      cat_oilseed: "ಎಣ್ಣೆ ಬೀಜ ಬೆಳೆಗಳು",
      cat_commercial: "ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು",
      cat_flower: "ಹೂಗಳು",
      crop_details: "ಬೆಳೆ ವಿವರಗಳು",
      back_to_categories: "ವರ್ಗಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
      details: "ವಿವರಗಳು",
      season: "ಹಂಗಾಮ",
      soil: "ಮಣ್ಣು",
      rainfall: "ವರ್ಷಾ",
      temperature: "ತಾಪಮಾನ",
      duration: "ಅವಧಿ",
      months: "ತಿಂಗಳುಗಳು",
      speak_details: "ವಿವರಗಳನ್ನು ಓದಿ"
    },
    hi: {
      app_name: "रैता बंधु",
      select_language: "भाषा",
      register_title: "खाता बनाएं",
      login_title: "लॉगिन",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      email: "ईमेल",
      have_account: "क्या पहले से खाता है?",
      no_account: "खाता नहीं है?",
      login_link: "लॉगिन",
      register_link: "रजिस्टर",
      register_btn: "রजिस्टर",
      login_btn: "लॉगिन",
      register_success: "पंजीकरण सफल",
      register_fail: "पंजीकरण असफल",
      user_exists: "उपयोगकर्ता नाम पहले से मौजूद है",
      login_success: "लॉगिन सफल",
      login_fail: "अमान्य प्रमाण",
      select_category: "फसल श्रेणी चुनें",
      cat_foodgrain: "अनाज",
      cat_vegetable: "सब्ज़ियाँ",
      cat_fruit: "फल",
      cat_spice: "মसाले",
      cat_pulse: "दालें",
      cat_oilseed: "तेलहन फसलें",
      cat_commercial: "वाणिज्यिक फसलें",
      cat_flower: "फूल",
      crop_details: "फसल विवरण",
      back_to_categories: "वर्गों पर वापस जाएँ",
      details: "विवरण",
      season: "মौसम",
      soil: "मिट्टी",
      rainfall: "वर्षा",
      temperature: "तাপमान",
      duration: "अवधि",
      months: "महीने",
      speak_details: "विवरण सुनें"
    },
    bn: {
      app_name: "রাইথা বন্ধু",
      select_language: "ভাষা",
      register_title: "অ্যাকাউন্ট তৈরি করুন",
      login_title: "লগইন",
      username: "ব্যবহারকারীর নাম",
      password: "পাসওয়ার্ড",
      email: "ইমেইল",
      have_account: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
      no_account: "অ্যাকাউন্ট নেই?",
      login_link: "লগইন",
      register_link: "রেজিস্টার",
      register_btn: "রেজিস্টার",
      login_btn: "লগইন",
      register_success: "নিবন্ধন সফল",
      register_fail: "নিবন্ধন ব্যর্থ",
      user_exists: "ব্যবহারকারীর নাম আগে থেকেই আছে",
      login_success: "লগইন সফল",
      login_fail: "অবৈধ তথ্য",
      select_category: "শস্যের বিভাগ নির্বাচন করুন",
      cat_foodgrain: "অন্নশস্য",
      cat_vegetable: "সবজি",
      cat_fruit: "ফল",
      cat_spice: "মসলা",
      cat_pulse: "ডাল",
      cat_oilseed: "তেলের ফসল",
      cat_commercial: "বাণিজ্যিক ফসল",
      cat_flower: "ফুল",
      crop_details: "শস্যের বিবরণ",
      back_to_categories: "বিভাগে ফিরে যান",
      details: "বিস্তারিত",
      season: "ঋতু",
      soil: "মাটি",
      rainfall: "বৃষ্টিপাত",
      temperature: "তাপমাত্রা",
      duration: "সময়কাল",
      months: "মাস",
      speak_details: "বিবরণ পড়ুন"
    }
  };

  RB_I18N.getLang = function(){
    return localStorage.getItem("rb_lang") || "en";
  };
  RB_I18N.setLang = function(code){
    if(!RB_I18N.langs.includes(code)) code = "en";
    localStorage.setItem("rb_lang", code);
    RB_I18N.apply();
  };

  RB_I18N.apply = function(){
    const lang = RB_I18N.getLang();
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      const t = (RB_I18N.t[lang] && RB_I18N.t[lang][key]) || (RB_I18N.t.en[key]||"");
      if(el.placeholder !== undefined && el.hasAttribute("data-i18n-ph")){
        el.placeholder = t;
      } else {
        el.textContent = t;
      }
    });
  };

  RB_I18N.injectSelector = function(){
    if(document.getElementById("rb-lang-wrap")) return;
    const wrap = document.createElement("div");
    wrap.id = "rb-lang-wrap";
    wrap.style.cssText = "position:fixed;top:10px;right:10px;z-index:9999;background:rgba(255,255,255,.95);padding:6px 10px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.15);display:flex;gap:6px;align-items:center;font-family:inherit;";
    const label = document.createElement("span");
    label.setAttribute("data-i18n","select_language");
    label.style.minWidth = "auto";
    const sel = document.createElement("select");
    sel.id = "rb-lang";
    sel.style.cssText = "padding:6px;border:1px solid #ddd;border-radius:8px;";
    RB_I18N.langs.forEach(code=>{
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = code.toUpperCase();
      sel.appendChild(opt);
    });
    wrap.appendChild(label);
    wrap.appendChild(sel);
    document.body.appendChild(wrap);
    sel.value = RB_I18N.getLang();
    sel.addEventListener("change", ()=>{
      RB_I18N.setLang(sel.value);
    });
  };

  document.addEventListener("DOMContentLoaded", ()=>{
    RB_I18N.injectSelector();
    RB_I18N.apply();
  });
})();
