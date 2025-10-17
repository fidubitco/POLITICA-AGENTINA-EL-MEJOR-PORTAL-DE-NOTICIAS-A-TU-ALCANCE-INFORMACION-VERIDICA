'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function TrafficChart() {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    // Generate sample data
    const sampleData = Array.from({ length: 24 }, () => Math.floor(Math.random() * 1000) + 200);
    setData(sampleData);

    // Update every 10 seconds
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), Math.floor(Math.random() * 1000) + 200];
        return newData;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...data);

  return (
    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
      <CardHeader className="border-b border-zinc-800">
        <CardTitle className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-blue-500" />
          Tráfico en Tiempo Real (Últimas 24 horas)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-end justify-between gap-1 h-64">
          {data.map((value, index) => (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm hover:from-blue-500 hover:to-blue-300 transition-all duration-300 cursor-pointer relative group"
              style={{ height: `${(value / maxValue) * 100}%` }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                <div className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs font-semibold whitespace-nowrap">
                  {value.toLocaleString()} vistas
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs text-zinc-500">
          <span>24h atrás</span>
          <span>12h atrás</span>
          <span>Ahora</span>
        </div>
      </CardContent>
    </Card>
  );
}
