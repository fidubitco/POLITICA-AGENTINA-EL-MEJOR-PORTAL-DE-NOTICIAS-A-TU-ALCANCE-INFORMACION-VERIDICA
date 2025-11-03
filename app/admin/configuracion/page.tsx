'use client';

import { useState } from 'react';
import { Save, Globe, Bell, Shield, Database } from 'lucide-react';

export default function ConfiguracionPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-600 mt-1">Ajustes generales del sistema</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span className="font-medium">{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Configuración General</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Sitio
            </label>
            <input
              type="text"
              defaultValue="Política Argentina"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              defaultValue="Portal líder de noticias políticas de Argentina"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL del Sitio
              </label>
              <input
                type="url"
                defaultValue="https://politicaargentina.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email de Contacto
              </label>
              <input
                type="email"
                defaultValue="contacto@politicaargentina.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Notificaciones</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-sm font-medium text-gray-900">Notificaciones por Email</span>
              <p className="text-xs text-gray-500">Recibir notificaciones de nuevas noticias</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-sm font-medium text-gray-900">Notificaciones Push</span>
              <p className="text-xs text-gray-500">Enviar notificaciones push a usuarios</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-sm font-medium text-gray-900">Alertas de Comentarios</span>
              <p className="text-xs text-gray-500">Notificar cuando hay nuevos comentarios</p>
            </div>
            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          </label>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Seguridad</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-sm font-medium text-gray-900">Autenticación de Dos Factores</span>
              <p className="text-xs text-gray-500">Requerir 2FA para todos los usuarios</p>
            </div>
            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-sm font-medium text-gray-900">Registro de Actividad</span>
              <p className="text-xs text-gray-500">Mantener logs de todas las acciones</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          </label>
        </div>
      </div>

      {/* Database */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Base de Datos</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supabase URL
            </label>
            <input
              type="url"
              placeholder="https://xxxxx.supabase.co"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supabase Anon Key
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-3 pt-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Probar Conexión
            </button>
            <span className="text-sm text-gray-600">Estado: Conectado ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

