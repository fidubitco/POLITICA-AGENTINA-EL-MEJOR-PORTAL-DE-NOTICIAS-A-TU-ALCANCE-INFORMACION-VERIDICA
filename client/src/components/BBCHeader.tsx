import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Globe, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../lib/i18n';
import { ThemeToggle } from './ThemeToggle';

export const BBCHeader = () => {
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Categorías con iconos y colores ultra profesionales optimizados
  const allCategories = [
    { id: 'politica', label: t('nav.politics', 'Política'), href: '/categoria/politica', icon: '🏛️', color: '#2563EB', bgGradient: 'from-blue-600 to-blue-800', shadow: 'shadow-blue-500/50' },
    { id: 'economia', label: t('nav.economy', 'Economía'), href: '/categoria/economia', icon: '💰', color: '#059669', bgGradient: 'from-green-600 to-green-800', shadow: 'shadow-green-500/50' },
    { id: 'internacional', label: t('nav.international', 'Internacional'), href: '/categoria/internacional', icon: '🌎', color: '#DC2626', bgGradient: 'from-red-600 to-red-800', shadow: 'shadow-red-500/50' },
    { id: 'sociedad', label: t('nav.society', 'Sociedad'), href: '/categoria/sociedad', icon: '👥', color: '#EA580C', bgGradient: 'from-orange-600 to-orange-800', shadow: 'shadow-orange-500/50' },
    { id: 'deportes', label: t('nav.sports', 'Deportes'), href: '/categoria/deportes', icon: '⚽', color: '#7C3AED', bgGradient: 'from-purple-600 to-purple-800', shadow: 'shadow-purple-500/50' },
    { id: 'cultura', label: t('nav.culture', 'Cultura'), href: '/categoria/cultura', icon: '🎭', color: '#DB2777', bgGradient: 'from-pink-600 to-pink-800', shadow: 'shadow-pink-500/50' },
    { id: 'tecnologia', label: t('nav.technology', 'Tecnología'), href: '/categoria/tecnologia', icon: '💻', color: '#0891B2', bgGradient: 'from-cyan-600 to-cyan-800', shadow: 'shadow-cyan-500/50' },
    { id: 'negocios', label: t('nav.business', 'Negocios'), href: '/categoria/negocios', icon: '🏢', color: '#0D9488', bgGradient: 'from-teal-600 to-teal-800', shadow: 'shadow-teal-500/50' },
    { id: 'espectaculos', label: t('nav.entertainment', 'Espectáculos'), href: '/categoria/espectaculos', icon: '🎬', color: '#EA580C', bgGradient: 'from-orange-600 to-orange-800', shadow: 'shadow-orange-500/50' },
    { id: 'salud', label: t('nav.health', 'Salud'), href: '/categoria/salud', icon: '🏥', color: '#65A30D', bgGradient: 'from-lime-600 to-lime-800', shadow: 'shadow-lime-500/50' },
    { id: 'lifestyle', label: t('nav.lifestyle', 'Lifestyle'), href: '/categoria/lifestyle', icon: '🏠', color: '#9333EA', bgGradient: 'from-violet-600 to-violet-800', shadow: 'shadow-violet-500/50' },
    { id: 'ciencia', label: t('nav.science', 'Ciencia'), href: '/categoria/ciencia', icon: '🔬', color: '#4F46E5', bgGradient: 'from-indigo-600 to-indigo-800', shadow: 'shadow-indigo-500/50' },
    { id: 'judicial', label: t('nav.judicial', 'Judicial'), href: '/categoria/judicial', icon: '⚖️', color: '#92400E', bgGradient: 'from-amber-800 to-amber-950', shadow: 'shadow-amber-700/50' },
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
    <header className="sticky top-0 z-50 shadow-xl">
      {/* Top Bar - Gradient Background */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-4">
              <span className="text-white text-xs md:text-sm font-semibold">
                {new Date().toLocaleDateString('es-AR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center gap-2 text-white text-xs md:text-sm hover:text-blue-400 transition-colors">
                  <Globe size={16} />
                  <span className="hidden md:inline">
                    {supportedLanguages.find(l => l.code === i18n.language)?.nativeName || 'Español'}
                  </span>
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white shadow-2xl rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[200px] max-h-[400px] overflow-y-auto">
                  {supportedLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all flex items-center gap-3 ${
                        i18n.language === lang.code ? 'bg-gradient-to-r from-blue-50 to-blue-100 font-bold text-blue-700 border-l-4 border-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - White Background */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <span className="text-4xl md:text-5xl">🇦🇷</span>
                <div className="flex flex-col leading-tight">
                  <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Política Argentina
                  </span>
                  <span className="text-xs md:text-sm text-gray-600 font-semibold">
                    {t('site.tagline', 'Información Veraz y Actualizada')}
                  </span>
                </div>
              </a>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainCategories.map((category) => (
                <Link key={category.id} href={category.href}>
                  <a 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-white transition-all hover:shadow-lg"
                    style={{ 
                      ['--hover-bg' as any]: category.color 
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${category.color}, ${category.color}dd)`;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm">{category.label}</span>
                  </a>
                </Link>
              ))}
              
              {/* Dropdown "Más" */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 transition-all">
                  <span className="text-lg">➕</span>
                  <span className="text-sm">{t('nav.more', 'Más')}</span>
                </button>
                <div className="absolute left-0 top-full mt-2 bg-white shadow-2xl rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[320px] border border-gray-200">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {moreCategories.map((category) => (
                      <Link key={category.id} href={category.href}>
                        <a 
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:shadow-lg transition-all text-gray-800 font-semibold"
                          style={{ borderLeft: `4px solid ${category.color}` }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `linear-gradient(135deg, ${category.color}15, ${category.color}25)`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <span className="text-2xl">{category.icon}</span>
                          <span className="text-sm">{category.label}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <Link href="/admin/dashboard">
                <a className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl ml-2">
                  <span className="text-lg">📊</span>
                  <span className="text-sm">Admin</span>
                </a>
              </Link>
              
              <button className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all ml-2">
                <Search size={20} />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              {allCategories.map((category) => (
                <Link key={category.id} href={category.href}>
                  <a 
                    className="flex items-center gap-3 py-3 px-4 rounded-lg font-semibold text-gray-800 hover:shadow-lg transition-all"
                    style={{ borderLeft: `5px solid ${category.color}` }}
                    onClick={() => setMobileMenuOpen(false)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${category.color}15, ${category.color}25)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span>{category.label}</span>
                  </a>
                </Link>
              ))}
              
              <Link href="/admin/dashboard">
                <a 
                  className="flex items-center gap-3 py-3 px-4 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-2xl">📊</span>
                  <span>Admin</span>
                </a>
              </Link>
              
              <button className="flex items-center gap-3 py-3 px-4 rounded-lg font-semibold text-gray-800 hover:bg-gray-100 transition-all mt-2">
                <Search size={24} />
                <span>{t('nav.search', 'Buscar')}</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
