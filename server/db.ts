/**
 * 🗄️ DATABASE CONNECTION - MySQL with Connection Pooling
 */

import mysql from 'mysql2/promise';

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'politica_argentina',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Test de conexión
pool.getConnection()
  .then((connection) => {
    console.log('✅ Database connected successfully');
    connection.release();
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message);
    // En desarrollo, crear base de datos si no existe
    if (process.env.NODE_ENV === 'development') {
      console.log('💡 Tip: Asegúrate de tener MySQL corriendo y la base de datos creada');
    }
  });

// Helper functions
export const db = {
  // Query genérico
  query: async <T = any>(sql: string, params?: any[]): Promise<T[]> => {
    const [rows] = await pool.execute(sql, params);
    return rows as T[];
  },

  // Query único
  queryOne: async <T = any>(sql: string, params?: any[]): Promise<T | null> => {
    const [rows] = await pool.execute(sql, params);
    const result = rows as T[];
    return result[0] || null;
  },

  // Insert
  insert: async (table: string, data: Record<string, any>): Promise<number> => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    
    const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
    const [result] = await pool.execute(sql, values);
    return (result as any).insertId;
  },

  // Update
  update: async (table: string, data: Record<string, any>, where: string, whereParams: any[]): Promise<number> => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${where}`;
    const [result] = await pool.execute(sql, [...values, ...whereParams]);
    return (result as any).affectedRows;
  },

  // Delete
  delete: async (table: string, where: string, whereParams: any[]): Promise<number> => {
    const sql = `DELETE FROM ${table} WHERE ${where}`;
    const [result] = await pool.execute(sql, whereParams);
    return (result as any).affectedRows;
  },

  // Transaction
  transaction: async <T>(callback: (connection: mysql.PoolConnection) => Promise<T>): Promise<T> => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};

export default db;
