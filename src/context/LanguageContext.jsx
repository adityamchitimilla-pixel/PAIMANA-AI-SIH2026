import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [fontSizeScale, setFontSizeScale] = useState(1); // 0.9 (A-), 1 (A), 1.15 (A+)

  // Helper translation function
  const t = (key, fallback = '') => {
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      return TRANSLATIONS[lang][key];
    }
    if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) {
      return TRANSLATIONS['en'][key];
    }
    return fallback || key;
  };

  const changeFontSize = (delta) => {
    if (delta === 0) {
      setFontSizeScale(1);
      document.documentElement.style.fontSize = '14px';
    } else if (delta < 0) {
      setFontSizeScale(0.9);
      document.documentElement.style.fontSize = '12.5px';
    } else {
      setFontSizeScale(1.15);
      document.documentElement.style.fontSize = '16px';
    }
  };

  return (
    <LanguageContext.Provider value={{
      lang,
      setLang,
      languages: LANGUAGES,
      t,
      fontSizeScale,
      changeFontSize
    }}>
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
