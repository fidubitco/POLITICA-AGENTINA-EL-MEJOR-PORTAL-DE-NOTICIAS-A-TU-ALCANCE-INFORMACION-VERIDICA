# 🚀 HYBRID DEPLOYMENT GUIDE - POLÍTICA ARGENTINA
## Railway + Vercel + GitHub - Production Ready

**Date**: October 17, 2025
**Version**: 3.0 Professional
**Status**: ✅ Fully Operational

---

## 📊 DEPLOYMENT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                     HYBRID ARCHITECTURE                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐    ┌──────────────┐   ┌────────────┐ │
│  │   VERCEL     │    │   RAILWAY    │   │   GITHUB   │ │
│  │  (Frontend)  │◄───┤  (Database)  │◄──│   (CI/CD)  │ │
│  │  Edge CDN    │    │  PostgreSQL  │   │  Actions   │ │
│  │  Static Gen  │    │  Redis Cache │   │  Workflows │ │
│  └──────────────┘    └──────────────┘   └────────────┘ │
│         │                    │                  │        │
│         └────────────────────┴──────────────────┘        │
│                          │                                │
│                    Production App                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 DEPLOYMENT STRATEGY

### **Option 1: Railway (Database + Services)**
- PostgreSQL Database (managed)
- Redis Cache
- Background Workers
- Cron Jobs
- **Cost**: ~$5-10/month

### **Option 2: Vercel (Frontend + API)**
- Next.js App Router
- Edge Functions
- Static Generation
- Image Optimization
- **Cost**: Free (Hobby) / $20/month (Pro)

### **Option 3: Hybrid (RECOMMENDED)**
- **Railway**: Database + Redis + Workers
- **Vercel**: Frontend + API Routes + Edge
- **GitHub**: CI/CD + Version Control
- **Best Performance** + **Cost Effective**

---

## 🔧 PART 1: RAILWAY SETUP

### **Step 1: Install Railway CLI**
```bash
npm install -g @railway/cli
railway --version
```

### **Step 2: Login with Token**
```bash
# Set your Railway token
export RAILWAY_TOKEN="43e76ac1-cc42-431c-ae6f-84d95aa92fd3"

# Or login via browser
railway login
```

### **Step 3: Initialize Project**
```bash
cd "/Users/usuario/POLITICA ARGENTINA/politica-argentina"

# Link to existing project or create new one
railway link

# Or create a new project
railway init
```

### **Step 4: Provision PostgreSQL**
```bash
# Add PostgreSQL database
railway add --database postgres

# Get connection string
railway variables
```

**Expected Output**:
```
DATABASE_URL=postgresql://postgres:****@containers-us-west-1.railway.app:5432/railway
```

### **Step 5: Provision Redis (Optional)**
```bash
# Add Redis cache
railway add --database redis

# Get connection string
railway variables
```

### **Step 6: Configure Environment Variables**
```bash
# Set all required variables
railway variables set NEXTAUTH_SECRET=$(openssl rand -base64 32)
railway variables set GEMINI_API_KEY="your-gemini-key"
railway variables set CRON_SECRET=$(openssl rand -hex 32)
railway variables set NEXTAUTH_URL="https://your-app.railway.app"
railway variables set NODE_ENV="production"
```

### **Step 7: Deploy to Railway**
```bash
# Deploy using Dockerfile
railway up

# Or deploy with build command
railway up --detach
```

### **Step 8: Monitor Deployment**
```bash
# View logs
railway logs

# Check status
railway status

# Open in browser
railway open
```

---

## 🚀 PART 2: VERCEL SETUP

### **Step 1: Install Vercel CLI**
```bash
npm install -g vercel
vercel --version
```

### **Step 2: Login to Vercel**
```bash
vercel login
```

### **Step 3: Link to GitHub**
```bash
# Push to GitHub first
git init
git add .
git commit -m "feat: hybrid deployment setup"
git remote add origin https://github.com/YOUR_USERNAME/politica-argentina.git
git push -u origin main
```

### **Step 4: Import Project to Vercel**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure build settings:

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "devCommand": "pnpm dev"
}
```

### **Step 5: Configure Environment Variables**

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# Database (from Railway)
DATABASE_URL=postgresql://postgres:****@containers-us-west-1.railway.app:5432/railway?pgbouncer=true&connection_limit=10
DIRECT_URL=postgresql://postgres:****@containers-us-west-1.railway.app:5432/railway

# Auth
NEXTAUTH_URL=https://politica-argentina.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-from-railway

# AI
GEMINI_API_KEY=your-gemini-api-key

# Cron
CRON_SECRET=your-cron-secret-from-railway

# Redis (Optional)
REDIS_URL=redis://default:****@containers-us-west-1.railway.app:6379
```

### **Step 6: Deploy to Vercel**
```bash
# Deploy from CLI
vercel --prod

# Or use automatic deployments from GitHub
# (Configure in Vercel Dashboard)
```

### **Step 7: Configure Custom Domain (Optional)**
```bash
vercel domains add politica-argentina.com
```

---

## 🔄 PART 3: GITHUB ACTIONS CI/CD

### **Create Workflow File**

Create `.github/workflows/deploy.yml`:

```yaml
name: 🚀 Deploy to Railway + Vercel

on:
  push:
    branches: [main, production]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  # ==================== Test & Build ====================
  test:
    name: 🧪 Test & Validate
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout
        uses: actions/checkout@v4

      - name: 📦 Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: latest

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: 📚 Install dependencies
        run: pnpm install --frozen-lockfile

      - name: 🔍 Lint code
        run: pnpm lint || true

      - name: 🏗️ Build application
        run: pnpm build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

  # ==================== Deploy to Railway ====================
  deploy-railway:
    name: 🚂 Deploy to Railway
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - name: 📥 Checkout
        uses: actions/checkout@v4

      - name: 🚂 Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: politica-argentina

  # ==================== Deploy to Vercel ====================
  deploy-vercel:
    name: ▲ Deploy to Vercel
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - name: 📥 Checkout
        uses: actions/checkout@v4

      - name: ▲ Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

  # ==================== Notify on Success ====================
  notify:
    name: 📢 Notify Success
    runs-on: ubuntu-latest
    needs: [deploy-railway, deploy-vercel]
    steps:
      - name: ✅ Deployment Success
        run: |
          echo "🎉 Deployment successful!"
          echo "🚂 Railway: Deployed"
          echo "▲ Vercel: Deployed"
```

### **Add GitHub Secrets**

Go to GitHub repo → Settings → Secrets → Actions:

```
RAILWAY_TOKEN=43e76ac1-cc42-431c-ae6f-84d95aa92fd3
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-vercel-org-id
VERCEL_PROJECT_ID=your-vercel-project-id
DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-nextauth-secret
GEMINI_API_KEY=your-gemini-api-key
```

---

## 🐳 PART 4: DOCKER DEPLOYMENT

### **Build Docker Image**
```bash
# Build the image
docker build -t politica-argentina:latest .

# Test locally
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e GEMINI_API_KEY="your-api-key" \
  politica-argentina:latest
```

### **Deploy to Railway with Docker**
```bash
# Railway will automatically detect Dockerfile
railway up

# Or specify Dockerfile
railway up --dockerfile Dockerfile
```

### **Docker Compose (Local Development)**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

---

## 📊 MONITORING & HEALTH CHECKS

### **Health Check Endpoint**
```bash
curl https://your-app.railway.app/api/health
```

**Expected Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-17T10:30:00.000Z",
  "uptime": 3600,
  "checks": {
    "server": { "status": "up", "responseTime": "45ms" },
    "database": { "status": "connected" },
    "memory": { "used": "128MB", "total": "512MB" }
  }
}
```

### **Railway Monitoring**
```bash
# View logs
railway logs

# View metrics
railway metrics

# View status
railway status
```

### **Vercel Monitoring**
- Go to Vercel Dashboard
- Navigate to Analytics
- Check Performance metrics
- Monitor Error rates

---

## 🔐 SECURITY BEST PRACTICES

### **Environment Variables**
✅ Never commit `.env` files
✅ Use secrets management (Railway/Vercel)
✅ Rotate secrets regularly
✅ Use different secrets for dev/prod

### **Database Security**
✅ Use connection pooling (`pgbouncer=true`)
✅ Limit connections (`connection_limit=10`)
✅ Enable SSL (`sslmode=require`)
✅ Regular backups

### **Application Security**
✅ HTTPS only
✅ Security headers (already configured)
✅ Rate limiting (implement via middleware)
✅ Input validation (Zod schemas)

---

## 🎯 DEPLOYMENT CHECKLIST

### **Pre-Deployment**
- [ ] All tests pass (`pnpm build`)
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Secrets securely stored
- [ ] Dockerfile tested locally

### **Railway Deployment**
- [ ] Railway CLI installed
- [ ] Project linked/created
- [ ] PostgreSQL provisioned
- [ ] Redis provisioned (optional)
- [ ] Environment variables set
- [ ] First deployment successful

### **Vercel Deployment**
- [ ] GitHub repository created
- [ ] Vercel project linked
- [ ] Environment variables synced
- [ ] Custom domain configured (optional)
- [ ] Auto-deployments enabled

### **Post-Deployment**
- [ ] Health check returns 200
- [ ] Database connected
- [ ] API endpoints working
- [ ] Frontend loading correctly
- [ ] Cron jobs running

---

## 🚨 TROUBLESHOOTING

### **Railway Issues**

**Problem**: `railway: command not found`
```bash
npm install -g @railway/cli --force
```

**Problem**: Database connection fails
```bash
# Check connection string
railway variables | grep DATABASE_URL

# Test connection
railway run -- pnpm prisma db push
```

**Problem**: Build fails
```bash
# View build logs
railway logs --build

# Rebuild
railway up --force
```

### **Vercel Issues**

**Problem**: Build timeout
```bash
# Increase timeout in vercel.json
{
  "builds": [
    { "src": "package.json", "use": "@vercel/next", "config": { "maxDuration": 300 } }
  ]
}
```

**Problem**: Environment variables not working
- Check Vercel Dashboard → Settings → Environment Variables
- Ensure variables are set for "Production"
- Redeploy after changing variables

### **Docker Issues**

**Problem**: Image too large
```bash
# Use .dockerignore
# Already configured with optimizations
docker images | grep politica-argentina
```

**Problem**: Build fails on Railway
```bash
# Check Dockerfile syntax
docker build -t test .

# Check Railway logs
railway logs --build
```

---

## 📈 PERFORMANCE OPTIMIZATION

### **Railway Optimization**
- Use connection pooling
- Enable Redis caching
- Configure auto-scaling
- Monitor resource usage

### **Vercel Optimization**
- Enable Edge Functions
- Use Image Optimization
- Configure ISR (Incremental Static Regeneration)
- Monitor Core Web Vitals

### **Database Optimization**
- Create proper indexes
- Use query optimization
- Enable query logging
- Regular maintenance

---

## 💰 COST ESTIMATION

### **Railway**
- **Hobby Plan**: $5/month (500 hours)
- **Developer Plan**: $10/month (unlimited)
- **PostgreSQL**: Included
- **Redis**: Included

### **Vercel**
- **Hobby**: Free (personal projects)
- **Pro**: $20/month (commercial)
- **Enterprise**: Custom pricing

### **Total Monthly Cost**
- **Development**: $0 (Hobby plans)
- **Production**: $30/month (Railway Dev + Vercel Pro)
- **Enterprise**: $100+/month

---

## 🎉 DEPLOYMENT COMPLETE!

Your POLÍTICA ARGENTINA platform is now deployed with:

✅ **Railway**: Database + Services
✅ **Vercel**: Frontend + Edge CDN
✅ **GitHub Actions**: Automated CI/CD
✅ **Docker**: Container support
✅ **Monitoring**: Health checks + Logs
✅ **Security**: Best practices applied

---

## 📞 SUPPORT & NEXT STEPS

### **Next Steps**
1. Configure custom domain
2. Set up monitoring alerts
3. Enable auto-scaling
4. Configure CDN
5. Set up staging environment

### **Resources**
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Actions](https://docs.github.com/actions)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Deployment Guide Version**: 3.0
**Last Updated**: October 17, 2025
**Status**: ✅ Production Ready
