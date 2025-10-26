import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones
import es from '../../public/locales/es/common.json';
import en from '../../public/locales/en/common.json';
import fr from '../../public/locales/fr/common.json';
import pt from '../../public/locales/pt/common.json';

const resources = {
  es: { common: es },
  en: { common: en },
  fr: { common: fr },
  pt: { common: pt },
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
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;