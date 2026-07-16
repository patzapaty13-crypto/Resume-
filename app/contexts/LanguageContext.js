"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { th } from "../locales/th";
import { en } from "../locales/en";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("th"); // default Thai
  
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === "th" ? "en" : "th";
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = locale === "th" ? th : en;

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
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
