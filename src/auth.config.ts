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
