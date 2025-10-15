# 🎯 CÓMO HACER EL DEPLOY TÚ MISMO - SÚPER FÁCIL

## ⏱️ Tiempo total: 15-20 minutos

---

## 📋 PREREQUISITOS (5 min)

### 1. Crear cuenta en OpenAI (CRÍTICO)
1. Ir a: https://platform.openai.com
2. Sign up (crear cuenta)
3. Añadir método de pago (tarjeta)
4. Ir a: https://platform.openai.com/api-keys
5. Click "Create new secret key"
6. **COPIAR Y GUARDAR** la key (empieza con `sk-...`)

### 2. Verificar que tienes cuenta en Vercel
1. Ir a: https://vercel.com
2. Si no tienes cuenta, crear con GitHub

---

## 🚀 PASO 1: SUBIR CÓDIGO A GITHUB (5 min)

### Opción A: Desde tu terminal
```bash
# 1. Abrir terminal en la carpeta del proyecto
cd "/Users/usuario/POLITICA ARGENTINA/politica-argentina"

# 2. Ejecutar el script automático
./DEPLOY_AHORA.sh
```

### Opción B: Manualmente
```bash
# 1. Inicializar git (si no lo hiciste)
git init

# 2. Añadir todos los archivos
git add .

# 3. Hacer commit
git commit -m "feat: portal completo con todas las integraciones"

# 4. Conectar con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU-USUARIO/politica-argentina.git

# 5. Subir código
git branch -M main
git push -u origin main
```

---

## 🌐 PASO 2: DEPLOY EN VERCEL (3 min)

### Opción A: Desde navegador (MÁS FÁCIL)
1. Ir a: https://vercel.com/new
2. Click en "Import Git Repository"
3. Seleccionar tu repo "politica-argentina"
4. **NO hacer deploy todavía**, primero configurar variables

### Opción B: Desde terminal
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy (lo haremos después de configurar variables)
# vercel --prod
```

---

## 🔧 PASO 3: CONFIGURAR VARIABLES DE ENTORNO (5 min)

En Vercel Dashboard:
1. Tu Proyecto → Settings → Environment Variables
2. Copiar estas variables una por una:

### Variables OBLIGATORIAS (copiar exactamente):

```
DATABASE_URL
prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza181TjJEZzFDQ0l6RHlCRWJveDlGMkYiLCJhcGlfa2V5IjoiMDFLN00yUlkyVlZRM1czM0pXUlJRRkRBV1EiLCJ0ZW5hbnRfaWQiOiI4ZjZlZTIwZTcwNjljZDY4NWE1NTdlOGI1Y2EwY2U1ZmJlYzcwNGY1MzRmNGMzMWM5ZTFiZjY2NjQ3MzI1ODAwIiwiaW50ZXJuYWxfc2VjcmV0IjoiMGQ2NjFmZGYtMTc1NS00NjNhLTk5YjktMTU3NGRjYTU1N2M2In0.jfUPw05azcb_kPJLxd6E0oexoL7Zmw38t-La8gekQcg
```

```
DIRECT_DATABASE_URL
postgres://8f6ee20e7069cd685a557e8b5ca0ce5fbec704f534f4c31c9e1bf66647325800:sk_5N2Dg1CCIzDyBEbox9F2F@db.prisma.io:5432/postgres?sslmode=require
```

```
OPENAI_API_KEY
TU_KEY_DE_OPENAI_AQUI
```
⚠️ **REEMPLAZAR** con tu key real de OpenAI (del paso anterior)

```
AUTH_SECRET
0lMY3tEucxaM3wSb0HAgsGEDYhgkFYkhaABFoutPyTY=
```

```
AUTH_TRUST_HOST
true
```

```
CRON_SECRET
dev-secret-ultra-secure-2024
```

```
NEXT_PUBLIC_SITE_URL
https://tu-proyecto.vercel.app
```
⚠️ **CAMBIAR DESPUÉS** del primer deploy con tu URL real

```
NEXT_PUBLIC_SITE_NAME
POLITICA ARGENTINA
```

### Para cada variable:
1. Click "Add New"
2. Name: (nombre de la variable)
3. Value: (valor de la variable)
4. Environments: Marcar TODAS (Production, Preview, Development)
5. Click "Save"

---

## 🎉 PASO 4: HACER DEPLOY (2 min)

1. En Vercel Dashboard → Deployments
2. Click "Deploy" o "Redeploy"
3. Esperar 2-3 minutos
4. ¡Listo! 🎉

Tu sitio estará en: `https://tu-proyecto.vercel.app`

---

## ✅ PASO 5: VERIFICAR QUE FUNCIONA (2 min)

1. Ir a tu URL de Vercel
2. Deberías ver la página principal
3. Ir a `/login`
4. Usuario: `admin@politica-argentina.com`
5. Contraseña: `admin123`
6. Deberías entrar al dashboard

---

## 🎯 PASO 6: PRIMERA PUBLICACIÓN (2 min)

1. Estando en `/admin`
2. Click en "Ingestar Noticias" (sidebar)
3. Click "Iniciar Ingesta Manual"
4. Esperar 1-2 minutos
5. ¡Ver las primeras noticias aparecer! 🎉

---

## 🔄 ACTUALIZAR LA URL DEL SITIO

1. Copiar tu URL real de Vercel: `https://tu-proyecto-abc123.vercel.app`
2. Ir a: Settings → Environment Variables
3. Buscar `NEXT_PUBLIC_SITE_URL`
4. Click en los 3 puntos → Edit
5. Pegar la URL real
6. Save
7. Redeploy el proyecto

---

## 📱 CONFIGURAR TELEGRAM (OPCIONAL - 10 min)

Si quieres autopublicación en Telegram:

1. Abrir Telegram
2. Buscar: `@BotFather`
3. Enviar: `/newbot`
4. Seguir instrucciones:
   - Nombre: "POLÍTICA ARGENTINA Bot"
   - Username: `politica_argentina_bot`
5. **COPIAR** el token que te da
6. Crear un canal público en Telegram
7. Añadir el bot como administrador del canal
8. En Vercel, añadir variables:
   - `TELEGRAM_BOT_TOKEN`: el token del paso 5
   - `TELEGRAM_CHANNEL_ID`: `@nombre_de_tu_canal`
9. Redeploy
10. ¡Listo! Las noticias se publicarán automáticamente

---

## 🆘 SI ALGO FALLA

### Error: "Invalid API Key" o "API Key required"
➡️ **Solución**: Verifica que configuraste `OPENAI_API_KEY` correctamente en Vercel

### Error: "Database connection failed"
➡️ **Solución**: Verifica que copiaste bien `DATABASE_URL` y `DIRECT_DATABASE_URL`

### La página no carga
➡️ **Solución**: 
1. Ir a Vercel → tu proyecto → Deployments
2. Click en el deployment más reciente
3. Ver logs para encontrar el error
4. Contactar si necesitas ayuda

### No se generan noticias
➡️ **Solución**: Verifica que tu cuenta de OpenAI tenga crédito

---

## 📊 COSTOS APROXIMADOS

- **Vercel**: $0-20/mes (gratis hasta cierto límite)
- **Neon Database**: $0-19/mes (gratis hasta cierto límite)
- **OpenAI**: $50-200/mes (depende del uso)
  - Cada artículo cuesta ~$0.10-0.50
  - 100 artículos/día = $10-50/día

---

## 🎓 RECURSOS

- **Ver logs**: Vercel Dashboard → tu proyecto → Deployments → Click en deployment → View Function Logs
- **Documentación completa**: `GUIA_COMPLETA_CONFIGURACION.md`
- **Variables de entorno**: `VARIABLES_ENTORNO_VERCEL.txt`
- **Resumen técnico**: `RESUMEN_FINAL_COMPLETO.md`

---

## 🎉 ¡FELICIDADES!

Si llegaste hasta aquí, ya tienes:
- ✅ Portal de noticias funcionando
- ✅ Scraping de 30 portales argentinos
- ✅ Generación automática de contenido con IA
- ✅ Sistema multi-idioma (80 idiomas)
- ✅ SEO extremo configurado
- ✅ Dashboard admin completo

### Próximos pasos:
1. Publicar 50-100 artículos
2. Configurar más redes sociales
3. Optimizar SEO
4. ¡Dominar Google Argentina! 🇦🇷

---

**¿Necesitas ayuda? Déjame un mensaje y te ayudo paso a paso** 💪
