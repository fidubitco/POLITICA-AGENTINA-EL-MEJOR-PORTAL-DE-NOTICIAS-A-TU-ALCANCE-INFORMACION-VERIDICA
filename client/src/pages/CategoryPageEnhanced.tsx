import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { BBCHeader } from '../components/BBCHeader';
import { BBCNewsCard } from '../components/BBCNewsCard';
import { MegaSEO } from '../components/MegaSEO';
import { PremiumCard, PremiumBadge, PremiumButton } from '../components/ui/premium';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Filter,
  Calendar,
  Eye,
  Share2,
  Bookmark,
  ChevronRight,
  Grid,
  List,
} from 'lucide-react';
import { CATEGORIES, getCategoryBySlug, getSubcategories, getRelatedCategories } from '../data/categories';
import { newsData } from '../data/newsData';

type ViewMode = 'grid' | 'list';
type SortBy = 'recent' | 'popular' | 'trending';

export const CategoryPageEnhanced = () => {
  const [, params] = useRoute('/categoria/:category');
  const categorySlug = params?.category || '';
  
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('recent');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [articles, setArticles] = useState(newsData);

  const category = getCategoryBySlug(categorySlug);
  const subcategories = getSubcategories(categorySlug);
  const relatedCategories = getRelatedCategories(categorySlug);

  useEffect(() => {
    // Filtrar artículos por categoría
    let filtered = newsData.filter(article => 
      article.category.toLowerCase() === categorySlug.toLowerCase()
    );

    // Filtrar por subcategoría si está seleccionada
    if (selectedSubcategory !== 'all') {
      // Aquí podrías filtrar por subcategoría si tuvieras ese campo en los artículos
      filtered = filtered;
    }

    // Ordenar
    if (sortBy === 'popular') {
      filtered = [...filtered].sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === 'trending') {
      filtered = [...filtered].sort((a, b) => (b.shares || 0) - (a.shares || 0));
    }

    setArticles(filtered);
  }, [categorySlug, selectedSubcategory, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BBCHeader />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Categoría no encontrada</h1>
          <p className="text-gray-600">La categoría que buscas no existe.</p>
        </div>
      </div>
    );
  }

  const totalArticles = subcategories.reduce((sum, sub) => sum + sub.articleCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaSEO
        title={`${category.name} - Política Argentina`}
        description={category.description}
      />

      <BBCHeader />

      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${category.gradient} text-white py-16`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp size={32} />
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-2">{category.name}</h1>
                <p className="text-xl text-white/90">{category.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-6">
              <PremiumBadge className="bg-white/20 text-white border-white/30">
                {totalArticles.toLocaleString()} artículos
              </PremiumBadge>
              <PremiumBadge className="bg-white/20 text-white border-white/30">
                {subcategories.length} subcategorías
              </PremiumBadge>
              <PremiumBadge className="bg-white/20 text-white border-white/30">
                Actualizado hoy
              </PremiumBadge>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Subcategorías */}
            <PremiumCard>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Subcategorías</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    selectedSubcategory === 'all'
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Todas</span>
                    <span className="text-sm">{totalArticles}</span>
                  </div>
                </button>
                {subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub.slug)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      selectedSubcategory === sub.slug
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{sub.name}</div>
                        <div className="text-xs text-gray-500">{sub.description}</div>
                      </div>
                      <span className="text-sm">{sub.articleCount}</span>
                    </div>
                  </button>
                ))}
              </div>
            </PremiumCard>

            {/* Temas Destacados */}
            <PremiumCard>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Temas Destacados</h3>
              <div className="flex flex-wrap gap-2">
                {category.featuredTopics.map((topic, index) => (
                  <PremiumBadge key={index} variant="info">
                    {topic}
                  </PremiumBadge>
                ))}
              </div>
            </PremiumCard>

            {/* Categorías Relacionadas */}
            {relatedCategories.length > 0 && (
              <PremiumCard>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categorías Relacionadas</h3>
                <div className="space-y-2">
                  {relatedCategories.map((relCat) => (
                    <a
                      key={relCat.id}
                      href={`/categoria/${relCat.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                          {relCat.name}
                        </div>
                        <div className="text-xs text-gray-500">{relCat.description.substring(0, 50)}...</div>
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-blue-600" size={20} />
                    </a>
                  ))}
                </div>
              </PremiumCard>
            )}

            {/* Keywords */}
            <PremiumCard>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Palabras Clave</h3>
              <div className="flex flex-wrap gap-2">
                {category.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </PremiumCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <Filter size={20} className="text-gray-600" />
                <span className="font-semibold text-gray-900">Ordenar por:</span>
                <div className="flex gap-2">
                  {[
                    { value: 'recent', label: 'Recientes', icon: Calendar },
                    { value: 'popular', label: 'Populares', icon: Eye },
                    { value: 'trending', label: 'Tendencia', icon: TrendingUp },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setSortBy(value as SortBy)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                        sortBy === value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Vista:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Articles */}
            {articles.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'space-y-6'
                }
              >
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BBCNewsCard
                      article={article}
                      type={viewMode === 'list' ? 'horizontal' : 'default'}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <PremiumCard className="text-center py-20">
                <div className="text-gray-400 mb-4">
                  <Bookmark size={64} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No hay artículos disponibles
                </h3>
                <p className="text-gray-600 mb-6">
                  Aún no hay contenido en esta categoría. Vuelve pronto.
                </p>
                <PremiumButton onClick={() => window.location.href = '/'}>
                  Volver al inicio
                </PremiumButton>
              </PremiumCard>
            )}

            {/* Load More */}
            {articles.length > 0 && (
              <div className="text-center pt-8">
                <PremiumButton
                  onClick={() => {}}
                  variant="secondary"
                  className="px-8 py-3"
                >
                  Cargar más artículos
                </PremiumButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

