// ===========================================
// CONFIGURACIÓN DE tRPC
// Cliente tRPC para el frontend
// ===========================================

import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../server/routers';

export const trpc = createTRPCReact<AppRouter>();
