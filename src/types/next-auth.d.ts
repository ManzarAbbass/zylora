import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "ADMIN" | "CLIENT";
    companyName?: string | null;
  }
  interface Session {
    user: {
      id: string;
      role?: "ADMIN" | "CLIENT";
      companyName?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "CLIENT";
    companyName?: string | null;
  }
}
