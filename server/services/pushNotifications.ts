import webpush from 'web-push';
import { db } from '../api/database';

// Configurar VAPID keys
const VAPID_PUBLIC_KEY =
  process.env.VAPID_PUBLIC_KEY ||
  'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDJo3YQwP7OwH9YqOhbJjwPsrsfKW7rZYMOuftccZmls';

const VAPID_PRIVATE_KEY =
  process.env.VAPID_PRIVATE_KEY ||
  'UUxI4O8-FbRouAevSmBQ6o18hgE-4qFwPstVs0l_gCo';

const VAPID_SUBJECT =
  process.env.VAPID_SUBJECT || 'mailto:admin@politicaargentina.com';

// Configurar web-push
webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

/**
 * Suscribir usuario a notificaciones push
 */
export async function subscribeToPush(
  userId: number,
  subscription: PushSubscription
): Promise<void> {
  try {
    // Verificar si ya existe
    const existing = await db.query(
      'SELECT id FROM push_subscriptions WHERE user_id = ? AND endpoint = ?',
      [userId, subscription.endpoint]
    );
    
    if (existing.length > 0) {
      // Actualizar
      await db.update(
        'push_subscriptions',
        {
          p256dh_key: subscription.keys.p256dh,
          auth_key: subscription.keys.auth,
          updated_at: new Date(),
        },
        { id: existing[0].id }
      );
    } else {
      // Insertar nueva suscripción
      await db.insert('push_subscriptions', {
        user_id: userId,
        endpoint: subscription.endpoint,
        p256dh_key: subscription.keys.p256dh,
        auth_key: subscription.keys.auth,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    
    console.log(`✅ Usuario ${userId} suscrito a push notifications`);
  } catch (error) {
    console.error('Error suscribiendo a push:', error);
    throw error;
  }
}

/**
 * Desuscribir usuario de notificaciones push
 */
export async function unsubscribeFromPush(
  userId: number,
  endpoint: string
): Promise<void> {
  try {
    await db.query(
      'DELETE FROM push_subscriptions WHERE user_id = ? AND endpoint = ?',
      [userId, endpoint]
    );
    
    console.log(`✅ Usuario ${userId} desuscrito de push notifications`);
  } catch (error) {
    console.error('Error desuscribiendo de push:', error);
    throw error;
  }
}

/**
 * Enviar notificación push a un usuario
 */
export async function sendPushToUser(
  userId: number,
  notification: {
    title: string;
    body: string;
    icon?: string;
    badge?: string;
    data?: any;
  }
): Promise<number> {
  try {
    // Obtener suscripciones del usuario
    const subscriptions = await db.query(
      'SELECT * FROM push_subscriptions WHERE user_id = ?',
      [userId]
    );
    
    if (subscriptions.length === 0) {
      console.log(`⚠️ Usuario ${userId} no tiene suscripciones push`);
      return 0;
    }
    
    let sentCount = 0;
    
    for (const sub of subscriptions) {
      try {
        const pushSubscription: webpush.PushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh_key,
            auth: sub.auth_key,
          },
        };
        
        const payload = JSON.stringify({
          title: notification.title,
          body: notification.body,
          icon: notification.icon || '/logo.png',
          badge: notification.badge || '/favicon.png',
          data: notification.data || {},
        });
        
        await webpush.sendNotification(pushSubscription, payload);
        sentCount++;
      } catch (error: any) {
        console.error(`Error enviando push a suscripción ${sub.id}:`, error);
        
        // Si la suscripción expiró, eliminarla
        if (error.statusCode === 410) {
          await db.query('DELETE FROM push_subscriptions WHERE id = ?', [
            sub.id,
          ]);
          console.log(`🗑️ Suscripción ${sub.id} eliminada (expirada)`);
        }
      }
    }
    
    console.log(`✅ ${sentCount} notificaciones push enviadas a usuario ${userId}`);
    return sentCount;
  } catch (error) {
    console.error('Error enviando push a usuario:', error);
    throw error;
  }
}

/**
 * Enviar notificación push a todos los usuarios
 */
export async function sendPushToAll(notification: {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: any;
}): Promise<number> {
  try {
    // Obtener todas las suscripciones
    const subscriptions = await db.query('SELECT * FROM push_subscriptions');
    
    if (subscriptions.length === 0) {
      console.log('⚠️ No hay suscripciones push');
      return 0;
    }
    
    let sentCount = 0;
    
    for (const sub of subscriptions) {
      try {
        const pushSubscription: webpush.PushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh_key,
            auth: sub.auth_key,
          },
        };
        
        const payload = JSON.stringify({
          title: notification.title,
          body: notification.body,
          icon: notification.icon || '/logo.png',
          badge: notification.badge || '/favicon.png',
          data: notification.data || {},
        });
        
        await webpush.sendNotification(pushSubscription, payload);
        sentCount++;
      } catch (error: any) {
        console.error(`Error enviando push a suscripción ${sub.id}:`, error);
        
        // Si la suscripción expiró, eliminarla
        if (error.statusCode === 410) {
          await db.query('DELETE FROM push_subscriptions WHERE id = ?', [
            sub.id,
          ]);
          console.log(`🗑️ Suscripción ${sub.id} eliminada (expirada)`);
        }
      }
    }
    
    console.log(`✅ ${sentCount} notificaciones push enviadas a todos los usuarios`);
    return sentCount;
  } catch (error) {
    console.error('Error enviando push a todos:', error);
    throw error;
  }
}

/**
 * Notificar nuevo artículo a todos los usuarios
 */
export async function notifyNewArticle(articleId: number): Promise<number> {
  try {
    // Obtener artículo
    const articles = await db.query(
      `SELECT a.*, c.name as category_name
       FROM articles a
       LEFT JOIN categories c ON a.category_id = c.id
       WHERE a.id = ?`,
      [articleId]
    );
    
    if (articles.length === 0) {
      throw new Error('Artículo no encontrado');
    }
    
    const article = articles[0];
    
    // Enviar notificación
    return await sendPushToAll({
      title: '🔥 Nueva Noticia',
      body: article.title,
      icon: article.image_url || '/logo.png',
      data: {
        url: `/noticia/${article.slug}`,
        articleId: article.id,
      },
    });
  } catch (error) {
    console.error('Error notificando nuevo artículo:', error);
    throw error;
  }
}

/**
 * Notificar noticia destacada
 */
export async function notifyBreakingNews(articleId: number): Promise<number> {
  try {
    // Obtener artículo
    const articles = await db.query(
      `SELECT a.*, c.name as category_name
       FROM articles a
       LEFT JOIN categories c ON a.category_id = c.id
       WHERE a.id = ?`,
      [articleId]
    );
    
    if (articles.length === 0) {
      throw new Error('Artículo no encontrado');
    }
    
    const article = articles[0];
    
    // Enviar notificación
    return await sendPushToAll({
      title: '🚨 ÚLTIMA HORA',
      body: article.title,
      icon: article.image_url || '/logo.png',
      badge: '/favicon.png',
      data: {
        url: `/noticia/${article.slug}`,
        articleId: article.id,
        breaking: true,
      },
    });
  } catch (error) {
    console.error('Error notificando breaking news:', error);
    throw error;
  }
}

/**
 * Obtener estadísticas de push notifications
 */
export async function getPushStats(): Promise<{
  totalSubscriptions: number;
  activeUsers: number;
  byBrowser: { [key: string]: number };
}> {
  try {
    const subscriptions = await db.query('SELECT * FROM push_subscriptions');
    
    const stats = {
      totalSubscriptions: subscriptions.length,
      activeUsers: new Set(subscriptions.map((s: any) => s.user_id)).size,
      byBrowser: {} as { [key: string]: number },
    };
    
    // Analizar endpoints para determinar navegador
    for (const sub of subscriptions) {
      const endpoint = sub.endpoint as string;
      
      let browser = 'Unknown';
      if (endpoint.includes('fcm.googleapis.com')) browser = 'Chrome';
      else if (endpoint.includes('updates.push.services.mozilla.com'))
        browser = 'Firefox';
      else if (endpoint.includes('web.push.apple.com')) browser = 'Safari';
      else if (endpoint.includes('notify.windows.com')) browser = 'Edge';
      
      stats.byBrowser[browser] = (stats.byBrowser[browser] || 0) + 1;
    }
    
    return stats;
  } catch (error) {
    console.error('Error obteniendo stats de push:', error);
    return {
      totalSubscriptions: 0,
      activeUsers: 0,
      byBrowser: {},
    };
  }
}

/**
 * Obtener VAPID public key
 */
export function getVapidPublicKey(): string {
  return VAPID_PUBLIC_KEY;
}

