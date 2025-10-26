import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Globe, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../lib/i18n';

export const BBCHeader = () => {
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Importar categorías desde el archivo centralizado
  const allCategories = [
    { id: 'politica', label: t('nav.politics', 'Política'), href: '/categoria/politica', icon: '🏛️', color: '#3B82F6' },
    { id: 'economia', label: t('nav.economy', 'Economía'), href: '/categoria/economia', icon: '💰', color: '#10B981' },
    { id: 'internacional', label: t('nav.international', 'Internacional'), href: '/categoria/internacional', icon: '🌎', color: '#EF4444' },
    { id: 'sociedad', label: t('nav.society', 'Sociedad'), href: '/categoria/sociedad', icon: '👥', color: '#F59E0B' },
    { id: 'deportes', label: t('nav.sports', 'Deportes'), href: '/categoria/deportes', icon: '⚽', color: '#8B5CF6' },
    { id: 'cultura', label: t('nav.culture', 'Cultura'), href: '/categoria/cultura', icon: '🎭', color: '#EC4899' },
    { id: 'tecnologia', label: t('nav.technology', 'Tecnología'), href: '/categoria/tecnologia', icon: '💻', color: '#06B6D4' },
    { id: 'negocios', label: t('nav.business', 'Negocios'), href: '/categoria/negocios', icon: '🏢', color: '#14B8A6' },
    { id: 'espectaculos', label: t('nav.entertainment', 'Espectáculos'), href: '/categoria/espectaculos', icon: '🎬', color: '#F97316' },
    { id: 'salud', label: t('nav.health', 'Salud'), href: '/categoria/salud', icon: '🏥', color: '#84CC16' },
    { id: 'lifestyle', label: t('nav.lifestyle', 'Lifestyle'), href: '/categoria/lifestyle', icon: '🏠', color: '#A855F7' },
    { id: 'ciencia', label: t('nav.science', 'Ciencia'), href: '/categoria/ciencia', icon: '🔬', color: '#6366F1' },
  ];
  
  const mainCategories = allCategories.slice(0, 6);
  const moreCategories = allCategories.slice(6);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    
    // Cambiar URL según el idioma
    const currentPath = location;
    let newPath = currentPath;
    
    // Remover prefijo de idioma actual si existe
    supportedLanguages.forEach(lang => {
      if (currentPath.startsWith(`/${lang.code}/`)) {
        newPath = currentPath.replace(`/${lang.code}`, '');
      }
    });
    
    // Agregar nuevo prefijo de idioma (excepto español)
    if (lng !== 'es') {
      newPath = `/${lng}${newPath}`;
    }
    
    setLocation(newPath || '/');
  };

  return (
    <header className="bbc-header">
      {/* Top Bar */}
      <div className="bbc-header-top">
        <div className="container-bbc">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-white text-sm font-semibold">
                {new Date().toLocaleDateString('es-AR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-4">
                    {/* Language Selector - TOP 11 LANGUAGES */}
                    <div className="relative group">
                      <button className="flex items-center gap-2 text-white text-sm hover:opacity-80 transition">
                        <Globe size={16} />
                        <span className="hidden md:inline">
                          {supportedLanguages.find(l => l.code === i18n.language)?.nativeName || 'Español'}
                        </span>
                      </button>
                      <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[180px] max-h-[400px] overflow-y-auto">
                        {supportedLanguages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition flex items-center gap-2 ${
                              i18n.language === lang.code ? 'bg-blue-50 font-semibold text-blue-600' : ''
                            }`}
                          >
                            <span className="text-xl">{lang.flag}</span>
                            <span>{lang.nativeName}</span>
                          </button>
                        ))}
                      </div>
                    </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bbc-header-main">
        <div className="container-bbc">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <a className="bbc-logo">
                <span className="text-3xl">🇦🇷</span>
                <div className="flex flex-col leading-tight">
                  <span className="text-2xl md:text-3xl">Política Argentina</span>
                  <span className="text-xs font-normal opacity-80">Información Veraz y Actualizada</span>
                </div>
              </a>
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex bbc-nav items-center">
            {mainCategories.map((category) => (
              <Link key={category.id} href={category.href}>
                <a className="bbc-nav-link flex items-center gap-1">
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </a>
              </Link>
            ))}
            
            {/* Dropdown "Más" */}
            <div className="relative group">
              <button className="bbc-nav-link flex items-center gap-1">
                <span>➕</span>
                <span>Más</span>
              </button>
              <div className="absolute left-0 top-full mt-2 bg-white shadow-2xl rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[280px]">
                <div className="grid grid-cols-2 gap-2 p-4">
                  {moreCategories.map((category) => (
                    <Link key={category.id} href={category.href}>
                      <a 
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-800"
                        style={{ borderLeft: `3px solid ${category.color}` }}
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span className="text-sm font-semibold">{category.label}</span>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link href="/admin/dashboard">
              <a className="bbc-nav-link bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ml-2">
                📊 Admin
              </a>
            </Link>
            <button className="text-white hover:opacity-80 transition ml-2">
              <Search size={20} />
            </button>
          </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1a1a1a] border-t border-white/10">
          <div className="container-bbc py-4">
            <nav className="flex flex-col gap-2">
              {categories.map((category) => (
                <Link key={category.id} href={category.href}>
                  <a 
                    className="text-white py-3 px-4 hover:bg-white/10 rounded transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.label}
                  </a>
                </Link>
              ))}
              <button className="text-white py-3 px-4 hover:bg-white/10 rounded transition text-left flex items-center gap-2">
                <Search size={18} />
                <span>Buscar</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
