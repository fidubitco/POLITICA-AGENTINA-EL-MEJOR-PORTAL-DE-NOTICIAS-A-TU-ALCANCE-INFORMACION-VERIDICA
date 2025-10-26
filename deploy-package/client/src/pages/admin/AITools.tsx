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
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { AlignLeft, Copy, FileText, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AITools() {
  const [activeTab, setActiveTab] = useState("summarize");
  
  // Summarize State
  const [summarizeTitle, setSummarizeTitle] = useState("");
  const [summarizeContent, setSummarizeContent] = useState("");
  const [summarizeLength, setSummarizeLength] = useState<"short" | "medium" | "long">("medium");
  
  // Rewrite Style State
  const [rewriteTitle, setRewriteTitle] = useState("");
  const [rewriteContent, setRewriteContent] = useState("");
  const [rewriteStyle, setRewriteStyle] = useState<"formal" | "casual" | "technical" | "sensationalist" | "neutral">("neutral");
  
  // Variations State
  const [variationsTitle, setVariationsTitle] = useState("");
  const [variationsContent, setVariationsContent] = useState("");
  const [variationsCount, setVariationsCount] = useState(3);
  
  // Result State
  const [result, setResult] = useState<any>(null);
  
  const summarizeMutation = trpc.ai.summarizeArticle.useMutation({
    onSuccess: (data) => {
      setResult(data);
      toast.success("¡Artículo resumido exitosamente!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
  
  const rewriteStyleMutation = trpc.ai.rewriteWithStyle.useMutation({
    onSuccess: (data) => {
      setResult(data);
      toast.success("¡Artículo reescrito con nuevo estilo!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
  
  const variationsMutation = trpc.ai.generateVariations.useMutation({
    onSuccess: (data) => {
      setResult(data);
      toast.success(`¡${data.length} variaciones generadas!`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
  
  const handleSummarize = () => {
    if (!summarizeTitle || !summarizeContent) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    
    summarizeMutation.mutate({
      title: summarizeTitle,
      content: summarizeContent,
      targetLength: summarizeLength,
    });
  };
  
  const handleRewriteStyle = () => {
    if (!rewriteTitle || !rewriteContent) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    
    rewriteStyleMutation.mutate({
      title: rewriteTitle,
      content: rewriteContent,
      style: rewriteStyle,
    });
  };
  
  const handleGenerateVariations = () => {
    if (!variationsTitle || !variationsContent) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    
    variationsMutation.mutate({
      title: variationsTitle,
      content: variationsContent,
      numberOfVariations: variationsCount,
    });
  };
  
  const isLoading = summarizeMutation.isPending || rewriteStyleMutation.isPending || variationsMutation.isPending;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado al portapapeles");
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8" />
            Herramientas Avanzadas de IA
          </h1>
          <p className="text-muted-foreground mt-1">
            Resumir, reescribir y generar variaciones de contenido con inteligencia artificial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Herramientas de Procesamiento
                </CardTitle>
                <CardDescription>
                  Selecciona una herramienta y procesa tu contenido
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="summarize">
                      <AlignLeft className="h-4 w-4 mr-2" />
                      Resumir
                    </TabsTrigger>
                    <TabsTrigger value="rewrite">
                      <FileText className="h-4 w-4 mr-2" />
                      Reescribir
                    </TabsTrigger>
                    <TabsTrigger value="variations">
                      <Copy className="h-4 w-4 mr-2" />
                      Variaciones
                    </TabsTrigger>
                  </TabsList>

                  {/* Summarize Tab */}
                  <TabsContent value="summarize" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="summarize-title">Título del Artículo *</Label>
                      <Input
                        id="summarize-title"
                        placeholder="Título del artículo a resumir"
                        value={summarizeTitle}
                        onChange={(e) => setSummarizeTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="summarize-content">Contenido Completo *</Label>
                      <Textarea
                        id="summarize-content"
                        placeholder="Pega aquí el contenido completo del artículo..."
                        value={summarizeContent}
                        onChange={(e) => setSummarizeContent(e.target.value)}
                        rows={10}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="summarize-length">Longitud del Resumen</Label>
                      <Select value={summarizeLength} onValueChange={(v: any) => setSummarizeLength(v)}>
                        <SelectTrigger id="summarize-length">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Corto (50-75 palabras)</SelectItem>
                          <SelectItem value="medium">Medio (100-150 palabras)</SelectItem>
                          <SelectItem value="long">Largo (200-300 palabras)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button onClick={handleSummarize} disabled={isLoading} className="w-full">
                      {isLoading ? "Resumiendo..." : "Resumir Artículo"}
                    </Button>
                  </TabsContent>

                  {/* Rewrite Style Tab */}
                  <TabsContent value="rewrite" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rewrite-title">Título del Artículo *</Label>
                      <Input
                        id="rewrite-title"
                        placeholder="Título del artículo"
                        value={rewriteTitle}
                        onChange={(e) => setRewriteTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rewrite-content">Contenido *</Label>
                      <Textarea
                        id="rewrite-content"
                        placeholder="Contenido del artículo a reescribir..."
                        value={rewriteContent}
                        onChange={(e) => setRewriteContent(e.target.value)}
                        rows={10}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rewrite-style">Estilo de Escritura</Label>
                      <Select value={rewriteStyle} onValueChange={(v: any) => setRewriteStyle(v)}>
                        <SelectTrigger id="rewrite-style">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="formal">Formal (Académico)</SelectItem>
                          <SelectItem value="casual">Casual (Conversacional)</SelectItem>
                          <SelectItem value="technical">Técnico (Especializado)</SelectItem>
                          <SelectItem value="sensationalist">Sensacionalista (Impactante)</SelectItem>
                          <SelectItem value="neutral">Neutral (Agencia)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button onClick={handleRewriteStyle} disabled={isLoading} className="w-full">
                      {isLoading ? "Reescribiendo..." : "Reescribir con Estilo"}
                    </Button>
                  </TabsContent>

                  {/* Variations Tab */}
                  <TabsContent value="variations" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="variations-title">Título del Artículo *</Label>
                      <Input
                        id="variations-title"
                        placeholder="Título del artículo"
                        value={variationsTitle}
                        onChange={(e) => setVariationsTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="variations-content">Contenido *</Label>
                      <Textarea
                        id="variations-content"
                        placeholder="Contenido del artículo..."
                        value={variationsContent}
                        onChange={(e) => setVariationsContent(e.target.value)}
                        rows={10}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="variations-count">Número de Variaciones (1-5)</Label>
                      <Input
                        id="variations-count"
                        type="number"
                        min="1"
                        max="5"
                        value={variationsCount}
                        onChange={(e) => setVariationsCount(parseInt(e.target.value) || 3)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Genera múltiples versiones únicas del mismo artículo
                      </p>
                    </div>
                    
                    <Button onClick={handleGenerateVariations} disabled={isLoading} className="w-full">
                      {isLoading ? "Generando..." : "Generar Variaciones"}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Result Section */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Resultado
                </CardTitle>
                <CardDescription>
                  El contenido procesado aparecerá aquí
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {/* Summarize Result */}
                    {result.summary && result.keyPoints && (
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-xs text-muted-foreground">Resumen</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(result.summary)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm">{result.summary}</p>
                          <Badge variant="secondary" className="mt-2">
                            {result.wordCount} palabras
                          </Badge>
                        </div>
                        
                        <div>
                          <Label className="text-xs text-muted-foreground">Puntos Clave</Label>
                          <ul className="text-sm mt-2 space-y-1">
                            {result.keyPoints.map((point: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    {/* Rewrite Style Result */}
                    {result.title && result.content && !Array.isArray(result) && !result.keyPoints && (
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-xs text-muted-foreground">Título</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(result.title)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-semibold">{result.title}</p>
                        </div>
                        
                        {result.summary && (
                          <div>
                            <Label className="text-xs text-muted-foreground">Resumen</Label>
                            <p className="text-sm mt-1">{result.summary}</p>
                          </div>
                        )}
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-xs text-muted-foreground">Contenido</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(result.content)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <div 
                            className="text-sm prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: result.content.substring(0, 500) + "..." }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Variations Result */}
                    {Array.isArray(result) && (
                      <div className="space-y-4">
                        {result.map((variation: any, index: number) => (
                          <Card key={index}>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm flex items-center justify-between">
                                <span>Variación {variation.variation}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(`${variation.title}\n\n${variation.content}`)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div>
                                <Label className="text-xs text-muted-foreground">Título</Label>
                                <p className="text-sm font-semibold">{variation.title}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Resumen</Label>
                                <p className="text-xs">{variation.summary}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Usa las herramientas para procesar contenido
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

