import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../../public/locales/en/common.json';
import translationES from '../../public/locales/es/common.json';
import translationFR from '../../public/locales/fr/common.json';
import translationPT from '../../public/locales/pt/common.json';

const resources = {
  en: {
    common: translationEN,
  },
  es: {
    common: translationES,
  },
  fr: {
    common: translationFR,
  },
  pt: {
    common: translationPT,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    ns: ['common'],
    defaultNS: 'common',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
