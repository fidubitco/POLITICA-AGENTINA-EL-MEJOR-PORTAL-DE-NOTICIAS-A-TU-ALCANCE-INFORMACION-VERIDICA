"use client";

import { TrendingUp, TrendingDown, Minus, Coffee, ShoppingCart, Home, Fuel } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DolarData {
  compra: number;
  venta: number;
  nombre: string;
  fechaActualizacion: string;
}

interface MetricaHumanaProps {
  tipo: "blue" | "oficial" | "mep";
  dolarData?: DolarData;
  variacionDiaria?: number;
}

const EJEMPLOS_HUMANOS = {
  blue: [
    { item: "Café en bar", precio: 2500, icon: Coffee },
    { item: "Super mensual", precio: 150000, icon: ShoppingCart },
  ],
  oficial: [
    { item: "Nafta (litro)", precio: 1300, icon: Fuel },
    { item: "Luz (mes)", precio: 45000, icon: Home },
  ],
  mep: [
    { item: "Dólar ahorro", precio: 1800, icon: TrendingUp },
    { item: "Combo familiar", precio: 25000, icon: ShoppingCart },
  ],
};

export default function MetricaHumana({ tipo, dolarData, variacionDiaria = 0 }: MetricaHumanaProps) {
  if (!dolarData) {
    return (
      <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all duration-300">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-zinc-800 rounded w-24"></div>
            <div className="h-8 bg-zinc-800 rounded w-32"></div>
            <div className="h-3 bg-zinc-800 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const valor = dolarData.venta;
  const ejemplos = EJEMPLOS_HUMANOS[tipo] || [];
  const isPositive = variacionDiaria > 0;
  const isNegative = variacionDiaria < 0;

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  const trendColor = isPositive ? "text-red-500" : isNegative ? "text-green-500" : "text-zinc-400";
  const borderColor = tipo === "blue" ? "border-l-blue-500" : tipo === "oficial" ? "border-l-green-500" : "border-l-yellow-500";

  return (
    <Card
      className={`bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border-zinc-800 border-l-4 ${borderColor} hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-950/50 transition-all duration-500 group backdrop-blur-sm`}
      data-testid={`metrica-${tipo}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-zinc-400 font-medium uppercase tracking-wider">{dolarData.nombre}</p>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-4xl font-black font-serif tracking-tight group-hover:scale-105 transition-transform duration-300">
                ${valor.toLocaleString('es-AR')}
              </span>
              {variacionDiaria !== 0 && (
                <span className={`flex items-center gap-1.5 text-sm font-bold ${trendColor} animate-pulse`}>
                  <TrendIcon className="h-5 w-5" />
                  {Math.abs(variacionDiaria).toFixed(2)}%
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3 border-t border-zinc-800 pt-4">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Impacto en tu vida
          </p>
          {ejemplos.map((ejemplo, idx) => {
            const IconComponent = ejemplo.icon;
            const variacion = variacionDiaria !== 0 ? ((ejemplo.precio * Math.abs(variacionDiaria)) / 100) : 0;

            return (
              <div key={idx} className="flex items-center justify-between py-2 hover:bg-zinc-800/50 -mx-2 px-2 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                    <IconComponent className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium">{ejemplo.item}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">${ejemplo.precio.toLocaleString('es-AR')}</p>
                  {variacion > 0 && (
                    <p className={`text-xs font-semibold ${trendColor}`}>
                      {isPositive ? '+' : '-'}${Math.round(variacion).toLocaleString('es-AR')}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-zinc-800 text-xs text-zinc-500 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Actualizado
          </span>
          <span className="font-mono font-semibold">
            {new Date(dolarData.fechaActualizacion).toLocaleTimeString('es-AR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
