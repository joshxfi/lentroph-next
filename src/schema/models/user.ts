import prisma from "@/lib/db";
import builder from "../builder";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    username: t.exposeString("username", { nullable: true }),
    name: t.exposeString("name", { nullable: true }),
    email: t.exposeString("email", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    bio: t.exposeString("bio", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  users: t.prismaField({
    type: ["User"],
    resolve: async (query) =>
      prisma.user.findMany({
        ...query,
      }),
  }),
}));
