"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

interface LiveMetricsTickerProps {
  metrics: Metric[];
}

export default function LiveMetricsTicker({ metrics }: LiveMetricsTickerProps) {
  return (
    <div className="bg-gradient-to-r from-red-950/60 via-red-900/60 to-red-950/60 border-b border-red-900/30 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
          {/* Live Indicator */}
          <div className="flex items-center gap-2.5 text-sm font-black whitespace-nowrap flex-shrink-0">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-ping opacity-75"></div>
            </div>
            <span className="text-red-300 uppercase tracking-widest">EN VIVO</span>
          </div>

          {/* Metrics */}
          {metrics.map((metric, idx) => {
            const isPositive = metric.change?.startsWith('+');
            const isNegative = metric.change?.startsWith('-');
            const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : null;

            return (
              <div
                key={idx}
                className="flex items-center gap-3 whitespace-nowrap text-sm group hover:scale-105 transition-transform duration-200"
                data-testid={`ticker-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span className="font-bold text-zinc-300 uppercase tracking-wide">
                  {metric.label}:
                </span>
                <span
                  className="font-mono font-bold text-white text-base"
                  data-testid="text-ticker-value"
                >
                  {metric.value}
                </span>
                {metric.change && Icon && (
                  <span
                    className={`flex items-center gap-1 font-mono font-semibold ${
                      isPositive
                        ? 'text-red-400'
                        : isNegative
                        ? 'text-green-400'
                        : 'text-zinc-400'
                    }`}
                    data-testid="text-ticker-change"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {metric.change}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
