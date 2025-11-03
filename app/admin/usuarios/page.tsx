'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, UserCircle, Mail, Shield } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'author';
  avatar: string;
  articlesCount: number;
  lastLogin: Date;
  status: 'active' | 'inactive';
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Admin Principal',
      email: 'admin@politicaargentina.com',
      role: 'admin',
      avatar: 'AD',
      articlesCount: 50,
      lastLogin: new Date(),
      status: 'active',
    },
    {
      id: '2',
      name: 'Editor Jefe',
      email: 'editor@politicaargentina.com',
      role: 'editor',
      avatar: 'EJ',
      articlesCount: 35,
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'active',
    },
    {
      id: '3',
      name: 'Autor Colaborador',
      email: 'autor@politicaargentina.com',
      role: 'author',
      avatar: 'AC',
      articlesCount: 20,
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'active',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRoleBadge = (role: string) => {
    const badges = {
      admin: 'bg-red-100 text-red-800',
      editor: 'bg-blue-100 text-blue-800',
      author: 'bg-green-100 text-green-800',
    };
    const labels = {
      admin: 'Administrador',
      editor: 'Editor',
      author: 'Autor',
    };
    return { class: badges[role as keyof typeof badges], label: labels[role as keyof typeof labels] };
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-600 mt-1">
            {users.length} usuarios en total
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Nuevo Usuario</span>
        </button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => {
          const roleBadge = getRoleBadge(user.role);
          
          return (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">{user.avatar}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${roleBadge.class} mt-1`}>
                      {roleBadge.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar usuario"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar usuario"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <UserCircle className="w-4 h-4" />
                  <span>{user.articlesCount} artículos publicados</span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Último acceso: {user.lastLogin.toLocaleDateString('es-AR')}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Nuevo Usuario</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="juan@politicaargentina.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="author">Autor</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

