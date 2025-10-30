'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Bot,
  BarChart3,
  Search,
  Settings,
  Users,
  Newspaper,
  PenTool,
  Image as ImageIcon,
  Globe,
  Database,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { AdminOverview } from './admin/AdminOverview';
import { ArticleManager } from './admin/ArticleManager';
import { AINewsCreator } from './admin/AINewsCreator';
import { AnalyticsDashboard } from './admin/AnalyticsDashboard';
import { SEOAuditor } from './admin/SEOAuditor';
import { UserManager } from './admin/UserManager';
import { SettingsPanel } from './admin/SettingsPanel';

type TabType =
  | 'overview'
  | 'articles'
  | 'ai-creator'
  | 'analytics'
  | 'seo'
  | 'users'
  | 'settings';

const tabs = [
  { id: 'overview' as TabType, name: 'Resumen', icon: LayoutDashboard },
  { id: 'articles' as TabType, name: 'Artículos', icon: FileText },
  { id: 'ai-creator' as TabType, name: 'Creador IA', icon: Bot },
  { id: 'analytics' as TabType, name: 'Analytics', icon: BarChart3 },
  { id: 'seo' as TabType, name: 'SEO Auditor', icon: Search },
  { id: 'users' as TabType, name: 'Usuarios', icon: Users },
  { id: 'settings' as TabType, name: 'Configuración', icon: Settings },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Implementar logout
    router.push('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview />;
      case 'articles':
        return <ArticleManager />;
      case 'ai-creator':
        return <AINewsCreator />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'seo':
        return <SEOAuditor />;
      case 'users':
        return <UserManager />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Shield className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Última actualización: {new Date().toLocaleString('es-AR')}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

