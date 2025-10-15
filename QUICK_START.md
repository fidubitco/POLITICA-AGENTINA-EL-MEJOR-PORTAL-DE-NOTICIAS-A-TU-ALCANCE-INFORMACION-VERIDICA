# ⚡ QUICK START - 5 MINUTOS

## 1. CLONAR Y INSTALAR (1 min)

\`\`\`bash
git clone https://github.com/tu-usuario/politica-argentina.git
cd politica-argentina
pnpm install
\`\`\`

## 2. CONFIGURAR ESENCIALES (2 min)

\`\`\`bash
cp .env.local.example .env.local
# Editar y añadir:
# - DATABASE_URL (Neon/Prisma Accelerate)
# - OPENAI_API_KEY
# - AUTH_SECRET
\`\`\`

## 3. MIGRAR Y SEED (1 min)

\`\`\`bash
pnpm prisma db push
pnpm prisma db seed
\`\`\`

## 4. EJECUTAR LOCALMENTE (30 seg)

\`\`\`bash
pnpm dev
\`\`\`

## 5. LOGIN Y PUBLICAR (30 seg)

1. Ir a http://localhost:3000
2. Login: admin@politica-argentina.com / admin123
3. Ir a /admin
4. ¡Listo! 🎉

---

## 🚀 DEPLOY EN VERCEL (OPCIONAL)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

---

## 📱 CONFIGURAR TELEGRAM (OPCIONAL - 3 min)

1. Hablar con @BotFather
2. \`/newbot\` → Seguir pasos
3. Copiar token a \`TELEGRAM_BOT_TOKEN\`
4. Crear canal → Añadir bot como admin
5. ¡Autopublicación activada! 📰

---

**Total: 5-10 minutos para estar operativo** ✅
