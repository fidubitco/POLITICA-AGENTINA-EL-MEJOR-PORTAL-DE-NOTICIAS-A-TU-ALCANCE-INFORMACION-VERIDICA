"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PostStatus, Role } from "@prisma/client";

// ==================== POST ACTIONS ====================

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const coverImage = formData.get("coverImage") as string;
  const categoryId = formData.get("categoryId") as string;
  const status = (formData.get("status") as PostStatus) || "DRAFT";
  const metaTitle = formData.get("metaTitle") as string;
  const metaDesc = formData.get("metaDesc") as string;
  const tags = formData.get("tags") as string;

  const tagArray = tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  const post = await db.post.create({
    data: {
      title,
      slug,
      excerpt,
      content: JSON.parse(content || "{}"),
      coverImage,
      categoryId: categoryId || null,
      status,
      metaTitle,
      metaDesc,
      authorId: session.user.id!,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      tags: {
        connectOrCreate: tagArray.map((tag) => ({
          where: { slug: tag.toLowerCase().replace(/\s+/g, "-") },
          create: {
            name: tag,
            slug: tag.toLowerCase().replace(/\s+/g, "-"),
          },
        })),
      },
    },
  });

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const coverImage = formData.get("coverImage") as string;
  const categoryId = formData.get("categoryId") as string;
  const status = (formData.get("status") as PostStatus) || "DRAFT";
  const metaTitle = formData.get("metaTitle") as string;
  const metaDesc = formData.get("metaDesc") as string;
  const tags = formData.get("tags") as string;

  const tagArray = tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  const existingPost = await db.post.findUnique({
    where: { id },
    select: { status: true },
  });

  await db.post.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content: JSON.parse(content || "{}"),
      coverImage,
      categoryId: categoryId || null,
      status,
      metaTitle,
      metaDesc,
      publishedAt:
        status === "PUBLISHED" && existingPost?.status !== "PUBLISHED"
          ? new Date()
          : undefined,
      tags: {
        set: [],
        connectOrCreate: tagArray.map((tag) => ({
          where: { slug: tag.toLowerCase().replace(/\s+/g, "-") },
          create: {
            name: tag,
            slug: tag.toLowerCase().replace(/\s+/g, "-"),
          },
        })),
      },
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}/edit`);
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db.post.delete({
    where: { id },
  });

  revalidatePath("/admin/posts");
  return { success: true };
}

export async function duplicatePost(id: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const original = await db.post.findUnique({
    where: { id },
    include: { tags: true },
  });

  if (!original) {
    throw new Error("Post not found");
  }

  const duplicate = await db.post.create({
    data: {
      title: `${original.title} (copia)`,
      slug: `${original.slug}-copia-${Date.now()}`,
      excerpt: original.excerpt,
      content: original.content,
      coverImage: original.coverImage,
      categoryId: original.categoryId,
      status: "DRAFT",
      metaTitle: original.metaTitle,
      metaDesc: original.metaDesc,
      authorId: session.user.id!,
      tags: {
        connect: original.tags.map((tag) => ({ id: tag.id })),
      },
    },
  });

  revalidatePath("/admin/posts");
  return { success: true, id: duplicate.id };
}

// ==================== CATEGORY ACTIONS ====================

export async function createCategory(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const color = formData.get("color") as string;

  await db.category.create({
    data: {
      name,
      slug,
      description,
      color: color || "#4f46e5",
    },
  });

  revalidatePath("/admin/categories");
  return { success: true };
}

export async function updateCategory(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const color = formData.get("color") as string;

  await db.category.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      color,
    },
  });

  revalidatePath("/admin/categories");
  return { success: true };
}

export async function deleteCategory(id: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db.category.delete({
    where: { id },
  });

  revalidatePath("/admin/categories");
  return { success: true };
}

// ==================== USER ACTIONS ====================

export async function createUser(formData: FormData) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const role = (formData.get("role") as Role) || "REPORTER";
  const bio = formData.get("bio") as string;

  const bcrypt = await import("bcrypt");
  const hashedPassword = await bcrypt.hash("changeme123", 10);

  await db.user.create({
    data: {
      email,
      name,
      role,
      bio,
      password: hashedPassword,
    },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function updateUser(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const role = (formData.get("role") as Role) || "REPORTER";
  const bio = formData.get("bio") as string;

  await db.user.update({
    where: { id },
    data: {
      name,
      role,
      bio,
    },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteUser(id: string) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await db.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

// ==================== SETTINGS ACTIONS ====================

export async function updateSettings(formData: FormData) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // Settings would typically be stored in a Settings table or KV store
  // For now, this is a placeholder

  revalidatePath("/admin/settings");
  return { success: true };
}
