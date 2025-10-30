'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DolarData {
  oficial: {
    nombre: string;
    compra: number;
    venta: number;
    fechaActualizacion: string;
  };
  blue: {
    nombre: string;
    compra: number;
    venta: number;
    fechaActualizacion: string;
  };
}

export function DolarWidget() {
  const [dolarData, setDolarData] = useState<DolarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDolarData = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares');
        if (!response.ok) throw new Error('Error al cargar datos del dólar');

        const data = await response.json();
        const oficial = data.find((d: any) => d.nombre === 'Oficial');
        const blue = data.find((d: any) => d.nombre === 'Blue');

        setDolarData({
          oficial: {
            nombre: oficial.nombre,
            compra: oficial.compra,
            venta: oficial.venta,
            fechaActualizacion: oficial.fechaActualizacion
          },
          blue: {
            nombre: blue.nombre,
            compra: blue.compra,
            venta: blue.venta,
            fechaActualizacion: blue.fechaActualizacion
          }
        });
      } catch (err) {
        setError('Error al cargar cotizaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchDolarData();

    // Actualizar cada 5 minutos
    const interval = setInterval(fetchDolarData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cotización del Dólar</h3>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-green-600" />
        Cotización del Dólar
      </h3>

      <div className="space-y-4">
        {/* Dólar Oficial */}
        <div className="border-b border-gray-100 pb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">Dólar Oficial</span>
            <span className="text-xs text-gray-500">BCRA</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Compra</span>
              <div className="font-semibold text-gray-900">
                ${dolarData?.oficial.compra.toFixed(2)}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Venta</span>
              <div className="font-semibold text-gray-900">
                ${dolarData?.oficial.venta.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Dólar Blue */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">Dólar Blue</span>
            <span className="text-xs text-gray-500">Paralelo</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Compra</span>
              <div className="font-semibold text-gray-900">
                ${dolarData?.blue.compra.toFixed(2)}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Venta</span>
              <div className="font-semibold text-gray-900">
                ${dolarData?.blue.venta.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Brecha */}
        {dolarData && (
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Brecha</span>
              <span className="font-semibold text-gray-900">
                {(((dolarData.blue.venta / dolarData.oficial.venta) - 1) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div className="text-xs text-gray-500 text-center pt-2">
          Actualizado: {dolarData ? new Date(dolarData.oficial.fechaActualizacion).toLocaleString('es-AR') : ''}
        </div>
      </div>
    </div>
  );
}

