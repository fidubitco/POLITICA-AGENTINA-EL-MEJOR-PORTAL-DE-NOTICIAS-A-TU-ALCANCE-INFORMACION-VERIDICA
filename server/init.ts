import { initRedis } from './services/redis';

// ===========================================
// INICIALIZACIÓN DE SERVICIOS
// ===========================================

export async function initializeServices(): Promise<void> {
  console.log('🚀 Inicializando servicios del servidor...');

  try {
    // Inicializar Redis
    await initRedis();

    // Aquí se pueden inicializar otros servicios
    // await initDatabase();
    // await initOllama();
    // await initPushNotifications();

    console.log('✅ Todos los servicios inicializados correctamente');

  } catch (error) {
    console.error('❌ Error inicializando servicios:', error);
    // No tirar error para que la aplicación pueda continuar sin servicios opcionales
  }
}

export async function shutdownServices(): Promise<void> {
  console.log('🛑 Cerrando servicios del servidor...');

  try {
    // Cerrar Redis
    const { closeRedis } = await import('./services/redis');
    await closeRedis();

    console.log('✅ Servicios cerrados correctamente');

  } catch (error) {
    console.error('❌ Error cerrando servicios:', error);
  }
}

// ===========================================
// FUNCIONES DE UTILIDAD PARA NEXT.JS
// ===========================================

// Función para inicializar servicios en Next.js
export async function initServicesForNextJS(): Promise<void> {
  // Solo inicializar si no estamos en build time
  if (process.env.NODE_ENV !== 'production' || !process.env.NEXT_PHASE?.includes('build')) {
    await initializeServices();
  }
}

// Función para manejar señales de terminación
export function setupGracefulShutdown(): void {
  const shutdown = async (signal: string) => {
    console.log(`\n📡 Recibida señal ${signal}, cerrando servicios...`);
    await shutdownServices();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGUSR2', () => shutdown('SIGUSR2')); // nodemon restart
}
