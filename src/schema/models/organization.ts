import prisma from "@/lib/db";
import builder from "../builder";

builder.prismaObject("Organization", {
  fields: (t) => ({
    id: t.exposeID("id"),
    isApproved: t.exposeBoolean("isApproved"),
    username: t.exposeString("username"),
    image: t.exposeString("image", { nullable: true }),
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
    donations: t.relation("donations"),
    posts: t.relation("posts"),
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

  getOrg: t.prismaField({
    type: "Organization",
    args: {
      username: t.arg.string({ required: true }),
    },
    resolve: async (_query, _root, args) => {
      try {
        const user = await prisma.organization.findUniqueOrThrow({
          where: { username: args.username },
          include: {
            owner: true,
            donations: true,
            posts: {
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        });

        return user;
      } catch (err) {
        throw err;
      }
    },
  }),

  getUserOrgs: t.prismaField({
    type: ["Organization"],
    resolve: async (_query, _root, _args, ctx) => {
      try {
        const orgs = await prisma?.organization.findMany({
          where: {
            ownerId: ctx.userId,
          },
        });

        return orgs;
      } catch (err) {
        throw err;
      }
    },
  }),
}));

const AddOrgInput = builder.inputType("AddOrgInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    image: t.string({ required: true }),
    username: t.string({ required: true }),
    bio: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  addOrg: t.prismaField({
    type: "Organization",
    args: {
      input: t.arg({ type: AddOrgInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx) => {
      try {
        const org = await prisma.organization.create({
          data: {
            owner: {
              connect: {
                id: ctx.userId,
              },
            },
            ...args.input,
          },
        });

        return org;
      } catch (err) {
        throw err;
      }
    },
  }),

  removeOrg: t.boolean({
    args: {
      orgId: t.arg.string({ required: true }),
    },
    resolve: async (_root, args) => {
      try {
        const success = await prisma.organization.delete({
          where: {
            id: args.orgId,
          },
        });

        return !!success;
      } catch (err) {
        throw err;
      }
    },
  }),

  approveOrg: t.prismaField({
    type: "Organization",
    args: {
      orgId: t.arg.string({ required: true }),
      approve: t.arg.boolean({ required: true }),
    },
    resolve: async (_query, _root, args) => {
      try {
        const org = await prisma.organization.update({
          where: {
            id: args.orgId,
          },
          data: {
            isApproved: args.approve,
          },
        });

        return org;
      } catch (err) {
        throw err;
      }
    },
  }),

  editOrg: t.prismaField({
    type: "Organization",
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: AddOrgInput, required: true }),
    },
    resolve: async (_query, _root, args) => {
      try {
        const org = await prisma.organization.update({
          data: args.input,
          where: {
            id: args.id,
          },
        });

        return org;
      } catch (err) {
        throw err;
      }
    },
  }),
}));
