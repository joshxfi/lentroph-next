import { createYoga } from "graphql-yoga";
import { initContextCache } from "@pothos/core";

import { schema } from "@/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/_options";

const { handleRequest } = createYoga({
  schema,
  context: async () => {
    const session = await getServerSession(authOptions);
    return {
      ...initContextCache(),
      userId: session?.user.id,
    };
  },

  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
