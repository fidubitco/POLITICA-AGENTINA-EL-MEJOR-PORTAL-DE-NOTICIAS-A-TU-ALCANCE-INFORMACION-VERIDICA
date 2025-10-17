import PageBuilderClient from "./PageBuilderClient";

export default function PageBuilderPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Editor Visual de Páginas
          </h1>
          <p className="text-zinc-500 mt-2">
            Construye páginas increíbles con drag & drop
          </p>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-sm">
          Visual Builder
        </div>
      </div>

      {/* Client Component */}
      <PageBuilderClient />
    </div>
  );
}
