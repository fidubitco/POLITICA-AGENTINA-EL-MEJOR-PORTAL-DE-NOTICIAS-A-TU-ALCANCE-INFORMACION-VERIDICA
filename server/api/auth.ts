import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query, insert } from './database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar_url?: string;
  is_active: boolean;
  last_login?: Date;
  created_at: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Registrar nuevo usuario
export async function register(
  email: string,
  password: string,
  name: string,
  role: 'admin' | 'editor' | 'viewer' = 'viewer'
): Promise<AuthResponse> {
  // Verificar si el usuario ya existe
  const existing = await query<User>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (existing.length > 0) {
    throw new Error('El usuario ya existe');
  }

  // Hash de la contraseña
  const passwordHash = await bcrypt.hash(password, 10);

  // Insertar usuario
  const userId = await insert(
    'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
    [email, passwordHash, name, role]
  );

  // Obtener usuario creado
  const [user] = await query<User>(
    'SELECT id, email, name, role, avatar_url, is_active, created_at FROM users WHERE id = ?',
    [userId]
  );

  // Generar token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  // Crear sesión
  await insert(
    'INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
    [generateSessionId(), userId, token]
  );

  return { user, token };
}

// Login
export async function login(
  email: string,
  password: string,
  ipAddress?: string,
  userAgent?: string
): Promise<AuthResponse> {
  // Buscar usuario
  const [user] = await query<User & { password_hash: string }>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  if (!user.is_active) {
    throw new Error('Usuario inactivo');
  }

  // Verificar contraseña
  const isValid = await bcrypt.compare(password, user.password_hash);

  if (!isValid) {
    throw new Error('Credenciales inválidas');
  }

  // Actualizar last_login
  await query(
    'UPDATE users SET last_login = NOW() WHERE id = ?',
    [user.id]
  );

  // Generar token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  // Crear sesión
  await insert(
    'INSERT INTO sessions (id, user_id, token, expires_at, ip_address, user_agent) VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY), ?, ?)',
    [generateSessionId(), user.id, token, ipAddress, userAgent]
  );

  // Remover password_hash del objeto user
  const { password_hash, ...userWithoutPassword } = user;

  return { user: userWithoutPassword as User, token };
}

// Verificar token
export async function verifyToken(token: string): Promise<User | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
      role: string;
    };

    // Verificar que la sesión exista y no haya expirado
    const [session] = await query(
      'SELECT * FROM sessions WHERE token = ? AND expires_at > NOW()',
      [token]
    );

    if (!session) {
      return null;
    }

    // Obtener usuario
    const [user] = await query<User>(
      'SELECT id, email, name, role, avatar_url, is_active, last_login, created_at FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (!user || !user.is_active) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}

// Logout
export async function logout(token: string): Promise<boolean> {
  try {
    await query('DELETE FROM sessions WHERE token = ?', [token]);
    return true;
  } catch (error) {
    return false;
  }
}

// Cambiar contraseña
export async function changePassword(
  userId: number,
  oldPassword: string,
  newPassword: string
): Promise<boolean> {
  // Obtener usuario
  const [user] = await query<{ password_hash: string }>(
    'SELECT password_hash FROM users WHERE id = ?',
    [userId]
  );

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Verificar contraseña antigua
  const isValid = await bcrypt.compare(oldPassword, user.password_hash);

  if (!isValid) {
    throw new Error('Contraseña incorrecta');
  }

  // Hash de nueva contraseña
  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  // Actualizar contraseña
  await query(
    'UPDATE users SET password_hash = ? WHERE id = ?',
    [newPasswordHash, userId]
  );

  // Invalidar todas las sesiones del usuario
  await query('DELETE FROM sessions WHERE user_id = ?', [userId]);

  return true;
}

// Verificar permisos
export function hasPermission(user: User, requiredRole: 'admin' | 'editor' | 'viewer'): boolean {
  const roleHierarchy = { admin: 3, editor: 2, viewer: 1 };
  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

// Helper para generar ID de sesión
function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Middleware de autenticación
export async function authMiddleware(token: string | undefined): Promise<User> {
  if (!token) {
    throw new Error('Token no proporcionado');
  }

  const user = await verifyToken(token);

  if (!user) {
    throw new Error('Token inválido o expirado');
  }

  return user;
}

// Middleware de autorización
export function requireRole(requiredRole: 'admin' | 'editor' | 'viewer') {
  return (user: User) => {
    if (!hasPermission(user, requiredRole)) {
      throw new Error('Permisos insuficientes');
    }
  };
}
