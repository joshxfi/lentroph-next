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

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "authenticated" && !!data.user.username) {
    router.push("/dashboard");
  }

  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "",
      exchanges: [cacheExchange({}), ssr, fetchExchange],
      suspense: true,
      fetchOptions: { cache: "no-store" },
    });

    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      <main className="bg-zinc-200 text-zinc-800 grid place-items-center min-h-screen">{children}</main>
    </UrqlProvider>
  );
}
