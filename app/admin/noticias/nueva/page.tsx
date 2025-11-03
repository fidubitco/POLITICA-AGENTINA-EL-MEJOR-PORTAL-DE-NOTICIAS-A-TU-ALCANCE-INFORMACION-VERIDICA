'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Eye, Upload } from 'lucide-react';

export default function NuevaNoticia() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'economia',
    excerpt: '',
    content: '',
    imageUrl: '/images/economia-argentina-1.jpg',
    author: 'Redacción Política Argentina',
    tags: '',
    isBreaking: false,
  });

  const categories = [
    { value: 'economia', label: 'Economía' },
    { value: 'politica', label: 'Política' },
    { value: 'judicial', label: 'Judicial' },
    { value: 'internacional', label: 'Internacional' },
    { value: 'sociedad', label: 'Sociedad' },
  ];

  const handleSubmit = (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault();
    // Aquí iría la lógica para guardar en la base de datos
    console.log('Guardando noticia:', { ...formData, status });
    alert(`Noticia ${status === 'draft' ? 'guardada como borrador' : 'publicada'} exitosamente`);
    router.push('/admin/noticias');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nueva Noticia</h1>
          <p className="text-gray-600 mt-1">Crea una nueva noticia para el portal</p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <X className="w-5 h-5" />
          <span>Cancelar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Dólar blue alcanza los $1.445: análisis del mercado cambiario"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.title.length} caracteres (recomendado: 60-70 para SEO)
              </p>
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Ej: El dólar paralelo se mantiene estable mientras el gobierno evalúa medidas"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resumen (Excerpt) *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Breve resumen de la noticia (150-200 caracteres)"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.excerpt.length} caracteres (recomendado: 150-200)
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Contenido completo de la noticia..."
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.content.length} caracteres
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (separados por comas)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Ej: dólar blue, economía, mercado cambiario, BCRA"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recomendado: 5-7 tags relevantes para SEO
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Publicación</h3>
            
            <div className="space-y-3">
              <button
                onClick={(e) => handleSubmit(e, 'published')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Publicar</span>
              </button>
              
              <button
                onClick={(e) => handleSubmit(e, 'draft')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Borrador</span>
              </button>
              
              <button
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Vista Previa</span>
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Categoría</h3>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Autor</h3>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Imagen Destacada</h3>
            <div className="space-y-3">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="URL de la imagen"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Subir Imagen</span>
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Opciones</h3>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isBreaking}
                onChange={(e) => setFormData({ ...formData, isBreaking: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Marcar como Breaking News</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

