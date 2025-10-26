import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, Globe, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BBCHeader = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'politica', label: 'Política', href: '/categoria/politica' },
    { id: 'economia', label: 'Economía', href: '/categoria/economia' },
    { id: 'sociedad', label: 'Sociedad', href: '/categoria/sociedad' },
    { id: 'internacional', label: 'Internacional', href: '/categoria/internacional' },
    { id: 'deportes', label: 'Deportes', href: '/categoria/deportes' },
    { id: 'cultura', label: 'Cultura', href: '/categoria/cultura' },
  ];

  const languages = [
    { code: 'es', name: 'Español', flag: '🇦🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
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
              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center gap-2 text-white text-sm hover:opacity-80 transition">
                  <Globe size={16} />
                  <span className="hidden md:inline">
                    {languages.find(l => l.code === i18n.language)?.name || 'Español'}
                  </span>
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[150px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition flex items-center gap-2 ${
                        i18n.language === lang.code ? 'bg-gray-50 font-semibold' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
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
            <nav className="hidden lg:flex bbc-nav">
              {categories.map((category) => (
                <Link key={category.id} href={category.href}>
                  <a className="bbc-nav-link">{category.label}</a>
                </Link>
              ))}
              <Link href="/admin/dashboard">
                <a className="bbc-nav-link bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  📊 Admin
                </a>
              </Link>
              <button className="text-white hover:opacity-80 transition">
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
