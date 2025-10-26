/**
 * 📝 CMS EDITOR ENTERPRISE - Editor completo con IA
 */

import React, { useState } from 'react';
import { useArticles } from '../../lib/trpc-client';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Sparkles,
  Wand2,
  Save,
  Eye,
  ArrowLeft,
  Image as ImageIcon,
  Tag,
  Calendar,
  User,
} from 'lucide-react';
import { Link } from 'wouter';

export const CMSEditor = () => {
  const articles = useArticles();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'politica',
    author: 'Editor',
    imageUrl: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    featured: false,
    breaking: false,
    tags: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [aiTopic, setAiTopic] = useState('');

  const categories = [
    { value: 'politica', label: 'Política' },
    { value: 'economia', label: 'Economía' },
    { value: 'sociedad', label: 'Sociedad' },
    { value: 'internacional', label: 'Internacional' },
    { value: 'deportes', label: 'Deportes' },
    { value: 'cultura', label: 'Cultura' },
  ];

  // Generar con IA
  const handleGenerateWithAI = async () => {
    if (!aiTopic.trim()) {
      setMessage('Por favor ingresa un tema para generar el artículo');
      return;
    }

    setAiLoading(true);
    setMessage('');

    try {
      const result = await articles.generateWithAI({
        topic: aiTopic,
        category: formData.category,
        keywords: formData.tags,
      });

      if (result.success && result.article) {
        setFormData({
          ...formData,
          title: result.article.title,
          excerpt: result.article.excerpt,
          content: result.article.content,
          tags: result.article.tags,
        });
        setMessage('✅ Artículo generado con IA exitosamente!');
      } else {
        setMessage('❌ Error: ' + (result.error || 'No se pudo generar el artículo'));
      }
    } catch (error: any) {
      setMessage('❌ Error al generar con IA: ' + error.message);
    } finally {
      setAiLoading(false);
    }
  };

  // Mejorar con IA
  const handleImproveWithAI = async () => {
    if (!formData.content.trim()) {
      setMessage('Por favor ingresa contenido para mejorar');
      return;
    }

    setAiLoading(true);
    setMessage('');

    try {
      const result = await articles.improveWithAI({
        content: formData.content,
        title: formData.title,
      });

      if (result.success && result.improved) {
        setFormData({
          ...formData,
          title: result.improved.title || formData.title,
          content: result.improved.content,
        });
        
        const improvements = result.improved.improvements?.join(', ') || 'Contenido mejorado';
        setMessage(`✅ Artículo mejorado! Cambios: ${improvements}`);
      } else {
        setMessage('❌ Error: ' + (result.error || 'No se pudo mejorar el artículo'));
      }
    } catch (error: any) {
      setMessage('❌ Error al mejorar con IA: ' + error.message);
    } finally {
      setAiLoading(false);
    }
  };

  // Guardar artículo
  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      setMessage('Por favor completa título y contenido');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const result = await articles.create({
        ...formData,
        slug,
        categorySlug: formData.category,
      });

      if (result.success) {
        setMessage(`✅ Artículo guardado exitosamente! ID: ${result.id}`);
        // Limpiar formulario
        setTimeout(() => {
          setFormData({
            title: '',
            excerpt: '',
            content: '',
            category: 'politica',
            author: 'Editor',
            imageUrl: '',
            status: 'draft',
            featured: false,
            breaking: false,
            tags: [],
          });
        }, 2000);
      } else {
        setMessage('❌ Error al guardar el artículo');
      }
    } catch (error: any) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} className="mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Editor CMS con IA</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye size={16} className="mr-2" />
              Vista Previa
            </Button>
            <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              <Save size={16} className="mr-2" />
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
            <p className="text-sm">{message}</p>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Generator */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles className="text-purple-600" size={20} />
                Generar con IA
              </h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Ej: Reforma económica de Milei 2025"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleGenerateWithAI}
                  disabled={aiLoading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Sparkles size={16} className="mr-2" />
                  {aiLoading ? 'Generando...' : 'Generar'}
                </Button>
              </div>
            </Card>

            {/* Title */}
            <Card className="p-6">
              <label className="block text-sm font-semibold mb-2">Título *</label>
              <Input
                placeholder="Título del artículo..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-lg"
              />
            </Card>

            {/* Excerpt */}
            <Card className="p-6">
              <label className="block text-sm font-semibold mb-2">Extracto *</label>
              <textarea
                placeholder="Resumen breve del artículo..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full p-3 border rounded-lg resize-none"
                rows={3}
              />
            </Card>

            {/* Content */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold">Contenido *</label>
                <Button
                  onClick={handleImproveWithAI}
                  disabled={aiLoading}
                  variant="outline"
                  size="sm"
                >
                  <Wand2 size={14} className="mr-2" />
                  {aiLoading ? 'Mejorando...' : 'Mejorar con IA'}
                </Button>
              </div>
              <textarea
                placeholder="Contenido del artículo (HTML permitido)..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-3 border rounded-lg resize-none font-mono text-sm"
                rows={20}
              />
              <p className="text-xs text-gray-500 mt-2">
                Puedes usar HTML: &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;ol&gt;, etc.
              </p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Estado</h3>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
                <option value="archived">Archivado</option>
              </select>
            </Card>

            {/* Category */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Tag size={16} />
                Categoría
              </h3>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </Card>

            {/* Author */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User size={16} />
                Autor
              </h3>
              <Input
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </Card>

            {/* Image */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <ImageIcon size={16} />
                Imagen
              </h3>
              <Input
                placeholder="URL de la imagen..."
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="mt-4 w-full h-32 object-cover rounded"
                />
              )}
            </Card>

            {/* Options */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Opciones</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Destacado</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.breaking}
                    onChange={(e) => setFormData({ ...formData, breaking: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Última Hora</span>
                </label>
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Tags</h3>
              <Input
                placeholder="Agregar tag..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = (e.target as HTMLInputElement).value.trim();
                    if (value && !formData.tags.includes(value)) {
                      setFormData({ ...formData, tags: [...formData.tags, value] });
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-red-50"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        tags: formData.tags.filter((_, i) => i !== index),
                      });
                    }}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSEditor;

