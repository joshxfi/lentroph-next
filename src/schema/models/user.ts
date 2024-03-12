import prisma from "@/lib/db";
import builder from "../builder";
import { GraphQLError } from "graphql";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    username: t.exposeString("username", { nullable: true }),
    name: t.exposeString("name", { nullable: true }),
    email: t.exposeString("email", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    bio: t.exposeString("bio", { nullable: true }),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
      nullable: true,
    }),
    posts: t.relation("posts"),
    orgs: t.relation("orgs"),
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

  getUser: t.prismaField({
    type: "User",
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (_query, _root, args) => {
      try {
        const user = await prisma.user.findUniqueOrThrow({
          where: { id: args.userId },
          include: {
            posts: {
              orderBy: {
                createdAt: "desc",
              },
            },
            orgs: true,
          },
        });

        return user;
      } catch (err) {
        throw err;
      }
    },
  }),
}));

builder.mutationFields((t) => ({
  updateUsername: t.prismaField({
    type: "User",
    args: {
      username: t.arg.string({ required: true }),
    },
    resolve: async (_query, _root, args, ctx) => {
      const usernameRegex = /^[a-zA-Z0-9]+$/;

      try {
        if (!usernameRegex.test(args.username)) {
          throw new GraphQLError("Username must be alphanumeric");
        }

        const user = await prisma.user.update({
          where: { id: ctx.userId },
          data: {
            username: args.username,
          },
        });

        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }),

  updateBio: t.string({
    args: {
      bio: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const user = await prisma.user.update({
        where: {
          id: ctx.userId,
        },
        data: {
          bio: args.bio,
        },
      });

      return user.bio ?? "";
    },
  }),
}));
