import { db } from "@/lib/db";
import PostsClient from "./PostsClient";

export default async function PostsPage() {
  const [posts, categories] = await Promise.all([
    db.post.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        author: { select: { name: true, email: true } },
        category: { select: { name: true } },
      },
    }),
    db.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return <PostsClient initialPosts={posts} categories={categories} />;
}
