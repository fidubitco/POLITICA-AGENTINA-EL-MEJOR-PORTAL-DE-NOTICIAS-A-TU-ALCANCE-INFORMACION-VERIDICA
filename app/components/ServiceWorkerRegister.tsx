'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('✅ Service Worker registrado:', registration);

          // Manejar actualizaciones del service worker
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nueva versión disponible
                  console.log('🔄 Nueva versión del Service Worker disponible');

                  // Mostrar notificación al usuario (opcional)
                  if (confirm('Hay una nueva versión disponible. ¿Quieres actualizar?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                }
              });
            }
          });

          // Escuchar mensajes del service worker
          navigator.serviceWorker.addEventListener('message', (event) => {
            console.log('💬 Mensaje del Service Worker:', event.data);
          });

        })
        .catch((error) => {
          console.error('❌ Error registrando Service Worker:', error);
        });
    }
  }, []);

  return null; // Este componente no renderiza nada
}

