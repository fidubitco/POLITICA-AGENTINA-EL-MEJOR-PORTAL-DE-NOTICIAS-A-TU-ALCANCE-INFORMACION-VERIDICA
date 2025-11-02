// Service Worker para notificaciones push
// Política Argentina - Portal de Noticias

const CACHE_NAME = 'politica-argentina-v2';
const STATIC_CACHE = 'politica-argentina-static-v2';

// Archivos a cachear
const STATIC_FILES = [
  '/',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/favicon.ico'
];

// ===========================================
// INSTALACIÓN DEL SERVICE WORKER
// ===========================================

self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker instalándose...');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Cacheando archivos estáticos...');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker instalado');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Error instalando Service Worker:', error);
      })
  );
});

// ===========================================
// ACTIVACIÓN DEL SERVICE WORKER
// ===========================================

self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activándose...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== CACHE_NAME) {
            console.log('🗑️ Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('✅ Service Worker activado');
      return self.clients.claim();
    })
  );
});

// ===========================================
// MANEJO DE NOTIFICACIONES PUSH
// ===========================================

self.addEventListener('push', (event) => {
  console.log('📨 Notificación push recibida:', event);

  if (!event.data) {
    console.log('ℹ️ No hay datos en la notificación push');
    return;
  }

  try {
    const data = event.data.json();
    console.log('📄 Datos de la notificación:', data);

    const options = {
      body: data.body,
      icon: data.icon || '/icon-192x192.png',
      badge: data.badge || '/icon-192x192.png',
      image: data.image,
      data: data.data || {},
      timestamp: data.timestamp,
      requireInteraction: data.data?.urgent || false,
      silent: false,
      tag: data.data?.articleId || 'general', // Evitar notificaciones duplicadas
      renotify: true,
      actions: [
        {
          action: 'view',
          title: 'Ver Noticia',
          icon: '/icon-192x192.png'
        },
        {
          action: 'dismiss',
          title: 'Cerrar'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
        .then(() => {
          console.log('✅ Notificación push mostrada');
        })
        .catch((error) => {
          console.error('❌ Error mostrando notificación push:', error);
        })
    );

  } catch (error) {
    console.error('❌ Error procesando notificación push:', error);

    // Mostrar notificación genérica en caso de error
    event.waitUntil(
      self.registration.showNotification('Política Argentina', {
        body: 'Tienes una nueva notificación',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png'
      })
    );
  }
});

// ===========================================
// MANEJO DE CLICKS EN NOTIFICACIONES
// ===========================================

self.addEventListener('notificationclick', (event) => {
  console.log('🖱️ Click en notificación:', event);

  event.notification.close();

  const notificationData = event.notification.data || {};
  let url = '/';

  // Determinar URL basada en el tipo de notificación
  if (notificationData.url) {
    url = notificationData.url;
  } else if (notificationData.articleId) {
    url = `/article/${notificationData.articleId}`;
  } else if (notificationData.category) {
    url = `/category/${notificationData.category.toLowerCase()}`;
  }

  // Manejar acciones
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(url)
    );
  } else if (event.action === 'dismiss') {
    // Solo cerrar, no hacer nada
  } else {
    // Click en la notificación misma
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((windowClients) => {
          // Verificar si ya hay una ventana abierta con la URL
          for (let client of windowClients) {
            if (client.url.includes(url) && 'focus' in client) {
              return client.focus();
            }
          }

          // Si no hay ventana abierta, abrir una nueva
          if (clients.openWindow) {
            return clients.openWindow(url);
          }
        })
    );
  }
});

// ===========================================
// MANEJO DE FETCH (CACHE STRATEGY)
// ===========================================

self.addEventListener('fetch', (event) => {
  // Ignorar requests de chrome-extension y otros esquemas no HTTP
  const url = new URL(event.request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  // Solo cachear requests GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Strategy: Network first, then cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, cachearla
        if (response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone);
            })
            .catch((error) => {
              // Ignorar errores de cache silenciosamente
              console.debug('Cache put failed:', error);
            });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar servir desde cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              console.log('📦 Sirviendo desde cache:', event.request.url);
              return cachedResponse;
            }

            // Si no está en cache y es una página, servir página offline
            if (event.request.destination === 'document') {
              return caches.match('/');
            }

            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// ===========================================
// MANEJO DE MENSAJES DEL CLIENTE
// ===========================================

self.addEventListener('message', (event) => {
  console.log('💬 Mensaje recibido en SW:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: '1.0.0',
      cacheName: CACHE_NAME,
      staticCache: STATIC_CACHE
    });
  }
});

// ===========================================
// MANEJO DE ERRORES
// ===========================================

self.addEventListener('error', (event) => {
  console.error('❌ Error en Service Worker:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Promesa no manejada en Service Worker:', event.reason);
});