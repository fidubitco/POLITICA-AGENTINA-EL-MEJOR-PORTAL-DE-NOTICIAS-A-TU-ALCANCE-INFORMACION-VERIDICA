import { db } from "@/lib/db";
import NewPostForm from "./NewPostForm";

export default async function NewPostPage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  return <NewPostForm categories={categories} />;
}
