/**
 * Mock Data Utilities
 * Generate realistic mock data for analytics, users, and dashboard metrics
 */

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  articlesPublished?: number;
  joinedDate: string;
}

export interface AnalyticsData {
  date: string;
  views: number;
  visitors: number;
  pageViews: number;
}

export interface CategoryStats {
  name: string;
  views: number;
  articles: number;
  trend: number;
}

export interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
  trend: "up" | "down" | "neutral";
}

/**
 * Generate mock users
 */
export const generateMockUsers = (count: number = 10): User[] => {
  const roles: User["role"][] = ["admin", "editor", "viewer"];
  const statuses: User["status"][] = ["active", "inactive", "suspended"];
  const names = [
    "Ana Martínez", "Carlos Rodríguez", "Laura González", "Juan Pérez",
    "María López", "Pedro Sánchez", "Sofía Torres", "Diego Fernández",
    "Carolina Ruiz", "Miguel Ángel Castro", "Valentina Morales", "Andrés Silva",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length] || `Usuario ${i + 1}`,
    email: `user${i + 1}@politica-argentina.com`,
    role: roles[i % roles.length],
    status: i === 0 ? "active" : statuses[Math.floor(Math.random() * statuses.length)],
    lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    articlesPublished: Math.floor(Math.random() * 50),
    joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

/**
 * Generate analytics data for charts
 */
export const generateAnalyticsData = (days: number = 7): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' }),
      views: Math.floor(Math.random() * 5000) + 2000,
      visitors: Math.floor(Math.random() * 3000) + 1000,
      pageViews: Math.floor(Math.random() * 8000) + 3000,
    });
  }

  return data;
};

/**
 * Generate category statistics
 */
export const generateCategoryStats = (categories: string[]): CategoryStats[] => {
  return categories.map((category) => ({
    name: category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    views: Math.floor(Math.random() * 20000) + 5000,
    articles: Math.floor(Math.random() * 40) + 10,
    trend: Math.floor(Math.random() * 30) - 10,
  }));
};

/**
 * Generate traffic source data
 */
export const generateTrafficSources = (): TrafficSource[] => {
  const sources = [
    { source: "Búsqueda Orgánica", baseVisits: 12000 },
    { source: "Directo", baseVisits: 8500 },
    { source: "Redes Sociales", baseVisits: 6700 },
    { source: "Referencias", baseVisits: 4200 },
    { source: "Email", baseVisits: 2100 },
  ];

  const totalVisits = sources.reduce((sum, s) => sum + s.baseVisits, 0);

  return sources.map((source) => {
    const visits = source.baseVisits + Math.floor(Math.random() * 1000);
    const percentage = Math.round((visits / totalVisits) * 100);
    const trends: TrafficSource["trend"][] = ["up", "down", "neutral"];

    return {
      source: source.source,
      visits,
      percentage,
      trend: trends[Math.floor(Math.random() * trends.length)],
    };
  });
};

/**
 * Generate geographic distribution data
 */
export const generateGeographicData = () => {
  return [
    { name: "Argentina", value: 45, visitors: 18500 },
    { name: "España", value: 22, visitors: 9200 },
    { name: "México", value: 15, visitors: 6100 },
    { name: "Chile", value: 8, visitors: 3400 },
    { name: "Colombia", value: 6, visitors: 2500 },
    { name: "Otros", value: 4, visitors: 1600 },
  ];
};

/**
 * Generate engagement metrics
 */
export const generateEngagementMetrics = () => {
  return {
    avgTimeOnSite: "3m 24s",
    bounceRate: 42.3,
    pagesPerSession: 2.8,
    newVisitorRate: 58.4,
    returningVisitorRate: 41.6,
    conversionRate: 4.2,
  };
};

/**
 * Generate real-time activity data
 */
export const generateRealtimeActivity = () => {
  return {
    activeUsers: Math.floor(Math.random() * 50) + 20,
    pageViewsPerMinute: Math.floor(Math.random() * 30) + 10,
    newSessions: Math.floor(Math.random() * 10) + 5,
    articlesShared: Math.floor(Math.random() * 5) + 2,
  };
};

/**
 * Format number with K/M suffix
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

/**
 * Calculate percentage change
 */
export const calculateChange = (current: number, previous: number): string => {
  const change = ((current - previous) / previous) * 100;
  return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
};

/**
 * Get trend direction
 */
export const getTrend = (change: number): "up" | "down" | "neutral" => {
  if (change > 5) return "up";
  if (change < -5) return "down";
  return "neutral";
};
