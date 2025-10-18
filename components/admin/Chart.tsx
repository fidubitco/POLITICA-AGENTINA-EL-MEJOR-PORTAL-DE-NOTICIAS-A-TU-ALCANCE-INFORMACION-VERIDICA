"use client";

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

interface ChartProps {
  data: any[];
  type?: "line" | "bar" | "pie" | "area";
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  colors?: string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

/**
 * Chart Component
 * Reusable chart component using Recharts library
 * Supports line, bar, pie, and area chart types
 */
export function Chart({
  data,
  type = "line",
  dataKey,
  xAxisKey = "name",
  color = "#3b82f6",
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444"],
  height = 300,
  showGrid = true,
  showLegend = true,
}: ChartProps) {
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-zinc-300 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === "pie") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey={dataKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />}
          <XAxis dataKey={xAxisKey} stroke="#71717a" />
          <YAxis stroke="#71717a" />
          <Tooltip content={<CustomTooltip />} />
          {showLegend && <Legend />}
          <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "area") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />}
          <XAxis dataKey={xAxisKey} stroke="#71717a" />
          <YAxis stroke="#71717a" />
          <Tooltip content={<CustomTooltip />} />
          {showLegend && <Legend />}
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // Default: line chart
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />}
        <XAxis dataKey={xAxisKey} stroke="#71717a" />
        <YAxis stroke="#71717a" />
        <Tooltip content={<CustomTooltip />} />
        {showLegend && <Legend />}
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ fill: color }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
