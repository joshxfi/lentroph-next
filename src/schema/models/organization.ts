import prisma from "@/lib/db";
import builder from "../builder";

builder.prismaObject("Organization", {
  fields: (t) => ({
    id: t.exposeID("id"),
    isApproved: t.exposeBoolean("isApproved"),
    username: t.exposeString("username"),
    name: t.exposeString("name"),
    bio: t.exposeString("bio"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
      nullable: true,
    }),
    owner: t.relation("owner"),
    posts: t.relation("donations"),
  }),
});

builder.queryFields((t) => ({
  orgs: t.prismaField({
    type: ["Organization"],
    resolve: async () => {
      try {
        const orgs = await prisma?.organization.findMany();
        return orgs;
      } catch (err) {
        throw err;
      }
    },
  }),
}));
