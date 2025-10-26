// ===========================================
// EDITOR DE ARTÍCULOS PROFESIONAL
// Componente para crear y editar artículos
// ===========================================

import React, { useState, useEffect } from 'react';
import { trpc } from '../utils/trpc';

interface ArticleEditorProps {
  articleId?: string;
  onSave?: (article: any) => void;
  onCancel?: () => void;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({ 
  articleId, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    imageUrl: '',
    author: '',
    categoryId: '',
    sourceId: '',
    tags: '',
    isBreaking: false,
    isTrending: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Queries
  const { data: categories } = trpc.news.getCategories.useQuery();
  const { data: sources } = trpc.news.getSources.useQuery();
  const { data: article } = trpc.news.getArticle.useQuery(
    { id: articleId! },
    { enabled: !!articleId }
  );

  // Mutations
  const createArticle = trpc.news.createArticle.useMutation();
  const updateArticle = trpc.news.updateArticle.useMutation();

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        imageUrl: article.imageUrl,
        author: article.author,
        categoryId: article.categoryId,
        sourceId: article.sourceId,
        tags: article.tags.join(', '),
        isBreaking: article.isBreaking,
        isTrending: article.isTrending
      });
    }
  }, [article]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'El contenido es requerido';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'El extracto es requerido';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'El autor es requerido';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'La categoría es requerida';
    }

    if (!formData.sourceId) {
      newErrors.sourceId = 'La fuente es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const articleData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        categoryId: parseInt(formData.categoryId),
        sourceId: parseInt(formData.sourceId)
      };

      if (articleId) {
        await updateArticle.mutateAsync({ id: articleId, ...articleData });
      } else {
        await createArticle.mutateAsync(articleData);
      }

      onSave?.(articleData);
    } catch (error) {
      console.error('Error guardando artículo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {articleId ? '✏️ Editar Artículo' : '📝 Nuevo Artículo'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingresa el título del artículo"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Extracto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extracto *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.excerpt ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Breve descripción del artículo"
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
            )}
          </div>

          {/* Contenido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={10}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Contenido completo del artículo"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de Imagen
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* Autor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autor *
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.author ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nombre del autor"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author}</p>
            )}
          </div>

          {/* Categoría y Fuente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.categoryId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar categoría</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuente *
              </label>
              <select
                name="sourceId"
                value={formData.sourceId}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.sourceId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar fuente</option>
                {sources?.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
              {errors.sourceId && (
                <p className="mt-1 text-sm text-red-600">{errors.sourceId}</p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tag1, tag2, tag3"
            />
            <p className="mt-1 text-sm text-gray-500">
              Separa los tags con comas
            </p>
          </div>

          {/* Opciones */}
          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isBreaking"
                checked={formData.isBreaking}
                onChange={handleInputChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">🔥 Breaking News</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">📈 Trending</span>
            </label>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Guardando...' : articleId ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleEditor;

