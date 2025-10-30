'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Calendar, Users } from 'lucide-react';

export function SidebarWidgets() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dollarQuote, setDollarQuote] = useState({ blue: 1200, oficial: 890 });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulación de fetch de cotización del dólar
    const fetchDollarQuote = async () => {
      try {
        // En producción, usar la API real
        setDollarQuote({
          blue: 1200 + Math.random() * 20 - 10,
          oficial: 890 + Math.random() * 10 - 5,
        });
      } catch (error) {
        console.error('Error fetching dollar quote:', error);
      }
    };

    fetchDollarQuote();
    const interval = setInterval(fetchDollarQuote, 300000); // Actualizar cada 5 minutos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Reloj y fecha */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Hora Actual</h3>
        </div>

        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            {currentTime.toLocaleTimeString('es-AR', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <div className="text-sm text-gray-600">
            {currentTime.toLocaleDateString('es-AR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Cotización del dólar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Dólar Hoy</h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Dólar Blue</span>
            <span className="font-semibold text-gray-900">
              ${dollarQuote.blue.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Dólar Oficial</span>
            <span className="font-semibold text-gray-900">
              ${dollarQuote.oficial.toFixed(2)}
            </span>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Brecha</span>
              <span className="font-semibold text-orange-600">
                {((dollarQuote.blue / dollarQuote.oficial - 1) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas del sitio */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Estadísticas</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-gray-400" />
            <div className="flex-1 flex justify-between">
              <span className="text-sm text-gray-600">Visitantes hoy</span>
              <span className="font-semibold text-gray-900">12,543</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <div className="flex-1 flex justify-between">
              <span className="text-sm text-gray-600">Artículos leídos</span>
              <span className="font-semibold text-gray-900">8,921</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div className="flex-1 flex justify-between">
              <span className="text-sm text-gray-600">Noticias publicadas</span>
              <span className="font-semibold text-gray-900">247</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h3 className="font-semibold text-lg mb-2">Newsletter</h3>
        <p className="text-blue-100 text-sm mb-4">
          Recibe las noticias más importantes en tu email
        </p>

        <form className="space-y-3">
          <input
            type="email"
            placeholder="Tu email"
            className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 text-sm"
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Suscribirse
          </button>
        </form>
      </div>

      {/* Redes sociales */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Síguenos</h3>

        <div className="grid grid-cols-2 gap-3">
          <a
            href="#"
            className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="font-semibold">Twitter</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center p-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
          >
            <span className="font-semibold">Facebook</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <span className="font-semibold">Instagram</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center p-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
          >
            <span className="font-semibold">YouTube</span>
          </a>
        </div>
      </div>
    </div>
  );
}
