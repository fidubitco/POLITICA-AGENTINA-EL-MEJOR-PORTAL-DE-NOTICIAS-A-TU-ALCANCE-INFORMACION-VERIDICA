import MediaLibraryClient from "./MediaLibraryClient";

export default function MediaLibraryPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Biblioteca de Medios
          </h1>
          <p className="text-zinc-500 mt-2">
            Gestión profesional de imágenes, videos y archivos
          </p>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-sm">
            Media Manager
          </div>
      </div>

      {/* Client Component */}
      <MediaLibraryClient />
    </div>
  );
}
