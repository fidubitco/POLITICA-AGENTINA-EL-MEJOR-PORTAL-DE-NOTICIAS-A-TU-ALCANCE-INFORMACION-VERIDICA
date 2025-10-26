import { eq, and, desc, asc, like, sql, or, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  languages,
  InsertLanguage,
  categories,
  InsertCategory,
  categoryTranslations,
  InsertCategoryTranslation,
  tags,
  InsertTag,
  tagTranslations,
  InsertTagTranslation,
  articles,
  InsertArticle,
  articleTranslations,
  InsertArticleTranslation,
  articleTags,
  InsertArticleTag,
  comments,
  InsertComment,
  subscribers,
  InsertSubscriber,
  aiContentJobs,
  InsertAiContentJob,
  analytics,
  InsertAnalytics,
  settings,
  InsertSetting,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ==================== USER OPERATIONS ====================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "bio", "avatar"] as const;
    type TextField = typeof textFields[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db
      .insert(users)
      .values(values)
      .onDuplicateKeyUpdate({
        set: updateSet,
      });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(users).orderBy(desc(users.createdAt));
}

export async function updateUserRole(userId: number, role: "user" | "admin" | "editor" | "author") {
  const db = await getDb();
  if (!db) return;

  await db.update(users).set({ role }).where(eq(users.id, userId));
}

// ==================== LANGUAGE OPERATIONS ====================

export async function createLanguage(language: InsertLanguage) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(languages).values(language);
  return result;
}

export async function getAllLanguages() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(languages).orderBy(asc(languages.name));
}

export async function getActiveLanguages() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(languages).where(eq(languages.isActive, true)).orderBy(asc(languages.name));
}

export async function getLanguageByCode(code: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(languages).where(eq(languages.code, code)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getDefaultLanguage() {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(languages).where(eq(languages.isDefault, true)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ==================== CATEGORY OPERATIONS ====================

export async function createCategory(category: InsertCategory) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(categories).values(category);
  return result;
}

export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(categories).orderBy(asc(categories.sortOrder));
}

export async function getActiveCategories() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(categories).where(eq(categories.isActive, true)).orderBy(asc(categories.sortOrder));
}

export async function getCategoryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getCategoryBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCategoryTranslation(translation: InsertCategoryTranslation) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(categoryTranslations).values(translation);
  return result;
}

export async function getCategoryTranslations(categoryId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(categoryTranslations).where(eq(categoryTranslations.categoryId, categoryId));
}

export async function getCategoryTranslation(categoryId: number, languageCode: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(categoryTranslations)
    .where(and(eq(categoryTranslations.categoryId, categoryId), eq(categoryTranslations.languageCode, languageCode)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ==================== TAG OPERATIONS ====================

export async function createTag(tag: InsertTag) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(tags).values(tag);
  return result;
}

export async function getAllTags() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(tags).orderBy(asc(tags.slug));
}

export async function getTagById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(tags).where(eq(tags.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getTagBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(tags).where(eq(tags.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createTagTranslation(translation: InsertTagTranslation) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(tagTranslations).values(translation);
  return result;
}

export async function getTagTranslations(tagId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(tagTranslations).where(eq(tagTranslations.tagId, tagId));
}

export async function getTagTranslation(tagId: number, languageCode: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(tagTranslations)
    .where(and(eq(tagTranslations.tagId, tagId), eq(tagTranslations.languageCode, languageCode)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ==================== ARTICLE OPERATIONS ====================

export async function createArticle(article: InsertArticle) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(articles).values(article);
  return result;
}

export async function updateArticle(id: number, article: Partial<InsertArticle>) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.update(articles).set(article).where(eq(articles.id, id));
  return result;
}

export async function getAllArticles(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(articles).orderBy(desc(articles.publishedAt)).limit(limit).offset(offset);
}

export async function getPublishedArticles(limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(articles)
    .where(eq(articles.status, "published"))
    .orderBy(desc(articles.publishedAt))
    .limit(limit)
    .offset(offset);
}

export async function getFeaturedArticles(limit = 5) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(articles)
    .where(and(eq(articles.status, "published"), eq(articles.isFeatured, true)))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

export async function getBreakingNews(limit = 3) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(articles)
    .where(and(eq(articles.status, "published"), eq(articles.isBreaking, true)))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

export async function getArticleById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getArticlesByCategory(categoryId: number, limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(articles)
    .where(and(eq(articles.categoryId, categoryId), eq(articles.status, "published")))
    .orderBy(desc(articles.publishedAt))
    .limit(limit)
    .offset(offset);
}

export async function getArticlesByAuthor(authorId: number, limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(articles)
    .where(and(eq(articles.authorId, authorId), eq(articles.status, "published")))
    .orderBy(desc(articles.publishedAt))
    .limit(limit)
    .offset(offset);
}

export async function incrementArticleViews(id: number) {
  const db = await getDb();
  if (!db) return;

  await db
    .update(articles)
    .set({ views: sql`${articles.views} + 1` })
    .where(eq(articles.id, id));
}

export async function incrementArticleLikes(id: number) {
  const db = await getDb();
  if (!db) return;

  await db
    .update(articles)
    .set({ likes: sql`${articles.likes} + 1` })
    .where(eq(articles.id, id));
}

export async function incrementArticleShares(id: number) {
  const db = await getDb();
  if (!db) return;

  await db
    .update(articles)
    .set({ shares: sql`${articles.shares} + 1` })
    .where(eq(articles.id, id));
}

export async function searchArticles(query: string, limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(articles)
    .where(and(eq(articles.status, "published"), like(articles.slug, `%${query}%`)))
    .orderBy(desc(articles.publishedAt))
    .limit(limit)
    .offset(offset);
}

// ==================== ARTICLE TRANSLATION OPERATIONS ====================

export async function createArticleTranslation(translation: InsertArticleTranslation) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(articleTranslations).values(translation);
  return result;
}

export async function updateArticleTranslation(id: number, translation: Partial<InsertArticleTranslation>) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.update(articleTranslations).set(translation).where(eq(articleTranslations.id, id));
  return result;
}

export async function getArticleTranslations(articleId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(articleTranslations).where(eq(articleTranslations.articleId, articleId));
}

export async function getArticleTranslation(articleId: number, languageCode: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(articleTranslations)
    .where(and(eq(articleTranslations.articleId, articleId), eq(articleTranslations.languageCode, languageCode)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ==================== ARTICLE TAG OPERATIONS ====================

export async function addArticleTag(articleTag: InsertArticleTag) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(articleTags).values(articleTag);
  return result;
}

export async function getArticleTags(articleId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(articleTags).where(eq(articleTags.articleId, articleId));
}

export async function removeArticleTag(articleId: number, tagId: number) {
  const db = await getDb();
  if (!db) return;

  await db.delete(articleTags).where(and(eq(articleTags.articleId, articleId), eq(articleTags.tagId, tagId)));
}

// ==================== COMMENT OPERATIONS ====================

export async function createComment(comment: InsertComment) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(comments).values(comment);
  return result;
}

export async function getArticleComments(articleId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(comments).where(eq(comments.articleId, articleId)).orderBy(desc(comments.createdAt));
}

export async function getApprovedComments(articleId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(comments)
    .where(and(eq(comments.articleId, articleId), eq(comments.isApproved, true)))
    .orderBy(desc(comments.createdAt));
}

export async function approveComment(id: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(comments).set({ isApproved: true }).where(eq(comments.id, id));
}

export async function deleteComment(id: number) {
  const db = await getDb();
  if (!db) return;

  await db.delete(comments).where(eq(comments.id, id));
}

// ==================== SUBSCRIBER OPERATIONS ====================

export async function createSubscriber(subscriber: InsertSubscriber) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(subscribers).values(subscriber);
  return result;
}

export async function getAllSubscribers() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(subscribers).where(eq(subscribers.isActive, true)).orderBy(desc(subscribers.subscribedAt));
}

export async function getSubscriberByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(subscribers).where(eq(subscribers.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function unsubscribe(email: string) {
  const db = await getDb();
  if (!db) return;

  await db.update(subscribers).set({ isActive: false, unsubscribedAt: new Date() }).where(eq(subscribers.email, email));
}

// ==================== AI CONTENT JOB OPERATIONS ====================

export async function createAiContentJob(job: InsertAiContentJob) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(aiContentJobs).values(job);
  return result;
}

export async function updateAiContentJob(id: number, job: Partial<InsertAiContentJob>) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.update(aiContentJobs).set(job).where(eq(aiContentJobs.id, id));
  return result;
}

export async function getAiContentJobById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(aiContentJobs).where(eq(aiContentJobs.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllAiContentJobs(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(aiContentJobs).orderBy(desc(aiContentJobs.createdAt)).limit(limit).offset(offset);
}

export async function getPendingAiContentJobs() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(aiContentJobs).where(eq(aiContentJobs.status, "pending")).orderBy(asc(aiContentJobs.createdAt));
}

export async function getUserAiContentJobs(userId: number, limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(aiContentJobs)
    .where(eq(aiContentJobs.userId, userId))
    .orderBy(desc(aiContentJobs.createdAt))
    .limit(limit)
    .offset(offset);
}

// ==================== ANALYTICS OPERATIONS ====================

export async function createAnalyticsEvent(event: InsertAnalytics) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(analytics).values(event);
  return result;
}

export async function getArticleAnalytics(articleId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(analytics).where(eq(analytics.articleId, articleId)).orderBy(desc(analytics.createdAt));
}

export async function getAnalyticsByDateRange(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(analytics)
    .where(and(sql`${analytics.createdAt} >= ${startDate}`, sql`${analytics.createdAt} <= ${endDate}`))
    .orderBy(desc(analytics.createdAt));
}

// ==================== SETTINGS OPERATIONS ====================

export async function createSetting(setting: InsertSetting) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(settings).values(setting);
  return result;
}

export async function updateSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.update(settings).set({ value }).where(eq(settings.key, key));
  return result;
}

export async function getSetting(key: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllSettings() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(settings);
}

