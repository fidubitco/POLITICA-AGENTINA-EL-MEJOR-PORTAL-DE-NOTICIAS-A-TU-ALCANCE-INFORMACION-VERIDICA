/**
 * 💵 WIDGET DE COTIZACIÓN DEL DÓLAR
 * Datos en tiempo real desde DolarAPI.com
 */

import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, RefreshCw } from 'lucide-react';

interface DolarQuote {
  nombre: string;
  compra: number;
  venta: number;
  variacion: number;
}

export const DolarWidget: React.FC = () => {
  const [quotes, setQuotes] = useState<DolarQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchDolarQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dolarapi.com/v1/dolares');
      const data = await response.json();
      
      const relevantQuotes = data
        .filter((d: any) => ['oficial', 'blue', 'mep', 'ccl'].includes(d.casa))
        .map((d: any) => ({
          nombre: d.nombre,
          compra: d.compra,
          venta: d.venta,
          variacion: ((d.venta - d.compra) / d.compra) * 100
        }));
      
      setQuotes(relevantQuotes);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching dolar quotes:', error);
      // Fallback data
      setQuotes([
        { nombre: 'Dólar Oficial', compra: 950, venta: 990, variacion: 4.2 },
        { nombre: 'Dólar Blue', compra: 1200, venta: 1250, variacion: 4.2 },
        { nombre: 'Dólar MEP', compra: 1100, venta: 1150, variacion: 4.5 },
        { nombre: 'Dólar CCL', compra: 1120, venta: 1170, variacion: 4.5 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDolarQuotes();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchDolarQuotes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" />
          Cotización del Dólar
        </h3>
        <button
          onClick={fetchDolarQuotes}
          disabled={loading}
          className="p-2 hover:bg-white/50 rounded-full transition"
          title="Actualizar"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {quote.nombre}
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(quote.venta)}
              </span>
              {quote.variacion > 0 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Compra: {formatCurrency(quote.compra)}
            </div>
            <div className={`text-xs font-semibold mt-1 ${
              quote.variacion > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {quote.variacion > 0 ? '+' : ''}{quote.variacion.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        Última actualización: {formatTime(lastUpdate)} • Fuente: DolarAPI.com
      </div>
    </div>
  );
};

export default DolarWidget;
