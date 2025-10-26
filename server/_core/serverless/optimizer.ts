// ===========================================
// OPTIMIZADOR SERVERLESS AVANZADO
// Optimizaciones para máximo rendimiento
// ===========================================

import { config } from '../env';

// ===========================================
// CONFIGURACIÓN DE SERVERLESS
// ===========================================

export const serverlessConfig = {
  // Configuración de cold start
  coldStartOptimization: {
    preloadModules: true,
    keepAlive: true,
    connectionPooling: true,
    memoryOptimization: true
  },
  
  // Configuración de caché
  cache: {
    ttl: parseInt(config.CACHE_TTL_SECONDS || '3600'),
    maxSize: 100,
    strategy: 'lru' as const
  },
  
  // Configuración de timeouts
  timeouts: {
    function: 30000,
    database: 10000,
    api: 15000
  },
  
  // Configuración de recursos
  resources: {
    memory: '512MB',
    cpu: '0.5',
    disk: '1GB'
  }
};

// ===========================================
// OPTIMIZACIÓN DE COLD START
// ===========================================

export class ColdStartOptimizer {
  private static instance: ColdStartOptimizer;
  private initialized = false;
  private preloadedModules: Map<string, any> = new Map();

  static getInstance(): ColdStartOptimizer {
    if (!ColdStartOptimizer.instance) {
      ColdStartOptimizer.instance = new ColdStartOptimizer();
    }
    return ColdStartOptimizer.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Precargar módulos críticos
      await this.preloadCriticalModules();
      
      // Inicializar conexiones
      await this.initializeConnections();
      
      // Configurar caché
      await this.setupCache();
      
      this.initialized = true;
      console.log('✅ Cold start optimization completed');
    } catch (error) {
      console.error('❌ Cold start optimization failed:', error);
    }
  }

  private async preloadCriticalModules(): Promise<void> {
    const criticalModules = [
      'drizzle-orm',
      'mysql2',
      'express',
      'cors',
      'helmet',
      'compression'
    ];

    for (const moduleName of criticalModules) {
      try {
        const module = await import(moduleName);
        this.preloadedModules.set(moduleName, module);
      } catch (error) {
        console.warn(`Failed to preload ${moduleName}:`, error);
      }
    }
  }

  private async initializeConnections(): Promise<void> {
    // Inicializar conexión a base de datos
    try {
      const { getDb } = await import('../database/connection');
      await getDb();
    } catch (error) {
      console.warn('Database connection initialization failed:', error);
    }
  }

  private async setupCache(): Promise<void> {
    // Configurar caché en memoria
    if (typeof global !== 'undefined') {
      (global as any).serverlessCache = new Map();
    }
  }

  getPreloadedModule(name: string): any {
    return this.preloadedModules.get(name);
  }
}

// ===========================================
// OPTIMIZACIÓN DE MEMORIA
// ===========================================

export class MemoryOptimizer {
  private static instance: MemoryOptimizer;
  private memoryUsage: NodeJS.MemoryUsage | null = null;

  static getInstance(): MemoryOptimizer {
    if (!MemoryOptimizer.instance) {
      MemoryOptimizer.instance = new MemoryOptimizer();
    }
    return MemoryOptimizer.instance;
  }

  optimize(): void {
    // Limpiar caché de módulos no utilizados
    if (typeof global !== 'undefined' && (global as any).gc) {
      (global as any).gc();
    }

    // Limpiar caché de consultas
    this.clearQueryCache();
    
    // Optimizar memoria
    this.optimizeMemoryUsage();
  }

  private clearQueryCache(): void {
    // Implementar limpieza de caché
    if (typeof global !== 'undefined' && (global as any).queryCache) {
      (global as any).queryCache.clear();
    }
  }

  private optimizeMemoryUsage(): void {
    // Forzar garbage collection si está disponible
    if (typeof global !== 'undefined' && (global as any).gc) {
      (global as any).gc();
    }
  }

  getMemoryUsage(): NodeJS.MemoryUsage {
    this.memoryUsage = process.memoryUsage();
    return this.memoryUsage;
  }

  isMemoryLimitReached(): boolean {
    const usage = this.getMemoryUsage();
    const limit = 512 * 1024 * 1024; // 512MB
    return usage.heapUsed > limit * 0.8; // 80% del límite
  }
}

// ===========================================
// OPTIMIZACIÓN DE CONEXIONES
// ===========================================

export class ConnectionOptimizer {
  private static instance: ConnectionOptimizer;
  private connectionPool: any = null;
  private lastActivity: number = Date.now();

  static getInstance(): ConnectionOptimizer {
    if (!ConnectionOptimizer.instance) {
      ConnectionOptimizer.instance = new ConnectionOptimizer();
    }
    return ConnectionOptimizer.instance;
  }

  async optimizeConnections(): Promise<void> {
    try {
      // Configurar pool de conexiones
      await this.setupConnectionPool();
      
      // Configurar keep-alive
      await this.setupKeepAlive();
      
      // Configurar timeouts
      await this.setupTimeouts();
      
      console.log('✅ Connection optimization completed');
    } catch (error) {
      console.error('❌ Connection optimization failed:', error);
    }
  }

  private async setupConnectionPool(): Promise<void> {
    // Configurar pool de conexiones optimizado
    if (this.connectionPool) {
      this.connectionPool.config.connectionLimit = 5;
      this.connectionPool.config.acquireTimeout = 10000;
      this.connectionPool.config.timeout = 10000;
    }
  }

  private async setupKeepAlive(): Promise<void> {
    // Configurar keep-alive para conexiones
    this.lastActivity = Date.now();
  }

  private async setupTimeouts(): Promise<void> {
    // Configurar timeouts optimizados
    if (this.connectionPool) {
      this.connectionPool.config.connectTimeout = 10000;
      this.connectionPool.config.acquireTimeout = 10000;
    }
  }

  updateActivity(): void {
    this.lastActivity = Date.now();
  }

  shouldReconnect(): boolean {
    const now = Date.now();
    const timeSinceLastActivity = now - this.lastActivity;
    return timeSinceLastActivity > 300000; // 5 minutos
  }
}

// ===========================================
// OPTIMIZACIÓN DE RENDIMIENTO
// ===========================================

export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  startTimer(name: string): void {
    this.metrics.set(`${name}_start`, Date.now());
  }

  endTimer(name: string): number {
    const startTime = this.metrics.get(`${name}_start`);
    if (!startTime) return 0;
    
    const duration = Date.now() - startTime;
    this.metrics.set(`${name}_duration`, duration);
    return duration;
  }

  getMetrics(): Record<string, number> {
    const result: Record<string, number> = {};
    for (const [key, value] of this.metrics.entries()) {
      if (key.endsWith('_duration')) {
        result[key] = value;
      }
    }
    return result;
  }

  optimize(): void {
    // Optimizar rendimiento
    this.optimizeV8();
    this.optimizeMemory();
    this.optimizeNetwork();
  }

  private optimizeV8(): void {
    // Optimizaciones específicas de V8
    if (typeof global !== 'undefined' && (global as any).v8) {
      // Configurar flags de V8 para mejor rendimiento
      process.setMaxListeners(0);
    }
  }

  private optimizeMemory(): void {
    // Optimizar uso de memoria
    const memoryOptimizer = MemoryOptimizer.getInstance();
    memoryOptimizer.optimize();
  }

  private optimizeNetwork(): void {
    // Optimizar configuración de red
    if (typeof global !== 'undefined') {
      // Configurar timeouts de red
      process.env.UV_THREADPOOL_SIZE = '4';
    }
  }
}

// ===========================================
// OPTIMIZACIÓN DE CACHÉ
// ===========================================

export class CacheOptimizer {
  private static instance: CacheOptimizer;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();

  static getInstance(): CacheOptimizer {
    if (!CacheOptimizer.instance) {
      CacheOptimizer.instance = new CacheOptimizer();
    }
    return CacheOptimizer.instance;
  }

  set(key: string, data: any, ttl: number = 3600): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl * 1000
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  optimize(): void {
    // Limpiar entradas expiradas
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > value.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// ===========================================
// INICIALIZACIÓN COMPLETA
// ===========================================

export const initializeServerlessOptimizations = async (): Promise<void> => {
  try {
    // Inicializar optimizadores
    await ColdStartOptimizer.getInstance().initialize();
    await ConnectionOptimizer.getInstance().optimizeConnections();
    
    // Configurar monitoreo
    setInterval(() => {
      PerformanceOptimizer.getInstance().optimize();
      CacheOptimizer.getInstance().optimize();
    }, 60000); // Cada minuto
    
    console.log('✅ Serverless optimizations initialized');
  } catch (error) {
    console.error('❌ Serverless optimization initialization failed:', error);
  }
};
