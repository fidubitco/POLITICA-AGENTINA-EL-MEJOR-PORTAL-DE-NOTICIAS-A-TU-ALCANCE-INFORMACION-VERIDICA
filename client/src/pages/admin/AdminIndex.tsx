/**
 * 🏠 PÁGINA DE INICIO DEL ADMIN
 * Portal de acceso a todas las funciones administrativas
 */

import React from 'react';
import { Link } from 'wouter';
import {
  LayoutDashboard,
  FileText,
  Edit,
  PlusCircle,
  BarChart3,
  Users,
  Settings,
  TrendingUp,
  Eye,
  ThumbsUp,
} from 'lucide-react';

export const AdminIndex: React.FC = () => {
  const adminSections = [
    {
      title: 'Dashboard Principal',
      description: 'Estadísticas, analytics y resumen general del sitio',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
      color: 'bg-blue-600',
      stats: 'Vista general del sistema',
    },
    {
      title: 'Gestión de Artículos',
      description: 'Ver, editar y administrar todos los artículos publicados',
      icon: FileText,
      href: '/admin/dashboard',
      color: 'bg-green-600',
      stats: '17+ artículos',
    },
    {
      title: 'Crear Nueva Noticia',
      description: 'Publicar un nuevo artículo en el portal',
      icon: PlusCircle,
      href: '/admin/crear-noticia',
      color: 'bg-purple-600',
      stats: 'Editor completo',
    },
    {
      title: 'Editar Artículos',
      description: 'Modificar artículos existentes',
      icon: Edit,
      href: '/admin/editar/1',
      color: 'bg-orange-600',
      stats: 'Editor avanzado',
    },
    {
      title: 'Analytics',
      description: 'Métricas detalladas y análisis de rendimiento',
      icon: BarChart3,
      href: '/admin/dashboard',
      color: 'bg-pink-600',
      stats: 'Gráficos en tiempo real',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Panel de Administración
              </h1>
              <p className="text-gray-600 mt-1">
                Política Argentina - Sistema de Gestión de Contenidos
              </p>
            </div>
            <Link href="/">
              <a className="text-blue-600 hover:text-blue-800 font-semibold">
                ← Volver al Sitio
              </a>
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Artículos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">17</p>
                <p className="text-green-600 text-sm mt-1">✓ Todos publicados</p>
              </div>
              <FileText className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Vistas Totales</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">285K</p>
                <p className="text-green-600 text-sm mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5% vs mes anterior
                </p>
              </div>
              <Eye className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Engagement</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">12.4K</p>
                <p className="text-blue-600 text-sm mt-1">Likes + Shares</p>
              </div>
              <ThumbsUp className="w-12 h-12 text-pink-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Funciones Administrativas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.href} href={section.href}>
                  <a className="group">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full">
                      <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {section.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {section.stats}
                        </span>
                        <span className="text-blue-600 group-hover:translate-x-2 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/crear-noticia">
              <a className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                <PlusCircle className="w-5 h-5 mr-2" />
                Nueva Noticia
              </a>
            </Link>
            <Link href="/admin/dashboard">
              <a className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                <BarChart3 className="w-5 h-5 mr-2" />
                Ver Analytics
              </a>
            </Link>
            <Link href="/admin/dashboard">
              <a className="flex items-center justify-center px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                <FileText className="w-5 h-5 mr-2" />
                Gestionar Artículos
              </a>
            </Link>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse mr-3"></div>
            <div>
              <p className="font-semibold text-green-900">Sistema Operativo</p>
              <p className="text-green-700 text-sm">
                Todos los servicios funcionando correctamente
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIndex;

