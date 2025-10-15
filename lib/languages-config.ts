export const supportedLanguages = [
  // Principales
  { code: "es", name: "Español", nativeName: "Español", flag: "🇦🇷", priority: 10 },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", priority: 10 },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷", priority: 9 },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", priority: 8 },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", priority: 8 },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮��", priority: 7 },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", priority: 9 },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", priority: 8 },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", priority: 7 },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", priority: 8 },
  
  // Europa
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱", priority: 6 },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱", priority: 6 },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪", priority: 5 },
  { code: "no", name: "Norwegian", nativeName: "Norsk", flag: "🇳🇴", priority: 5 },
  { code: "da", name: "Danish", nativeName: "Dansk", flag: "🇩🇰", priority: 5 },
  { code: "fi", name: "Finnish", nativeName: "Suomi", flag: "🇫🇮", priority: 5 },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", flag: "🇬🇷", priority: 5 },
  { code: "cs", name: "Czech", nativeName: "Čeština", flag: "🇨🇿", priority: 5 },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", flag: "🇭🇺", priority: 5 },
  { code: "ro", name: "Romanian", nativeName: "Română", flag: "🇷🇴", priority: 5 },
  
  // América Latina
  { code: "es-MX", name: "Spanish (Mexico)", nativeName: "Español (México)", flag: "🇲🇽", priority: 7 },
  { code: "es-CL", name: "Spanish (Chile)", nativeName: "Español (Chile)", flag: "🇨🇱", priority: 6 },
  { code: "es-CO", name: "Spanish (Colombia)", nativeName: "Español (Colombia)", flag: "🇨🇴", priority: 6 },
  { code: "es-PE", name: "Spanish (Peru)", nativeName: "Español (Perú)", flag: "🇵🇪", priority: 6 },
  { code: "es-VE", name: "Spanish (Venezuela)", nativeName: "Español (Venezuela)", flag: "🇻🇪", priority: 5 },
  
  // Medio Oriente y África
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", priority: 7 },
  { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱", priority: 5 },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", priority: 6 },
  { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷", priority: 5 },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪", priority: 4 },
  
  // Asia
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", priority: 7 },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭", priority: 5 },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳", priority: 6 },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩", priority: 6 },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾", priority: 4 },
  { code: "tl", name: "Tagalog", nativeName: "Tagalog", flag: "🇵🇭", priority: 5 },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩", priority: 5 },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰", priority: 4 },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳", priority: 4 },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳", priority: 4 },
  
  // Europa Oriental
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦", priority: 6 },
  { code: "bg", name: "Bulgarian", nativeName: "Български", flag: "🇧🇬", priority: 4 },
  { code: "sr", name: "Serbian", nativeName: "Српски", flag: "🇷🇸", priority: 4 },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski", flag: "🇭🇷", priority: 4 },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", flag: "🇸🇰", priority: 4 },
  { code: "sl", name: "Slovenian", nativeName: "Slovenščina", flag: "🇸🇮", priority: 3 },
  
  // Otros Europeos
  { code: "ca", name: "Catalan", nativeName: "Català", flag: "🏴", priority: 4 },
  { code: "gl", name: "Galician", nativeName: "Galego", flag: "🏴", priority: 3 },
  { code: "eu", name: "Basque", nativeName: "Euskara", flag: "🏴", priority: 3 },
  { code: "cy", name: "Welsh", nativeName: "Cymraeg", flag: "🏴", priority: 2 },
  { code: "ga", name: "Irish", nativeName: "Gaeilge", flag: "🇮🇪", priority: 2 },
  
  // Adicionales
  { code: "af", name: "Afrikaans", nativeName: "Afrikaans", flag: "🇿🇦", priority: 3 },
  { code: "sq", name: "Albanian", nativeName: "Shqip", flag: "🇦🇱", priority: 3 },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", flag: "🇪🇹", priority: 2 },
  { code: "az", name: "Azerbaijani", nativeName: "Azərbaycan", flag: "🇦🇿", priority: 3 },
  { code: "be", name: "Belarusian", nativeName: "Беларуская", flag: "🇧🇾", priority: 2 },
  { code: "bs", name: "Bosnian", nativeName: "Bosanski", flag: "🇧🇦", priority: 2 },
  { code: "et", name: "Estonian", nativeName: "Eesti", flag: "🇪🇪", priority: 2 },
  { code: "ka", name: "Georgian", nativeName: "ქართული", flag: "🇬🇪", priority: 2 },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳", priority: 2 },
  { code: "ht", name: "Haitian Creole", nativeName: "Kreyòl", flag: "🇭🇹", priority: 2 },
  { code: "ha", name: "Hausa", nativeName: "Hausa", flag: "🇳🇬", priority: 2 },
  { code: "is", name: "Icelandic", nativeName: "Íslenska", flag: "🇮🇸", priority: 2 },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳", priority: 2 },
  { code: "kk", name: "Kazakh", nativeName: "Қазақ", flag: "🇰🇿", priority: 2 },
  { code: "km", name: "Khmer", nativeName: "ខ្មែរ", flag: "🇰🇭", priority: 2 },
  { code: "lo", name: "Lao", nativeName: "ລາວ", flag: "🇱🇦", priority: 1 },
  { code: "lv", name: "Latvian", nativeName: "Latviešu", flag: "🇱🇻", priority: 2 },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių", flag: "🇱🇹", priority: 2 },
  { code: "mk", name: "Macedonian", nativeName: "Македонски", flag: "🇲🇰", priority: 2 },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳", priority: 2 },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳", priority: 2 },
  { code: "mn", name: "Mongolian", nativeName: "Монгол", flag: "🇲🇳", priority: 2 },
  { code: "my", name: "Burmese", nativeName: "မြန်မာ", flag: "🇲🇲", priority: 1 },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", flag: "🇳🇵", priority: 2 },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳", priority: 2 },
  { code: "si", name: "Sinhala", nativeName: "සිංහල", flag: "🇱🇰", priority: 1 },
  { code: "zu", name: "Zulu", nativeName: "isiZulu", flag: "🇿🇦", priority: 2 },
];

export const defaultLanguage = "es";

export function getLanguageByCode(code: string) {
  return supportedLanguages.find(l => l.code === code) || supportedLanguages[0];
}

export function getTopLanguages(count: number = 10) {
  return supportedLanguages
    .sort((a, b) => b.priority - a.priority)
    .slice(0, count);
}
