// ===========================================
// SELECTOR DE IDIOMA RESPONSIVE
// Componente para cambiar idioma del sitio
// ===========================================

import React, { useState, useCallback } from 'react';
import { useTranslation } from '../lib/i18n';
import { LANGUAGES, SupportedLanguage } from '../lib/i18n';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from './ui/dropdown-menu';
import { 
  Globe, 
  Check, 
  ChevronDown,
  Languages,
  Flag
} from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'default' | 'compact' | 'minimal';
  showLabel?: boolean;
  showFlag?: boolean;
  showNativeName?: boolean;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'default',
  showLabel = true,
  showFlag = true,
  showNativeName = true,
  className = ''
}) => {
  const { t, changeLanguage, currentLanguage, languageConfig } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = useCallback(async (language: SupportedLanguage) => {
    try {
      await changeLanguage(language);
      setIsOpen(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, [changeLanguage]);

  const getLanguageDisplayName = (lang: SupportedLanguage) => {
    const config = LANGUAGES[lang];
    if (showNativeName) {
      return config.nativeName;
    }
    return config.name;
  };

  const getLanguageDisplayFlag = (lang: SupportedLanguage) => {
    const config = LANGUAGES[lang];
    return config.flag;
  };

  const currentLanguageConfig = LANGUAGES[currentLanguage];

  if (variant === 'minimal') {
    return (
      <div className={`language-selector-minimal ${className}`}>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
              aria-label={t('common.select_language')}
            >
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {Object.entries(LANGUAGES).map(([code, config]) => (
              <DropdownMenuItem
                key={code}
                onClick={() => handleLanguageChange(code as SupportedLanguage)}
                className="flex items-center gap-2 cursor-pointer"
              >
                {showFlag && (
                  <span className="text-lg">{config.flag}</span>
                )}
                <span className="flex-1">{getLanguageDisplayName(code as SupportedLanguage)}</span>
                {currentLanguage === code && (
                  <Check className="h-4 w-4 text-primary-600" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`language-selector-compact ${className}`}>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 gap-2"
            >
              {showFlag && (
                <span className="text-sm">{currentLanguageConfig.flag}</span>
              )}
              <span className="text-sm font-medium">
                {getLanguageDisplayName(currentLanguage)}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {Object.entries(LANGUAGES).map(([code, config]) => (
              <DropdownMenuItem
                key={code}
                onClick={() => handleLanguageChange(code as SupportedLanguage)}
                className="flex items-center gap-2 cursor-pointer"
              >
                {showFlag && (
                  <span className="text-lg">{config.flag}</span>
                )}
                <span className="flex-1">{getLanguageDisplayName(code as SupportedLanguage)}</span>
                {currentLanguage === code && (
                  <Check className="h-4 w-4 text-primary-600" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className={`language-selector-default ${className}`}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-10 px-4 gap-3 min-w-[140px] justify-between"
          >
            <div className="flex items-center gap-2">
              {showFlag && (
                <span className="text-lg">{currentLanguageConfig.flag}</span>
              )}
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  {getLanguageDisplayName(currentLanguage)}
                </span>
                {showLabel && (
                  <span className="text-xs text-gray-500">
                    {t('common.language')}
                  </span>
                )}
              </div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <Languages className="h-4 w-4" />
              {t('common.select_language')}
            </div>
          </div>
          <DropdownMenuSeparator />
          {Object.entries(LANGUAGES).map(([code, config]) => (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLanguageChange(code as SupportedLanguage)}
              className="flex items-center gap-3 cursor-pointer py-3"
            >
              {showFlag && (
                <span className="text-xl">{config.flag}</span>
              )}
              <div className="flex flex-col items-start flex-1">
                <span className="text-sm font-medium">
                  {getLanguageDisplayName(code as SupportedLanguage)}
                </span>
                <span className="text-xs text-gray-500">
                  {config.name}
                </span>
              </div>
              {currentLanguage === code && (
                <Check className="h-4 w-4 text-primary-600" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
