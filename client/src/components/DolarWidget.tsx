/**
 * 💵 WIDGET DE COTIZACIÓN DEL DÓLAR - TIEMPO REAL
 * Muestra cotizaciones actualizadas del dólar en Argentina
 */

import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, DollarSign } from 'lucide-react';
import { getDolarQuotes, DolarData } from '../services/realTimeDataService';

export const DolarWidget: React.FC = () => {
  const [dolarData, setDolarData] = useState<DolarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchDolarData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDolarQuotes();
      
      if (data) {
        setDolarData(data);
        setLastUpdate(new Date());
      } else {
        setError('No se pudieron obtener las cotizaciones');
      }
    } catch (err) {
      setError('Error al cargar cotizaciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDolarData();
    
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchDolarData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading && !dolarData) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-center space-x-2">
          <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
          <span className="text-sm text-gray-600">Cargando cotizaciones...</span>
        </div>
      </div>
    );
  }

  if (error || !dolarData) {
    return (
      <div className="bg-red-50 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm text-red-600">{error || 'Error al cargar'}</span>
          <button
            onClick={fetchDolarData}
            className="text-red-600 hover:text-red-700"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  const quotes = [
    { name: 'Oficial', data: dolarData.oficial, color: 'blue' },
    { name: 'Blue', data: dolarData.blue, color: 'indigo' },
    { name: 'MEP', data: dolarData.mep, color: 'purple' },
    { name: 'CCL', data: dolarData.ccl, color: 'pink' }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-bold text-gray-900">Cotización del Dólar</h3>
        </div>
        <button
          onClick={fetchDolarData}
          disabled={loading}
          className="text-gray-600 hover:text-gray-900 disabled:opacity-50"
          title="Actualizar"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {quotes.map((quote) => (
          <div
            key={quote.name}
            className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">{quote.name}</span>
              {quote.data.variacion !== 0 && (
                <div className={`flex items-center space-x-1 ${
                  quote.data.variacion > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {quote.data.variacion > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span className="text-xs font-medium">
                    {Math.abs(quote.data.variacion).toFixed(2)}%
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-500">Compra:</span>
                <span className="text-sm font-bold text-gray-900">
                  ${quote.data.compra.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-500">Venta:</span>
                <span className="text-sm font-bold text-gray-900">
                  ${quote.data.venta.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-gray-500 text-center">
        Última actualización: {lastUpdate.toLocaleTimeString('es-AR')}
      </div>

      <div className="mt-2 text-xs text-gray-400 text-center">
        Fuente: <a href="https://dolarapi.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">DolarAPI.com</a>
      </div>
    </div>
  );
};

export default DolarWidget;

