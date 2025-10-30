'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { generateNews, generateImageSuggestions, translateNews, type NewsGenerationOptions } from '@/lib/openai';
import { categories } from '@/data/categories';
import { Sparkles, Globe, Image as ImageIcon, Wand2 } from 'lucide-react';

interface AINewsGeneratorProps {
  onNewsGenerated?: (news: any) => void;
}

export function AINewsGenerator({ onNewsGenerated }: AINewsGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNews, setGeneratedNews] = useState<any>(null);
  const [formData, setFormData] = useState<NewsGenerationOptions>({
    category: 'politica',
    keywords: [],
    length: 'medium',
    tone: 'informative',
    language: 'es'
  });
  const [keywordInput, setKeywordInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const news = await generateNews(formData);
      setGeneratedNews(news);

      if (onNewsGenerated) {
        onNewsGenerated(news);
      }
    } catch (error) {
      console.error('Error generating news:', error);
      alert('Error al generar la noticia. Por favor, intenta nuevamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !formData.keywords?.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...(prev.keywords || []), keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords?.filter(k => k !== keyword) || []
    }));
  };

  const handleTranslate = async (targetLang: string) => {
    if (!generatedNews?.content) return;

    try {
      const translations = await translateNews(generatedNews.content, [targetLang]);
      setGeneratedNews(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          [targetLang]: translations[targetLang]
        }
      }));
    } catch (error) {
      console.error('Error translating:', error);
    }
  };

  const handleGenerateImages = async () => {
    if (!generatedNews?.content) return;

    try {
      const suggestions = await generateImageSuggestions(generatedNews.content);
      setGeneratedNews(prev => ({
        ...prev,
        imageSuggestions: suggestions
      }));
    } catch (error) {
      console.error('Error generating image suggestions:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Formulario de generación */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-600" />
            Generador de Noticias con IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Categoría */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoría</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.slug} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Longitud */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Longitud</label>
                <Select
                  value={formData.length}
                  onValueChange={(value: 'short' | 'medium' | 'long') =>
                    setFormData(prev => ({ ...prev, length: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Corta (400-600 palabras)</SelectItem>
                    <SelectItem value="medium">Media (800-1200 palabras)</SelectItem>
                    <SelectItem value="long">Larga (1500-2000 palabras)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tono */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tono</label>
                <Select
                  value={formData.tone}
                  onValueChange={(value: 'neutral' | 'formal' | 'informative') =>
                    setFormData(prev => ({ ...prev, tone: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutral">Neutral e imparcial</SelectItem>
                    <SelectItem value="formal">Formal y profesional</SelectItem>
                    <SelectItem value="informative">Informativo y detallado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Idioma */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Idioma</label>
                <Select
                  value={formData.language}
                  onValueChange={(value: 'es' | 'en' | 'pt' | 'fr' | 'it' | 'de') =>
                    setFormData(prev => ({ ...prev, language: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="it">Italiano</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Palabras clave */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Palabras clave</label>
              <div className="flex gap-2">
                <Input
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Agregar palabra clave..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                />
                <Button type="button" onClick={handleAddKeyword} variant="outline">
                  Agregar
                </Button>
              </div>
              {formData.keywords && formData.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveKeyword(keyword)}
                    >
                      {keyword} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Generando noticia...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generar Noticia con IA
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Resultado generado */}
      {generatedNews && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              Noticia Generada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Título y meta */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{generatedNews.title}</h2>
                <p className="text-gray-600 mt-2">{generatedNews.excerpt}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">SEO Title: {generatedNews.seoTitle}</Badge>
                <Badge variant="outline">Categoría: {generatedNews.category}</Badge>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Palabras clave SEO:</p>
                <div className="flex flex-wrap gap-2">
                  {generatedNews.keywords.map((keyword: string) => (
                    <Badge key={keyword} variant="secondary">{keyword}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {generatedNews.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">#{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: generatedNews.content }} />
            </div>

            {/* Acciones adicionales */}
            <div className="flex flex-wrap gap-4 pt-6 border-t">
              <Button onClick={handleGenerateImages} variant="outline">
                <ImageIcon className="w-4 h-4 mr-2" />
                Generar Imágenes
              </Button>

              <Button onClick={() => handleTranslate('en')} variant="outline">
                <Globe className="w-4 h-4 mr-2" />
                Traducir a Inglés
              </Button>

              <Button onClick={() => handleTranslate('pt')} variant="outline">
                <Globe className="w-4 h-4 mr-2" />
                Traducir a Portugués
              </Button>
            </div>

            {/* Sugerencias de imágenes */}
            {generatedNews.imageSuggestions && (
              <div className="space-y-2">
                <h4 className="font-medium">Sugerencias de Imágenes:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {generatedNews.imageSuggestions.map((suggestion: string, index: number) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Traducciones */}
            {generatedNews.translations && (
              <div className="space-y-4">
                <h4 className="font-medium">Traducciones:</h4>
                {Object.entries(generatedNews.translations).map(([lang, content]) => (
                  <div key={lang} className="space-y-2">
                    <Badge variant="outline" className="capitalize">{lang}</Badge>
                    <div className="text-sm text-gray-600 max-h-32 overflow-y-auto p-2 bg-gray-50 rounded">
                      {content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
