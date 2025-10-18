"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Zap,
  FileText,
  Settings,
  Check,
  Save,
  Send,
  Loader2,
  AlertCircle,
  TrendingUp,
  Target,
  Wand2,
  Globe,
  Languages,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { SUPPORTED_LOCALES, TIER_1_LOCALES } from "@/config/locales";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ArticleGeneratorEnhancedProps {
  categories: Category[];
}

interface GeneratedArticle {
  title: string;
  excerpt: string;
  content: string;
  suggestedTags: string[];
  metaTitle: string;
  metaDescription: string;
  generatedAt: string;
}

interface TranslationStatus {
  locale: string;
  status: 'pending' | 'translating' | 'completed' | 'error';
  translationId?: string;
  error?: string;
}

export default function ArticleGeneratorEnhanced({ categories }: ArticleGeneratorEnhancedProps) {
  const router = useRouter();

  // Form State
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState<"formal" | "neutral" | "informal">("neutral");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [categoryId, setCategoryId] = useState("");
  const [seoOptimized, setSeoOptimized] = useState(true);

  // Multi-language options
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [selectedLocales, setSelectedLocales] = useState<string[]>([]);

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);
  const [savedPostId, setSavedPostId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Translation State
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState<TranslationStatus[]>([]);

  // Saving State
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Por favor ingresa un tema para el artículo");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedArticle(null);
    setSavedPostId(null);

    try {
      // Build comprehensive prompt for article generation
      const wordCount = length === 'short' ? 400 : length === 'medium' ? 800 : 1500;
      const prompt = `Write a ${tone} news article about: "${topic}"

Requirements:
- Length: approximately ${wordCount} words
- Tone: ${tone}
- Category: ${categories.find(c => c.id === categoryId)?.name || 'General'}
- Keywords to include: ${keywords || 'relevant political terms'}
- ${seoOptimized ? 'Optimize for SEO with clear structure and headings' : ''}

Please structure the article with:
1. Compelling title
2. Brief excerpt (2-3 sentences)
3. Full article content in HTML format with <h2>, <h3>, <p>, <strong>, etc.
4. 5-7 relevant tags
5. SEO meta title (60 chars max)
6. SEO meta description (155 chars max)

Return ONLY a JSON object with this exact structure:
{
  "title": "Article title here",
  "excerpt": "Brief summary here",
  "content": "<h2>Section</h2><p>Content here...</p>",
  "suggestedTags": ["tag1", "tag2", "tag3"],
  "metaTitle": "SEO title",
  "metaDescription": "SEO description"
}`;

      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          model: 'reasoning', // High-quality generation
          options: { temperature: 0.7 }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al generar el artículo");
      }

      // Parse the AI response
      const cleanedResponse = data.response
        .trim()
        .replace(/^```json\n/, '')
        .replace(/\n```$/, '')
        .trim();

      const article = JSON.parse(cleanedResponse);

      setGeneratedArticle({
        ...article,
        generatedAt: new Date().toISOString()
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (status: "DRAFT" | "PUBLISHED") => {
    if (!generatedArticle) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: generatedArticle.title,
          excerpt: generatedArticle.excerpt,
          content: { html: generatedArticle.content },
          categoryId: categoryId || null,
          tags: generatedArticle.suggestedTags,
          metaTitle: generatedArticle.metaTitle,
          metaDesc: generatedArticle.metaDescription,
          status,
          publishedAt: status === "PUBLISHED" ? new Date().toISOString() : null,
          originalLang: 'es'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al guardar el artículo");
      }

      setSavedPostId(data.post.id);

      // If auto-translate is enabled, start translation
      if (autoTranslate && selectedLocales.length > 0) {
        await handleAutoTranslate(data.post.id);
      } else {
        // Redirect if not translating
        if (status === "PUBLISHED") {
          router.push("/admin/posts");
        } else {
          router.push(`/admin/posts/${data.post.id}/edit`);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAutoTranslate = async (postId: string) => {
    setIsTranslating(true);
    setTranslationProgress(
      selectedLocales.map(locale => ({
        locale,
        status: 'pending'
      }))
    );

    // Translate to each selected language
    for (let i = 0; i < selectedLocales.length; i++) {
      const locale = selectedLocales[i];

      // Update status to translating
      setTranslationProgress(prev =>
        prev.map(t => t.locale === locale ? { ...t, status: 'translating' } : t)
      );

      try {
        const response = await fetch("/api/posts/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId,
            targetLang: locale,
            quality: 'high'
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Failed to translate to ${locale}`);
        }

        // Update status to completed
        setTranslationProgress(prev =>
          prev.map(t => t.locale === locale
            ? { ...t, status: 'completed', translationId: data.translation.id }
            : t
          )
        );
      } catch (err) {
        // Update status to error
        setTranslationProgress(prev =>
          prev.map(t => t.locale === locale
            ? { ...t, status: 'error', error: err instanceof Error ? err.message : 'Unknown error' }
            : t
          )
        );
      }
    }

    setIsTranslating(false);

    // Show completion message
    setTimeout(() => {
      router.push("/admin/posts");
    }, 3000);
  };

  const toggleLocale = (localeCode: string) => {
    if (selectedLocales.includes(localeCode)) {
      setSelectedLocales(selectedLocales.filter(l => l !== localeCode));
    } else {
      setSelectedLocales([...selectedLocales, localeCode]);
    }
  };

  const tones = [
    { value: "formal", label: "Formal", icon: FileText, desc: "Estilo académico y profesional" },
    { value: "neutral", label: "Neutral", icon: Target, desc: "Objetivo y equilibrado" },
    { value: "informal", label: "Cercano", icon: Sparkles, desc: "Amigable y accesible" },
  ];

  const lengths = [
    { value: "short", label: "Corto", words: "~400 palabras", icon: Zap },
    { value: "medium", label: "Medio", words: "~800 palabras", icon: FileText },
    { value: "long", label: "Largo", words: "~1500 palabras", icon: TrendingUp },
  ];

  const tier1Locales = SUPPORTED_LOCALES.filter(l => l.tier === 1 && l.code !== 'es');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left Panel - Configuration */}
      <div className="lg:col-span-2 space-y-6">

        {/* Main Configuration Card */}
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-purple-500" />
              Configuración
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">

            {/* Topic Input */}
            <div>
              <label className="block text-sm font-bold mb-3 text-zinc-300">
                Tema del Artículo *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ej: Nuevas medidas económicas del gobierno argentino"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              />
            </div>

            {/* Keywords Input */}
            <div>
              <label className="block text-sm font-bold mb-3 text-zinc-300">
                Palabras Clave (separadas por comas)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="economía, inflación, dólar, medidas"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              />
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-sm font-bold mb-3 text-zinc-300">
                Categoría
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              >
                <option value="">Sin categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tone Selection */}
            <div>
              <label className="block text-sm font-bold mb-3 text-zinc-300">
                Tono del Artículo
              </label>
              <div className="grid grid-cols-3 gap-3">
                {tones.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value as any)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      tone === t.value
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-zinc-800 hover:border-zinc-700 bg-zinc-950"
                    }`}
                  >
                    <t.icon className={`w-5 h-5 mx-auto mb-2 ${tone === t.value ? "text-purple-400" : "text-zinc-500"}`} />
                    <p className={`text-xs font-bold ${tone === t.value ? "text-purple-300" : "text-zinc-400"}`}>
                      {t.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Length Selection */}
            <div>
              <label className="block text-sm font-bold mb-3 text-zinc-300">
                Extensión
              </label>
              <div className="space-y-2">
                {lengths.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLength(l.value as any)}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      length === l.value
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-zinc-800 hover:border-zinc-700 bg-zinc-950"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <l.icon className={`w-5 h-5 ${length === l.value ? "text-purple-400" : "text-zinc-500"}`} />
                      <div className="text-left">
                        <p className={`font-bold text-sm ${length === l.value ? "text-purple-300" : "text-zinc-300"}`}>
                          {l.label}
                        </p>
                        <p className="text-xs text-zinc-500">{l.words}</p>
                      </div>
                    </div>
                    {length === l.value && (
                      <Check className="w-5 h-5 text-purple-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* SEO Toggle */}
            <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-bold text-sm">Optimización SEO</p>
                  <p className="text-xs text-zinc-500">Keywords y meta tags</p>
                </div>
              </div>
              <button
                onClick={() => setSeoOptimized(!seoOptimized)}
                className={`w-12 h-6 rounded-full transition-all ${
                  seoOptimized ? "bg-green-600" : "bg-zinc-700"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    seoOptimized ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

          </CardContent>
        </Card>

        {/* Multi-language Translation Card */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-800">
          <CardHeader className="border-b border-blue-800">
            <CardTitle className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-400" />
              Traducción Automática
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-bold text-sm">Auto-traducir al guardar</p>
                  <p className="text-xs text-zinc-500">Traducir a {selectedLocales.length} idiomas</p>
                </div>
              </div>
              <button
                onClick={() => setAutoTranslate(!autoTranslate)}
                className={`w-12 h-6 rounded-full transition-all ${
                  autoTranslate ? "bg-blue-600" : "bg-zinc-700"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    autoTranslate ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {autoTranslate && (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-zinc-400">
                  SELECCIONA IDIOMAS (Tier 1 - Principales):
                </p>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {tier1Locales.map(locale => (
                    <button
                      key={locale.code}
                      onClick={() => toggleLocale(locale.code)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedLocales.includes(locale.code)
                          ? "border-blue-500 bg-blue-500/10 text-blue-300"
                          : "border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400"
                      }`}
                    >
                      <p className="text-sm font-semibold">{locale.nativeName}</p>
                      <p className="text-xs opacity-70">{locale.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !topic.trim()}
          className="w-full py-6 text-lg font-black bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-purple-900/50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-6 h-6 mr-3 animate-spin" />
              Generando con IA...
            </>
          ) : (
            <>
              <Wand2 className="w-6 h-6 mr-3" />
              Generar Artículo
            </>
          )}
        </Button>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-red-400">Error</p>
              <p className="text-sm text-red-300/80 mt-1">{error}</p>
            </div>
          </div>
        )}

      </div>

      {/* Right Panel - Preview */}
      <div className="lg:col-span-3">
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 h-full">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-500" />
              Vista Previa
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">

            {!generatedArticle && !isGenerating && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Listo para Generar</h3>
                <p className="text-zinc-500 max-w-md">
                  Configura los parámetros y presiona "Generar Artículo"
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin" />
                  <Wand2 className="w-8 h-8 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="mt-6 text-lg font-bold">Generando con Llama 3.1...</p>
                <p className="text-sm text-zinc-500 mt-2">Esto puede tomar 10-30 segundos</p>
              </div>
            )}

            {generatedArticle && !isTranslating && (
              <div className="space-y-6">
                <div className="space-y-4 pb-6 border-b border-zinc-800">
                  <h2 className="text-3xl font-black leading-tight">
                    {generatedArticle.title}
                  </h2>
                  <p className="text-lg text-zinc-400 leading-relaxed">
                    {generatedArticle.excerpt}
                  </p>
                  {generatedArticle.suggestedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {generatedArticle.suggestedTags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className="prose prose-invert prose-zinc max-w-none"
                  dangerouslySetInnerHTML={{ __html: generatedArticle.content }}
                />

                {seoOptimized && (
                  <div className="mt-8 p-6 bg-green-900/10 border border-green-900/30 rounded-xl space-y-3">
                    <p className="font-bold text-green-400 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Optimización SEO
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-zinc-500 font-semibold">Meta Title:</p>
                        <p className="text-zinc-300">{generatedArticle.metaTitle}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 font-semibold">Meta Description:</p>
                        <p className="text-zinc-300">{generatedArticle.metaDescription}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-6 border-t border-zinc-800">
                  <Button
                    onClick={() => handleSave("DRAFT")}
                    disabled={isSaving}
                    variant="outline"
                    className="flex-1 py-6 font-bold"
                  >
                    {isSaving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                    Guardar Borrador
                  </Button>
                  <Button
                    onClick={() => handleSave("PUBLISHED")}
                    disabled={isSaving}
                    className="flex-1 py-6 font-bold bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    {isSaving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                    Publicar
                  </Button>
                </div>
              </div>
            )}

            {/* Translation Progress */}
            {isTranslating && (
              <div className="space-y-4 py-8">
                <div className="text-center mb-8">
                  <Globe className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold mb-2">Traduciendo artículo...</h3>
                  <p className="text-zinc-400">Generando versiones en {selectedLocales.length} idiomas</p>
                </div>

                <div className="space-y-3">
                  {translationProgress.map(trans => {
                    const locale = SUPPORTED_LOCALES.find(l => l.code === trans.locale);
                    return (
                      <div key={trans.locale} className="flex items-center justify-between p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{locale?.nativeName}</span>
                          <span className="text-sm text-zinc-500">({locale?.name})</span>
                        </div>
                        <div>
                          {trans.status === 'pending' && (
                            <Badge variant="secondary">Pendiente</Badge>
                          )}
                          {trans.status === 'translating' && (
                            <Badge className="bg-blue-600">
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                              Traduciendo...
                            </Badge>
                          )}
                          {trans.status === 'completed' && (
                            <Badge className="bg-green-600">
                              <Check className="w-3 h-3 mr-1" />
                              Completado
                            </Badge>
                          )}
                          {trans.status === 'error' && (
                            <Badge variant="destructive">Error</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </CardContent>
        </Card>
      </div>

    </div>
  );
}
