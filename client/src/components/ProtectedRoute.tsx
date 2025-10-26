import React, { ReactNode } from 'react';
import { Redirect } from 'wouter';
import { useAuth } from '../contexts/AuthContext';
import { Activity } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireEditor?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
  requireEditor = false,
}) => {
  const { user, loading, isAuthenticated, isAdmin, isEditor } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  // Si requiere admin y no es admin, redirigir a home
  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Acceso Denegado</h1>
          <p className="text-gray-600 mb-6">
            No tienes permisos de administrador para acceder a esta página.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    );
  }

  // Si requiere editor y no es editor ni admin, redirigir a home
  if (requireEditor && !isEditor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Acceso Denegado</h1>
          <p className="text-gray-600 mb-6">
            No tienes permisos de editor para acceder a esta página.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    );
  }

  // Si pasa todas las validaciones, mostrar el contenido
  return <>{children}</>;
};

