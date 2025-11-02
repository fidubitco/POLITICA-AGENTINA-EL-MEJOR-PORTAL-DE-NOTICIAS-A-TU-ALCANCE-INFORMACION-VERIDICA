# 🚨 VERIFICACIÓN MANUAL EN VERCEL DASHBOARD

## Problema Actual
Las imágenes contextuales están correctamente en el código (commit 72ee848) pero NO se están desplegando en politicaargentina.com.

---

## ✅ VERIFICACIÓN EN CÓDIGO LOCAL

```bash
# Las imágenes están correctamente configuradas:
✅ Milei: photo-1541872703-74c5e44368f9 (Congreso)
✅ Cristina: photo-1454165804606-c3d57bc86b40 (Documentos)
✅ Dólar: photo-1579621970563-ebec7560ff3e (Billetes)
✅ Corte: photo-1589829545856-d10d557cf95f (Martillo)
✅ UE: photo-1450101499163-c8848c66ca85 (Apretón manos)
✅ Educación: photo-1427504494785-3a9ca7044f45 (Estudiantes)
```

---

## 🔧 PASOS PARA REDEPLOY MANUAL EN VERCEL

### **1. Ir a Vercel Dashboard**
```
https://vercel.com/dashboard
```

### **2. Buscar el Proyecto**
- Nombre: `politica-argentina` o similar
- Buscar en la lista de proyectos

### **3. Ir a Deployments**
- Click en el proyecto
- Click en la pestaña "Deployments"

### **4. Verificar Último Deployment**
- Buscar el deployment con commit `72ee848`
- Verificar que el estado sea "Ready" (verde)
- Si está en "Building", esperar a que termine

### **5. Si el Deployment Está Listo pero las Imágenes No Cambiaron:**

#### **Opción A: Redeploy**
1. Click en el deployment más reciente
2. Click en el botón de 3 puntos (⋮)
3. Click en "Redeploy"
4. Confirmar el redeploy
5. Esperar 3-5 minutos

#### **Opción B: Invalidar Cache**
1. En el proyecto, ir a "Settings"
2. Buscar "Edge Config" o "Cache"
3. Click en "Purge Cache" o "Clear Cache"
4. Confirmar
5. Hacer un nuevo deployment

#### **Opción C: Nuevo Deployment desde Git**
1. En "Deployments"
2. Click en "Deploy" (botón arriba a la derecha)
3. Seleccionar branch: `2025-10-30-xlea-32a18`
4. Click en "Deploy"

---

## 🔍 VERIFICAR QUE EL DEPLOYMENT SE COMPLETÓ

### **En Vercel Dashboard:**
1. El deployment debe estar en estado "Ready" (verde)
2. El commit debe ser `72ee848`
3. La fecha debe ser reciente (hoy)

### **En el Sitio:**
1. Ir a https://politicaargentina.com
2. Presionar `Ctrl+Shift+R` (hard refresh)
3. Buscar el texto: **"IMÁGENES CONTEXTUALES ACTUALIZADAS"**
4. Verificar que las imágenes sean diferentes:
   - Milei: Edificio del Congreso (NO obelisco)
   - Cristina: Documentos legales (NO obelisco)
   - Dólar: Billetes de dólar (NO genérico)
   - Etc.

---

## 🐛 SI AÚN NO FUNCIONA

### **Verificar Variables de Entorno:**
1. En Vercel Dashboard → Settings → Environment Variables
2. Verificar que todas las variables necesarias estén configuradas
3. Si falta alguna, agregarla y hacer redeploy

### **Verificar Build Logs:**
1. En el deployment, click en "View Function Logs"
2. Buscar errores en el build
3. Verificar que `app/page.tsx` se esté compilando correctamente

### **Verificar Domain Settings:**
1. Settings → Domains
2. Verificar que `politicaargentina.com` esté correctamente configurado
3. Verificar que apunte al deployment correcto

---

## 📝 COMANDOS ÚTILES PARA DEBUGGING

### **Verificar qué está en producción:**
```bash
curl -s https://politicaargentina.com/version.json
```

Debería retornar:
```json
{
  "version": "2.1.0",
  "deployment": "contextual-images-fix",
  "timestamp": "2025-11-02T07:00:00Z",
  "commit": "72ee848",
  "images": {
    "milei": "photo-1541872703-74c5e44368f9",
    ...
  }
}
```

### **Verificar headers:**
```bash
curl -I https://politicaargentina.com
```

Buscar:
- `x-vercel-cache`: Debería ser "MISS" después del redeploy
- `age`: Debería ser bajo (< 60 segundos)

---

## ⚠️ POSIBLES CAUSAS DEL PROBLEMA

1. **Cache de Vercel Edge Network**
   - Solución: Purge cache desde dashboard

2. **Build antiguo en cache**
   - Solución: Redeploy forzado

3. **Branch incorrecta**
   - Solución: Verificar que esté usando `2025-10-30-xlea-32a18`

4. **Configuración de dominio**
   - Solución: Verificar que politicaargentina.com apunte al proyecto correcto

5. **Variables de entorno faltantes**
   - Solución: Agregar variables necesarias

---

## 🎯 RESULTADO ESPERADO

Después del redeploy manual, deberías ver:

### **En el sitio:**
```
Política Argentina 🇦🇷
🖼️ IMÁGENES CONTEXTUALES ACTUALIZADAS - [fecha actual]
```

### **Imágenes:**
- ✅ Milei: Edificio del Congreso
- ✅ Cristina: Documentos legales
- ✅ Dólar: Billetes de dólar
- ✅ Corte: Martillo de juez
- ✅ UE: Apretón de manos
- ✅ Educación: Estudiantes

---

## 📞 ÚLTIMA OPCIÓN

Si nada funciona, contactar soporte de Vercel:
- Email: support@vercel.com
- Dashboard → Help → Contact Support

Proporcionar:
- Project name
- Deployment ID
- Commit hash: 72ee848
- Problema: "Images not updating despite successful deployment"

---

**Última actualización:** 2025-11-02 07:00 GMT  
**Commit:** 72ee848  
**Estado:** Esperando redeploy manual

