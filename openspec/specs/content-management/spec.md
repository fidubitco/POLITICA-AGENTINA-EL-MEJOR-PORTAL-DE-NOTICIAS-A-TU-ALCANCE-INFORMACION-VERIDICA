# Content Management Specification

## Purpose
Defines how articles, categories, authors, and media are managed in the POLÍTICA ARGENTINA portal.

## Data Model

### Post Entity
```typescript
{
  id: string (UUID)
  title: string (required, 1-200 chars)
  slug: string (unique, URL-safe)
  excerpt: string (optional, max 500 chars)
  content: string (HTML, required)
  coverImage: string (URL, optional)
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  featured: boolean
  breaking: boolean
  views: number (default: 0)
  publishedAt: DateTime (nullable)
  createdAt: DateTime
  updatedAt: DateTime

  // Relations
  authorId: string (FK -> User)
  categoryId: string (FK -> Category)
  tags: Tag[]
  comments: Comment[]
}
```

### Category Entity
```typescript
{
  id: string (UUID)
  name: string (unique, required)
  slug: string (unique, URL-safe)
  description: string (optional)
  color: string (hex color, default: #dc2626)

  // Relations
  posts: Post[]
}
```

## Requirements

### Requirement: Article Creation
The system SHALL allow ADMIN users to create articles.

#### Scenario: Create new article
- GIVEN an authenticated ADMIN user
- WHEN they create a new article with title, content, and category
- THEN the article MUST be saved with status "DRAFT"
- AND a unique slug MUST be auto-generated from the title
- AND the current timestamp MUST be set as createdAt

#### Scenario: Slug uniqueness
- GIVEN an article with title "Gobierno anuncia medidas"
- WHEN the slug "gobierno-anuncia-medidas" already exists
- THEN the system MUST append a numeric suffix
- RESULTING in "gobierno-anuncia-medidas-2"

### Requirement: Article Publishing
Articles SHALL transition from DRAFT to PUBLISHED when explicitly published.

#### Scenario: Publish draft article
- GIVEN an article with status "DRAFT"
- WHEN an ADMIN clicks "Publish"
- THEN status MUST change to "PUBLISHED"
- AND publishedAt MUST be set to current timestamp
- AND the article MUST appear on the public homepage

#### Scenario: Unpublish article
- GIVEN a PUBLISHED article
- WHEN an ADMIN unpublishes it
- THEN status MUST change to "ARCHIVED"
- AND the article MUST NOT appear on public pages
- BUT remain accessible via direct URL for ADMIN users

### Requirement: Featured Articles
The system SHALL support marking articles as "featured" for homepage prominence.

#### Scenario: Feature an article
- GIVEN any PUBLISHED article
- WHEN marked as featured
- THEN it MUST appear in the hero section of the homepage
- AND only ONE article can be featured at a time
- SO featuring a new article MUST unfeature the previous one

### Requirement: Breaking News
Articles marked as "breaking" SHALL display with special visual treatment.

#### Scenario: Mark as breaking news
- GIVEN a PUBLISHED article
- WHEN marked as breaking
- THEN it MUST display with:
  - Red "ÚLTIMO MOMENTO" badge
  - Flame icon animation
  - Priority placement in breaking news ticker
  - Pulse animation effect

### Requirement: View Counter
The system SHALL track article view counts accurately.

#### Scenario: Increment views on visit
- GIVEN an article page
- WHEN a user visits the page
- THEN views MUST increment by 1
- AND the increment MUST be atomic (no race conditions)
- AND bot traffic MUST be filtered (based on User-Agent)

### Requirement: Category Management
Categories SHALL organize articles by topic.

#### Scenario: Create category
- GIVEN an ADMIN user
- WHEN creating a category with name "Economía"
- THEN a slug "economia" MUST be generated
- AND a default color MUST be assigned
- AND the category MUST appear in navigation

#### Scenario: Category article count
- GIVEN a category page
- WHEN displayed
- THEN it MUST show the count of PUBLISHED articles only
- AND articles MUST be sorted by publishedAt DESC

### Requirement: Rich Text Content
Article content SHALL support rich HTML formatting.

#### Scenario: HTML content rendering
- GIVEN article content with HTML tags
- WHEN rendered on the article page
- THEN the HTML MUST be sanitized to prevent XSS
- BUT preserve safe tags: h1-h6, p, ul, ol, li, blockquote, strong, em, a
- AND external links MUST open in new tab with rel="noopener noreferrer"

### Requirement: Cover Images
Articles SHALL support cover images with optimization.

#### Scenario: Upload cover image
- GIVEN an article being edited
- WHEN a cover image is uploaded
- THEN it MUST be optimized (WebP format, max 1200px width)
- AND stored with a unique filename
- AND the URL MUST be saved in coverImage field

#### Scenario: Image lazy loading
- GIVEN an article list page
- WHEN displaying article cards
- THEN cover images MUST use lazy loading
- AND Next.js Image component for optimization
- WITH proper aspect ratio (16:9)

### Requirement: Article Search
Users SHALL be able to search articles by title and content.

#### Scenario: Search by keyword
- GIVEN a search query "dólar blue"
- WHEN the user submits the search
- THEN articles containing "dólar blue" in title OR content MUST be returned
- SORTED by relevance (title matches first, then content matches)
- AND only PUBLISHED articles MUST be included

## API Endpoints

### GET /api/posts
Fetch paginated articles with filters.

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20, max: 100)
- `status`: "DRAFT" | "PUBLISHED" | "ARCHIVED"
- `categoryId`: string (optional)
- `featured`: boolean (optional)
- `breaking`: boolean (optional)

**Response:**
```json
{
  "posts": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
```

### POST /api/posts
Create a new article (ADMIN only).

**Request Body:**
```json
{
  "title": "Article Title",
  "content": "<p>Content here...</p>",
  "excerpt": "Short summary",
  "categoryId": "uuid",
  "coverImage": "https://...",
  "status": "DRAFT"
}
```

**Response:**
```json
{
  "success": true,
  "post": { ... }
}
```

### PUT /api/posts/[id]
Update an existing article (ADMIN only).

### DELETE /api/posts/[id]
Soft delete an article (changes status to ARCHIVED).

## Performance Requirements

### Requirement: Homepage Load Time
The homepage SHALL load all articles within 2 seconds.

#### Scenario: Initial page load
- GIVEN a user visiting the homepage
- WHEN the server fetches articles
- THEN the query MUST complete in < 500ms
- AND the page MUST render in < 2 seconds total
- WITH proper caching headers (stale-while-revalidate)

### Requirement: Database Query Optimization
Article queries SHALL use proper indexing.

#### Scenario: Category filter query
- GIVEN a category page with 100+ articles
- WHEN filtering by categoryId
- THEN the database MUST use an index on categoryId
- AND the query MUST complete in < 200ms

## Current Statistics

- **Total Articles**: 9 (after seed-production)
- **Categories**: 8 (Política, Economía, Sociedad, Internacional, Tecnología, Deportes, Cultura, Salud)
- **Average Article Length**: 800-1200 words
- **Images**: Unsplash integration for high-quality covers
- **Featured Articles**: 3
- **Breaking News**: 2

---

**Status**: Active
**Last Updated**: 2025-01-17
**Version**: 1.0
