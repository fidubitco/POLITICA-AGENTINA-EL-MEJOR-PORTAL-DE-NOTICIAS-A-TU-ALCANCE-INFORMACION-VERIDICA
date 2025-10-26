/**
 * 🔐 TRPC CONTEXT - Authentication & Database
 */

import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { db } from './db';
import { getCurrentUser } from './services/auth';

export const createContext = async ({ req, res }: CreateExpressContextOptions) => {
  // Get user from token
  const token = req.headers.authorization?.replace('Bearer ', '');
  let user = null;
  
  if (token) {
    try {
      user = await getCurrentUser(token);
    } catch (error) {
      // Token inválido o expirado
      user = null;
    }
  }
  
  return {
    req,
    res,
    db,
    user,
    token,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

