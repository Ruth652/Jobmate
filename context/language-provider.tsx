"use client";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "am";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: {
    // Header
    appTitle: "JobMate",
    appSubtitle: "Your AI Career Buddy",
    switchToAmharic: "አማ",

    // Welcome message
    welcomeMessage:
      "Hello! I'm JobMate, your AI career buddy. I'm here to help Ethiopian youth like you with CV feedback, job opportunities, and interview practice. How can I assist you today?",
    l_welcome: "Welcome Back",
      l_subtitle: "Sign in to continue your career journey",
      email: "Email Address",
      password: "Password",
      l_signIn: "Sign In",
      l_signingIn: "Signing In...",
      l_noAccount: "Don’t have an account?  Sign up",
    r_join: "Join JobMate",
      r_create: "Create your account to get started",
      r_fullName: "Full Name",
      r_createAccount: "Create Account",
      r_haveAccount: "Already have an account? Sign in",
    
  },
  am: {
    // Header
    appTitle: "JobMate",
    appSubtitle: "የእርስዎ AI ሙያ ጓደኛ",
    switchToAmharic: "En",

    // Welcome message
    welcomeMessage:
      "ሰላም! እኔ JobMate ነኝ፣ የእርስዎ AI ሙያ ጓደኛ። እንደ እርስዎ ላሉ የኢትዮጵያ ወጣቶች CV ግብረመልስ፣ የስራ እድሎች እና የቃለ መጠይቅ ልምምድ ለመስጠት እዚህ ነኝ። ዛሬ እንዴት ልረዳዎት እችላለሁ?",
    
      l_welcome: "እንኳን በደህና መጡ",
      l_subtitle: "የሥራ ጉዞዎን ለመቀጠል ግባ",
      email: "ኢሜይል አድራሻ",
      password: "የይለፍ ቃል",
      l_signIn: "ግባ",
      l_signingIn: "በመግባት ላይ...",
      l_noAccount: "መለያ የለህም? አዲስ መለያ አስፈጥር",
    
    
      r_join: "JobMate ጋር ተቀላቀል",
      r_create: "መለያህን አስፍጠር እና ጀምር",
      r_fullName: "ሙሉ ስም",
      r_createAccount: "መለያ አስፈጥር",
      r_haveAccount: "መለያ አለህ? ግባ",
    
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("jobmate-language") as Language;
    console.log(savedLanguage);
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "am")) {
      setLanguageState(savedLanguage);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("jobmate-language", lang);
    document.documentElement.lang = lang === "am" ? "am" : "en";
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {/*    <div className={language === "am" ? "font-ethiopic" : "font-sans"}> */}
      <div className="font-sans">{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
