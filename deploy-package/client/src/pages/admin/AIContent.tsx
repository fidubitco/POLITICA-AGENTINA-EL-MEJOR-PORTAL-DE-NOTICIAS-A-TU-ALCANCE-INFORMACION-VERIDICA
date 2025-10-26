import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Bot, FileText, Globe, Link2, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AIContent() {
  const [activeTab, setActiveTab] = useState("generate");
  
  // Generate Article State
  const [generateTopic, setGenerateTopic] = useState("");
  const [generateCategory, setGenerateCategory] = useState("");
  const [generateLanguage, setGenerateLanguage] = useState("es");
  
  // Rewrite Article State
  const [rewriteTitle, setRewriteTitle] = useState("");
  const [rewriteContent, setRewriteContent] = useState("");
  const [rewriteCategory, setRewriteCategory] = useState("");
  
  // From URL State
  const [urlInput, setUrlInput] = useState("");
  const [urlCategory, setUrlCategory] = useState("");
  
  // Result State
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  
  const { data: categories } = trpc.categories.getActive.useQuery();
  
  const generateMutation = trpc.ai.generateArticle.useMutation({
    onSuccess: (data) => {
      setGeneratedContent(data);
      toast.success("¡Artículo generado exitosamente!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
  
  const rewriteMutation = trpc.ai.rewriteArticle.useMutation({
    onSuccess: (data) => {
      setGeneratedContent(data);
      toast.success("¡Artículo reescrito exitosamente!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
  
  const fromUrlMutation = trpc.ai.generateFromUrl.useMutation({
    onSuccess: (data) => {
      setGeneratedContent(data);
      toast.success("¡Artículo generado desde URL exitosamente!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
  
  const handleGenerate = () => {
    if (!generateTopic || !generateCategory) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }
    
    generateMutation.mutate({
      topic: generateTopic,
      category: generateCategory,
      language: generateLanguage,
    });
  };
  
  const handleRewrite = () => {
    if (!rewriteTitle || !rewriteContent || !rewriteCategory) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }
    
    rewriteMutation.mutate({
      originalTitle: rewriteTitle,
      originalContent: rewriteContent,
      category: rewriteCategory,
      language: generateLanguage,
    });
  };
  
  const handleFromUrl = () => {
    if (!urlInput || !urlCategory) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }
    
    fromUrlMutation.mutate({
      url: urlInput,
      category: urlCategory,
      language: generateLanguage,
    });
  };
  
  const isLoading = generateMutation.isPending || rewriteMutation.isPending || fromUrlMutation.isPending;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold flex items-center gap-2">
            <Bot className="h-8 w-8" />
            Generación de Contenido con IA
          </h1>
          <p className="text-muted-foreground mt-1">
            Genera, reescribe y traduce contenido automáticamente usando inteligencia artificial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Herramientas de IA
                </CardTitle>
                <CardDescription>
                  Selecciona una herramienta y completa los campos para generar contenido
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="generate">
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generar
                    </TabsTrigger>
                    <TabsTrigger value="rewrite">
                      <FileText className="h-4 w-4 mr-2" />
                      Reescribir
                    </TabsTrigger>
                    <TabsTrigger value="url">
                      <Link2 className="h-4 w-4 mr-2" />
                      Desde URL
                    </TabsTrigger>
                  </TabsList>

                  {/* Generate Tab */}
                  <TabsContent value="generate" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="generate-topic">Tema del Artículo *</Label>
                      <Input
                        id="generate-topic"
                        placeholder="Ej: Reforma económica de Javier Milei 2025"
                        value={generateTopic}
                        onChange={(e) => setGenerateTopic(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="generate-category">Categoría *</Label>
                        <Select value={generateCategory} onValueChange={setGenerateCategory}>
                          <SelectTrigger id="generate-category">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.map((cat) => (
                              <SelectItem key={cat.id} value={cat.slug}>
                                {cat.slug}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="generate-language">Idioma</Label>
                        <Select value={generateLanguage} onValueChange={setGenerateLanguage}>
                          <SelectTrigger id="generate-language">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="pt">Português</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                      {isLoading ? "Generando..." : "Generar Artículo"}
                    </Button>
                  </TabsContent>

                  {/* Rewrite Tab */}
                  <TabsContent value="rewrite" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rewrite-title">Título Original *</Label>
                      <Input
                        id="rewrite-title"
                        placeholder="Título del artículo a reescribir"
                        value={rewriteTitle}
                        onChange={(e) => setRewriteTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rewrite-content">Contenido Original *</Label>
                      <Textarea
                        id="rewrite-content"
                        placeholder="Pega aquí el contenido del artículo que deseas reescribir..."
                        value={rewriteContent}
                        onChange={(e) => setRewriteContent(e.target.value)}
                        rows={8}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rewrite-category">Categoría *</Label>
                      <Select value={rewriteCategory} onValueChange={setRewriteCategory}>
                        <SelectTrigger id="rewrite-category">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((cat) => (
                            <SelectItem key={cat.id} value={cat.slug}>
                              {cat.slug}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button onClick={handleRewrite} disabled={isLoading} className="w-full">
                      {isLoading ? "Reescribiendo..." : "Reescribir Artículo"}
                    </Button>
                  </TabsContent>

                  {/* From URL Tab */}
                  <TabsContent value="url" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="url-input">URL del Artículo *</Label>
                      <Input
                        id="url-input"
                        type="url"
                        placeholder="https://ejemplo.com/noticia"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        La IA extraerá el contenido de la URL y lo reescribirá profesionalmente
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="url-category">Categoría *</Label>
                      <Select value={urlCategory} onValueChange={setUrlCategory}>
                        <SelectTrigger id="url-category">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((cat) => (
                            <SelectItem key={cat.id} value={cat.slug}>
                              {cat.slug}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button onClick={handleFromUrl} disabled={isLoading} className="w-full">
                      {isLoading ? "Procesando..." : "Generar desde URL"}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Result Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Resultado
                </CardTitle>
                <CardDescription>
                  El contenido generado aparecerá aquí
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Título</Label>
                      <p className="font-semibold mt-1">{generatedContent.title}</p>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-muted-foreground">Resumen</Label>
                      <p className="text-sm mt-1">{generatedContent.summary}</p>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-muted-foreground">Contenido</Label>
                      <div 
                        className="text-sm mt-1 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: generatedContent.content.substring(0, 300) + "..." }}
                      />
                    </div>
                    
                    {generatedContent.tags && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Tags</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {generatedContent.tags.map((tag: string, i: number) => (
                            <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast.info("Función de guardado en desarrollo");
                    }}>
                      Guardar como Artículo
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Usa las herramientas de IA para generar contenido
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Generar Artículo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Crea artículos completamente nuevos desde un tema. La IA investigará y escribirá contenido original.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Reescribir Contenido</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Reescribe artículos existentes para evitar plagio. Mantiene los hechos pero cambia completamente la redacción.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Desde URL</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Extrae contenido de URLs de competidores y lo reescribe profesionalmente con tu propio estilo.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

