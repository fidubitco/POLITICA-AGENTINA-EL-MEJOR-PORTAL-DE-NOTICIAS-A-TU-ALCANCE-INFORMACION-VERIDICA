import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">404</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Página no encontrada
          </CardTitle>
          <CardDescription className="text-gray-600">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-500">
            <p>Posibles causas:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>La URL fue escrita incorrectamente</li>
              <li>La página fue eliminada o movida</li>
              <li>El enlace que seguiste está roto</li>
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
              <Link href="/candidatos">
                <Search className="w-4 h-4 mr-2" />
                Ver Candidatos
              </Link>
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-xs text-gray-400">
              Si crees que esto es un error, contacta al administrador.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
