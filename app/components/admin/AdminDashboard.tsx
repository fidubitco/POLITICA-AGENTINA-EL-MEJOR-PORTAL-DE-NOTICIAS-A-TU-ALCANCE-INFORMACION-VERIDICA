'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  FileText,
  Users,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Clock,
  Plus,
  Settings,
  Database,
  Bot,
  Image,
  Globe,
  Search,
  Zap,
} from 'lucide-react';

interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  aiGenerations: number;
  knowledgeBaseEntries: number;
}

export function AdminDashboard() {
  const [stats] = useState<DashboardStats>({
    totalArticles: 247,
    publishedArticles: 234,
    draftArticles: 13,
    totalViews: 125430,
    totalLikes: 5432,
    totalShares: 1234,
    aiGenerations: 89,
    knowledgeBaseEntries: 156,
  });

  const quickActions = [
    {
      title: 'Crear Noticia',
      description: 'Redactar una nueva noticia manualmente',
      icon: Plus,
      href: '/admin/news/create',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Generar con IA',
      description: 'Crear noticia automáticamente con GPT-4',
      icon: Bot,
      href: '/admin/news/generate',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      title: 'Base de Conocimiento',
      description: 'Gestionar documentos y recursos',
      icon: Database,
      href: '/admin/knowledge-base',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Analytics',
      description: 'Ver métricas y estadísticas',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ];

  const recentArticles = [
    {
      id: 1,
      title: 'Milei anuncia nuevas medidas económicas',
      category: 'Política',
      status: 'published',
      views: 1234,
      publishedAt: '2025-01-15',
    },
    {
      id: 2,
      title: 'Congreso debate reforma electoral',
      category: 'Política',
      status: 'draft',
      views: 0,
      publishedAt: null,
    },
    {
      id: 3,
      title: 'Dólar blue alcanza nuevo récord',
      category: 'Economía',
      status: 'published',
      views: 2341,
      publishedAt: '2025-01-14',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Gestiona tu portal de noticias políticas
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  href="/admin/settings"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Artículos</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Vistas Totales</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Bot className="w-8 h-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Generaciones IA</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.aiGenerations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Database className="w-8 h-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Base Conocimiento</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.knowledgeBaseEntries}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`block p-4 rounded-lg text-white transition-colors ${action.color}`}
                >
                  <action.icon className="w-8 h-8 mb-2" />
                  <h3 className="font-semibold mb-1">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Articles & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Articles */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Artículos Recientes</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentArticles.map((article) => (
                <div key={article.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {article.title}
                      </h3>
                      <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          article.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.status === 'published' ? 'Publicado' : 'Borrador'}
                        </span>
                        {article.views > 0 && (
                          <>
                            <span>•</span>
                            <span>{article.views} vistas</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <Link
                        href={`/admin/news/edit/${article.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Editar
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <Link
                href="/admin/news"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Ver todos los artículos →
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Estado del Sistema</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-900">API OpenAI</span>
                </div>
                <span className="text-sm text-green-600">Conectado</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-900">Base de Datos</span>
                </div>
                <span className="text-sm text-green-600">Sincronizada</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-900">Sistema de Imágenes</span>
                </div>
                <span className="text-sm text-green-600">Operativo</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-900">Cache de Imágenes</span>
                </div>
                <span className="text-sm text-yellow-600">Optimizando</span>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Última actualización</span>
                  <span className="text-gray-900">hace 2 minutos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

