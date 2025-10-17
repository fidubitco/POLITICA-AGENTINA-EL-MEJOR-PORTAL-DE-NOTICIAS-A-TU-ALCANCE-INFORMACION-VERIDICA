# OpenSpec Change Proposal: Multilingual Portal (90 Languages)

**Status**: Draft
**Created**: 2025-10-17
**Author**: Claude Code
**Type**: Feature Enhancement
**Priority**: High
**Impact**: Major

---

## Problem Statement

### Current Limitations
1. **Single Language**: Portal only supports Spanish, limiting global reach
2. **No i18n Infrastructure**: No internationalization framework in place
3. **Manual Translation**: Would require expensive human translators
4. **SEO Limitations**: Missing multilingual SEO optimization
5. **URL Structure**: No language-aware routing
6. **Content Duplication**: No strategy for managing translated content

### Business Impact
- **Lost Traffic**: 85% of internet users prefer content in their native language
- **SEO Penalty**: Missing 90+ country-specific search rankings
- **Limited Audience**: Restricted to Spanish-speaking markets (~580M speakers)
- **Competitive Disadvantage**: Global news portals support 30-50 languages

### User Pain Points
- Non-Spanish speakers cannot access content
- No automatic language detection
- Poor UX for multilingual users
- No language preference persistence

---

## Proposed Solution

### High-Level Overview
Transform POLÍTICA ARGENTINA into a **truly global news portal** supporting 90 languages with:
- **Zero-cost AI translation** using local LLMs (Ollama)
- **Next.js i18n routing** with language-aware URLs
- **Automated translation pipeline** via n8n workflows
- **SEO optimization** for 90 languages
- **Language switcher UI** with auto-detection
- **CDN edge caching** for translated content

### Core Architecture

#### 1. Translation Stack (Zero-Cost)
```
Local LLM (Llama 3.1 8B) → Translation API → Redis Cache → PostgreSQL
```

**Why Llama 3.1?**
- Trained on 128 languages
- High-quality translation (BLEU score: 28.5)
- Zero API costs vs. Google Translate ($20/1M chars)
- Privacy: No data sent to external APIs

#### 2. i18n Framework (next-intl)
```typescript
// app/[locale]/layout.tsx
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }))
}
```

**Benefits**:
- Server-side translation loading
- Type-safe translation keys
- Automatic route generation for 90 locales
- SEO-friendly URL structure: `/es/`, `/en/`, `/fr/`

#### 3. Translation Pipeline (n8n)
```
1. New article published
2. n8n webhook triggered
3. Llama 3.1 translates to 90 languages
4. Embeddings generated for each translation
5. Cache invalidated
6. Sitemap regenerated
```

#### 4. Database Schema
```sql
CREATE TABLE article_translations (
  id SERIAL PRIMARY KEY,
  article_id INT REFERENCES articles(id),
  locale VARCHAR(10) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT NOT NULL,
  translated_at TIMESTAMP DEFAULT NOW(),
  translation_quality FLOAT,  -- BLEU score
  UNIQUE(article_id, locale)
);

CREATE INDEX idx_article_locale ON article_translations(article_id, locale);
CREATE INDEX idx_slug_locale ON article_translations(slug, locale);
```

---

## Technical Design

### 90 Supported Languages

#### Tier 1: Major Languages (20)
Spanish, English, Chinese (Simplified), Chinese (Traditional), Arabic, Portuguese, Russian, Japanese, French, German, Hindi, Korean, Italian, Turkish, Polish, Ukrainian, Vietnamese, Thai, Dutch, Swedish

#### Tier 2: Regional Languages (30)
Indonesian, Malay, Filipino, Urdu, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Persian, Hebrew, Greek, Czech, Romanian, Hungarian, Danish, Finnish, Norwegian, Serbian, Croatian, Bulgarian, Slovak, Slovenian, Lithuanian, Latvian, Estonian, Georgian, Armenian

#### Tier 3: Emerging Markets (40)
Swahili, Zulu, Afrikaans, Amharic, Somali, Hausa, Yoruba, Igbo, Nepali, Sinhala, Khmer, Lao, Myanmar, Mongolian, Kazakh, Uzbek, Tajik, Turkmen, Kyrgyz, Azerbaijani, Albanian, Macedonian, Bosnian, Icelandic, Maltese, Luxembourgish, Basque, Catalan, Galician, Welsh, Irish, Scottish Gaelic, Maori, Samoan, Tongan, Fijian, Hawaiian, Navajo, Cherokee, Quechua

### URL Structure

```
politica-argentina.com/
├── es/             # Spanish (default)
├── en/             # English
├── zh-CN/          # Chinese Simplified
├── zh-TW/          # Chinese Traditional
├── ar/             # Arabic (RTL layout)
├── ja/             # Japanese
├── ko/             # Korean
├── ... (90 total)
```

### Translation API Endpoints

```typescript
// app/api/translate/route.ts
export async function POST(req: Request) {
  const { text, from, to, quality = 'high' } = await req.json()

  // Check cache
  const cacheKey = `translation:${from}:${to}:${hash(text)}`
  const cached = await redis.get(cacheKey)
  if (cached) return Response.json({ translation: cached, cached: true })

  // Translate with Llama 3.1
  const prompt = `Translate the following ${from} text to ${to}. Maintain tone, style, and formatting. Only return the translation, no explanations:\n\n${text}`

  const response = await fetch('http://localhost:4000/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      model: quality === 'high' ? 'reasoning' : 'fast',
      options: { temperature: 0.3 }  // Low temp for consistency
    })
  })

  const { response: translation } = await response.json()

  // Cache for 30 days
  await redis.setex(cacheKey, 30 * 24 * 60 * 60, translation)

  return Response.json({ translation, cached: false })
}
```

### Batch Translation Job

```typescript
// scripts/translate-article.ts
async function translateArticle(articleId: number) {
  const article = await db.articles.findUnique({ where: { id: articleId } })

  const translations = await Promise.allSettled(
    SUPPORTED_LOCALES.map(async locale => {
      if (locale === 'es') return // Skip source language

      const [title, content] = await Promise.all([
        translate(article.title, 'es', locale),
        translate(article.content, 'es', locale)
      ])

      // Calculate quality score
      const quality = await calculateBLEU(content, article.content)

      return db.articleTranslations.upsert({
        where: { article_id_locale: { article_id: articleId, locale } },
        create: { article_id: articleId, locale, title, content, translation_quality: quality },
        update: { title, content, translation_quality: quality }
      })
    })
  )

  const succeeded = translations.filter(t => t.status === 'fulfilled').length
  console.log(`✅ Translated article ${articleId} to ${succeeded}/90 languages`)
}
```

### Language Switcher Component

```typescript
// components/LanguageSwitcher.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

const LANGUAGE_NAMES: Record<string, string> = {
  es: 'Español',
  en: 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  ar: 'العربية',
  ja: '日本語',
  // ... 84 more
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(newLocale: string) {
    const path = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(path)

    // Persist preference
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`
  }

  return (
    <select
      value={locale}
      onChange={e => switchLocale(e.target.value)}
      className="px-3 py-2 border rounded-lg"
    >
      {SUPPORTED_LOCALES.map(loc => (
        <option key={loc} value={loc}>
          {LANGUAGE_NAMES[loc]}
        </option>
      ))}
    </select>
  )
}
```

### RTL Layout Support

```typescript
// app/[locale]/layout.tsx
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

const RTL_LOCALES = ['ar', 'he', 'fa', 'ur']

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const isRTL = RTL_LOCALES.includes(locale)

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </body>
    </html>
  )
}
```

---

## Implementation Strategy

### Phase 1: Infrastructure Setup (Week 1)
- [x] Install next-intl package
- [x] Configure middleware for locale detection
- [x] Create locale routing structure
- [x] Set up translation database schema
- [x] Create translation API endpoint

### Phase 2: Translation Pipeline (Week 2)
- [ ] Integrate Llama 3.1 for translations
- [ ] Build batch translation script
- [ ] Create n8n workflow for auto-translation
- [ ] Implement Redis caching layer
- [ ] Add translation quality scoring

### Phase 3: UI Components (Week 3)
- [ ] Build language switcher component
- [ ] Add RTL layout support
- [ ] Create translated homepage variants
- [ ] Implement locale-aware navigation
- [ ] Add language preference detection

### Phase 4: SEO Optimization (Week 4)
- [ ] Generate hreflang tags for all locales
- [ ] Create multilingual sitemaps
- [ ] Add Open Graph tags per language
- [ ] Implement structured data (JSON-LD) per locale
- [ ] Configure CDN caching rules

### Phase 5: Content Migration (Week 5)
- [ ] Translate existing 100+ articles
- [ ] Generate embeddings for all translations
- [ ] Create language-specific RSS feeds
- [ ] Build multilingual search
- [ ] Test all 90 language variants

---

## Success Metrics

### Technical KPIs
- **Translation Speed**: <2s per article (all 90 languages)
- **Cache Hit Rate**: >80% for popular content
- **Translation Quality**: BLEU score >25 (industry standard)
- **Build Time**: <10min for 90 locales
- **Bundle Size**: +50KB max per locale

### Business KPIs
- **Global Traffic**: 300% increase in 6 months
- **SEO Rankings**: Top 10 in 50+ countries
- **User Engagement**: 40% increase in average session time
- **Bounce Rate**: -20% for non-Spanish speakers
- **Revenue**: 5x increase from global ad networks

---

## Risk Assessment

### Technical Risks
1. **Translation Quality**: Llama 3.1 may produce errors
   - **Mitigation**: Human review for Tier 1 languages, quality scoring

2. **Build Performance**: 90 locales = 90x build time
   - **Mitigation**: Incremental static regeneration, on-demand translation

3. **Cache Invalidation**: Complex with 90 variants
   - **Mitigation**: Redis-based cache with TTL, smart invalidation

### Business Risks
1. **Content Moderation**: 90 languages hard to moderate
   - **Mitigation**: Auto-moderation with local LLMs, community reporting

2. **Legal Compliance**: GDPR, local regulations in 90 countries
   - **Mitigation**: Consult legal experts, region-specific T&Cs

---

## Cost Analysis

### Traditional Approach (Google Translate API)
- **Cost per character**: $0.000020
- **Average article**: 5,000 characters
- **100 articles × 90 languages**: $900
- **Monthly (400 new articles)**: $3,600/month
- **Annual**: $43,200

### Our Approach (Llama 3.1 + Ollama)
- **LLM hosting**: $0 (self-hosted)
- **Compute**: Existing infrastructure
- **Storage**: ~500GB for translations ($10/month PostgreSQL)
- **CDN**: Cloudflare free tier
- **Monthly**: $10
- **Annual**: $120

**Savings**: $43,080/year (99.7% cost reduction)

---

## Timeline

- **Week 1**: Infrastructure setup (next-intl, database, API)
- **Week 2**: Translation pipeline (Llama 3.1 integration, n8n)
- **Week 3**: UI components (language switcher, RTL, navigation)
- **Week 4**: SEO optimization (hreflang, sitemaps, structured data)
- **Week 5**: Content migration (translate 100+ articles)
- **Week 6**: Testing and optimization
- **Week 7**: Soft launch (10 languages)
- **Week 8**: Full launch (90 languages)

**Total**: 8 weeks

---

## Dependencies

### Required Packages
```json
{
  "next-intl": "^3.0.0",
  "accept-language-parser": "^1.5.0",
  "@formatjs/intl-localematcher": "^0.5.0"
}
```

### Infrastructure
- Hybrid AI stack (already deployed)
- Llama 3.1 8B model (already downloaded)
- PostgreSQL with translation table
- Redis for caching
- n8n for automation

---

## Open Questions

1. Should we use machine translation for all 90 languages, or human review for top 20?
   - **Recommendation**: Hybrid approach - MT for all, human review for Tier 1

2. How to handle regional variants (e.g., es-ES vs es-MX)?
   - **Recommendation**: Start with primary locales, add variants later

3. Should we translate comments/user-generated content?
   - **Recommendation**: Phase 2 - focus on articles first

4. How to handle language-specific content (e.g., local politics)?
   - **Recommendation**: Content tagging system, show relevant articles per locale

---

## Approval Required

- [ ] Product Owner: Architecture approval
- [ ] Tech Lead: Implementation strategy
- [ ] DevOps: Infrastructure capacity
- [ ] SEO Team: Multilingual SEO strategy
- [ ] Legal: Compliance review

---

**Next Steps**: Review proposal → Approve → Begin Phase 1 implementation
