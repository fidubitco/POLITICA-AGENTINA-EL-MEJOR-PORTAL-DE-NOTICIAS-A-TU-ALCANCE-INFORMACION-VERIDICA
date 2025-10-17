# Design: World-Class Portal Redesign

## Architecture Overview

### Design System Foundation
```
src/
├── app/
│   ├── globals.css (design tokens, custom utilities)
│   └── (site)/
│       └── page.tsx (new magazine layout)
├── components/
│   ├── articles/
│   │   ├── hero-article.tsx (large featured)
│   │   ├── article-card-standard.tsx
│   │   ├── article-card-featured.tsx
│   │   └── article-card-compact.tsx
│   ├── breaking/
│   │   └── breaking-news-banner.tsx
│   ├── navigation/
│   │   └── category-nav.tsx
│   └── animations/
│       └── (existing components enhanced)
└── tailwind.config.ts (extended theme)
```

### Key Technical Decisions

#### 1. Typography Strategy
**Decision**: Serif headings + Sans-serif body

**Rationale**:
- Serif fonts (Playfair Display) convey editorial authority
- Sans-serif body (Inter) ensures modern readability
- Combination is industry standard (NYT, Washington Post, Medium)

**Implementation**:
```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');

h1, h2, h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  letter-spacing: -0.02em;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}
```

#### 2. Layout Architecture
**Decision**: CSS Grid with asymmetric magazine layouts

**Rationale**:
- Flexbox creates uniform boxes (boring)
- CSS Grid allows complex, editorial-style layouts
- Asymmetry creates visual interest and hierarchy

**Implementation**:
```tsx
// Homepage Layout
<div className="grid grid-cols-12 gap-8">
  {/* Hero takes 8 columns */}
  <article className="col-span-8">
    <HeroArticle post={featured} />
  </article>

  {/* Side stories take 4 columns */}
  <aside className="col-span-4">
    <SideStories posts={trending} />
  </aside>
</div>
```

#### 3. Animation Performance
**Decision**: Framer Motion for orchestration, CSS for simple transitions

**Rationale**:
- Framer Motion excels at complex, scroll-triggered animations
- CSS transitions are more performant for hover states
- Combination gives best of both worlds

**Performance Budget**:
- No layout thrashing (use `transform` and `opacity` only)
- Debounce scroll handlers (IntersectionObserver)
- Respect `prefers-reduced-motion`

#### 4. Color System
**Decision**: Semantic color naming with CSS custom properties

**Rationale**:
- Easy theme switching (light/dark)
- Clear intent (`bg-editorial-red` vs `bg-red-600`)
- Scalable for future design iterations

**Palette**:
```css
:root {
  --editorial-red: #DC2626;
  --editorial-navy: #1E293B;
  --editorial-gray: #64748B;
  --success-green: #10B981;
  --warning-amber: #F59E0B;
  --info-blue: #3B82F6;
}
```

#### 5. Image Optimization
**Decision**: Next.js Image component with WebP

**Rationale**:
- Automatic optimization and lazy loading
- Responsive images with `sizes` prop
- WebP format for 30% smaller files
- Blur placeholders for perceived performance

**Configuration**:
```tsx
<Image
  src={post.coverImage}
  alt={post.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
  priority={isFeatured}
/>
```

## Component Architecture

### Hero Article Component
```tsx
interface HeroArticleProps {
  post: {
    title: string
    excerpt: string
    coverImage: string
    category: { name: string; color: string }
    author: { name: string; image: string }
    publishedAt: Date
    views: number
  }
}

// Visual Structure:
// [=====================================]
// |                                     |
// |     Large Image (aspect 16:9)       |
// |     Gradient Overlay                |
// |                                     |
// |  [CATEGORY] [BREAKING]              |
// |  Headline (48-64px serif)           |
// |  Excerpt (18px sans-serif)          |
// |  Author • Time • Views              |
// |                                     |
// [=====================================]
```

### Article Card Variants

**Standard Card**: For grid layouts
```
[Image 16:9 ratio]
Category Badge
Title (20px)
Excerpt (14px)
Metadata
```

**Featured Card**: Larger, more prominent
```
[Image 4:3 ratio]
Category Badge + Breaking Badge
Title (28px serif)
Longer Excerpt (16px)
Author + Metadata
```

**Compact Card**: For sidebars
```
[Thumbnail] Title (16px)
            Category
            Views count
```

## Responsive Breakpoints

```typescript
const breakpoints = {
  mobile: '320px-767px',    // Single column, stacked
  tablet: '768px-1023px',   // 2 columns, simplified grid
  laptop: '1024px-1439px',  // Full 12-col grid
  desktop: '1440px+',       // Max-width 1400px, more spacing
}
```

### Mobile-First Strategy
1. Design for mobile (single column)
2. Add complexity at tablet (2 columns)
3. Full magazine layout at desktop (asymmetric grid)

## Animation Choreography

### Page Load Sequence
```
1. Hero fades in (0ms delay)
   ↓
2. Breaking news banner slides in (100ms delay)
   ↓
3. Economic metrics stagger in (200ms delay, 50ms between)
   ↓
4. Article grid staggers in (300ms delay, 80ms between cards)
   ↓
5. Sidebar fades in (500ms delay)
```

### Scroll Animations
- **Threshold**: Element 20% visible
- **Animation**: FadeIn + SlideUp (20px)
- **Duration**: 500ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)

### Hover States
- **Article Cards**: Scale(1.02) + Shadow elevation
- **Images**: Scale(1.1) with overflow:hidden
- **Links**: Underline grows from left
- **Buttons**: Darken background 10%

## Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| FCP | < 1.2s | Inline critical CSS, preload fonts |
| LCP | < 2.0s | Optimize hero image, lazy load below fold |
| CLS | < 0.1 | Reserve space for images, no layout shift |
| TTI | < 2.5s | Code split, defer non-critical JS |
| Bundle | < 450KB | Tree-shake unused code, compress |

## Testing Strategy

### Visual Regression
- Capture screenshots of key pages
- Compare before/after with Percy or Chromatic
- Test on mobile, tablet, desktop viewports

### Accessibility
- Run axe DevTools on all pages
- Test keyboard navigation (Tab, Enter, Escape)
- Test screen reader (VoiceOver, NVDA)
- Verify color contrast (WebAIM tool)

### Performance
- Lighthouse CI in GitHub Actions
- Set performance budgets (Bundlesize)
- Monitor Web Vitals in production (Vercel Analytics)

### Cross-Browser
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest, iOS)
- Test on actual devices (not just DevTools)

## Rollout Strategy

### Phase 1: Internal Testing (Day 1)
- Deploy to preview URL
- Test on staging database
- Review with stakeholders
- Collect feedback

### Phase 2: Beta Release (Day 2)
- Show to 10% of users (A/B test)
- Monitor metrics (engagement, bounce rate)
- Fix critical bugs
- Iterate based on data

### Phase 3: Full Launch (Day 3)
- Deploy to 100% of users
- Announce on social media
- Monitor error logs
- Plan next iteration

---

**Status**: Ready for Implementation
**Estimated Time**: 15-20 hours
**Risk Level**: Medium (visual changes, no backend changes)
