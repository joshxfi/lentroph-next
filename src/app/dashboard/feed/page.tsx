"use client";

import { Suspense } from "react";
import { useQuery } from "@urql/next";
import { graphql } from "gql.tada";
import { PostForm } from "./components/post-form";
import { Post, PostFields } from "./components/post";
import { Separator } from "@/components/ui/separator";
import { SdgSidebar } from "./components/sdg-sidebar";
import { useSearchParams } from "next/navigation";
import { OrgPost, OrgPostFields } from "../org/[username]/components/org-post";

export default function Page() {
  return (
    <Suspense>
      <Feed />
    </Suspense>
  );
}

const GetPostsQuery = graphql(
  `
    query GetPosts {
      posts {
        id
        sdg
        ...PostFields
      }
    }
  `,
  [PostFields],
);

const GetOrgPostsQuery = graphql(
  `
    query GetOrgPosts {
      posts {
        id
        sdg
        ...OrgPostFields
      }
    }
  `,
  [OrgPostFields],
);

function Feed() {
  const [result] = useQuery({ query: GetPostsQuery });
  const [orgRes] = useQuery({ query: GetOrgPostsQuery });
  const searchParams = useSearchParams();

  return (
    <section className="max-w-screen-lg mx-auto flex space-x-6">
      <SdgSidebar />

      <div className="min-w-[500px]">
        <PostForm />
        <Separator className="my-8 bg-zinc-300" />
        <div className="space-y-4 mb-4">
          {orgRes.data?.posts
            .filter((post) => {
              if (!searchParams.get("q")) {
                return true;
              }

              return post.sdg === searchParams.get("q");
            })
            .map((post) => <OrgPost key={post.id} post={post} />)}
        </div>

        <div className="space-y-4">
          {result.data?.posts
            .filter((post) => {
              if (!searchParams.get("q")) {
                return true;
              }

              return post.sdg === searchParams.get("q");
            })
            .map((post) => <Post key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  );
}
