'use client';

import { useState, useEffect } from 'react';

interface PushSubscribeProps {
  userId?: string;
  className?: string;
}

export default function PushSubscribe({ userId, className = '' }: PushSubscribeProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [error, setError] = useState<string>('');
  const [serviceWorkerReady, setServiceWorkerReady] = useState(false);

  // ===========================================
  // VERIFICACIÓN DE SOPORTE
  // ===========================================

  useEffect(() => {
    checkSupport();
    checkExistingSubscription();
  }, []);

  const checkSupport = async () => {
    // Verificar soporte de notificaciones
    if (!('Notification' in window)) {
      setError('Tu navegador no soporta notificaciones push');
      return;
    }

    // Verificar soporte de service workers
    if (!('serviceWorker' in navigator)) {
      setError('Tu navegador no soporta service workers');
      return;
    }

    // Verificar soporte de Push API
    if (!('PushManager' in window)) {
      setError('Tu navegador no soporta Push API');
      return;
    }

    setIsSupported(true);
    setPermission(Notification.permission);

    // Verificar si el service worker está registrado
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      setServiceWorkerReady(true);
    }
  };

  const checkExistingSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) return;

      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Error verificando suscripción existente:', error);
    }
  };

  // ===========================================
  // REGISTRO DEL SERVICE WORKER
  // ===========================================

  const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('✅ Service Worker registrado:', registration);

      // Esperar a que esté activo
      await navigator.serviceWorker.ready;
      setServiceWorkerReady(true);

      return registration;
    } catch (error) {
      console.error('❌ Error registrando Service Worker:', error);
      setError('Error registrando service worker');
      return null;
    }
  };

  // ===========================================
  // SOLICITAR PERMISOS
  // ===========================================

  const requestPermission = async (): Promise<boolean> => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        console.log('✅ Permisos de notificación concedidos');
        return true;
      } else {
        console.log('❌ Permisos de notificación denegados');
        setError('Permisos de notificación denegados');
        return false;
      }
    } catch (error) {
      console.error('❌ Error solicitando permisos:', error);
      setError('Error solicitando permisos');
      return false;
    }
  };

  // ===========================================
  // SUSCRIBIRSE A PUSH
  // ===========================================

  const subscribeToPush = async () => {
    setIsLoading(true);
    setError('');

    try {
      // 1. Solicitar permisos si no están concedidos
      if (permission !== 'granted') {
        const granted = await requestPermission();
        if (!granted) return;
      }

      // 2. Registrar service worker si no está listo
      let registration: ServiceWorkerRegistration | null | undefined = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        registration = await registerServiceWorker();
        if (!registration) return;
      }

      // 3. Obtener clave VAPID del servidor
      const vapidResponse = await fetch('/api/push/vapid-public-key');
      if (!vapidResponse.ok) {
        throw new Error('Error obteniendo clave VAPID');
      }

      const { publicKey } = await vapidResponse.json();
      if (!publicKey) {
        throw new Error('Clave VAPID no configurada');
      }

      // 4. Crear suscripción push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      });

      console.log('✅ Suscripción push creada:', subscription);

      // 5. Enviar suscripción al servidor
      const response = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: arrayBufferToBase64(subscription.getKey('p256dh')!),
              auth: arrayBufferToBase64(subscription.getKey('auth')!)
            }
          },
          userId
        })
      });

      if (!response.ok) {
        throw new Error('Error enviando suscripción al servidor');
      }

      const result = await response.json();
      console.log('✅ Suscripción enviada al servidor:', result);

      setIsSubscribed(true);
      setError('');

    } catch (error: any) {
      console.error('❌ Error suscribiéndose a push:', error);
      setError(error.message || 'Error suscribiéndose a notificaciones');
    } finally {
      setIsLoading(false);
    }
  };

  // ===========================================
  // DESUSCRIBIRSE DE PUSH
  // ===========================================

  const unsubscribeFromPush = async () => {
    setIsLoading(true);
    setError('');

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        throw new Error('Service Worker no registrado');
      }

      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        setIsSubscribed(false);
        return;
      }

      // Desuscribir del navegador
      const unsubscribed = await subscription.unsubscribe();
      if (unsubscribed) {
        console.log('✅ Desuscripción del navegador exitosa');

        // Notificar al servidor
        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint
          })
        });

        setIsSubscribed(false);
      }

    } catch (error: any) {
      console.error('❌ Error desuscrbiéndose:', error);
      setError(error.message || 'Error desuscrbiéndose');
    } finally {
      setIsLoading(false);
    }
  };

  // ===========================================
  // UTILIDADES
  // ===========================================

  const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // ===========================================
  // RENDER
  // ===========================================

  if (!isSupported) {
    return (
      <div className={`border border-yellow-200 bg-yellow-50 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-3">
          <span className="text-yellow-600">❌</span>
          <div>
            <p className="font-medium text-yellow-800">Notificaciones no soportadas</p>
            <p className="text-sm text-yellow-700">
              {error || 'Tu navegador no soporta notificaciones push'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      <div className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            {isSubscribed ? (
              <span className="text-green-600">🔔</span>
            ) : (
              <span className="text-gray-400">🔕</span>
            )}
            <h3 className="text-lg font-semibold">Notificaciones Push</h3>
            {isSubscribed && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Activo
              </span>
            )}
          </div>

        <p className="text-gray-600 text-sm mb-4">
          Recibe notificaciones instantáneas de las últimas noticias políticas
        </p>

        <div className="space-y-4">
          {/* Estado de permisos */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Permisos del navegador:</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              permission === 'granted'
                ? 'bg-green-100 text-green-800'
                : permission === 'denied'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
            }`}>
              {permission === 'granted' ? 'Concedidos' : permission === 'denied' ? 'Denegados' : 'Pendiente'}
            </span>
          </div>

          {/* Estado del Service Worker */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Service Worker:</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              serviceWorkerReady ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {serviceWorkerReady ? 'Listo' : 'Cargando...'}
            </span>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex space-x-2">
            {!isSubscribed ? (
              <button
                onClick={subscribeToPush}
                disabled={isLoading || permission === 'denied'}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="animate-spin mr-2">⏳</span>
                ) : (
                  <span className="mr-2">🔔</span>
                )}
                {isLoading ? 'Suscribiendo...' : 'Activar Notificaciones'}
              </button>
            ) : (
              <button
                onClick={unsubscribeFromPush}
                disabled={isLoading}
                className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="animate-spin mr-2">⏳</span>
                ) : (
                  <span className="mr-2">🔕</span>
                )}
                {isLoading ? 'Desuscrbiendo...' : 'Desactivar Notificaciones'}
              </button>
            )}

            <button className="p-2 text-gray-400 hover:text-gray-600">
              ⚙️
            </button>
          </div>

          {/* Información adicional */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Recibe alertas de noticias de última hora</p>
            <p>• Notificaciones de categorías que te interesan</p>
            <p>• Actualizaciones importantes del portal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
