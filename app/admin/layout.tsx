import { Inter } from 'next/font/google';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Tags, 
  Users, 
  Settings,
  LogOut,
  BarChart3
} from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">PA</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Admin Panel</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin User</span>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto">
          <nav className="p-4 space-y-1">
            <Link
              href="/admin"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            
            <Link
              href="/admin/noticias"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">Noticias</span>
            </Link>
            
            <Link
              href="/admin/categorias"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Tags className="w-5 h-5" />
              <span className="font-medium">Categorías</span>
            </Link>
            
            <Link
              href="/admin/imagenes"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
              <span className="font-medium">Imágenes</span>
            </Link>
            
            <Link
              href="/admin/analytics"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Analytics</span>
            </Link>
            
            <Link
              href="/admin/usuarios"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Usuarios</span>
            </Link>
            
            <Link
              href="/admin/configuracion"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Configuración</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

