<script>
  const translations = {
    en: {
      register_title: "Create Account",
      username: "Username",
      email: "Email",
      phone: "Phone Number",
      password: "Password",
      confirm_password: "Confirm Password",
      register_btn: "Register",
      have_account: "Already have an account?",
      login_link: "Login",
      login_title: "Login",
      no_account: "Don't have an account?",
      login_btn: "Login",
      select_category: "Select Crop Category",
    },
    hi: {
      register_title: "खाता बनाएँ",
      username: "उपयोगकर्ता नाम",
      email: "ईमेल",
      phone: "फ़ोन नंबर",
      password: "पासवर्ड",
      confirm_password: "पासवर्ड की पुष्टि करें",
      register_btn: "रजिस्टर करें",
      have_account: "क्या आपके पास खाता है?",
      login_link: "लॉगिन करें",
      login_title: "लॉगिन",
      no_account: "खाता नहीं है?",
      login_btn: "लॉगिन",
      select_category: "फसल श्रेणी चुनें",
    },
    kn: {
      register_title: "ಖಾತೆ ರಚಿಸಿ",
      username: "ಬಳಕೆದಾರ ಹೆಸರು",
      email: "ಇಮೇಲ್",
      phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
      password: "ಗುಪ್ತಪದ",
      confirm_password: "ಗುಪ್ತಪದ ದೃಢೀಕರಿಸಿ",
      register_btn: "ನೋಂದಣಿ",
      have_account: "ಖಾತೆ ಈಗಾಗಲೇ ಇದೆಯೆ?",
      login_link: "ಲಾಗಿನ್",
      login_title: "ಲಾಗಿನ್",
      no_account: "ಖಾತೆ ಇಲ್ಲವೆ?",
      login_btn: "ಲಾಗಿನ್",
      select_category: "ಬೆಳೆ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    },
    bn: {
      register_title: "অ্যাকাউন্ট তৈরি করুন",
      username: "ব্যবহারকারীর নাম",
      email: "ইমেল",
      phone: "ফোন নম্বর",
      password: "পাসওয়ার্ড",
      confirm_password: "পাসওয়ার্ড নিশ্চিত করুন",
      register_btn: "নিবন্ধন করুন",
      have_account: "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?",
      login_link: "লগইন করুন",
      login_title: "লগইন",
      no_account: "অ্যাকাউন্ট নেই?",
      login_btn: "লগইন",
      select_category: "ফসলের বিভাগ নির্বাচন করুন",
    }
  };

  function setLang(lang) {
    localStorage.setItem("rb_lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = translations[lang][key] || key;
    });

    const selector = document.getElementById("langSelect");
    if (selector) selector.value = lang;
  }

  function initLang() {
    const savedLang = localStorage.getItem("rb_lang") || "en";
    setLang(savedLang);
    const selector = document.getElementById("langSelect");
    if (selector) {
      selector.addEventListener("change", (e) => setLang(e.target.value));
    }
  }

  document.addEventListener("DOMContentLoaded", initLang);
</script>
   language.js