import { nanoid } from "nanoid";

import prisma from "@/lib/db";
import builder from "../builder";

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    imgUrl: t.exposeString("imgUrl", { nullable: true }),
    content: t.exposeString("content"),
    sdg: t.exposeString("sdg", { nullable: true }),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
    }),

    org: t.relation("org", { nullable: true }),
    author: t.relation("author", { nullable: true }),
    comments: t.relation("comments"),
  }),
});

builder.queryFields((t) => ({
  posts: t.prismaField({
    type: ["Post"],
    resolve: async (query) =>
      prisma.post.findMany({
        ...query,
        include: { author: true },
        orderBy: { createdAt: "desc" },
      }),
  }),
}));

builder.mutationFields((t) => ({
  addPost: t.prismaField({
    type: "Post",
    args: {
      content: t.arg.string({ required: true }),
      sdg: t.arg.string(),
      imgUrl: t.arg.string(),
    },
    resolve: async (_query, _root, args, ctx) => {
      try {
        const success = await prisma.post.create({
          data: {
            id: nanoid(11),
            content: args.content,
            sdg: args.sdg,
            imgUrl: args.imgUrl,
            author: { connect: { id: ctx.userId } },
          },
          include: { author: true },
        });

        return success;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }),

  addOrgPost: t.prismaField({
    type: "Post",
    args: {
      orgId: t.arg.string({ required: true }),
      content: t.arg.string({ required: true }),
      sdg: t.arg.string(),
      imgUrl: t.arg.string(),
    },
    resolve: async (_query, _root, args) => {
      try {
        const success = await prisma.post.create({
          data: {
            id: nanoid(11),
            content: args.content,
            sdg: args.sdg,
            imgUrl: args.imgUrl,
            org: { connect: { id: args.orgId } },
          },
          include: { org: true },
        });

        return success;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }),
}));
