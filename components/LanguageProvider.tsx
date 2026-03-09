"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale, defaultLocale, COOKIE_NAME } from '../lib/i18n/i18n-config';
import { getTranslation } from '../lib/i18n/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode, initialLocale?: Locale }> = ({ 
  children,
  initialLocale = defaultLocale 
}) => {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    // Try to get locale from cookie on mount if not provided or to ensure sync
    const cookies = document.cookie.split('; ');
    const langCookie = cookies.find(row => row.startsWith(`${COOKIE_NAME}=`));
    if (langCookie) {
      const value = langCookie.split('=')[1] as Locale;
      if (['en', 'es', 'fr'].includes(value)) {
        setLocaleState(value);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Set cookie that expires in 1 year
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${COOKIE_NAME}=${newLocale}; expires=${expires.toUTCString()}; path=/`;
    
    // Refresh server components
    router.refresh();
  };

  const t = (key: string) => getTranslation(locale, key);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
