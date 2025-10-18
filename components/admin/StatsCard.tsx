import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
  description?: string;
}

/**
 * StatsCard Component
 * Displays a metric card with icon, value, and optional trend indicator
 */
export function StatsCard({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  color = "text-blue-500",
  bgColor = "bg-blue-500/10",
  description,
}: StatsCardProps) {
  const trendColor =
    trend === "up" ? "text-green-500" :
    trend === "down" ? "text-red-500" :
    "text-zinc-500";

  return (
    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-950/50 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-7 h-7 ${color}`} />
          </div>
          {change && (
            <Badge variant="secondary" className={`text-xs font-bold ${trendColor}`}>
              {change}
            </Badge>
          )}
        </div>
        <p className="text-sm text-zinc-500 mb-2 font-medium">{title}</p>
        <p className="text-3xl font-black mb-1">{value}</p>
        {description && (
          <p className="text-xs text-zinc-600 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
