"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  PlayCircle,
  FileText,
  User,
  Zap,
} from "lucide-react";

interface ScheduledPost {
  id: string;
  title: string;
  slug: string;
  scheduledFor: Date | null;
  author: { name: string | null; email: string };
  category: { name: string } | null;
}

interface Job {
  id: string;
  type: string;
  status: string;
  payload: any;
  error: string | null;
  createdAt: Date;
}

interface SchedulerClientProps {
  scheduledPosts: ScheduledPost[];
  recentJobs: Job[];
}

export default function SchedulerClient({ scheduledPosts, recentJobs }: SchedulerClientProps) {
  const stats = {
    scheduled: scheduledPosts.length,
    today: scheduledPosts.filter((p) => {
      if (!p.scheduledFor) return false;
      const today = new Date();
      const schedDate = new Date(p.scheduledFor);
      return schedDate.toDateString() === today.toDateString();
    }).length,
    thisWeek: scheduledPosts.filter((p) => {
      if (!p.scheduledFor) return false;
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      const schedDate = new Date(p.scheduledFor);
      return schedDate <= weekFromNow;
    }).length,
  };

  const runManualPublish = async () => {
    try {
      const response = await fetch('/api/cron/publish-scheduled');
      const data = await response.json();
      if (data.success) {
        alert(`✅ Se publicaron ${data.published} artículo(s)`);
        window.location.reload();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      alert(`❌ Error al ejecutar publicación: ${error}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Manual Trigger */}
      <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-900/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black mb-2">Publicación Manual</h3>
              <p className="text-sm text-zinc-400">
                Ejecuta manualmente el proceso de publicación programada
              </p>
            </div>
            <Button
              onClick={runManualPublish}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Ejecutar Ahora
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-sm text-zinc-500 mb-1">Posts Programados</p>
            <p className="text-3xl font-black">{stats.scheduled}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-sm text-zinc-500 mb-1">Hoy</p>
            <p className="text-3xl font-black">{stats.today}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <p className="text-sm text-zinc-500 mb-1">Esta Semana</p>
            <p className="text-3xl font-black">{stats.thisWeek}</p>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Posts */}
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-500" />
            Posts Programados
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {scheduledPosts.length === 0 ? (
            <div className="py-12 text-center">
              <Calendar className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500">No hay posts programados</p>
            </div>
          ) : (
            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm mb-2 line-clamp-1">{post.title}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author.name || post.author.email}
                      </div>
                      {post.category && (
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {post.category.name}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.scheduledFor
                          ? new Date(post.scheduledFor).toLocaleString("es-AR")
                          : "Sin fecha"}
                      </div>
                    </div>
                  </div>

                  <Badge variant="secondary" className="flex-shrink-0">
                    Programado
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Jobs */}
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-green-500" />
            Historial de Ejecuciones
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {recentJobs.length === 0 ? (
            <div className="py-12 text-center">
              <RefreshCw className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500">No hay ejecuciones registradas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentJobs.map((job) => {
                const isSuccess = job.status === "completed";
                return (
                  <div
                    key={job.id}
                    className={`p-4 rounded-xl border ${
                      isSuccess
                        ? "border-green-900/30 bg-green-900/10"
                        : "border-red-900/30 bg-red-900/10"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isSuccess ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold">
                            {isSuccess ? "Publicación exitosa" : "Publicación fallida"}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {new Date(job.createdAt).toLocaleString("es-AR")}
                          </span>
                        </div>
                        {job.payload?.publishedCount !== undefined && (
                          <p className="text-xs text-zinc-400">
                            {job.payload.publishedCount} artículo(s) publicado(s)
                          </p>
                        )}
                        {job.error && (
                          <p className="text-xs text-red-400 mt-1">Error: {job.error}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cron Configuration Info */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-900/30">
        <CardHeader className="border-b border-purple-900/30">
          <CardTitle className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-purple-400" />
            Configuración de Cron
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-sm text-zinc-300">
            El sistema ejecuta automáticamente el proceso de publicación cada 5 minutos.
          </p>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-2 font-bold">Configuración en vercel.json:</p>
            <pre className="text-xs text-cyan-400 font-mono overflow-x-auto">
              {`{
  "crons": [{
    "path": "/api/cron/publish-scheduled",
    "schedule": "*/5 * * * *"
  }]
}`}
            </pre>
          </div>
          <p className="text-xs text-zinc-500">
            * Los posts con <code className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded text-blue-400">status: SCHEDULED</code> se publican automáticamente cuando la fecha programada llega.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
