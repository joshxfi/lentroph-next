import builder from "@/schema/builder";

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (_, { name }) => `hello, ${name || 'World'}`,
    }),
  }),
});
