import NextAuth from "next-auth";
import { type User } from "./users";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
