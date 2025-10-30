import { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Dashboard Administrativo | Política Argentina',
  description: 'Panel de administración del portal de noticias políticas',
};

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}

