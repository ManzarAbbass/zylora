import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export default {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHub,
    Credentials({
      id: "edge-placeholder",
      name: "Edge Placeholder",
      authorize: async () => null,
    }),
  ],
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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role as string | undefined;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnClient = nextUrl.pathname.startsWith("/client");
      const isOnSettings = nextUrl.pathname.startsWith("/settings");
      const isOnProfile = nextUrl.pathname.startsWith("/profile");

      if (!isLoggedIn && (isOnAdmin || isOnClient || isOnSettings || isOnProfile)) {
        return false;
      }

      if (isOnAdmin && userRole !== "ADMIN") {
        return Response.redirect(new URL("/client/dashboard", nextUrl.origin));
      }

      if (isOnClient && userRole === "ADMIN") {
        return Response.redirect(new URL("/admin/dashboard", nextUrl.origin));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
