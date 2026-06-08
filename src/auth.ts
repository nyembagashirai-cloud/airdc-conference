import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { checkRateLimit, recordFailedAttempt, clearAttempts } from "@/lib/rate-limit";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "AIRDC Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) return null;

        // Extract IP for rate limiting
        const forwarded = (request as Request).headers?.get("x-forwarded-for");
        const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

        const { allowed, remainingAttempts, lockedUntil } = checkRateLimit(ip);

        if (!allowed) {
          const until = lockedUntil
            ? lockedUntil.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
            : "";
          throw new Error(`LOCKED:Account locked. Try again after ${until}.`);
        }

        const adminEmail    = process.env.ADMIN_EMAIL    ?? "admin@airdczim.co.zw";
        const adminPassword = process.env.ADMIN_PASSWORD ?? "airdc2026!";

        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          clearAttempts(ip);
          return { id: "admin-1", email: adminEmail, name: "AIRDC Admin", role: "SUPER_ADMIN" };
        }

        // Optional DB lookup
        if (process.env.DATABASE_URL) {
          try {
            const { prisma } = await import("@/lib/prisma");
            const user = await prisma.user.findUnique({
              where: { email: String(credentials.email) },
            });
            if (user && user.password === String(credentials.password)) {
              clearAttempts(ip);
              return { id: user.id, email: user.email ?? "", name: user.name ?? "Admin", role: user.role };
            }
          } catch (e) {
            console.error("Auth DB lookup failed:", e);
          }
        }

        // Record failed attempt
        recordFailedAttempt(ip);
        const newRemaining = remainingAttempts - 1;
        if (newRemaining <= 0) {
          throw new Error("LOCKED:Too many failed attempts. Locked for 30 minutes.");
        }
        throw new Error(`FAIL:${newRemaining}`);
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "VIEWER";
        token.id   = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = (token.role as string) ?? "VIEWER";
        (session.user as { id?: string }).id     = token.id as string;
      }
      return session;
    },
  },
});
