'use client';

import { useEffect } from 'react';

export default function ServiceWorkerUpdate() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Forzar actualización del Service Worker
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.update();
          console.log('🔄 Service Worker actualizado');
        });
      });

      // Limpiar caches antiguos
      if ('caches' in window) {
        caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            if (cacheName.includes('v1')) {
              caches.delete(cacheName);
              console.log('🗑️ Cache antiguo eliminado:', cacheName);
            }
          });
        });
      }
    }
  }, []);

  return null;
}

