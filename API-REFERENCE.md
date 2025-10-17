# 📡 API REFERENCE

## **POLÍTICA ARGENTINA - Complete API Documentation**

Base URL: `https://politica-argentina.vercel.app/api`

---

## 📋 **TABLE OF CONTENTS**

1. [Authentication](#authentication)
2. [Content Management](#content-management)
3. [AI Services](#ai-services)
4. [Translation](#translation)
5. [User Engagement](#user-engagement)
6. [Analytics](#analytics)
7. [Newsletter](#newsletter)
8. [Media](#media)
9. [Automation](#automation)
10. [Error Handling](#error-handling)

---

## 🔐 **AUTHENTICATION**

Most admin endpoints require authentication via NextAuth session.

### Headers
```http
Authorization: Bearer YOUR_TOKEN
Cookie: next-auth.session-token=...
```

---

## 📝 **CONTENT MANAGEMENT**

### **GET /api/posts**
Retrieve list of posts

**Query Parameters**:
```typescript
{
  status?: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED'
  categoryId?: string
  limit?: number (default: 10)
  sortBy?: 'publishedAt' | 'views'
  featured?: boolean
}
```

**Response**:
```json
{
  "success": true,
  "posts": [
    {
      "id": "cuid",
      "slug": "post-slug",
      "title": "Post Title",
      "excerpt": "Brief description",
      "coverImage": "https://...",
      "views": 1234,
      "publishedAt": "2025-10-17T...",
      "category": {
        "name": "Política",
        "slug": "politica"
      },
      "author": {
        "name": "Author Name"
      }
    }
  ],
  "count": 10
}
```

---

### **POST /api/posts**
Create a new post

**Authentication**: Required

**Request Body**:
```json
{
  "title": "Post Title",
  "excerpt": "Brief description",
  "content": {
    "html": "<p>Content here</p>"
  },
  "categoryId": "category-id",
  "tags": ["tag1", "tag2"],
  "metaTitle": "SEO Title",
  "metaDesc": "SEO Description",
  "coverImage": "https://...",
  "status": "DRAFT",
  "scheduledFor": "2025-10-20T10:00:00Z"
}
```

**Response**:
```json
{
  "success": true,
  "post": {
    "id": "new-post-id",
    "slug": "generated-slug",
    ...
  },
  "message": "Post created successfully"
}
```

---

### **GET /api/search**
Global search across content

**Query Parameters**:
```typescript
{
  q: string          // Search query (min 2 chars)
  limit?: number     // Results limit (default: 10)
}
```

**Response**:
```json
{
  "success": true,
  "results": [
    {
      "id": "result-id",
      "type": "article" | "category" | "tag" | "author",
      "title": "Result Title",
      "description": "Optional description",
      "url": "/noticia/slug",
      "date": "2025-10-17T...",
      "views": 1234
    }
  ],
  "count": 5
}
```

---

## 🤖 **AI SERVICES**

### **POST /api/ai/generate-article**
Generate article with AI (Gemini Pro)

**Authentication**: Required

**Request Body**:
```json
{
  "topic": "Nueva reforma económica",
  "keywords": ["economía", "inflación", "reforma"],
  "tone": "formal" | "neutral" | "informal",
  "length": "short" | "medium" | "long",
  "category": "Economía",
  "seoOptimized": true
}
```

**Length Configuration**:
- `short`: ~400 words, 3 sections
- `medium`: ~800 words, 5 sections
- `long`: ~1500 words, 8 sections

**Response**:
```json
{
  "success": true,
  "article": {
    "title": "Generated Title",
    "excerpt": "Generated excerpt",
    "content": "<p>Full HTML content</p>",
    "suggestedTags": ["tag1", "tag2"],
    "metaTitle": "SEO title",
    "metaDescription": "SEO description",
    "generatedAt": "2025-10-17T..."
  }
}
```

**Rate Limits**: 10 requests/minute per user

---

## 🌍 **TRANSLATION**

### **POST /api/translate-content**
Auto-translate post to multiple languages

**Authentication**: Required

**Request Body**:
```json
{
  "postId": "post-id",
  "targetLanguages": ["en", "pt-BR", "fr", "de"]
}
```

**Supported Languages**: 80+ (see `lib/languages-full.ts`)

**Response**:
```json
{
  "success": true,
  "postId": "post-id",
  "translations": [
    {
      "language": "en",
      "slug": "post-slug-en",
      "title": "Translated Title"
    }
  ],
  "message": "Translated to 4 language(s)"
}
```

**Processing Time**: ~10-15 seconds per language

---

## 💬 **USER ENGAGEMENT**

### **GET /api/comments**
Get comments for a post

**Query Parameters**:
```typescript
{
  postId: string
}
```

**Response**:
```json
{
  "success": true,
  "comments": [
    {
      "id": "comment-id",
      "content": "Comment text",
      "author": {
        "name": "User Name",
        "image": "https://..."
      },
      "guestName": null,
      "status": "APPROVED",
      "likes": 12,
      "dislikes": 2,
      "replies": [...],
      "createdAt": "2025-10-17T..."
    }
  ],
  "count": 10
}
```

---

### **POST /api/comments**
Create a new comment

**Request Body**:
```json
{
  "postId": "post-id",
  "content": "Comment text",
  "parentId": "parent-comment-id", // Optional, for replies
  "guestName": "Guest Name",       // If not authenticated
  "guestEmail": "guest@email.com"  // If not authenticated
}
```

**AI Moderation**: Automatic toxicity detection
- Score > 0.8: Flagged as spam
- Score 0.5-0.8: Manual review
- Score < 0.5: Auto-approved (if trusted user)

**Response**:
```json
{
  "success": true,
  "comment": {
    "id": "new-comment-id",
    "status": "PENDING",
    "toxicityScore": 0.1
  },
  "message": "Comment submitted for moderation"
}
```

---

### **GET /api/recommendations**
Get personalized content recommendations

**Query Parameters**:
```typescript
{
  limit?: number  // Default: 10
}
```

**Algorithm**: Hybrid (collaborative + content-based)
- Recency boost (new articles)
- Popularity boost (trending)
- Category preferences
- Reading history

**Response**:
```json
{
  "success": true,
  "recommendations": [
    {
      "id": "post-id",
      "slug": "post-slug",
      "title": "Post Title",
      "excerpt": "...",
      "coverImage": "https://...",
      "score": 0.85,
      "reason": "Publicado hoy",
      "category": {...},
      "author": {...}
    }
  ],
  "count": 10
}
```

---

## 📊 **ANALYTICS**

### **GET /api/metrics**
Live economic metrics (Argentina-specific)

**No authentication required**

**Response**:
```json
[
  {
    "label": "Dólar Blue",
    "value": "$1,450",
    "change": "+2.3%",
    "isPositive": true
  },
  {
    "label": "Dólar Oficial",
    "value": "$1,020",
    "change": "+1.1%",
    "isPositive": true
  },
  {
    "label": "Inflación",
    "value": "3.5%",
    "change": "+0.5%",
    "isPositive": false
  },
  {
    "label": "Merval",
    "value": "1,850,000",
    "change": "+1.8%",
    "isPositive": true
  },
  {
    "label": "Tasa",
    "value": "133%",
    "change": "-5%",
    "isPositive": true
  }
]
```

**Update Frequency**: Real-time (random variation for demo)

---

### **GET /api/dolar**
Detailed dollar exchange rates

**Response**:
```json
{
  "blue": {
    "compra": 1450,
    "venta": 1460,
    "nombre": "Dólar Blue",
    "fechaActualizacion": "2025-10-17T..."
  },
  "oficial": {...},
  "mep": {...},
  "variaciones": {
    "blue": 2.3,
    "oficial": 1.1,
    "mep": 1.8
  },
  "timestamp": "2025-10-17T..."
}
```

---

## 📧 **NEWSLETTER**

### **POST /api/newsletter/subscribe**
Subscribe to newsletter

**Request Body**:
```json
{
  "email": "user@example.com",
  "name": "User Name",
  "frequency": "WEEKLY" | "DAILY" | "BIWEEKLY" | "MONTHLY",
  "categories": ["category-id-1", "category-id-2"]
}
```

**Email Validation**: RFC 5322 compliant

**Response**:
```json
{
  "success": true,
  "subscriber": {
    "id": "subscriber-id",
    "email": "user@example.com",
    "status": "ACTIVE"
  },
  "message": "Successfully subscribed to newsletter!"
}
```

**Follow-up**: Confirmation email sent automatically

---

### **DELETE /api/newsletter/subscribe**
Unsubscribe from newsletter

**Query Parameters**:
```typescript
{
  email: string
  token: string  // Unsubscribe token
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

## 🖼️ **MEDIA**

### **POST /api/media/upload**
Upload media files (Ready for implementation)

**Authentication**: Required

**Form Data**:
```
file: File (image, video, document)
folder?: string
```

**Supported Formats**:
- Images: jpg, png, webp, gif
- Videos: mp4, webm, mov
- Documents: pdf, doc, docx

**Size Limits**:
- Images: 10MB
- Videos: 100MB
- Documents: 5MB

**Response**:
```json
{
  "success": true,
  "file": {
    "id": "file-id",
    "url": "https://cdn.../file.jpg",
    "type": "image",
    "size": 1024000,
    "dimensions": {
      "width": 1920,
      "height": 1080
    }
  }
}
```

---

## ⚙️ **AUTOMATION**

### **GET /api/cron/publish-scheduled**
Publish scheduled posts (Cron job)

**Authentication**: Bearer token (cron secret)

**Headers**:
```http
Authorization: Bearer YOUR_CRON_SECRET
```

**Schedule**: Every 5 minutes (Vercel Cron)

**Response**:
```json
{
  "success": true,
  "message": "Published 3 post(s)",
  "published": 3,
  "posts": [
    {
      "id": "post-id",
      "title": "Post Title",
      "slug": "post-slug",
      "scheduledFor": "2025-10-17T10:00:00Z"
    }
  ]
}
```

**Vercel Cron Configuration**:
```json
{
  "crons": [{
    "path": "/api/cron/publish-scheduled",
    "schedule": "*/5 * * * *"
  }]
}
```

---

## ❌ **ERROR HANDLING**

### **Error Response Format**
```json
{
  "error": "Error message",
  "details": "Additional error details",
  "code": "ERROR_CODE"
}
```

### **HTTP Status Codes**

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

### **Common Errors**

```typescript
// Validation Error
{
  "error": "Validation failed",
  "details": "Title is required",
  "code": "VALIDATION_ERROR"
}

// Authentication Error
{
  "error": "Unauthorized",
  "details": "Please sign in to continue",
  "code": "AUTH_REQUIRED"
}

// Rate Limit Error
{
  "error": "Too many requests",
  "details": "Please try again in 60 seconds",
  "code": "RATE_LIMIT_EXCEEDED"
}
```

---

## 🔌 **WEBHOOKS** (Ready)

Subscribe to events:

```typescript
POST /api/webhooks/subscribe
{
  "url": "https://your-domain.com/webhook",
  "events": ["post.published", "comment.created"]
}
```

**Available Events**:
- `post.published`
- `post.updated`
- `comment.created`
- `subscriber.new`
- `campaign.sent`

---

## 📊 **RATE LIMITS**

| Endpoint | Limit |
|----------|-------|
| AI Generation | 10/min |
| Search | 60/min |
| Comments | 20/min |
| General API | 120/min |

**Rate Limit Headers**:
```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1697545200
```

---

## 🚀 **BEST PRACTICES**

1. **Always handle errors** gracefully
2. **Cache responses** when possible
3. **Use pagination** for large datasets
4. **Validate input** client-side first
5. **Include error tracking** (Sentry)
6. **Monitor API usage** (analytics)
7. **Version your API** calls

---

**Última actualización**: 2025-10-17
**API Version**: 2.0
