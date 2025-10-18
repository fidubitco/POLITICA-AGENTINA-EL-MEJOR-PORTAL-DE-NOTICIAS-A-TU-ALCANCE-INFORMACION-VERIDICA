"use client";

import { useState } from "react";
import { Plus, UserPlus, Users as UsersIcon, Shield, UserCheck, UserX, Search, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/admin/StatsCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  articlesPublished?: number;
  joinedDate: string;
}

/**
 * User Management Page
 * Complete user management with role assignment and status control
 */
export default function UsuariosPage() {
  // Mock users data
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Admin Principal",
      email: "admin@politica-argentina.com",
      role: "admin",
      status: "active",
      lastLogin: "2025-10-18T10:00:00Z",
      articlesPublished: 45,
      joinedDate: "2024-01-15T00:00:00Z",
    },
    {
      id: 2,
      name: "Ana Martínez",
      email: "ana.martinez@politica-argentina.com",
      role: "editor",
      status: "active",
      lastLogin: "2025-10-18T09:30:00Z",
      articlesPublished: 23,
      joinedDate: "2024-03-20T00:00:00Z",
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@politica-argentina.com",
      role: "editor",
      status: "active",
      lastLogin: "2025-10-18T08:15:00Z",
      articlesPublished: 31,
      joinedDate: "2024-02-10T00:00:00Z",
    },
    {
      id: 4,
      name: "Laura González",
      email: "laura.gonzalez@politica-argentina.com",
      role: "editor",
      status: "active",
      lastLogin: "2025-10-17T18:45:00Z",
      articlesPublished: 18,
      joinedDate: "2024-05-05T00:00:00Z",
    },
    {
      id: 5,
      name: "Juan Pérez",
      email: "juan.perez@politica-argentina.com",
      role: "viewer",
      status: "active",
      lastLogin: "2025-10-16T14:20:00Z",
      articlesPublished: 0,
      joinedDate: "2024-08-12T00:00:00Z",
    },
    {
      id: 6,
      name: "María López",
      email: "maria.lopez@politica-argentina.com",
      role: "editor",
      status: "inactive",
      lastLogin: "2025-09-30T12:00:00Z",
      articlesPublished: 12,
      joinedDate: "2024-04-18T00:00:00Z",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editDialog, setEditDialog] = useState<User | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<number | null>(null);
  const [addDialog, setAddDialog] = useState(false);

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const adminUsers = users.filter(u => u.role === "admin").length;
  const editorUsers = users.filter(u => u.role === "editor").length;

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEdit = (user: User) => {
    setEditDialog(user);
  };

  const handleDelete = (id: number) => {
    setDeleteDialog(id);
  };

  const confirmDelete = () => {
    if (deleteDialog) {
      setUsers(prev => prev.filter(u => u.id !== deleteDialog));
      setDeleteDialog(null);
    }
  };

  const saveEdit = () => {
    if (editDialog) {
      setUsers(prev => prev.map(u => u.id === editDialog.id ? editDialog : u));
      setEditDialog(null);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-600/20 text-red-500 border-red-600/30";
      case "editor":
        return "bg-blue-600/20 text-blue-500 border-blue-600/30";
      case "viewer":
        return "bg-gray-600/20 text-gray-400 border-gray-600/30";
      default:
        return "bg-zinc-600/20 text-zinc-400";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600/20 text-green-500 border-green-600/30";
      case "inactive":
        return "bg-orange-600/20 text-orange-500 border-orange-600/30";
      case "suspended":
        return "bg-red-600/20 text-red-500 border-red-600/30";
      default:
        return "bg-zinc-600/20 text-zinc-400";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Gestión de Usuarios
          </h1>
          <p className="text-zinc-500 mt-2">
            Administra usuarios, roles y permisos del sistema
          </p>
        </div>
        <Button
          onClick={() => setAddDialog(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Usuarios"
          value={totalUsers}
          icon={UsersIcon}
          color="text-blue-500"
          bgColor="bg-blue-500/10"
          change="+3"
          trend="up"
        />
        <StatsCard
          title="Usuarios Activos"
          value={activeUsers}
          icon={UserCheck}
          color="text-green-500"
          bgColor="bg-green-500/10"
          description={`${Math.round((activeUsers / totalUsers) * 100)}% del total`}
        />
        <StatsCard
          title="Administradores"
          value={adminUsers}
          icon={Shield}
          color="text-red-500"
          bgColor="bg-red-500/10"
          description="Con acceso total"
        />
        <StatsCard
          title="Editores"
          value={editorUsers}
          icon={UserPlus}
          color="text-purple-500"
          bgColor="bg-purple-500/10"
          description="Pueden publicar"
        />
      </div>

      {/* Users Table */}
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="flex items-center gap-3">
            <UsersIcon className="w-6 h-6 text-blue-500" />
            Todos los Usuarios
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-zinc-900 border-zinc-800"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm"
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="suspended">Suspendidos</option>
            </select>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableHead className="text-zinc-400">Usuario</TableHead>
                  <TableHead className="text-zinc-400">Rol</TableHead>
                  <TableHead className="text-zinc-400">Estado</TableHead>
                  <TableHead className="text-zinc-400">Último Acceso</TableHead>
                  <TableHead className="text-zinc-400">Artículos</TableHead>
                  <TableHead className="text-zinc-400 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-zinc-800 hover:bg-zinc-800/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-zinc-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm">
                      {formatDate(user.lastLogin)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-zinc-700">
                        {user.articlesPublished || 0}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(user)}
                          className="hover:bg-blue-600/20 hover:text-blue-500"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          className="hover:bg-red-600/20 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={editDialog !== null} onOpenChange={() => setEditDialog(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Modifica la información y permisos del usuario
            </DialogDescription>
          </DialogHeader>
          {editDialog && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre</Label>
                <Input
                  value={editDialog.name}
                  onChange={(e) => setEditDialog({ ...editDialog, name: e.target.value })}
                  className="bg-zinc-950 border-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editDialog.email}
                  onChange={(e) => setEditDialog({ ...editDialog, email: e.target.value })}
                  className="bg-zinc-950 border-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label>Rol</Label>
                <Select
                  value={editDialog.role}
                  onValueChange={(value: any) => setEditDialog({ ...editDialog, role: value })}
                >
                  <SelectTrigger className="bg-zinc-950 border-zinc-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select
                  value={editDialog.status}
                  onValueChange={(value: any) => setEditDialog({ ...editDialog, status: value })}
                >
                  <SelectTrigger className="bg-zinc-950 border-zinc-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                    <SelectItem value="suspended">Suspendido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialog(null)}
              className="border-zinc-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={saveEdit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog !== null} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription className="text-zinc-400">
              ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog(null)}
              className="border-zinc-800"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Nuevo Usuario</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Crea un nuevo usuario en el sistema
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                placeholder="Nombre completo"
                className="bg-zinc-950 border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="email@ejemplo.com"
                className="bg-zinc-950 border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <Select>
                <SelectTrigger className="bg-zinc-950 border-zinc-800">
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddDialog(false)}
              className="border-zinc-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setAddDialog(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Crear Usuario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
