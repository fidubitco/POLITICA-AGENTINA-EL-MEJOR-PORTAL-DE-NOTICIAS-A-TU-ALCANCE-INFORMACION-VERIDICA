import webPush from 'web-push';
import { db } from '../db';
import { pushSubscriptions } from '../../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { redisCache } from './redis';
import { cacheInvalidation } from './cacheMiddleware';

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

interface PushMessage {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  url?: string;
  data?: any;
}

// ===========================================
// CONFIGURACIÓN DE WEB PUSH
// ===========================================

// Configurar VAPID keys (deben estar en variables de entorno)
webPush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:admin@politicaargentina.com',
  process.env.VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

// ===========================================
// CLASE PRINCIPAL DEL SERVICIO DE PUSH
// ===========================================

export class PushNotificationService {
  // ===========================================
  // GESTIÓN DE SUSCRIPCIONES
  // ===========================================

  async subscribe(subscription: PushSubscription, userId?: string, userAgent?: string, ipAddress?: string) {
    try {
      // Verificar si ya existe la suscripción
      const existing = await db
        .select()
        .from(pushSubscriptions)
        .where(eq(pushSubscriptions.endpoint, subscription.endpoint))
        .limit(1);

      if (existing.length > 0) {
        // Actualizar suscripción existente
        await db
          .update(pushSubscriptions)
          .set({
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth,
            userId,
            userAgent,
            ipAddress,
            isActive: true,
            lastUsed: new Date(),
            updatedAt: new Date()
          })
          .where(eq(pushSubscriptions.endpoint, subscription.endpoint));

        console.log('✅ Suscripción push actualizada:', subscription.endpoint);

        // Invalidar cache de estadísticas
        await cacheInvalidation.onPushUpdate();

        return { success: true, message: 'Suscripción actualizada' };
      } else {
        // Crear nueva suscripción
        await db.insert(pushSubscriptions).values({
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
          userId,
          userAgent,
          ipAddress,
          isActive: true,
          lastUsed: new Date()
        });

        console.log('✅ Nueva suscripción push creada:', subscription.endpoint);

        // Invalidar cache de estadísticas
        await cacheInvalidation.onPushUpdate();

        return { success: true, message: 'Suscripción creada' };
      }
    } catch (error) {
      console.error('❌ Error al guardar suscripción push:', error);
      throw new Error('Error al guardar suscripción');
    }
  }

  async unsubscribe(endpoint: string) {
    try {
      await db
        .update(pushSubscriptions)
        .set({
          isActive: false,
          updatedAt: new Date()
        })
        .where(eq(pushSubscriptions.endpoint, endpoint));

      console.log('✅ Suscripción push desactivada:', endpoint);

      // Invalidar cache de estadísticas
      await cacheInvalidation.onPushUpdate();

      return { success: true, message: 'Suscripción desactivada' };
    } catch (error) {
      console.error('❌ Error al desactivar suscripción:', error);
      throw new Error('Error al desactivar suscripción');
    }
  }

  // ===========================================
  // ENVÍO DE NOTIFICACIONES
  // ===========================================

  async sendNotificationToAll(message: PushMessage) {
    try {
      // Obtener todas las suscripciones activas
      const subscriptions = await db
        .select()
        .from(pushSubscriptions)
        .where(eq(pushSubscriptions.isActive, true));

      console.log(`📤 Enviando notificación a ${subscriptions.length} suscriptores...`);

      const payload = JSON.stringify({
        title: message.title,
        body: message.body,
        icon: message.icon || '/icon-192x192.png',
        badge: message.badge || '/icon-192x192.png',
        image: message.image,
        data: {
          url: message.url || '/',
          ...message.data
        },
        timestamp: Date.now()
      });

      let successCount = 0;
      let failedCount = 0;

      // Enviar a todas las suscripciones
      const promises = subscriptions.map(async (sub) => {
        try {
          await webPush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: {
                p256dh: sub.p256dh,
                auth: sub.auth
              }
            },
            payload
          );

          // Actualizar lastUsed
          await db
            .update(pushSubscriptions)
            .set({ lastUsed: new Date() })
            .where(eq(pushSubscriptions.id, sub.id));

          successCount++;
        } catch (error: any) {
          failedCount++;

          // Si el endpoint ya no es válido, marcar como inactivo
          if (error.statusCode === 410 || error.statusCode === 400) {
            await db
              .update(pushSubscriptions)
              .set({ isActive: false, updatedAt: new Date() })
              .where(eq(pushSubscriptions.id, sub.id));
          }

          console.warn(`⚠️ Error enviando push a ${sub.endpoint}:`, error.message);
        }
      });

      await Promise.allSettled(promises);

      console.log(`✅ Notificación enviada: ${successCount} exitosas, ${failedCount} fallidas`);
      return { success: successCount, failed: failedCount, total: subscriptions.length };

    } catch (error) {
      console.error('❌ Error enviando notificaciones push:', error);
      throw new Error('Error enviando notificaciones');
    }
  }

  async sendNotificationToUser(userId: string, message: PushMessage) {
    try {
      // Obtener suscripciones del usuario
      const subscriptions = await db
        .select()
        .from(pushSubscriptions)
        .where(
          and(
            eq(pushSubscriptions.userId, userId),
            eq(pushSubscriptions.isActive, true)
          )
        );

      if (subscriptions.length === 0) {
        console.log(`ℹ️ Usuario ${userId} no tiene suscripciones activas`);
        return { success: 0, failed: 0, total: 0 };
      }

      console.log(`📤 Enviando notificación personalizada a ${subscriptions.length} dispositivos de usuario ${userId}`);

      const payload = JSON.stringify({
        title: message.title,
        body: message.body,
        icon: message.icon || '/icon-192x192.png',
        badge: message.badge || '/icon-192x192.png',
        image: message.image,
        data: {
          url: message.url || '/',
          userId,
          ...message.data
        },
        timestamp: Date.now()
      });

      let successCount = 0;
      let failedCount = 0;

      const promises = subscriptions.map(async (sub) => {
        try {
          await webPush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: {
                p256dh: sub.p256dh,
                auth: sub.auth
              }
            },
            payload
          );

          await db
            .update(pushSubscriptions)
            .set({ lastUsed: new Date() })
            .where(eq(pushSubscriptions.id, sub.id));

          successCount++;
        } catch (error: any) {
          failedCount++;

          if (error.statusCode === 410 || error.statusCode === 400) {
            await db
              .update(pushSubscriptions)
              .set({ isActive: false, updatedAt: new Date() })
              .where(eq(pushSubscriptions.id, sub.id));
          }

          console.warn(`⚠️ Error enviando push a usuario ${userId}:`, error.message);
        }
      });

      await Promise.allSettled(promises);

      console.log(`✅ Notificación personalizada enviada: ${successCount} exitosas, ${failedCount} fallidas`);
      return { success: successCount, failed: failedCount, total: subscriptions.length };

    } catch (error) {
      console.error('❌ Error enviando notificación personalizada:', error);
      throw new Error('Error enviando notificación personalizada');
    }
  }

  // ===========================================
  // NOTIFICACIONES AUTOMÁTICAS POR EVENTOS
  // ===========================================

  async notifyNewArticle(article: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    imageUrl?: string;
  }) {
    const message: PushMessage = {
      title: `📰 Nueva noticia: ${article.category}`,
      body: article.title.length > 100 ? article.title.substring(0, 97) + '...' : article.title,
      icon: '/icon-192x192.png',
      image: article.imageUrl,
      url: `/article/${article.id}`,
      data: {
        articleId: article.id,
        type: 'new_article',
        category: article.category
      }
    };

    return await this.sendNotificationToAll(message);
  }

  async notifyBreakingNews(article: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    imageUrl?: string;
  }) {
    const message: PushMessage = {
      title: '🚨 ÚLTIMA HORA',
      body: article.title.length > 100 ? article.title.substring(0, 97) + '...' : article.title,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      image: article.imageUrl,
      url: `/article/${article.id}`,
      data: {
        articleId: article.id,
        type: 'breaking_news',
        category: article.category,
        urgent: true
      }
    };

    return await this.sendNotificationToAll(message);
  }

  async notifyCategoryUpdate(category: string, articleCount: number) {
    const message: PushMessage = {
      title: `📊 Actualización en ${category}`,
      body: `${articleCount} nuevas noticias disponibles en ${category}`,
      icon: '/icon-192x192.png',
      url: `/category/${category.toLowerCase()}`,
      data: {
        type: 'category_update',
        category,
        count: articleCount
      }
    };

    return await this.sendNotificationToAll(message);
  }

  // ===========================================
  // ESTADÍSTICAS Y MANTENIMIENTO
  // ===========================================

  async getSubscriptionStats() {
    return redisCache.getOrSet('push:stats', async () => {
      try {
        const total = await db.$count(pushSubscriptions);
        const active = await db.$count(pushSubscriptions, eq(pushSubscriptions.isActive, true));
        const inactive = await db.$count(pushSubscriptions, eq(pushSubscriptions.isActive, false));

        return { total, active, inactive };
      } catch (error) {
        console.error('❌ Error obteniendo estadísticas de suscripciones:', error);
        return { total: 0, active: 0, inactive: 0 };
      }
    }, {
      ttl: 120, // 2 minutos
      tags: ['push', 'stats']
    });
  }

  async cleanupInactiveSubscriptions() {
    try {
      // Marcar como inactivas suscripciones no usadas en 30 días
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const result = await db
        .update(pushSubscriptions)
        .set({
          isActive: false,
          updatedAt: new Date()
        })
        .where(eq(pushSubscriptions.isActive, true));

      console.log(`🧹 Limpieza completada: ${result} suscripciones marcadas como inactivas`);
      return { cleaned: result };
    } catch (error) {
      console.error('❌ Error en limpieza de suscripciones:', error);
      throw new Error('Error en limpieza de suscripciones');
    }
  }

  // ===========================================
  // UTILIDADES
  // ===========================================

  getVapidPublicKey(): string {
    return process.env.VAPID_PUBLIC_KEY || '';
  }

  isConfigured(): boolean {
    return !!(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);
  }
}

// ===========================================
// INSTANCIA GLOBAL DEL SERVICIO
// ===========================================

export const pushNotificationService = new PushNotificationService();
