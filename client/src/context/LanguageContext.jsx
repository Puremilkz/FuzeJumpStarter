import { createContext, useContext, useState, useCallback } from 'react';
import { translations, getTranslation, formatMessage } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = getTranslation(language);
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }, [language]);

  const format = useCallback((key, values) => {
    return formatMessage(t(key), values);
  }, [t]);

  const changeLanguage = useCallback((newLang) => {
    if (translations[newLang]) {
      setLanguage(newLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, t, format, changeLanguage, availableLanguages: Object.keys(translations) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
