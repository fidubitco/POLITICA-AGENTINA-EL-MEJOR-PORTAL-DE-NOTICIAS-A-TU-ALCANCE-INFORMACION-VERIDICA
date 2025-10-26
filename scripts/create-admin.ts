/**
 * 🔐 CREATE ADMIN USER - Script seguro para crear usuario administrador
 * NOTA: Este script NO expone credenciales en el código
 */

import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de la base de datos desde variables de entorno
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'politica_argentina',
};

// Credenciales del admin desde variables de entorno
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = process.env.ADMIN_NAME || 'Administrador';

async function createAdminUser() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('❌ Error: ADMIN_EMAIL y ADMIN_PASSWORD deben estar definidos en .env');
    console.log('');
    console.log('Agrega estas variables a tu archivo .env:');
    console.log('ADMIN_EMAIL=tu@email.com');
    console.log('ADMIN_PASSWORD=tu_contraseña_segura');
    process.exit(1);
  }

  let connection;

  try {
    console.log('🔐 Creando usuario administrador...');
    console.log('');

    // Conectar a la base de datos
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado a la base de datos');

    // Verificar si el usuario ya existe
    const [existing] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [ADMIN_EMAIL]
    );

    if ((existing as any[]).length > 0) {
      console.log('⚠️  El usuario ya existe. Actualizando contraseña...');
      
      // Hash de la nueva contraseña
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      
      // Actualizar usuario
      await connection.execute(
        'UPDATE users SET password = ?, role = ?, active = TRUE, updatedAt = NOW() WHERE email = ?',
        [hashedPassword, 'admin', ADMIN_EMAIL]
      );
      
      console.log('✅ Usuario administrador actualizado exitosamente');
    } else {
      console.log('📝 Creando nuevo usuario...');
      
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      
      // Crear usuario
      await connection.execute(
        'INSERT INTO users (email, password, name, role, active, createdAt, updatedAt) VALUES (?, ?, ?, ?, TRUE, NOW(), NOW())',
        [ADMIN_EMAIL, hashedPassword, ADMIN_NAME, 'admin']
      );
      
      console.log('✅ Usuario administrador creado exitosamente');
    }

    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('Usuario Admin:');
    console.log(`  Email: ${ADMIN_EMAIL}`);
    console.log(`  Nombre: ${ADMIN_NAME}`);
    console.log(`  Rol: admin`);
    console.log('═══════════════════════════════════════════');
    console.log('');
    console.log('🔒 IMPORTANTE: Las credenciales están en .env (archivo ignorado por git)');
    console.log('');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Ejecutar
createAdminUser();

