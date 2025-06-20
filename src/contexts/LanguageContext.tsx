import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'english' | 'portuguese';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  isEnglish: boolean;
  isPortuguese: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('english');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'portuguese' : 'english');
  };

  const value = {
    language,
    toggleLanguage,
    isEnglish: language === 'english',
    isPortuguese: language === 'portuguese',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};