# Portal Architecture Specification

## Purpose
Defines the core architecture and infrastructure of POLÍTICA ARGENTINA news portal.

## System Overview
The portal is a Next.js 15 application with:
- Server-side rendering (SSR) and static generation (SSG)
- PostgreSQL database via Prisma ORM
- Railway-hosted database + Vercel-hosted frontend
- Real-time economic metrics integration
- PWA capabilities with service workers

## Requirements

### Requirement: Homepage Performance
The homepage SHALL load within 3 seconds on 3G connections.

#### Scenario: First contentful paint
- GIVEN a user visits the homepage
- WHEN the page loads
- THEN first contentful paint MUST occur within 1.5 seconds

#### Scenario: Full page interactive
- GIVEN the homepage is loading
- WHEN all resources are downloaded
- THEN the page MUST be fully interactive within 3 seconds

### Requirement: Database Connection
The system SHALL maintain a persistent connection pool to PostgreSQL.

#### Scenario: Connection pooling
- GIVEN multiple concurrent requests
- WHEN database queries are executed
- THEN connections MUST be reused from the pool
- AND maximum 10 concurrent connections

### Requirement: API Route Structure
API routes SHALL follow RESTful conventions.

#### Scenario: Standard endpoints
- GIVEN API routes under `/api/*`
- WHEN a route is defined
- THEN it MUST use appropriate HTTP methods (GET, POST, PUT, DELETE)
- AND return proper status codes (200, 201, 400, 404, 500)

### Requirement: Error Handling
The system SHALL gracefully handle all errors without exposing sensitive information.

#### Scenario: Database errors
- WHEN a database query fails
- THEN the system MUST log the error
- AND return a generic error message to the client
- AND NOT expose database schema or credentials

#### Scenario: API errors
- WHEN an API call to external service fails
- THEN the system MUST use cached data if available
- OR return a default/fallback value
- AND log the failure for monitoring

## Technical Stack

### Frontend
- **Framework**: Next.js 15.5.5 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: React hooks + Server Components

### Backend
- **Runtime**: Node.js 20+
- **Database**: PostgreSQL 15+
- **ORM**: Prisma 6.8.0
- **Authentication**: NextAuth v5
- **Validation**: Zod

### Infrastructure
- **Hosting**: Vercel (Frontend + API routes)
- **Database**: Railway (PostgreSQL)
- **CDN**: Vercel Edge Network
- **Domain**: politica-argentina.vercel.app

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Homepage FCP | < 1.5s | 1.2s |
| Homepage LCP | < 2.5s | 2.1s |
| Total Bundle Size | < 500KB | 421.3KB |
| First Load JS | < 150KB | 102KB |
| API Response Time | < 200ms | 150ms avg |

## Security Requirements

### Requirement: Input Sanitization
All user input SHALL be sanitized before database operations.

#### Scenario: Comment submission
- WHEN a user submits a comment
- THEN the content MUST be sanitized
- AND XSS attacks MUST be prevented
- AND SQL injection MUST be impossible

### Requirement: Authentication Protection
Protected routes SHALL require valid authentication.

#### Scenario: Admin access
- WHEN a user accesses `/admin/*`
- THEN the system MUST verify authentication
- AND check for ADMIN role
- OR redirect to login page

## Monitoring & Observability

### Requirement: Error Tracking
The system SHALL log all errors with context.

#### Scenario: Production errors
- WHEN an error occurs in production
- THEN the error MUST be logged with:
  - Stack trace
  - Request context
  - User session info (anonymized)
  - Timestamp
- AND alerts MUST be sent for critical errors

## Scalability

### Requirement: Horizontal Scaling
The system SHALL support multiple instances without data loss.

#### Scenario: Multi-instance deployment
- GIVEN multiple Vercel instances
- WHEN requests are load-balanced
- THEN session data MUST be consistent
- AND database connections MUST not exceed limits

---

**Status**: Active
**Last Updated**: 2025-01-17
**Version**: 1.0
