import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      bio?: string;
      username?: string;
      createdAt?: any;
    } & DefaultSession["user"];
  }

  interface User {
    bio: string;
    username: string;
    createdAt: any;
  }
}
