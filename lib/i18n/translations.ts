import { Locale } from './i18n-config';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';

const translations: Record<Locale, any> = {
  en,
  es,
  fr,
};

export const getTranslation = (locale: Locale, key: string): string => {
  const keys = key.split('.');
  let result = translations[locale];

  for (const k of keys) {
    if (result && result[k]) {
      result = result[k];
    } else {
      return key; // Return the key if translation is missing
    }
  }

  return result as string;
};
