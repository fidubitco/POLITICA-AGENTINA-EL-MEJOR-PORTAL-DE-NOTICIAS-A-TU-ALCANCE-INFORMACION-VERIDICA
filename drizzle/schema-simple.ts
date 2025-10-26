import { mysqlTable, int, varchar, text, datetime, boolean, json } from 'drizzle-orm/mysql-core';

export const articles = mysqlTable('articles', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  imageUrl: varchar('imageUrl', { length: 500 }),
  author: varchar('author', { length: 100 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  source: varchar('source', { length: 100 }).notNull(),
  tags: json('tags'),
  isBreaking: boolean('isBreaking').default(false),
  isTrending: boolean('isTrending').default(false),
  isPublished: boolean('isPublished').default(false),
  publishedAt: datetime('publishedAt'),
  scheduledAt: datetime('scheduledAt'),
  views: int('views').default(0),
  likes: int('likes').default(0),
  shares: int('shares').default(0),
  aiGenerated: boolean('aiGenerated').default(false),
  aiScore: int('aiScore').default(0),
  readabilityScore: int('readabilityScore').default(0),
  sentimentScore: int('sentimentScore').default(0),
  seoOptimized: boolean('seoOptimized').default(false),
  createdAt: datetime('createdAt').$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt').$defaultFn(() => new Date())
});

export const categories = mysqlTable('categories', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull(),
  description: text('description'),
  color: varchar('color', { length: 7 }).default('#3B82F6'),
  icon: varchar('icon', { length: 10 }).default('📰'),
  createdAt: datetime('createdAt').$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt').$defaultFn(() => new Date())
});

export const sources = mysqlTable('sources', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  logoUrl: varchar('logoUrl', { length: 500 }),
  isActive: boolean('isActive').default(true),
  createdAt: datetime('createdAt').$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt').$defaultFn(() => new Date())
});

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 20 }).default('user'),
  createdAt: datetime('createdAt').$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt').$defaultFn(() => new Date())
});
