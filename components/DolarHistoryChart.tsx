"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DolarHistoryChartProps {
  tipo?: "blue" | "oficial" | "mep";
}

const mockHistoricalData = [
  { fecha: "1 Oct", blue: 1380, oficial: 1290, mep: 1395 },
  { fecha: "3 Oct", blue: 1398, oficial: 1292, mep: 1402 },
  { fecha: "5 Oct", blue: 1415, oficial: 1295, mep: 1418 },
  { fecha: "7 Oct", blue: 1408, oficial: 1298, mep: 1425 },
  { fecha: "9 Oct", blue: 1425, oficial: 1305, mep: 1438 },
  { fecha: "11 Oct", blue: 1432, oficial: 1318, mep: 1445 },
  { fecha: "13 Oct", blue: 1418, oficial: 1335, mep: 1452 },
  { fecha: "15 Oct", blue: 1445, oficial: 1358, mep: 1465 },
  { fecha: "17 Oct", blue: 1465, oficial: 1380, mep: 1478 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 shadow-2xl backdrop-blur-md">
        <p className="font-bold mb-3 text-white text-base">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold mb-1" style={{ color: entry.color }}>
            {entry.name}: <span className="font-mono">${entry.value.toLocaleString('es-AR')}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DolarHistoryChart({ tipo = "blue" }: DolarHistoryChartProps) {
  const colors = {
    blue: "#3b82f6",
    oficial: "#10b981",
    mep: "#f59e0b",
  };

  const maxBlue = Math.max(...mockHistoricalData.map(d => d.blue));
  const minBlue = Math.min(...mockHistoricalData.map(d => d.blue));
  const variation = ((maxBlue - minBlue) / minBlue) * 100;

  return (
    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 hover:border-zinc-700 transition-all duration-500 shadow-2xl shadow-zinc-950/50">
      <CardHeader className="pb-6 border-b border-zinc-800">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-3xl font-black font-serif tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Evolución del Dólar
            </CardTitle>
            <p className="text-sm text-zinc-500 mt-2 font-medium">
              Seguimiento histórico - Octubre 2025
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Último valor</p>
            <p className="text-2xl font-black text-blue-400">
              ${mockHistoricalData[mockHistoricalData.length - 1].blue.toLocaleString('es-AR')}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={mockHistoricalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.blue} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colors.blue} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOficial" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.oficial} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colors.oficial} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.mep} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colors.mep} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" strokeOpacity={0.3} />
            <XAxis
              dataKey="fecha"
              tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }}
              stroke="#3f3f46"
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }}
              stroke="#3f3f46"
              tickLine={false}
              domain={['dataMin - 20', 'dataMax + 20']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '24px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="blue"
              stroke={colors.blue}
              strokeWidth={4}
              dot={{ fill: colors.blue, r: 5, strokeWidth: 2, stroke: '#18181b' }}
              activeDot={{ r: 7, strokeWidth: 3, stroke: '#18181b' }}
              name="Dólar Blue"
              fill="url(#colorBlue)"
            />
            <Line
              type="monotone"
              dataKey="oficial"
              stroke={colors.oficial}
              strokeWidth={3}
              dot={{ fill: colors.oficial, r: 4, strokeWidth: 2, stroke: '#18181b' }}
              activeDot={{ r: 6, strokeWidth: 3, stroke: '#18181b' }}
              name="Dólar Oficial"
              fill="url(#colorOficial)"
            />
            <Line
              type="monotone"
              dataKey="mep"
              stroke={colors.mep}
              strokeWidth={3}
              dot={{ fill: colors.mep, r: 4, strokeWidth: 2, stroke: '#18181b' }}
              activeDot={{ r: 6, strokeWidth: 3, stroke: '#18181b' }}
              name="Dólar MEP"
              fill="url(#colorMep)"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-8 grid grid-cols-3 gap-6 border-t border-zinc-800 pt-6">
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-600/5 border border-blue-600/20">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2 font-bold">Máximo Blue</p>
            <p className="text-2xl font-black text-blue-400">${maxBlue.toLocaleString('es-AR')}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-600/10 to-green-600/5 border border-green-600/20">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2 font-bold">Mínimo Blue</p>
            <p className="text-2xl font-black text-green-400">${minBlue.toLocaleString('es-AR')}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-red-600/10 to-red-600/5 border border-red-600/20">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2 font-bold">Variación Mensual</p>
            <p className="text-2xl font-black text-red-400">+{variation.toFixed(2)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
