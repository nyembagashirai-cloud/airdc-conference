import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Central NextAuth v5 configuration.
 * We deliberately do NOT use PrismaAdapter here because:
 *  - Adapters force database sessions (conflict with JWT strategy)
 *  - Adapter initialises at module load time → crashes Vercel build when
 *    DATABASE_URL is not available during the build phase
 * Admin users are validated against env vars; a real DB lookup can be
 * added at runtime once DATABASE_URL is confirmed available.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "AIRDC Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const adminEmail =
          process.env.ADMIN_EMAIL ?? "admin@airdc2026.org";
        const adminPassword =
          process.env.ADMIN_PASSWORD ?? "airdc2026!";

        if (
          credentials.email === adminEmail &&
          credentials.password === adminPassword
        ) {
          return {
            id: "admin-1",
            email: adminEmail,
            name: "AIRDC Admin",
            role: "SUPER_ADMIN",
          };
        }

        // Optional: check database for additional admin users at runtime
        if (process.env.DATABASE_URL) {
          try {
            const { prisma } = await import("@/lib/prisma");
            const user = await prisma.user.findUnique({
              where: { email: String(credentials.email) },
            });
            if (user && user.password === String(credentials.password)) {
              return {
                id: user.id,
                email: user.email ?? "",
                name: user.name ?? "Admin",
                role: user.role,
              };
            }
          } catch (e) {
            console.error("Auth DB lookup failed:", e);
          }
        }

        return null;
      },
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/admin/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "VIEWER";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role =
          (token.role as string) ?? "VIEWER";
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
});
