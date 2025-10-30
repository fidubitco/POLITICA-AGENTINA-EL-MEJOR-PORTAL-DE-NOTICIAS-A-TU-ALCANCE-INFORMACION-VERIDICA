'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);

    // Simular API call
    setTimeout(() => {
      setIsSubscribed(true);
      setLoading(false);
      setEmail('');
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-6 h-6" />
        <h3 className="text-lg font-semibold">Newsletter</h3>
      </div>

      <p className="text-blue-100 text-sm mb-4">
        Recibe las últimas noticias políticas directamente en tu email
      </p>

      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu email aquí"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                Suscribiendo...
              </>
            ) : (
              'Suscribirme'
            )}
          </button>
        </form>
      ) : (
        <div className="text-center space-y-2">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
          <p className="font-semibold">¡Suscripción exitosa!</p>
          <p className="text-blue-100 text-sm">
            Gracias por suscribirte. Recibirás nuestras mejores noticias.
          </p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-white/20">
        <p className="text-blue-200 text-xs text-center">
          Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
        </p>
      </div>
    </div>
  );
}

