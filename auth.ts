import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: { email: { type: "email" }, password: { type: "password" } },
      authorize: async (creds) => {
        if (!creds?.email || !creds?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: String(creds.email) } });
        if (!user?.password) return null;
        const ok = await bcrypt.compare(String(creds.password), user.password);
        return ok ? { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role } : null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => { if (user) { token.id = user.id; token.role = (user as any).role; } return token; },
    session: async ({ session, token }) => { if (session.user) { (session.user as any).id = token.id; (session.user as any).role = token.role; } return session; },
  },
});
