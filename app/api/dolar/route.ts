import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * API Route: /api/dolar
 * Returns real-time dollar exchange rates for Argentina
 *
 * Features:
 * - Blue (informal market)
 * - Oficial (official rate)
 * - MEP (electronic payment market)
 * - Historical variation tracking
 */

interface DolarData {
  compra: number;
  venta: number;
  nombre: string;
  fechaActualizacion: string;
}

interface DolarResponse {
  blue: DolarData;
  oficial: DolarData;
  mep: DolarData;
  variaciones: {
    blue: number;
    oficial: number;
    mep: number;
  };
  timestamp: string;
}

// Simulated data - In production, fetch from actual API
const generateMockData = (): DolarResponse => {
  const now = new Date().toISOString();

  // Simulated values with slight random variation
  const baseBlue = 1450;
  const baseOficial = 1020;
  const baseMep = 1460;

  const randomVariation = () => (Math.random() - 0.5) * 10;

  return {
    blue: {
      compra: Math.round(baseBlue + randomVariation()),
      venta: Math.round(baseBlue + randomVariation() + 10),
      nombre: "Dólar Blue",
      fechaActualizacion: now,
    },
    oficial: {
      compra: Math.round(baseOficial + randomVariation()),
      venta: Math.round(baseOficial + randomVariation() + 5),
      nombre: "Dólar Oficial",
      fechaActualizacion: now,
    },
    mep: {
      compra: Math.round(baseMep + randomVariation()),
      venta: Math.round(baseMep + randomVariation() + 8),
      nombre: "Dólar MEP",
      fechaActualizacion: now,
    },
    variaciones: {
      blue: +(Math.random() * 4 - 2).toFixed(2), // -2% to +2%
      oficial: +(Math.random() * 1.5 - 0.5).toFixed(2), // -0.5% to +1%
      mep: +(Math.random() * 3 - 1.5).toFixed(2), // -1.5% to +1.5%
    },
    timestamp: now,
  };
};

export async function GET(request: Request) {
  try {
    const data = generateMockData();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error fetching dolar data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dollar rates' },
      { status: 500 }
    );
  }
}
