// ===========================================
// EDITOR VISUAL SIN CÓDIGO CON IA INTEGRADA
// Sistema profesional de creación y edición de noticias
// ===========================================

import React, { useState, useRef, useEffect } from 'react';
import { trpc } from '../utils/trpc';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Save, 
  Eye, 
  Send, 
  Image, 
  Video, 
  Link, 
  Bold, 
  Italic, 
  Underline,
  List,
  Quote,
  Code,
  Palette,
  Wand2,
  Bot,
  Zap,
  Sparkles,
  Upload,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Star,
  Share2,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Move,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Tag
} from 'lucide-react';

interface NewsArticle {
  id?: string;
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
  scheduledAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  socialMediaText?: string;
  aiGenerated?: boolean;
  aiScore?: number;
  readabilityScore?: number;
  sentimentScore?: number;
}

interface AISuggestion {
  type: 'title' | 'content' | 'excerpt' | 'tags' | 'seo';
  suggestion: string;
  confidence: number;
  reasoning: string;
}

const VisualNewsEditor: React.FC = () => {
  const [article, setArticle] = useState<NewsArticle>({
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
    seoTitle: '',
    seoDescription: '',
    seoKeywords: [],
    socialMediaText: '',
    aiGenerated: false,
    aiScore: 0,
    readabilityScore: 0,
    sentimentScore: 0
  });

  const [activeTab, setActiveTab] = useState('content');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Refs
  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Queries
  const { data: categories } = trpc.news.getCategories.useQuery();
  const { data: sources } = trpc.news.getSources.useQuery();

  // Mutations
  const createArticle = trpc.articles.create.useMutation();
  const updateArticle = trpc.articles.update.useMutation();
  const generateAIContent = trpc.ai.generateContent?.useMutation();
  const analyzeContent = trpc.ai.analyzeContent?.useMutation();
  const optimizeSEO = trpc.ai.optimizeSEO?.useMutation();

  // Handlers
  const handleInputChange = (field: keyof NewsArticle, value: any) => {
    setArticle(prev => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (content: string) => {
    setArticle(prev => ({ ...prev, content }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !article.tags.includes(newTag.trim())) {
      setArticle(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !article.seoKeywords?.includes(newKeyword.trim())) {
      setArticle(prev => ({
        ...prev,
        seoKeywords: [...(prev.seoKeywords || []), newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setArticle(prev => ({
      ...prev,
      seoKeywords: prev.seoKeywords?.filter(keyword => keyword !== keywordToRemove) || []
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (selectedImage) {
      try {
        // Simular subida de imagen
        const imageUrl = URL.createObjectURL(selectedImage);
        setArticle(prev => ({ ...prev, imageUrl }));
        setImagePreview('');
        setSelectedImage(null);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleAIGenerate = async (type: 'title' | 'content' | 'excerpt' | 'tags' | 'seo') => {
    setIsAiAnalyzing(true);
    try {
      const result = await generateAIContent.mutateAsync({
        type,
        context: article,
        prompt: `Genera ${type} profesional para una noticia sobre: ${article.title || 'tema general'}`
      });
      
      if (result.data?.suggestion) {
        switch (type) {
          case 'title':
            setArticle(prev => ({ ...prev, title: result.data.suggestion }));
            break;
          case 'content':
            setArticle(prev => ({ ...prev, content: result.data.suggestion }));
            break;
          case 'excerpt':
            setArticle(prev => ({ ...prev, excerpt: result.data.suggestion }));
            break;
          case 'tags':
            setArticle(prev => ({ ...prev, tags: result.data.suggestion.split(',').map(t => t.trim()) }));
            break;
          case 'seo':
            setArticle(prev => ({ 
              ...prev, 
              seoTitle: result.data.seoTitle,
              seoDescription: result.data.seoDescription,
              seoKeywords: result.data.seoKeywords
            }));
            break;
        }
      }
    } catch (error) {
      console.error('Error generating AI content:', error);
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleAIAnalyze = async () => {
    setIsAiAnalyzing(true);
    try {
      const result = await analyzeContent.mutateAsync({
        content: article.content,
        title: article.title
      });
      
      setArticle(prev => ({
        ...prev,
        aiScore: result.data?.aiScore || 0,
        readabilityScore: result.data?.readabilityScore || 0,
        sentimentScore: result.data?.sentimentScore || 0
      }));
      
      setAiSuggestions(result.data?.suggestions || []);
    } catch (error) {
      console.error('Error analyzing content:', error);
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleSEOOptimize = async () => {
    try {
      const result = await optimizeSEO.mutateAsync({
        title: article.title,
        content: article.content,
        category: article.category
      });
      
      setArticle(prev => ({
        ...prev,
        seoTitle: result.data?.seoTitle,
        seoDescription: result.data?.seoDescription,
        seoKeywords: result.data?.seoKeywords
      }));
    } catch (error) {
      console.error('Error optimizing SEO:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (article.id) {
        await updateArticle.mutateAsync({ id: article.id, data: article });
      } else {
        await createArticle.mutateAsync(article);
      }
    } catch (error) {
      console.error('Error saving article:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsSaving(true);
    try {
      const articleToPublish = { ...article, isPublished: true };
      if (article.id) {
        await updateArticle.mutateAsync({ id: article.id, data: articleToPublish });
      } else {
        await createArticle.mutateAsync(articleToPublish);
      }
    } catch (error) {
      console.error('Error publishing article:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSchedule = async () => {
    setIsSaving(true);
    try {
      const articleToSchedule = { ...article, isPublished: false, scheduledAt: new Date().toISOString() };
      if (article.id) {
        await updateArticle.mutateAsync({ id: article.id, data: articleToSchedule });
      } else {
        await createArticle.mutateAsync(articleToSchedule);
      }
    } catch (error) {
      console.error('Error scheduling article:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Formatting functions
  const formatText = (command: string) => {
    if (contentRef.current) {
      document.execCommand(command);
      contentRef.current.focus();
    }
  };

  const insertElement = (element: string) => {
    if (contentRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const elementNode = document.createElement(element);
        elementNode.textContent = 'Nuevo elemento';
        range.insertNode(elementNode);
        range.setStartAfter(elementNode);
        range.setEndAfter(elementNode);
        selection.removeAllRanges();
        selection.addRange(range);
      }
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
                📰 Editor de Noticias Profesional
              </h1>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                <Bot className="w-4 h-4 mr-1" />
                IA Integrada
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreview ? 'Editar' : 'Vista Previa'}
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Guardando...' : 'Guardar'}
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700 flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSaving ? 'Publicando...' : 'Publicar'}
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
              {/* AI Assistant */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="w-5 h-5 mr-2 text-blue-600" />
                    Asistente IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => handleAIGenerate('title')}
                    disabled={isAiAnalyzing}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generar Título
                  </Button>
                  <Button
                    onClick={() => handleAIGenerate('content')}
                    disabled={isAiAnalyzing}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Generar Contenido
                  </Button>
                  <Button
                    onClick={() => handleAIGenerate('excerpt')}
                    disabled={isAiAnalyzing}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Quote className="w-4 h-4 mr-2" />
                    Generar Resumen
                  </Button>
                  <Button
                    onClick={() => handleAIGenerate('tags')}
                    disabled={isAiAnalyzing}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    Generar Tags
                  </Button>
                  <Button
                    onClick={handleAIAnalyze}
                    disabled={isAiAnalyzing}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analizar Contenido
                  </Button>
                  <Button
                    onClick={handleSEOOptimize}
                    disabled={isAiAnalyzing}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Optimizar SEO
                  </Button>
                </CardContent>
              </Card>

              {/* Article Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Configuración</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="author">Autor</Label>
                    <Input
                      id="author"
                      value={article.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      placeholder="Nombre del autor"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Categoría</Label>
                    <Select value={article.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category: any) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="breaking"
                        checked={article.isBreaking}
                        onCheckedChange={(checked) => handleInputChange('isBreaking', checked)}
                      />
                      <Label htmlFor="breaking">Noticia de Último Momento</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="trending"
                        checked={article.isTrending}
                        onCheckedChange={(checked) => handleInputChange('isTrending', checked)}
                      />
                      <Label htmlFor="trending">Trending</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Analysis Results */}
              {article.aiScore > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                      Análisis IA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Puntuación IA</span>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">
                        {article.aiScore}/100
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Legibilidad</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {article.readabilityScore}/100
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sentimiento</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {article.sentimentScore}/100
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* AI Suggestions */}
              {aiSuggestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                      Sugerencias IA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                        <div className="text-sm font-medium text-yellow-800">
                          {suggestion.type}
                        </div>
                        <div className="text-sm text-yellow-700 mt-1">
                          {suggestion.suggestion}
                        </div>
                        <div className="text-xs text-yellow-600 mt-1">
                          Confianza: {suggestion.confidence}%
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Contenido</TabsTrigger>
                <TabsTrigger value="media">Medios</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contenido Principal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={article.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Título de la noticia"
                        className="text-lg font-semibold"
                      />
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Resumen</Label>
                      <Textarea
                        id="excerpt"
                        value={article.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Resumen de la noticia"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Contenido</Label>
                      <div className="border rounded-lg">
                        {/* Toolbar */}
                        <div className="border-b p-2 flex flex-wrap gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => formatText('bold')}
                            className="h-8 w-8 p-0"
                          >
                            <Bold className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => formatText('italic')}
                            className="h-8 w-8 p-0"
                          >
                            <Italic className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => formatText('underline')}
                            className="h-8 w-8 p-0"
                          >
                            <Underline className="w-4 h-4" />
                          </Button>
                          <div className="w-px h-6 bg-gray-300 mx-1" />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => insertElement('h2')}
                            className="h-8 w-8 p-0"
                          >
                            H2
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => insertElement('h3')}
                            className="h-8 w-8 p-0"
                          >
                            H3
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => insertElement('p')}
                            className="h-8 w-8 p-0"
                          >
                            P
                          </Button>
                          <div className="w-px h-6 bg-gray-300 mx-1" />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => formatText('insertUnorderedList')}
                            className="h-8 w-8 p-0"
                          >
                            <List className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => formatText('insertOrderedList')}
                            className="h-8 w-8 p-0"
                          >
                            <List className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => insertElement('blockquote')}
                            className="h-8 w-8 p-0"
                          >
                            <Quote className="w-4 h-4" />
                          </Button>
                          <div className="w-px h-6 bg-gray-300 mx-1" />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => formatText('justifyLeft')}
                            className="h-8 w-8 p-0"
                          >
                            <AlignLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => formatText('justifyCenter')}
                            className="h-8 w-8 p-0"
                          >
                            <AlignCenter className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => formatText('justifyRight')}
                            className="h-8 w-8 p-0"
                          >
                            <AlignRight className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => formatText('justifyFull')}
                            className="h-8 w-8 p-0"
                          >
                            <AlignJustify className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* Content Editor */}
                        <div
                          ref={contentRef}
                          contentEditable
                          className="p-4 min-h-[400px] focus:outline-none"
                          dangerouslySetInnerHTML={{ __html: article.content }}
                          onInput={(e) => handleContentChange(e.currentTarget.innerHTML)}
                          style={{ minHeight: '400px' }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center">
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 hover:text-red-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Agregar tag"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      />
                      <Button onClick={handleAddTag} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Imagen Principal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          onClick={() => {
                            setImagePreview('');
                            setSelectedImage(null);
                          }}
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="flex-1"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Seleccionar Imagen
                      </Button>
                      {selectedImage && (
                        <Button onClick={handleUploadImage} className="flex-1">
                          <Upload className="w-4 h-4 mr-2" />
                          Subir Imagen
                        </Button>
                      )}
                    </div>
                    
                    {article.imageUrl && (
                      <div className="mt-4">
                        <Label>URL de la imagen</Label>
                        <Input
                          value={article.imageUrl}
                          onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                          placeholder="URL de la imagen"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Optimización SEO</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="seoTitle">Título SEO</Label>
                      <Input
                        id="seoTitle"
                        value={article.seoTitle || ''}
                        onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                        placeholder="Título optimizado para SEO"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="seoDescription">Descripción SEO</Label>
                      <Textarea
                        id="seoDescription"
                        value={article.seoDescription || ''}
                        onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                        placeholder="Descripción optimizada para SEO"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label>Palabras Clave SEO</Label>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.seoKeywords?.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center">
                            {keyword}
                            <button
                              onClick={() => handleRemoveKeyword(keyword)}
                              className="ml-2 hover:text-red-500"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                          placeholder="Agregar palabra clave"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                        />
                        <Button onClick={handleAddKeyword} size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="social" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Redes Sociales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="socialText">Texto para Redes Sociales</Label>
                      <Textarea
                        id="socialText"
                        value={article.socialMediaText || ''}
                        onChange={(e) => handleInputChange('socialMediaText', e.target.value)}
                        placeholder="Texto optimizado para redes sociales"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        onClick={() => handleSchedule()}
                        disabled={isSaving}
                        className="w-full"
                        variant="outline"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Programar Publicación
                      </Button>
                      <Button
                        onClick={() => handlePublish()}
                        disabled={isSaving}
                        className="w-full"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Publicar Ahora
                      </Button>
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

export default VisualNewsEditor;
