"use client";

import { useLanguage } from '../components/LanguageProvider';

export const useTranslation = () => {
  const { t, locale, setLocale } = useLanguage();
  return { t, locale, setLocale };
};
