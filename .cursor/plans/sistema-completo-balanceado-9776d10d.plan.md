<!-- 9776d10d-39e3-479f-b989-2d9ecb2dd220 791d8dd3-b899-42e7-b007-0ae67ec79f44 -->
# Plan: Sistema Completo Balanceado

## Fase 1: Scraping Real de Noticias

### 1.1 Crear servicio de scraping

- Archivo: `server/services/scraper.ts`
- Instalar: `cheerio`, `axios`, `node-cron`
- Implementar scraper para las 8 fuentes configuradas (Clarín, La Nación, Infobae, etc.)
- Extraer: título, contenido, imagen, categoría, fecha
- Guardar en tabla `scraped_articles` con status 'pending'

### 1.2 Integrar con AutoNews page

- Actualizar: `client/src/pages/admin/AutoNews.tsx`
- Conectar con API real de scraping
- Implementar sincronización automática con `node-cron`
- Botón "Sincronizar Ahora" funcional

## Fase 2: Editor WYSIWYG

### 2.1 Instalar Quill.js

- Instalar: `react-quill`, `quill`
- Configurar toolbar profesional (formato, imágenes, links, código)

### 2.2 Integrar en CreateNews

- Actualizar: `client/src/pages/admin/CreateNews.tsx`
- Reemplazar textarea con Quill editor
- Mantener preview en tiempo real
- Soporte para imágenes inline

## Fase 3: Sistema de Notificaciones Push

### 3.1 Backend push notifications

- Archivo: `server/services/pushNotifications.ts`
- Instalar: `web-push`
- Implementar endpoints: subscribe, unsubscribe, send
- Guardar subscriptions en tabla `push_subscriptions`

### 3.2 Frontend service worker

- Archivo: `client/public/sw.js`
- Registrar service worker en `client/src/main.tsx`
- Componente: `client/src/components/PushSubscribe.tsx`
- Solicitar permisos y suscribir usuarios

### 3.3 Notificar nuevas noticias

- Trigger automático al publicar artículo
- Enviar push a usuarios suscritos
- Panel en dashboard para enviar notificaciones manuales

## Fase 4: Analytics Avanzado con Gráficos

### 4.1 Instalar librerías de gráficos

- Instalar: `recharts`, `date-fns`
- Crear componentes de gráficos reutilizables

### 4.2 Mejorar DashboardAnalytics

- Actualizar: `client/src/pages/admin/DashboardAnalytics.tsx`
- Agregar gráficos:
  - Line chart: Vistas por día (últimos 30 días)
  - Bar chart: Artículos por categoría
  - Pie chart: Usuarios por idioma
  - Area chart: Engagement (vistas, shares, likes)
- Conectar con API de analytics real

### 4.3 Backend analytics API

- Archivo: `server/api/analytics.ts`
- Endpoints para métricas agregadas
- Queries optimizadas con índices

## Fase 5: Export de Reportes PDF/Excel

### 5.1 Backend export service

- Archivo: `server/services/export.ts`
- Instalar: `pdfkit`, `exceljs`
- Implementar generación de PDF (artículos, analytics)
- Implementar generación de Excel (métricas, usuarios, artículos)

### 5.2 Frontend export buttons

- Componente: `client/src/components/ExportButton.tsx`
- Botones en dashboard para exportar
- Download automático de archivos generados

## Fase 6: Integración Ollama + deepseek-r1:1.5b

### 6.1 Backend Ollama service

- Archivo: `server/services/ollama.ts`
- Instalar: `ollama` (npm package o API calls)
- Configurar conexión a Ollama local/remoto
- Funciones:
  - Generar noticia desde prompt
  - Mejorar contenido existente
  - Sugerir títulos y extractos
  - Categorizar automáticamente

### 6.2 Integrar en CreateNews

- Botón "Generar con IA" en formulario
- Autocompletar campos con sugerencias IA
- Preview de contenido generado

### 6.3 Auto-publicación inteligente

- Actualizar AutoNews para usar IA
- Validar calidad de noticias scrapeadas con IA
- Auto-aprobar si pasa threshold de calidad

## Fase 7: Redis Cache

### 7.1 Setup Redis

- Instalar: `redis`, `ioredis`
- Archivo: `server/services/cache.ts`
- Configurar conexión (local o Upstash)

### 7.2 Implementar caching

- Cache artículos populares (TTL: 5 min)
- Cache estadísticas dashboard (TTL: 1 min)
- Cache categorías y tags (TTL: 1 hora)
- Invalidar cache al crear/actualizar artículos

## Fase 8: Diseño Galardonado Top World Class

### 8.1 Sistema de Diseño Premium

- Archivo: `client/src/styles/design-system.css`
- Tipografía profesional: Inter (UI), Merriweather (contenido), Playfair Display (títulos)
- Paleta de colores sofisticada:
  - Primary: #1a1a2e (deep navy)
  - Secondary: #16213e (midnight blue)
  - Accent: #0f3460 (royal blue)
  - Highlight: #e94560 (vibrant red)
  - Neutrals: escala de grises con warmth
- Espaciado consistente (sistema 8pt)
- Elevaciones y sombras sutiles (8 niveles)
- Border radius armónico (4px, 8px, 12px, 16px)

### 8.2 Animaciones Micro-interacciones

- Instalar: `framer-motion`, `react-spring`
- Hover effects sofisticados en cards (lift + shadow)
- Page transitions fluidas (fade + slide)
- Scroll-triggered animations (parallax sutil)
- Loading states con skeleton screens elegantes
- Stagger animations para listas
- Gesture animations (swipe, drag)
- Progress indicators animados

### 8.3 Layout Profesional

- Grid system avanzado (12 columnas)
- Whitespace generoso y balanceado
- Jerarquía visual clara
- Contenedores con max-width óptimo (1280px)
- Secciones con padding vertical consistente
- Asymmetric layouts para interés visual
- Bento box grids para featured content

### 8.4 Componentes UI Premium

- Archivo: `client/src/components/ui/premium/`
- Cards con glassmorphism sutil
- Buttons con estados micro-animados
- Inputs con floating labels
- Dropdowns con animaciones suaves
- Modals con backdrop blur
- Tooltips elegantes
- Badges y tags refinados
- Progress bars con gradientes

### 8.5 Imágenes y Media

- Lazy loading con blur-up effect
- Image overlays con gradientes
- Aspect ratios consistentes (16:9, 4:3, 1:1)
- Hover zoom effects sutiles
- Lightbox para galería
- WebP con fallback
- Srcset responsive

### 8.6 Navegación Premium

- Header con scroll behavior (transparent → solid)
- Mega menu con categorías visuales
- Breadcrumbs con iconos
- Sidebar con collapse animation
- Tab navigation con indicator animado
- Pagination elegante
- Infinite scroll con loading indicator

### 8.7 Dashboard UI Profesional

- Archivo: `client/src/styles/dashboard-premium.css`
- Sidebar oscuro con iconos coloridos
- Cards con stats animados (count-up)
- Gráficos con tooltips interactivos
- Tables con hover states y sorting
- Filters con chips animados
- Action buttons con confirmación visual
- Notifications panel con badges

### 8.8 Responsive Excellence

- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px, 1536px
- Touch-friendly targets (min 44px)
- Hamburger menu animado
- Bottom navigation en mobile
- Swipeable cards en mobile
- Optimized font sizes por breakpoint

### 8.9 Accesibilidad Premium

- Focus states visibles y elegantes
- ARIA labels completos
- Keyboard navigation fluida
- Color contrast WCAG AAA
- Screen reader optimizado
- Skip to content link
- Reduced motion support

### 8.10 Performance Visual

- CSS critical path inline
- Font loading optimizado (font-display: swap)
- Animations con GPU acceleration (transform, opacity)
- Will-change para animaciones complejas
- Debounced scroll events
- Intersection Observer para lazy loading
- CSS containment para aislamiento

## Fase 9: Conectar Frontend con API

### 9.1 Configurar tRPC/API client

- Actualizar: `client/src/lib/trpc.ts` o crear API client
- Configurar base URL (Railway/Render backend)
- Manejo de errores y retry logic

### 9.2 Hooks para API calls

- Archivo: `client/src/hooks/useArticles.ts`
- Archivo: `client/src/hooks/useAuth.ts`
- Archivo: `client/src/hooks/useAnalytics.ts`
- React Query para caching y optimistic updates

### 9.3 Actualizar componentes

- CreateNews: POST a API real
- AutoNews: GET/POST scraping API
- DashboardAnalytics: GET analytics API
- Login/Register: POST auth API

## Fase 10: Deploy Backend en Railway

### 10.1 Configurar Railway

- Crear proyecto en Railway
- Agregar MySQL database
- Agregar Redis
- Configurar variables de entorno

### 10.2 Deploy backend

- Archivo: `railway.json` o `railway.toml`
- Configurar build command: `pnpm build`
- Configurar start command: `node dist/index.js`
- Deploy y obtener URL

### 10.3 Actualizar frontend

- Actualizar API URLs en `.env`
- Rebuild y redeploy en Vercel

## Fase 11: Testing y Optimización

### 11.1 Testing funcional

- Probar scraping de noticias
- Probar creación con IA
- Probar notificaciones push
- Probar export PDF/Excel
- Probar analytics y gráficos

### 11.2 Optimización

- Verificar queries de DB (índices)
- Verificar cache hits en Redis
- Optimizar bundle size
- Lighthouse audit

## Archivos Principales a Crear/Modificar

### Nuevos archivos:

- `server/services/scraper.ts`
- `server/services/pushNotifications.ts`
- `server/services/export.ts`
- `server/services/ollama.ts`
- `server/services/cache.ts`
- `server/api/analytics.ts`
- `client/public/sw.js`
- `client/src/components/PushSubscribe.tsx`
- `client/src/components/ExportButton.tsx`
- `client/src/hooks/useArticles.ts`
- `client/src/hooks/useAuth.ts`
- `client/src/hooks/useAnalytics.ts`

### Modificar:

- `client/src/pages/admin/CreateNews.tsx`
- `client/src/pages/admin/AutoNews.tsx`
- `client/src/pages/admin/DashboardAnalytics.tsx`
- `client/src/main.tsx`
- `server/_core/index.ts`
- `package.json`

## Dependencias a Instalar

### Backend:

```bash
pnpm add cheerio axios node-cron web-push pdfkit exceljs redis ioredis
pnpm add -D @types/pdfkit
```

### Frontend:

```bash
pnpm add react-quill quill recharts date-fns framer-motion
```

## Variables de Entorno Nuevas

```env
# Redis
REDIS_URL=redis://localhost:6379
# o Upstash
UPSTASH_REDIS_URL=...

# Ollama
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=deepseek-r1:1.5b

# Push Notifications
VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:admin@politicaargentina.com

# Railway Backend URL
VITE_API_URL=https://your-backend.railway.app
```

## Estimación de Tiempo

- Fase 1 (Scraping): 1 hora
- Fase 2 (WYSIWYG): 30 min
- Fase 3 (Push): 1 hora
- Fase 4 (Analytics): 1.5 horas
- Fase 5 (Export): 1 hora
- Fase 6 (Ollama): 1.5 horas
- Fase 7 (Redis): 45 min
- Fase 8 (Visual): 1 hora
- Fase 9 (API): 1 hora
- Fase 10 (Deploy): 45 min
- Fase 11 (Testing): 1 hora

**Total: ~11 horas de implementación**

## Fase 12: MEGA EXTREME SEO Optimization

### 12.1 SEO Avanzado por Página

- Actualizar todos los componentes con `MegaSEO`
- Schema.org completo para cada tipo de página:
  - NewsArticle con autor, fecha, organización
  - BreadcrumbList para navegación
  - Organization con datos completos
  - WebSite con search action
  - FAQPage para páginas informativas
- Meta tags dinámicos por idioma
- Canonical URLs correctos
- Hreflang tags para 4 idiomas

### 12.2 Contenido Rico y Contextual

- Expandir contenido de artículos (mínimo 800 palabras)
- Agregar secciones relacionadas automáticas
- Implementar "Artículos relacionados" inteligente
- Agregar FAQ section en artículos
- Implementar breadcrumbs visuales en todas las páginas

### 12.3 Performance SEO

- Optimizar imágenes (WebP, lazy loading, srcset)
- Implementar preload de recursos críticos
- Minificar y comprimir assets
- Implementar service worker para PWA
- Sitemap.xml dinámico con todas las URLs
- Robots.txt optimizado

### 12.4 Structured Data Completo

- JSON-LD en todas las páginas
- Rating y reviews schema
- Video schema para contenido multimedia
- Event schema para noticias de eventos
- Local business schema

## Fase 13: Panel de Control Profesional Completo

### 13.1 Dashboard Principal Mejorado

- Archivo: `client/src/pages/admin/Dashboard.tsx` (nuevo)
- Widgets configurables y arrastrables
- Métricas en tiempo real con WebSockets
- Alertas y notificaciones importantes
- Quick actions prominentes
- Resumen ejecutivo con KPIs

### 13.2 Gestión de Usuarios

- Archivo: `client/src/pages/admin/Users.tsx`
- Lista de usuarios con filtros y búsqueda
- Crear/editar/eliminar usuarios
- Cambiar roles y permisos
- Ver actividad de usuarios
- Exportar lista de usuarios

### 13.3 Gestión de Categorías

- Archivo: `client/src/pages/admin/Categories.tsx`
- CRUD completo de categorías
- Ordenar categorías (drag & drop)
- Asignar colores e iconos
- Estadísticas por categoría
- Activar/desactivar categorías

### 13.4 Gestión de Fuentes

- Archivo: `client/src/pages/admin/Sources.tsx`
- CRUD de fuentes de noticias
- Configurar scraping por fuente
- Ver historial de sincronización
- Estadísticas de éxito/error
- Test de conexión a fuente

### 13.5 Configuración del Sistema

- Archivo: `client/src/pages/admin/Settings.tsx`
- Configuración general del sitio
- Configuración de SEO global
- Configuración de notificaciones
- Configuración de scraping
- Configuración de IA (Ollama)
- Configuración de cache (Redis)
- Backup y restauración

### 13.6 Logs y Auditoría

- Archivo: `client/src/pages/admin/Logs.tsx`
- Ver logs del sistema en tiempo real
- Filtrar por tipo, usuario, fecha
- Auditoría de cambios en artículos
- Historial de login/logout
- Exportar logs

### 13.7 Navegación Admin Mejorada

- Sidebar colapsable con iconos
- Breadcrumbs en todas las páginas admin
- Búsqueda global en admin
- Notificaciones en tiempo real
- Perfil de usuario con dropdown
- Tema claro/oscuro

## Fase 14: Contenido y Contexto Completo

### 14.1 Páginas Institucionales

- Archivo: `client/src/pages/About.tsx` - Quiénes somos
- Archivo: `client/src/pages/Contact.tsx` - Contacto
- Archivo: `client/src/pages/Team.tsx` - Nuestro equipo
- Archivo: `client/src/pages/Privacy.tsx` - Política de privacidad
- Archivo: `client/src/pages/Terms.tsx` - Términos y condiciones
- Archivo: `client/src/pages/FAQ.tsx` - Preguntas frecuentes

### 14.2 Secciones Adicionales

- Archivo: `client/src/pages/Trending.tsx` - Tendencias
- Archivo: `client/src/pages/Archive.tsx` - Archivo histórico
- Archivo: `client/src/pages/Authors.tsx` - Autores
- Archivo: `client/src/pages/Tags.tsx` - Explorar por tags
- Archivo: `client/src/pages/Search.tsx` - Búsqueda avanzada

### 14.3 Contenido Enriquecido

- Agregar 50+ artículos reales con contenido completo
- Implementar relacionados inteligentes
- Agregar comentarios (sistema básico)
- Agregar reacciones (likes, shares)
- Timeline de noticias
- Galería de imágenes por artículo

## Fase 15: Sistema de Autenticación Frontend

### 15.1 Páginas de Auth

- Archivo: `client/src/pages/Login.tsx`
- Archivo: `client/src/pages/Register.tsx`
- Archivo: `client/src/pages/ForgotPassword.tsx`
- Archivo: `client/src/pages/Profile.tsx`

### 15.2 Auth Context y Guards

- Archivo: `client/src/contexts/AuthContext.tsx`
- Archivo: `client/src/components/ProtectedRoute.tsx`
- Persistir sesión en localStorage
- Auto-refresh de tokens
- Redirect después de login

### 15.3 UI de Auth

- Formularios con validación
- Loading states
- Error handling
- Success messages
- Social login placeholders

## Archivos Adicionales a Crear

### Admin Panel:

- `client/src/pages/admin/Dashboard.tsx`
- `client/src/pages/admin/Users.tsx`
- `client/src/pages/admin/Categories.tsx`
- `client/src/pages/admin/Sources.tsx`
- `client/src/pages/admin/Settings.tsx`
- `client/src/pages/admin/Logs.tsx`
- `client/src/components/admin/Sidebar.tsx`
- `client/src/components/admin/Breadcrumbs.tsx`

### Páginas Públicas:

- `client/src/pages/About.tsx`
- `client/src/pages/Contact.tsx`
- `client/src/pages/Team.tsx`
- `client/src/pages/Privacy.tsx`
- `client/src/pages/Terms.tsx`
- `client/src/pages/FAQ.tsx`
- `client/src/pages/Trending.tsx`
- `client/src/pages/Archive.tsx`
- `client/src/pages/Authors.tsx`
- `client/src/pages/Tags.tsx`
- `client/src/pages/Search.tsx`

### Auth:

- `client/src/pages/Login.tsx`
- `client/src/pages/Register.tsx`
- `client/src/pages/ForgotPassword.tsx`
- `client/src/pages/Profile.tsx`
- `client/src/contexts/AuthContext.tsx`
- `client/src/components/ProtectedRoute.tsx`

### SEO:

- `client/src/components/AdvancedSEO.tsx`
- `client/src/utils/seo.ts`
- `client/src/utils/structuredData.ts`

## Estimación de Tiempo Actualizada

- Fases 1-11 (anteriores): ~11 horas
- Fase 12 (MEGA SEO): 2 horas
- Fase 13 (Panel Admin): 3 horas
- Fase 14 (Contenido): 2 horas
- Fase 15 (Auth Frontend): 1.5 horas

**Total: ~19.5 horas de implementación**

## Resultado Final

Sistema completo profesional con:

- ✅ Scraping automático de 8 fuentes argentinas
- ✅ Editor WYSIWYG profesional
- ✅ Notificaciones push funcionales
- ✅ Analytics con gráficos interactivos (Recharts)
- ✅ Export PDF/Excel de reportes
- ✅ IA Ollama para generación y mejora de noticias
- ✅ Redis cache para performance
- ✅ Animaciones suaves con Framer Motion
- ✅ Backend en Railway con MySQL + Redis
- ✅ Frontend en Vercel conectado a API real
- ✅ MEGA EXTREME SEO en todas las páginas
- ✅ Schema.org completo (NewsArticle, Organization, etc.)
- ✅ Panel de control profesional completo
- ✅ Gestión de usuarios, categorías, fuentes
- ✅ Sistema de configuración avanzado
- ✅ Logs y auditoría
- ✅ 11+ páginas institucionales
- ✅ 50+ artículos con contenido completo
- ✅ Sistema de autenticación frontend completo
- ✅ Búsqueda avanzada
- ✅ Sistema de comentarios y reacciones
- ✅ PWA con service worker
- ✅ Sitemap dinámico
- ✅ Performance optimizado (Lighthouse 95+)
- ✅ Sistema 100% funcional y profesional de clase mundial

### To-dos

- [ ] Crear servicio de scraping real para 8 fuentes argentinas
- [ ] Integrar Quill.js como editor WYSIWYG en CreateNews
- [ ] Implementar sistema completo de notificaciones push
- [ ] Agregar gráficos interactivos con Recharts en dashboard
- [ ] Implementar export de reportes en PDF y Excel
- [ ] Integrar Ollama deepseek-r1:1.5b para generación IA
- [ ] Configurar Redis para caching de artículos y stats
- [ ] Agregar animaciones con Framer Motion y mejoras visuales
- [ ] Conectar frontend con API backend real
- [ ] Desplegar backend en Railway con MySQL + Redis
- [ ] Testing completo y optimización final del sistema