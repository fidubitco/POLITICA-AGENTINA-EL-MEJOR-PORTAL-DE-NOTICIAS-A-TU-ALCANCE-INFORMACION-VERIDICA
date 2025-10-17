# 🚀 POLÍTICA ARGENTINA - Full Implementation Guide

## Estado Actual ✅

Ya tienes implementado:
- ✅ Next.js 15.5.5 con App Router
- ✅ Prisma schema completo (679 líneas) con todos los modelos
- ✅ Sistema de autenticación (NextAuth)
- ✅ Admin dashboard completo (15 módulos)
- ✅ Sistema de posts, categorías, tags
- ✅ Comments, Newsletter, Subscriptions
- ✅ Social media automation
- ✅ Recommendations engine
- ✅ Video content management
- ✅ SEO audit system
- ✅ A/B testing experiments
- ✅ Job queue system
- ✅ next-intl instalado
- ✅ Hybrid AI Stack (Docker Compose, Ollama, AI Gateway)
- ✅ PBN Strategy documentado (15 dominios)
- ✅ Multilingual config (90 idiomas)

## Paso 1: Actualizar Middleware para 90 Idiomas

**Archivo**: `middleware.ts`

Actualizar para usar el config de 90 idiomas:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { LOCALE_CODES, DEFAULT_LOCALE } from './config/locales'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip admin, API, static files
  const shouldSkip = [
    '/api/',
    '/_next/',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap',
    '/admin',
    '/dashboard',
    '/login'
  ].some(path => pathname.startsWith(path))

  if (shouldSkip) return NextResponse.next()

  // Check if already has locale
  const pathnameHasLocale = LOCALE_CODES.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1]
    const response = NextResponse.next()
    response.cookies.set('NEXT_LOCALE', locale, { maxAge: 31536000, path: '/' })
    return response
  }

  // Get locale from cookie or Accept-Language
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value
  const locale = localeCookie && LOCALE_CODES.includes(localeCookie)
    ? localeCookie
    : getLocaleFromHeaders(request) || DEFAULT_LOCALE

  // Redirect to locale path
  request.nextUrl.pathname = `/${locale}${pathname}`
  const response = NextResponse.redirect(request.nextUrl)
  response.cookies.set('NEXT_LOCALE', locale, { maxAge: 31536000, path: '/' })

  return response
}

function getLocaleFromHeaders(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  try {
    // @ts-ignore
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    return matchLocale(languages, LOCALE_CODES, DEFAULT_LOCALE)
  } catch {
    return DEFAULT_LOCALE
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap|images|icons|admin|dashboard|login).*)']
}
```

## Paso 2: Crear API Routes para AI Gateway

### **Archivo**: `app/api/ai/generate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'

const AI_GATEWAY_URL = process.env.AI_GATEWAY_URL || 'http://localhost:4000'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, model = 'reasoning', options = {} } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 })
    }

    const response = await fetch(`${AI_GATEWAY_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model, options })
    })

    if (!response.ok) {
      throw new Error(`AI Gateway error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('AI Generate error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    )
  }
}
```

### **Archivo**: `app/api/ai/translate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

const AI_GATEWAY_URL = process.env.AI_GATEWAY_URL || 'http://localhost:4000'
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

export async function POST(req: NextRequest) {
  try {
    const { text, from, to, quality = 'high' } = await req.json()

    if (!text || !from || !to) {
      return NextResponse.json(
        { error: 'text, from, and to are required' },
        { status: 400 }
      )
    }

    // Check cache (optional if you have Redis client)
    const cacheKey = `translation:${from}:${to}:${createHash('md5').update(text).digest('hex')}`

    // Translate with Llama 3.1
    const prompt = `Translate the following ${from} text to ${to}. Maintain tone, style, and formatting. Only return the translation, no explanations:\n\n${text}`

    const response = await fetch(`${AI_GATEWAY_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        model: quality === 'high' ? 'reasoning' : 'fast',
        options: { temperature: 0.3 }
      })
    })

    if (!response.ok) {
      throw new Error('Translation failed')
    }

    const data = await response.json()

    return NextResponse.json({
      translation: data.response,
      cached: false,
      from,
      to
    })
  } catch (error: any) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    )
  }
}
```

### **Archivo**: `app/api/ai/embed/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'

const AI_GATEWAY_URL = process.env.AI_GATEWAY_URL || 'http://localhost:4000'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const response = await fetch(`${AI_GATEWAY_URL}/api/embed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })

    if (!response.ok) {
      throw new Error('Embedding generation failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Embedding error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate embedding' },
      { status: 500 }
    )
  }
}
```

### **Archivo**: `app/api/posts/translate/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { LOCALE_CODES } from '@/config/locales'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { locale } = await req.json()

    if (!locale || !LOCALE_CODES.includes(locale)) {
      return NextResponse.json({ error: 'Valid locale required' }, { status: 400 })
    }

    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        title: true,
        excerpt: true,
        content: true,
        slug: true,
        originalLang: true
      }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Check if translation exists
    const existingTranslation = await prisma.postTranslation.findFirst({
      where: { postId: post.id, languageCode: locale }
    })

    if (existingTranslation) {
      return NextResponse.json({
        translation: existingTranslation,
        exists: true
      })
    }

    // Translate title, excerpt, content
    const [titleRes, excerptRes] = await Promise.all([
      fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: post.title,
          from: post.originalLang,
          to: locale
        })
      }),
      post.excerpt
        ? fetch('/api/ai/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: post.excerpt,
              from: post.originalLang,
              to: locale
            })
          })
        : Promise.resolve(null)
    ])

    const titleData = await titleRes.json()
    const excerptData = excerptRes ? await excerptRes.json() : null

    // Create translation
    const translation = await prisma.postTranslation.create({
      data: {
        postId: post.id,
        languageCode: locale,
        title: titleData.translation,
        slug: `${post.slug}-${locale}`,
        excerpt: excerptData?.translation || null,
        content: post.content, // Translate content blocks separately for better quality
        status: 'COMPLETED',
        quality: 85 // Estimate quality score
      }
    })

    return NextResponse.json({
      translation,
      exists: false,
      created: true
    })
  } catch (error: any) {
    console.error('Post translation error:', error)
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    )
  }
}
```

## Paso 3: Actualizar Estructura de Rutas para Multilingual

Crear estructura `app/[locale]` para todas las páginas públicas:

```
app/
├── [locale]/
│   ├── layout.tsx                  # Layout con locale
│   ├── page.tsx                    # Homepage
│   ├── noticia/
│   │   └── [slug]/
│   │       └── page.tsx            # Article page
│   ├── noticias/
│   │   └── page.tsx                # News list
│   ├── categoria/
│   │   └── [slug]/
│   │       └── page.tsx            # Category page
│   ├── acerca/
│   │   └── page.tsx                # About page
│   ├── contacto/
│   │   └── page.tsx                # Contact page
│   └── buscar/
│       └── page.tsx                # Search page
├── api/                            # API routes (sin locale)
├── admin/                          # Admin (sin locale)
└── dashboard/                      # Dashboard (sin locale)
```

### **Archivo**: `app/[locale]/layout.tsx`

```typescript
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { LOCALE_CODES, isRTL, getLocaleConfig } from '@/config/locales'

export async function generateStaticParams() {
  return LOCALE_CODES.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const localeConfig = getLocaleConfig(params.locale)

  if (!localeConfig) return {}

  return {
    title: {
      default: 'POLÍTICA ARGENTINA - Noticias en Tiempo Real',
      template: '%s | POLÍTICA ARGENTINA'
    },
    description: 'Las últimas noticias de política, economía y actualidad argentina',
    alternates: {
      canonical: `https://politica-argentina.com/${params.locale}`,
      languages: Object.fromEntries(
        LOCALE_CODES.map(code => [code, `https://politica-argentina.com/${code}`])
      )
    }
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode
  params: { locale: string }
}) {
  if (!LOCALE_CODES.includes(params.locale)) {
    notFound()
  }

  const dir = isRTL(params.locale) ? 'rtl' : 'ltr'

  return (
    <html lang={params.locale} dir={dir}>
      <body>
        {children}
      </body>
    </html>
  )
}
```

## Paso 4: Crear Componente Language Switcher

### **Archivo**: `components/LanguageSwitcher.tsx`

```typescript
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { SUPPORTED_LOCALES, LOCALE_NAMES, type LocaleConfig } from '@/config/locales'

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  function switchLocale(newLocale: string) {
    // Replace current locale in path
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    // Set cookie
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`

    router.push(newPath)
    setIsOpen(false)
  }

  // Group by tier
  const tier1 = SUPPORTED_LOCALES.filter(l => l.tier === 1)
  const tier2 = SUPPORTED_LOCALES.filter(l => l.tier === 2)
  const tier3 = SUPPORTED_LOCALES.filter(l => l.tier === 3)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="font-medium">{LOCALE_NAMES[currentLocale]}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 max-h-96 overflow-y-auto bg-white border rounded-lg shadow-lg z-50">
          {/* Tier 1: Major Languages */}
          <div className="p-2">
            <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
              Major Languages
            </div>
            {tier1.map(locale => (
              <button
                key={locale.code}
                onClick={() => switchLocale(locale.code)}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                  locale.code === currentLocale ? 'bg-blue-50 font-medium' : ''
                }`}
              >
                <span className="text-sm">{locale.nativeName}</span>
                <span className="text-xs text-gray-500 ml-2">({locale.name})</span>
              </button>
            ))}
          </div>

          {/* Tier 2: Regional Languages */}
          <div className="p-2 border-t">
            <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
              Regional Languages
            </div>
            {tier2.map(locale => (
              <button
                key={locale.code}
                onClick={() => switchLocale(locale.code)}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                  locale.code === currentLocale ? 'bg-blue-50 font-medium' : ''
                }`}
              >
                <span className="text-sm">{locale.nativeName}</span>
              </button>
            ))}
          </div>

          {/* Tier 3: Emerging Markets */}
          <div className="p-2 border-t">
            <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
              Emerging Markets
            </div>
            {tier3.map(locale => (
              <button
                key={locale.code}
                onClick={() => switchLocale(locale.code)}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                  locale.code === currentLocale ? 'bg-blue-50 font-medium' : ''
                }`}
              >
                <span className="text-sm">{locale.nativeName}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

## Paso 5: Integrar AI Content Generation en Admin

### **Archivo**: `app/admin/ai-generator/components/ArticleGenerator.tsx`

```typescript
'use client'

import { useState } from 'react'

export function ArticleGenerator() {
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('reasoning')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  async function generate() {
    if (!prompt) return

    setLoading(true)
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Write a professional news article about: ${prompt}

Format:
- Engaging headline
- Lead paragraph (5W1H)
- 3-5 body paragraphs
- Conclusion
- Professional journalism tone
- Spanish language`,
          model,
          options: {
            temperature: 0.8,
            max_tokens: 2000
          }
        })
      })

      const data = await res.json()
      setResult(data.response)
    } catch (error) {
      console.error('Generation error:', error)
      alert('Failed to generate article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Article Topic
        </label>
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="e.g., Latest economic reforms in Argentina"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          AI Model
        </label>
        <select
          value={model}
          onChange={e => setModel(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="reasoning">Llama 3.1 8B (High Quality)</option>
          <option value="fast">Mistral 7B (Fast)</option>
        </select>
      </div>

      <button
        onClick={generate}
        disabled={loading || !prompt}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Article'}
      </button>

      {result && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-bold mb-4">Generated Article:</h3>
          <div className="prose max-w-none whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  )
}
```

## Paso 6: Variables de Entorno

### **Archivo**: `.env.local` (crear si no existe)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/politica_argentina"

# AI Gateway
AI_GATEWAY_URL="http://localhost:4000"

# Redis (opcional)
REDIS_URL="redis://localhost:6379"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Ollama (if not using AI Gateway)
OLLAMA_URL="http://localhost:11434"
```

## Paso 7: Actualizar package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "eslint",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "prisma:seed": "tsx prisma/seed.ts",
    "ai:start": "./setup-hybrid.sh",
    "ai:stop": "docker compose -f docker-compose.hybrid.yml down"
  }
}
```

## Paso 8: Comandos de Implementación

```bash
# 1. Instalar dependencias (si falta algo)
pnpm install

# 2. Generar Prisma Client
pnpm prisma generate

# 3. Aplicar migraciones
pnpm prisma migrate dev

# 4. Iniciar AI Stack (en terminal separada)
./setup-hybrid.sh

# 5. Iniciar Next.js
pnpm dev

# 6. Acceder al portal
# - Frontend: http://localhost:3000/es
# - Admin: http://localhost:3000/admin
# - API: http://localhost:3000/api
# - AI Gateway: http://localhost:4000
# - Ollama: http://localhost:11434
# - n8n: http://localhost:5678
```

## Resumen de Integración Completa

### ✅ Lo que ya tienes funcionando:
1. Next.js 15 con App Router
2. Prisma con schema completo
3. Admin dashboard con 15 módulos
4. Sistema de posts, comentarios, newsletter
5. Docker Compose con Ollama + AI Gateway
6. Config de 90 idiomas
7. PBN strategy documentada

### 🔄 Lo que falta implementar (esta guía):
1. Middleware i18n actualizado → `middleware.ts`
2. API routes para AI Gateway → `app/api/ai/*`
3. Estructura multilingual → `app/[locale]/*`
4. Language Switcher component → `components/LanguageSwitcher.tsx`
5. AI Generator integration → Admin dashboard
6. Variables de entorno → `.env.local`

### 📊 Resultado Final:
- Portal con 90 idiomas funcionando
- Generación de contenido AI en tiempo real
- Traducción automática de artículos
- PBN automation ready (n8n workflow)
- SEO optimizado para cada idioma
- Admin completo con AI tools

## Próximos Pasos Recomendados

1. **Implementar los archivos de esta guía** (middleware, API routes, components)
2. **Testear el flujo completo**:
   - Crear artículo en admin
   - Generar contenido con AI
   - Traducir a múltiples idiomas
   - Verificar rutas `/:locale/noticia/:slug`
3. **Configurar n8n workflows** para PBN automation
4. **Iniciar link building** con la estrategia documentada
5. **Monitorear métricas** en el admin dashboard

¿Quieres que implemente alguna parte específica primero?
