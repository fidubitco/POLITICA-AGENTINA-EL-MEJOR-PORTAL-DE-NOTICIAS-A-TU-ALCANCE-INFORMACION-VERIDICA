CREATE TABLE `aiContentJobs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('scrape','rewrite','generate','translate') NOT NULL,
	`status` enum('pending','processing','completed','failed') NOT NULL DEFAULT 'pending',
	`sourceUrl` varchar(1024),
	`sourceFile` varchar(512),
	`sourceType` varchar(50),
	`articleId` int,
	`userId` int NOT NULL,
	`prompt` text,
	`result` text,
	`error` text,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `aiContentJobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `analytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`articleId` int,
	`userId` int,
	`eventType` varchar(50) NOT NULL,
	`ipAddress` varchar(45),
	`userAgent` text,
	`referer` varchar(1024),
	`languageCode` varchar(10),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `articleTags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`articleId` int NOT NULL,
	`tagId` int NOT NULL,
	CONSTRAINT `articleTags_id` PRIMARY KEY(`id`),
	CONSTRAINT `articleTags_articleId_tagId_unique` UNIQUE(`articleId`,`tagId`)
);
--> statement-breakpoint
CREATE TABLE `articleTranslations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`articleId` int NOT NULL,
	`languageCode` varchar(10) NOT NULL,
	`title` varchar(500) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`seoTitle` varchar(255),
	`seoDescription` text,
	`seoKeywords` text,
	CONSTRAINT `articleTranslations_id` PRIMARY KEY(`id`),
	CONSTRAINT `articleTranslations_articleId_languageCode_unique` UNIQUE(`articleId`,`languageCode`)
);
--> statement-breakpoint
CREATE TABLE `articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`authorId` int NOT NULL,
	`categoryId` int NOT NULL,
	`status` enum('draft','published','archived','scheduled') NOT NULL DEFAULT 'draft',
	`featuredImage` varchar(512),
	`featuredImageAlt` varchar(255),
	`views` int NOT NULL DEFAULT 0,
	`likes` int NOT NULL DEFAULT 0,
	`shares` int NOT NULL DEFAULT 0,
	`isFeatured` boolean NOT NULL DEFAULT false,
	`isBreaking` boolean NOT NULL DEFAULT false,
	`publishedAt` timestamp,
	`scheduledAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`parentId` int,
	`icon` varchar(100),
	`color` varchar(50),
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `categoryTranslations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`categoryId` int NOT NULL,
	`languageCode` varchar(10) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	CONSTRAINT `categoryTranslations_id` PRIMARY KEY(`id`),
	CONSTRAINT `categoryTranslations_categoryId_languageCode_unique` UNIQUE(`categoryId`,`languageCode`)
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`articleId` int NOT NULL,
	`userId` int NOT NULL,
	`parentId` int,
	`content` text NOT NULL,
	`isApproved` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `languages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(10) NOT NULL,
	`name` varchar(100) NOT NULL,
	`nativeName` varchar(100) NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`isDefault` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `languages_id` PRIMARY KEY(`id`),
	CONSTRAINT `languages_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(255) NOT NULL,
	`value` text,
	`type` varchar(50) NOT NULL DEFAULT 'string',
	`description` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `settings_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`languageCode` varchar(10) NOT NULL DEFAULT 'es',
	`isActive` boolean NOT NULL DEFAULT true,
	`subscribedAt` timestamp NOT NULL DEFAULT (now()),
	`unsubscribedAt` timestamp,
	CONSTRAINT `subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscribers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `tagTranslations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tagId` int NOT NULL,
	`languageCode` varchar(10) NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `tagTranslations_id` PRIMARY KEY(`id`),
	CONSTRAINT `tagTranslations_tagId_languageCode_unique` UNIQUE(`tagId`,`languageCode`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `tags_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','editor','author') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `avatar` varchar(512);--> statement-breakpoint
CREATE INDEX `status_idx` ON `aiContentJobs` (`status`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `aiContentJobs` (`type`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `aiContentJobs` (`userId`);--> statement-breakpoint
CREATE INDEX `article_idx` ON `analytics` (`articleId`);--> statement-breakpoint
CREATE INDEX `event_type_idx` ON `analytics` (`eventType`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `analytics` (`createdAt`);--> statement-breakpoint
CREATE INDEX `title_idx` ON `articleTranslations` (`title`);--> statement-breakpoint
CREATE INDEX `slug_idx` ON `articles` (`slug`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `articles` (`status`);--> statement-breakpoint
CREATE INDEX `published_at_idx` ON `articles` (`publishedAt`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `articles` (`categoryId`);--> statement-breakpoint
CREATE INDEX `author_idx` ON `articles` (`authorId`);--> statement-breakpoint
CREATE INDEX `article_idx` ON `comments` (`articleId`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `comments` (`userId`);