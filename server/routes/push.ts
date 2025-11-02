import { Router } from 'express';
import { pushNotificationService } from '../services/pushNotifications';

const router = Router();

// ===========================================
// ENDPOINTS PARA GESTIÓN DE SUSCRIPCIONES
// ===========================================

// Suscribir a notificaciones push
router.post('/subscribe', async (req, res) => {
  try {
    const { subscription, userId } = req.body;

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return res.status(400).json({
        success: false,
        message: 'Suscripción inválida'
      });
    }

    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip || req.connection.remoteAddress;

    const result = await pushNotificationService.subscribe(
      subscription,
      userId,
      userAgent,
      ipAddress
    );

    res.json({
      success: true,
      message: result.message
    });

  } catch (error: any) {
    console.error('Error en suscripción push:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Desuscribir de notificaciones push
router.post('/unsubscribe', async (req, res) => {
  try {
    const { endpoint } = req.body;

    if (!endpoint) {
      return res.status(400).json({
        success: false,
        message: 'Endpoint requerido'
      });
    }

    const result = await pushNotificationService.unsubscribe(endpoint);

    res.json({
      success: true,
      message: result.message
    });

  } catch (error: any) {
    console.error('Error en desuscripción push:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// ===========================================
// ENDPOINTS PARA ENVÍO DE NOTIFICACIONES
// ===========================================

// Enviar notificación a todos los suscriptores
router.post('/send-all', async (req, res) => {
  try {
    const { title, body, icon, badge, image, url, data } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: 'Título y cuerpo son requeridos'
      });
    }

    const message = { title, body, icon, badge, image, url, data };
    const result = await pushNotificationService.sendNotificationToAll(message);

    res.json({
      success: true,
      message: `Notificación enviada a ${result.success} de ${result.total} suscriptores`,
      stats: result
    });

  } catch (error: any) {
    console.error('Error enviando notificación general:', error);
    res.status(500).json({
      success: false,
      message: 'Error enviando notificación'
    });
  }
});

// Enviar notificación a usuario específico
router.post('/send-user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, body, icon, badge, image, url, data } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: 'Título y cuerpo son requeridos'
      });
    }

    const message = { title, body, icon, badge, image, url, data };
    const result = await pushNotificationService.sendNotificationToUser(userId, message);

    res.json({
      success: true,
      message: `Notificación enviada a ${result.success} dispositivos de usuario ${userId}`,
      stats: result
    });

  } catch (error: any) {
    console.error('Error enviando notificación a usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error enviando notificación'
    });
  }
});

// Notificar nueva noticia
router.post('/notify/article', async (req, res) => {
  try {
    const { id, title, excerpt, category, author, imageUrl } = req.body;

    if (!id || !title || !category) {
      return res.status(400).json({
        success: false,
        message: 'ID, título y categoría son requeridos'
      });
    }

    const result = await pushNotificationService.notifyNewArticle({
      id, title, excerpt, category, author, imageUrl
    });

    res.json({
      success: true,
      message: `Notificación de nueva noticia enviada a ${result.success} suscriptores`,
      stats: result
    });

  } catch (error: any) {
    console.error('Error notificando nueva noticia:', error);
    res.status(500).json({
      success: false,
      message: 'Error notificando nueva noticia'
    });
  }
});

// Notificar noticia de última hora
router.post('/notify/breaking', async (req, res) => {
  try {
    const { id, title, excerpt, category, author, imageUrl } = req.body;

    if (!id || !title || !category) {
      return res.status(400).json({
        success: false,
        message: 'ID, título y categoría son requeridos'
      });
    }

    const result = await pushNotificationService.notifyBreakingNews({
      id, title, excerpt, category, author, imageUrl
    });

    res.json({
      success: true,
      message: `Notificación de última hora enviada a ${result.success} suscriptores`,
      stats: result
    });

  } catch (error: any) {
    console.error('Error notificando última hora:', error);
    res.status(500).json({
      success: false,
      message: 'Error notificando última hora'
    });
  }
});

// ===========================================
// ENDPOINTS PARA ESTADÍSTICAS Y CONFIGURACIÓN
// ===========================================

// Obtener estadísticas de suscripciones
router.get('/stats', async (req, res) => {
  try {
    const stats = await pushNotificationService.getSubscriptionStats();

    res.json({
      success: true,
      stats
    });

  } catch (error: any) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo estadísticas'
    });
  }
});

// Obtener clave VAPID pública
router.get('/vapid-public-key', (req, res) => {
  try {
    const publicKey = pushNotificationService.getVapidPublicKey();

    if (!publicKey) {
      return res.status(500).json({
        success: false,
        message: 'VAPID no configurado'
      });
    }

    res.json({
      success: true,
      publicKey
    });

  } catch (error: any) {
    console.error('Error obteniendo VAPID public key:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo clave VAPID'
    });
  }
});

// Verificar configuración
router.get('/status', (req, res) => {
  const isConfigured = pushNotificationService.isConfigured();

  res.json({
    success: true,
    configured: isConfigured,
    vapidConfigured: !!(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY)
  });
});

// Limpiar suscripciones inactivas
router.post('/cleanup', async (req, res) => {
  try {
    const result = await pushNotificationService.cleanupInactiveSubscriptions();

    res.json({
      success: true,
      message: `Limpieza completada: ${result.cleaned} suscripciones limpiadas`,
      result
    });

  } catch (error: any) {
    console.error('Error en limpieza:', error);
    res.status(500).json({
      success: false,
      message: 'Error en limpieza'
    });
  }
});

export default router;

