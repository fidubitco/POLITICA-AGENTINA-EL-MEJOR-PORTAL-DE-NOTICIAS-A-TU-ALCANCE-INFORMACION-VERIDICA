'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Newspaper,
  Users,
  TrendingUp,
  Eye,
  ThumbsUp,
  Share,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Settings,
  BarChart3,
  FileText,
  Image,
  Video,
  AudioLines as Audio,
  Link as LinkIcon
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  likes: number;
  shares: number;
  publishedAt: string;
  author: string;
  featured: boolean;
  breaking: boolean;
}

// Datos de ejemplo
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Milei anuncia nuevas medidas económicas en el Congreso',
    category: 'Política',
    status: 'published',
    views: 15420,
    likes: 892,
    shares: 234,
    publishedAt: '2025-01-31T10:30:00Z',
    author: 'Admin',
    featured: true,
    breaking: true
  },
  {
    id: '2',
    title: 'Cristina Kirchner presenta proyecto de ley sobre pensiones',
    category: 'Política',
    status: 'published',
    views: 12890,
    likes: 756,
    shares: 189,
    publishedAt: '2025-01-31T09:15:00Z',
    author: 'Admin',
    featured: false,
    breaking: false
  },
  {
    id: '3',
    title: 'Dólar blue rompe barrera de los $1500',
    category: 'Economía',
    status: 'draft',
    views: 0,
    likes: 0,
    shares: 0,
    publishedAt: '',
    author: 'Admin',
    featured: false,
    breaking: false
  }
];

const categories = ['Política', 'Economía', 'Judicial', 'Sociedad', 'Internacional', 'Opinión', 'Elecciones', 'Provincias'];

export function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: '',
    content: '',
    excerpt: '',
    tags: '',
    featured: false,
    breaking: false,
    mediaType: 'text' as 'text' | 'image' | 'video' | 'audio' | 'link',
    mediaUrl: ''
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    totalArticles: articles.length,
    publishedArticles: articles.filter(a => a.status === 'published').length,
    draftArticles: articles.filter(a => a.status === 'draft').length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
    totalLikes: articles.reduce((sum, a) => sum + a.likes, 0),
    totalShares: articles.reduce((sum, a) => sum + a.shares, 0),
    featuredArticles: articles.filter(a => a.featured).length,
    breakingNews: articles.filter(a => a.breaking).length
  };

  const handleCreateArticle = () => {
    const article: Article = {
      id: Date.now().toString(),
      title: newArticle.title,
      category: newArticle.category,
      status: 'draft',
      views: 0,
      likes: 0,
      shares: 0,
      publishedAt: '',
      author: 'Admin',
      featured: newArticle.featured,
      breaking: newArticle.breaking
    };

    setArticles([article, ...articles]);
    setNewArticle({
      title: '',
      category: '',
      content: '',
      excerpt: '',
      tags: '',
      featured: false,
      breaking: false,
      mediaType: 'text',
      mediaUrl: ''
    });
    setShowCreateForm(false);
  };

  const handlePublishArticle = (id: string) => {
    setArticles(articles.map(article =>
      article.id === id
        ? { ...article, status: 'published' as const, publishedAt: new Date().toISOString() }
        : article
    ));
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Audio className="h-4 w-4" />;
      case 'link': return <LinkIcon className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Newspaper className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-600">Política Argentina - Gestión de Contenido</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="articles">Artículos</TabsTrigger>
            <TabsTrigger value="create">Crear</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="export">Exportar</TabsTrigger>
            <TabsTrigger value="cache">Cache</TabsTrigger>
            <TabsTrigger value="media">Multimedia</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Artículos</CardTitle>
                  <Newspaper className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalArticles}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.publishedArticles} publicados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Vistas Totales</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% desde ayer
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interacciones</CardTitle>
                  <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.totalLikes + stats.totalShares).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Likes y shares
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Destacados</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.featuredArticles}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.breakingNews} breaking news
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Artículo publicado</p>
                      <p className="text-xs text-gray-600">"Milei anuncia nuevas medidas económicas"</p>
                    </div>
                    <span className="text-xs text-gray-500">Hace 2 horas</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nuevo artículo creado</p>
                      <p className="text-xs text-gray-600">"Actualización sobre elecciones provinciales"</p>
                    </div>
                    <span className="text-xs text-gray-500">Hace 4 horas</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Imagen optimizada</p>
                      <p className="text-xs text-gray-600">Sistema de IA generó imagen para artículo político</p>
                    </div>
                    <span className="text-xs text-gray-500">Hace 6 horas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Artículos</CardTitle>
                <CardDescription>Administra todos los artículos del portal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar artículos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="draft">Borrador</SelectItem>
                      <SelectItem value="archived">Archivado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => setShowCreateForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Artículo
                  </Button>
                </div>

                {/* Articles List */}
                <div className="space-y-4">
                  {filteredArticles.map((article) => (
                    <Card key={article.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-lg">{article.title}</h3>
                              {article.featured && <Badge variant="secondary">Destacado</Badge>}
                              {article.breaking && <Badge variant="destructive">Breaking</Badge>}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <span>{article.category}</span>
                              <span>•</span>
                              <span>Por {article.author}</span>
                              <span>•</span>
                              <Badge className={getStatusColor(article.status)}>
                                {article.status === 'published' ? 'Publicado' :
                                 article.status === 'draft' ? 'Borrador' : 'Archivado'}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>{article.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{article.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Share className="h-4 w-4" />
                                <span>{article.shares}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {article.status === 'draft' && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handlePublishArticle(article.id)}
                              >
                                Publicar
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteArticle(article.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Article Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Crear Nuevo Artículo</CardTitle>
                <CardDescription>Usa el editor profesional WYSIWYG para crear noticias de calidad</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <div className="mb-6">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2">Editor Profesional de Noticias</h3>
                  <p className="text-gray-600 mb-6">
                    Crea artículos con nuestro editor WYSIWYG avanzado que incluye:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 mb-6 text-left max-w-md mx-auto">
                    <li>✅ Editor Quill.js profesional</li>
                    <li>✅ Formato de texto avanzado</li>
                    <li>✅ Inserción de imágenes y videos</li>
                    <li>✅ Generación con IA integrada</li>
                    <li>✅ Vista previa en tiempo real</li>
                    <li>✅ Programación de publicación</li>
                  </ul>
                </div>
                <Link href="/admin/create-news">
                  <Button size="lg" className="px-8 py-3 text-lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Abrir Editor de Noticias
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Avanzados</CardTitle>
                <CardDescription>
                  Visualiza métricas detalladas con gráficos interactivos
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="mb-6">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-2">Dashboard de Analytics</h3>
                  <p className="text-gray-600 mb-6">
                    Accede a métricas avanzadas con gráficos interactivos de Recharts:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 mb-6 text-left max-w-md mx-auto">
                    <li>✅ Gráficos de líneas para tendencias de tráfico</li>
                    <li>✅ Gráficos de barras para contenido por categoría</li>
                    <li>✅ Gráficos circulares para demografía de usuarios</li>
                    <li>✅ Gráficos de área para engagement semanal</li>
                    <li>✅ Métricas en tiempo real</li>
                    <li>✅ Filtros por período de tiempo</li>
                  </ul>
                </div>
                <Link href="/admin/analytics">
                  <Button size="lg" className="px-8 py-3 text-lg">
                    📈 Ver Analytics Completos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exportar Datos del Sistema</CardTitle>
                <CardDescription>
                  Descarga reportes completos en PDF o Excel
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="mb-6">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-2">Sistema de Export de Datos</h3>
                  <p className="text-gray-600 mb-6">
                    Exporta datos del sistema en múltiples formatos:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 mb-6 text-left max-w-md mx-auto">
                    <li>✅ Reportes PDF con gráficos profesionales</li>
                    <li>✅ Archivos Excel para análisis de datos</li>
                    <li>✅ Artículos, analytics y usuarios</li>
                    <li>✅ Descarga automática e inmediata</li>
                    <li>✅ Datos en tiempo real de la base de datos</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl mb-2">📄</div>
                    <h4 className="font-semibold">Artículos (PDF)</h4>
                    <p className="text-sm text-gray-600 mb-3">Lista completa con estadísticas</p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Exportar PDF
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="font-semibold">Analytics (Excel)</h4>
                    <p className="text-sm text-gray-600 mb-3">Métricas y tendencias</p>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Exportar Excel
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl mb-2">👥</div>
                    <h4 className="font-semibold">Usuarios (Excel)</h4>
                    <p className="text-sm text-gray-600 mb-3">Lista completa de usuarios</p>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Exportar Excel
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  <p>💡 Tip: Los reportes se generan automáticamente desde la base de datos en tiempo real</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cache Tab */}
          <TabsContent value="cache" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Cache Redis</CardTitle>
                <CardDescription>
                  Monitorea y administra el sistema de cache para optimizar el rendimiento
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="mb-6">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-xl font-semibold mb-2">Sistema de Cache Avanzado</h3>
                  <p className="text-gray-600 mb-6">
                    Redis proporciona cache de alta velocidad para:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 mb-6 text-left max-w-md mx-auto">
                    <li>✅ Artículos populares (1 hora)</li>
                    <li>✅ Listas de categorías (30 min)</li>
                    <li>✅ Estadísticas del dashboard (5 min)</li>
                    <li>✅ Resultados de búsqueda (10 min)</li>
                    <li>✅ Datos de analytics (15 min)</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="font-semibold">Estado Redis</h4>
                    <p className="text-sm text-gray-600 mb-3">Verificar conexión</p>
                    <Button variant="outline" size="sm">
                      Ver Estado
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl mb-2">🧹</div>
                    <h4 className="font-semibold">Limpiar Cache</h4>
                    <p className="text-sm text-gray-600 mb-3">Eliminar datos cacheados</p>
                    <Button variant="outline" size="sm">
                      Limpiar Todo
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl mb-2">📈</div>
                    <h4 className="font-semibold">Estadísticas</h4>
                    <p className="text-sm text-gray-600 mb-3">Métricas de uso</p>
                    <Button variant="outline" size="sm">
                      Ver Stats
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl mb-2">🔄</div>
                    <h4 className="font-semibold">Recargar</h4>
                    <p className="text-sm text-gray-600 mb-3">Warm-up del cache</p>
                    <Button variant="outline" size="sm">
                      Precargar
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>💡 El cache mejora significativamente el rendimiento de la aplicación</p>
                  <p>⚡ Los datos se sirven hasta 100x más rápido desde Redis</p>
                  <p>🔧 Configurado para invalidar automáticamente cuando se actualizan datos</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión Multimedia</CardTitle>
                <CardDescription>Administra imágenes, videos y archivos multimedia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="p-6 text-center border-dashed">
                    <div className="flex flex-col items-center space-y-4">
                      <Image className="h-12 w-12 text-gray-400" />
                      <div>
                        <p className="font-medium">Subir Imagen</p>
                        <p className="text-sm text-gray-600">PNG, JPG hasta 5MB</p>
                      </div>
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Seleccionar Archivo
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 text-center border-dashed">
                    <div className="flex flex-col items-center space-y-4">
                      <Video className="h-12 w-12 text-gray-400" />
                      <div>
                        <p className="font-medium">Subir Video</p>
                        <p className="text-sm text-gray-600">MP4, AVI hasta 50MB</p>
                      </div>
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Seleccionar Archivo
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 text-center border-dashed">
                    <div className="flex flex-col items-center space-y-4">
                      <Audio className="h-12 w-12 text-gray-400" />
                      <div>
                        <p className="font-medium">Subir Audio</p>
                        <p className="text-sm text-gray-600">MP3, WAV hasta 20MB</p>
                      </div>
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Seleccionar Archivo
                      </Button>
                    </div>
                  </Card>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Archivos Recientes</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'imagen-milei-congreso.jpg', type: 'image', size: '2.4 MB', date: '2025-01-31' },
                      { name: 'video-entrevista-cfk.mp4', type: 'video', size: '45.2 MB', date: '2025-01-30' },
                      { name: 'audio-prensa-macri.mp3', type: 'audio', size: '12.8 MB', date: '2025-01-29' }
                    ].map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getMediaIcon(file.type)}
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-gray-600">{file.size} • {file.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Ver</Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
