import prisma from "@/lib/db";
import builder from "../builder";

builder.prismaObject("Donation", {
  fields: (t) => ({
    id: t.exposeID("id"),
    amount: t.exposeInt("amount"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
      nullable: true,
    }),
    org: t.relation("org"),
    user: t.relation("user"),
  }),
});

builder.queryFields((t) => ({
  donations: t.prismaField({
    type: ["Donation"],
    resolve: async () => {
      try {
        const orgs = await prisma?.donation.findMany();
        return orgs;
      } catch (err) {
        throw err;
      }
    },
  }),
}));
