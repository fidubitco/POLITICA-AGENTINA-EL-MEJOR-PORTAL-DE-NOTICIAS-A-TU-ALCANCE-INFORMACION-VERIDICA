import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { PremiumButton, PremiumInput, PremiumCard } from '../../components/ui/premium';
import { MegaSEO } from '../../components/MegaSEO';

export const Register = () => {
  const [, setLocation] = useLocation();
  const { register } = useAuth();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    if (username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres');
      return false;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await register(username, email, password);
      setLocation('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: 'Débil', color: 'bg-red-500' };
    if (strength <= 3) return { strength, label: 'Media', color: 'bg-yellow-500' };
    return { strength, label: 'Fuerte', color: 'bg-green-500' };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <MegaSEO
        title="Registrarse - Política Argentina"
        description="Crea tu cuenta de administrador"
        noIndex={true}
      />

      <PremiumCard className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <UserPlus className="text-green-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
          <p className="text-gray-600">Regístrate para acceder al panel de administración</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <PremiumInput
            label="Nombre de Usuario"
            type="text"
            value={username}
            onChange={setUsername}
            placeholder="juanperez"
            icon={<User size={18} />}
            required
          />

          <PremiumInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="tu@email.com"
            icon={<Mail size={18} />}
            required
          />

          <div>
            <PremiumInput
              label="Contraseña"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              icon={<Lock size={18} />}
              required
            />
            {password && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Fortaleza de la contraseña:</span>
                  <span className="font-semibold">{strength.label}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${(strength.strength / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <PremiumInput
            label="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="••••••••"
            icon={<Lock size={18} />}
            required
          />

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">
              Acepto los{' '}
              <Link href="/terms">
                <a className="text-blue-600 hover:text-blue-700">términos y condiciones</a>
              </Link>{' '}
              y la{' '}
              <Link href="/privacy">
                <a className="text-blue-600 hover:text-blue-700">política de privacidad</a>
              </Link>
            </span>
          </label>

          <PremiumButton
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            icon={<UserPlus size={18} />}
          >
            Crear Cuenta
          </PremiumButton>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login">
            <a className="text-blue-600 hover:text-blue-700 font-semibold">Inicia sesión aquí</a>
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

