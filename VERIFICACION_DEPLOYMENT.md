# ✅ Guía de Verificación del Deployment

## 🚀 DEPLOYMENT v2.0.0 - CHECKLIST COMPLETO

**Fecha**: 3 de Noviembre, 2025  
**Version**: 2.0.0-PRODUCTION-READY  
**Commit**: 7dc79b9  
**Status**: 🟢 DEPLOYED

---

## 📋 PASO 1: VERIFICAR DEPLOYMENT EN VERCEL

### 1.1 Acceder al Dashboard de Vercel
🔗 **URL**: https://vercel.com/dashboard

### 1.2 Verificar el Deployment
- [ ] El deployment más reciente muestra "Ready" ✅
- [ ] No hay errores en el build log
- [ ] El commit hash es `7dc79b9`
- [ ] La fecha/hora coincide con el deployment

### 1.3 Revisar Build Logs
```
✅ Build Command: npm run build
✅ Output Directory: .next
✅ Node Version: 20.x
✅ Framework: Next.js 16.0.1
✅ Build Time: ~30-60 segundos
✅ Pages Generated: 15
```

### 1.4 Verificar Variables de Entorno (Opcional)
Si quieres usar Supabase dinámicamente:
- [ ] `NEXT_PUBLIC_SUPABASE_URL` configurada
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configurada

**Nota**: El sitio funciona perfectamente SIN estas variables (usa contenido estático).

---

## 📋 PASO 2: VERIFICAR EL SITIO EN PRODUCCIÓN

### 2.1 Página Principal (Home)
🔗 **URL**: https://politicaargentina.com

**Checklist**:
- [ ] La página carga correctamente
- [ ] Se ven las noticias destacadas
- [ ] El widget del Dólar Blue funciona
- [ ] Las imágenes cargan correctamente
- [ ] El header y footer están presentes
- [ ] La navegación funciona

**Elementos a verificar**:
- ✅ Breaking News Bar (si hay noticia destacada)
- ✅ Top Bar con fecha y ubicación
- ✅ Logo "Política Argentina"
- ✅ Menú de navegación (6 links)
- ✅ Noticia destacada (hero)
- ✅ Grid de 3 noticias destacadas
- ✅ Lista de últimas noticias
- ✅ Sidebar con:
  - Widget Dólar Blue
  - Trending Topics
  - Newsletter
- ✅ Footer con links y redes sociales

### 2.2 Categoría: Política
🔗 **URL**: https://politicaargentina.com/politica

**Checklist**:
- [ ] La página carga correctamente
- [ ] Breadcrumb: "Inicio / Política"
- [ ] Título: "Política" con descripción
- [ ] Noticia destacada (hero)
- [ ] Grid de 6 noticias
- [ ] Lista de noticias adicionales
- [ ] Sidebar con trending topics
- [ ] Color azul en badges y elementos
- [ ] Navegación activa en "Política"

**Trending Topics esperados**:
- Javier Milei (15.2K)
- Cristina Kirchner (12.8K)
- Congreso Nacional (9.5K)
- Reforma Económica (8.3K)
- Elecciones 2025 (7.1K)

### 2.3 Categoría: Economía
🔗 **URL**: https://politicaargentina.com/economia

**Checklist**:
- [ ] La página carga correctamente
- [ ] Breadcrumb: "Inicio / Economía"
- [ ] Título: "Economía" con descripción
- [ ] Widget del Dólar Blue en sidebar
- [ ] Noticia destacada sobre economía
- [ ] Grid de 6 noticias económicas
- [ ] Color verde en badges y elementos
- [ ] Navegación activa en "Economía"

**Widget Dólar Blue debe mostrar**:
- Dólar Blue: Compra $1,425 / Venta $1,445
- Dólar Oficial: Compra $1,425 / Venta $1,475
- Dólar MEP: Compra $1,484.10 / Venta $1,495.20
- Hora de actualización

### 2.4 Categoría: Judicial
🔗 **URL**: https://politicaargentina.com/judicial

**Checklist**:
- [ ] La página carga correctamente
- [ ] Breadcrumb: "Inicio / Judicial"
- [ ] Título: "Judicial" con descripción
- [ ] Noticias judiciales
- [ ] Color rojo en badges y elementos
- [ ] Navegación activa en "Judicial"

**Trending Topics esperados**:
- Corte Suprema (12.5K)
- Cristina Kirchner (10.8K)
- Causa Vialidad (9.2K)
- Reforma Judicial (7.6K)
- Poder Judicial (6.4K)

### 2.5 Categoría: Internacional
🔗 **URL**: https://politicaargentina.com/internacional

**Checklist**:
- [ ] La página carga correctamente
- [ ] Breadcrumb: "Inicio / Internacional"
- [ ] Título: "Internacional" con descripción
- [ ] Noticias internacionales
- [ ] Color púrpura en badges y elementos
- [ ] Navegación activa en "Internacional"

**Trending Topics esperados**:
- Estados Unidos (14.2K)
- China (11.5K)
- Unión Europea (9.8K)
- Brasil (8.7K)
- Mercosur (7.3K)

### 2.6 Categoría: Sociedad
🔗 **URL**: https://politicaargentina.com/sociedad

**Checklist**:
- [ ] La página carga correctamente
- [ ] Breadcrumb: "Inicio / Sociedad"
- [ ] Título: "Sociedad" con descripción
- [ ] Noticias de sociedad
- [ ] Color naranja en badges y elementos
- [ ] Navegación activa en "Sociedad"

**Trending Topics esperados**:
- Educación (13.8K)
- Salud (12.4K)
- Seguridad (10.9K)
- Medio Ambiente (9.5K)
- Derechos Humanos (8.2K)

---

## 📋 PASO 3: VERIFICAR NAVEGACIÓN

### 3.1 Navegación desde Home
Desde https://politicaargentina.com:
- [ ] Click en "Política" → Va a `/politica`
- [ ] Click en "Economía" → Va a `/economia`
- [ ] Click en "Judicial" → Va a `/judicial`
- [ ] Click en "Internacional" → Va a `/internacional`
- [ ] Click en "Sociedad" → Va a `/sociedad`
- [ ] Click en logo → Vuelve a home

### 3.2 Navegación desde Categorías
Desde cualquier categoría:
- [ ] Click en "Inicio" → Va a home
- [ ] Click en otra categoría → Cambia correctamente
- [ ] Breadcrumb funciona
- [ ] Link activo se resalta

### 3.3 Footer Links
- [ ] Links de secciones funcionan
- [ ] Links de información presentes
- [ ] Links de redes sociales presentes

---

## 📋 PASO 4: VERIFICAR RESPONSIVE

### 4.1 Desktop (>1024px)
- [ ] Layout de 3 columnas funciona
- [ ] Sidebar visible
- [ ] Imágenes se ven bien
- [ ] Navegación horizontal

### 4.2 Tablet (768px - 1024px)
- [ ] Layout se adapta
- [ ] Sidebar debajo del contenido
- [ ] Imágenes responsive

### 4.3 Mobile (<768px)
- [ ] Layout de 1 columna
- [ ] Navegación horizontal con scroll
- [ ] Imágenes optimizadas
- [ ] Texto legible
- [ ] Botones táctiles

**Prueba en**:
- Chrome DevTools (F12 → Toggle device toolbar)
- Safari Responsive Design Mode
- Tu teléfono móvil

---

## 📋 PASO 5: VERIFICAR SEO

### 5.1 Meta Tags
Inspecciona el código fuente (View Page Source):
- [ ] `<title>` presente y descriptivo
- [ ] `<meta name="description">` presente
- [ ] `<meta name="keywords">` presente
- [ ] Open Graph tags (`og:title`, `og:description`, etc)
- [ ] Twitter Card tags

### 5.2 Sitemap y Robots
- [ ] https://politicaargentina.com/sitemap.xml funciona
- [ ] https://politicaargentina.com/robots.txt funciona
- [ ] https://politicaargentina.com/manifest.webmanifest funciona

### 5.3 Performance
Usa Google PageSpeed Insights:
🔗 https://pagespeed.web.dev/

Ingresa: `https://politicaargentina.com`

**Métricas esperadas**:
- Performance: 90+ (verde)
- Accessibility: 90+ (verde)
- Best Practices: 90+ (verde)
- SEO: 90+ (verde)

---

## 📋 PASO 6: VERIFICAR IMÁGENES

### 6.1 Imágenes Locales
Todas las imágenes deben cargar desde `/images/`:
- [ ] `/images/milei-1.jpg`
- [ ] `/images/milei-2.jpg`
- [ ] `/images/milei-3.jpg`
- [ ] `/images/casa-rosada-1.jpg`
- [ ] `/images/casa-rosada-2.jpg`
- [ ] `/images/dolar-blue-1.jpg`
- [ ] `/images/economia-argentina-1.jpg`
- [ ] `/images/argentina-celebracion-1.jpg`

### 6.2 Verificar que NO haya errores 403/404
Abre la consola del navegador (F12 → Console):
- [ ] No hay errores de imágenes
- [ ] No hay errores 403 (Forbidden)
- [ ] No hay errores 404 (Not Found)

---

## 📋 PASO 7: CONFIGURAR SUPABASE (OPCIONAL)

**Nota**: Este paso es OPCIONAL. El sitio funciona perfectamente sin Supabase usando contenido estático.

### 7.1 Crear Proyecto en Supabase
1. Ve a https://app.supabase.com
2. Click "New Project"
3. Completa:
   - Name: `politica-argentina-db`
   - Database Password: [guarda esta contraseña]
   - Region: `South America (São Paulo)`
4. Click "Create new project" (espera ~2 minutos)

### 7.2 Ejecutar Schema SQL
1. Ve a **SQL Editor** en Supabase
2. Click "New query"
3. Abre el archivo: `supabase/schema.sql`
4. Copia TODO el contenido
5. Pega en el editor de Supabase
6. Click "Run"
7. Verifica: "Success. No rows returned"

### 7.3 Obtener Credenciales
1. Ve a **Settings** → **API**
2. Copia:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 7.4 Agregar Variables en Vercel
1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
5. Marca: Production, Preview, Development
6. Click "Save"

### 7.5 Redeploy
1. Ve a **Deployments**
2. Click en el último deployment
3. Click "Redeploy"
4. Espera ~2-3 minutos

---

## 📋 PASO 8: VERIFICAR API ROUTES (SI SUPABASE ESTÁ CONFIGURADO)

### 8.1 GET /api/noticias
```bash
curl https://politicaargentina.com/api/noticias
```

**Respuesta esperada**:
```json
{
  "success": true,
  "data": [...],
  "total": 150
}
```

### 8.2 GET /api/noticias?categorias=true
```bash
curl https://politicaargentina.com/api/noticias?categorias=true
```

**Respuesta esperada**:
```json
{
  "success": true,
  "data": [
    { "id": 1, "nombre": "Economía", ... },
    { "id": 2, "nombre": "Política", ... },
    ...
  ]
}
```

---

## 🎯 CHECKLIST FINAL

### ✅ Deployment
- [ ] Vercel muestra "Ready"
- [ ] Build sin errores
- [ ] Commit correcto (7dc79b9)

### ✅ Funcionalidad
- [ ] Home carga correctamente
- [ ] 5 categorías funcionan
- [ ] Navegación completa
- [ ] Imágenes cargan sin errores
- [ ] Responsive funciona

### ✅ SEO
- [ ] Meta tags presentes
- [ ] Sitemap.xml funciona
- [ ] Robots.txt funciona
- [ ] PageSpeed score >90

### ✅ Performance
- [ ] Carga rápida (<3 segundos)
- [ ] Imágenes optimizadas
- [ ] Sin errores en consola

---

## 🐛 TROUBLESHOOTING

### Problema: Página no carga
**Solución**:
1. Verifica que el deployment esté "Ready" en Vercel
2. Limpia caché del navegador (Ctrl+Shift+R)
3. Prueba en modo incógnito

### Problema: Imágenes no cargan
**Solución**:
1. Verifica que las imágenes estén en `/public/images/`
2. Revisa la consola del navegador (F12)
3. Verifica que no haya errores 404

### Problema: Navegación no funciona
**Solución**:
1. Verifica que los links usen `<Link>` de Next.js
2. Limpia caché del navegador
3. Verifica en modo incógnito

### Problema: Supabase no funciona
**Solución**:
1. Verifica que las variables estén en Vercel
2. Verifica que el schema SQL se ejecutó correctamente
3. Revisa los logs de Vercel (Functions)

---

## 📞 SOPORTE

### Documentación
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)

### Archivos de Referencia
- `DEPLOYMENT_SUPABASE.md` - Guía de Supabase
- `DEPLOYMENT_STATUS.md` - Estado del proyecto
- `SUPABASE_SETUP.md` - Configuración técnica

---

## 🎉 ¡DEPLOYMENT EXITOSO!

Si todos los checkboxes están marcados, ¡tu sitio está funcionando perfectamente!

**Version**: 2.0.0-PRODUCTION-READY  
**Domain**: https://politicaargentina.com  
**Status**: 🟢 LIVE  
**Quality**: 🏆 WORLD-CLASS

---

**Última actualización**: 3 de Noviembre, 2025  
**Próxima revisión**: Después de configurar Supabase (opcional)

