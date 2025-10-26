import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, index, unique } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "editor", "author"]).default("user").notNull(),
  bio: text("bio"),
  avatar: varchar("avatar", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Languages supported by the portal
 */
export const languages = mysqlTable("languages", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 10 }).notNull().unique(), // es, en, pt, fr, etc.
  name: varchar("name", { length: 100 }).notNull(), // Español, English, etc.
  nativeName: varchar("nativeName", { length: 100 }).notNull(), // Español, English, etc.
  isActive: boolean("isActive").default(true).notNull(),
  isDefault: boolean("isDefault").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Language = typeof languages.$inferSelect;
export type InsertLanguage = typeof languages.$inferInsert;

/**
 * News categories
 */
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  parentId: int("parentId"),
  icon: varchar("icon", { length: 100 }),
  color: varchar("color", { length: 50 }),
  sortOrder: int("sortOrder").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Category translations
 */
export const categoryTranslations = mysqlTable("categoryTranslations", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  languageCode: varchar("languageCode", { length: 10 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
}, (table) => ({
  uniqueCategoryLanguage: unique().on(table.categoryId, table.languageCode),
}));

export type CategoryTranslation = typeof categoryTranslations.$inferSelect;
export type InsertCategoryTranslation = typeof categoryTranslations.$inferInsert;

/**
 * Tags for news articles
 */
export const tags = mysqlTable("tags", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Tag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;

/**
 * Tag translations
 */
export const tagTranslations = mysqlTable("tagTranslations", {
  id: int("id").autoincrement().primaryKey(),
  tagId: int("tagId").notNull(),
  languageCode: varchar("languageCode", { length: 10 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
}, (table) => ({
  uniqueTagLanguage: unique().on(table.tagId, table.languageCode),
}));

export type TagTranslation = typeof tagTranslations.$inferSelect;
export type InsertTagTranslation = typeof tagTranslations.$inferInsert;

/**
 * News articles
 */
export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull(),
  authorId: int("authorId").notNull(),
  categoryId: int("categoryId").notNull(),
  status: mysqlEnum("status", ["draft", "published", "archived", "scheduled"]).default("draft").notNull(),
  featuredImage: varchar("featuredImage", { length: 512 }),
  featuredImageAlt: varchar("featuredImageAlt", { length: 255 }),
  views: int("views").default(0).notNull(),
  likes: int("likes").default(0).notNull(),
  shares: int("shares").default(0).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  isBreaking: boolean("isBreaking").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  scheduledAt: timestamp("scheduledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  slugIdx: index("slug_idx").on(table.slug),
  statusIdx: index("status_idx").on(table.status),
  publishedAtIdx: index("published_at_idx").on(table.publishedAt),
  categoryIdx: index("category_idx").on(table.categoryId),
  authorIdx: index("author_idx").on(table.authorId),
}));

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

/**
 * Article translations
 */
export const articleTranslations = mysqlTable("articleTranslations", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId").notNull(),
  languageCode: varchar("languageCode", { length: 10 }).notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  seoTitle: varchar("seoTitle", { length: 255 }),
  seoDescription: text("seoDescription"),
  seoKeywords: text("seoKeywords"),
}, (table) => ({
  uniqueArticleLanguage: unique().on(table.articleId, table.languageCode),
  titleIdx: index("title_idx").on(table.title),
}));

export type ArticleTranslation = typeof articleTranslations.$inferSelect;
export type InsertArticleTranslation = typeof articleTranslations.$inferInsert;

/**
 * Article-Tag relationship
 */
export const articleTags = mysqlTable("articleTags", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId").notNull(),
  tagId: int("tagId").notNull(),
}, (table) => ({
  uniqueArticleTag: unique().on(table.articleId, table.tagId),
}));

export type ArticleTag = typeof articleTags.$inferSelect;
export type InsertArticleTag = typeof articleTags.$inferInsert;

/**
 * Comments on articles
 */
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId").notNull(),
  userId: int("userId").notNull(),
  parentId: int("parentId"),
  content: text("content").notNull(),
  isApproved: boolean("isApproved").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  articleIdx: index("article_idx").on(table.articleId),
  userIdx: index("user_idx").on(table.userId),
}));

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

/**
 * Newsletter subscribers
 */
export const subscribers = mysqlTable("subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  languageCode: varchar("languageCode", { length: 10 }).default("es").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;

/**
 * AI-generated content tracking
 */
export const aiContentJobs = mysqlTable("aiContentJobs", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["scrape", "rewrite", "generate", "translate"]).notNull(),
  status: mysqlEnum("status", ["pending", "processing", "completed", "failed"]).default("pending").notNull(),
  sourceUrl: varchar("sourceUrl", { length: 1024 }),
  sourceFile: varchar("sourceFile", { length: 512 }),
  sourceType: varchar("sourceType", { length: 50 }), // pdf, txt, doc, url
  articleId: int("articleId"),
  userId: int("userId").notNull(),
  prompt: text("prompt"),
  result: text("result"),
  error: text("error"),
  metadata: text("metadata"), // JSON string for additional data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
}, (table) => ({
  statusIdx: index("status_idx").on(table.status),
  typeIdx: index("type_idx").on(table.type),
  userIdx: index("user_idx").on(table.userId),
}));

export type AiContentJob = typeof aiContentJobs.$inferSelect;
export type InsertAiContentJob = typeof aiContentJobs.$inferInsert;

/**
 * Analytics tracking
 */
export const analytics = mysqlTable("analytics", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId"),
  userId: int("userId"),
  eventType: varchar("eventType", { length: 50 }).notNull(), // view, like, share, comment
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  referer: varchar("referer", { length: 1024 }),
  languageCode: varchar("languageCode", { length: 10 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  articleIdx: index("article_idx").on(table.articleId),
  eventTypeIdx: index("event_type_idx").on(table.eventType),
  createdAtIdx: index("created_at_idx").on(table.createdAt),
}));

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = typeof analytics.$inferInsert;

/**
 * Site settings
 */
export const settings = mysqlTable("settings", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  type: varchar("type", { length: 50 }).default("string").notNull(), // string, number, boolean, json
  description: text("description"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;

