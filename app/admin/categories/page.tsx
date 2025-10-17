import { db } from "@/lib/db";
import CategoriesClient from "./CategoriesClient";

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  return <CategoriesClient initialCategories={categories} />;
}
