'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SUPPORTED_LOCALES, LOCALE_NAMES } from '@/config/locales'

interface LanguageSwitcherProps {
  currentLocale: string
  className?: string
}

export function LanguageSwitcher({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close with Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  function switchLocale(newLocale: string) {
    // Replace current locale in path
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/') || `/${newLocale}`

    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`

    // Navigate to new locale
    router.push(newPath)
    setIsOpen(false)
    setSearchQuery('')
  }

  // Group by tier with search filter
  const filteredLocales = SUPPORTED_LOCALES.filter(locale =>
    searchQuery
      ? locale.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        locale.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        locale.code.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  )

  const tier1 = filteredLocales.filter(l => l.tier === 1)
  const tier2 = filteredLocales.filter(l => l.tier === 2)
  const tier3 = filteredLocales.filter(l => l.tier === 3)

  const currentLocaleName = LOCALE_NAMES[currentLocale] || currentLocale

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="font-medium text-sm">{currentLocaleName}</span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 max-h-[32rem] bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search box */}
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar idioma..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div className="overflow-y-auto flex-1">
            {/* Current language indicator */}
            {!searchQuery && (
              <div className="px-3 py-2 bg-blue-50 border-b border-blue-100">
                <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                  Idioma actual
                </div>
                <div className="text-sm text-blue-900 mt-1">
                  {currentLocaleName}
                </div>
              </div>
            )}

            {/* Tier 1: Major Languages */}
            {tier1.length > 0 && (
              <div className="p-2">
                {!searchQuery && (
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Idiomas principales ({tier1.length})
                  </div>
                )}
                {tier1.map(locale => (
                  <button
                    key={locale.code}
                    onClick={() => switchLocale(locale.code)}
                    className={`w-full text-left px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors ${
                      locale.code === currentLocale
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{locale.nativeName}</span>
                      {locale.code === currentLocale && (
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{locale.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Tier 2: Regional Languages */}
            {tier2.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                {!searchQuery && (
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Idiomas regionales ({tier2.length})
                  </div>
                )}
                {tier2.map(locale => (
                  <button
                    key={locale.code}
                    onClick={() => switchLocale(locale.code)}
                    className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                      locale.code === currentLocale
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    <span className="text-sm">{locale.nativeName}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Tier 3: Emerging Markets */}
            {tier3.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                {!searchQuery && (
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Más idiomas ({tier3.length})
                  </div>
                )}
                {tier3.map(locale => (
                  <button
                    key={locale.code}
                    onClick={() => switchLocale(locale.code)}
                    className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                      locale.code === currentLocale
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    <span className="text-sm">{locale.nativeName}</span>
                  </button>
                ))}
              </div>
            )}

            {/* No results */}
            {searchQuery && filteredLocales.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm">No se encontraron idiomas</p>
                <p className="text-xs mt-1">Intenta con otro término de búsqueda</p>
              </div>
            )}
          </div>

          {/* Footer with total languages count */}
          <div className="px-3 py-2 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-center text-gray-600">
              🌍 {SUPPORTED_LOCALES.length} idiomas disponibles
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
