import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import PostEditor from "./PostEditor";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const [post, categories, tags] = await Promise.all([
    db.post.findUnique({
      where: { id: params.id },
      include: {
        tags: true,
        category: true,
      },
    }),
    db.category.findMany({
      orderBy: { name: "asc" },
    }),
    db.tag.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  if (!post) {
    notFound();
  }

  return <PostEditor post={post} categories={categories} allTags={tags} />;
}
