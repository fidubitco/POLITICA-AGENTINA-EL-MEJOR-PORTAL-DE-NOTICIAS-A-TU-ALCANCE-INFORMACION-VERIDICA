"use client";

import { useState, useEffect } from "react";
import { Plus, Download, Upload, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewsTable } from "@/components/admin/NewsTable";
import { StatsCard } from "@/components/admin/StatsCard";
import { useRouter } from "next/navigation";

/**
 * News Management Page
 * Complete news article management with table view, search, filter, and actions
 */
export default function NoticiasPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load news from seed data
  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch('/data/news-seed.json');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Calculate stats
  const totalNews = articles.length;
  const featuredNews = articles.filter(a => a.featured).length;
  const publishedToday = articles.filter(a => {
    const publishDate = new Date(a.publishedAt);
    const today = new Date();
    return publishDate.toDateString() === today.toDateString();
  }).length;

  const categories = new Set(articles.map(a => a.category));
  const totalCategories = categories.size;

  // Actions
  const handleView = (id: number) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      window.open(`/noticia/${article.slug}`, '_blank');
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/posts/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    // In a real app, this would delete from database
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const handleNewArticle = () => {
    router.push('/admin/posts/new');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(articles, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `noticias-export-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Gestión de Noticias
          </h1>
          <p className="text-zinc-500 mt-2">
            Administra, edita y publica artículos del portal
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="border-zinc-800 hover:bg-zinc-800"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button
            onClick={handleNewArticle}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Noticia
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Noticias"
          value={totalNews}
          icon={Newspaper}
          color="text-blue-500"
          bgColor="bg-blue-500/10"
          change="+12%"
          trend="up"
        />
        <StatsCard
          title="Publicadas Hoy"
          value={publishedToday}
          icon={Upload}
          color="text-green-500"
          bgColor="bg-green-500/10"
          change="+5"
          trend="up"
        />
        <StatsCard
          title="Destacadas"
          value={featuredNews}
          icon={Plus}
          color="text-yellow-500"
          bgColor="bg-yellow-500/10"
          description={`${((featuredNews / totalNews) * 100).toFixed(0)}% del total`}
        />
        <StatsCard
          title="Categorías"
          value={totalCategories}
          icon={Newspaper}
          color="text-purple-500"
          bgColor="bg-purple-500/10"
          description="Categorías activas"
        />
      </div>

      {/* News Table */}
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="flex items-center gap-3">
            <Newspaper className="w-6 h-6 text-blue-500" />
            Todas las Noticias
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <NewsTable
            articles={articles}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
