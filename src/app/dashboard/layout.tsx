"use client";

import { useMemo } from "react";
import {
  UrqlProvider,
  ssrExchange,
  fetchExchange,
  createClient,
  gql,
} from "@urql/next";
import { cacheExchange } from "@urql/exchange-graphcache";
import { DashboardNavbar } from "@/components/dashboard/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "",
      exchanges: [
        cacheExchange({
          updates: {
            Mutation: {
              addPost(result, _args, cache, _info) {
                const PostsList = gql`
                  {
                    posts {
                      id
                    }
                  }
                `;

                cache.updateQuery({ query: PostsList }, (data) => {
                  return {
                    ...data,
                    posts: [...data.posts, result.addPost],
                  };
                });
              },
            },
          },
        }),
        ssr,
        fetchExchange,
      ],
      suspense: true,
      fetchOptions: { cache: "no-store" },
    });

    return [client, ssr];
  }, []);

  return (
    <section className="bg-gray-200 min-h-screen">
      <UrqlProvider client={client} ssr={ssr}>
        <DashboardNavbar />
        <div className="container mx-auto">{children}</div>
      </UrqlProvider>
    </section>
  );
}
