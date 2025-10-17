# 🚀 DEPLOYMENT GUIDE

## **POLÍTICA ARGENTINA - Production Deployment**

---

## 📋 **PRE-DEPLOYMENT CHECKLIST**

### **Environment Variables**
Create `.env.production` with:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/db?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/db"

# Authentication
NEXTAUTH_URL="https://politica-argentina.vercel.app"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# AI Services
GEMINI_API_KEY="your-gemini-api-key"

# Cron Jobs
CRON_SECRET="your-cron-secret"

# Email (Optional)
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
EMAIL_FROM="noreply@politica-argentina.com"

# Stripe (Optional)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Analytics (Optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## 🗄️ **DATABASE SETUP**

### **1. Create PostgreSQL Database**

**Recommended Providers**:
- [Neon](https://neon.tech) - Serverless Postgres
- [Supabase](https://supabase.com) - Open-source Firebase alternative
- [PlanetScale](https://planetscale.com) - MySQL alternative
- [Railway](https://railway.app) - All-in-one platform

### **2. Run Migrations**

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Or run migrations (production)
npx prisma migrate deploy
```

### **3. Seed Initial Data** (Optional)

```bash
npx prisma db seed
```

Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  await prisma.user.create({
    data: {
      email: 'admin@politica-argentina.com',
      name: 'Admin',
      role: 'ADMIN',
      password: 'hashed-password',
    },
  });

  // Create categories
  const categories = ['Política', 'Economía', 'Sociedad', 'Internacional'];
  for (const cat of categories) {
    await prisma.category.create({
      data: {
        name: cat,
        slug: cat.toLowerCase(),
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

---

## ☁️ **VERCEL DEPLOYMENT**

### **1. Install Vercel CLI**

```bash
npm i -g vercel
```

### **2. Login**

```bash
vercel login
```

### **3. Configure Project**

Create `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "regions": ["iad1"],
  "crons": [
    {
      "path": "/api/cron/publish-scheduled",
      "schedule": "*/5 * * * *"
    }
  ],
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "GEMINI_API_KEY": "@gemini-api-key"
  }
}
```

### **4. Deploy**

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

### **5. Set Environment Variables**

```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add GEMINI_API_KEY
vercel env add CRON_SECRET
```

### **6. Configure Custom Domain**

```bash
vercel domains add politica-argentina.com
```

Update DNS:
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

---

## 🔄 **CI/CD PIPELINE**

### **GitHub Actions** (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📊 **MONITORING SETUP**

### **1. Vercel Analytics**

```bash
pnpm add @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### **2. Sentry (Error Tracking)**

```bash
pnpm add @sentry/nextjs
```

Create `sentry.client.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### **3. Google Analytics 4**

Add to `app/layout.tsx`:
```tsx
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    `,
  }}
/>
```

---

## 🔒 **SECURITY HARDENING**

### **1. Security Headers**

Create `next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

### **2. Content Security Policy**

```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
}
```

### **3. Rate Limiting**

```bash
pnpm add @upstash/ratelimit @upstash/redis
```

Create `lib/rate-limit.ts`:
```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});
```

---

## 📧 **EMAIL CONFIGURATION**

### **SendGrid Setup**

```bash
pnpm add @sendgrid/mail
```

Create `lib/email.ts`:
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  await sgMail.send({
    to,
    from: process.env.EMAIL_FROM!,
    subject,
    html,
  });
}
```

---

## 💳 **STRIPE INTEGRATION**

### **Setup**

```bash
pnpm add stripe @stripe/stripe-js
```

Create `lib/stripe.ts`:
```typescript
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});
```

### **Webhook Handler**

Create `app/api/webhooks/stripe/route.ts`:
```typescript
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  // Handle event
  switch (event.type) {
    case 'customer.subscription.created':
      // Handle subscription
      break;
  }

  return new Response(JSON.stringify({ received: true }));
}
```

---

## 🌐 **CDN CONFIGURATION**

### **Cloudflare Setup** (Optional)

1. Add domain to Cloudflare
2. Update nameservers
3. Configure SSL/TLS
4. Enable Auto Minify
5. Set up caching rules

**Cloudflare Workers** (Optional):
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const cache = caches.default
  let response = await cache.match(request)

  if (!response) {
    response = await fetch(request)
    event.waitUntil(cache.put(request, response.clone()))
  }

  return response
}
```

---

## ⚡ **PERFORMANCE OPTIMIZATION**

### **1. Image Optimization**

Already configured in Next.js. Use:
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={1200}
  height={630}
  priority
/>
```

### **2. Font Optimization**

Already using `next/font`:
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
```

### **3. Bundle Analysis**

```bash
pnpm add -D @next/bundle-analyzer
```

`next.config.js`:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({...})
```

Run:
```bash
ANALYZE=true pnpm build
```

---

## 🔍 **TESTING BEFORE DEPLOYMENT**

### **1. Build Test**
```bash
pnpm build
```

### **2. Start Production Server Locally**
```bash
pnpm start
```

### **3. Lighthouse Audit**
```bash
pnpm dlx lighthouse https://localhost:3000 --view
```

### **4. Security Scan**
```bash
pnpm audit
pnpm audit fix
```

---

## 📱 **PWA VERIFICATION**

### **Checklist**:
- ✅ manifest.json configured
- ✅ Service worker registered
- ✅ Icons (72x72 to 512x512)
- ✅ Offline page
- ✅ Theme color
- ✅ Install prompts

### **Test PWA**:
1. Open in Chrome DevTools
2. Go to Application tab
3. Check Manifest
4. Check Service Workers
5. Test offline functionality

---

## 🚦 **POST-DEPLOYMENT**

### **1. Verify Deployment**
- [ ] Website loads correctly
- [ ] SSL certificate valid
- [ ] All pages accessible
- [ ] API endpoints working
- [ ] Cron jobs running
- [ ] Database connected
- [ ] Emails sending

### **2. Configure Cron Jobs**

Verify in Vercel Dashboard:
- `/api/cron/publish-scheduled` runs every 5 minutes

### **3. Set up Monitoring**
- [ ] Error tracking (Sentry)
- [ ] Analytics (GA4)
- [ ] Uptime monitoring
- [ ] Performance monitoring

### **4. DNS Propagation**

Check with:
```bash
nslookup politica-argentina.com
```

---

## 🔧 **TROUBLESHOOTING**

### **Build Fails**

```bash
# Clear cache
rm -rf .next
pnpm clean

# Rebuild
pnpm build
```

### **Database Connection Issues**

```bash
# Test connection
npx prisma db push

# Check connection string format
# Should use pooled connection for Vercel
```

### **Environment Variables Not Working**

```bash
# Verify in Vercel Dashboard
vercel env ls

# Re-deploy
vercel --prod --force
```

---

## 📚 **RESOURCES**

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Production](https://www.prisma.io/docs/guides/deployment/deployment)
- [Vercel Cron](https://vercel.com/docs/cron-jobs)

---

**Last Updated**: 2025-10-17
**Deployment Status**: ✅ Production Ready
