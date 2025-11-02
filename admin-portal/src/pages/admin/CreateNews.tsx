'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Save, Eye, Image, Tag, Calendar, User, Globe, Sparkles, Wand2, Lightbulb, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Importar Quill dinámicamente para evitar errores de SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">Cargando editor...</div>
});

import 'react-quill/dist/quill.snow.css';

// Configuración del toolbar de Quill
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['blockquote', 'code-block'],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  },
};

const quillFormats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'color', 'background',
  'align', 'code-block'
];

interface NewsArticle {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  imageUrl: string;
  isBreaking: boolean;
  isPublished: boolean;
  scheduledAt?: string;
}

export default function CreateNews() {
  const [article, setArticle] = useState<NewsArticle>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    author: '',
    imageUrl: '',
    isBreaking: false,
    isPublished: false,
  });

  const [currentTag, setCurrentTag] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Estados para IA
  const [aiOptions, setAiOptions] = useState<any>(null);
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string>('');
  const [showAiPanel, setShowAiPanel] = useState(false);

  const categories = [
    'Política', 'Economía', 'Sociedad', 'Internacional', 'Deportes', 'Cultura', 'Tecnología'
  ];

  const handleQuillChange = (value: string) => {
    setArticle(prev => ({ ...prev, content: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !article.tags.includes(currentTag.trim())) {
      setArticle(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // ===========================================
  // FUNCIONES DE INTELIGENCIA ARTIFICIAL
  // ===========================================

  const generateWithAI = async () => {
    setIsGenerating(true);
    setAiError('');

    try {
      const response = await fetch('/api/ollama/generate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: article.title || 'Tema político argentino de actualidad',
          category: article.category || 'Política',
          keywords: article.tags,
          length: 'medium',
          style: 'journalistic'
        })
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setArticle(prev => ({
          ...prev,
          title: prev.title || result.data.title,
          content: prev.content || result.data.content,
          excerpt: prev.excerpt || result.data.excerpt,
          category: prev.category || result.data.category,
          tags: [...new Set([...prev.tags, ...result.data.tags])]
        }));

        alert('✅ Artículo completo generado con IA exitosamente!');
      } else {
        throw new Error(result.message || 'Error generando artículo');
      }
    } catch (error: any) {
      console.error('Error generando con IA:', error);
      setAiError(error.message || 'Error generando contenido con IA');
      alert('❌ Error al generar contenido con IA: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const improveContent = async (improvementType: string) => {
    if (!article.content.trim()) {
      alert('Primero escribe o genera contenido para poder mejorarlo');
      return;
    }

    setIsAiLoading(true);
    setAiError('');

    try {
      const response = await fetch('/api/ollama/improve-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: article.content,
          improvementType
        })
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setArticle(prev => ({
          ...prev,
          content: result.data.improvedContent
        }));

        alert(`✅ Contenido mejorado (${improvementType}) exitosamente!`);
      } else {
        throw new Error(result.message || 'Error mejorando contenido');
      }
    } catch (error: any) {
      console.error('Error mejorando contenido:', error);
      setAiError(error.message || 'Error mejorando contenido con IA');
      alert('❌ Error al mejorar contenido: ' + error.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  const suggestTitles = async () => {
    if (!article.content.trim()) {
      alert('Primero escribe contenido para poder sugerir títulos');
      return;
    }

    setIsAiLoading(true);
    setAiError('');

    try {
      const response = await fetch('/api/ollama/suggest-titles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: article.content,
          category: article.category,
          style: 'journalistic'
        })
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setSuggestedTitles(result.data.titles);
        setShowAiPanel(true);
        alert(`✅ ${result.data.titles.length} títulos sugeridos generados!`);
      } else {
        throw new Error(result.message || 'Error generando títulos');
      }
    } catch (error: any) {
      console.error('Error generando títulos:', error);
      setAiError(error.message || 'Error generando títulos con IA');
      alert('❌ Error al generar títulos: ' + error.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  const useSuggestedTitle = (title: string) => {
    setArticle(prev => ({ ...prev, title }));
    setSuggestedTitles([]);
  };

  const loadAiOptions = async () => {
    try {
      const response = await fetch('/api/ollama/options');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setAiOptions(result.data);
        }
      }
    } catch (error) {
      console.error('Error cargando opciones de IA:', error);
    }
  };

  // Cargar opciones de IA al montar el componente
  useEffect(() => {
    loadAiOptions();
  }, []);

  const saveArticle = async () => {
    if (!article.title || !article.content) {
      alert('Por favor complete título y contenido');
      return;
    }

    setIsSaving(true);
    try {
      // Aquí iría la lógica para guardar en la base de datos
      console.log('Guardando artículo:', article);

      // Simular delay de guardado
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('✅ Artículo guardado exitosamente!');
    } catch (error) {
      alert('❌ Error al guardar el artículo');
    } finally {
      setIsSaving(false);
    }
  };

  const publishArticle = async () => {
    setArticle(prev => ({ ...prev, isPublished: true }));
    await saveArticle();
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Crear Nueva Noticia</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Editar' : 'Vista Previa'}
          </Button>
          {/* Botones de IA */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={generateWithAI}
              disabled={isGenerating}
              className="bg-purple-50 border-purple-200 hover:bg-purple-100"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generando...' : 'Generar Artículo'}
            </Button>

            <Button
              variant="outline"
              onClick={suggestTitles}
              disabled={isAiLoading || !article.content.trim()}
              className="bg-blue-50 border-blue-200 hover:bg-blue-100"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {isAiLoading ? 'Pensando...' : 'Sugerir Títulos'}
            </Button>

            <Select onValueChange={improveContent} disabled={isAiLoading || !article.content.trim()}>
              <SelectTrigger className="w-40 bg-green-50 border-green-200 hover:bg-green-100">
                <SelectValue placeholder={
                  isAiLoading ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mejorando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Wand2 className="w-4 h-4 mr-2" />
                      Mejorar
                    </div>
                  )
                } />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grammar">📝 Gramática</SelectItem>
                <SelectItem value="style">✨ Estilo</SelectItem>
                <SelectItem value="length">📏 Longitud</SelectItem>
                <SelectItem value="seo">🔍 SEO</SelectItem>
                <SelectItem value="engagement">🎯 Engagement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            onClick={saveArticle}
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Guardando...' : 'Guardar Borrador'}
          </Button>
          <Button
            onClick={publishArticle}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700"
          >
            <Globe className="w-4 h-4 mr-2" />
            Publicar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Principal */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contenido de la Noticia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium mb-2">Título</label>
                <Input
                  value={article.title}
                  onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ingrese el título de la noticia"
                  className="text-lg"
                />
              </div>

              {/* Extracto */}
              <div>
                <label className="block text-sm font-medium mb-2">Extracto/Resumen</label>
                <Textarea
                  value={article.excerpt}
                  onChange={(e) => setArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Breve resumen de la noticia (2-3 líneas)"
                  rows={3}
                />
              </div>

              {/* Editor Quill */}
              <div>
                <label className="block text-sm font-medium mb-2">Contenido</label>
                {!previewMode ? (
                  <div className="border rounded-lg">
                    <ReactQuill
                      value={article.content}
                      onChange={handleQuillChange}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Escriba el contenido completo de la noticia aquí..."
                      style={{ minHeight: '400px' }}
                    />
                  </div>
                ) : (
                  <div
                    className="border rounded-lg p-4 min-h-[400px] prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Configuración */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Categoría */}
              <div>
                <label className="block text-sm font-medium mb-2">Categoría</label>
                <Select
                  value={article.category}
                  onValueChange={(value) => setArticle(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Autor */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Autor
                </label>
                <Input
                  value={article.author}
                  onChange={(e) => setArticle(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Nombre del autor"
                />
              </div>

              {/* Imagen */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  URL de Imagen Destacada
                </label>
                <Input
                  value={article.imageUrl}
                  onChange={(e) => setArticle(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              {/* Programar Publicación */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Programar Publicación
                </label>
                <Input
                  type="datetime-local"
                  value={article.scheduledAt || ''}
                  onChange={(e) => setArticle(prev => ({ ...prev, scheduledAt: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Tag className="w-5 h-5 inline mr-2" />
                Etiquetas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Agregar etiqueta"
                  className="flex-1"
                />
                <Button onClick={addTag} size="sm">Agregar</Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-red-100 hover:text-red-800"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Opciones de Publicación */}
          <Card>
            <CardHeader>
              <CardTitle>Estado de Publicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={article.isBreaking}
                  onChange={(e) => setArticle(prev => ({ ...prev, isBreaking: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm">Noticia de Última Hora</span>
              </label>

              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600 mb-2">Estado actual:</p>
                <Badge variant={article.isPublished ? "default" : "secondary"}>
                  {article.isPublished ? "Publicado" : "Borrador"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Panel de Sugerencias de IA */}
      {showAiPanel && suggestedTitles.length > 0 && (
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <span>Sugerencias de Títulos con IA</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAiPanel(false)}
                className="ml-auto"
              >
                ✕
              </Button>
            </CardTitle>
            <p className="text-sm text-gray-600">
              La IA ha generado estos títulos alternativos basados en tu contenido
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suggestedTitles.map((title, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="font-medium">{title}</span>
                  <Button
                    size="sm"
                    onClick={() => useSuggestedTitle(title)}
                    className="ml-2"
                  >
                    Usar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mensaje de error de IA */}
      {aiError && (
        <Card className="mt-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800">Error de IA</p>
                <p className="text-sm text-red-700">{aiError}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
