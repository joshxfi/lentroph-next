import prisma from "@/lib/db";
import builder from "../builder";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    username: t.exposeString("name", { nullable: true }),
    email: t.exposeString("name", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    bio: t.exposeString("bio", { nullable: true }),
  }),
});

builder.queryType({
  fields: (t) => ({
    users: t.prismaField({
      type: ["User"],
      resolve: async (query) =>
        prisma.user.findMany({
          ...query,
        }),
    }),
  }),
});
