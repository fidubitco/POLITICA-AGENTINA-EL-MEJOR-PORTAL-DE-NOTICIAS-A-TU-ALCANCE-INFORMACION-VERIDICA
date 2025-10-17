# 🏗️ ARQUITECTURA DEL SISTEMA

## **POLÍTICA ARGENTINA - Portal de Noticias Ultra Avanzado**

### **Versión**: 2.0 Hybrid Solution
### **Stack**: Next.js 15 + PostgreSQL + Gemini AI + PWA

---

## 📋 **TABLA DE CONTENIDOS**

1. [Visión General](#visión-general)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitectura de Capas](#arquitectura-de-capas)
4. [Módulos del Sistema](#módulos-del-sistema)
5. [Base de Datos](#base-de-datos)
6. [APIs](#apis)
7. [Seguridad](#seguridad)
8. [Escalabilidad](#escalabilidad)
9. [Monitoreo](#monitoreo)

---

## 🎯 **VISIÓN GENERAL**

Sistema de gestión de contenido periodístico de última generación con:
- ✅ **11+ Módulos principales**
- ✅ **40+ API endpoints**
- ✅ **80 idiomas** soportados
- ✅ **IA integrada** (Gemini Pro)
- ✅ **PWA completo**
- ✅ **Híbrido**: Best-of-breed technologies

---

## 🛠️ **STACK TECNOLÓGICO**

### **Frontend**
- **Next.js 15** - React Framework con App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library
- **Radix UI** - Accessible primitives
- **TipTap** - Rich text editor
- **DnD Kit** - Drag & drop
- **Recharts** - Data visualization

### **Backend**
- **Next.js API Routes** - Serverless functions
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Primary database
- **NextAuth v5** - Authentication

### **AI & ML**
- **Google Gemini Pro** - Content generation & translation
- **AI Moderation** - Comment toxicity detection
- **Recommendations Engine** - Personalized content

### **External Services**
- **Vercel** - Hosting & Edge Functions
- **Stripe** - Payments (ready)
- **SendGrid/Resend** - Email (ready)
- **Cloudflare** - CDN (optional)

### **PWA**
- **Service Worker** - Offline support
- **Web Manifest** - Install prompts
- **Background Sync** - Data synchronization

---

## 🏛️ **ARQUITECTURA DE CAPAS**

```
┌─────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Public    │  │    Admin    │  │     PWA     │ │
│  │   Website   │  │  Dashboard  │  │   Offline   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────┐
│                   API GATEWAY LAYER                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐│
│  │   REST   │ │ GraphQL  │ │ WebHooks │ │ Cron    ││
│  │   APIs   │ │  (ready) │ │  (ready) │ │ Jobs    ││
│  └──────────┘ └──────────┘ └──────────┘ └─────────┘│
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────┐
│                  BUSINESS LOGIC LAYER                │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │
│  │ Auth │ │  AI  │ │ CRM  │ │ SEO  │ │Email │     │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘     │
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────┐
│                   DATA ACCESS LAYER                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │  Prisma  │  │  Cache   │  │  Search  │          │
│  │   ORM    │  │ (Redis)* │  │(Elastic)*│          │
│  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────┐
│                   DATABASE LAYER                     │
│           PostgreSQL + File Storage                  │
└─────────────────────────────────────────────────────┘

* = Ready for integration
```

---

## 📦 **MÓDULOS DEL SISTEMA**

### **1. Admin Dashboard** (`/admin`)
**Propósito**: Control central del sistema

**Características**:
- Real-time analytics
- Quick actions
- System status
- Recent activity feed

**Tecnologías**: Next.js Server Components, Prisma

---

### **2. AI Content Generator** (`/admin/ai-generator`)
**Propósito**: Generación automática de contenido

**Características**:
- Gemini AI integration
- Tone & length customization
- SEO optimization
- Auto-tagging
- Preview mode

**Tecnologías**: Gemini Pro API, React

**Endpoints**:
- `POST /api/ai/generate-article`

---

### **3. Visual Page Builder** (`/admin/page-builder`)
**Propósito**: Constructor visual de páginas

**Características**:
- Drag & drop interface
- 7 block types
- Real-time preview
- Export/import

**Tecnologías**: DnD Kit, React

---

### **4. CRM Dashboard** (`/admin/crm`)
**Propósito**: Customer Relationship Management

**Características**:
- Lead management
- Pipeline visualization
- Contact tracking
- Engagement metrics

**Tecnologías**: React, Recharts

---

### **5. Advanced Editor** (`/admin/editor`)
**Propósito**: Editor WYSIWYG profesional

**Características**:
- TipTap rich text editor
- Full formatting toolbar
- Image upload
- Auto-save
- Word count

**Tecnologías**: TipTap, React

---

### **6. Media Library** (`/admin/media`)
**Propósito**: Gestión de archivos multimedia

**Características**:
- Grid/List views
- Search & filters
- Upload management
- CDN integration ready

**Tecnologías**: React, File API

---

### **7. Analytics Dashboard** (`/admin/analytics`)
**Propósito**: Métricas y reportes

**Características**:
- Traffic analysis
- Device breakdown
- Top articles
- Traffic sources

**Tecnologías**: Recharts, React

---

### **8. SEO Auditor** (`/admin/seo-audit`)
**Propósito**: Auditoría SEO automatizada

**Características**:
- Meta tags validation
- Content length checks
- Image optimization
- Freshness monitoring

**Tecnologías**: React, Custom algorithms

---

### **9. Scheduler** (`/admin/scheduler`)
**Propósito**: Publicación programada

**Características**:
- Cron integration
- Manual triggers
- Job history
- Status tracking

**Tecnologías**: Vercel Cron, Edge Functions

**Endpoints**:
- `GET /api/cron/publish-scheduled`

---

### **10. Multi-Language System**
**Propósito**: Internacionalización completa

**Características**:
- 80 languages supported
- Auto-translation with AI
- RTL support
- Language detection

**Tecnologías**: Gemini AI, next-intl

**Endpoints**:
- `POST /api/translate-content`

---

### **11. Comments System**
**Propósito**: Engagement y comunidad

**Características**:
- Threaded comments
- AI moderation
- Guest comments
- Spam detection

**Tecnologías**: AI moderation, React

**Endpoints**:
- `GET /api/comments?postId=xxx`
- `POST /api/comments`

---

### **12. Newsletter System**
**Propósito**: Email marketing

**Características**:
- Subscription management
- Campaign builder
- Segmentation
- Analytics

**Endpoints**:
- `POST /api/newsletter/subscribe`
- `DELETE /api/newsletter/subscribe`

---

### **13. Recommendations Engine**
**Propósito**: Personalización de contenido

**Características**:
- AI-powered suggestions
- Collaborative filtering
- Trending content
- User preferences

**Endpoints**:
- `GET /api/recommendations`

---

## 🗄️ **BASE DE DATOS**

### **Schema Principal**

```prisma
User
├─ Posts (author)
├─ Comments
├─ Subscriptions
└─ Interactions

Post
├─ Category
├─ Tags
├─ Translations
├─ Comments
├─ SocialPosts
└─ Videos

PostTranslation
└─ Language-specific content

Comment
├─ Author (User or Guest)
├─ Parent (threading)
└─ Moderation status

Subscriber
├─ Preferences
└─ Campaign sends

Campaign
└─ Email marketing

SocialPost
└─ Multi-platform scheduling

Video
└─ Video content management
```

### **Índices Optimizados**

```sql
-- Posts
CREATE INDEX idx_posts_status_published ON posts(status, published_at);
CREATE INDEX idx_posts_category_published ON posts(category_id, published_at);
CREATE INDEX idx_posts_featured_breaking ON posts(featured, breaking);

-- Comments
CREATE INDEX idx_comments_post_status_created ON comments(post_id, status, created_at);

-- Subscribers
CREATE INDEX idx_subscribers_email_status ON subscribers(email, status);
```

---

## 🔌 **APIs**

### **REST APIs** (40+ endpoints)

#### **Content Management**
```
POST   /api/posts              - Create post
GET    /api/posts              - List posts
PUT    /api/posts/:id          - Update post
DELETE /api/posts/:id          - Delete post

GET    /api/search             - Global search
POST   /api/ai/generate-article - AI generation
```

#### **Translation & I18n**
```
POST   /api/translate-content  - Auto-translate post
GET    /api/languages          - List languages
```

#### **User Engagement**
```
GET    /api/comments           - Get comments
POST   /api/comments           - Create comment
POST   /api/newsletter/subscribe - Subscribe
GET    /api/recommendations    - Get recommendations
```

#### **Analytics & SEO**
```
GET    /api/metrics            - Economic metrics
GET    /api/dolar              - Dollar rates
POST   /api/track-interaction  - Track user action
```

#### **Automation**
```
GET    /api/cron/publish-scheduled - Cron job
POST   /api/social/schedule    - Schedule social post
```

### **GraphQL API** (Ready for implementation)

```graphql
type Query {
  posts(filters: PostFilters): [Post]
  post(slug: String!): Post
  categories: [Category]
  recommendations(userId: ID): [Post]
}

type Mutation {
  createPost(input: PostInput!): Post
  translatePost(postId: ID!, languages: [String!]!): [Translation]
  subscribeNewsletter(email: String!): Subscription
}
```

---

## 🔒 **SEGURIDAD**

### **Authentication**
- NextAuth v5 (Auth.js)
- JWT sessions
- OAuth providers ready
- Password hashing with bcrypt

### **Authorization**
- Role-based access control (RBAC)
- Roles: ADMIN, EDITOR, REPORTER, CONTRIBUTOR, READER
- Route protection

### **Data Protection**
- SQL injection prevention (Prisma)
- XSS protection (React)
- CSRF tokens
- Rate limiting (ready)
- 2FA (ready for implementation)

### **API Security**
- Bearer tokens
- Cron secret validation
- Input sanitization
- Error handling

---

## 📈 **ESCALABILIDAD**

### **Horizontal Scaling**
- Vercel Edge Functions
- Serverless architecture
- Multi-region deployment ready

### **Database Scaling**
- Connection pooling (Prisma Accelerate)
- Read replicas (ready)
- Sharding strategy (ready)

### **Caching Strategy**
```
Level 1: Browser Cache (Service Worker)
Level 2: CDN Cache (Vercel/Cloudflare)
Level 3: Application Cache (Redis - ready)
Level 4: Database Query Cache (Prisma)
```

### **Performance Optimization**
- Static generation where possible
- ISR for dynamic content
- Image optimization
- Code splitting
- Lazy loading

---

## 📊 **MONITOREO**

### **Logging**
- Console logs (development)
- Structured logging (production - ready)
- Error tracking (Sentry - ready)

### **Metrics**
- Web Vitals tracking
- Custom events
- Performance monitoring
- Uptime monitoring (ready)

### **Alerting**
- Error alerts
- Performance degradation
- Security incidents
- Cron job failures

---

## 🚀 **DEPLOYMENT**

### **Environments**
```
Development → Staging → Production
```

### **CI/CD Pipeline** (ready)
```yaml
Build → Test → Deploy → Monitor
```

### **Vercel Configuration**
```json
{
  "crons": [{
    "path": "/api/cron/publish-scheduled",
    "schedule": "every 5 minutes"
  }],
  "regions": ["iad1"],
  "framework": "nextjs"
}
```

---

## 📝 **PRÓXIMOS PASOS**

### **Fase 1: Database Migration**
1. Run `npx prisma db push` with extended schema
2. Seed initial data
3. Test all relationships

### **Fase 2: External Integrations**
1. Configure Stripe
2. Set up SendGrid/Resend
3. Connect social media APIs

### **Fase 3: Advanced Features**
1. Implement GraphQL
2. Add Redis caching
3. Set up Elasticsearch

### **Fase 4: Mobile**
1. Enhance PWA
2. Consider React Native app

---

## 📞 **SOPORTE**

Para dudas técnicas o contribuciones:
- Documentación: `/docs`
- API Reference: `/api-docs`
- GitHub Issues: (repository)

---

**Última actualización**: 2025-10-17
**Versión**: 2.0 Hybrid Solution
