import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { z } from "zod";
import { db } from "@/db";
import { users, accounts, sessions, verificationTokens } from "@/db/schema";
import authConfig from "./auth.config";

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    ...(authConfig.providers ?? []),
    Credentials({
      async authorize(credentials) {
        try {
          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) return null;

          const { email, password } = parsed.data;

          const { eq, sql } = await import("drizzle-orm");
          const bcrypt = await import("bcryptjs");

          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .then((rows) => rows[0] ?? null);

          if (!user || !user.password) return null;

          if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
            return null;
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            await db
              .update(users)
              .set({
                failedAttempts: sql`${users.failedAttempts} + 1`,
                lockedUntil: sql`CASE WHEN ${users.failedAttempts} + 1 >= ${MAX_FAILED_ATTEMPTS} THEN NOW() + interval '15 minutes' ELSE ${users.lockedUntil} END`,
              })
              .where(eq(users.id, user.id));
            return null;
          }

          await db
            .update(users)
            .set({ failedAttempts: 0, lockedUntil: null })
            .where(eq(users.id, user.id));

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            companyName: user.companyName,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.companyName = user.companyName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "CLIENT";
        session.user.companyName = token.companyName as string | null;
      }
      return session;
    },
  },
});
