# n8n Workflows para POLÍTICA ARGENTINA

## 🔄 Workflows Implementados

### 1. **RSS to Social Media**
**Archivo**: `rss-to-social.json`

**Flujo**:
1. RSS Feed Reader (cada 30 min)
2. Filter (solo nuevos artículos)
3. HTTP Request (API Portal)
4. Split (traducción multi-idioma)
5. Multi-Platform Publisher
6. Discord Notification (éxito/error)

**Plataformas**: Telegram, Discord, Reddit, LinkedIn, Twitter

---

### 2. **Content Generation Pipeline**
**Archivo**: `content-generation.json`

**Flujo**:
1. Webhook Trigger (nuevo artículo scraped)
2. OpenAI GPT-4o (reescritura completa)
3. OpenAI GPT-4o (expansion a 20k palabras)
4. OpenAI GPT-4o-mini (keywords SEO)
5. Database Insert (Prisma)
6. Translation Queue (80 idiomas)
7. Publish to Socials

---

### 3. **Translation Orchestrator**
**Archivo**: `translation-orchestrator.json`

**Flujo**:
1. Cron (cada 1 hora)
2. Database Query (posts sin traducir)
3. Loop por idioma prioritario
4. OpenAI Translation (con contexto cultural)
5. Database Insert (PostTranslation)
6. Update Post Status
7. Slack Notification (progress report)

---

### 4. **Social Media Scheduler**
**Archivo**: `social-scheduler.json`

**Flujo**:
1. Cron (cada 15 min)
2. Database Query (posts scheduled)
3. Check Time Window
4. Publish to Selected Platforms
5. Update Status to PUBLISHED
6. Analytics Tracking

---

### 5. **Analytics Aggregator**
**Archivo**: `analytics-aggregator.json`

**Flujo**:
1. Cron (cada 6 horas)
2. Telegram API (get stats)
3. Discord API (get stats)
4. Reddit API (get stats)
5. LinkedIn API (get stats)
6. Twitter API (get stats)
7. Aggregate Data
8. Database Insert (Analytics)
9. Generate Report
10. Email/Discord Notification

---

## 🚀 Instalación

### Opción 1: n8n Cloud
1. Ir a https://n8n.io
2. Crear cuenta
3. Importar workflows desde \`n8n-workflows/*.json\`
4. Configurar credenciales

### Opción 2: Self-Hosted (Docker)
\`\`\`bash
docker run -it --rm \\
  --name n8n \\
  -p 5678:5678 \\
  -v ~/.n8n:/home/node/.n8n \\
  n8nio/n8n
\`\`\`

Acceder a: http://localhost:5678

---

## 🔑 Credenciales Necesarias

### APIs Internas:
- \`POLITICA_ARGENTINA_API_URL\`: https://politica-argentina.vercel.app
- \`POLITICA_ARGENTINA_CRON_SECRET\`: tu_cron_secret

### OpenAI:
- \`OPENAI_API_KEY\`: tu_openai_key

### Redes Sociales:
- \`TELEGRAM_BOT_TOKEN\`
- \`TELEGRAM_CHANNEL_ID\`
- \`DISCORD_WEBHOOK_URL\`
- \`REDDIT_CLIENT_ID\`
- \`REDDIT_CLIENT_SECRET\`
- \`REDDIT_USERNAME\`
- \`REDDIT_PASSWORD\`
- \`LINKEDIN_ACCESS_TOKEN\`
- \`TWITTER_API_KEY\`
- \`TWITTER_API_SECRET\`
- \`TWITTER_ACCESS_TOKEN\`
- \`TWITTER_ACCESS_SECRET\`

### Base de Datos:
- \`DATABASE_URL\`: tu_prisma_accelerate_url

---

## 📊 Métricas Esperadas

| Workflow | Frecuencia | Duración Prom. | Éxito Rate |
|----------|------------|----------------|------------|
| RSS to Social | 30 min | 45s | >95% |
| Content Gen | On demand | 3-5 min | >90% |
| Translation | 1 hora | 2-3 min | >92% |
| Social Scheduler | 15 min | 10s | >98% |
| Analytics | 6 horas | 1 min | >99% |

---

## 🎯 Próximos Workflows

- [ ] A/B Testing de Títulos
- [ ] Auto-Respuestas en Comentarios
- [ ] Sentiment Analysis de Redes
- [ ] Competitor Monitoring
- [ ] SEO Audit Automatizado
- [ ] Backup Automático de Base de Datos
