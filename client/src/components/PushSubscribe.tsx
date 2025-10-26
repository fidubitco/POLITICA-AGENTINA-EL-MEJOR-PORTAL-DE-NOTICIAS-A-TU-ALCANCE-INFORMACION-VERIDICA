import React, { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { PremiumButton } from './ui/premium';

const VAPID_PUBLIC_KEY =
  'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDJo3YQwP7OwH9YqOhbJjwPsrsfKW7rZYMOuftccZmls';

export const PushSubscribe: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar si el navegador soporta notificaciones push
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      checkSubscription();
    }
  }, []);

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Error verificando suscripción:', error);
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
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

  const subscribe = async () => {
    setLoading(true);

    try {
      // Solicitar permiso
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        alert('Necesitas permitir las notificaciones para continuar');
        setLoading(false);
        return;
      }

      // Obtener service worker registration
      const registration = await navigator.serviceWorker.ready;

      // Suscribirse a push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      // Enviar suscripción al servidor
      const response = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
        }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        console.log('✅ Suscrito a notificaciones push');
      } else {
        throw new Error('Error suscribiendo en el servidor');
      }
    } catch (error) {
      console.error('Error suscribiendo a push:', error);
      alert('Error al suscribirse a notificaciones');
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    setLoading(true);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        // Desuscribirse
        await subscription.unsubscribe();

        // Notificar al servidor
        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint,
          }),
        });

        setIsSubscribed(false);
        console.log('✅ Desuscrito de notificaciones push');
      }
    } catch (error) {
      console.error('Error desuscribiendo de push:', error);
      alert('Error al desuscribirse de notificaciones');
    } finally {
      setLoading(false);
    }
  };

  if (!isSupported) {
    return null; // No mostrar nada si no es soportado
  }

  return (
    <div className="push-subscribe">
      {isSubscribed ? (
        <PremiumButton
          variant="secondary"
          size="sm"
          icon={<BellOff size={18} />}
          onClick={unsubscribe}
          loading={loading}
        >
          Desactivar Notificaciones
        </PremiumButton>
      ) : (
        <PremiumButton
          variant="primary"
          size="sm"
          icon={<Bell size={18} />}
          onClick={subscribe}
          loading={loading}
        >
          Activar Notificaciones
        </PremiumButton>
      )}
    </div>
  );
};

