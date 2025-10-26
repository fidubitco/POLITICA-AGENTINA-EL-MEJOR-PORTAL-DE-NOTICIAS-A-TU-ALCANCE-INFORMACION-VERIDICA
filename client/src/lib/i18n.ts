import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Las traducciones se cargarán dinámicamente desde /locales/

// Idiomas soportados - TOP 11 LANGUAGES (COMPLETAMENTE TRADUCIDOS)
export const supportedLanguages = [
  { code: 'es', name: 'Español', flag: '🇦🇷', nativeName: 'Español', dir: 'ltr' },
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English', dir: 'ltr' },
  { code: 'pt', name: 'Português', flag: '🇧🇷', nativeName: 'Português', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch', dir: 'ltr' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語', dir: 'ltr' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية', dir: 'rtl' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어', dir: 'ltr' },
];

// Helper functions
export const getLanguageByCode = (code: string) => {
  return supportedLanguages.find(lang => lang.code === code) || supportedLanguages[0];
};

export const getLanguageDirection = (code: string) => {
  const lang = getLanguageByCode(code);
  return lang.dir || 'ltr';
};

export const getLanguageUrlPrefix = (code: string) => {
  return code === 'es' ? '' : `/${code}`;
};

export const removeLanguagePrefix = (path: string) => {
  const langCodes = supportedLanguages.map(l => l.code).filter(c => c !== 'es');
  for (const code of langCodes) {
    if (path.startsWith(`/${code}/`) || path === `/${code}`) {
      return path.replace(`/${code}`, '') || '/';
    }
  }
  return path;
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    debug: false,
    supportedLngs: supportedLanguages.map(l => l.code),
    interpolation: {
      escapeValue: false,
    },
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      order: ['path', 'querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      caches: ['localStorage', 'cookie'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;