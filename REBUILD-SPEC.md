# 🏆 POLÍTICA ARGENTINA - COMPLETE SYSTEM REBUILD SPECIFICATIONS

## 📋 PROJECT GOAL
Recreate the entire news portal from scratch with **WORLD-CLASS quality** inspired by CNN, BBC, Bloomberg, and El País.

---

## 🎯 CRITICAL REQUIREMENTS

### 1. ZERO ERRORS
- ✅ All images must have proper `alt` attributes
- ✅ No console errors or warnings
- ✅ No 400/404/500 errors
- ✅ Proper TypeScript types everywhere
- ✅ Clean build with zero warnings

### 2. PROFESSIONAL DESIGN
- 🎨 CNN/BBC/Bloomberg inspired layout
- 🎨 Modern card-based grid system
- 🎨 Professional typography hierarchy
- 🎨 Smooth animations and transitions
- 🎨 Perfect mobile responsiveness
- 🎨 Dark theme with proper contrast
- 🎨 Gradient accents for branding

### 3. COMPLETE FUNCTIONALITY
- ⚙️ Admin panel 100% functional
- ⚙️ Post creation/editing works perfectly
- ⚙️ Authentication system integrated
- ⚙️ Image upload functional
- ⚙️ Search fully working
- ⚙️ Categories filtering working
- ⚙️ Newsletter signup functional
- ⚙️ Comments system working

### 4. ULTRA ADVANCED SEO
- 🔍 JSON-LD structured data on all pages
- 🔍 Dynamic meta tags
- 🔍 Open Graph tags
- 🔍 Twitter Card tags
- 🔍 Canonical URLs
- 🔍 XML sitemaps
- 🔍 robots.txt optimized
- 🔍 Schema.org markup

### 5. FULL STACK OPTIMIZATION
- ⚡ Server components where possible
- ⚡ Client components only when needed
- ⚡ Image optimization with Next/Image
- ⚡ Lazy loading
- ⚡ Code splitting
- ⚡ Caching strategies
- ⚡ Database query optimization
- ⚡ API route optimization

---

## 🎨 HOMEPAGE DESIGN (CNN/BBC Style)

### Hero Section
```
┌─────────────────────────────────────────────────────┐
│  BREAKING NEWS TICKER (Live scrolling metrics)      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────────────────────────────┐             │
│  │                                    │             │
│  │   FEATURED POST (Large Image)     │   SIDEBAR   │
│  │   with gradient overlay            │   ┌──────┐  │
│  │                                    │   │Top 5 │  │
│  │   TITLE (70px, bold)              │   │Posts │  │
│  │   Excerpt (24px)                  │   └──────┘  │
│  │   Author • Time • Views           │   ┌──────┐  │
│  └────────────────────────────────────┘   │News  │  │
│                                            │letter│  │
│                                            └──────┘  │
└─────────────────────────────────────────────────────┘
```

### Breaking News Section
```
┌─────────────────────────────────────────────────────┐
│  🔴 ÚLTIMAS NOTICIAS                                 │
├─────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Image    │  │ Image    │  │ Image    │          │
│  │          │  │          │  │          │          │
│  │ Title    │  │ Title    │  │ Title    │          │
│  │ Excerpt  │  │ Excerpt  │  │ Excerpt  │          │
│  │ Time     │  │ Time     │  │ Time     │          │
│  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────┘
```

### Economic Metrics (Bloomberg Style)
```
┌─────────────────────────────────────────────────────┐
│  💹 ECONOMÍA EN TIEMPO REAL                          │
├─────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ DÓLAR    │  │ DÓLAR    │  │ DÓLAR    │          │
│  │ BLUE     │  │ OFICIAL  │  │ MEP      │          │
│  │          │  │          │  │          │          │
│  │ $1,458   │  │ $1,024   │  │ $1,464   │          │
│  │ ▲ +2.3%  │  │ ▼ -0.6%  │  │ ▲ +1.8%  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│                                                      │
│  📊 Historical Chart (7 days)                        │
└─────────────────────────────────────────────────────┘
```

### News Grid (Masonry Layout)
```
┌─────────────────────────────────────────────────────┐
│  📰 ÚLTIMAS NOTICIAS                                 │
├─────────────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  │ Post │ │ Post │ │ Post │ │ Post │               │
│  │   1  │ │   2  │ │   3  │ │   4  │               │
│  └──────┘ └──────┘ └──────┘ └──────┘               │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  │ Post │ │ Post │ │ Post │ │ Post │               │
│  │   5  │ │   6  │ │   7  │ │   8  │               │
│  └──────┘ └──────┘ └──────┘ └──────┘               │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  │ Post │ │ Post │ │ Post │ │ Post │               │
│  │   9  │ │  10  │ │  11  │ │  12  │               │
│  └──────┘ └──────┘ └──────┘ └──────┘               │
└─────────────────────────────────────────────────────┘
```

### Categories Section
```
┌─────────────────────────────────────────────────────┐
│  🗂️ EXPLORA POR CATEGORÍA                           │
├─────────────────────────────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐          │
│  │ 🔴  │ │ 💰  │ │ 🌎  │ │ 👥  │ │ 💻  │          │
│  │Polít│ │Econ │ │Inter│ │Soc. │ │Tech │          │
│  │ica  │ │omía │ │nac. │ │     │ │     │          │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘          │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐          │
│  │ ⚽  │ │ 🎭  │ │ 💊  │ │ 🌿  │ │ 💭  │          │
│  │Dep. │ │Cult │ │Salud│ │M.Amb│ │Opin │          │
│  │     │ │ura  │ │     │ │iente│ │ión  │          │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘          │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 ARTICLE PAGE DESIGN

```
┌─────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Categoría > Artículo            │
├─────────────────────────────────────────────────────┤
│                                                      │
│  🔴 ÚLTIMA HORA badge (if breaking)                 │
│                                                      │
│  ARTICLE TITLE (60px, bold, dramatic)               │
│  Stunning typography with proper line-height        │
│                                                      │
│  By Author Name • Published Date • 5 min read       │
│  Social Share: [FB] [TW] [LI] [WA]                 │
│                                                      │
│  ┌────────────────────────────────────────┐         │
│  │                                        │         │
│  │   FEATURED IMAGE (16:9, optimized)    │         │
│  │   with proper alt text                │         │
│  │                                        │         │
│  └────────────────────────────────────────┘         │
│  Caption / Photo credit                             │
│                                                      │
│  ┌─ ARTICLE CONTENT ───────────────────┐ SIDEBAR   │
│  │                                      │ ┌──────┐  │
│  │  Lead paragraph (larger text)       │ │Relate│  │
│  │                                      │ │d     │  │
│  │  Body content with:                 │ │Posts │  │
│  │  • Proper typography                │ └──────┘  │
│  │  • Subheadings                      │ ┌──────┐  │
│  │  • Blockquotes                      │ │Trend │  │
│  │  • Pull quotes                      │ │ing   │  │
│  │  • Inline images                    │ │      │  │
│  │  • Lists                            │ └──────┘  │
│  │  • Proper spacing                   │ ┌──────┐  │
│  │                                      │ │News  │  │
│  │  [AD PLACEHOLDER]                   │ │letter│  │
│  │                                      │ └──────┘  │
│  │  More content...                    │           │
│  └──────────────────────────────────────┘           │
│                                                      │
│  Tags: #política #economía #breaking                │
│                                                      │
│  ┌─ COMMENTS SECTION ──────────────────────┐        │
│  │  💬 23 Comments                         │        │
│  │                                          │        │
│  │  Comment threading system                │        │
│  │  AI moderation enabled                   │        │
│  └──────────────────────────────────────────┘        │
│                                                      │
│  ┌─ RELATED POSTS ─────────────────────────┐        │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │        │
│  │  │ Post │ │ Post │ │ Post │ │ Post │   │        │
│  │  │   1  │ │   2  │ │   3  │ │   4  │   │        │
│  │  └──────┘ └──────┘ └──────┘ └──────┘   │        │
│  └──────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 ADMIN PANEL DESIGN

### Dashboard
```
┌─────────────────────────────────────────────────────┐
│  ADMIN PANEL HEADER                                  │
│  [Logo] Política Argentina Admin      [Search] [🔔] │
├──────┬──────────────────────────────────────────────┤
│ SIDE │  DASHBOARD                                    │
│ BAR  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│      │  │Total │ │Total │ │Active│ │Publ. │        │
│ 📊   │  │Posts │ │Views │ │Users │ │Rate  │        │
│ Dash │  │  152 │ │ 2.5M │ │  847 │ │ 87%  │        │
│      │  └──────┘ └──────┘ └──────┘ └──────┘        │
│ 📝   │                                               │
│ Posts│  QUICK ACTIONS                                │
│      │  ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│ 📁   │  │ New Post │ │AI Genera │ │Analytics │     │
│ Categ│  └──────────┘ └──────────┘ └──────────┘     │
│      │                                               │
│ 👥   │  RECENT ACTIVITY                              │
│ Users│  • Post published: "Title..."                 │
│      │  • Comment pending: User...                   │
│ 📊   │  • New user registered                        │
│ Analyt│                                               │
│      │  SYSTEM STATUS                                │
│ ⚙️   │  Database: ● Active                           │
│ Sett.│  API: ● Connected                             │
│      │  Cache: ● Running                             │
└──────┴──────────────────────────────────────────────┘
```

### Posts Management
```
┌─────────────────────────────────────────────────────┐
│  ARTÍCULOS                      [+ Nuevo Artículo]  │
├─────────────────────────────────────────────────────┤
│  [Search...] [Filter: All ▼] [Category: All ▼]     │
├─────────────────────────────────────────────────────┤
│  ✓│ Image │ Title                │Cat.│Status│Views│
│  ─┼───────┼─────────────────────┼────┼──────┼─────┤
│  ☐│ [img] │ Gobierno anuncia... │Pol.│Pub. │45K  │
│  ☐│ [img] │ Dólar blue alcanza..│Econ│Pub. │38K  │
│  ☐│ [img] │ Congreso debate...  │Pol.│Draft│ 0   │
│  ☐│ [img] │ Argentina firma...  │Intl│Pub. │22K  │
│  ...                                                 │
│  ← 1 2 3 4 5 →                                      │
└─────────────────────────────────────────────────────┘
```

### Post Editor
```
┌─────────────────────────────────────────────────────┐
│  EDITOR: Nuevo Artículo                             │
├─────────────────────────────────────────────────────┤
│  Title: [__________________________________]          │
│  Slug:  [__________________________________]          │
│                                                      │
│  ┌─ CONTENT EDITOR ─────────────────────┐           │
│  │ [B] [I] [H1] [H2] [List] [Image] ... │           │
│  ├───────────────────────────────────────┤           │
│  │                                        │           │
│  │  Rich text editor content...           │           │
│  │  with TipTap or similar                │           │
│  │                                        │           │
│  └────────────────────────────────────────┘           │
│                                                      │
│  Category: [Política ▼]                              │
│  Tags: [tag1] [tag2] [+ Add]                        │
│                                                      │
│  Cover Image: [Upload] or [URL]                     │
│  ┌──────┐                                            │
│  │Preview                                            │
│  └──────┘                                            │
│                                                      │
│  SEO Settings:                                       │
│  Meta Title: [__________________________]            │
│  Meta Desc:  [__________________________]            │
│  Keywords:   [__________________________]            │
│                                                      │
│  Status: [Published ▼]                               │
│  Publish Date: [Now] or [Schedule]                  │
│                                                      │
│  [Cancel] [Save Draft] [Preview] [Publish]          │
└─────────────────────────────────────────────────────┘
```

---

## 📦 REQUIRED COMPONENTS

### Core Components
1. **Header** with logo, nav, search, user menu
2. **Footer** with links, social, newsletter
3. **Sidebar** with trending, ads, newsletter
4. **Card** for posts (multiple variants)
5. **Hero** for featured post
6. **CategoryBadge** with colors
7. **ShareButtons** for social sharing
8. **NewsletterForm** with validation
9. **Comments** with threading
10. **SearchModal** with live results

### Admin Components
1. **AdminSidebar** with navigation
2. **AdminHeader** with user menu
3. **DataTable** with sorting/filtering
4. **RichTextEditor** (TipTap)
5. **ImageUploader** with preview
6. **CategoryPicker** with colors
7. **TagsInput** with chips
8. **StatusBadge** with colors
9. **StatCard** with icons
10. **Chart** components (Recharts)

---

## 🔧 TECHNICAL STACK

### Frontend
- **Next.js 15.5.5** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Headless components
- **Lucide React** - Icons
- **TipTap** - Rich text editor
- **Recharts** - Charts
- **date-fns** - Date formatting

### Backend
- **Prisma** - ORM
- **PostgreSQL** - Database (Railway)
- **NextAuth** - Authentication
- **Zod** - Validation
- **Server Actions** - Mutations

### Deployment
- **Vercel** - Frontend hosting
- **Railway** - Database hosting
- **GitHub** - Version control

---

## 📄 FILE STRUCTURE

```
app/
├── (site)/                    # Public site
│   ├── layout.tsx
│   ├── page.tsx              # Homepage (CNN style)
│   ├── noticia/[slug]/       # Article page
│   ├── categoria/[slug]/     # Category page
│   ├── buscar/               # Search page
│   ├── acerca/               # About page
│   ├── contacto/             # Contact page
│   └── ...
├── admin/                     # Admin panel
│   ├── layout.tsx            # Admin layout with sidebar
│   ├── page.tsx              # Dashboard
│   ├── posts/                # Posts management
│   ├── categories/           # Categories
│   ├── users/                # Users
│   ├── media/                # Media library
│   ├── analytics/            # Analytics
│   ├── settings/             # Settings
│   └── actions.ts            # Server actions
├── api/                       # API routes
│   ├── health/
│   ├── metrics/
│   ├── dolar/
│   ├── posts/
│   └── ...
├── login/                     # Login page
└── ...

components/
├── site/                      # Public site components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroPost.tsx
│   ├── PostCard.tsx
│   ├── Sidebar.tsx
│   ├── NewsletterForm.tsx
│   ├── ShareButtons.tsx
│   ├── Comments.tsx
│   └── ...
├── admin/                     # Admin components
│   ├── AdminSidebar.tsx
│   ├── AdminHeader.tsx
│   ├── RichTextEditor.tsx
│   ├── ImageUploader.tsx
│   ├── DataTable.tsx
│   └── ...
└── ui/                        # Base UI components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── dialog.tsx
    └── ...
```

---

## ✅ ACCEPTANCE CRITERIA

### Must Have
- [ ] Zero console errors/warnings
- [ ] All images have proper alt text
- [ ] Homepage loads in < 2s
- [ ] Mobile responsive (320px - 4K)
- [ ] Admin panel fully functional
- [ ] Can create/edit/delete posts
- [ ] Authentication working
- [ ] Database connected
- [ ] All pages have proper SEO
- [ ] Production build succeeds
- [ ] Deployed to Vercel successfully

### Should Have
- [ ] Image optimization with Next/Image
- [ ] Lazy loading for images
- [ ] Smooth scroll animations
- [ ] Loading states on all actions
- [ ] Error boundaries
- [ ] Toast notifications
- [ ] Search autocomplete
- [ ] Comments with AI moderation

### Nice to Have
- [ ] PWA support
- [ ] Dark/Light mode toggle
- [ ] i18n support
- [ ] Real-time updates
- [ ] Analytics dashboard with charts
- [ ] Email notifications
- [ ] Social media auto-posting

---

## 🚀 IMPLEMENTATION PLAN

### Phase 1: Core Foundation (2 hours)
1. Clean up current codebase
2. Set up proper TypeScript configs
3. Create base UI components
4. Set up authentication
5. Create database schema

### Phase 2: Homepage (1 hour)
1. Hero section with featured post
2. Breaking news section
3. Economic metrics cards
4. News grid
5. Sidebar with trending
6. Categories section
7. Footer

### Phase 3: Article Pages (1 hour)
1. Article page layout
2. Content rendering
3. Share buttons
4. Related posts
5. Comments section
6. Breadcrumbs

### Phase 4: Admin Panel (2 hours)
1. Admin layout with sidebar
2. Dashboard
3. Posts management
4. Post editor with rich text
5. Categories management
6. Users management
7. Settings page

### Phase 5: Testing & Polish (1 hour)
1. Fix all TypeScript errors
2. Fix all console errors
3. Test all functionality
4. Mobile responsive check
5. SEO verification
6. Performance optimization

### Phase 6: Deployment (30 mins)
1. Build for production
2. Deploy to Vercel
3. Verify all pages
4. Test admin panel
5. Monitor errors

---

## 🎯 SUCCESS METRICS

- **Performance**: Lighthouse score > 90
- **SEO**: Perfect score on meta tags
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile**: Perfect responsive design
- **Functionality**: 100% features working
- **Design**: CNN/BBC/Bloomberg quality level

---

**STATUS**: Ready to implement
**PRIORITY**: CRITICAL
**TIMELINE**: 6-7 hours for complete rebuild

