/**
 * 🔐 TRPC CONTEXT - Authentication & Database
 */

import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { db } from './db';

export const createContext = async ({ req, res }: CreateExpressContextOptions) => {
  // Get user from session/token if needed
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  return {
    req,
    res,
    db,
    user: null, // TODO: Implement auth
    token,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

