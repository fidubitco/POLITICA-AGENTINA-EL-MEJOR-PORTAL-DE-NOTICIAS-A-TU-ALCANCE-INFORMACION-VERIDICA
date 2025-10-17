# 🚀 DEPLOY NOW - Quick Start Guide

## ⚡ FASTEST DEPLOYMENT (5 minutes)

### **Option 1: Railway (Recommended)**
```bash
# 1. Set your Railway token
export RAILWAY_TOKEN="43e76ac1-cc42-431c-ae6f-84d95aa92fd3"

# 2. Initialize Railway project
railway init

# 3. Add PostgreSQL
railway add --database postgres

# 4. Deploy application
railway up

# 5. Get your URL
railway open
```

**✅ Done! Your app is live on Railway**

---

### **Option 2: Vercel (Frontend)**
```bash
# 1. Install Vercel CLI (if not installed)
npm install -g vercel

# 2. Deploy
vercel --prod

# 3. Add environment variables in dashboard
# - DATABASE_URL (from Railway)
# - NEXTAUTH_SECRET
# - GEMINI_API_KEY
```

**✅ Done! Your app is live on Vercel**

---

### **Option 3: Docker Local**
```bash
# 1. Build image
docker build -t politica-argentina .

# 2. Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e GEMINI_API_KEY="your-key" \
  politica-argentina

# 3. Open browser
open http://localhost:3000
```

**✅ Done! App running locally**

---

## 📝 REQUIRED ENVIRONMENT VARIABLES

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
GEMINI_API_KEY="your-gemini-api-key"
CRON_SECRET="run: openssl rand -hex 32"
```

---

## 🎯 DEPLOYMENT CHECKLIST

- [ ] Environment variables configured
- [ ] Database connected
- [ ] Build successful (`pnpm build`)
- [ ] Health check works (`/api/health`)
- [ ] Admin dashboard accessible (`/admin`)

---

## 📊 POST-DEPLOYMENT

### **1. Test Health Endpoint**
```bash
curl https://your-app.railway.app/api/health
```

### **2. Access Admin Dashboard**
```
https://your-app.railway.app/admin
```

### **3. Monitor Logs**
```bash
# Railway
railway logs

# Vercel
vercel logs
```

---

## 🆘 TROUBLESHOOTING

### **Build fails**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

### **Database connection fails**
```bash
# Test connection
npx prisma db push
```

### **Environment variables not working**
- Check Railway/Vercel dashboard
- Ensure variables are set for production
- Redeploy after changing variables

---

## 📞 SUPPORT

- See `HYBRID-DEPLOYMENT-GUIDE.md` for detailed instructions
- See `COMPLETE-SYSTEM-SUMMARY.md` for system overview
- Check Railway/Vercel docs

---

**🎉 Ready to deploy in 5 minutes!**
