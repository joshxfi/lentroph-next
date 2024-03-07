"use client";

import { useMemo } from "react";
import {
  UrqlProvider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
} from "@urql/next";
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
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
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
