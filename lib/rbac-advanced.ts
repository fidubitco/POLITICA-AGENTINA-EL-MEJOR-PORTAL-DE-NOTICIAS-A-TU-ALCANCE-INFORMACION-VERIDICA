/**
 * SISTEMA AVANZADO DE CONTROL DE ACCESO BASADO EN ROLES (RBAC)
 * 
 * Roles jerárquicos:
 * - SUPER_ADMIN: Control total del sistema
 * - ADMIN: Administración completa del contenido
 * - EDITOR: Edición y publicación de contenido
 * - AUTHOR: Creación de contenido propio
 * - CONTRIBUTOR: Envío de contenido para revisión
 * - SUBSCRIBER: Lectura y comentarios
 * - GUEST: Solo lectura
 */

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  AUTHOR = "AUTHOR",
  CONTRIBUTOR = "CONTRIBUTOR",
  SUBSCRIBER = "SUBSCRIBER",
  GUEST = "GUEST",
}

export enum Permission {
  // User Management
  MANAGE_USERS = "MANAGE_USERS",
  VIEW_USERS = "VIEW_USERS",
  EDIT_USER_ROLES = "EDIT_USER_ROLES",
  DELETE_USERS = "DELETE_USERS",

  // Content Management
  CREATE_POST = "CREATE_POST",
  EDIT_OWN_POST = "EDIT_OWN_POST",
  EDIT_ANY_POST = "EDIT_ANY_POST",
  DELETE_OWN_POST = "DELETE_OWN_POST",
  DELETE_ANY_POST = "DELETE_ANY_POST",
  PUBLISH_POST = "PUBLISH_POST",
  UNPUBLISH_POST = "UNPUBLISH_POST",

  // Category & Tags
  MANAGE_CATEGORIES = "MANAGE_CATEGORIES",
  MANAGE_TAGS = "MANAGE_TAGS",

  // Comments
  CREATE_COMMENT = "CREATE_COMMENT",
  MODERATE_COMMENTS = "MODERATE_COMMENTS",
  DELETE_ANY_COMMENT = "DELETE_ANY_COMMENT",

  // Media
  UPLOAD_MEDIA = "UPLOAD_MEDIA",
  DELETE_MEDIA = "DELETE_MEDIA",

  // Settings
  MANAGE_SETTINGS = "MANAGE_SETTINGS",
  VIEW_ANALYTICS = "VIEW_ANALYTICS",
  MANAGE_SEO = "MANAGE_SEO",

  // API
  USE_API = "USE_API",
  MANAGE_API_KEYS = "MANAGE_API_KEYS",
}

// Mapa de permisos por rol
export const rolePermissions: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: [
    // Todos los permisos
    ...Object.values(Permission),
  ],

  [Role.ADMIN]: [
    Permission.MANAGE_USERS,
    Permission.VIEW_USERS,
    Permission.EDIT_USER_ROLES,
    Permission.CREATE_POST,
    Permission.EDIT_OWN_POST,
    Permission.EDIT_ANY_POST,
    Permission.DELETE_OWN_POST,
    Permission.DELETE_ANY_POST,
    Permission.PUBLISH_POST,
    Permission.UNPUBLISH_POST,
    Permission.MANAGE_CATEGORIES,
    Permission.MANAGE_TAGS,
    Permission.CREATE_COMMENT,
    Permission.MODERATE_COMMENTS,
    Permission.DELETE_ANY_COMMENT,
    Permission.UPLOAD_MEDIA,
    Permission.DELETE_MEDIA,
    Permission.MANAGE_SETTINGS,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_SEO,
    Permission.USE_API,
  ],

  [Role.EDITOR]: [
    Permission.VIEW_USERS,
    Permission.CREATE_POST,
    Permission.EDIT_OWN_POST,
    Permission.EDIT_ANY_POST,
    Permission.DELETE_OWN_POST,
    Permission.PUBLISH_POST,
    Permission.UNPUBLISH_POST,
    Permission.MANAGE_CATEGORIES,
    Permission.MANAGE_TAGS,
    Permission.CREATE_COMMENT,
    Permission.MODERATE_COMMENTS,
    Permission.DELETE_ANY_COMMENT,
    Permission.UPLOAD_MEDIA,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_SEO,
    Permission.USE_API,
  ],

  [Role.AUTHOR]: [
    Permission.CREATE_POST,
    Permission.EDIT_OWN_POST,
    Permission.DELETE_OWN_POST,
    Permission.PUBLISH_POST,
    Permission.CREATE_COMMENT,
    Permission.UPLOAD_MEDIA,
    Permission.USE_API,
  ],

  [Role.CONTRIBUTOR]: [
    Permission.CREATE_POST,
    Permission.EDIT_OWN_POST,
    Permission.DELETE_OWN_POST,
    Permission.CREATE_COMMENT,
    Permission.UPLOAD_MEDIA,
  ],

  [Role.SUBSCRIBER]: [
    Permission.CREATE_COMMENT,
  ],

  [Role.GUEST]: [
    // Sin permisos especiales
  ],
};

/**
 * Verifica si un rol tiene un permiso específico
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  const permissions = rolePermissions[role] || [];
  return permissions.includes(permission);
}

/**
 * Verifica si un rol tiene todos los permisos especificados
 */
export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission));
}

/**
 * Verifica si un rol tiene al menos uno de los permisos especificados
 */
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

/**
 * Obtiene todos los permisos de un rol
 */
export function getRolePermissions(role: Role): Permission[] {
  return rolePermissions[role] || [];
}

/**
 * Verifica si un usuario puede realizar una acción sobre un recurso
 */
export interface ResourceOwnership {
  ownerId: string;
  currentUserId: string;
  userRole: Role;
}

export function canEditResource(ownership: ResourceOwnership): boolean {
  const { ownerId, currentUserId, userRole } = ownership;

  // Super Admin y Admin pueden editar todo
  if (userRole === Role.SUPER_ADMIN || userRole === Role.ADMIN) {
    return true;
  }

  // Editor puede editar cualquier post
  if (userRole === Role.EDITOR && hasPermission(userRole, Permission.EDIT_ANY_POST)) {
    return true;
  }

  // Autor y Contributor solo pueden editar sus propios posts
  if (ownerId === currentUserId && hasPermission(userRole, Permission.EDIT_OWN_POST)) {
    return true;
  }

  return false;
}

export function canDeleteResource(ownership: ResourceOwnership): boolean {
  const { ownerId, currentUserId, userRole } = ownership;

  // Super Admin y Admin pueden eliminar todo
  if (userRole === Role.SUPER_ADMIN || userRole === Role.ADMIN) {
    return true;
  }

  // Solo propietarios pueden eliminar sus recursos
  if (ownerId === currentUserId && hasPermission(userRole, Permission.DELETE_OWN_POST)) {
    return true;
  }

  return false;
}

export function canPublishPost(userRole: Role): boolean {
  return hasPermission(userRole, Permission.PUBLISH_POST);
}

/**
 * Middleware helper para verificar permisos en API routes
 */
export function requirePermission(permission: Permission) {
  return (userRole: Role) => {
    if (!hasPermission(userRole, permission)) {
      throw new Error(`Permission denied: ${permission} required`);
    }
    return true;
  };
}

/**
 * Obtiene el rol de un usuario desde la sesión
 */
export function getUserRole(user: any): Role {
  if (!user) return Role.GUEST;
  
  const roleString = user.role as string;
  return (Role[roleString as keyof typeof Role]) || Role.GUEST;
}

/**
 * Verifica si un rol es superior a otro en la jerarquía
 */
export function isRoleHigher(role1: Role, role2: Role): boolean {
  const hierarchy = [
    Role.GUEST,
    Role.SUBSCRIBER,
    Role.CONTRIBUTOR,
    Role.AUTHOR,
    Role.EDITOR,
    Role.ADMIN,
    Role.SUPER_ADMIN,
  ];

  const index1 = hierarchy.indexOf(role1);
  const index2 = hierarchy.indexOf(role2);

  return index1 > index2;
}

/**
 * Obtiene roles que un usuario puede asignar
 */
export function getAssignableRoles(currentRole: Role): Role[] {
  const hierarchy = [
    Role.GUEST,
    Role.SUBSCRIBER,
    Role.CONTRIBUTOR,
    Role.AUTHOR,
    Role.EDITOR,
    Role.ADMIN,
    Role.SUPER_ADMIN,
  ];

  const currentIndex = hierarchy.indexOf(currentRole);
  
  // Solo puede asignar roles inferiores al suyo
  return hierarchy.slice(0, currentIndex);
}

/**
 * Formatea nombre del rol para display
 */
export function formatRoleName(role: Role): string {
  const names: Record<Role, string> = {
    [Role.SUPER_ADMIN]: "Super Administrador",
    [Role.ADMIN]: "Administrador",
    [Role.EDITOR]: "Editor",
    [Role.AUTHOR]: "Autor",
    [Role.CONTRIBUTOR]: "Colaborador",
    [Role.SUBSCRIBER]: "Suscriptor",
    [Role.GUEST]: "Invitado",
  };

  return names[role] || role;
}

/**
 * Obtiene descripción del rol
 */
export function getRoleDescription(role: Role): string {
  const descriptions: Record<Role, string> = {
    [Role.SUPER_ADMIN]: "Control total del sistema y todos los usuarios",
    [Role.ADMIN]: "Administración completa del contenido y usuarios",
    [Role.EDITOR]: "Edición y publicación de todo el contenido",
    [Role.AUTHOR]: "Creación y publicación de contenido propio",
    [Role.CONTRIBUTOR]: "Envío de contenido para revisión",
    [Role.SUBSCRIBER]: "Acceso a contenido premium y comentarios",
    [Role.GUEST]: "Solo lectura de contenido público",
  };

  return descriptions[role] || "";
}

/**
 * Rate limiting por rol
 */
export function getRateLimits(role: Role): {
  postsPerDay: number;
  commentsPerHour: number;
  apiCallsPerMinute: number;
} {
  const limits: Record<Role, ReturnType<typeof getRateLimits>> = {
    [Role.SUPER_ADMIN]: { postsPerDay: 1000, commentsPerHour: 1000, apiCallsPerMinute: 1000 },
    [Role.ADMIN]: { postsPerDay: 100, commentsPerHour: 100, apiCallsPerMinute: 100 },
    [Role.EDITOR]: { postsPerDay: 50, commentsPerHour: 50, apiCallsPerMinute: 60 },
    [Role.AUTHOR]: { postsPerDay: 10, commentsPerHour: 20, apiCallsPerMinute: 30 },
    [Role.CONTRIBUTOR]: { postsPerDay: 5, commentsPerHour: 10, apiCallsPerMinute: 20 },
    [Role.SUBSCRIBER]: { postsPerDay: 0, commentsPerHour: 5, apiCallsPerMinute: 10 },
    [Role.GUEST]: { postsPerDay: 0, commentsPerHour: 0, apiCallsPerMinute: 5 },
  };

  return limits[role];
}

