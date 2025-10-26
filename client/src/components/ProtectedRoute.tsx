/**
 * 🔒 PROTECTED ROUTE - Protección de rutas de admin
 */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      // 🚀 MODO DESARROLLO - Bypass auth si está en desarrollo
      const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';
      
      if (isDevelopment) {
        console.log('🔓 Modo desarrollo: Acceso admin sin autenticación');
        setIsAuthenticated(true);
        return;
      }

      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('user');

      if (!token || !user) {
        setIsAuthenticated(false);
        setLocation('/admin/login');
        return;
      }

      // Verificar que el token no esté expirado (opcional)
      try {
        const userData = JSON.parse(user);
        if (userData.role === 'admin' || userData.role === 'editor') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setLocation('/admin/login');
        }
      } catch (error) {
        setIsAuthenticated(false);
        setLocation('/admin/login');
      }
    };

    checkAuth();
  }, [setLocation]);

  // Mostrar loading mientras verifica
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (ya redirigió)
  if (!isAuthenticated) {
    return null;
  }

  // Si está autenticado, mostrar el contenido
  return <>{children}</>;
};

export default ProtectedRoute;
