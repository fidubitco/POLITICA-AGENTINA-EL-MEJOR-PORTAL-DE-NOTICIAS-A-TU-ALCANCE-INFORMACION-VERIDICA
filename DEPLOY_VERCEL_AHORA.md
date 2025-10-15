# 🚀 DEPLOY EN VERCEL - PASO A PASO

## ✅ Código ya está en GitHub!

Repositorio: https://github.com/fidubitco/POLITICA-AGENTINA-EL-MEJOR-PORTAL-DE-NOTICIAS-A-TU-ALCANCE-INFORMACION-VERIDICA

---

## 📋 PASO 1: IMPORTAR PROYECTO EN VERCEL (2 min)

1. **Ir a**: https://vercel.com/new
2. **Click** en "Import Git Repository"
3. **Seleccionar** tu repositorio: `POLITICA-AGENTINA-EL-MEJOR-PORTAL...`
4. **NO hacer deploy todavía** ⚠️ (primero configurar variables)

---

## 🔧 PASO 2: CONFIGURAR VARIABLES DE ENTORNO (5 min)

En la pantalla de configuración de Vercel, antes de deployar:

### **Variables CRÍTICAS** (sin estas no funciona):

#### 1. DATABASE_URL
```
prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza181TjJEZzFDQ0l6RHlCRWJveDlGMkYiLCJhcGlfa2V5IjoiMDFLN00yUlkyVlZRM1czM0pXUlJRRkRBV1EiLCJ0ZW5hbnRfaWQiOiI4ZjZlZTIwZTcwNjljZDY4NWE1NTdlOGI1Y2EwY2U1ZmJlYzcwNGY1MzRmNGMzMWM5ZTFiZjY2NjQ3MzI1ODAwIiwiaW50ZXJuYWxfc2VjcmV0IjoiMGQ2NjFmZGYtMTc1NS00NjNhLTk5YjktMTU3NGRjYTU1N2M2In0.jfUPw05azcb_kPJLxd6E0oexoL7Zmw38t-La8gekQcg
```

#### 2. DIRECT_DATABASE_URL
```
postgres://8f6ee20e7069cd685a557e8b5ca0ce5fbec704f534f4c31c9e1bf66647325800:sk_5N2Dg1CCIzDyBEbox9F2F@db.prisma.io:5432/postgres?sslmode=require
```

#### 3. GEMINI_API_KEY
```
TU_GEMINI_API_KEY_AQUI
```
⚠️ **IMPORTANTE**: Obtener de https://aistudio.google.com/ (5 min, gratis)

#### 4. AUTH_SECRET
```
0lMY3tEucxaM3wSb0HAgsGEDYhgkFYkhaABFoutPyTY=
```

#### 5. AUTH_TRUST_HOST
```
true
```

#### 6. CRON_SECRET
```
dev-secret-ultra-secure-2024
```

#### 7. NEXT_PUBLIC_SITE_URL
```
https://TU-PROYECTO.vercel.app
```
⚠️ **Cambiar después** del primer deploy con tu URL real

#### 8. NEXT_PUBLIC_SITE_NAME
```
POLITICA ARGENTINA
```

### Para cada variable:
- Name: (nombre de la variable)
- Value: (valor de la variable)
- Environments: ✅ Production ✅ Preview ✅ Development

---

## 🚀 PASO 3: HACER DEPLOY (2 min)

1. **Después** de configurar las 8 variables
2. Click **"Deploy"**
3. Esperar 2-3 minutos ⏳
4. ¡Listo! 🎉

Tu sitio estará en: `https://tu-proyecto-abc123.vercel.app`

---

## ✅ PASO 4: ACTUALIZAR URL DEL SITIO (1 min)

1. **Copiar** tu URL real de Vercel
2. Ir a: **Settings → Environment Variables**
3. Buscar `NEXT_PUBLIC_SITE_URL`
4. Click **Edit** (3 puntos)
5. Pegar tu URL real
6. **Save**
7. **Redeploy** el proyecto

---

## 🗄️ PASO 5: MIGRAR BASE DE DATOS (2 min)

### Opción A: Desde Vercel CLI (recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Link con tu proyecto
vercel link

# Ejecutar migración
vercel env pull .env.local
pnpm prisma db push
pnpm prisma db seed
```

### Opción B: Manual (más fácil)

Ya está configurado para auto-migrar en el primer deploy ✅

---

## 🎉 PASO 6: VERIFICAR QUE FUNCIONA (2 min)

1. Ir a tu URL: `https://tu-proyecto.vercel.app`
2. Deberías ver la página principal ✅
3. Ir a `/login`
4. Usuario: `admin@politica-argentina.com`
5. Contraseña: `admin123`
6. Deberías entrar al dashboard ✅

---

## 📱 PASO 7 (OPCIONAL): OBTENER GEMINI API KEY

### Si aún no la tienes:

1. Ir a: https://aistudio.google.com/
2. Login con Google
3. Click "Get API Key"
4. Click "Create API Key"
5. **COPIAR** la key (empieza con `AIza...`)
6. Volver a Vercel → Settings → Environment Variables
7. Buscar `GEMINI_API_KEY`
8. Click Edit → Pegar key → Save
9. Redeploy

### Con esto activas:
- ✅ Generación automática de contenido
- ✅ Traducción a 80 idiomas
- ✅ Keywords SEO automáticas
- ✅ Reescritura de artículos

---

## 🔧 PASO 8 (OPCIONAL): CONFIGURAR REDES SOCIALES

Si quieres autopublicación en redes sociales, añadir estas variables:

### Telegram:
- `TELEGRAM_BOT_TOKEN` = token de @BotFather
- `TELEGRAM_CHANNEL_ID` = @tu_canal

### Discord:
- `DISCORD_WEBHOOK_URL` = webhook URL

### Otras:
Ver `VARIABLES_ENTORNO_VERCEL.txt` para lista completa

---

## ✅ CHECKLIST DE DEPLOY

- [ ] Código subido a GitHub
- [ ] Proyecto importado en Vercel
- [ ] 8 variables críticas configuradas
- [ ] Deploy completado
- [ ] URL actualizada en NEXT_PUBLIC_SITE_URL
- [ ] Redeploy después de actualizar URL
- [ ] Base de datos migrada
- [ ] Login funciona correctamente
- [ ] GEMINI_API_KEY configurada (opcional)
- [ ] Redes sociales configuradas (opcional)

---

## 🆘 SI ALGO FALLA

### Error: "Build failed"
➡️ Verificar que todas las 8 variables estén configuradas
➡️ Revisar logs en Vercel Dashboard

### Error: "Database connection failed"
➡️ Verificar `DATABASE_URL` y `DIRECT_DATABASE_URL`
➡️ Asegurar que las copiaste completas

### Error: "Authentication failed"
➡️ Verificar `AUTH_SECRET`
➡️ Verificar `AUTH_TRUST_HOST=true`

### La página carga pero sin contenido
➡️ Normal en primer deploy
➡️ Ir a `/admin/ingest` para generar contenido

### No se genera contenido automático
➡️ Configurar `GEMINI_API_KEY`
➡️ Obtener de https://aistudio.google.com/

---

## 📊 DESPUÉS DEL DEPLOY

### Primeras 24 horas:
1. ✅ Generar primeros 10-20 artículos manualmente
2. ✅ Verificar que todo funciona
3. ✅ Configurar Google Search Console
4. ✅ Submit sitemap: `tu-url.com/sitemap.xml`

### Primera semana:
1. ✅ Configurar Telegram para autopublicación
2. ✅ Activar cron jobs automáticos
3. ✅ Monitorear analytics
4. ✅ Ajustar configuración según necesidad

---

## 🎯 RECURSOS ÚTILES

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/fidubitco/POLITICA-AGENTINA...
- **Gemini AI Studio**: https://aistudio.google.com/
- **Prisma Studio**: Local - `pnpm prisma studio`

---

## 💰 COSTOS MENSUALES

Con Gemini (ya integrado):
- **Vercel**: $0-20/mes (Pro plan opcional)
- **Neon Database**: $0-19/mes (gratis hasta 3GB)
- **Gemini API**: $0-100/mes (free tier generoso)
- **TOTAL**: $0-140/mes (vs $500-1000 con OpenAI)

---

## 🎉 ¡FELICIDADES!

Si completaste todos los pasos:
- ✅ Portal funcionando en producción
- ✅ Dashboard admin accesible
- ✅ Sistema de scraping automático
- ✅ Gemini AI integrado
- ✅ Multi-idioma activado
- ✅ SEO optimizado

**¡Ahora a conquistar el SEO argentino! 🇦🇷🚀**

---

**Tiempo total: 15-20 minutos**
**Dificultad: Fácil** ✅
**Costo inicial: $0** (con free tiers) 🎁
