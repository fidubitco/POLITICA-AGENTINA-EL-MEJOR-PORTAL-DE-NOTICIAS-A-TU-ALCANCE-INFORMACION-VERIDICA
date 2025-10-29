# 🔐 CREDENCIALES DE ACCESO - PANEL ADMINISTRATIVO

## 📅 Fecha de Creación: 29 de Octubre, 2025
## 🔒 Nivel de Seguridad: MÁXIMO
## ⚠️ CONFIDENCIAL - NO COMPARTIR

---

## 🚀 **ACCESO AL PANEL ADMINISTRATIVO**

### **URL de Acceso:**
```
🌐 Producción: https://politicaargentina.com/admin/login
🖥️ Local: http://localhost:3000/admin/login
```

---

## 👤 **CREDENCIALES DE ADMINISTRADOR**

### **Usuario Principal:**
```
📧 Email: admin@politicaargentina.com
🔑 Password: Admin2025!Politica
👤 Rol: Super Administrador
✅ Permisos: TODOS
```

### **Usuario Editor:**
```
📧 Email: editor@politicaargentina.com
🔑 Password: Editor2025!News
👤 Rol: Editor
✅ Permisos: Crear/Editar noticias, Ver analytics
```

### **Usuario Demo:**
```
📧 Email: demo@politicaargentina.com
🔑 Password: Demo2025!Test
👤 Rol: Visor
✅ Permisos: Solo lectura
```

---

## 🎯 **FUNCIONALIDADES DISPONIBLES**

### **1. Dashboard Principal** (`/admin/dashboard`)
```
✅ Estadísticas en tiempo real
✅ Gráficos de visitas y engagement
✅ Artículos más leídos
✅ Analytics completo
✅ Métricas de SEO
```

### **2. CMS Editor** (`/admin/cms`)
```
✅ Editor de texto enriquecido (WYSIWYG)
✅ Gestión de imágenes
✅ Categorías y tags
✅ SEO metadata
✅ Preview en tiempo real
✅ Programación de publicaciones
```

### **3. Crear Noticia** (`/admin/crear-noticia`)
```
✅ Formulario completo
✅ Editor visual
✅ Subida de imágenes
✅ Selección de categoría
✅ Tags automáticos
✅ Optimización SEO
```

### **4. AI News Creator** (`/admin/ai-creator`)
```
✅ Generación de noticias con IA
✅ Reescritura automática
✅ Optimización SEO
✅ Sugerencias de títulos
✅ Generación de tags
✅ Análisis de sentimiento
```

### **5. Editar Artículos** (`/admin/editor/:id`)
```
✅ Edición de artículos existentes
✅ Historial de cambios
✅ Preview antes de publicar
✅ Control de versiones
✅ Restaurar versiones anteriores
```

### **6. Gestión de Usuarios** (`/admin/users`)
```
✅ Crear/Editar usuarios
✅ Asignar roles y permisos
✅ Activar/Desactivar cuentas
✅ Auditoría de acciones
```

### **7. Analytics** (`/admin/analytics`)
```
✅ Google Analytics integrado
✅ Métricas personalizadas
✅ Reportes exportables
✅ Análisis de audiencia
✅ Conversiones y objetivos
```

### **8. SEO Auditor** (`/admin/seo-auditor`)
```
✅ Análisis SEO de artículos
✅ Sugerencias de mejora
✅ Keywords research
✅ Competencia
✅ Backlinks
```

---

## 🔧 **CONFIGURACIÓN INICIAL**

### **Paso 1: Iniciar Servidor Backend**
```bash
cd "/Users/usuario/Documents/SITIO WEB POLITICA ARGENTINA"
npm run dev
```

### **Paso 2: Acceder al Panel**
```
1. Abrir navegador
2. Ir a: http://localhost:3000/admin/login
3. Ingresar credenciales de administrador
4. Click en "Iniciar Sesión"
```

### **Paso 3: Primera Configuración**
```
1. Cambiar contraseña por defecto
2. Configurar perfil de usuario
3. Revisar configuración del sitio
4. Verificar conexión con base de datos
```

---

## 📝 **CREAR NUEVA NOTICIA - GUÍA RÁPIDA**

### **Opción 1: Editor Manual** (`/admin/crear-noticia`)
```
1. Click en "Crear Nueva Noticia"
2. Completar formulario:
   - Título de la noticia
   - Categoría (Política, Economía, Judicial, etc.)
   - Contenido (editor WYSIWYG)
   - Imagen destacada
   - Tags
   - Metadata SEO
3. Preview
4. Publicar o Programar
```

### **Opción 2: AI News Creator** (`/admin/ai-creator`)
```
1. Click en "AI News Creator"
2. Ingresar tema o keywords
3. Seleccionar:
   - Categoría
   - Tono (Formal, Informal, Técnico)
   - Longitud (Corto, Medio, Largo)
4. Click en "Generar con IA"
5. Revisar y editar contenido generado
6. Publicar
```

### **Opción 3: CMS Editor** (`/admin/cms`)
```
1. Click en "CMS Editor"
2. Usar editor visual completo
3. Arrastrar y soltar elementos
4. Personalizar diseño
5. Guardar y publicar
```

---

## 🎨 **CATEGORÍAS DISPONIBLES**

```
🏛️ Política
💰 Economía
⚖️ Judicial
👥 Sociedad
🌍 Internacional
⚽ Deportes
🎭 Cultura
💻 Tecnología
📊 Opinión
🗳️ Elecciones
🏙️ Provincias
```

---

## 🔐 **SEGURIDAD**

### **Medidas Implementadas:**
```
✅ Autenticación JWT
✅ Encriptación de contraseñas (bcrypt)
✅ Sesiones seguras
✅ HTTPS obligatorio en producción
✅ Rate limiting
✅ Protección CSRF
✅ Validación de inputs
✅ Sanitización de HTML
```

### **Recomendaciones:**
```
⚠️ Cambiar contraseñas regularmente
⚠️ No compartir credenciales
⚠️ Usar autenticación de dos factores (próximamente)
⚠️ Revisar logs de acceso
⚠️ Mantener software actualizado
```

---

## 📊 **FLUJO DE TRABAJO RECOMENDADO**

### **Para Crear una Noticia:**
```
1. Login → Dashboard
2. Click "Crear Nueva Noticia"
3. Escribir contenido
4. Agregar imágenes
5. Seleccionar categoría
6. Agregar tags
7. Optimizar SEO
8. Preview
9. Publicar
```

### **Para Editar una Noticia:**
```
1. Login → Dashboard
2. Ver lista de artículos
3. Click en "Editar" en el artículo deseado
4. Modificar contenido
5. Guardar cambios
6. Re-publicar
```

### **Para Usar AI Creator:**
```
1. Login → AI News Creator
2. Ingresar tema: "Nueva ley de alquileres"
3. Seleccionar categoría: "Política"
4. Click "Generar"
5. Revisar contenido generado
6. Editar si es necesario
7. Publicar
```

---

## 🚀 **ATAJOS DE TECLADO**

```
Ctrl + S / Cmd + S: Guardar
Ctrl + P / Cmd + P: Preview
Ctrl + Shift + P: Publicar
Ctrl + B: Negrita
Ctrl + I: Cursiva
Ctrl + K: Insertar enlace
Ctrl + Shift + I: Insertar imagen
```

---

## 📞 **SOPORTE TÉCNICO**

### **En caso de problemas:**
```
1. Verificar que el servidor backend esté corriendo
2. Limpiar caché del navegador
3. Verificar credenciales
4. Revisar logs del servidor
5. Consultar documentación técnica
```

### **Logs del Sistema:**
```bash
# Ver logs del servidor
npm run dev

# Ver logs de errores
tail -f logs/error.log

# Ver logs de acceso
tail -f logs/access.log
```

---

## 🎯 **CHECKLIST DE VERIFICACIÓN**

### **Antes de Publicar:**
```
✅ Título atractivo y claro
✅ Contenido sin errores ortográficos
✅ Imágenes optimizadas
✅ Categoría correcta
✅ Tags relevantes
✅ Metadata SEO completa
✅ Preview verificado
✅ Enlaces funcionando
✅ Formato correcto
✅ Fuentes citadas (si aplica)
```

---

## 📚 **RECURSOS ADICIONALES**

### **Documentación:**
```
📄 Manual de Usuario: /docs/manual-usuario.pdf
📄 Guía de Estilo: /docs/guia-estilo.pdf
📄 SEO Best Practices: /docs/seo-guide.pdf
📄 API Documentation: /docs/api-docs.pdf
```

### **Videos Tutoriales:**
```
🎥 Cómo crear una noticia: /tutorials/crear-noticia.mp4
🎥 Usar AI Creator: /tutorials/ai-creator.mp4
🎥 Optimización SEO: /tutorials/seo-optimization.mp4
🎥 Gestión de imágenes: /tutorials/images.mp4
```

---

## ⚠️ **IMPORTANTE**

```
🔒 ESTAS CREDENCIALES SON CONFIDENCIALES
🔒 NO COMPARTIR CON TERCEROS
🔒 CAMBIAR CONTRASEÑAS REGULARMENTE
🔒 USAR CONEXIÓN SEGURA (HTTPS)
🔒 CERRAR SESIÓN AL TERMINAR
🔒 NO GUARDAR CONTRASEÑAS EN NAVEGADOR
```

---

**✅ SISTEMA ACTIVADO Y LISTO PARA USAR**

**🌐 URL:** https://politicaargentina.com/admin/login  
**📧 Email:** admin@politicaargentina.com  
**🔑 Password:** Admin2025!Politica  
**🎯 Estado:** ✅ ACTIVO Y FUNCIONAL  
**📊 Funcionalidades:** CMS + CRM + AI Creator + Analytics  
**🔐 Seguridad:** Máxima  

---

*Documento generado: 29 de Octubre, 2025*  
*Versión: 1.0*  
*Confidencialidad: MÁXIMA*  
*Uso: INTERNO EXCLUSIVO*

