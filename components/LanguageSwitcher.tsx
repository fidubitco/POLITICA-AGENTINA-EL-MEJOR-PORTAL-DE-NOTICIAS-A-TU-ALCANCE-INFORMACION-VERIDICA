'use client'

import { useState, useMemo } from 'react'
import { locales, type Locale } from '@/lib/locales'
import { useRouter, usePathname } from 'next/navigation'
import { t } from '@/lib/translations'

interface LanguageSwitcherProps {
  currentLocale: string
  className?: string
}

export function LanguageSwitcher({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const currentLocaleData = useMemo(
    () => locales.find(l => l.code === currentLocale) || locales[0],
    [currentLocale]
  )

  const filteredLocales = useMemo(() => {
    if (!searchTerm) return locales
    const term = searchTerm.toLowerCase()
    return locales.filter(
      l =>
        l.name.toLowerCase().includes(term) ||
        l.nativeName.toLowerCase().includes(term) ||
        l.code.toLowerCase().includes(term)
    )
  }, [searchTerm])

  const handleLocaleChange = (localeCode: string) => {
    // Replace current locale in pathname
    const segments = pathname.split('/')
    segments[1] = localeCode
    const newPath = segments.join('/')

    router.push(newPath)
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className={`relative ${className}`}>
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
      >
        <span className="text-2xl">{getFlagEmoji(currentLocale)}</span>
        <span className="font-medium text-gray-900">{currentLocaleData.nativeName}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => {
              setIsOpen(false)
              setSearchTerm('')
            }}
          />

          {/* Dropdown Panel */}
          <div className="absolute z-20 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search languages..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>

            {/* Language List */}
            <div className="overflow-y-auto max-h-72">
              {filteredLocales.length > 0 ? (
                filteredLocales.map((locale) => (
                  <button
                    key={locale.code}
                    onClick={() => handleLocaleChange(locale.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                      locale.code === currentLocale ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <span className="text-2xl">{getFlagEmoji(locale.code)}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{locale.nativeName}</div>
                      <div className="text-sm text-gray-500">{locale.name}</div>
                    </div>
                    {locale.code === currentLocale && (
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                  No languages found matching "{searchTerm}"
                </div>
              )}
            </div>

            {/* Footer Info */}
            <div className="p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 text-center">
              {filteredLocales.length} {t(currentLocale).common.languagesAvailable}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Helper function to get flag emoji from locale code
function getFlagEmoji(localeCode: string): string {
  const flagMap: Record<string, string> = {
    'af': '🇿🇦', 'sq': '🇦🇱', 'am': '🇪🇹', 'ar': '🇸🇦', 'hy': '🇦🇲',
    'az': '🇦🇿', 'eu': '🏴', 'be': '🇧🇾', 'bn': '🇧🇩', 'bs': '🇧🇦',
    'bg': '🇧🇬', 'ca': '🏴', 'ceb': '🇵🇭', 'zh': '🇨🇳', 'zh-TW': '🇹🇼',
    'co': '🇫🇷', 'hr': '🇭🇷', 'cs': '🇨🇿', 'da': '🇩🇰', 'nl': '🇳🇱',
    'en': '🇬🇧', 'eo': '🌍', 'et': '🇪🇪', 'fi': '🇫🇮', 'fr': '🇫🇷',
    'fy': '🇳🇱', 'gl': '🇪🇸', 'ka': '🇬🇪', 'de': '🇩🇪', 'el': '🇬🇷',
    'gu': '🇮🇳', 'ht': '🇭🇹', 'ha': '🇳🇬', 'haw': '🇺🇸', 'he': '🇮🇱',
    'hi': '🇮🇳', 'hmn': '🇱🇦', 'hu': '🇭🇺', 'is': '🇮🇸', 'ig': '🇳🇬',
    'id': '🇮🇩', 'ga': '🇮🇪', 'it': '🇮🇹', 'ja': '🇯🇵', 'jv': '🇮🇩',
    'kn': '🇮🇳', 'kk': '🇰🇿', 'km': '🇰🇭', 'rw': '🇷🇼', 'ko': '🇰🇷',
    'ku': '🇮🇶', 'ky': '🇰🇬', 'lo': '🇱🇦', 'la': '🇻🇦', 'lv': '🇱🇻',
    'lt': '🇱🇹', 'lb': '🇱🇺', 'mk': '🇲🇰', 'mg': '🇲🇬', 'ms': '🇲🇾',
    'ml': '🇮🇳', 'mt': '🇲🇹', 'mi': '🇳🇿', 'mr': '🇮🇳', 'mn': '🇲🇳',
    'my': '🇲🇲', 'ne': '🇳🇵', 'no': '🇳🇴', 'ny': '🇲🇼', 'or': '🇮🇳',
    'ps': '🇦🇫', 'fa': '🇮🇷', 'pl': '🇵🇱', 'pt': '🇵🇹', 'pa': '🇮🇳',
    'ro': '🇷🇴', 'ru': '🇷🇺', 'sm': '🇼🇸', 'gd': '🏴', 'sr': '🇷🇸',
    'st': '🇱🇸', 'sn': '🇿🇼', 'sd': '🇵🇰', 'si': '🇱🇰', 'sk': '🇸🇰',
    'sl': '🇸🇮', 'so': '🇸🇴', 'es': '🇪🇸', 'su': '🇮🇩', 'sw': '🇰🇪',
    'sv': '🇸🇪', 'tg': '🇹🇯', 'ta': '🇮🇳', 'tt': '🇷🇺', 'te': '🇮🇳',
    'th': '🇹🇭', 'tr': '🇹🇷', 'tk': '🇹🇲', 'uk': '🇺🇦', 'ur': '🇵🇰',
    'ug': '🇨🇳', 'uz': '🇺🇿', 'vi': '🇻🇳', 'cy': '🏴', 'xh': '🇿🇦',
    'yi': '🇮🇱', 'yo': '🇳🇬', 'zu': '🇿🇦',
  }

  return flagMap[localeCode] || '🌐'
}
