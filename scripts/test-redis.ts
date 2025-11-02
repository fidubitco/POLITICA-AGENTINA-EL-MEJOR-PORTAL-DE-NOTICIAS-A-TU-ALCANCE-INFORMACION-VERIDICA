#!/usr/bin/env tsx

import { redisCache } from '../server/services/redis';
import { CacheMiddleware } from '../server/services/cacheMiddleware';

async function testRedis() {
  console.log('🧪 Probando sistema de cache Redis...\n');

  try {
    // 1. Verificar conexión
    console.log('1️⃣ Verificando conexión con Redis...');
    const isConnected = redisCache.isConnected();
    console.log(`   Estado: ${isConnected ? '✅ Conectado' : '❌ Desconectado'}`);

    if (!isConnected) {
      console.log('   ⚠️ Redis no está disponible. Verifica que esté ejecutándose.');
      console.log('   Para instalar Redis localmente:');
      console.log('   - macOS: brew install redis');
      console.log('   - Ubuntu: sudo apt install redis-server');
      console.log('   - Ejecutar: redis-server');
      return;
    }

    // 2. Información del cache
    console.log('\n2️⃣ Información del cache:');
    const info = await redisCache.getCacheInfo();
    console.log(`   Keys almacenadas: ${info.keys}`);
    console.log(`   Memoria usada: ${info.memory ? 'Disponible' : 'N/A'}`);

    // 3. Prueba básica de set/get
    console.log('\n3️⃣ Prueba básica de cache:');
    const testKey = 'test:key';
    const testValue = { message: 'Hola Redis!', timestamp: Date.now() };

    await redisCache.set(testKey, testValue, { ttl: 60 });
    console.log('   ✅ Valor guardado en cache');

    const retrieved = await redisCache.get(testKey);
    console.log(`   📖 Valor recuperado: ${retrieved ? '✅ Correcto' : '❌ Falló'}`);

    // 4. Prueba de tags
    console.log('\n4️⃣ Prueba de invalidación por tags:');
    await redisCache.set('article:1', { title: 'Artículo de prueba' }, { tags: ['articles', 'test'] });
    await redisCache.set('article:2', { title: 'Otro artículo' }, { tags: ['articles', 'test'] });

    let articlesBefore = 0;
    const keysBefore = await redisCache.getCacheInfo();
    articlesBefore = keysBefore.keys;

    await CacheMiddleware.invalidateByTag('articles');

    const keysAfter = await redisCache.getCacheInfo();
    console.log(`   Keys antes: ${articlesBefore}, Keys después: ${keysAfter.keys}`);
    console.log(`   🏷️ Tag 'articles' invalidado: ${articlesBefore > keysAfter.keys ? '✅' : '❌'}`);

    // 5. Prueba de getOrSet
    console.log('\n5️⃣ Prueba de getOrSet:');
    let callCount = 0;
    const expensiveOperation = async () => {
      callCount++;
      console.log(`   🔄 Ejecutando operación costosa (llamada #${callCount})`);
      return { result: 'Datos de prueba', callCount };
    };

    // Primera llamada - debería ejecutar la operación
    const result1 = await redisCache.getOrSet('expensive:test', expensiveOperation, { ttl: 30 });
    console.log(`   Resultado 1: ${result1.callCount}`);

    // Segunda llamada - debería usar cache
    const result2 = await redisCache.getOrSet('expensive:test', expensiveOperation, { ttl: 30 });
    console.log(`   Resultado 2: ${result2.callCount}`);
    console.log(`   💾 Cache funcionando: ${result1.callCount === result2.callCount ? '✅' : '❌'}`);

    // 6. Limpieza
    console.log('\n6️⃣ Limpieza:');
    await redisCache.clear('test:*');
    await redisCache.clear('expensive:*');
    console.log('   🧹 Cache de pruebas limpiado');

    console.log('\n✅ Pruebas de Redis completadas exitosamente!');
    console.log('\n📝 Configuración recomendada:');
    console.log('   • REDIS_URL=redis://localhost:6379 (desarrollo)');
    console.log('   • REDIS_URL=redis://tu-instancia.upstash.io (producción)');
    console.log('   • Instalar Upstash Redis para despliegue en Vercel/Railway');

  } catch (error: any) {
    console.error('\n❌ Error durante las pruebas:', error.message);
    console.log('\n🔧 Solución de problemas:');
    console.log('   1. Verifica que Redis esté ejecutándose: redis-cli ping');
    console.log('   2. Revisa las variables de entorno REDIS_URL');
    console.log('   3. Para desarrollo local: instala Redis y ejecuta redis-server');
  } finally {
    // Cerrar conexión
    await redisCache.disconnect();
  }
}

// Ejecutar pruebas
testRedis();

