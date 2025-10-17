'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Eye, TrendingUp, Clock } from 'lucide-react';

interface RealtimeStatsProps {
  postId?: string;
}

export default function RealtimeStats({ postId }: RealtimeStatsProps) {
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalViews: 0,
    viewsToday: 0,
    avgTimeOnPage: '0:00',
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setStats({
        activeUsers: Math.floor(Math.random() * 500) + 100,
        totalViews: Math.floor(Math.random() * 100000) + 50000,
        viewsToday: Math.floor(Math.random() * 5000) + 1000,
        avgTimeOnPage: `${Math.floor(Math.random() * 3) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [postId]);

  const metrics = [
    {
      title: 'Usuarios Activos',
      value: stats.activeUsers,
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      change: '+12%',
    },
    {
      title: 'Vistas Totales',
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      change: '+23%',
    },
    {
      title: 'Vistas Hoy',
      value: stats.viewsToday.toLocaleString(),
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      change: '+8%',
    },
    {
      title: 'Tiempo Promedio',
      value: stats.avgTimeOnPage,
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      change: '+5%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 hover:border-zinc-700 transition-all duration-500 group"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">
                {metric.change}
              </span>
            </div>
            <p className="text-sm text-zinc-500 mb-2">{metric.title}</p>
            <p className="text-2xl font-black">{metric.value}</p>
            <div className="mt-2 flex items-center gap-1">
              <div className={`w-2 h-2 ${metric.bgColor} rounded-full animate-pulse`} />
              <span className="text-xs text-zinc-600">Actualizado ahora</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
