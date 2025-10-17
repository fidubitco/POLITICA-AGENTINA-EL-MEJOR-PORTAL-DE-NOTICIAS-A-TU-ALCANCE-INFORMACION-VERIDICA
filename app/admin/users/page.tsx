import { db } from "@/lib/db";
import UsersClient from "./UsersClient";

export default async function UsersPage() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { posts: true, comments: true },
      },
    },
  });

  return <UsersClient initialUsers={users} />;
}
