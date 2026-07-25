import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export default {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [GitHub],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnClient = nextUrl.pathname.startsWith("/client");
      if (isOnAdmin || isOnClient) {
        if (!isLoggedIn) return false;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
