import { useState } from 'react';
import { Link } from 'wouter';
import { User, Mail, Lock, Save, LogOut, Shield, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { PremiumButton, PremiumInput, PremiumCard, PremiumBadge } from '../../components/ui/premium';
import { MegaSEO } from '../../components/MegaSEO';
import { BBCHeader } from '../../components/BBCHeader';

export const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Aquí iría la llamada a la API
      // await usersAPI.update(user!.id, { username, email });
      
      // Simular actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUser({ ...user!, username, email });
      setSuccess('Perfil actualizado correctamente');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      // Aquí iría la llamada a la API
      // await authAPI.changePassword(currentPassword, newPassword);
      
      // Simular cambio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Contraseña cambiada correctamente');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cambiar contraseña');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <PremiumBadge variant="error" icon={<Shield size={14} />}>Administrador</PremiumBadge>;
      case 'editor':
        return <PremiumBadge variant="warning" icon={<Shield size={14} />}>Editor</PremiumBadge>;
      default:
        return <PremiumBadge variant="info" icon={<Shield size={14} />}>Viewer</PremiumBadge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaSEO
        title="Mi Perfil - Política Argentina"
        description="Gestiona tu perfil de usuario"
        noIndex={true}
      />

      <BBCHeader />

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
            <p className="text-gray-600">Gestiona tu información personal y configuración</p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">{success}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PremiumCard>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                    <span className="text-4xl font-bold text-white">
                      {user?.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.username}</h2>
                  <p className="text-gray-600 mb-4">{user?.email}</p>
                  {user && getRoleBadge(user.role)}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>Miembro desde {new Date(user?.created_at || '').toLocaleDateString('es-AR')}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <PremiumButton
                    variant="danger"
                    fullWidth
                    icon={<LogOut size={18} />}
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </PremiumButton>
                </div>
              </PremiumCard>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Información Personal */}
              <PremiumCard>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <User size={20} />
                  Información Personal
                </h3>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <PremiumInput
                    label="Nombre de Usuario"
                    value={username}
                    onChange={setUsername}
                    icon={<User size={18} />}
                    required
                  />

                  <PremiumInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    icon={<Mail size={18} />}
                    required
                  />

                  <div className="flex justify-end">
                    <PremiumButton
                      type="submit"
                      variant="primary"
                      loading={loading}
                      icon={<Save size={18} />}
                    >
                      Guardar Cambios
                    </PremiumButton>
                  </div>
                </form>
              </PremiumCard>

              {/* Cambiar Contraseña */}
              <PremiumCard>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Lock size={20} />
                  Cambiar Contraseña
                </h3>

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <PremiumInput
                    label="Contraseña Actual"
                    type="password"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    icon={<Lock size={18} />}
                    required
                  />

                  <PremiumInput
                    label="Nueva Contraseña"
                    type="password"
                    value={newPassword}
                    onChange={setNewPassword}
                    icon={<Lock size={18} />}
                    required
                  />

                  <PremiumInput
                    label="Confirmar Nueva Contraseña"
                    type="password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    icon={<Lock size={18} />}
                    required
                  />

                  <div className="flex justify-end">
                    <PremiumButton
                      type="submit"
                      variant="primary"
                      loading={loading}
                      icon={<Save size={18} />}
                    >
                      Cambiar Contraseña
                    </PremiumButton>
                  </div>
                </form>
              </PremiumCard>

              {/* Accesos Rápidos */}
              <PremiumCard>
                <h3 className="text-xl font-bold mb-4">Accesos Rápidos</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/admin/dashboard">
                    <PremiumButton variant="secondary" fullWidth>
                      Dashboard
                    </PremiumButton>
                  </Link>
                  <Link href="/admin/crear-noticia">
                    <PremiumButton variant="secondary" fullWidth>
                      Crear Noticia
                    </PremiumButton>
                  </Link>
                </div>
              </PremiumCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

