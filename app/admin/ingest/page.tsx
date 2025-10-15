"use client";

import { useState } from "react";
import { Download, RefreshCw, CheckCircle, XCircle } from "lucide-react";

export default function IngestNewsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    results?: { processed: number; created: number; skipped: number; errors: number };
    timestamp?: string;
    error?: string;
  } | null>(null);

  const handleIngest = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/ingest-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.NEXT_PUBLIC_CRON_SECRET || "dev-secret-123",
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Ingestar Noticias</h1>
        <p className="text-zinc-400">
          Importa automáticamente noticias desde Infobae y El Perfil
        </p>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
        <h2 className="text-xl font-semibold mb-4">Fuentes Configuradas</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-black rounded-lg">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-xl">��</span>
            </div>
            <div>
              <p className="font-medium">Infobae</p>
              <p className="text-sm text-zinc-400">
                4 feeds RSS (Principal, América, Política, Economía)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-black rounded-lg">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-xl">📰</span>
            </div>
            <div>
              <p className="font-medium">El Perfil</p>
              <p className="text-sm text-zinc-400">
                3 feeds RSS (Principal, Política, Economía)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
        <h2 className="text-xl font-semibold mb-4">Proceso Automático</h2>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold">1</span>
            </div>
            <div>
              <p className="font-medium">Obtener noticias desde RSS feeds</p>
              <p className="text-sm text-zinc-400">
                Se obtienen las últimas 10 noticias de cada feed
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold">2</span>
            </div>
            <div>
              <p className="font-medium">Scraping de contenido completo</p>
              <p className="text-sm text-zinc-400">
                Si el RSS no tiene contenido completo, se hace scraping
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold">3</span>
            </div>
            <div>
              <p className="font-medium">Procesamiento con IA (OpenAI)</p>
              <p className="text-sm text-zinc-400">
                Reescritura, generación de extracto, categorización, tags
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold">4</span>
            </div>
            <div>
              <p className="font-medium">Publicación automática</p>
              <p className="text-sm text-zinc-400">
                Los artículos se publican automáticamente como PUBLISHED
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleIngest}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 disabled:cursor-not-allowed rounded-lg font-medium transition"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Procesando noticias...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Ejecutar Ingesta Manual
            </>
          )}
        </button>

        <p className="text-sm text-zinc-500 mt-3 text-center">
          También se ejecuta automáticamente cada 2 horas vía Cron Job
        </p>
      </div>

      {result && (
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Resultado</h2>
          
          {result.success ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Ingesta completada exitosamente</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-blue-400">
                    {result.results?.processed || 0}
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">Procesados</p>
                </div>
                <div className="bg-black rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-green-400">
                    {result.results?.created || 0}
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">Creados</p>
                </div>
                <div className="bg-black rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-yellow-400">
                    {result.results?.skipped || 0}
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">Omitidos</p>
                </div>
                <div className="bg-black rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-red-400">
                    {result.results?.errors || 0}
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">Errores</p>
                </div>
              </div>

              <p className="text-sm text-zinc-400">
                Timestamp: {result.timestamp ? new Date(result.timestamp).toLocaleString("es-AR") : "N/A"}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-400">
              <XCircle className="w-5 h-5" />
              <div>
                <p className="font-medium">Error en la ingesta</p>
                <p className="text-sm text-zinc-400 mt-1">
                  {result.error || "Error desconocido"}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
