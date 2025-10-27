# 📰 CONFIGURACIÓN DE NEWSAPI

Guía completa para configurar NewsAPI.org y generar noticias únicas.

---

## 🔑 PASO 1: OBTENER API KEY

### 1.1 Registrarse en NewsAPI.org

1. Ve a: https://newsapi.org/register
2. Completa el formulario:
   - **Nombre:** Tu nombre
   - **Email:** Tu email
   - **Uso:** Selecciona "Personal" o "Business"
3. Acepta los términos y condiciones
4. Verifica tu email
5. Copia tu API Key

### 1.2 Planes Disponibles

| Plan | Precio | Requests/día | Características |
|------|--------|--------------|-----------------|
| **Developer** | Gratis | 100 | Perfecto para desarrollo |
| **Business** | $449/mes | 250,000 | Producción profesional |
| **Enterprise** | Custom | Ilimitado | Soporte premium |

**Recomendación:** Comienza con el plan Developer (gratis) para pruebas.

---

## ⚙️ PASO 2: CONFIGURAR EN TU PROYECTO

### 2.1 Agregar API Key al .env

```bash
# Abre tu archivo .env
nano .env

# Agrega tu API Key
VITE_NEWS_API_KEY=tu_api_key_aqui

# Ejemplo:
VITE_NEWS_API_KEY=abc123def456ghi789jkl012mno345pqr678
```

### 2.2 Verificar Configuración

```bash
# Verifica que la variable esté configurada
cat .env | grep NEWS_API_KEY
```

---

## 🚀 PASO 3: USAR EL SISTEMA

### 3.1 Acceder al Panel Admin

1. Ve a: https://politicaargentina.com/admin
2. Inicia sesión con tus credenciales
3. Ve a **"AI News Creator"**

### 3.2 Generar Noticias con NewsAPI

#### Opción A: Por Tema

```
1. Selecciona "Buscar por tema"
2. Ingresa: "política argentina"
3. Selecciona categoría: "Política"
4. Click en "Generar con IA"
```

#### Opción B: Por Fuente

```
1. Selecciona "Buscar por fuente"
2. Ingresa fuente: "clarin.com"
3. Selecciona categoría: "Economía"
4. Click en "Generar con IA"
```

#### Opción C: Por Palabra Clave

```
1. Selecciona "Buscar por keyword"
2. Ingresa: "Milei", "dólar", "inflación"
3. Selecciona categoría correspondiente
4. Click en "Generar con IA"
```

---

## 🤖 PASO 4: SISTEMA DE GENERACIÓN AUTOMÁTICA

### 4.1 Cómo Funciona

El sistema hace lo siguiente:

1. **Busca noticias** en NewsAPI según tu tema
2. **Analiza el contenido** con IA (GPT-4)
3. **Genera versión única** sin plagio
4. **Optimiza para SEO** automáticamente
5. **Traduce** a todos los idiomas
6. **Indexa** en Google instantáneamente

### 4.2 Configurar Automatización

```javascript
// En el Admin Panel, ve a "Configuración"
{
  "newsapi": {
    "enabled": true,
    "auto_fetch": true,
    "interval": "1 hour",
    "sources": [
      "clarin.com",
      "lanacion.com.ar",
      "infobae.com",
      "pagina12.com.ar"
    ],
    "keywords": [
      "política argentina",
      "economía argentina",
      "dólar",
      "inflación",
      "elecciones"
    ],
    "categories": [
      "politica",
      "economia",
      "sociedad"
    ]
  }
}
```

---

## 📊 PASO 5: MÉTRICAS Y MONITOREO

### 5.1 Dashboard de NewsAPI

Ve a: https://newsapi.org/account

Aquí puedes ver:
- ✅ Requests usados hoy
- ✅ Requests restantes
- ✅ Historial de uso
- ✅ Errores

### 5.2 Métricas en tu Admin

En tu panel admin, ve a **"Analytics"** para ver:
- 📈 Noticias generadas
- 📈 Tasa de éxito
- 📈 Tiempo promedio de generación
- 📈 Calidad SEO promedio

---

## 🔍 PASO 6: ENDPOINTS DISPONIBLES

### 6.1 Buscar Noticias

```javascript
// GET /api/newsapi/search
{
  "query": "política argentina",
  "language": "es",
  "sortBy": "publishedAt",
  "pageSize": 10
}
```

### 6.2 Top Headlines

```javascript
// GET /api/newsapi/top-headlines
{
  "country": "ar",
  "category": "politics",
  "pageSize": 10
}
```

### 6.3 Por Fuente

```javascript
// GET /api/newsapi/sources
{
  "country": "ar",
  "language": "es"
}
```

---

## ⚠️ LÍMITES Y MEJORES PRÁCTICAS

### 7.1 Límites del Plan Gratuito

- ✅ 100 requests/día
- ✅ Datos de hasta 1 mes atrás
- ✅ Solo fuentes públicas
- ❌ No comercial

### 7.2 Optimizar Uso

```javascript
// Cachear resultados
const cache = {
  ttl: 3600, // 1 hora
  key: `newsapi:${query}`
};

// Agrupar requests
const batchRequests = [
  { query: "política" },
  { query: "economía" },
  { query: "sociedad" }
];
```

### 7.3 Evitar Errores

```javascript
// Manejar rate limits
if (response.status === 429) {
  // Esperar 1 minuto
  await sleep(60000);
  // Reintentar
  retry();
}

// Validar API Key
if (response.status === 401) {
  console.error('API Key inválida');
}
```

---

## 🎯 PASO 7: GENERAR CONTENIDO ÚNICO

### 7.1 Proceso de Generación

```
1. NewsAPI obtiene artículo original
   ↓
2. IA lee y comprende el contenido
   ↓
3. IA genera versión 100% única
   ↓
4. Sistema optimiza para SEO
   ↓
5. Traduce a 11 idiomas
   ↓
6. Indexa en Google
   ↓
7. Publica en tu sitio
```

### 7.2 Verificar Unicidad

```javascript
// El sistema verifica:
- ✅ 0% plagio (Copyscape)
- ✅ 100% contenido original
- ✅ Diferentes palabras y estructura
- ✅ Mantiene hechos y datos
- ✅ Agrega análisis propio
```

---

## 📝 PASO 8: EJEMPLOS PRÁCTICOS

### 8.1 Generar Noticia de Política

```bash
# 1. Buscar en NewsAPI
query: "Javier Milei"
category: "politica"

# 2. IA genera versión única
Original: "El presidente Milei anunció nuevas medidas económicas..."
Única: "En una conferencia de prensa, el mandatario argentino presentó un paquete de reformas..."

# 3. Optimiza SEO
Title: "Milei Anuncia Reformas Económicas: Análisis Completo 2025"
Meta: "Análisis detallado de las nuevas medidas económicas del gobierno argentino..."
Keywords: "Milei, reformas, economía, Argentina, 2025"

# 4. Publica
URL: /politica/milei-anuncia-reformas-economicas-2025
```

### 8.2 Generar Noticia de Economía

```bash
# 1. Buscar en NewsAPI
query: "dólar blue"
category: "economia"

# 2. IA genera versión única
Original: "El dólar blue cerró en $1,200..."
Única: "La cotización paralela del dólar alcanzó los $1,200 en la jornada de hoy..."

# 3. Optimiza SEO
Title: "Dólar Blue Hoy: Cotización, Análisis y Proyecciones"
Meta: "Seguimiento en tiempo real del dólar blue con análisis experto..."
Keywords: "dólar blue, cotización, cambio, Argentina"

# 4. Publica
URL: /economia/dolar-blue-cotizacion-analisis
```

---

## 🔧 TROUBLESHOOTING

### Error: "API Key inválida"

```bash
# Verifica que la key esté correcta
echo $VITE_NEWS_API_KEY

# Verifica que esté en .env
cat .env | grep NEWS_API_KEY

# Reinicia el servidor
pnpm dev
```

### Error: "Rate limit exceeded"

```bash
# Espera 1 minuto
# O actualiza a plan Business
```

### Error: "No results found"

```bash
# Prueba con diferentes keywords
# Verifica que el país sea "ar"
# Verifica que el idioma sea "es"
```

---

## 📚 RECURSOS ADICIONALES

- **Documentación oficial:** https://newsapi.org/docs
- **Ejemplos de código:** https://newsapi.org/docs/client-libraries
- **Fuentes disponibles:** https://newsapi.org/sources
- **Status de API:** https://status.newsapi.org/

---

## ✅ CHECKLIST FINAL

- [ ] API Key obtenida de NewsAPI.org
- [ ] API Key agregada a .env
- [ ] Servidor reiniciado
- [ ] Admin panel accesible
- [ ] AI News Creator funcionando
- [ ] Primera noticia generada
- [ ] Noticia publicada exitosamente
- [ ] SEO verificado
- [ ] Traducciones generadas
- [ ] Indexado en Google

---

## 🎉 ¡LISTO!

Tu sistema está configurado para generar noticias únicas automáticamente usando NewsAPI + IA.

**Próximos pasos:**
1. Genera 5-10 noticias de prueba
2. Verifica calidad y SEO
3. Configura automatización
4. Monitorea métricas
5. Escala según necesites

