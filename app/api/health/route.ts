import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Health Check Endpoint
 * Returns system health status for monitoring and load balancers
 * GET /api/health
 */
export async function GET() {
  const startTime = Date.now();

  try {
    // Check database connectivity
    const dbHealthy = await checkDatabase();

    // Check if server is responsive
    const serverHealthy = true; // If we got here, server is running

    // Calculate response time
    const responseTime = Date.now() - startTime;

    // Overall health status
    const healthy = dbHealthy && serverHealthy;

    const healthStatus = {
      status: healthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks: {
        server: {
          status: serverHealthy ? 'up' : 'down',
          responseTime: `${responseTime}ms`,
        },
        database: {
          status: dbHealthy ? 'connected' : 'disconnected',
        },
        memory: {
          used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
          total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
        },
      },
      version: process.env.npm_package_version || '2.0.0',
      environment: process.env.NODE_ENV || 'development',
    };

    // Return 200 if healthy, 503 if unhealthy
    return NextResponse.json(healthStatus, {
      status: healthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  }
}

async function checkDatabase(): Promise<boolean> {
  try {
    // Simple query to check if database is responsive
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}
