/**
 * 🔐 AUTHENTICATION SERVICE - Sistema de autenticación seguro
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'author' | 'user';
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

/**
 * Hash de contraseña
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verificar contraseña
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generar JWT token
 */
export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * Verificar JWT token
 */
export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name || '',
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Login
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    // Buscar usuario
    const user = await db.queryOne<any>(
      'SELECT id, email, password, name, role FROM users WHERE email = ? AND active = TRUE',
      [email]
    );

    if (!user) {
      return { success: false, error: 'Credenciales inválidas' };
    }

    // Verificar contraseña
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return { success: false, error: 'Credenciales inválidas' };
    }

    // Actualizar último login
    await db.update('users', { lastLogin: new Date() }, 'id = ?', [user.id]);

    // Generar token
    const userWithoutPassword: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = generateToken(userWithoutPassword);

    return {
      success: true,
      token,
      user: userWithoutPassword,
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: 'Error en el servidor' };
  }
}

/**
 * Registrar usuario (solo admin puede crear usuarios)
 */
export async function register(
  email: string,
  password: string,
  name: string,
  role: 'admin' | 'editor' | 'author' | 'user' = 'user'
): Promise<AuthResponse> {
  try {
    // Verificar si el email ya existe
    const existing = await db.queryOne(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing) {
      return { success: false, error: 'El email ya está registrado' };
    }

    // Hash de la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear usuario
    const userId = await db.insert('users', {
      email,
      password: hashedPassword,
      name,
      role,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user: User = {
      id: userId,
      email,
      name,
      role,
    };

    const token = generateToken(user);

    return {
      success: true,
      token,
      user,
    };
  } catch (error: any) {
    console.error('Register error:', error);
    return { success: false, error: 'Error en el servidor' };
  }
}

/**
 * Obtener usuario actual
 */
export async function getCurrentUser(token: string): Promise<User | null> {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  const user = await db.queryOne<any>(
    'SELECT id, email, name, role FROM users WHERE id = ? AND active = TRUE',
    [decoded.id]
  );

  return user || null;
}

/**
 * Verificar si es admin
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}

/**
 * Verificar si puede editar
 */
export function canEdit(user: User | null): boolean {
  return user?.role === 'admin' || user?.role === 'editor';
}

