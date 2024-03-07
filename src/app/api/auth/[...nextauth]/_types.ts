import { Role } from "@prisma/client";
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: Role;
      bio?: string;
      username?: string;
      createdAt?: any;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    bio: string;
    username: string;
    createdAt: any;
  }
}
