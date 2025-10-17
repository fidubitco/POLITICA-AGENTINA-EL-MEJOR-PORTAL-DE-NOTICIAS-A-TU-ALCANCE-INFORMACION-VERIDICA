// Hybrid Prisma client that supports both Accelerate (Edge) and standard Node runtime
// It auto-selects Accelerate when DATABASE_URL starts with prisma:// or prisma+postgres://

import { PrismaClient as PrismaClientNode } from '@prisma/client';
import type { PrismaClient as PrismaClientEdgeType } from '@prisma/client/edge';
import { PrismaClient as PrismaClientEdge } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

type AnyPrisma = PrismaClientNode | (PrismaClientEdgeType & ReturnType<typeof withAccelerate>);

const globalForPrisma = globalThis as unknown as { prisma: AnyPrisma | undefined };

const isAccelerateUrl = Boolean(
  process.env.DATABASE_URL && (
    process.env.DATABASE_URL.startsWith('prisma://') ||
    process.env.DATABASE_URL.startsWith('prisma+postgres://')
  )
);

const isEdgeRuntime = typeof (globalThis as any).EdgeRuntime !== 'undefined' || process.env.NEXT_RUNTIME === 'edge';

function createPrisma(): AnyPrisma {
  if (isAccelerateUrl) {
    if (isEdgeRuntime) {
      // Edge runtime + Accelerate
      const edge = new PrismaClientEdge().$extends(withAccelerate());
      return edge as unknown as AnyPrisma;
    }
    // Node runtime + Accelerate
    return new PrismaClientNode().$extends(withAccelerate());
  }
  // No Accelerate: standard Node client
  return new PrismaClientNode();
}

export const prisma: AnyPrisma = globalForPrisma.prisma ?? createPrisma();
export const db = prisma;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
