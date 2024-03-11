"use client";

import { useMemo } from "react";
import {
  UrqlProvider,
  ssrExchange,
  fetchExchange,
  createClient,
} from "@urql/next";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { cacheExchange } from "@urql/exchange-graphcache";
import { DashboardNavbar } from "./components/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, status } = useSession();
  const router = useRouter();

  if (
    status === "unauthenticated" ||
    (status === "authenticated" && !data.user.username)
  ) {
    router.push("/");
  }

  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "",
      exchanges: [
        cacheExchange({
          updates: {
            Mutation: {
              addPost(result, _args, cache) {
                const posts = cache.resolve("Query", "posts");
                if (Array.isArray(posts)) {
                  cache.link("Query", "posts", [result.addPost, ...posts]);
                }
              },

              addOrg(result, _args, cache) {
                const orgs = cache.resolve("Query", "getUserOrgs");
                if (Array.isArray(orgs)) {
                  cache.link("Query", "getUserOrgs", [result.addOrg, ...orgs]);
                }
              },

              removeOrg(_result, _args, cache) {
                cache.invalidate({
                  __typename: "Query",
                  getUserOrgs: true,
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
    <section className="bg-zinc-100 text-zinc-800 text-sm min-h-screen pb-24">
      <UrqlProvider client={client} ssr={ssr}>
        <DashboardNavbar />
        <div className="container mx-auto">{children}</div>
      </UrqlProvider>
    </section>
  );
}
