import { Metadata } from 'next';
import { AdminDashboard } from '@/components/AdminDashboard';

export const metadata: Metadata = {
  title: 'Panel de Administración - Política Argentina',
  description: 'Panel de administración del portal de noticias políticas de Argentina',
};

export default function AdminPage() {
  return <AdminDashboard />;
}

