"use client";

import { useState, useTransition } from "react";
import { Plus, Edit, Trash2, Mail, Calendar, FileText } from "lucide-react";
import { User, Role } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { createUser, updateUser, deleteUser } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type UserWithCount = User & {
  _count: { posts: number; comments: number };
};

interface UsersClientProps {
  initialUsers: UserWithCount[];
}

const roleConfig = {
  ADMIN: { label: "Admin", color: "bg-red-900/30 text-red-400" },
  EDITOR: { label: "Editor", color: "bg-purple-900/30 text-purple-400" },
  REPORTER: { label: "Reporter", color: "bg-blue-900/30 text-blue-400" },
  CONTRIBUTOR: {
    label: "Contributor",
    color: "bg-green-900/30 text-green-400",
  },
  READER: { label: "Reader", color: "bg-zinc-700 text-zinc-300" },
};

export default function UsersClient({ initialUsers }: UsersClientProps) {
  const [users, setUsers] = useState(initialUsers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "REPORTER" as Role,
    bio: "",
  });

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      role: "REPORTER",
      bio: "",
    });
  };

  const handleCreate = async () => {
    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append("email", formData.email);
        formDataObj.append("name", formData.name);
        formDataObj.append("role", formData.role);
        formDataObj.append("bio", formData.bio);

        await createUser(formDataObj);
        setIsCreateDialogOpen(false);
        resetForm();
        window.location.reload();
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Error al crear el usuario");
      }
    });
  };

  const handleUpdate = async () => {
    if (!editingUser) return;

    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("role", formData.role);
        formDataObj.append("bio", formData.bio);

        await updateUser(editingUser.id, formDataObj);
        setEditingUser(null);
        resetForm();
        window.location.reload();
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Error al actualizar el usuario");
      }
    });
  };

  const handleDelete = async () => {
    if (!deletingUser) return;

    startTransition(async () => {
      try {
        await deleteUser(deletingUser.id);
        setUsers(users.filter((u) => u.id !== deletingUser.id));
        setDeletingUser(null);
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error al eliminar el usuario");
      }
    });
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      name: user.name || "",
      role: user.role,
      bio: user.bio || "",
    });
  };

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Usuarios</h1>
          <p className="text-zinc-400 mt-1">{users.length} usuarios totales</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(roleConfig).map(([role, config]) => {
          const count = users.filter((u) => u.role === role).length;
          return (
            <div
              key={role}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">{config.label}s</p>
                  <p className="text-2xl font-bold mt-1">{count}</p>
                </div>
                <Badge className={config.color}>{config.label}</Badge>
              </div>
            </div>
          );
        })}
      </div>

      {/* Users Table */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-black">
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="text-center">Artículos</TableHead>
              <TableHead className="text-center">Comentarios</TableHead>
              <TableHead>Creado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.image || undefined} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {getInitials(user.name, user.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {user.name || "Sin nombre"}
                      </p>
                      <p className="text-sm text-zinc-500">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={roleConfig[user.role].color}>
                    {roleConfig[user.role].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className="px-2 py-1 bg-zinc-800 rounded text-sm">
                    {user._count.posts}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="px-2 py-1 bg-zinc-800 rounded text-sm">
                    {user._count.comments}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-zinc-400">
                  {formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true,
                    locale: es,
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(user)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingUser(user)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {users.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-500 mb-4">No hay usuarios todavía</p>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog
        open={isCreateDialogOpen || !!editingUser}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateDialogOpen(false);
            setEditingUser(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Editar usuario" : "Nuevo usuario"}
            </DialogTitle>
            <DialogDescription>
              {editingUser
                ? "Actualiza la información del usuario"
                : "Crea un nuevo usuario. La contraseña inicial será 'changeme123'"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="usuario@ejemplo.com"
                className="bg-black border-zinc-800"
                disabled={!!editingUser}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Nombre completo"
                className="bg-black border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rol *</Label>
              <Select
                value={formData.role}
                onValueChange={(value: Role) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger
                  id="role"
                  className="bg-black border-zinc-800"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="EDITOR">Editor</SelectItem>
                  <SelectItem value="REPORTER">Reporter</SelectItem>
                  <SelectItem value="CONTRIBUTOR">Contributor</SelectItem>
                  <SelectItem value="READER">Reader</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Biografía</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={3}
                placeholder="Breve descripción del usuario"
                className="bg-black border-zinc-800 resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateDialogOpen(false);
                setEditingUser(null);
                resetForm();
              }}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={editingUser ? handleUpdate : handleCreate}
              disabled={isPending || !formData.email}
            >
              {isPending
                ? "Guardando..."
                : editingUser
                ? "Actualizar"
                : "Crear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar usuario</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar al usuario "
              {deletingUser?.name || deletingUser?.email}"? Esta acción no se
              puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeletingUser(null)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
