import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Lock, Shield } from 'lucide-react';

const ForbiddenPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Acceso Denegado
          </CardTitle>
          <CardDescription className="text-gray-600">
            No tienes permisos para acceder a esta página.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-500">
            <p>Posibles causas:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>No has iniciado sesión</li>
              <li>Tu cuenta no tiene los permisos necesarios</li>
              <li>Esta es un área restringida para administradores</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild className="flex-1">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Ir al Inicio
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="flex-1">
              <Link href="/admin/login">
                <Shield className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Link>
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-xs text-gray-400">
              Si crees que deberías tener acceso, contacta al administrador.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForbiddenPage;
