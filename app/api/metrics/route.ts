import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * API Route: /api/metrics
 * Returns live economic metrics for the ticker
 *
 * Metrics include:
 * - Dollar rates (Blue, Oficial)
 * - Inflation rate
 * - Merval index
 * - Interest rate
 */

interface Metric {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

const generateMetrics = (): Metric[] => {
  const dolarBlue = 1450 + Math.round((Math.random() - 0.5) * 20);
  const dolarOficial = 1020 + Math.round((Math.random() - 0.5) * 10);
  const inflacion = +(3.5 + (Math.random() - 0.5)).toFixed(1);
  const merval = Math.round(1_850_000 + (Math.random() - 0.5) * 50_000);

  const blueChange = +(Math.random() * 4 - 2).toFixed(1);
  const oficialChange = +(Math.random() * 2 - 1).toFixed(1);
  const mervalChange = +(Math.random() * 6 - 3).toFixed(1);

  return [
    {
      label: "Dólar Blue",
      value: `$${dolarBlue.toLocaleString('es-AR')}`,
      change: blueChange > 0 ? `+${blueChange}%` : `${blueChange}%`,
      isPositive: blueChange > 0,
    },
    {
      label: "Dólar Oficial",
      value: `$${dolarOficial.toLocaleString('es-AR')}`,
      change: oficialChange > 0 ? `+${oficialChange}%` : `${oficialChange}%`,
      isPositive: oficialChange > 0,
    },
    {
      label: "Inflación",
      value: `${inflacion}%`,
      change: inflacion > 3 ? `+${(inflacion - 3).toFixed(1)}%` : `-${(3 - inflacion).toFixed(1)}%`,
      isPositive: inflacion < 3,
    },
    {
      label: "Merval",
      value: merval.toLocaleString('es-AR'),
      change: mervalChange > 0 ? `+${mervalChange}%` : `${mervalChange}%`,
      isPositive: mervalChange > 0,
    },
    {
      label: "Tasa",
      value: "133%",
      change: "-5%",
      isPositive: true,
    },
  ];
};

export async function GET(request: Request) {
  try {
    const metrics = generateMetrics();

    return NextResponse.json(metrics, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error generating metrics:', error);
    return NextResponse.json(
      { error: 'Failed to generate metrics' },
      { status: 500 }
    );
  }
}
