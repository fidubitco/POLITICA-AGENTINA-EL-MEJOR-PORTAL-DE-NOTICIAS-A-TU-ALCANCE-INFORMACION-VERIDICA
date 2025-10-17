/**
 * Full Language Configuration - 80 Languages
 * Complete internationalization support
 */

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
  enabled: boolean;
}

export const LANGUAGES: Language[] = [
  // Latin America & Spain
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', enabled: true },
  { code: 'es-AR', name: 'Spanish (Argentina)', nativeName: 'Español (Argentina)', flag: '🇦🇷', enabled: true },
  { code: 'es-MX', name: 'Spanish (Mexico)', nativeName: 'Español (México)', flag: '🇲🇽', enabled: true },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', enabled: true },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷', enabled: true },

  // Major European Languages
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', enabled: true },
  { code: 'en-US', name: 'English (US)', nativeName: 'English (US)', flag: '🇺🇸', enabled: true },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', enabled: true },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', enabled: true },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', enabled: true },

  // Eastern Europe
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', enabled: true },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', enabled: true },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', enabled: true },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', enabled: true },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', enabled: true },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', enabled: true },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸', enabled: true },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', enabled: true },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', enabled: true },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮', enabled: true },

  // Nordic
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', enabled: true },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', enabled: true },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', enabled: true },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', enabled: true },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', flag: '🇮🇸', enabled: true },

  // Asian Languages
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳', enabled: true },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼', enabled: true },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', enabled: true },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', enabled: true },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', enabled: true },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', enabled: true },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', enabled: true },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', enabled: true },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', enabled: true },

  // Middle East & Arabic
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true, enabled: true },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', rtl: true, enabled: true },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', rtl: true, enabled: true },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', enabled: true },

  // South Asian
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', enabled: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', enabled: true },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', rtl: true, enabled: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', enabled: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', enabled: true },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', enabled: true },

  // Africa
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', enabled: true },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', enabled: true },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬', enabled: true },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬', enabled: true },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬', enabled: true },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦', enabled: true },

  // Other European
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', enabled: true },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', enabled: true },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', enabled: true },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', flag: '🇪🇸', enabled: true },
  { code: 'eu', name: 'Basque', nativeName: 'Euskara', flag: '🇪🇸', enabled: true },
  { code: 'gl', name: 'Galician', nativeName: 'Galego', flag: '🇪🇸', enabled: true },

  // Additional Languages
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦', enabled: false },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱', enabled: false },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: '🇦🇿', enabled: false },
  { code: 'be', name: 'Belarusian', nativeName: 'Беларуская', flag: '🇧🇾', enabled: false },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦', enabled: false },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪', enabled: false },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', flag: '🇬🇪', enabled: false },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', enabled: false },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ', flag: '🇰🇿', enabled: false },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', flag: '🇰🇭', enabled: false },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', enabled: false },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча', flag: '🇰🇬', enabled: false },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ', flag: '🇱🇦', enabled: false },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻', enabled: false },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹', enabled: false },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', flag: '🇲🇰', enabled: false },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', enabled: false },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', flag: '🇲🇳', enabled: false },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာ', flag: '🇲🇲', enabled: false },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', enabled: false },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', enabled: false },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰', enabled: false },
];

export const DEFAULT_LANGUAGE = 'es-AR';

export const getEnabledLanguages = () => LANGUAGES.filter(lang => lang.enabled);

export const getLanguageByCode = (code: string) =>
  LANGUAGES.find(lang => lang.code === code) || LANGUAGES.find(lang => lang.code === DEFAULT_LANGUAGE);

export const getLanguageDirection = (code: string) => {
  const lang = getLanguageByCode(code);
  return lang?.rtl ? 'rtl' : 'ltr';
};
