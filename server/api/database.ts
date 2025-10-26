import mysql from 'mysql2/promise';

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'politica_argentina',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Crear pool de conexiones
export const pool = mysql.createPool(dbConfig);

// Función para verificar conexión
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL exitosa');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error);
    return false;
  }
}

// Función helper para queries
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows as T[];
  } catch (error) {
    console.error('Error en query:', error);
    throw error;
  }
}

// Función helper para queries de inserción
export async function insert(sql: string, params?: any[]): Promise<number> {
  try {
    const [result] = await pool.execute(sql, params);
    return (result as any).insertId;
  } catch (error) {
    console.error('Error en insert:', error);
    throw error;
  }
}

// Función helper para queries de actualización
export async function update(sql: string, params?: any[]): Promise<number> {
  try {
    const [result] = await pool.execute(sql, params);
    return (result as any).affectedRows;
  } catch (error) {
    console.error('Error en update:', error);
    throw error;
  }
}

// Función helper para transacciones
export async function transaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export default pool;
