// ===========================================
// PÁGINA DE CONTROL DE NOTICIAS COMPLETA
// Sistema profesional de gestión de noticias
// ===========================================

import React, { useState, useEffect } from 'react';
import { trpc } from '../../utils/trpc';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Send, 
  Clock, 
  TrendingUp, 
  Star, 
  Share2, 
  Settings, 
  Bot, 
  Zap, 
  Sparkles, 
  BarChart, 
  Users, 
  Newspaper, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Pause, 
  Activity,
  Target,
  Brain,
  Wand2,
  FileText,
  Image,
  Video,
  Link,
  Tag,
  Calendar,
  Globe,
  Shield,
  Lock,
  Unlock,
  Archive
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  category: string;
  tags: string[];
  isBreaking: boolean;
  isTrending: boolean;
  isPublished: boolean;
  publishedAt?: string;
  scheduledAt?: string;
  views: number;
  likes: number;
  shares: number;
  aiGenerated: boolean;
  aiScore: number;
  readabilityScore: number;
  sentimentScore: number;
  seoOptimized: boolean;
  createdAt: string;
  updatedAt: string;
}

const NewsControl: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Queries
  const { data: articlesData, refetch: refetchArticles } = trpc.news.getNews.useQuery({
    limit: 100,
    offset: (currentPage - 1) * itemsPerPage
  });

  const { data: categories } = trpc.news.getCategories.useQuery();
  const { data: sources } = trpc.news.getSources.useQuery();
  const { data: automationReport } = trpc.ai.getAutomationReport?.useQuery();
  const { data: aiReport } = trpc.ai.getAIReport?.useQuery();

  // Mutations
  const createArticle = trpc.articles.create.useMutation();
  const updateArticle = trpc.articles.update.useMutation();
  const deleteArticle = trpc.articles.delete?.useMutation();
  const publishArticle = trpc.articles.publish?.useMutation();
  const scheduleArticle = trpc.articles.schedule?.useMutation();
  const runAutomation = trpc.ai.runNewsAutomation.useMutation();
  const executeScheduled = trpc.ai.executeScheduledPublications.useMutation();

  useEffect(() => {
    if (articlesData) {
      setArticles(articlesData.articles as NewsArticle[]);
    }
  }, [articlesData]);

  // Handlers
  const handleCreateArticle = () => {
    setSelectedArticle({
      id: '',
      title: '',
      content: '',
      excerpt: '',
      imageUrl: '',
      author: '',
      category: '',
      tags: [],
      isBreaking: false,
      isTrending: false,
      isPublished: false,
      views: 0,
      likes: 0,
      shares: 0,
      aiGenerated: false,
      aiScore: 0,
      readabilityScore: 0,
      sentimentScore: 0,
      seoOptimized: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setIsEditing(true);
  };

  const handleEditArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsEditing(true);
  };

  const handleSaveArticle = async () => {
    if (!selectedArticle) return;

    try {
      if (selectedArticle.id) {
        await updateArticle.mutateAsync({ id: selectedArticle.id, data: selectedArticle });
      } else {
        await createArticle.mutateAsync(selectedArticle);
      }
      setIsEditing(false);
      setSelectedArticle(null);
      refetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
      try {
        await deleteArticle.mutateAsync({ id: articleId });
        refetchArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const handlePublishArticle = async (articleId: string) => {
    try {
      await publishArticle.mutateAsync({ id: articleId });
      refetchArticles();
    } catch (error) {
      console.error('Error publishing article:', error);
    }
  };

  const handleScheduleArticle = async (articleId: string, scheduledAt: string) => {
    try {
      await scheduleArticle.mutateAsync({ id: articleId, scheduledAt });
      refetchArticles();
    } catch (error) {
      console.error('Error scheduling article:', error);
    }
  };

  const handleRunAutomation = async () => {
    try {
      await runAutomation.mutateAsync();
      refetchArticles();
    } catch (error) {
      console.error('Error running automation:', error);
    }
  };

  const handleExecuteScheduled = async () => {
    try {
      await executeScheduled.mutateAsync();
      refetchArticles();
    } catch (error) {
      console.error('Error executing scheduled publications:', error);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || article.category === filterCategory;
    const matchesStatus = !filterStatus || 
                        (filterStatus === 'published' && article.isPublished) ||
                        (filterStatus === 'draft' && !article.isPublished) ||
                        (filterStatus === 'scheduled' && article.scheduledAt);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (article: NewsArticle) => {
    if (article.isPublished) {
      return <Badge className="bg-green-100 text-green-800">Publicado</Badge>;
    } else if (article.scheduledAt) {
      return <Badge className="bg-yellow-100 text-yellow-800">Programado</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800">Borrador</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                📰 Control de Noticias
              </h1>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                <Bot className="w-4 h-4 mr-1" />
                IA Integrada
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleRunAutomation}
                className="flex items-center"
                variant="outline"
              >
                <Zap className="w-4 h-4 mr-2" />
                Ejecutar Automatización
              </Button>
              <Button
                onClick={handleExecuteScheduled}
                className="flex items-center"
                variant="outline"
              >
                <Clock className="w-4 h-4 mr-2" />
                Ejecutar Programadas
              </Button>
              <Button
                onClick={handleCreateArticle}
                className="flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nueva Noticia
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="w-5 h-5 mr-2 text-blue-600" />
                    Estadísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Artículos</span>
                    <Badge variant="outline">{articles.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Publicados</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {articles.filter(a => a.isPublished).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Borradores</span>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800">
                      {articles.filter(a => !a.isPublished && !a.scheduledAt).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Programados</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      {articles.filter(a => a.scheduledAt).length}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* AI Stats */}
              {aiReport && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-purple-600" />
                      IA Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Generados por IA</span>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">
                        {aiReport.data.stats.aiGeneratedArticles}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Score Promedio</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {Math.round(aiReport.data.stats.averageAIScore || 0)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Legibilidad</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {Math.round(aiReport.data.stats.averageReadabilityScore || 0)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Automation Status */}
              {automationReport && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-orange-600" />
                      Automatización
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Estado</span>
                      <Badge 
                        variant="outline" 
                        className={automationReport.data.automationStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      >
                        {automationReport.data.automationStatus}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Próxima Ejecución</span>
                      <span className="text-xs text-gray-500">
                        {new Date(automationReport.data.nextRun).toLocaleTimeString('es-AR')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="articles" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="articles">Artículos</TabsTrigger>
                <TabsTrigger value="automation">Automatización</TabsTrigger>
                <TabsTrigger value="analytics">Analíticas</TabsTrigger>
                <TabsTrigger value="settings">Configuración</TabsTrigger>
              </TabsList>

              <TabsContent value="articles" className="space-y-6">
                {/* Filters */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="search">Buscar</Label>
                        <Input
                          id="search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Buscar artículos..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Categoría</Label>
                        <Select value={filterCategory} onValueChange={setFilterCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Todas las categorías" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Todas las categorías</SelectItem>
                            {categories?.map((category: any) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="status">Estado</Label>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="Todos los estados" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Todos los estados</SelectItem>
                            <SelectItem value="published">Publicados</SelectItem>
                            <SelectItem value="draft">Borradores</SelectItem>
                            <SelectItem value="scheduled">Programados</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="sort">Ordenar por</Label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="createdAt">Fecha de creación</SelectItem>
                            <SelectItem value="publishedAt">Fecha de publicación</SelectItem>
                            <SelectItem value="views">Vistas</SelectItem>
                            <SelectItem value="likes">Likes</SelectItem>
                            <SelectItem value="title">Título</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Articles List */}
                <div className="space-y-4">
                  {filteredArticles.map((article) => (
                    <Card key={article.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {getStatusBadge(article)}
                              {article.isBreaking && (
                                <Badge className="bg-red-100 text-red-800">🔥 Breaking</Badge>
                              )}
                              {article.isTrending && (
                                <Badge className="bg-orange-100 text-orange-800">📈 Trending</Badge>
                              )}
                              {article.aiGenerated && (
                                <Badge className="bg-purple-100 text-purple-800">🤖 IA</Badge>
                              )}
                            </div>
                            
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {article.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {article.excerpt}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>👤 {article.author}</span>
                              <span>📅 {formatDate(article.createdAt)}</span>
                              <span>👁️ {article.views.toLocaleString()}</span>
                              <span>❤️ {article.likes}</span>
                              <span>📤 {article.shares}</span>
                              {article.aiScore > 0 && (
                                <span>🧠 {article.aiScore}</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditArticle(article)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            {!article.isPublished && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handlePublishArticle(article.id)}
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteArticle(article.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm text-gray-600">
                    Página {currentPage} de {Math.ceil(filteredArticles.length / itemsPerPage)}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage >= Math.ceil(filteredArticles.length / itemsPerPage)}
                  >
                    Siguiente
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="automation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                      Automatización de Noticias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        onClick={handleRunAutomation}
                        className="h-20 flex flex-col items-center justify-center"
                      >
                        <Zap className="w-6 h-6 mb-2" />
                        Ejecutar Automatización
                      </Button>
                      <Button
                        onClick={handleExecuteScheduled}
                        className="h-20 flex flex-col items-center justify-center"
                        variant="outline"
                      >
                        <Clock className="w-6 h-6 mb-2" />
                        Ejecutar Programadas
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart className="w-5 h-5 mr-2 text-green-600" />
                      Analíticas de Contenido
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <BarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Analíticas detalladas próximamente</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-gray-600" />
                      Configuración del Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Configuración avanzada próximamente</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsControl;
