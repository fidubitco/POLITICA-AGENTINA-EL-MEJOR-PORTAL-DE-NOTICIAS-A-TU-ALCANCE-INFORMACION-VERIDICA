"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  Music,
  File,
  Folder,
  Search,
  Grid3x3,
  List,
  Trash2,
  Download,
  Eye,
  Copy,
  Check,
  MoreVertical,
  Filter,
} from "lucide-react";

type MediaType = "image" | "video" | "document" | "audio";

interface MediaFile {
  id: string;
  name: string;
  type: MediaType;
  url: string;
  size: number;
  uploadedAt: string;
  dimensions?: { width: number; height: number };
}

const mockFiles: MediaFile[] = [
  {
    id: "1",
    name: "hero-banner.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    size: 2457600,
    uploadedAt: "2025-10-15",
    dimensions: { width: 1920, height: 1080 },
  },
  {
    id: "2",
    name: "argentina-flag.png",
    type: "image",
    url: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800",
    size: 1024000,
    uploadedAt: "2025-10-14",
    dimensions: { width: 800, height: 600 },
  },
  {
    id: "3",
    name: "interview-video.mp4",
    type: "video",
    url: "#",
    size: 52428800,
    uploadedAt: "2025-10-13",
  },
  {
    id: "4",
    name: "report-2025.pdf",
    type: "document",
    url: "#",
    size: 512000,
    uploadedAt: "2025-10-12",
  },
  {
    id: "5",
    name: "congress-debate.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1541872703-74c34d2b6f4c?w=800",
    size: 3145728,
    uploadedAt: "2025-10-11",
    dimensions: { width: 2000, height: 1333 },
  },
  {
    id: "6",
    name: "economic-data.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    size: 1843200,
    uploadedAt: "2025-10-10",
    dimensions: { width: 1600, height: 900 },
  },
];

const typeConfig: Record<MediaType, { icon: any; color: string; label: string }> = {
  image: { icon: ImageIcon, color: "text-blue-400 bg-blue-900/20", label: "Imagen" },
  video: { icon: Video, color: "text-purple-400 bg-purple-900/20", label: "Video" },
  document: { icon: FileText, color: "text-green-400 bg-green-900/20", label: "Documento" },
  audio: { icon: Music, color: "text-yellow-400 bg-yellow-900/20", label: "Audio" },
};

export default function MediaLibraryClient() {
  const [files, setFiles] = useState<MediaFile[]>(mockFiles);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<MediaType | "all">("all");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || file.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: files.length,
    images: files.filter((f) => f.type === "image").length,
    videos: files.filter((f) => f.type === "video").length,
    documents: files.filter((f) => f.type === "document").length,
    totalSize: files.reduce((sum, f) => sum + f.size, 0),
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                <File className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <p className="text-sm text-zinc-500 mb-1">Total Archivos</p>
            <p className="text-3xl font-black">{stats.total}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <p className="text-sm text-zinc-500 mb-1">Imágenes</p>
            <p className="text-3xl font-black">{stats.images}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
                <Video className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <p className="text-sm text-zinc-500 mb-1">Videos</p>
            <p className="text-3xl font-black">{stats.videos}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-600/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-sm text-zinc-500 mb-1">Documentos</p>
            <p className="text-3xl font-black">{stats.documents}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-600/20 flex items-center justify-center">
                <Folder className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <p className="text-sm text-zinc-500 mb-1">Espacio Usado</p>
            <p className="text-3xl font-black">{formatFileSize(stats.totalSize)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <CardTitle>Biblioteca de Archivos</CardTitle>
            <div className="flex gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar archivos..."
                  className="pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm outline-none focus:border-blue-600 w-64"
                />
              </div>

              {/* Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as MediaType | "all")}
                className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm outline-none focus:border-blue-600"
              >
                <option value="all">Todos</option>
                <option value="image">Imágenes</option>
                <option value="video">Videos</option>
                <option value="document">Documentos</option>
                <option value="audio">Audio</option>
              </select>

              {/* View Mode */}
              <div className="flex gap-1 bg-zinc-950 border border-zinc-800 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-blue-600 text-white" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-blue-600 text-white" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Upload Button */}
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Subir Archivo
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredFiles.map((file) => {
                const config = typeConfig[file.type];
                return (
                  <div
                    key={file.id}
                    className="group relative bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all cursor-pointer"
                    onClick={() => setSelectedFile(file)}
                  >
                    {/* Preview */}
                    <div className="aspect-square bg-zinc-900 flex items-center justify-center overflow-hidden">
                      {file.type === "image" ? (
                        <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                      ) : (
                        <config.icon className="w-12 h-12 text-zinc-600" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <p className="text-sm font-bold truncate mb-1">{file.name}</p>
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <span>{formatFileSize(file.size)}</span>
                        <Badge variant="secondary" className="text-xs px-2 py-0">
                          {config.label}
                        </Badge>
                      </div>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(file.url);
                        }}
                        className="p-2 bg-zinc-900/90 backdrop-blur-sm rounded-lg hover:bg-zinc-800 transition-colors"
                        title="Copiar URL"
                      >
                        {copiedUrl === file.url ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => {
                const config = typeConfig[file.type];
                return (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all cursor-pointer"
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className={`w-12 h-12 rounded-xl ${config.color} flex items-center justify-center flex-shrink-0`}>
                      <config.icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{file.name}</p>
                      <p className="text-xs text-zinc-500">
                        {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString("es-AR")}
                      </p>
                    </div>

                    <Badge variant="secondary" className="text-xs">
                      {config.label}
                    </Badge>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(file.url);
                        }}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                        title="Copiar URL"
                      >
                        {copiedUrl === file.url ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors" title="Descargar">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-900/20 text-red-400 rounded-lg transition-colors" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredFiles.length === 0 && (
            <div className="py-20 text-center">
              <File className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500">No se encontraron archivos</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Detail Modal */}
      {selectedFile && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedFile(null)}
        >
          <Card className="bg-zinc-900 border-zinc-800 w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="border-b border-zinc-800">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${typeConfig[selectedFile.type].color} flex items-center justify-center`}>
                    {(() => {
                      const Icon = typeConfig[selectedFile.type].icon;
                      return <Icon className="w-6 h-6" />;
                    })()}
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black">{selectedFile.name}</CardTitle>
                    <p className="text-sm text-zinc-500 mt-1">
                      {formatFileSize(selectedFile.size)} • {typeConfig[selectedFile.type].label}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {selectedFile.type === "image" ? (
                <div className="mb-6">
                  <img src={selectedFile.url} alt={selectedFile.name} className="w-full rounded-xl" />
                  {selectedFile.dimensions && (
                    <p className="text-xs text-zinc-500 mt-2 text-center">
                      {selectedFile.dimensions.width} × {selectedFile.dimensions.height} px
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-20 text-center mb-6">
                  {(() => {
                    const Icon = typeConfig[selectedFile.type].icon;
                    return <Icon className="w-20 h-20 text-zinc-600 mx-auto" />;
                  })()}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-bold text-zinc-500 mb-1">SUBIDO</p>
                  <p className="text-sm">{new Date(selectedFile.uploadedAt).toLocaleDateString("es-AR")}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 mb-1">TAMAÑO</p>
                  <p className="text-sm">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs font-bold text-zinc-500 mb-2">URL</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedFile.url}
                    readOnly
                    className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm"
                  />
                  <Button
                    onClick={() => copyToClipboard(selectedFile.url)}
                    variant="outline"
                    className="border-zinc-700"
                  >
                    {copiedUrl === selectedFile.url ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
                <Button variant="outline" className="flex-1 border-zinc-700">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Original
                </Button>
                <Button variant="outline" className="border-red-900/50 text-red-400 hover:bg-red-900/20">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
