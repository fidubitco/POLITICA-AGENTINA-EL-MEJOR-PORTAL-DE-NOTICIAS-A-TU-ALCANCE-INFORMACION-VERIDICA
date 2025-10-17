'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('¡Te has suscrito exitosamente! Revisa tu email.');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Hubo un error. Intenta de nuevo.');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error de conexión. Intenta más tarde.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-red-950/40 via-red-900/30 to-blue-950/40 border-zinc-800 shadow-2xl shadow-red-600/10">
      <CardContent className="p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-600/30 animate-pulse">
          <Send className="w-10 h-10" />
        </div>

        <div>
          <h3 className="font-black text-2xl mb-2">Newsletter Diario</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Las noticias más importantes en tu email cada mañana. Gratis y sin spam.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-green-950/30 border border-green-800 rounded-lg p-4 space-y-2">
            <CheckCircle className="w-8 h-8 mx-auto text-green-500" />
            <p className="text-green-400 text-sm font-semibold">{message}</p>
          </div>
        ) : status === 'error' ? (
          <div className="bg-red-950/30 border border-red-800 rounded-lg p-4 space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-red-500" />
            <p className="text-red-400 text-sm font-semibold">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              className="bg-zinc-900/50 border-zinc-800 focus:border-red-600 h-12 text-base"
            />
            <Button
              type="submit"
              disabled={status === 'loading' || !email}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 h-12 text-base font-bold shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Suscribiendo...
                </span>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Suscribirme Gratis
                </>
              )}
            </Button>
          </form>
        )}

        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-semibold">+50.000 lectores suscritos</span>
        </div>

        <p className="text-xs text-zinc-600">
          Al suscribirte aceptas nuestra política de privacidad. Puedes cancelar en cualquier momento.
        </p>
      </CardContent>
    </Card>
  );
}
