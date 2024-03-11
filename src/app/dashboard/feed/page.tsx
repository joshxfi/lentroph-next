"use client";

import { Suspense } from "react";
import { useQuery } from "@urql/next";
import { graphql } from "gql.tada";
import { PostForm } from "./components/post-form";
import { Post, PostFields } from "./components/post";
import { Separator } from "@/components/ui/separator";
import { SdgSidebar } from "./components/sdg-sidebar";
import { useSearchParams } from "next/navigation";

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

function Feed() {
  const [result] = useQuery({ query: GetPostsQuery });
  const searchParams = useSearchParams();

  return (
    <section className="max-w-screen-xl mx-auto flex space-x-6">
      <SdgSidebar />

      <div className="w-2/3">
        <PostForm />
        <Separator className="my-8 bg-zinc-300" />
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
