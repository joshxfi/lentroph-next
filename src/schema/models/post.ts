import { nanoid } from "nanoid";

import prisma from "@/lib/db";
import builder from "../builder";

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    imgUrl: t.exposeString("imgUrl", { nullable: true }),
    content: t.exposeString("content"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
    }),

    author: t.relation("author"),
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
      imgUrl: t.arg.string(),
    },
    resolve: async (_query, _root, args, ctx) => {
      try {
        const success = await prisma.post.create({
          data: {
            id: nanoid(11),
            content: args.content,
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
}));
