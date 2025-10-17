"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdvancedEditor from "@/components/AdvancedEditor";
import { FileText, Save, Eye, Send, Sparkles } from "lucide-react";

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = () => {
    console.log("Saving:", { title, content });
    alert("¡Artículo guardado exitosamente!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Editor Avanzado
          </h1>
          <p className="text-zinc-500 mt-2">
            Editor WYSIWYG profesional tipo Notion
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="border-zinc-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? "Editar" : "Preview"}
          </Button>
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4 mr-2" />
            Publicar
          </Button>
        </div>
      </div>

      {/* Editor Card */}
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título del artículo..."
              className="w-full text-4xl font-black bg-transparent border-none outline-none placeholder:text-zinc-700"
            />
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Borrador
              </Badge>
              <Badge variant="outline" className="text-xs">
                {content.split(" ").filter(Boolean).length} palabras
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {!showPreview ? (
            <AdvancedEditor
              content={content}
              onChange={setContent}
              placeholder="Comienza a escribir tu artículo..."
            />
          ) : (
            <div className="p-8">
              <h1 className="text-4xl font-black mb-8">{title || "Sin título"}</h1>
              <div
                className="prose prose-invert prose-zinc max-w-none prose-headings:font-black prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-zinc-300 prose-p:leading-relaxed prose-strong:text-white prose-a:text-blue-400"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
