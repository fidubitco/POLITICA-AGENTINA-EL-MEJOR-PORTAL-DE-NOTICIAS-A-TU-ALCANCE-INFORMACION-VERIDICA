import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { PremiumButton, PremiumInput, PremiumCard } from '../../components/ui/premium';
import { MegaSEO } from '../../components/MegaSEO';

export const Login = () => {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      setLocation('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <MegaSEO
        title="Iniciar Sesión - Política Argentina"
        description="Accede a tu cuenta de administrador"
        noIndex={true}
      />

      <PremiumCard className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <LogIn className="text-blue-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido</h1>
          <p className="text-gray-600">Inicia sesión para acceder al panel de administración</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <PremiumInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="tu@email.com"
            icon={<Mail size={18} />}
            required
          />

          <PremiumInput
            label="Contraseña"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            icon={<Lock size={18} />}
            required
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span className="text-gray-600">Recordarme</span>
            </label>
            <Link href="/forgot-password">
              <a className="text-blue-600 hover:text-blue-700">¿Olvidaste tu contraseña?</a>
            </Link>
          </div>

          <PremiumButton
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            icon={<LogIn size={18} />}
          >
            Iniciar Sesión
          </PremiumButton>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link href="/register">
            <a className="text-blue-600 hover:text-blue-700 font-semibold">Regístrate aquí</a>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <Link href="/">
            <a className="text-gray-600 hover:text-gray-900 text-sm">← Volver al inicio</a>
          </Link>
        </div>
      </PremiumCard>
    </div>
  );
};

