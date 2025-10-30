'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
  Edit,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminPanelProps {
  children?: React.ReactNode;
}

export function AdminPanel({ children }: AdminPanelProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || (session.user as any)?.role !== 'ADMIN') {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return null;
  }

  const stats = [
    {
      title: 'Total Artículos',
      value: '247',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Vistas Totales',
      value: '125.4K',
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Generaciones IA',
      value: '89',
      icon: Bot,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Base Conocimiento',
      value: '156',
      icon: Database,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

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
                <h1 className="text-3xl font-bold text-gray-900">Panel Administrativo</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Gestiona tu portal de noticias políticas
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Herramientas principales para gestionar el contenido
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Recent Articles & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Articles */}
          <Card>
            <CardHeader>
              <CardTitle>Artículos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 truncate">
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
                    <div className="ml-4 flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  Ver todos los artículos
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {children}
    </div>
  );
}

