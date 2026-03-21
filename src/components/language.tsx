import { createContext, useContext, useState, useMemo, ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

// Define language context
interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(() => localStorage.getItem("selectedLanguage") || i18n.language || "en");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang).then(() => {
      setLanguage(newLang);
      localStorage.setItem("selectedLanguage", newLang);
    });
  };

  const contextValue = useMemo(() => ({ language, toggleLanguage }), [language]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Language Switcher Component
export const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button onClick={toggleLanguage} className="ml-auto bg-primary dark:bg-secondary">
      {language.toUpperCase()}
    </Button>
  );
};
