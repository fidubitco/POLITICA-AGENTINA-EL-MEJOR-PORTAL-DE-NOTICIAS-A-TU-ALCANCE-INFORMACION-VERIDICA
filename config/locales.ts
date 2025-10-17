/**
 * LOCALE CONFIGURATION - 90 Languages
 *
 * Comprehensive multilingual support for global news portal
 */

export interface LocaleConfig {
  code: string
  name: string
  nativeName: string
  dir: 'ltr' | 'rtl'
  tier: 1 | 2 | 3
}

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  // ========================================
  // TIER 1: MAJOR LANGUAGES (20)
  // ========================================
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr', tier: 1 },
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr', tier: 1 },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', dir: 'ltr', tier: 1 },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', dir: 'ltr', tier: 1 },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl', tier: 1 },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', dir: 'ltr', tier: 1 },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr', tier: 1 },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr', tier: 1 },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr', tier: 1 },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr', tier: 1 },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr', tier: 1 },
  { code: 'ko', name: 'Korean', nativeName: '한국어', dir: 'ltr', tier: 1 },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', dir: 'ltr', tier: 1 },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr', tier: 1 },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', dir: 'ltr', tier: 1 },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', dir: 'ltr', tier: 1 },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', dir: 'ltr', tier: 1 },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', dir: 'ltr', tier: 1 },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', dir: 'ltr', tier: 1 },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', dir: 'ltr', tier: 1 },

  // ========================================
  // TIER 2: REGIONAL LANGUAGES (30)
  // ========================================
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', dir: 'ltr', tier: 2 },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', dir: 'ltr', tier: 2 },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino', dir: 'ltr', tier: 2 },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl', tier: 2 },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr', tier: 2 },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', dir: 'ltr', tier: 2 },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', dir: 'ltr', tier: 2 },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', dir: 'ltr', tier: 2 },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', dir: 'ltr', tier: 2 },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', dir: 'ltr', tier: 2 },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', dir: 'ltr', tier: 2 },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', dir: 'rtl', tier: 2 },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl', tier: 2 },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', dir: 'ltr', tier: 2 },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', dir: 'ltr', tier: 2 },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', dir: 'ltr', tier: 2 },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', dir: 'ltr', tier: 2 },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', dir: 'ltr', tier: 2 },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', dir: 'ltr', tier: 2 },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', dir: 'ltr', tier: 2 },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', dir: 'ltr', tier: 2 },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', dir: 'ltr', tier: 2 },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', dir: 'ltr', tier: 2 },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', dir: 'ltr', tier: 2 },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', dir: 'ltr', tier: 2 },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', dir: 'ltr', tier: 2 },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', dir: 'ltr', tier: 2 },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', dir: 'ltr', tier: 2 },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', dir: 'ltr', tier: 2 },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', dir: 'ltr', tier: 2 },

  // ========================================
  // TIER 3: EMERGING MARKETS (40)
  // ========================================
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', dir: 'ltr', tier: 3 },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', dir: 'ltr', tier: 3 },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', dir: 'ltr', tier: 3 },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', dir: 'ltr', tier: 3 },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', dir: 'ltr', tier: 3 },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', dir: 'ltr', tier: 3 },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', dir: 'ltr', tier: 3 },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', dir: 'ltr', tier: 3 },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', dir: 'ltr', tier: 3 },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', dir: 'ltr', tier: 3 },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', dir: 'ltr', tier: 3 },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ', dir: 'ltr', tier: 3 },
  { code: 'my', name: 'Myanmar', nativeName: 'မြန်မာ', dir: 'ltr', tier: 3 },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', dir: 'ltr', tier: 3 },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ', dir: 'ltr', tier: 3 },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', dir: 'ltr', tier: 3 },
  { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ', dir: 'ltr', tier: 3 },
  { code: 'tk', name: 'Turkmen', nativeName: 'Türkmen', dir: 'ltr', tier: 3 },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча', dir: 'ltr', tier: 3 },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', dir: 'ltr', tier: 3 },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', dir: 'ltr', tier: 3 },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', dir: 'ltr', tier: 3 },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', dir: 'ltr', tier: 3 },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', dir: 'ltr', tier: 3 },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti', dir: 'ltr', tier: 3 },
  { code: 'lb', name: 'Luxembourgish', nativeName: 'Lëtzebuergesch', dir: 'ltr', tier: 3 },
  { code: 'eu', name: 'Basque', nativeName: 'Euskara', dir: 'ltr', tier: 3 },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', dir: 'ltr', tier: 3 },
  { code: 'gl', name: 'Galician', nativeName: 'Galego', dir: 'ltr', tier: 3 },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg', dir: 'ltr', tier: 3 },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge', dir: 'ltr', tier: 3 },
  { code: 'gd', name: 'Scottish Gaelic', nativeName: 'Gàidhlig', dir: 'ltr', tier: 3 },
  { code: 'mi', name: 'Maori', nativeName: 'Māori', dir: 'ltr', tier: 3 },
  { code: 'sm', name: 'Samoan', nativeName: 'Samoa', dir: 'ltr', tier: 3 },
  { code: 'to', name: 'Tongan', nativeName: 'Lea Faka-Tonga', dir: 'ltr', tier: 3 },
  { code: 'fj', name: 'Fijian', nativeName: 'Vosa Vakaviti', dir: 'ltr', tier: 3 },
  { code: 'haw', name: 'Hawaiian', nativeName: 'ʻŌlelo Hawaiʻi', dir: 'ltr', tier: 3 },
  { code: 'nv', name: 'Navajo', nativeName: 'Diné bizaad', dir: 'ltr', tier: 3 },
  { code: 'chr', name: 'Cherokee', nativeName: 'ᏣᎳᎩ', dir: 'ltr', tier: 3 },
  { code: 'qu', name: 'Quechua', nativeName: 'Runa Simi', dir: 'ltr', tier: 3 }
]

// Helper functions
export const DEFAULT_LOCALE = 'es'

export const LOCALE_CODES = SUPPORTED_LOCALES.map(l => l.code)

export const RTL_LOCALES = SUPPORTED_LOCALES.filter(l => l.dir === 'rtl').map(l => l.code)

export const TIER_1_LOCALES = SUPPORTED_LOCALES.filter(l => l.tier === 1).map(l => l.code)

export const LOCALE_NAMES: Record<string, string> = Object.fromEntries(
  SUPPORTED_LOCALES.map(l => [l.code, l.nativeName])
)

export const LOCALE_FULL_NAMES: Record<string, string> = Object.fromEntries(
  SUPPORTED_LOCALES.map(l => [l.code, `${l.nativeName} (${l.name})`])
)

export function isRTL(locale: string): boolean {
  return RTL_LOCALES.includes(locale)
}

export function getLocaleConfig(code: string): LocaleConfig | undefined {
  return SUPPORTED_LOCALES.find(l => l.code === code)
}

export function isValidLocale(code: string): boolean {
  return LOCALE_CODES.includes(code)
}
