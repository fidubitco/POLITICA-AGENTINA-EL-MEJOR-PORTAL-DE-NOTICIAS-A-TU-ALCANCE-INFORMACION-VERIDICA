# 🚀 DEPLOY FINAL - Portal Política Argentina

## 📋 Estado Actual
✅ **Proyecto listo para producción**
✅ **Build exitoso sin errores**
✅ **Imágenes actualizadas para contexto argentino**
✅ **APIs backend conectadas**
✅ **Código commited en Git**

## 🌐 Deploy a Vercel (politicaargentina.com)

### Paso 1: Login en Vercel
```bash
vercel login
```
- Abre el navegador en: https://vercel.com/oauth/device?user_code=XXXX-XXXX
- Completa la autenticación

### Paso 2: Deploy a Producción
```bash
cd "/Users/usuario/Documents/SITIO WEB POLITICA ARGENTINA"
vercel --prod
```

### Paso 3: Configurar Dominio (Opcional)
Si necesitas configurar `politicaargentina.com`:
1. Ve a https://vercel.com/dashboard
2. Selecciona el proyecto
3. Ve a "Settings" > "Domains"
4. Agrega `politicaargentina.com`

## 🎯 Imágenes Actualizadas

### ✅ Imágenes Políticas Argentinas:
- **🏛️ Congreso Nacional**: Artículos sobre Milei
- **🏛️ Casa Rosada**: Artículos sobre Cristina Kirchner
- **🇦🇷 Bandera Argentina**: Acuerdos internacionales
- **🎓 Universidad**: Reformas educativas
- **⚖️ Palacio de Justicia**: Suprema Corte

### 📍 URLs de Imágenes:
```javascript
// Congreso Nacional Argentina
'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=400&h=225&fit=crop&q=80&auto=format'

// Casa Rosada - sede del gobierno
'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=225&fit=crop&q=80&auto=format'

// Bandera argentina
'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=225&fit=crop&q=80&auto=format'

// Universidad/educación
'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=225&fit=crop&q=80&auto=format'

// Palacio de Justicia
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=225&fit=crop&q=80&auto=format'
```

## 🔧 Configuración de Producción

### Variables de Entorno (.env.production)
```env
# Base de datos (para futuro backend real)
DATABASE_URL="mysql://user:pass@host:port/db"

# Redis (para futuro caching)
REDIS_URL="redis://host:port"

# Ollama (para IA)
OLLAMA_BASE_URL="http://localhost:11434"

# Push Notifications
VAPID_PUBLIC_KEY="tu_clave_publica_vapid"
VAPID_PRIVATE_KEY="tu_clave_privada_vapid"
VAPID_SUBJECT="mailto:admin@politicaargentina.com"

# APIs externas
UNSPLASH_ACCESS_KEY="tu_api_key_unsplash"
```

## 📊 APIs Disponibles

### Frontend (Portal Principal)
- ✅ `/api/articles` - Gestión de artículos
- ✅ `/api/stats` - Estadísticas del portal
- ✅ `/api/search` - Búsqueda avanzada
- ✅ `/api/push/*` - Notificaciones push
- ✅ `/api/ollama/*` - IA integrada

### Admin Panel (Proyecto Separado)
- 📍 Ubicación: `admin-portal/`
- 🚀 Puerto: `3001`
- 🔐 Autenticación: NextAuth.js
- 📝 Editor: Quill.js WYSIWYG

## 🎉 Checklist de Deploy

- [x] Código commited en Git
- [x] Build exitoso (`npm run build`)
- [x] Imágenes actualizadas
- [x] APIs conectadas
- [ ] Vercel login completado
- [ ] Deploy a producción ejecutado
- [ ] Dominio configurado (opcional)
- [ ] Variables de entorno configuradas

## 🚨 Verificación Post-Deploy

1. **Accede a** `politicaargentina.com`
2. **Verifica imágenes** en los artículos
3. **Prueba navegación** y animaciones
4. **Verifica responsividad** en móvil
5. **Testea APIs** desde el navegador

## 📞 Soporte

Si hay problemas con el deploy:
1. Verifica que estés logueado: `vercel whoami`
2. Revisa logs: `vercel logs`
3. Verifica configuración: `vercel env ls`

---

**🇦🇷 Portal Política Argentina - Listo para producción** ✨
