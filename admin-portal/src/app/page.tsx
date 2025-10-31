import { Metadata } from 'next';
import { AdminDashboard } from '@/components/AdminDashboard';

export const metadata: Metadata = {
  title: 'Dashboard Administrativo',
  description: 'Panel principal de administración de Política Argentina',
};

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}