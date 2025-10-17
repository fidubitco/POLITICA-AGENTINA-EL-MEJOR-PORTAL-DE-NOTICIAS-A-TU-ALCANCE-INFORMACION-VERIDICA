"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Link2,
  Clock,
  Zap,
  RefreshCw,
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  metaTitle: string | null;
  metaDesc: string | null;
  content: any;
  excerpt: string | null;
  coverImage: string | null;
  updatedAt: Date;
}

interface SEOIssue {
  type: "error" | "warning" | "success";
  category: string;
  message: string;
  postId?: string;
  postTitle?: string;
}

interface SEOAuditorClientProps {
  latestAudit: any;
  posts: Post[];
}

export default function SEOAuditorClient({ latestAudit, posts }: SEOAuditorClientProps) {
  const [isAuditing, setIsAuditing] = useState(false);
  const [issues, setIssues] = useState<SEOIssue[]>([]);

  const runAudit = async () => {
    setIsAuditing(true);
    const foundIssues: SEOIssue[] = [];

    // Check each post for SEO issues
    posts.forEach((post) => {
      // Check title length
      if (post.title.length > 60) {
        foundIssues.push({
          type: "warning",
          category: "Título",
          message: `Título muy largo (${post.title.length} caracteres)`,
          postId: post.id,
          postTitle: post.title,
        });
      }

      if (post.title.length < 30) {
        foundIssues.push({
          type: "warning",
          category: "Título",
          message: `Título muy corto (${post.title.length} caracteres)`,
          postId: post.id,
          postTitle: post.title,
        });
      }

      // Check meta title
      if (!post.metaTitle) {
        foundIssues.push({
          type: "error",
          category: "Meta Title",
          message: "Falta meta title",
          postId: post.id,
          postTitle: post.title,
        });
      } else if (post.metaTitle.length > 60) {
        foundIssues.push({
          type: "warning",
          category: "Meta Title",
          message: `Meta title muy largo (${post.metaTitle.length} caracteres)`,
          postId: post.id,
          postTitle: post.title,
        });
      }

      // Check meta description
      if (!post.metaDesc) {
        foundIssues.push({
          type: "error",
          category: "Meta Description",
          message: "Falta meta description",
          postId: post.id,
          postTitle: post.title,
        });
      } else if (post.metaDesc.length > 160) {
        foundIssues.push({
          type: "warning",
          category: "Meta Description",
          message: `Meta description muy larga (${post.metaDesc.length} caracteres)`,
          postId: post.id,
          postTitle: post.title,
        });
      } else if (post.metaDesc.length < 120) {
        foundIssues.push({
          type: "warning",
          category: "Meta Description",
          message: `Meta description muy corta (${post.metaDesc.length} caracteres)`,
          postId: post.id,
          postTitle: post.title,
        });
      }

      // Check cover image
      if (!post.coverImage) {
        foundIssues.push({
          type: "error",
          category: "Imagen",
          message: "Falta imagen de portada",
          postId: post.id,
          postTitle: post.title,
        });
      }

      // Check excerpt
      if (!post.excerpt) {
        foundIssues.push({
          type: "warning",
          category: "Excerpt",
          message: "Falta excerpt/bajada",
          postId: post.id,
          postTitle: post.title,
        });
      }

      // Check content length
      const contentText = typeof post.content === 'string' ? post.content : JSON.stringify(post.content);
      const wordCount = contentText.split(/\s+/).length;

      if (wordCount < 300) {
        foundIssues.push({
          type: "warning",
          category: "Contenido",
          message: `Contenido muy corto (${wordCount} palabras)`,
          postId: post.id,
          postTitle: post.title,
        });
      }

      // Check if post is stale (not updated in 90 days)
      const daysSinceUpdate = Math.floor(
        (Date.now() - new Date(post.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceUpdate > 90) {
        foundIssues.push({
          type: "warning",
          category: "Freshness",
          message: `No actualizado en ${daysSinceUpdate} días`,
          postId: post.id,
          postTitle: post.title,
        });
      }
    });

    setIssues(foundIssues);
    setIsAuditing(false);
  };

  const errorIssues = issues.filter((i) => i.type === "error");
  const warningIssues = issues.filter((i) => i.type === "warning");
  const totalPosts = posts.length;
  const healthyPosts = totalPosts - new Set(issues.map((i) => i.postId)).size;
  const seoScore = totalPosts > 0 ? Math.round((healthyPosts / totalPosts) * 100) : 0;

  const stats = [
    {
      label: "SEO Score",
      value: `${seoScore}%`,
      icon: TrendingUp,
      color: seoScore > 80 ? "text-green-400" : seoScore > 60 ? "text-yellow-400" : "text-red-400",
      bgColor: seoScore > 80 ? "bg-green-900/20" : seoScore > 60 ? "bg-yellow-900/20" : "bg-red-900/20",
    },
    {
      label: "Posts Analizados",
      value: totalPosts,
      icon: FileText,
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
    },
    {
      label: "Errores Críticos",
      value: errorIssues.length,
      icon: AlertCircle,
      color: "text-red-400",
      bgColor: "bg-red-900/20",
    },
    {
      label: "Advertencias",
      value: warningIssues.length,
      icon: AlertTriangle,
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
    },
  ];

  const issuesByCategory = issues.reduce((acc, issue) => {
    if (!acc[issue.category]) {
      acc[issue.category] = [];
    }
    acc[issue.category].push(issue);
    return acc;
  }, {} as Record<string, SEOIssue[]>);

  return (
    <div className="space-y-8">
      {/* Audit Button */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-900/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black mb-2">Ejecutar Auditoría SEO</h3>
              <p className="text-sm text-zinc-400">
                Analiza todos los artículos publicados en busca de problemas de SEO
              </p>
            </div>
            <Button
              onClick={runAudit}
              disabled={isAuditing}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isAuditing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Auditando...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Ejecutar Auditoría
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {issues.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-sm text-zinc-500 mb-1">{stat.label}</p>
                <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Issues by Category */}
      {issues.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(issuesByCategory).map(([category, categoryIssues]) => (
            <Card key={category} className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
              <CardHeader className="border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    {category === "Título" && <FileText className="w-6 h-6 text-blue-500" />}
                    {category === "Meta Title" && <FileText className="w-6 h-6 text-purple-500" />}
                    {category === "Meta Description" && <FileText className="w-6 h-6 text-green-500" />}
                    {category === "Imagen" && <ImageIcon className="w-6 h-6 text-yellow-500" />}
                    {category === "Excerpt" && <FileText className="w-6 h-6 text-cyan-500" />}
                    {category === "Contenido" && <FileText className="w-6 h-6 text-orange-500" />}
                    {category === "Freshness" && <Clock className="w-6 h-6 text-pink-500" />}
                    {category}
                  </CardTitle>
                  <Badge variant="secondary">{categoryIssues.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {categoryIssues.map((issue, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        issue.type === "error"
                          ? "border-red-900/30 bg-red-900/10"
                          : "border-yellow-900/30 bg-yellow-900/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {issue.type === "error" ? (
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold mb-1">{issue.message}</p>
                          {issue.postTitle && (
                            <p className="text-xs text-zinc-500 line-clamp-1">{issue.postTitle}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Best Practices */}
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-green-500" />
            Mejores Prácticas SEO
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-400 mb-3" />
              <h4 className="font-bold mb-2">Títulos</h4>
              <p className="text-sm text-zinc-400">30-60 caracteres, incluir keywords principales</p>
            </div>
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-400 mb-3" />
              <h4 className="font-bold mb-2">Meta Description</h4>
              <p className="text-sm text-zinc-400">120-160 caracteres, llamado a la acción</p>
            </div>
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-400 mb-3" />
              <h4 className="font-bold mb-2">Contenido</h4>
              <p className="text-sm text-zinc-400">Mínimo 300 palabras, estructura con H2/H3</p>
            </div>
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-400 mb-3" />
              <h4 className="font-bold mb-2">Imágenes</h4>
              <p className="text-sm text-zinc-400">Alt text descriptivo, WebP optimizado</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
